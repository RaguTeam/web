# @ugar/ragu-site

A redesign of the RAGU demo front end: a landing page that explains the system,
and a corpus explorer that puts a 3D entity cloud and the agent chat on the same
stage.

It talks to the public gateway at `https://ragu-back.duckdns.org` and holds no
domain logic of its own — no `@ugar/graphrag` imports, HTTP only.

```bash
pnpm --filter @ugar/ragu-site dev      # http://localhost:5173
pnpm --filter @ugar/ragu-site check    # tsc, app + tests
pnpm --filter @ugar/ragu-site test     # tsx --test
pnpm --filter @ugar/ragu-site build    # check + vite build
```

> The dev server is pinned to **5173**. The gateway's CORS allowlist names that
> origin explicitly; any other port is rejected by the browser before the
> request lands. Point `VITE_RAGU_API` at another gateway to override the host.

## Routes

| Path | What it is |
|------|------------|
| `/` | Hero, the four indexing passes, the three corpora, the stack |
| `/c/$datasetId` | The explorer: entity cloud, filters, entity card, chat |
| `/stack/$entryId` | `ragu`, `ragu-lm`, `nerel`, `interface` |

Routing uses **hash history** — the site ships as a static bundle and a static
host has no rewrite rule to hand `/c/medical` back to `index.html`. Set
`RAGU_BASE=/web/` at build time to target a sub-path host.

## The entity cloud

The gateway ships a 2D layout with every graph. That is a good seed and a poor
picture, so `src/graph/layout.ts` lifts it into 3D — communities are fanned out
along a stable axis — and relaxes it with a force solver: **Barnes–Hut**
repulsion over an octree against Hooke attraction along the edges. It is pure,
deterministic and runs in a worker (`layout.worker.ts`); solved clouds are
cached for the session, so switching corpora is instant the second time.

Rendering is three draw calls regardless of corpus size: one `LineSegments` for
the edges, and two `Points` passes (core plus halo) sharing one position
buffer. Selection, hover, search and filters never touch the layout — they
rewrite the colour/alpha/size attributes in place.

Cloud size lives in the chrome as a compact readout — entities loaded over
entities in the corpus — rather than a permanent panel over the scene. The
gateway rejects `limit` above 5000 outright, so that is the top of the ladder;
anything larger is always a slice, and the popover says so.

**Colour encodes degree, not type.** A knowledge graph carries 40+ entity types;
painting each one a hue produces confetti that no colour-vision check can pass.
So the cloud is a sequential single-hue ramp over how connected an entity is,
and the brand accent is reserved for interaction — hover, selection, search
hits, a highlighted type, an entity a chat answer cited. Type stays available
as a *filter*, which is what it is actually useful for.

Labels are DOM over WebGL rather than sprites, so they keep the page's
typography at any pixel ratio. Only the hubs plus whatever you are pointing at
are mounted, and they are positioned imperatively — React never re-renders on
camera movement.

## Layout choreography

One `<Canvas>` lives at the app shell for the whole site, so moving from the
landing page into a corpus is a crossfade inside a live scene rather than a
teardown. The landing page shows a deterministic procedural constellation, held
well back so it stays behind the body copy; a corpus swaps in the real cloud.

Graph and chat are independent toggles, and at least one is always on:

| State | Stage |
|-------|-------|
| Graph | Cloud fills the stage; the entity card floats at the right |
| Graph + chat | Cloud slides left, chat takes the right, the entity card drops beneath the cloud |
| Chat | Chat centres; the cloud stays as a dimmed backdrop |

The cloud is not pushed aside by a guessed amount. The region the panels leave
free is measured through a resize observer and published to the scene, and
`graph/framing.ts` turns that rectangle into a world offset and a scale. The
camera is never touched — zoom and orbit belong to the reader — so the cloud
slides out from under a panel *as* that panel opens, and shrinks rather than
being cropped when the space gets tight.

Panels are glass, so the cloud reads *through* them instead of being covered.
Each pane is a separate absolutely-positioned layer rather than a background on
the container: a parent carrying `backdrop-filter` flattens nested glass inside
it, and animating a pane must not drag its text through the transform and
render it soft. Popups fade their content and scale only the glass.

The three chrome islands are all one height, and the middle one is pinned to
the centre of the viewport rather than laid out between its neighbours — so it
does not jump when the brand island grows a corpus switcher.

## Chat

`POST /agent/messages` with the retrieval settings from the gear dialog —
"Graph in search" picks `mix` vs `naive`, plus query planning, `top_k` and
rerank. Inference on this deployment runs on CPU, so the pending state is
honest: an elapsed counter and a stop button, not a spinner that implies speed.

Answers cite inline, and the shape varies: `(Entity: ent-…)` in English,
`(см. chunk-…)` in Russian, sometimes a bare `(Chunk: 126e88ea…)` with the
prefix dropped. An answer usually names a thing and then repeats its id in
brackets, which is noise twice over — so the id is folded back into the words
the sentence already spent on it. The phrase becomes the handle, the id goes to
the hover tooltip, and clicking selects that entity in the cloud.
`trace.highlight.node_ids` lights up everything the answer leaned on.

Below each answer sit **Sources** — the entities, relations and chunks it
actually read, with the entities clickable — and an info button carrying engine,
top-k, rerank, timings and the estimated watt-hours. Closing the panel and
clearing the thread are separate controls.

## Layout of the source

```
src/
  api/        wire types, fetch client, React Query options
  graph/      layout solver + worker, model, shaders, scene, stores
  components/ chrome (top islands), viewer (controls, card, chat), home, ui
  content/    stack and pipeline copy, en + ru
  lib/        stores, i18n, theme, settings, formatting
  routes/     root shell, home, dataset, stack, 404
```

## Design system

Cool navy neutrals, one warm accent taken from the RAGU letterform, and glass
panes with an inner edge highlight rather than a plain blur. Newsreader for
display, Instrument Sans for UI, IBM Plex Mono for anything numeric. Tokens live
in `src/app.css`; there are no hard-coded colours in components.
