#!/usr/bin/env node
"use strict";
function require( path ){ return $node[ path ] };

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-inline-start': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_object2 {
        task;
        static _promise = null;
        static get promise() {
            if (this._promise)
                return this._promise;
            return this._promise = new Promise(done => {
                const complete = () => {
                    this._promise = null;
                    done();
                };
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(complete);
                }
                else {
                    setTimeout(complete, 16);
                }
            });
        }
        cancelled = false;
        promise;
        constructor(task) {
            super();
            this.task = task;
            this.promise = $mol_after_frame.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_log3_web_make(level, color) {
        return function $mol_log3_logger(event) {
            const pending = this.$mol_log3_stack.pop();
            if (pending)
                pending();
            let tpl = '%c';
            const chunks = Object.entries(event);
            for (let i = 0; i < chunks.length; ++i) {
                tpl += (typeof chunks[i][1] === 'string') ? '%s: %s\n' : '%s: %o\n';
            }
            const style = `color:${color};font-weight:bolder`;
            this.console[level](tpl.trim(), style, ...[].concat(...chunks));
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_web_make = $mol_log3_web_make;
    $.$mol_log3_come = $mol_log3_web_make('info', 'royalblue');
    $.$mol_log3_done = $mol_log3_web_make('info', 'forestgreen');
    $.$mol_log3_fail = $mol_log3_web_make('error', 'orangered');
    $.$mol_log3_warn = $mol_log3_web_make('warn', 'goldenrod');
    $.$mol_log3_rise = $mol_log3_web_make('log', 'magenta');
    $.$mol_log3_area = $mol_log3_web_make('group', 'cyan');
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let error;
    let result;
    let handler;
    /// Debugger will stop at exceptions but exception will be returned normally
    function $mol_try_web(handler2) {
        handler = handler2;
        error = undefined;
        result = undefined;
        self.dispatchEvent(new Event('$mol_try'));
        const error2 = error;
        const result2 = result;
        error = undefined;
        result = undefined;
        return error2 || result2;
    }
    $.$mol_try_web = $mol_try_web;
    $.$mol_try = $mol_try_web;
    self.addEventListener('$mol_try', (event) => {
        result = handler();
    }, true);
    self.addEventListener('error', (event) => {
        error = event.error;
    }, true);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            this.resizes();
            return {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
        static resizes(next) { return next; }
    }
    __decorate([
        $mol_mem
    ], $mol_window, "size", null);
    __decorate([
        $mol_mem
    ], $mol_window, "resizes", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', event => $mol_window.resizes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_dom_context.document) {
        function focus(event) {
            const target = event.target;
            if (target?.shadowRoot)
                watch(target.shadowRoot);
            $mol_view_selection.focused($mol_maybe(target), 'notify');
        }
        function watch(root) {
            root.removeEventListener('focus', focus, true);
            root.addEventListener('focus', focus, true);
        }
        watch($mol_dom_context.document);
        $mol_dom.document.addEventListener('keydown', event => {
            if (!event.altKey)
                return;
            const self = $mol_view_selection.focused()[0];
            if (!self)
                return;
            switch (event.keyCode) {
                case $mol_keyboard_code.down:
                    var vert = 1, hor = 0;
                    break;
                case $mol_keyboard_code.up:
                    var vert = -1, hor = 0;
                    break;
                case $mol_keyboard_code.left:
                    var hor = -1, vert = 0;
                    break;
                case $mol_keyboard_code.right:
                    var hor = 1, vert = 0;
                    break;
                default: return;
            }
            event.preventDefault();
            const self_rect = self.getBoundingClientRect();
            const center_hor = (self_rect.left + self_rect.right) / 2;
            const center_vert = (self_rect.top + self_rect.bottom) / 2;
            const all = [...$mol_dom.document.querySelectorAll(':where( [role="button"], [role="checkbox"], input, button, a ):not([disabled])')]
                .map(el => {
                const rect = el.getBoundingClientRect();
                const dist = (Math.max(0, center_hor - rect.right) + Math.max(0, rect.left - center_hor)) * vert * vert
                    + (Math.max(0, center_vert - rect.bottom) + Math.max(0, rect.top - center_vert)) * hor * hor;
                return [el, rect, dist];
            })
                .filter(([el, rect]) => {
                if (el === self)
                    return false;
                if (vert > 0 && rect.top < self_rect.bottom)
                    return false;
                if (vert < 0 && rect.bottom > self_rect.top)
                    return false;
                if (hor > 0 && rect.left < self_rect.right)
                    return false;
                if (hor < 0 && rect.right > self_rect.left)
                    return false;
                return true;
            })
                .sort(([, one, dist1], [, two, dist2]) => {
                return (dist1 - dist2) || ((one.top - two.top) * vert + (one.left - two.left) * hor);
            });
            const target = all[0]?.[0];
            target?.focus();
        });
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\ttext-wrap-style: pretty;\n\tunicode-bidi: plaintext\n}\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_dom_context.document?.addEventListener('DOMContentLoaded', () => $mol_view.auto(), { once: true });
})($ || ($ = {}));

;
	($.$bog_builderui_div) = class $bog_builderui_div extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    /**
     * BuilderUI design tokens — CSS variables in --bog_builderui_*.
     * Used in .view.css.ts via $bog_builderui_tokens.text, $bog_builderui_tokens.back, etc.
     */
    $.$bog_builderui_tokens = $mol_style_prop('bog_builderui', [
        'back',
        'card',
        'field',
        'hover',
        'text',
        'shade',
        'line',
        'focus',
        'control',
        'current',
        'special',
        'font_body',
        'font_head',
        'radius',
    ]);
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_div, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        flex: {
            direction: 'column',
        },
    });
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_graph) = class $mol_icon_graph extends ($.$mol_icon) {
		path(){
			return "M19.5 17C19.37 17 19.24 17 19.11 17.04L17.5 13.79C17.95 13.34 18.25 12.71 18.25 12C18.25 10.62 17.13 9.5 15.75 9.5C15.62 9.5 15.5 9.5 15.36 9.54L13.73 6.29C14.21 5.84 14.5 5.21 14.5 4.5C14.5 3.12 13.38 2 12 2S9.5 3.12 9.5 4.5C9.5 5.21 9.79 5.84 10.26 6.29L8.64 9.54C8.5 9.5 8.38 9.5 8.25 9.5C6.87 9.5 5.75 10.62 5.75 12C5.75 12.71 6.05 13.34 6.5 13.79L4.89 17.04C4.76 17 4.63 17 4.5 17C3.12 17 2 18.12 2 19.5C2 20.88 3.12 22 4.5 22S7 20.88 7 19.5C7 18.8 6.71 18.16 6.24 17.71L7.86 14.46C8 14.5 8.12 14.5 8.25 14.5C8.38 14.5 8.5 14.5 8.64 14.46L10.27 17.71C9.8 18.16 9.5 18.8 9.5 19.5C9.5 20.88 10.62 22 12 22S14.5 20.88 14.5 19.5C14.5 18.12 13.38 17 12 17C11.87 17 11.74 17 11.61 17.04L10 13.79C10.46 13.34 10.75 12.71 10.75 12S10.46 10.66 10 10.21L11.61 6.96C11.74 7 11.87 7 12 7S12.26 7 12.39 6.96L14 10.21C13.55 10.66 13.25 11.3 13.25 12C13.25 13.38 14.37 14.5 15.75 14.5C15.88 14.5 16 14.5 16.14 14.46L17.77 17.71C17.3 18.16 17 18.8 17 19.5C17 20.88 18.12 22 19.5 22S22 20.88 22 19.5C22 18.12 20.88 17 19.5 17Z";
		}
	};


;
"use strict";


;
	($.$bog_favicon) = class $bog_favicon extends ($.$mol_plugin) {
		Icon(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$bog_favicon.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Плагин, который ставит favicon из переданного $mol_icon_* и подобных */
        class $bog_favicon extends $.$bog_favicon {
            // сюда передаем Icon <= icon $mol_icon_waze
            Icon(next) {
                if (next !== undefined)
                    return next;
                throw new Error('[bog_favicon] Icon is required: use `Icon <= icon $mol_icon_*` in view.tree');
            }
            favicon_data() {
                const icon = this.Icon();
                const node = icon.dom_tree();
                if (!node.getAttribute('xmlns')) {
                    node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                }
                const svg = node.outerHTML;
                return 'data:image/svg+xml,' + encodeURIComponent(svg);
            }
            apply_favicon() {
                const doc = $mol_dom_context.document;
                if (!doc)
                    return;
                const href = this.favicon_data();
                let link = doc.querySelector('link[rel="icon"]');
                if (!link) {
                    link = doc.createElement('link');
                    link.rel = 'icon';
                    doc.head.appendChild(link);
                }
                link.type = 'image/svg+xml';
                if (link.href !== href)
                    link.href = href;
            }
            auto() {
                this.favicon_data();
                this.apply_favicon();
                return null;
            }
            sub() {
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $bog_favicon.prototype, "Icon", null);
        __decorate([
            $mol_mem
        ], $bog_favicon.prototype, "favicon_data", null);
        $$.$bog_favicon = $bog_favicon;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$bog_theme = $mol_style_prop('mol_theme', [
        'back',
        'background',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
    ]);
    /**
     * Available theme names.
     * Add new theme to theme.css and add its name here.
     */
    $.$bog_theme_names = [
        '$mol_theme_giper_smash_dark',
        '$mol_theme_giper_smash_light',
        '$mol_theme_light',
        '$mol_theme_dark',
        '$mol_theme_monefro_light',
        '$mol_theme_monefro_dark',
        '$mol_theme_homerent_light',
        '$mol_theme_homerent_dark',
        '$mol_theme_upwork',
        '$mol_theme_ainews_light',
        '$mol_theme_ainews_dark',
        '$mol_theme_calm_dark',
        '$mol_theme_calm_light',
    ];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/theme/theme.css", ":root {\n\t--mol_theme_hue: 645deg;\n\t--mol_theme_hue_spread: 90deg;\n\t--mol_theme_background: var(--mol_theme_back);\n\n\t/* Bog theme semantic aliases */\n\t--mol_theme_primary_hue: var(--mol_theme_hue);\n\t--mol_theme_secondary_hue: calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread));\n\t--mol_theme_tertiary_hue: calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread));\n\t--mol_theme_accent_hue: calc(var(--mol_theme_hue) + 180deg);\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\n:root,\n[mol_theme='$mol_theme_dark'],\n:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: hsl(0deg, 0%, 0%, 0.75);\n\n\t--bog_theme_back: hsl(var(--bog_theme_hue), 8%, 12%);\n\t--bog_theme_card: hsl(var(--bog_theme_hue), 15%, 18%, 0.25);\n\t--bog_theme_field: hsl(var(--bog_theme_hue), 12%, 10%, 0.25);\n\t--bog_theme_hover: hsl(var(--bog_theme_hue), 0%, 50%, 0.1);\n\n\t--bog_theme_text: hsl(var(--bog_theme_hue), 8%, 85%);\n\t--bog_theme_shade: hsl(var(--bog_theme_hue), 12%, 65%, 1);\n\t--bog_theme_line: hsl(var(--bog_theme_hue), 8%, 50%, 0.25);\n\t--bog_theme_focus: hsl(calc(var(--bog_theme_hue) + 180deg), 60%, 65%);\n\n\t--bog_theme_control: hsl(var(--bog_theme_hue), 25%, 70%);\n\t--bog_theme_current: hsl(calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)), 25%, 70%);\n\t--bog_theme_special: hsl(calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)), 25%, 70%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t:root,\n\t[mol_theme='$mol_theme_dark'],\n\t:where([mol_theme='$mol_theme_dark']) [mol_theme] {\n\t\t--bog_theme_back: oklch(12% 0.02 var(--bog_theme_hue));\n\t\t--bog_theme_card: oklch(18% 0.03 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_field: oklch(10% 0.015 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_hover: oklch(70% 0 var(--bog_theme_hue) / 0.1);\n\n\t\t--bog_theme_text: oklch(85% 0.025 var(--bog_theme_hue));\n\t\t--bog_theme_shade: oklch(65% 0.035 var(--bog_theme_hue));\n\t\t--bog_theme_line: oklch(50% 0.025 var(--bog_theme_hue) / 0.25);\n\t\t--bog_theme_focus: oklch(75% 0.15 calc(var(--bog_theme_hue) + 180deg));\n\n\t\t--bog_theme_control: oklch(70% 0.06 var(--bog_theme_hue));\n\t\t--bog_theme_current: oklch(70% 0.08 calc(var(--bog_theme_hue) - var(--bog_theme_hue_spread)));\n\t\t--bog_theme_special: oklch(70% 0.08 calc(var(--bog_theme_hue) + var(--bog_theme_hue_spread)));\n\t}\n}\n\n[mol_theme='$mol_theme_light'],\n:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl(0deg, 0%, 100%, 0.75);\n\n\t--mol_theme_back: hsl(var(--mol_theme_hue), 0%, 100%);\n\t--mol_theme_card: hsl(var(--mol_theme_hue), 50%, 100%, 0.5);\n\t--mol_theme_field: hsl(var(--mol_theme_hue), 50%, 100%, 0.75);\n\t--mol_theme_hover: hsl(var(--mol_theme_hue), 0%, 50%, 0.1);\n\n\t--mol_theme_text: hsl(var(--mol_theme_hue), 0%, 0%);\n\t--mol_theme_shade: hsl(var(--mol_theme_hue), 0%, 40%, 1);\n\t--mol_theme_line: hsl(var(--mol_theme_hue), 0%, 50%, 0.25);\n\t--mol_theme_focus: hsl(calc(var(--mol_theme_hue) + 180deg), 100%, 40%);\n\n\t--mol_theme_control: hsl(var(--mol_theme_hue), 80%, 30%);\n\t--mol_theme_current: hsl(calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)), 80%, 30%);\n\t--mol_theme_special: hsl(calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)), 80%, 30%);\n}\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_light'],\n\t:where([mol_theme='$mol_theme_light']) [mol_theme] {\n\t\t--mol_theme_back: oklch(100% 0 var(--mol_theme_hue));\n\t\t--mol_theme_card: oklch(99% 0.01 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_field: oklch(100% 0 var(--mol_theme_hue) / 0.5);\n\t\t--mol_theme_hover: oklch(70% 0 var(--mol_theme_hue) / 0.1);\n\n\t\t--mol_theme_text: oklch(20% 0 var(--mol_theme_hue));\n\t\t--mol_theme_shade: oklch(60% 0 var(--mol_theme_hue));\n\t\t--mol_theme_line: oklch(50% 0 var(--mol_theme_hue) / 0.25);\n\t\t--mol_theme_focus: oklch(60% 0.2 calc(var(--mol_theme_hue) + 180deg));\n\n\t\t--mol_theme_control: oklch(40% 0.15 var(--mol_theme_hue));\n\t\t--mol_theme_current: oklch(50% 0.2 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t\t--mol_theme_special: oklch(50% 0.2 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t}\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(25% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(35% 0.1 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(25% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(35% 0.1 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n\n:where(:root, [mol_theme='$mol_theme_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(35% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(45% 0.15 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n:where([mol_theme='$mol_theme_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n\n/* Upwork theme - based on Upwork brand colors */\n[mol_theme='$mol_theme_upwork'],\n:where([mol_theme='$mol_theme_upwork']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t/* Upwork brand colors: #73bb44 (primary green), #4fab4a (medium green), #385925 (dark green), #b5deb1 (light green) */\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_card: #f9fcf7;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: rgba(115, 187, 68, 0.1);\n\n\t--mol_theme_text: #4c4444;\n\t--mol_theme_shade: #6e6d7a;\n\t--mol_theme_line: rgba(115, 187, 68, 0.25);\n\t--mol_theme_focus: #73bb44;\n\n\t--mol_theme_control: #73bb44;\n\t--mol_theme_current: #4fab4a;\n\t--mol_theme_special: #385925;\n}\n\n/* Ainews dark theme - based on Ainews brand palette */\n[mol_theme='$mol_theme_ainews_dark'],\n:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\n\t/* ВАЖНО: mol_* — именно их читает демка */\n\t--mol_theme_back: #3e3e3e; /* paper dark */\n\t--mol_theme_card: #4a4a4a40; /* paper-2 dark 25% */\n\t--mol_theme_field: #4c4c4c40; /* chip dark 25% */\n\t--mol_theme_hover: #5a5a5a1a; /* edge dark 10% */\n\n\t--mol_theme_text: #bcbcbc; /* ink dark */\n\t--mol_theme_shade: #909090; /* ink-muted dark */\n\t--mol_theme_line: #5a5a5a40; /* edge dark 25% */\n\t--mol_theme_focus: #a8bcff; /* accent dark */\n\n\t--mol_theme_control: #a8bcff; /* accent dark */\n\t--mol_theme_current: #c7b18c; /* accent-2 dark */\n\t--mol_theme_special: #d4bf9d; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_dark'],\n\t:where([mol_theme='$mol_theme_ainews_dark']) [mol_theme] {\n\t\t--mol_theme_back: #3e3e3e;\n\t\t--mol_theme_card: #4a4a4a40;\n\t\t--mol_theme_field: #4c4c4c40;\n\t\t--mol_theme_hover: #5a5a5a1a;\n\n\t\t--mol_theme_text: #bcbcbc;\n\t\t--mol_theme_shade: #909090;\n\t\t--mol_theme_line: #5a5a5a40;\n\t\t--mol_theme_focus: #a8bcff;\n\n\t\t--mol_theme_control: #a8bcff;\n\t\t--mol_theme_current: #c7b18c;\n\t\t--mol_theme_special: #d4bf9d;\n\t}\n}\n\n/* Ainews light theme */\n[mol_theme='$mol_theme_ainews_light'],\n:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #fbf8f1bf; /* 75% */\n\n\t--mol_theme_back: #f7f3e9; /* paper */\n\t--mol_theme_card: #fbf8f180; /* paper-2 50% */\n\t--mol_theme_field: #efe8d8bf; /* chip 75% */\n\t--mol_theme_hover: #ded7c81a; /* edge 10% */\n\n\t--mol_theme_text: #22211f; /* ink */\n\t--mol_theme_shade: #6e6a62; /* ink-muted */\n\t--mol_theme_line: #ded7c840; /* edge 25% */\n\t--mol_theme_focus: #3b5aad; /* accent */\n\n\t--mol_theme_control: #3b5aad; /* accent */\n\t--mol_theme_current: #92734b; /* accent-2 */\n\t--mol_theme_special: #c7b18c; /* accent-2 lighter */\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_ainews_light'],\n\t:where([mol_theme='$mol_theme_ainews_light']) [mol_theme] {\n\t\t--mol_theme_back: #f7f3e9;\n\t\t--mol_theme_card: #fbf8f180;\n\t\t--mol_theme_field: #efe8d8bf;\n\t\t--mol_theme_hover: #ded7c81a;\n\n\t\t--mol_theme_text: #22211f;\n\t\t--mol_theme_shade: #6e6a62;\n\t\t--mol_theme_line: #ded7c840;\n\t\t--mol_theme_focus: #3b5aad;\n\n\t\t--mol_theme_control: #3b5aad;\n\t\t--mol_theme_current: #92734b;\n\t\t--mol_theme_special: #c7b18c;\n\t}\n}\n\n/* HomeRent dark theme */\n[mol_theme='$mol_theme_homerent_dark'],\n:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #2f2f2f;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #3a3a3a;\n\t--mol_theme_field: #3a3a3a;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t--mol_theme_text: #f5f5f5;\n\t--mol_theme_shade: #c7c7c7;\n\t--mol_theme_line: #ffffff26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_dark'],\n\t:where([mol_theme='$mol_theme_homerent_dark']) [mol_theme] {\n\t\t--mol_theme_back: #2f2f2f;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #3a3a3a;\n\t\t--mol_theme_field: #3a3a3a;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.06);\n\n\t\t--mol_theme_text: #f5f5f5;\n\t\t--mol_theme_shade: #c7c7c7;\n\t\t--mol_theme_line: #ffffff26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* HomeRent light theme */\n[mol_theme='$mol_theme_homerent_light'],\n:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(245, 245, 245, 0.75);\n\n\t--mol_theme_back: #ffffff;\n\t--mol_theme_background: #f5f5f5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #ffffff;\n\t--mol_theme_hover: #8fc32b1a;\n\n\t--mol_theme_text: #4c4c4c;\n\t--mol_theme_shade: #707070;\n\t--mol_theme_line: #4c4c4c26;\n\t--mol_theme_focus: #8fc32b;\n\n\t--mol_theme_control: #dbe05b;\n\t--mol_theme_current: #8fc32b;\n\t--mol_theme_special: #8fc32b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_homerent_light'],\n\t:where([mol_theme='$mol_theme_homerent_light']) [mol_theme] {\n\t\t--mol_theme_back: #ffffff;\n\t\t--mol_theme_background: #f5f5f5;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #ffffff;\n\t\t--mol_theme_hover: #8fc32b1a;\n\n\t\t--mol_theme_text: #4c4c4c;\n\t\t--mol_theme_shade: #707070;\n\t\t--mol_theme_line: #4c4c4c26;\n\t\t--mol_theme_focus: #8fc32b;\n\n\t\t--mol_theme_control: #dbe05b;\n\t\t--mol_theme_current: #8fc32b;\n\t\t--mol_theme_special: #8fc32b;\n\t}\n}\n\n/* Giper Smash dark theme - original game palette */\n[mol_theme='$mol_theme_giper_smash_dark'],\n:where([mol_theme='$mol_theme_giper_smash_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.85);\n\n\t--mol_theme_back: #1a1a2e;\n\t--mol_theme_card: #2d2d44;\n\t--mol_theme_field: #16213e;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.15);\n\n\t--mol_theme_text: #ffffff;\n\t--mol_theme_shade: #b0b0cc;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #f5b041;\n\n\t--mol_theme_control: #44a08d;\n\t--mol_theme_current: #0088cc;\n\t--mol_theme_special: #764ba2;\n}\n\n/* Giper Smash light theme - bright game palette */\n[mol_theme='$mol_theme_giper_smash_light'],\n:where([mol_theme='$mol_theme_giper_smash_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.85);\n\n\t--mol_theme_back: #f0eef5;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #e8e5f0;\n\t--mol_theme_hover: rgba(118, 75, 162, 0.08);\n\n\t--mol_theme_text: #1a1a2e;\n\t--mol_theme_shade: #5c5c7a;\n\t--mol_theme_line: rgba(26, 26, 46, 0.12);\n\t--mol_theme_focus: #d4941a;\n\n\t--mol_theme_control: #2e8b73;\n\t--mol_theme_current: #0077b3;\n\t--mol_theme_special: #6a3d99;\n}\n\n/* Monefro dark theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_dark'],\n:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: rgba(0, 0, 0, 0.6);\n\n\t--mol_theme_back: #24201c;\n\t--mol_theme_card: #2c2722;\n\t--mol_theme_field: #29241f;\n\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t--mol_theme_text: #f0e7dc;\n\t--mol_theme_shade: #b5a99c;\n\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t--mol_theme_focus: #56c78a;\n\n\t--mol_theme_control: #56c78a;\n\t--mol_theme_current: #f2776e;\n\t--mol_theme_special: #f6b04a;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_dark'],\n\t:where([mol_theme='$mol_theme_monefro_dark']) [mol_theme] {\n\t\t--mol_theme_back: #24201c;\n\t\t--mol_theme_card: #2c2722;\n\t\t--mol_theme_field: #29241f;\n\t\t--mol_theme_hover: rgba(255, 255, 255, 0.04);\n\n\t\t--mol_theme_text: #f0e7dc;\n\t\t--mol_theme_shade: #b5a99c;\n\t\t--mol_theme_line: rgba(255, 255, 255, 0.12);\n\t\t--mol_theme_focus: #56c78a;\n\n\t\t--mol_theme_control: #56c78a;\n\t\t--mol_theme_current: #f2776e;\n\t\t--mol_theme_special: #f6b04a;\n\t}\n}\n\n/* Monefro light theme - inspired by Monefy */\n[mol_theme='$mol_theme_monefro_light'],\n:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: rgba(255, 255, 255, 0.75);\n\n\t--mol_theme_back: #f6f2ea;\n\t--mol_theme_card: #ffffff;\n\t--mol_theme_field: #fff8ef;\n\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t--mol_theme_text: #3f3b36;\n\t--mol_theme_shade: #8b8278;\n\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t--mol_theme_focus: #2f9a6a;\n\n\t--mol_theme_control: #2f9a6a;\n\t--mol_theme_current: #e85b54;\n\t--mol_theme_special: #f3a43b;\n}\n\n@supports (color: oklch(0% 0 0deg)) {\n\t[mol_theme='$mol_theme_monefro_light'],\n\t:where([mol_theme='$mol_theme_monefro_light']) [mol_theme] {\n\t\t--mol_theme_back: #f6f2ea;\n\t\t--mol_theme_card: #ffffff;\n\t\t--mol_theme_field: #fff8ef;\n\t\t--mol_theme_hover: rgba(0, 0, 0, 0.04);\n\n\t\t--mol_theme_text: #3f3b36;\n\t\t--mol_theme_shade: #8b8278;\n\t\t--mol_theme_line: rgba(64, 55, 46, 0.15);\n\t\t--mol_theme_focus: #2f9a6a;\n\n\t\t--mol_theme_control: #2f9a6a;\n\t\t--mol_theme_current: #e85b54;\n\t\t--mol_theme_special: #f3a43b;\n\t}\n}\n\n/* ═══════════════════════════════════════════════════════════════\n   Calm theme — universal working theme (draft for review)\n   Base hue: 230° (blue-gray), spread: 90°\n   Style: quiet, professional, no noise\n   ═══════════════════════════════════════════════════════════════ */\n\n/* Calm dark theme */\n[mol_theme='$mol_theme_calm_dark'],\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate(180deg);\n\t--mol_theme_spirit: #000000bf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #0d1117;\n\t--mol_theme_card: #161b2240;\n\t--mol_theme_field: #0a0e1440;\n\t--mol_theme_hover: #ffffff0c;\n\n\t--mol_theme_text: #e6edf3;\n\t--mol_theme_shade: #8b949e;\n\t--mol_theme_line: #30363d;\n\t--mol_theme_focus: #d29922;\n\n\t--mol_theme_control: #2f81f7;\n\t--mol_theme_current: #3fb950;\n\t--mol_theme_special: #a371f7;\n}\n\n/* Calm light theme */\n[mol_theme='$mol_theme_calm_light'],\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: #f7f8fabf;\n\t--mol_theme_hue: 230deg;\n\t--mol_theme_hue_spread: 90deg;\n\n\t--mol_theme_back: #f7f8fa;\n\t--mol_theme_card: #ffffff80;\n\t--mol_theme_field: #e8eaf0bf;\n\t--mol_theme_hover: #0000000a;\n\n\t--mol_theme_text: #1a1c23;\n\t--mol_theme_shade: #656a80;\n\t--mol_theme_line: #3a3e5026;\n\t--mol_theme_focus: #b87518;\n\n\t--mol_theme_control: #3560b8;\n\t--mol_theme_current: #28856e;\n\t--mol_theme_special: #8a4aad;\n}\n\n/* Calm dark sub-themes */\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: #1a2840;\n\t--mol_theme_card: #243450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: #143028;\n\t--mol_theme_card: #1c3e3450;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: #2a1c48;\n\t--mol_theme_card: #3a2a5c50;\n}\n:where([mol_theme='$mol_theme_calm_dark']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: #3a1c2a;\n\t--mol_theme_card: #4c283a50;\n}\n\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_base'] {\n\t--mol_theme_back: oklch(85% 0.075 var(--mol_theme_hue));\n\t--mol_theme_card: oklch(98% 0.03 var(--mol_theme_hue) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_current'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) - var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_special'] {\n\t--mol_theme_back: oklch(85% 0.05 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + var(--mol_theme_hue_spread)) / 0.25);\n}\n:where([mol_theme='$mol_theme_calm_light']) [mol_theme='$mol_theme_accent'] {\n\t--mol_theme_back: oklch(83% 0.1 calc(var(--mol_theme_hue) + 180deg));\n\t--mol_theme_card: oklch(98% 0.03 calc(var(--mol_theme_hue) + 180deg) / 0.25);\n}\n");
})($ || ($ = {}));

;
	($.$bog_theme_auto) = class $bog_theme_auto extends ($.$mol_plugin) {
		themes_default(){
			return [];
		}
		theme(){
			return "";
		}
		themes(){
			return (this.themes_default());
		}
		theme_light(){
			return "$mol_theme_light";
		}
		theme_dark(){
			return "$mol_theme_dark";
		}
		mode(next){
			if(next !== undefined) return next;
			return "system";
		}
		mode_next(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_next(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		theme_set(next){
			if(next !== undefined) return next;
			return null;
		}
		is_light_now(){
			return false;
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};
	($mol_mem(($.$bog_theme_auto.prototype), "mode"));
	($mol_mem(($.$bog_theme_auto.prototype), "mode_next"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_next"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_prev"));
	($mol_mem(($.$bog_theme_auto.prototype), "theme_set"));


;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next) {
            return false;
        }
        /** Total storage quota in bytes. */
        static total() {
            return 0;
        }
        /** Total storage usage in bytes. */
        static used() {
            return 0;
        }
        /** Minimum available free space in bytes. */
        static free() {
            return this.total() - this.used();
        }
        /** Fulfillness of storage. */
        static portion() {
            const total = this.total();
            if (!total)
                return 1;
            return this.used() / total;
        }
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level() {
            return Math.floor(-Math.log2(1 - this.portion()));
        }
    }
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage_web extends $mol_storage {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            $mol_state_time.now(1000);
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static total() {
            return this.estimate().quota ?? 0;
        }
        static used() {
            return this.estimate().usage ?? 0;
        }
        static free() {
            const { usage = 0, quota = 0 } = this.estimate();
            return quota - usage;
        }
        static portion() {
            const { usage = 0, quota = 0 } = this.estimate();
            if (!quota)
                return 1;
            return usage / quota;
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_web, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage_web, "persisted", null);
    __decorate([
        $mol_mem
    ], $mol_storage_web, "estimate", null);
    $.$mol_storage_web = $mol_storage_web;
    $.$mol_storage = $.$mol_storage_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => $.$mol_state_local.changes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            if (next === undefined) {
                next = $mol_dom.location.href;
            }
            else if (!/^about:srcdoc/.test(next)) {
                new $mol_after_frame(() => {
                    const next = this.href();
                    const prev = $mol_dom.location.href;
                    if (next === prev)
                        return;
                    const history = $mol_dom.history;
                    history.replaceState(history.state, $mol_dom.document.title, next);
                });
            }
            if ($mol_dom.parent && ($mol_dom.parent !== $mol_dom.self)) {
                $mol_dom.parent.postMessage(['hashchange', next], '*');
            }
            return next;
        }
        static href_normal() {
            return this.link({});
        }
        static href_absolute() {
            return new URL(this.href(), $mol_dom.location.href).toString();
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#!?/)[1] || '';
            var chunks = href.split(this.separator);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    break;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : { ...this.dict(), [key]: next };
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link({
                ...this.dict_cut(Object.keys(next)),
                ...next,
            });
        }
        static prolog = '!';
        static separator = '/';
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + this.prolog + chunks.join(this.separator), this.href_absolute()).toString();
        }
        static commit() {
            $mol_dom.history.pushState($mol_dom.history.state, $mol_dom.document.title, this.href());
        }
        static go(next) {
            $mol_dom.location.href = this.link(next);
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_absolute", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "make_link", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "commit", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
    function $mol_state_arg_change() {
        $mol_state_arg.href($mol_dom.location.href);
    }
    self.addEventListener('hashchange', $mol_state_arg_change);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_auto extends $.$bog_theme_auto {
            themes_default() {
                return this.$.$bog_theme_names;
            }
            /** Stores current mode in localStorage. Defaults to 'system'.
             *  При записи дёргает класс `.bog_theme_switching` на `<html>` —
             *  это активирует CSS-transition'ы на цветах темы.
             */
            mode(next) {
                if (next !== undefined && typeof document !== 'undefined') {
                    const root = document.documentElement;
                    root.classList.add('bog_theme_switching');
                    setTimeout(() => root.classList.remove('bog_theme_switching'), 350);
                }
                return this.$.$mol_state_local.value(`${this}.mode()`, next) ?? 'system';
            }
            click_step(next) {
                return this.$.$mol_state_session.value(`${this}.click_step()`, next) ?? 0;
            }
            /** 3-click cycle: opposite → back → system. */
            mode_next() {
                const step = (this.click_step() + 1) % 3;
                this.click_step(step);
                if (step === 0)
                    this.mode('system');
                else
                    this.mode(this.is_light_now() ? 'dark' : 'light');
            }
            is_light_now() {
                const mode = this.mode();
                if (mode === 'light')
                    return true;
                if (mode === 'dark')
                    return false;
                if (mode === 'system')
                    return this.$.$mol_lights();
                return this.theme().toLowerCase().includes('light');
            }
            theme_index(next) {
                const stored = this.$.$mol_state_local.value(`${this}.theme_index()`, next);
                if (stored === null && next === undefined) {
                    return this.system_theme_index();
                }
                return stored ?? 0;
            }
            system_theme_index() {
                const themes = this.themes();
                const prefersLight = this.$.$mol_lights();
                const preferredTheme = prefersLight ? this.theme_light() : this.theme_dark();
                const index = themes.indexOf(preferredTheme);
                return index !== -1 ? index : 0;
            }
            theme() {
                const mode = this.mode();
                if (mode === 'light')
                    return this.theme_light();
                if (mode === 'dark')
                    return this.theme_dark();
                if (mode === 'custom') {
                    const themes = this.themes();
                    const index = this.theme_index();
                    if (themes.length === 0)
                        return this.theme_light();
                    return themes[index % themes.length];
                }
                // system — follow browser preference
                return this.$.$mol_lights() ? this.theme_light() : this.theme_dark();
            }
            theme_next() {
                this.mode_next();
            }
            theme_prev() {
                const cycle = ['system', 'light', 'dark'];
                const i = cycle.indexOf(this.mode());
                this.mode(cycle[i <= 0 ? cycle.length - 1 : i - 1]);
            }
            /** Called by picker. Sets mode to light/dark or custom for themed palettes. */
            theme_set(index) {
                const themes = this.themes();
                if (themes.length === 0)
                    return;
                const theme = themes[index % themes.length];
                if (theme === this.theme_light()) {
                    this.mode('light');
                }
                else if (theme === this.theme_dark()) {
                    this.mode('dark');
                }
                else {
                    this.mode('custom');
                    this.theme_index(index % themes.length);
                }
                this.click_step(0);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "mode", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "click_step", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "mode_next", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "is_light_now", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "system_theme_index", null);
        __decorate([
            $mol_mem
        ], $bog_theme_auto.prototype, "theme", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_next", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_prev", null);
        __decorate([
            $mol_action
        ], $bog_theme_auto.prototype, "theme_set", null);
        $$.$bog_theme_auto = $bog_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/theme/auto/auto.view.css", ".bog_theme_switching,\n.bog_theme_switching * {\n\ttransition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, fill 300ms ease !important;\n}\n\n@media (prefers-reduced-motion: reduce) {\n\t.bog_theme_switching,\n\t.bog_theme_switching * {\n\t\ttransition: none !important;\n\t}\n}\n");
})($ || ($ = {}));

;
	($.$mol_image) = class $mol_image extends ($.$mol_view) {
		uri(){
			return "";
		}
		title(){
			return "";
		}
		loading(){
			return "lazy";
		}
		decoding(){
			return "async";
		}
		cors(){
			return null;
		}
		natural_width(){
			return 0;
		}
		natural_height(){
			return 0;
		}
		load(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "img";
		}
		attr(){
			return {
				...(super.attr()), 
				"src": (this.uri()), 
				"title": (this.hint()), 
				"alt": (this.title()), 
				"loading": (this.loading()), 
				"decoding": (this.decoding()), 
				"crossOrigin": (this.cors()), 
				"width": (this.natural_width()), 
				"height": (this.natural_height())
			};
		}
		event(){
			return {"load": (next) => (this.load(next))};
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
	};
	($mol_mem(($.$mol_image.prototype), "load"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_image extends $.$mol_image {
            natural_width(next) {
                const dom = this.dom_node();
                if (dom.naturalWidth)
                    return dom.naturalWidth;
                const found = this.uri().match(/\bwidth=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            natural_height(next) {
                const dom = this.dom_node();
                if (dom.naturalHeight)
                    return dom.naturalHeight;
                const found = this.uri().match(/\bheight=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            load() {
                this.natural_width(null);
                this.natural_height(null);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_width", null);
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_height", null);
        $$.$mol_image = $mol_image;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching protocols"] = 101] = "Switching protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non-Authoritative Information"] = 203] = "Non-Authoritative Information";
        $mol_rest_code[$mol_rest_code["No Content"] = 204] = "No Content";
        $mol_rest_code[$mol_rest_code["Reset Content"] = 205] = "Reset Content";
        $mol_rest_code[$mol_rest_code["Partial Content"] = 206] = "Partial Content";
        $mol_rest_code[$mol_rest_code["Multi Status"] = 207] = "Multi Status";
        $mol_rest_code[$mol_rest_code["Already Reported"] = 208] = "Already Reported";
        $mol_rest_code[$mol_rest_code["IM Used"] = 226] = "IM Used";
        $mol_rest_code[$mol_rest_code["Multiple Choices"] = 300] = "Multiple Choices";
        $mol_rest_code[$mol_rest_code["Moved Permanently"] = 301] = "Moved Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See Other"] = 303] = "See Other";
        $mol_rest_code[$mol_rest_code["Not Modified"] = 304] = "Not Modified";
        $mol_rest_code[$mol_rest_code["Use Proxy"] = 305] = "Use Proxy";
        $mol_rest_code[$mol_rest_code["Temporary Redirect"] = 307] = "Temporary Redirect";
        $mol_rest_code[$mol_rest_code["Bad Request"] = 400] = "Bad Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment Required"] = 402] = "Payment Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not Found"] = 404] = "Not Found";
        $mol_rest_code[$mol_rest_code["Method Not Allowed"] = 405] = "Method Not Allowed";
        $mol_rest_code[$mol_rest_code["Not Acceptable"] = 406] = "Not Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
        $mol_rest_code[$mol_rest_code["Request Timeout"] = 408] = "Request Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length Required"] = 411] = "Length Required";
        $mol_rest_code[$mol_rest_code["Precondition Failed"] = 412] = "Precondition Failed";
        $mol_rest_code[$mol_rest_code["Request Entity Too Large"] = 413] = "Request Entity Too Large";
        $mol_rest_code[$mol_rest_code["Request URI Too Long"] = 414] = "Request URI Too Long";
        $mol_rest_code[$mol_rest_code["Unsupported Media Type"] = 415] = "Unsupported Media Type";
        $mol_rest_code[$mol_rest_code["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation Failed"] = 417] = "Expectation Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable Entity"] = 422] = "Unprocessable Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed Dependency"] = 424] = "Failed Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade Required"] = 426] = "Upgrade Required";
        $mol_rest_code[$mol_rest_code["Precondition Required"] = 428] = "Precondition Required";
        $mol_rest_code[$mol_rest_code["Too Many Requests"] = 429] = "Too Many Requests";
        $mol_rest_code[$mol_rest_code["Request Header Fields Too Large"] = 431] = "Request Header Fields Too Large";
        $mol_rest_code[$mol_rest_code["Unavailable For Legal Reasons"] = 451] = "Unavailable For Legal Reasons";
        $mol_rest_code[$mol_rest_code["Internal Server Error"] = 500] = "Internal Server Error";
        $mol_rest_code[$mol_rest_code["Not Implemented"] = 501] = "Not Implemented";
        $mol_rest_code[$mol_rest_code["Bad Gateway"] = 502] = "Bad Gateway";
        $mol_rest_code[$mol_rest_code["Service Unavailable"] = 503] = "Service Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway Timeout"] = 504] = "Gateway Timeout";
        $mol_rest_code[$mol_rest_code["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
        $mol_rest_code[$mol_rest_code["Insufficient Storage"] = 507] = "Insufficient Storage";
        $mol_rest_code[$mol_rest_code["Loop Detected"] = 508] = "Loop Detected";
        $mol_rest_code[$mol_rest_code["Not Extended"] = 510] = "Not Extended";
        $mol_rest_code[$mol_rest_code["Network Authentication Required"] = 511] = "Network Authentication Required";
        $mol_rest_code[$mol_rest_code["Network Read Timeout Error"] = 598] = "Network Read Timeout Error";
        $mol_rest_code[$mol_rest_code["Network Connect Timeout Error"] = 599] = "Network Connect Timeout Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_enriched(cause, cb) {
        return $mol_error_fence(cb, e => new $mol_error_mix(e.message, cause, e));
    }
    $.$mol_error_enriched = $mol_error_enriched;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object {
        native;
        request;
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        ok() {
            return this.native.ok;
        }
        message() {
            return $mol_rest_code[this.code()] || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const mime = this.mime() || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).json());
        }
        blob() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).blob());
        }
        buffer() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).arrayBuffer());
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch_request extends $mol_object {
        native;
        response_async() {
            const controller = new AbortController();
            let done = false;
            const request = new Request(this.native, { signal: controller.signal });
            const promise = fetch(request).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    // Abort of done request breaks response parsing
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        response() {
            return this.$.$mol_fetch_response.make({
                native: $mol_wire_sync(this).response_async(),
                request: this
            });
        }
        success() {
            const response = this.response();
            if (response.status() === 'success')
                return response;
            throw new Error(response.message(), { cause: response });
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_request.prototype, "response", null);
    $.$mol_fetch_request = $mol_fetch_request;
    class $mol_fetch extends $mol_object {
        static request(input, init) {
            return this.$.$mol_fetch_request.make({
                native: new Request(input, init)
            });
        }
        static response(input, init) {
            return this.request(input, init).response();
        }
        static success(input, init) {
            return this.request(input, init).success();
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static blob(input, init) {
            return this.success(input, init).blob();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "request", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_webdav extends $mol_file_base {
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                // foo/../ -> /
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            // http://localhost/.. -> http://localhost
            res = res.replace(/\/\.\.\/?$/, '');
            if (res === this.path())
                return this;
            return this.constructor.absolute(res);
        }
        static headers() { return {}; }
        headers() { return this.constructor.headers(); }
        fetch(init) {
            return this.$.$mol_fetch.success(this.path(), {
                ...init,
                headers: {
                    ...this.headers(),
                    ...init.headers,
                }
            });
        }
        read() {
            try {
                const response = this.fetch({});
                return new Uint8Array(response.buffer());
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return new Uint8Array;
                $mol_fail_hidden(error);
            }
        }
        write(body) { this.fetch({ method: 'PUT', body }); }
        ensure() { this.fetch({ method: 'MKCOL' }); }
        drop() { this.fetch({ method: 'DELETE' }); }
        copy(to) {
            this.fetch({
                method: 'COPY',
                headers: { Destination: to }
            });
        }
        kids() {
            const response = this.fetch({ method: 'PROPFIND' });
            const xml = response.xml();
            const result = [];
            for (const multistatus of xml.childNodes) {
                if (multistatus.nodeName !== 'D:multistatus')
                    continue;
                for (const response of multistatus.childNodes) {
                    let path;
                    if (response.nodeName === 'D:href')
                        path = response.textContent ?? '';
                    if (!path)
                        continue;
                    if (response.nodeName !== 'D:propstat')
                        continue;
                    const stat = webdav_stat(response);
                    const file = this.resolve(path);
                    file.stat(stat, 'virt');
                    result.push(file);
                }
            }
            return result;
        }
        readable(opts) {
            return this.fetch({
                headers: !opts.start ? {} : {
                    'Range': `bytes=${opts.start}-${opts.end ?? ''}`
                }
            }).stream() || $mol_fail(new Error('Not found'));
        }
        info() {
            return this.kids().at(0)?.stat() ?? null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_file_webdav.prototype, "readable", null);
    $.$mol_file_webdav = $mol_file_webdav;
    function webdav_stat(prop_stat) {
        const now = new Date();
        const stat = {
            type: 'file',
            size: 0,
            atime: now,
            mtime: now,
            ctime: now,
        };
        for (const prop of prop_stat.childNodes) {
            if (prop.nodeName !== 'D:prop')
                continue;
            for (const value of prop.childNodes) {
                const name = value.nodeName;
                const text = value.textContent ?? '';
                if (name === 'D:getcontenttype') {
                    stat.type = text.endsWith('directory') ? 'dir' : 'file';
                }
                if (name === 'D:getcontentlength') {
                    stat.size = Number(value.textContent || '0');
                    if (Number.isNaN(stat.size))
                        stat.size = 0;
                }
                if (name === 'D:getlastmodified')
                    stat.mtime = stat.atime = new Date(text);
                if (name === 'D:creationdate')
                    stat.ctime = new Date(text);
            }
        }
        return stat;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_web extends $mol_file_webdav {
        static base = new URL('.', $mol_dom_context.document?.currentScript?.['src'] ?? globalThis.location.href).toString();
        // Вотчер выключен, версия всегда будет одна
        // Если пустая строка - будет считаться, что файла нет
        version() { return '1'; }
        // Ворнинги подавляем, иначе в каждом приложении, загружающим локали, будет ворнинг
        // override watcher() { return { destructor() {} }}
        info() {
            // Директории не поддерживаются
            try {
                const response = this.fetch({ method: 'HEAD' });
                const headers = response.headers();
                let size = Number(headers.get('Content-Length'));
                if (Number.isNaN(size))
                    size = 0;
                const last = headers.get('Last-Modified');
                const mtime = last ? new Date(last) : new Date();
                return {
                    type: 'file',
                    size,
                    mtime,
                    atime: mtime,
                    ctime: mtime,
                };
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return null;
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_file_web = $mol_file_web;
    $.$mol_file = $mol_file_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static langs_rtl() {
            return ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'ug', 'sd'];
        }
        static direction() {
            const lang = this.lang();
            try {
                return new Intl.Locale(lang).getTextInfo().direction ?? 'ltr';
            }
            catch (e) {
                $mol_fail_log(e);
                return this.langs_rtl().includes(lang) ? 'rtl' : 'ltr';
            }
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "direction", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_icon_white_balance_sunny) = class $mol_icon_white_balance_sunny extends ($.$mol_icon) {
		path(){
			return "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13";
		}
	};


;
"use strict";


;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_monitor) = class $mol_icon_monitor extends ($.$mol_icon) {
		path(){
			return "M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_weather_night) = class $mol_icon_weather_night extends ($.$mol_icon) {
		path(){
			return "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";
		}
	};


;
"use strict";


;
	($.$bog_theme_switch) = class $bog_theme_switch extends ($.$mol_view) {
		light_active(){
			return false;
		}
		light_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_light_hint"));
		}
		set_light(next){
			if(next !== undefined) return next;
			return null;
		}
		Light_icon(){
			const obj = new this.$.$mol_icon_white_balance_sunny();
			return obj;
		}
		Light(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.light_active())});
			(obj.hint) = () => ((this.light_hint()));
			(obj.click) = (next) => ((this.set_light(next)));
			(obj.sub) = () => ([(this.Light_icon())]);
			return obj;
		}
		system_active(){
			return false;
		}
		system_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_system_hint"));
		}
		set_system(next){
			if(next !== undefined) return next;
			return null;
		}
		System_icon(){
			const obj = new this.$.$mol_icon_monitor();
			return obj;
		}
		System(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.system_active())});
			(obj.hint) = () => ((this.system_hint()));
			(obj.click) = (next) => ((this.set_system(next)));
			(obj.sub) = () => ([(this.System_icon())]);
			return obj;
		}
		dark_active(){
			return false;
		}
		dark_hint(){
			return (this.$.$mol_locale.text("$bog_theme_switch_dark_hint"));
		}
		set_dark(next){
			if(next !== undefined) return next;
			return null;
		}
		Dark_icon(){
			const obj = new this.$.$mol_icon_weather_night();
			return obj;
		}
		Dark(){
			const obj = new this.$.$mol_button_minor();
			(obj.attr) = () => ({...(this.$.$mol_button_minor.prototype.attr.call(obj)), "bog_theme_switch_active": (this.dark_active())});
			(obj.hint) = () => ((this.dark_hint()));
			(obj.click) = (next) => ((this.set_dark(next)));
			(obj.sub) = () => ([(this.Dark_icon())]);
			return obj;
		}
		theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		sub(){
			return [
				(this.Light()), 
				(this.System()), 
				(this.Dark())
			];
		}
	};
	($mol_mem(($.$bog_theme_switch.prototype), "set_light"));
	($mol_mem(($.$bog_theme_switch.prototype), "Light_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "Light"));
	($mol_mem(($.$bog_theme_switch.prototype), "set_system"));
	($mol_mem(($.$bog_theme_switch.prototype), "System_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "System"));
	($mol_mem(($.$bog_theme_switch.prototype), "set_dark"));
	($mol_mem(($.$bog_theme_switch.prototype), "Dark_icon"));
	($mol_mem(($.$bog_theme_switch.prototype), "Dark"));
	($mol_mem(($.$bog_theme_switch.prototype), "theme_auto"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_theme_switch extends $.$bog_theme_switch {
            light_active() {
                return this.theme_auto().mode() === 'light';
            }
            system_active() {
                return this.theme_auto().mode() === 'system';
            }
            dark_active() {
                return this.theme_auto().mode() === 'dark';
            }
            set_light() {
                this.theme_auto().mode('light');
                return null;
            }
            set_system() {
                this.theme_auto().mode('system');
                return null;
            }
            set_dark() {
                this.theme_auto().mode('dark');
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "light_active", null);
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "system_active", null);
        __decorate([
            $mol_mem
        ], $bog_theme_switch.prototype, "dark_active", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_light", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_system", null);
        __decorate([
            $mol_action
        ], $bog_theme_switch.prototype, "set_dark", null);
        $$.$bog_theme_switch = $bog_theme_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($bog_theme_switch, {
        display: 'flex',
        flex: { direction: 'row', shrink: 0 },
        gap: '2px',
        padding: { top: '3px', right: '3px', bottom: '3px', left: '3px' },
        background: { color: $mol_theme.field },
        border: {
            radius: '999px',
            width: '1px',
            style: 'solid',
            color: $mol_theme.line,
        },
        // Явный размер иконкам. У $mol_icon нет ни атрибутов width/height, ни своих
        // стилей — размер ему целиком отдан на откуп раскладке. Chrome в этом случае
        // даёт svg 16x16, а Safari сжимает его в ноль внутри флекс-кнопки: пилюля
        // рисуется, иконок не видно. Задаём размер сами, чтобы не зависеть от
        // расхождения движков.
        $mol_icon: {
            width: '1rem',
            height: '1rem',
            flex: { shrink: 0 },
        },
        $mol_button_minor: {
            minWidth: '2rem',
            minHeight: '2rem',
            padding: { top: 0, right: '0.5rem', bottom: 0, left: '0.5rem' },
            border: { radius: '999px' },
            background: { color: 'transparent' },
            boxShadow: 'none',
            color: $mol_theme.shade,
            transition: 'background-color 200ms ease, color 200ms ease, box-shadow 200ms ease',
            ':hover': {
                background: { color: $mol_theme.hover },
                boxShadow: 'none',
                color: $mol_theme.text,
            },
            '[bog_theme_switch_active]': {
                true: {
                    background: { color: $mol_theme.back },
                    color: $mol_theme.text,
                    box: {
                        shadow: [
                            { x: 0, y: '1px', blur: '2px', spread: 0, color: '#0000001a' },
                            { x: 0, y: '1px', blur: '1px', spread: 0, color: '#0000000d' },
                            { inset: true, x: 0, y: 0, blur: 0, spread: '100vmax', color: '#00000022' },
                        ],
                    },
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_sidebar_lang) = class $raggu_web_front_sidebar_lang extends ($.$bog_builderui_div) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		label(){
			return "";
		}
		active(){
			return false;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_sidebar_lang_active": (this.active())};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
		sub(){
			return [(this.label())];
		}
	};
	($mol_mem(($.$raggu_web_front_sidebar_lang.prototype), "click"));


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_sidebar_lang, {
        font: {
            family: 'ui-monospace, monospace',
            weight: 700,
            size: '11px',
        },
        padding: {
            top: '4px',
            bottom: '4px',
            left: '8px',
            right: '8px',
        },
        border: { radius: '5px' },
        cursor: 'pointer',
        color: $bog_builderui_tokens.shade,
        '@': {
            raggu_web_front_sidebar_lang_active: {
                true: {
                    background: { color: $bog_builderui_tokens.current },
                    color: '#ffffff',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_sidebar) = class $raggu_web_front_sidebar extends ($.$bog_builderui_div) {
		Brand_logo(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ("raggu/web/front/assets/logo.jpg");
			(obj.title) = () => ("RAGU");
			return obj;
		}
		Brand_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => (["RAGU"]);
			return obj;
		}
		Brand_badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => (["demo"]);
			return obj;
		}
		Brand(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Brand_logo()), 
				(this.Brand_title()), 
				(this.Brand_badge())
			]);
			return obj;
		}
		Datasets_label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.datasets_label_text())]);
			return obj;
		}
		dataset_active(id){
			return false;
		}
		dataset_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Dataset_name(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.dataset_name(id))]);
			return obj;
		}
		Dataset_meta(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.dataset_meta(id))]);
			return obj;
		}
		Dataset_row(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_sidebar_dataset_active": (this.dataset_active(id))});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.dataset_click(id, next))});
			(obj.sub) = () => ([(this.Dataset_name(id)), (this.Dataset_meta(id))]);
			return obj;
		}
		dataset_rows(){
			return [(this.Dataset_row(id))];
		}
		Dataset_list(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.dataset_rows()));
			return obj;
		}
		Datasets(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Dataset_list())]);
			return obj;
		}
		Theme_switch(){
			const obj = new this.$.$bog_theme_switch();
			(obj.theme_auto) = () => ((this.Theme_auto()));
			return obj;
		}
		Lang_label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.lang_label_text())]);
			return obj;
		}
		is_en(){
			return false;
		}
		click_en(next){
			if(next !== undefined) return next;
			return null;
		}
		Lang_en(){
			const obj = new this.$.$raggu_web_front_sidebar_lang();
			(obj.label) = () => ("EN");
			(obj.active) = () => ((this.is_en()));
			(obj.click) = (next) => ((this.click_en(next)));
			return obj;
		}
		is_ru(){
			return false;
		}
		click_ru(next){
			if(next !== undefined) return next;
			return null;
		}
		Lang_ru(){
			const obj = new this.$.$raggu_web_front_sidebar_lang();
			(obj.label) = () => ("RU");
			(obj.active) = () => ((this.is_ru()));
			(obj.click) = (next) => ((this.click_ru(next)));
			return obj;
		}
		Lang_row(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Theme_switch()), 
				(this.Lang_label()), 
				(this.Lang_en()), 
				(this.Lang_ru())
			]);
			return obj;
		}
		Footer(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Lang_row())]);
			return obj;
		}
		dataset_id(){
			return "";
		}
		dataset_ids(){
			return [];
		}
		select_dataset(next){
			if(next !== undefined) return next;
			return null;
		}
		Theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		datasets_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_sidebar_datasets_label_text"));
		}
		lang_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_sidebar_lang_label_text"));
		}
		dataset_name(id){
			return "";
		}
		dataset_meta(id){
			return "";
		}
		sub(){
			return [
				(this.Brand()), 
				(this.Datasets_label()), 
				(this.Datasets()), 
				(this.Footer())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Brand_logo"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Brand_title"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Brand_badge"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Brand"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Datasets_label"));
	($mol_mem_key(($.$raggu_web_front_sidebar.prototype), "dataset_click"));
	($mol_mem_key(($.$raggu_web_front_sidebar.prototype), "Dataset_name"));
	($mol_mem_key(($.$raggu_web_front_sidebar.prototype), "Dataset_meta"));
	($mol_mem_key(($.$raggu_web_front_sidebar.prototype), "Dataset_row"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Dataset_list"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Datasets"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Theme_switch"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Lang_label"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "click_en"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Lang_en"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "click_ru"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Lang_ru"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Lang_row"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Footer"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "select_dataset"));
	($mol_mem(($.$raggu_web_front_sidebar.prototype), "Theme_auto"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_sidebar extends $.$raggu_web_front_sidebar {
            dataset_rows() {
                return this.dataset_ids().map((id) => this.Dataset_row(id));
            }
            dataset_active(id) { return id === this.dataset_id(); }
            dataset_click(id) {
                this.select_dataset(id);
                return null;
            }
            // Русский — единственная не-базовая локаль: всё остальное (включая
            // незнакомый navigator.language) рендерится английскими строками
            // view.tree, значит и подсвечивать надо EN.
            is_ru() { return this.$.$mol_locale.lang() === 'ru'; }
            is_en() { return !this.is_ru(); }
            click_en() { this.$.$mol_locale.lang('en'); return null; }
            click_ru() { this.$.$mol_locale.lang('ru'); return null; }
        }
        __decorate([
            $mol_action
        ], $raggu_web_front_sidebar.prototype, "dataset_click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_sidebar.prototype, "click_en", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_sidebar.prototype, "click_ru", null);
        $$.$raggu_web_front_sidebar = $raggu_web_front_sidebar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_sidebar, {
        minWidth: '228px',
        maxWidth: '228px',
        background: { color: $bog_builderui_tokens.field },
        border: {
            right: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
        },
        flex: { direction: 'column' },
        padding: {
            top: '1.125rem',
            bottom: '1.125rem',
            left: '0.875rem',
            right: '0.875rem',
        },
        '@': {
            raggu_web_front_sidebar_hidden: {
                true: { display: 'none' },
            },
        },
        Brand: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '0.5625rem',
            padding: {
                top: '0.25rem',
                bottom: '1.125rem',
                left: '0.375rem',
                right: '0.375rem',
            },
        },
        Brand_logo: {
            minWidth: '26px',
            maxWidth: '26px',
            height: '26px',
            border: { radius: '6px' },
            objectFit: 'cover',
            overflow: 'hidden',
        },
        Brand_title: {
            font: { weight: 700, size: '16px' },
            letterSpacing: '0.3px',
        },
        Brand_badge: {
            marginLeft: 'auto',
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '9px',
            },
            color: $bog_builderui_tokens.shade,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '4px' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '5px',
                right: '5px',
            },
        },
        Datasets_label: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: {
                top: 0,
                bottom: '0.5rem',
                left: '0.375rem',
                right: '0.375rem',
            },
        },
        Datasets: {
            flex: { grow: 1, shrink: 1 },
            minHeight: 0,
        },
        Dataset_list: {
            flex: { direction: 'column' },
            gap: '0.25rem',
            // Рамка активной строки — box-shadow, торчит наружу; без отступов
            // её срезает overflow скролла
            padding: {
                top: '2px',
                bottom: '2px',
                left: '3px',
                right: '3px',
            },
        },
        Dataset_row: {
            flex: { direction: 'column' },
            gap: '0.125rem',
            padding: {
                top: '0.5rem',
                bottom: '0.5rem',
                left: '0.6875rem',
                right: '0.6875rem',
            },
            border: { radius: '7px' },
            cursor: 'pointer',
            ':hover': {
                background: { color: $bog_builderui_tokens.card },
            },
            '@': {
                raggu_web_front_sidebar_dataset_active: {
                    true: {
                        background: { color: $bog_builderui_tokens.card },
                        box: {
                            shadow: [{
                                    x: 0,
                                    y: 0,
                                    blur: 0,
                                    spread: '1.5px',
                                    color: $bog_builderui_tokens.current,
                                }],
                        },
                        // Имя активного корпуса — в акцент, эффект виден и без рамки
                        Dataset_name: {
                            color: $bog_builderui_tokens.current,
                        },
                    },
                },
            },
        },
        Dataset_name: {
            font: { weight: 600, size: '13px' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        Dataset_meta: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 500,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
        },
        Footer: {
            flex: { direction: 'column' },
            gap: '0.625rem',
            padding: { top: '0.625rem' },
        },
        Lang_row: {
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            gap: '0.125rem',
            align: { items: 'center' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '4px',
                right: '4px',
            },
        },
        Lang_label: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            marginRight: 'auto',
        },
        Theme_switch: {
            padding: { top: '2px', bottom: '2px', left: '2px', right: '2px' },
            background: { color: $bog_builderui_tokens.card },
            border: { color: $bog_builderui_tokens.line },
            $mol_button_minor: {
                minWidth: '1.5rem',
                minHeight: '1.5rem',
                padding: { top: 0, bottom: 0, left: '0.375rem', right: '0.375rem' },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_topbar_nav) = class $raggu_web_front_topbar_nav extends ($.$bog_builderui_div) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		Icon(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.icon())]);
			return obj;
		}
		Label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.label())]);
			return obj;
		}
		icon(){
			return "";
		}
		label(){
			return "";
		}
		hint(){
			return "";
		}
		active(){
			return false;
		}
		disabled(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"title": (this.hint()), 
				"raggu_web_front_topbar_nav_active": (this.active()), 
				"raggu_web_front_topbar_nav_disabled": (this.disabled())
			};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
		sub(){
			return [(this.Icon()), (this.Label())];
		}
	};
	($mol_mem(($.$raggu_web_front_topbar_nav.prototype), "click"));
	($mol_mem(($.$raggu_web_front_topbar_nav.prototype), "Icon"));
	($mol_mem(($.$raggu_web_front_topbar_nav.prototype), "Label"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_topbar_nav extends $.$raggu_web_front_topbar_nav {
            /**
             * Без подписи кнопка остаётся чисто иконочной. Пустой Label не просто
             * невидим: он всё равно flex-элемент и съедает gap, из-за чего иконка
             * перестаёт стоять по центру квадрата.
             */
            Label() {
                if (!this.label())
                    return null;
                return super.Label();
            }
        }
        $$.$raggu_web_front_topbar_nav = $raggu_web_front_topbar_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_topbar_nav, {
        align: { items: 'center' },
        justify: { content: 'center' },
        minWidth: '34px',
        minHeight: '34px',
        border: { radius: '7px' },
        font: { size: '15px' },
        cursor: 'pointer',
        color: $bog_builderui_tokens.shade,
        // Подпись мельче иконки: размер шрифта кнопки — это размер самой иконки.
        // Рендерится только у кнопок с непустым label (см. nav.view.ts).
        Label: {
            font: { size: '12px', weight: 600 },
            whiteSpace: 'nowrap',
        },
        '@': {
            raggu_web_front_topbar_nav_active: {
                true: {
                    background: { color: $bog_builderui_tokens.current },
                    color: '#ffffff',
                },
            },
            raggu_web_front_topbar_nav_disabled: {
                true: {
                    opacity: 0.4,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_topbar) = class $raggu_web_front_topbar extends ($.$bog_builderui_div) {
		toggle_sidebar(next){
			if(next !== undefined) return next;
			return null;
		}
		Sidebar_btn(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("◫");
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Sidebar_btn_hint")));
			(obj.click) = (next) => ((this.toggle_sidebar(next)));
			return obj;
		}
		is_gallery(){
			return false;
		}
		click_gallery(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav_gallery(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("▤");
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_gallery_hint")));
			(obj.active) = () => ((this.is_gallery()));
			(obj.click) = (next) => ((this.click_gallery(next)));
			return obj;
		}
		is_explorer(){
			return false;
		}
		no_dataset(){
			return false;
		}
		click_explorer(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav_explorer(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("◉");
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_explorer_hint")));
			(obj.active) = () => ((this.is_explorer()));
			(obj.disabled) = () => ((this.no_dataset()));
			(obj.click) = (next) => ((this.click_explorer(next)));
			return obj;
		}
		is_chat(){
			return false;
		}
		click_chat(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav_chat(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("💬");
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_chat_hint")));
			(obj.active) = () => ((this.is_chat()));
			(obj.disabled) = () => ((this.no_dataset()));
			(obj.click) = (next) => ((this.click_chat(next)));
			return obj;
		}
		is_summary(){
			return false;
		}
		click_summary(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav_summary(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("✦");
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_summary_hint")));
			(obj.active) = () => ((this.is_summary()));
			(obj.click) = (next) => ((this.click_summary(next)));
			return obj;
		}
		Nav_row(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Nav_gallery()), 
				(this.Nav_explorer()), 
				(this.Nav_chat()), 
				(this.Nav_summary())
			]);
			return obj;
		}
		open_help(next){
			if(next !== undefined) return next;
			return null;
		}
		Help_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.open_help(next))});
			(obj.sub) = () => ([(this.help_btn_text())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.screen_title())]);
			return obj;
		}
		Subtitle(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.dataset_title())]);
			return obj;
		}
		Title_block(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Title()), (this.Subtitle())]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		settings_open(){
			return false;
		}
		open_settings(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav_settings(){
			const obj = new this.$.$raggu_web_front_topbar_nav();
			(obj.icon) = () => ("⚙");
			(obj.label) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_settings_label")));
			(obj.hint) = () => ((this.$.$mol_locale.text("$raggu_web_front_topbar_Nav_settings_hint")));
			(obj.active) = () => ((this.settings_open()));
			(obj.click) = (next) => ((this.open_settings(next)));
			return obj;
		}
		screen(next){
			if(next !== undefined) return next;
			return "gallery";
		}
		dataset_id(){
			return "wiki";
		}
		dataset_title(){
			return "";
		}
		screen_title(){
			return "";
		}
		help_btn_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_topbar_help_btn_text"));
		}
		sub(){
			return [
				(this.Sidebar_btn()), 
				(this.Nav_row()), 
				(this.Help_btn()), 
				(this.Title_block()), 
				(this.Spacer()), 
				(this.Nav_settings())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_topbar.prototype), "toggle_sidebar"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Sidebar_btn"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "click_gallery"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_gallery"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "click_explorer"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_explorer"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "click_chat"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_chat"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "click_summary"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_summary"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_row"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "open_help"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Help_btn"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Subtitle"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Title_block"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "open_settings"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "Nav_settings"));
	($mol_mem(($.$raggu_web_front_topbar.prototype), "screen"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_topbar extends $.$raggu_web_front_topbar {
            is_gallery() { return this.screen() === 'gallery'; }
            is_explorer() { return this.screen() === 'explorer'; }
            is_chat() { return this.screen() === 'chat'; }
            is_summary() { return this.screen() === 'summary'; }
            no_dataset() { return !this.dataset_id(); }
            click_gallery() { this.screen('gallery'); return null; }
            click_explorer() { this.screen('explorer'); return null; }
            click_chat() { this.screen('chat'); return null; }
            click_summary() { this.screen('summary'); return null; }
        }
        __decorate([
            $mol_action
        ], $raggu_web_front_topbar.prototype, "click_gallery", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_topbar.prototype, "click_explorer", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_topbar.prototype, "click_chat", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_topbar.prototype, "click_summary", null);
        $$.$raggu_web_front_topbar = $raggu_web_front_topbar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_topbar, {
        height: '58px',
        minHeight: '58px',
        background: { color: $bog_builderui_tokens.card },
        border: {
            bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
        },
        flex: { direction: 'row' },
        align: { items: 'center' },
        gap: '0.875rem',
        padding: {
            left: '1.25rem',
            right: '1.25rem',
        },
        // Не `Nav`: имя свойства даёт атрибут `raggu_web_front_topbar_nav`, а он
        // совпадает с именем класса кнопки $raggu_web_front_topbar_nav — стиль
        // контейнера красил и сами кнопки. Специфичность у обоих правил равна
        // (`:where` у активного состояния не добавляет веса), решал порядок
        // файлов, и фон контейнера перебивал акцент активной вкладки.
        Nav_row: {
            flex: { direction: 'row' },
            gap: '0.125rem',
            background: { color: $bog_builderui_tokens.field },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            padding: {
                top: '3px',
                bottom: '3px',
                left: '3px',
                right: '3px',
            },
        },
        // Заголовок сразу после переключалок разделов, не по центру окна
        Title_block: {
            flex: { direction: 'column' },
            align: { items: 'flex-start' },
            textAlign: 'left',
            margin: { left: '0.5rem' },
        },
        Title: {
            font: { weight: 700, size: '15px' },
        },
        Subtitle: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 500,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
        },
        Spacer: {
            flex: { grow: 1 },
        },
        // Шестерёнка стоит одна справа, без групповой подложки, какая есть у
        // Nav_row — серым по светлой карточке её не видно. Даём рамку, как у
        // «Помощи», обычный цвет текста и икону покрупнее.
        //
        // Активное состояние переигрываем здесь же: правило акцента живёт в
        // nav.view.css.ts, специфичность у обоих одинаковая, и кто победит —
        // решал бы порядок файлов в бандле.
        Nav_settings: {
            color: $bog_builderui_tokens.text,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            font: { size: '17px' },
            // С подписью кнопка перестаёт быть квадратной иконкой: ширину задаёт
            // содержимое, minWidth из базового стиля тут только мешал бы.
            flex: { direction: 'row', shrink: 0 },
            gap: '7px',
            minWidth: 'auto',
            padding: { left: '10px', right: '12px' },
            '@': {
                raggu_web_front_topbar_nav_active: {
                    true: {
                        background: { color: $bog_builderui_tokens.current },
                        color: '#ffffff',
                    },
                },
            },
        },
        Help_btn: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '6px',
            background: { color: $bog_builderui_tokens.card },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            padding: {
                top: '7px',
                bottom: '7px',
                left: '12px',
                right: '12px',
            },
            font: { size: '12px', weight: 600 },
            cursor: 'pointer',
        },
        // Навигация + центрированный заголовок не влезают уже на
        // ноутбучных ширинах, поэтому враппим сильно раньше, чем раньше (720).
        '@media': {
            '(max-width: 1200px)': {
                height: 'auto',
                minHeight: '58px',
                flexWrap: 'wrap',
                gap: '0.5rem',
                padding: {
                    top: '8px',
                    bottom: '8px',
                    left: '0.75rem',
                    right: '0.75rem',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_help_section) = class $raggu_web_front_help_section extends ($.$bog_builderui_div) {
		Icon(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.icon())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Desc(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.desc())]);
			return obj;
		}
		Media(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.media()));
			return obj;
		}
		Text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Title()), 
				(this.Desc()), 
				(this.Media())
			]);
			return obj;
		}
		icon(){
			return "";
		}
		title(){
			return "";
		}
		desc(){
			return "";
		}
		media(){
			return [];
		}
		sub(){
			return [(this.Icon()), (this.Text())];
		}
	};
	($mol_mem(($.$raggu_web_front_help_section.prototype), "Icon"));
	($mol_mem(($.$raggu_web_front_help_section.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_help_section.prototype), "Desc"));
	($mol_mem(($.$raggu_web_front_help_section.prototype), "Media"));
	($mol_mem(($.$raggu_web_front_help_section.prototype), "Text"));


;
"use strict";


;
	($.$raggu_web_front_help) = class $raggu_web_front_help extends ($.$bog_builderui_div) {
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			return obj;
		}
		Header_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title_text())]);
			return obj;
		}
		Header_sub(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.subtitle_text())]);
			return obj;
		}
		Header_text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header_title()), (this.Header_sub())]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		Close_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			(obj.sub) = () => (["✕"]);
			return obj;
		}
		Header(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Header_text()), 
				(this.Spacer()), 
				(this.Close_btn())
			]);
			return obj;
		}
		Intro(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.intro_text())]);
			return obj;
		}
		Section_gallery(){
			const obj = new this.$.$raggu_web_front_help_section();
			(obj.icon) = () => ("▤");
			(obj.title) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_gallery_title")));
			(obj.desc) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_gallery_desc")));
			return obj;
		}
		Section_explorer(){
			const obj = new this.$.$raggu_web_front_help_section();
			(obj.icon) = () => ("◉");
			(obj.title) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_explorer_title")));
			(obj.desc) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_explorer_desc")));
			return obj;
		}
		Section_summary(){
			const obj = new this.$.$raggu_web_front_help_section();
			(obj.icon) = () => ("✦");
			(obj.title) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_summary_title")));
			(obj.desc) = () => ((this.$.$mol_locale.text("$raggu_web_front_help_Section_summary_desc")));
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([
				(this.Intro()), 
				(this.Section_gallery()), 
				(this.Section_explorer()), 
				(this.Section_summary())
			]);
			return obj;
		}
		Panel(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header()), (this.Body())]);
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_help_title_text"));
		}
		subtitle_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_help_subtitle_text"));
		}
		intro_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_help_intro_text"));
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_help_showed": (this.showed())};
		}
		sub(){
			return [(this.Backdrop()), (this.Panel())];
		}
	};
	($mol_mem(($.$raggu_web_front_help.prototype), "close"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Backdrop"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Header_title"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Header_sub"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Header_text"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Close_btn"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Header"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Intro"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Section_gallery"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Section_explorer"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Section_summary"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_help.prototype), "Panel"));
	($mol_mem(($.$raggu_web_front_help.prototype), "showed"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_help extends $.$raggu_web_front_help {
            close() {
                this.showed(false);
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $raggu_web_front_help.prototype, "close", null);
        $$.$raggu_web_front_help = $raggu_web_front_help;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_help, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'none',
        zIndex: 40,
        '@': {
            raggu_web_front_help_showed: {
                true: { display: 'flex' },
            },
        },
        Backdrop: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: { color: '#1c1b1a59' },
        },
        Panel: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '420px',
            maxWidth: '100vw',
            background: { color: $bog_builderui_tokens.card },
            border: {
                left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            zIndex: 1,
            flex: { direction: 'column' },
            box: {
                shadow: [{
                        x: '-12px',
                        y: 0,
                        blur: '40px',
                        spread: 0,
                        color: '#0000001f',
                    }],
            },
        },
        Header: {
            padding: {
                top: '18px',
                bottom: '18px',
                left: '20px',
                right: '20px',
            },
            border: {
                bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '0.75rem',
        },
        Header_text: {
            flex: { direction: 'column' },
            gap: '0.125rem',
        },
        Header_title: {
            font: { weight: 700, size: '15px' },
        },
        Header_sub: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 500,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
        },
        Spacer: {
            flex: { grow: 1 },
        },
        Close_btn: {
            cursor: 'pointer',
            color: $bog_builderui_tokens.shade,
            font: { size: '14px' },
            padding: {
                top: '4px',
                bottom: '4px',
                left: '8px',
                right: '8px',
            },
            border: { radius: '6px' },
        },
        Body: {
            // $mol_scroll по умолчанию grid — дети лягут друг на друга (1/1)
            display: 'flex',
            flex: { grow: 1, shrink: 1, direction: 'column' },
            minHeight: 0,
            padding: {
                top: '16px',
                bottom: '16px',
                left: '20px',
                right: '20px',
            },
            gap: '1rem',
        },
        Intro: {
            font: { size: '13px' },
            lineHeight: '1.5',
            color: $bog_builderui_tokens.shade,
        },
    });
    $mol_style_define($raggu_web_front_help_section, {
        flex: { direction: 'row' },
        gap: '0.75rem',
        align: { items: 'flex-start' },
        Icon: {
            minWidth: '30px',
            maxWidth: '30px',
            height: '30px',
            align: { items: 'center' },
            justify: { content: 'center' },
            background: { color: $bog_builderui_tokens.field },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            font: { size: '14px' },
        },
        Text: {
            flex: { direction: 'column', shrink: 1 },
            gap: '0.25rem',
            minWidth: 0,
        },
        Title: {
            font: { weight: 700, size: '13px' },
        },
        Desc: {
            font: { size: '12px' },
            lineHeight: '1.5',
            color: $bog_builderui_tokens.shade,
        },
    });
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Mixin view logic to DOM node of another component.
         */
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Marker on top of another component with tracking of its position.
         */
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		align(){
			return "bottom_center";
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * `Bubble` that can be shown anchored to `Anchor` element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
         */
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            bubble_offset() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: calc( 100vw - var(--mol_gap_page) );\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: start;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Checkbox UI component. See Variants for more concrete implementations.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
         */
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this.trigger_enabled()));
			(obj.checked) = (next) => ((this.showed(next)));
			(obj.clicks) = (next) => ((this.clicks(next)));
			(obj.sub) = () => ((this.trigger_content()));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		Anchor(){
			return (this.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Pop-up display and hide by mouse click, also hide by unfocus.
         * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
         */
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Output text with dimmed mismatched substrings.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
         */
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which can navigate in list of items
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
         */
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
         * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
         */
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            _view_window_last = [0, 0];
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? this._view_window_last;
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                // change nothing when already covers all limits
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                // jumps when fully over limits
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                // force recalc min when overlapse top limit
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                // force recalc max when overlapse bottom limit
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                // extend min to cover top limit
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                // extend max to cover bottom limit
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this._view_window_last = this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\t/* will-change: contents; */\n}\n\n[mol_list]:where([mol_view_error]) {\n\tmin-height: 1.5rem;\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering single line text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
         */
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";


;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Search input with suggest and clear button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
         */
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: start;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_dots_vertical) = class $mol_icon_dots_vertical extends ($.$mol_icon) {
		path(){
			return "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
		}
	};


;
"use strict";


;
	($.$mol_select) = class $mol_select extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		option_label(id){
			return "";
		}
		filter_pattern(next){
			if(next !== undefined) return next;
			return "";
		}
		Option_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_label(id)));
			(obj.needle) = () => ((this.filter_pattern()));
			return obj;
		}
		option_content(id){
			return [(this.Option_label(id))];
		}
		no_options_message(){
			return (this.$.$mol_locale.text("$mol_select_no_options_message"));
		}
		nav_components(){
			return [];
		}
		option_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_cycle(next){
			if(next !== undefined) return next;
			return true;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.option_focused(next)));
			(obj.cycle) = (next) => ((this.nav_cycle(next)));
			return obj;
		}
		menu_content(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_content()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		filter_hint(){
			return (this.$.$mol_locale.text("$mol_select_filter_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		dictionary(next){
			if(next !== undefined) return next;
			return {};
		}
		options(){
			return [];
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		option_label_default(){
			return "";
		}
		Option_row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.event_click) = (next) => ((this.event_select(id, next)));
			(obj.sub) = () => ((this.option_content(id)));
			return obj;
		}
		No_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.no_options_message())]);
			return obj;
		}
		plugins(){
			return [...(super.plugins()), (this.Nav())];
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_select_hint"));
		}
		bubble_content(){
			return [(this.Filter()), (this.Bubble_pane())];
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter_pattern(next)));
			(obj.hint) = () => ((this.filter_hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Trigger_icon(){
			const obj = new this.$.$mol_icon_dots_vertical();
			return obj;
		}
		trigger_enabled(){
			return (this.enabled());
		}
	};
	($mol_mem_key(($.$mol_select.prototype), "event_select"));
	($mol_mem(($.$mol_select.prototype), "filter_pattern"));
	($mol_mem_key(($.$mol_select.prototype), "Option_label"));
	($mol_mem(($.$mol_select.prototype), "option_focused"));
	($mol_mem(($.$mol_select.prototype), "nav_cycle"));
	($mol_mem(($.$mol_select.prototype), "Nav"));
	($mol_mem(($.$mol_select.prototype), "Menu"));
	($mol_mem(($.$mol_select.prototype), "Bubble_pane"));
	($mol_mem(($.$mol_select.prototype), "submit"));
	($mol_mem(($.$mol_select.prototype), "dictionary"));
	($mol_mem(($.$mol_select.prototype), "value"));
	($mol_mem_key(($.$mol_select.prototype), "Option_row"));
	($mol_mem(($.$mol_select.prototype), "No_options"));
	($mol_mem(($.$mol_select.prototype), "Filter"));
	($mol_mem(($.$mol_select.prototype), "Trigger_icon"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Allow user to select value from various options and displays current value.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
         */
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    ...this.trigger_enabled() ? [this.Trigger_icon()] : [],
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: start;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-inline-end: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-inline-end: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));

;
	($.$bog_builderui_select) = class $bog_builderui_select extends ($.$mol_select) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_select, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        background: {
            color: $bog_builderui_tokens.field,
        },
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            left: '0.75rem',
            right: '0.75rem',
        },
        cursor: 'pointer',
        transition: 'background-color 120ms, border-color 120ms',
        ':hover': {
            background: {
                color: $bog_builderui_tokens.hover,
            },
            border: {
                color: $bog_builderui_tokens.focus,
            },
        },
        $mol_check: {
            background: { color: 'transparent' },
            boxShadow: 'none',
            outline: 'none',
            color: 'inherit',
            ':hover': {
                background: { color: 'transparent' },
                boxShadow: 'none',
            },
            ':focus': {
                background: { color: 'transparent' },
                boxShadow: 'none',
                outline: 'none',
            },
            ':focus-visible': {
                background: { color: 'transparent' },
                boxShadow: 'none',
                outline: 'none',
            },
        },
        $mol_pop_bubble: {
            background: {
                color: $bog_builderui_tokens.card,
            },
            color: $bog_builderui_tokens.text,
            border: {
                width: '1px',
                style: 'solid',
                color: $bog_builderui_tokens.line,
                radius: $bog_builderui_tokens.radius,
            },
            padding: {
                top: '0.25rem',
                right: '0.25rem',
                bottom: '0.25rem',
                left: '0.25rem',
            },
            box: {
                shadow: [{ x: 0, y: '4px', blur: '12px', spread: 0, color: '#00000026' }],
            },
            overflow: 'hidden',
            $mol_scroll: {
                background: { color: 'transparent' },
                border: { radius: $bog_builderui_tokens.radius },
            },
            $mol_button_minor: {
                border: { radius: $bog_builderui_tokens.radius },
                color: $bog_builderui_tokens.text,
                background: { color: 'transparent' },
                boxShadow: 'none',
                ':hover': {
                    background: { color: $bog_builderui_tokens.hover },
                    boxShadow: 'none',
                },
                ':focus': {
                    background: { color: 'transparent' },
                    boxShadow: 'none',
                },
                ':focus-visible': {
                    background: { color: 'transparent' },
                    boxShadow: 'none',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_settings_group) = class $raggu_web_front_settings_group extends ($.$bog_builderui_div) {
		Step(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.step())]);
			return obj;
		}
		Reindex(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({"raggu_web_front_settings_group_need_reindex": (this.reindex())});
			(obj.sub) = () => ([(this.reindex_text())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Step()), (this.Reindex())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Opts(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.opts())]);
			return obj;
		}
		Controls(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.controls()));
			return obj;
		}
		step(){
			return "";
		}
		title(){
			return "";
		}
		opts(){
			return "";
		}
		controls(){
			return [];
		}
		reindex(){
			return true;
		}
		reindex_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_group_reindex_text"));
		}
		sub(){
			return [
				(this.Head()), 
				(this.Title()), 
				(this.Opts()), 
				(this.Controls())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Step"));
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Reindex"));
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Opts"));
	($mol_mem(($.$raggu_web_front_settings_group.prototype), "Controls"));


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_settings_group, {
        flex: { direction: 'column' },
        Head: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '8px',
        },
        Step: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 700,
                size: '10px',
            },
            color: $bog_builderui_tokens.current,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
        },
        Reindex: {
            background: { color: '#fdf0e6' },
            color: '#c2691a',
            border: { radius: '4px' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '6px',
                right: '6px',
            },
            font: { size: '9px', weight: 600 },
            // Атрибут НЕ `..._reindex`: так зовётся сам под-вид Reindex, и его
            // имя уже висит на элементе. Совпади они — при reindex=false атрибут
            // удалялся бы целиком, вместе с ним переставало совпадать базовое
            // правило с display:none, и плашка вылезала голым текстом.
            display: 'none',
            '@': {
                raggu_web_front_settings_group_need_reindex: {
                    true: { display: 'flex' },
                },
            },
        },
        Title: {
            font: { weight: 600, size: '13px' },
            margin: { top: '5px' },
        },
        Opts: {
            font: { size: '11px' },
            color: $bog_builderui_tokens.shade,
            lineHeight: '1.5',
            margin: { top: '4px' },
        },
        Controls: {
            margin: { top: '8px' },
            flex: { direction: 'column' },
            gap: '8px',
        },
    });
})($ || ($ = {}));

;
	($.$bog_builderui_card) = class $bog_builderui_card extends ($.$bog_builderui_div) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_card, {
        background: {
            color: $bog_builderui_tokens.card,
        },
        color: $bog_builderui_tokens.text,
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            top: '1rem',
            bottom: '1rem',
            left: '1.25rem',
            right: '1.25rem',
        },
        box: {
            shadow: [{
                    x: 0,
                    y: '1px',
                    blur: '3px',
                    spread: 0,
                    color: '#0000001a',
                }],
        },
        gap: '0.75rem',
        flex: {
            direction: 'column',
        },
        breakInside: 'avoid',
        margin: {
            bottom: '1rem',
        },
    });
})($ || ($ = {}));

;
	($.$bog_builderui_field) = class $bog_builderui_field extends ($.$mol_string) {
		minimal_height(){
			return 36;
		}
	};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_field, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
        background: {
            color: $bog_builderui_tokens.field,
        },
        border: {
            radius: $bog_builderui_tokens.radius,
            width: '1px',
            style: 'solid',
            color: $bog_builderui_tokens.line,
        },
        padding: {
            top: '0.5rem',
            bottom: '0.5rem',
            left: '0.75rem',
            right: '0.75rem',
        },
        flex: {
            grow: 0,
            shrink: 1,
        },
        align: {
            self: 'stretch',
        },
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
    });
})($ || ($ = {}));

;
	($.$mol_gallery) = class $mol_gallery extends ($.$mol_view) {
		items(){
			return [];
		}
		side_size(id){
			return "1";
		}
		side_items(id){
			return [];
		}
		sub(){
			return (this.items());
		}
		Side(id){
			const obj = new this.$.$mol_gallery();
			(obj.style) = () => ({"flexGrow": (this.side_size(id))});
			(obj.items) = () => ((this.side_items(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_gallery.prototype), "Side"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
         */
        class $mol_gallery extends $.$mol_gallery {
            sub() {
                const items = this.items();
                if (items.length <= 3)
                    return items;
                return [
                    this.Side(0),
                    this.Side(1),
                ];
            }
            side_items(id) {
                const items = this.items();
                const middle = items.length % 2
                    ? Math.ceil(items.length / 3)
                    : items.length / 2;
                return id
                    ? items.slice(middle)
                    : items.slice(0, middle);
            }
            side_size(id) {
                return String(this.side_items(id).length);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_gallery.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_gallery.prototype, "side_items", null);
        $$.$mol_gallery = $mol_gallery;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gallery/gallery.view.css", "[mol_gallery] {\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\talign-items: stretch;\n    align-content: stretch;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart_legend) = class $mol_chart_legend extends ($.$mol_scroll) {
		graph_legends(){
			return [];
		}
		Gallery(){
			const obj = new this.$.$mol_gallery();
			(obj.items) = () => ((this.graph_legends()));
			return obj;
		}
		Graph_sample(id){
			return null;
		}
		Graph_sample_box(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample(id))]);
			return obj;
		}
		graph_title(id){
			return "";
		}
		Graph_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.graph_title(id))]);
			return obj;
		}
		graphs(){
			return [];
		}
		graphs_front(){
			return [];
		}
		sub(){
			return [(this.Gallery())];
		}
		Graph_legend(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample_box(id)), (this.Graph_title(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_chart_legend.prototype), "Gallery"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_sample_box"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_title"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_legend"));


;
	($.$mol_svg_group) = class $mol_svg_group extends ($.$mol_svg) {
		dom_name(){
			return "g";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_vector extends Array {
        get length() {
            return super.length;
        }
        constructor(...values) { super(...values); }
        map(convert, self) {
            return super.map(convert, self);
        }
        merged(patches, combine) {
            return this.map((value, index) => combine(value, patches[index]));
        }
        limited(limits) {
            return this.merged(limits, (value, [min, max]) => (value < min) ? min : (value > max) ? max : value);
        }
        added0(diff) {
            return this.map(value => value + diff);
        }
        added1(diff) {
            return this.merged(diff, (a, b) => a + b);
        }
        substracted1(diff) {
            return this.merged(diff, (a, b) => a - b);
        }
        multed0(mult) {
            return this.map(value => value * mult);
        }
        multed1(mults) {
            return this.merged(mults, (a, b) => a * b);
        }
        divided1(mults) {
            return this.merged(mults, (a, b) => a / b);
        }
        powered0(mult) {
            return this.map(value => value ** mult);
        }
        expanded1(point) {
            return this.merged(point, (range, value) => range.expanded0(value));
        }
        expanded2(point) {
            return this.merged(point, (range1, range2) => {
                let next = range1;
                const Range = range1.constructor;
                if (range1[0] > range2[0])
                    next = new Range(range2[0], next.max);
                if (range1[1] < range2[1])
                    next = new Range(next.min, range2[1]);
                return next;
            });
        }
        center() {
            const Result = this[0].constructor;
            return new Result(...this[0].map((_, i) => this.reduce((sum, point) => sum + point[i], 0) / this.length));
        }
        distance() {
            let distance = 0;
            for (let i = 1; i < this.length; ++i) {
                distance += this[i - 1].reduce((sum, min, j) => sum + (min - this[i][j]) ** 2, 0) ** (1 / this[i].length);
            }
            return distance;
        }
        transponed() {
            return this[0].map((_, i) => this.map(row => row[i]));
        }
        get x() { return this[0]; }
        set x(next) { this[0] = next; }
        get y() { return this[1]; }
        set y(next) { this[1] = next; }
        get z() { return this[2]; }
        set z(next) { this[2] = next; }
    }
    $.$mol_vector = $mol_vector;
    class $mol_vector_1d extends $mol_vector {
    }
    $.$mol_vector_1d = $mol_vector_1d;
    class $mol_vector_2d extends $mol_vector {
    }
    $.$mol_vector_2d = $mol_vector_2d;
    class $mol_vector_3d extends $mol_vector {
    }
    $.$mol_vector_3d = $mol_vector_3d;
    class $mol_vector_range extends $mol_vector {
        0;
        1;
        constructor(min, max = min) {
            super(min, max);
            this[0] = min;
            this[1] = max;
        }
        get min() { return this[0]; }
        set min(next) { this[0] = next; }
        get max() { return this[1]; }
        set max(next) { this[1] = next; }
        get inversed() {
            return new this.constructor(this.max, this.min);
        }
        expanded0(value) {
            const Range = this.constructor;
            let range = this;
            if (value > range.max)
                range = new Range(range.min, value);
            if (value < range.min)
                range = new Range(value, range.max);
            return range;
        }
    }
    $.$mol_vector_range = $mol_vector_range;
    $.$mol_vector_range_full = new $mol_vector_range(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    class $mol_vector_matrix extends $mol_vector {
        added2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 + b[index]));
        }
        multed2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 * b[index]));
        }
    }
    $.$mol_vector_matrix = $mol_vector_matrix;
})($ || ($ = {}));

;
	($.$mol_svg_title) = class $mol_svg_title extends ($.$mol_svg) {
		dom_name(){
			return "title";
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
	($.$mol_plot_graph) = class $mol_plot_graph extends ($.$mol_svg_group) {
		type(){
			return "solid";
		}
		color(){
			return "";
		}
		viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		gap_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		title(){
			return "";
		}
		hint(){
			return (this.title());
		}
		series_x(){
			return [];
		}
		series_y(){
			return [];
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
		viewport(){
			const obj = new this.$.$mol_vector_2d((this.viewport_x()), (this.viewport_y()));
			return obj;
		}
		shift(){
			return [0, 0];
		}
		scale(){
			return [1, 1];
		}
		cursor_position(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		dimensions_pane(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_pane_x()), (this.dimensions_pane_y()));
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		repos_x(id){
			return 0;
		}
		repos_y(id){
			return 0;
		}
		indexes(){
			return [];
		}
		points(){
			return [];
		}
		front(){
			return [];
		}
		back(){
			return [];
		}
		Hint(){
			const obj = new this.$.$mol_svg_title();
			(obj.title) = () => ((this.hint()));
			return obj;
		}
		hue(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Sample(){
			return null;
		}
	};
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport"));
	($mol_mem(($.$mol_plot_graph.prototype), "cursor_position"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_graph.prototype), "size_real"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap"));
	($mol_mem(($.$mol_plot_graph.prototype), "Hint"));
	($mol_mem(($.$mol_plot_graph.prototype), "hue"));
	($.$mol_plot_graph_sample) = class $mol_plot_graph_sample extends ($.$mol_view) {
		type(){
			return "solid";
		}
		color(){
			return "black";
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_graph extends $.$mol_plot_graph {
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            indexes() {
                return this.series_x().map((_, i) => i);
            }
            repos_x(val) {
                return val;
            }
            repos_y(val) {
                return val;
            }
            points() {
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const series_x = this.series_x();
                const series_y = this.series_y();
                return this.indexes().map(index => {
                    let point_x = Math.round(shift_x + this.repos_x(series_x[index]) * scale_x);
                    let point_y = Math.round(shift_y + this.repos_y(series_y[index]) * scale_y);
                    point_x = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_x, Number.MAX_SAFE_INTEGER));
                    point_y = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_y, Number.MAX_SAFE_INTEGER));
                    return [point_x, point_y];
                });
            }
            series_x() {
                return this.series_y().map((val, index) => index);
            }
            dimensions() {
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    if (series_x[i] > next.x.max)
                        next.x.max = this.repos_x(series_x[i]);
                    if (series_x[i] < next.x.min)
                        next.x.min = this.repos_x(series_x[i]);
                    if (series_y[i] > next.y.max)
                        next.y.max = this.repos_y(series_y[i]);
                    if (series_y[i] < next.y.min)
                        next.y.min = this.repos_y(series_y[i]);
                }
                return next;
            }
            color() {
                const hue = this.hue();
                return hue ? `hsl( ${hue} , 100% , 35% )` : '';
            }
            front() {
                return [this];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "indexes", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "series_x", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "dimensions", null);
        $$.$mol_plot_graph = $mol_plot_graph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/graph/graph.view.css", "[mol_plot_graph] {\n\tstroke: currentColor;\n}\n\n[mol_plot_graph_sample] {\n\tborder-width: 0;\n\tborder-style: solid;\n}\n\n[mol_plot_graph_type=\"dashed\"] {\n\tstroke-dasharray: 4 4;\n\tborder-style: dashed;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_legend extends $.$mol_chart_legend {
            graphs_front() {
                return this.graphs().filter(graph => graph.Sample());
            }
            graph_legends() {
                return this.graphs_front().map((graph, index) => this.Graph_legend(index));
            }
            graph_title(index) {
                return this.graphs_front()[index].title();
            }
            Graph_sample(index) {
                return this.graphs_front()[index].Sample();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chart_legend.prototype, "graphs_front", null);
        $$.$mol_chart_legend = $mol_chart_legend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/legend/legend.view.css", "[mol_chart_legend] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex-direction: row;\n\tflex: 0 1 auto;\n}\n\n[mol_chart_legend_graph_legend] {\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tflex: 1 1 8rem;\n\tpadding: .5rem;\n}\n\n[mol_chart_legend_graph_title] {\n\tmargin: 0 .25rem;\n\tflex: 1 1 auto;\n}\n\n[mol_chart_legend_graph_sample_box] {\n\tposition: relative;\n\twidth: 1.5rem;\n\tflex: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_touch) = class $mol_touch extends ($.$mol_plugin) {
		event_start(next){
			if(next !== undefined) return next;
			return null;
		}
		event_move(next){
			if(next !== undefined) return next;
			return null;
		}
		event_end(next){
			if(next !== undefined) return next;
			return null;
		}
		event_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		event_wheel(next){
			if(next !== undefined) return next;
			return null;
		}
		start_zoom(next){
			if(next !== undefined) return next;
			return 0;
		}
		start_distance(next){
			if(next !== undefined) return next;
			return 0;
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(next){
			if(next !== undefined) return next;
			return "";
		}
		action_point(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pan(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		pan(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		pointer_center(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pos(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_precision(){
			return 16;
		}
		swipe_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_top(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		style(){
			return {
				...(super.style()), 
				"touch-action": "none", 
				"overscroll-behavior": "none"
			};
		}
		event(){
			return {
				...(super.event()), 
				"pointerdown": (next) => (this.event_start(next)), 
				"pointermove": (next) => (this.event_move(next)), 
				"pointerup": (next) => (this.event_end(next)), 
				"pointerleave": (next) => (this.event_leave(next)), 
				"wheel": (next) => (this.event_wheel(next))
			};
		}
	};
	($mol_mem(($.$mol_touch.prototype), "event_start"));
	($mol_mem(($.$mol_touch.prototype), "event_move"));
	($mol_mem(($.$mol_touch.prototype), "event_end"));
	($mol_mem(($.$mol_touch.prototype), "event_leave"));
	($mol_mem(($.$mol_touch.prototype), "event_wheel"));
	($mol_mem(($.$mol_touch.prototype), "start_zoom"));
	($mol_mem(($.$mol_touch.prototype), "start_distance"));
	($mol_mem(($.$mol_touch.prototype), "zoom"));
	($mol_mem(($.$mol_touch.prototype), "action_type"));
	($mol_mem(($.$mol_touch.prototype), "action_point"));
	($mol_mem(($.$mol_touch.prototype), "start_pan"));
	($mol_mem(($.$mol_touch.prototype), "pan"));
	($mol_mem(($.$mol_touch.prototype), "pointer_center"));
	($mol_mem(($.$mol_touch.prototype), "start_pos"));
	($mol_mem(($.$mol_touch.prototype), "swipe_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_top"));
	($mol_mem(($.$mol_touch.prototype), "draw_start"));
	($mol_mem(($.$mol_touch.prototype), "draw"));
	($mol_mem(($.$mol_touch.prototype), "draw_end"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin for touch gestures.
         * @see [mol_plugin](../plugin/readme.md)
         */
        class $mol_touch extends $.$mol_touch {
            auto() {
                this.pointer_events();
                this.start_pan();
                this.start_pos();
                this.start_distance();
                this.start_zoom();
                this.action_type();
                this.view_rect();
            }
            pointer_events(next = []) {
                return next;
            }
            pointer_coords() {
                const events = this.pointer_events();
                const touches = events.filter(e => e.pointerType === 'touch');
                const pens = events.filter(e => e.pointerType === 'pen');
                const mouses = events.filter(e => !e.pointerType || e.pointerType === 'mouse');
                const choosen = touches.length ? touches : pens.length ? pens : mouses;
                return new $mol_vector(...choosen.map(event => this.event_coords(event)));
            }
            pointer_center() {
                const coords = this.pointer_coords();
                return coords.length ? coords.center() : new $mol_vector_2d(NaN, NaN);
            }
            event_coords(event) {
                const { left, top } = this.view_rect();
                return new $mol_vector_2d(Math.round(event.pageX - left), Math.round(event.pageY - top));
            }
            action_point() {
                const coord = this.pointer_center();
                if (!coord)
                    return null;
                const zoom = this.zoom();
                const pan = this.pan();
                return new $mol_vector_2d((coord.x - pan.x) / zoom, (coord.y - pan.y) / zoom);
            }
            event_eat(event) {
                if (event instanceof PointerEvent) {
                    const events = this.pointer_events()
                        .filter(e => e instanceof PointerEvent)
                        .filter(e => e.pointerId !== event.pointerId);
                    if (event.type !== 'pointerup' && event.type !== 'pointerleave')
                        events.push(event);
                    this.pointer_events(events);
                    const touch_count = events.filter(e => e.pointerType === 'touch').length;
                    if (this.allow_zoom() && touch_count === 2) {
                        return this.action_type('zoom');
                    }
                    if (this.action_type() === 'zoom' && touch_count === 1) {
                        return this.action_type('zoom');
                    }
                    let button;
                    (function (button) {
                        button[button["left"] = 1] = "left";
                        button[button["right"] = 2] = "right";
                        button[button["middle"] = 4] = "middle";
                    })(button || (button = {}));
                    if (events.length > 0) {
                        if (event.ctrlKey && this.allow_zoom())
                            return this.action_type('zoom');
                        if (event.buttons === button.left && this.allow_draw())
                            return this.action_type('draw');
                        if (event.buttons && this.allow_pan())
                            return this.action_type('pan');
                    }
                    return this.action_type('');
                }
                if (event instanceof WheelEvent) {
                    this.pointer_events([event]);
                    if (event.shiftKey)
                        return this.action_type('pan');
                    return this.action_type('zoom');
                }
                return this.action_type('');
            }
            event_start(event) {
                if (event.defaultPrevented)
                    return;
                this.start_pan(this.pan());
                const action_type = this.event_eat(event);
                if (!action_type)
                    return;
                const coords = this.pointer_coords();
                this.start_pos(coords.center());
                if (action_type === 'draw') {
                    this.draw_start(event);
                    return;
                }
                this.start_distance(coords.distance());
                this.start_zoom(this.zoom());
            }
            event_move(event) {
                if (event.defaultPrevented)
                    return;
                const rect = this.view_rect();
                if (!rect)
                    return;
                const start_pan = this.start_pan();
                const action_type = this.event_eat(event);
                const start_pos = this.start_pos();
                let pos = this.pointer_center();
                if (!action_type)
                    return;
                if (!start_pos)
                    return;
                if (action_type === 'draw') {
                    const distance = new $mol_vector(start_pos, pos).distance();
                    if (distance >= 4) {
                        this.draw(event);
                    }
                    return;
                }
                if (action_type === 'pan') {
                    this.dom_node().setPointerCapture(event.pointerId);
                    this.pan(new $mol_vector_2d(start_pan[0] + pos[0] - start_pos[0], start_pan[1] + pos[1] - start_pos[1]));
                }
                const precision = this.swipe_precision();
                if ((this.swipe_right !== $mol_touch.prototype.swipe_right
                    || this.swipe_from_left !== $mol_touch.prototype.swipe_from_left
                    || this.swipe_to_right !== $mol_touch.prototype.swipe_to_right)
                    && pos[0] - start_pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_right(event);
                }
                if ((this.swipe_left !== $mol_touch.prototype.swipe_left
                    || this.swipe_from_right !== $mol_touch.prototype.swipe_from_right
                    || this.swipe_to_left !== $mol_touch.prototype.swipe_to_left)
                    && start_pos[0] - pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_left(event);
                }
                if ((this.swipe_bottom !== $mol_touch.prototype.swipe_bottom
                    || this.swipe_from_top !== $mol_touch.prototype.swipe_from_top
                    || this.swipe_to_bottom !== $mol_touch.prototype.swipe_to_bottom)
                    && pos[1] - start_pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_bottom(event);
                }
                if ((this.swipe_top !== $mol_touch.prototype.swipe_top
                    || this.swipe_from_bottom !== $mol_touch.prototype.swipe_from_bottom
                    || this.swipe_to_top !== $mol_touch.prototype.swipe_to_top)
                    && start_pos[1] - pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_top(event);
                }
                if (action_type === 'zoom') {
                    const coords = this.pointer_coords();
                    const distance = coords.distance();
                    const start_distance = this.start_distance();
                    const center = coords.center();
                    const start_zoom = this.start_zoom();
                    let mult = Math.abs(distance - start_distance) < 32 ? 1 : distance / start_distance;
                    this.zoom(start_zoom * mult);
                    const pan = new $mol_vector_2d((start_pan[0] - center[0] + pos[0] - start_pos[0]) * mult + center[0], (start_pan[1] - center[1] + pos[1] - start_pos[1]) * mult + center[1]);
                    this.pan(pan);
                }
            }
            event_end(event) {
                const action = this.action_type();
                if (action === 'draw') {
                    this.draw_end(event);
                }
                this.event_leave(event);
            }
            event_leave(event) {
                this.event_eat(event);
                this.dom_node().releasePointerCapture(event.pointerId);
                this.start_pos(null);
            }
            swipe_left(event) {
                if (this.view_rect().right - this.start_pos()[0] < this.swipe_precision() * 2)
                    this.swipe_from_right(event);
                else
                    this.swipe_to_left(event);
                this.event_end(event);
            }
            swipe_right(event) {
                if (this.start_pos()[0] - this.view_rect().left < this.swipe_precision() * 2)
                    this.swipe_from_left(event);
                else
                    this.swipe_to_right(event);
                this.event_end(event);
            }
            swipe_top(event) {
                if (this.view_rect().bottom - this.start_pos()[1] < this.swipe_precision() * 2)
                    this.swipe_from_bottom(event);
                else
                    this.swipe_to_top(event);
                this.event_end(event);
            }
            swipe_bottom(event) {
                if (this.start_pos()[1] - this.view_rect().top < this.swipe_precision() * 2)
                    this.swipe_from_top(event);
                else
                    this.swipe_to_bottom(event);
                this.event_end(event);
            }
            event_wheel(event) {
                if (event.defaultPrevented)
                    return;
                if (this.pan === $mol_touch.prototype.pan && this.zoom === $mol_touch.prototype.zoom)
                    return;
                if (this.pan !== $mol_touch.prototype.pan) {
                    event.preventDefault();
                }
                const action_type = this.event_eat(event);
                if (action_type === 'zoom') {
                    const zoom_prev = this.zoom() || 0.001;
                    let zoom_next = zoom_prev * (1 - .001 * Math.min(event.deltaY, 100));
                    zoom_next = this.zoom(zoom_next);
                    const mult = zoom_next / zoom_prev;
                    const pan_prev = this.pan();
                    const center = this.pointer_center();
                    const pan_next = pan_prev.multed0(mult).added1(center.multed0(1 - mult));
                    this.pan(pan_next);
                }
                if (action_type === 'pan') {
                    const pan_prev = this.pan();
                    const pan_next = new $mol_vector_2d(pan_prev.x - event.deltaX, pan_prev.y - event.deltaY);
                    this.pan(pan_next);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_events", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_coords", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_center", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "action_point", null);
        $$.$mol_touch = $mol_touch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_plot_pane) = class $mol_plot_pane extends ($.$mol_svg_root) {
		gap_x(){
			const obj = new this.$.$mol_vector_range((this.gap_left()), (this.gap_right()));
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range((this.gap_bottom()), (this.gap_top()));
			return obj;
		}
		shift_limit_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		shift_limit_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		scale_limit_x(){
			const obj = new this.$.$mol_vector_range(0, Infinity);
			return obj;
		}
		scale_limit_y(){
			const obj = new this.$.$mol_vector_range(0, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		graphs_sorted(){
			return [];
		}
		graphs(){
			return [];
		}
		graphs_positioned(){
			return (this.graphs());
		}
		graphs_visible(){
			return (this.graphs_positioned());
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		cursor_position(){
			return (this.Touch().pointer_center());
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(){
			return (this.Touch().action_type());
		}
		action_point(){
			return (this.Touch().action_point());
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		Touch(){
			const obj = new this.$.$mol_touch();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.pan) = (next) => ((this.shift(next)));
			(obj.allow_draw) = () => ((this.allow_draw()));
			(obj.allow_pan) = () => ((this.allow_pan()));
			(obj.allow_zoom) = () => ((this.allow_zoom()));
			(obj.draw_start) = (next) => ((this.draw_start(next)));
			(obj.draw) = (next) => ((this.draw(next)));
			(obj.draw_end) = (next) => ((this.draw_end(next)));
			return obj;
		}
		aspect(){
			return "none";
		}
		hue_base(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		hue_shift(next){
			if(next !== undefined) return next;
			return 111;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_top(){
			return (this.gap_vert());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		shift_limit(){
			const obj = new this.$.$mol_vector_2d((this.shift_limit_x()), (this.shift_limit_y()));
			return obj;
		}
		shift_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		shift(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale_limit(){
			const obj = new this.$.$mol_vector_2d((this.scale_limit_x()), (this.scale_limit_y()));
			return obj;
		}
		scale_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(1, -1);
			return obj;
		}
		scale_x(next){
			if(next !== undefined) return next;
			return 1;
		}
		scale_y(next){
			if(next !== undefined) return next;
			return -1;
		}
		size(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(1, 1);
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		dimensions_viewport(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_viewport_x()), (this.dimensions_viewport_y()));
			return obj;
		}
		sub(){
			return (this.graphs_sorted());
		}
		graphs_colored(){
			return (this.graphs_visible());
		}
		plugins(){
			return [...(super.plugins()), (this.Touch())];
		}
	};
	($mol_mem(($.$mol_plot_pane.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "zoom"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_start"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_end"));
	($mol_mem(($.$mol_plot_pane.prototype), "Touch"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_base"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "size"));
	($mol_mem(($.$mol_plot_pane.prototype), "size_real"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Fastest plot lib for vector graphics.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
         */
        class $mol_plot_pane extends $.$mol_plot_pane {
            dimensions() {
                const graphs = this.graphs();
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                for (let graph of graphs) {
                    next = next.expanded2(graph.dimensions());
                }
                return next;
            }
            size() {
                const dims = this.dimensions();
                return new this.$.$mol_vector_2d((dims.x.max - dims.x.min) || 1, (dims.y.max - dims.y.min) || 1);
            }
            graph_hue(index) {
                return (360 + (this.hue_base() + this.hue_shift() * index) % 360) % 360;
            }
            graphs_colored() {
                const graphs = this.graphs_visible();
                for (let index = 0; index < graphs.length; index++) {
                    graphs[index].hue(this.graph_hue(index));
                }
                return graphs;
            }
            size_real() {
                const rect = this.view_rect();
                if (!rect)
                    return new this.$.$mol_vector_2d(1, 1);
                return new this.$.$mol_vector_2d(rect.width, rect.height);
            }
            view_box() {
                const size = this.size_real();
                return `0 0 ${size.x} ${size.y}`;
            }
            scale_limit() {
                const { x: { max: right }, y: { max: top } } = super.scale_limit();
                const gap = this.gap();
                const size = this.size();
                const real = this.size_real();
                const left = +(real.x - gap.x.min - gap.x.max) / size.x;
                const bottom = -(real.y - gap.y.max - gap.y.min) / size.y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(left, right), new this.$.$mol_vector_range(top, bottom));
            }
            scale_default() {
                const limits = this.scale_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.max);
            }
            scale(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.scale_default();
                    next = $mol_mem_cached(() => this.scale()) ?? this.scale_default();
                }
                this.graph_touched = true;
                return next.limited(this.scale_limit());
            }
            scale_x(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(next, this.scale().y)).x;
            }
            scale_y(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(this.scale().x, next)).y;
            }
            shift_limit() {
                const dims = this.dimensions();
                const [scale_x, scale_y] = this.scale();
                const size = this.size_real();
                const gap = this.gap();
                const left = gap.x.min - dims.x.min * scale_x;
                const right = size.x - gap.x.max - dims.x.max * scale_x;
                const top = gap.y.max - dims.y.max * scale_y;
                const bottom = size.y - gap.y.min - dims.y.min * scale_y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(right, left), new this.$.$mol_vector_range(bottom, top));
            }
            shift_default() {
                const limits = this.shift_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.min);
            }
            graph_touched = false;
            shift(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.shift_default();
                    next = $mol_mem_cached(() => this.shift()) ?? this.shift_default();
                }
                this.graph_touched = true;
                return next.limited(this.shift_limit());
            }
            reset(event) {
                this.graph_touched = false;
                this.scale(this.scale_default());
                this.shift(this.shift_default());
            }
            graphs_visible() {
                const viewport = this.dimensions_viewport();
                const size_real = this.size_real();
                const max_x = (viewport.x.max - viewport.x.min) / size_real.x;
                const max_y = (viewport.y.max - viewport.y.min) / size_real.y;
                return this.graphs_positioned().filter(graph => {
                    const dims = graph.dimensions();
                    if (dims.x.min > dims.x.max)
                        return true;
                    if (dims.y.min > dims.y.max)
                        return true;
                    const size_x = dims.x.max - dims.x.min;
                    const size_y = dims.y.max - dims.y.min;
                    if ((size_x || size_y) && size_x < max_x && size_y < max_y)
                        return false;
                    if (dims.x.min > viewport.x.max)
                        return false;
                    if (dims.x.max < viewport.x.min)
                        return false;
                    if (dims.y.min > viewport.y.max)
                        return false;
                    if (dims.y.max < viewport.y.min)
                        return false;
                    return true;
                });
            }
            graphs_positioned() {
                const graphs = this.graphs();
                for (let graph of graphs) {
                    graph.shift = () => this.shift();
                    graph.scale = () => this.scale();
                    graph.dimensions_pane = () => this.dimensions_viewport();
                    graph.viewport = () => this.viewport();
                    graph.size_real = () => this.size_real();
                    graph.cursor_position = () => this.cursor_position();
                    graph.gap = () => this.gap();
                }
                return graphs;
            }
            dimensions_viewport() {
                const shift = this.shift().multed0(-1);
                const scale = this.scale().powered0(-1);
                return this.viewport().map((range, i) => range.added0(shift[i]).multed0(scale[i]).sort((a, b) => a - b));
            }
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            graphs_sorted() {
                const graphs = this.graphs_colored();
                const sorted = [];
                for (let graph of graphs)
                    sorted.push(...graph.back());
                for (let graph of graphs)
                    sorted.push(...graph.front());
                return sorted;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "size", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_colored", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_default", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_visible", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_positioned", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions_viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_sorted", null);
        $$.$mol_plot_pane = $mol_plot_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/pane/pane.view.css", "[mol_plot_pane] {\n\tcolor: var(--mol_theme_control);\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tstroke-width: 2px;\n\tuser-select: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart) = class $mol_chart extends ($.$mol_view) {
		Legend(){
			const obj = new this.$.$mol_chart_legend();
			(obj.graphs) = () => ((this.graphs_colored()));
			return obj;
		}
		zoom(next){
			return (this.Plot().scale_x(next));
		}
		graphs_colored(){
			return (this.Plot().graphs_colored());
		}
		hue_base(){
			return 210;
		}
		hue_shift(){
			return 163;
		}
		Plot(){
			const obj = new this.$.$mol_plot_pane();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.gap_left) = () => ((this.gap_left()));
			(obj.gap_right) = () => ((this.gap_right()));
			(obj.gap_bottom) = () => ((this.gap_bottom()));
			(obj.gap_top) = () => ((this.gap_top()));
			(obj.graphs) = () => ((this.graphs()));
			(obj.hue_base) = () => ((this.hue_base()));
			(obj.hue_shift) = () => ((this.hue_shift()));
			return obj;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap_top(){
			return (this.gap_vert());
		}
		graphs(){
			return [];
		}
		sub(){
			return [(this.Legend()), (this.Plot())];
		}
	};
	($mol_mem(($.$mol_chart.prototype), "Legend"));
	($mol_mem(($.$mol_chart.prototype), "Plot"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/chart.view.css", "[mol_chart] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-self: stretch;\n\tflex: 1 1 auto;\n\tmin-height: 0;\n}\n\n[mol_chart_plot] {\n\tflex: 1 0 50%;\n\tmargin: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$bog_builderui_chart) = class $bog_builderui_chart extends ($.$mol_chart) {};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_chart, {
        font: {
            family: $bog_builderui_tokens.font_body,
        },
        color: $bog_builderui_tokens.text,
    });
})($ || ($ = {}));

;
	($.$mol_pop_over) = class $mol_pop_over extends ($.$mol_pop) {
		hovered(next){
			if(next !== undefined) return next;
			return false;
		}
		event_show(next){
			if(next !== undefined) return next;
			return null;
		}
		event_hide(next){
			if(next !== undefined) return next;
			return null;
		}
		showed(){
			return (this.hovered());
		}
		attr(){
			return {...(super.attr()), "tabindex": 0};
		}
		event(){
			return {
				...(super.event()), 
				"mouseenter": (next) => (this.event_show(next)), 
				"mouseleave": (next) => (this.event_hide(next))
			};
		}
	};
	($mol_mem(($.$mol_pop_over.prototype), "hovered"));
	($mol_mem(($.$mol_pop_over.prototype), "event_show"));
	($mol_mem(($.$mol_pop_over.prototype), "event_hide"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Bubble that can be shown anchored to Anchor element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_over_demo
         */
        class $mol_pop_over extends $.$mol_pop_over {
            event_show(event) {
                this.hovered(true);
            }
            event_hide(event) {
                this.hovered(false);
            }
            showed() {
                return this.focused() || this.hovered();
            }
        }
        $$.$mol_pop_over = $mol_pop_over;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/over/over.view.css", "[mol_pop_over]:focus {\r\n\toutline: none;\r\n}");
})($ || ($ = {}));

;
	($.$bog_builderui_tooltip) = class $bog_builderui_tooltip extends ($.$mol_pop_over) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("bog/builderui/theme.css", "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=EB+Garamond:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');\n\n:root {\n\t--bog_builderui_font_body: 'Inter', system-ui, sans-serif;\n\t--bog_builderui_font_head: 'Inter', system-ui, sans-serif;\n\t--bog_builderui_radius: 0.5rem;\n}\n\n/* ============================================================\n   RADIUS PRESETS\n   ============================================================ */\n[bog_builderui_radius=\"none\"] { --bog_builderui_radius: 0; }\n[bog_builderui_radius=\"small\"] { --bog_builderui_radius: 0.25rem; }\n[bog_builderui_radius=\"medium\"] { --bog_builderui_radius: 0.5rem; }\n[bog_builderui_radius=\"large\"] { --bog_builderui_radius: 1rem; }\n\n/* ============================================================\n   BODY FONT\n   ============================================================ */\n[bog_builderui_font_body=\"inter\"] { --bog_builderui_font_body: 'Inter', system-ui, sans-serif; }\n[bog_builderui_font_body=\"manrope\"] { --bog_builderui_font_body: 'Manrope', system-ui, sans-serif; }\n[bog_builderui_font_body=\"dm-sans\"] { --bog_builderui_font_body: 'DM Sans', system-ui, sans-serif; }\n[bog_builderui_font_body=\"eb-garamond\"] { --bog_builderui_font_body: 'EB Garamond', Georgia, serif; }\n\n/* ============================================================\n   HEADING FONT\n   ============================================================ */\n[bog_builderui_font_head=\"inter\"] { --bog_builderui_font_head: 'Inter', system-ui, sans-serif; }\n[bog_builderui_font_head=\"manrope\"] { --bog_builderui_font_head: 'Manrope', system-ui, sans-serif; }\n[bog_builderui_font_head=\"dm-sans\"] { --bog_builderui_font_head: 'DM Sans', system-ui, sans-serif; }\n[bog_builderui_font_head=\"eb-garamond\"] { --bog_builderui_font_head: 'EB Garamond', Georgia, serif; }\n\n/* ============================================================\n   BASE COLORS (neutral palette)\n   Vars: back, card, field, text, shade, line, hover\n   ============================================================ */\n\n/* === Slate (default) === */\n:root,\n[bog_builderui_base=\"slate\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #020817;\n\t--bog_builderui_card: #0f172a;\n\t--bog_builderui_field: #1e293b;\n\t--bog_builderui_text: #f8fafc;\n\t--bog_builderui_shade: #94a3b8;\n\t--bog_builderui_line: #1e293b;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"slate\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #f8fafc;\n\t--bog_builderui_field: #f1f5f9;\n\t--bog_builderui_text: #0f172a;\n\t--bog_builderui_shade: #64748b;\n\t--bog_builderui_line: #e2e8f0;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Stone === */\n[bog_builderui_base=\"stone\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #0c0a09;\n\t--bog_builderui_card: #1c1917;\n\t--bog_builderui_field: #292524;\n\t--bog_builderui_text: #fafaf9;\n\t--bog_builderui_shade: #a8a29e;\n\t--bog_builderui_line: #292524;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"stone\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #fafaf9;\n\t--bog_builderui_card: #ffffff;\n\t--bog_builderui_field: #f5f5f4;\n\t--bog_builderui_text: #0c0a09;\n\t--bog_builderui_shade: #78716c;\n\t--bog_builderui_line: #e7e5e4;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Zinc === */\n[bog_builderui_base=\"zinc\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #09090b;\n\t--bog_builderui_card: #18181b;\n\t--bog_builderui_field: #27272a;\n\t--bog_builderui_text: #fafafa;\n\t--bog_builderui_shade: #a1a1aa;\n\t--bog_builderui_line: #27272a;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"zinc\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #fafafa;\n\t--bog_builderui_field: #f4f4f5;\n\t--bog_builderui_text: #09090b;\n\t--bog_builderui_shade: #71717a;\n\t--bog_builderui_line: #e4e4e7;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* === Gray === */\n[bog_builderui_base=\"gray\"][bog_builderui_lights=\"dark\"] {\n\t--bog_builderui_back: #030712;\n\t--bog_builderui_card: #111827;\n\t--bog_builderui_field: #1f2937;\n\t--bog_builderui_text: #f9fafb;\n\t--bog_builderui_shade: #9ca3af;\n\t--bog_builderui_line: #1f2937;\n\t--bog_builderui_hover: #ffffff0d;\n}\n[bog_builderui_base=\"gray\"][bog_builderui_lights=\"light\"] {\n\t--bog_builderui_back: #ffffff;\n\t--bog_builderui_card: #f9fafb;\n\t--bog_builderui_field: #f3f4f6;\n\t--bog_builderui_text: #030712;\n\t--bog_builderui_shade: #6b7280;\n\t--bog_builderui_line: #e5e7eb;\n\t--bog_builderui_hover: #0000000a;\n}\n\n/* ============================================================\n   ACCENT THEMES (vars: control, focus, current, special)\n   ============================================================ */\n\n:root,\n[bog_builderui_theme=\"sky\"] {\n\t--bog_builderui_control: #0ea5e9;\n\t--bog_builderui_focus: #38bdf8;\n\t--bog_builderui_current: #06b6d4;\n\t--bog_builderui_special: #6366f1;\n}\n[bog_builderui_theme=\"rose\"] {\n\t--bog_builderui_control: #f43f5e;\n\t--bog_builderui_focus: #fb7185;\n\t--bog_builderui_current: #ec4899;\n\t--bog_builderui_special: #f97316;\n}\n[bog_builderui_theme=\"violet\"] {\n\t--bog_builderui_control: #8b5cf6;\n\t--bog_builderui_focus: #a78bfa;\n\t--bog_builderui_current: #6366f1;\n\t--bog_builderui_special: #d946ef;\n}\n[bog_builderui_theme=\"emerald\"] {\n\t--bog_builderui_control: #10b981;\n\t--bog_builderui_focus: #34d399;\n\t--bog_builderui_current: #14b8a6;\n\t--bog_builderui_special: #84cc16;\n}\n[bog_builderui_theme=\"amber\"] {\n\t--bog_builderui_control: #f59e0b;\n\t--bog_builderui_focus: #fbbf24;\n\t--bog_builderui_current: #f97316;\n\t--bog_builderui_special: #eab308;\n}\n\n/* ============================================================\n   Bridge to --mol_theme_* so stock $mol components ($mol_chart,\n   $mol_button, $mol_string) pick up our palette automatically.\n   ============================================================ */\n:where([bog_builderui_lights]) {\n\t--mol_theme_back: var(--bog_builderui_back);\n\t--mol_theme_card: var(--bog_builderui_card);\n\t--mol_theme_field: var(--bog_builderui_field);\n\t--mol_theme_hover: var(--bog_builderui_hover);\n\t--mol_theme_text: var(--bog_builderui_text);\n\t--mol_theme_shade: var(--bog_builderui_shade);\n\t--mol_theme_line: var(--bog_builderui_line);\n\t--mol_theme_focus: var(--bog_builderui_focus);\n\t--mol_theme_control: var(--bog_builderui_control);\n\t--mol_theme_current: var(--bog_builderui_current);\n\t--mol_theme_special: var(--bog_builderui_special);\n}\n\n/* ============================================================\n   CHART COLOR — independent accent for the chart bar/line\n   ============================================================ */\n:root,\n[bog_builderui_chart=\"blue\"] { --bog_builderui_chart: #3b82f6; }\n[bog_builderui_chart=\"green\"] { --bog_builderui_chart: #10b981; }\n[bog_builderui_chart=\"red\"] { --bog_builderui_chart: #ef4444; }\n[bog_builderui_chart=\"yellow\"] { --bog_builderui_chart: #eab308; }\n[bog_builderui_chart=\"purple\"] { --bog_builderui_chart: #a855f7; }\n\n/* ============================================================\n   Popover for $bog_builderui_select (style the $mol_pop bubble\n   when it sits inside our scope or carries our marker)\n   ============================================================ */\n[bog_builderui_lights] [mol_pop_bubble],\n[bog_builderui_pop] {\n\tbackground-color: var(--bog_builderui_card);\n\tborder: 1px solid var(--bog_builderui_line);\n\tborder-radius: var(--bog_builderui_radius);\n\tbox-shadow: 0 10px 30px #00000059;\n\tpadding: 0.375rem;\n\tgap: 0.125rem;\n\tmin-width: 14rem;\n\toverflow: hidden;\n}\n\n[bog_builderui_lights] [mol_select_filter] {\n\tdisplay: none;\n}\n\n[bog_builderui_lights] [mol_select_option_row] {\n\tborder-radius: calc(var(--bog_builderui_radius) - 2px);\n\tpadding: 0.5rem 0.75rem;\n\tcolor: var(--bog_builderui_text);\n\tfont-family: var(--bog_builderui_font_body);\n\tfont-size: 0.9rem;\n\tbackground-color: transparent;\n}\n\n[bog_builderui_lights] [mol_select_option_row]:hover {\n\tbackground-color: var(--bog_builderui_hover);\n}\n\n[bog_builderui_lights] [mol_select_option_label] {\n\tpadding: 0;\n\tcolor: inherit;\n}\n\n[bog_builderui_lights] [mol_select_no_options] {\n\tcolor: var(--bog_builderui_shade);\n\tpadding: 0.5rem 0.75rem;\n}\n\n[bog_builderui_lights] [bog_builderui_select] [mol_select_trigger] {\n\tgap: 0.5rem;\n\tpadding: 0 0.25rem 0 0;\n}\n[bog_builderui_lights] [bog_builderui_select] [mol_select_trigger] > * {\n\tmargin-right: 0;\n}\n\n/* ============================================================\n   Skeleton — any $mol_view in pending state gets a pulsing surface\n   ============================================================ */\n@keyframes bog_builderui_skeleton_pulse {\n\t0%, 100% { opacity: 1; }\n\t50% { opacity: 0.5; }\n}\n\n[bog_builderui_lights] [mol_view][mol_view_error=\"Promise\"],\n[bog_builderui_lights] [mol_view][mol_view_error=\"$mol_promise_blocker\"] {\n\tborder-radius: var(--bog_builderui_radius);\n\tbackground-color: var(--bog_builderui_field);\n\tcolor: transparent;\n\tanimation: bog_builderui_skeleton_pulse 1.6s ease-in-out infinite;\n}\n\n/* ============================================================\n   Tooltip surface\n   ============================================================ */\n[bog_builderui_lights] [bog_builderui_tooltip] [mol_pop_bubble] {\n\tbackground-color: var(--bog_builderui_text);\n\tcolor: var(--bog_builderui_back);\n\tborder: none;\n\tborder-radius: calc(var(--bog_builderui_radius) - 2px);\n\tpadding: 0.375rem 0.625rem;\n\tfont-family: var(--bog_builderui_font_body);\n\tfont-size: 0.8rem;\n\tbox-shadow: 0 4px 12px #0000004d;\n\tmin-width: 0;\n}\n\n");
})($ || ($ = {}));

;
	($.$raggu_web_front_settings) = class $raggu_web_front_settings extends ($.$bog_builderui_div) {
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			return obj;
		}
		header_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_header_title_text"));
		}
		Header_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_title_text())]);
			return obj;
		}
		header_sub_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_header_sub_text"));
		}
		Header_sub(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_sub_text())]);
			return obj;
		}
		Header_text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header_title()), (this.Header_sub())]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		Close_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			(obj.sub) = () => (["✕"]);
			return obj;
		}
		Header(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Header_text()), 
				(this.Spacer()), 
				(this.Close_btn())
			]);
			return obj;
		}
		use_graph_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_use_graph_label_text"));
		}
		Use_graph_label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.use_graph_label_text())]);
			return obj;
		}
		use_graph_hint_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_use_graph_hint_text"));
		}
		Use_graph_help(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({"title": (this.use_graph_hint_text())});
			(obj.sub) = () => (["?"]);
			return obj;
		}
		use_graph(next){
			if(next !== undefined) return next;
			return "on";
		}
		Use_graph(){
			const obj = new this.$.$bog_builderui_select();
			(obj.value) = (next) => ((this.use_graph(next)));
			(obj.dictionary) = () => ({"on": (this.$.$mol_locale.text("$raggu_web_front_settings_Use_graph_dictionary_on")), "off": (this.$.$mol_locale.text("$raggu_web_front_settings_Use_graph_dictionary_off"))});
			return obj;
		}
		Use_graph_row(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Use_graph_label()), 
				(this.Use_graph_help()), 
				(this.Use_graph())
			]);
			return obj;
		}
		query_plan_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_query_plan_label_text"));
		}
		Query_plan_label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.query_plan_label_text())]);
			return obj;
		}
		query_plan_hint_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_query_plan_hint_text"));
		}
		Query_plan_help(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({"title": (this.query_plan_hint_text())});
			(obj.sub) = () => (["?"]);
			return obj;
		}
		query_plan(next){
			if(next !== undefined) return next;
			return "off";
		}
		Query_plan(){
			const obj = new this.$.$bog_builderui_select();
			(obj.value) = (next) => ((this.query_plan(next)));
			(obj.dictionary) = () => ({"on": (this.$.$mol_locale.text("$raggu_web_front_settings_Query_plan_dictionary_on")), "off": (this.$.$mol_locale.text("$raggu_web_front_settings_Query_plan_dictionary_off"))});
			return obj;
		}
		Query_plan_row(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Query_plan_label()), 
				(this.Query_plan_help()), 
				(this.Query_plan())
			]);
			return obj;
		}
		Group_retrieval(){
			const obj = new this.$.$raggu_web_front_settings_group();
			(obj.step) = () => ("Поиск");
			(obj.title) = () => ("Retrieval");
			(obj.opts) = () => ((this.$.$mol_locale.text("$raggu_web_front_settings_Group_retrieval_opts")));
			(obj.reindex) = () => (false);
			(obj.controls) = () => ([(this.Use_graph_row()), (this.Query_plan_row())]);
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Group_retrieval())]);
			return obj;
		}
		Panel(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header()), (this.Body())]);
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_settings_showed": (this.showed())};
		}
		sub(){
			return [(this.Backdrop()), (this.Panel())];
		}
	};
	($mol_mem(($.$raggu_web_front_settings.prototype), "close"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Backdrop"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Header_title"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Header_sub"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Header_text"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Close_btn"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Header"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Use_graph_label"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Use_graph_help"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "use_graph"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Use_graph"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Use_graph_row"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Query_plan_label"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Query_plan_help"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "query_plan"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Query_plan"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Query_plan_row"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Group_retrieval"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Panel"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "showed"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Панель настроек поиска.
         *
         * Раньше здесь жил мок движка индексации — три пресета и четырнадцать полей
         * (chunking, extraction, summarization, communities, refinement, search).
         * Он ничего не менял: значения лежали в local-state и никуда не уходили.
         * По просьбе Матвея убран целиком, остались две настройки, которые реально
         * влияют на запрос к агенту. Мок при надобности достаётся из истории git.
         */
        class $raggu_web_front_settings extends $.$raggu_web_front_settings {
            close() {
                this.showed(false);
                return null;
            }
            // ---- runtime-переключалки поиска ----
            //
            // Уезжают на бэк полями запроса к агенту, а не отдельной ручкой настроек:
            // они относятся к конкретному вопросу, и хранить их на сервере значило бы
            // разводить состояние между вкладками. Читает их app: chat_engine() и
            // chat_query_plan().
            /** Граф при поиске: 'on' → MixSearchEngine (чанки + граф), 'off' → NaiveSearchEngine (только чанки). */
            use_graph(next) {
                return this.$.$mol_state_local.value('$raggu_web_front_settings.use_graph', next ?? null) ?? 'on';
            }
            /**
             * QueryPlanEngine: декомпозиция сложного вопроса на подвопросы через DAG.
             *
             * По умолчанию ВЫКЛЮЧЕН, пока бэк с `use_query_plan` не выкачен: у него
             * extra="forbid", и старая версия отвечает 422 на весь запрос. Включённый
             * по умолчанию тумблер сломал бы чат всем сразу после деплоя фронта.
             */
            query_plan(next) {
                return this.$.$mol_state_local.value('$raggu_web_front_settings.query_plan', next ?? null) ?? 'off';
            }
        }
        __decorate([
            $mol_action
        ], $raggu_web_front_settings.prototype, "close", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_settings.prototype, "use_graph", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_settings.prototype, "query_plan", null);
        $$.$raggu_web_front_settings = $raggu_web_front_settings;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_settings, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'none',
        zIndex: 40,
        '@': {
            raggu_web_front_settings_showed: {
                true: { display: 'flex' },
            },
        },
        Backdrop: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: { color: '#1c1b1a59' },
        },
        Panel: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '380px',
            background: { color: $bog_builderui_tokens.card },
            border: {
                left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            zIndex: 1,
            flex: { direction: 'column' },
            box: {
                shadow: [{
                        x: '-12px',
                        y: 0,
                        blur: '40px',
                        spread: 0,
                        color: '#0000001f',
                    }],
            },
        },
        Header: {
            padding: {
                top: '18px',
                bottom: '18px',
                left: '20px',
                right: '20px',
            },
            border: {
                bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            flex: { direction: 'row' },
            align: { items: 'center' },
        },
        Header_text: {
            flex: { direction: 'column' },
        },
        Header_title: {
            font: { weight: 700, size: '16px' },
        },
        Header_sub: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 500,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            margin: { top: '2px' },
        },
        Spacer: {
            flex: { grow: 1 },
        },
        Close_btn: {
            minWidth: '30px',
            maxWidth: '30px',
            height: '30px',
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            align: { items: 'center' },
            justify: { content: 'center' },
            cursor: 'pointer',
            font: { size: '15px' },
        },
        Body: {
            padding: {
                top: '18px',
                bottom: '18px',
                left: '20px',
                right: '20px',
            },
            display: 'flex',
            flex: { direction: 'column' },
            gap: '18px',
        },
        // Метка, вопросик-подсказка и переключалка — одной строкой.
        // $bog_builderui_div по умолчанию колонка, без этого «?» уезжает вниз.
        Use_graph_row: {
            flex: { direction: 'row', wrap: 'wrap' },
            align: { items: 'center' },
            gap: '8px',
        },
        Query_plan_row: {
            flex: { direction: 'row', wrap: 'wrap' },
            align: { items: 'center' },
            gap: '8px',
        },
        Use_graph_label: {
            font: { size: '12px', weight: 600 },
        },
        Query_plan_label: {
            font: { size: '12px', weight: 600 },
        },
        // Кружок с «?»: подсказка висит нативным title, всплывает по наведению.
        Use_graph_help: {
            width: '16px',
            height: '16px',
            flex: { shrink: 0 },
            align: { items: 'center' },
            justify: { content: 'center' },
            border: { radius: '50%', width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            color: $bog_builderui_tokens.shade,
            font: { size: '10px', weight: 700 },
            cursor: 'help',
        },
        Query_plan_help: {
            width: '16px',
            height: '16px',
            flex: { shrink: 0 },
            align: { items: 'center' },
            justify: { content: 'center' },
            border: { radius: '50%', width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            color: $bog_builderui_tokens.shade,
            font: { size: '10px', weight: 700 },
            cursor: 'help',
        },
        '@media': {
            '(max-width: 720px)': {
                Panel: {
                    width: '100vw',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_gallery_card_preview) = class $raggu_web_front_gallery_card_preview extends ($.$bog_builderui_div) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/gallery/card/preview/preview.view.css", "[raggu_web_front_gallery_card_preview] {\n\tbackground-image: repeating-linear-gradient(135deg, #efedea 0 9px, #e7e4e0 9px 18px);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$raggu_web_front_gallery_card) = class $raggu_web_front_gallery_card extends ($.$bog_builderui_div) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		Preview_label(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.preview_label_text())]);
			return obj;
		}
		Domain_badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.domain())]);
			return obj;
		}
		Preview(){
			const obj = new this.$.$raggu_web_front_gallery_card_preview();
			(obj.sub) = () => ([(this.Preview_label()), (this.Domain_badge())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Desc(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.desc())]);
			return obj;
		}
		tag_nodes(){
			return "";
		}
		Tag_nodes(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.tag_nodes())]);
			return obj;
		}
		tag_edges(){
			return "";
		}
		Tag_edges(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.tag_edges())]);
			return obj;
		}
		tag_comms(){
			return "";
		}
		Tag_comms(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.tag_comms())]);
			return obj;
		}
		Tags(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Tag_nodes()), 
				(this.Tag_edges()), 
				(this.Tag_comms())
			]);
			return obj;
		}
		id(){
			return "";
		}
		title(){
			return "";
		}
		domain(){
			return "";
		}
		desc(){
			return "";
		}
		nodes(){
			return "";
		}
		edges(){
			return "";
		}
		comms(){
			return "";
		}
		active(){
			return false;
		}
		preview_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_card_preview_label_text"));
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_gallery_card_active": (this.active())};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
		sub(){
			return [
				(this.Preview()), 
				(this.Title()), 
				(this.Desc()), 
				(this.Tags())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "click"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Preview_label"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Domain_badge"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Preview"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Desc"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Tag_nodes"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Tag_edges"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Tag_comms"));
	($mol_mem(($.$raggu_web_front_gallery_card.prototype), "Tags"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_gallery_card extends $.$raggu_web_front_gallery_card {
            unit(key) {
                return this.$.$mol_locale.text(`$raggu_web_front_gallery_card_unit_${key}`) || '';
            }
            tag_nodes() { return `${this.nodes()} ${this.unit('nodes')}`; }
            tag_edges() { return `${this.edges()} ${this.unit('edges')}`; }
            tag_comms() { return `${this.comms()} ${this.unit('comms')}`; }
        }
        $$.$raggu_web_front_gallery_card = $raggu_web_front_gallery_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    const tag_style = {
        font: {
            family: 'ui-monospace, monospace',
            weight: 600,
            size: '10px',
        },
        color: $bog_builderui_tokens.shade,
        background: { color: $bog_builderui_tokens.field },
        border: { radius: '5px' },
        padding: {
            top: '3px',
            bottom: '3px',
            left: '7px',
            right: '7px',
        },
    };
    $mol_style_define($raggu_web_front_gallery_card, {
        background: { color: $bog_builderui_tokens.card },
        border: { width: '2px', style: 'solid', color: $bog_builderui_tokens.line, radius: '10px' },
        padding: {
            top: '12px',
            bottom: '12px',
            left: '12px',
            right: '12px',
        },
        flex: { direction: 'column' },
        cursor: 'pointer',
        '@': {
            raggu_web_front_gallery_card_active: {
                true: {
                    border: { color: $bog_builderui_tokens.current },
                    background: { color: $bog_builderui_tokens.field },
                },
            },
        },
        Preview: {
            height: '118px',
            border: { radius: '7px' },
            align: { items: 'center' },
            justify: { content: 'center' },
            position: 'relative',
        },
        Preview_label: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
        },
        Domain_badge: {
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: { color: $bog_builderui_tokens.card },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '5px' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '7px',
                right: '7px',
            },
            font: { size: '10px' },
            color: $bog_builderui_tokens.shade,
        },
        Title: {
            font: { weight: 700, size: '14px' },
            margin: { top: '11px' },
        },
        Desc: {
            font: { size: '11px' },
            color: $bog_builderui_tokens.shade,
            margin: { top: '4px' },
            lineHeight: '1.4',
        },
        Tags: {
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            gap: '6px',
            margin: { top: '10px' },
        },
        Tag_nodes: tag_style,
        Tag_edges: tag_style,
        Tag_comms: tag_style,
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_gallery) = class $raggu_web_front_gallery extends ($.$bog_builderui_div) {
		Header_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_title_text())]);
			return obj;
		}
		Header_subtitle(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_subtitle_text())]);
			return obj;
		}
		is_mock(){
			return false;
		}
		Mock_badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_gallery_mock_badge_showed": (this.is_mock())});
			(obj.sub) = () => ([(this.mock_badge_text())]);
			return obj;
		}
		Header_text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Header_title()), 
				(this.Header_subtitle()), 
				(this.Mock_badge())
			]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		Header(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header_text()), (this.Spacer())]);
			return obj;
		}
		card_id(id){
			return "";
		}
		card_title(id){
			return "";
		}
		card_domain(id){
			return "";
		}
		card_desc(id){
			return "";
		}
		card_nodes(id){
			return "";
		}
		card_edges(id){
			return "";
		}
		card_comms(id){
			return "";
		}
		card_active(id){
			return false;
		}
		click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Card(id){
			const obj = new this.$.$raggu_web_front_gallery_card();
			(obj.id) = () => ((this.card_id(id)));
			(obj.title) = () => ((this.card_title(id)));
			(obj.domain) = () => ((this.card_domain(id)));
			(obj.desc) = () => ((this.card_desc(id)));
			(obj.nodes) = () => ((this.card_nodes(id)));
			(obj.edges) = () => ((this.card_edges(id)));
			(obj.comms) = () => ((this.card_comms(id)));
			(obj.active) = () => ((this.card_active(id)));
			(obj.click) = (next) => ((this.click(id, next)));
			return obj;
		}
		rows(){
			return [(this.Card(id))];
		}
		Grid(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		dataset_id(){
			return "wiki";
		}
		select_dataset(next){
			if(next !== undefined) return next;
			return null;
		}
		datasets(){
			return [];
		}
		header_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_header_title_text"));
		}
		header_subtitle_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_header_subtitle_text"));
		}
		mock_badge_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_mock_badge_text"));
		}
		dataset_law_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_law_title"));
		}
		dataset_law_domain(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_law_domain"));
		}
		dataset_law_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_law_desc"));
		}
		dataset_wiki_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_wiki_title"));
		}
		dataset_wiki_domain(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_wiki_domain"));
		}
		dataset_wiki_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_gallery_dataset_wiki_desc"));
		}
		sub(){
			return [(this.Header()), (this.Grid())];
		}
	};
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Header_title"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Header_subtitle"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Mock_badge"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Header_text"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Header"));
	($mol_mem_key(($.$raggu_web_front_gallery.prototype), "click"));
	($mol_mem_key(($.$raggu_web_front_gallery.prototype), "Card"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "Grid"));
	($mol_mem(($.$raggu_web_front_gallery.prototype), "select_dataset"));


;
"use strict";
var $;
(function ($) {
    $.$raggu_web_front_api_ragu_health = {
        method: "GET",
        route: "/api/v1/health",
        params: undefined,
        query: undefined,
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_capabilities = {
        method: "GET",
        route: "/api/v1/capabilities",
        params: undefined,
        query: undefined,
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_list_datasets = {
        method: "GET",
        route: "/api/v1/datasets",
        params: undefined,
        query: {},
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_dataset = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}",
        params: {},
        query: {},
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_graph = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}/graph",
        params: {},
        query: {},
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_node = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}/graph/nodes/{node_id}",
        params: {},
        query: undefined,
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_node_neighbors = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}/graph/nodes/{node_id}/neighbors",
        params: {},
        query: {},
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_communities = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}/graph/communities",
        params: {},
        query: undefined,
        body: undefined,
        out: {},
    };
    $.$raggu_web_front_api_ragu_create_agent_message = {
        method: "POST",
        route: "/api/v1/datasets/{dataset_id}/agent/messages",
        params: {},
        query: undefined,
        body: {},
        out: {},
    };
    $.$raggu_web_front_api_ragu_get_agent_suggestions = {
        method: "GET",
        route: "/api/v1/datasets/{dataset_id}/agent/suggestions",
        params: {},
        query: {},
        body: undefined,
        out: {},
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Build final URL: substitute `{placeholders}` in route, append querystring. */
    function $raggu_web_front_api_url(endpoint, route, params, query) {
        let path = route;
        if (params) {
            for (const key in params) {
                path = path.replace(`{${key}}`, encodeURIComponent(String(params[key])));
            }
        }
        const qs = [];
        if (query) {
            for (const key in query) {
                const val = query[key];
                if (val === undefined || val === null)
                    continue;
                if (Array.isArray(val)) {
                    for (const item of val)
                        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
                }
                else {
                    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
                }
            }
        }
        const suffix = qs.length ? `?${qs.join('&')}` : '';
        return `${endpoint}${path}${suffix}`;
    }
    /**
     * Backend base URL — the ONE line to change when the backend is deployed.
     * No path suffix here: operation `route`s already carry `/api/v1/...`
     * from FastAPI's OpenAPI dump.
     */
    $.$raggu_web_front_api_endpoint_default = 'https://ragu-back.duckdns.org';
    /**
     * Effective endpoint: the `?api=<url>` app argument overrides the default,
     * so a freshly deployed backend can be pointed at WITHOUT a rebuild —
     * e.g. `...test.html#!api=https%3A%2F%2Fback.example.com`.
     * Reactive: reads propagate via $mol_state_arg, so changing the arg refetches.
     */
    function $raggu_web_front_api_endpoint() {
        return $mol_state_arg.value('api') || $.$raggu_web_front_api_endpoint_default;
    }
    $.$raggu_web_front_api_endpoint = $raggu_web_front_api_endpoint;
    /**
     * Локаль для бэкенда: RAGU принимает только `ru` | `en`, а $mol_locale.lang()
     * отдаёт что угодно из navigator.language. Всё, что не русское, считаем
     * английским — тексты view.tree по умолчанию тоже английские.
     * Реактивно: смена языка в сайдбаре перефетчивает карточки и подсказки.
     */
    function $raggu_web_front_api_locale() {
        return $mol_locale.lang() === 'ru' ? 'ru' : 'en';
    }
    $.$raggu_web_front_api_locale = $raggu_web_front_api_locale;
    /**
     * Детали ребра — симметрично get_node. На бэке ручки ПОКА НЕТ, дескриптор
     * написан руками под согласованный контракт. Когда бэк добавит её в
     * openapi.json, генератор создаст одноимённую константу в ragu.openapi.ts —
     * тогда эту удалить (билд сам напомнит конфликтом имён). Фронт до тех пор
     * фолбэчится на данные из get_graph.
     */
    $.$raggu_web_front_api_ragu_get_edge = {
        method: 'get',
        route: '/api/v1/datasets/{dataset_id}/graph/edges/{edge_id}',
        params: {},
        query: {},
        body: undefined,
        out: {},
    };
    /**
     * Typed REST client factory for OpenAPI-generated operation descriptors.
     *
     * Returns a callable that takes an operation constant plus options and
     * synchronously (via wire) returns the parsed JSON body. Any network
     * error propagates as an exception so `$mol_view` shows an error plate.
     */
    $.$raggu_web_front_api = (() => {
        const init = {
            credentials: 'omit',
            cache: 'no-cache',
        };
        return function call(op, opts = {}) {
            const url = $raggu_web_front_api_url($raggu_web_front_api_endpoint(), op.route, opts.params, opts.query);
            const req = { ...init, method: op.method };
            if (opts.body !== undefined) {
                req.headers = { ...(init.headers ?? {}), 'content-type': 'application/json' };
                req.body = JSON.stringify(opts.body);
            }
            return $mol_fetch.json(url, req);
        };
    })();
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        // Статичные моки — на них показываем схему локализации через view.tree @.
        // Реальные датасеты приходят с бэка через remote_datasets и несут dynamic-строки.
        const BUILTIN = [
            { id: 'law', nodes: '18.4k', edges: '52k', comms: '210' },
            { id: 'wiki', nodes: '2.41k', edges: '9.1k', comms: '38' },
        ];
        function format_count(n) {
            if (n >= 1000) {
                const k = n / 1000;
                return (k >= 10 ? k.toFixed(1) : k.toFixed(2)) + 'k';
            }
            return String(n);
        }
        class $raggu_web_front_gallery extends $.$raggu_web_front_gallery {
            // URL flag `?mock=1` → BUILTIN.
            mock_flag() {
                return this.$.$mol_state_arg.value('mock') === '1';
            }
            // Reactive fetch of preindexed datasets. While loading, the wire promise
            // is rethrown as usual; a real transport error falls back to BUILTIN moks
            // so the demo stays alive without the backend.
            // Локаль читается реактивно — переключение EN/RU перезапрашивает карточки
            // уже переведёнными бэком (title/domain/description).
            remote_datasets() {
                if (this.mock_flag())
                    return null;
                try {
                    const cards = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_list_datasets, { query: { locale: $raggu_web_front_api_locale() } });
                    return cards.map((c) => ({
                        id: c.id,
                        nodes: format_count(c.stats.nodes),
                        edges: format_count(c.stats.edges),
                        comms: String(c.stats.communities),
                        dynamic: { title: c.title, domain: c.domain, desc: c.description },
                    }));
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    console.warn('Datasets fetch failed, falling back to mock:', error);
                    return null;
                }
            }
            // Показываем юзеру плашку, что перед ним моки, а не данные с бэка.
            is_mock() {
                return this.remote_datasets() === null;
            }
            datasets() {
                return this.remote_datasets() ?? BUILTIN;
            }
            rows() {
                return this.datasets().map(ds => this.Card(ds.id));
            }
            dataset(id) {
                return this.datasets().find(d => d.id === id) ?? BUILTIN[0];
            }
            card_id(id) { return id; }
            card_active(id) { return id === this.dataset_id(); }
            // Бэк-датасеты кладут title/domain/desc в dynamic — рендерим напрямую.
            // Моки 'law' и 'wiki' резолвятся через @-объявленные строки view.tree.
            card_title(id) {
                const ds = this.dataset(id);
                if (ds.dynamic)
                    return ds.dynamic.title;
                if (id === 'law')
                    return this.dataset_law_title();
                if (id === 'wiki')
                    return this.dataset_wiki_title();
                return '';
            }
            card_domain(id) {
                const ds = this.dataset(id);
                if (ds.dynamic)
                    return ds.dynamic.domain;
                if (id === 'law')
                    return this.dataset_law_domain();
                if (id === 'wiki')
                    return this.dataset_wiki_domain();
                return '';
            }
            card_desc(id) {
                const ds = this.dataset(id);
                if (ds.dynamic)
                    return ds.dynamic.desc;
                if (id === 'law')
                    return this.dataset_law_desc();
                if (id === 'wiki')
                    return this.dataset_wiki_desc();
                return '';
            }
            card_nodes(id) { return this.dataset(id).nodes; }
            card_edges(id) { return this.dataset(id).edges; }
            card_comms(id) { return this.dataset(id).comms; }
            click(id) {
                this.select_dataset(id);
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_gallery.prototype, "remote_datasets", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_gallery.prototype, "click", null);
        $$.$raggu_web_front_gallery = $raggu_web_front_gallery;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_gallery, {
        flex: { direction: 'column', shrink: 1 },
        minWidth: 0,
        padding: {
            top: '1.5rem',
            bottom: '1.5rem',
            left: '1.75rem',
            right: '1.75rem',
        },
        Header: {
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            align: { items: 'flex-end' },
            gap: '0.875rem',
            margin: { bottom: '1.25rem' },
        },
        Header_text: {
            flex: { direction: 'column', grow: 1, shrink: 1 },
            minWidth: 0,
        },
        Header_title: {
            font: { weight: 700, size: '20px' },
        },
        Header_subtitle: {
            font: { size: '13px' },
            color: $bog_builderui_tokens.shade,
            margin: { top: '3px' },
        },
        Mock_badge: {
            display: 'none',
            alignSelf: 'flex-start',
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '11px',
            },
            color: '#8a6d1b',
            background: { color: '#f5c84226' },
            border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '6px' },
            padding: {
                top: '3px',
                bottom: '3px',
                left: '8px',
                right: '8px',
            },
            margin: { top: '8px' },
            '@': {
                raggu_web_front_gallery_mock_badge_showed: {
                    true: { display: 'flex' },
                },
            },
        },
        Spacer: {
            flex: { grow: 1 },
        },
        Grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            minWidth: 0,
        },
        '@media': {
            '(max-width: 720px)': {
                padding: {
                    top: '1rem',
                    bottom: '1rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$mol_svg_line) = class $mol_svg_line extends ($.$mol_svg) {
		from(){
			return [];
		}
		to(){
			return [];
		}
		from_x(){
			return "";
		}
		from_y(){
			return "";
		}
		to_x(){
			return "";
		}
		to_y(){
			return "";
		}
		dom_name(){
			return "line";
		}
		pos(){
			return [(this.from()), (this.to())];
		}
		attr(){
			return {
				...(super.attr()), 
				"x1": (this.from_x()), 
				"y1": (this.from_y()), 
				"x2": (this.to_x()), 
				"y2": (this.to_y())
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_line extends $.$mol_svg_line {
            from() {
                return this.pos()[0];
            }
            from_x() {
                return this.from()[0];
            }
            from_y() {
                return this.from()[1];
            }
            to() {
                return this.pos()[1];
            }
            to_x() {
                return this.to()[0];
            }
            to_y() {
                return this.to()[1];
            }
        }
        $$.$mol_svg_line = $mol_svg_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_text) = class $mol_svg_text extends ($.$mol_svg) {
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		align(){
			return "middle";
		}
		align_hor(){
			return (this.align());
		}
		align_vert(){
			return "baseline";
		}
		text(){
			return "";
		}
		dom_name(){
			return "text";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"x": (this.pos_x()), 
				"y": (this.pos_y()), 
				"text-anchor": (this.align_hor()), 
				"alignment-baseline": (this.align_vert())
			};
		}
		sub(){
			return [(this.text())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_text extends $.$mol_svg_text {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_text = $mol_svg_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/text/text.view.css", "[mol_svg_text] {\n\tfill: currentColor;\n\tstroke: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg_circle) = class $mol_svg_circle extends ($.$mol_svg) {
		radius(){
			return ".5%";
		}
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		dom_name(){
			return "circle";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"r": (this.radius()), 
				"cx": (this.pos_x()), 
				"cy": (this.pos_y())
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_circle extends $.$mol_svg_circle {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_circle = $mol_svg_circle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_rect) = class $mol_svg_rect extends ($.$mol_svg) {
		width(){
			return "0";
		}
		height(){
			return "0";
		}
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		dom_name(){
			return "rect";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"width": (this.width()), 
				"height": (this.height()), 
				"x": (this.pos_x()), 
				"y": (this.pos_y())
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_rect extends $.$mol_svg_rect {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_rect = $mol_svg_rect;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$raggu_web_front_explorer_forcegraph) = class $raggu_web_front_explorer_forcegraph extends ($.$mol_svg_root) {
		computed_view_box(){
			return "-300 -300 600 600";
		}
		dim_active(){
			return false;
		}
		wheel(next){
			if(next !== undefined) return next;
			return null;
		}
		pan_start(next){
			if(next !== undefined) return next;
			return null;
		}
		pan_move(next){
			if(next !== undefined) return next;
			return null;
		}
		pan_end(next){
			if(next !== undefined) return next;
			return null;
		}
		bg_click(next){
			if(next !== undefined) return next;
			return null;
		}
		edge_x1(id){
			return "";
		}
		edge_y1(id){
			return "";
		}
		edge_x2(id){
			return "";
		}
		edge_y2(id){
			return "";
		}
		edge_id(id){
			return "";
		}
		edge_color(id){
			return "#7a7672";
		}
		edge_width(id){
			return "1";
		}
		edge_opacity(id){
			return "0.55";
		}
		edge_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		edge_hover_enter(id, next){
			if(next !== undefined) return next;
			return null;
		}
		edge_hover_leave(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Edge(id){
			const obj = new this.$.$mol_svg_line();
			(obj.from_x) = () => ((this.edge_x1(id)));
			(obj.from_y) = () => ((this.edge_y1(id)));
			(obj.to_x) = () => ((this.edge_x2(id)));
			(obj.to_y) = () => ((this.edge_y2(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_line.prototype.attr.call(obj)), 
				"data-edge-id": (this.edge_id(id)), 
				"stroke": (this.edge_color(id)), 
				"stroke-width": (this.edge_width(id)), 
				"stroke-opacity": (this.edge_opacity(id)), 
				"cursor": "pointer"
			});
			(obj.event) = () => ({
				...(this.$.$mol_svg_line.prototype.event.call(obj)), 
				"click": (next) => (this.edge_click(id, next)), 
				"pointerenter": (next) => (this.edge_hover_enter(id, next)), 
				"pointerleave": (next) => (this.edge_hover_leave(id, next))
			});
			return obj;
		}
		edge_views(){
			return [(this.Edge(id))];
		}
		G_edges(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({...(this.$.$mol_svg_group.prototype.attr.call(obj)), "data-forcegraph-base": ""});
			(obj.sub) = () => ((this.edge_views()));
			return obj;
		}
		edge_label_x(id){
			return "";
		}
		edge_label_y(id){
			return "";
		}
		edge_label_text(id){
			return "";
		}
		edge_label_font_size(){
			return "8";
		}
		edge_label_opacity(id){
			return "0.75";
		}
		Edge_label(id){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.edge_label_x(id)));
			(obj.pos_y) = () => ((this.edge_label_y(id)));
			(obj.align) = () => ("middle");
			(obj.align_vert) = () => ("middle");
			(obj.text) = () => ((this.edge_label_text(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_text.prototype.attr.call(obj)), 
				"data-edge-id": (this.edge_id(id)), 
				"data-forcegraph-edge-label": "", 
				"font-size": (this.edge_label_font_size()), 
				"fill-opacity": (this.edge_label_opacity(id)), 
				"cursor": "pointer"
			});
			(obj.event) = () => ({
				...(this.$.$mol_svg_text.prototype.event.call(obj)), 
				"click": (next) => (this.edge_click(id, next)), 
				"pointerenter": (next) => (this.edge_hover_enter(id, next)), 
				"pointerleave": (next) => (this.edge_hover_leave(id, next))
			});
			return obj;
		}
		edge_label_views(){
			return [(this.Edge_label(id))];
		}
		G_edge_labels(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({...(this.$.$mol_svg_group.prototype.attr.call(obj)), "data-forcegraph-base": ""});
			(obj.sub) = () => ((this.edge_label_views()));
			return obj;
		}
		node_x(id){
			return "";
		}
		node_y(id){
			return "";
		}
		node_radius(id){
			return "6";
		}
		node_id(id){
			return "";
		}
		node_color(id){
			return "#7c6ce0";
		}
		node_opacity(id){
			return "1";
		}
		click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		hover_enter(id, next){
			if(next !== undefined) return next;
			return null;
		}
		hover_leave(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Node(id){
			const obj = new this.$.$mol_svg_circle();
			(obj.pos_x) = () => ((this.node_x(id)));
			(obj.pos_y) = () => ((this.node_y(id)));
			(obj.radius) = () => ((this.node_radius(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_circle.prototype.attr.call(obj)), 
				"data-node-id": (this.node_id(id)), 
				"fill": (this.node_color(id)), 
				"fill-opacity": (this.node_opacity(id)), 
				"cursor": "pointer"
			});
			(obj.event) = () => ({
				...(this.$.$mol_svg_circle.prototype.event.call(obj)), 
				"click": (next) => (this.click(id, next)), 
				"pointerenter": (next) => (this.hover_enter(id, next)), 
				"pointerleave": (next) => (this.hover_leave(id, next))
			});
			return obj;
		}
		node_views(){
			return [(this.Node(id))];
		}
		G_nodes(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({...(this.$.$mol_svg_group.prototype.attr.call(obj)), "data-forcegraph-base": ""});
			(obj.sub) = () => ((this.node_views()));
			return obj;
		}
		node_label_x(id){
			return "";
		}
		node_label_y(id){
			return "";
		}
		node_label_text(id){
			return "";
		}
		node_label_font_size(){
			return "10";
		}
		node_label_opacity(id){
			return "1";
		}
		Node_label(id){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.node_label_x(id)));
			(obj.pos_y) = () => ((this.node_label_y(id)));
			(obj.align) = () => ("middle");
			(obj.text) = () => ((this.node_label_text(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_text.prototype.attr.call(obj)), 
				"data-forcegraph-node-label": "", 
				"font-size": (this.node_label_font_size()), 
				"fill-opacity": (this.node_label_opacity(id))
			});
			return obj;
		}
		node_label_views(){
			return [(this.Node_label(id))];
		}
		G_node_labels(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({
				...(this.$.$mol_svg_group.prototype.attr.call(obj)), 
				"pointer-events": "none", 
				"data-forcegraph-base": ""
			});
			(obj.sub) = () => ((this.node_label_views()));
			return obj;
		}
		overlay_edge_width(id){
			return "2";
		}
		Overlay_edge(id){
			const obj = new this.$.$mol_svg_line();
			(obj.from_x) = () => ((this.edge_x1(id)));
			(obj.from_y) = () => ((this.edge_y1(id)));
			(obj.to_x) = () => ((this.edge_x2(id)));
			(obj.to_y) = () => ((this.edge_y2(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_line.prototype.attr.call(obj)), 
				"stroke-width": (this.overlay_edge_width(id)), 
				"stroke-opacity": "0.95"
			});
			return obj;
		}
		overlay_node_stroke_width(id){
			return "1.5";
		}
		Overlay_node(id){
			const obj = new this.$.$mol_svg_circle();
			(obj.pos_x) = () => ((this.node_x(id)));
			(obj.pos_y) = () => ((this.node_y(id)));
			(obj.radius) = () => ((this.node_radius(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_circle.prototype.attr.call(obj)), 
				"fill": (this.node_color(id)), 
				"stroke-width": (this.overlay_node_stroke_width(id))
			});
			return obj;
		}
		overlay_label_text(id){
			return "";
		}
		Overlay_label(id){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.node_label_x(id)));
			(obj.pos_y) = () => ((this.node_label_y(id)));
			(obj.align) = () => ("middle");
			(obj.text) = () => ((this.overlay_label_text(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_text.prototype.attr.call(obj)), 
				"data-forcegraph-node-label": "", 
				"font-size": (this.node_label_font_size())
			});
			return obj;
		}
		overlay_edge_label_text(id){
			return "";
		}
		Overlay_edge_label(id){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.edge_label_x(id)));
			(obj.pos_y) = () => ((this.edge_label_y(id)));
			(obj.align) = () => ("middle");
			(obj.align_vert) = () => ("middle");
			(obj.text) = () => ((this.overlay_edge_label_text(id)));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_text.prototype.attr.call(obj)), 
				"data-forcegraph-edge-label": "", 
				"font-size": (this.edge_label_font_size())
			});
			return obj;
		}
		overlay_views(){
			return [
				(this.Overlay_edge(id)), 
				(this.Overlay_node(id)), 
				(this.Overlay_label(id)), 
				(this.Overlay_edge_label(id))
			];
		}
		G_overlay(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({...(this.$.$mol_svg_group.prototype.attr.call(obj)), "pointer-events": "none"});
			(obj.sub) = () => ((this.overlay_views()));
			return obj;
		}
		tooltip_bg_x(){
			return "0";
		}
		tooltip_bg_y(){
			return "0";
		}
		tooltip_bg_w(){
			return "0";
		}
		tooltip_bg_h(){
			return "0";
		}
		Tooltip_bg(){
			const obj = new this.$.$mol_svg_rect();
			(obj.pos_x) = () => ((this.tooltip_bg_x()));
			(obj.pos_y) = () => ((this.tooltip_bg_y()));
			(obj.width) = () => ((this.tooltip_bg_w()));
			(obj.height) = () => ((this.tooltip_bg_h()));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_rect.prototype.attr.call(obj)), 
				"rx": "3", 
				"ry": "3", 
				"stroke-width": "1", 
				"data-forcegraph-tooltip-bg": ""
			});
			return obj;
		}
		tooltip_x(){
			return "0";
		}
		tooltip_y(){
			return "0";
		}
		tooltip_text(){
			return "";
		}
		tooltip_font_size(){
			return "11";
		}
		Tooltip_text(){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.tooltip_x()));
			(obj.pos_y) = () => ((this.tooltip_y()));
			(obj.align) = () => ("middle");
			(obj.align_vert) = () => ("middle");
			(obj.text) = () => ((this.tooltip_text()));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_text.prototype.attr.call(obj)), 
				"font-size": (this.tooltip_font_size()), 
				"font-weight": "600", 
				"data-forcegraph-tooltip-text": ""
			});
			return obj;
		}
		tooltip_sub(){
			return [(this.Tooltip_bg()), (this.Tooltip_text())];
		}
		Tooltip(){
			const obj = new this.$.$mol_svg_group();
			(obj.attr) = () => ({...(this.$.$mol_svg_group.prototype.attr.call(obj)), "pointer-events": "none"});
			(obj.sub) = () => ((this.tooltip_sub()));
			return obj;
		}
		view_box(){
			return (this.computed_view_box());
		}
		aspect(){
			return "xMidYMid meet";
		}
		select(next){
			if(next !== undefined) return next;
			return null;
		}
		selected_id(next){
			if(next !== undefined) return next;
			return "";
		}
		hovered_id(next){
			if(next !== undefined) return next;
			return "";
		}
		selected_edge_id(next){
			if(next !== undefined) return next;
			return "";
		}
		hovered_edge_id(next){
			if(next !== undefined) return next;
			return "";
		}
		drag_id(next){
			if(next !== undefined) return next;
			return "";
		}
		search(){
			return "";
		}
		filter_type(){
			return "";
		}
		filter_relation(){
			return "";
		}
		filter_comms(){
			return [];
		}
		comm_colors(){
			return {};
		}
		graph_key(){
			return "";
		}
		nodes(){
			return [];
		}
		edges(){
			return [];
		}
		pan_x(next){
			if(next !== undefined) return next;
			return +0;
		}
		pan_y(next){
			if(next !== undefined) return next;
			return +0;
		}
		zoom(next){
			if(next !== undefined) return next;
			return +1;
		}
		positions(next){
			if(next !== undefined) return next;
			return {};
		}
		gravity(){
			return +0.03;
		}
		force_scale(){
			return +0.06;
		}
		spring(){
			return +0.2;
		}
		damping(){
			return +0.82;
		}
		min_move(){
			return +0.15;
		}
		max_speed(){
			return +12;
		}
		node_size_base(){
			return +4;
		}
		node_size_growth(){
			return +1.5;
		}
		attr(){
			return {...(super.attr()), "data-forcegraph-dim": (this.dim_active())};
		}
		event(){
			return {
				...(super.event()), 
				"wheel": (next) => (this.wheel(next)), 
				"pointerdown": (next) => (this.pan_start(next)), 
				"pointermove": (next) => (this.pan_move(next)), 
				"pointerup": (next) => (this.pan_end(next)), 
				"pointercancel": (next) => (this.pan_end(next)), 
				"click": (next) => (this.bg_click(next))
			};
		}
		sub(){
			return [
				(this.G_edges()), 
				(this.G_edge_labels()), 
				(this.G_nodes()), 
				(this.G_node_labels()), 
				(this.G_overlay()), 
				(this.Tooltip())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "wheel"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "pan_start"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "pan_move"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "pan_end"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "bg_click"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "edge_click"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "edge_hover_enter"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "edge_hover_leave"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Edge"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "G_edges"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Edge_label"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "G_edge_labels"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "click"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "hover_enter"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "hover_leave"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Node"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "G_nodes"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Node_label"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "G_node_labels"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Overlay_edge"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Overlay_node"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Overlay_label"));
	($mol_mem_key(($.$raggu_web_front_explorer_forcegraph.prototype), "Overlay_edge_label"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "G_overlay"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "Tooltip_bg"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "Tooltip_text"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "Tooltip"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "select"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "selected_id"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "hovered_id"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "selected_edge_id"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "hovered_edge_id"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "drag_id"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "pan_x"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "pan_y"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "zoom"));
	($mol_mem(($.$raggu_web_front_explorer_forcegraph.prototype), "positions"));


;
"use strict";
var $;
(function ($) {
    // Distinct, theme-agnostic categorical palette. Assigned to types
    // deterministically so the same type always gets the same color.
    const $raggu_web_front_explorer_forcegraph_palette = [
        '#e0524f', '#4f8ee0', '#3fb56b', '#d97ad9', '#e0a73f',
        '#7c6ce0', '#3fb8b8', '#e07a4f', '#7ab54f', '#4f6ce0',
        '#d94f7a', '#b8873f', '#4fb8a0', '#a04fe0', '#8ea04f',
    ];
    // Fixed colors for well-known NEREL buckets — keeps the mock graph's
    // legend stable. Unknown types fall through to the hashed palette.
    const $raggu_web_front_explorer_forcegraph_known_color = {
        PERSON: '#e0524f',
        ORG: '#4f8ee0',
        LOC: '#3fb56b',
        EVENT: '#d97ad9',
        DATE: '#e0a73f',
        WORK: '#7c6ce0',
        LAW: '#3fb8b8',
    };
    /** Цвет по порядковому номеру — для сообществ: каждому свой из палитры. */
    function $raggu_web_front_explorer_forcegraph_index_color(i) {
        const palette = $raggu_web_front_explorer_forcegraph_palette;
        return palette[((i % palette.length) + palette.length) % palette.length];
    }
    $.$raggu_web_front_explorer_forcegraph_index_color = $raggu_web_front_explorer_forcegraph_index_color;
    /** Deterministic color for any entity_type string. */
    function $raggu_web_front_explorer_forcegraph_type_color(type) {
        if (!type)
            return '#8a8a8a';
        const known = $raggu_web_front_explorer_forcegraph_known_color[type];
        if (known)
            return known;
        let hash = 0;
        for (let i = 0; i < type.length; i++) {
            hash = (hash * 31 + type.charCodeAt(i)) | 0;
        }
        const palette = $raggu_web_front_explorer_forcegraph_palette;
        return palette[Math.abs(hash) % palette.length];
    }
    $.$raggu_web_front_explorer_forcegraph_type_color = $raggu_web_front_explorer_forcegraph_type_color;
    // --- Mock generator (kept exported: used by demo playground and stress-tests) ---
    const RELATIONS = [
        'MENTIONS', 'CITES', 'WORKS_AT', 'LOCATED_IN', 'INVOLVES',
        'DATED', 'AUTHORED', 'PART_OF', 'REFERS_TO', 'CONTAINS',
    ];
    const TYPES = ['PERSON', 'ORG', 'LOC', 'EVENT', 'DATE', 'WORK', 'LAW'];
    // Deterministic PRNG for stable mock graph between renders.
    function rand(seed) {
        let s = seed;
        return () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }
    function $raggu_web_front_explorer_forcegraph_build_mock(seed = 42, n_nodes = 80, n_edges = 130) {
        const r = rand(seed);
        const nodes = [];
        // Сообщества назначаем блоками по индексу (без PRNG — не сдвигает
        // последовательность и не ломает детерминированные тесты).
        const n_comms = Math.max(1, Math.min(6, Math.floor(n_nodes / 12)));
        for (let i = 0; i < n_nodes; i++) {
            const type = TYPES[Math.floor(r() * TYPES.length)];
            nodes.push({
                id: `n${i}`,
                label: `${type} ${i}`,
                type,
                degree: 0,
                x: (r() - 0.5) * 400,
                y: (r() - 0.5) * 400,
                community: `c${i % n_comms}`,
            });
        }
        const edges = [];
        const seen = new Set();
        for (let i = 0; i < n_edges; i++) {
            let a, b, key;
            do {
                a = Math.floor(r() * n_nodes);
                b = Math.floor(r() * n_nodes);
                key = a < b ? `${a}-${b}` : `${b}-${a}`;
            } while (a === b || seen.has(key));
            seen.add(key);
            edges.push({
                id: `e${i}`,
                source: `n${a}`,
                target: `n${b}`,
                strength: 0.3 + r() * 0.7,
                relation: RELATIONS[Math.floor(r() * RELATIONS.length)],
            });
            nodes[a].degree++;
            nodes[b].degree++;
        }
        return { nodes, edges };
    }
    $.$raggu_web_front_explorer_forcegraph_build_mock = $raggu_web_front_explorer_forcegraph_build_mock;
    const FORCE_K = 60;
    const THETA = 0.3; // Barnes-Hut opening angle. Smaller = more accurate, slower
    const THETA2 = THETA * THETA;
    // Один жёсткий проход разрешения коллизий: каждую пересекающуюся пару
    // раздвигаем до касания (по половине перекрытия каждому). Пары ищем через
    // spatial grid с ячейкой в максимальный диаметр — O(N × соседи), не O(N²).
    // Мутирует positions на месте; возвращает максимальный сдвиг за проход —
    // 0 означает «перекрытий не осталось».
    function $raggu_web_front_explorer_forcegraph_collide_pass(nodes, positions, radii, pinned_id, mobile) {
        // Неподвижный узел (pinned или вне mobile-подмножества) не двигаем —
        // вся поправка достаётся его подвижному соседу
        const frozen = (id) => id === pinned_id || (mobile ? !mobile.has(id) : false);
        const pad = 1.5;
        let max_r = 0;
        for (const n of nodes) {
            const r = radii[n.id] ?? 0;
            if (r > max_r)
                max_r = r;
        }
        const cell = Math.max(1, max_r * 2 + pad);
        // Числовые ключи ячеек: строковая конкатенация на десятках тысяч
        // lookup'ов за тик была главной статьёй расходов коллизий
        const grid = new Map();
        const key_of = (gx, gy) => (gx + 2048) * 65536 + (gy + 2048);
        for (const n of nodes) {
            const p = positions[n.id];
            const key = key_of(Math.floor(p.x / cell), Math.floor(p.y / cell));
            const list = grid.get(key);
            if (list)
                list.push(n.id);
            else
                grid.set(key, [n.id]);
        }
        let peak = 0;
        // Локальная симуляция: пары перебираем только вокруг подвижных узлов —
        // замороженные пары не могут разрешиться, незачем их и смотреть
        const subjects = mobile ? nodes.filter(n => mobile.has(n.id)) : nodes;
        for (const n of subjects) {
            const p = positions[n.id];
            const r1 = radii[n.id] ?? 0;
            const cx = Math.floor(p.x / cell);
            const cy = Math.floor(p.y / cell);
            for (let gx = cx - 1; gx <= cx + 1; gx++)
                for (let gy = cy - 1; gy <= cy + 1; gy++) {
                    const list = grid.get(key_of(gx, gy));
                    if (!list)
                        continue;
                    for (const other of list) {
                        if (other === n.id)
                            continue;
                        // Пару из двух подвижных встречаем дважды — считаем один раз;
                        // пара с замороженным соседом встречается лишь однажды
                        if ((!mobile || mobile.has(other)) && other <= n.id)
                            continue;
                        const a_frozen = frozen(n.id);
                        const b_frozen = frozen(other);
                        if (a_frozen && b_frozen)
                            continue;
                        const q = positions[other];
                        const min_d = r1 + (radii[other] ?? 0) + pad;
                        let dx = q.x - p.x;
                        let dy = q.y - p.y;
                        const d2 = dx * dx + dy * dy;
                        if (d2 >= min_d * min_d)
                            continue;
                        let d = Math.sqrt(d2);
                        if (d < 0.01) {
                            dx = min_d;
                            dy = 0;
                            d = min_d;
                        } // совпали — разводим по x
                        const push = (min_d - d) / d * 0.5;
                        const fx = dx * push;
                        const fy = dy * push;
                        const move = Math.sqrt(fx * fx + fy * fy);
                        if (move > peak)
                            peak = move;
                        if (a_frozen) {
                            q.x += fx * 2;
                            q.y += fy * 2;
                        }
                        else if (b_frozen) {
                            p.x -= fx * 2;
                            p.y -= fy * 2;
                        }
                        else {
                            p.x -= fx;
                            p.y -= fy;
                            q.x += fx;
                            q.y += fy;
                        }
                    }
                }
        }
        return peak;
    }
    function make_cell(x0, y0, size) {
        return { x0, y0, size, com_x: 0, com_y: 0, count: 0 };
    }
    function insert(cell, node, depth) {
        cell.com_x += node.x;
        cell.com_y += node.y;
        cell.count++;
        if (depth > 20)
            return; // guard against coincident points
        if (!cell.kids && !cell.node) {
            cell.node = node;
            return;
        }
        if (cell.node) {
            // Was a leaf — split, push old node down, then insert new
            const old = cell.node;
            cell.node = undefined;
            const h = cell.size / 2;
            cell.kids = [
                make_cell(cell.x0, cell.y0, h),
                make_cell(cell.x0 + h, cell.y0, h),
                make_cell(cell.x0, cell.y0 + h, h),
                make_cell(cell.x0 + h, cell.y0 + h, h),
            ];
            insert_child(cell, old, depth + 1);
        }
        insert_child(cell, node, depth + 1);
    }
    function insert_child(cell, node, depth) {
        const mx = cell.x0 + cell.size / 2;
        const my = cell.y0 + cell.size / 2;
        const idx = (node.x >= mx ? 1 : 0) + (node.y >= my ? 2 : 0);
        insert(cell.kids[idx], node, depth);
    }
    function accumulate_repulsion(cell, id, x, y, k2, out) {
        if (cell.count === 0)
            return;
        if (cell.node && cell.node.id === id)
            return;
        const cx = cell.com_x / cell.count;
        const cy = cell.com_y / cell.count;
        const dx = x - cx;
        const dy = y - cy;
        const d2 = dx * dx + dy * dy || 0.01;
        // Barnes-Hut criterion: if cell size² is small enough vs distance², treat as one aggregate mass
        if (!cell.kids || cell.size * cell.size < THETA2 * d2) {
            const force = (k2 * cell.count) / d2;
            out.dx += dx * force;
            out.dy += dy * force;
            return;
        }
        for (const kid of cell.kids)
            accumulate_repulsion(kid, id, x, y, k2, out);
    }
    // Hermite smoothstep — C¹ continuous ramp from 0 at `a` to 1 at `b`.
    function smoothstep(a, b, x) {
        if (x <= a)
            return 0;
        if (x >= b)
            return 1;
        const t = (x - a) / (b - a);
        return t * t * (3 - 2 * t);
    }
    /**
     * Velocity-Verlet sim tick — d3-force / ForceAtlas2 style.
     *   v[i] = ( v[i] + acceleration[i] ) * damping     ← momentum with friction
     *   p[i] += v[i] * smoothstep_gate                  ← smooth freeze at low speed
     * Repulsion via Barnes-Hut quadtree ( O(N log N) instead of naive O(N²) ).
     */
    function $raggu_web_front_explorer_forcegraph_tick_layout(nodes, edges, positions, velocities, pinned_id, params) {
        const { gravity, force_scale, damping, min_move, max_speed } = params;
        const k = FORCE_K * (params.k_scale ?? 1);
        const k2 = k * k;
        const dispX = {};
        const dispY = {};
        // Bounds for quadtree — encompass all current node positions
        let min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity;
        for (const n of nodes) {
            const p = positions[n.id];
            if (p.x < min_x)
                min_x = p.x;
            if (p.y < min_y)
                min_y = p.y;
            if (p.x > max_x)
                max_x = p.x;
            if (p.y > max_y)
                max_y = p.y;
        }
        const size = Math.max(max_x - min_x, max_y - min_y) + 1;
        const cx = (min_x + max_x) / 2;
        const cy = (min_y + max_y) / 2;
        const root = make_cell(cx - size / 2, cy - size / 2, size);
        for (const n of nodes) {
            const p = positions[n.id];
            insert(root, { id: n.id, x: p.x, y: p.y }, 0);
        }
        // Локальная симуляция: двигаем только mobile-узлы, остальные заморожены
        // (но участвуют в отталкивании и коллизиях как препятствия)
        const mobile = params.mobile ?? null;
        const is_mobile = (id) => !mobile || mobile.has(id);
        // Repulsion — Barnes-Hut walk per node (только для подвижных)
        for (const n of nodes) {
            dispX[n.id] = 0;
            dispY[n.id] = 0;
            if (!is_mobile(n.id))
                continue;
            const p = positions[n.id];
            const out = { dx: 0, dy: 0 };
            accumulate_repulsion(root, n.id, p.x, p.y, k2, out);
            dispX[n.id] = out.dx;
            dispY[n.id] = out.dy;
        }
        // Attraction — exact, O(E). Пружину ослабляют параметр spring и степень
        // хабов («dissuade hubs» из ForceAtlas2): у хаба десятки рёбер, их
        // суммарная тяга без нормализации сминает соседей в плотный ком.
        const spring = params.spring ?? 1;
        const degree = {};
        for (const n of nodes)
            degree[n.id] = n.degree;
        for (const e of edges) {
            if (mobile && !mobile.has(e.source) && !mobile.has(e.target))
                continue;
            const dx = positions[e.source].x - positions[e.target].x;
            const dy = positions[e.source].y - positions[e.target].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
            const hub_norm = Math.sqrt(Math.max(degree[e.source] ?? 0, degree[e.target] ?? 0) + 1);
            const force = (dist * dist) / k * e.strength * spring / hub_norm;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (is_mobile(e.source)) {
                dispX[e.source] -= fx;
                dispY[e.source] -= fy;
            }
            if (is_mobile(e.target)) {
                dispX[e.target] += fx;
                dispY[e.target] += fy;
            }
        }
        // Gravity — soft radial pull toward origin
        for (const n of nodes) {
            if (!is_mobile(n.id))
                continue;
            const p = positions[n.id];
            dispX[n.id] -= p.x * gravity * k;
            dispY[n.id] -= p.y * gravity * k;
        }
        // Integrate: velocities accumulate + damp; position moves via smooth freeze gate.
        const next_pos = {};
        const next_vel = {};
        for (const n of nodes) {
            if (n.id === pinned_id || !is_mobile(n.id)) {
                next_pos[n.id] = positions[n.id];
                next_vel[n.id] = { vx: 0, vy: 0 };
                continue;
            }
            const prev = velocities[n.id] || { vx: 0, vy: 0 };
            const step = force_scale * (params.heat ?? 1);
            let vx = (prev.vx + dispX[n.id] * step) * damping;
            let vy = (prev.vy + dispY[n.id] * step) * damping;
            const speed = Math.sqrt(vx * vx + vy * vy);
            // Soft speed cap: tanh saturation.
            if (speed > 0) {
                const cap_scale = max_speed * Math.tanh(speed / max_speed) / speed;
                vx *= cap_scale;
                vy *= cap_scale;
            }
            // Soft freeze gate.
            const gate = smoothstep(min_move * 0.3, min_move * 1.5, speed);
            next_pos[n.id] = { x: positions[n.id].x + vx * gate, y: positions[n.id].y + vy * gate };
            next_vel[n.id] = { vx, vy };
        }
        // Коллизии: жёстко продавливаем непересечение. Один проход раздвигает
        // пары до касания, цепочки (раздвинули пару — наехали на третьего)
        // дожимаются повторными проходами. Пружины не успевают слепить узлы
        // обратно — на экран каждый тик уходит уже разрешённое состояние.
        let collide_peak = 0;
        if (params.radii) {
            collide_peak = $raggu_web_front_explorer_forcegraph_collide_pass(nodes, next_pos, params.radii, pinned_id, mobile);
            for (let i = 0; i < 2; i++) {
                if ($raggu_web_front_explorer_forcegraph_collide_pass(nodes, next_pos, params.radii, pinned_id, mobile) < 0.05)
                    break;
            }
        }
        return { positions: next_pos, velocities: next_vel, collide_peak };
    }
    $.$raggu_web_front_explorer_forcegraph_tick_layout = $raggu_web_front_explorer_forcegraph_tick_layout;
    // Initial positions from mock coords — no synchronous FR pre-compute.
    // The view auto-starts a live sim that visibly settles the graph
    // ( Obsidian-style spring-in ).
    // Бэковые раскладки приходят в произвольном масштабе (у medical — тысячи
    // юнитов), а камера и гравитация живут в мире 600×600 вокруг нуля —
    // нормализуем: центрируем bbox в ноль и вписываем в ~520 юнитов.
    function $raggu_web_front_explorer_forcegraph_initial_positions(nodes, radii) {
        let min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity;
        for (const n of nodes) {
            if (n.x < min_x)
                min_x = n.x;
            if (n.y < min_y)
                min_y = n.y;
            if (n.x > max_x)
                max_x = n.x;
            if (n.y > max_y)
                max_y = n.y;
        }
        const cx = (min_x + max_x) / 2;
        const cy = (min_y + max_y) / 2;
        const span = Math.max(max_x - min_x, max_y - min_y);
        // Площадь мира растёт с числом узлов (span ∝ √N): иначе 5000 узлов,
        // втиснутые в те же 520 юнитов, после расталкивания коллизий дают
        // плотный круг-«упаковку» вместо разреженного графа
        const target = 520 * Math.max(1, Math.sqrt(nodes.length / 500));
        const scale = span > 1 ? target / span : 1;
        const positions = {};
        for (const n of nodes)
            positions[n.id] = { x: (n.x - cx) * scale, y: (n.y - cy) * scale };
        // Продавливаем коллизии ещё до первого кадра — граф ни на миг
        // не рисуется слипшимся.
        if (radii)
            for (let i = 0; i < 40; i++) {
                if ($raggu_web_front_explorer_forcegraph_collide_pass(nodes, positions, radii, '') < 0.05)
                    break;
            }
        return positions;
    }
    $.$raggu_web_front_explorer_forcegraph_initial_positions = $raggu_web_front_explorer_forcegraph_initial_positions;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        // Module-scoped layout cache keyed by graph_key (dataset_id). Survives
        // component remount so returning to the graph shows the settled layout
        // instantly instead of replaying the spring-in from scratch every time.
        const $raggu_web_front_explorer_forcegraph_layout_cache = new Map();
        class $raggu_web_front_explorer_forcegraph extends $.$raggu_web_front_explorer_forcegraph {
            // Typed accessors over view.tree's `nodes /` and `edges /` — parents
            // (explorer / demo) feed them via `nodes <= ...` bindings.
            nodes() {
                return super.nodes();
            }
            edges() {
                return super.edges();
            }
            // Plain non-reactive field overriding the auto-gen @$mol_mem drag_id.
            // The mem-cell version got invalidated between event-handler fibers
            // (wire_async destroys previous fiber on each event, which appears to
            // reset the subscribed cell back to its declared default '').
            // Plain field persists across calls without wire interference.
            drag_id_raw = '';
            drag_id(next) {
                if (next !== undefined)
                    this.drag_id_raw = next;
                return this.drag_id_raw;
            }
            // Размер мира: bbox стартовой раскладки (растёт с числом узлов).
            // Камера при zoom=1 вмещает его целиком независимо от размера графа.
            world_size() {
                const pos = this.initial_positions();
                let min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity;
                for (const id in pos) {
                    const p = pos[id];
                    if (p.x < min_x)
                        min_x = p.x;
                    if (p.y < min_y)
                        min_y = p.y;
                    if (p.x > max_x)
                        max_x = p.x;
                    if (p.y > max_y)
                        max_y = p.y;
                }
                const span = Math.max(max_x - min_x, max_y - min_y);
                return Number.isFinite(span) ? Math.max(600, span * 1.15) : 600;
            }
            // Экранных пикселей на svg-юнит (приблизительно, при вьюпорте ~600px) —
            // для эвристик видимости подписей
            screen_scale() {
                return this.zoom() * 600 / this.world_size();
            }
            // Pan/zoom state — fold into reactive view_box
            computed_view_box() {
                const z = Math.max(0.2, Math.min(5, this.zoom()));
                const size = this.world_size() / z;
                const x = -size / 2 + this.pan_x();
                const y = -size / 2 + this.pan_y();
                return `${x} ${y} ${size} ${size}`;
            }
            // Wheel / trackpad-pinch zoom.
            // Uses exp( -deltaY × sensitivity ) so many small deltaY events (trackpad
            // pinch) compose smoothly instead of stacking as 10% discrete jumps.
            wheel(event) {
                if (!event)
                    return;
                event.preventDefault();
                const factor = Math.exp(-event.deltaY * 0.005);
                this.zoom(this.zoom() * factor);
            }
            // Last pointer position (in client/screen pixels). Used by BOTH pan and node-drag
            // as the anchor for computing pixel-delta on each pointermove.
            dragging = false;
            last_x = 0;
            last_y = 0;
            // Total movement during the current pointer-down session, in screen pixels.
            // Below DRAG_THRESHOLD it's a click, above it's a real drag (suppresses click).
            moved_px = 0;
            // Where the pointer landed at pointerdown — for total-distance computation.
            start_x = 0;
            start_y = 0;
            // Minimum pixel distance to treat pointer interaction as drag (vs click).
            // Matches the $mol_touch convention of `>= 4`.
            DRAG_THRESHOLD = 4;
            pan_start(event) {
                if (!event)
                    return;
                const target = event.target;
                const node_id = target.getAttribute('data-node-id');
                this.last_x = event.clientX;
                this.last_y = event.clientY;
                this.start_x = event.clientX;
                this.start_y = event.clientY;
                this.moved_px = 0;
                this.just_dragged = '';
                // Capture on the EVENT TARGET (the circle for node-drag, svg for pan).
                // Pointer events keep targeting that element until release — preserves
                // click dispatch on the circle and survives cursor leaving its bounds.
                try {
                    target.setPointerCapture(event.pointerId);
                }
                catch { }
                if (node_id) {
                    this.drag_id(node_id);
                    // Локальная симуляция: на крупном графе физика двигает только
                    // таскаемый узел и его соседей — стоимость drag не зависит от
                    // размера графа. Остальные узлы — неподвижные препятствия.
                    this.drag_mobile = this.big_graph()
                        ? new Set([node_id, ...(this.adjacency()[node_id] ?? [])])
                        : null;
                    // Ensure initial positions are seeded before drag starts
                    this.ensure_positions();
                    // Don't start simulation here — wait until pan_move crosses threshold,
                    // so a pure click doesn't trigger force-sim "shaking".
                    return;
                }
                this.dragging = true;
            }
            // Returns svg-units per screen-pixel ratio for x/y. 1 if CTM missing.
            svg_scale() {
                const svg = this.dom_node();
                const ctm = svg?.getScreenCTM?.();
                if (!ctm || !ctm.a || !ctm.d)
                    return { ax: 1, ay: 1 };
                return { ax: 1 / ctm.a, ay: 1 / ctm.d };
            }
            pan_move(event) {
                if (!event)
                    return;
                const dx_px = event.clientX - this.last_x;
                const dy_px = event.clientY - this.last_y;
                if (dx_px === 0 && dy_px === 0)
                    return;
                this.last_x = event.clientX;
                this.last_y = event.clientY;
                // Track total distance from pointerdown to differentiate click from drag
                const total_dx = event.clientX - this.start_x;
                const total_dy = event.clientY - this.start_y;
                this.moved_px = Math.sqrt(total_dx * total_dx + total_dy * total_dy);
                // Below threshold while pressing on a node — treat as pending click, don't move
                if (this.drag_id() && this.moved_px < this.DRAG_THRESHOLD)
                    return;
                const { ax, ay } = this.svg_scale();
                const dx = dx_px * ax;
                const dy = dy_px * ay;
                // Node drag: shift the dragged node by pointer delta. No boundary clamp —
                // gravity in the sim brings released nodes back naturally.
                if (this.drag_id()) {
                    // Kick off continuous sim on first real drag movement (idempotent)
                    this.start_sim();
                    const id = this.drag_id();
                    const cur = this.pos(id);
                    const p = { x: cur.x + dx, y: cur.y + dy };
                    // Точечная запись — двигается один узел, а не весь словарь
                    this.positions_raw = { ...this.positions_raw, [id]: p };
                    this.node_pos(id, p);
                    return;
                }
                if (!this.dragging)
                    return;
                // Pan: opposite direction (world stays under pointer)
                this.pan_x(this.pan_x() - dx);
                this.pan_y(this.pan_y() - dy);
            }
            pan_end() {
                this.dragging = false;
                if (this.drag_id()) {
                    if (this.moved_px >= this.DRAG_THRESHOLD) {
                        this.just_dragged = this.drag_id();
                    }
                    this.drag_id('');
                }
            }
            // Convert pointer client coords → svg userspace via native CTM.
            // Handles viewBox + preserveAspectRatio + zoom/pan in one step.
            client_to_svg(event) {
                const svg = this.dom_node();
                const ctm = svg.getScreenCTM();
                if (!ctm)
                    return { x: 0, y: 0 };
                const pt = svg.createSVGPoint();
                pt.x = event.clientX;
                pt.y = event.clientY;
                const local = pt.matrixTransform(ctm.inverse());
                return { x: local.x, y: local.y };
            }
            // Lazily-computed initial FR layout — memoized so first render already shows
            // nodes settled into the circular bound, not the raw square mock coords.
            initial_positions() {
                return $raggu_web_front_explorer_forcegraph_initial_positions(this.nodes(), this.node_radii());
            }
            // Seed positions on first read, or re-seed when the node set changes
            // (e.g. dataset switched, new fetch result arrived) — old cell may still
            // hold coords for a different set of nodes.
            ensure_positions() {
                let p = this.positions();
                const nodes = this.nodes();
                if (Object.keys(p).length !== nodes.length) {
                    // После ремоунта positions-ячейка пуста — восстанавливаем осевшую
                    // раскладку из module-кэша, чтобы не переигрывать spring-in.
                    const key = this.graph_key();
                    const cached = key ? $raggu_web_front_explorer_forcegraph_layout_cache.get(key) : undefined;
                    if (cached && Object.keys(cached).length === nodes.length) {
                        p = { ...cached };
                    }
                    else {
                        p = { ...this.initial_positions() };
                    }
                    this.velocities = {};
                    this.positions(p);
                }
                return p;
            }
            // Per-node velocity — the state that makes drags ripple through edges
            // then die via damping instead of shaking the whole graph each frame.
            velocities = {};
            // Позиции живут в ДВУХ видах: плоский нереактивный словарь для физики
            // (positions_raw) и гранулярные keyed-мемы для рендера (node_pos).
            // Запись позиции одного узла инвалидирует только его координаты —
            // а не все 20k+ элементов, как это делал единый мем-объект.
            positions_raw = {};
            node_pos(id, next) {
                return next ?? null;
            }
            // Совместимость со старым интерфейсом (тесты пишут сюда целиком)
            positions(next) {
                if (next !== undefined) {
                    this.positions_raw = next;
                    for (const id in next)
                        this.node_pos(id, next[id]);
                }
                return this.positions_raw;
            }
            // Подвижное подмножество текущего drag (узел + соседи). Живёт до
            // остановки симуляции — хвост после отпускания тоже локальный.
            drag_mobile = null;
            adjacency() {
                const m = {};
                for (const e of this.edges()) {
                    (m[e.source] ??= []).push(e.target);
                    (m[e.target] ??= []).push(e.source);
                }
                return m;
            }
            // Bundle the tunable params ( declared as view.tree props with defaults ).
            layout_params() {
                return {
                    gravity: this.gravity(),
                    force_scale: this.force_scale(),
                    damping: this.damping(),
                    min_move: this.min_move(),
                    // Рыхлость как в Obsidian: слабые пружины, хабы не сжимают соседей
                    spring: this.spring(),
                    // Крупный граф двигаем медленнее — drag не разгоняет всю кучу
                    max_speed: this.max_speed() * this.size_scale(),
                    // …и с короткими пружинами, чтобы раскладка не расползалась за вьюпорт
                    k_scale: this.size_scale(),
                    // Затухание: силы гаснут со временем симуляции, дребезг умирает
                    heat: this.sim_alpha,
                    // Радиусы для расталкивания — кружки не наезжают друг на друга
                    radii: this.node_radii(),
                    // Локальная симуляция во время/после drag на крупном графе
                    mobile: this.drag_mobile,
                };
            }
            // One sim tick.
            tick() {
                const positions = this.ensure_positions();
                const next = $raggu_web_front_explorer_forcegraph_tick_layout(this.nodes(), this.edges(), positions, this.velocities, this.drag_id(), this.layout_params());
                this.velocities = next.velocities;
                // Пиковая скорость по узлам — сигнал «граф осел» для ранней остановки
                let peak = 0;
                for (const id in next.velocities) {
                    const v = next.velocities[id];
                    const speed = Math.sqrt(v.vx * v.vx + v.vy * v.vy);
                    if (speed > peak)
                        peak = speed;
                }
                this.peak_speed = peak;
                this.collide_peak = next.collide_peak;
                // Точечные записи: инвалидируем координаты только реально
                // сдвинувшихся узлов — замороженные не трогают DOM вовсе
                const prev = this.positions_raw;
                this.positions_raw = next.positions;
                for (const id in next.positions) {
                    const a = prev[id];
                    const b = next.positions[id];
                    if (!a || Math.abs(a.x - b.x) > 1e-4 || Math.abs(a.y - b.y) > 1e-4) {
                        this.node_pos(id, b);
                    }
                }
                // Кэшируем осевшую раскладку по dataset_id — переживёт ремоунт вкладки.
                const key = this.graph_key();
                if (key)
                    $raggu_web_front_explorer_forcegraph_layout_cache.set(key, next.positions);
            }
            // Continuous simulation loop driven by requestAnimationFrame.
            // Runs until frame budget exhausted AND no drag is active. While the
            // user is dragging, budget is re-armed each frame so neighbors keep
            // settling smoothly around the moved node.
            sim_running = false;
            sim_frames_left = 0;
            sim_ticks = 0;
            peak_speed = Infinity;
            collide_peak = 0;
            frame_flip = false;
            SIM_INITIAL_FRAMES = 260;
            SIM_DRAG_FRAMES = 60;
            // Alpha-cooling (как в d3-force): множитель сил, тает каждый тик.
            // Осцилляции вокруг равновесия гаснут вместе с ним — вместо дребезга
            // до конца бюджета кадров граф плавно замирает за секунду-полторы.
            sim_alpha = 1;
            ALPHA_DECAY = 0.97;
            ALPHA_MIN = 0.03;
            ALPHA_REHEAT = 0.3;
            ALPHA_DRAG = 0.5;
            // Хвост симуляции после отпускания узла — на крупном графе короче
            drag_frames() {
                return this.big_graph() ? 45 : this.SIM_DRAG_FRAMES;
            }
            start_sim(frames = this.drag_frames(), heat = this.ALPHA_REHEAT) {
                this.sim_frames_left = Math.max(this.sim_frames_left, frames);
                if (this.sim_running) {
                    this.sim_alpha = Math.max(this.sim_alpha, heat);
                    return;
                }
                if (typeof window === 'undefined')
                    return;
                this.sim_running = true;
                this.sim_ticks = 0;
                this.sim_alpha = heat;
                this.peak_speed = Infinity;
                this.collide_peak = Infinity;
                const loop = () => {
                    if (!this.sim_running)
                        return;
                    // Во время drag на крупном графе тик через кадр: DOM не успевает
                    // обновлять сотни узлов на каждый RAF, полукадровая частота
                    // оставляет бюджет самому перетаскиванию
                    this.frame_flip = !this.frame_flip;
                    if (this.big_graph() && this.drag_id() && this.frame_flip) {
                        requestAnimationFrame(loop);
                        return;
                    }
                    // Пока данные с бэка грузятся, tick кидает wire-promise. Такие
                    // кадры не считаем ни тиками, ни затуханием — иначе симуляция
                    // «остывает» и глохнет до прихода данных, оставив наезды узлов.
                    let ok = true;
                    try {
                        this.tick();
                    }
                    catch {
                        ok = false;
                    }
                    if (ok) {
                        this.sim_ticks++;
                        this.sim_alpha = Math.max(0, this.sim_alpha * this.ALPHA_DECAY);
                    }
                    if (this.drag_id()) {
                        this.sim_frames_left = Math.max(this.sim_frames_left, this.drag_frames());
                        this.sim_alpha = Math.max(this.sim_alpha, this.ALPHA_DRAG);
                    }
                    this.sim_frames_left--;
                    // Граф осел (всё ниже порога заморозки) либо остыл (alpha на нуле) —
                    // дожигать бюджет кадров незачем. Но пока коллизии заметно
                    // раздвигают узлы, не глохнем — иначе останутся перекрытия.
                    const settled = ok && this.sim_ticks > 15
                        && (this.peak_speed < this.min_move() || this.sim_alpha < this.ALPHA_MIN)
                        && this.collide_peak < 0.4;
                    if ((this.sim_frames_left <= 0 || settled) && !this.drag_id()) {
                        this.sim_running = false;
                        this.drag_mobile = null;
                        return;
                    }
                    requestAnimationFrame(loop);
                };
                requestAnimationFrame(loop);
            }
            // Reactive kick — reading every tunable param here means the mem cell
            // invalidates whenever any of them changes. dom_tree reads it below,
            // so slider tweaks (and dataset switches) restart the sim automatically.
            params_kick() {
                // Register deps on all sim inputs
                this.gravity();
                this.force_scale();
                this.spring();
                this.damping();
                this.min_move();
                this.max_speed();
                this.nodes(); // rebuild sim on new graph
                // Idempotent: re-arms frame budget; starts loop if it was stopped
                if (!this.huge_graph())
                    this.start_sim(this.drag_frames());
                return null;
            }
            // Kick off the initial spring-in exactly once, on first mount.
            initial_sim_started = false;
            dom_tree() {
                this.params_kick();
                const tree = super.dom_tree();
                if (!this.initial_sim_started) {
                    this.initial_sim_started = true;
                    // Бэковая раскладка + стартовое расталкивание уже дают картинку —
                    // на огромном графе симуляция включится только при drag.
                    if (!this.huge_graph()) {
                        // Уже раскладывали этот граф — берём осевшие позиции из кэша и
                        // гоняем лишь короткую стабилизацию вместо полного spring-in.
                        const key = this.graph_key();
                        const cached = key && $raggu_web_front_explorer_forcegraph_layout_cache.has(key);
                        this.start_sim(cached ? this.drag_frames() : this.SIM_INITIAL_FRAMES, cached ? this.ALPHA_REHEAT : 1);
                    }
                }
                return tree;
            }
            // --- крупные графы: масштаб визуала и физики от числа узлов ---
            // Плавный коэффициент 1 → 0.45: на сотнях узлов кружки, рёбра и
            // скорость движения ужимаются, иначе граф сливается в кашу.
            size_scale() {
                const n = this.nodes().length;
                return Math.max(0.45, Math.min(1, Math.sqrt(220 / Math.max(1, n))));
            }
            // Порог «крупного» графа — дальше экономим на подписях и кадрах симуляции
            big_graph() {
                return this.nodes().length > 300;
            }
            // «Огромный» граф: тик стоит ~100мс+, авто-симуляцию не гоняем вовсе —
            // физика включается только на время перетаскивания узла
            huge_graph() {
                return this.nodes().length > 2000;
            }
            // Плотность рёбер: полупрозрачные линии при наложении складываются и
            // жирнеют, поэтому чем рёбер больше, тем тоньше и бледнее фоновые.
            edge_scale() {
                const e = this.edges().length;
                return Math.max(0.35, Math.min(1, Math.sqrt(150 / Math.max(1, e))));
            }
            node_by_id() {
                const m = {};
                for (const n of this.nodes())
                    m[n.id] = n;
                return m;
            }
            node_views() {
                return this.nodes().map(n => this.Node(n.id));
            }
            edge_views() {
                return this.edges().map(e => this.Edge(e.id));
            }
            // Effective node position: live keyed cell (drag/sim output) first,
            // then the memoized initial FR layout, then raw mock as last resort.
            pos(id) {
                const live = this.node_pos(id);
                if (live)
                    return live;
                return this.initial_positions()[id] ?? this.node_by_id()[id];
            }
            // Used in view.tree as `data-node-id` attr so pan_start can identify node-target.
            node_id(id) { return id; }
            // Node accessors (keyed) — return strings, SVG attrs expect string
            node_x(id) { return String(this.pos(id).x); }
            node_y(id) { return String(this.pos(id).y); }
            // radius = base + growth * degree. Linear scale — hubs visually dominate,
            // which is what we want for a demo graph where the whole point is spotting
            // the well-connected nodes at a glance.
            // Radius scales with sqrt(degree), not degree — real graphs have hubs with
            // degree in the hundreds, and a linear scale blows them up to cover the
            // whole canvas. Capped so even a 500-degree hub stays readable.
            node_radius_num(id) {
                const n = this.node_by_id()[id];
                const s = this.size_scale();
                const r = (this.node_size_base() + this.node_size_growth() * Math.sqrt(n.degree)) * s;
                return Math.min(r, 22 * s);
            }
            node_radius(id) {
                return String(this.node_radius_num(id));
            }
            // Карта радиусов для коллизий в симуляции — в svg-юнитах, как позиции
            node_radii() {
                const m = {};
                for (const n of this.nodes())
                    m[n.id] = this.node_radius_num(n.id);
                return m;
            }
            node_color(id) {
                // При активном фильтре сообществ узлы выбранных красим в цвет сообщества
                const cs = this.comm_set();
                if (cs.size) {
                    const comm = this.node_comm(id);
                    if (cs.has(comm))
                        return this.comm_color(comm) || $raggu_web_front_explorer_forcegraph_type_color(this.node_by_id()[id].type);
                }
                return $raggu_web_front_explorer_forcegraph_type_color(this.node_by_id()[id].type);
            }
            // Фильтры подсветки: поиск по label, тип узла и/или тип связи из легенд.
            // Непустой фильтр приглушает узлы и рёбра, которые не матчатся.
            search_lc() {
                return this.search().trim().toLowerCase();
            }
            // Выбранные в выпадашке сообщества — Set для O(1) проверок
            comm_set() {
                return new Set(this.filter_comms());
            }
            node_comm(id) {
                return this.node_by_id()[id]?.community ?? '';
            }
            comm_color(id) {
                return this.comm_colors()[id] ?? '';
            }
            filter_active() {
                return Boolean(this.search_lc() || this.filter_type() || this.filter_relation() || this.comm_set().size);
            }
            node_matches(id) {
                const n = this.node_by_id()[id];
                const t = this.filter_type();
                if (t && n?.type !== t)
                    return false;
                const s = this.search_lc();
                if (s && !(n?.label ?? '').toLowerCase().includes(s))
                    return false;
                // Фильтр по типу связи подсвечивает концы матчащихся рёбер
                const r = this.filter_relation();
                if (r && !this.node_has_relation(id, r))
                    return false;
                const cs = this.comm_set();
                if (cs.size && !cs.has(n?.community ?? ''))
                    return false;
                return true;
            }
            relation_nodes() {
                const m = {};
                for (const e of this.edges()) {
                    ;
                    (m[e.relation] ??= new Set()).add(e.source);
                    m[e.relation].add(e.target);
                }
                return m;
            }
            node_has_relation(id, rel) {
                return this.relation_nodes()[rel]?.has(id) ?? false;
            }
            // Наведённое/выбранное ребро — его концы ведут себя как hovered-узлы.
            active_edge() {
                const id = this.hovered_edge_id() || this.selected_edge_id();
                return id ? this.edge_by_id()[id] ?? null : null;
            }
            edge_endpoint(id) {
                const e = this.active_edge();
                return Boolean(e && (e.source === id || e.target === id));
            }
            // Наведённый/выбранный узел + его соседи. Остальное затемняем —
            // симметрично эффекту наведения на ребро.
            active_node_hood() {
                const id = this.active_id();
                if (!id)
                    return null;
                const hood = new Set([id]);
                for (const e of this.edges()) {
                    if (e.source === id)
                        hood.add(e.target);
                    if (e.target === id)
                        hood.add(e.source);
                }
                return hood;
            }
            // Базовая непрозрачность узла зависит ТОЛЬКО от фильтров: ховер гасит
            // базовые слои одним атрибутом на группу и рисует окрестность в overlay,
            // поэтому наведение не инвалидирует тысячи элементов.
            node_opacity(id) {
                return this.node_matches(id) ? '1' : '0.12';
            }
            // Ховер срабатывает после паузы курсора (dwell): быстрое проведение
            // по графу не дёргает подсветку. Снятие — мгновенное.
            hover_timer = null;
            HOVER_DWELL_MS = 200;
            hover_after(fire) {
                clearTimeout(this.hover_timer);
                this.hover_timer = setTimeout(fire, this.HOVER_DWELL_MS);
            }
            hover_enter(id) {
                this.hover_after(() => this.hovered_id(id));
                return null;
            }
            hover_leave() {
                clearTimeout(this.hover_timer);
                this.hovered_id('');
                return null;
            }
            // Edge accessors (keyed)
            edge_by_id() {
                const m = {};
                for (const e of this.edges())
                    m[e.id] = e;
                return m;
            }
            edge_x1(id) { return String(this.pos(this.edge_by_id()[id].source).x); }
            edge_y1(id) { return String(this.pos(this.edge_by_id()[id].source).y); }
            edge_x2(id) { return String(this.pos(this.edge_by_id()[id].target).x); }
            edge_y2(id) { return String(this.pos(this.edge_by_id()[id].target).y); }
            // Used in view.tree as `data-edge-id` attr — mirrors node_id.
            edge_id(id) { return id; }
            // Edge is "active" when hovered or selected directly (not via incident node).
            edge_active(id) {
                return this.hovered_edge_id() === id || this.selected_edge_id() === id;
            }
            edge_base_width(id) {
                const e = this.edge_by_id()[id];
                return (e.strength * 1.5 + 0.4) * this.size_scale() * this.edge_scale();
            }
            edge_width(id) {
                return String(this.edge_base_width(id));
            }
            edge_matches(id) {
                const e = this.edge_by_id()[id];
                const r = this.filter_relation();
                if (r && e.relation !== r)
                    return false;
                // Сообщества: подсвечиваем только ВНУТРЕННИЕ рёбра — оба конца
                // в одном и том же выбранном сообществе
                const cs = this.comm_set();
                if (cs.size) {
                    const ca = this.node_comm(e.source);
                    if (ca !== this.node_comm(e.target) || !cs.has(ca))
                        return false;
                }
                return this.node_matches(e.source) && this.node_matches(e.target);
            }
            // База без ховер-зависимостей: только фильтры и сообщества
            edge_opacity(id) {
                if (this.filter_active() && !this.edge_matches(id))
                    return '0.08';
                // Внутренние рёбра выбранных сообществ — ярче фона
                if (this.comm_set().size && this.edge_matches(id))
                    return '0.85';
                // Фоновая яркость тает с числом рёбер — иначе серая сетка
                return String(+(0.55 * this.edge_scale()).toFixed(2));
            }
            edge_color(id) {
                const e = this.edge_by_id()[id];
                // Внутреннее ребро выбранного сообщества — в его цвет
                const cs = this.comm_set();
                if (cs.size && this.edge_matches(id)) {
                    const c = this.comm_color(this.node_comm(e.source));
                    if (c)
                        return c;
                }
                return '#7a7672';
            }
            edge_hover_enter(id) {
                this.hover_after(() => this.hovered_edge_id(id));
                return null;
            }
            edge_hover_leave() {
                clearTimeout(this.hover_timer);
                this.hovered_edge_id('');
                return null;
            }
            // Клик по ребру (линии или подписи) выбирает связь и снимает выбор узла —
            // aside показывает либо карточку сущности, либо карточку связи.
            edge_click(id) {
                if (this.moved_px >= this.DRAG_THRESHOLD)
                    return null;
                this.selected_edge_id(id);
                this.selected_id('');
                return null;
            }
            selected_edge() {
                const id = this.selected_edge_id();
                return id ? this.edge_by_id()[id] ?? null : null;
            }
            // ---- always-on labels ----
            // Пустые подписи не рендерим вовсе: на крупном графе тысячи холостых
            // <text> с пересчётом координат каждый тик — главный источник лагов.
            node_label_views() {
                return this.nodes()
                    .filter(n => this.node_label_text(n.id) !== '')
                    .map(n => this.Node_label(n.id));
            }
            edge_label_views() {
                return this.edges()
                    .filter(e => this.edge_label_text(e.id) !== '')
                    .map(e => this.Edge_label(e.id));
            }
            // Font sizes live in svg units, so they shrink on zoom-out. sqrt easing
            // (same as tooltip) keeps labels from ballooning when zoomed in close.
            node_label_font_size() {
                const s = Math.max(0.7, this.size_scale());
                return String(Math.max(4, Math.min(14, 10 * s / Math.sqrt(this.screen_scale()))));
            }
            edge_label_font_size() {
                return String(Math.max(3, Math.min(11, 8 / Math.sqrt(this.screen_scale()))));
            }
            node_label_x(id) { return String(this.pos(id).x); }
            node_label_y(id) {
                const fs = parseFloat(this.node_label_font_size());
                return String(this.pos(id).y + this.node_radius_num(id) + fs + 2);
            }
            // «Когда места хватает»: подпись растёт из видимого размера узла на экране
            // (радиус × zoom) — мелкие узлы при отдалении остаются без подписей.
            node_label_vis(id) {
                const r_px = this.node_radius_num(id) * this.screen_scale();
                // На крупном графе подписи только у заметных хабов, иначе каша;
                // приближение растит r_px — подписи проявляются по мере зума
                const min_px = this.big_graph() ? 11 : 7;
                return Math.max(0, Math.min(1, (r_px - min_px) / 3));
            }
            // База: подписи хабов по зуму и фильтрам. Подписи окрестности ховера
            // рисует overlay — база от наведения не зависит.
            node_label_text(id) {
                if (!this.node_matches(id))
                    return '';
                // Порог повыше нуля: у самого порога подпись была бы почти прозрачной
                if (this.node_label_vis(id) <= 0.3)
                    return '';
                return this.node_by_id()[id]?.label ?? '';
            }
            node_label_opacity(id) {
                // Быстрый разгон до непрозрачности — долгий fade читался как баг
                return String(Math.min(1, 0.75 + this.node_label_vis(id) * 0.25));
            }
            edge_label_mid(id) {
                const e = this.edge_by_id()[id];
                const a = this.pos(e.source);
                const b = this.pos(e.target);
                return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            }
            edge_label_x(id) { return String(this.edge_label_mid(id).x); }
            edge_label_y(id) { return String(this.edge_label_mid(id).y); }
            // Подпись влезает в свободную длину ребра (за вычетом кружков узлов)
            // и читаема на экране?
            edge_label_fits(id) {
                const e = this.edge_by_id()[id];
                const rel = e?.relation ?? '';
                if (!rel)
                    return false;
                const fs = parseFloat(this.edge_label_font_size());
                if (fs * this.screen_scale() < 4)
                    return false; // нечитаемая пыль
                const a = this.pos(e.source);
                const b = this.pos(e.target);
                const len = Math.hypot(b.x - a.x, b.y - a.y)
                    - this.node_radius_num(e.source) - this.node_radius_num(e.target);
                const need = rel.length * fs * 0.62 + fs * 2;
                return len >= need;
            }
            // База: на крупном графе фоновые подписи рёбер — серая пыль, их рисует
            // только overlay при ховере. От наведения база не зависит.
            edge_label_text(id) {
                if (this.big_graph())
                    return '';
                if (this.filter_active() && !this.edge_matches(id))
                    return '';
                return this.edge_label_fits(id) ? this.edge_by_id()[id]?.relation ?? '' : '';
            }
            edge_label_opacity(id) {
                return '0.85';
            }
            // Suppress click that fires right after node-drag (drag_id was just released)
            just_dragged = '';
            click(id) {
                if (this.just_dragged === id) {
                    this.just_dragged = '';
                    return null;
                }
                this.selected_id(id);
                this.selected_edge_id('');
                this.select(id);
                return null;
            }
            // Background click (anywhere not on a node circle or an edge) → deselect
            bg_click(event) {
                if (!event)
                    return;
                const target = event.target;
                if (target.getAttribute('data-node-id'))
                    return;
                if (target.getAttribute('data-edge-id'))
                    return;
                this.selected_id('');
                this.selected_edge_id('');
                this.select('');
                return null;
            }
            // ---- overlay-слой подсветки ----
            // База при активном узле/ребре гасится одним атрибутом на группу
            // (см. data-forcegraph-dim), а сюда рендерится только окрестность —
            // ховер стоит десятки элементов вместо тысяч.
            dim_active() {
                return Boolean(this.active_id() || this.active_edge());
            }
            overlay_views() {
                const edge = this.active_edge();
                if (edge) {
                    return [
                        this.Overlay_edge(edge.id),
                        this.Overlay_node(edge.source),
                        this.Overlay_node(edge.target),
                        this.Overlay_label(edge.source),
                        this.Overlay_label(edge.target),
                        this.Overlay_edge_label(edge.id),
                    ];
                }
                const id = this.active_id();
                if (!id)
                    return [];
                const hood = this.active_node_hood();
                const views = [];
                for (const e of this.edges()) {
                    if (e.source !== id && e.target !== id)
                        continue;
                    views.push(this.Overlay_edge(e.id));
                    if (this.overlay_edge_label_text(e.id))
                        views.push(this.Overlay_edge_label(e.id));
                }
                const label_all = hood.size <= 22;
                for (const nid of hood) {
                    views.push(this.Overlay_node(nid));
                    // Имя активного узла показывает tooltip, соседей подписываем
                    // пока их разумно мало
                    if (nid !== id && label_all)
                        views.push(this.Overlay_label(nid));
                }
                return views;
            }
            overlay_label_text(id) {
                return this.node_by_id()[id]?.label ?? '';
            }
            overlay_node_stroke_width(id) {
                return id === this.active_id() ? '2.5' : '1.5';
            }
            overlay_edge_width(id) {
                const base = this.edge_base_width(id);
                return String(this.edge_active(id)
                    ? Math.max(base * 2.5, 1.2)
                    : Math.max(base * 2, 1));
            }
            // Тип связи: у активного ребра всегда, у рёбер окрестности — если влезает
            overlay_edge_label_text(id) {
                const rel = this.edge_by_id()[id]?.relation ?? '';
                if (!rel)
                    return '';
                if (this.edge_active(id))
                    return rel;
                return this.edge_label_fits(id) ? rel : '';
            }
            // Tooltip — single floating label above hovered-OR-selected node
            active_id() { return this.hovered_id() || this.selected_id(); }
            // Conditional sub-list — render bg+text only when an active node exists
            tooltip_sub() {
                return this.active_id()
                    ? [this.Tooltip_bg(), this.Tooltip_text()]
                    : [];
            }
            tooltip_text() {
                const id = this.active_id();
                return id ? this.node_by_id()[id]?.label ?? '' : '';
            }
            tooltip_font_size() {
                return String(Math.max(6, Math.min(12, 11 / Math.sqrt(this.screen_scale()))));
            }
            // Position tooltip above the active node, in svg space
            tooltip_anchor() {
                const id = this.active_id();
                if (!id)
                    return { x: 0, y: 0, r: 0 };
                return { x: this.pos(id).x, y: this.pos(id).y, r: this.node_radius_num(id) };
            }
            tooltip_x() {
                return String(this.tooltip_anchor().x);
            }
            // Text baseline is the middle of the bg box; sits above circle with padding
            tooltip_y() {
                const a = this.tooltip_anchor();
                const fs = parseFloat(this.tooltip_font_size());
                return String(a.y - a.r - 6 - fs * 0.7);
            }
            // Bg sized roughly by char-count × char-width
            tooltip_bg_w() {
                const text = this.tooltip_text();
                const fs = parseFloat(this.tooltip_font_size());
                return String(text.length * fs * 0.6 + 10);
            }
            tooltip_bg_h() {
                return String(parseFloat(this.tooltip_font_size()) + 8);
            }
            tooltip_bg_x() {
                return String(this.tooltip_anchor().x - parseFloat(this.tooltip_bg_w()) / 2);
            }
            tooltip_bg_y() {
                const a = this.tooltip_anchor();
                return String(a.y - a.r - 6 - parseFloat(this.tooltip_bg_h()));
            }
            // Selected-node helpers consumed by Aside
            selected_node() {
                const id = this.selected_id();
                return id ? this.node_by_id()[id] ?? null : null;
            }
            selected_color() {
                const n = this.selected_node();
                return $raggu_web_front_explorer_forcegraph_type_color(n?.type ?? '');
            }
            // Edges incident to selected node, with the OTHER node's label
            selected_relations() {
                const id = this.selected_id();
                if (!id)
                    return [];
                const idx = this.node_by_id();
                return this.edges()
                    .filter(e => e.source === id || e.target === id)
                    .map(e => {
                    const other_id = e.source === id ? e.target : e.source;
                    return { relation: e.relation, target_label: idx[other_id]?.label ?? other_id };
                });
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "world_size", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "computed_view_box", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "wheel", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "pan_start", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "pan_move", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "pan_end", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "initial_positions", null);
        __decorate([
            $mol_mem_key
        ], $raggu_web_front_explorer_forcegraph.prototype, "node_pos", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "adjacency", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "tick", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "params_kick", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "dom_tree", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "size_scale", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "edge_scale", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "node_by_id", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "node_radii", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "comm_set", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "relation_nodes", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "active_node_hood", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "hover_enter", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "hover_leave", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer_forcegraph.prototype, "edge_by_id", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "edge_hover_enter", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "edge_hover_leave", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "edge_click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer_forcegraph.prototype, "bg_click", null);
        $$.$raggu_web_front_explorer_forcegraph = $raggu_web_front_explorer_forcegraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_explorer_forcegraph, {
        width: '100%',
        height: '100%',
        display: 'block',
        // Disable browser default drag actions during pointer-capture:
        // - text selection on drag
        // - touch scroll/zoom gestures
        // - native image drag
        userSelect: 'none',
        touchAction: 'none',
    });
    // SVG stroke/fill don't accept $mol_style_func in the typed-prop schema,
    // so wire tokens through raw CSS via style_attach — same trick mol_svg uses
    // for its own text-box background. Selectors match by data-* set on the
    // tooltip elements in view.tree.
    $mol_style_attach('raggu/web/front/explorer/forcegraph/forcegraph.view.css', '[data-forcegraph-tooltip-bg] {\n'
        + '\tfill: var(--bog_builderui_card);\n'
        + '\tstroke: var(--bog_builderui_line);\n'
        + '}\n'
        + '[data-forcegraph-tooltip-text] {\n'
        + '\tfill: var(--bog_builderui_text);\n'
        + '}\n'
        // Halo (paint-order: stroke) отделяет подписи от линий графа под ними.
        + '[data-forcegraph-node-label] {\n'
        + '\tfill: var(--bog_builderui_text);\n'
        + '\tpaint-order: stroke;\n'
        + '\tstroke: var(--bog_builderui_back);\n'
        + '\tstroke-width: 2px;\n'
        + '\tstroke-opacity: 0.7;\n'
        + '}\n'
        + '[data-forcegraph-edge-label] {\n'
        + '\tfill: var(--bog_builderui_shade);\n'
        + '\tpaint-order: stroke;\n'
        + '\tstroke: var(--bog_builderui_back);\n'
        + '\tstroke-width: 2px;\n'
        + '\tstroke-opacity: 0.6;\n'
        + '}\n'
        // Ховер гасит базовые слои ОДНИМ свойством на группу — вместо
        // пересчёта opacity у тысяч элементов. Подсветка живёт в G_overlay.
        + '[data-forcegraph-base] {\n'
        + '\ttransition: opacity 0.15s ease;\n'
        + '}\n'
        + '[data-forcegraph-dim="true"] [data-forcegraph-base] {\n'
        + '\topacity: 0.22;\n'
        + '}\n'
        // Обводка/линии оверлея — темозависимые: белое на светлой теме
        // поверх приглушённой базы было невидимым
        + '[raggu_web_front_explorer_forcegraph_overlay_edge] {\n'
        + '\tstroke: var(--bog_builderui_text);\n'
        + '}\n'
        + '[raggu_web_front_explorer_forcegraph_overlay_node] {\n'
        + '\tstroke: var(--bog_builderui_text);\n'
        + '}\n');
})($ || ($ = {}));

;
	($.$raggu_web_front_explorer) = class $raggu_web_front_explorer extends ($.$bog_builderui_div) {
		outside_click(next){
			if(next !== undefined) return next;
			return null;
		}
		graph_key(){
			return "";
		}
		graph_nodes(){
			return [];
		}
		graph_edges(){
			return [];
		}
		comms_checked(){
			return [];
		}
		comm_color_map(){
			return {};
		}
		Graph(){
			const obj = new this.$.$raggu_web_front_explorer_forcegraph();
			(obj.graph_key) = () => ((this.graph_key()));
			(obj.nodes) = () => ((this.graph_nodes()));
			(obj.edges) = () => ((this.graph_edges()));
			(obj.selected_id) = (next) => ((this.selected_id(next)));
			(obj.selected_edge_id) = (next) => ((this.selected_edge_id(next)));
			(obj.search) = () => ((this.search()));
			(obj.filter_type) = () => ((this.type_filter()));
			(obj.filter_relation) = () => ((this.rel_filter()));
			(obj.filter_comms) = () => ((this.comms_checked()));
			(obj.comm_colors) = () => ((this.comm_color_map()));
			return obj;
		}
		Canvas_bg(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Graph())]);
			return obj;
		}
		Filter_search(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.filter_search_text()));
			(obj.value) = (next) => ((this.search(next)));
			return obj;
		}
		comms_closed(){
			return true;
		}
		comms_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		comms_btn_label(){
			return "";
		}
		Comms_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.comms_toggle(next))});
			(obj.sub) = () => ([(this.comms_btn_label())]);
			return obj;
		}
		has_comms_selection(){
			return false;
		}
		comms_clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Comms_clear(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_clear_showed": (this.has_comms_selection())});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.comms_clear(next))});
			(obj.sub) = () => ([(this.comms_clear_text())]);
			return obj;
		}
		comm_active(id){
			return false;
		}
		comm_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		comm_mark(id){
			return "";
		}
		Comm_mark(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.comm_mark(id))]);
			return obj;
		}
		Comm_dot(id){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		comm_label(id){
			return "";
		}
		Comm_label(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.comm_label(id))]);
			return obj;
		}
		comm_count(id){
			return "";
		}
		Comm_count(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.comm_count(id))]);
			return obj;
		}
		Comm_row(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_legend_on": (this.comm_active(id))});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.comm_click(id, next))});
			(obj.sub) = () => ([
				(this.Comm_mark(id)), 
				(this.Comm_dot(id)), 
				(this.Comm_label(id)), 
				(this.Comm_count(id))
			]);
			return obj;
		}
		comm_rows(){
			return [(this.Comm_row(id))];
		}
		Comms_rows(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.comm_rows()));
			return obj;
		}
		Comms_list(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Comms_clear()), (this.Comms_rows())]);
			return obj;
		}
		Comms(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_panel_collapsed": (this.comms_closed())});
			(obj.sub) = () => ([(this.Comms_btn()), (this.Comms_list())]);
			return obj;
		}
		Filters(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Filter_search()), (this.Comms())]);
			return obj;
		}
		legend_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		Legend_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.legend_title_text())]);
			return obj;
		}
		legend_caret(){
			return "▾";
		}
		Legend_caret(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.legend_caret())]);
			return obj;
		}
		Legend_head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.legend_toggle(next))});
			(obj.sub) = () => ([(this.Legend_title()), (this.Legend_caret())]);
			return obj;
		}
		legend_active(id){
			return false;
		}
		legend_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Legend_dot(id){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		legend_label(id){
			return "";
		}
		Legend_label(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.legend_label(id))]);
			return obj;
		}
		legend_count(id){
			return "";
		}
		Legend_count(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.legend_count(id))]);
			return obj;
		}
		Legend_row(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_legend_on": (this.legend_active(id))});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.legend_click(id, next))});
			(obj.sub) = () => ([
				(this.Legend_dot(id)), 
				(this.Legend_label(id)), 
				(this.Legend_count(id))
			]);
			return obj;
		}
		legend_rows(){
			return [(this.Legend_row(id))];
		}
		Legend_list(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.legend_rows()));
			return obj;
		}
		Legend(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_panel_collapsed": (this.legend_collapsed())});
			(obj.sub) = () => ([(this.Legend_head()), (this.Legend_list())]);
			return obj;
		}
		rels_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		Rels_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rels_title_text())]);
			return obj;
		}
		rels_caret(){
			return "▾";
		}
		Rels_caret(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rels_caret())]);
			return obj;
		}
		Rels_head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.rels_toggle(next))});
			(obj.sub) = () => ([(this.Rels_title()), (this.Rels_caret())]);
			return obj;
		}
		rel_legend_active(id){
			return false;
		}
		rel_legend_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		rel_legend_label(id){
			return "";
		}
		Rel_row_label(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rel_legend_label(id))]);
			return obj;
		}
		rel_legend_count(id){
			return "";
		}
		Rel_row_count(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rel_legend_count(id))]);
			return obj;
		}
		Rel_row(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_legend_on": (this.rel_legend_active(id))});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.rel_legend_click(id, next))});
			(obj.sub) = () => ([(this.Rel_row_label(id)), (this.Rel_row_count(id))]);
			return obj;
		}
		rel_legend_rows(){
			return [(this.Rel_row(id))];
		}
		Rels_list(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.rel_legend_rows()));
			return obj;
		}
		Rels(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_panel_collapsed": (this.rels_collapsed())});
			(obj.sub) = () => ([(this.Rels_head()), (this.Rels_list())]);
			return obj;
		}
		Legends(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Legend()), (this.Rels())]);
			return obj;
		}
		is_mock(){
			return false;
		}
		Mock_badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_mock_badge_showed": (this.is_mock())});
			(obj.sub) = () => ([(this.mock_badge_text())]);
			return obj;
		}
		is_limited(){
			return false;
		}
		limit_text(){
			return "";
		}
		Limit_text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.limit_text())]);
			return obj;
		}
		can_show_more(){
			return false;
		}
		limit_more(next){
			if(next !== undefined) return next;
			return null;
		}
		Limit_more(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_limit_more_showed": (this.can_show_more())});
			(obj.event) = () => ({...(this.$.$bog_builderui_div.prototype.event.call(obj)), "click": (next) => (this.limit_more(next))});
			(obj.sub) = () => ([(this.limit_more_text())]);
			return obj;
		}
		Limit_badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_limit_badge_showed": (this.is_limited())});
			(obj.sub) = () => ([(this.Limit_text()), (this.Limit_more())]);
			return obj;
		}
		Canvas(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Canvas_bg()), 
				(this.Filters()), 
				(this.Legends()), 
				(this.Mock_badge()), 
				(this.Limit_badge())
			]);
			return obj;
		}
		aside_toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		aside_caret(){
			return "⟩";
		}
		Aside_toggle(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.aside_toggle(next))});
			(obj.sub) = () => ([(this.aside_caret())]);
			return obj;
		}
		aside_title(){
			return "";
		}
		Aside_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.aside_title())]);
			return obj;
		}
		Aside_head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Aside_toggle()), (this.Aside_title())]);
			return obj;
		}
		Entity_dot(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		entity_name(){
			return "";
		}
		Entity_name(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.entity_name())]);
			return obj;
		}
		Entity_head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Entity_dot()), (this.Entity_name())]);
			return obj;
		}
		entity_type(){
			return "";
		}
		Entity_type(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.entity_type())]);
			return obj;
		}
		entity_desc(){
			return "";
		}
		Entity_desc(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.entity_desc())]);
			return obj;
		}
		relations_title(){
			return "";
		}
		Relations_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.relations_title())]);
			return obj;
		}
		rel_type(id){
			return "";
		}
		Rel_type(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rel_type(id))]);
			return obj;
		}
		rel_target(id){
			return "";
		}
		Rel_target(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.rel_target(id))]);
			return obj;
		}
		Rel(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Rel_type(id)), (this.Rel_target(id))]);
			return obj;
		}
		rel_rows(){
			return [(this.Rel(id))];
		}
		Relations_list(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.rel_rows()));
			return obj;
		}
		ask_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Ask_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.ask_btn_text())]);
			(obj.event) = () => ({"click": (next) => (this.ask_click(next))});
			return obj;
		}
		Aside_body(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Entity_head()), 
				(this.Entity_type()), 
				(this.Entity_desc()), 
				(this.Relations_title()), 
				(this.Relations_list()), 
				(this.Ask_btn())
			]);
			return obj;
		}
		Aside(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_web_front_explorer_aside_collapsed": (this.aside_collapsed())});
			(obj.sub) = () => ([(this.Aside_head()), (this.Aside_body())]);
			return obj;
		}
		dataset_id(){
			return "";
		}
		selected_id(next){
			if(next !== undefined) return next;
			return "";
		}
		selected_edge_id(next){
			if(next !== undefined) return next;
			return "";
		}
		search(next){
			if(next !== undefined) return next;
			return "";
		}
		type_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		rel_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		legend_collapsed(next){
			if(next !== undefined) return next;
			return false;
		}
		rels_collapsed(next){
			if(next !== undefined) return next;
			return false;
		}
		aside_collapsed(next){
			if(next !== undefined) return next;
			return false;
		}
		selected(){
			return null;
		}
		selected_edge(){
			return null;
		}
		node_label(id){
			return "";
		}
		filter_search_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_filter_search_text"));
		}
		aside_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_aside_title_text"));
		}
		aside_relation_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_aside_relation_title_text"));
		}
		aside_empty_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_aside_empty_text"));
		}
		relations_title_template(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_relations_title_template"));
		}
		ask_btn_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_ask_btn_text"));
		}
		legend_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_legend_title_text"));
		}
		rels_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_rels_title_text"));
		}
		comms_open(next){
			if(next !== undefined) return next;
			return false;
		}
		comms_btn_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_comms_btn_text"));
		}
		comms_clear_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_comms_clear_text"));
		}
		limit_template(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_limit_template"));
		}
		limit_more_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_limit_more_text"));
		}
		mock_badge_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_explorer_mock_badge_text"));
		}
		event(){
			return {...(super.event()), "click": (next) => (this.outside_click(next))};
		}
		sub(){
			return [(this.Canvas()), (this.Aside())];
		}
	};
	($mol_mem(($.$raggu_web_front_explorer.prototype), "outside_click"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Graph"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Canvas_bg"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Filter_search"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "comms_toggle"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Comms_btn"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "comms_clear"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Comms_clear"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "comm_click"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Comm_mark"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Comm_dot"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Comm_label"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Comm_count"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Comm_row"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Comms_rows"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Comms_list"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Comms"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Filters"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "legend_toggle"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legend_title"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legend_caret"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legend_head"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "legend_click"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Legend_dot"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Legend_label"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Legend_count"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Legend_row"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legend_list"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legend"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "rels_toggle"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Rels_title"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Rels_caret"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Rels_head"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "rel_legend_click"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel_row_label"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel_row_count"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel_row"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Rels_list"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Rels"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Legends"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Mock_badge"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Limit_text"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "limit_more"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Limit_more"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Limit_badge"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Canvas"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "aside_toggle"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Aside_toggle"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Aside_title"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Aside_head"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Entity_dot"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Entity_name"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Entity_head"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Entity_type"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Entity_desc"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Relations_title"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel_type"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel_target"));
	($mol_mem_key(($.$raggu_web_front_explorer.prototype), "Rel"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Relations_list"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "ask_click"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Ask_btn"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Aside_body"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "Aside"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "selected_id"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "selected_edge_id"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "search"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "type_filter"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "rel_filter"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "legend_collapsed"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "rels_collapsed"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "aside_collapsed"));
	($mol_mem(($.$raggu_web_front_explorer.prototype), "comms_open"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        // Default page size for the graph endpoint.
        const GRAPH_LIMIT = 500;
        // Module-scoped cache keyed by dataset_id. Survives component remount:
        // switching tabs drops the @$mol_mem cell's subscribers and resets it, so
        // without this every return to the graph re-fetches and re-runs the layout.
        const $raggu_web_front_explorer_graph_cache = new Map();
        // Потолок бэка: get_graph валидирует limit <= 5000 и отвечает 422 выше.
        // Кнопка «показать больше» упирается в него; URL-арг `limit` — нет,
        // чтобы можно было проверить поднятый лимит без пересборки фронта.
        const GRAPH_LIMIT_MAX = 5000;
        class $raggu_web_front_explorer extends $.$raggu_web_front_explorer {
            // URL flag `?mock=1` forces the built-in PRNG mock — used for offline demo
            // and jsdom tests where no live backend is available.
            mock_flag() {
                return this.$.$mol_state_arg.value('mock') === '1';
            }
            // Размер выборки графа — URL-арг `limit` (например #!limit=5000).
            // По умолчанию 500: SVG на тысячах узлов заметно тяжелеет.
            // Пишется кнопкой «показать больше» на плашке лимита; при значении
            // по умолчанию арг убирается из URL, чтобы ссылка оставалась чистой.
            // Чтение сверху НЕ ограничиваем: сейчас бэк режет на 5000 (422), но лимит
            // там собираются поднимать — фронт должен позволять это проверить.
            graph_limit(next) {
                const arg = this.$.$mol_state_arg;
                if (next !== undefined) {
                    arg.value('limit', next === GRAPH_LIMIT ? null : String(next));
                    return next;
                }
                const raw = Number(arg.value('limit') ?? '');
                if (!Number.isFinite(raw) || raw <= 0)
                    return GRAPH_LIMIT;
                return Math.round(raw);
            }
            // Ключ кэшей графа и раскладки: датасет + лимит выборки
            graph_key() {
                return `${this.dataset_id()}:${this.graph_limit()}`;
            }
            // Reactive live fetch. While loading, the wire promise is rethrown as
            // usual; a real transport error falls back to the built-in mock graph
            // so the demo stays alive without the backend.
            graph_remote() {
                const id = this.dataset_id();
                if (!id)
                    return null;
                if (this.mock_flag())
                    return null;
                // Возврат на вкладку не должен снова дёргать бэк — отдаём тот же объект,
                // стабильная identity сохраняет раскладку графа.
                const key = this.graph_key();
                const cached = $raggu_web_front_explorer_graph_cache.get(key);
                if (cached)
                    return cached;
                try {
                    const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_graph, { params: { dataset_id: id }, query: { limit: this.graph_limit() } });
                    const nodes = res.nodes.map((n) => ({
                        id: n.id,
                        label: n.label,
                        type: n.entity_type ?? '',
                        degree: n.degree,
                        x: n.x,
                        y: n.y,
                        community: n.community_id ?? '',
                        description: n.description ?? '',
                    }));
                    const edges = res.edges.map((e) => ({
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        strength: e.strength,
                        relation: e.relation_type,
                        description: e.description ?? '',
                    }));
                    const m = res.meta;
                    const meta = m ? {
                        total_nodes: m.total_nodes,
                        returned_nodes: m.returned_nodes,
                        limit: m.limit,
                    } : null;
                    const result = { nodes, edges, meta };
                    $raggu_web_front_explorer_graph_cache.set(key, result);
                    return result;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    console.warn('Graph fetch failed, falling back to mock:', error);
                    return null;
                }
            }
            // Показываем юзеру плашку, что перед ним мок-граф, а не данные с бэка.
            is_mock() {
                return this.graph_remote() === null;
            }
            // Легенда строится из фактических типов графа (все, по убыванию),
            // а не из фиксированного NEREL-набора — схемы разных доменов различаются.
            legend_entries() {
                const counts = {};
                for (const n of this.graph_nodes()) {
                    counts[n.type] = (counts[n.type] ?? 0) + 1;
                }
                return Object.entries(counts)
                    .map(([type, count]) => ({ type, count }))
                    .sort((a, b) => b.count - a.count);
            }
            legend_rows() {
                return this.legend_entries().map((_, i) => this.Legend_row(i));
            }
            legend_label(i) {
                return this.legend_entries()[i]?.type ?? '';
            }
            legend_count(i) {
                return String(this.legend_entries()[i]?.count ?? '');
            }
            legend_active(i) {
                return this.type_filter() === this.legend_entries()[i]?.type;
            }
            // Цвет точки легенды = цвет узлов этого типа. Style override, т.к. цвет
            // вычисляется рантайм-функцией, не токеном.
            Legend_dot(i) {
                const dot = super.Legend_dot(i);
                const type = this.legend_entries()[i]?.type ?? '';
                dot.style = () => ({
                    background: $raggu_web_front_explorer_forcegraph_type_color(type),
                });
                return dot;
            }
            // Клик по типу подсвечивает все узлы этого типа (как поиск).
            // Повторный клик по активному типу снимает фильтр.
            legend_click(i) {
                const t = this.legend_entries()[i]?.type ?? '';
                this.type_filter(this.type_filter() === t ? '' : t);
                return null;
            }
            // Легенда типов связей — симметрична легенде сущностей, но по рёбрам.
            rel_entries() {
                const counts = {};
                for (const e of this.graph_edges()) {
                    counts[e.relation] = (counts[e.relation] ?? 0) + 1;
                }
                return Object.entries(counts)
                    .map(([type, count]) => ({ type, count }))
                    .sort((a, b) => b.count - a.count);
            }
            rel_legend_rows() {
                return this.rel_entries().map((_, i) => this.Rel_row(i));
            }
            rel_legend_label(i) {
                return this.rel_entries()[i]?.type ?? '';
            }
            rel_legend_count(i) {
                return String(this.rel_entries()[i]?.count ?? '');
            }
            // Тип отношения наведённого/выбранного ребра — подсвечиваем его строку
            active_relation() {
                return this.graph_view().active_edge()?.relation ?? '';
            }
            rel_legend_active(i) {
                const t = this.rel_entries()[i]?.type ?? '';
                return this.rel_filter() === t || this.active_relation() === t;
            }
            rel_legend_click(i) {
                const t = this.rel_entries()[i]?.type ?? '';
                this.rel_filter(this.rel_filter() === t ? '' : t);
                return null;
            }
            // --- Сообщества: выпадашка с чекбоксами возле поиска ---
            // Список с бэка (get_communities); для мока/фолбэка группируем узлы
            // по community. Иерархию Leiden режем до самого крупного уровня.
            communities() {
                const ds = this.dataset_id();
                if (ds && !this.mock_flag()) {
                    try {
                        const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_communities, { params: { dataset_id: ds } });
                        const all = res.communities ?? [];
                        if (all.length) {
                            const top = Math.min(...all.map((c) => c.level ?? 0));
                            return all
                                .filter((c) => (c.level ?? 0) === top)
                                .map((c) => ({ id: c.id, title: c.title || c.id, size: c.size ?? 0 }))
                                .sort((a, b) => b.size - a.size);
                        }
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                    }
                }
                const counts = {};
                for (const n of this.graph_nodes()) {
                    const c = n.community ?? '';
                    if (!c)
                        continue;
                    counts[c] = (counts[c] ?? 0) + 1;
                }
                return Object.entries(counts)
                    .map(([id, size]) => ({ id, title: id, size }))
                    .sort((a, b) => b.size - a.size);
            }
            // Каждому сообществу свой цвет — по порядку в списке
            comm_color_map() {
                const m = {};
                this.communities().forEach((c, i) => {
                    m[c.id] = $raggu_web_front_explorer_forcegraph_index_color(i);
                });
                return m;
            }
            comms_selected(next) {
                return next ?? [];
            }
            // Пересечение выбора с текущим списком: смена датасета не тащит чужой
            // выбор (id сообществ у датасетов разные — фильтр гасил бы весь граф)
            comms_checked() {
                const ids = new Set(this.communities().map(c => c.id));
                return this.comms_selected().filter(id => ids.has(id));
            }
            comm_rows() {
                return this.communities().map((_, i) => this.Comm_row(i));
            }
            comm_label(i) { return this.communities()[i]?.title ?? ''; }
            // Сколько вершин сообщества реально попало в выборку графа (limit!)
            comm_visible_counts() {
                const m = {};
                for (const n of this.graph_nodes()) {
                    const c = n.community ?? '';
                    if (!c)
                        continue;
                    m[c] = (m[c] ?? 0) + 1;
                }
                return m;
            }
            // «видимых / всего»: size с бэка — по всему датасету, а канва держит
            // только limit-выборку, иначе число не сходится с подсветкой
            comm_count(i) {
                const c = this.communities()[i];
                if (!c)
                    return '';
                const vis = this.comm_visible_counts()[c.id] ?? 0;
                return vis === c.size ? String(c.size) : `${vis} / ${c.size}`;
            }
            comm_active(i) {
                return this.comms_selected().includes(this.communities()[i]?.id ?? '');
            }
            comm_mark(i) { return this.comm_active(i) ? '✓' : ''; }
            Comm_dot(i) {
                const dot = super.Comm_dot(i);
                dot.style = () => ({
                    background: this.comm_color_map()[this.communities()[i]?.id ?? ''] ?? '',
                });
                return dot;
            }
            comm_click(i) {
                const id = this.communities()[i]?.id;
                if (!id)
                    return null;
                const cur = this.comms_selected();
                this.comms_selected(cur.includes(id)
                    ? cur.filter(c => c !== id)
                    : [...cur, id]);
                return null;
            }
            has_comms_selection() { return this.comms_checked().length > 0; }
            comms_clear() {
                this.comms_selected([]);
                return null;
            }
            comms_toggle() {
                this.comms_open(!this.comms_open());
                return null;
            }
            comms_closed() { return !this.comms_open(); }
            // Клик вне выпадашки закрывает её. Клики внутри (кнопка, строки)
            // добегают сюда всплытием, но target лежит внутри Comms — пропускаем.
            outside_click(event) {
                if (!this.comms_open())
                    return null;
                const box = this.Comms().dom_node();
                if (box && event?.target instanceof Node && box.contains(event.target))
                    return null;
                this.comms_open(false);
                return null;
            }
            comms_btn_label() {
                const n = this.comms_checked().length;
                return `${this.comms_btn_text()}${n ? ` · ${n}` : ''} ${this.comms_open() ? '▴' : '▾'}`;
            }
            // Сворачивание легенд и правой панели — больше места графу
            legend_caret() { return this.legend_collapsed() ? '▸' : '▾'; }
            rels_caret() { return this.rels_collapsed() ? '▸' : '▾'; }
            aside_caret() { return this.aside_collapsed() ? '⟨' : '⟩'; }
            legend_toggle() {
                this.legend_collapsed(!this.legend_collapsed());
                return null;
            }
            rels_toggle() {
                this.rels_collapsed(!this.rels_collapsed());
                return null;
            }
            aside_toggle() {
                this.aside_collapsed(!this.aside_collapsed());
                return null;
            }
            graph_data() {
                return this.graph_remote()
                    ?? $raggu_web_front_explorer_forcegraph_build_mock(42, 80, 130);
            }
            // --- Плашка лимита: сколько вершин реально на канве против всего в корпусе ---
            graph_meta() {
                return this.graph_remote()?.meta ?? null;
            }
            // Показываем только когда выборка действительно урезана — на полном
            // графе плашка была бы шумом.
            is_limited() {
                const m = this.graph_meta();
                return !!m && m.returned_nodes < m.total_nodes;
            }
            limit_text() {
                const m = this.graph_meta();
                if (!m)
                    return '';
                return this.limit_template()
                    .replace('%1', String(m.returned_nodes))
                    .replace('%2', String(m.total_nodes));
            }
            can_show_more() {
                return this.graph_limit() < GRAPH_LIMIT_MAX;
            }
            // Удваиваем выборку, но не выше потолка бэка и не выше размера корпуса.
            limit_more() {
                const m = this.graph_meta();
                const total = m?.total_nodes ?? GRAPH_LIMIT_MAX;
                const next = Math.min(this.graph_limit() * 2, total, GRAPH_LIMIT_MAX);
                if (next > this.graph_limit())
                    this.graph_limit(next);
                return null;
            }
            graph_nodes() { return this.graph_data().nodes; }
            graph_edges() { return this.graph_data().edges; }
            // Cast to extended class to access TS-only methods (selected_node/selected_color/...)
            graph_view() {
                return this.Graph();
            }
            // Selected node, mirrors $raggu_web_front_explorer_forcegraph internals
            selected() {
                return this.graph_view().selected_node();
            }
            // Selected edge — aside shows a relation card instead of an entity card
            selected_edge() {
                return this.graph_view().selected_edge();
            }
            node_label(id) {
                return this.graph_nodes().find(n => n.id === id)?.label ?? id;
            }
            aside_title() {
                return this.selected_edge() ? this.aside_relation_title_text() : this.aside_title_text();
            }
            // Aside text — fall back to placeholder when nothing selected
            entity_name() {
                const edge = this.selected_edge();
                if (edge)
                    return edge.relation || '—';
                return this.selected()?.label ?? this.aside_empty_text();
            }
            entity_type() {
                const edge = this.selected_edge();
                if (edge)
                    return `${this.node_label(edge.source)} → ${this.node_label(edge.target)}`;
                return this.selected()?.type ?? '';
            }
            // Описание ребра с бэка: ручки get_edge на бэке пока нет, поэтому любая
            // ошибка (404 в т.ч.) тихо фолбэчится на description из get_graph.
            edge_remote_desc() {
                const edge = this.selected_edge();
                const id = this.dataset_id();
                if (!edge || !id || this.mock_flag())
                    return null;
                try {
                    const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_edge, { params: { dataset_id: id, edge_id: edge.id } });
                    return res.description || null;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    return null;
                }
            }
            // Описание узла с бэка (get_node); ошибка тихо фолбэчится на
            // description из get_graph — как у рёбер.
            node_remote_desc() {
                const n = this.selected();
                const id = this.dataset_id();
                if (!n || !id || this.mock_flag())
                    return null;
                try {
                    const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_node, { params: { dataset_id: id, node_id: n.id } });
                    return res.node?.description || null;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    return null;
                }
            }
            entity_desc() {
                const edge = this.selected_edge();
                if (edge) {
                    return this.edge_remote_desc()
                        ?? (edge.description
                            || `${this.node_label(edge.source)} — ${edge.relation} — ${this.node_label(edge.target)}`);
                }
                const n = this.selected();
                if (!n)
                    return '';
                return this.node_remote_desc() ?? (n.description || '');
            }
            relations_title() {
                const n = this.selected();
                if (!n)
                    return '';
                return this.relations_title_template().replace('%s', String(n.degree));
            }
            rels() {
                if (this.selected_edge())
                    return [];
                return this.graph_view().selected_relations().slice(0, 5);
            }
            rel_rows() {
                return this.rels().map((_, i) => this.Rel(i));
            }
            rel_type(i) { return this.rels()[i]?.relation ?? ''; }
            rel_target(i) { return this.rels()[i]?.target_label ?? ''; }
            // Entity_dot color reflects type of selected node; neutral for an edge
            Entity_dot() {
                const dot = super.Entity_dot();
                dot.style = () => ({
                    background: this.selected_edge() ? '#7a7672' : this.graph_view().selected_color(),
                });
                return dot;
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "graph_limit", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "graph_remote", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "legend_entries", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "legend_click", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "rel_entries", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "rel_legend_click", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "communities", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "comm_color_map", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "comms_selected", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "comms_checked", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "comm_visible_counts", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "comm_click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "comms_clear", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "comms_toggle", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "outside_click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "legend_toggle", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "rels_toggle", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "aside_toggle", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "graph_data", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_explorer.prototype, "limit_more", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "edge_remote_desc", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_explorer.prototype, "node_remote_desc", null);
        $$.$raggu_web_front_explorer = $raggu_web_front_explorer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    const { radial_gradient } = $mol_style_func;
    const dot_base = {
        minWidth: '9px',
        maxWidth: '9px',
        height: '9px',
        border: { radius: '50%' },
    };
    const legend_row = {
        flex: { direction: 'row' },
        align: { items: 'center' },
        gap: '8px',
        padding: {
            top: '2px',
            bottom: '2px',
            left: '4px',
            right: '4px',
        },
        cursor: 'pointer',
        border: { radius: '5px' },
        '@': {
            raggu_web_front_explorer_legend_on: {
                true: {
                    background: { color: '#ffffff26' },
                },
            },
        },
    };
    const legend_label = {
        font: {
            family: 'ui-monospace, monospace',
            weight: 500,
            size: '10px',
        },
        color: $bog_builderui_tokens.shade,
    };
    // Общий каркас панелек-легенд поверх канвы. Сворачивание: атрибут
    // raggu_web_front_explorer_panel_collapsed прячет список, остаётся шапка.
    const legend_panel = {
        background: { color: '#1c1b1ae6' },
        border: { width: '1px', style: 'solid', color: '#3a3937', radius: '8px' },
        padding: {
            top: '11px',
            bottom: '11px',
            left: '13px',
            right: '13px',
        },
        flex: { direction: 'column', shrink: 1 },
        minHeight: 0,
    };
    const legend_head = {
        flex: { direction: 'row' },
        align: { items: 'center' },
        gap: '8px',
        cursor: 'pointer',
    };
    const legend_title = {
        font: {
            family: 'ui-monospace, monospace',
            weight: 700,
            size: '10px',
        },
        color: $bog_builderui_tokens.line,
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        flex: { grow: 1 },
    };
    const legend_caret = {
        color: '#8a8a8a',
        font: { size: '10px' },
    };
    // shrink+minHeight: без них flex не ужимает список и панель вылезает
    // за экран вместо прокрутки. maxHeight делит вьюпорт между двумя
    // легендами — иначе длинная (типы связей) выдавливает короткую в ноль.
    const legend_list = {
        flex: { direction: 'column', shrink: 1 },
        minHeight: 0,
        maxHeight: '34vh',
        overflow: 'auto',
        margin: { top: '8px' },
    };
    const relation_card = {
        border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
        padding: {
            top: '8px',
            bottom: '8px',
            left: '10px',
            right: '10px',
        },
        margin: { bottom: '6px' },
        font: { size: '11px' },
        flex: { direction: 'column' },
    };
    const relation_type = {
        font: {
            family: 'ui-monospace, monospace',
            weight: 600,
            size: '10px',
        },
        color: $bog_builderui_tokens.current,
    };
    const relation_target = {
        color: $bog_builderui_tokens.shade,
        margin: { top: '2px' },
    };
    $mol_style_define($raggu_web_front_explorer, {
        flex: { direction: 'row', shrink: 1 },
        minWidth: 0,
        height: '100%',
        Canvas: {
            flex: { grow: 1, shrink: 1, direction: 'column' },
            position: 'relative',
            background: { color: $bog_builderui_tokens.back },
            minWidth: 0,
        },
        Canvas_bg: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            align: { items: 'center' },
            justify: { content: 'center' },
            background: {
                image: [
                    [radial_gradient('circle at 35% 40%, #5b5bd62e, transparent 45%')],
                    [radial_gradient('circle at 70% 65%, #d65b8c24, transparent 45%')],
                ],
            },
        },
        Filters: {
            position: 'absolute',
            top: '14px',
            left: '14px',
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            gap: '8px',
            maxWidth: '62%',
        },
        Filter_search: {
            background: { color: $bog_builderui_tokens.field },
            color: $bog_builderui_tokens.text,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            padding: {
                top: '8px',
                bottom: '8px',
                left: '11px',
                right: '11px',
            },
            font: { size: '11px', weight: 600 },
            width: '200px',
        },
        // Выпадашка сообществ: кнопка в ряду фильтров, список поверх канвы
        Comms: {
            position: 'relative',
            flex: { direction: 'column' },
            '@': {
                raggu_web_front_explorer_panel_collapsed: {
                    true: {
                        Comms_list: { display: 'none' },
                    },
                },
            },
        },
        Comms_btn: {
            background: { color: $bog_builderui_tokens.field },
            color: $bog_builderui_tokens.text,
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '7px' },
            padding: {
                top: '8px',
                bottom: '8px',
                left: '11px',
                right: '11px',
            },
            font: { size: '11px', weight: 600 },
            cursor: 'pointer',
            whiteSpace: 'nowrap',
        },
        Comms_list: {
            ...legend_panel,
            position: 'absolute',
            top: $mol_style_func.calc('100% + 6px'),
            left: 0,
            width: '250px',
            maxHeight: '320px',
            zIndex: 5,
        },
        // Кнопка «очистить выбор» приколочена к шапке выпадашки, скроллится
        // только список сообществ под ней. Прячется, когда выбирать нечего.
        Comms_clear: {
            display: 'none',
            align: { self: 'stretch', items: 'center' },
            justify: { content: 'center' },
            margin: { bottom: '8px' },
            padding: {
                top: '5px',
                bottom: '5px',
                left: '8px',
                right: '8px',
            },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.current,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            '@': {
                raggu_web_front_explorer_clear_showed: {
                    true: { display: 'flex' },
                },
            },
        },
        Comms_rows: {
            flex: { direction: 'column', shrink: 1 },
            minHeight: 0,
            overflow: 'auto',
        },
        Comm_row: legend_row,
        Comm_mark: {
            minWidth: '13px',
            maxWidth: '13px',
            color: $bog_builderui_tokens.current,
            font: { size: '11px', weight: 700 },
        },
        Comm_dot: dot_base,
        Comm_label: {
            ...legend_label,
            flex: { grow: 1 },
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        Comm_count: {
            ...legend_label,
            color: '#8a8a8a',
        },
        Legends: {
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '184px',
            maxHeight: $mol_style_func.calc('100% - 28px'),
            flex: { direction: 'column' },
            gap: '8px',
        },
        Legend: {
            ...legend_panel,
            '@': {
                raggu_web_front_explorer_panel_collapsed: {
                    true: {
                        Legend_list: { display: 'none' },
                    },
                },
            },
        },
        Legend_head: legend_head,
        Legend_title: legend_title,
        Legend_caret: legend_caret,
        Legend_list: legend_list,
        Legend_row: legend_row,
        Legend_dot: dot_base,
        Legend_label: {
            ...legend_label,
            flex: { grow: 1 },
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        Legend_count: {
            ...legend_label,
            color: '#8a8a8a',
        },
        Rels: {
            ...legend_panel,
            '@': {
                raggu_web_front_explorer_panel_collapsed: {
                    true: {
                        Rels_list: { display: 'none' },
                    },
                },
            },
        },
        Rels_head: legend_head,
        Rels_title: legend_title,
        Rels_caret: legend_caret,
        Rels_list: legend_list,
        Rel_row: legend_row,
        Rel_row_label: {
            ...legend_label,
            flex: { grow: 1 },
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        Rel_row_count: {
            ...legend_label,
            color: '#8a8a8a',
        },
        Mock_badge: {
            display: 'none',
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '11px',
            },
            color: '#8a6d1b',
            background: { color: '#f5c84226' },
            border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '6px' },
            padding: {
                top: '3px',
                bottom: '3px',
                left: '8px',
                right: '8px',
            },
            '@': {
                raggu_web_front_explorer_mock_badge_showed: {
                    true: { display: 'flex' },
                },
            },
        },
        // Плашка выборки: сколько вершин на канве против размера корпуса.
        // Живёт там же, где Mock_badge — они взаимоисключающие: meta приходит
        // только с живого бэка, а мок-плашка только при его отсутствии.
        Limit_badge: {
            display: 'none',
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '8px',
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '11px',
            },
            color: $bog_builderui_tokens.shade,
            background: { color: '#1c1b1ae6' },
            border: { width: '1px', style: 'solid', color: '#3a3937', radius: '6px' },
            padding: {
                top: '4px',
                bottom: '4px',
                left: '9px',
                right: '9px',
            },
            maxWidth: $mol_style_func.calc('100% - 28px'),
            '@': {
                raggu_web_front_explorer_limit_badge_showed: {
                    true: { display: 'flex' },
                },
            },
        },
        Limit_text: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        Limit_more: {
            display: 'none',
            color: $bog_builderui_tokens.current,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            textDecoration: 'underline',
            '@': {
                raggu_web_front_explorer_limit_more_showed: {
                    true: { display: 'flex' },
                },
            },
        },
        Aside: {
            minWidth: '240px',
            maxWidth: '240px',
            background: { color: $bog_builderui_tokens.card },
            border: {
                left: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            padding: {
                top: '18px',
                bottom: '18px',
                left: '18px',
                right: '18px',
            },
            overflow: 'auto',
            flex: { direction: 'column' },
            // Свёрнутая панель — узкая полоска с шевроном, граф забирает ширину
            '@': {
                raggu_web_front_explorer_aside_collapsed: {
                    true: {
                        minWidth: '34px',
                        maxWidth: '34px',
                        padding: {
                            top: '10px',
                            bottom: '10px',
                            left: '4px',
                            right: '4px',
                        },
                        Aside_title: { display: 'none' },
                        Aside_body: { display: 'none' },
                    },
                },
            },
        },
        Aside_head: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '8px',
        },
        Aside_toggle: {
            cursor: 'pointer',
            color: $bog_builderui_tokens.shade,
            font: { size: '13px', weight: 600 },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '8px',
                right: '8px',
            },
            border: { radius: '5px' },
            ':hover': {
                background: { color: $bog_builderui_tokens.field },
            },
        },
        Aside_body: {
            flex: { direction: 'column' },
        },
        Aside_title: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            letterSpacing: '0.7px',
        },
        Entity_head: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '8px',
            margin: { top: '11px' },
        },
        Entity_dot: {
            minWidth: '12px',
            maxWidth: '12px',
            height: '12px',
            border: { radius: '50%' },
            background: { color: '#7c6ce0' },
        },
        Entity_name: {
            font: { weight: 700, size: '16px' },
            // Длинные имена сущностей не должны вылезать за панель
            minWidth: 0,
            overflowWrap: 'anywhere',
        },
        Entity_type: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.current,
            margin: { top: '6px' },
            overflowWrap: 'anywhere',
        },
        Entity_desc: {
            font: { size: '12px' },
            color: $bog_builderui_tokens.shade,
            lineHeight: '1.5',
            margin: { top: '10px' },
        },
        Relations_title: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            textTransform: 'uppercase',
            margin: { top: '18px', bottom: '8px' },
        },
        Relations_list: {
            flex: { direction: 'column' },
        },
        Rel: relation_card,
        Rel_type: relation_type,
        Rel_target: relation_target,
        Ask_btn: {
            margin: { top: '16px' },
            background: { color: $bog_builderui_tokens.current },
            color: '#ffffff',
            border: { radius: '7px' },
            padding: {
                top: '10px',
                bottom: '10px',
                left: '10px',
                right: '10px',
            },
            textAlign: 'center',
            font: { size: '12px', weight: 600 },
            cursor: 'pointer',
        },
        '@media': {
            '(max-width: 720px)': {
                flex: { direction: 'column' },
                overflow: 'auto',
                Canvas: {
                    minHeight: '55vh',
                },
                Aside: {
                    minWidth: 0,
                    maxWidth: '100%',
                    border: {
                        left: { width: 0 },
                        top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
                    },
                    overflow: 'visible',
                },
                Filters: {
                    maxWidth: $mol_style_func.calc('100% - 28px'),
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$bog_builderui_skeleton) = class $bog_builderui_skeleton extends ($.$bog_builderui_div) {
		attr(){
			return {"mol_view_error": "Promise"};
		}
	};


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($bog_builderui_skeleton, {
        minHeight: '1rem',
    });
})($ || ($ = {}));

;
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		type(){
			return "";
		}
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code_line) = class $mol_text_code_line extends ($.$mol_paragraph) {
		numb(){
			return 0;
		}
		token_type(id){
			return "";
		}
		token_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		token_uri(id){
			return "";
		}
		text(){
			return "";
		}
		minimal_height(){
			return 24;
		}
		numb_showed(){
			return true;
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Numb(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.numb())]);
			return obj;
		}
		Token(id){
			const obj = new this.$.$mol_text_code_token();
			(obj.type) = () => ((this.token_type(id)));
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			return obj;
		}
		Token_link(id){
			const obj = new this.$.$mol_text_code_token_link();
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			(obj.uri) = () => ((this.token_uri(id)));
			return obj;
		}
		find_pos(id){
			return null;
		}
	};
	($mol_mem(($.$mol_text_code_line.prototype), "Numb"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token_link"));


;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'spoiler': /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        // 'remark' : /(\()(.+?)(\))/ ,
        // 'quote' : /(")(.+?)(")/ ,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)|- \\(?!\\).*|(?<=^| )#!? .*/,
        'code-string': /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u,
        'code-number': /[+-]?(?:\d*\.)?\d+(\uFE0F.|\w*)/,
        'code-call': /\.?\w+(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?<=\.|::|->)[a-z][\w-]*|(?<=[, \t] |\t)[\w-]+\??:(?!\/\/|:))/,
        'code-keyword': /(?<=^|\t|[ )(}{=] )((throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|void|int|float|ref)( |$|;))+/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /(?<=^|  |\t)@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_line extends $.$mol_text_code_line {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    // @FIXME: this logic compatible only with `string`
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                const content = this.tokens(path).map((t, i) => this.Token([...path, i]));
                return content.length ? content : ['\n'];
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_token_pos", null);
        $$.$mol_text_code_line = $mol_text_code_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_line, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'end',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    inlineStart: '-4rem',
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
// @ts-ignore
var $node = $node || {};

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

;
	($.$mol_icon_clipboard) = class $mol_icon_clipboard extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3";
		}
	};


;
"use strict";


;
	($.$mol_icon_clipboard_outline) = class $mol_icon_clipboard_outline extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z";
		}
	};


;
"use strict";


;
	($.$mol_button_copy) = class $mol_button_copy extends ($.$mol_button_minor) {
		text(){
			return (this.title());
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.text())], {"type": "text/plain"});
			return obj;
		}
		html(){
			return "";
		}
		html_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.html())], {"type": "text/html"});
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clipboard_outline();
			return obj;
		}
		title(){
			return "";
		}
		blobs(){
			return [(this.text_blob()), (this.html_blob())];
		}
		data(){
			return {};
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_copy.prototype), "text_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "html_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Button copy text() value to clipboard
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.writeText?.(this.text());
                cb.write?.(this.attachments());
                if (cb.writeText === undefined && cb.write === undefined) {
                    throw new Error("doesn't support copy to clipoard");
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code) = class $mol_text_code extends ($.$mol_stack) {
		sidebar_showed(){
			return false;
		}
		render_visible_only(){
			return false;
		}
		row_numb(id){
			return 0;
		}
		row_theme(id){
			return "";
		}
		row_text(id){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		highlight(){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => ((this.sidebar_showed()));
			(obj.numb) = () => ((this.row_numb(id)));
			(obj.theme) = () => ((this.row_theme(id)));
			(obj.text) = () => ((this.row_text(id)));
			(obj.syntax) = () => ((this.syntax()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.render_visible_only) = () => ((this.render_visible_only()));
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		text_export(){
			return "";
		}
		Copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_code_Copy_hint")));
			(obj.text) = () => ((this.text_export()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_text_code_sidebar_showed": (this.sidebar_showed())};
		}
		text(){
			return "";
		}
		text_lines(){
			return [];
		}
		find_pos(id){
			return null;
		}
		uri_base(){
			return "";
		}
		row_themes(){
			return [];
		}
		sub(){
			return [(this.Rows()), (this.Copy())];
		}
	};
	($mol_mem_key(($.$mol_text_code.prototype), "Row"));
	($mol_mem(($.$mol_text_code.prototype), "Rows"));
	($mol_mem(($.$mol_text_code.prototype), "Copy"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Code visualizer.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
         */
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return (this.text() ?? '').split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
            row_theme(row) {
                return this.row_themes()[row - 1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            font: {
                family: 'monospace',
            },
            Rows: {
                padding: $mol_gap.text,
                minWidth: 0,
            },
            Row: {
                font: {
                    family: 'inherit',
                },
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_line: {
                            margin: {
                                inlineStart: '1.75rem',
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_textarea) = class $mol_textarea extends ($.$mol_stack) {
		clickable(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_showed(){
			return false;
		}
		press(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		enabled(){
			return true;
		}
		spellcheck(){
			return true;
		}
		length_max(){
			return +Infinity;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		bring(){
			return (this.Edit().bring());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return true;
		}
		Edit(){
			const obj = new this.$.$mol_textarea_edit();
			(obj.value) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.spellcheck) = () => ((this.spellcheck()));
			(obj.length_max) = () => ((this.length_max()));
			(obj.selection) = (next) => ((this.selection(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.submit_with_ctrl) = () => ((this.submit_with_ctrl()));
			return obj;
		}
		row_numb(id){
			return 0;
		}
		highlight(){
			return "";
		}
		syntax(){
			const obj = new this.$.$mol_syntax2();
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.value()));
			(obj.render_visible_only) = () => (false);
			(obj.row_numb) = (id) => ((this.row_numb(id)));
			(obj.sidebar_showed) = () => ((this.sidebar_showed()));
			(obj.highlight) = () => ((this.highlight()));
			(obj.syntax) = () => ((this.syntax()));
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_textarea_clickable": (this.clickable()), 
				"mol_textarea_sidebar_showed": (this.sidebar_showed())
			};
		}
		event(){
			return {"keydown": (next) => (this.press(next)), "pointermove": (next) => (this.hover(next))};
		}
		sub(){
			return [(this.Edit()), (this.View())];
		}
		symbols_alt(){
			return {
				"comma": "<", 
				"period": ">", 
				"dash": "−", 
				"equals": "≈", 
				"graveAccent": "́", 
				"forwardSlash": "÷", 
				"E": "€", 
				"V": "✔", 
				"X": "×", 
				"C": "©", 
				"P": "§", 
				"H": "₽", 
				"key0": "°", 
				"key8": "•", 
				"key2": "@", 
				"key3": "#", 
				"key4": "$", 
				"key6": "^", 
				"key7": "&", 
				"bracketOpen": "[", 
				"bracketClose": "]", 
				"slashBack": "|"
			};
		}
		symbols_alt_ctrl(){
			return {"space": " "};
		}
		symbols_alt_shift(){
			return {
				"V": "✅", 
				"X": "❌", 
				"O": "⭕", 
				"key1": "❗", 
				"key4": "💲", 
				"key7": "❓", 
				"comma": "«", 
				"period": "»", 
				"semicolon": "“", 
				"quoteSingle": "”", 
				"dash": "—", 
				"equals": "≠", 
				"graveAccent": "̱", 
				"bracketOpen": "{", 
				"bracketClose": "}"
			};
		}
	};
	($mol_mem(($.$mol_textarea.prototype), "clickable"));
	($mol_mem(($.$mol_textarea.prototype), "press"));
	($mol_mem(($.$mol_textarea.prototype), "hover"));
	($mol_mem(($.$mol_textarea.prototype), "value"));
	($mol_mem(($.$mol_textarea.prototype), "selection"));
	($mol_mem(($.$mol_textarea.prototype), "submit"));
	($mol_mem(($.$mol_textarea.prototype), "Edit"));
	($mol_mem(($.$mol_textarea.prototype), "syntax"));
	($mol_mem(($.$mol_textarea.prototype), "View"));
	($.$mol_textarea_edit) = class $mol_textarea_edit extends ($.$mol_string) {
		dom_name(){
			return "textarea";
		}
		enter(){
			return "enter";
		}
		field(){
			return {...(super.field()), "scrollTop": 0};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering multiline text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
         */
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    let end = start + rows[i].length;
                    if (end >= from && start <= to) {
                        if (to === from || start !== to) {
                            rows[i] = '\t' + rows[i];
                            to += 1;
                            end += 1;
                        }
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from + 1, to]);
            }
            indent_dec() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    const end = start + rows[i].length;
                    if (end >= from && start <= to && rows[i].startsWith('\t')) {
                        rows[i] = rows[i].slice(1);
                        to -= 1;
                        if (start < from)
                            from -= 1;
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from, to]);
            }
            symbol_insert(event) {
                const symbol = event.shiftKey
                    ? this.symbols_alt_shift()[$mol_keyboard_code[event.keyCode]]
                    : event.ctrlKey
                        ? this.symbols_alt_ctrl()[$mol_keyboard_code[event.keyCode]]
                        : this.symbols_alt()[$mol_keyboard_code[event.keyCode]];
                if (!symbol)
                    return;
                event.preventDefault();
                document.execCommand('insertText', false, symbol);
            }
            clickable(next) {
                if (!this.enabled())
                    return true;
                return next ?? false;
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                if (event.altKey) {
                    this.symbol_insert(event);
                }
                else {
                    switch (event.keyCode) {
                        case !event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_inc();
                            break;
                        case event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_dec();
                            break;
                        default: return;
                    }
                    event.preventDefault();
                }
            }
            row_numb(index) {
                return index;
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_textarea.prototype, "clickable", null);
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tword-break: break-word;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n\tuser-select: none;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n\tuser-select: auto;\n}\n\n[mol_textarea_clickable] > [mol_textarea_edit] {\n\tuser-select: none;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.75rem;\n\twidth: calc( 100% - 1.75rem );\n}\n\n[mol_textarea_edit]:hover + [mol_textarea_view] {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_textarea_edit]:focus + [mol_textarea_view] {\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";


;
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Expander for trees, lists, etc
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_expand_demo
         */
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-inline-start: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-inline-start: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_grid) = class $mol_grid extends ($.$mol_view) {
		rows(){
			return [];
		}
		Table(){
			const obj = new this.$.$mol_grid_table();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		head_cells(){
			return [];
		}
		cells(id){
			return [];
		}
		cell_content(id){
			return [];
		}
		cell_content_text(id){
			return (this.cell_content(id));
		}
		cell_content_number(id){
			return (this.cell_content(id));
		}
		col_head_content(id){
			return [];
		}
		cell_level(id){
			return 0;
		}
		cell_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		needle(){
			return "";
		}
		cell_value(id){
			return "";
		}
		Cell_dimmer(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.needle()));
			(obj.haystack) = () => ((this.cell_value(id)));
			return obj;
		}
		row_height(){
			return 32;
		}
		row_ids(){
			return [];
		}
		row_id(id){
			return null;
		}
		col_ids(){
			return [];
		}
		records(){
			return {};
		}
		record(id){
			return null;
		}
		hierarchy(){
			return null;
		}
		hierarchy_col(){
			return "";
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.Head()), (this.Table())];
		}
		Head(){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.head_cells()));
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		cell(id){
			return null;
		}
		Cell_text(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ((this.cell_content_text(id)));
			return obj;
		}
		Cell_number(id){
			const obj = new this.$.$mol_grid_number();
			(obj.sub) = () => ((this.cell_content_number(id)));
			return obj;
		}
		Col_head(id){
			const obj = new this.$.$mol_float();
			(obj.dom_name) = () => ("th");
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		Cell_branch(id){
			const obj = new this.$.$mol_check_expand();
			(obj.level) = () => ((this.cell_level(id)));
			(obj.label) = () => ((this.cell_content(id)));
			(obj.expanded) = (next) => ((this.cell_expanded(id, next)));
			return obj;
		}
		Cell_content(id){
			return [(this.Cell_dimmer(id))];
		}
	};
	($mol_mem(($.$mol_grid.prototype), "Table"));
	($mol_mem_key(($.$mol_grid.prototype), "cell_expanded"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_dimmer"));
	($mol_mem(($.$mol_grid.prototype), "Head"));
	($mol_mem_key(($.$mol_grid.prototype), "Row"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_text"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_number"));
	($mol_mem_key(($.$mol_grid.prototype), "Col_head"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_branch"));
	($.$mol_grid_table) = class $mol_grid_table extends ($.$mol_list) {};
	($.$mol_grid_row) = class $mol_grid_row extends ($.$mol_view) {
		cells(){
			return [];
		}
		sub(){
			return (this.cells());
		}
	};
	($.$mol_grid_cell) = class $mol_grid_cell extends ($.$mol_view) {
		minimal_height(){
			return 40;
		}
	};
	($.$mol_grid_number) = class $mol_grid_number extends ($.$mol_grid_cell) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
            sub() {
                this.head_cells();
                this.rows();
                return super.sub();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 2px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 2px 0 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 2px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: end;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_link_iconed) = class $mol_link_iconed extends ($.$mol_link) {
		icon(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.icon()));
			(obj.title) = () => ("");
			return obj;
		}
		title(){
			return (this.uri());
		}
		sub(){
			return [(this.Icon())];
		}
		content(){
			return [(this.title())];
		}
		host(){
			return "";
		}
	};
	($mol_mem(($.$mol_link_iconed.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
                // return `https://api.faviconkit.com/${ this.host() }/16`
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri)?.replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content() ? [' ', ...this.content()] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1.5em;\n\twidth: 1em;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n\topacity: .75;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_native) = class $mol_embed_native extends ($.$mol_scroll) {
		uri(next){
			if(next !== undefined) return next;
			return "about:config";
		}
		title(){
			return "";
		}
		Fallback(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.uri()));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		uri_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		window(){
			return null;
		}
		attr(){
			return {...(super.attr()), "src": (this.uri())};
		}
		sub(){
			return [(this.Fallback())];
		}
		message(){
			return {"hashchange": (next) => (this.uri_change(next))};
		}
	};
	($mol_mem(($.$mol_embed_native.prototype), "uri"));
	($mol_mem(($.$mol_embed_native.prototype), "Fallback"));
	($mol_mem(($.$mol_embed_native.prototype), "uri_change"));


;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                this.uri_resource();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            sub_visible() {
                this.window();
                return super.sub_visible();
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmin-width: 0;\n\tmin-height: 0;\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n\tborder: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_youtube) = class $mol_icon_youtube extends ($.$mol_icon) {
		path(){
			return "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z";
		}
	};


;
"use strict";


;
	($.$mol_frame) = class $mol_frame extends ($.$mol_embed_native) {
		allow(){
			return "";
		}
		html(){
			return null;
		}
		attr(){
			return {
				"tabindex": (this.tabindex()), 
				"allow": (this.allow()), 
				"src": (this.uri()), 
				"srcdoc": (this.html())
			};
		}
		fullscreen(){
			return true;
		}
		accelerometer(){
			return true;
		}
		autoplay(){
			return true;
		}
		encription(){
			return true;
		}
		gyroscope(){
			return true;
		}
		pip(){
			return true;
		}
		clipboard_read(){
			return true;
		}
		clipboard_write(){
			return true;
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_frame_demo
         */
        class $mol_frame extends $.$mol_frame {
            window() {
                // if( this.html() ) return ( this.dom_node() as HTMLIFrameElement ).contentWindow!
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));

;
	($.$mol_embed_service) = class $mol_embed_service extends ($.$mol_check) {
		active(next){
			if(next !== undefined) return next;
			return false;
		}
		title(){
			return "";
		}
		video_preview(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_preview()));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_icon_youtube();
			return obj;
		}
		video_embed(){
			return "";
		}
		Frame(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_embed()));
			return obj;
		}
		uri(){
			return "";
		}
		video_id(){
			return "";
		}
		checked(next){
			return (this.active(next));
		}
		sub(){
			return [
				(this.Image()), 
				(this.Hint()), 
				(this.Frame())
			];
		}
	};
	($mol_mem(($.$mol_embed_service.prototype), "active"));
	($mol_mem(($.$mol_embed_service.prototype), "Image"));
	($mol_mem(($.$mol_embed_service.prototype), "Hint"));
	($mol_mem(($.$mol_embed_service.prototype), "Frame"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_service extends $.$mol_embed_service {
            sub() {
                return this.active()
                    ? [this.Frame()]
                    : [this.Image(), this.Hint()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_service.prototype, "sub", null);
        $$.$mol_embed_service = $mol_embed_service;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/service/service.view.css", "[mol_embed_service] {\n\tpadding: 0;\n\tmax-width: 100%;\n}\n\n[mol_embed_service_image] {\n\tflex: auto 1 1;\n\twidth: 100vw;\n}\n\n[mol_embed_service_frame] {\n\twidth: 100vw;\n}\n\n[mol_embed_service_hint] {\n\tposition: absolute;\n    left: 50%;\n    top: 50%;\n    width: 50%;\n    height: 50%;\n    opacity: 0.3;\n    transform: translate(-50%, -50%);\n}\n\n[mol_embed_service]:hover [mol_embed_service_hint] {\n\topacity: .6;\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_youtube) = class $mol_embed_youtube extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|shorts\/|watch\?v=)([^\/&?#]+)/)?.[1]
                    ?? this.uri().match(/^https\:\/\/youtu\.be\/([^\/&?#]+)/)?.[1]
                    ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi/${this.video_id()}/sddefault.jpg`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_rutube) = class $mol_embed_rutube extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_rutube extends $.$mol_embed_rutube {
            video_embed() {
                return `https://rutube.ru/play/embed/${encodeURIComponent(this.video_id())}`;
            }
            video_id() {
                return this.uri().match(/^https:\/\/rutube.ru\/video\/([^\/&?#]+)/)?.[1] ?? 'about:blank';
            }
            video_preview() {
                return `https://rutube.ru/api/video/${this.video_id()}/thumbnail/?redirect=1`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_preview", null);
        $$.$mol_embed_rutube = $mol_embed_rutube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_vklive) = class $mol_embed_vklive extends ($.$mol_embed_service) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_vklive extends $.$mol_embed_vklive {
            video_embed() {
                return `https://live.vkvideo.ru/app/embed/${this.channel_id()}/${this.video_id()}`;
            }
            channel_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/[^\/&?#]+\/record\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_preview() {
                return `https://images.live.vkvideo.ru/public_video_stream/record/${this.video_id()}/preview`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "channel_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_preview", null);
        $$.$mol_embed_vklive = $mol_embed_vklive;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_any) = class $mol_embed_any extends ($.$mol_view) {
		title(){
			return "";
		}
		uri(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Object(){
			const obj = new this.$.$mol_embed_native();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Youtube(){
			const obj = new this.$.$mol_embed_youtube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Rutube(){
			const obj = new this.$.$mol_embed_rutube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Vklive(){
			const obj = new this.$.$mol_embed_vklive();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
	};
	($mol_mem(($.$mol_embed_any.prototype), "Image"));
	($mol_mem(($.$mol_embed_any.prototype), "Object"));
	($mol_mem(($.$mol_embed_any.prototype), "Youtube"));
	($mol_mem(($.$mol_embed_any.prototype), "Rutube"));
	($mol_mem(($.$mol_embed_any.prototype), "Vklive"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/youtu\.be\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/rutube\.ru\//.test(uri))
                        return 'rutube';
                    if (/^https:\/\/live\.vkvideo\.ru\//.test(uri))
                        return 'vklive';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            sub() {
                switch (this.type()) {
                    case 'image': return [this.Image()];
                    case 'youtube': return [this.Youtube()];
                    case 'rutube': return [this.Rutube()];
                    case 'vklive': return [this.Vklive()];
                    default: return [this.Object()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.label) = () => ((this.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trigger()), (this.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Component which expands any content on title click.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_expander_demo
         */
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));

;
	($.$mol_text) = class $mol_text extends ($.$mol_list) {
		auto_scroll(){
			return null;
		}
		block_content(id){
			return [];
		}
		uri_resolve(id){
			return "";
		}
		quote_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		list_type(id){
			return "-";
		}
		list_text(id){
			return "";
		}
		header_level(id){
			return 1;
		}
		header_arg(id){
			return {};
		}
		pre_text(id){
			return "";
		}
		pre_themes(id){
			return [];
		}
		code_sidebar_showed(){
			return true;
		}
		pre_sidebar_showed(){
			return (this.code_sidebar_showed());
		}
		table_head_cells(id){
			return [];
		}
		table_rows(id){
			return [];
		}
		table_cells(id){
			return [];
		}
		table_cell_text(id){
			return "";
		}
		grid_rows(id){
			return [];
		}
		grid_cells(id){
			return [];
		}
		grid_cell_text(id){
			return "";
		}
		line_text(id){
			return "";
		}
		line_type(id){
			return "";
		}
		line_content(id){
			return [];
		}
		code_syntax(){
			return null;
		}
		link_uri(id){
			return "";
		}
		link_host(id){
			return "";
		}
		spoiler_label(id){
			return "";
		}
		Spoiler_label(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_label(id)));
			return obj;
		}
		spoiler_content(id){
			return "";
		}
		Spoiler_content(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_content(id)));
			return obj;
		}
		uri_base(){
			return "";
		}
		text(){
			return "";
		}
		param(){
			return "";
		}
		flow_tokens(){
			return [];
		}
		block_text(id){
			return "";
		}
		auto(){
			return [(this.auto_scroll())];
		}
		Paragraph(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
		Quote(id){
			const obj = new this.$.$mol_text();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.quote_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.auto_scroll) = () => (null);
			return obj;
		}
		List(id){
			const obj = new this.$.$mol_text_list();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.type) = () => ((this.list_type(id)));
			(obj.text) = () => ((this.list_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		item_index(id){
			return 0;
		}
		Header(id){
			const obj = new this.$.$mol_text_header();
			(obj.minimal_height) = () => (40);
			(obj.level) = () => ((this.header_level(id)));
			(obj.content) = () => ((this.block_content(id)));
			(obj.arg) = () => ((this.header_arg(id)));
			return obj;
		}
		Pre(id){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.pre_text(id)));
			(obj.row_themes) = () => ((this.pre_themes(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.sidebar_showed) = () => ((this.pre_sidebar_showed()));
			return obj;
		}
		Cut(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("hr");
			return obj;
		}
		Table(id){
			const obj = new this.$.$mol_grid();
			(obj.head_cells) = () => ((this.table_head_cells(id)));
			(obj.rows) = () => ((this.table_rows(id)));
			return obj;
		}
		Table_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.table_cells(id)));
			return obj;
		}
		Table_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.table_cell_text(id)));
			return obj;
		}
		Grid(id){
			const obj = new this.$.$mol_grid();
			(obj.rows) = () => ((this.grid_rows(id)));
			return obj;
		}
		Grid_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.grid_cells(id)));
			return obj;
		}
		Grid_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.grid_cell_text(id)));
			return obj;
		}
		String(id){
			const obj = new this.$.$mol_dimmer();
			(obj.dom_name) = () => ("span");
			(obj.needle) = () => ((this.highlight()));
			(obj.haystack) = () => ((this.line_text(id)));
			return obj;
		}
		Span(id){
			const obj = new this.$.$mol_text_span();
			(obj.dom_name) = () => ("span");
			(obj.type) = () => ((this.line_type(id)));
			(obj.sub) = () => ((this.line_content(id)));
			return obj;
		}
		Code_line(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => (false);
			(obj.highlight) = () => ((this.highlight()));
			(obj.text) = () => ((this.line_text(id)));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.syntax) = () => ((this.code_syntax()));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ((this.line_content(id)));
			return obj;
		}
		Link_http(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ([(this.link_host(id))]);
			return obj;
		}
		Embed(id){
			const obj = new this.$.$mol_embed_any();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.title) = () => ((this.line_text(id)));
			return obj;
		}
		Spoiler(id){
			const obj = new this.$.$mol_expander();
			(obj.label) = () => ([(this.Spoiler_label(id))]);
			(obj.content) = () => ([(this.Spoiler_content(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_label"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_content"));
	($mol_mem_key(($.$mol_text.prototype), "Paragraph"));
	($mol_mem_key(($.$mol_text.prototype), "Quote"));
	($mol_mem_key(($.$mol_text.prototype), "List"));
	($mol_mem_key(($.$mol_text.prototype), "Header"));
	($mol_mem_key(($.$mol_text.prototype), "Pre"));
	($mol_mem_key(($.$mol_text.prototype), "Cut"));
	($mol_mem_key(($.$mol_text.prototype), "Table"));
	($mol_mem_key(($.$mol_text.prototype), "Table_row"));
	($mol_mem_key(($.$mol_text.prototype), "Table_cell"));
	($mol_mem_key(($.$mol_text.prototype), "Grid"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_row"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_cell"));
	($mol_mem_key(($.$mol_text.prototype), "String"));
	($mol_mem_key(($.$mol_text.prototype), "Span"));
	($mol_mem_key(($.$mol_text.prototype), "Code_line"));
	($mol_mem_key(($.$mol_text.prototype), "Link"));
	($mol_mem_key(($.$mol_text.prototype), "Link_http"));
	($mol_mem_key(($.$mol_text.prototype), "Embed"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler"));
	($.$mol_text_header) = class $mol_text_header extends ($.$mol_paragraph) {
		arg(){
			return {};
		}
		content(){
			return [];
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_header_Link_hint")));
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		level(){
			return 1;
		}
		sub(){
			return [(this.Link())];
		}
	};
	($mol_mem(($.$mol_text_header.prototype), "Link"));
	($.$mol_text_span) = class $mol_text_span extends ($.$mol_paragraph) {
		type(){
			return "";
		}
		dom_name(){
			return "span";
		}
		attr(){
			return {...(super.attr()), "mol_text_type": (this.type())};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Markdown visualizer.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_demo
         */
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'spoiler': return this.Spoiler(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        case 'grid': return this.Grid(index);
                        case 'cut': return this.Cut(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?[\)>]\./, '').replace(/[(<>)]/g, '');
            }
            header_level(index) {
                return this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.block_text(index)
                };
            }
            list_type(index) {
                return this.flow_tokens()[index].chunks[1] ?? '';
            }
            item_index(index) {
                return this.flow_tokens().slice(0, index).filter(token => token.name === 'block').length + 1;
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t| (?:\+\+|--|\*\*|  ) )/gm, '')).replace(/[\n\r]*$/, '');
            }
            pre_themes(index) {
                const token = this.flow_tokens()[index];
                const names = {
                    ' ** ': '$mol_theme_accent',
                    ' ++ ': '$mol_theme_current',
                    ' -- ': '$mol_theme_special',
                };
                return token.chunks[0].split('\n')
                    .map(line => names[line.match(/^ (?:\+\+|--|\*\*|  ) /gm)?.[0] ?? ''] ?? null);
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[>"] /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+]|(?:\d+[\.\)])+) ?/mg, '').replace(/^  ?/mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            grid_content(indexBlock) {
                return [...this.flow_tokens()[indexBlock].chunks[0].match(/(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm)]
                    .map((row, rowId) => {
                    const cells = [];
                    for (const line of row.trim().split(/\r?\n/)) {
                        const [_, indent, content] = /^( *)! (.*)/.exec(line);
                        const col = Math.ceil(indent.length / 2);
                        cells[col] = (cells[col] ? cells[col] + '\n' : '') + content;
                    }
                    return cells;
                });
            }
            grid_rows(blockId) {
                return this.grid_content(blockId)
                    .map((row, rowId) => this.Grid_row({ block: blockId, row: rowId }));
            }
            grid_cells(id) {
                return this.grid_content(id.block)[id.row]
                    .map((cell, cellId) => this.Grid_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            grid_cell_text(id) {
                return this.grid_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_base_abs() {
                return new URL(this.uri_base(), $mol_dom_context.document.location.href);
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                if (/^#\!/.test(uri)) {
                    const params = {};
                    for (const chunk of uri.slice(2).split(this.$.$mol_state_arg.separator)) {
                        if (!chunk)
                            continue;
                        const vals = chunk.split('=').map(decodeURIComponent);
                        params[vals.shift()] = vals.join('=');
                    }
                    return this.$.$mol_state_arg.link(params);
                }
                try {
                    const url = new URL(uri, this.uri_base_abs());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            code_syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    case 'link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    case 'text-link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    default: return (chunks[0] || chunks[1] || chunks[2]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'embed': return this.Embed(path2);
                        case 'link': return this.Link(path2);
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
            spoiler_rows(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[\?] /mg, '').split('\n');
            }
            spoiler_label(index) {
                return this.spoiler_rows(index)[0];
            }
            spoiler_content(index) {
                return this.spoiler_rows(index).slice(1).join('\n');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_themes", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cell_text", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "uri_base_abs", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_label", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_content", null);
        $$.$mol_text = $mol_text;
        class $mol_text_header extends $.$mol_text_header {
            dom_name() {
                return 'h' + this.level();
            }
        }
        $$.$mol_text_header = $mol_text_header;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\toverflow-x: overlay;\n\tmax-width: 100%;\n\tdisplay: block;\n\tmax-width: 60rem;\n\tbreak-inside: avoid;\n}\n\n[mol_text_spoiler_label_paragraph] {\n\tpadding: 0;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n\tbreak-inside: avoid;\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n\tbreak-after: avoid;\n\tletter-spacing: 2px;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_table] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_grid] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_grid_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: top;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_cut] {\n\tborder: none;\n\twidth: 100%;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_icon] + [mol_text_embed] {\n\tmargin-inline-start: -1.5rem;\n}\n\n[mol_text_embed_youtube] {\n\tdisplay: inline;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\t/* max-height: calc( 100vh - 6rem ); */\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\toverflow-x: overlay;\n\ttab-size: 2;\n\tbreak-inside: avoid;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tfilter: contrast(1.5);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"insert\"] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"delete\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));

;
	($.$mol_text_list) = class $mol_text_list extends ($.$mol_text) {
		type(){
			return "";
		}
		auto_scroll(){
			return null;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_type": (this.type())};
		}
		Paragraph(id){
			const obj = new this.$.$mol_text_list_item();
			(obj.index) = () => ((this.item_index(id)));
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text_list.prototype), "Paragraph"));
	($.$mol_text_list_item) = class $mol_text_list_item extends ($.$mol_paragraph) {
		index(){
			return 0;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_item_index": (this.index())};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/list/list.view.css", "[mol_text_list] {\n\tpadding-inline-start: 1.75rem;\n}\n\n[mol_text_list_item] {\n\tcontain: none;\n\tdisplay: list-item;\n}\n\n[mol_text_list_item]::before {\n\tcontent: attr( mol_text_list_item_index ) \".\";\n\twidth: 1.25rem;\n\tdisplay: inline-block;\n\tposition: absolute;\n\tmargin-inline-start: -1.75rem;\n\ttext-align: end;\n}\n\n[mol_text_list_type=\"-\"] > [mol_text_list_item]::before,\n[mol_text_list_type=\"*\"] > [mol_text_list_item]::before {\n\tcontent: \"•\";\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$raggu_web_front_chat) = class $raggu_web_front_chat extends ($.$bog_builderui_div) {
		is_empty(){
			return false;
		}
		Empty(){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_empty": (this.is_empty())});
			(obj.sub) = () => ([(this.empty_text())]);
			return obj;
		}
		Messages(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		is_communicating(){
			return false;
		}
		Skel_line_one(){
			const obj = new this.$.$bog_builderui_skeleton();
			return obj;
		}
		Skel_line_two(){
			const obj = new this.$.$bog_builderui_skeleton();
			return obj;
		}
		Skel_line_three(){
			const obj = new this.$.$bog_builderui_skeleton();
			return obj;
		}
		Status(){
			const obj = new this.$.$bog_builderui_card();
			(obj.attr) = () => ({...(this.$.$bog_builderui_card.prototype.attr.call(obj)), "raggu_loading": (this.is_communicating())});
			(obj.sub) = () => ([
				(this.Skel_line_one()), 
				(this.Skel_line_two()), 
				(this.Skel_line_three())
			]);
			return obj;
		}
		Body_flow(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Empty()), 
				(this.Messages()), 
				(this.Status())
			]);
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Body_flow())]);
			return obj;
		}
		suggestion_rows(){
			return [];
		}
		Suggestions(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.suggestion_rows()));
			return obj;
		}
		prompt_text(next){
			if(next !== undefined) return next;
			return "";
		}
		prompt_submit(next){
			if(next !== undefined) return next;
			return null;
		}
		prompt_press(next){
			if(next !== undefined) return next;
			return null;
		}
		Prompt(){
			const obj = new this.$.$mol_textarea();
			(obj.hint) = () => ((this.input_hint_text()));
			(obj.value) = (next) => ((this.prompt_text(next)));
			(obj.submit) = (next) => ((this.prompt_submit(next)));
			(obj.press) = (next) => ((this.prompt_press(next)));
			return obj;
		}
		Input_send(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.send_label_text()));
			(obj.click) = (next) => ((this.prompt_submit(next)));
			(obj.sub) = () => (["↑"]);
			return obj;
		}
		Input_row(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Prompt()), (this.Input_send())]);
			return obj;
		}
		Footer(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Suggestions()), (this.Input_row())]);
			return obj;
		}
		sug_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		clear_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Message_text(id){
			const obj = new this.$.$mol_text();
			(obj.render_visible_only) = () => (false);
			(obj.attr) = () => ({...(this.$.$mol_text.prototype.attr.call(obj)), "raggu_role": (this.message_role(id))});
			(obj.text) = () => ((this.message_text(id)));
			return obj;
		}
		Message_badge(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_off_graph": (this.message_off_graph(id))});
			(obj.sub) = () => ([(this.off_graph_text())]);
			return obj;
		}
		engine(){
			return "mix";
		}
		use_query_plan(){
			return false;
		}
		dataset_id(){
			return "";
		}
		input_hint_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_input_hint_text"));
		}
		send_label_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_send_label_text"));
		}
		clear_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_clear_text"));
		}
		off_graph_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_off_graph_text"));
		}
		empty_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_empty_text"));
		}
		sug_law_one_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_law_one_text"));
		}
		sug_law_two_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_law_two_text"));
		}
		sug_law_three_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_law_three_text"));
		}
		sug_wiki_one_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_wiki_one_text"));
		}
		sug_wiki_two_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_wiki_two_text"));
		}
		sug_wiki_three_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_wiki_three_text"));
		}
		sug_any_one_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_any_one_text"));
		}
		sug_any_two_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_any_two_text"));
		}
		sug_any_three_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_chat_sug_any_three_text"));
		}
		rows(){
			return [];
		}
		sug_text(id){
			return "";
		}
		message_text(id){
			return "";
		}
		message_role(id){
			return "";
		}
		message_off_graph(id){
			return false;
		}
		sub(){
			return [(this.Body()), (this.Footer())];
		}
		Sug(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.sug_text(id))]);
			(obj.event) = () => ({"click": (next) => (this.sug_click(id, next))});
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.clear_text()));
			(obj.click) = (next) => ((this.clear_click(next)));
			(obj.sub) = () => (["✕"]);
			return obj;
		}
		Message(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.attr) = () => ({...(this.$.$bog_builderui_div.prototype.attr.call(obj)), "raggu_role": (this.message_role(id))});
			(obj.sub) = () => ([(this.Message_text(id)), (this.Message_badge(id))]);
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_chat.prototype), "Empty"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Messages"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Skel_line_one"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Skel_line_two"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Skel_line_three"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Status"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Body_flow"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Suggestions"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "prompt_text"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "prompt_submit"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "prompt_press"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Prompt"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Input_send"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Input_row"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Footer"));
	($mol_mem_key(($.$raggu_web_front_chat.prototype), "sug_click"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "clear_click"));
	($mol_mem_key(($.$raggu_web_front_chat.prototype), "Message_text"));
	($mol_mem_key(($.$raggu_web_front_chat.prototype), "Message_badge"));
	($mol_mem_key(($.$raggu_web_front_chat.prototype), "Sug"));
	($mol_mem(($.$raggu_web_front_chat.prototype), "Clear"));
	($mol_mem_key(($.$raggu_web_front_chat.prototype), "Message"));


;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for record of given fields with by its runtypes and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_record_demo
     */
    function $mol_data_record(sub) {
        return $mol_data_setup((val) => {
            let res = {};
            for (const field in sub) {
                try {
                    res[field] =
                        sub[field](val[field]);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${JSON.stringify(field)}] ${error.message}`;
                    return $mol_fail(error);
                }
            }
            return res;
        }, sub);
    }
    $.$mol_data_record = $mol_data_record;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for equality to given value and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_const_demo
     */
    function $mol_data_const(ref) {
        return $mol_data_setup((val) => {
            if ($mol_compare_deep(val, ref))
                return ref;
            return $mol_fail(new $mol_data_error(`${JSON.stringify(val)} is not ${JSON.stringify(ref)}`));
        }, ref);
    }
    $.$mol_data_const = $mol_data_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for string and returns string type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_string_demo
     */
    $.$mol_data_string = (val) => {
        if (typeof val === 'string')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a string`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for some of given runtype or throws error.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_variant_demo
     */
    function $mol_data_variant(...sub) {
        return $mol_data_setup((val) => {
            const errors = [];
            for (const type of sub) {
                let hidden = $.$mol_fail_hidden;
                try {
                    $.$mol_fail = $.$mol_fail_hidden;
                    return type(val);
                }
                catch (error) {
                    $.$mol_fail = hidden;
                    if (error instanceof $mol_data_error) {
                        errors.push(error);
                    }
                    else {
                        return $mol_fail_hidden(error);
                    }
                }
            }
            return $mol_fail(new $mol_data_error(`${val} is not any of variants`, {}, ...errors));
        }, sub);
    }
    $.$mol_data_variant = $mol_data_variant;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for array of given runtype and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_array_demo
     */
    function $mol_data_array(sub) {
        return $mol_data_setup((val) => {
            if (!Array.isArray(val))
                return $mol_fail(new $mol_data_error(`${val} is not an array`));
            return val.map((item, index) => {
                try {
                    return sub(item);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${index}] ${error.message}`;
                    return $mol_fail(error);
                }
            });
        }, sub);
    }
    $.$mol_data_array = $mol_data_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for null or passing given runtype.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_nullable_demo
     */
    function $mol_data_nullable(sub) {
        return $mol_data_setup((val) => {
            if (val === null)
                return null;
            return sub(val);
        }, sub);
    }
    $.$mol_data_nullable = $mol_data_nullable;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for undefined or passing given runtype.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_optional_demo
     */
    function $mol_data_optional(sub, fallback) {
        return $mol_data_setup((val) => {
            if (val === undefined) {
                return fallback?.();
            }
            return sub(val);
        }, { sub, fallback });
    }
    $.$mol_data_optional = $mol_data_optional;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_shuffle(array) {
        const res = new Array(array.length);
        for (let i = 0; i < res.length; ++i) {
            const j = Math.floor(Math.random() * (i + 1));
            if (i !== j)
                res[i] = res[j];
            res[j] = array[i];
        }
        return res;
    }
    $.$mol_array_shuffle = $mol_array_shuffle;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_array_shuffle_sync = $mol_wire_sync($mol_array_shuffle);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // Make new tokens: https://github.com/settings/personal-access-tokens/new?name=$mol_github_model&user_models=read
    $.$mol_github_model_keys = [
        '11AADME3A07jh1teLjee8r_O7MKyAF8rbdIlhk4OwsJHaCnh4CjDNxn1nLNAvW2Hy6OSTIYABWQyp0rOHt',
        '11AADME3A0q6w8EFz9G9aa_byqEpTuWUa63PKoSAwN1eVi2GyGJ4SxYhm9OhAc2DCTANK2ULBQpQgUu6D9',
        '11AADME3A0RsfJpmuZfl4r_Nw6G3v7vDgnrqDxmlgF6Gyj9YawDfTqatNUxhwPjzWwYYGIORGETiUtMOmR',
        '11AADME3A0meTYzVZaOtJF_LrdN2tIDycZHDBN3560V3S2ZWpo07uATZON0XUYF2ZFFC3X2OHSwdUcVfUe',
        '11AADME3A0myGzFwrNHkV0_InRujMNsqM7cLUWDvKCW5GRy2waC7fHXuSJdzW0mrwvX7VP4I2MoGXRXF6w',
        '11AADME3A0LF4GM8Qam5xH_LFLHQqgcmudC8eyKLEqc4l5xDPcplSxAcEA3j8BO4MYTAE6FOROqFIuhGfR',
        '11AADME3A0KUqaRrYVSMzf_rYLJd83byQ1HN8KOIzVnHPBvW6VPei911NJgPucm1hRETR55VB3mdyw2ezI',
        '11AADME3A0exOKaaQLYR2b_2JKJDHVAWxoqRPlGcugBHNapcZWT9awRic8iBmgOirXRVC5X7ILtz6KDffv',
        '11AADME3A071WbELDi8THV_v3dkQtbYpSGjUXeWT6dAiPBf5a5b0KDr0E029T6P4CsZOOYO3DPpopBkodL',
        '11AADME3A0L5oFWUKk62fr_Dcbcn1ZcNBwWaLfbHzlgueGcxBEO5FoOieoowhJ6Q1zIWIIYZBG7XI16O4H',
        '11ABRVBSY0f8VzkzaCnFmy_PMfBlJqT7DuvxfzbYRUlLOZJenEqBvNpGP7uQKCDOaO6ZKS4DFCG0qYxy2I',
        '11ABRVBSY0no18F8ngCYoa_60v1HSbYVeEZ2d3tf1ix2Kq7G8ZRYaFFiHImNxERTkqJ5CWMQ6VmjH7ic86',
        '11ABRVBSY0acYIFJ0b9cAV_0wPJI2JxZgLYasswZjIUMQqxnYcRAUEG68xtsh9uQtNZDYU37IS5GBobX8v',
        '11ABRVBSY0KhLO9yDqoqMM_B328qDB5kCHqgAJNw3q1MW48gHQ9XYAnnRQFlXkE1MQGX3S5TOK6k4od8C8',
        '11ABRVBSY04TXJfmvdflXC_o9UQLVNWbPWzaqaaZll9fFn9QLAZotSwi18clpeaaYkTQEHQSW3yvrSAsCb',
        '11ABRVBSY0n7osgrVkUT0l_PQadBMEjSXLOGZGwuu5wVXydSnwxboWUAxAIdXgXP9hRVQOKM5UNsJaKk0M',
        '11ABRVBSY0Zctkh9fg9Cpl_nqCk5TSio22hgtvAWqYzGvlsfaIH9e66ery772pkCW0C7EJA7HJrPGxIYQy',
        '11ABRVBSY0XbD5DK094oOY_8mmeflfbf4mu48bWk7OFQvrxxPXp5gFCxO5PUokPwsw2LZRC6DZSujLHCVt',
        '11ABRVBSY0AGZyClxdqZDx_gseo5RI9HKRPvlQtRFmmR5An2jaRna9glpzv40wi7MZCCCDAVIWk3l1Nwp9',
        '11ABRVBSY0SvjU9l1d7DXU_LOZfXdIZuupZCmu1FA4NGUOy572G8ZJ6pzYyzu9RsWfG7HLRMLYIIIE54Mp',
        '11AACDCYQ0R6jhkMIx4zY4_OlEwnePW3UFhkNsJuyAweBPsHtqlhBW7WD69mWjuuYTTAYOTX7KL4WK1Yg7',
        '11AACDCYQ0Ai0LkLKrp9kE_D10SuqSODWeGWvA4Rgux6ZXs2AEwl3IqpElNGRI7JG0ZIGVKV5RaUDAchxe',
        '11AACDCYQ0c94yhWtZq2HX_YFms0ToLulxGTnr80ndTsHZIOfNMl8QdLmoKL75fZ3oK6JN3NOKsnxMZ1qu',
        '11AACDCYQ0DkrjD2bmmKpL_PcrQXvrbiEnJl0oazFx70p9wdCXd2rP5DhazexPAcygLGKIOQRXeeCXsP7B',
        '11AACDCYQ0IMIYCLcX3xrO_901enZ0EKxk48giaCI7vkIHZgdOpqrvPyHiF4t02klvCLI7OVRE3uqJ3PKf',
        '11AACDCYQ0WIjNWbjdJclE_KKiTwAIGNcbpPIO6SJfBxbuUVixxug7QH5KPRcMXAYv3ZOROGOVFvj4GzzG',
        '11AACDCYQ0tKWudX3T6T6l_wGiLSmI6aYR7Wf5ZXFukZdPuUL7lpGpBIzkm8CSxcaoJQT7GDAU2PtnWWDj',
        '11AACDCYQ0Ocm4JD37TfHG_0KPjGl3ucMm4ozREvzF1QNY3UECaZNh3SiY49AUzJgGNITGLVH2LdHhz7PT',
        '11AACDCYQ0R5HgcrZOxDwc_dgCK0jETB27GYYCmh1YMfdE5dPuLNZ1DLiIDi2tQnr0IGUX5WFRNa9oTaSw',
        '11AZC2M3A02nw2Q86BPmYQ_yl2RFA1RXRuEVWU0ufTjBXl12SvUWyeZxZ9cbZRuind6QWI65J4tXbAfF2p',
        '11AZC2M3A0gcGTDvExPjEL_m1itogjz24QDTxT0zJTpDJmyZ3sSKO1UXapXfw7q0BLMUIOXP3SB7zRfavu',
        '11AZC2M3A0Y1oDGiEjDZ1g_t5ry6SPyckVwZvBQvBke09QbNMF8rG1TXdcops2BiDmKDYKOOCV58edg7VY',
        '11AZC2M3A00bI3vc5JPaA2_MZGbctgtp5KEdBD2dYVW7MaQ2Fqiw8UrIpHKZp8xnczJGHTTJQPa9QxXjrc',
        '11AZC2M3A0fGlQkvashsda_CuaNQlzrajBrj82VlUzZQ67Qgq9X3QudJ9S3SM3wnzvNIQRQARZoClezK3C',
        '11AZC2M3A06Zat4wc9fotV_0gdnr4cGXfzD2wTkBIr5QYyj3ErxgMcHJerQb81AtnqBSYKBHIEzBXbqzQr',
        '11AZC2M3A0V1JUeQY0eOov_rrWyENLMO5Sxa4IEPbZMLippdb8TQi531bmfJQBBaCfQHIC5PQFFwUp49DW',
        '11AZC2M3A0G89rDbsh2k20_l6kEuOm10kV86RGIp1s5wQ1n6kLe0WFgeCHLthnGNSyDSIBNNC6Q7kjGrem',
        '11AZC2M3A0tAUQ7dX2dnaI_hvDm1d0lxDpHXkYx1khtJyidfjREBvg2qssXurwxihAHBEMII5T7l5WrXI9',
        '11AZC2M3A0VPRCdsbErhom_W0wrECR4sbXQZLlG966rsb1G65pOXJGbk4uaV0zUNpMZPDBW5DSTZyRTCJy',
        '11AZC2M3A06fZVQGXETeaM_KIU5iEeb6UtpBrGZMOG6kQc1r32A5Xh1uxAMdmZRwkHICW2HJMAHcv236fa',
        '11AZC2M3A0QyPnQfDarLu5_x6eKghOwMB3yX2KPPVGvD3PKKuY5QiK7gJ4eoPiYCSwOBQVU2P6EOzN75xf',
        '11AZC2M3A0VW9BdSxec56G_P3YnEAFXcC7IMauK8nhxHwFNS09AgIisAuy9Kft19o2LAHR5RXQyMHIl9yQ',
        '11AZC2M3A0P4o9D1flcC0S_f2NS5FSSogJoFsocKShuv4m7ghDBamKRgPvPqACGEejJRU2BBE2gymGHhk1',
        '11AZC2M3A0cI704OJ5EVfc_8c1ggPeodHoWEY8lMHH9cvKLGyGvGbgzW7tr4V7E5ITT7RDCHJYzNZoXxGF',
        '11AZC2M3A0yFNB07z5VFbp_RtEMVMcdKpfFgn0ls2v3hlcJDsIs6v7e64TXSW2muOK5RPKAJ3WxdZS2vzT',
        '11AZC2M3A06KL2qd1GmlIB_a7tt0VJaKLybMxJLdJ6JPk6iBgNaECXJsFd5FyCl4nSSQT3QSG4ETLYFOwj',
        '11AZC2M3A0Ui6RqKCiBn6X_6S4OnreMp6Au5JSRwfcWop1SiHV9ooFsBHhYkFEiErAQYHDENGGzLmL1aD9',
        '11AZC2M3A0hk74xKy52Egx_jYVCEjt9jpT2peCB0qT7JrnSX1a075ZASxKTzaV3KeqTTV5A7SRNxkaElKn',
        '11AZC2M3A021XEPByvPlBg_rKr4RNMcfeflEKrL5qGxDieXMKLlf4S6FWvtUUzIYaoOK63JXVBv8XPAfi5',
        '11AZC2M3A0yK6fYUgjj79M_5yu4OE4RdeFk8IoY3kcOC1xemTvjB1B8tOzA1KPmqQSX37EDQIOIuRjf9jF',
    ].map(str => `github_pat_${str}`);
    $.$mol_github_model_polyglots = [
        // 'openai/gpt-4.1', // 50/D too slow
        // 'openai/gpt-4o', // 50/D bad resp
        'openai/gpt-4.1-mini', // 150/D
        // 'openai/gpt-4o-mini', // 150/D bad resp
        // 'openai/gpt-4.1-nano', // 150/D bad resp
    ];
    const Text = $mol_data_record({
        type: $mol_data_const('text'),
        text: $mol_data_string,
    });
    const Image = $mol_data_record({
        type: $mol_data_const('image_url'),
        image_url: $mol_data_record({
            url: $mol_data_string,
        }),
    });
    const Content_item = $mol_data_variant(Text, Image);
    const Content = $mol_data_variant($mol_data_string, $mol_data_array(Content_item));
    const System = $mol_data_record({
        role: $mol_data_const('system'),
        content: Content,
    });
    const Assistant = $mol_data_record({
        role: $mol_data_const('assistant'),
        content: $mol_data_nullable(Content),
        tool_calls: $mol_data_optional($mol_data_array($mol_data_record({
            type: $mol_data_const('function'),
            id: $mol_data_string,
            function: $mol_data_record({
                name: $mol_data_string,
                arguments: $mol_data_string,
            }),
        }))),
    });
    const User = $mol_data_record({
        role: $mol_data_const('user'),
        content: Content,
    });
    const Tool = $mol_data_record({
        role: $mol_data_const('tool'),
        // name: $mol_data_string,
        tool_call_id: $mol_data_string,
        content: Content,
    });
    const Message = $mol_data_variant(System, Assistant, User, Tool);
    const Resp = $mol_data_record({
        choices: $mol_data_array($mol_data_record({
            message: Assistant,
        })),
    });
    const RespFail = $mol_data_record({
        error: $mol_data_record({
            message: $mol_data_string,
        }),
    });
    function bloat_content(val) {
        if (typeof val !== 'string')
            val = JSON.stringify(val);
        else if (val.startsWith('data:'))
            return { type: 'image_url', image_url: { url: val } };
        return { type: 'text', text: val };
    }
    /**
     * Github hosted LLM API.
     */
    class $mol_github_model extends $mol_object {
        // STATIC STATE
        /** Model names from https://github.com/marketplace/models */
        names() {
            return this.$.$mol_github_model_polyglots;
        }
        /** System rules */
        rules() {
            return '';
        }
        /** List of callable functions */
        tools() {
            return new Map();
        }
        // DYNAMIC STATE
        /** Actual system state */
        state(next) {
            $mol_wire_solid();
            return next ?? [];
        }
        /** Additional model query params */
        params(next) {
            $mol_wire_solid();
            return next ?? {};
        }
        /** Dialog history */
        history(next) {
            $mol_wire_solid();
            return next ?? [];
        }
        // ACTIONS
        /** Independent copy of current state. */
        fork() {
            const fork = $mol_github_model.make({
                // static state
                names: $mol_const(this.names()),
                rules: $mol_const(this.rules()),
                tools: $mol_const(this.tools()),
                state: () => this.state(),
            });
            // dynamic state
            fork.params(this.params());
            fork.history(this.history());
            return fork;
        }
        /** One-shot stateless prompting */
        shot(prompt, context, params) {
            const fork = this.fork();
            if (params)
                fork.params({ ...this.params(), ...params });
            if (context)
                fork.tell(context);
            fork.ask(prompt);
            return fork.response();
        }
        /** Add user prompt */
        ask(chunks) {
            this.history([
                ...this.history(),
                {
                    role: "user",
                    content: chunks.map(bloat_content),
                }
            ]);
            return this;
        }
        /** Add assistant context */
        tell(chunks) {
            this.history([
                ...this.history(),
                {
                    role: "assistant",
                    content: chunks.map(bloat_content),
                }
            ]);
            return this;
        }
        /** Add tools answer */
        answer(id, chunks) {
            const history = this.history();
            const index = 1 + history.findIndex(msg => msg.role === 'tool' && msg.tool_call_id === id);
            if (!index)
                this.$.$mol_fail(new Error('Wrong tool call id', { cause: id }));
            this.history([
                ...history.slice(0, index),
                {
                    role: "tool",
                    tool_call_id: id,
                    content: chunks.map(bloat_content),
                },
                ...history.slice(index),
            ]);
            return this;
        }
        // INFERENCE
        request_body(model) {
            return JSON.stringify({
                model,
                stream: false,
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: this.rules() },
                    ...this.history(),
                    { role: 'system', content: this.state().map(bloat_content) },
                ],
                tools: [...this.tools()].map(([name, info]) => ({
                    type: "function",
                    function: {
                        name,
                        description: info.descr,
                        strict: true,
                        parameters: info.params,
                    },
                })),
                ...this.params(),
            });
        }
        request(model, key) {
            return Resp(this.$.$mol_fetch.json(`https://models.github.ai/inference/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + key,
                    'Content-Type': 'application/json',
                },
                body: this.request_body(model)
            }));
        }
        /** Last response from LLM */
        response() {
            const history = this.history();
            const last = history.at(-1);
            if (last?.role !== 'user')
                return null;
            const models = this.$.$mol_array_shuffle_sync(this.names());
            const keys = this.$.$mol_array_shuffle_sync($.$mol_github_model_keys);
            for (const model of models)
                for (const key of keys) {
                    try {
                        const resp = this.request(model, key);
                        const message = resp.choices[0].message;
                        this.history([...history, message]);
                        if (typeof message.content === 'string')
                            return JSON.parse(message.content);
                        return message.content;
                    }
                    catch (error) {
                        const resp = error.cause;
                        if (!resp)
                            return $mol_fail_hidden(error);
                        if (resp.code() === 429)
                            continue; // rate limit
                        if (resp.code() === 400) {
                            const message = RespFail(resp.json()).error.message;
                            this.history([...history, { role: 'system', content: '📛 ' + message }]);
                            $mol_fail(new Error(message));
                        }
                        $mol_fail_hidden(error);
                    }
                }
            return this.$.$mol_fail(new Error('No alive token'));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_github_model.prototype, "names", null);
    __decorate([
        $mol_memo.method
    ], $mol_github_model.prototype, "tools", null);
    __decorate([
        $mol_mem
    ], $mol_github_model.prototype, "state", null);
    __decorate([
        $mol_mem
    ], $mol_github_model.prototype, "params", null);
    __decorate([
        $mol_mem
    ], $mol_github_model.prototype, "history", null);
    __decorate([
        $mol_action
    ], $mol_github_model.prototype, "fork", null);
    __decorate([
        $mol_action
    ], $mol_github_model.prototype, "shot", null);
    __decorate([
        $mol_action
    ], $mol_github_model.prototype, "ask", null);
    __decorate([
        $mol_action
    ], $mol_github_model.prototype, "tell", null);
    __decorate([
        $mol_action
    ], $mol_github_model.prototype, "answer", null);
    __decorate([
        $mol_mem_key
    ], $mol_github_model.prototype, "request_body", null);
    __decorate([
        $mol_mem
    ], $mol_github_model.prototype, "response", null);
    $.$mol_github_model = $mol_github_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Тонкая обёртка над трекером Umami.
     *
     * Зачем она нужна отдельно, а не вызовы `umami.track()` по месту:
     *
     * 1. Трекера может не быть — локальная разработка, блокировщик рекламы,
     *    отсутствие сети у стенда. Аналитика не тот повод, чтобы ронять UI,
     *    поэтому здесь всё молча превращается в no-op.
     * 2. $mol маршрутизирует хешем (`#!screen=chat/ds=medical`), а не путём.
     *    Автотрекинг Umami считает переходы по смене пути, поэтому все экраны
     *    склеились бы в один просмотр `/web/`. Экранные просмотры отправляем
     *    руками — см. `pageview`.
     */
    function umami() {
        return $mol_dom_context.umami ?? null;
    }
    /** Просмотр экрана. `screen` и `dataset` — то, что реально определяет страницу. */
    function $raggu_web_front_analytics_pageview(screen, dataset) {
        const api = umami();
        if (!api)
            return;
        const url = dataset ? `/${screen}/${dataset}` : `/${screen}`;
        try {
            api.track({ url, title: screen });
        }
        catch {
            // Сеть, блокировщик, смена контракта трекера — не наше дело.
        }
    }
    $.$raggu_web_front_analytics_pageview = $raggu_web_front_analytics_pageview;
    /** Именованное действие пользователя: выбор корпуса, отправка вопроса и т.п. */
    function $raggu_web_front_analytics_event(event, data) {
        const api = umami();
        if (!api)
            return;
        try {
            api.track(event, data);
        }
        catch { }
    }
    $.$raggu_web_front_analytics_event = $raggu_web_front_analytics_event;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_chat extends $.$raggu_web_front_chat {
            // История привязана к dataset_id — у каждого корпуса своя ветка чата.
            // Иначе фолбэк-плашка, полученная на одном датасете (напр. мок без бэка),
            // висела бы на сообщениях другого, где бэк отвечает через граф.
            history(next) {
                const key = `$raggu_web_front_chat.history@${this.dataset_id() || ''}`;
                const stored = this.$.$mol_state_session.value(key, next);
                return stored ?? [];
            }
            is_empty() { return this.history().length === 0; }
            prompt_text(next) {
                return this.$.$mol_state_session.value('$raggu_web_front_chat.prompt_text', next) ?? '';
            }
            llm() {
                // GitHub Models API forces response_format: json_object и требует чтобы
                // слово "json" присутствовало в messages — иначе 400 Bad Request.
                // Инструктируем модель отвечать одним JSON-полем reply, чтобы потом
                // вытащить чистый текст.
                const ru = $raggu_web_front_api_locale() === 'ru';
                return $mol_github_model.make({
                    $: this.$,
                    rules: () => ru
                        ? 'Ты русскоязычный чат-ассистент. Отвечай ВСЕГДА строго валидным JSON вида {"reply": "<твой ответ обычным текстом>"}. Никаких других полей, никаких префиксов, только этот JSON.'
                        : 'You are a chat assistant answering in English. ALWAYS reply with strictly valid JSON of the form {"reply": "<your answer as plain text>"}. No other fields, no prefixes, just this JSON.',
                });
            }
            rows() {
                return this.history().map((_, i) => this.Message(i));
            }
            // Автоскролл вниз при появлении нового сообщения.
            // auto() вызывается $mol_view.dom_tree после render — DOM уже актуален.
            auto() {
                void this.history();
                const el = this.Body().dom_node();
                el.scrollTop = el.scrollHeight;
                return [];
            }
            message_text(index) {
                return this.history()[index]?.text ?? '';
            }
            message_role(index) {
                return this.history()[index]?.role ?? 'user';
            }
            message_off_graph(index) {
                return this.history()[index]?.off_graph ?? false;
            }
            /**
             * Enter отправляет, Shift+Enter переносит строку.
             *
             * Штатный submit у $mol_textarea висит на Ctrl+Enter (`submit_with_ctrl`),
             * а голый Enter вставляет перенос. Переключить один флаг мало: хоткей не
             * гасит ввод символа, и в очищенное после отправки поле прилетел бы
             * перенос строки. Поэтому ловим сами и гасим событие первым же действием —
             * обработчик обёрнут в $mol_wire_async и выполняется синхронно лишь до
             * первой приостановки, так что preventDefault должен успеть до чтений.
             */
            prompt_press(event) {
                if (event?.key !== 'Enter')
                    return null;
                if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey)
                    return null;
                event.preventDefault();
                this.prompt_submit();
                return null;
            }
            prompt_submit() {
                const text = this.prompt_text().trim();
                if (!text)
                    return null;
                // Само действие, без текста вопроса: аналитике нужна частота, а не
                // содержание, и чужие вопросы — не то, что стоит выгружать наружу.
                $raggu_web_front_analytics_event('question_asked', {
                    dataset: this.dataset_id(),
                    engine: this.engine(),
                    query_plan: this.use_query_plan(),
                    length: text.length,
                });
                this.history([...this.history(), { role: 'user', text }]);
                this.prompt_text('');
                // Ответ в detached wire — не блокирует action, не мутирует state внутри fiber body,
                // сам ретаинится при suspension от fetch/model.
                $mol_wire_async(this).ask(text);
                return null;
            }
            // Скелет виден когда мы ждём ответа: последнее сообщение = user.
            // Реактивно, без ловли suspension: ask сам мутирует history когда ответ придёт,
            // last=assistant → is_communicating становится false → скелет скрывается.
            is_communicating() {
                const h = this.history();
                if (h.length === 0)
                    return false;
                return h[h.length - 1].role === 'user';
            }
            // Роутинг ответа. Аргумент text — для уникальности fiber-slot в
            // $mol_wire_async cache. Основной путь — GraphRAG-агент на бэке RAGU:
            // он сам достаёт контекст из графа знаний и подмешивает его перед
            // генерацией. Если датасет не выбран или бэк недоступен — фолбэк на
            // прямой LLM, чтобы демо не умирало.
            ask(text) {
                if (this.dataset_id()) {
                    try {
                        return this.ask_backend(text);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        console.error('[raggu chat] GraphRAG backend failed, falling back to direct LLM:', error);
                        // провалились в фолбэк ниже
                    }
                }
                this.ask_llm(text);
            }
            /**
             * Свойство из view.tree — просто string, а тело запроса ждёт литерал.
             * Сужаем здесь и заодно страхуемся: всё, что не `naive`, уходит как
             * `mix` — бэк из неподдерживаемых движков всё равно падает в него.
             */
            engine() {
                return super.engine() === 'naive' ? 'naive' : 'mix';
            }
            // GraphRAG-агент бэка: возвращает готовый ответ с подмешанным контекстом
            // графа. Промис fetch пробрасывается через wire, реальная ошибка — наверх.
            ask_backend(text) {
                const history = this.history()
                    .slice(0, -1)
                    .map(m => ({ role: m.role, content: m.text }));
                // `use_query_plan` кладём в тело, ТОЛЬКО когда план включён. У бэка
                // APIModel с extra="forbid", и задеплоенная версия, которая про это
                // поле ещё не знает, отвечает 422 на весь запрос. Пока она не
                // обновилась, выключенный тумблер = прежний контракт, включённый —
                // осознанный опт-ин. Каст нужен потому, что генератор помечает поля
                // с дефолтом как обязательные: опустить их типом нельзя.
                const body = {
                    message: text,
                    history,
                    engine: this.engine(),
                    top_k: 15,
                    rerank: true,
                    include_trace: false,
                    locale: $raggu_web_front_api_locale(),
                    ...(this.use_query_plan() ? { use_query_plan: true } : {}),
                };
                const resp = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_create_agent_message, {
                    params: { dataset_id: this.dataset_id() },
                    body: body,
                });
                const reply = resp?.message?.content ?? '';
                this.history([...this.history(), { role: 'assistant', text: reply }]);
            }
            // Лёгкий контекст для фолбэка: сущности графа (лейбл + тип, топ по degree)
            // прямо с бэка. Полноценного RAG-ретривала тут нет, но модель хотя бы
            // «видит» какие сущности есть в корпусе и отвечает ближе к теме.
            // Возвращает '' если графа нет (мок без бэка) — тогда чистый LLM.
            graph_context() {
                const id = this.dataset_id();
                if (!id)
                    return '';
                try {
                    const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_graph, { params: { dataset_id: id }, query: { limit: 200 } });
                    const labels = res.nodes
                        .slice()
                        .sort((a, b) => (b.degree ?? 0) - (a.degree ?? 0))
                        .slice(0, 60)
                        .map((n) => `${n.label} (${n.entity_type})`);
                    if (!labels.length)
                        return '';
                    const list = labels.join('; ');
                    return $raggu_web_front_api_locale() === 'ru'
                        ? `Ключевые сущности из графа знаний этого корпуса: ${list}. Отвечай, опираясь на них, если вопрос по теме корпуса.`
                        : `Key entities from the knowledge graph of this corpus: ${list}. Rely on them when the question is about the corpus.`;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    return '';
                }
            }
            // Фолбэк: прямой LLM. Если удаётся достать граф с бэка — подмешиваем
            // сущности как контекст, чтобы ответ был ближе к корпусу.
            ask_llm(text) {
                const history = this.history();
                const context = this.graph_context();
                const model = this.llm().fork();
                if (context)
                    model.tell([context]);
                for (const item of history) {
                    if (item.role === 'user')
                        model.ask([item.text]);
                    else
                        model.tell([item.text]);
                }
                try {
                    const resp = model.response();
                    const reply = typeof resp === 'string' ? resp : resp?.reply ?? JSON.stringify(resp, null, 2);
                    this.history([...this.history(), { role: 'assistant', text: reply, off_graph: true }]);
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    if ($mol_fail_log(error)) {
                        this.history([...this.history(), { role: 'assistant', text: '📛 ' + (error.message || String(error)), off_graph: true }]);
                    }
                }
            }
            // Заготовки вопросов бэк отдаёт под конкретный корпус и локаль — они
            // построены на реальных сущностях индекса, поэтому лучше любых наших.
            // Читаются внутри Suggestions, так что подвисание фетча гасит только
            // строку подсказок, а не весь чат.
            // URL-флаг `?mock=1` — как в галерее и графе: демо и node-тесты без бэка
            // не должны ронять в чат висящий $mol_fetch.
            mock_flag() {
                return this.$.$mol_state_arg.value('mock') === '1';
            }
            remote_suggestions() {
                const id = this.dataset_id();
                if (!id || this.mock_flag())
                    return null;
                try {
                    const res = this.$.$raggu_web_front_api($raggu_web_front_api_ragu_get_agent_suggestions, { params: { dataset_id: id }, query: { locale: $raggu_web_front_api_locale() } });
                    const list = res?.suggestions;
                    return list?.length ? list : null;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    console.warn('[raggu chat] suggestions fetch failed, falling back to built-ins:', error);
                    return null;
                }
            }
            // Фолбэк без бэка: свои 3 вопроса на встроенные корпуса, общие — на всё
            // остальное. Строки объявлены в view.tree, значит переводятся локалью.
            fallback_suggestions() {
                switch (this.dataset_id()) {
                    case 'law': return [this.sug_law_one_text(), this.sug_law_two_text(), this.sug_law_three_text()];
                    case 'wiki': return [this.sug_wiki_one_text(), this.sug_wiki_two_text(), this.sug_wiki_three_text()];
                }
                return [this.sug_any_one_text(), this.sug_any_two_text(), this.sug_any_three_text()];
            }
            suggestions() {
                return (this.remote_suggestions() ?? this.fallback_suggestions()).slice(0, 3);
            }
            // Кнопка очистки живёт в том же ряду — у неё margin-left:auto в стилях.
            suggestion_rows() {
                return [...this.suggestions().map((_, i) => this.Sug(i)), this.Clear()];
            }
            sug_text(index) {
                return this.suggestions()[index] ?? '';
            }
            sug_click(index) {
                this.prompt_text(this.sug_text(index));
                return null;
            }
            clear_click() {
                this.history([]);
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_chat.prototype, "history", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chat.prototype, "llm", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chat.prototype, "rows", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_chat.prototype, "prompt_submit", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chat.prototype, "remote_suggestions", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_chat.prototype, "sug_click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_chat.prototype, "clear_click", null);
        $$.$raggu_web_front_chat = $raggu_web_front_chat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chat/chat.view.css", "/*\n\t$mol_text помечает **жирный** атрибутом mol_text_type=\"strong\", но рисует его\n\tчерез `text-shadow: 0 0` + `filter: contrast(1.5)` — приём, рассчитанный на\n\tконтрастный фон документа. В пузыре чата на цвете card он практически\n\tнеразличим, и заголовки списков от LLM читались как обычный текст.\n\n\tПравится только здесь: $mol_style_define адресует свои под-компоненты, а это\n\tатрибут на вложенном span чужого компонента.\n*/\n[raggu_web_front_chat_message_text] [mol_text_type=\"strong\"] {\n\tfont-weight: 600;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_chat, {
        flex: { direction: 'column', shrink: 1 },
        minWidth: 0,
        minHeight: 0,
        height: '100%',
        Clear: {
            marginLeft: 'auto',
            minWidth: '40px',
            height: '26px',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            align: { items: 'center' },
            justify: { content: 'center' },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '6px' },
            color: $bog_builderui_tokens.shade,
            font: { size: '14px', weight: 500 },
            lineHeight: '1',
        },
        Body: {
            flex: { grow: 1, direction: 'column' },
            overflow: 'auto',
            // min-height: 0 обязателен для flex-child с overflow:auto,
            // иначе элемент раздувается до scrollHeight и внешний контейнер скроллится вместо него.
            minHeight: 0,
            padding: {
                top: '22px',
                bottom: '22px',
                left: '22px',
                right: '22px',
            },
        },
        Body_flow: {
            flex: { direction: 'column' },
            gap: '16px',
        },
        Status: {
            background: { color: $bog_builderui_tokens.card },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            borderRadius: '12px 12px 12px 3px',
            padding: {
                top: '13px',
                bottom: '13px',
                left: '16px',
                right: '16px',
            },
            maxWidth: '78%',
            align: { self: 'flex-start' },
            flex: { direction: 'column' },
            gap: '10px',
            // По дефолту скрыт. attr raggu_loading=true → показываем скелет.
            // Boolean false → mol удаляет атрибут → [attr="true"] селектор ниже включает display.
            display: 'none',
            '@': {
                raggu_loading: {
                    true: {
                        display: 'flex',
                    },
                },
            },
        },
        Skel_line_one: {
            height: '12px',
            borderRadius: '4px',
            minWidth: '260px',
        },
        Skel_line_two: {
            height: '12px',
            borderRadius: '4px',
            minWidth: '320px',
        },
        Skel_line_three: {
            height: '12px',
            borderRadius: '4px',
            minWidth: '200px',
        },
        Messages: {
            gap: '16px',
        },
        // Пустая история: приветственная подсказка вместо заглушечной переписки.
        Empty: {
            display: 'none',
            align: { self: 'center' },
            margin: { top: '48px' },
            maxWidth: '380px',
            textAlign: 'center',
            font: { size: '13px' },
            lineHeight: '1.6',
            color: $bog_builderui_tokens.shade,
            '@': {
                raggu_empty: {
                    true: { display: 'flex' },
                },
            },
        },
        Message: {
            flex: { direction: 'column' },
            maxWidth: '78%',
            '@': {
                raggu_role: {
                    user: {
                        align: { self: 'flex-end' },
                        maxWidth: '70%',
                    },
                    assistant: {
                        align: { self: 'flex-start' },
                    },
                },
            },
        },
        // $mol_text парсит markdown и раскладывает блоки колонкой. Ответ LLM
        // приходит с настоящими \n и разметкой — обычный div схлопывал переносы
        // в пробелы, а `**` и `1.` показывал буквально. Отступы между блоками
        // задаёт сам $mol_text, здесь их не трогаем.
        Message_text: {
            font: { size: '13px' },
            lineHeight: '1.55',
            '@': {
                raggu_role: {
                    user: {
                        background: { color: $bog_builderui_tokens.current },
                        color: '#ffffff',
                        borderRadius: '12px 12px 3px 12px',
                        padding: {
                            top: '11px',
                            bottom: '11px',
                            left: '15px',
                            right: '15px',
                        },
                    },
                    assistant: {
                        background: { color: $bog_builderui_tokens.card },
                        border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
                        borderRadius: '12px 12px 12px 3px',
                        padding: {
                            top: '13px',
                            bottom: '13px',
                            left: '16px',
                            right: '16px',
                        },
                        color: $bog_builderui_tokens.text,
                    },
                },
            },
        },
        Message_badge: {
            display: 'none',
            alignSelf: 'flex-start',
            margin: { top: '6px' },
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: '#8a6d1b',
            background: { color: '#f5c84226' },
            border: { width: '1px', style: 'solid', color: '#d9b23a66', radius: '5px' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '7px',
                right: '7px',
            },
            '@': {
                raggu_off_graph: {
                    true: { display: 'flex' },
                },
            },
        },
        Footer: {
            padding: {
                top: '14px',
                bottom: '14px',
                left: '22px',
                right: '22px',
            },
            border: {
                top: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            flex: { direction: 'column' },
        },
        Suggestions: {
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            gap: '7px',
            margin: { bottom: '10px' },
            align: { items: 'center' },
        },
        Sug: {
            border: { width: '1px', style: 'dashed', color: $bog_builderui_tokens.line, radius: '14px' },
            padding: {
                top: '5px',
                bottom: '5px',
                left: '11px',
                right: '11px',
            },
            font: { size: '11px' },
            color: $bog_builderui_tokens.shade,
            cursor: 'pointer',
            // Длинный вопрос с бэка не должен растягивать футер шире чата.
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'block',
        },
        Input_row: {
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '8px',
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '10px' },
            padding: {
                top: '8px',
                bottom: '8px',
                left: '12px',
                right: '8px',
            },
            color: $bog_builderui_tokens.shade,
            font: { size: '13px' },
        },
        Prompt: {
            flex: { grow: 1 },
            border: { width: 0 },
            background: { color: 'transparent' },
            minHeight: '24px',
            color: $bog_builderui_tokens.text
        },
        Input_send: {
            background: { color: $bog_builderui_tokens.current },
            color: '#ffffff',
            border: { radius: '7px' },
            padding: {
                top: '6px',
                bottom: '6px',
                left: '14px',
                right: '14px',
            },
            font: { size: '12px', weight: 600 },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_summary_card) = class $raggu_web_front_summary_card extends ($.$bog_builderui_div) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		Icon(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.icon())]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		Badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.badge())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Icon()), 
				(this.Spacer()), 
				(this.Badge())
			]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Desc(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.desc())]);
			return obj;
		}
		More(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.more())]);
			return obj;
		}
		icon(){
			return "";
		}
		badge(){
			return "";
		}
		title(){
			return "";
		}
		desc(){
			return "";
		}
		more(){
			return "";
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Title()), 
				(this.Desc()), 
				(this.More())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "click"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Icon"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Badge"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "Desc"));
	($mol_mem(($.$raggu_web_front_summary_card.prototype), "More"));


;
"use strict";


;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_summary_card, {
        background: { color: $bog_builderui_tokens.card },
        border: { width: '2px', style: 'solid', color: $bog_builderui_tokens.line, radius: '10px' },
        padding: {
            top: '12px',
            bottom: '12px',
            left: '12px',
            right: '12px',
        },
        flex: { direction: 'column' },
        cursor: 'pointer',
        ':hover': {
            border: { color: $bog_builderui_tokens.current },
        },
        Head: {
            flex: { direction: 'row' },
            align: { items: 'center' },
        },
        Icon: {
            font: { size: '22px' },
        },
        Spacer: {
            flex: { grow: 1 },
        },
        Badge: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 600,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            background: { color: $bog_builderui_tokens.field },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '5px' },
            padding: {
                top: '2px',
                bottom: '2px',
                left: '7px',
                right: '7px',
            },
        },
        Title: {
            font: { weight: 700, size: '14px' },
            margin: { top: '11px' },
        },
        Desc: {
            font: { size: '11px' },
            color: $bog_builderui_tokens.shade,
            margin: { top: '4px' },
            lineHeight: '1.4',
            flex: { grow: 1 },
        },
        More: {
            font: { weight: 600, size: '11px' },
            color: $bog_builderui_tokens.current,
            margin: { top: '10px' },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_summary_detail) = class $raggu_web_front_summary_detail extends ($.$bog_builderui_div) {
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			return obj;
		}
		Icon(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.icon())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Badge(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.badge())]);
			return obj;
		}
		Header_text(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Title()), (this.Badge())]);
			return obj;
		}
		Spacer(){
			const obj = new this.$.$bog_builderui_div();
			return obj;
		}
		Close_btn(){
			const obj = new this.$.$bog_builderui_div();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			(obj.sub) = () => (["✕"]);
			return obj;
		}
		Header(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([
				(this.Icon()), 
				(this.Header_text()), 
				(this.Spacer()), 
				(this.Close_btn())
			]);
			return obj;
		}
		Content(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Content())]);
			return obj;
		}
		Panel(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header()), (this.Body())]);
			return obj;
		}
		Fact_marker(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => (["—"]);
			return obj;
		}
		fact(id){
			return "";
		}
		Fact_text(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.fact(id))]);
			return obj;
		}
		link_rows(){
			return [];
		}
		link_uri(id){
			return "";
		}
		link_label(id){
			return "";
		}
		showed(){
			return false;
		}
		icon(){
			return "";
		}
		badge(){
			return "";
		}
		title(){
			return "";
		}
		image(){
			return "";
		}
		facts(){
			return [];
		}
		links(){
			return [];
		}
		body(){
			return [];
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_summary_detail_showed": (this.showed())};
		}
		sub(){
			return [(this.Backdrop()), (this.Panel())];
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.image()));
			return obj;
		}
		Fact(id){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Fact_marker(id)), (this.Fact_text(id))]);
			return obj;
		}
		Links(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.link_rows()));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.title) = () => ((this.link_label(id)));
			(obj.attr) = () => ({...(this.$.$mol_link.prototype.attr.call(obj)), "target": "_blank"});
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "close"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Backdrop"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Icon"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Badge"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Header_text"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Close_btn"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Header"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Content"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Panel"));
	($mol_mem_key(($.$raggu_web_front_summary_detail.prototype), "Fact_marker"));
	($mol_mem_key(($.$raggu_web_front_summary_detail.prototype), "Fact_text"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Image"));
	($mol_mem_key(($.$raggu_web_front_summary_detail.prototype), "Fact"));
	($mol_mem(($.$raggu_web_front_summary_detail.prototype), "Links"));
	($mol_mem_key(($.$raggu_web_front_summary_detail.prototype), "Link"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_summary_detail extends $.$raggu_web_front_summary_detail {
            body() {
                return [
                    ...this.image() ? [this.Image()] : [],
                    ...this.facts().map((_, i) => this.Fact(i)),
                    ...this.links().length ? [this.Links()] : [],
                ];
            }
            fact(i) {
                return this.facts()[i];
            }
            link_rows() {
                return this.links().map((_, i) => this.Link(i));
            }
            link_uri(i) {
                return this.links()[i].uri;
            }
            link_label(i) {
                return this.links()[i].label;
            }
        }
        $$.$raggu_web_front_summary_detail = $raggu_web_front_summary_detail;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_summary_detail, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'none',
        zIndex: 40,
        '@': {
            raggu_web_front_summary_detail_showed: {
                true: { display: 'flex' },
            },
        },
        Backdrop: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: { color: '#1c1b1a59' },
        },
        Panel: {
            position: 'relative',
            zIndex: 1,
            margin: 'auto',
            width: '760px',
            maxWidth: $mol_style_func.calc('100vw - 4rem'),
            maxHeight: $mol_style_func.calc('100vh - 4rem'),
            background: { color: $bog_builderui_tokens.card },
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '12px' },
            flex: { direction: 'column' },
            box: {
                shadow: [{
                        x: 0,
                        y: '12px',
                        blur: '40px',
                        spread: 0,
                        color: '#0000001f',
                    }],
            },
        },
        Header: {
            padding: {
                top: '18px',
                bottom: '18px',
                left: '20px',
                right: '20px',
            },
            border: {
                bottom: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line },
            },
            flex: { direction: 'row' },
            align: { items: 'center' },
            gap: '12px',
        },
        Icon: {
            font: { size: '24px' },
        },
        Header_text: {
            flex: { direction: 'column' },
        },
        Title: {
            font: { weight: 700, size: '16px' },
        },
        Badge: {
            font: {
                family: 'ui-monospace, monospace',
                weight: 500,
                size: '10px',
            },
            color: $bog_builderui_tokens.shade,
            margin: { top: '2px' },
        },
        Spacer: {
            flex: { grow: 1 },
        },
        Close_btn: {
            cursor: 'pointer',
            color: $bog_builderui_tokens.shade,
            font: { size: '14px' },
            padding: {
                top: '4px',
                bottom: '4px',
                left: '8px',
                right: '8px',
            },
        },
        Content: {
            padding: {
                top: '18px',
                bottom: '18px',
                left: '20px',
                right: '20px',
            },
            flex: { direction: 'column' },
            gap: '12px',
        },
        Image: {
            maxWidth: '100%',
            border: { width: '1px', style: 'solid', color: $bog_builderui_tokens.line, radius: '8px' },
        },
        Fact: {
            flex: { direction: 'row' },
            gap: '8px',
            align: { items: 'flex-start' },
        },
        Fact_marker: {
            color: $bog_builderui_tokens.current,
            font: { weight: 700, size: '13px' },
        },
        Fact_text: {
            font: { size: '13px' },
            lineHeight: '1.5',
            flex: { shrink: 1 },
            minWidth: 0,
        },
        Links: {
            flex: { direction: 'row' },
            flexWrap: 'wrap',
            gap: '10px',
            margin: { top: '4px' },
        },
        Link: {
            font: { weight: 600, size: '12px' },
            color: $bog_builderui_tokens.current,
        },
        '@media': {
            '(max-width: 720px)': {
                Panel: {
                    maxWidth: $mol_style_func.calc('100vw - 1.5rem'),
                    maxHeight: $mol_style_func.calc('100vh - 1.5rem'),
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_summary) = class $raggu_web_front_summary extends ($.$bog_builderui_div) {
		Header_title(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_title_text())]);
			return obj;
		}
		Header_subtitle(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.header_subtitle_text())]);
			return obj;
		}
		Header(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Header_title()), (this.Header_subtitle())]);
			return obj;
		}
		card_icon(id){
			return "";
		}
		card_badge(id){
			return "";
		}
		card_title(id){
			return "";
		}
		card_desc(id){
			return "";
		}
		click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Card(id){
			const obj = new this.$.$raggu_web_front_summary_card();
			(obj.icon) = () => ((this.card_icon(id)));
			(obj.badge) = () => ((this.card_badge(id)));
			(obj.title) = () => ((this.card_title(id)));
			(obj.desc) = () => ((this.card_desc(id)));
			(obj.more) = () => ((this.more_text()));
			(obj.click) = (next) => ((this.click(id, next)));
			return obj;
		}
		rows(){
			return [(this.Card(id))];
		}
		Grid(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		detail_showed(){
			return false;
		}
		opened_icon(){
			return "";
		}
		opened_badge(){
			return "";
		}
		opened_title(){
			return "";
		}
		opened_facts(){
			return [];
		}
		opened_links(){
			return [];
		}
		opened_image(){
			return "";
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		opened(next){
			if(next !== undefined) return next;
			return "";
		}
		header_title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_header_title_text"));
		}
		header_subtitle_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_header_subtitle_text"));
		}
		more_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_more_text"));
		}
		ragu_badge(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_ragu_badge"));
		}
		ragu_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_ragu_desc"));
		}
		ragu_fact_1(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_ragu_fact_1"));
		}
		ragu_fact_2(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_ragu_fact_2"));
		}
		ragu_fact_3(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_ragu_fact_3"));
		}
		mol_badge(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_mol_badge"));
		}
		mol_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_mol_desc"));
		}
		mol_fact_1(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_mol_fact_1"));
		}
		mol_fact_2(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_mol_fact_2"));
		}
		mol_fact_3(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_mol_fact_3"));
		}
		menolite_badge(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_menolite_badge"));
		}
		menolite_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_menolite_desc"));
		}
		menolite_fact_1(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_menolite_fact_1"));
		}
		menolite_fact_2(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_menolite_fact_2"));
		}
		menolite_fact_3(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_menolite_fact_3"));
		}
		nerel_badge(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_nerel_badge"));
		}
		nerel_desc(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_nerel_desc"));
		}
		nerel_fact_1(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_nerel_fact_1"));
		}
		nerel_fact_2(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_nerel_fact_2"));
		}
		nerel_fact_3(){
			return (this.$.$mol_locale.text("$raggu_web_front_summary_nerel_fact_3"));
		}
		sub(){
			return [(this.Header()), (this.Grid())];
		}
		Detail(){
			const obj = new this.$.$raggu_web_front_summary_detail();
			(obj.showed) = () => ((this.detail_showed()));
			(obj.icon) = () => ((this.opened_icon()));
			(obj.badge) = () => ((this.opened_badge()));
			(obj.title) = () => ((this.opened_title()));
			(obj.facts) = () => ((this.opened_facts()));
			(obj.links) = () => ((this.opened_links()));
			(obj.image) = () => ((this.opened_image()));
			(obj.close) = (next) => ((this.close(next)));
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_summary.prototype), "Header_title"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "Header_subtitle"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "Header"));
	($mol_mem_key(($.$raggu_web_front_summary.prototype), "click"));
	($mol_mem_key(($.$raggu_web_front_summary.prototype), "Card"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "Grid"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "close"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "opened"));
	($mol_mem(($.$raggu_web_front_summary.prototype), "Detail"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_summary extends $.$raggu_web_front_summary {
            ids() {
                return ['ragu', 'menolite', 'nerel', 'mol'];
            }
            rows() {
                return this.ids().map(id => this.Card(id));
            }
            card_icon(id) {
                switch (id) {
                    case 'ragu': return '🧠';
                    case 'mol': return '⚡';
                    case 'menolite': return '🤖';
                    case 'nerel': return '🏷';
                }
                return '';
            }
            card_title(id) {
                switch (id) {
                    case 'ragu': return 'RAGU';
                    case 'mol': return '$mol';
                    case 'menolite': return 'Meno-Lite-0.1';
                    case 'nerel': return 'NEREL';
                }
                return '';
            }
            card_badge(id) {
                switch (id) {
                    case 'ragu': return this.ragu_badge();
                    case 'mol': return this.mol_badge();
                    case 'menolite': return this.menolite_badge();
                    case 'nerel': return this.nerel_badge();
                }
                return '';
            }
            card_desc(id) {
                switch (id) {
                    case 'ragu': return this.ragu_desc();
                    case 'mol': return this.mol_desc();
                    case 'menolite': return this.menolite_desc();
                    case 'nerel': return this.nerel_desc();
                }
                return '';
            }
            card_facts(id) {
                switch (id) {
                    case 'ragu': return [this.ragu_fact_1(), this.ragu_fact_2(), this.ragu_fact_3()];
                    case 'mol': return [this.mol_fact_1(), this.mol_fact_2(), this.mol_fact_3()];
                    case 'menolite': return [this.menolite_fact_1(), this.menolite_fact_2(), this.menolite_fact_3()];
                    case 'nerel': return [this.nerel_fact_1(), this.nerel_fact_2(), this.nerel_fact_3()];
                }
                return [];
            }
            card_links(id) {
                switch (id) {
                    case 'ragu': return [
                        { label: 'github.com/RaguTeam/RAGU', uri: 'https://github.com/RaguTeam/RAGU' },
                    ];
                    case 'mol': return [
                        { label: 'github.com/RaguTeam/web', uri: 'https://github.com/RaguTeam/web' },
                        { label: 'mol.hyoo.ru', uri: 'https://mol.hyoo.ru/' },
                    ];
                    case 'menolite': return [
                        { label: 'huggingface.co/bond005/meno-lite-0.1', uri: 'https://huggingface.co/bond005/meno-lite-0.1' },
                    ];
                    case 'nerel': return [
                        { label: 'NEREL paper (arXiv:2108.13112)', uri: 'https://arxiv.org/abs/2108.13112' },
                    ];
                }
                return [];
            }
            card_image(id) {
                // Архитектура RAGU из статьи, лежит в assets и деплоится через meta.tree.
                if (id === 'ragu')
                    return 'raggu/web/front/assets/ragu.jpg';
                return '';
            }
            detail_showed() {
                return !!this.opened();
            }
            opened_icon() { return this.card_icon(this.opened()); }
            opened_badge() { return this.card_badge(this.opened()); }
            opened_title() { return this.card_title(this.opened()); }
            opened_facts() { return this.card_facts(this.opened()); }
            opened_links() { return this.card_links(this.opened()); }
            opened_image() { return this.card_image(this.opened()); }
            click(id) {
                this.opened(id);
                return null;
            }
            close() {
                this.opened('');
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $raggu_web_front_summary.prototype, "click", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_summary.prototype, "close", null);
        $$.$raggu_web_front_summary = $raggu_web_front_summary;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_summary, {
        flex: { direction: 'column', shrink: 1 },
        minWidth: 0,
        padding: {
            top: '1.5rem',
            bottom: '1.5rem',
            left: '1.75rem',
            right: '1.75rem',
        },
        Header: {
            flex: { direction: 'column' },
            margin: { bottom: '1.25rem' },
        },
        Header_title: {
            font: { weight: 700, size: '20px' },
        },
        Header_subtitle: {
            font: { size: '13px' },
            color: $bog_builderui_tokens.shade,
            margin: { top: '3px' },
        },
        Grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            minWidth: 0,
        },
        '@media': {
            '(max-width: 720px)': {
                padding: {
                    top: '1rem',
                    bottom: '1rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
            },
        },
    });
})($ || ($ = {}));

;
	($.$raggu_web_front_app) = class $raggu_web_front_app extends ($.$bog_builderui_div) {
		favicon_icon(){
			const obj = new this.$.$mol_icon_graph();
			return obj;
		}
		Favicon(){
			const obj = new this.$.$bog_favicon();
			(obj.Icon) = () => ((this.favicon_icon()));
			return obj;
		}
		Theme_auto(){
			const obj = new this.$.$bog_theme_auto();
			return obj;
		}
		sidebar_hidden(){
			return false;
		}
		dataset_ids(){
			return [];
		}
		sidebar_dataset_name(id){
			return "";
		}
		sidebar_dataset_meta(id){
			return "";
		}
		select_dataset(next){
			if(next !== undefined) return next;
			return null;
		}
		Sidebar(){
			const obj = new this.$.$raggu_web_front_sidebar();
			(obj.attr) = () => ({...(this.$.$raggu_web_front_sidebar.prototype.attr.call(obj)), "raggu_web_front_sidebar_hidden": (this.sidebar_hidden())});
			(obj.dataset_id) = () => ((this.dataset_id()));
			(obj.dataset_ids) = () => ((this.dataset_ids()));
			(obj.dataset_name) = (id) => ((this.sidebar_dataset_name(id)));
			(obj.dataset_meta) = (id) => ((this.sidebar_dataset_meta(id)));
			(obj.select_dataset) = (next) => ((this.select_dataset(next)));
			(obj.Theme_auto) = () => ((this.Theme_auto()));
			return obj;
		}
		dataset_title(){
			return "";
		}
		screen_title(){
			return "";
		}
		open_help(next){
			if(next !== undefined) return next;
			return null;
		}
		open_settings(next){
			if(next !== undefined) return next;
			return null;
		}
		settings_open(next){
			if(next !== undefined) return next;
			return false;
		}
		toggle_sidebar(next){
			if(next !== undefined) return next;
			return null;
		}
		Topbar(){
			const obj = new this.$.$raggu_web_front_topbar();
			(obj.screen) = (next) => ((this.screen(next)));
			(obj.dataset_id) = () => ((this.dataset_id()));
			(obj.dataset_title) = () => ((this.dataset_title()));
			(obj.screen_title) = () => ((this.screen_title()));
			(obj.open_help) = (next) => ((this.open_help(next)));
			(obj.open_settings) = (next) => ((this.open_settings(next)));
			(obj.settings_open) = () => ((this.settings_open()));
			(obj.toggle_sidebar) = (next) => ((this.toggle_sidebar(next)));
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		Main(){
			const obj = new this.$.$bog_builderui_div();
			(obj.sub) = () => ([(this.Topbar()), (this.Body())]);
			return obj;
		}
		Help(){
			const obj = new this.$.$raggu_web_front_help();
			(obj.showed) = (next) => ((this.help_open(next)));
			return obj;
		}
		close_settings(next){
			if(next !== undefined) return next;
			return null;
		}
		Settings(){
			const obj = new this.$.$raggu_web_front_settings();
			(obj.showed) = (next) => ((this.settings_open(next)));
			(obj.close) = (next) => ((this.close_settings(next)));
			return obj;
		}
		Summary_popup(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		open_dataset(next){
			if(next !== undefined) return next;
			return null;
		}
		ask_chat(next){
			if(next !== undefined) return next;
			return null;
		}
		chat_engine(){
			return "mix";
		}
		chat_query_plan(){
			return false;
		}
		screen(next){
			if(next !== undefined) return next;
			return "gallery";
		}
		dataset_id(next){
			if(next !== undefined) return next;
			return "";
		}
		help_open(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_collapsed(next){
			if(next !== undefined) return next;
			return false;
		}
		body(){
			return [];
		}
		lights_mode(){
			return "light";
		}
		screen_gallery_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_screen_gallery_title"));
		}
		screen_explorer_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_screen_explorer_title"));
		}
		screen_chat_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_screen_chat_title"));
		}
		screen_summary_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_screen_summary_title"));
		}
		ask_entity_template(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_ask_entity_template"));
		}
		ask_relation_template(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_ask_relation_template"));
		}
		attr(){
			return {
				...(super.attr()), 
				"bog_builderui_lights": (this.lights_mode()), 
				"bog_builderui_base": "stone", 
				"bog_builderui_theme": "violet", 
				"bog_builderui_chart": "purple", 
				"bog_builderui_radius": "medium", 
				"bog_builderui_font_body": "inter", 
				"bog_builderui_font_head": "inter"
			};
		}
		plugins(){
			return [(this.Favicon()), (this.Theme_auto())];
		}
		sub(){
			return [
				(this.Sidebar()), 
				(this.Main()), 
				(this.Help()), 
				(this.Settings()), 
				(this.Summary_popup())
			];
		}
		Gallery(){
			const obj = new this.$.$raggu_web_front_gallery();
			(obj.dataset_id) = () => ((this.dataset_id()));
			(obj.select_dataset) = (next) => ((this.open_dataset(next)));
			return obj;
		}
		Explorer(){
			const obj = new this.$.$raggu_web_front_explorer();
			(obj.dataset_id) = () => ((this.dataset_id()));
			(obj.ask_click) = (next) => ((this.ask_chat(next)));
			return obj;
		}
		Chat(){
			const obj = new this.$.$raggu_web_front_chat();
			(obj.dataset_id) = () => ((this.dataset_id()));
			(obj.engine) = () => ((this.chat_engine()));
			(obj.use_query_plan) = () => ((this.chat_query_plan()));
			return obj;
		}
		Summary(){
			const obj = new this.$.$raggu_web_front_summary();
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_app.prototype), "favicon_icon"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Favicon"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Theme_auto"));
	($mol_mem(($.$raggu_web_front_app.prototype), "select_dataset"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Sidebar"));
	($mol_mem(($.$raggu_web_front_app.prototype), "open_help"));
	($mol_mem(($.$raggu_web_front_app.prototype), "open_settings"));
	($mol_mem(($.$raggu_web_front_app.prototype), "settings_open"));
	($mol_mem(($.$raggu_web_front_app.prototype), "toggle_sidebar"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Topbar"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Main"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Help"));
	($mol_mem(($.$raggu_web_front_app.prototype), "close_settings"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Settings"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Summary_popup"));
	($mol_mem(($.$raggu_web_front_app.prototype), "open_dataset"));
	($mol_mem(($.$raggu_web_front_app.prototype), "ask_chat"));
	($mol_mem(($.$raggu_web_front_app.prototype), "screen"));
	($mol_mem(($.$raggu_web_front_app.prototype), "dataset_id"));
	($mol_mem(($.$raggu_web_front_app.prototype), "help_open"));
	($mol_mem(($.$raggu_web_front_app.prototype), "sidebar_collapsed"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Gallery"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Explorer"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Chat"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Summary"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_app extends $.$raggu_web_front_app {
            body() {
                // Сводка не зависит от датасета, для остальных экранов без него показываем Gallery.
                if (this.screen() === 'summary')
                    return [this.Summary()];
                const s = this.dataset_id() ? this.screen() : 'gallery';
                switch (s) {
                    case 'gallery': return [this.Gallery()];
                    case 'explorer': return [this.Explorer()];
                    case 'chat': return [this.Chat()];
                    // Дашборд спрятан до готовности бэка:
                    // case 'dashboard': return [ this.Dashboard() ]
                }
                return [];
            }
            // Буклетный UX на телефоне: при смене раздела доскролливаем горизонтальный
            // снап к контенту. На десктопе скролла нет — вызов безвреден.
            // Таймаут вместо after_tick: на первом рендере layout ещё не готов
            // и scrollWidth равен clientWidth.
            auto() {
                void this.screen();
                this.track_screen();
                new this.$.$mol_after_timeout(100, () => {
                    const root = this.dom_node();
                    const main = this.Main().dom_node();
                    if (!root || !main)
                        return;
                    if (root.scrollWidth <= root.clientWidth)
                        return;
                    root.scroll({
                        left: main.offsetLeft + main.offsetWidth - root.clientWidth,
                        behavior: 'smooth',
                    });
                });
                return [];
            }
            /**
             * Просмотр экрана в аналитику. Через `@$mol_mem`, чтобы отправка шла на
             * смену экрана или корпуса, а не на каждый перерисованный кадр.
             */
            track_screen() {
                const screen = this.screen();
                const dataset = this.dataset_id();
                $raggu_web_front_analytics_pageview(screen, dataset);
                return `${screen}/${dataset}`;
            }
            lights_mode() {
                return this.Theme_auto().is_light_now() ? 'light' : 'dark';
            }
            // Попап деталей сводки рендерим на уровне app: внутри Body его ломает
            // contain:content у скролла — fixed-оверлей позиционируется не от вьюпорта.
            Summary_popup() {
                return this.Summary().Detail();
            }
            open_help() {
                this.help_open(true);
                return null;
            }
            open_settings() {
                this.settings_open(true);
                return null;
            }
            close_settings() {
                this.settings_open(false);
                return null;
            }
            sidebar_hidden() { return this.sidebar_collapsed(); }
            toggle_sidebar() {
                this.sidebar_collapsed(!this.sidebar_collapsed());
                return null;
            }
            // Gallery владеет фетчем списка датасетов — сайдбар получает данные
            // через эти прокси, чтобы не дублировать remote_datasets.
            dataset_ids() {
                return this.Gallery().datasets().map((ds) => ds.id);
            }
            sidebar_dataset_name(id) {
                return this.Gallery().card_title(id);
            }
            sidebar_dataset_meta(id) {
                const g = this.Gallery();
                return `⬡ ${g.card_nodes(id)} · ⇄ ${g.card_edges(id)}`;
            }
            select_dataset(id) {
                this.dataset_id(id);
                return null;
            }
            // Клик по карточке в галерее — сразу в граф: выбрать корпус и значит
            // начать его смотреть, отдельный шаг «выбрал и стой на галерее» лишний.
            // Сайдбар остаётся мягким переключателем — там select_dataset без прыжка.
            open_dataset(id) {
                $raggu_web_front_analytics_event('dataset_open', { dataset: id });
                this.dataset_id(id);
                this.screen('explorer');
                return null;
            }
            ask_chat() {
                // Переносим выбранное в графе (сущность или связь) в чат: переключаем
                // экран и сразу кладём заготовку вопроса в поле ввода.
                const explorer = this.Explorer();
                const node = explorer.selected();
                const edge = explorer.selected_edge();
                $raggu_web_front_analytics_event('ask_from_graph', {
                    kind: edge ? 'relation' : 'entity',
                    dataset: this.dataset_id(),
                });
                this.screen('chat');
                if (edge) {
                    const label = `${explorer.node_label(edge.source)} ${edge.relation} ${explorer.node_label(edge.target)}`;
                    this.Chat().prompt_text(this.ask_relation_template().replace('%s', label));
                }
                else if (node?.label) {
                    this.Chat().prompt_text(this.ask_entity_template().replace('%s', node.label));
                }
                return null;
            }
            /**
             * Переключалка «Граф при поиске» ложится прямо на поле `engine` запроса
             * к агенту, отдельная ручка на бэке не нужна: `naive` ищет только по
             * чанкам, `mix` — по чанкам и графу. Оба значения бэк поддерживает
             * (`SUPPORTED_ENGINES` в schemas/datasets.py).
             *
             * QueryPlanEngine намеренно НЕ сюда: это отдельный флаг запроса
             * (`use_query_plan`), а не значение того же enum — иначе «граф выключен
             * плюс декомпозиция включена» нельзя было бы выразить.
             */
            chat_engine() {
                return this.Settings().use_graph() === 'on' ? 'mix' : 'naive';
            }
            /** Вторая переключалка панели: декомпозиция сложного вопроса на бэке. */
            chat_query_plan() {
                return this.Settings().query_plan() === 'on';
            }
            screen_title() {
                switch (this.screen()) {
                    case 'gallery': return this.screen_gallery_title();
                    case 'explorer': return this.screen_explorer_title();
                    case 'chat': return this.screen_chat_title();
                    case 'summary': return this.screen_summary_title();
                }
                return '';
            }
            dataset_title() {
                const id = this.dataset_id();
                if (!id)
                    return '';
                return this.Gallery().card_title(id);
            }
            arg_value(key, next, fallback) {
                const arg = this.$.$mol_state_arg;
                if (next === undefined)
                    return arg.value(key) ?? fallback;
                arg.value(key, next === fallback ? null : next);
                return next;
            }
            screen(next) { return this.arg_value('screen', next, 'gallery'); }
            dataset_id(next) { return this.arg_value('ds', next, ''); }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "track_screen", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "lights_mode", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "open_help", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "open_settings", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "close_settings", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "toggle_sidebar", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "select_dataset", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "open_dataset", null);
        __decorate([
            $mol_action
        ], $raggu_web_front_app.prototype, "ask_chat", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "screen", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "dataset_id", null);
        $$.$raggu_web_front_app = $raggu_web_front_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/app/app.view.css", "/* Буклетный UX на телефоне (как в $mol_book2): сайдбар и контент — снап-страницы\n   горизонтального скролла. Свайп вправо открывает меню, выбор раздела доскролливает\n   обратно к контенту (см. auto() в app.view.ts).\n   Селекторы задвоены/вложены, чтобы перебить базовые правила из app.view.css.ts. */\n@media (max-width: 720px) {\n    [raggu_web_front_app][raggu_web_front_app] {\n        overflow-x: auto;\n        overflow-y: hidden;\n        scroll-snap-type: x mandatory;\n    }\n\n    [raggu_web_front_app] > [raggu_web_front_app_sidebar] {\n        min-width: 84vw;\n        max-width: 84vw;\n        scroll-snap-align: start;\n        scroll-snap-stop: always;\n    }\n\n    [raggu_web_front_app] > [raggu_web_front_app_main] {\n        min-width: 100vw;\n        scroll-snap-align: end;\n        scroll-snap-stop: always;\n    }\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @see $bog_builderui_tokens */
var $;
(function ($) {
    $mol_style_define($raggu_web_front_app, {
        height: "100vh",
        width: "100%",
        background: { color: $bog_builderui_tokens.back },
        color: $bog_builderui_tokens.text,
        overflow: "hidden",
        font: {
            family: "system-ui, -apple-system, sans-serif",
        },
        flex: {
            direction: "row",
        },
        Main: {
            flex: {
                grow: 1,
                shrink: 1,
                direction: "column",
            },
            minWidth: 0,
        },
        Body: {
            display: "flex",
            flex: { grow: 1, shrink: 1, direction: "column" },
            align: { items: "stretch" },
            minHeight: 0,
            minWidth: 0,
        },
    });
})($ || ($ = {}));


//# sourceMappingURL=web.js.map
