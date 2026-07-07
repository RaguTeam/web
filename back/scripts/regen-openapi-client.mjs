#!/usr/bin/env node
/**
 * Regenerates bog/norweb/front/api/ragu.openapi.ts from openapi.json.
 *
 * 1. Runs `openapi-typescript` on the spec to get the raw types block,
 *    wraps it in `namespace $.$bog_norweb_front_api_ragu { ... }`.
 * 2. Iterates operations in the spec and emits per-op descriptor consts
 *    (`{ method, route, params, query, body, out }`) that the runtime
 *    client at `api.ts` calls.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname( fileURLToPath( import.meta.url ) )
const REPO_ROOT = resolve( HERE, '../../../..' )
const TARGETS = [
	{
		spec: resolve( REPO_ROOT, 'bog/norweb/back/openapi.json' ),
		out: resolve( REPO_ROOT, 'bog/norweb/front/api/ragu.openapi.ts' ),
	},
	{
		spec: resolve( HERE, '../openapi.json' ),
		out: resolve( HERE, '../../front/api/ragu.openapi.ts' ),
	},
]
const TARGET = TARGETS.find( item => existsSync( item.spec ) )
if ( !TARGET ) throw new Error( 'Cannot find norweb/back/openapi.json' )
const SPEC = TARGET.spec
const OUT = TARGET.out
const NS = '$bog_norweb_front_api_ragu'

const spec = JSON.parse( readFileSync( SPEC, 'utf8' ) )

// 1) Types block via openapi-typescript CLI.
const raw_types_untidy = execSync( `npx --yes openapi-typescript "${ SPEC }"`, {
	encoding: 'utf8',
	cwd: REPO_ROOT,
} )

// MAM scans identifiers/strings for `$foo` refs and pulls in `foo/foo` as a
// module. openapi-typescript emits `$defs` (JSON Schema keyword) as a TS
// type name — strip the `$` so MAM doesn't hunt for a nonexistent `defs`
// package. Same for any other `$-prefixed` names JSON Schema might inject.
const raw_types = raw_types_untidy.replace( /\$defs\b/g, 'defs' )

// Indent every non-empty line with a tab and wrap in outer namespace.
const indented_types = raw_types.split( '\n' ).map( l => l.length ? '\t' + l : l ).join( '\n' )

// 2) Emit operation descriptor consts. Iterate paths → methods; use operationId
//    from the spec so const names match what api.ts consumers reference.
const CAMEL_TO_SNAKE = ( s ) => s.replace( /([a-z0-9])([A-Z])/g, '$1_$2' ).toLowerCase()

const descriptors = []
for ( const [ route, methods ] of Object.entries( spec.paths ?? {} ) ) {
	for ( const [ method, op ] of Object.entries( methods ) ) {
		if ( ![ 'get', 'post', 'put', 'patch', 'delete' ].includes( method ) ) continue
		if ( !op?.operationId ) continue
		const op_id = op.operationId
		const const_name = `${ NS }_${ CAMEL_TO_SNAKE( op_id ) }`
		const has_params = op.parameters?.some( p => p.in === 'path' )
		const has_query = op.parameters?.some( p => p.in === 'query' )
		const has_body = !!op.requestBody
		const params_t = has_params ? `{} as ${ NS }.operations[ "${ op_id }" ][ 'parameters' ][ 'path' ]` : 'undefined as undefined'
		const query_t = has_query ? `{} as ${ NS }.operations[ "${ op_id }" ][ 'parameters' ][ 'query' ]` : 'undefined as undefined'
		const body_t = has_body ? `{} as ( ${ NS }.operations[ "${ op_id }" ][ 'requestBody' ] extends { content: { 'application/json': infer B } } ? B : unknown )` : 'undefined as undefined'
		const out_t = `{} as NonNullable< ${ NS }.operations[ "${ op_id }" ][ 'responses' ][ 200 ] extends { content: { 'application/json': infer R } } ? R : unknown >`
		descriptors.push(
			`\texport const ${ const_name } = {\n` +
			`\t\tmethod: "${ method.toUpperCase() }",\n` +
			`\t\troute: "${ route }",\n` +
			`\t\tparams: ${ params_t },\n` +
			`\t\tquery: ${ query_t },\n` +
			`\t\tbody: ${ body_t },\n` +
			`\t\tout: ${ out_t },\n` +
			`\t}`
		)
	}
}

// 3) Compose and write.
const out = [
	`namespace $.${ NS } {`,
	indented_types.trimEnd(),
	`}`,
	``,
	`namespace $ {`,
	descriptors.join( '\n' ),
	`}`,
	``,
].join( '\n' )

writeFileSync( OUT, out )
console.log( `Wrote ${ OUT } (${ descriptors.length } operations)` )
