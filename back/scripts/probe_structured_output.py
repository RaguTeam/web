"""Does the configured LLM endpoint support structured output?

RAGU's QueryPlanEngine decomposes a question through
`batch_chat_completion(output_schema=QueryPlan)`, and RAGU implements that with
either `client.beta.chat.completions.parse` (a JSON-schema `response_format`) or
tool-calling. YandexGPT's OpenAI-compatible endpoint is not known to support
either, which is why `query_plan` is not advertised in SUPPORTED_ENGINES and why
this backend decomposes questions with its own tolerant parser instead.

Run this before wiring RAGU's native planner in: it answers, with one call per
mode, whether that engine could work here at all.

    cd ~/ragu-web-deploy/web/back
    sudo docker-compose -f ../docker-compose.yml run --rm back \
        python scripts/probe_structured_output.py

or, with the env already exported:

    uv run --project back python back/scripts/probe_structured_output.py
"""

from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from ragu_web_api.services.index_repository import (  # noqa: E402
    _llm_config_from_env,
    _merged_env,
)

QUESTION = "Какие причины возникновения рака простаты и как его диагностируют?"


async def probe_plain(config) -> None:
    from openai import AsyncOpenAI

    client = AsyncOpenAI(
        api_key=config.api_key, base_url=config.base_url, max_retries=0
    )
    response = await client.chat.completions.create(
        model=config.model_name,
        messages=[{"role": "user", "content": "Reply with the single word: ok"}],
        max_tokens=16,
    )
    print("   ->", (response.choices[0].message.content or "").strip()[:80])


async def probe_response_format(config) -> None:
    """What RAGU does by default (`as_tool=False`)."""
    from openai import AsyncOpenAI

    from ragu.common.prompts.default_models import QueryPlan

    client = AsyncOpenAI(
        api_key=config.api_key, base_url=config.base_url, max_retries=0
    )
    completion = await client.beta.chat.completions.parse(
        model=config.model_name,
        messages=[
            {
                "role": "system",
                "content": "Split the question into independent sub-questions.",
            },
            {"role": "user", "content": QUESTION},
        ],
        response_format=QueryPlan,
    )
    parsed = completion.choices[0].message.parsed
    if parsed is None:
        raise RuntimeError("endpoint accepted the schema but returned no parsed value")
    print("   ->", [sub.query for sub in parsed.subqueries])


async def probe_tool_call(config) -> None:
    """RAGU's other path (`as_tool=True`)."""
    from openai import AsyncOpenAI

    from ragu.common.prompts.default_models import QueryPlan

    client = AsyncOpenAI(
        api_key=config.api_key, base_url=config.base_url, max_retries=0
    )
    response = await client.chat.completions.create(
        model=config.model_name,
        messages=[{"role": "user", "content": QUESTION}],
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "query_plan",
                    "parameters": QueryPlan.model_json_schema(),
                },
            }
        ],
        tool_choice="auto",
    )
    calls = response.choices[0].message.tool_calls
    if not calls:
        raise RuntimeError("endpoint accepted tools but called none")
    print("   ->", calls[0].function.arguments[:160])


async def main() -> int:
    config = _llm_config_from_env(_merged_env())
    print(f"provider : {config.provider}")
    print(f"base_url : {config.base_url}")
    print(f"model    : {config.model_name}")
    if not config.is_configured:
        print("\nNo LLM configured — nothing to probe.")
        return 2

    results: dict[str, bool] = {}
    for name, probe in (
        ("plain chat_completion", probe_plain),
        ("response_format (beta.parse)", probe_response_format),
        ("tool calling", probe_tool_call),
    ):
        print(f"\n== {name}")
        try:
            await probe(config)
        except Exception as exc:
            results[name] = False
            print(f"   FAIL {type(exc).__name__}: {str(exc)[:400]}")
        else:
            results[name] = True
            print("   OK")

    structured = results.get("response_format (beta.parse)") or results.get(
        "tool calling"
    )
    print("\n" + "=" * 64)
    if structured:
        print("Structured output works — RAGU's native QueryPlanEngine is viable.")
        print("Note it also takes over answer generation, and with it the answer")
        print("language, which this backend currently controls itself.")
    else:
        print("Structured output does NOT work on this endpoint.")
        print("RAGU's QueryPlanEngine cannot run here; keep the backend's own")
        print("_plan_queries, which tolerates unstructured replies by design.")
    return 0 if results.get("plain chat_completion") else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
