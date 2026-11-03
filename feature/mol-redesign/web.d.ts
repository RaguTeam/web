declare namespace $ {
    /**
     * Fails if `Actual` type is not subtype of `Expected`.
     */
    type $mol_type_enforce<Actual extends Expected, Expected> = Actual;
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
        static $: $;
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    /** Logger event data */
    type $mol_log3_event<Fields> = {
        [key in string]: unknown;
    } & {
        /** Time of event creation */
        time?: string;
        /** Place of event creation */
        place: unknown;
        /** Short description of event */
        message: string;
    } & Fields;
    /** Logger function */
    type $mol_log3_logger<Fields, Res = void> = (this: $, event: $mol_log3_event<Fields>) => Res;
    /** Log begin of some task */
    let $mol_log3_come: $mol_log3_logger<{}>;
    /** Log end of some task */
    let $mol_log3_done: $mol_log3_logger<{}>;
    /** Log error */
    let $mol_log3_fail: $mol_log3_logger<{}>;
    /** Log warning message */
    let $mol_log3_warn: $mol_log3_logger<{
        hint: string;
    }>;
    /** Log some generic event */
    let $mol_log3_rise: $mol_log3_logger<{}>;
    /** Log begin of log group, returns func to close group */
    let $mol_log3_area: $mol_log3_logger<{}, () => void>;
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(this: $, event: $mol_log3_event<{}>): () => void;
    let $mol_log3_stack: (() => void)[];
}

declare namespace $ {
    function $mol_log3_web_make(level: $mol_type_keys_extract<Console, Function>, color: string): (this: $, event: $mol_log3_event<{}>) => () => void;
}

declare namespace $ {
    /**
     * Extracts keys from `Input` which values extends `Upper` and extendable by `Lower`.
     *
     * 	type MathConstants = $mol_type_keys_extract< Math , number > // "E" | "PI" ...
     */
    type $mol_type_keys_extract<Input, Upper, Lower = never> = {
        [Field in keyof Input]: unknown extends Input[Field] ? never : Input[Field] extends never ? never : Input[Field] extends Upper ? [
            Lower
        ] extends [Input[Field]] ? Field : never : never;
    }[keyof Input];
}

declare namespace $ {
    /** Returns error type, that don't match to normal value. */
    type $mol_type_error<Message, Info = {}> = Message & {
        $mol_type_error: Info;
    };
}

declare namespace $ {
    /**
     * Asserts for equality of `Actual` and `Expected` types.
     */
    type $mol_type_assert<Actual extends $mol_type_equals<Actual, Expected> extends true ? unknown : $mol_type_equals<Actual, any> extends true ? never : $mol_type_error<'Assert failed', {
        actual: Actual;
        expected: Expected;
    }>, Expected extends $mol_type_equals<Actual, Expected> extends true ? unknown : $mol_type_equals<Expected, any> extends true ? never : $mol_type_error<'Assert failed', {
        actual: Actual;
        expected: Expected;
    }>> = Actual;
    /**
     * Asserts for `Actual` type is `never`.
     * @deprecated Use `$mol_type_assert< A, B >`
     *
     * 	$mol_type_assert_never< $mol_type_equals< 1 , 2 > >
     */
    type $mol_type_assert_never<Actual extends never> = Actual;
}

declare namespace $ {
    /**
     * Return `unknown` when `A` and `B` are the same type. `never` otherwise.
     *
     * 	$mol_type_equals< unknown , any > & number // true
     * 	$mol_type_equals< never , never > & number // false
     */
    type $mol_type_equals<A, B> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? true : false;
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    var $mol_dom: typeof globalThis;
}

declare namespace $ {
    function $mol_style_attach(id: string, text: string): HTMLStyleElement | null;
}

declare namespace $ {
    class $mol_decor<Value> {
        readonly value: Value;
        constructor(value: Value);
        prefix(): string;
        valueOf(): Value;
        postfix(): string;
        toString(): string;
    }
}

declare namespace $ {
    type $mol_style_unit_length = '%' | 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh' | 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax';
    type $mol_style_unit_angle = 'deg' | 'rad' | 'grad' | 'turn';
    type $mol_style_unit_time = 's' | 'ms';
    type $mol_style_unit_any = $mol_style_unit_length | $mol_style_unit_angle | $mol_style_unit_time;
    type $mol_style_unit_str<Quanity extends $mol_style_unit_any = $mol_style_unit_any> = `${number}${Quanity}`;
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit<Literal extends $mol_style_unit_any> extends $mol_decor<number> {
        readonly literal: Literal;
        constructor(value: number, literal: Literal);
        postfix(): Literal;
        static per(value: number): `${number}%`;
        static px(value: number): `${number}px`;
        static mm(value: number): `${number}mm`;
        static cm(value: number): `${number}cm`;
        static Q(value: number): `${number}Q`;
        static in(value: number): `${number}in`;
        static pc(value: number): `${number}pc`;
        static pt(value: number): `${number}pt`;
        static cap(value: number): `${number}cap`;
        static ch(value: number): `${number}ch`;
        static em(value: number): `${number}em`;
        static rem(value: number): `${number}rem`;
        static ex(value: number): `${number}ex`;
        static ic(value: number): `${number}ic`;
        static lh(value: number): `${number}lh`;
        static rlh(value: number): `${number}rlh`;
        static vh(value: number): `${number}vh`;
        static vw(value: number): `${number}vw`;
        static vi(value: number): `${number}vi`;
        static vb(value: number): `${number}vb`;
        static vmin(value: number): `${number}vmin`;
        static vmax(value: number): `${number}vmax`;
        static deg(value: number): `${number}deg`;
        static rad(value: number): `${number}rad`;
        static grad(value: number): `${number}grad`;
        static turn(value: number): `${number}turn`;
        static s(value: number): `${number}s`;
        static ms(value: number): `${number}ms`;
    }
}

