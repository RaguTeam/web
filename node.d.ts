declare namespace $ {

	export class $raggu_web_front_base extends $mol_view {
	}
	
	export class $raggu_web_front_text extends $mol_view {
		text( ): string
		dom_name( ): string
		sub( ): readonly($mol_view_content)[]
	}
	
	export class $raggu_web_front_label extends $raggu_web_front_text {
	}
	
	export class $raggu_web_front_skeleton extends $mol_view {
		attr( ): ({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
	export class $raggu_web_front_reveal extends $mol_view {
		delay_css( ): string
		shown( next?: boolean ): boolean
		delay( ): number
		style( ): ({ 
			'--reveal-delay': ReturnType< $raggu_web_front_reveal['delay_css'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'raggu_web_front_reveal_shown': ReturnType< $raggu_web_front_reveal['shown'] >,
		})  & ReturnType< $mol_view['attr'] >
	}
	
	export class $raggu_web_front_link extends $mol_view {
		href( ): string
		click( next?: any ): any
		dom_name( ): string
		uri( ): string
		arg( ): Record<string, any>
		hint( ): string
		attr( ): ({ 
			'href': ReturnType< $raggu_web_front_link['href'] >,
			'title': ReturnType< $raggu_web_front_link['hint'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			click( next?: ReturnType< $raggu_web_front_link['click'] > ): ReturnType< $raggu_web_front_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=base.view.tree.d.ts.map
declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_button_1 = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		activate( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		key_press( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		status( next?: readonly(any)[] ): readonly(any)[]
		event( ): ({ 
			click( next?: ReturnType< $mol_button['activate'] > ): ReturnType< $mol_button['activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['key_press'] > ): ReturnType< $mol_button['key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_image extends $mol_view {
		uri( ): string
		title( ): string
		loading( ): string
		decoding( ): string
		cors( ): any
		natural_width( ): number
		natural_height( ): number
		load( next?: any ): any
		dom_name( ): string
		attr( ): Record<string, any> & ReturnType< $mol_view['attr'] >
		event( ): Record<string, any>
		minimal_width( ): number
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=image.view.tree.d.ts.map
declare namespace $ {

	export class $raggu_web_front_mark extends $mol_image {
		data_uri( ): string
		uri( ): ReturnType< $raggu_web_front_mark['data_uri'] >
		title( ): string
	}
	
	export class $raggu_web_front_mark_icon extends $mol_view {
	}
	
}

//# sourceMappingURL=mark.view.tree.d.ts.map
declare namespace $ {

	export class $bog_favicon extends $mol_plugin {
		Icon( ): $mol_view
	}
	
}

//# sourceMappingURL=favicon.view.tree.d.ts.map
declare namespace $ {

	export class $raggu_web_front_lib_names extends $mol_object {
		entity_AGE( ): string
		entity_ANATOMICAL_STRUCTURE( ): string
		entity_ANATOMICAL_SYSTEM( ): string
		entity_ANATOMY( ): string
		entity_ATTRIBUTE( ): string
		entity_AWARD( ): string
		entity_BEHAVIOR( ): string
		entity_BIOLOGICAL_ENTITY( ): string
		entity_BIOLOGICAL_PROCESS( ): string
		entity_BIOMATERIAL( ): string
		entity_CELL( ): string
		entity_CELL_TYPE( ): string
		entity_CITY( ): string
		entity_CLASSIFICATION_SYSTEM( ): string
		entity_CONCEPT( ): string
		entity_CONDITION( ): string
		entity_COUNTRY( ): string
		entity_CRIME( ): string
		entity_DATE( ): string
		entity_DESCRIPTION( ): string
		entity_DISEASE( ): string
		entity_DISEASE_OR_DISORDER( ): string
		entity_DISTRICT( ): string
		entity_DOCUMENT( ): string
		entity_DRUG_OR_CHEMICAL( ): string
		entity_EVENT( ): string
		entity_FACILITY( ): string
		entity_FAMILY( ): string
		entity_GENE( ): string
		entity_GENE_MUTATION( ): string
		entity_GENE_OR_PROTEIN( ): string
		entity_GENETIC_TEST( ): string
		entity_GROUP( ): string
		entity_HORMONE( ): string
		entity_IDEOLOGY( ): string
		entity_LANGUAGE( ): string
		entity_LAW( ): string
		entity_LOCATION( ): string
		entity_MEASUREMENT( ): string
		entity_MEASUREMENT_OR_OUTCOME( ): string
		entity_MEDICAL_CONDITION( ): string
		entity_MONEY( ): string
		entity_NATIONALITY( ): string
		entity_NUMBER( ): string
		entity_ORDINAL( ): string
		entity_ORGAN( ): string
		entity_ORGANIZATION( ): string
		entity_PATHOLOGICAL_ENTITY( ): string
		entity_PENALTY( ): string
		entity_PERCENT( ): string
		entity_PERSON( ): string
		entity_PROCEDURE( ): string
		entity_PROCEDURE_OR_INTERVENTION( ): string
		entity_PROCESS( ): string
		entity_PRODUCT( ): string
		entity_PROFESSION( ): string
		entity_PROTEIN( ): string
		entity_PROTOCOL( ): string
		entity_RELIGION( ): string
		entity_SOFTWARE( ): string
		entity_STATE_OR_PROV( ): string
		entity_SUBTYPE( ): string
		entity_SURGERY( ): string
		entity_SYMPTOM_OR_FINDING( ): string
		entity_SYSTEM( ): string
		entity_TEST( ): string
		entity_TIME( ): string
		entity_TREATMENT( ): string
		entity_WEBSITE( ): string
		entity_WORK_OF_ART( ): string
		relation_AFFECTED_BY( ): string
		relation_AFFECTS( ): string
		relation_AGENT( ): string
		relation_ALTERNATIVE_TO( ): string
		relation_APPLICABLE_TO( ): string
		relation_BASED_ON( ): string
		relation_BIOMARKER( ): string
		relation_CAUSE_OF( ): string
		relation_CELL_TYPE_PRESENT_IN_DISEASE( ): string
		relation_COMBINED_WITH( ): string
		relation_CONTAINS( ): string
		relation_COVERED_BY( ): string
		relation_DIAGNOSED_WITH( ): string
		relation_DOCUMENT_SOURCE( ): string
		relation_EXAMPLE_OF( ): string
		relation_EXPRESSED_IN( ): string
		relation_GENE_ASSOCIATION( ): string
		relation_HAS_CAUSE( ): string
		relation_HAS_EFFECT( ): string
		relation_INCIDENCE_INCREASES( ): string
		relation_INSTANCE_OF( ): string
		relation_INVOLVES( ): string
		relation_INVOLVES_REMOVAL( ): string
		relation_INVOLVES_TEST( ): string
		relation_LOCATED_IN( ): string
		relation_LOCATION( ): string
		relation_LOCATION_OF_DISEASE( ): string
		relation_MANAGEMENT_STRATEGY( ): string
		relation_PART_OF( ): string
		relation_PARTICIPANT_IN( ): string
		relation_PRECEDES( ): string
		relation_PRODUCES( ): string
		relation_PRODUCT( ): string
		relation_RELATED_TO( ): string
		relation_REMOVES( ): string
		relation_REPORTED_TO( ): string
		relation_RISK_FACTOR( ): string
		relation_RISK_FACTOR_FOR( ): string
		relation_SIDE_EFFECT( ): string
		relation_SPREAD_TO( ): string
		relation_STARTS_IN( ): string
		relation_SUBCLASS_OF( ): string
		relation_SUPERCLASS_OF( ): string
		relation_SYNONYM( ): string
		relation_TARGET_OF( ): string
		relation_TARGETS( ): string
		relation_TREATMENT( ): string
		relation_TREATMENT_FOR( ): string
		relation_TREATS( ): string
		relation_TYPE_OF( ): string
		relation_USED_FOR( ): string
		relation_USED_IN( ): string
		relation_USES( ): string
	}
	
}

//# sourceMappingURL=names.view.tree.d.ts.map
declare namespace $ {

	export class $raggu_web_front_scene extends $mol_view {
		interactive( ): boolean
		mounted( ): boolean
		Layer( ): $raggu_web_front_scene_layer
		viewer( ): $raggu_web_front_viewer
		lights( ): string
		attr( ): ({ 
			'raggu_web_front_scene_interactive': ReturnType< $raggu_web_front_scene['interactive'] >,
			'raggu_web_front_scene_mounted': ReturnType< $raggu_web_front_scene['mounted'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=scene.view.tree.d.ts.map
declare namespace $ {

	export class $raggu_web_front_glass extends $mol_view {
		solid( ): boolean
		dom_name( ): string
		attr( ): ({ 
			'aria-hidden': string,
			'raggu_web_front_glass_solid': ReturnType< $raggu_web_front_glass['solid'] >,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=glass.view.tree.d.ts.map
declare namespace $ {

	type $mol_button__hint_raggu_web_front_pop_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_pop['hint'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_pop_2 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_pop['hint'] >,
			'aria-expanded': ReturnType< $raggu_web_front_pop['showed'] >,
			'raggu_web_front_pop_open': ReturnType< $raggu_web_front_pop['showed'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_pop_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_pop['toggle'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_pop_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_pop['trigger_content'] >
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_glass__solid_raggu_web_front_pop_5 = $mol_type_enforce<
		boolean
		,
		ReturnType< $raggu_web_front_glass['solid'] >
	>
	type $mol_view__sub_raggu_web_front_pop_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_pop['bubble_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_pop_7 = $mol_type_enforce<
		({ 
			'popover': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__style_raggu_web_front_pop_8 = $mol_type_enforce<
		({ 
			'width': ReturnType< $raggu_web_front_pop['bubble_width'] >,
		})  & ReturnType< $mol_view['style'] >
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__event_raggu_web_front_pop_9 = $mol_type_enforce<
		({ 
			keydown( next?: ReturnType< $raggu_web_front_pop['bubble_keydown'] > ): ReturnType< $raggu_web_front_pop['bubble_keydown'] >,
		})  & ReturnType< $mol_view['event'] >
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_raggu_web_front_pop_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_pop extends $mol_view {
		hint( ): string
		toggle( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		Trigger( ): $mol_button
		bubble_keydown( next?: any ): any
		Glass( ): $raggu_web_front_glass
		bubble_content( ): readonly($mol_view_content)[]
		Content( ): $mol_view
		Bubble( ): $mol_view
		showed( next?: boolean ): boolean
		close( next?: any ): any
		align( ): string
		offset( ): number
		bubble_width( ): string
		attr( ): ({ 
			'raggu_web_front_pop_showed': ReturnType< $raggu_web_front_pop['showed'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_raggu_web_front_icon_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__geometry_raggu_web_front_icon_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_icon['fill'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $raggu_web_front_icon extends $mol_svg_root {
		path( ): string
		Stroke( ): $mol_svg_path
		fill( ): string
		Fill( ): $mol_svg_path
		view_box( ): string
		attr( ): ({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_svg_root['attr'] >
		sub( ): readonly(any)[]
	}
	
	export class $raggu_web_front_icon_graph extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_chat extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_search extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_close extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_sliders extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_sun extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_moon extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_display extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_globe extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_chevron extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_arrow extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_send extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_stop extends $raggu_web_front_icon {
		fill( ): string
	}
	
	export class $raggu_web_front_icon_info extends $raggu_web_front_icon {
		path( ): string
		fill( ): string
	}
	
	export class $raggu_web_front_icon_sources extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_sweep extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_plus extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_recentre extends $raggu_web_front_icon {
		path( ): string
	}
	
	export class $raggu_web_front_icon_caret extends $raggu_web_front_icon {
		view_box( ): string
		path( ): string
	}
	
	export class $raggu_web_front_icon_mol extends $raggu_web_front_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	type $raggu_web_front_label__dom_name_raggu_web_front_chrome_switcher_1 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_switcher_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_switcher['corpus_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_switcher_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_switcher_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_switcher_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_switcher['corpora_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_switcher['rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_switcher_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_switcher_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_switcher_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_switcher_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_chrome_switcher_16 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_switcher_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_switcher['row_count'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_link__arg_raggu_web_front_chrome_switcher_18 = $mol_type_enforce<
		({ 
			'corpus': ReturnType< $raggu_web_front_chrome_switcher['row_id'] >,
		}) 
		,
		ReturnType< $raggu_web_front_link['arg'] >
	>
	type $raggu_web_front_link__click_raggu_web_front_chrome_switcher_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_switcher['row_click'] >
		,
		ReturnType< $raggu_web_front_link['click'] >
	>
	type $raggu_web_front_link__attr_raggu_web_front_chrome_switcher_20 = $mol_type_enforce<
		({ 
			'raggu_web_front_chrome_switcher_row_current': ReturnType< $raggu_web_front_chrome_switcher['row_current'] >,
		})  & ReturnType< $raggu_web_front_link['attr'] >
		,
		ReturnType< $raggu_web_front_link['attr'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_chrome_switcher_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	export class $raggu_web_front_chrome_switcher extends $raggu_web_front_pop {
		pick_label( ): string
		corpus_label( ): string
		Current_label( ): $raggu_web_front_label
		current_title( ): string
		Current_title( ): $mol_view
		Current( ): $mol_view
		Caret( ): $raggu_web_front_icon_caret
		corpora_label( ): string
		Heading_label( ): $raggu_web_front_label
		Heading( ): $mol_view
		rows( ): readonly(any)[]
		List( ): $mol_view
		row_id( id: any): string
		row_click( id: any, next?: any ): any
		row_current( id: any): boolean
		row_title( id: any): string
		Row_title( id: any): $mol_view
		row_domain( id: any): string
		Row_domain( id: any): $mol_view
		Row_text( id: any): $mol_view
		row_count( id: any): string
		Row_count( id: any): $raggu_web_front_label
		corpus( ): string
		hint( ): ReturnType< $raggu_web_front_chrome_switcher['pick_label'] >
		bubble_width( ): string
		trigger_content( ): readonly(any)[]
		bubble_content( ): readonly(any)[]
		Row( id: any): $raggu_web_front_link
		Row_skeleton( id: any): $raggu_web_front_skeleton
	}
	
}

//# sourceMappingURL=switcher.view.tree.d.ts.map
declare namespace $ {

	type $mol_button__hint_raggu_web_front_chrome_tools_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['recentre_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_chrome_tools_2 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_chrome_tools['recentre_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_chrome_tools_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['recentre'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_tools_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_tools_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_tools_6 = $mol_type_enforce<
		({ 
			'class': ReturnType< $raggu_web_front_chrome_tools['stale_class'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_tools_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_tools_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_tools_10 = $mol_type_enforce<
		({ 
			'class': ReturnType< $raggu_web_front_chrome_tools['stale_class'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_tools_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['stats_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_tools_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['shown_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_chrome_tools_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['total_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_tools_19 = $mol_type_enforce<
		({ 
			'class': ReturnType< $raggu_web_front_chrome_tools['stale_class'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__style_raggu_web_front_chrome_tools_21 = $mol_type_enforce<
		({ 
			'width': ReturnType< $raggu_web_front_chrome_tools['bar_width'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_chrome_tools_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['legend_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_24 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['action'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_tools_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_pop__align_raggu_web_front_chrome_tools_26 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_pop['align'] >
	>
	type $raggu_web_front_pop__hint_raggu_web_front_chrome_tools_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['stats_label'] >
		,
		ReturnType< $raggu_web_front_pop['hint'] >
	>
	type $raggu_web_front_pop__bubble_width_raggu_web_front_chrome_tools_28 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_pop['bubble_width'] >
	>
	type $raggu_web_front_pop__trigger_content_raggu_web_front_chrome_tools_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_pop['trigger_content'] >
	>
	type $raggu_web_front_pop__bubble_content_raggu_web_front_chrome_tools_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_pop['bubble_content'] >
	>
	type $mol_button__enabled_raggu_web_front_chrome_tools_31 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['more_enabled'] >
		,
		ReturnType< $mol_button['enabled'] >
	>
	type $mol_button__click_raggu_web_front_chrome_tools_32 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['more'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_tools_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_button__enabled_raggu_web_front_chrome_tools_34 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['rest_enabled'] >
		,
		ReturnType< $mol_button['enabled'] >
	>
	type $mol_button__click_raggu_web_front_chrome_tools_35 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['rest'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_tools_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_chrome_tools_37 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['paging_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_chrome_tools_38 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['rest_failed_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_chrome_tools_39 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['clipped_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_chrome_tools_40 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_tools['at_max_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	export class $raggu_web_front_chrome_tools extends $mol_view {
		recentre_label( ): string
		recentre( next?: any ): any
		Recentre_icon( ): $raggu_web_front_icon_recentre
		Recentre( ): $mol_button
		stats_label( ): string
		stale_class( ): string
		shown_badge( ): string
		Shown_badge( ): $mol_view
		Ramp( ): $mol_view
		total_badge( ): string
		Total_badge( ): $mol_view
		Stats_label( ): $raggu_web_front_label
		shown_full( ): string
		Shown_full( ): $mol_view
		shown_label( ): string
		Shown_caption( ): $raggu_web_front_label
		Shown_block( ): $mol_view
		total_full( ): string
		Total_full( ): $mol_view
		total_label( ): string
		Total_caption( ): $raggu_web_front_label
		Total_block( ): $mol_view
		Numbers( ): $mol_view
		bar_width( ): string
		Bar_fill( ): $mol_view
		Bar( ): $mol_view
		legend_label( ): string
		Legend( ): $raggu_web_front_text
		action( ): readonly(any)[]
		Action( ): $mol_view
		Stats_body( ): $mol_view
		Stats( ): $raggu_web_front_pop
		more_enabled( ): boolean
		more( next?: any ): any
		More_icon( ): $raggu_web_front_icon_plus
		more_text( ): string
		rest_enabled( ): boolean
		rest( next?: any ): any
		Rest_icon( ): $raggu_web_front_icon_plus
		rest_text( ): string
		paging_label( ): string
		rest_failed_label( ): string
		clipped_text( ): string
		at_max_label( ): string
		viewer( ): $raggu_web_front_viewer
		sub( ): readonly(any)[]
		More( ): $mol_button
		Rest( ): $mol_button
		Paging_note( ): $raggu_web_front_text
		Rest_failed( ): $raggu_web_front_text
		Clipped_note( ): $raggu_web_front_text
		At_max( ): $raggu_web_front_text
		loading_label( ): string
		load_more_label( ): string
		load_rest_label( ): string
		loading_rest_label( ): string
		clipped_label( ): string
	}
	
}

//# sourceMappingURL=tools.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_raggu_web_front_chrome_toggle_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_toggle_2 = $mol_type_enforce<
		({ 
			'class': string,
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	export class $raggu_web_front_chrome_toggle extends $mol_button {
		Pane( ): $mol_view
		active( ): boolean
		label( ): string
		Icon( ): $raggu_web_front_icon
		attr( ): ({ 
			'aria-pressed': ReturnType< $raggu_web_front_chrome_toggle['active'] >,
		})  & ReturnType< $mol_button['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_raggu_web_front_chrome_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_link__arg_raggu_web_front_chrome_7 = $mol_type_enforce<
		({ 
			'corpus': any,
		}) 
		,
		ReturnType< $raggu_web_front_link['arg'] >
	>
	type $raggu_web_front_link__hint_raggu_web_front_chrome_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['home_label'] >
		,
		ReturnType< $raggu_web_front_link['hint'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_chrome_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $raggu_web_front_chrome_switcher__corpus_raggu_web_front_chrome_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['corpus'] >
		,
		ReturnType< $raggu_web_front_chrome_switcher['corpus'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_chrome_tools__viewer_raggu_web_front_chrome_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['viewer'] >
		,
		ReturnType< $raggu_web_front_chrome_tools['viewer'] >
	>
	type $raggu_web_front_chrome_theme__choice_raggu_web_front_chrome_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['theme_choice'] >
		,
		ReturnType< $raggu_web_front_chrome_theme['choice'] >
	>
	type $raggu_web_front_chrome_theme__resolved_raggu_web_front_chrome_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['theme_resolved'] >
		,
		ReturnType< $raggu_web_front_chrome_theme['resolved'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_button__hint_raggu_web_front_chrome_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['settings_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_chrome_19 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_chrome['settings_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_chrome_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['open_settings'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['right'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_chrome_24 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['to_pipeline'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_button__click_raggu_web_front_chrome_26 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['to_corpora'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_chrome_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_28 = $mol_type_enforce<
		({ 
			'data-active': ReturnType< $raggu_web_front_chrome['home_active'] >,
			'inert': ReturnType< $raggu_web_front_chrome['home_inert'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_chrome_toggle__active_raggu_web_front_chrome_30 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['graph_active'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['active'] >
	>
	type $raggu_web_front_chrome_toggle__click_raggu_web_front_chrome_31 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['toggle_graph'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['click'] >
	>
	type $raggu_web_front_chrome_toggle__Icon_raggu_web_front_chrome_32 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['Graph_icon'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['Icon'] >
	>
	type $raggu_web_front_chrome_toggle__label_raggu_web_front_chrome_33 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['graph_label'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['label'] >
	>
	type $raggu_web_front_chrome_toggle__active_raggu_web_front_chrome_34 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['chat_active'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['active'] >
	>
	type $raggu_web_front_chrome_toggle__click_raggu_web_front_chrome_35 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['toggle_chat'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['click'] >
	>
	type $raggu_web_front_chrome_toggle__Icon_raggu_web_front_chrome_36 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['Chat_icon'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['Icon'] >
	>
	type $raggu_web_front_chrome_toggle__label_raggu_web_front_chrome_37 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome['chat_label'] >
		,
		ReturnType< $raggu_web_front_chrome_toggle['label'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_38 = $mol_type_enforce<
		({ 
			'data-active': ReturnType< $raggu_web_front_chrome['corpus_active'] >,
			'inert': ReturnType< $raggu_web_front_chrome['corpus_inert'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_chrome_40 = $mol_type_enforce<
		({ 
			'raggu_web_front_chrome_centre_kind': ReturnType< $raggu_web_front_chrome['centre_kind'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_41 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_chrome extends $mol_view {
		scrolled( ): boolean
		corpus_page( ): boolean
		Brand_glass( ): $raggu_web_front_glass
		home_label( ): string
		Mark( ): $raggu_web_front_mark
		Word( ): $mol_view
		Word_sub( ): $mol_view
		Wordmark( ): $mol_view
		Home_link( ): $raggu_web_front_link
		Switcher_rule( ): $mol_view
		corpus( ): string
		Switcher( ): $raggu_web_front_chrome_switcher
		Switcher_box( ): $mol_view
		Brand( ): $mol_view
		Tools( ): $raggu_web_front_chrome_tools
		Controls_glass( ): $raggu_web_front_glass
		Theme_menu( ): $raggu_web_front_chrome_theme
		Lang_menu( ): $raggu_web_front_chrome_lang
		Controls_rule( ): $mol_view
		settings_label( ): string
		open_settings( next?: any ): any
		Settings_icon( ): $raggu_web_front_icon_sliders
		Settings_open( ): $mol_button
		Controls( ): $mol_view
		right( ): readonly(any)[]
		Right( ): $mol_view
		centre_kind( ): string
		Centre_glass( ): $raggu_web_front_glass
		home_active( ): string
		home_inert( ): string
		to_pipeline( next?: any ): any
		pipeline_label( ): string
		Link_pipeline( ): $mol_button
		to_corpora( next?: any ): any
		corpora_label( ): string
		Link_corpora( ): $mol_button
		Pane_home( ): $mol_view
		corpus_active( ): string
		corpus_inert( ): string
		graph_active( ): boolean
		toggle_graph( next?: any ): any
		Graph_icon( ): $raggu_web_front_icon_graph
		graph_label( ): string
		Toggle_graph( ): $raggu_web_front_chrome_toggle
		chat_active( ): boolean
		toggle_chat( next?: any ): any
		Chat_icon( ): $raggu_web_front_icon_chat
		chat_label( ): string
		Toggle_chat( ): $raggu_web_front_chrome_toggle
		Pane_corpus( ): $mol_view
		Centre( ): $mol_view
		Centre_box( ): $mol_view
		Row( ): $mol_view
		dom_name( ): string
		viewer( ): $raggu_web_front_viewer
		theme_choice( next?: string ): string
		theme_resolved( ): string
		attr( ): ({ 
			'raggu_web_front_chrome_scrolled': ReturnType< $raggu_web_front_chrome['scrolled'] >,
			'raggu_web_front_chrome_corpus': ReturnType< $raggu_web_front_chrome['corpus_page'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chrome.view.tree.d.ts.map
declare namespace $ {

	type $raggu_web_front_label__text_raggu_web_front_chrome_menu_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_menu['heading'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_menu_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_menu['items'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_chrome_menu extends $raggu_web_front_pop {
		Trigger_icon( ): $raggu_web_front_icon
		heading( ): string
		Heading( ): $raggu_web_front_label
		items( ): readonly(any)[]
		Items( ): $mol_view
		align( ): string
		bubble_width( ): string
		trigger_content( ): readonly(any)[]
		bubble_content( ): readonly(any)[]
	}
	
	type $mol_view__dom_name_raggu_web_front_chrome_menu_item_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_menu_item_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_menu_item_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_chrome_menu_item_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_chrome_menu_item_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	export class $raggu_web_front_chrome_menu_item extends $mol_button {
		lead( ): readonly($mol_view_content)[]
		Lead( ): $mol_view
		name( ): string
		Name( ): $mol_view
		Dot( ): $mol_view
		checked( ): boolean
		attr( ): ({ 
			'role': string,
			'aria-checked': ReturnType< $raggu_web_front_chrome_menu_item['checked'] >,
		})  & ReturnType< $mol_button['attr'] >
		sub( ): readonly(any)[]
	}
	
	type $raggu_web_front_chrome_menu_item__checked_raggu_web_front_chrome_theme_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['light_checked'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['checked'] >
	>
	type $raggu_web_front_chrome_menu_item__click_raggu_web_front_chrome_theme_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['pick_light'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['click'] >
	>
	type $raggu_web_front_chrome_menu_item__lead_raggu_web_front_chrome_theme_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
	>
	type $raggu_web_front_chrome_menu_item__name_raggu_web_front_chrome_theme_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['light_label'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['name'] >
	>
	type $raggu_web_front_chrome_menu_item__checked_raggu_web_front_chrome_theme_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['dark_checked'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['checked'] >
	>
	type $raggu_web_front_chrome_menu_item__click_raggu_web_front_chrome_theme_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['pick_dark'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['click'] >
	>
	type $raggu_web_front_chrome_menu_item__lead_raggu_web_front_chrome_theme_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
	>
	type $raggu_web_front_chrome_menu_item__name_raggu_web_front_chrome_theme_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['dark_label'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['name'] >
	>
	type $raggu_web_front_chrome_menu_item__checked_raggu_web_front_chrome_theme_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['system_checked'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['checked'] >
	>
	type $raggu_web_front_chrome_menu_item__click_raggu_web_front_chrome_theme_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['pick_system'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['click'] >
	>
	type $raggu_web_front_chrome_menu_item__lead_raggu_web_front_chrome_theme_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
	>
	type $raggu_web_front_chrome_menu_item__name_raggu_web_front_chrome_theme_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_theme['system_label'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['name'] >
	>
	export class $raggu_web_front_chrome_theme extends $raggu_web_front_chrome_menu {
		theme_label( ): string
		Current_icon( ): $raggu_web_front_icon
		light_checked( ): boolean
		pick_light( next?: any ): any
		Light_icon( ): $raggu_web_front_icon_sun
		light_label( ): string
		Light( ): $raggu_web_front_chrome_menu_item
		dark_checked( ): boolean
		pick_dark( next?: any ): any
		Dark_icon( ): $raggu_web_front_icon_moon
		dark_label( ): string
		Dark( ): $raggu_web_front_chrome_menu_item
		system_checked( ): boolean
		pick_system( next?: any ): any
		System_icon( ): $raggu_web_front_icon_display
		system_label( ): string
		System( ): $raggu_web_front_chrome_menu_item
		choice( next?: string ): string
		resolved( ): string
		hint( ): ReturnType< $raggu_web_front_chrome_theme['theme_label'] >
		heading( ): ReturnType< $raggu_web_front_chrome_theme['theme_label'] >
		Trigger_icon( ): ReturnType< $raggu_web_front_chrome_theme['Current_icon'] >
		items( ): readonly(any)[]
		Sun_icon( ): $raggu_web_front_icon_sun
		Moon_icon( ): $raggu_web_front_icon_moon
		Display_icon( ): $raggu_web_front_icon_display
	}
	
	type $raggu_web_front_chrome_menu_item__checked_raggu_web_front_chrome_lang_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_lang['en_checked'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['checked'] >
	>
	type $raggu_web_front_chrome_menu_item__click_raggu_web_front_chrome_lang_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_lang['pick_en'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['click'] >
	>
	type $raggu_web_front_chrome_menu_item__lead_raggu_web_front_chrome_lang_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
	>
	type $raggu_web_front_chrome_menu_item__name_raggu_web_front_chrome_lang_4 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_chrome_menu_item['name'] >
	>
	type $raggu_web_front_chrome_menu_item__checked_raggu_web_front_chrome_lang_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_lang['ru_checked'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['checked'] >
	>
	type $raggu_web_front_chrome_menu_item__click_raggu_web_front_chrome_lang_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_chrome_lang['pick_ru'] >
		,
		ReturnType< $raggu_web_front_chrome_menu_item['click'] >
	>
	type $raggu_web_front_chrome_menu_item__lead_raggu_web_front_chrome_lang_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_chrome_menu_item['lead'] >
	>
	type $raggu_web_front_chrome_menu_item__name_raggu_web_front_chrome_lang_8 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_chrome_menu_item['name'] >
	>
	export class $raggu_web_front_chrome_lang extends $raggu_web_front_chrome_menu {
		lang_label( ): string
		Globe_icon( ): $raggu_web_front_icon_globe
		en_checked( ): boolean
		pick_en( next?: any ): any
		En( ): $raggu_web_front_chrome_menu_item
		ru_checked( ): boolean
		pick_ru( next?: any ): any
		Ru( ): $raggu_web_front_chrome_menu_item
		hint( ): ReturnType< $raggu_web_front_chrome_lang['lang_label'] >
		heading( ): ReturnType< $raggu_web_front_chrome_lang['lang_label'] >
		Trigger_icon( ): ReturnType< $raggu_web_front_chrome_lang['Globe_icon'] >
		items( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__event_raggu_web_front_settings_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $raggu_web_front_settings['close'] > ): ReturnType< $raggu_web_front_settings['close'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $raggu_web_front_glass__solid_raggu_web_front_settings_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $raggu_web_front_glass['solid'] >
	>
	type $mol_view__dom_name_raggu_web_front_settings_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_settings_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_settings_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['subtitle_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_settings_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['close_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_settings_8 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_settings['close_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_settings_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['close'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_settings_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['group_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['group_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_settings_toggle__label_raggu_web_front_settings_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['use_graph_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['label'] >
	>
	type $raggu_web_front_settings_toggle__hint_raggu_web_front_settings_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['use_graph_hint'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['hint'] >
	>
	type $raggu_web_front_settings_toggle__checked_raggu_web_front_settings_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['use_graph'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['checked'] >
	>
	type $raggu_web_front_settings_toggle__on_label_raggu_web_front_settings_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['on_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['on_label'] >
	>
	type $raggu_web_front_settings_toggle__off_label_raggu_web_front_settings_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['off_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['off_label'] >
	>
	type $raggu_web_front_settings_toggle__label_raggu_web_front_settings_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['query_plan_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['label'] >
	>
	type $raggu_web_front_settings_toggle__hint_raggu_web_front_settings_21 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['query_plan_hint'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['hint'] >
	>
	type $raggu_web_front_settings_toggle__checked_raggu_web_front_settings_22 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['query_plan'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['checked'] >
	>
	type $raggu_web_front_settings_toggle__on_label_raggu_web_front_settings_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['on_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['on_label'] >
	>
	type $raggu_web_front_settings_toggle__off_label_raggu_web_front_settings_24 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['off_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['off_label'] >
	>
	type $raggu_web_front_settings_toggle__label_raggu_web_front_settings_25 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['rerank_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['label'] >
	>
	type $raggu_web_front_settings_toggle__hint_raggu_web_front_settings_26 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['rerank_hint'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['hint'] >
	>
	type $raggu_web_front_settings_toggle__checked_raggu_web_front_settings_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['rerank'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['checked'] >
	>
	type $raggu_web_front_settings_toggle__on_label_raggu_web_front_settings_28 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['on_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['on_label'] >
	>
	type $raggu_web_front_settings_toggle__off_label_raggu_web_front_settings_29 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['off_label'] >
		,
		ReturnType< $raggu_web_front_settings_toggle['off_label'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_30 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_31 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_settings_33 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_less_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_settings_34 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_settings['top_k_less_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__enabled_raggu_web_front_settings_35 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_less_enabled'] >
		,
		ReturnType< $mol_button['enabled'] >
	>
	type $mol_button__click_raggu_web_front_settings_36 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_less'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_settings_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_settings_39 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_settings['top_k_label'] >,
			'inputmode': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__field_raggu_web_front_settings_40 = $mol_type_enforce<
		({ 
			'value': ReturnType< $raggu_web_front_settings['top_k_draft'] >,
		})  & ReturnType< $mol_view['field'] >
		,
		ReturnType< $mol_view['field'] >
	>
	type $mol_view__event_raggu_web_front_settings_41 = $mol_type_enforce<
		({ 
			input( next?: ReturnType< $raggu_web_front_settings['top_k_input'] > ): ReturnType< $raggu_web_front_settings['top_k_input'] >,
			change( next?: ReturnType< $raggu_web_front_settings['top_k_commit'] > ): ReturnType< $raggu_web_front_settings['top_k_commit'] >,
			blur( next?: ReturnType< $raggu_web_front_settings['top_k_commit'] > ): ReturnType< $raggu_web_front_settings['top_k_commit'] >,
			keydown( next?: ReturnType< $raggu_web_front_settings['top_k_key'] > ): ReturnType< $raggu_web_front_settings['top_k_key'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_button__hint_raggu_web_front_settings_42 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_more_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_settings_43 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_settings['top_k_more_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__enabled_raggu_web_front_settings_44 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_more_enabled'] >
		,
		ReturnType< $mol_button['enabled'] >
	>
	type $mol_button__click_raggu_web_front_settings_45 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['top_k_more'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_48 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_49 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['limit_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_settings_50 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_settings_51 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_53 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['limit_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_54 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['steps'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_55 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['api_cap'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_settings_58 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['reset'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_59 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_button__click_raggu_web_front_settings_60 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['close'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_61 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_62 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_settings_64 = $mol_type_enforce<
		({ 
			'role': string,
			'aria-modal': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_settings_65 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_settings_66 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_settings_67 = $mol_type_enforce<
		({ 
			'class': ReturnType< $raggu_web_front_settings['step_pane_class'] >,
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_button__attr_raggu_web_front_settings_68 = $mol_type_enforce<
		({ 
			'raggu_web_front_settings_step_active': ReturnType< $raggu_web_front_settings['step_active'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_settings_69 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings['step_pick'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	export class $raggu_web_front_settings extends $mol_view {
		keydown( next?: any ): any
		close( next?: any ): any
		Backdrop( ): $mol_view
		Glass( ): $raggu_web_front_glass
		title_label( ): string
		Title( ): $mol_view
		subtitle_label( ): string
		Subtitle( ): $raggu_web_front_label
		Head_text( ): $mol_view
		close_label( ): string
		Close_glyph( ): $raggu_web_front_icon_close
		Close_icon( ): $mol_button
		Head( ): $mol_view
		group_label( ): string
		Group_label( ): $raggu_web_front_label
		group_hint( ): string
		Group_hint( ): $raggu_web_front_text
		Group( ): $mol_view
		use_graph_label( ): string
		use_graph_hint( ): string
		use_graph( next?: boolean ): boolean
		on_label( ): string
		off_label( ): string
		Use_graph( ): $raggu_web_front_settings_toggle
		query_plan_label( ): string
		query_plan_hint( ): string
		query_plan( next?: boolean ): boolean
		Query_plan( ): $raggu_web_front_settings_toggle
		rerank_label( ): string
		rerank_hint( ): string
		rerank( next?: boolean ): boolean
		Rerank( ): $raggu_web_front_settings_toggle
		top_k_label( ): string
		Top_k_label( ): $raggu_web_front_text
		top_k_hint( ): string
		Top_k_hint( ): $raggu_web_front_text
		Top_k_text( ): $mol_view
		top_k_less_label( ): string
		top_k_less_enabled( ): boolean
		top_k_less( next?: any ): any
		Top_k_less( ): $mol_button
		top_k_draft( next?: string ): string
		top_k_input( next?: any ): any
		top_k_commit( next?: any ): any
		top_k_key( next?: any ): any
		Top_k_input( ): $mol_view
		top_k_more_label( ): string
		top_k_more_enabled( ): boolean
		top_k_more( next?: any ): any
		Top_k_more( ): $mol_button
		Top_k_field( ): $mol_view
		Top_k( ): $mol_view
		limit_label( ): string
		Limit_label( ): $raggu_web_front_text
		limit_value( ): string
		Limit_value( ): $mol_view
		Limit_head( ): $mol_view
		limit_hint( ): string
		Limit_hint( ): $raggu_web_front_text
		steps( ): readonly(any)[]
		Steps( ): $mol_view
		api_cap( ): string
		Limit_note( ): $raggu_web_front_text
		Limit( ): $mol_view
		Rows( ): $mol_view
		Divider( ): $mol_view
		reset( next?: any ): any
		reset_label( ): string
		Reset( ): $mol_button
		Done( ): $mol_button
		Foot( ): $mol_view
		Body( ): $mol_view
		Popup( ): $mol_view
		step_active( id: any): boolean
		step_pick( id: any, next?: any ): any
		step_pane_class( id: any): string
		Step_pane( id: any): $mol_view
		step_text( id: any): string
		showed( next?: boolean ): boolean
		attr( ): ({ 
			'raggu_web_front_settings_showed': ReturnType< $raggu_web_front_settings['showed'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $raggu_web_front_settings['keydown'] > ): ReturnType< $raggu_web_front_settings['keydown'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly(any)[]
		Step( id: any): $mol_button
	}
	
	type $raggu_web_front_text__text_raggu_web_front_settings_toggle_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings_toggle['label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_settings_toggle_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings_toggle['hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_settings_toggle_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_settings_toggle_4 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_settings_toggle_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings_toggle['state_text'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_settings_toggle_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_button__attr_raggu_web_front_settings_toggle_7 = $mol_type_enforce<
		({ 
			'role': string,
			'aria-checked': ReturnType< $raggu_web_front_settings_toggle['checked'] >,
			'aria-label': ReturnType< $raggu_web_front_settings_toggle['label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_settings_toggle_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_settings_toggle['flip'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_settings_toggle_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_settings_toggle_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_settings_toggle extends $mol_view {
		Label( ): $raggu_web_front_text
		Hint( ): $raggu_web_front_text
		Text( ): $mol_view
		state_text( ): string
		State( ): $raggu_web_front_label
		flip( next?: any ): any
		Thumb( ): $mol_view
		Switch( ): $mol_button
		Control( ): $mol_view
		label( ): string
		hint( ): string
		checked( next?: boolean ): boolean
		on_label( ): string
		off_label( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=settings.view.tree.d.ts.map
declare namespace $ {

	type $raggu_web_front_label__text_raggu_web_front_home_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['eyebrow'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['lede'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_link__arg_raggu_web_front_home_7 = $mol_type_enforce<
		({ 
			'corpus': string,
		}) 
		,
		ReturnType< $raggu_web_front_link['arg'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $mol_button__click_raggu_web_front_home_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['to_pipeline'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_home_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['metrics_title'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_home_14 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['corpora_count'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_home_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_home_metric__label_raggu_web_front_home_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['metric_nodes'] >
		,
		ReturnType< $raggu_web_front_home_metric['label'] >
	>
	type $raggu_web_front_home_metric__value_raggu_web_front_home_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['total_nodes'] >
		,
		ReturnType< $raggu_web_front_home_metric['value'] >
	>
	type $raggu_web_front_home_metric__pending_raggu_web_front_home_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pending'] >
		,
		ReturnType< $raggu_web_front_home_metric['pending'] >
	>
	type $raggu_web_front_home_metric__label_raggu_web_front_home_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['metric_edges'] >
		,
		ReturnType< $raggu_web_front_home_metric['label'] >
	>
	type $raggu_web_front_home_metric__value_raggu_web_front_home_21 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['total_edges'] >
		,
		ReturnType< $raggu_web_front_home_metric['value'] >
	>
	type $raggu_web_front_home_metric__pending_raggu_web_front_home_22 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pending'] >
		,
		ReturnType< $raggu_web_front_home_metric['pending'] >
	>
	type $raggu_web_front_home_metric__label_raggu_web_front_home_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['metric_communities'] >
		,
		ReturnType< $raggu_web_front_home_metric['label'] >
	>
	type $raggu_web_front_home_metric__value_raggu_web_front_home_24 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['total_communities'] >
		,
		ReturnType< $raggu_web_front_home_metric['value'] >
	>
	type $raggu_web_front_home_metric__pending_raggu_web_front_home_25 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pending'] >
		,
		ReturnType< $raggu_web_front_home_metric['pending'] >
	>
	type $raggu_web_front_home_metric__label_raggu_web_front_home_26 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['metric_chunks'] >
		,
		ReturnType< $raggu_web_front_home_metric['label'] >
	>
	type $raggu_web_front_home_metric__value_raggu_web_front_home_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['total_chunks'] >
		,
		ReturnType< $raggu_web_front_home_metric['value'] >
	>
	type $raggu_web_front_home_metric__pending_raggu_web_front_home_28 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pending'] >
		,
		ReturnType< $raggu_web_front_home_metric['pending'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_29 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_31 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['badges'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_33 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_home_head__eyebrow_raggu_web_front_home_37 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_home_head['eyebrow'] >
	>
	type $raggu_web_front_home_head__title_raggu_web_front_home_38 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pipeline_title'] >
		,
		ReturnType< $raggu_web_front_home_head['title'] >
	>
	type $raggu_web_front_home_head__lede_raggu_web_front_home_39 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['pipeline_lede'] >
		,
		ReturnType< $raggu_web_front_home_head['lede'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_40 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_41 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['steps'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_42 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_home_43 = $mol_type_enforce<
		({ 
			'id': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_home_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_home_head__eyebrow_raggu_web_front_home_45 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_home_head['eyebrow'] >
	>
	type $raggu_web_front_home_head__title_raggu_web_front_home_46 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['corpora_title'] >
		,
		ReturnType< $raggu_web_front_home_head['title'] >
	>
	type $raggu_web_front_home_head__lede_raggu_web_front_home_47 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['corpora_lede'] >
		,
		ReturnType< $raggu_web_front_home_head['lede'] >
	>
	type $mol_view__sub_raggu_web_front_home_48 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['corpora'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_49 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_home_50 = $mol_type_enforce<
		({ 
			'id': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_home_51 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_52 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_53 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['footer_blurb'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_home_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_55 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['footer_project'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_home_56 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_home_58 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_59 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_home_60 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_61 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_62 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_64 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_65 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_66 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['footer_this'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_home_67 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_68 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_home_69 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_71 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['rights'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_72 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_73 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_75 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_76 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_77 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_78 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_home_79 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_80 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['badge_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_81 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_82 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_83 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['step_rail'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_84 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_85 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_86 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['step_detail'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_87 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['step_output'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_88 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_89 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['error_title'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_90 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['error_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_button__click_raggu_web_front_home_91 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['retry'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_home_92 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_93 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_reveal__dom_name_raggu_web_front_home_94 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_reveal['dom_name'] >
	>
	type $raggu_web_front_reveal__delay_raggu_web_front_home_95 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['step_delay'] >
		,
		ReturnType< $raggu_web_front_reveal['delay'] >
	>
	type $raggu_web_front_reveal__sub_raggu_web_front_home_96 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_reveal['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_97 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_98 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_99 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_100 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_101 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $raggu_web_front_home_card__dataset_raggu_web_front_home_102 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['card_dataset'] >
		,
		ReturnType< $raggu_web_front_home_card['dataset'] >
	>
	type $raggu_web_front_home_card__featured_raggu_web_front_home_103 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['card_featured'] >
		,
		ReturnType< $raggu_web_front_home_card['featured'] >
	>
	type $raggu_web_front_home_card__delay_raggu_web_front_home_104 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home['card_delay'] >
		,
		ReturnType< $raggu_web_front_home_card['delay'] >
	>
	type $raggu_web_front_skeleton__attr_raggu_web_front_home_105 = $mol_type_enforce<
		({ 
			'raggu_web_front_home_card_skeleton_featured': ReturnType< $raggu_web_front_home['card_skeleton_featured'] >,
		})  & ReturnType< $raggu_web_front_skeleton['attr'] >
		,
		ReturnType< $raggu_web_front_skeleton['attr'] >
	>
	type $mol_view__sub_raggu_web_front_home_106 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_home extends $mol_view {
		eyebrow( ): string
		Eyebrow( ): $raggu_web_front_label
		title_text( ): string
		title_accent( ): string
		Title_accent( ): $mol_view
		Title( ): $mol_view
		lede( ): string
		Lede( ): $raggu_web_front_text
		cta_label( ): string
		Cta_arrow( ): $raggu_web_front_icon_arrow
		Cta( ): $raggu_web_front_link
		to_pipeline( next?: any ): any
		how_label( ): string
		How( ): $mol_button
		Actions( ): $mol_view
		Hero_main( ): $mol_view
		Metrics_glass( ): $raggu_web_front_glass
		metrics_title( ): string
		Metrics_title( ): $raggu_web_front_label
		corpora_count( ): string
		Metrics_count( ): $raggu_web_front_label
		Metrics_head( ): $mol_view
		metric_nodes( ): string
		total_nodes( ): string
		pending( ): boolean
		Metric_nodes( ): $raggu_web_front_home_metric
		metric_edges( ): string
		total_edges( ): string
		Metric_edges( ): $raggu_web_front_home_metric
		metric_communities( ): string
		total_communities( ): string
		Metric_communities( ): $raggu_web_front_home_metric
		metric_chunks( ): string
		total_chunks( ): string
		Metric_chunks( ): $raggu_web_front_home_metric
		Metric_list( ): $mol_view
		badges( ): readonly(any)[]
		Badges( ): $mol_view
		Metrics_body( ): $mol_view
		Metrics( ): $mol_view
		Hero( ): $mol_view
		pipeline_title( ): string
		pipeline_lede( ): string
		Pipeline_head( ): $raggu_web_front_home_head
		steps( ): readonly(any)[]
		Steps( ): $mol_view
		Pipeline( ): $mol_view
		corpora_title( ): string
		corpora_lede( ): string
		Corpora_head( ): $raggu_web_front_home_head
		corpora( ): readonly(any)[]
		Corpora_body( ): $mol_view
		Corpora( ): $mol_view
		Footer_name( ): $raggu_web_front_text
		footer_blurb( ): string
		Footer_blurb( ): $raggu_web_front_text
		Footer_about( ): $mol_view
		footer_project( ): string
		Footer_project_label( ): $raggu_web_front_label
		Footer_github( ): $raggu_web_front_link
		Footer_arxiv( ): $raggu_web_front_link
		Footer_pypi( ): $raggu_web_front_link
		Footer_project_list( ): $mol_view
		Footer_project( ): $mol_view
		footer_this( ): string
		Footer_this_label( ): $raggu_web_front_label
		Footer_web( ): $raggu_web_front_link
		Footer_mol_icon( ): $raggu_web_front_icon_mol
		footer_mol( ): string
		Footer_mol( ): $raggu_web_front_link
		rights( ): string
		Footer_rights( ): $raggu_web_front_label
		Footer_this_list( ): $mol_view
		Footer_this( ): $mol_view
		Footer_grid( ): $mol_view
		Footer( ): $mol_view
		badge_label( id: any): string
		Badge_label( id: any): $raggu_web_front_label
		badge_value( id: any): string
		Badge_value( id: any): $mol_view
		step_delay( id: any): number
		step_rail( id: any): readonly(any)[]
		Step_rail( id: any): $mol_view
		step_name( id: any): string
		Step_name( id: any): $mol_view
		step_detail( id: any): string
		Step_detail( id: any): $raggu_web_front_text
		step_output( id: any): string
		Step_output( id: any): $raggu_web_front_label
		Step_dot_core( id: any): $mol_view
		step_ordinal( id: any): string
		card_dataset( id: any): any
		card_featured( id: any): boolean
		card_delay( id: any): number
		card_skeleton_featured( id: any): boolean
		Error_glass( ): $raggu_web_front_glass
		error_title( ): string
		Error_title( ): $raggu_web_front_text
		error_hint( ): string
		Error_hint( ): $raggu_web_front_text
		retry( next?: any ): any
		retry_label( ): string
		Retry( ): $mol_button
		sub( ): readonly(any)[]
		Badge( id: any): $mol_view
		Step( id: any): $raggu_web_front_reveal
		Step_dot( id: any): $mol_view
		Step_ordinal( id: any): $mol_view
		Step_line( id: any): $mol_view
		Step_arrow( id: any): $raggu_web_front_icon_arrow
		Card( id: any): $raggu_web_front_home_card
		Card_skeleton( id: any): $raggu_web_front_skeleton
		Error( ): $mol_view
		corpora_word( ): string
		Pipeline_text( ): $raggu_web_front_home_pipeline
	}
	
	type $raggu_web_front_label__dom_name_raggu_web_front_home_metric_1 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_metric_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_metric['label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_metric_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_metric_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_metric['value_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_home_metric extends $mol_view {
		Label( ): $raggu_web_front_label
		value_content( ): readonly(any)[]
		Value( ): $mol_view
		label( ): string
		value( ): string
		pending( ): boolean
		sub( ): readonly(any)[]
		Skeleton( ): $raggu_web_front_skeleton
	}
	
	type $raggu_web_front_label__text_raggu_web_front_home_head_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_head['eyebrow'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_head_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_head_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_head_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_head['lede'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	export class $raggu_web_front_home_head extends $raggu_web_front_reveal {
		Eyebrow( ): $raggu_web_front_label
		Title( ): $mol_view
		Lede( ): $raggu_web_front_text
		eyebrow( ): string
		title( ): string
		lede( ): string
		sub( ): readonly(any)[]
	}
	
	export class $raggu_web_front_home_pipeline extends $mol_object {
		step_1_name( ): string
		step_1_detail( ): string
		step_1_output( ): string
		step_2_name( ): string
		step_2_detail( ): string
		step_2_output( ): string
		step_3_name( ): string
		step_3_detail( ): string
		step_3_output( ): string
		step_4_name( ): string
		step_4_detail( ): string
		step_4_output( ): string
	}
	
}

//# sourceMappingURL=home.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_raggu_web_front_corpus_controls_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['bar'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['summary'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['search_box'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_controls_7 = $mol_type_enforce<
		({ 
			'placeholder': ReturnType< $raggu_web_front_corpus_controls['search_label'] >,
			'aria-label': ReturnType< $raggu_web_front_corpus_controls['search_label'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__field_raggu_web_front_corpus_controls_8 = $mol_type_enforce<
		({ 
			'value': ReturnType< $raggu_web_front_corpus_controls['search'] >,
		})  & ReturnType< $mol_view['field'] >
		,
		ReturnType< $mol_view['field'] >
	>
	type $mol_view__event_raggu_web_front_corpus_controls_9 = $mol_type_enforce<
		({ 
			input( next?: ReturnType< $raggu_web_front_corpus_controls['search_input'] > ): ReturnType< $raggu_web_front_corpus_controls['search_input'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_controls_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['clear_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_controls_11 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_controls['clear_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_controls_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['search_clear'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_controls_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_corpus_controls_filter__label_raggu_web_front_corpus_controls_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['types_label'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['label'] >
	>
	type $raggu_web_front_corpus_controls_filter__count_raggu_web_front_corpus_controls_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['types_count'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['count'] >
	>
	type $raggu_web_front_corpus_controls_filter__items_raggu_web_front_corpus_controls_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['type_items'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['items'] >
	>
	type $raggu_web_front_corpus_controls_filter__clear_raggu_web_front_corpus_controls_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['types_clear'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['clear'] >
	>
	type $raggu_web_front_corpus_controls_filter__label_raggu_web_front_corpus_controls_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['communities_label'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['label'] >
	>
	type $raggu_web_front_corpus_controls_filter__count_raggu_web_front_corpus_controls_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['communities_count'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['count'] >
	>
	type $raggu_web_front_corpus_controls_filter__items_raggu_web_front_corpus_controls_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['community_items'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['items'] >
	>
	type $raggu_web_front_corpus_controls_filter__clear_raggu_web_front_corpus_controls_21 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['communities_clear'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_filter['clear'] >
	>
	type $raggu_web_front_corpus_controls_facet__active_raggu_web_front_corpus_controls_22 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['type_active'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['active'] >
	>
	type $raggu_web_front_corpus_controls_facet__name_raggu_web_front_corpus_controls_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['type_name'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['name'] >
	>
	type $raggu_web_front_corpus_controls_facet__count_raggu_web_front_corpus_controls_24 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['type_count'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['count'] >
	>
	type $raggu_web_front_corpus_controls_facet__click_raggu_web_front_corpus_controls_25 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['type_toggle'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['click'] >
	>
	type $raggu_web_front_corpus_controls_facet__active_raggu_web_front_corpus_controls_26 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['community_active'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['active'] >
	>
	type $raggu_web_front_corpus_controls_facet__name_raggu_web_front_corpus_controls_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['community_name'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['name'] >
	>
	type $raggu_web_front_corpus_controls_facet__count_raggu_web_front_corpus_controls_28 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['community_count'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['count'] >
	>
	type $raggu_web_front_corpus_controls_facet__click_raggu_web_front_corpus_controls_29 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['community_toggle'] >
		,
		ReturnType< $raggu_web_front_corpus_controls_facet['click'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_30 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_32 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_corpus_controls_34 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls['clear_all'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_controls_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	export class $raggu_web_front_corpus_controls extends $mol_view {
		filtering( ): boolean
		Glass( ): $raggu_web_front_glass
		bar( ): readonly(any)[]
		Bar( ): $mol_view
		summary( ): readonly(any)[]
		Summary_line( ): $mol_view
		Summary( ): $mol_view
		search_box( ): readonly(any)[]
		search_label( ): string
		search( next?: string ): string
		search_input( next?: any ): any
		clear_label( ): string
		search_clear( next?: any ): any
		Search_clear_icon( ): $raggu_web_front_icon_close
		types_label( ): string
		types_count( ): number
		type_items( ): readonly(any)[]
		types_clear( next?: any ): any
		communities_label( ): string
		communities_count( ): number
		community_items( ): readonly(any)[]
		communities_clear( next?: any ): any
		type_active( id: any): boolean
		type_name( id: any): string
		type_count( id: any): number
		type_toggle( id: any, next?: any ): any
		community_active( id: any): boolean
		community_name( id: any): string
		community_count( id: any): number
		community_toggle( id: any, next?: any ): any
		matches_text( ): string
		no_matches_text( ): string
		clear_all( next?: any ): any
		clear_all_label( ): string
		viewer( ): $raggu_web_front_viewer
		attr( ): ({ 
			'raggu_web_front_corpus_controls_filtering': ReturnType< $raggu_web_front_corpus_controls['filtering'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Search( ): $mol_view
		Search_icon( ): $raggu_web_front_icon_search
		Search_input( ): $mol_view
		Search_clear( ): $mol_button
		Types( ): $raggu_web_front_corpus_controls_filter
		Communities( ): $raggu_web_front_corpus_controls_filter
		Type_item( id: any): $raggu_web_front_corpus_controls_facet
		Community_item( id: any): $raggu_web_front_corpus_controls_facet
		Matches( ): $mol_view
		No_matches( ): $mol_view
		Clear_all( ): $mol_button
		matches_label( ): string
		no_matches_label( ): string
		no_matches_hint( ): string
	}
	
	type $mol_view__dom_name_raggu_web_front_corpus_controls_filter_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_controls_filter_2 = $mol_type_enforce<
		({ 
			'class': ReturnType< $raggu_web_front_corpus_controls_filter['pane_class'] >,
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_filter_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_filter_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_controls_filter_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls_filter['label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_filter_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls_filter['items'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_corpus_controls_filter_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_controls_filter['clear'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_controls_filter_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	export class $raggu_web_front_corpus_controls_filter extends $raggu_web_front_pop {
		active( ): boolean
		pane_class( ): string
		Pane( ): $mol_view
		count_text( ): string
		Count( ): $mol_view
		Chevron( ): $raggu_web_front_icon_chevron
		Heading( ): $raggu_web_front_label
		List( ): $mol_view
		clear( next?: any ): any
		clear_label( ): string
		Clear( ): $mol_button
		label( ): string
		count( ): number
		items( ): readonly(any)[]
		bubble_width( ): string
		attr( ): ({ 
			'raggu_web_front_corpus_controls_filter_active': ReturnType< $raggu_web_front_corpus_controls_filter['active'] >,
		})  & ReturnType< $raggu_web_front_pop['attr'] >
		trigger_content( ): readonly(any)[]
		bubble_content( ): readonly(any)[]
	}
	
	type $mol_view__dom_name_raggu_web_front_corpus_controls_facet_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_facet_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_facet_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_controls_facet_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_controls_facet_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_corpus_controls_facet extends $mol_button {
		Box( ): $mol_view
		Name( ): $mol_view
		Count( ): $mol_view
		active( ): boolean
		name( ): string
		count( ): number
		attr( ): ({ 
			'aria-pressed': ReturnType< $raggu_web_front_corpus_controls_facet['active'] >,
		})  & ReturnType< $mol_button['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=controls.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_raggu_web_front_corpus_loader_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_loader_8 = $mol_type_enforce<
		({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_loader_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_loader_10 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_loader_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_loader['label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_loader_12 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_loader_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_loader['percent'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_loader_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_loader_15 = $mol_type_enforce<
		({ 
			'role': string,
			'aria-live': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_loader_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_corpus_loader extends $mol_view {
		Face1( ): $mol_view
		Face2( ): $mol_view
		Face3( ): $mol_view
		Face4( ): $mol_view
		Face5( ): $mol_view
		Face6( ): $mol_view
		Solid( ): $mol_view
		Label( ): $raggu_web_front_label
		Percent( ): $raggu_web_front_label
		Caption( ): $mol_view
		label( ): string
		percent( ): string
		quiet( ): boolean
		attr( ): ({ 
			'raggu_web_front_corpus_loader_quiet': ReturnType< $raggu_web_front_corpus_loader['quiet'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=loader.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_circle extends $mol_svg {
		radius( ): string
		pos_x( ): string
		pos_y( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'r': ReturnType< $mol_svg_circle['radius'] >,
			'cx': ReturnType< $mol_svg_circle['pos_x'] >,
			'cy': ReturnType< $mol_svg_circle['pos_y'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	export class $raggu_web_front_rich extends $mol_view {
		has_html( ): boolean
		plain( ): boolean
		html( ): string
		text( ): string
		attr( ): ({ 
			'raggu_web_front_rich_html': ReturnType< $raggu_web_front_rich['has_html'] >,
			'raggu_web_front_rich_plain': ReturnType< $raggu_web_front_rich['plain'] >,
		})  & ReturnType< $mol_view['attr'] >
		field( ): ({ 
			'innerHTML': ReturnType< $raggu_web_front_rich['html'] >,
		})  & ReturnType< $mol_view['field'] >
	}
	
}

//# sourceMappingURL=rich.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_raggu_web_front_disclosure_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_disclosure_2 = $mol_type_enforce<
		({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__dom_name_raggu_web_front_disclosure_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_disclosure_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_disclosure_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_disclosure['hint'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_disclosure_6 = $mol_type_enforce<
		({ 
			'aria-expanded': ReturnType< $raggu_web_front_disclosure['open'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_disclosure_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_disclosure['toggle'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_disclosure_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_disclosure_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_disclosure['actions'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_disclosure_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_disclosure_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_disclosure['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_disclosure_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_disclosure extends $mol_view {
		Plate( ): $mol_view
		toggle( next?: any ): any
		Count( ): $mol_view
		Toggle( ): $mol_button
		actions( ): readonly(any)[]
		Actions( ): $mol_view
		Head( ): $mol_view
		body( ): readonly(any)[]
		Body( ): $mol_view
		Fold( ): $mol_view
		label( ): string
		count_text( ): string
		hint( ): string
		open( next?: boolean ): boolean
		Icon( ): $raggu_web_front_icon_sources
		attr( ): ({ 
			'raggu_web_front_disclosure_open': ReturnType< $raggu_web_front_disclosure['open'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=disclosure.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_raggu_web_front_corpus_detail_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_svg_circle__pos_raggu_web_front_corpus_detail_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_circle['pos'] >
	>
	type $mol_svg_circle__radius_raggu_web_front_corpus_detail_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_svg_circle['radius'] >
	>
	type $mol_svg_path__geometry_raggu_web_front_corpus_detail_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_root__view_box_raggu_web_front_corpus_detail_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg_root['view_box'] >
	>
	type $mol_svg_root__sub_raggu_web_front_corpus_detail_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_root['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_detail_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['entity_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['chips'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_detail_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['close_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_detail_17 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_detail['close_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_detail_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['close'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_detail_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_22 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['scroll_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_corpus_detail_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['ask'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_detail_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_detail_25 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['relations_title'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['relation_rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_28 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_30 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_detail_32 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['chunk_id'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_detail_33 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['chunk_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__hint_raggu_web_front_corpus_detail_34 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['hint_title'] >
		,
		ReturnType< $mol_view['hint'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_home_chip__text_raggu_web_front_corpus_detail_37 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['type_name'] >
		,
		ReturnType< $raggu_web_front_home_chip['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_detail_39 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['failed_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_rich__text_raggu_web_front_corpus_detail_40 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['description'] >
		,
		ReturnType< $raggu_web_front_rich['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_detail_41 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_corpus_detail_43 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['relation_pick'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_detail_44 = $mol_type_enforce<
		({ 
			'raggu_web_front_corpus_detail_relation_out': ReturnType< $raggu_web_front_corpus_detail['relation_out'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_detail_45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_disclosure__label_raggu_web_front_corpus_detail_46 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['provenance_label'] >
		,
		ReturnType< $raggu_web_front_disclosure['label'] >
	>
	type $raggu_web_front_disclosure__count_text_raggu_web_front_corpus_detail_47 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['chunks_count'] >
		,
		ReturnType< $raggu_web_front_disclosure['count_text'] >
	>
	type $raggu_web_front_disclosure__body_raggu_web_front_corpus_detail_48 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_detail['chunk_rows'] >
		,
		ReturnType< $raggu_web_front_disclosure['body'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_detail_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $raggu_web_front_corpus_detail extends $mol_view {
		entity_label( ): string
		open( ): boolean
		Glass( ): $raggu_web_front_glass
		content( ): readonly(any)[]
		Content( ): $mol_view
		hint_title( ): string
		Hint_dot( ): $mol_svg_circle
		Hint_cursor( ): $mol_svg_path
		Hint_glyph( ): $mol_svg_root
		Hint_badge( ): $mol_view
		hint_text( ): string
		Hint_text( ): $mol_view
		Kind( ): $raggu_web_front_label
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		chips( ): readonly(any)[]
		Chips( ): $mol_view
		Head_text( ): $mol_view
		close_label( ): string
		close( next?: any ): any
		Close_icon( ): $raggu_web_front_icon_close
		Close( ): $mol_button
		Head( ): $mol_view
		scroll_content( ): readonly(any)[]
		Scroll( ): $mol_view
		ask( next?: any ): any
		Ask_icon( ): $raggu_web_front_icon_chat
		ask_label( ): string
		Ask( ): $mol_button
		type_name( ): string
		Line1( ): $raggu_web_front_skeleton
		Line2( ): $raggu_web_front_skeleton
		Line3( ): $raggu_web_front_skeleton
		failed_text( ): string
		description( ): string
		relations_title( ): string
		Relations_label( ): $raggu_web_front_label
		relation_rows( ): readonly(any)[]
		Relations_list( ): $mol_view
		relation_pick( id: any, next?: any ): any
		relation_out( id: any): boolean
		relation_type( id: any): string
		Relation_type( id: any): $mol_view
		relation_other( id: any): string
		Relation_other( id: any): $mol_view
		provenance_label( ): string
		chunks_count( ): string
		chunk_rows( ): readonly(any)[]
		chunk_id( id: any): string
		Chunk_id( id: any): $raggu_web_front_label
		chunk_text( id: any): string
		Chunk_text( id: any): $raggu_web_front_text
		dom_name( ): string
		viewer( ): $raggu_web_front_viewer
		dense( ): boolean
		hint( ): boolean
		waiting( ): boolean
		attr( ): ({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_detail['entity_label'] >,
			'raggu_web_front_corpus_detail_open': ReturnType< $raggu_web_front_corpus_detail['open'] >,
			'raggu_web_front_corpus_detail_dense': ReturnType< $raggu_web_front_corpus_detail['dense'] >,
			'raggu_web_front_corpus_detail_waiting': ReturnType< $raggu_web_front_corpus_detail['waiting'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Hint( ): $mol_view
		Body( ): $mol_view
		Title_skeleton( ): $raggu_web_front_skeleton
		Type_chip( ): $raggu_web_front_home_chip
		Lines( ): $mol_view
		Failed( ): $raggu_web_front_text
		Description( ): $raggu_web_front_rich
		Relations( ): $mol_view
		Relation( id: any): $mol_button
		Chunks( ): $raggu_web_front_disclosure
		Chunk( id: any): $mol_view
		relations_label( ): string
		ask_template( ): string
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map
declare namespace $ {

	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['chat_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['head_tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_5 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['scroll_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['starters'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_chat_9 = $mol_type_enforce<
		({ 
			'rows': number,
			'placeholder': ReturnType< $raggu_web_front_corpus_chat['placeholder'] >,
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['placeholder'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__field_raggu_web_front_corpus_chat_10 = $mol_type_enforce<
		({ 
			'value': ReturnType< $raggu_web_front_corpus_chat['draft'] >,
		})  & ReturnType< $mol_view['field'] >
		,
		ReturnType< $mol_view['field'] >
	>
	type $mol_view__event_raggu_web_front_corpus_chat_11 = $mol_type_enforce<
		({ 
			input( next?: ReturnType< $raggu_web_front_corpus_chat['draft_input'] > ): ReturnType< $raggu_web_front_corpus_chat['draft_input'] >,
			keydown( next?: ReturnType< $raggu_web_front_corpus_chat['draft_key'] > ): ReturnType< $raggu_web_front_corpus_chat['draft_key'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['action'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__event_raggu_web_front_corpus_chat_14 = $mol_type_enforce<
		({ 
			submit( next?: ReturnType< $raggu_web_front_corpus_chat['submit'] > ): ReturnType< $raggu_web_front_corpus_chat['submit'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['empty_title'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['empty_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['entry_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['agent_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['answer'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_21 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['agent_sources'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_22 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['agent_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_23 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['streaming_answer'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_24 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_25 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_28 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['thinking_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_chat_29 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_30 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['elapsed'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_32 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['thinking_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_35 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['failure_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_36 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['failure_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_37 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['starter_send'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_39 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_pop__hint_raggu_web_front_corpus_chat_40 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_label'] >
		,
		ReturnType< $raggu_web_front_pop['hint'] >
	>
	type $raggu_web_front_pop__bubble_width_raggu_web_front_corpus_chat_41 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_pop['bubble_width'] >
	>
	type $raggu_web_front_pop__trigger_content_raggu_web_front_corpus_chat_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_pop['trigger_content'] >
	>
	type $raggu_web_front_pop__bubble_content_raggu_web_front_corpus_chat_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_pop['bubble_content'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_chat_44 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_45 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_row_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_46 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_chat_48 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_49 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['energy_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_50 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_51 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_52 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['plan_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_53 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_54 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_plan'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_55 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_57 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['source_group_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_58 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_59 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['source_group_items'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_60 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['source_chunk_text'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_corpus_chat_61 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_62 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['engine'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_chat_63 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sweep_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_chat_64 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['sweep_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_65 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sweep'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_66 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_chat_67 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['hide_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_chat_68 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['hide_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_69 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['hide'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_71 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_72 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_73 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['thread'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_75 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_76 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_77 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_78 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_79 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_80 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_chat_81 = $mol_type_enforce<
		({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_82 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_83 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_chat_84 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['citation_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_chat_85 = $mol_type_enforce<
		({ 
			'class': string,
			'data-ref': ReturnType< $raggu_web_front_corpus_chat['ref_id'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_86 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['ref_pick'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_87 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_88 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_corpus_chat_89 = $mol_type_enforce<
		({ 
			'class': string,
			'data-ref': ReturnType< $raggu_web_front_corpus_chat['ref_id'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_90 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_91 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_92 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_93 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_94 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['failure_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_95 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_96 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_chat_97 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['send_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_chat_98 = $mol_type_enforce<
		({ 
			'type': string,
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['send_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__enabled_raggu_web_front_corpus_chat_99 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['send_enabled'] >
		,
		ReturnType< $mol_button['enabled'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_100 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['send_click'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_101 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_button__hint_raggu_web_front_corpus_chat_102 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['stop_label'] >
		,
		ReturnType< $mol_button['hint'] >
	>
	type $mol_button__attr_raggu_web_front_corpus_chat_103 = $mol_type_enforce<
		({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['stop_label'] >,
		})  & ReturnType< $mol_button['attr'] >
		,
		ReturnType< $mol_button['attr'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_104 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['stop'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_105 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $raggu_web_front_disclosure__label_raggu_web_front_corpus_chat_106 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sources_label'] >
		,
		ReturnType< $raggu_web_front_disclosure['label'] >
	>
	type $raggu_web_front_disclosure__hint_raggu_web_front_corpus_chat_107 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sources_hint'] >
		,
		ReturnType< $raggu_web_front_disclosure['hint'] >
	>
	type $raggu_web_front_disclosure__count_text_raggu_web_front_corpus_chat_108 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sources_count'] >
		,
		ReturnType< $raggu_web_front_disclosure['count_text'] >
	>
	type $raggu_web_front_disclosure__actions_raggu_web_front_corpus_chat_109 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_disclosure['actions'] >
	>
	type $raggu_web_front_disclosure__body_raggu_web_front_corpus_chat_110 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['sources_body'] >
		,
		ReturnType< $raggu_web_front_disclosure['body'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_corpus_chat_111 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_112 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_113 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['meta_rows'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_114 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_115 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_116 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_117 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_118 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_119 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button__click_raggu_web_front_corpus_chat_120 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['source_entity_pick'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_chat_121 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_122 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_123 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_corpus_chat_124 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_chat_125 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_chat_126 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus_chat['no_sources_label'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	export class $raggu_web_front_corpus_chat extends $mol_view {
		chat_label( ): string
		Glass( ): $raggu_web_front_glass
		Head_label( ): $raggu_web_front_label
		head_tools( ): readonly(any)[]
		Head_tools( ): $mol_view
		Head( ): $mol_view
		scroll_content( ): readonly(any)[]
		Scroll( ): $mol_view
		starters( ): readonly(any)[]
		Starters( ): $mol_view
		submit( next?: any ): any
		placeholder( ): string
		draft( next?: string ): string
		draft_input( next?: any ): any
		draft_key( next?: any ): any
		Input( ): $mol_view
		action( ): readonly(any)[]
		Action( ): $mol_view
		Form( ): $mol_view
		engine( ): string
		sweep_label( ): string
		sweep( next?: any ): any
		Sweep_icon( ): $raggu_web_front_icon_sweep
		hide_label( ): string
		hide( next?: any ): any
		Hide_icon( ): $raggu_web_front_icon_close
		empty_title( ): string
		Empty_title( ): $raggu_web_front_text
		empty_hint( ): string
		Empty_hint( ): $raggu_web_front_text
		thread( ): readonly(any)[]
		entry_text( id: any): string
		User_text( id: any): $raggu_web_front_text
		agent_label( ): string
		Agent_label( id: any): $raggu_web_front_label
		answer( id: any): readonly(any)[]
		Answer( id: any): $mol_view
		agent_sources( id: any): readonly(any)[]
		Agent_sources( id: any): $mol_view
		Streaming_label( ): $raggu_web_front_label
		streaming_answer( ): readonly(any)[]
		Streaming_answer( ): $mol_view
		strong_text( id: any): string
		citation_label( ): string
		ref_id( id: any): string
		ref_pick( id: any, next?: any ): any
		ref_text( id: any): string
		Ping_wave( ): $mol_view
		Ping_dot( ): $mol_view
		Ping( ): $mol_view
		thinking_label( ): string
		Thinking( ): $raggu_web_front_text
		elapsed( ): string
		Elapsed( ): $raggu_web_front_label
		Pending_head( ): $mol_view
		thinking_hint( ): string
		Thinking_hint( ): $raggu_web_front_text
		Bar1( ): $raggu_web_front_skeleton
		Bar2( ): $raggu_web_front_skeleton
		Bar3( ): $raggu_web_front_skeleton
		Bars( ): $mol_view
		Pending_box( ): $mol_view
		failure_text( ): string
		Failure_title( ): $raggu_web_front_text
		failure_hint( ): string
		Failure_hint( ): $raggu_web_front_text
		failure_content( ): readonly(any)[]
		starter_send( id: any, next?: any ): any
		starter_text( id: any): string
		Starter_button( id: any): $mol_button
		send_label( ): string
		send_enabled( ): boolean
		send_click( next?: any ): any
		Send_icon( ): $raggu_web_front_icon_send
		stop_label( ): string
		stop( next?: any ): any
		Stop_icon( ): $raggu_web_front_icon_stop
		sources_label( ): string
		sources_hint( ): string
		sources_count( id: any): string
		meta_label( ): string
		Meta_icon( id: any): $raggu_web_front_icon_info
		meta_body( id: any): readonly(any)[]
		Meta_body( id: any): $mol_view
		Meta( id: any): $raggu_web_front_pop
		sources_body( id: any): readonly(any)[]
		meta_rows( id: any): readonly(any)[]
		meta_row_label( id: any): string
		Meta_row_label( id: any): $raggu_web_front_label
		meta_row_value( id: any): string
		Meta_row_value( id: any): $mol_view
		energy_label( ): string
		Meta_energy_label( id: any): $raggu_web_front_label
		meta_energy( id: any): string
		Meta_energy_value( id: any): $mol_view
		plan_label( ): string
		Meta_plan_label( id: any): $raggu_web_front_label
		meta_plan( id: any): readonly(any)[]
		Meta_plan_list( id: any): $mol_view
		plan_index( id: any): string
		Plan_index( id: any): $mol_view
		plan_text( id: any): string
		source_group_label( id: any): string
		Source_group_label( id: any): $raggu_web_front_label
		source_group_items( id: any): readonly(any)[]
		Source_group_list( id: any): $mol_view
		source_entity_pick( id: any, next?: any ): any
		source_entity_text( id: any): string
		source_relation_text( id: any): string
		source_chunk_text( id: any): string
		Source_chunk_text( id: any): $raggu_web_front_text
		no_sources_label( ): string
		dom_name( ): string
		viewer( ): $raggu_web_front_viewer
		attr( ): ({ 
			'aria-label': ReturnType< $raggu_web_front_corpus_chat['chat_label'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Engine( ): $raggu_web_front_label
		Sweep( ): $mol_button
		Hide( ): $mol_button
		Empty( ): $mol_view
		Thread( ): $mol_view
		User( id: any): $mol_view
		Agent( id: any): $mol_view
		Streaming( ): $mol_view
		Caret( ): $mol_view
		Strong( id: any): $mol_view
		Ref( id: any): $mol_button
		Ref_muted( id: any): $mol_view
		Pending( ): $mol_view
		Failure( ): $mol_view
		Starter( id: any): $mol_view
		Send( ): $mol_button
		Stop( ): $mol_button
		Sources( id: any): $raggu_web_front_disclosure
		Meta_title( id: any): $raggu_web_front_label
		Meta_rows( id: any): $mol_view
		Meta_row( id: any): $mol_view
		Meta_energy( id: any): $mol_view
		Meta_plan( id: any): $mol_view
		Plan_item( id: any): $mol_view
		Source_group( id: any): $mol_view
		Source_entity( id: any): $mol_button
		Source_relation( id: any): $mol_view
		Source_chunk( id: any): $mol_view
		No_sources( id: any): $raggu_web_front_text
		entities_label( ): string
		relations_label( ): string
		chunks_label( ): string
		engine_label( ): string
		top_k_label( ): string
		rerank_label( ): string
		retrieval_label( ): string
		generation_label( ): string
		total_label( ): string
		on_label( ): string
		off_label( ): string
		elapsed_label( ): string
		failed_label( ): string
		rate_limited_label( ): string
		client_daily_limit_label( ): string
		daily_limit_label( ): string
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_raggu_web_front_corpus_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['row'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['failed_title'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_corpus_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['failed_hint'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $mol_button__click_raggu_web_front_corpus_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['retry'] >
		,
		ReturnType< $mol_button['click'] >
	>
	type $mol_button__sub_raggu_web_front_corpus_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['graph_column'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_corpus_controls__viewer_raggu_web_front_corpus_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['viewer'] >
		,
		ReturnType< $raggu_web_front_corpus_controls['viewer'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['stage_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_corpus_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_corpus_loader__label_raggu_web_front_corpus_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['loading_label'] >
		,
		ReturnType< $raggu_web_front_corpus_loader['label'] >
	>
	type $raggu_web_front_corpus_loader__percent_raggu_web_front_corpus_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['percent'] >
		,
		ReturnType< $raggu_web_front_corpus_loader['percent'] >
	>
	type $raggu_web_front_corpus_loader__quiet_raggu_web_front_corpus_12 = $mol_type_enforce<
		boolean
		,
		ReturnType< $raggu_web_front_corpus_loader['quiet'] >
	>
	type $raggu_web_front_corpus_loader__label_raggu_web_front_corpus_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['loading_label'] >
		,
		ReturnType< $raggu_web_front_corpus_loader['label'] >
	>
	type $raggu_web_front_corpus_detail__viewer_raggu_web_front_corpus_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['viewer'] >
		,
		ReturnType< $raggu_web_front_corpus_detail['viewer'] >
	>
	type $raggu_web_front_corpus_detail__dense_raggu_web_front_corpus_15 = $mol_type_enforce<
		boolean
		,
		ReturnType< $raggu_web_front_corpus_detail['dense'] >
	>
	type $raggu_web_front_corpus_detail__viewer_raggu_web_front_corpus_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['viewer'] >
		,
		ReturnType< $raggu_web_front_corpus_detail['viewer'] >
	>
	type $raggu_web_front_corpus_detail__hint_raggu_web_front_corpus_17 = $mol_type_enforce<
		boolean
		,
		ReturnType< $raggu_web_front_corpus_detail['hint'] >
	>
	type $raggu_web_front_corpus_detail__waiting_raggu_web_front_corpus_18 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['cold'] >
		,
		ReturnType< $raggu_web_front_corpus_detail['waiting'] >
	>
	type $raggu_web_front_corpus_chat__viewer_raggu_web_front_corpus_19 = $mol_type_enforce<
		ReturnType< $raggu_web_front_corpus['viewer'] >
		,
		ReturnType< $raggu_web_front_corpus_chat['viewer'] >
	>
	export class $raggu_web_front_corpus extends $mol_view {
		chat_open( ): boolean
		graph_open( ): boolean
		hint_only( ): boolean
		Spacer( ): $mol_view
		row( ): readonly(any)[]
		Row( ): $mol_view
		graph_column( ): readonly(any)[]
		stage_content( ): readonly(any)[]
		Failed_glass( ): $raggu_web_front_glass
		failed_title( ): string
		Failed_title( ): $raggu_web_front_text
		failed_hint( ): string
		Failed_hint( ): $raggu_web_front_text
		retry( next?: any ): any
		retry_label( ): string
		Failed_retry( ): $mol_button
		loading_label( ): string
		percent( ): string
		cold( ): boolean
		viewer( ): $raggu_web_front_viewer
		attr( ): ({ 
			'raggu_web_front_corpus_chatting': ReturnType< $raggu_web_front_corpus['chat_open'] >,
			'raggu_web_front_corpus_graphing': ReturnType< $raggu_web_front_corpus['graph_open'] >,
			'raggu_web_front_corpus_hint_only': ReturnType< $raggu_web_front_corpus['hint_only'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
		Graph( ): $mol_view
		Controls( ): $raggu_web_front_corpus_controls
		Stage( ): $mol_view
		Failed( ): $mol_view
		Cold( ): $raggu_web_front_corpus_loader
		Warm( ): $raggu_web_front_corpus_loader
		Compact( ): $raggu_web_front_corpus_detail
		Detail( ): $raggu_web_front_corpus_detail
		Chat( ): $raggu_web_front_corpus_chat
	}
	
}

//# sourceMappingURL=corpus.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_raggu_web_front_home_constellation_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_constellation['links'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__geometry_raggu_web_front_home_constellation_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_constellation['points'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__geometry_raggu_web_front_home_constellation_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_constellation['hubs'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $raggu_web_front_home_constellation extends $mol_svg_root {
		links( ): string
		Links( ): $mol_svg_path
		points( ): string
		Points( ): $mol_svg_path
		hubs( ): string
		Hubs( ): $mol_svg_path
		seed( ): string
		nodes( ): number
		edges( ): number
		view_box( ): string
		aspect( ): string
		attr( ): ({ 
			'aria-hidden': string,
		})  & ReturnType< $mol_svg_root['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=constellation.view.tree.d.ts.map
declare namespace $ {

	type $raggu_web_front_home_constellation__seed_raggu_web_front_home_card_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['id'] >
		,
		ReturnType< $raggu_web_front_home_constellation['seed'] >
	>
	type $raggu_web_front_home_constellation__nodes_raggu_web_front_home_card_2 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['nodes'] >
		,
		ReturnType< $raggu_web_front_home_constellation['nodes'] >
	>
	type $raggu_web_front_home_constellation__edges_raggu_web_front_home_card_3 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['edges'] >
		,
		ReturnType< $raggu_web_front_home_constellation['edges'] >
	>
	type $raggu_web_front_home_chip__text_raggu_web_front_home_card_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['domain'] >
		,
		ReturnType< $raggu_web_front_home_chip['text'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_card_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_text__text_raggu_web_front_home_card_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['description'] >
		,
		ReturnType< $raggu_web_front_text['text'] >
	>
	type $raggu_web_front_home_card_stat__value_raggu_web_front_home_card_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['nodes_text'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['value'] >
	>
	type $raggu_web_front_home_card_stat__label_raggu_web_front_home_card_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['entities_label'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['label'] >
	>
	type $raggu_web_front_home_card_stat__value_raggu_web_front_home_card_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['edges_text'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['value'] >
	>
	type $raggu_web_front_home_card_stat__label_raggu_web_front_home_card_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['relations_label'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['label'] >
	>
	type $raggu_web_front_home_card_stat__value_raggu_web_front_home_card_13 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['communities_text'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['value'] >
	>
	type $raggu_web_front_home_card_stat__label_raggu_web_front_home_card_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['communities_label'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['label'] >
	>
	type $raggu_web_front_home_card_stat__value_raggu_web_front_home_card_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['chunks_text'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['value'] >
	>
	type $raggu_web_front_home_card_stat__label_raggu_web_front_home_card_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['chunks_label'] >
		,
		ReturnType< $raggu_web_front_home_card_stat['label'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_card_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_card_19 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_20 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['types'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__dom_name_raggu_web_front_home_card_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_link__arg_raggu_web_front_home_card_24 = $mol_type_enforce<
		({ 
			'corpus': ReturnType< $raggu_web_front_home_card['id'] >,
		}) 
		,
		ReturnType< $raggu_web_front_link['arg'] >
	>
	type $raggu_web_front_link__hint_raggu_web_front_home_card_25 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['link_label'] >
		,
		ReturnType< $raggu_web_front_link['hint'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_home_card_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $raggu_web_front_home_chip__text_raggu_web_front_home_card_27 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card['type_name'] >
		,
		ReturnType< $raggu_web_front_home_chip['text'] >
	>
	export class $raggu_web_front_home_card extends $raggu_web_front_reveal {
		Glass( ): $raggu_web_front_glass
		id( ): string
		link_label( ): string
		nodes( ): number
		edges( ): number
		Constellation( ): $raggu_web_front_home_constellation
		Shade( ): $mol_view
		domain( ): string
		Domain( ): $raggu_web_front_home_chip
		Preview( ): $mol_view
		title( ): string
		Title( ): $mol_view
		description( ): string
		Description( ): $raggu_web_front_text
		nodes_text( ): string
		entities_label( ): string
		Stat_nodes( ): $raggu_web_front_home_card_stat
		edges_text( ): string
		relations_label( ): string
		Stat_edges( ): $raggu_web_front_home_card_stat
		communities_text( ): string
		communities_label( ): string
		Stat_communities( ): $raggu_web_front_home_card_stat
		chunks_text( ): string
		chunks_label( ): string
		Stat_chunks( ): $raggu_web_front_home_card_stat
		Stats( ): $mol_view
		types( ): readonly(any)[]
		Types( ): $mol_view
		open_label( ): string
		Open_arrow( ): $raggu_web_front_icon_arrow
		Open( ): $mol_view
		Body( ): $mol_view
		Link( ): $raggu_web_front_link
		type_name( id: any): string
		dom_name( ): string
		dataset( ): any
		featured( ): boolean
		attr( ): ({ 
			'raggu_web_front_home_card_featured': ReturnType< $raggu_web_front_home_card['featured'] >,
		})  & ReturnType< $raggu_web_front_reveal['attr'] >
		sub( ): readonly(any)[]
		Type( id: any): $raggu_web_front_home_chip
		open_graph_label( ): string
	}
	
	type $mol_view__dom_name_raggu_web_front_home_card_stat_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_raggu_web_front_home_card_stat_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_label__dom_name_raggu_web_front_home_card_stat_3 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_label['dom_name'] >
	>
	type $raggu_web_front_label__text_raggu_web_front_home_card_stat_4 = $mol_type_enforce<
		ReturnType< $raggu_web_front_home_card_stat['label'] >
		,
		ReturnType< $raggu_web_front_label['text'] >
	>
	export class $raggu_web_front_home_card_stat extends $mol_view {
		Value( ): $mol_view
		Label( ): $raggu_web_front_label
		value( ): string
		label( ): string
		sub( ): readonly(any)[]
	}
	
	export class $raggu_web_front_home_chip extends $raggu_web_front_label {
		dom_name( ): string
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
declare namespace $ {

	type $bog_favicon__Icon_raggu_web_front_app_1 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Favicon_icon'] >
		,
		ReturnType< $bog_favicon['Icon'] >
	>
	type $raggu_web_front_link__uri_raggu_web_front_app_2 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_app_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $mol_view__sub_raggu_web_front_app_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_app_5 = $mol_type_enforce<
		({ 
			'aria-hidden': string,
			'raggu_web_front_app_backdrop_quiet': ReturnType< $raggu_web_front_app['quiet'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_app_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_scene__viewer_raggu_web_front_app_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_scene['viewer'] >
	>
	type $raggu_web_front_scene__lights_raggu_web_front_app_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_resolved'] >
		,
		ReturnType< $raggu_web_front_scene['lights'] >
	>
	type $raggu_web_front_chrome__viewer_raggu_web_front_app_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_chrome['viewer'] >
	>
	type $raggu_web_front_chrome__theme_choice_raggu_web_front_app_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_choice'] >
		,
		ReturnType< $raggu_web_front_chrome['theme_choice'] >
	>
	type $raggu_web_front_chrome__theme_resolved_raggu_web_front_app_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_resolved'] >
		,
		ReturnType< $raggu_web_front_chrome['theme_resolved'] >
	>
	type $raggu_web_front_chrome__open_settings_raggu_web_front_app_12 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['open_settings'] >
		,
		ReturnType< $raggu_web_front_chrome['open_settings'] >
	>
	type $mol_view__dom_name_raggu_web_front_app_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_app_14 = $mol_type_enforce<
		({ 
			'id': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_app_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['main'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_settings__showed_raggu_web_front_app_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['settings_open'] >
		,
		ReturnType< $raggu_web_front_settings['showed'] >
	>
	type $raggu_web_front_corpus__viewer_raggu_web_front_app_17 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_corpus['viewer'] >
	>
	export class $raggu_web_front_app extends $raggu_web_front_base {
		Favicon_icon( ): $raggu_web_front_mark_icon
		Favicon( ): $bog_favicon
		corpus_page( ): boolean
		skip_label( ): string
		Skip( ): $raggu_web_front_link
		quiet( ): boolean
		Backdrop_base( ): $mol_view
		Aurora_a( ): $mol_view
		Aurora_b( ): $mol_view
		Aurora_c( ): $mol_view
		Aurora( ): $mol_view
		Vignette( ): $mol_view
		Grain( ): $mol_view
		Backdrop( ): $mol_view
		theme_resolved( ): string
		Scene( ): $raggu_web_front_scene
		theme_choice( next?: string ): string
		open_settings( next?: any ): any
		Chrome( ): $raggu_web_front_chrome
		main( ): readonly(any)[]
		Main( ): $mol_view
		settings_open( next?: boolean ): boolean
		Settings( ): $raggu_web_front_settings
		title( ): string
		Viewer( ): $raggu_web_front_viewer
		plugins( ): readonly(any)[]
		attr( ): ({ 
			'raggu_web_front_app_corpus': ReturnType< $raggu_web_front_app['corpus_page'] >,
		})  & ReturnType< $raggu_web_front_base['attr'] >
		sub( ): readonly(any)[]
		Home( ): $raggu_web_front_home
		Corpus( ): $raggu_web_front_corpus
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
export = $;
//# sourceMappingURL=node.d.ts.map
