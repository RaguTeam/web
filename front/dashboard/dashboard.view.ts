namespace $.$$ {

	type Metric = { id: string; name: string; value: string; pct: string }
	type Stage = { id: string; name: string; time: string; pct: string }
	type Log = {
		id: string
		time: string
		text: string
		mode: string
		dur: string
		chunks: string
		communities: string
		retrieval: string
		generation: string
	}

	const METRICS: readonly Metric[] = [
		{ id: 'correctness', name: 'Answer Correctness', value: '59.0', pct: '59%' },
		{ id: 'recall', name: 'Evidence Recall', value: '84.2', pct: '84%' },
		{ id: 'relevancy', name: 'Context Relevancy', value: '90.8', pct: '91%' },
	]

	const STAGES: readonly Stage[] = [
		{ id: 'chunking', name: 'Chunking', time: '1.2s', pct: '15%' },
		{ id: 'extraction', name: 'Extraction', time: '8.4s', pct: '70%' },
		{ id: 'summarization', name: 'Summarization', time: '3.1s', pct: '38%' },
		{ id: 'communities', name: 'Communities', time: '2.0s', pct: '26%' },
		{ id: 'refinement', name: 'Refinement', time: '0.6s', pct: '9%' },
	]

	const LOGS: readonly Log[] = [
		{
			id: 'q1',
			time: '12:04:18',
			text: '«Who wrote the anthem…»',
			mode: 'LocalSearch',
			dur: '1.3s',
			chunks: 'chunks: 3',
			communities: 'communities: 1',
			retrieval: 'retrieval 140ms',
			generation: 'gen 1.2s',
		},
		{
			id: 'q2',
			time: '12:03:51',
			text: '«Connection between Ibsen and…»',
			mode: 'MixSearch',
			dur: '2.1s',
			chunks: 'chunks: 7',
			communities: 'communities: 3',
			retrieval: 'retrieval 360ms',
			generation: 'gen 1.7s',
		},
	]

	// energy assumptions
	const TDP_W = 300       // meno-lite 7B локально
	const PUE = 1.4         // дата-центр / охлаждение
	const KWH_PRICE = 0.15  // $/kWh
	const GPT4_PRICE = 0.10 // $ per doc (~40k tokens × $2.5/1M)

	function parse_seconds( time: string ) {
		// '1.2s' → 1.2  |  '140ms' → 0.14
		const trimmed = time.trim()
		if ( trimmed.endsWith( 'ms' ) ) return parseFloat( trimmed ) / 1000
		if ( trimmed.endsWith( 's' ) ) return parseFloat( trimmed )
		return parseFloat( trimmed ) || 0
	}

	export class $raggu_web_front_dashboard extends $.$raggu_web_front_dashboard {

		metrics() { return METRICS as readonly Metric[] as Metric[] }
		stages() { return STAGES as readonly Stage[] as Stage[] }
		logs() { return LOGS as readonly Log[] as Log[] }

		metric_rows() { return this.metrics().map( m => this.Metric( m.id ) ) }
		stage_rows() { return this.stages().map( s => this.Stage( s.id ) ) }
		log_rows() { return this.logs().map( l => this.Log( l.id ) ) }

		metric( id: string ) { return this.metrics().find( m => m.id === id ) ?? METRICS[ 0 ] }
		stage( id: string ) { return this.stages().find( s => s.id === id ) ?? STAGES[ 0 ] }
		log( id: string ) { return this.logs().find( l => l.id === id ) ?? LOGS[ 0 ] }

		metric_name( id: string ) { return this.metric( id ).name }
		metric_value( id: string ) { return this.metric( id ).value }
		metric_pct( id: string ) { return this.metric( id ).pct }

		stage_name( id: string ) { return this.stage( id ).name }
		stage_time( id: string ) { return this.stage( id ).time }
		stage_pct( id: string ) { return this.stage( id ).pct }

		log_time( id: string ) { return this.log( id ).time }
		log_text( id: string ) { return this.log( id ).text }
		log_mode( id: string ) { return this.log( id ).mode }
		log_dur( id: string ) { return this.log( id ).dur }
		log_chunks( id: string ) { return this.log( id ).chunks }
		log_communities( id: string ) { return this.log( id ).communities }
		log_retrieval( id: string ) { return this.log( id ).retrieval }
		log_generation( id: string ) { return this.log( id ).generation }

		// per-query energy estimate: TDP × dur × PUE
		log_power( id: string ) {
			const sec = parse_seconds( this.log( id ).dur )
			const wh = TDP_W * ( sec / 3600 ) * PUE
			return `≈${ wh.toFixed( 2 ) } Wh`
		}

		// total pipeline seconds, reactive on stages
		pipeline_seconds() {
			return this.stages().reduce( ( sum, s ) => sum + parse_seconds( s.time ), 0 )
		}

		// kWh = TDP × time_h × PUE / 1000
		energy_kwh() {
			const hours = this.pipeline_seconds() / 3600
			return ( TDP_W * hours * PUE ) / 1000
		}

		energy_kwh_val() {
			return this.energy_kwh().toFixed( 2 )
		}

		// $ saving vs gpt-4o estimate per doc
		energy_cost_val() {
			const our = this.energy_kwh() * KWH_PRICE
			if ( GPT4_PRICE <= 0 ) return '0%'
			const saved_pct = Math.round( ( 1 - our / GPT4_PRICE ) * 100 )
			const sign = saved_pct >= 0 ? '−' : '+'
			return `${ sign }${ Math.abs( saved_pct ) }%`
		}

	}

}