declare namespace $ {
    type $mol_style_func_name = 'calc' | 'hsla' | 'rgba' | 'var' | 'clamp' | 'scale' | 'cubic-bezier' | 'linear' | 'steps' | $mol_style_func_image | $mol_style_func_filter;
    type $mol_style_func_image = 'url' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient';
    type $mol_style_func_filter = 'blur' | 'brightness' | 'contrast' | 'drop-shadow' | 'grayscale' | 'hue-rotate' | 'invert' | 'opacity' | 'sepia' | 'saturate';
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func<Name extends $mol_style_func_name, Value = unknown> extends $mol_decor<Value> {
        readonly name: Name;
        constructor(name: Name, value: Value);
        prefix(): string;
        postfix(): string;
        static linear_gradient<Value>(value: Value): $mol_style_func<"linear-gradient", Value>;
        static radial_gradient<Value>(value: Value): $mol_style_func<"radial-gradient", Value>;
        static calc<Value>(value: Value): $mol_style_func<"calc", Value>;
        static vary<Name extends string, Value extends string>(name: Name, defaultValue?: Value): $mol_style_func<"var", Name | (Name | Value)[]>;
        static url<Href extends string>(href: Href): $mol_style_func<"url", string>;
        static hsla(hue: number | $mol_style_func<'var'>, saturation: number, lightness: number, alpha: number): $mol_style_func<"hsla", (number | `${number}%` | $mol_style_func<"var", unknown>)[]>;
        static clamp(min: $mol_style_unit_str<any>, mid: $mol_style_unit_str<any>, max: $mol_style_unit_str<any>): $mol_style_func<"clamp", `${number}${any}`[]>;
        static rgba(red: number | $mol_style_func<'var'>, green: number | $mol_style_func<'var'>, blue: number | $mol_style_func<'var'>, alpha: number | $mol_style_func<'var'>): $mol_style_func<"rgba", (number | $mol_style_func<"var", unknown>)[]>;
        static scale(zoom: number): $mol_style_func<"scale", number[]>;
        static linear(...breakpoints: Array<number | [number, number | $mol_style_unit_str<'%'>]>): $mol_style_func<"linear", string[]>;
        static cubic_bezier(x1: number, y1: number, x2: number, y2: number): $mol_style_func<"cubic-bezier", number[]>;
        static steps(value: number, step_position: 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'): $mol_style_func<"steps", (number | "end" | "start" | "jump-start" | "jump-end" | "jump-none" | "jump-both")[]>;
        static blur(value?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"blur", string>;
        static brightness(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"brightness", string | number>;
        static contrast(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"contrast", string | number>;
        static drop_shadow(color: $mol_style_properties_color, x_offset: $mol_style_unit_str<$mol_style_unit_length>, y_offset: $mol_style_unit_str<$mol_style_unit_length>, blur_radius?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"drop-shadow", readonly [$mol_style_properties_color, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`] | readonly [$mol_style_properties_color, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`, `${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax`]>;
        static grayscale(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"grayscale", string | number>;
        static hue_rotate(value?: 0 | $mol_style_unit_str<$mol_style_unit_angle>): $mol_style_func<"hue-rotate", string | 0>;
        static invert(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"invert", string | number>;
        static opacity(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"opacity", string | number>;
        static sepia(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"sepia", string | number>;
        static saturate(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"saturate", string | number>;
    }
}

declare namespace $ {
    /** Replaces properties of `Base` record by properties from `Over`. */
    type $mol_type_override<Base, Over> = Omit<Base, keyof Over> & Over;
}

declare namespace $ {
    export type $mol_style_properties = Partial<$mol_type_override<CSSStyleDeclaration, Overrides>>;
    type Common = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer' | 'none' | $mol_style_func<'var'>;
    type Portion = `${number}${'%'}` | number;
    type Space = '' | ' ';
    type Var = `var(--${string})`;
    type Calc = `calc(${string})`;
    type Angle = number | `${number}${'deg' | 'turn'}` | Var | Calc | 'none';
    export type $mol_style_properties_color = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen' | 'transparent' | 'currentColor' | $mol_style_func<'hsla' | 'rgba' | 'var'> | `#${string}` | `hsl(${Space}${Angle} ${Portion} ${Portion}${'' | `${Space}/${Space}${Portion}`}${Space})`;
    type Length = 0 | `${number}${$mol_style_unit_length}` | $mol_style_func<'calc' | 'var' | 'clamp'>;
    type Size = 'auto' | 'max-content' | 'min-content' | 'fit-content' | Length | Common;
    type Sides<Value> = {
        top?: Value;
        right?: Value;
        bottom?: Value;
        left?: Value;
        blockStart?: Value;
        blockEnd?: Value;
        inlineStart?: Value;
        inlineEnd?: Value;
    };
    type Directions<Value> = Value | readonly [Value, Value] | Sides<Value>;
    type Edges<Value> = {
        topLeft?: Value;
        topRight?: Value;
        bottomLeft?: Value;
        bottomRight?: Value;
    };
    type Borders<Value> = Value | readonly [Value, Value] | (Sides<Value> & Edges<Value>);
    type Single_animation_composition = 'replace' | 'add' | 'accumulate';
    type Single_animation_direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    type Single_animation_fill_mode = 'none' | 'forwards' | 'backwards' | 'both';
    type Single_animation_iteration_count = 'infinite' | number;
    type Single_animation_play_state = 'running' | 'paused';
    type Easing_function = Linear_easing_function | Cubic_bezier_easing_function | Step_easing_function;
    type Linear_easing_function = 'linear' | $mol_style_func<'linear'>;
    type Cubic_bezier_easing_function = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | $mol_style_func<'cubic-bezier'>;
    type Step_easing_function = 'step-start' | 'step-end' | $mol_style_func<'steps'>;
    type Compat_auto = 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio' | 'menulist' | 'listbox' | 'meter' | 'progress-bar' | 'button';
    type Compat_special = 'textfield' | 'menulist-button';
    type Mix_blend_mode = Blend_mode | 'plus-darker' | 'plus-lighter';
    type Blend_mode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
    type Box = 'border-box' | 'padding-box' | 'content-box';
    type Baseline_position = 'baseline' | `${'first' | 'last'} baseline`;
    type Content_distribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
    type Self_position = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end';
    type Content_position = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
    type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func<'var'>;
    type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func<'var'>;
    type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common;
    type Overflow_position = 'unsafe' | 'safe';
    type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func<'var'>;
    type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func<'var'>;
    type BG_size = Length | 'auto' | 'contain' | 'cover';
    interface Overrides {
        /**
         * Sets the accent color for user-interface controls generated by some elements.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
         */
        accentColor?: $mol_style_properties_color | Common;
        align?: {
            /**
             * Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
             */
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            /**
             * Sets the align-self value on all direct children as a group.
             * In Flexbox, it controls the alignment of items on the Cross Axis.
             * In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
             */
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            /**
             * Overrides a grid or flex item's align-items value.
             * In Grid, it aligns the item inside the grid area.
             * In Flexbox, it aligns the item on the cross axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
             */
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        justify?: {
            /**
             * Distribution of space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
             */
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            /**
             * Sets the justify-self value on all direct children as a group.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
             */
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            /**
             * Way a box is justified inside its alignment container along the appropriate axis.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
             */
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        /**
         * resets all of an element's properties except unicode-bidi, direction, and CSS Custom Properties.
         * It can set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/all
         */
        all?: Common;
        animation?: {
            /**
             * Specifies the composite operation to use when multiple animations affect the same property simultaneously.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition
             */
            composition?: Single_animation_composition | Single_animation_composition[][] | Common;
            /**
             * Specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation.
             * The animation can start later, immediately from its beginning, or immediately and partway through the animation.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
             */
            delay?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            /**
             * Sets whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
             */
            direction?: Single_animation_direction | Single_animation_direction[][] | Common;
            /**
             * Sets the length of time that an animation takes to complete one cycle.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
             */
            duration?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            /**
             * Sets how a CSS animation applies styles to its target before and after its execution.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
             */
            fillMode?: Single_animation_fill_mode | Single_animation_fill_mode[][] | Common;
            /**
             * Sets the number of times an animation sequence should be played before stopping.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
             */
            iterationCount?: Single_animation_iteration_count | Single_animation_iteration_count[][] | Common;
            /**
             * Specifies the names of one or more keyframes at-rules that describe the animation to apply to an element.
             * Multiple keyframe at-rules are specified as a comma-separated list of names.
             * If the specified name does not match any keyframe at-rule, no properties are animated.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
             */
            name?: 'none' | string & {} | ('none' | string & {})[][] | Common;
            /**
             * Sets whether an animation is running or paused.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
             */
            playState?: Single_animation_play_state | Single_animation_play_state[][] | Common;
            /**
             * Sets how an animation progresses through the duration of each cycle.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
             */
            timingFunction?: Easing_function | Easing_function[][] | Common;
        };
        /**
         * Used to control native appearance of UI controls, that are based on operating system's theme.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
         */
        appearance?: 'none' | 'auto' | Compat_auto | Compat_special | Common;
        /**
         * Sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
         */
        aspectRatio?: 'auto' | number | `${number} / ${number}`;
        /**
         * lets you apply graphical effects such as blurring or color shifting to the area behind an element.
         * Because it applies to everything behind the element, to see the effect you must make the element
         * or its background at least partially transparent.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
         */
        backdropFilter: $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'> | ($mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'>)[][] | 'none' | Common;
        /**
         * Sets whether the back face of an element is visible when turned towards the user.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
         */
        backfaceVisibility: 'visible' | 'hidden' | Common;
        /**
         * How the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
         * @see https://developer.mozilla.org/ru/docs/Web/CSS/justify-content
         */
        justifyContent?: 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'normal' | 'stretch' | 'center' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap */
        gap?: Length | readonly [Length, Length] | Common;
        /**
         * All background style properties.
         * @see https://developer.mozilla.org/ru/docs/Web/CSS/background
         * */
        background?: 'none' | {
            /**
             * Sets whether a background image's position is fixed within the viewport, or scrolls with its containing block.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
             */
            attachment?: 'scroll' | 'fixed' | 'local' | ('scroll' | 'fixed' | 'local')[][] | Common;
            /**
             * Sets how an element's background images should blend with each other and with the element's background color.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
             */
            blendMode?: Mix_blend_mode | Mix_blend_mode[][] | Common;
            /**
             * Sets whether an element's background extends underneath its border box, padding box, or content box.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
             */
            clip?: Box | Box[][] | Common;
            /**
             * Background color.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-color
             */
            color?: $mol_style_properties_color | Common;
            /**
             * Background images.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-image
             */
            image?: readonly (readonly [$mol_style_func<$mol_style_func_image> | string & {}])[] | 'none' | Common;
            /**
             * How background images are repeated.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-repeat
             */
            repeat?: Repeat | [Repeat, Repeat] | Common;
            /** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-position */
            position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | Common;
            /** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-size */
            size?: (BG_size | [BG_size] | [BG_size, BG_size])[];
        };
        /** @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow */
        box?: {
            /**
             * Shadow effects around an element's frame.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow
             */
            shadow?: readonly ([
                ...[inset: 'inset'] | [],
                x: Length,
                y: Length,
                blur: Length,
                spread: Length,
                color: $mol_style_properties_color
            ] | {
                inset?: boolean;
                x: Length;
                y: Length;
                blur: Length;
                spread: Length;
                color: $mol_style_properties_color;
            })[] | 'none' | Common;
        };
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rx */
        rx?: Length | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/ry */
        ry?: Length | Common;
        /** @see https://developer.mozilla.org/ru/docs/Web/CSS/font */
        font?: {
            /**
             * Whether a font should be styled.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-style
             */
            style?: 'normal' | 'italic' | Common;
            /**
             * Weight (or boldness) of the font.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-weight
             */
            weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | Common;
            /**
             * Size of the font. Changing the font size also updates the sizes of the font size-relative length units.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-size
             */
            size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | Length | Common;
            /**
             * Prioritized list of one or more font family names and/or generic family names.
             * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-family
             */
            family?: string & {} | 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | Common;
        };
        /**
         * Foreground color value of text and text decorations, and sets the `currentcolor` value.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color
         */
        color?: $mol_style_properties_color | Common;
        /**
         * Whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
         */
        display?: 'block' | 'inline' | 'run-in' | 'list-item' | 'none' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'contents' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group' | 'table-row' | 'table-cell' | 'table-column' | 'table-caption' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' | 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' | Common;
        /**
         * What to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflowX` and `overflowY`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
         */
        overflow?: Overflow | {
            /**
             * What shows when content overflows a block-level element's left and right edges.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
             */
            x?: Overflow | Common;
            /**
             * What shows when content overflows a block-level element's top and bottom edges.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
             */
            y?: Overflow | Common;
            /**
             * A way to opt out of the browser's scroll anchoring behavior, which adjusts scroll position to minimize content shifts.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
             */
            anchor?: 'auto' | 'none' | Common;
        };
        /**
         * Indicate that an element and its contents are, as much as possible, independent of the rest of the document tree. This allows the browser to recalculate layout, style, paint, size, or any combination of them for a limited area of the DOM and not the entire page, leading to obvious performance benefits.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/contain
         */
        contain?: 'none' | 'strict' | 'content' | ContainRule | readonly ContainRule[] | Common;
        /**
         * How white space inside an element is handled.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
         */
        whiteSpace?: 'normal' | 'nowrap' | 'break-spaces' | 'pre' | 'pre-wrap' | 'pre-line' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling */
        webkitOverflowScrolling?: 'auto' | 'touch' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color */
        scrollbar?: {
            /**
             * Color of thumb and track of scrollbars.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
             */
            color?: readonly [$mol_style_properties_color, $mol_style_properties_color] | 'auto' | Common;
            /**
             * Maximum thickness of scrollbars.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
             */
            width?: 'auto' | 'thin' | 'none' | Common;
        };
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior */
        scroll?: {
            /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-marker-group */
            marker?: {
                group?: 'before' | 'after' | Common;
            };
            /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align */
            snap?: {
                /**
                 * How strictly snap points are enforced on the scroll container in case there is one.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
                 */
                type: 'none' | Snap_axis | readonly [Snap_axis, 'mandatory' | 'proximity'] | Common;
                /**
                 * Whether the scroll container is allowed to "pass over" possible snap positions.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
                 */
                stop: 'normal' | 'always' | Common;
                /**
                 * The box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.
                 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
                 */
                align: Span_align | readonly [Span_align, Span_align] | Common;
            };
            /**
             * Offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding
             */
            padding?: Directions<Length | 'auto'>;
        };
        /**
         * Element's width. By default, it sets the width of the content area, but if `boxSizing` is set to `border-box`, it sets the width of the border area.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/width
         */
        width?: Size;
        /**
         * Minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `minWidth`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
         */
        minWidth?: Size;
        /**
         * Maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified for `maxWidth`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
         */
        maxWidth?: Size;
        /**
         * Height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/height
         */
        height?: Size;
        /**
         * Minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `minHeight`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-height
         */
        minHeight?: Size;
        /**
         * Maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `maxHeight`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
         */
        maxHeight?: Size;
        /**
         * Margin area on all four sides of an element.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/margin
         */
        margin?: Directions<Length | 'auto'>;
        /**
         * Padding area on all four sides of an element.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/padding
         */
        padding?: Directions<Length | 'auto'>;
        /**
         * How an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/position
         */
        position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/top */
        top?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/right */
        right?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/bottom */
        bottom?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/left */
        left?: Length | 'auto' | Common;
        /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
        border?: Borders<{
            /**
             * Rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
             */
            radius?: Length | [Length, Length];
            /**
             * Line style for all four sides of an element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
             */
            style?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | Common;
            /**
             * Color of element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
             */
            color?: $mol_style_properties_color | Common;
            /**
             * Width of element's border.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
             */
            width?: Length | Common;
        }>;
        /**
         * How a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flexGrow`, `flexShrink`, and `flexBasis`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
         */
        flex?: 'none' | 'auto' | {
            /**
             * Growing weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
             */
            grow?: number | Common;
            /**
             * Shrinking weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
             */
            shrink?: number | Common;
            /**
             * Preferred size of the flex item. A value of 0 must have a unit to avoid being interpreted as a flexibility. Defaults to 0 when omitted.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
             */
            basis?: Size | Common;
            /**
             * How flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
             */
            direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | Common;
            /**
             * Whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
             * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
             */
            wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common;
        };
        container?: {
            name?: string;
            type?: Container_type | readonly Container_type[];
        };
        /**
         * Z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
         */
        zIndex: number | Common;
        /**
         * Degree to which content behind an element is hidden, and is the opposite of transparency.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
         */
        opacity: number | Common;
    }
    type Container_type = 'normal' | 'size' | 'inline-size' | 'scroll-state' | 'anchored';
    export {};
}

declare namespace $ {
    /** Create record of CSS variables. */
    function $mol_style_prop<Keys extends string[]>(prefix: string, keys: Keys): Record<Keys[number], $mol_style_func<"var", unknown>>;
}

declare namespace $ {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    const $mol_theme: Record<"image" | "line" | "text" | "hover" | "field" | "focus" | "hue" | "back" | "card" | "current" | "special" | "control" | "shade" | "spirit" | "hue_spread", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    let $mol_gap: Record<"text" | "blur" | "page" | "block" | "space" | "round" | "emoji", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    class $mol_promise<Result = void> extends Promise<Result> {
        done: (value: Result | PromiseLike<Result>) => void;
        fail: (reason?: any) => void;
        constructor(executor?: (done: (value: Result | PromiseLike<Result>) => void, fail: (reason?: any) => void) => void);
    }
}

declare namespace $ {
    class $mol_promise_blocker<Result> extends $mol_promise<Result> {
        static [Symbol.toStringTag]: string;
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_dom_render_children(el: Element | DocumentFragment, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    /**
     * Recursive `Partial`.
     *
     * 	let props : $mol_type_partial_deep< HTMLElement > = { style : { display : 'block' } }
     */
    type $mol_type_partial_deep<Val> = Val extends object ? Val extends Function ? Val : {
        [field in keyof Val]?: $mol_type_partial_deep<Val[field]> | undefined;
    } : Val;
}

declare namespace $ {
    let $mol_jsx_prefix: string;
    let $mol_jsx_crumbs: string;
    let $mol_jsx_booked: null | Set<string>;
    let $mol_jsx_document: $mol_jsx.JSX.ElementClass['ownerDocument'];
    const $mol_jsx_frag = "";
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx<Props extends $mol_jsx.JSX.IntrinsicAttributes, Children extends Array<Node | string>>(Elem: string | ((props: Props, ...children: Children) => Element), props: Props, ...childNodes: Children): Element | DocumentFragment;
    namespace $mol_jsx.JSX {
        interface Element extends HTMLElement {
            class?: string;
        }
        interface ElementClass {
            attributes: {};
            ownerDocument: Pick<Document, 'getElementById' | 'createElementNS' | 'createDocumentFragment'>;
            childNodes: Array<Node | string>;
            valueOf(): Element;
        }
        type OrString<Dict> = {
            [key in keyof Dict]: Dict[key] | string;
        };
        /** Props for html elements */
        type IntrinsicElements = {
            [key in keyof ElementTagNameMap]?: $.$mol_type_partial_deep<OrString<Element & IntrinsicAttributes & ElementTagNameMap[key]>>;
        };
        /** Additional undeclared props */
        interface IntrinsicAttributes {
            id?: string;
            xmlns?: string;
        }
        interface ElementAttributesProperty {
            attributes: {};
        }
        interface ElementChildrenAttribute {
        }
    }
}

declare namespace $ {
    /**
     * Argument must be Truthy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_ok(value: any): void;
    /**
     * Argument must be Falsy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_not(value: any): void;
    /**
     * Handler must throw an error.
     * @example
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } ) // Passes because throws error
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , 'Parse error' ) // Passes because throws right message
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , Error ) // Passes because throws right class
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_fail(handler: () => any, ErrorRight: string | typeof Error | typeof Promise): any;
    /** @deprecated Use $mol_assert_equal */
    function $mol_assert_like<Value>(...args: [Value, Value, ...Value[]]): void;
    /**
     * All arguments must not be structural equal to each other.
     * @example
     * $mol_assert_unique( 1 , 2 , 3 ) // Passes
     * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_unique(...args: [any, any, ...any[]]): undefined;
    /**
     * All arguments must be structural equal each other.
     * @example
     * $mol_assert_like( [1] , [1] , [1] ) // Passes
     * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_equal<Value>(...args: [Value, Value, ...Value[]]): undefined;
}

declare namespace $ {
    function $mol_dev_format_register(config: {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => false;
    } | {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => boolean;
        body: (val: any, config: any) => any;
    }): void;
    const $mol_dev_format_head: unique symbol;
    const $mol_dev_format_body: unique symbol;
    function $mol_dev_format_native(obj: any): any[];
    function $mol_dev_format_auto(obj: any): any[];
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    let $mol_dev_format_span: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_div: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_ol: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_li: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_table: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_tr: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_td: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_accent: (...args: any[]) => any[];
    let $mol_dev_format_strong: (...args: any[]) => any[];
    let $mol_dev_format_string: (...args: any[]) => any[];
    let $mol_dev_format_shade: (...args: any[]) => any[];
    let $mol_dev_format_indent: (...args: any[]) => any[];
}

declare namespace $ {
    function $mol_dom_serialize(node: Node): string;
}

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    /** @deprecated use $ instead */
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate<Value extends object>(proto: Value, target: () => Value): Value;
}

declare namespace $ {
    const $mol_owning_map: WeakMap<any, any>;
    function $mol_owning_allow<Having>(having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_get<Having, Owner extends object>(having: Having, Owner?: {
        new (): Owner;
    }): Owner | null;
    function $mol_owning_check<Owner, Having>(owner: Owner, having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_catch<Owner, Having>(owner: Owner, having: Having): boolean;
}

declare namespace $ {
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    const $mol_key_handle: unique symbol;
    const $mol_key_store: WeakMap<object, string>;
}

declare namespace $ {
    class $mol_object2 {
        static $: $;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: $;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): any;
        static toString(): any;
        static toJSON(): any;
        static [$mol_key_handle](): any;
        destructor(): void;
        static destructor(): void;
        [Symbol.dispose](): void;
        toString(): string;
    }
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
    }
}

declare namespace $ {
    /** Generates unique identifier. */
    function $mol_guid(length?: number, exists?: (id: string) => boolean): string;
}

declare namespace $ {
    /** Special status statuses. */
    enum $mol_wire_cursor {
        /** Update required. */
        stale = -1,
        /** Some of (transitive) pub update required. */
        doubt = -2,
        /** Actual state but may be dropped. */
        fresh = -3,
        /** State will never be changed. */
        final = -4
    }
}

declare namespace $ {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id?: string);
        [Symbol.toStringTag]: string;
        data: unknown[];
        static get [Symbol.species](): ArrayConstructor;
        /**
         * Index of first subscriber.
         */
        protected sub_from: number;
        /**
         * All current subscribers.
         */
        get sub_list(): readonly $mol_wire_sub[];
        /**
         * Has any subscribers or not.
         */
        get sub_empty(): boolean;
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub: $mol_wire_pub, pub_pos: number): number;
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos: number): void;
        /**
         * Called when last sub was unsubscribed.
         **/
        reap(): void;
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote(): void;
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh(): void;
        /**
         * Allow to put data to caches in the subtree.
         */
        complete(): void;
        get incompleted(): boolean;
        /**
         * Notify subscribers about self changes.
         */
        emit(quant?: $mol_wire_cursor): void;
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos: number, to_pos: number): void;
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos: number, self_pos: number): void;
    }
}

declare namespace $ {
    /** Generic subscriber interface */
    interface $mol_wire_sub extends $mol_wire_pub {
        temp: boolean;
        pub_list: $mol_wire_pub[];
        /**
         * Begin auto wire to publishers.
         * Returns previous auto subscriber that must me transfer to the `end`.
         */
        track_on(): $mol_wire_sub | null;
        /**
         * Returns next auto wired publisher. It can be easely repormoted.
         * Or promotes next publisher to auto wire its togeter.
         * Must be used only between `track_on` and `track_off`.
         */
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        pub_off(pub_pos: number): void;
        /**
         * Unsubscribes from unpromoted publishers.
         */
        track_cut(sub: $mol_wire_pub | null): void;
        /**
         * Ends auto wire to publishers.
         */
        track_off(sub: $mol_wire_pub | null): void;
        /**
         * Receive notification about publisher changes.
         */
        absorb(quant: $mol_wire_cursor, pos: number): void;
        /**
         * Unsubscribes from all publishers.
         */
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_wire_auto_sub: $mol_wire_sub | null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next?: $mol_wire_sub | null): $mol_wire_sub | null;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    const $mol_wire_affected: ($mol_wire_sub | number)[];
}

declare namespace $ {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
        protected pub_from: number;
        protected cursor: $mol_wire_cursor;
        get temp(): boolean;
        get pub_list(): $mol_wire_pub[];
        track_on(): $mol_wire_sub | null;
        promote(): void;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        track_off(sub: $mol_wire_sub | null): void;
        pub_off(sub_pos: number): void;
        destructor(): void;
        track_cut(): void;
        complete(): void;
        complete_pubs(): void;
        absorb(quant?: $mol_wire_cursor, pos?: number): void;
        [$mol_dev_format_head](): any[];
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty(): boolean;
    }
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        static promise: Promise<void> | null;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    abstract class $mol_wire_fiber<Host, Args extends readonly unknown[], Result> extends $mol_wire_pub_sub {
        readonly task: (this: Host, ...args: Args) => Result;
        readonly host?: Host | undefined;
        static warm: boolean;
        static planning: Set<$mol_wire_fiber<any, any, any>>;
        static reaping: Set<$mol_wire_fiber<any, any, any>>;
        static plan_task: $mol_after_tick | null;
        static plan(): void;
        static sync(): void;
        cache: Result | Error | Promise<Result | Error>;
        get args(): Args;
        result(): Result | undefined;
        get incompleted(): boolean;
        field(): string;
        constructor(id: string, task: (this: Host, ...args: Args) => Result, host?: Host | undefined, args?: Args);
        plan(): this;
        reap(): void;
        toString(): string;
        toJSON(): string;
        [$mol_dev_format_head](): any[];
        [$mol_dev_format_body](): null;
        get $(): any;
        emit(quant?: $mol_wire_cursor): void;
        fresh(): this | undefined;
        refresh(): void;
        abstract put(next: Result | Error | Promise<Result | Error>): Result | Error | Promise<Result | Error>;
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync(): Awaited<Result>;
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async_raw(): Promise<Result>;
        async(): Promise<Result> & {
            destructor(): void;
        };
        step(): Promise<null>;
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Returns `Tuple` without first element.
     *
     * 	$mol_type_tail<[ 1 , 2 , 3 ]> // [ 2, 3 ]
     */
    type $mol_type_tail<Tuple extends readonly any[]> = ((...tail: Tuple) => any) extends ((head: any, ...tail: infer Tail) => any) ? Tail : never;
}

declare namespace $ {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    export function $mol_wire_solo<Args extends any[]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): TypedPropertyDescriptor<(...args: First_optional<Args>) => any>;
    type First_optional<Args extends any[]> = Args extends [] ? [] : [Args[0] | undefined, ...$mol_type_tail<Args>];
    export {};
}

declare namespace $ {
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    /** Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable. */
    function $mol_range2<Item = number>(item?: Item[] | ((index: number) => Item), size?: () => number): Item[];
    class $mol_range2_array<Item> extends Array<Item> {
        concat(...tail: Item[][]): Item[];
        filter<Context>(check: (val: Item, index: number, list: Item[]) => boolean, context?: Context): Item[];
        forEach<Context>(proceed: (this: Context, val: Item, index: number, list: Item[]) => void, context?: Context): void;
        map<Item_out, Context>(proceed: (this: Context, val: Item, index: number, list: Item[]) => Item_out, context?: Context): Item_out[];
        reduce<Result>(merge: (result: Result, val: Item, index: number, list: Item[]) => Result, result?: Result): Result | undefined;
        toReversed(): Item[];
        slice(from?: number, to?: number): Item[];
        some<Context>(check: (this: Context, val: Item, index: number, list: Item[]) => boolean, context?: Context): boolean;
        every<Narrow extends Item, Context = null>(check: (value: Item, index: number, array: Item[]) => value is Narrow, context?: Context): this is Narrow[];
        reverse(): never;
        sort(): never;
        indexOf(needle: Item): number;
        [Symbol.toPrimitive](): string;
    }
}

declare namespace $ {
    /** One-shot fiber */
    class $mol_wire_task<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static getter<Host, Args extends readonly unknown[], Result>(task: (this: Host, ...args: Args) => Result): (host: Host, args: Args) => $mol_wire_task<Host, Args, Result>;
        get temp(): boolean;
        complete(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method<Host extends object, Args extends readonly any[]>(host: Host, field: PropertyKey, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: Host, ...args: Args) => any;
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    class $mol_after_timeout extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    export function $mol_wire_sync<Host extends object>(obj: Host): ObjectOrFunctionResultAwaited<Host>;
    type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res ? (...args: Args) => Awaited<Res> : Some;
    type ConstructorResultAwaited<Some> = Some extends new (...args: infer Args) => infer Res ? new (...args: Args) => Res : {};
    type MethodsResultAwaited<Host extends Object> = {
        [K in keyof Host]: FunctionResultAwaited<Host[K]>;
    };
    type ObjectOrFunctionResultAwaited<Some> = (Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}) & (Some extends Object ? MethodsResultAwaited<Some> & ConstructorResultAwaited<Some> : Some);
    export {};
}

declare namespace $ {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    export function $mol_wire_async<Host extends object>(obj: Host): ObjectOrFunctionResultPromisify<Host>;
    type FunctionResultPromisify<Some> = Some extends (...args: infer Args) => infer Res ? Res extends PromiseLike<unknown> ? Some : (...args: Args) => Promise<Res> : Some;
    type MethodsResultPromisify<Host extends Object> = {
        [K in keyof Host]: FunctionResultPromisify<Host[K]>;
    };
    type ObjectOrFunctionResultPromisify<Some> = (Some extends (...args: any) => unknown ? FunctionResultPromisify<Some> : {}) & (Some extends Object ? MethodsResultPromisify<Some> : Some);
    export {};
}

declare namespace $ {
    function $mol_wait_timeout_async(this: $, timeout: number): Promise<void>;
    function $mol_wait_timeout(this: $, timeout: number): void;
}

declare namespace $ {
    class $mol_after_work extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_wait_rest_async(this: $): Promise<unknown>;
    function $mol_wait_rest(this: $): unknown;
}

declare namespace $ {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex<Args extends [any, ...any[]]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: typeof host, ...args: Args) => any;
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    /** Run code without state changes */
    function $mol_wire_probe<Value>(task: () => Value, def?: Value): Value | undefined;
}

declare namespace $ {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    let $mol_mem: typeof $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    let $mol_mem_key: typeof $mol_wire_plex;
}

declare namespace $ {
    /** Returns string key for any value. */
    function $mol_key<Value>(value: Value): string;
}

declare namespace $ {
    class $mol_after_frame extends $mol_object2 {
        task: () => void;
        static _promise: Promise<void> | null;
        static get promise(): Promise<void>;
        cancelled: boolean;
        promise: Promise<void>;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Returns last element of `Tuple`.
     *
     * 	$mol_type_tail<[ 1 , 2 , 3 ]> // 3
     */
    type $mol_type_foot<Tuple extends readonly any[]> = Tuple['length'] extends 0 ? never : Tuple[$mol_type_tail<Tuple>['length']];
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_try_web<Result>(handler2: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    /** Long-living fiber. */
    class $mol_wire_atom<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static solo<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result): $mol_wire_atom<Host, Args, Result>;
        static plex<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result, key: Args[0]): $mol_wire_atom<Host, Args, Result>;
        static watching: Set<$mol_wire_atom<any, any, any>>;
        static watcher: $mol_after_frame | null;
        static watch(): void;
        watch(): void;
        /**
         * Update atom value through another temp fiber.
         */
        resync(args: Args): Error | Result | Promise<Error | Result>;
        once(): Awaited<Result>;
        channel(): ((next?: $mol_type_foot<Args>) => Awaited<Result>) & {
            atom: $mol_wire_atom<Host, Args, Result>;
        };
        destructor(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    /** Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`. */
    class $mol_wire_log extends $mol_object2 {
        static watch(task?: () => any): (() => any) | undefined;
        static track(fiber: $mol_wire_fiber<any, any, any>): any;
        static active(): void;
    }
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(): {
            width: number;
            height: number;
        };
        static resizes(next?: Event): Event | undefined;
    }
}

declare namespace $ {
    function $mol_guard_defined<T>(value: T): value is NonNullable<T>;
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], notify?: 'notify'): Element[];
    }
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        slashBackLeft = 226,
        bracketClose = 221,
        quoteSingle = 222
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): (obj: object, name: PropertyKey, descr?: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
        static get field(): <Host extends object, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr?: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    class $mol_memo extends $mol_wrapper {
        static wrap<This extends object, Value>(task: (this: This, next?: Value) => Value): (this: This, next?: Value) => Value | undefined;
    }
}

declare namespace $ {
    function $mol_dom_qname(name: string): string;
}

declare namespace $ {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch(): void;
}

declare namespace $ {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean | null;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }, passive?: boolean): void;
}

declare namespace $ {
    function $mol_error_message(this: $, error: unknown): string;
}

declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}

declare namespace $ {
    /**
     * Picks keys from `Input` which values extends `Upper`.
     *
     * 	type MathConstants = $mol_type_pick< Math , number > // { E , PI , ... }
     */
    type $mol_type_pick<Input, Upper> = Pick<Input, $mol_type_keys_extract<Input, Upper>>;
}

/** @jsx $mol_jsx */
declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean | null;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    class $mol_view extends $mol_object {
        static Root<This extends typeof $mol_view>(this: This, id: number): InstanceType<This>;
        static roots(): $mol_view[];
        static auto(): void;
        title(): string;
        hint(): string;
        focused(next?: boolean): boolean;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly $mol_view_content[];
        sub_visible(): readonly $mol_view_content[];
        minimal_width(): number;
        maximal_width(): number;
        minimal_height(): number;
        static watchers: Set<$mol_view>;
        view_rect(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | null;
        dom_id(): string;
        dom_node_external(next?: Element): Element;
        dom_node(next?: Element): Element;
        dom_final(): Element | undefined;
        dom_tree(next?: Element): Element;
        dom_node_actual(): Element;
        auto(): any;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        static _view_names?: Map<string, string[]>;
        static view_names(suffix: string): string[];
        view_names_owned(): string[];
        view_names(): Set<string>;
        theme(next?: string | null): string | null | undefined;
        attr_static(): {
            [key: string]: string | number | boolean | null;
        };
        attr(): {};
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [x: string]: (event: Event) => Promise<void>;
        };
        plugins(): readonly $mol_view[];
        [$mol_dev_format_head](): any[];
        /** Deep search view by predicate. */
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        /** Renders path of views to DOM. */
        force_render(path: Set<$mol_view>): void;
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view: $mol_view, align?: ScrollLogicalPosition): void;
        bring(): void;
        destructor(): void;
    }
    type $mol_view_all = $mol_type_pick<$, typeof $mol_view>;
}

interface Window {
    cordova: any;
}
declare namespace $ {
}

declare namespace $ {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next?: Element): Element;
        render(): void;
    }
}

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
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    let $mol_action: typeof $mol_wire_method;
}

declare namespace $ {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static href_normal(): string;
        static href_absolute(): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static dict_cut(except: string[]): {
            [key: string]: string;
        };
        static value(key: string, next?: string | null): string | null;
        static link(next: Record<string, string | null>): string;
        static prolog: string;
        static separator: string;
        static make_link(next: {
            [key: string]: string | null;
        }): string;
        static commit(): void;
        static go(next: {
            [key: string]: string | null;
        }): void;
        static encode(str: string): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string | null;
        sub(postfix: string): $mol_state_arg;
        link(next: Record<string, string | null>): string;
    }
}

declare namespace $.$$ {
    class $raggu_web_front_reveal extends $.$raggu_web_front_reveal {
        delay_css(): string;
        observer(): {
            destructor: () => void;
        } | null;
        auto(): never;
    }
}
declare namespace $.$$ {
    class $raggu_web_front_link extends $.$raggu_web_front_link {
        href(): string;
    }
}

declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    let $mol_layer: Record<"hover" | "focus" | "float" | "speck" | "popup", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
}

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
declare namespace $.$$ {
    /**
     * Simple button.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
     */
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): any;
        tab_index(): number;
        error(): string;
        hint_safe(): string;
        sub_visible(): ($mol_view_content | $mol_speck)[];
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next?: boolean): boolean;
        /** Total storage quota in bytes. */
        static total(): number;
        /** Total storage usage in bytes. */
        static used(): number;
        /** Minimum available free space in bytes. */
        static free(): number;
        /** Fulfillness of storage. */
        static portion(): number;
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level(): number;
    }
}

declare namespace $ {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid(): void;
}

declare namespace $ {
    let $mol_mem_persist: typeof $mol_wire_solid;
}

declare namespace $ {
    let $mol_mem_cached: typeof $mol_wire_probe;
}

declare namespace $ {
    function $mol_wait_user_async(this: $): Promise<unknown>;
    function $mol_wait_user(this: $): unknown;
}

declare namespace $ {
    class $mol_storage_web extends $mol_storage {
        static native(): StorageManager;
        static persisted(next?: boolean, cache?: 'cache'): boolean;
        static estimate(next?: null): StorageEstimate;
        static total(): number;
        static used(): number;
        static free(): number;
        static portion(): number;
        static dir(): FileSystemDirectoryHandle;
    }
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static changes(next?: StorageEvent): StorageEvent | undefined;
        static value<Value>(key: string, next?: Value | null): Value | null;
        prefix(): string;
        value(key: string, next?: Value): Value | null;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_lock extends $mol_object {
        protected promise: null | Promise<void>;
        wait(): Promise<() => void>;
        grab(): () => void;
    }
}

declare namespace $ {
    function $mol_compare_array<Value extends ArrayLike<unknown>>(a: Value, b: Value): boolean;
}

declare namespace $ {
    type $mol_charset_encoding = 'utf8' | 'utf-16le' | 'utf-16be' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr';
}

declare namespace $ {
    function $mol_charset_decode(buffer: AllowSharedBufferSource, encoding?: $mol_charset_encoding): string;
}

declare namespace $ {
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size: number): Uint8Array<ArrayBuffer>;
}

declare namespace $ {
    function $mol_charset_encode(str: string): Uint8Array<ArrayBuffer>;
    function $mol_charset_encode_to(str: string, buf: Uint8Array<ArrayBuffer>, from?: number): number;
    function $mol_charset_encode_size(str: string): number;
}

declare namespace $ {
    type $mol_file_transaction_mode = 'create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append';
    type $mol_file_transaction_buffer = ArrayBufferView;
    class $mol_file_transaction extends $mol_object {
        path(): string;
        modes(): readonly $mol_file_transaction_mode[];
        write(options: {
            buffer: ArrayBufferView | string | readonly ArrayBufferView[];
            offset?: number | null;
            length?: number | null;
            position?: number | null;
        }): number;
        read(): Uint8Array<ArrayBuffer>;
        truncate(size: number): void;
        flush(): void;
        close(): void;
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_file_base extends $mol_object {
        static absolute<This extends typeof $mol_file_base>(this: This, path: string): InstanceType<This>;
        static relative<This extends typeof $mol_file_base>(this: This, path: string): InstanceType<This>;
        static base: string;
        path(): string;
        parent(): this;
        exists_cut(): boolean;
        protected root(): boolean;
        protected stat(next?: $mol_file_stat | null, virt?: 'virt'): $mol_file_stat | null;
        protected static changed: Set<$mol_file_base>;
        protected static frame: null | $mol_after_timeout;
        protected static changed_add(type: 'change' | 'rename', path: string): void;
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce(): number;
        static flush(): void;
        protected static watching: boolean;
        protected static lock: $mol_lock;
        protected static watch_off(path: string): void;
        static unwatched<Result>(side_effect: () => Result, affected_dir: string): Result;
        reset(): void;
        modified(): Date | null;
        version(): string;
        protected info(path: string): null | $mol_file_stat;
        protected ensure(): void;
        protected drop(): void;
        protected copy(to: string): void;
        protected read(): Uint8Array<ArrayBuffer>;
        protected write(buffer: Uint8Array<ArrayBuffer>): void;
        protected kids(): readonly this[];
        readable(opts: {
            start?: number;
            end?: number;
        }): ReadableStream<Uint8Array<ArrayBuffer>>;
        writable(opts: {
            start?: number;
        }): WritableStream<Uint8Array<ArrayBuffer>>;
        buffer(next?: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
        stat_make(size: number): {
            readonly type: "file";
            readonly size: number;
            readonly atime: Date;
            readonly mtime: Date;
            readonly ctime: Date;
        };
        clone(to: string): this | null;
        watcher(): {
            destructor(): void;
        };
        exists(next?: boolean): boolean;
        type(): "" | $mol_file_type;
        name(): string;
        ext(): string;
        text(next?: string, virt?: 'virt'): string;
        text_int(next?: string, virt?: 'virt'): string;
        sub(reset?: null): this[];
        resolve(path: string): this;
        relate(base?: $mol_file_base): string;
        find(include?: RegExp, exclude?: RegExp): this[];
        size(): number;
        toJSON(): string;
        open(...modes: readonly $mol_file_transaction_mode[]): $mol_file_transaction;
    }
}

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
    interface $mol_file_stat {
        type: $mol_file_type;
        size: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }
    class $mol_file extends $mol_file_base {
    }
}

declare namespace $ {
    enum $mol_rest_code {
        'Continue' = 100,
        'Switching protocols' = 101,
        'Processing' = 102,
        'OK' = 200,
        'Created' = 201,
        'Accepted' = 202,
        'Non-Authoritative Information' = 203,
        'No Content' = 204,
        'Reset Content' = 205,
        'Partial Content' = 206,
        'Multi Status' = 207,
        'Already Reported' = 208,
        'IM Used' = 226,
        'Multiple Choices' = 300,
        'Moved Permanently' = 301,
        'Found' = 302,
        'See Other' = 303,
        'Not Modified' = 304,
        'Use Proxy' = 305,
        'Temporary Redirect' = 307,
        'Bad Request' = 400,
        'Unauthorized' = 401,
        'Payment Required' = 402,
        'Forbidden' = 403,
        'Not Found' = 404,
        'Method Not Allowed' = 405,
        'Not Acceptable' = 406,
        'Proxy Authentication Required' = 407,
        'Request Timeout' = 408,
        'Conflict' = 409,
        'Gone' = 410,
        'Length Required' = 411,
        'Precondition Failed' = 412,
        'Request Entity Too Large' = 413,
        'Request URI Too Long' = 414,
        'Unsupported Media Type' = 415,
        'Requested Range Not Satisfiable' = 416,
        'Expectation Failed' = 417,
        'Teapot' = 418,
        'Unprocessable Entity' = 422,
        'Locked' = 423,
        'Failed Dependency' = 424,
        'Upgrade Required' = 426,
        'Precondition Required' = 428,
        'Too Many Requests' = 429,
        'Request Header Fields Too Large' = 431,
        'Unavailable For Legal Reasons' = 451,
        'Internal Server Error' = 500,
        'Not Implemented' = 501,
        'Bad Gateway' = 502,
        'Service Unavailable' = 503,
        'Gateway Timeout' = 504,
        'HTTP Version Not Supported' = 505,
        'Insufficient Storage' = 507,
        'Loop Detected' = 508,
        'Not Extended' = 510,
        'Network Authentication Required' = 511,
        'Network Read Timeout Error' = 598,
        'Network Connect Timeout Error' = 599
    }
}

declare namespace $ {
    class $mol_error_mix<Cause extends {} = {}> extends AggregateError {
        readonly cause: Cause;
        name: string;
        constructor(message: string, cause?: Cause, ...errors: readonly Error[]);
        static [Symbol.toPrimitive](): string;
        static toString(): string;
        static make(...params: ConstructorParameters<typeof $mol_error_mix>): $mol_error_mix<{}>;
    }
}

declare namespace $ {
    function $mol_error_fence<Data>(task: () => Data, fallback: (parent: Error) => Error | Data | PromiseLike<Data>, loading?: (parent: PromiseLike<Data>) => Error | Data | PromiseLike<Data>): Data;
}

declare namespace $ {
    function $mol_error_enriched<V>(cause: {}, cb: () => V): V;
}

declare namespace $ {
    function $mol_dom_parse(text: string, type?: DOMParserSupportedType): Document;
}

declare namespace $ {
    class $mol_fetch_response extends $mol_object {
        readonly native: Response;
        readonly request: $mol_fetch_request;
        status(): "success" | "unknown" | "inform" | "redirect" | "wrong" | "failed";
        code(): number;
        ok(): boolean;
        message(): string;
        headers(): Headers;
        mime(): string | null;
        stream(): ReadableStream<Uint8Array<ArrayBuffer>> | null;
        text(): string;
        json(): unknown;
        blob(): Blob;
        buffer(): ArrayBuffer;
        xml(): Document;
        xhtml(): Document;
        html(): Document;
    }
    class $mol_fetch_request extends $mol_object {
        readonly native: Request;
        response_async(): Promise<Response> & {
            destructor: () => void;
        };
        response(): $mol_fetch_response;
        success(): $mol_fetch_response;
    }
    class $mol_fetch extends $mol_object {
        static request(input: RequestInfo, init?: RequestInit): $mol_fetch_request;
        static response(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static success(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static stream(input: RequestInfo, init?: RequestInit): ReadableStream<Uint8Array<ArrayBuffer>> | null;
        static text(input: RequestInfo, init?: RequestInit): string;
        static json(input: RequestInfo, init?: RequestInit): unknown;
        static blob(input: RequestInfo, init?: RequestInit): Blob;
        static buffer(input: RequestInfo, init?: RequestInit): ArrayBuffer;
        static xml(input: RequestInfo, init?: RequestInit): Document;
        static xhtml(input: RequestInfo, init?: RequestInit): Document;
        static html(input: RequestInfo, init?: RequestInit): Document;
    }
}

declare namespace $ {
    class $mol_file_webdav extends $mol_file_base {
        static relative<This extends typeof $mol_file>(this: This, path: string): InstanceType<This>;
        resolve(path: string): this;
        static headers(): Record<string, string>;
        headers(): Record<string, string>;
        protected fetch(init: RequestInit): $mol_fetch_response;
        protected read(): Uint8Array<ArrayBuffer>;
        protected write(body: Uint8Array<ArrayBuffer>): void;
        protected ensure(): void;
        protected drop(): void;
        protected copy(to: string): void;
        protected kids(): this[];
        readable(opts: {
            start?: number;
            end?: number;
        }): ReadableStream<Uint8Array<ArrayBuffer>>;
        protected info(): $mol_file_stat | null;
    }
}

declare namespace $ {
    class $mol_file_web extends $mol_file_webdav {
        static base: string;
        version(): string;
        protected info(): $mol_file_stat | null;
    }
}

declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static langs_rtl(): string[];
        static direction(): "ltr" | "rtl";
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
        static warn(key: string): null;
    }
}

declare namespace $ {
    type $raggu_web_front_graph_count = {
        name: string;
        count: number;
    };
    type $raggu_web_front_graph_model = {
        nodes: $raggu_web_front_graph_node[];
        edges: $raggu_web_front_graph_edge[];
        index_of: Map<string, number>;
        edge_index_of: Map<string, number>;
        adj_offset: Uint32Array;
        adj_node: Uint32Array;
        adj_edge: Uint32Array;
        edge_source: Uint32Array;
        edge_target: Uint32Array;
        edge_strength: Float32Array;
        x: Float32Array;
        y: Float32Array;
        degree: Float32Array;
        community: Int32Array;
        communities: $raggu_web_front_graph_community[];
        max_degree: number;
        types: $raggu_web_front_graph_count[];
        meta: $raggu_web_front_graph_meta;
    };
    function $raggu_web_front_graph_build(response: $raggu_web_front_graph_response): $raggu_web_front_graph_model;
    function $raggu_web_front_graph_hash01(value: number): number;
}

declare namespace $ {
    type $raggu_web_front_graph_node = {
        id: string;
        label: string;
        entity_type: string;
        description: string;
        degree: number;
        community_id?: string | null;
        x: number;
        y: number;
        source_chunk_ids?: string[];
    };
    type $raggu_web_front_graph_edge = {
        id: string;
        source: string;
        target: string;
        relation_type: string;
        description: string;
        strength: number;
        source_chunk_ids?: string[];
    };
    type $raggu_web_front_graph_community = {
        id: string;
        title: string;
        summary: string;
        level: number;
        size: number;
        node_ids?: string[];
    };
    type $raggu_web_front_graph_meta = {
        dataset_id: string;
        total_nodes: number;
        total_edges: number;
        returned_nodes: number;
        returned_edges: number;
        limit: number;
    };
    type $raggu_web_front_graph_response = {
        nodes: $raggu_web_front_graph_node[];
        edges: $raggu_web_front_graph_edge[];
        communities?: $raggu_web_front_graph_community[];
        meta: $raggu_web_front_graph_meta;
    };
    type $raggu_web_front_graph_relation = $raggu_web_front_graph_edge & {
        direction: 'incoming' | 'outgoing';
        other_node_id: string;
        other_node_label: string;
    };
    type $raggu_web_front_graph_chunk = {
        id: string;
        content: string;
        doc_id: string;
        chunk_order_idx: number;
    };
    type $raggu_web_front_graph_detail = {
        node: $raggu_web_front_graph_node;
        incoming_relations?: $raggu_web_front_graph_relation[];
        outgoing_relations?: $raggu_web_front_graph_relation[];
        provenance_chunks?: $raggu_web_front_graph_chunk[];
    };
    type $raggu_web_front_graph_dataset = {
        id: string;
        title: string;
        domain: string;
        description: string;
        language: string;
        tags?: string[];
        stats: {
            nodes: number;
            edges: number;
            communities: number;
            chunks: number;
            documents: number;
        };
        badges?: {
            label: string;
            value: string;
        }[];
        preview: {
            node_count: number;
            edge_count: number;
            primary_entity_types?: string[];
        };
        suggested_questions?: string[];
    };
    type $raggu_web_front_graph_trace = {
        engine: string;
        top_k: number;
        rerank: boolean;
        query_plan?: {
            used: boolean;
            sub_questions?: string[];
        } | null;
        entities?: {
            id: string;
            label: string;
            entity_type: string;
            score: number;
        }[];
        relations?: {
            id: string;
            source: string;
            target: string;
            relation_type: string;
            strength: number;
        }[];
        chunks?: {
            id: string;
            content: string;
            doc_id: string;
            score: number;
        }[];
        communities?: {
            id: string;
            title: string;
            summary: string;
            score: number;
        }[];
        timings: {
            retrieval_ms: number;
            generation_ms: number;
            total_ms: number;
        };
        energy: {
            watt_hours: number;
            estimated?: boolean;
        };
        highlight: {
            node_ids?: string[];
            edge_ids?: string[];
            community_ids?: string[];
        };
    };
    type $raggu_web_front_graph_answer = {
        message: {
            id: string;
            content: string;
            created_at: string;
            trace?: $raggu_web_front_graph_trace | null;
        };
    };
}

declare namespace $ {
    type $raggu_web_front_graph_layout_input = {
        x: Float32Array;
        y: Float32Array;
        degree: Float32Array;
        community: Int32Array;
        edge_source: Uint32Array;
        edge_target: Uint32Array;
        edge_strength: Float32Array;
        iterations?: number;
        radius?: number;
    };
    /** Self-contained: the worker gets this function's source text, so nothing outside it may be referenced. */
    function $raggu_web_front_graph_layout_solve(input: $raggu_web_front_graph_layout_input, on_progress?: (ratio: number) => void): Float32Array<ArrayBuffer>;
    /** Solves in a worker built from the solver's own source; cached for the session. */
    function $raggu_web_front_graph_layout(model: $raggu_web_front_graph_model, on_progress: (ratio: number) => void, radius?: number): {
        promise: Promise<Float32Array<ArrayBufferLike>>;
        cancel: () => void;
    };
}

declare namespace $ {
    type $raggu_web_front_lib_sse_event = {
        event: string;
        data: string;
    };
    function $raggu_web_front_lib_sse(on_event: (event: $raggu_web_front_lib_sse_event) => void): {
        push(piece: string): void;
        end(): void;
    };
}

declare namespace $ {
    type $raggu_web_front_lib_cite_kind = 'entity' | 'relation' | 'chunk';
    type $raggu_web_front_lib_cite_segment = {
        kind: 'text';
        value: string;
    } | {
        kind: 'strong';
        value: string;
    } | {
        kind: 'ref';
        id: string;
        type: $raggu_web_front_lib_cite_kind;
        text: string;
        inline: boolean;
    };
    type $raggu_web_front_lib_cite_resolver = (id: string, type: $raggu_web_front_lib_cite_kind) => string | undefined;
    function $raggu_web_front_lib_cite_parse(content: string, resolve?: $raggu_web_front_lib_cite_resolver): $raggu_web_front_lib_cite_segment[];
}

declare namespace $ {
    const $raggu_web_front_lib_rich_tags: readonly ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col", "b", "strong", "i", "em", "u", "sub", "sup", "br", "p", "span", "ul", "ol", "li", "code"];
    type $raggu_web_front_lib_rich_part = {
        kind: 'text';
        value: string;
    } | {
        kind: 'math';
        value: string;
        display: boolean;
    };
    function $raggu_web_front_lib_rich_html(text: string): boolean;
    function $raggu_web_front_lib_rich_math(text: string): boolean;
    function $raggu_web_front_lib_rich_markup(text: string): boolean;
    function $raggu_web_front_lib_rich_split(text: string): $raggu_web_front_lib_rich_part[];
}

declare namespace $ {
    function $raggu_web_front_lib_lang(): 'ru' | 'en';
    function $raggu_web_front_lib_compact(n: number, locale?: "ru" | "en"): string;
    function $raggu_web_front_lib_badge(n: number): string;
    function $raggu_web_front_lib_full(n: number, locale?: "ru" | "en"): string;
    function $raggu_web_front_lib_ms(value: number): string;
    function $raggu_web_front_lib_watt_hours(value: number): string;
    function $raggu_web_front_lib_humanize(raw: string): string;
    function $raggu_web_front_lib_clamp(value: number, min: number, max: number): number;
    function $raggu_web_front_lib_entity_name(raw: string): string;
    function $raggu_web_front_lib_relation_name(raw: string): string;
}

declare namespace $ {
    type $raggu_web_front_lib_settings_value = {
        useGraph: boolean;
        queryPlan: boolean;
        topK: number;
        rerank: boolean;
        graphLimit: number;
    };
    const $raggu_web_front_lib_settings_default: $raggu_web_front_lib_settings_value;
    const $raggu_web_front_lib_graph_limit_max = 5000;
    const $raggu_web_front_lib_graph_limit_steps: readonly [600, 1500, 3000, 5000];
    const $raggu_web_front_lib_top_k_min = 1;
    const $raggu_web_front_lib_top_k_max = 50;
    function $raggu_web_front_lib_settings_revive(raw: unknown): $raggu_web_front_lib_settings_value;
    class $raggu_web_front_lib_settings extends $mol_object {
        static value(next?: $raggu_web_front_lib_settings_value): $raggu_web_front_lib_settings_value;
        static patch(patch: Partial<$raggu_web_front_lib_settings_value>): void;
        static reset(): void;
    }
}

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
    /**
     * Operation descriptor produced by the generator in `-openapi/*.ts`.
     * Each entry carries HTTP method, route template with `{placeholders}`,
     * plus typed `params` / `query` / `body` / `out` marker fields.
     */
    type $raggu_web_front_api_operation = {
        method: string;
        route: string;
        params: any;
        query: any;
        body: any;
        out: any;
    };
    /** Options passed alongside operation call. */
    type $raggu_web_front_api_options<Op extends $raggu_web_front_api_operation> = {
        params?: Op['params'];
        query?: Op['query'];
        body?: Op['body'];
    };
    /**
     * Backend base URL — the ONE line to change when the backend is deployed.
     * No path suffix here: operation `route`s already carry `/api/v1/...`
     * from FastAPI's OpenAPI dump.
     */
    const $raggu_web_front_api_endpoint_default = "https://ragu-back.duckdns.org";
    /**
     * Effective endpoint: the `?api=<url>` app argument overrides the default,
     * so a freshly deployed backend can be pointed at WITHOUT a rebuild —
     * e.g. `...test.html#!api=https%3A%2F%2Fback.example.com`.
     * Reactive: reads propagate via $mol_state_arg, so changing the arg refetches.
     */
    function $raggu_web_front_api_endpoint(): string;
    /**
     * Локаль для бэкенда: RAGU принимает только `ru` | `en`, а $mol_locale.lang()
     * отдаёт что угодно из navigator.language. Всё, что не русское, считаем
     * английским — тексты view.tree по умолчанию тоже английские.
     * Реактивно: смена языка в сайдбаре перефетчивает карточки и подсказки.
     */
    function $raggu_web_front_api_locale(): 'ru' | 'en';
    /**
     * Детали ребра — симметрично get_node. На бэке ручки ПОКА НЕТ, дескриптор
     * написан руками под согласованный контракт. Когда бэк добавит её в
     * openapi.json, генератор создаст одноимённую константу в ragu.openapi.ts —
     * тогда эту удалить (билд сам напомнит конфликтом имён). Фронт до тех пор
     * фолбэчится на данные из get_graph.
     */
    const $raggu_web_front_api_ragu_get_edge: {
        method: string;
        route: string;
        params: {
            dataset_id: string;
            edge_id: string;
        };
        query: Record<string, never>;
        body: never;
        out: {
            id: string;
            source: string;
            target: string;
            relation_type: string;
            description: string;
            strength?: number;
            chunk_ids?: string[];
        };
    };
    /**
     * Typed REST client factory for OpenAPI-generated operation descriptors.
     *
     * Returns a callable that takes an operation constant plus options and
     * synchronously (via wire) returns the parsed JSON body. Any network
     * error propagates as an exception so `$mol_view` shows an error plate.
     */
    const $raggu_web_front_api: <Op extends $raggu_web_front_api_operation>(op: Op, opts?: $raggu_web_front_api_options<Op>) => Op["out"];
}

declare namespace $.$raggu_web_front_api_ragu {
    /**
     * This file was auto-generated by openapi-typescript.
     * Do not make direct changes to the file.
     */
    interface paths {
        "/api/v1/health": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Service health check */
            get: operations["health"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/capabilities": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Runtime feature flags */
            get: operations["capabilities"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** List preindexed datasets */
            get: operations["list_datasets"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Get dataset details */
            get: operations["get_dataset"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/graph": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Get graph node-link data */
            get: operations["get_graph"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/graph/nodes/{node_id}": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Get entity card data */
            get: operations["get_node"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/graph/nodes/{node_id}/neighbors": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Get a node neighborhood subgraph */
            get: operations["get_node_neighbors"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/graph/communities": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** List graph communities */
            get: operations["get_communities"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/agent/messages": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            get?: never;
            put?: never;
            /** Ask a question over a dataset graph */
            post: operations["create_agent_message"];
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/agent/messages/stream": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            get?: never;
            put?: never;
            /** Ask a question and receive the answer as it is generated */
            post: operations["stream_agent_message"];
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
        "/api/v1/datasets/{dataset_id}/agent/suggestions": {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** Get dataset-specific starter questions */
            get: operations["get_agent_suggestions"];
            put?: never;
            post?: never;
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
    }
    type webhooks = Record<string, never>;
    interface components {
        schemas: {
            /** AgentRequest */
            AgentRequest: {
                /**
                 * Message
                 * @example Who wrote the Norwegian anthem?
                 */
                message: string;
                /** History */
                history?: components["schemas"]["ChatMessage"][];
                /**
                 * Engine
                 * @default mix
                 * @enum {string}
                 */
                engine: "local" | "global" | "naive" | "mix" | "query_plan";
                /**
                 * Use Query Plan
                 * @default false
                 */
                use_query_plan: boolean;
                /**
                 * Top K
                 * @default 8
                 */
                top_k: number;
                /**
                 * Rerank
                 * @default true
                 */
                rerank: boolean;
                /**
                 * Include Trace
                 * @default true
                 */
                include_trace: boolean;
                /**
                 * Locale
                 * @description Interface locale. Does not control the answer language, which is detected from the user's message.
                 * @default ru
                 * @enum {string}
                 */
                locale: "ru" | "en";
            };
            /** AgentResponse */
            AgentResponse: {
                message: components["schemas"]["AssistantMessage"];
            };
            /** AnswerTrace */
            AnswerTrace: {
                /**
                 * Engine
                 * @enum {string}
                 */
                engine: "local" | "global" | "naive" | "mix";
                /** Top K */
                top_k: number;
                /** Rerank */
                rerank: boolean;
                /** Rerank Error */
                rerank_error?: string | null;
                query_plan?: components["schemas"]["TraceQueryPlan"] | null;
                /** Entities */
                entities?: components["schemas"]["TraceEntity"][];
                /** Relations */
                relations?: components["schemas"]["TraceRelation"][];
                /** Chunks */
                chunks?: components["schemas"]["TraceChunk"][];
                /** Communities */
                communities?: components["schemas"]["TraceCommunity"][];
                timings: components["schemas"]["TraceTimings"];
                usage?: components["schemas"]["TraceUsage"] | null;
                energy: components["schemas"]["TraceEnergy"];
                highlight: components["schemas"]["GraphHighlight"];
            };
            /** AssistantMessage */
            AssistantMessage: {
                /** Id */
                id: string;
                /**
                 * Role
                 * @default assistant
                 * @constant
                 */
                role: "assistant";
                /** Content */
                content: string;
                /**
                 * Created At
                 * Format: date-time
                 */
                created_at: string;
                trace?: components["schemas"]["AnswerTrace"] | null;
            };
            /** CapabilitiesResponse */
            CapabilitiesResponse: {
                /** Preindexed Datasets */
                preindexed_datasets: boolean;
                /** Graph Explorer */
                graph_explorer: boolean;
                /** Agent Chat */
                agent_chat: boolean;
                /** Upload Document */
                upload_document: boolean;
                /** Upload Index */
                upload_index: boolean;
                /** Live Indexing */
                live_indexing: boolean;
                /** Job Queue */
                job_queue: boolean;
                /** Gpu Worker */
                gpu_worker: boolean;
            };
            /** ChatMessage */
            ChatMessage: {
                /**
                 * Role
                 * @example user
                 * @enum {string}
                 */
                role: "user" | "assistant";
                /**
                 * Content
                 * @example Who wrote the Norwegian anthem?
                 */
                content: string;
            };
            /** CommunitySummary */
            CommunitySummary: {
                /**
                 * Id
                 * @example wiki-c1
                 */
                id: string;
                /**
                 * Title
                 * @example Norwegian literature
                 */
                title: string;
                /** Summary */
                summary: string;
                /**
                 * Level
                 * @example 0
                 */
                level: number;
                /**
                 * Size
                 * @example 8
                 */
                size: number;
                /** Node Ids */
                node_ids?: string[];
            };
            /** DatasetBadge */
            DatasetBadge: {
                /**
                 * Label
                 * @example model
                 */
                label: string;
                /**
                 * Value
                 * @example meno-lite-7b
                 */
                value: string;
            };
            /** DatasetCard */
            DatasetCard: {
                /**
                 * Id
                 * @example wiki
                 */
                id: string;
                /**
                 * Title
                 * @example Wikipedia topic slice
                 */
                title: string;
                /**
                 * Domain
                 * @example Wikipedia
                 */
                domain: string;
                /** Description */
                description: string;
                /**
                 * Language
                 * @enum {string}
                 */
                language: "ru" | "en" | "mixed";
                /** Tags */
                tags?: string[];
                stats: components["schemas"]["DatasetStats"];
                /** Badges */
                badges?: components["schemas"]["DatasetBadge"][];
                preview: components["schemas"]["DatasetPreview"];
                /** Suggested Questions */
                suggested_questions?: string[];
            };
            /** DatasetDetail */
            DatasetDetail: {
                /**
                 * Id
                 * @example wiki
                 */
                id: string;
                /**
                 * Title
                 * @example Wikipedia topic slice
                 */
                title: string;
                /**
                 * Domain
                 * @example Wikipedia
                 */
                domain: string;
                /** Description */
                description: string;
                /**
                 * Language
                 * @enum {string}
                 */
                language: "ru" | "en" | "mixed";
                /** Tags */
                tags?: string[];
                stats: components["schemas"]["DatasetStats"];
                /** Badges */
                badges?: components["schemas"]["DatasetBadge"][];
                preview: components["schemas"]["DatasetPreview"];
                /** Suggested Questions */
                suggested_questions?: string[];
                /**
                 * Default Engine
                 * @default mix
                 * @enum {string}
                 */
                default_engine: "local" | "global" | "naive" | "mix" | "query_plan";
                /** Available Engines */
                available_engines?: ("local" | "global" | "naive" | "mix" | "query_plan")[];
                /**
                 * Created At
                 * Format: date-time
                 */
                created_at: string;
                /**
                 * Updated At
                 * Format: date-time
                 */
                updated_at: string;
            };
            /** DatasetPreview */
            DatasetPreview: {
                /**
                 * Kind
                 * @default graph
                 * @constant
                 */
                kind: "graph";
                /**
                 * Node Count
                 * @example 80
                 */
                node_count: number;
                /**
                 * Edge Count
                 * @example 130
                 */
                edge_count: number;
                /**
                 * Primary Entity Types
                 * @example [
                 *       "PERSON",
                 *       "LAW"
                 *     ]
                 */
                primary_entity_types?: string[];
            };
            /** DatasetStats */
            DatasetStats: {
                /**
                 * Nodes
                 * @example 2400
                 */
                nodes: number;
                /**
                 * Edges
                 * @example 7100
                 */
                edges: number;
                /**
                 * Communities
                 * @example 38
                 */
                communities: number;
                /**
                 * Chunks
                 * @example 320
                 */
                chunks: number;
                /**
                 * Documents
                 * @example 12
                 */
                documents: number;
            };
            /** ErrorDetail */
            ErrorDetail: {
                /**
                 * Code
                 * @example dataset_not_found
                 */
                code: string;
                /**
                 * Message
                 * @example Dataset 'unknown' was not found.
                 */
                message: string;
            };
            /** ErrorResponse */
            ErrorResponse: {
                detail: components["schemas"]["ErrorDetail"];
            };
            /** GraphCommunitiesResponse */
            GraphCommunitiesResponse: {
                /** Dataset Id */
                dataset_id: string;
                /** Communities */
                communities: components["schemas"]["CommunitySummary"][];
            };
            /** GraphEdge */
            GraphEdge: {
                /**
                 * Id
                 * @example wiki-e1
                 */
                id: string;
                /**
                 * Source
                 * @example wiki-n1
                 */
                source: string;
                /**
                 * Target
                 * @example wiki-n2
                 */
                target: string;
                /**
                 * Relation Type
                 * @example AUTHORED
                 */
                relation_type: string;
                /** Description */
                description: string;
                /**
                 * Strength
                 * @example 0.86
                 */
                strength: number;
                /** Source Chunk Ids */
                source_chunk_ids?: string[];
            };
            /** GraphFilters */
            GraphFilters: {
                /** Search */
                search?: string | null;
                /** Entity Types */
                entity_types?: string[] | null;
                /** Community Ids */
                community_ids?: string[] | null;
                /**
                 * Min Strength
                 * @default 0
                 */
                min_strength: number;
            };
            /** GraphHighlight */
            GraphHighlight: {
                /** Node Ids */
                node_ids?: string[];
                /** Edge Ids */
                edge_ids?: string[];
                /** Community Ids */
                community_ids?: string[];
            };
            /** GraphMeta */
            GraphMeta: {
                /** Dataset Id */
                dataset_id: string;
                /** Total Nodes */
                total_nodes: number;
                /** Total Edges */
                total_edges: number;
                /** Returned Nodes */
                returned_nodes: number;
                /** Returned Edges */
                returned_edges: number;
                /** Limit */
                limit: number;
                filters: components["schemas"]["GraphFilters"];
            };
            /** GraphNode */
            GraphNode: {
                /**
                 * Id
                 * @example wiki-n1
                 */
                id: string;
                /**
                 * Label
                 * @example Bjoernstjerne Bjoernson
                 */
                label: string;
                /** Entity Type */
                entity_type: string;
                /** Description */
                description: string;
                /** Degree */
                degree: number;
                /**
                 * Community Id
                 * @example wiki-c1
                 */
                community_id?: string | null;
                /**
                 * X
                 * @example -120.5
                 */
                x: number;
                /**
                 * Y
                 * @example 82
                 */
                y: number;
                /** Source Chunk Ids */
                source_chunk_ids?: string[];
            };
            /** GraphResponse */
            GraphResponse: {
                /** Nodes */
                nodes: components["schemas"]["GraphNode"][];
                /** Edges */
                edges: components["schemas"]["GraphEdge"][];
                /** Communities */
                communities?: components["schemas"]["CommunitySummary"][];
                meta: components["schemas"]["GraphMeta"];
            };
            /** HTTPValidationError */
            HTTPValidationError: {
                /** Detail */
                detail?: components["schemas"]["ValidationError"][];
            };
            /** HealthResponse */
            HealthResponse: {
                /**
                 * Status
                 * @example ok
                 * @constant
                 */
                status: "ok";
                /**
                 * Service
                 * @example ragu-web-api
                 */
                service: string;
                /**
                 * Version
                 * @example 0.1.0
                 */
                version: string;
                /**
                 * Time
                 * Format: date-time
                 */
                time: string;
            };
            /** NodeDetailResponse */
            NodeDetailResponse: {
                node: components["schemas"]["GraphNode"];
                /** Incoming Relations */
                incoming_relations?: components["schemas"]["NodeRelation"][];
                /** Outgoing Relations */
                outgoing_relations?: components["schemas"]["NodeRelation"][];
                /** Provenance Chunks */
                provenance_chunks?: components["schemas"]["ProvenanceChunk"][];
            };
            /** NodeRelation */
            NodeRelation: {
                /**
                 * Id
                 * @example wiki-e1
                 */
                id: string;
                /**
                 * Source
                 * @example wiki-n1
                 */
                source: string;
                /**
                 * Target
                 * @example wiki-n2
                 */
                target: string;
                /**
                 * Relation Type
                 * @example AUTHORED
                 */
                relation_type: string;
                /** Description */
                description: string;
                /**
                 * Strength
                 * @example 0.86
                 */
                strength: number;
                /** Source Chunk Ids */
                source_chunk_ids?: string[];
                /**
                 * Direction
                 * @enum {string}
                 */
                direction: "incoming" | "outgoing";
                /** Other Node Id */
                other_node_id: string;
                /** Other Node Label */
                other_node_label: string;
            };
            /** ProvenanceChunk */
            ProvenanceChunk: {
                /**
                 * Id
                 * @example wiki-chunk-1
                 */
                id: string;
                /** Content */
                content: string;
                /** Doc Id */
                doc_id: string;
                /** Chunk Order Idx */
                chunk_order_idx: number;
            };
            /** SuggestionsResponse */
            SuggestionsResponse: {
                /** Dataset Id */
                dataset_id: string;
                /** Suggestions */
                suggestions: string[];
            };
            /** TraceChunk */
            TraceChunk: {
                /** Id */
                id: string;
                /** Content */
                content: string;
                /** Doc Id */
                doc_id: string;
                /** Score */
                score: number;
            };
            /** TraceCommunity */
            TraceCommunity: {
                /** Id */
                id: string;
                /** Title */
                title: string;
                /** Summary */
                summary: string;
                /** Score */
                score: number;
            };
            /** TraceEnergy */
            TraceEnergy: {
                /** Watt Hours */
                watt_hours: number;
                /**
                 * Estimated
                 * @default true
                 */
                estimated: boolean;
                /**
                 * Formula
                 * @default TDP * time * PUE
                 */
                formula: string;
            };
            /** TraceEntity */
            TraceEntity: {
                /** Id */
                id: string;
                /** Label */
                label: string;
                /** Entity Type */
                entity_type: string;
                /** Score */
                score: number;
            };
            /** TraceQueryPlan */
            TraceQueryPlan: {
                /** Used */
                used: boolean;
                /** Sub Questions */
                sub_questions?: string[];
            };
            /** TraceRelation */
            TraceRelation: {
                /** Id */
                id: string;
                /** Source */
                source: string;
                /** Target */
                target: string;
                /** Relation Type */
                relation_type: string;
                /** Strength */
                strength: number;
            };
            /** TraceStageUsage */
            TraceStageUsage: {
                /**
                 * Stage
                 * @example mix
                 */
                stage: string;
                /** Calls */
                calls: number;
                /** Prompt Tokens */
                prompt_tokens: number;
                /** Completion Tokens */
                completion_tokens: number;
            };
            /** TraceTimings */
            TraceTimings: {
                /** Retrieval Ms */
                retrieval_ms: number;
                /** Generation Ms */
                generation_ms: number;
                /** Total Ms */
                total_ms: number;
            };
            /** TraceUsage */
            TraceUsage: {
                /**
                 * Estimated
                 * @default true
                 */
                estimated: boolean;
                /** Calls */
                calls: number;
                /** Prompt Tokens */
                prompt_tokens: number;
                /** Completion Tokens */
                completion_tokens: number;
                /** Total Tokens */
                total_tokens: number;
                /** Stages */
                stages?: components["schemas"]["TraceStageUsage"][];
                /** Cost */
                cost: number;
                /**
                 * Currency
                 * @default
                 * @example ₽
                 */
                currency: string;
                /**
                 * Priced
                 * @description Whether token prices are configured at all
                 */
                priced: boolean;
            };
            /** ValidationError */
            ValidationError: {
                /** Location */
                loc: (string | number)[];
                /** Message */
                msg: string;
                /** Error Type */
                type: string;
                /** Input */
                input?: unknown;
                /** Context */
                ctx?: Record<string, never>;
            };
        };
        responses: never;
        parameters: never;
        requestBodies: never;
        headers: never;
        pathItems: never;
    }
    type defs = Record<string, never>;
    interface operations {
        health: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HealthResponse"];
                    };
                };
            };
        };
        capabilities: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CapabilitiesResponse"];
                    };
                };
            };
        };
        list_datasets: {
            parameters: {
                query?: {
                    /** @description Response locale. */
                    locale?: "ru" | "en";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DatasetCard"][];
                    };
                };
                /** @description Dataset not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_dataset: {
            parameters: {
                query?: {
                    /** @description Response locale. */
                    locale?: "ru" | "en";
                };
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DatasetDetail"];
                    };
                };
                /** @description Dataset not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_graph: {
            parameters: {
                query?: {
                    limit?: number;
                    search?: string | null;
                    entity_types?: string[] | null;
                    community_ids?: string[] | null;
                    min_strength?: number;
                    include_communities?: boolean;
                };
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GraphResponse"];
                    };
                };
                /** @description Dataset or graph resource not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_node: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    dataset_id: string;
                    node_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NodeDetailResponse"];
                    };
                };
                /** @description Dataset or graph resource not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_node_neighbors: {
            parameters: {
                query?: {
                    depth?: number;
                    limit?: number;
                    min_strength?: number;
                };
                header?: never;
                path: {
                    dataset_id: string;
                    node_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GraphResponse"];
                    };
                };
                /** @description Dataset or graph resource not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_communities: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GraphCommunitiesResponse"];
                    };
                };
                /** @description Dataset or graph resource not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        create_agent_message: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AgentRequest"];
                };
            };
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AgentResponse"];
                    };
                };
                /** @description Dataset not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        stream_agent_message: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AgentRequest"];
                };
            };
            responses: {
                /** @description Server-Sent Events: `delta` with `{text}` for each piece of the answer, then `message` with the same body as `POST /messages`. A failure after the stream has started arrives as `error` with `{code, message}`, and no `message` follows it. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/event-stream": string;
                    };
                };
                /** @description Dataset not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
        get_agent_suggestions: {
            parameters: {
                query?: {
                    /** @description Response locale. */
                    locale?: "ru" | "en";
                };
                header?: never;
                path: {
                    dataset_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SuggestionsResponse"];
                    };
                };
                /** @description Dataset not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Validation Error */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HTTPValidationError"];
                    };
                };
            };
        };
    }
}
declare namespace $ {
    const $raggu_web_front_api_ragu_health: {
        method: string;
        route: string;
        params: undefined;
        query: undefined;
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["health"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_capabilities: {
        method: string;
        route: string;
        params: undefined;
        query: undefined;
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["capabilities"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_list_datasets: {
        method: string;
        route: string;
        params: undefined;
        query: $raggu_web_front_api_ragu.operations["list_datasets"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["list_datasets"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_dataset: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_dataset"]["parameters"]["path"];
        query: $raggu_web_front_api_ragu.operations["get_dataset"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_dataset"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_graph: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_graph"]["parameters"]["path"];
        query: $raggu_web_front_api_ragu.operations["get_graph"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_graph"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_node: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_node"]["parameters"]["path"];
        query: undefined;
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_node"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_node_neighbors: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_node_neighbors"]["parameters"]["path"];
        query: $raggu_web_front_api_ragu.operations["get_node_neighbors"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_node_neighbors"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_communities: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_communities"]["parameters"]["path"];
        query: undefined;
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_communities"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_create_agent_message: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["create_agent_message"]["parameters"]["path"];
        query: undefined;
        body: ($raggu_web_front_api_ragu.operations["create_agent_message"]["requestBody"] extends {
            content: {
                "application/json": infer B;
            };
        } ? B : unknown);
        out: NonNullable<$raggu_web_front_api_ragu.operations["create_agent_message"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_stream_agent_message: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["stream_agent_message"]["parameters"]["path"];
        query: undefined;
        body: ($raggu_web_front_api_ragu.operations["stream_agent_message"]["requestBody"] extends {
            content: {
                "application/json": infer B;
            };
        } ? B : unknown);
        out: NonNullable<$raggu_web_front_api_ragu.operations["stream_agent_message"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $raggu_web_front_api_ragu_get_agent_suggestions: {
        method: string;
        route: string;
        params: $raggu_web_front_api_ragu.operations["get_agent_suggestions"]["parameters"]["path"];
        query: $raggu_web_front_api_ragu.operations["get_agent_suggestions"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$raggu_web_front_api_ragu.operations["get_agent_suggestions"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
}

declare namespace $ {
    type $raggu_web_front_mock_answer = $raggu_web_front_graph_answer & {
        question: string;
    };
    export class $raggu_web_front_mock extends $mol_object {
        static enabled(): boolean;
        static root(): string;
        static files: Map<string, Promise<any>>;
        static file<Result>(name: string): Promise<Result>;
        static json<Result>(path: string): Promise<Result>;
        static response(path: string, init?: RequestInit): Promise<Response>;
        static lang(raw?: string | null): "ru" | "en";
        static reply(data: unknown): Response;
        static fresh(answer: $raggu_web_front_mock_answer): {
            id: string;
            created_at: string;
            content: string;
            trace?: $raggu_web_front_graph_trace | null;
        };
        static graph(corpus: string, query: URLSearchParams): Promise<{
            nodes: $raggu_web_front_graph_node[];
            edges: $raggu_web_front_graph_edge[];
            communities: $raggu_web_front_graph_community[] | undefined;
            meta: {
                returned_nodes: number;
                returned_edges: number;
                limit: number;
                dataset_id: string;
                total_nodes: number;
                total_edges: number;
            };
        }>;
        static node(corpus: string, id: string): Promise<$raggu_web_front_graph_detail>;
        static stream(answer: $raggu_web_front_mock_answer, signal?: AbortSignal): Response;
    }
    export {};
}

declare namespace $ {
    class $raggu_web_front_data extends $mol_object {
        static api(): string;
        static request(path: string, init?: RequestInit): Promise<Response>;
        static fetch<Result>(path: string, init?: RequestInit): Result;
        static version(next?: number): number;
        static retry(): void;
        static datasets(lang: 'ru' | 'en'): $raggu_web_front_graph_dataset[];
        static datasets_now(): $raggu_web_front_graph_dataset[];
        static graph(key: string): $raggu_web_front_graph_response;
        static communities(id: string): $raggu_web_front_graph_community[];
        static graph_part(key: string): $raggu_web_front_graph_response;
        static node(key: string): $raggu_web_front_graph_detail;
        static suggestions(key: string): string[];
    }
    /** Value or null while it is on the wire; real errors still surface. */
    function $raggu_web_front_data_ready<Value>(task: () => Value): Value | null;
    /** Value, null while pending, or the error itself, so the view can say what failed. */
    function $raggu_web_front_data_state<Value>(task: () => Value): {
        value: Value | null;
        error: Error | null;
        pending: boolean;
    };
}

declare namespace $ {
    type $raggu_web_front_viewer_entry = {
        id: string;
        role: 'user' | 'assistant';
        content: string;
        trace?: $raggu_web_front_graph_trace | null;
    };
    type $raggu_web_front_viewer_shown = {
        corpus: string;
        model: $raggu_web_front_graph_model;
        positions: Float32Array;
    };
    class $raggu_web_front_viewer extends $mol_object {
        corpus(next?: string): string;
        mode(): "graph" | "ambient";
        settings(): $raggu_web_front_lib_settings_value;
        graph_visible(corpus: string, next?: boolean): boolean;
        chat_visible(corpus: string, next?: boolean): boolean;
        graph_open(next?: boolean): boolean;
        chat_open(next?: boolean): boolean;
        toggle_graph(): void;
        toggle_chat(): void;
        selected_in(corpus: string, next?: string | null): string | null;
        selected(next?: string | null): string | null;
        hover(next?: string | null): string | null;
        search_in(corpus: string, next?: string): string;
        search(next?: string): string;
        types_in(corpus: string, next?: readonly string[]): readonly string[];
        types(next?: readonly string[]): readonly string[];
        communities_in(corpus: string, next?: readonly string[]): readonly string[];
        communities(next?: readonly string[]): readonly string[];
        highlight_in(corpus: string, next?: readonly string[]): readonly string[];
        highlight(next?: readonly string[]): readonly string[];
        toggle_type(name: string): void;
        toggle_community(id: string): void;
        filtering(): boolean;
        clear_filters(): void;
        stage(next?: $raggu_web_front_scene_rect | null): $raggu_web_front_scene_rect | null;
        reset_token(next?: number): number;
        recentre(): void;
        whole(corpus: string, next?: $raggu_web_front_graph_response | null): $raggu_web_front_graph_response | null;
        response(): $raggu_web_front_graph_response | null;
        model(): $raggu_web_front_graph_model | null;
        progress(next?: number): number;
        layout_task: null | {
            cancel: () => void;
        };
        positions(): Float32Array<ArrayBufferLike> | null;
        solve(model: $raggu_web_front_graph_model): Promise<Float32Array<ArrayBufferLike>>;
        solved: null | $raggu_web_front_viewer_shown;
        shown(): $raggu_web_front_viewer_shown | null;
        shown_now(): $raggu_web_front_viewer_shown | null;
        graph_state(): {
            value: $raggu_web_front_graph_response | null;
            error: Error | null;
            pending: boolean;
        };
        solving(): boolean;
        cold(): boolean;
        warm(): boolean;
        entries(corpus: string, next?: readonly $raggu_web_front_viewer_entry[]): readonly $raggu_web_front_viewer_entry[];
        pending(corpus: string, next?: boolean): boolean;
        partial(corpus: string, next?: string | null): string | null;
        failure(corpus: string, next?: string | null): string | null;
        started(corpus: string, next?: number | null): number | null;
        aborts: Map<string, AbortController>;
        next_id(prefix: string): string;
        keep_partial(corpus: string): readonly $raggu_web_front_viewer_entry[];
        stop(corpus?: string): void;
        clear_thread(corpus?: string): void;
        ask(text: string): void;
        failed_text(): string;
        send(text: string): void;
        /** Pulls the rest of the corpus community by community: the gateway has no paging and caps a request at 5000. */
        load_whole(on_progress: (ratio: number) => void): Promise<{
            complete: boolean;
            clipped: string[];
        }>;
    }
    function $raggu_web_front_viewer_ask(corpus: string, body: object, signal: AbortSignal, on_delta: (text: string) => void): Promise<$raggu_web_front_graph_answer>;
}

interface $npm {
}

declare var $npm: $npm;

declare namespace $ {
    type $raggu_web_front_scene_state = {
        mode: 'ambient' | 'graph';
        theme: 'light' | 'dark';
        graph_visible: boolean;
        shown: $raggu_web_front_viewer_shown | null;
        selected: string | null;
        hover: string | null;
        search: string;
        types: readonly string[];
        communities: readonly string[];
        highlight: readonly string[];
        stage: $raggu_web_front_scene_rect | null;
        reset_token: number;
    };
    type $raggu_web_front_scene_host = {
        state(): $raggu_web_front_scene_state;
        hover(next: string | null): void;
        select(id: string | null): void;
    };
    function $raggu_web_front_scene_engine(layer: HTMLElement, host: $raggu_web_front_scene_host): {
        destroy(): void;
    };
}

declare namespace $ {
    const $raggu_web_front_scene_point_vert = "\nattribute float aSize;\nattribute float aAlpha;\nattribute vec3 aColor;\nuniform float uScale;\nuniform float uOpacity;\nuniform float uNear;\nuniform float uFar;\nuniform vec3 uHaze;\nuniform float uHazeAmount;\nvarying vec3 vColor;\nvarying float vAlpha;\n\nvoid main() {\n    vec4 mv = modelViewMatrix * vec4(position, 1.0);\n    float depth = -mv.z;\n    float fade = smoothstep(uFar, uNear, depth);\n    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));\n    vAlpha = aAlpha * uOpacity * mix(0.3, 1.0, fade);\n    gl_PointSize = aSize * (uScale / max(depth, 0.001));\n    gl_Position = projectionMatrix * mv;\n}\n";
    const $raggu_web_front_scene_point_frag = "\nuniform float uSoft;\nvarying vec3 vColor;\nvarying float vAlpha;\n\nvoid main() {\n    vec2 uv = gl_PointCoord - 0.5;\n    float d = length(uv) * 2.0;\n    if (d > 1.0) discard;\n    float core = smoothstep(1.0, 0.18, d);\n    float glow = pow(1.0 - d, 2.4);\n    float a = mix(core, glow, uSoft) * vAlpha;\n    if (a < 0.004) discard;\n    gl_FragColor = vec4(vColor, a);\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n}\n";
    const $raggu_web_front_scene_line_vert = "\nattribute float aAlpha;\nattribute vec3 aColor;\nuniform float uOpacity;\nuniform float uNear;\nuniform float uFar;\nuniform vec3 uHaze;\nuniform float uHazeAmount;\nvarying vec3 vColor;\nvarying float vAlpha;\n\nvoid main() {\n    vec4 mv = modelViewMatrix * vec4(position, 1.0);\n    float fade = smoothstep(uFar, uNear, -mv.z);\n    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));\n    vAlpha = aAlpha * uOpacity * mix(0.2, 1.0, fade);\n    gl_Position = projectionMatrix * mv;\n}\n";
    const $raggu_web_front_scene_line_frag = "\nvarying vec3 vColor;\nvarying float vAlpha;\n\nvoid main() {\n    if (vAlpha < 0.004) discard;\n    gl_FragColor = vec4(vColor, vAlpha);\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n}\n";
    function $raggu_web_front_scene_point_scale(height: number, ratio: number, fov: number): number;
    type $raggu_web_front_scene_rect = {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    function $raggu_web_front_scene_frame(stage: $raggu_web_front_scene_rect | null, viewport: {
        width: number;
        height: number;
    }): {
        full_width: number;
        full_height: number;
        offset_x: number;
        offset_y: number;
        width: number;
        height: number;
    } | null;
    function $raggu_web_front_scene_degree_ramp(degree: number, max: number): number;
}

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
declare namespace $.$$ {
    class $raggu_web_front_scene_layer extends $mol_view {
        sub_visible(): readonly $mol_view_content[];
    }
    class $raggu_web_front_scene extends $.$raggu_web_front_scene {
        state(): $raggu_web_front_scene_state;
        interactive(): boolean;
        mounted(next?: boolean): boolean;
        engine(): {
            destroy(): void;
        } & {
            destructor: () => void;
        };
        last_state: null | $raggu_web_front_scene_state;
        state_empty(): $raggu_web_front_scene_state;
        auto(): never;
    }
}

declare namespace $ {
}

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
}

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
declare namespace $.$$ {
    class $mol_image extends $.$mol_image {
        natural_width(next?: null): number;
        natural_height(next?: null): number;
        load(): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $raggu_web_front_mark extends $mol_image {
		data_uri( ): string
		uri( ): ReturnType< $raggu_web_front_mark['data_uri'] >
		title( ): string
	}
	
}

//# sourceMappingURL=mark.view.tree.d.ts.map
declare namespace $.$$ {
    class $raggu_web_front_mark extends $.$raggu_web_front_mark {
        data_uri(): string;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_pop extends $.$raggu_web_front_pop {
        toggle(): void;
        close(): void;
        bubble_keydown(event: KeyboardEvent): void;
        place(): void;
        watch(): {
            destructor: () => void;
        } | null;
        auto(): never;
    }
}

declare namespace $ {
}

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
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision: number, reset?: null): $mol_after_timeout | $mol_after_frame;
        static now(precision: number): number;
    }
}

declare namespace $.$$ {
    /** Base SVG component to display SVG images or icons. */
    class $mol_svg extends $.$mol_svg {
        computed_style(): Record<string, any>;
        font_size(): number;
        font_family(): any;
    }
}

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
}

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
}

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
declare namespace $.$$ {
    class $raggu_web_front_chrome_switcher extends $.$raggu_web_front_chrome_switcher {
        datasets(): $raggu_web_front_graph_dataset[] | null;
        current_title(): string;
        rows(): $raggu_web_front_skeleton[] | $.$raggu_web_front_link[];
        row_item(id: string): $raggu_web_front_graph_dataset;
        row_id(id: string): string;
        row_title(id: string): string;
        row_domain(id: string): string;
        row_count(id: string): string;
        row_current(id: string): boolean;
        row_click(): void;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_chrome_tools extends $.$raggu_web_front_chrome_tools {
        recentre(): void;
        meta(): $raggu_web_front_graph_meta | null;
        shown(): number;
        total(): number;
        stale(): boolean;
        stale_class(): "" | "is-stale";
        shown_badge(): string;
        total_badge(): string;
        shown_full(): string;
        total_full(): string;
        bar_width(): string;
        limit(): number;
        next_step(): 600 | 1500 | 3000 | 5000 | null;
        beyond_cap(): boolean;
        whole_pending(next?: boolean): boolean;
        whole_progress(next?: number): number;
        whole_failed(next?: boolean): boolean;
        whole_clipped(next?: number): number;
        action(): ($.$mol_button | $raggu_web_front_text)[];
        more_enabled(): boolean;
        more_text(): string;
        more(): void;
        rest_enabled(): boolean;
        rest_text(): string;
        clipped_text(): string;
        rest(): void;
    }
}

declare namespace $ {
}

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
}

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
declare namespace $.$$ {
    class $raggu_web_front_chrome extends $.$raggu_web_front_chrome {
        corpus(): string;
        corpus_page(): boolean;
        scrolled(next?: boolean): boolean;
        scroll_watch(): {
            destructor: () => void;
        };
        right(): ($mol_view | $.$raggu_web_front_chrome_tools)[];
        centre_kind(): "corpus" | "home";
        home_active(): string;
        home_inert(): string;
        corpus_active(): string;
        corpus_inert(): string;
        graph_active(): boolean;
        chat_active(): boolean;
        toggle_graph(): void;
        toggle_chat(): void;
        scroll_to(id: string): void;
        to_pipeline(): void;
        to_corpora(): void;
        height_publish(): {
            destructor: () => void;
        };
        auto(): never;
    }
}

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
declare namespace $.$$ {
    class $raggu_web_front_chrome_theme extends $.$raggu_web_front_chrome_theme {
        Current_icon(): $raggu_web_front_icon_display | $raggu_web_front_icon_moon | $raggu_web_front_icon_sun;
        light_checked(): boolean;
        dark_checked(): boolean;
        system_checked(): boolean;
        pick(next: string): void;
        pick_light(): void;
        pick_dark(): void;
        pick_system(): void;
    }
    class $raggu_web_front_chrome_lang extends $.$raggu_web_front_chrome_lang {
        en_checked(): boolean;
        ru_checked(): boolean;
        pick(next: 'en' | 'ru'): void;
        pick_en(): void;
        pick_ru(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_settings extends $.$raggu_web_front_settings {
        settings(): $raggu_web_front_lib_settings_value;
        use_graph(next?: boolean): boolean;
        query_plan(next?: boolean): boolean;
        rerank(next?: boolean): boolean;
        top_k_draft(next?: string): string;
        top_k_input(event: Event): void;
        top_k_commit(): void;
        top_k_key(event: KeyboardEvent): void;
        top_k_step(delta: number): void;
        top_k_less(): void;
        top_k_more(): void;
        top_k_less_enabled(): boolean;
        top_k_more_enabled(): boolean;
        limit_value(): string;
        steps(): $.$mol_button[];
        step_text(step: number): string;
        step_active(step: number): boolean;
        step_pane_class(step: number): "accent-pane" | "step-edge";
        step_pick(step: number): void;
        reset(): void;
        close(): void;
        keydown(event: KeyboardEvent): void;
    }
    class $raggu_web_front_settings_toggle extends $.$raggu_web_front_settings_toggle {
        state_text(): string;
        flip(): void;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_home extends $.$raggu_web_front_home {
        datasets_state(): {
            value: $raggu_web_front_graph_dataset[] | null;
            error: Error | null;
            pending: boolean;
        };
        datasets(): $raggu_web_front_graph_dataset[] | null;
        pending(): boolean;
        totals(): {
            nodes: number;
            edges: number;
            communities: number;
            chunks: number;
        } | null;
        total(key: 'nodes' | 'edges' | 'communities' | 'chunks'): string;
        total_nodes(): string;
        total_edges(): string;
        total_communities(): string;
        total_chunks(): string;
        corpora_count(): string;
        badge_list(): {
            label: string;
            value: string;
        }[];
        badges(): $mol_view[];
        badge_label(index: number): string;
        badge_value(index: number): string;
        to_pipeline(): void;
        pipeline(): {
            ordinal: string;
            name: string;
            detail: string;
            output: string;
        }[];
        steps(): $.$raggu_web_front_reveal[];
        step_delay(index: number): number;
        step_rail(index: number): ($mol_view | $raggu_web_front_icon_arrow)[];
        step_ordinal(index: number): string;
        step_name(index: number): string;
        step_detail(index: number): string;
        step_output(index: number): string;
        sorted(): $raggu_web_front_graph_dataset[] | null;
        corpora(): $mol_view[] | $.$raggu_web_front_home_card[];
        card_dataset(index: number): never;
        card_featured(index: number): index is 0;
        card_delay(index: number): number;
        card_skeleton_featured(index: number): index is 0;
        retry(): void;
    }
    class $raggu_web_front_home_metric extends $.$raggu_web_front_home_metric {
        value_content(): string[] | $raggu_web_front_skeleton[];
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_corpus_controls extends $.$raggu_web_front_corpus_controls {
        model(): $raggu_web_front_graph_model | null;
        search(next?: string): string;
        search_input(event: Event): void;
        search_clear(): void;
        filtering(): boolean;
        bar(): ($mol_view | $.$raggu_web_front_corpus_controls_filter)[];
        search_box(): ($mol_view | $raggu_web_front_icon_search)[];
        types_count(): number;
        communities_count(): number;
        type_items(): $raggu_web_front_corpus_controls_facet[];
        type_active(name: string): boolean;
        type_name(name: string): string;
        type_count(name: string): number;
        type_toggle(name: string): void;
        types_clear(): void;
        communities_sorted(): $raggu_web_front_graph_community[];
        community_items(): $raggu_web_front_corpus_controls_facet[];
        community_active(id: string): boolean;
        community_name(id: string): string;
        community_count(id: string): number;
        community_toggle(id: string): void;
        communities_clear(): void;
        matches(): number;
        matches_text(): string;
        no_matches_text(): string;
        summary(): $mol_view[];
        clear_all(): void;
    }
    class $raggu_web_front_corpus_controls_filter extends $.$raggu_web_front_corpus_controls_filter {
        active(): boolean;
        pane_class(): "accent-pane" | "filter-edge";
        count_text(): string;
        bubble_content(): readonly any[];
    }
}

declare namespace $ {
}

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
}

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
declare namespace $.$$ {
    class $mol_svg_circle extends $.$mol_svg_circle {
        pos_x(): any;
        pos_y(): any;
    }
}

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
    /** Dynamic sources import. */
    class $mol_import extends $mol_object2 {
        static module(uri: string): any;
        static module_async(uri: string): Promise<any>;
        static script(uri: string): any;
        static script_async(uri: string): Promise<any>;
        static style(uri: string): any;
        static style_async(uri: string): any;
    }
}

declare namespace $.$$ {
    class $raggu_web_front_rich extends $.$raggu_web_front_rich {
        plain(): boolean;
        has_html(): boolean;
        katex(): {
            renderToString(tex: string, options: object): string;
        } | null;
        html(): string;
    }
    function $raggu_web_front_rich_clean(from: Node): Node[];
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_disclosure extends $.$raggu_web_front_disclosure {
        toggle(): void;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_corpus_detail extends $.$raggu_web_front_corpus_detail {
        node_id(): string | null;
        open(): boolean;
        content(): $mol_view[];
        detail_state(): {
            value: $raggu_web_front_graph_detail | null;
            error: Error | null;
            pending: boolean;
        };
        local(): $raggu_web_front_graph_node | null;
        node(): $raggu_web_front_graph_node | null;
        title_content(): string[] | $raggu_web_front_skeleton[];
        chips(): $raggu_web_front_home_chip[];
        type_name(): string;
        description(): string;
        relations(): $raggu_web_front_graph_relation[];
        chunks(): $raggu_web_front_graph_chunk[];
        scroll_content(): ($mol_view | $.$raggu_web_front_disclosure)[];
        relations_title(): string;
        relation_rows(): $.$mol_button[];
        relation_out(index: number): boolean;
        relation_type(index: number): string;
        relation_other(index: number): string;
        relation_pick(index: number): void;
        chunks_count(): string;
        chunk_rows(): $mol_view[];
        chunk_id(index: number): string;
        chunk_text(index: number): string;
        close(): void;
        ask(): void;
    }
}

declare namespace $ {
}

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
		readonly(any)[]
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
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map
declare namespace $.$$ {
    class $raggu_web_front_corpus_chat extends $.$raggu_web_front_corpus_chat {
        corpus(): string;
        entries(): readonly $raggu_web_front_viewer_entry[];
        pending(): boolean;
        partial(): string | null;
        failure(): string | null;
        engine(): "mix" | "naive";
        head_tools(): ($.$mol_button | $raggu_web_front_label)[];
        sweep(): void;
        hide(): void;
        scroll_content(): $mol_view[];
        thread(): $mol_view[];
        entry(index: number): $raggu_web_front_viewer_entry;
        entry_text(index: number): string;
        segments(index: number): $raggu_web_front_lib_cite_segment[];
        resolve(id: string, type: $raggu_web_front_lib_cite_kind): string | undefined;
        render_segments(index: number): (string | $mol_view)[];
        answer(index: number): (string | $mol_view)[];
        streaming_answer(): (string | $mol_view)[];
        segment(key: string): $raggu_web_front_lib_cite_segment;
        strong_text(key: string): string;
        ref_id(key: string): string;
        ref_text(key: string): string;
        ref_pick(key: string): void;
        trace(index: number): $raggu_web_front_graph_trace | null;
        agent_sources(index: number): $.$raggu_web_front_disclosure[];
        sources_total(index: number): number;
        sources_count(index: number): string;
        sources_body(index: number): $mol_view[];
        source_group_label(key: string): string;
        source_group_items(key: string): $mol_view[];
        pair(key: string): {
            trace: $raggu_web_front_graph_trace;
            i: number;
        };
        source_entity_text(key: string): string;
        source_entity_pick(key: string): void;
        source_relation_text(key: string): string;
        source_chunk_text(key: string): string;
        meta_list(index: number): string[][];
        meta_body(index: number): $mol_view[];
        meta_rows(index: number): $mol_view[];
        meta_row_label(key: string): string;
        meta_row_value(key: string): string;
        meta_energy(index: number): string;
        meta_plan(index: number): $mol_view[];
        plan_index(key: string): string;
        plan_text(key: string): string;
        elapsed(): string;
        failure_text(): string;
        suggestions(): string[];
        starters(): $mol_view[];
        starter_text(index: number): string;
        starter_send(index: number): void;
        draft(next?: string): string;
        draft_input(event: Event): void;
        draft_key(event: KeyboardEvent): void;
        submit(event: Event): void;
        send_click(event?: Event): void;
        send_enabled(): boolean;
        send(text: string): void;
        stop(): void;
        action(): $.$mol_button[];
        follow(): null;
        follow_stream(): null;
        auto(): never;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_corpus extends $.$raggu_web_front_corpus {
        chat_open(): boolean;
        graph_open(): boolean;
        hint_only(): boolean;
        cold(): boolean;
        row(): ($mol_view | $.$raggu_web_front_corpus_detail | $.$raggu_web_front_corpus_chat)[];
        graph_column(): ($mol_view | $.$raggu_web_front_corpus_controls | $.$raggu_web_front_corpus_detail)[];
        stage_content(): $mol_view[] | $raggu_web_front_corpus_loader[];
        percent(): string;
        retry(): void;
        stage_watch(): {
            destructor: () => void;
        } | null;
        auto(): never;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_home_constellation extends $.$raggu_web_front_home_constellation {
        shape(): {
            points: {
                x: number;
                y: number;
                r: number;
                hub: boolean;
            }[];
            links: [number, number][];
        };
        links(): string;
        circles(hub: boolean): string;
        points(): string;
        hubs(): string;
    }
}

declare namespace $ {
}

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
declare namespace $.$$ {
    class $raggu_web_front_home_card extends $.$raggu_web_front_home_card {
        item(): $raggu_web_front_graph_dataset;
        id(): string;
        title(): string;
        domain(): string;
        description(): string;
        link_label(): string;
        nodes(): number;
        edges(): number;
        nodes_text(): string;
        edges_text(): string;
        communities_text(): string;
        chunks_text(): string;
        types(): $raggu_web_front_home_chip[];
        type_name(type: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $raggu_web_front_link__uri_raggu_web_front_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $raggu_web_front_link['uri'] >
	>
	type $raggu_web_front_link__sub_raggu_web_front_app_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $raggu_web_front_link['sub'] >
	>
	type $mol_view__sub_raggu_web_front_app_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__attr_raggu_web_front_app_4 = $mol_type_enforce<
		({ 
			'aria-hidden': string,
			'raggu_web_front_app_backdrop_quiet': ReturnType< $raggu_web_front_app['quiet'] >,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_app_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_scene__viewer_raggu_web_front_app_6 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_scene['viewer'] >
	>
	type $raggu_web_front_scene__lights_raggu_web_front_app_7 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_resolved'] >
		,
		ReturnType< $raggu_web_front_scene['lights'] >
	>
	type $raggu_web_front_chrome__viewer_raggu_web_front_app_8 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_chrome['viewer'] >
	>
	type $raggu_web_front_chrome__theme_choice_raggu_web_front_app_9 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_choice'] >
		,
		ReturnType< $raggu_web_front_chrome['theme_choice'] >
	>
	type $raggu_web_front_chrome__theme_resolved_raggu_web_front_app_10 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['theme_resolved'] >
		,
		ReturnType< $raggu_web_front_chrome['theme_resolved'] >
	>
	type $raggu_web_front_chrome__open_settings_raggu_web_front_app_11 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['open_settings'] >
		,
		ReturnType< $raggu_web_front_chrome['open_settings'] >
	>
	type $mol_view__dom_name_raggu_web_front_app_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__attr_raggu_web_front_app_13 = $mol_type_enforce<
		({ 
			'id': string,
		})  & ReturnType< $mol_view['attr'] >
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_raggu_web_front_app_14 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['main'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $raggu_web_front_settings__showed_raggu_web_front_app_15 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['settings_open'] >
		,
		ReturnType< $raggu_web_front_settings['showed'] >
	>
	type $raggu_web_front_corpus__viewer_raggu_web_front_app_16 = $mol_type_enforce<
		ReturnType< $raggu_web_front_app['Viewer'] >
		,
		ReturnType< $raggu_web_front_corpus['viewer'] >
	>
	export class $raggu_web_front_app extends $raggu_web_front_base {
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
		attr( ): ({ 
			'raggu_web_front_app_corpus': ReturnType< $raggu_web_front_app['corpus_page'] >,
		})  & ReturnType< $raggu_web_front_base['attr'] >
		sub( ): readonly(any)[]
		Home( ): $raggu_web_front_home
		Corpus( ): $raggu_web_front_corpus
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {
    class $mol_media extends $mol_object2 {
        static match(query: string, next?: boolean): boolean;
    }
}

declare namespace $ {
    /** Просмотр экрана. `screen` и `dataset` — то, что реально определяет страницу. */
    function $raggu_web_front_analytics_pageview(screen: string, dataset: string): void;
    /** Именованное действие пользователя: выбор корпуса, отправка вопроса и т.п. */
    function $raggu_web_front_analytics_event(event: string, data?: Record<string, string | number | boolean>): void;
}

declare namespace $.$$ {
    class $raggu_web_front_app extends $.$raggu_web_front_app {
        corpus_page(): boolean;
        main(): $.$raggu_web_front_corpus[] | $.$raggu_web_front_home[];
        quiet(): boolean;
        theme_choice(next?: string): "dark" | "light" | "system";
        theme_resolved(): "dark" | "light";
        open_settings(): void;
        document_sync(): null;
        scrollbar_publish(): {
            destructor: () => void;
        };
        pageview(): string;
        scroll_reset(): null;
        auto(): never;
    }
}

declare namespace $ {
}

export = $;
//# sourceMappingURL=web.d.ts.map
