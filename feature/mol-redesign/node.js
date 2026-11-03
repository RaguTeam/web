#!/usr/bin/env node
"use strict";
var exports = void 0;
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
//mol/type/enforce/enforce.ts
;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;

$node[ "/mam" ] = module.exports }.call( {}, {} )
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $;
(function ($) {
    const mod = require /****/('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));
//node/internal/check/check.node.ts
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
//mol/promise/like/like.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
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
//mol/fail/catch/catch.ts
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
//mol/try/try.ts
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
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    const path = require /****/('path');
    const mod = require /****/('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));
//node/autoinstall/autoinstall.node.ts
;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);
//node/node.node.ts
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
//mol/func/name/name.ts
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
//mol/error/mix/mix.ts
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
//mol/ambient/ambient.ts
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
//mol/delegate/delegate.ts
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
//mol/owning/owning.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));
//mol/key/key.ts
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
//mol/object2/object2.ts
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
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));
//mol/env/env.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));
//mol/env/env.node.ts
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
//mol/guid/guid.ts
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
//mol/wire/cursor/cursor.ts
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
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
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
//mol/wire/wire.ts
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
//mol/dev/format/format.ts
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
//mol/wire/pub/sub/sub.ts
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
//mol/after/tick/tick.ts
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
//mol/wire/fiber/fiber.ts
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
//mol/compare/deep/deep.ts
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
//mol/log3/log3.ts
;
"use strict";
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));
//mol/span/span.ts
;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));
//mol/maybe/maybe.ts
;
"use strict";
var $;
(function ($) {
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));
//mol/tree2/tree2.ts
;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));
//mol/array/chunks/chunks.ts
;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));
//mol/error/syntax/syntax.ts
;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));
//mol/tree2/from/string/string.ts
;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));
//mol/tree2/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));
//mol/tree2/from/json/json.ts
;
"use strict";
var $;
(function ($) {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));
//mol/term/color/color.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));
//mol/log3/log3.node.ts
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
//mol/wire/task/task.ts
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
//mol/wire/sync/sync.ts
;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));
//mol/run/run.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: `http://${process.env.DOMAIN || 'localhost'}/` }).window;
})($ || ($ = {}));
//mol/dom/context/context.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));
//mol/dom/dom.ts
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
//mol/style/attach/attach.ts
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
//mol/decor/decor.ts
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
//mol/style/unit/unit.ts
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
//mol/style/func/func.ts
;
"use strict";
//mol/type/override/override.ts
;
"use strict";
//mol/style/properties/properties.ts
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
//mol/style/prop/prop.ts
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
//mol/theme/theme.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));
//mol/theme/-css/theme.css.ts
;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }
//mol/theme/theme_lights.ts
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
//mol/gap/gap.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));
//mol/gap/-css/gap.css.ts
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
//mol/promise/promise/promise.ts
;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));
//mol/promise/blocker/blocker.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\t/* text-wrap-style: pretty; dont work in textarea */\n\tunicode-bidi: plaintext\n}\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));
//mol/view/view/-css/view.css.ts
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
//mol/dom/render/children/children.ts
;
"use strict";
//mol/type/partial/deep/deep.ts
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
//mol/jsx/jsx.ts
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//mol/window/window.node.ts
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
//mol/key/key/key.ts
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
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.node.ts
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
//mol/wire/method/method.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
//mol/type/foot/foot.ts
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
//mol/wire/atom/atom.ts
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
//mol/wire/solo/solo.ts
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
//mol/wire/plex/plex.ts
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
//mol/mem/mem.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));
//mol/guard/defined.ts
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
//mol/view/selection/selection.ts
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
//mol/wrapper/wrapper.ts
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
//mol/memo/memo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));
//mol/dom/qname/qname.ts
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
//mol/wire/probe/probe.ts
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
//mol/wire/watch/watch.ts
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
//mol/const/const.ts
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
//mol/dom/render/attributes/attributes.ts
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
//mol/dom/render/events/events.ts
;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));
//mol/error/message/message.ts
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
//mol/dom/render/styles/styles.ts
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
//mol/dom/render/fields/fields.ts
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
//mol/wire/async/async.ts
;
"use strict";
//mol/type/keys/extract/extract.ts
;
"use strict";
//mol/type/pick/pick.ts
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
            // $mol_wire_solid()
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
//mol/view/view/view.tsx
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
//mol/plugin/plugin.ts
;
	($.$raggu_web_front_base) = class $raggu_web_front_base extends ($.$mol_view) {};
	($.$raggu_web_front_text) = class $raggu_web_front_text extends ($.$mol_view) {
		text(){
			return "";
		}
		dom_name(){
			return "p";
		}
		sub(){
			return [(this.text())];
		}
	};
	($.$raggu_web_front_label) = class $raggu_web_front_label extends ($.$raggu_web_front_text) {};
	($.$raggu_web_front_skeleton) = class $raggu_web_front_skeleton extends ($.$mol_view) {
		attr(){
			return {...(super.attr()), "aria-hidden": "true"};
		}
	};
	($.$raggu_web_front_reveal) = class $raggu_web_front_reveal extends ($.$mol_view) {
		delay_css(){
			return "0ms";
		}
		shown(next){
			if(next !== undefined) return next;
			return false;
		}
		delay(){
			return 0;
		}
		style(){
			return {...(super.style()), "--reveal-delay": (this.delay_css())};
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_reveal_shown": (this.shown())};
		}
	};
	($mol_mem(($.$raggu_web_front_reveal.prototype), "shown"));
	($.$raggu_web_front_link) = class $raggu_web_front_link extends ($.$mol_view) {
		href(){
			return "";
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "a";
		}
		uri(){
			return "";
		}
		arg(){
			return {};
		}
		hint(){
			return "";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.href()), 
				"title": (this.hint())
			};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
		sub(){
			return [];
		}
	};
	($mol_mem(($.$raggu_web_front_link.prototype), "click"));

;
"use strict";
//mol/state/arg/arg.ts
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
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    /** State of arguments like `foo=bar xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
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
            const prefix = this.prefix;
            const dict = {};
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
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));
//mol/state/arg/arg.node.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_reveal extends $.$raggu_web_front_reveal {
            delay_css() {
                return `${this.delay()}ms`;
            }
            observer() {
                if (this.shown())
                    return null;
                const node = this.dom_node();
                const observer = new IntersectionObserver(entries => {
                    if (!entries.some(entry => entry.isIntersecting))
                        return;
                    this.shown(true);
                }, { rootMargin: '-12% 0px' });
                observer.observe(node);
                return { destructor: () => observer.disconnect() };
            }
            auto() {
                this.observer();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_reveal.prototype, "observer", null);
        $$.$raggu_web_front_reveal = $raggu_web_front_reveal;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_link extends $.$raggu_web_front_link {
            href() {
                return this.uri() || this.$.$mol_state_arg.link(this.arg());
            }
        }
        $$.$raggu_web_front_link = $raggu_web_front_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/base/base.view.ts
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
//mol/layer/layer.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));
//mol/layer/-css/layer.css.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));
//mol/speck/-css/speck.view.css.ts
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
//mol/keyboard/code/code.ts
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
//mol/button/button.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));
//mol/button/-css/button.view.css.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/base/base.view.css", ":root {\n\tcolor-scheme: light;\n\n\t--bg: #eef0f3;\n\t--bg-deep: #e3e7ec;\n\t--surface: #ffffff;\n\t--surface-2: #f7f8fa;\n\t--surface-sunk: #e9ecf1;\n\n\t--text: #131a24;\n\t--text-2: #4a5666;\n\t--text-3: #737f90;\n\n\t--edge: #dbe0e8;\n\t--edge-strong: #c3cbd7;\n\t--edge-glass: rgb(255 255 255 / 0.75);\n\n\t--accent: #d64b2e;\n\t--accent-hover: #bf3f24;\n\t--accent-ink: #ffffff;\n\t--accent-wash: rgb(214 75 46 / 0.09);\n\t--accent-line: rgb(214 75 46 / 0.32);\n\n\t--glass-tint: rgb(255 255 255 / 0.66);\n\t--glass-tint-strong: rgb(255 255 255 / 0.85);\n\t--glass-hi: rgb(255 255 255 / 0.9);\n\t--glass-lo: rgb(16 26 40 / 0.05);\n\t--shadow-cast: rgb(28 42 64 / 0.16);\n\t--shadow-near: rgb(28 42 64 / 0.08);\n\n\t--elev-thumb: 0 1px 2px rgb(16 26 40 / 0.28), 0 2px 6px -2px rgb(16 26 40 / 0.22);\n\t--elev-pop: 0 18px 40px -24px rgb(28 42 64 / 0.4), 0 2px 6px -3px rgb(28 42 64 / 0.2);\n\t--accent-glow:\n\t    inset 0 1px 0 0 rgb(255 255 255 / 0.62),\n\t    inset 0 -1px 0 0 rgb(214 75 46 / 0.16),\n\t    0 5px 16px -10px rgb(214 75 46 / 0.5);\n\t--accent-glow-hover:\n\t    inset 0 1px 0 0 rgb(255 255 255 / 0.75),\n\t    inset 0 -1px 0 0 rgb(214 75 46 / 0.2),\n\t    0 8px 22px -12px rgb(214 75 46 / 0.7);\n\t--accent-pane: linear-gradient(180deg, rgb(214 75 46 / 0.15), rgb(214 75 46 / 0.055));\n\t--accent-pane-hover: linear-gradient(180deg, rgb(214 75 46 / 0.23), rgb(214 75 46 / 0.1));\n\n\t--grain-opacity: 0.035;\n\t--aurora-a: rgb(214 75 46 / 0.16);\n\t--aurora-b: rgb(51 70 92 / 0.16);\n\t--aurora-c: rgb(120 160 200 / 0.16);\n}\n:root {\n\tinterpolate-size: allow-keywords;\n}\n\n[data-theme='dark'] {\n\tcolor-scheme: dark;\n\n\t--bg: #080d15;\n\t--bg-deep: #04070c;\n\t--surface: #101825;\n\t--surface-2: #16202e;\n\t--surface-sunk: #0b111b;\n\n\t--text: #e9ecf1;\n\t--text-2: #a4b0c0;\n\t--text-3: #74818f;\n\n\t--edge: #1e2937;\n\t--edge-strong: #33445a;\n\t--edge-glass: rgb(255 255 255 / 0.09);\n\n\t--accent: #ff6e4e;\n\t--accent-hover: #ff8368;\n\t--accent-ink: #1a0c07;\n\t--accent-wash: rgb(255 110 78 / 0.12);\n\t--accent-line: rgb(255 110 78 / 0.36);\n\n\t--glass-tint: rgb(20 30 45 / 0.6);\n\t--glass-tint-strong: rgb(20 30 45 / 0.82);\n\t--glass-hi: rgb(255 255 255 / 0.08);\n\t--glass-lo: rgb(0 0 0 / 0.22);\n\t--shadow-cast: rgb(0 0 0 / 0.55);\n\t--shadow-near: rgb(0 0 0 / 0.35);\n\n\t--elev-thumb: 0 1px 2px rgb(0 0 0 / 0.55), 0 2px 8px -2px rgb(0 0 0 / 0.5);\n\t--elev-pop: 0 24px 48px -28px rgb(0 0 0 / 0.75), 0 2px 8px -4px rgb(0 0 0 / 0.6);\n\t/*\n\t * On a dark surface a pane that fades to nothing reads as a hole, not as\n\t * glass. So the tint bottoms out around a third of the way down and comes\n\t * back up towards the bottom edge, where a warm inner line stands in for\n\t * light caught along the rim — and a hairline ring gives the pane an edge\n\t * of its own instead of dissolving into the island behind it.\n\t */\n\t--accent-glow:\n\t    inset 0 1px 0 0 rgb(255 255 255 / 0.18),\n\t    inset 0 0 0 1px rgb(255 137 108 / 0.16),\n\t    inset 0 -1px 0 0 rgb(255 176 152 / 0.12),\n\t    0 6px 20px -10px rgb(255 110 78 / 0.45);\n\t--accent-glow-hover:\n\t    inset 0 1px 0 0 rgb(255 255 255 / 0.26),\n\t    inset 0 0 0 1px rgb(255 137 108 / 0.24),\n\t    inset 0 -1px 0 0 rgb(255 176 152 / 0.18),\n\t    0 9px 26px -12px rgb(255 110 78 / 0.65);\n\t--accent-pane: linear-gradient(\n\t    180deg,\n\t    rgb(255 141 114 / 0.26),\n\t    rgb(255 110 78 / 0.115) 58%,\n\t    rgb(255 124 95 / 0.175)\n\t);\n\t--accent-pane-hover: linear-gradient(\n\t    180deg,\n\t    rgb(255 152 128 / 0.36),\n\t    rgb(255 110 78 / 0.17) 58%,\n\t    rgb(255 124 95 / 0.25)\n\t);\n\n\t--grain-opacity: 0.05;\n\t--aurora-a: rgb(255 110 78 / 0.18);\n\t--aurora-b: rgb(58 96 148 / 0.22);\n\t--aurora-c: rgb(30 52 84 / 0.32);\n}\n\n:root {\n\t--font-display: 'Newsreader', ui-serif, Georgia, 'Times New Roman', serif;\n\t--font-sans: 'Instrument Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;\n\t--font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', monospace;\n\t--radius-island: 22px;\n\t--radius-inset: 16px;\n\t--radius-panel: 18px;\n\t--radius-control: 11px;\n\t--radius-chip: 7px;\n\t--island-h: 60px;\n\t--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);\n\t--text-display: clamp(2.6rem, 1.1rem + 5.2vw, 5.25rem);\n\t--text-title: clamp(1.9rem, 1.1rem + 2.4vw, 3rem);\n\t--text-section: clamp(1.45rem, 1rem + 1.4vw, 2rem);\n\tinterpolate-size: allow-keywords;\n}\n\nhtml {\n\tscroll-behavior: smooth;\n\t-webkit-text-size-adjust: 100%;\n\theight: auto;\n\tmin-height: 100%;\n}\n\nbody[mol_view_root] {\n\theight: auto;\n\tmin-height: 100%;\n\tmargin: 0;\n\tbackground: var(--bg);\n\tcolor: var(--text);\n\tfont-family: var(--font-sans);\n\tfont-size: 16px;\n\tline-height: 1.5;\n\tfont-synthesis-weight: none;\n\t-webkit-font-smoothing: antialiased;\n\toverflow-x: clip;\n}\n\n[mol_view] {\n\ttransition-property: none;\n\ttransition-duration: 0s;\n\tcontain: none;\n\tscrollbar-width: auto;\n\tscrollbar-color: auto;\n\tunicode-bidi: normal;\n}\n\n:where([raggu_web_front_base]),\n:where([raggu_web_front_base] *),\n:where([raggu_web_front_base]) ::before,\n:where([raggu_web_front_base]) ::after {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0 solid;\n\tmin-width: 0;\n}\n\n:where([raggu_web_front_base] :is(h1, h2, h3, h4)) {\n\tfont-size: inherit;\n\tfont-weight: inherit;\n\ttext-wrap: balance;\n}\n\n:where([raggu_web_front_base] p) {\n\ttext-wrap: pretty;\n}\n\n:where([raggu_web_front_base] a) {\n\tcolor: inherit;\n\ttext-decoration: inherit;\n}\n\n:where([raggu_web_front_base] :is(ol, ul)) {\n\tlist-style: none;\n}\n\n:where([raggu_web_front_base] :is(button, input, textarea, [mol_button])) {\n\tfont: inherit;\n\tletter-spacing: inherit;\n\tcolor: inherit;\n\tborder-radius: 0;\n\tbackground-color: transparent;\n}\n\n:where([raggu_web_front_base] :is(button, [role='button'], [mol_button], a)) {\n\tcursor: pointer;\n}\n\n[raggu_web_front_base] [mol_button][disabled] {\n\tcursor: not-allowed;\n}\n\n[raggu_web_front_base] ::placeholder {\n\topacity: 1;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_base] ::selection {\n\tbackground: var(--accent);\n\tcolor: var(--accent-ink);\n}\n\n[raggu_web_front_base] :focus-visible {\n\toutline: 2px solid var(--accent);\n\toutline-offset: 2px;\n\tborder-radius: 5px;\n}\n\n:where([raggu_web_front_base] [mol_view]) {\n\tword-break: normal;\n}\n\n@keyframes ragu-drift {\n\t0%   { transform: translate3d(0, 0, 0) scale(1); }\n\t33%  { transform: translate3d(3%, -4%, 0) scale(1.07); }\n\t66%  { transform: translate3d(-3%, 3%, 0) scale(0.96); }\n\t100% { transform: translate3d(0, 0, 0) scale(1); }\n}\n\n@keyframes ragu-shimmer {\n\tfrom { background-position: -160% 0; }\n\tto   { background-position: 260% 0; }\n}\n\n@keyframes ragu-rise {\n\tfrom { opacity: 0; transform: translateY(18px); }\n\tto   { opacity: 1; transform: none; }\n}\n\n@keyframes ragu-rise-far {\n\tfrom { opacity: 0; transform: translateY(26px); }\n\tto   { opacity: 1; transform: none; }\n}\n\n@keyframes ragu-fade {\n\tfrom { opacity: 0; }\n\tto   { opacity: 1; }\n}\n\n@keyframes ragu-caret {\n\t50% { opacity: 0; }\n}\n\n@keyframes ragu-stale {\n\t0%, 100% { opacity: 0.4; }\n\t50% { opacity: 0.85; }\n}\n\n@keyframes ragu-ping {\n\t75%, 100% { transform: scale(2); opacity: 0; }\n}\n\n@keyframes ragu-tumble {\n\tfrom { transform: rotateX(-22deg) rotateY(0deg); }\n\tto   { transform: rotateX(-22deg) rotateY(360deg); }\n}\n\n[raggu_web_front_base] .shimmer,\n[raggu_web_front_skeleton] {\n\tbackground-color: color-mix(in oklab, var(--edge) 60%, transparent);\n\tbackground-image: linear-gradient(\n\t\t100deg,\n\t\ttransparent 20%,\n\t\tcolor-mix(in oklab, var(--text-3) 28%, transparent) 45%,\n\t\ttransparent 70%\n\t);\n\tbackground-size: 220% 100%;\n\tanimation: ragu-shimmer 1.9s linear infinite;\n\tborder-radius: var(--radius-chip);\n\toverflow: hidden;\n}\n\n[raggu_web_front_label] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.6875rem;\n\tline-height: 1;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_reveal] {\n\topacity: 0;\n\ttransform: translateY(22px);\n\ttransition:\n\t\topacity 700ms var(--ease-out-quint),\n\t\ttransform 700ms var(--ease-out-quint);\n\ttransition-delay: var(--reveal-delay, 0ms);\n}\n\n[raggu_web_front_reveal][raggu_web_front_reveal_shown] {\n\topacity: 1;\n\ttransform: none;\n}\n\n[raggu_web_front_base] .is-stale {\n\tanimation: ragu-stale 1.4s ease-in-out infinite;\n}\n\n.accent-pane {\n\tposition: absolute;\n\tinset: 0;\n\tz-index: -1;\n\tborder-radius: inherit;\n\tbackground: var(--accent-pane);\n\tbox-shadow: var(--accent-glow);\n\ttransition:\n\t\topacity 240ms var(--ease-out-quint),\n\t\ttransform 320ms var(--ease-out-quint),\n\t\tbackground 200ms var(--ease-out-quint),\n\t\tbox-shadow 200ms var(--ease-out-quint);\n}\n\n*:hover > .accent-pane {\n\tbackground: var(--accent-pane-hover);\n\tbox-shadow: var(--accent-glow-hover);\n}\n\n@media (prefers-reduced-motion: reduce) {\n\thtml {\n\t\tscroll-behavior: auto;\n\t}\n\t*, *::before, *::after {\n\t\tanimation-duration: 0.001ms !important;\n\t\tanimation-iteration-count: 1 !important;\n\t\ttransition-duration: 0.001ms !important;\n\t}\n}\n\n:where([raggu_web_front_base]) [mol_button] {\n\tcursor: pointer;\n\tborder-radius: 0;\n}\n");
})($ || ($ = {}));
//raggu/web/front/base/-css/base.view.css.ts
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
//mol/storage/storage.ts
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
//mol/state/time/time.ts
;
"use strict";
var $;
(function ($) {
    class $mol_storage_node extends $mol_storage {
        static persisted() {
            return true;
        }
        static stats() {
            $mol_state_time.now(1000);
            return $node.fs.statfsSync('.');
        }
        static total() {
            const { blocks, bsize } = this.stats();
            return blocks * bsize;
        }
        static used() {
            const { blocks, bfree, bsize } = this.stats();
            return (blocks - bfree) * bsize;
        }
        static free() {
            const { bfree, bsize } = this.stats();
            return bfree * bsize;
        }
        static portion() {
            const { blocks, bfree } = this.stats();
            if (!blocks)
                return 1;
            return (blocks - bfree) / blocks;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_node, "stats", null);
    $.$mol_storage_node = $mol_storage_node;
    $.$mol_storage = $.$mol_storage_node;
})($ || ($ = {}));
//mol/storage/storage.node.ts
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
//mol/state/local/local.ts
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
//mol/lock/lock.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
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
//mol/compare/array/array.ts
;
"use strict";
//mol/charset/encoding/encoding.ts
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
//mol/charset/decode/decode.ts
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
//mol/charset/buffer/buffer.ts
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
//mol/charset/encode/encode.ts
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
//mol/file/transaction/transaction.ts
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
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        /** create if it doesn't already exist */
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        /** truncate to zero size if it already exists */
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        /** throw exception if it already exists */
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        /** data will be appended to the end */
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));
//mol/file/transaction/transaction.node.ts
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
//mol/file/base/base.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//mol/file/file.ts
;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            // Если папки/файла нет, watch упадет с ошибкой
            // exists обратится к parent.version и parent.watcher
            // Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
            // exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                // Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                // Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
                // Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                // Если в процессе работы вотчер сам закрылся, надо его переоткрыть
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));
//mol/file/file.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));
//mol/state/local/local.node.ts
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
            let direction;
            try {
                direction = new Intl.Locale(lang).getTextInfo().direction;
            }
            catch (e) {
                $mol_fail_log(e);
            }
            return direction ?? (this.langs_rtl().includes(lang) ? 'rtl' : 'ltr');
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
//mol/locale/locale.ts
;
"use strict";
var $;
(function ($) {
    function tally(values) {
        const counts = new Map();
        for (const value of values)
            counts.set(value, (counts.get(value) ?? 0) + 1);
        return [...counts]
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    }
    function hash_community(id) {
        let h = 2166136261;
        for (let i = 0; i < id.length; i++) {
            h ^= id.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return (h >>> 0) % 4096;
    }
    function $raggu_web_front_graph_build(response) {
        const nodes = response.nodes;
        const n = nodes.length;
        const index_of = new Map();
        for (let i = 0; i < n; i++)
            index_of.set(nodes[i].id, i);
        const edges = [];
        for (const edge of response.edges) {
            if (index_of.has(edge.source) && index_of.has(edge.target) && edge.source !== edge.target)
                edges.push(edge);
        }
        const m = edges.length;
        const edge_index_of = new Map();
        const edge_source = new Uint32Array(m);
        const edge_target = new Uint32Array(m);
        const edge_strength = new Float32Array(m);
        for (let e = 0; e < m; e++) {
            const edge = edges[e];
            edge_index_of.set(edge.id, e);
            edge_source[e] = index_of.get(edge.source) ?? 0;
            edge_target[e] = index_of.get(edge.target) ?? 0;
            edge_strength[e] = Number.isFinite(edge.strength) ? edge.strength : 0.5;
        }
        const x = new Float32Array(n);
        const y = new Float32Array(n);
        const degree = new Float32Array(n);
        const community = new Int32Array(n).fill(-1);
        const communities = response.communities ?? [];
        const community_index_of = new Map();
        communities.forEach((item, index) => community_index_of.set(item.id, index));
        let max_degree = 1;
        for (let i = 0; i < n; i++) {
            const node = nodes[i];
            x[i] = node.x;
            y[i] = node.y;
            degree[i] = node.degree;
            max_degree = Math.max(max_degree, node.degree);
            const cid = node.community_id;
            if (cid)
                community[i] = community_index_of.get(cid) ?? hash_community(cid);
        }
        const adj_offset = new Uint32Array(n + 1);
        for (let e = 0; e < m; e++) {
            adj_offset[edge_source[e] + 1] += 1;
            adj_offset[edge_target[e] + 1] += 1;
        }
        for (let i = 0; i < n; i++)
            adj_offset[i + 1] += adj_offset[i];
        const cursor = Uint32Array.from(adj_offset.subarray(0, n));
        const adj_node = new Uint32Array(m * 2);
        const adj_edge = new Uint32Array(m * 2);
        for (let e = 0; e < m; e++) {
            const a = edge_source[e];
            const b = edge_target[e];
            adj_node[cursor[a]] = b;
            adj_edge[cursor[a]] = e;
            cursor[a] += 1;
            adj_node[cursor[b]] = a;
            adj_edge[cursor[b]] = e;
            cursor[b] += 1;
        }
        return {
            nodes,
            edges,
            index_of,
            edge_index_of,
            adj_offset,
            adj_node,
            adj_edge,
            edge_source,
            edge_target,
            edge_strength,
            x,
            y,
            degree,
            community,
            communities,
            max_degree,
            types: tally(nodes.map(node => node.entity_type)),
            meta: response.meta,
        };
    }
    $.$raggu_web_front_graph_build = $raggu_web_front_graph_build;
    function $raggu_web_front_graph_hash01(value) {
        let h = value | 0;
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
        h = (h ^ (h >>> 16)) >>> 0;
        return h / 4294967296;
    }
    $.$raggu_web_front_graph_hash01 = $raggu_web_front_graph_hash01;
})($ || ($ = {}));
//raggu/web/front/graph/model.ts
;
"use strict";
//raggu/web/front/graph/types.ts
;
"use strict";
var $;
(function ($) {
    /** Self-contained: the worker gets this function's source text, so nothing outside it may be referenced. */
    function $raggu_web_front_graph_layout_solve(input, on_progress) {
        const THETA_SQ = 0.9 * 0.9;
        const MAX_DEPTH = 22;
        const EPS = 1e-4;
        function hash01(value) {
            let h = value | 0;
            h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
            h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
            h = (h ^ (h >>> 16)) >>> 0;
            return h / 4294967296;
        }
        function unit_vector(key) {
            const u = hash01(key * 2654435761) * 2 - 1;
            const phi = hash01(key * 40503 + 17) * Math.PI * 2;
            const r = Math.sqrt(Math.max(0, 1 - u * u));
            return [r * Math.cos(phi), r * Math.sin(phi), u];
        }
        function widen_int(source, length, fill) {
            const target = new Int32Array(length);
            target.fill(fill);
            target.set(source);
            return target;
        }
        function widen_float(source, length) {
            const target = new Float32Array(length);
            target.set(source);
            return target;
        }
        function create_tree(capacity) {
            return {
                capacity,
                children: new Int32Array(capacity * 8).fill(-1),
                count: new Int32Array(capacity),
                body: new Int32Array(capacity).fill(-1),
                mass: new Float32Array(capacity),
                com_x: new Float32Array(capacity),
                com_y: new Float32Array(capacity),
                com_z: new Float32Array(capacity),
                own_mass: new Float32Array(capacity),
                own_x: new Float32Array(capacity),
                own_y: new Float32Array(capacity),
                own_z: new Float32Array(capacity),
                center_x: new Float32Array(capacity),
                center_y: new Float32Array(capacity),
                center_z: new Float32Array(capacity),
                half: new Float32Array(capacity),
                used: 0,
            };
        }
        function grow(tree) {
            const next = tree.capacity * 2;
            tree.children = widen_int(tree.children, next * 8, -1);
            tree.count = widen_int(tree.count, next, 0);
            tree.body = widen_int(tree.body, next, -1);
            tree.mass = widen_float(tree.mass, next);
            tree.com_x = widen_float(tree.com_x, next);
            tree.com_y = widen_float(tree.com_y, next);
            tree.com_z = widen_float(tree.com_z, next);
            tree.own_mass = widen_float(tree.own_mass, next);
            tree.own_x = widen_float(tree.own_x, next);
            tree.own_y = widen_float(tree.own_y, next);
            tree.own_z = widen_float(tree.own_z, next);
            tree.center_x = widen_float(tree.center_x, next);
            tree.center_y = widen_float(tree.center_y, next);
            tree.center_z = widen_float(tree.center_z, next);
            tree.half = widen_float(tree.half, next);
            tree.capacity = next;
        }
        function reset(tree, cx, cy, cz, half) {
            tree.children.fill(-1, 0, tree.used * 8);
            tree.count.fill(0, 0, tree.used);
            tree.body.fill(-1, 0, tree.used);
            tree.own_mass.fill(0, 0, tree.used);
            tree.own_x.fill(0, 0, tree.used);
            tree.own_y.fill(0, 0, tree.used);
            tree.own_z.fill(0, 0, tree.used);
            tree.used = 1;
            tree.center_x[0] = cx;
            tree.center_y[0] = cy;
            tree.center_z[0] = cz;
            tree.half[0] = half;
            tree.count[0] = 0;
            tree.body[0] = -1;
        }
        function child_of(tree, node, px, py, pz) {
            const octant = (px > tree.center_x[node] ? 1 : 0) |
                (py > tree.center_y[node] ? 2 : 0) |
                (pz > tree.center_z[node] ? 4 : 0);
            const slot = node * 8 + octant;
            let child = tree.children[slot];
            if (child === -1) {
                if (tree.used >= tree.capacity)
                    grow(tree);
                child = tree.used++;
                tree.children[slot] = child;
                const half = tree.half[node] * 0.5;
                tree.half[child] = half;
                tree.center_x[child] = tree.center_x[node] + (octant & 1 ? half : -half);
                tree.center_y[child] = tree.center_y[node] + (octant & 2 ? half : -half);
                tree.center_z[child] = tree.center_z[node] + (octant & 4 ? half : -half);
                tree.count[child] = 0;
                tree.body[child] = -1;
            }
            return child;
        }
        function place(tree, start, body, positions, mass, start_depth) {
            let node = start;
            for (let depth = start_depth; depth <= MAX_DEPTH; depth++) {
                tree.count[node] += 1;
                if (depth === MAX_DEPTH) {
                    const m = mass[body];
                    tree.own_mass[node] += m;
                    tree.own_x[node] += positions[body * 3] * m;
                    tree.own_y[node] += positions[body * 3 + 1] * m;
                    tree.own_z[node] += positions[body * 3 + 2] * m;
                    return;
                }
                if (tree.count[node] === 1) {
                    tree.body[node] = body;
                    return;
                }
                const resident = tree.body[node];
                if (resident !== -1) {
                    tree.body[node] = -1;
                    const target = child_of(tree, node, positions[resident * 3], positions[resident * 3 + 1], positions[resident * 3 + 2]);
                    place(tree, target, resident, positions, mass, depth + 1);
                }
                node = child_of(tree, node, positions[body * 3], positions[body * 3 + 1], positions[body * 3 + 2]);
            }
        }
        function summarise(tree, positions, mass) {
            for (let node = tree.used - 1; node >= 0; node--) {
                let m = tree.own_mass[node];
                let sx = tree.own_x[node];
                let sy = tree.own_y[node];
                let sz = tree.own_z[node];
                const resident = tree.body[node];
                if (resident !== -1) {
                    const bm = mass[resident];
                    m += bm;
                    sx += positions[resident * 3] * bm;
                    sy += positions[resident * 3 + 1] * bm;
                    sz += positions[resident * 3 + 2] * bm;
                }
                for (let octant = 0; octant < 8; octant++) {
                    const child = tree.children[node * 8 + octant];
                    if (child === -1)
                        continue;
                    const cm = tree.mass[child];
                    m += cm;
                    sx += tree.com_x[child] * cm;
                    sy += tree.com_y[child] * cm;
                    sz += tree.com_z[child] * cm;
                }
                tree.mass[node] = m;
                if (m > 0) {
                    tree.com_x[node] = sx / m;
                    tree.com_y[node] = sy / m;
                    tree.com_z[node] = sz / m;
                }
            }
        }
        function normalise(positions, radius) {
            const count = positions.length / 3;
            let cx = 0;
            let cy = 0;
            let cz = 0;
            for (let i = 0; i < count; i++) {
                cx += positions[i * 3];
                cy += positions[i * 3 + 1];
                cz += positions[i * 3 + 2];
            }
            cx /= count;
            cy /= count;
            cz /= count;
            const radii = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                const dx = positions[i * 3] - cx;
                const dy = positions[i * 3 + 1] - cy;
                const dz = positions[i * 3 + 2] - cz;
                positions[i * 3] = dx;
                positions[i * 3 + 1] = dy;
                positions[i * 3 + 2] = dz;
                radii[i] = Math.hypot(dx, dy, dz);
            }
            const sorted = Float32Array.from(radii).sort();
            const percentile = sorted[Math.min(count - 1, Math.floor(count * 0.88))] || 1;
            const scale = radius / percentile;
            for (let i = 0; i < positions.length; i++)
                positions[i] *= scale;
        }
        const n = input.x.length;
        const positions = new Float32Array(n * 3);
        let extent = 1e-6;
        for (let i = 0; i < n; i++)
            extent = Math.max(extent, Math.abs(input.x[i]), Math.abs(input.y[i]));
        const seed_scale = 1 / extent;
        for (let i = 0; i < n; i++) {
            const community = input.community[i];
            const axis = community >= 0 ? unit_vector(community + 1) : [0, 0, 0];
            const jx = (hash01(i * 3 + 1) - 0.5) * 0.04;
            const jy = (hash01(i * 3 + 2) - 0.5) * 0.04;
            const jz = (hash01(i * 3 + 3) - 0.5) * 0.35;
            positions[i * 3] = input.x[i] * seed_scale + axis[0] * 0.22 + jx;
            positions[i * 3 + 1] = input.y[i] * seed_scale + axis[1] * 0.22 + jy;
            positions[i * 3 + 2] = axis[2] * 0.5 + jz;
        }
        if (n === 0)
            return positions;
        if (n === 1) {
            positions.set([0, 0, 0]);
            return positions;
        }
        const iterations = input.iterations ?? (n <= 400 ? 260 : n <= 900 ? 220 : n <= 1800 ? 170 : 130);
        const radius = input.radius ?? 3.2;
        const mass = new Float32Array(n);
        for (let i = 0; i < n; i++)
            mass[i] = 1 + Math.sqrt(input.degree[i]) * 0.6;
        const velocity = new Float32Array(n * 3);
        const force = new Float32Array(n * 3);
        const tree = create_tree(Math.max(64, n * 4));
        const edge_count = input.edge_source.length;
        const attraction = 0.55 / Math.max(1, Math.sqrt(edge_count / Math.max(1, n)));
        const repulsion = 0.078;
        const gravity = 0.018;
        const stack = new Int32Array(MAX_DEPTH * 8 + 16);
        for (let step = 0; step < iterations; step++) {
            const alpha = 0.9 * Math.pow(1 - step / iterations, 1.4) + 0.02;
            force.fill(0);
            let min_x = Infinity;
            let min_y = Infinity;
            let min_z = Infinity;
            let max_x = -Infinity;
            let max_y = -Infinity;
            let max_z = -Infinity;
            for (let i = 0; i < n; i++) {
                const px = positions[i * 3];
                const py = positions[i * 3 + 1];
                const pz = positions[i * 3 + 2];
                if (px < min_x)
                    min_x = px;
                if (py < min_y)
                    min_y = py;
                if (pz < min_z)
                    min_z = pz;
                if (px > max_x)
                    max_x = px;
                if (py > max_y)
                    max_y = py;
                if (pz > max_z)
                    max_z = pz;
            }
            const half = Math.max(max_x - min_x, max_y - min_y, max_z - min_z) * 0.5 + 0.5;
            reset(tree, (min_x + max_x) * 0.5, (min_y + max_y) * 0.5, (min_z + max_z) * 0.5, half);
            for (let i = 0; i < n; i++)
                place(tree, 0, i, positions, mass, 0);
            summarise(tree, positions, mass);
            for (let i = 0; i < n; i++) {
                const px = positions[i * 3];
                const py = positions[i * 3 + 1];
                const pz = positions[i * 3 + 2];
                const mi = mass[i];
                let fx = 0;
                let fy = 0;
                let fz = 0;
                let top = 0;
                stack[top++] = 0;
                while (top > 0) {
                    const node = stack[--top];
                    const node_mass = tree.mass[node];
                    if (node_mass <= 0)
                        continue;
                    if (tree.body[node] === i && tree.count[node] === 1)
                        continue;
                    const dx = px - tree.com_x[node];
                    const dy = py - tree.com_y[node];
                    const dz = pz - tree.com_z[node];
                    const dist_sq = dx * dx + dy * dy + dz * dz + EPS;
                    const width = tree.half[node] * 2;
                    if (width * width < THETA_SQ * dist_sq || tree.count[node] === 1) {
                        const inv = 1 / Math.sqrt(dist_sq);
                        const magnitude = (repulsion * node_mass * mi) / dist_sq;
                        fx += dx * inv * magnitude;
                        fy += dy * inv * magnitude;
                        fz += dz * inv * magnitude;
                    }
                    else {
                        for (let octant = 0; octant < 8; octant++) {
                            const child = tree.children[node * 8 + octant];
                            if (child !== -1 && top < stack.length)
                                stack[top++] = child;
                        }
                    }
                }
                force[i * 3] += fx;
                force[i * 3 + 1] += fy;
                force[i * 3 + 2] += fz;
            }
            for (let e = 0; e < edge_count; e++) {
                const a = input.edge_source[e];
                const b = input.edge_target[e];
                const weight = attraction * (0.35 + (input.edge_strength[e] || 0.5) * 0.65);
                const dx = positions[b * 3] - positions[a * 3];
                const dy = positions[b * 3 + 1] - positions[a * 3 + 1];
                const dz = positions[b * 3 + 2] - positions[a * 3 + 2];
                force[a * 3] += dx * weight;
                force[a * 3 + 1] += dy * weight;
                force[a * 3 + 2] += dz * weight;
                force[b * 3] -= dx * weight;
                force[b * 3 + 1] -= dy * weight;
                force[b * 3 + 2] -= dz * weight;
            }
            for (let i = 0; i < n; i++) {
                const o = i * 3;
                force[o] -= positions[o] * gravity;
                force[o + 1] -= positions[o + 1] * gravity;
                force[o + 2] -= positions[o + 2] * gravity;
                velocity[o] = (velocity[o] + force[o] * alpha) * 0.72;
                velocity[o + 1] = (velocity[o + 1] + force[o + 1] * alpha) * 0.72;
                velocity[o + 2] = (velocity[o + 2] + force[o + 2] * alpha) * 0.72;
                const speed = Math.hypot(velocity[o], velocity[o + 1], velocity[o + 2]);
                const damp = speed > 0.35 ? 0.35 / speed : 1;
                positions[o] += velocity[o] * damp;
                positions[o + 1] += velocity[o + 1] * damp;
                positions[o + 2] += velocity[o + 2] * damp;
            }
            if (on_progress && step % 12 === 0)
                on_progress(step / iterations);
        }
        normalise(positions, radius);
        on_progress?.(1);
        return positions;
    }
    $.$raggu_web_front_graph_layout_solve = $raggu_web_front_graph_layout_solve;
    const $raggu_web_front_graph_layout_cache = new Map();
    /** Solves in a worker built from the solver's own source; cached for the session. */
    function $raggu_web_front_graph_layout(model, on_progress, radius = 3.2) {
        const key = `${model.meta.dataset_id}:${model.nodes.length}:${model.edges.length}:${radius}`;
        const cached = $raggu_web_front_graph_layout_cache.get(key);
        if (cached)
            return { promise: Promise.resolve(cached), cancel: () => { } };
        const source = `
			const solve = ${$raggu_web_front_graph_layout_solve.toString()}
			onmessage = event => {
				const positions = solve( event.data, ratio => postMessage( { type: 'progress', ratio } ) )
				postMessage( { type: 'done', positions }, [ positions.buffer ] )
			}
		`;
        const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
        const worker = new Worker(url);
        const promise = new Promise((done, fail) => {
            worker.onmessage = (event) => {
                if (event.data.type === 'progress')
                    return on_progress(event.data.ratio);
                $raggu_web_front_graph_layout_cache.set(key, event.data.positions);
                worker.terminate();
                URL.revokeObjectURL(url);
                done(event.data.positions);
            };
            worker.onerror = event => {
                worker.terminate();
                URL.revokeObjectURL(url);
                fail(new Error(event.message));
            };
        });
        worker.postMessage({
            x: model.x.slice(),
            y: model.y.slice(),
            degree: model.degree.slice(),
            community: model.community.slice(),
            edge_source: model.edge_source.slice(),
            edge_target: model.edge_target.slice(),
            edge_strength: model.edge_strength.slice(),
            radius,
        });
        return {
            promise,
            cancel: () => {
                worker.terminate();
                URL.revokeObjectURL(url);
            },
        };
    }
    $.$raggu_web_front_graph_layout = $raggu_web_front_graph_layout;
})($ || ($ = {}));
//raggu/web/front/graph/layout.ts
;
"use strict";
var $;
(function ($) {
    function $raggu_web_front_lib_sse(on_event) {
        let buffer = '';
        const flush = (block) => {
            let event = 'message';
            const data = [];
            for (const line of block.split(/\r?\n/)) {
                if (line.startsWith('event:'))
                    event = line.slice(6).trim();
                else if (line.startsWith('data:'))
                    data.push(line.slice(5).replace(/^ /, ''));
            }
            if (data.length > 0)
                on_event({ event, data: data.join('\n') });
        };
        return {
            push(piece) {
                buffer += piece;
                const blocks = buffer.split(/\r?\n\r?\n/);
                buffer = blocks.pop() ?? '';
                for (const block of blocks)
                    flush(block);
            },
            end() {
                flush(buffer);
                buffer = '';
            },
        };
    }
    $.$raggu_web_front_lib_sse = $raggu_web_front_lib_sse;
})($ || ($ = {}));
//raggu/web/front/lib/sse.ts
;
"use strict";
var $;
(function ($) {
    const id_pattern = String.raw `(?:ent|rel|chunk)-[0-9a-f]{6,}|[0-9a-f]{16,}`;
    const citation = new RegExp(String.raw `\(\s*(?:([^():,;-]{0,24}?)[\s:.]+)?((?:${id_pattern})(?:\s*[,;]\s*(?:${id_pattern}))*)\s*\)`, 'gi');
    const kind_words = [
        [/^(ent|entity|сущност)/i, 'entity'],
        [/^(rel|relation|связ|отношен)/i, 'relation'],
        [/(chunk|фрагмент|source|источник|см)/i, 'chunk'],
    ];
    function kind_of(raw, label) {
        if (raw.startsWith('ent-'))
            return 'entity';
        if (raw.startsWith('rel-'))
            return 'relation';
        if (raw.startsWith('chunk-'))
            return 'chunk';
        for (const [pattern, kind] of kind_words) {
            if (pattern.test(label))
                return kind;
        }
        return 'chunk';
    }
    function canonical(raw, kind) {
        if (raw.includes('-'))
            return raw;
        return `${kind === 'entity' ? 'ent' : kind === 'relation' ? 'rel' : 'chunk'}-${raw}`;
    }
    const bold = /\*\*([^*]+)\*\*/g;
    function push_text(segments, value) {
        if (!value)
            return;
        const last = segments[segments.length - 1];
        if (last?.kind === 'text')
            last.value += value;
        else
            segments.push({ kind: 'text', value });
    }
    function push_prose(segments, value) {
        if (!value)
            return;
        let cursor = 0;
        bold.lastIndex = 0;
        for (let match = bold.exec(value); match !== null; match = bold.exec(value)) {
            push_text(segments, value.slice(cursor, match.index));
            segments.push({ kind: 'strong', value: match[1] });
            cursor = match.index + match[0].length;
        }
        push_text(segments, value.slice(cursor));
    }
    function $raggu_web_front_lib_cite_parse(content, resolve) {
        const segments = [];
        let cursor = 0;
        citation.lastIndex = 0;
        for (let match = citation.exec(content); match !== null; match = citation.exec(content)) {
            push_prose(segments, content.slice(cursor, match.index));
            cursor = match.index + match[0].length;
            const raws = match[2].split(/\s*[,;]\s*/);
            for (let position = 0; position < raws.length; position++) {
                const raw = raws[position].toLowerCase();
                const type = kind_of(raw, match[1] ?? '');
                const id = canonical(raw, type);
                const label = resolve?.(id, type);
                const previous = segments[segments.length - 1];
                if (position === 0 && label && previous?.kind === 'text') {
                    const trimmed = previous.value.replace(/\s+$/, '');
                    if (trimmed.toLowerCase().endsWith(label.toLowerCase())) {
                        const cut = trimmed.length - label.length;
                        previous.value = trimmed.slice(0, cut);
                        segments.push({ kind: 'ref', id, type, text: trimmed.slice(cut), inline: true });
                        continue;
                    }
                }
                if (position > 0)
                    segments.push({ kind: 'text', value: ' ' });
                segments.push({
                    kind: 'ref',
                    id,
                    type,
                    text: label ?? (type === 'entity' ? id.slice(4, 12) : type === 'relation' ? 'rel' : 'src'),
                    inline: false,
                });
            }
        }
        push_prose(segments, content.slice(cursor));
        return segments;
    }
    $.$raggu_web_front_lib_cite_parse = $raggu_web_front_lib_cite_parse;
})($ || ($ = {}));
//raggu/web/front/lib/cite.ts
;
"use strict";
var $;
(function ($) {
    $.$raggu_web_front_lib_rich_tags = [
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
        'b', 'strong', 'i', 'em', 'u', 'sub', 'sup', 'br', 'p', 'span', 'ul', 'ol', 'li', 'code',
    ];
    const html_tag = new RegExp(`</?(?:${$.$raggu_web_front_lib_rich_tags.join('|')})\\b[^>]*>`, 'i');
    function $raggu_web_front_lib_rich_html(text) {
        return html_tag.test(text);
    }
    $.$raggu_web_front_lib_rich_html = $raggu_web_front_lib_rich_html;
    function $raggu_web_front_lib_rich_math(text) {
        return $raggu_web_front_lib_rich_split(text).some(part => part.kind === 'math');
    }
    $.$raggu_web_front_lib_rich_math = $raggu_web_front_lib_rich_math;
    function $raggu_web_front_lib_rich_markup(text) {
        return $raggu_web_front_lib_rich_html(text) || $raggu_web_front_lib_rich_math(text);
    }
    $.$raggu_web_front_lib_rich_markup = $raggu_web_front_lib_rich_markup;
    const pairs = [
        { open: '$$', close: '$$', display: true },
        { open: '\\[', close: '\\]', display: true },
        { open: '\\(', close: '\\)', display: false },
    ];
    function closing_dollar(text, open) {
        const first = text[open + 1];
        if (first === undefined || /\s/.test(first))
            return -1;
        for (let j = open + 1; j < text.length; j += 1) {
            if (text[j] === '\n' && text[j + 1] === '\n')
                return -1;
            if (text[j] === '$' && text[j - 1] !== '\\') {
                if (/\s/.test(text[j - 1]) || /\d/.test(text[j + 1] ?? ''))
                    return -1;
                return j;
            }
        }
        return -1;
    }
    function $raggu_web_front_lib_rich_split(text) {
        const parts = [];
        let prose = '';
        let i = 0;
        const flush = () => {
            if (!prose)
                return;
            parts.push({ kind: 'text', value: prose });
            prose = '';
        };
        while (i < text.length) {
            if (text.startsWith('\\$', i)) {
                prose += '$';
                i += 2;
                continue;
            }
            const pair = pairs.find(candidate => text.startsWith(candidate.open, i));
            if (pair) {
                const end = text.indexOf(pair.close, i + pair.open.length);
                const body = end === -1 ? '' : text.slice(i + pair.open.length, end);
                if (body.trim()) {
                    flush();
                    parts.push({ kind: 'math', value: body.trim(), display: pair.display });
                    i = end + pair.close.length;
                    continue;
                }
            }
            if (text[i] === '$' && !text.startsWith('$$', i)) {
                const end = closing_dollar(text, i);
                if (end !== -1) {
                    flush();
                    parts.push({ kind: 'math', value: text.slice(i + 1, end), display: false });
                    i = end + 1;
                    continue;
                }
            }
            prose += text[i];
            i += 1;
        }
        flush();
        return parts;
    }
    $.$raggu_web_front_lib_rich_split = $raggu_web_front_lib_rich_split;
})($ || ($ = {}));
//raggu/web/front/lib/rich.ts
;
"use strict";
var $;
(function ($) {
    function $raggu_web_front_lib_lang() {
        return $mol_locale.lang() === 'ru' ? 'ru' : 'en';
    }
    $.$raggu_web_front_lib_lang = $raggu_web_front_lib_lang;
    function $raggu_web_front_lib_compact(n, locale = $raggu_web_front_lib_lang()) {
        return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
    }
    $.$raggu_web_front_lib_compact = $raggu_web_front_lib_compact;
    function $raggu_web_front_lib_badge(n) {
        if (n < 1000)
            return String(n);
        if (n < 999_500)
            return `${(n / 1000).toFixed(n < 9950 ? 1 : 0)}k`;
        return `${(n / 1_000_000).toFixed(1)}M`;
    }
    $.$raggu_web_front_lib_badge = $raggu_web_front_lib_badge;
    function $raggu_web_front_lib_full(n, locale = $raggu_web_front_lib_lang()) {
        return new Intl.NumberFormat(locale).format(n);
    }
    $.$raggu_web_front_lib_full = $raggu_web_front_lib_full;
    function $raggu_web_front_lib_ms(value) {
        return value < 1000 ? `${Math.round(value)} ms` : `${(value / 1000).toFixed(1)} s`;
    }
    $.$raggu_web_front_lib_ms = $raggu_web_front_lib_ms;
    function $raggu_web_front_lib_watt_hours(value) {
        if (value < 0.001)
            return `${(value * 1_000_000).toFixed(0)} µWh`;
        if (value < 1)
            return `${(value * 1000).toFixed(value < 0.01 ? 1 : 0)} mWh`;
        return `${value.toFixed(2)} Wh`;
    }
    $.$raggu_web_front_lib_watt_hours = $raggu_web_front_lib_watt_hours;
    function $raggu_web_front_lib_humanize(raw) {
        const words = raw.replace(/[_\s]+/g, ' ').trim().toLowerCase();
        return words.charAt(0).toUpperCase() + words.slice(1);
    }
    $.$raggu_web_front_lib_humanize = $raggu_web_front_lib_humanize;
    function $raggu_web_front_lib_clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
    $.$raggu_web_front_lib_clamp = $raggu_web_front_lib_clamp;
    function $raggu_web_front_lib_type_key(raw) {
        return raw
            .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toUpperCase();
    }
    let $raggu_web_front_lib_names_all = null;
    function $raggu_web_front_lib_type_name(kind, raw) {
        const names = $raggu_web_front_lib_names_all ??= new $raggu_web_front_lib_names;
        const method = names[`${kind}_${$raggu_web_front_lib_type_key(raw)}`];
        if (typeof method === 'function')
            return String(method.call(names));
        return $raggu_web_front_lib_humanize(raw);
    }
    function $raggu_web_front_lib_entity_name(raw) {
        return $raggu_web_front_lib_type_name('entity', raw);
    }
    $.$raggu_web_front_lib_entity_name = $raggu_web_front_lib_entity_name;
    function $raggu_web_front_lib_relation_name(raw) {
        return $raggu_web_front_lib_type_name('relation', raw);
    }
    $.$raggu_web_front_lib_relation_name = $raggu_web_front_lib_relation_name;
})($ || ($ = {}));
//raggu/web/front/lib/format.ts
;
"use strict";
var $;
(function ($) {
    $.$raggu_web_front_lib_settings_default = {
        useGraph: true,
        queryPlan: false,
        topK: 8,
        rerank: false,
        graphLimit: 600,
    };
    $.$raggu_web_front_lib_graph_limit_max = 5000;
    $.$raggu_web_front_lib_graph_limit_steps = [600, 1500, 3000, 5000];
    $.$raggu_web_front_lib_top_k_min = 1;
    $.$raggu_web_front_lib_top_k_max = 50;
    function $raggu_web_front_lib_settings_revive(raw) {
        const base = $.$raggu_web_front_lib_settings_default;
        if (typeof raw !== 'object' || raw === null)
            return base;
        const value = raw;
        const clamp = $raggu_web_front_lib_clamp;
        return {
            useGraph: typeof value.useGraph === 'boolean' ? value.useGraph : base.useGraph,
            queryPlan: typeof value.queryPlan === 'boolean' ? value.queryPlan : base.queryPlan,
            topK: typeof value.topK === 'number'
                ? clamp(Math.round(value.topK), $.$raggu_web_front_lib_top_k_min, $.$raggu_web_front_lib_top_k_max)
                : base.topK,
            rerank: typeof value.rerank === 'boolean' ? value.rerank : base.rerank,
            graphLimit: typeof value.graphLimit === 'number'
                ? clamp(Math.round(value.graphLimit), 50, $.$raggu_web_front_lib_graph_limit_max)
                : base.graphLimit,
        };
    }
    $.$raggu_web_front_lib_settings_revive = $raggu_web_front_lib_settings_revive;
    class $raggu_web_front_lib_settings extends $mol_object {
        static value(next) {
            const stored = this.$.$mol_state_local.value('ragu.settings', next);
            return $raggu_web_front_lib_settings_revive(stored);
        }
        static patch(patch) {
            this.value({ ...this.value(), ...patch });
        }
        static reset() {
            this.value($.$raggu_web_front_lib_settings_default);
        }
    }
    __decorate([
        $mol_mem
    ], $raggu_web_front_lib_settings, "value", null);
    $.$raggu_web_front_lib_settings = $raggu_web_front_lib_settings;
})($ || ($ = {}));
//raggu/web/front/lib/settings.ts
;
	($.$raggu_web_front_lib_names) = class $raggu_web_front_lib_names extends ($.$mol_object) {
		entity_AGE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_AGE"));
		}
		entity_ANATOMICAL_STRUCTURE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ANATOMICAL_STRUCTURE"));
		}
		entity_ANATOMICAL_SYSTEM(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ANATOMICAL_SYSTEM"));
		}
		entity_ANATOMY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ANATOMY"));
		}
		entity_ATTRIBUTE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ATTRIBUTE"));
		}
		entity_AWARD(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_AWARD"));
		}
		entity_BEHAVIOR(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_BEHAVIOR"));
		}
		entity_BIOLOGICAL_ENTITY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_BIOLOGICAL_ENTITY"));
		}
		entity_BIOLOGICAL_PROCESS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_BIOLOGICAL_PROCESS"));
		}
		entity_BIOMATERIAL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_BIOMATERIAL"));
		}
		entity_CELL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CELL"));
		}
		entity_CELL_TYPE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CELL_TYPE"));
		}
		entity_CITY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CITY"));
		}
		entity_CLASSIFICATION_SYSTEM(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CLASSIFICATION_SYSTEM"));
		}
		entity_CONCEPT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CONCEPT"));
		}
		entity_CONDITION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CONDITION"));
		}
		entity_COUNTRY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_COUNTRY"));
		}
		entity_CRIME(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_CRIME"));
		}
		entity_DATE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DATE"));
		}
		entity_DESCRIPTION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DESCRIPTION"));
		}
		entity_DISEASE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DISEASE"));
		}
		entity_DISEASE_OR_DISORDER(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DISEASE_OR_DISORDER"));
		}
		entity_DISTRICT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DISTRICT"));
		}
		entity_DOCUMENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DOCUMENT"));
		}
		entity_DRUG_OR_CHEMICAL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_DRUG_OR_CHEMICAL"));
		}
		entity_EVENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_EVENT"));
		}
		entity_FACILITY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_FACILITY"));
		}
		entity_FAMILY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_FAMILY"));
		}
		entity_GENE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_GENE"));
		}
		entity_GENE_MUTATION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_GENE_MUTATION"));
		}
		entity_GENE_OR_PROTEIN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_GENE_OR_PROTEIN"));
		}
		entity_GENETIC_TEST(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_GENETIC_TEST"));
		}
		entity_GROUP(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_GROUP"));
		}
		entity_HORMONE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_HORMONE"));
		}
		entity_IDEOLOGY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_IDEOLOGY"));
		}
		entity_LANGUAGE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_LANGUAGE"));
		}
		entity_LAW(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_LAW"));
		}
		entity_LOCATION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_LOCATION"));
		}
		entity_MEASUREMENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_MEASUREMENT"));
		}
		entity_MEASUREMENT_OR_OUTCOME(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_MEASUREMENT_OR_OUTCOME"));
		}
		entity_MEDICAL_CONDITION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_MEDICAL_CONDITION"));
		}
		entity_MONEY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_MONEY"));
		}
		entity_NATIONALITY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_NATIONALITY"));
		}
		entity_NUMBER(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_NUMBER"));
		}
		entity_ORDINAL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ORDINAL"));
		}
		entity_ORGAN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ORGAN"));
		}
		entity_ORGANIZATION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_ORGANIZATION"));
		}
		entity_PATHOLOGICAL_ENTITY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PATHOLOGICAL_ENTITY"));
		}
		entity_PENALTY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PENALTY"));
		}
		entity_PERCENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PERCENT"));
		}
		entity_PERSON(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PERSON"));
		}
		entity_PROCEDURE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROCEDURE"));
		}
		entity_PROCEDURE_OR_INTERVENTION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROCEDURE_OR_INTERVENTION"));
		}
		entity_PROCESS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROCESS"));
		}
		entity_PRODUCT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PRODUCT"));
		}
		entity_PROFESSION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROFESSION"));
		}
		entity_PROTEIN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROTEIN"));
		}
		entity_PROTOCOL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_PROTOCOL"));
		}
		entity_RELIGION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_RELIGION"));
		}
		entity_SOFTWARE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_SOFTWARE"));
		}
		entity_STATE_OR_PROV(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_STATE_OR_PROV"));
		}
		entity_SUBTYPE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_SUBTYPE"));
		}
		entity_SURGERY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_SURGERY"));
		}
		entity_SYMPTOM_OR_FINDING(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_SYMPTOM_OR_FINDING"));
		}
		entity_SYSTEM(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_SYSTEM"));
		}
		entity_TEST(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_TEST"));
		}
		entity_TIME(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_TIME"));
		}
		entity_TREATMENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_TREATMENT"));
		}
		entity_WEBSITE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_WEBSITE"));
		}
		entity_WORK_OF_ART(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_entity_WORK_OF_ART"));
		}
		relation_AFFECTED_BY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_AFFECTED_BY"));
		}
		relation_AFFECTS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_AFFECTS"));
		}
		relation_AGENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_AGENT"));
		}
		relation_ALTERNATIVE_TO(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_ALTERNATIVE_TO"));
		}
		relation_APPLICABLE_TO(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_APPLICABLE_TO"));
		}
		relation_BASED_ON(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_BASED_ON"));
		}
		relation_BIOMARKER(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_BIOMARKER"));
		}
		relation_CAUSE_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_CAUSE_OF"));
		}
		relation_CELL_TYPE_PRESENT_IN_DISEASE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_CELL_TYPE_PRESENT_IN_DISEASE"));
		}
		relation_COMBINED_WITH(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_COMBINED_WITH"));
		}
		relation_CONTAINS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_CONTAINS"));
		}
		relation_COVERED_BY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_COVERED_BY"));
		}
		relation_DIAGNOSED_WITH(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_DIAGNOSED_WITH"));
		}
		relation_DOCUMENT_SOURCE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_DOCUMENT_SOURCE"));
		}
		relation_EXAMPLE_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_EXAMPLE_OF"));
		}
		relation_EXPRESSED_IN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_EXPRESSED_IN"));
		}
		relation_GENE_ASSOCIATION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_GENE_ASSOCIATION"));
		}
		relation_HAS_CAUSE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_HAS_CAUSE"));
		}
		relation_HAS_EFFECT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_HAS_EFFECT"));
		}
		relation_INCIDENCE_INCREASES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_INCIDENCE_INCREASES"));
		}
		relation_INSTANCE_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_INSTANCE_OF"));
		}
		relation_INVOLVES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_INVOLVES"));
		}
		relation_INVOLVES_REMOVAL(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_INVOLVES_REMOVAL"));
		}
		relation_INVOLVES_TEST(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_INVOLVES_TEST"));
		}
		relation_LOCATED_IN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_LOCATED_IN"));
		}
		relation_LOCATION(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_LOCATION"));
		}
		relation_LOCATION_OF_DISEASE(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_LOCATION_OF_DISEASE"));
		}
		relation_MANAGEMENT_STRATEGY(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_MANAGEMENT_STRATEGY"));
		}
		relation_PART_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_PART_OF"));
		}
		relation_PARTICIPANT_IN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_PARTICIPANT_IN"));
		}
		relation_PRECEDES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_PRECEDES"));
		}
		relation_PRODUCES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_PRODUCES"));
		}
		relation_PRODUCT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_PRODUCT"));
		}
		relation_RELATED_TO(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_RELATED_TO"));
		}
		relation_REMOVES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_REMOVES"));
		}
		relation_REPORTED_TO(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_REPORTED_TO"));
		}
		relation_RISK_FACTOR(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_RISK_FACTOR"));
		}
		relation_RISK_FACTOR_FOR(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_RISK_FACTOR_FOR"));
		}
		relation_SIDE_EFFECT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_SIDE_EFFECT"));
		}
		relation_SPREAD_TO(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_SPREAD_TO"));
		}
		relation_STARTS_IN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_STARTS_IN"));
		}
		relation_SUBCLASS_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_SUBCLASS_OF"));
		}
		relation_SUPERCLASS_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_SUPERCLASS_OF"));
		}
		relation_SYNONYM(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_SYNONYM"));
		}
		relation_TARGET_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TARGET_OF"));
		}
		relation_TARGETS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TARGETS"));
		}
		relation_TREATMENT(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TREATMENT"));
		}
		relation_TREATMENT_FOR(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TREATMENT_FOR"));
		}
		relation_TREATS(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TREATS"));
		}
		relation_TYPE_OF(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_TYPE_OF"));
		}
		relation_USED_FOR(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_USED_FOR"));
		}
		relation_USED_IN(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_USED_IN"));
		}
		relation_USES(){
			return (this.$.$mol_locale.text("$raggu_web_front_lib_names_relation_USES"));
		}
	};

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
//mol/rest/code/code.ts
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
//mol/error/fence/fence.ts
;
"use strict";
var $;
(function ($) {
    function $mol_error_enriched(cause, cb) {
        return $mol_error_fence(cb, e => new $mol_error_mix(e.message, cause, e));
    }
    $.$mol_error_enriched = $mol_error_enriched;
})($ || ($ = {}));
//mol/error/enriched/enriched.ts
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
//mol/dom/parse/parse.ts
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
            const native = $mol_error_enriched(this, () => $mol_wire_sync(this).response_async());
            return this.$.$mol_fetch_response.make({
                native,
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
//mol/fetch/fetch.ts
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
//raggu/web/front/api/api.ts
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
    $.$raggu_web_front_api_ragu_stream_agent_message = {
        method: "POST",
        route: "/api/v1/datasets/{dataset_id}/agent/messages/stream",
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
//raggu/web/front/api/ragu.openapi.ts
;
"use strict";
var $;
(function ($) {
    class $raggu_web_front_mock extends $mol_object {
        static enabled() {
            return Boolean($mol_state_arg.value('mock'));
        }
        static root() {
            return 'raggu/web/front/mock/fixtures/';
        }
        static files = new Map();
        static file(name) {
            let found = this.files.get(name);
            if (found)
                return found;
            found = fetch(this.root() + name + '.json').then(response => {
                if (!response.ok)
                    throw new Error(`mock ${name}: ${response.status}`);
                return response.json();
            });
            found.catch(() => this.files.delete(name));
            this.files.set(name, found);
            return found;
        }
        static async json(path) {
            return await (await this.response(path)).json();
        }
        static async response(path, init) {
            const url = new URL(path, 'http://mock');
            const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
            const query = url.searchParams;
            if (parts.length === 1)
                return this.reply(await this.file(`datasets.${this.lang(query.get('locale'))}`));
            const [, corpus, section, kind, node] = parts;
            if (section === 'graph' && !kind)
                return this.reply(await this.graph(corpus, query));
            if (section === 'graph' && kind === 'communities')
                return this.reply(await this.file(`${corpus}.communities`));
            if (section === 'graph' && kind === 'nodes')
                return this.reply(await this.node(corpus, node));
            if (section === 'agent' && kind === 'suggestions')
                return this.reply(await this.file(`${corpus}.suggestions.${this.lang(query.get('locale'))}`));
            if (section === 'agent' && kind === 'messages') {
                const body = JSON.parse(String(init?.body ?? '{}'));
                const answer = await this.file(`${corpus}.answer.${this.lang(body.locale)}`);
                if (node === 'stream')
                    return this.stream(answer, init?.signal ?? undefined);
                return this.reply({ message: this.fresh(answer) });
            }
            return new Response('mock: unknown route', { status: 404 });
        }
        static lang(raw) {
            return raw === 'ru' ? 'ru' : 'en';
        }
        static reply(data) {
            return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
        }
        static fresh(answer) {
            return { ...answer.message, id: `mock-${Date.now()}`, created_at: new Date().toISOString() };
        }
        static async graph(corpus, query) {
            const full = await this.file(`${corpus}.graph`);
            const wanted = new Set(query.getAll('community_ids'));
            const limit = Number(query.get('limit')) || full.nodes.length;
            const nodes = full.nodes
                .filter(item => wanted.size === 0 || wanted.has(String(item.community_id)))
                .slice(0, limit);
            const ids = new Set(nodes.map(item => item.id));
            const edges = full.edges.filter(item => ids.has(item.source) && ids.has(item.target));
            return {
                nodes,
                edges,
                communities: query.get('include_communities') === 'false' ? [] : full.communities,
                meta: { ...full.meta, returned_nodes: nodes.length, returned_edges: edges.length, limit },
            };
        }
        static async node(corpus, id) {
            const recorded = await this.file(`${corpus}.nodes`);
            if (recorded[id])
                return recorded[id];
            const graph = await this.file(`${corpus}.graph`);
            const node = graph.nodes.find(item => item.id === id);
            if (!node)
                throw new Error(`mock: no node ${id}`);
            const labels = new Map(graph.nodes.map(item => [item.id, item.label]));
            const relation = (edge, direction) => {
                const other = direction === 'incoming' ? edge.source : edge.target;
                return { ...edge, direction, other_node_id: other, other_node_label: labels.get(other) ?? other };
            };
            return {
                node,
                incoming_relations: graph.edges.filter(edge => edge.target === id).map(edge => relation(edge, 'incoming')),
                outgoing_relations: graph.edges.filter(edge => edge.source === id).map(edge => relation(edge, 'outgoing')),
                provenance_chunks: [],
            };
        }
        static stream(answer, signal) {
            const encoder = new TextEncoder;
            const pieces = answer.message.content.match(/\S+\s*/g) ?? [];
            const event = (name, data) => encoder.encode(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);
            let timer = 0;
            let index = 0;
            const body = new ReadableStream({
                start: controller => {
                    const tick = () => {
                        if (signal?.aborted)
                            return controller.error(new DOMException('aborted', 'AbortError'));
                        if (index >= pieces.length) {
                            controller.enqueue(event('message', { message: this.fresh(answer) }));
                            return controller.close();
                        }
                        controller.enqueue(event('delta', { text: pieces.slice(index, index + 3).join('') }));
                        index += 3;
                        timer = setTimeout(tick, 40);
                    };
                    timer = setTimeout(tick, 600);
                },
                cancel: () => clearTimeout(timer),
            });
            return new Response(body, { headers: { 'content-type': 'text/event-stream' } });
        }
    }
    $.$raggu_web_front_mock = $raggu_web_front_mock;
})($ || ($ = {}));
//raggu/web/front/mock/mock.ts
;
"use strict";
var $;
(function ($) {
    class $raggu_web_front_data extends $mol_object {
        static api() {
            return $raggu_web_front_api_endpoint().replace(/\/$/, '') + '/api/v1';
        }
        static request(path, init) {
            if ($raggu_web_front_mock.enabled())
                return $raggu_web_front_mock.response(path, init);
            return fetch(this.api() + path, init);
        }
        static fetch(path, init) {
            if ($raggu_web_front_mock.enabled())
                return $mol_wire_sync($raggu_web_front_mock).json(path);
            return this.$.$mol_fetch.json(this.api() + path, {
                credentials: 'omit',
                ...init,
                headers: { accept: 'application/json', ...init?.headers },
            });
        }
        static version(next) {
            return next ?? 0;
        }
        static retry() {
            this.version(this.version() + 1);
        }
        static datasets(lang) {
            this.version();
            return this.fetch(`/datasets?locale=${lang}`);
        }
        static datasets_now() {
            return this.datasets($raggu_web_front_lib_lang());
        }
        static graph(key) {
            this.version();
            const [id, limit] = key.split('|');
            const query = `limit=${limit}&include_communities=true`;
            return this.fetch(`/datasets/${encodeURIComponent(id)}/graph?${query}`);
        }
        static communities(id) {
            return this.fetch(`/datasets/${encodeURIComponent(id)}/graph/communities`).communities;
        }
        static graph_part(key) {
            const [id, ...ids] = key.split('|');
            const query = ['limit=5000', 'include_communities=false', ...ids.map(cid => `community_ids=${encodeURIComponent(cid)}`)].join('&');
            return this.fetch(`/datasets/${encodeURIComponent(id)}/graph?${query}`);
        }
        static node(key) {
            const [id, node] = key.split('|');
            return this.fetch(`/datasets/${encodeURIComponent(id)}/graph/nodes/${encodeURIComponent(node)}`);
        }
        static suggestions(key) {
            const [id, lang] = key.split('|');
            return this.fetch(`/datasets/${encodeURIComponent(id)}/agent/suggestions?locale=${lang}`).suggestions;
        }
    }
    __decorate([
        $mol_mem
    ], $raggu_web_front_data, "version", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "datasets", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "graph", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "communities", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "graph_part", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "node", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_data, "suggestions", null);
    $.$raggu_web_front_data = $raggu_web_front_data;
    /** Value or null while it is on the wire; real errors still surface. */
    function $raggu_web_front_data_ready(task) {
        try {
            return task();
        }
        catch (error) {
            if ($mol_promise_like(error))
                return null;
            throw error;
        }
    }
    $.$raggu_web_front_data_ready = $raggu_web_front_data_ready;
    /** Value, null while pending, or the error itself, so the view can say what failed. */
    function $raggu_web_front_data_state(task) {
        try {
            return { value: task(), error: null, pending: false };
        }
        catch (error) {
            if ($mol_promise_like(error))
                return { value: null, error: null, pending: true };
            return { value: null, error: error, pending: false };
        }
    }
    $.$raggu_web_front_data_state = $raggu_web_front_data_state;
})($ || ($ = {}));
//raggu/web/front/data/data.ts
;
"use strict";
var $;
(function ($) {
    let $raggu_web_front_viewer_counter = 0;
    class $raggu_web_front_viewer extends $mol_object {
        corpus(next) {
            return this.$.$mol_state_arg.value('corpus', next) ?? '';
        }
        mode() {
            return this.corpus() ? 'graph' : 'ambient';
        }
        settings() {
            return $raggu_web_front_lib_settings.value();
        }
        graph_visible(corpus, next) {
            return next ?? true;
        }
        chat_visible(corpus, next) {
            return next ?? false;
        }
        graph_open(next) {
            return this.graph_visible(this.corpus(), next);
        }
        chat_open(next) {
            return this.chat_visible(this.corpus(), next);
        }
        toggle_graph() {
            const next = !this.graph_open();
            if (!next && !this.chat_open())
                return;
            this.graph_open(next);
        }
        toggle_chat() {
            const next = !this.chat_open();
            if (!next && !this.graph_open())
                return;
            this.chat_open(next);
        }
        selected_in(corpus, next) {
            return next ?? null;
        }
        selected(next) {
            return this.selected_in(this.corpus(), next);
        }
        hover(next) {
            return next ?? null;
        }
        search_in(corpus, next) {
            return next ?? '';
        }
        search(next) {
            return this.search_in(this.corpus(), next);
        }
        types_in(corpus, next) {
            return next ?? [];
        }
        types(next) {
            return this.types_in(this.corpus(), next);
        }
        communities_in(corpus, next) {
            return next ?? [];
        }
        communities(next) {
            return this.communities_in(this.corpus(), next);
        }
        highlight_in(corpus, next) {
            return next ?? [];
        }
        highlight(next) {
            return this.highlight_in(this.corpus(), next);
        }
        toggle_type(name) {
            const types = this.types();
            this.types(types.includes(name) ? types.filter(item => item !== name) : [...types, name]);
        }
        toggle_community(id) {
            const list = this.communities();
            this.communities(list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
        }
        filtering() {
            return this.search().trim().length > 0 || this.types().length > 0 || this.communities().length > 0;
        }
        clear_filters() {
            this.search('');
            this.types([]);
            this.communities([]);
            this.highlight([]);
        }
        stage(next) {
            return next ?? null;
        }
        reset_token(next) {
            return next ?? 0;
        }
        recentre() {
            this.selected(null);
            this.reset_token(this.reset_token() + 1);
        }
        whole(corpus, next) {
            return next ?? null;
        }
        response() {
            const corpus = this.corpus();
            if (!corpus)
                return null;
            const whole = this.whole(corpus);
            if (whole)
                return whole;
            return $raggu_web_front_data.graph(`${corpus}|${this.settings().graphLimit}`);
        }
        model() {
            const response = this.response();
            return response ? $raggu_web_front_graph_build(response) : null;
        }
        progress(next) {
            return next ?? 0;
        }
        layout_task = null;
        positions() {
            const model = this.model();
            if (!model)
                return null;
            return $mol_wire_sync(this).solve(model);
        }
        async solve(model) {
            this.layout_task?.cancel();
            const task = $raggu_web_front_graph_layout(model, ratio => this.progress(ratio));
            this.layout_task = task;
            return await task.promise;
        }
        solved = null;
        shown() {
            const corpus = this.corpus();
            if (!corpus)
                return this.solved = null;
            try {
                const model = this.model();
                const positions = this.positions();
                if (!model || !positions)
                    return null;
                return this.solved = { corpus, model, positions };
            }
            catch (error) {
                if (!$mol_promise_like(error))
                    throw error;
                if (this.solved?.corpus === corpus)
                    return this.solved;
                this.solved = null;
                $mol_fail_hidden(error);
            }
        }
        shown_now() {
            return $raggu_web_front_data_ready(() => this.shown());
        }
        graph_state() {
            return $raggu_web_front_data_state(() => this.response());
        }
        solving() {
            if (!this.corpus())
                return false;
            const graph = this.graph_state();
            if (graph.pending)
                return true;
            if (graph.error)
                return false;
            return $raggu_web_front_data_ready(() => this.positions()) === null;
        }
        cold() {
            return this.solving() && !this.shown_now();
        }
        warm() {
            return this.solving() && !!this.shown_now();
        }
        entries(corpus, next) {
            return next ?? [];
        }
        pending(corpus, next) {
            return next ?? false;
        }
        partial(corpus, next) {
            return next ?? null;
        }
        failure(corpus, next) {
            return next ?? null;
        }
        started(corpus, next) {
            return next ?? null;
        }
        aborts = new Map();
        next_id(prefix) {
            return `${prefix}-${++$raggu_web_front_viewer_counter}`;
        }
        keep_partial(corpus) {
            const partial = this.partial(corpus);
            const entries = this.entries(corpus);
            return partial
                ? [...entries, { id: this.next_id('assistant'), role: 'assistant', content: partial, trace: null }]
                : entries;
        }
        stop(corpus = this.corpus()) {
            const entries = this.keep_partial(corpus);
            this.aborts.get(corpus)?.abort();
            this.aborts.delete(corpus);
            this.entries(corpus, entries);
            this.pending(corpus, false);
            this.partial(corpus, null);
            this.started(corpus, null);
        }
        clear_thread(corpus = this.corpus()) {
            this.aborts.get(corpus)?.abort();
            this.aborts.delete(corpus);
            this.entries(corpus, []);
            this.pending(corpus, false);
            this.partial(corpus, null);
            this.failure(corpus, null);
            this.started(corpus, null);
        }
        ask(text) {
            this.chat_open(true);
            this.send(text);
        }
        failed_text() {
            return 'The request failed.';
        }
        send(text) {
            const corpus = this.corpus();
            const trimmed = text.trim();
            if (!corpus || !trimmed || this.pending(corpus))
                return;
            const history = this.entries(corpus).slice(-8).map(entry => ({ role: entry.role, content: entry.content }));
            this.entries(corpus, [...this.entries(corpus), { id: this.next_id('user'), role: 'user', content: trimmed }]);
            this.pending(corpus, true);
            this.failure(corpus, null);
            this.started(corpus, Date.now());
            const settings = this.settings();
            const body = {
                message: trimmed,
                history,
                engine: settings.useGraph ? 'mix' : 'naive',
                use_query_plan: settings.queryPlan,
                top_k: settings.topK,
                rerank: settings.rerank,
                include_trace: true,
                locale: $raggu_web_front_lib_lang(),
            };
            const controller = new AbortController;
            this.aborts.get(corpus)?.abort();
            this.aborts.set(corpus, controller);
            let received = '';
            let frame = 0;
            const on_delta = (piece) => {
                received += piece;
                if (frame)
                    return;
                frame = requestAnimationFrame(() => {
                    frame = 0;
                    if (this.aborts.get(corpus) === controller)
                        this.partial(corpus, received);
                });
            };
            $raggu_web_front_viewer_ask(corpus, body, controller.signal, on_delta).then(response => {
                cancelAnimationFrame(frame);
                if (this.aborts.get(corpus) !== controller)
                    return;
                this.aborts.delete(corpus);
                const message = response.message;
                this.entries(corpus, [
                    ...this.entries(corpus),
                    { id: this.next_id('assistant'), role: 'assistant', content: message.content, trace: message.trace ?? null },
                ]);
                this.pending(corpus, false);
                this.partial(corpus, null);
                this.started(corpus, null);
                this.failure(corpus, null);
                this.highlight_in(corpus, message.trace?.highlight?.node_ids ?? []);
            }, error => {
                cancelAnimationFrame(frame);
                if (error instanceof DOMException && error.name === 'AbortError')
                    return;
                if (this.aborts.get(corpus) !== controller)
                    return;
                this.aborts.delete(corpus);
                this.entries(corpus, this.keep_partial(corpus));
                this.pending(corpus, false);
                this.partial(corpus, null);
                this.started(corpus, null);
                this.failure(corpus, this.failed_text());
            });
        }
        /** Pulls the rest of the corpus community by community: the gateway has no paging and caps a request at 5000. */
        async load_whole(on_progress) {
            const corpus = this.corpus();
            const seed = $raggu_web_front_data_ready(() => this.response());
            if (!corpus || !seed)
                throw new Error('nothing to extend');
            const get = async (path) => {
                const response = await $raggu_web_front_data.request(path, { headers: { accept: 'application/json' } });
                if (!response.ok)
                    throw new Error(response.statusText);
                return await response.json();
            };
            const id = encodeURIComponent(corpus);
            const { communities } = await get(`/datasets/${id}/graph/communities`);
            if (communities.length === 0)
                return { complete: false, clipped: [] };
            const nodes = new Map(seed.nodes.map(node => [node.id, node]));
            const edges = new Map(seed.edges.map(edge => [edge.id, edge]));
            const batches = [];
            let batch = [];
            let size = 0;
            for (const community of [...communities].sort((a, b) => b.size - a.size)) {
                if (community.size >= 4200) {
                    batches.push([community]);
                    continue;
                }
                if (size + community.size > 4200 && batch.length > 0) {
                    batches.push(batch);
                    batch = [];
                    size = 0;
                }
                batch.push(community);
                size += community.size;
            }
            if (batch.length > 0)
                batches.push(batch);
            const clipped = [];
            let complete = true;
            for (let index = 0; index < batches.length; index++) {
                if (nodes.size >= 12000) {
                    complete = false;
                    break;
                }
                const part = batches[index];
                const query = ['limit=5000', 'include_communities=false', ...part.map(item => `community_ids=${encodeURIComponent(item.id)}`)].join('&');
                const page = await get(`/datasets/${id}/graph?${query}`);
                for (const node of page.nodes)
                    nodes.set(node.id, node);
                for (const edge of page.edges)
                    edges.set(edge.id, edge);
                const wanted = part.reduce((sum, item) => sum + item.size, 0);
                if (page.meta.returned_nodes < Math.min(wanted, 5000))
                    clipped.push(...part.map(item => item.id));
                on_progress((index + 1) / batches.length);
            }
            this.whole(corpus, {
                nodes: [...nodes.values()],
                edges: [...edges.values()],
                communities,
                meta: { ...seed.meta, returned_nodes: nodes.size, returned_edges: edges.size },
            });
            return { complete, clipped };
        }
    }
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "graph_visible", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "chat_visible", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "selected_in", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "hover", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "search_in", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "types_in", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "communities_in", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "highlight_in", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "stage", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "reset_token", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "whole", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "response", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "model", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "progress", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "positions", null);
    __decorate([
        $mol_mem
    ], $raggu_web_front_viewer.prototype, "shown", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "entries", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "pending", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "partial", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "failure", null);
    __decorate([
        $mol_mem_key
    ], $raggu_web_front_viewer.prototype, "started", null);
    $.$raggu_web_front_viewer = $raggu_web_front_viewer;
    async function $raggu_web_front_viewer_ask(corpus, body, signal, on_delta) {
        const base = `/datasets/${encodeURIComponent(corpus)}/agent/messages`;
        const plain = async () => {
            const response = await $raggu_web_front_data.request(base, {
                method: 'POST',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify(body),
                signal,
            });
            if (!response.ok)
                throw new Error((await response.text().catch(() => '')).slice(0, 240) || response.statusText);
            return await response.json();
        };
        const response = await $raggu_web_front_data.request(base + '/stream', {
            method: 'POST',
            headers: { accept: 'text/event-stream', 'content-type': 'application/json' },
            body: JSON.stringify(body),
            signal,
        });
        if (response.status === 404 || response.status === 405) {
            const text = await response.text().catch(() => '');
            if (!text.includes('dataset_not_found'))
                return plain();
            throw new Error(text.slice(0, 240));
        }
        if (!response.ok || !response.body) {
            throw new Error((await response.text().catch(() => '')).slice(0, 240) || response.statusText);
        }
        let result = null;
        let failure = null;
        const parser = $raggu_web_front_lib_sse(({ event, data }) => {
            if (event === 'delta')
                on_delta(JSON.parse(data).text);
            else if (event === 'message')
                result = JSON.parse(data);
            else if (event === 'error')
                failure = new Error(JSON.parse(data).message ?? 'stream failed');
        });
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            parser.push(value);
        }
        parser.end();
        if (failure)
            throw failure;
        if (!result)
            throw new Error('stream ended early');
        return result;
    }
    $.$raggu_web_front_viewer_ask = $raggu_web_front_viewer_ask;
})($ || ($ = {}));
//raggu/web/front/viewer/viewer.ts
;
"use strict";
//bog/build2/npm/npm.ts
;
"use strict";
// @ts-ignore
var $npm = $node;
//bog/build2/npm/npm.node.ts
;
"use strict";
var $;
(function ($) {
    const ramp_light = ['#7cb0ec', '#5598e7', '#2a78d6', '#1c5cab', '#104281', '#0d366b'];
    const ramp_dark = ['#1c5cab', '#256abf', '#3987e5', '#6da7ec', '#9ec5f4', '#cde2fb'];
    const ACCENT_TAU = 0.04;
    const DIM_TAU = 0.1;
    const RESTORE_TAU = 0.3;
    const SETTLED = 0.0015;
    const MAX_LABELS = 26;
    const COLLISION_PX = 54;
    function $raggu_web_front_scene_engine(layer, host) {
        const THREE = $npm['three'];
        function palette(theme) {
            const dark = theme === 'dark';
            return {
                ramp: (dark ? ramp_dark : ramp_light).map(hex => new THREE.Color(hex)),
                accent: new THREE.Color(dark ? '#ff6e4e' : '#d64b2e'),
                accent_soft: new THREE.Color(dark ? '#ffa48c' : '#e8825f'),
                edge: new THREE.Color(dark ? '#3f5f8c' : '#8e9cb2'),
                haze: new THREE.Color(dark ? '#05090f' : '#eef0f3'),
                edge_opacity: dark ? 0.3 : 0.24,
                additive: dark,
                dim: dark ? 0.1 : 0.14,
            };
        }
        const geometry_make = () => new THREE.BufferGeometry();
        const scratch = new THREE.Color();
        function ramp_at(ramp, t) {
            const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t;
            const scaled = clamped * (ramp.length - 1);
            const index = Math.min(ramp.length - 2, Math.floor(scaled));
            return scratch.copy(ramp[index]).lerp(ramp[index + 1], scaled - index);
        }
        function point_material(soft, additive, far, haze, amount) {
            return new THREE.ShaderMaterial({
                vertexShader: $raggu_web_front_scene_point_vert,
                fragmentShader: $raggu_web_front_scene_point_frag,
                transparent: true,
                depthWrite: false,
                blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
                uniforms: {
                    uScale: { value: 400 },
                    uOpacity: { value: 1 },
                    uSoft: { value: soft },
                    uNear: { value: 4 },
                    uFar: { value: far },
                    uHaze: { value: haze ? haze.clone() : new THREE.Color(0, 0, 0) },
                    uHazeAmount: { value: haze ? amount : 0 },
                },
            });
        }
        function line_material(haze, amount) {
            return new THREE.ShaderMaterial({
                vertexShader: $raggu_web_front_scene_line_vert,
                fragmentShader: $raggu_web_front_scene_line_frag,
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uOpacity: { value: 1 },
                    uNear: { value: 4 },
                    uFar: { value: 24 },
                    uHaze: { value: haze ? haze.clone() : new THREE.Color(0, 0, 0) },
                    uHazeAmount: { value: haze ? amount : 0 },
                },
            });
        }
        function attribute(geometry, name, array, size) {
            geometry.setAttribute(name, new THREE.BufferAttribute(array, size));
        }
        /* renderer */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        layer.appendChild(canvas);
        const labels_layer = document.createElement('div');
        labels_layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden';
        layer.appendChild(labels_layer);
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
        camera.position.set(0, 0, 11);
        const scene = new THREE.Scene();
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const size = { width: 1, height: 1 };
        const resize = () => {
            size.width = Math.max(1, layer.clientWidth);
            size.height = Math.max(1, layer.clientHeight);
            renderer.setSize(size.width, size.height, false);
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(layer);
        /* orbit */
        const orbit = {
            target: new THREE.Vector3(),
            theta: 0,
            phi: 0,
            scale: 1,
            auto_rotate: false,
            auto_speed: 2,
            zoom: false,
            dragging: false,
            pressed: null,
            spherical: new THREE.Spherical(),
            offset: new THREE.Vector3(),
        };
        const EPS = 0.000001;
        function orbit_update() {
            orbit.offset.copy(camera.position).sub(orbit.target);
            orbit.spherical.setFromVector3(orbit.offset);
            if (orbit.auto_rotate && !orbit.dragging)
                orbit.theta -= 2 * Math.PI / 60 / 60 * orbit.auto_speed;
            orbit.spherical.theta += orbit.theta * 0.06;
            orbit.spherical.phi += orbit.phi * 0.06;
            orbit.spherical.phi = Math.max(EPS, Math.min(Math.PI - EPS, orbit.spherical.phi));
            orbit.spherical.makeSafe();
            orbit.spherical.radius = Math.max(3.4, Math.min(20, orbit.spherical.radius * orbit.scale));
            orbit.offset.setFromSpherical(orbit.spherical);
            camera.position.copy(orbit.target).add(orbit.offset);
            camera.lookAt(orbit.target);
            orbit.theta *= 1 - 0.06;
            orbit.phi *= 1 - 0.06;
            orbit.scale = 1;
        }
        /* ambient */
        function build_ambient(colors) {
            const COUNT = 620;
            const RADIUS = 3.4;
            const LINK = 0.82;
            const hash01 = $raggu_web_front_graph_hash01;
            const positions = new Float32Array(COUNT * 3);
            const color = new Float32Array(COUNT * 3);
            const alpha = new Float32Array(COUNT);
            const sizes = new Float32Array(COUNT);
            const halo_alpha = new Float32Array(COUNT);
            const halo_size = new Float32Array(COUNT);
            const golden = Math.PI * (3 - Math.sqrt(5));
            for (let i = 0; i < COUNT; i++) {
                const y = 1 - (i / (COUNT - 1)) * 2;
                const ring = Math.sqrt(Math.max(0, 1 - y * y));
                const theta = golden * i;
                const r = RADIUS * (0.62 + hash01(i * 7 + 3) * 0.42);
                positions[i * 3] = Math.cos(theta) * ring * r;
                positions[i * 3 + 1] = y * r;
                positions[i * 3 + 2] = Math.sin(theta) * ring * r;
                const weight = Math.pow(hash01(i * 13 + 5), 2.2);
                const tint = ramp_at(colors.ramp, weight);
                color[i * 3] = tint.r;
                color[i * 3 + 1] = tint.g;
                color[i * 3 + 2] = tint.b;
                alpha[i] = 0.32 + weight * 0.5;
                sizes[i] = 0.03 + weight * 0.24;
                halo_alpha[i] = alpha[i] * 0.14 * (colors.additive ? 1 : 0.5);
                halo_size[i] = sizes[i] * 2.6;
            }
            const link_a = [];
            const link_b = [];
            for (let i = 0; i < COUNT && link_a.length < 900; i++) {
                for (let step = 1; step <= 3; step++) {
                    const j = (i + step * 17 + Math.floor(hash01(i * 31 + step) * 9)) % COUNT;
                    if (j === i)
                        continue;
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
                        link_a.push(i);
                        link_b.push(j);
                    }
                }
            }
            const links = link_a.length;
            const line_positions = new Float32Array(links * 6);
            const line_color = new Float32Array(links * 6);
            const line_alpha = new Float32Array(links * 2);
            for (let e = 0; e < links; e++) {
                const a = link_a[e] * 3;
                const b = link_b[e] * 3;
                line_positions.set([positions[a], positions[a + 1], positions[a + 2]], e * 6);
                line_positions.set([positions[b], positions[b + 1], positions[b + 2]], e * 6 + 3);
                line_alpha[e * 2] = colors.edge_opacity * 0.7;
                line_alpha[e * 2 + 1] = colors.edge_opacity * 0.7;
                for (let v = 0; v < 2; v++) {
                    line_color[e * 6 + v * 3] = colors.edge.r;
                    line_color[e * 6 + v * 3 + 1] = colors.edge.g;
                    line_color[e * 6 + v * 3 + 2] = colors.edge.b;
                }
            }
            const point_geometry = new THREE.BufferGeometry();
            attribute(point_geometry, 'position', positions, 3);
            attribute(point_geometry, 'aColor', color, 3);
            attribute(point_geometry, 'aAlpha', alpha, 1);
            attribute(point_geometry, 'aSize', sizes, 1);
            const halo_geometry = new THREE.BufferGeometry();
            attribute(halo_geometry, 'position', positions, 3);
            attribute(halo_geometry, 'aColor', color, 3);
            attribute(halo_geometry, 'aAlpha', halo_alpha, 1);
            attribute(halo_geometry, 'aSize', halo_size, 1);
            const line_geometry = new THREE.BufferGeometry();
            attribute(line_geometry, 'position', line_positions, 3);
            attribute(line_geometry, 'aColor', line_color, 3);
            attribute(line_geometry, 'aAlpha', line_alpha, 1);
            const materials = {
                point: point_material(0, false, 24, null, 0),
                halo: point_material(1, colors.additive, 28, null, 0),
                line: line_material(null, 0),
            };
            const group = new THREE.Group();
            const lines = new THREE.LineSegments(line_geometry, materials.line);
            const halo = new THREE.Points(halo_geometry, materials.halo);
            const points = new THREE.Points(point_geometry, materials.point);
            for (const object of [lines, halo, points]) {
                object.frustumCulled = false;
                group.add(object);
            }
            return {
                group,
                materials,
                dispose() {
                    point_geometry.dispose();
                    halo_geometry.dispose();
                    line_geometry.dispose();
                    materials.point.dispose();
                    materials.halo.dispose();
                    materials.line.dispose();
                },
            };
        }
        /* cloud */
        function build_cloud(model, positions, colors) {
            const n = model.nodes.length;
            const m = model.edges.length;
            const color = new Float32Array(n * 3);
            const alpha = new Float32Array(n).fill(1);
            const sizes = new Float32Array(n);
            const halo_alpha = new Float32Array(n);
            const halo_size = new Float32Array(n);
            const base_ramp = new Float32Array(n);
            let radius = 0;
            for (let i = 0; i < n; i++) {
                base_ramp[i] = $raggu_web_front_scene_degree_ramp(model.degree[i], model.max_degree);
                const d = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                if (d > radius)
                    radius = d;
            }
            const point_geometry = new THREE.BufferGeometry();
            attribute(point_geometry, 'position', positions, 3);
            attribute(point_geometry, 'aColor', color, 3);
            attribute(point_geometry, 'aAlpha', alpha, 1);
            attribute(point_geometry, 'aSize', sizes, 1);
            const halo_geometry = new THREE.BufferGeometry();
            attribute(halo_geometry, 'position', positions, 3);
            attribute(halo_geometry, 'aColor', color, 3);
            attribute(halo_geometry, 'aAlpha', halo_alpha, 1);
            attribute(halo_geometry, 'aSize', halo_size, 1);
            const line_positions = new Float32Array(m * 6);
            const line_color = new Float32Array(m * 6);
            const line_alpha = new Float32Array(m * 2);
            for (let e = 0; e < m; e++) {
                const a = model.edge_source[e] * 3;
                const b = model.edge_target[e] * 3;
                line_positions[e * 6] = positions[a];
                line_positions[e * 6 + 1] = positions[a + 1];
                line_positions[e * 6 + 2] = positions[a + 2];
                line_positions[e * 6 + 3] = positions[b];
                line_positions[e * 6 + 4] = positions[b + 1];
                line_positions[e * 6 + 5] = positions[b + 2];
            }
            const line_geometry = new THREE.BufferGeometry();
            attribute(line_geometry, 'position', line_positions, 3);
            attribute(line_geometry, 'aColor', line_color, 3);
            attribute(line_geometry, 'aAlpha', line_alpha, 1);
            const materials = {
                point: point_material(0, false, 22, colors.haze, 0.66),
                halo: point_material(1, colors.additive, 26, colors.haze, 0.66),
                line: line_material(colors.haze, 0.54),
            };
            const group = new THREE.Group();
            const lines = new THREE.LineSegments(line_geometry, materials.line);
            const halo = new THREE.Points(halo_geometry, materials.halo);
            const points = new THREE.Points(point_geometry, materials.point);
            for (const object of [lines, halo, points]) {
                object.frustumCulled = false;
                group.add(object);
            }
            return {
                model,
                positions,
                colors,
                group,
                points,
                materials,
                geometries: [point_geometry, halo_geometry, line_geometry],
                color,
                alpha,
                size: sizes,
                halo_alpha,
                halo_size,
                line_color,
                line_alpha,
                target_color: new Float32Array(n * 3),
                target_alpha: new Float32Array(n),
                target_size: new Float32Array(n),
                target_halo_alpha: new Float32Array(n),
                target_halo_size: new Float32Array(n),
                target_line_color: new Float32Array(m * 6),
                target_line_alpha: new Float32Array(m * 2),
                accented: new Uint8Array(n),
                line_accented: new Uint8Array(m),
                base_ramp,
                radius: radius || 3.2,
                primed: false,
                easing: false,
                dispose() {
                    for (const geometry of [point_geometry, halo_geometry, line_geometry])
                        geometry.dispose();
                    materials.point.dispose();
                    materials.halo.dispose();
                    materials.line.dispose();
                },
            };
        }
        function mark_updated(cloud) {
            for (const geometry of cloud.geometries) {
                for (const name of ['aColor', 'aAlpha', 'aSize']) {
                    const attr = geometry.getAttribute(name);
                    if (attr)
                        attr.needsUpdate = true;
                }
            }
        }
        function matches(state, model) {
            const n = model.nodes.length;
            const query = state.search.trim().toLowerCase();
            const types = new Set(state.types);
            const communities = new Set(state.communities);
            const highlighted = new Set(state.highlight);
            const explicit = query.length > 0 || types.size > 0 || communities.size > 0;
            const matched = new Uint8Array(n);
            for (let i = 0; i < n; i++) {
                const node = model.nodes[i];
                let hit = true;
                if (query)
                    hit = node.label.toLowerCase().includes(query);
                if (hit && types.size > 0)
                    hit = types.has(node.entity_type);
                if (hit && communities.size > 0)
                    hit = node.community_id ? communities.has(node.community_id) : false;
                if (hit && !explicit && highlighted.size > 0)
                    hit = highlighted.has(node.id);
                matched[i] = hit ? 1 : 0;
            }
            return { matched, filtering: explicit || highlighted.size > 0 };
        }
        function paint(cloud, state) {
            const { model, colors } = cloud;
            const n = model.nodes.length;
            const m = model.edges.length;
            const focus_id = state.hover ?? state.selected;
            const focus = focus_id ? (model.index_of.get(focus_id) ?? -1) : -1;
            const neighbour_nodes = new Set();
            const neighbour_edges = new Set();
            if (focus >= 0) {
                for (let k = model.adj_offset[focus]; k < model.adj_offset[focus + 1]; k++) {
                    neighbour_nodes.add(model.adj_node[k]);
                    neighbour_edges.add(model.adj_edge[k]);
                }
            }
            const { matched, filtering } = matches(state, model);
            for (let i = 0; i < n; i++) {
                const t = cloud.base_ramp[i];
                scratch.copy(ramp_at(colors.ramp, t));
                let a = 0.58 + t * 0.4;
                let s = 0.045 + t * 0.34;
                const is_focus = i === focus;
                const is_neighbour = neighbour_nodes.has(i);
                if (filtering) {
                    if (matched[i] === 1) {
                        scratch.lerp(colors.accent, 0.5);
                        a = 1;
                        s *= 1.16;
                    }
                    else {
                        a = colors.dim;
                        s *= 0.7;
                    }
                }
                if (focus >= 0) {
                    if (is_focus) {
                        scratch.copy(colors.accent);
                        a = 1;
                        s *= 1.8;
                    }
                    else if (is_neighbour) {
                        scratch.lerp(colors.accent_soft, 0.7);
                        a = 1;
                        s *= 1.1;
                    }
                    else {
                        a *= 0.3;
                    }
                }
                cloud.target_color[i * 3] = scratch.r;
                cloud.target_color[i * 3 + 1] = scratch.g;
                cloud.target_color[i * 3 + 2] = scratch.b;
                cloud.target_alpha[i] = a;
                cloud.target_size[i] = s;
                cloud.target_halo_alpha[i] = a * (is_focus ? 0.5 : 0.16) * (colors.additive ? 1 : 0.5);
                cloud.target_halo_size[i] = s * (is_focus ? 3.6 : 2.4);
                cloud.accented[i] = is_focus || is_neighbour || (filtering && matched[i] === 1) ? 1 : 0;
            }
            for (let e = 0; e < m; e++) {
                const a = model.edge_source[e];
                const b = model.edge_target[e];
                let value = colors.edge_opacity * (0.45 + model.edge_strength[e] * 0.55);
                let tint = colors.edge;
                let hot = false;
                if (focus >= 0) {
                    if (neighbour_edges.has(e)) {
                        value = 0.8;
                        tint = colors.accent;
                        hot = true;
                    }
                    else {
                        value *= 0.14;
                    }
                }
                else if (filtering) {
                    const both = matched[a] === 1 && matched[b] === 1;
                    value = both ? value * 1.5 : value * 0.15;
                    hot = both;
                }
                cloud.line_accented[e] = hot ? 1 : 0;
                cloud.target_line_alpha[e * 2] = value;
                cloud.target_line_alpha[e * 2 + 1] = value;
                for (let v = 0; v < 2; v++) {
                    cloud.target_line_color[e * 6 + v * 3] = tint.r;
                    cloud.target_line_color[e * 6 + v * 3 + 1] = tint.g;
                    cloud.target_line_color[e * 6 + v * 3 + 2] = tint.b;
                }
            }
            if (!cloud.primed) {
                cloud.color.set(cloud.target_color);
                cloud.alpha.set(cloud.target_alpha);
                cloud.size.set(cloud.target_size);
                cloud.halo_alpha.set(cloud.target_halo_alpha);
                cloud.halo_size.set(cloud.target_halo_size);
                cloud.line_color.set(cloud.target_line_color);
                cloud.line_alpha.set(cloud.target_line_alpha);
                cloud.primed = true;
                mark_updated(cloud);
            }
            cloud.easing = true;
        }
        function ease(cloud, delta) {
            const n = cloud.model.nodes.length;
            const m = cloud.model.edges.length;
            const accent_rate = 1 - Math.exp(-delta / ACCENT_TAU);
            const dim_rate = 1 - Math.exp(-delta / DIM_TAU);
            const restore_rate = 1 - Math.exp(-delta / RESTORE_TAU);
            let drift = 0;
            const step = (current, target, index, rate) => {
                const gap = target[index] - current[index];
                const span = gap < 0 ? -gap : gap;
                if (span > drift)
                    drift = span;
                current[index] = span < SETTLED ? target[index] : current[index] + gap * rate;
            };
            for (let i = 0; i < n; i++) {
                const rate = cloud.accented[i] ? accent_rate : cloud.target_alpha[i] < cloud.alpha[i] ? dim_rate : restore_rate;
                step(cloud.alpha, cloud.target_alpha, i, rate);
                step(cloud.size, cloud.target_size, i, rate);
                step(cloud.halo_alpha, cloud.target_halo_alpha, i, rate);
                step(cloud.halo_size, cloud.target_halo_size, i, rate);
                step(cloud.color, cloud.target_color, i * 3, rate);
                step(cloud.color, cloud.target_color, i * 3 + 1, rate);
                step(cloud.color, cloud.target_color, i * 3 + 2, rate);
            }
            for (let e = 0; e < m; e++) {
                const rate = cloud.line_accented[e] ? accent_rate : cloud.target_line_alpha[e * 2] < cloud.line_alpha[e * 2] ? dim_rate : restore_rate;
                step(cloud.line_alpha, cloud.target_line_alpha, e * 2, rate);
                step(cloud.line_alpha, cloud.target_line_alpha, e * 2 + 1, rate);
                for (let v = 0; v < 6; v++)
                    step(cloud.line_color, cloud.target_line_color, e * 6 + v, rate);
            }
            mark_updated(cloud);
            return drift >= SETTLED;
        }
        let labels = [];
        function build_labels(cloud, state) {
            const model = cloud.model;
            const query = state.search.trim().toLowerCase();
            const types = new Set(state.types);
            const communities = new Set(state.communities);
            const highlighted = new Set(state.highlight);
            const explicit = query.length > 0 || types.size > 0 || communities.size > 0;
            const candidates = [];
            for (let i = 0; i < model.nodes.length; i++) {
                const node = model.nodes[i];
                if (query && !node.label.toLowerCase().includes(query))
                    continue;
                if (types.size > 0 && !types.has(node.entity_type))
                    continue;
                if (communities.size > 0 && !(node.community_id && communities.has(node.community_id)))
                    continue;
                if (!explicit && highlighted.size > 0 && !highlighted.has(node.id))
                    continue;
                candidates.push({ index: i, strong: false });
            }
            candidates.sort((a, b) => model.degree[b.index] - model.degree[a.index]);
            const picked = candidates.slice(0, MAX_LABELS);
            for (const id of [state.selected, state.hover]) {
                if (!id)
                    continue;
                const index = model.index_of.get(id);
                if (index === undefined)
                    continue;
                const existing = picked.find(entry => entry.index === index);
                if (existing)
                    existing.strong = true;
                else
                    picked.unshift({ index, strong: true });
            }
            labels_layer.textContent = '';
            labels = picked.map(entry => {
                const node = model.nodes[entry.index];
                const element = document.createElement('span');
                element.className = entry.strong ? 'ragu-label ragu-label--strong' : 'ragu-label';
                element.textContent = node.label;
                if (entry.strong) {
                    const type = document.createElement('em');
                    type.className = 'ragu-label__type';
                    type.textContent = node.entity_type;
                    element.appendChild(type);
                }
                labels_layer.appendChild(element);
                return { ...entry, element };
            });
        }
        const projected = new THREE.Vector3();
        const placed = [];
        function place_labels(cloud, opacity) {
            placed.length = 0;
            const width = size.width;
            const height = size.height;
            for (const label of labels) {
                const index = label.index;
                projected.set(cloud.positions[index * 3], cloud.positions[index * 3 + 1], cloud.positions[index * 3 + 2]);
                const distance = projected.distanceTo(camera.position);
                projected.project(camera);
                const behind = projected.z > 1;
                const x = (projected.x * 0.5 + 0.5) * width;
                const y = (-projected.y * 0.5 + 0.5) * height;
                let hidden = behind || x < 8 || x > width - 8 || y < 8 || y > height - 8 || opacity < 0.08;
                if (!hidden && !label.strong) {
                    for (let p = 0; p < placed.length; p += 2) {
                        if (Math.abs(placed[p] - x) < COLLISION_PX && Math.abs(placed[p + 1] - y) < 20) {
                            hidden = true;
                            break;
                        }
                    }
                }
                const style = label.element.style;
                if (hidden) {
                    style.opacity = '0';
                    style.visibility = 'hidden';
                    continue;
                }
                placed.push(x, y);
                const depth_fade = Math.max(0, Math.min(1, 1.65 - distance / 12));
                style.visibility = 'visible';
                style.opacity = String((label.strong ? 1 : 0.55 + depth_fade * 0.45) * opacity);
                style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -140%)`;
            }
        }
        /* state */
        const fade = { graph: 0, ambient: 1 };
        let theme = null;
        let colors = palette('light');
        let ambient = null;
        let cloud = null;
        let last = null;
        let reset_token = -1;
        let selected = null;
        let idle = 0;
        let has_focus = false;
        const focus_target = new THREE.Vector3();
        const origin = new THREE.Vector3();
        const stage_rect = { x: 0, y: 0, width: 0, height: 0 };
        function sync(state) {
            if (state.theme !== theme) {
                theme = state.theme;
                colors = palette(theme);
                if (ambient) {
                    scene.remove(ambient.group);
                    ambient.dispose();
                }
                ambient = build_ambient(colors);
                scene.add(ambient.group);
                if (cloud) {
                    scene.remove(cloud.group);
                    cloud.dispose();
                    cloud = null;
                }
            }
            const shown = state.shown;
            if (cloud && (!shown || cloud.model !== shown.model || cloud.positions !== shown.positions)) {
                scene.remove(cloud.group);
                cloud.dispose();
                cloud = null;
                labels_layer.textContent = '';
                labels = [];
            }
            if (!cloud && shown) {
                cloud = build_cloud(shown.model, shown.positions, colors);
                scene.add(cloud.group);
                last = null;
            }
            if (cloud && state !== last) {
                paint(cloud, state);
                build_labels(cloud, state);
            }
            if (state.selected !== selected || (cloud && last === null)) {
                selected = state.selected;
                const index = selected && cloud ? (cloud.model.index_of.get(selected) ?? -1) : -1;
                if (index >= 0 && cloud) {
                    focus_target.set(cloud.positions[index * 3], cloud.positions[index * 3 + 1], cloud.positions[index * 3 + 2]);
                    has_focus = true;
                    idle = 0;
                }
                else {
                    has_focus = false;
                }
            }
            if (state.reset_token !== reset_token) {
                if (reset_token >= 0)
                    has_focus = false;
                reset_token = state.reset_token;
            }
            orbit.zoom = state.mode === 'graph';
            last = state;
        }
        /* picking */
        function pick(event) {
            if (!cloud)
                return null;
            const rect = canvas.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.params.Points.threshold = Math.max(0.05, camera.position.length() * 0.014);
            raycaster.setFromCamera(pointer, camera);
            const hit = raycaster.intersectObject(cloud.points, false)[0];
            if (!hit || hit.index === undefined)
                return null;
            return cloud.model.nodes[hit.index] ?? null;
        }
        let hovered = null;
        const on_down = (event) => {
            orbit.pressed = { x: event.clientX, y: event.clientY, last_x: event.clientX, last_y: event.clientY };
            orbit.dragging = true;
            idle = 0;
            if (event.isTrusted)
                canvas.setPointerCapture(event.pointerId);
            if (hovered) {
                hovered = null;
                host.hover(null);
            }
        };
        const on_move = (event) => {
            idle = 0;
            if (orbit.dragging && orbit.pressed) {
                const dx = event.clientX - orbit.pressed.last_x;
                const dy = event.clientY - orbit.pressed.last_y;
                orbit.pressed.last_x = event.clientX;
                orbit.pressed.last_y = event.clientY;
                orbit.theta -= 2 * Math.PI * dx / canvas.clientHeight * 0.55;
                orbit.phi -= 2 * Math.PI * dy / canvas.clientHeight * 0.55;
                return;
            }
            const node = pick(event);
            const id = node?.id ?? null;
            if (id === hovered)
                return;
            hovered = id;
            host.hover(id);
        };
        const on_up = (event) => {
            orbit.dragging = false;
            if (canvas.hasPointerCapture(event.pointerId))
                canvas.releasePointerCapture(event.pointerId);
        };
        const on_leave = () => {
            if (!hovered)
                return;
            hovered = null;
            host.hover(null);
        };
        const on_click = (event) => {
            const origin_point = orbit.pressed;
            if (origin_point && Math.hypot(event.clientX - origin_point.x, event.clientY - origin_point.y) > 4)
                return;
            const node = pick(event);
            if (!node)
                return;
            host.select(last?.selected === node.id ? null : node.id);
        };
        const on_wheel = (event) => {
            if (!orbit.zoom)
                return;
            event.preventDefault();
            idle = 0;
            const scale = Math.pow(0.95, 0.7 * Math.abs(event.deltaY * 0.01));
            if (event.deltaY < 0)
                orbit.scale /= scale;
            else if (event.deltaY > 0)
                orbit.scale *= scale;
        };
        canvas.addEventListener('pointerdown', on_down);
        canvas.addEventListener('pointermove', on_move);
        canvas.addEventListener('pointerup', on_up);
        canvas.addEventListener('pointercancel', on_up);
        canvas.addEventListener('pointerleave', on_leave);
        canvas.addEventListener('click', on_click);
        canvas.addEventListener('wheel', on_wheel, { passive: false });
        /* loop */
        let frame = 0;
        let previous = performance.now();
        const started = previous;
        const tick = (now) => {
            frame = requestAnimationFrame(tick);
            const delta = Math.min(0.1, (now - previous) / 1000);
            previous = now;
            const state = host.state();
            sync(state);
            const graph_ready = state.mode === 'graph' && !!state.shown;
            const graph_target = graph_ready && state.graph_visible ? 1 : 0;
            const ambient_target = state.mode === 'ambient' ? 0.42 : graph_ready ? 0 : 0.5;
            const rate = Math.min(1, delta * 2.6);
            fade.graph += (graph_target - fade.graph) * rate;
            fade.ambient += (ambient_target - fade.ambient) * rate;
            const scale = $raggu_web_front_scene_point_scale(size.height, renderer.getPixelRatio(), camera.fov);
            if (ambient) {
                const { materials, group } = ambient;
                materials.point.uniforms.uScale.value = scale;
                materials.halo.uniforms.uScale.value = scale;
                materials.point.uniforms.uOpacity.value = fade.ambient;
                materials.halo.uniforms.uOpacity.value = fade.ambient;
                materials.line.uniforms.uOpacity.value = fade.ambient;
                group.visible = fade.ambient > 0.004;
                group.rotation.y += delta * 0.045;
                group.rotation.x = Math.sin((now - started) / 1000 * 0.09) * 0.16;
            }
            if (cloud) {
                const { materials, group } = cloud;
                materials.point.uniforms.uScale.value = scale;
                materials.halo.uniforms.uScale.value = scale;
                materials.point.uniforms.uOpacity.value = fade.graph;
                materials.halo.uniforms.uOpacity.value = fade.graph;
                materials.line.uniforms.uOpacity.value = fade.graph;
                group.visible = fade.graph > 0.004;
                const distance = camera.position.distanceTo(orbit.target);
                const near = Math.max(0.1, distance - cloud.radius * 1.05);
                const far = distance + cloud.radius * 1.25;
                for (const material of [materials.point, materials.halo, materials.line]) {
                    material.uniforms.uNear.value = near;
                    material.uniforms.uFar.value = far;
                }
                if (cloud.easing)
                    cloud.easing = ease(cloud, delta);
                const target = state.stage ?? { x: 0, y: 0, width: size.width, height: size.height };
                const move = Math.min(1, delta * 3.4);
                if (stage_rect.width === 0)
                    Object.assign(stage_rect, target);
                else {
                    stage_rect.x += (target.x - stage_rect.x) * move;
                    stage_rect.y += (target.y - stage_rect.y) * move;
                    stage_rect.width += (target.width - stage_rect.width) * move;
                    stage_rect.height += (target.height - stage_rect.height) * move;
                }
                const offset = $raggu_web_front_scene_frame(stage_rect, size);
                const identity = !offset || (Math.abs(offset.offset_x) < 1 &&
                    Math.abs(offset.offset_y) < 1 &&
                    Math.abs(offset.full_width - size.width) < 1);
                if (offset && !identity) {
                    camera.setViewOffset(offset.full_width, offset.full_height, offset.offset_x, offset.offset_y, offset.width, offset.height);
                }
                else if (camera.view?.enabled) {
                    camera.clearViewOffset();
                }
                orbit.target.lerp(has_focus ? focus_target : origin, Math.min(1, delta * 2.4));
                idle += delta;
                orbit.auto_rotate = idle > 2.6;
                orbit.auto_speed = 0.32;
            }
            else {
                stage_rect.width = 0;
                if (camera.view?.enabled)
                    camera.clearViewOffset();
            }
            orbit_update();
            if (cloud)
                place_labels(cloud, fade.graph);
            canvas.style.cursor = hovered ? 'pointer' : '';
            renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(tick);
        return {
            destroy() {
                cancelAnimationFrame(frame);
                observer.disconnect();
                canvas.removeEventListener('pointerdown', on_down);
                canvas.removeEventListener('pointermove', on_move);
                canvas.removeEventListener('pointerup', on_up);
                canvas.removeEventListener('pointercancel', on_up);
                canvas.removeEventListener('pointerleave', on_leave);
                canvas.removeEventListener('click', on_click);
                canvas.removeEventListener('wheel', on_wheel);
                ambient?.dispose();
                cloud?.dispose();
                renderer.dispose();
                canvas.remove();
                labels_layer.remove();
            },
        };
    }
    $.$raggu_web_front_scene_engine = $raggu_web_front_scene_engine;
})($ || ($ = {}));
//raggu/web/front/scene/engine.ts
;
"use strict";
var $;
(function ($) {
    $.$raggu_web_front_scene_point_vert = `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
uniform float uScale;
uniform float uOpacity;
uniform float uNear;
uniform float uFar;
uniform vec3 uHaze;
uniform float uHazeAmount;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = -mv.z;
    float fade = smoothstep(uFar, uNear, depth);
    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));
    vAlpha = aAlpha * uOpacity * mix(0.3, 1.0, fade);
    gl_PointSize = aSize * (uScale / max(depth, 0.001));
    gl_Position = projectionMatrix * mv;
}
`;
    $.$raggu_web_front_scene_point_frag = `
uniform float uSoft;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    float core = smoothstep(1.0, 0.18, d);
    float glow = pow(1.0 - d, 2.4);
    float a = mix(core, glow, uSoft) * vAlpha;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;
    $.$raggu_web_front_scene_line_vert = `
attribute float aAlpha;
attribute vec3 aColor;
uniform float uOpacity;
uniform float uNear;
uniform float uFar;
uniform vec3 uHaze;
uniform float uHazeAmount;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float fade = smoothstep(uFar, uNear, -mv.z);
    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));
    vAlpha = aAlpha * uOpacity * mix(0.2, 1.0, fade);
    gl_Position = projectionMatrix * mv;
}
`;
    $.$raggu_web_front_scene_line_frag = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    if (vAlpha < 0.004) discard;
    gl_FragColor = vec4(vColor, vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;
    function $raggu_web_front_scene_point_scale(height, ratio, fov) {
        return (height * ratio) / (2 * Math.tan(((fov / 2) * Math.PI) / 180));
    }
    $.$raggu_web_front_scene_point_scale = $raggu_web_front_scene_point_scale;
    function $raggu_web_front_scene_frame(stage, viewport) {
        if (!stage || viewport.width <= 0 || viewport.height <= 0 || stage.width <= 0 || stage.height <= 0)
            return null;
        const scale = Math.max(viewport.width / stage.width, viewport.height / stage.height);
        const full_width = viewport.width / scale;
        const full_height = viewport.height / scale;
        return {
            full_width,
            full_height,
            offset_x: full_width / 2 - (stage.x + stage.width / 2),
            offset_y: full_height / 2 - (stage.y + stage.height / 2),
            width: viewport.width,
            height: viewport.height,
        };
    }
    $.$raggu_web_front_scene_frame = $raggu_web_front_scene_frame;
    function $raggu_web_front_scene_degree_ramp(degree, max) {
        if (max <= 1)
            return 0.5;
        return Math.pow(Math.log1p(degree) / Math.log1p(max), 1.85);
    }
    $.$raggu_web_front_scene_degree_ramp = $raggu_web_front_scene_degree_ramp;
})($ || ($ = {}));
//raggu/web/front/scene/shaders.ts
;
	($.$raggu_web_front_scene) = class $raggu_web_front_scene extends ($.$mol_view) {
		interactive(){
			return false;
		}
		mounted(){
			return false;
		}
		Layer(){
			const obj = new this.$.$raggu_web_front_scene_layer();
			return obj;
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		lights(){
			return "light";
		}
		attr(){
			return {
				...(super.attr()), 
				"raggu_web_front_scene_interactive": (this.interactive()), 
				"raggu_web_front_scene_mounted": (this.mounted())
			};
		}
		sub(){
			return [(this.Layer())];
		}
	};
	($mol_mem(($.$raggu_web_front_scene.prototype), "Layer"));
	($mol_mem(($.$raggu_web_front_scene.prototype), "viewer"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_scene_layer extends $mol_view {
            sub_visible() {
                return null;
            }
        }
        $$.$raggu_web_front_scene_layer = $raggu_web_front_scene_layer;
        class $raggu_web_front_scene extends $.$raggu_web_front_scene {
            state() {
                const viewer = this.viewer();
                return {
                    mode: viewer.mode(),
                    theme: this.lights() === 'dark' ? 'dark' : 'light',
                    graph_visible: viewer.corpus() ? viewer.graph_open() : true,
                    shown: viewer.shown_now(),
                    selected: viewer.corpus() ? viewer.selected() : null,
                    hover: viewer.hover(),
                    search: viewer.corpus() ? viewer.search() : '',
                    types: viewer.corpus() ? viewer.types() : [],
                    communities: viewer.corpus() ? viewer.communities() : [],
                    highlight: viewer.corpus() ? viewer.highlight() : [],
                    stage: viewer.stage(),
                    reset_token: viewer.reset_token(),
                };
            }
            interactive() {
                const viewer = this.viewer();
                return viewer.mode() === 'graph' && viewer.graph_open();
            }
            mounted(next) {
                return next ?? false;
            }
            engine() {
                const layer = this.Layer().dom_node();
                const viewer = this.viewer();
                const engine = $raggu_web_front_scene_engine(layer, {
                    state: () => {
                        try {
                            return this.last_state = this.state();
                        }
                        catch (error) {
                            return this.last_state ?? this.state_empty();
                        }
                    },
                    hover: id => viewer.hover(id),
                    select: id => viewer.selected(id),
                });
                new this.$.$mol_after_frame(() => this.mounted(true));
                return Object.assign(engine, { destructor: () => engine.destroy() });
            }
            last_state = null;
            state_empty() {
                return {
                    mode: 'ambient', theme: 'light', graph_visible: true, shown: null, selected: null, hover: null,
                    search: '', types: [], communities: [], highlight: [], stage: null, reset_token: 0,
                };
            }
            auto() {
                this.engine();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_scene.prototype, "state", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_scene.prototype, "mounted", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_scene.prototype, "engine", null);
        $$.$raggu_web_front_scene = $raggu_web_front_scene;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/scene/scene.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/scene/scene.view.css", "[raggu_web_front_scene] {\n\tposition: fixed;\n\tinset: 0;\n\tz-index: 0;\n\tdisplay: block;\n\topacity: 0;\n\tpointer-events: none;\n\ttouch-action: auto;\n\ttransition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1);\n}\n\n[raggu_web_front_scene][raggu_web_front_scene_mounted] {\n\topacity: 1;\n}\n\n[raggu_web_front_scene][raggu_web_front_scene_interactive] {\n\tpointer-events: auto;\n\ttouch-action: none;\n}\n\n[raggu_web_front_scene_layer] {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n}\n\n.ragu-label {\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 0;\n\tleft: 0;\n\tdisplay: inline-flex;\n\talign-items: baseline;\n\tgap: 0.4em;\n\twhite-space: nowrap;\n\tfont-family: var(--font-mono);\n\tfont-size: 11px;\n\tfont-weight: 500;\n\tletter-spacing: 0.02em;\n\tcolor: var(--text-2);\n\ttext-shadow: 0 1px 2px var(--bg), 0 0 10px var(--bg);\n\twill-change: transform, opacity;\n\ttransition: opacity 140ms linear;\n}\n\n.ragu-label--strong {\n\tz-index: 2;\n\tfont-size: 12.5px;\n\tfont-weight: 600;\n\tcolor: var(--text);\n\tpadding: 4px 9px;\n\tborder-radius: var(--radius-chip);\n\tbackground: var(--glass-tint-strong);\n\tborder: 1px solid var(--edge-glass);\n\tbackdrop-filter: blur(10px);\n\t-webkit-backdrop-filter: blur(10px);\n\tbox-shadow: 0 8px 20px -12px var(--shadow-cast);\n\ttext-shadow: none;\n}\n\n.ragu-label__type {\n\tfont-style: normal;\n\tfont-size: 9.5px;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--accent);\n}\n");
})($ || ($ = {}));
//raggu/web/front/scene/-css/scene.view.css.ts
;
	($.$raggu_web_front_glass) = class $raggu_web_front_glass extends ($.$mol_view) {
		solid(){
			return false;
		}
		dom_name(){
			return "span";
		}
		attr(){
			return {
				...(super.attr()), 
				"aria-hidden": "true", 
				"raggu_web_front_glass_solid": (this.solid())
			};
		}
	};

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/glass/glass.view.css", "[raggu_web_front_glass] {\n\tposition: absolute;\n\tinset: 0;\n\tz-index: -1;\n\tdisplay: block;\n\tborder-radius: inherit;\n\tbackground: var(--glass-tint);\n\tbackdrop-filter: blur(22px) saturate(150%);\n\t-webkit-backdrop-filter: blur(22px) saturate(150%);\n\tborder: 1px solid var(--edge-glass);\n\tbox-shadow:\n\t\tinset 0 1px 0 0 var(--glass-hi),\n\t\tinset 0 -1px 0 0 var(--glass-lo),\n\t\t0 1px 2px -1px var(--shadow-near),\n\t\t0 28px 56px -32px var(--shadow-cast);\n\ttransition:\n\t\ttransform 420ms var(--ease-out-quint),\n\t\topacity 260ms var(--ease-out-quint),\n\t\tborder-color 500ms var(--ease-out-quint);\n\tpointer-events: none;\n}\n\n[raggu_web_front_glass][raggu_web_front_glass_solid] {\n\tbackground: var(--glass-tint-strong);\n\tbackdrop-filter: blur(30px) saturate(160%);\n\t-webkit-backdrop-filter: blur(30px) saturate(160%);\n\tbox-shadow:\n\t\tinset 0 1px 0 0 var(--glass-hi),\n\t\tinset 0 -1px 0 0 var(--glass-lo),\n\t\t0 2px 4px -2px var(--shadow-near),\n\t\t0 40px 80px -40px var(--shadow-cast);\n}\n");
})($ || ($ = {}));
//raggu/web/front/glass/-css/glass.view.css.ts
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
//mol/image/image.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
})($ || ($ = {}));
//mol/image/-css/image.view.css.ts
;
	($.$raggu_web_front_mark) = class $raggu_web_front_mark extends ($.$mol_image) {
		data_uri(){
			return "";
		}
		uri(){
			return (this.data_uri());
		}
		title(){
			return "RAGU";
		}
	};

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
<defs>
<path id="r" fill-rule="evenodd" d="M12 8 H40 C50 8 56 14 56 22 C56 29 52 34 45.5 36 L58 56 H44 L33.5 38 H24 V56 H12 Z M24 18 V28 H39 C42.6 28 45 26 45 23 C45 20 42.6 18 39 18 Z"/>
<clipPath id="c"><use href="#r"/></clipPath>
<pattern id="d" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1.6" cy="1.6" r="1.15" fill="#0a111c"/></pattern>
</defs>
<rect width="64" height="64" rx="14" fill="#0a111c"/>
<g clip-path="url(#c)">
<rect x="8" y="6" width="52" height="17" fill="#e4573d"/>
<rect x="8" y="23" width="52" height="15" fill="#33465c"/>
<rect x="8" y="38" width="52" height="20" fill="#e4573d"/>
<g stroke="#0a111c" stroke-width="1.7" fill="#0a111c">
<path d="M14 18 L26 12 L38 17 L50 11" fill="none"/>
<circle cx="14" cy="18" r="2.4"/><circle cx="26" cy="12" r="2.4"/><circle cx="38" cy="17" r="2.4"/><circle cx="50" cy="11" r="2.4"/>
</g>
<g stroke="#dde3ea" stroke-width="0.9" fill="none">
<path d="M9 31 L19 26 L29 31 L39 26 L49 31 L59 26"/>
<path d="M9 31 L19 36 L29 31 L39 36 L49 31 L59 36"/>
<path d="M19 26 V36 M39 26 V36"/>
</g>
<rect x="8" y="39" width="52" height="19" fill="url(#d)"/>
</g>
</svg>`;
        class $raggu_web_front_mark extends $.$raggu_web_front_mark {
            data_uri() {
                return 'data:image/svg+xml,' + encodeURIComponent(svg);
            }
        }
        $$.$raggu_web_front_mark = $raggu_web_front_mark;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/mark/mark.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/mark/mark.view.css", "[raggu_web_front_mark] {\n\tdisplay: block;\n\tflex: none;\n\twidth: 30px;\n\theight: 30px;\n\tborder-radius: 9px;\n}\n");
})($ || ($ = {}));
//raggu/web/front/mark/-css/mark.view.css.ts
;
	($.$raggu_web_front_pop) = class $raggu_web_front_pop extends ($.$mol_view) {
		hint(){
			return "";
		}
		toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [];
		}
		Trigger(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.hint()));
			(obj.attr) = () => ({
				...(this.$.$mol_button.prototype.attr.call(obj)), 
				"aria-label": (this.hint()), 
				"aria-expanded": (this.showed()), 
				"raggu_web_front_pop_open": (this.showed())
			});
			(obj.click) = (next) => ((this.toggle(next)));
			(obj.sub) = () => ((this.trigger_content()));
			return obj;
		}
		bubble_keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			(obj.solid) = () => (true);
			return obj;
		}
		bubble_content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.bubble_content()));
			return obj;
		}
		Bubble(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "popover": "manual"});
			(obj.style) = () => ({...(this.$.$mol_view.prototype.style.call(obj)), "width": (this.bubble_width())});
			(obj.event) = () => ({...(this.$.$mol_view.prototype.event.call(obj)), "keydown": (next) => (this.bubble_keydown(next))});
			(obj.sub) = () => ([(this.Glass()), (this.Content())]);
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		align(){
			return "start";
		}
		offset(){
			return 10;
		}
		bubble_width(){
			return "auto";
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_pop_showed": (this.showed())};
		}
		sub(){
			return [(this.Trigger()), (this.Bubble())];
		}
	};
	($mol_mem(($.$raggu_web_front_pop.prototype), "toggle"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "Trigger"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "bubble_keydown"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "Content"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "Bubble"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "showed"));
	($mol_mem(($.$raggu_web_front_pop.prototype), "close"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_pop extends $.$raggu_web_front_pop {
            toggle() {
                this.showed(!this.showed());
            }
            close() {
                this.showed(false);
            }
            bubble_keydown(event) {
                if (event.key !== 'Escape')
                    return;
                this.close();
                this.Trigger().dom_node().focus();
            }
            place() {
                const trigger = this.Trigger().dom_node();
                const bubble = this.Bubble().dom_node();
                const rect = trigger.getBoundingClientRect();
                const width = bubble.offsetWidth;
                const gap = 8;
                let left = this.align() === 'end' ? rect.right - width : rect.left;
                left = Math.max(gap, Math.min(window.innerWidth - width - gap, left));
                bubble.style.left = `${left}px`;
                bubble.style.top = `${rect.bottom + this.offset()}px`;
            }
            watch() {
                const bubble = this.Bubble().dom_node();
                if (!this.showed()) {
                    if (bubble.matches?.(':popover-open'))
                        bubble.hidePopover?.();
                    return null;
                }
                bubble.showPopover?.();
                this.place();
                const follow = () => this.place();
                let tracking = requestAnimationFrame(function step() {
                    follow();
                    tracking = requestAnimationFrame(step);
                });
                const outside = (event) => {
                    const target = event.target;
                    if (bubble.contains(target))
                        return;
                    if (this.Trigger().dom_node().contains(target))
                        return;
                    this.close();
                };
                document.addEventListener('pointerdown', outside, true);
                return {
                    destructor: () => {
                        cancelAnimationFrame(tracking);
                        document.removeEventListener('pointerdown', outside, true);
                    },
                };
            }
            auto() {
                this.watch();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_pop.prototype, "watch", null);
        $$.$raggu_web_front_pop = $raggu_web_front_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/pop/pop.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/pop/pop.view.css", "[raggu_web_front_pop] {\n\tdisplay: flex;\n\talign-items: stretch;\n}\n\n[raggu_web_front_pop_bubble] {\n\tposition: fixed;\n\tinset: auto;\n\tmargin: 0;\n\tpadding: 6px;\n\tborder: 0;\n\tbackground: transparent;\n\tcolor: var(--text);\n\toverflow: visible;\n\tisolation: isolate;\n\tdisplay: none;\n\tflex-direction: column;\n\tborder-radius: var(--radius-island);\n\topacity: 0;\n\ttransition:\n\t\topacity 200ms var(--ease-out-quint),\n\t\tdisplay 200ms allow-discrete,\n\t\toverlay 200ms allow-discrete;\n}\n\n[raggu_web_front_pop_bubble]:popover-open {\n\tdisplay: flex;\n\topacity: 1;\n}\n\n@starting-style {\n\t[raggu_web_front_pop_bubble]:popover-open {\n\t\topacity: 0;\n\t}\n\t[raggu_web_front_pop_bubble]:popover-open > [raggu_web_front_glass] {\n\t\ttransform: scale(0.955);\n\t\topacity: 0;\n\t}\n}\n\n[raggu_web_front_pop_bubble]:not(:popover-open) > [raggu_web_front_glass] {\n\ttransform: scale(0.955);\n\topacity: 0;\n}\n\n[raggu_web_front_pop_content] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmin-width: 0;\n}\n");
})($ || ($ = {}));
//raggu/web/front/pop/-css/pop.view.css.ts
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
//mol/svg/svg.view.ts
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
//mol/svg/root/-css/root.view.css.ts
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
	($.$raggu_web_front_icon) = class $raggu_web_front_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Stroke(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		fill(){
			return "";
		}
		Fill(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.fill()));
			return obj;
		}
		view_box(){
			return "0 0 18 18";
		}
		attr(){
			return {...(super.attr()), "aria-hidden": "true"};
		}
		sub(){
			return [(this.Stroke()), (this.Fill())];
		}
	};
	($mol_mem(($.$raggu_web_front_icon.prototype), "Stroke"));
	($mol_mem(($.$raggu_web_front_icon.prototype), "Fill"));
	($.$raggu_web_front_icon_graph) = class $raggu_web_front_icon_graph extends ($.$raggu_web_front_icon) {
		path(){
			return "M2.1 5a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0M12.4 4.5a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0M7.4 13a2.1 2.1 0 1 0 4.2 0a2.1 2.1 0 1 0 -4.2 0M5.6 6.4 L8.2 11.2 M5.7 4.6 L12.3 4.5 M11.3 12 L13.2 6.1";
		}
	};
	($.$raggu_web_front_icon_chat) = class $raggu_web_front_icon_chat extends ($.$raggu_web_front_icon) {
		path(){
			return "M2.6 8.2c0-2.9 2.7-4.9 6.4-4.9s6.4 2 6.4 4.9-2.7 4.9-6.4 4.9c-.8 0-1.6-.1-2.3-.3L3.4 14.6l.7-2.6c-.9-.9-1.5-2.1-1.5-3.8ZM6.4 8.1h5.2";
		}
	};
	($.$raggu_web_front_icon_search) = class $raggu_web_front_icon_search extends ($.$raggu_web_front_icon) {
		path(){
			return "M3.4 8a4.6 4.6 0 1 0 9.2 0a4.6 4.6 0 1 0 -9.2 0M11.5 11.6 L15.2 15.3";
		}
	};
	($.$raggu_web_front_icon_close) = class $raggu_web_front_icon_close extends ($.$raggu_web_front_icon) {
		path(){
			return "M4.6 4.6 L13.4 13.4 M13.4 4.6 L4.6 13.4";
		}
	};
	($.$raggu_web_front_icon_sliders) = class $raggu_web_front_icon_sliders extends ($.$raggu_web_front_icon) {
		path(){
			return "M2.6 5.4h5.1M11 5.4h4.4M2.6 12.6h3.1M9 12.6h6.4M7.7 5.4a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0M5.7 12.6a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0";
		}
	};
	($.$raggu_web_front_icon_sun) = class $raggu_web_front_icon_sun extends ($.$raggu_web_front_icon) {
		path(){
			return "M5.9 9a3.1 3.1 0 1 0 6.2 0a3.1 3.1 0 1 0 -6.2 0M9 1.9v1.6M9 14.5v1.6M1.9 9h1.6M14.5 9h1.6M3.9 3.9l1.2 1.2M12.9 12.9l1.2 1.2M14.1 3.9l-1.2 1.2M5.1 12.9l-1.2 1.2";
		}
	};
	($.$raggu_web_front_icon_moon) = class $raggu_web_front_icon_moon extends ($.$raggu_web_front_icon) {
		path(){
			return "M14.4 10.6A5.9 5.9 0 0 1 7.1 3.4a6.2 6.2 0 1 0 7.3 7.2Z";
		}
	};
	($.$raggu_web_front_icon_display) = class $raggu_web_front_icon_display extends ($.$raggu_web_front_icon) {
		path(){
			return "M4 3.4h10a1.6 1.6 0 0 1 1.6 1.6v5.4a1.6 1.6 0 0 1 -1.6 1.6h-10a1.6 1.6 0 0 1 -1.6 -1.6v-5.4a1.6 1.6 0 0 1 1.6 -1.6zM6.6 15.1h4.8M9 12v3.1";
		}
	};
	($.$raggu_web_front_icon_globe) = class $raggu_web_front_icon_globe extends ($.$raggu_web_front_icon) {
		path(){
			return "M2.6 9a6.4 6.4 0 1 0 12.8 0a6.4 6.4 0 1 0 -12.8 0M2.7 9h12.6M9 2.6c1.8 2 2.7 4.1 2.7 6.4S10.8 13.4 9 15.4C7.2 13.4 6.3 11.3 6.3 9S7.2 4.6 9 2.6Z";
		}
	};
	($.$raggu_web_front_icon_chevron) = class $raggu_web_front_icon_chevron extends ($.$raggu_web_front_icon) {
		path(){
			return "M5.4 7 L9 10.6 L12.6 7";
		}
	};
	($.$raggu_web_front_icon_arrow) = class $raggu_web_front_icon_arrow extends ($.$raggu_web_front_icon) {
		path(){
			return "M4.4 9h9.2M9.6 5.2 13.6 9l-4 3.8";
		}
	};
	($.$raggu_web_front_icon_send) = class $raggu_web_front_icon_send extends ($.$raggu_web_front_icon) {
		path(){
			return "M3.2 9 15 4.2 10.6 15.2 8.6 10.4 3.2 9Z";
		}
	};
	($.$raggu_web_front_icon_stop) = class $raggu_web_front_icon_stop extends ($.$raggu_web_front_icon) {
		fill(){
			return "M6.4 5h5.2a1.4 1.4 0 0 1 1.4 1.4v5.2a1.4 1.4 0 0 1 -1.4 1.4h-5.2a1.4 1.4 0 0 1 -1.4 -1.4v-5.2a1.4 1.4 0 0 1 1.4 -1.4z";
		}
	};
	($.$raggu_web_front_icon_info) = class $raggu_web_front_icon_info extends ($.$raggu_web_front_icon) {
		path(){
			return "M2.6 9a6.4 6.4 0 1 0 12.8 0a6.4 6.4 0 1 0 -12.8 0M9 8.2v4.1";
		}
		fill(){
			return "M8.15 5.7a.85 .85 0 1 0 1.7 0a.85 .85 0 1 0 -1.7 0";
		}
	};
	($.$raggu_web_front_icon_sources) = class $raggu_web_front_icon_sources extends ($.$raggu_web_front_icon) {
		path(){
			return "M3.2 4.6a1.6 1.6 0 0 1 1.6-1.6H8l1.4 1.7h4a1.4 1.4 0 0 1 1.4 1.4v1.1M2.9 7.4h12.7l-1.3 6a1.4 1.4 0 0 1-1.4 1.1H4.7a1.4 1.4 0 0 1-1.4-1.2Z";
		}
	};
	($.$raggu_web_front_icon_sweep) = class $raggu_web_front_icon_sweep extends ($.$raggu_web_front_icon) {
		path(){
			return "M11.6 2.8 8.2 6.2M6.4 5.1 12.9 11.6 10.8 13.7 4.3 7.2ZM3.1 14.9h4.4";
		}
	};
	($.$raggu_web_front_icon_plus) = class $raggu_web_front_icon_plus extends ($.$raggu_web_front_icon) {
		path(){
			return "M9 4.2v9.6M4.2 9h9.6";
		}
	};
	($.$raggu_web_front_icon_recentre) = class $raggu_web_front_icon_recentre extends ($.$raggu_web_front_icon) {
		path(){
			return "M3 6.2V4.3a1.3 1.3 0 0 1 1.3-1.3H6.2M11.8 3h1.9A1.3 1.3 0 0 1 15 4.3v1.9M15 11.8v1.9a1.3 1.3 0 0 1-1.3 1.3h-1.9M6.2 15H4.3A1.3 1.3 0 0 1 3 13.7v-1.9M7 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0";
		}
	};
	($.$raggu_web_front_icon_caret) = class $raggu_web_front_icon_caret extends ($.$raggu_web_front_icon) {
		view_box(){
			return "0 0 12 12";
		}
		path(){
			return "M2 4.5 L6 8.5 L10 4.5";
		}
	};
	($.$raggu_web_front_icon_mol) = class $raggu_web_front_icon_mol extends ($.$raggu_web_front_icon) {
		path(){
			return "M12.6 5.4a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M3 5.4a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M7.8 1.8a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M7.8 9a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M12.6 12.6a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M7.8 16.2a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M3 12.6a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M0.6 9a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M15 9a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M5.16 6.12L8.04 8.28M5.16 4.68L8.04 2.52M9.96 2.52L12.84 4.68M9 3L9 7.8M9.96 9.72L12.84 11.88M9 10.2L9 15M12.84 13.32L9.96 15.48M8.04 15.48L5.16 13.32";
		}
	};

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/icon/icon.view.css", "[raggu_web_front_icon] {\n\tdisplay: block;\n\tflex: none;\n\twidth: 18px;\n\theight: 18px;\n\tfill: none;\n\tstroke: currentColor;\n\tstroke-width: 1.5;\n\tstroke-linecap: round;\n\tstroke-linejoin: round;\n\ttransition: transform 300ms ease;\n}\n\n[raggu_web_front_icon_fill] {\n\tfill: currentColor;\n\tstroke: none;\n}\n");
})($ || ($ = {}));
//raggu/web/front/icon/-css/icon.view.css.ts
;
	($.$raggu_web_front_chrome_switcher) = class $raggu_web_front_chrome_switcher extends ($.$raggu_web_front_pop) {
		pick_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_switcher_pick_label"));
		}
		corpus_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_switcher_corpus_label"));
		}
		Current_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.corpus_label()));
			return obj;
		}
		current_title(){
			return "";
		}
		Current_title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.current_title())]);
			return obj;
		}
		Current(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Current_label()), (this.Current_title())]);
			return obj;
		}
		Caret(){
			const obj = new this.$.$raggu_web_front_icon_caret();
			return obj;
		}
		corpora_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_switcher_corpora_label"));
		}
		Heading_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.corpora_label()));
			return obj;
		}
		Heading(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Heading_label())]);
			return obj;
		}
		rows(){
			return [];
		}
		List(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		row_id(id){
			return "";
		}
		row_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		row_current(id){
			return false;
		}
		row_title(id){
			return "";
		}
		Row_title(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.row_title(id))]);
			return obj;
		}
		row_domain(id){
			return "";
		}
		Row_domain(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.row_domain(id))]);
			return obj;
		}
		Row_text(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Row_title(id)), (this.Row_domain(id))]);
			return obj;
		}
		row_count(id){
			return "";
		}
		Row_count(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.row_count(id)));
			return obj;
		}
		corpus(){
			return "";
		}
		hint(){
			return (this.pick_label());
		}
		bubble_width(){
			return "min(30rem, calc(100vw - 2rem))";
		}
		trigger_content(){
			return [(this.Current()), (this.Caret())];
		}
		bubble_content(){
			return [(this.Heading()), (this.List())];
		}
		Row(id){
			const obj = new this.$.$raggu_web_front_link();
			(obj.arg) = () => ({"corpus": (this.row_id(id))});
			(obj.click) = (next) => ((this.row_click(id, next)));
			(obj.attr) = () => ({...(this.$.$raggu_web_front_link.prototype.attr.call(obj)), "raggu_web_front_chrome_switcher_row_current": (this.row_current(id))});
			(obj.sub) = () => ([(this.Row_text(id)), (this.Row_count(id))]);
			return obj;
		}
		Row_skeleton(id){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Current_label"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Current_title"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Current"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Caret"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Heading_label"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "Heading"));
	($mol_mem(($.$raggu_web_front_chrome_switcher.prototype), "List"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "row_click"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row_title"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row_domain"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row_text"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row_count"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row"));
	($mol_mem_key(($.$raggu_web_front_chrome_switcher.prototype), "Row_skeleton"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_chrome_switcher extends $.$raggu_web_front_chrome_switcher {
            datasets() {
                return $raggu_web_front_data_ready(() => $raggu_web_front_data.datasets_now());
            }
            current_title() {
                const active = this.datasets()?.find(item => item.id === this.corpus());
                return active?.title ?? this.corpus();
            }
            rows() {
                const datasets = this.datasets();
                if (!datasets)
                    return [0, 1, 2].map(index => this.Row_skeleton(index));
                return datasets.map(item => this.Row(item.id));
            }
            row_item(id) {
                return this.datasets().find(item => item.id === id);
            }
            row_id(id) {
                return id;
            }
            row_title(id) {
                return this.row_item(id).title;
            }
            row_domain(id) {
                return this.row_item(id).domain;
            }
            row_count(id) {
                const stats = this.row_item(id).stats;
                return `${$raggu_web_front_lib_compact(stats.nodes)} · ${$raggu_web_front_lib_compact(stats.edges)}`;
            }
            row_current(id) {
                return id === this.corpus();
            }
            row_click() {
                this.close();
            }
        }
        $$.$raggu_web_front_chrome_switcher = $raggu_web_front_chrome_switcher;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/chrome/switcher/switcher.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chrome/switcher/switcher.view.css", "[raggu_web_front_chrome_switcher_trigger] {\n\tdisplay: flex;\n\tmin-width: 0;\n\tmax-width: 9.18rem;\n\talign-items: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.5rem 0.625rem;\n\ttext-align: left;\n\ttransition: background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_switcher_trigger]:hover,\n[raggu_web_front_chrome_switcher_trigger][raggu_web_front_pop_open=\"true\"] {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_chrome_switcher_current] {\n\tdisplay: block;\n\tmin-width: 0;\n\tflex: 1;\n}\n\n[raggu_web_front_chrome_switcher_current_label] {\n\tdisplay: block;\n}\n\n[raggu_web_front_chrome_switcher_current_title] {\n\tdisplay: block;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_switcher_caret] {\n\twidth: 0.75rem;\n\theight: 0.75rem;\n\tflex-shrink: 0;\n\tcolor: var(--text-3);\n\tstroke-width: 1.4;\n\ttransition: transform 300ms ease;\n}\n\n[raggu_web_front_chrome_switcher_trigger][raggu_web_front_pop_open=\"true\"] [raggu_web_front_chrome_switcher_caret] {\n\ttransform: rotate(180deg);\n}\n\n[raggu_web_front_chrome_switcher_bubble] {\n\tborder-radius: var(--radius-island);\n}\n\n[raggu_web_front_chrome_switcher_heading] {\n\tpadding: 0.5rem 0.75rem 0.25rem;\n}\n\n[raggu_web_front_chrome_switcher_list] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.25rem;\n\tpadding: 0.25rem;\n}\n\n[raggu_web_front_chrome_switcher_row] {\n\tdisplay: grid;\n\tgrid-template-columns: 1fr auto;\n\talign-items: center;\n\tgap: 0.75rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.625rem 0.75rem;\n\ttransition: background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_switcher_row]:hover {\n\tbackground: color-mix(in oklab, var(--text) 6%, transparent);\n}\n\n[raggu_web_front_chrome_switcher_row][raggu_web_front_chrome_switcher_row_current] {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_chrome_switcher_row_text] {\n\tdisplay: block;\n\tmin-width: 0;\n}\n\n[raggu_web_front_chrome_switcher_row_title] {\n\tdisplay: block;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_switcher_row_current] [raggu_web_front_chrome_switcher_row_title] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_switcher_row_domain] {\n\tdisplay: block;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_chrome_switcher_row_count] {\n\twhite-space: nowrap;\n\tfont-variant-numeric: tabular-nums;\n}\n\n[raggu_web_front_chrome_switcher_row_skeleton] {\n\theight: 4rem;\n\twidth: 100%;\n}\n\n@media (min-width: 640px) {\n\t[raggu_web_front_chrome_switcher_trigger] {\n\t\tmax-width: none;\n\t\tmin-width: 9.18rem;\n\t}\n}\n");
})($ || ($ = {}));
//raggu/web/front/chrome/switcher/-css/switcher.view.css.ts
;
	($.$raggu_web_front_chrome_tools) = class $raggu_web_front_chrome_tools extends ($.$mol_view) {
		recentre_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_recentre_label"));
		}
		recentre(next){
			if(next !== undefined) return next;
			return null;
		}
		Recentre_icon(){
			const obj = new this.$.$raggu_web_front_icon_recentre();
			return obj;
		}
		Recentre(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.recentre_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.recentre_label())});
			(obj.click) = (next) => ((this.recentre(next)));
			(obj.sub) = () => ([(this.Recentre_icon())]);
			return obj;
		}
		stats_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_stats_label"));
		}
		stale_class(){
			return "";
		}
		shown_badge(){
			return "—";
		}
		Shown_badge(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "class": (this.stale_class())});
			(obj.sub) = () => ([(this.shown_badge())]);
			return obj;
		}
		Ramp(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		total_badge(){
			return "—";
		}
		Total_badge(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "class": (this.stale_class())});
			(obj.sub) = () => ([(this.total_badge())]);
			return obj;
		}
		Stats_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.stats_label()));
			return obj;
		}
		shown_full(){
			return "";
		}
		Shown_full(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.shown_full())]);
			return obj;
		}
		shown_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_shown_label"));
		}
		Shown_caption(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.shown_label()));
			return obj;
		}
		Shown_block(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Shown_full()), (this.Shown_caption())]);
			return obj;
		}
		total_full(){
			return "";
		}
		Total_full(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.total_full())]);
			return obj;
		}
		total_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_total_label"));
		}
		Total_caption(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.total_label()));
			return obj;
		}
		Total_block(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Total_full()), (this.Total_caption())]);
			return obj;
		}
		Numbers(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "class": (this.stale_class())});
			(obj.sub) = () => ([(this.Shown_block()), (this.Total_block())]);
			return obj;
		}
		bar_width(){
			return "0%";
		}
		Bar_fill(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"width": (this.bar_width())});
			return obj;
		}
		Bar(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Bar_fill())]);
			return obj;
		}
		legend_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_legend_label"));
		}
		Legend(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.legend_label()));
			return obj;
		}
		action(){
			return [];
		}
		Action(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.action()));
			return obj;
		}
		Stats_body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Stats_label()), 
				(this.Numbers()), 
				(this.Bar()), 
				(this.Legend()), 
				(this.Action())
			]);
			return obj;
		}
		Stats(){
			const obj = new this.$.$raggu_web_front_pop();
			(obj.align) = () => ("end");
			(obj.hint) = () => ((this.stats_label()));
			(obj.bubble_width) = () => ("19rem");
			(obj.trigger_content) = () => ([
				(this.Shown_badge()), 
				(this.Ramp()), 
				(this.Total_badge())
			]);
			(obj.bubble_content) = () => ([(this.Stats_body())]);
			return obj;
		}
		more_enabled(){
			return true;
		}
		more(next){
			if(next !== undefined) return next;
			return null;
		}
		More_icon(){
			const obj = new this.$.$raggu_web_front_icon_plus();
			return obj;
		}
		more_text(){
			return "";
		}
		rest_enabled(){
			return true;
		}
		rest(next){
			if(next !== undefined) return next;
			return null;
		}
		Rest_icon(){
			const obj = new this.$.$raggu_web_front_icon_plus();
			return obj;
		}
		rest_text(){
			return "";
		}
		paging_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_paging_label"));
		}
		rest_failed_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_rest_failed_label"));
		}
		clipped_text(){
			return "";
		}
		at_max_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_at_max_label"));
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		sub(){
			return [(this.Recentre()), (this.Stats())];
		}
		More(){
			const obj = new this.$.$mol_button();
			(obj.enabled) = () => ((this.more_enabled()));
			(obj.click) = (next) => ((this.more(next)));
			(obj.sub) = () => ([(this.More_icon()), (this.more_text())]);
			return obj;
		}
		Rest(){
			const obj = new this.$.$mol_button();
			(obj.enabled) = () => ((this.rest_enabled()));
			(obj.click) = (next) => ((this.rest(next)));
			(obj.sub) = () => ([(this.Rest_icon()), (this.rest_text())]);
			return obj;
		}
		Paging_note(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.paging_label()));
			return obj;
		}
		Rest_failed(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.rest_failed_label()));
			return obj;
		}
		Clipped_note(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.clipped_text()));
			return obj;
		}
		At_max(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.at_max_label()));
			return obj;
		}
		loading_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_loading_label"));
		}
		load_more_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_load_more_label"));
		}
		load_rest_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_load_rest_label"));
		}
		loading_rest_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_loading_rest_label"));
		}
		clipped_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_tools_clipped_label"));
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "recentre"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Recentre_icon"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Recentre"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Shown_badge"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Ramp"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Total_badge"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Stats_label"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Shown_full"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Shown_caption"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Shown_block"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Total_full"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Total_caption"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Total_block"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Numbers"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Bar_fill"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Bar"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Legend"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Action"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Stats_body"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Stats"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "more"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "More_icon"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "rest"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Rest_icon"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "More"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Rest"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Paging_note"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Rest_failed"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "Clipped_note"));
	($mol_mem(($.$raggu_web_front_chrome_tools.prototype), "At_max"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_chrome_tools extends $.$raggu_web_front_chrome_tools {
            recentre() {
                this.viewer().recentre();
            }
            meta() {
                return this.viewer().shown_now()?.model.meta ?? null;
            }
            shown() {
                return this.meta()?.returned_nodes ?? 0;
            }
            total() {
                return this.meta()?.total_nodes ?? 0;
            }
            stale() {
                return this.viewer().solving() || this.whole_pending();
            }
            stale_class() {
                return this.stale() ? 'is-stale' : '';
            }
            shown_badge() {
                return this.shown() ? $raggu_web_front_lib_badge(this.shown()) : '—';
            }
            total_badge() {
                return this.total() ? $raggu_web_front_lib_badge(this.total()) : '—';
            }
            shown_full() {
                return $raggu_web_front_lib_full(this.shown());
            }
            total_full() {
                return $raggu_web_front_lib_full(this.total());
            }
            bar_width() {
                const total = this.total();
                return `${total ? Math.max(3, Math.round((this.shown() / total) * 100)) : 0}%`;
            }
            limit() {
                return $raggu_web_front_lib_settings.value().graphLimit;
            }
            next_step() {
                return $raggu_web_front_lib_graph_limit_steps.find(step => step > this.limit()) ?? null;
            }
            beyond_cap() {
                return this.total() > this.shown() && !this.next_step();
            }
            whole_pending(next) {
                return next ?? false;
            }
            whole_progress(next) {
                return next ?? 0;
            }
            whole_failed(next) {
                return next ?? false;
            }
            whole_clipped(next) {
                return next ?? 0;
            }
            action() {
                if (this.next_step())
                    return [this.More()];
                if (this.beyond_cap()) {
                    return [
                        this.Rest(),
                        this.Paging_note(),
                        ...this.whole_failed() ? [this.Rest_failed()] : [],
                        ...this.whole_clipped() > 0 ? [this.Clipped_note()] : [],
                    ];
                }
                return [this.At_max()];
            }
            more_enabled() {
                return !this.stale();
            }
            more_text() {
                if (this.stale())
                    return this.loading_label();
                return this.load_more_label().replace('{n}', $raggu_web_front_lib_compact(this.next_step() - this.limit()));
            }
            more() {
                const step = this.next_step();
                if (step)
                    $raggu_web_front_lib_settings.patch({ graphLimit: step });
            }
            rest_enabled() {
                return !this.stale();
            }
            rest_text() {
                if (this.whole_pending())
                    return this.loading_rest_label().replace('{n}', String(Math.round(this.whole_progress() * 100)));
                return this.load_rest_label();
            }
            clipped_text() {
                return this.clipped_label().replace('{n}', String(this.whole_clipped()));
            }
            rest() {
                this.whole_pending(true);
                this.whole_failed(false);
                this.whole_progress(0);
                this.viewer().load_whole(ratio => this.whole_progress(ratio)).then(result => {
                    this.whole_clipped(result.clipped.length);
                    this.whole_pending(false);
                }, () => {
                    this.whole_failed(true);
                    this.whole_pending(false);
                });
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome_tools.prototype, "whole_pending", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome_tools.prototype, "whole_progress", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome_tools.prototype, "whole_failed", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome_tools.prototype, "whole_clipped", null);
        $$.$raggu_web_front_chrome_tools = $raggu_web_front_chrome_tools;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/chrome/tools/tools.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chrome/tools/tools.view.css", "[raggu_web_front_chrome_tools] {\n\tpointer-events: auto;\n\tdisplay: flex;\n\tmin-height: var(--island-h);\n\talign-items: stretch;\n\tgap: 0.25rem;\n\tpadding: 0.25rem;\n}\n\n[raggu_web_front_chrome_tools_recentre],\n[raggu_web_front_chrome_tools_stats] > [raggu_web_front_pop_trigger] {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms var(--ease-out-quint), color 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_chrome_tools_recentre]:hover,\n[raggu_web_front_chrome_tools_stats] > [raggu_web_front_pop_trigger]:hover,\n[raggu_web_front_chrome_tools_stats] > [raggu_web_front_pop_trigger][raggu_web_front_pop_open=\"true\"] {\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_tools_recentre] {\n\twidth: 2.5rem;\n}\n\n[raggu_web_front_chrome_tools_stats] > [raggu_web_front_pop_trigger] {\n\twidth: 3rem;\n\tflex-direction: column;\n\tgap: 5px;\n\tpadding: 0 0.25rem;\n}\n\n[raggu_web_front_chrome_tools_shown_badge] {\n\tfont-family: var(--font-mono);\n\tfont-size: 11px;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_tools_ramp] {\n\tdisplay: block;\n\theight: 3px;\n\twidth: 2rem;\n\tborder-radius: 9999px;\n\tbackground: linear-gradient(to right, color-mix(in oklab, var(--text-3) 45%, transparent), var(--accent));\n}\n\n[raggu_web_front_chrome_tools_total_badge] {\n\tfont-family: var(--font-mono);\n\tfont-size: 9px;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_chrome_tools_stats_body] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 0.625rem 0.75rem;\n}\n\n[raggu_web_front_chrome_tools_numbers] {\n\tmargin-top: 1rem;\n\tdisplay: flex;\n\talign-items: flex-end;\n\tjustify-content: space-between;\n\tgap: 1rem;\n}\n\n[raggu_web_front_chrome_tools_shown_block],\n[raggu_web_front_chrome_tools_total_block] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_chrome_tools_total_block] {\n\talign-items: flex-end;\n\ttext-align: right;\n}\n\n[raggu_web_front_chrome_tools_shown_full] {\n\tfont-family: var(--font-mono);\n\tfont-size: 1.5rem;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_tools_total_full] {\n\tfont-family: var(--font-mono);\n\tfont-size: 1.125rem;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_chrome_tools_shown_caption],\n[raggu_web_front_chrome_tools_total_caption] {\n\tmargin-top: 0.5rem;\n}\n\n[raggu_web_front_chrome_tools_bar] {\n\tmargin-top: 1rem;\n\theight: 0.25rem;\n\twidth: 100%;\n\toverflow: hidden;\n\tborder-radius: 9999px;\n\tbackground: color-mix(in oklab, var(--text-3) 18%, transparent);\n}\n\n[raggu_web_front_chrome_tools_bar_fill] {\n\theight: 100%;\n\tborder-radius: 9999px;\n\tbackground: linear-gradient(to right, color-mix(in oklab, var(--text-3) 45%, transparent), var(--accent));\n\ttransition: width 500ms var(--ease-out-quint);\n}\n\n[raggu_web_front_chrome_tools_legend] {\n\tmargin-top: 0.75rem;\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_chrome_tools_action] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_chrome_tools_more],\n[raggu_web_front_chrome_tools_rest] {\n\tmargin-top: 1rem;\n\tdisplay: flex;\n\twidth: 100%;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.625rem 0.75rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--accent);\n\tborder: 1px solid color-mix(in oklab, var(--accent-line) 50%, transparent);\n\ttransition: background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_tools_more]:hover,\n[raggu_web_front_chrome_tools_rest]:hover {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_chrome_tools_more][disabled],\n[raggu_web_front_chrome_tools_rest][disabled] {\n\tpointer-events: none;\n\topacity: 0.45;\n}\n\n[raggu_web_front_chrome_tools_more_icon],\n[raggu_web_front_chrome_tools_rest_icon] {\n\twidth: 1rem;\n\theight: 1rem;\n}\n\n[raggu_web_front_chrome_tools_paging_note],\n[raggu_web_front_chrome_tools_clipped_note] {\n\tmargin-top: 0.75rem;\n\tfont-size: 11px;\n\tline-height: 1.625;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_chrome_tools_rest_failed] {\n\tmargin-top: 0.5rem;\n\tfont-size: 11px;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_tools_at_max] {\n\tmargin-top: 1rem;\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n");
})($ || ($ = {}));
//raggu/web/front/chrome/tools/-css/tools.view.css.ts
;
	($.$raggu_web_front_chrome_toggle) = class $raggu_web_front_chrome_toggle extends ($.$mol_button) {
		Pane(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"class": "accent-pane", 
				"aria-hidden": "true"
			});
			return obj;
		}
		active(){
			return false;
		}
		label(){
			return "";
		}
		Icon(){
			const obj = new this.$.$raggu_web_front_icon();
			return obj;
		}
		attr(){
			return {...(super.attr()), "aria-pressed": (this.active())};
		}
		sub(){
			return [
				(this.Pane()), 
				(this.Icon()), 
				(this.label())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_toggle.prototype), "Pane"));
	($mol_mem(($.$raggu_web_front_chrome_toggle.prototype), "Icon"));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chrome/toggle/toggle.view.css", "[raggu_web_front_chrome_toggle] {\n\tposition: relative;\n\tisolation: isolate;\n\tmargin-bottom: 1px;\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0 0.875rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text-3);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_toggle]:hover {\n\tbackground: color-mix(in oklab, var(--text) 6%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_toggle][aria-pressed=\"true\"] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_toggle][aria-pressed=\"true\"]:hover {\n\tbackground: transparent;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_toggle_pane] {\n\topacity: 0;\n\ttransform: scale(0.92);\n\ttransition:\n\t\topacity 300ms var(--ease-out-quint),\n\t\ttransform 360ms cubic-bezier(0.34, 1.3, 0.64, 1),\n\t\tbackground 200ms var(--ease-out-quint),\n\t\tbox-shadow 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_chrome_toggle][aria-pressed=\"true\"] > [raggu_web_front_chrome_toggle_pane] {\n\topacity: 1;\n\ttransform: none;\n}\n");
})($ || ($ = {}));
//raggu/web/front/chrome/toggle/-css/toggle.view.css.ts
;
	($.$raggu_web_front_chrome) = class $raggu_web_front_chrome extends ($.$mol_view) {
		scrolled(){
			return false;
		}
		corpus_page(){
			return false;
		}
		Brand_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		home_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_home_label"));
		}
		Mark(){
			const obj = new this.$.$raggu_web_front_mark();
			return obj;
		}
		Word(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => (["RAGU"]);
			return obj;
		}
		Word_sub(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => (["graph rag"]);
			return obj;
		}
		Wordmark(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Word()), (this.Word_sub())]);
			return obj;
		}
		Home_link(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.arg) = () => ({"corpus": null});
			(obj.hint) = () => ((this.home_label()));
			(obj.sub) = () => ([(this.Mark()), (this.Wordmark())]);
			return obj;
		}
		Switcher_rule(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		corpus(){
			return "";
		}
		Switcher(){
			const obj = new this.$.$raggu_web_front_chrome_switcher();
			(obj.corpus) = () => ((this.corpus()));
			return obj;
		}
		Switcher_box(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Switcher_rule()), (this.Switcher())]);
			return obj;
		}
		Brand(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Brand_glass()), 
				(this.Home_link()), 
				(this.Switcher_box())
			]);
			return obj;
		}
		Tools(){
			const obj = new this.$.$raggu_web_front_chrome_tools();
			(obj.viewer) = () => ((this.viewer()));
			return obj;
		}
		Controls_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		Theme_menu(){
			const obj = new this.$.$raggu_web_front_chrome_theme();
			(obj.choice) = (next) => ((this.theme_choice(next)));
			(obj.resolved) = () => ((this.theme_resolved()));
			return obj;
		}
		Lang_menu(){
			const obj = new this.$.$raggu_web_front_chrome_lang();
			return obj;
		}
		Controls_rule(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		settings_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_settings_label"));
		}
		open_settings(next){
			if(next !== undefined) return next;
			return null;
		}
		Settings_icon(){
			const obj = new this.$.$raggu_web_front_icon_sliders();
			return obj;
		}
		Settings_open(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.settings_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.settings_label())});
			(obj.click) = (next) => ((this.open_settings(next)));
			(obj.sub) = () => ([(this.Settings_icon())]);
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Controls_glass()), 
				(this.Theme_menu()), 
				(this.Lang_menu()), 
				(this.Controls_rule()), 
				(this.Settings_open())
			]);
			return obj;
		}
		right(){
			return [(this.Tools()), (this.Controls())];
		}
		Right(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.right()));
			return obj;
		}
		centre_kind(){
			return "home";
		}
		Centre_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		home_active(){
			return "";
		}
		home_inert(){
			return "";
		}
		to_pipeline(next){
			if(next !== undefined) return next;
			return null;
		}
		pipeline_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_pipeline_label"));
		}
		Link_pipeline(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.to_pipeline(next)));
			(obj.sub) = () => ([(this.pipeline_label())]);
			return obj;
		}
		to_corpora(next){
			if(next !== undefined) return next;
			return null;
		}
		corpora_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_corpora_label"));
		}
		Link_corpora(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.to_corpora(next)));
			(obj.sub) = () => ([(this.corpora_label())]);
			return obj;
		}
		Pane_home(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"data-active": (this.home_active()), 
				"inert": (this.home_inert())
			});
			(obj.sub) = () => ([(this.Link_pipeline()), (this.Link_corpora())]);
			return obj;
		}
		corpus_active(){
			return "";
		}
		corpus_inert(){
			return "";
		}
		graph_active(){
			return false;
		}
		toggle_graph(next){
			if(next !== undefined) return next;
			return null;
		}
		Graph_icon(){
			const obj = new this.$.$raggu_web_front_icon_graph();
			return obj;
		}
		graph_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_graph_label"));
		}
		Toggle_graph(){
			const obj = new this.$.$raggu_web_front_chrome_toggle();
			(obj.active) = () => ((this.graph_active()));
			(obj.click) = (next) => ((this.toggle_graph(next)));
			(obj.Icon) = () => ((this.Graph_icon()));
			(obj.label) = () => ((this.graph_label()));
			return obj;
		}
		chat_active(){
			return false;
		}
		toggle_chat(next){
			if(next !== undefined) return next;
			return null;
		}
		Chat_icon(){
			const obj = new this.$.$raggu_web_front_icon_chat();
			return obj;
		}
		chat_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_chat_label"));
		}
		Toggle_chat(){
			const obj = new this.$.$raggu_web_front_chrome_toggle();
			(obj.active) = () => ((this.chat_active()));
			(obj.click) = (next) => ((this.toggle_chat(next)));
			(obj.Icon) = () => ((this.Chat_icon()));
			(obj.label) = () => ((this.chat_label()));
			return obj;
		}
		Pane_corpus(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"data-active": (this.corpus_active()), 
				"inert": (this.corpus_inert())
			});
			(obj.sub) = () => ([(this.Toggle_graph()), (this.Toggle_chat())]);
			return obj;
		}
		Centre(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "raggu_web_front_chrome_centre_kind": (this.centre_kind())});
			(obj.sub) = () => ([
				(this.Centre_glass()), 
				(this.Pane_home()), 
				(this.Pane_corpus())
			]);
			return obj;
		}
		Centre_box(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Centre())]);
			return obj;
		}
		Row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Brand()), 
				(this.Right()), 
				(this.Centre_box())
			]);
			return obj;
		}
		dom_name(){
			return "header";
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		theme_choice(next){
			if(next !== undefined) return next;
			return "system";
		}
		theme_resolved(){
			return "light";
		}
		attr(){
			return {
				...(super.attr()), 
				"raggu_web_front_chrome_scrolled": (this.scrolled()), 
				"raggu_web_front_chrome_corpus": (this.corpus_page())
			};
		}
		sub(){
			return [(this.Row())];
		}
	};
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Brand_glass"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Mark"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Word"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Word_sub"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Wordmark"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Home_link"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Switcher_rule"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Switcher"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Switcher_box"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Brand"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Tools"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Controls_glass"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Theme_menu"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Lang_menu"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Controls_rule"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "open_settings"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Settings_icon"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Settings_open"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Controls"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Right"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Centre_glass"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "to_pipeline"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Link_pipeline"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "to_corpora"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Link_corpora"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Pane_home"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "toggle_graph"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Graph_icon"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Toggle_graph"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "toggle_chat"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Chat_icon"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Toggle_chat"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Pane_corpus"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Centre"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Centre_box"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "Row"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_chrome.prototype), "theme_choice"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_chrome extends $.$raggu_web_front_chrome {
            corpus() {
                return this.viewer().corpus();
            }
            corpus_page() {
                return !!this.corpus();
            }
            scrolled(next) {
                return next ?? false;
            }
            scroll_watch() {
                const update = () => this.scrolled(window.scrollY > 12);
                update();
                window.addEventListener('scroll', update, { passive: true });
                return { destructor: () => window.removeEventListener('scroll', update) };
            }
            right() {
                return this.corpus_page() ? [this.Tools(), this.Controls()] : [this.Controls()];
            }
            centre_kind() {
                return this.corpus_page() ? 'corpus' : 'home';
            }
            home_active() {
                return this.corpus_page() ? null : '';
            }
            home_inert() {
                return this.corpus_page() ? '' : null;
            }
            corpus_active() {
                return this.corpus_page() ? '' : null;
            }
            corpus_inert() {
                return this.corpus_page() ? null : '';
            }
            graph_active() {
                return this.corpus_page() && this.viewer().graph_open();
            }
            chat_active() {
                return this.corpus_page() && this.viewer().chat_open();
            }
            toggle_graph() {
                this.viewer().toggle_graph();
            }
            toggle_chat() {
                this.viewer().toggle_chat();
            }
            scroll_to(id) {
                this.$.$mol_dom_context.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            to_pipeline() {
                this.scroll_to('pipeline');
            }
            to_corpora() {
                this.scroll_to('corpora');
            }
            height_publish() {
                const node = this.dom_node();
                const publish = () => {
                    const height = Math.round(node.getBoundingClientRect().height);
                    document.documentElement.style.setProperty('--chrome-h', `${height}px`);
                };
                publish();
                const observer = new ResizeObserver(publish);
                observer.observe(node);
                return { destructor: () => observer.disconnect() };
            }
            auto() {
                this.scroll_watch();
                this.height_publish();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome.prototype, "scrolled", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome.prototype, "scroll_watch", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_chrome.prototype, "height_publish", null);
        $$.$raggu_web_front_chrome = $raggu_web_front_chrome;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/chrome/chrome.view.ts
;
	($.$raggu_web_front_chrome_menu) = class $raggu_web_front_chrome_menu extends ($.$raggu_web_front_pop) {
		Trigger_icon(){
			const obj = new this.$.$raggu_web_front_icon();
			return obj;
		}
		heading(){
			return "";
		}
		Heading(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.heading()));
			return obj;
		}
		items(){
			return [];
		}
		Items(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.items()));
			return obj;
		}
		align(){
			return "end";
		}
		bubble_width(){
			return "11rem";
		}
		trigger_content(){
			return [(this.Trigger_icon())];
		}
		bubble_content(){
			return [(this.Heading()), (this.Items())];
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_menu.prototype), "Trigger_icon"));
	($mol_mem(($.$raggu_web_front_chrome_menu.prototype), "Heading"));
	($mol_mem(($.$raggu_web_front_chrome_menu.prototype), "Items"));
	($.$raggu_web_front_chrome_menu_item) = class $raggu_web_front_chrome_menu_item extends ($.$mol_button) {
		lead(){
			return [];
		}
		Lead(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ((this.lead()));
			return obj;
		}
		name(){
			return "";
		}
		Name(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.name())]);
			return obj;
		}
		Dot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		checked(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"role": "menuitemradio", 
				"aria-checked": (this.checked())
			};
		}
		sub(){
			return [
				(this.Lead()), 
				(this.Name()), 
				(this.Dot())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_menu_item.prototype), "Lead"));
	($mol_mem(($.$raggu_web_front_chrome_menu_item.prototype), "Name"));
	($mol_mem(($.$raggu_web_front_chrome_menu_item.prototype), "Dot"));
	($.$raggu_web_front_chrome_theme) = class $raggu_web_front_chrome_theme extends ($.$raggu_web_front_chrome_menu) {
		theme_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_theme_theme_label"));
		}
		Current_icon(){
			const obj = new this.$.$raggu_web_front_icon();
			return obj;
		}
		light_checked(){
			return false;
		}
		pick_light(next){
			if(next !== undefined) return next;
			return null;
		}
		Light_icon(){
			const obj = new this.$.$raggu_web_front_icon_sun();
			return obj;
		}
		light_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_theme_light_label"));
		}
		Light(){
			const obj = new this.$.$raggu_web_front_chrome_menu_item();
			(obj.checked) = () => ((this.light_checked()));
			(obj.click) = (next) => ((this.pick_light(next)));
			(obj.lead) = () => ([(this.Light_icon())]);
			(obj.name) = () => ((this.light_label()));
			return obj;
		}
		dark_checked(){
			return false;
		}
		pick_dark(next){
			if(next !== undefined) return next;
			return null;
		}
		Dark_icon(){
			const obj = new this.$.$raggu_web_front_icon_moon();
			return obj;
		}
		dark_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_theme_dark_label"));
		}
		Dark(){
			const obj = new this.$.$raggu_web_front_chrome_menu_item();
			(obj.checked) = () => ((this.dark_checked()));
			(obj.click) = (next) => ((this.pick_dark(next)));
			(obj.lead) = () => ([(this.Dark_icon())]);
			(obj.name) = () => ((this.dark_label()));
			return obj;
		}
		system_checked(){
			return false;
		}
		pick_system(next){
			if(next !== undefined) return next;
			return null;
		}
		System_icon(){
			const obj = new this.$.$raggu_web_front_icon_display();
			return obj;
		}
		system_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_theme_system_label"));
		}
		System(){
			const obj = new this.$.$raggu_web_front_chrome_menu_item();
			(obj.checked) = () => ((this.system_checked()));
			(obj.click) = (next) => ((this.pick_system(next)));
			(obj.lead) = () => ([(this.System_icon())]);
			(obj.name) = () => ((this.system_label()));
			return obj;
		}
		choice(next){
			if(next !== undefined) return next;
			return "system";
		}
		resolved(){
			return "light";
		}
		hint(){
			return (this.theme_label());
		}
		heading(){
			return (this.theme_label());
		}
		Trigger_icon(){
			return (this.Current_icon());
		}
		items(){
			return [
				(this.Light()), 
				(this.Dark()), 
				(this.System())
			];
		}
		Sun_icon(){
			const obj = new this.$.$raggu_web_front_icon_sun();
			return obj;
		}
		Moon_icon(){
			const obj = new this.$.$raggu_web_front_icon_moon();
			return obj;
		}
		Display_icon(){
			const obj = new this.$.$raggu_web_front_icon_display();
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Current_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "pick_light"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Light_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Light"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "pick_dark"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Dark_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Dark"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "pick_system"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "System_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "System"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "choice"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Sun_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Moon_icon"));
	($mol_mem(($.$raggu_web_front_chrome_theme.prototype), "Display_icon"));
	($.$raggu_web_front_chrome_lang) = class $raggu_web_front_chrome_lang extends ($.$raggu_web_front_chrome_menu) {
		lang_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_chrome_lang_lang_label"));
		}
		Globe_icon(){
			const obj = new this.$.$raggu_web_front_icon_globe();
			return obj;
		}
		en_checked(){
			return false;
		}
		pick_en(next){
			if(next !== undefined) return next;
			return null;
		}
		En(){
			const obj = new this.$.$raggu_web_front_chrome_menu_item();
			(obj.checked) = () => ((this.en_checked()));
			(obj.click) = (next) => ((this.pick_en(next)));
			(obj.lead) = () => (["EN"]);
			(obj.name) = () => ("English");
			return obj;
		}
		ru_checked(){
			return false;
		}
		pick_ru(next){
			if(next !== undefined) return next;
			return null;
		}
		Ru(){
			const obj = new this.$.$raggu_web_front_chrome_menu_item();
			(obj.checked) = () => ((this.ru_checked()));
			(obj.click) = (next) => ((this.pick_ru(next)));
			(obj.lead) = () => (["RU"]);
			(obj.name) = () => ("Русский");
			return obj;
		}
		hint(){
			return (this.lang_label());
		}
		heading(){
			return (this.lang_label());
		}
		Trigger_icon(){
			return (this.Globe_icon());
		}
		items(){
			return [(this.En()), (this.Ru())];
		}
	};
	($mol_mem(($.$raggu_web_front_chrome_lang.prototype), "Globe_icon"));
	($mol_mem(($.$raggu_web_front_chrome_lang.prototype), "pick_en"));
	($mol_mem(($.$raggu_web_front_chrome_lang.prototype), "En"));
	($mol_mem(($.$raggu_web_front_chrome_lang.prototype), "pick_ru"));
	($mol_mem(($.$raggu_web_front_chrome_lang.prototype), "Ru"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_chrome_theme extends $.$raggu_web_front_chrome_theme {
            Current_icon() {
                if (this.choice() === 'system')
                    return this.Display_icon();
                return this.resolved() === 'dark' ? this.Moon_icon() : this.Sun_icon();
            }
            light_checked() { return this.choice() === 'light'; }
            dark_checked() { return this.choice() === 'dark'; }
            system_checked() { return this.choice() === 'system'; }
            pick(next) {
                this.choice(next);
                this.close();
            }
            pick_light() { this.pick('light'); }
            pick_dark() { this.pick('dark'); }
            pick_system() { this.pick('system'); }
        }
        $$.$raggu_web_front_chrome_theme = $raggu_web_front_chrome_theme;
        class $raggu_web_front_chrome_lang extends $.$raggu_web_front_chrome_lang {
            en_checked() { return $raggu_web_front_lib_lang() === 'en'; }
            ru_checked() { return $raggu_web_front_lib_lang() === 'ru'; }
            pick(next) {
                this.$.$mol_locale.lang(next);
                this.close();
            }
            pick_en() { this.pick('en'); }
            pick_ru() { this.pick('ru'); }
        }
        $$.$raggu_web_front_chrome_lang = $raggu_web_front_chrome_lang;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/chrome/menu/menu.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chrome/menu/menu.view.css", "[raggu_web_front_chrome_menu_trigger] {\n\tdisplay: flex;\n\twidth: 2.5rem;\n\theight: 2.5rem;\n\talign-items: center;\n\tjustify-content: center;\n\talign-self: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_menu_trigger]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_menu_trigger][raggu_web_front_pop_open=\"true\"] {\n\tbackground: var(--accent-wash);\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_menu_bubble] {\n\tborder-radius: var(--radius-panel);\n}\n\n[raggu_web_front_chrome_menu_heading] {\n\tpadding: 0.375rem 0.625rem 0.5rem;\n}\n\n[raggu_web_front_chrome_menu_items] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_chrome_menu_item] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.625rem;\n\tborder-radius: var(--radius-control);\n\tpadding: 0.5rem 0.625rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n\toutline: none;\n\tcursor: default;\n\ttransition: color 150ms ease, background-color 150ms ease;\n}\n\n[raggu_web_front_chrome_menu_item]:hover,\n[raggu_web_front_chrome_menu_item]:focus-visible {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n\toutline: none;\n}\n\n[raggu_web_front_chrome_menu_item_lead] {\n\tdisplay: flex;\n\tcolor: var(--text-3);\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n}\n\n[raggu_web_front_chrome_menu_item_name] {\n\tflex: 1;\n}\n\n[raggu_web_front_chrome_menu_item_dot] {\n\tdisplay: none;\n\twidth: 0.375rem;\n\theight: 0.375rem;\n\tborder-radius: 9999px;\n\tbackground: var(--accent);\n}\n\n[raggu_web_front_chrome_menu_item][aria-checked=\"true\"] > [raggu_web_front_chrome_menu_item_dot] {\n\tdisplay: block;\n}\n");
})($ || ($ = {}));
//raggu/web/front/chrome/menu/-css/menu.view.css.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/chrome/chrome.view.css", "[raggu_web_front_chrome] {\n\tpointer-events: none;\n\tposition: sticky;\n\ttop: 0;\n\tz-index: 30;\n\tdisplay: block;\n\tpadding-top: 1rem;\n\ttransition: padding-top 500ms var(--ease-out-quint);\n}\n\n[raggu_web_front_chrome][raggu_web_front_chrome_scrolled] {\n\tpadding-top: 0.625rem;\n}\n\n[raggu_web_front_chrome][raggu_web_front_chrome_corpus] {\n\tpadding-right: var(--scrollbar-w, 0px);\n}\n\n[raggu_web_front_chrome_row] {\n\tposition: relative;\n\tmargin: 0 auto;\n\tdisplay: flex;\n\twidth: 100%;\n\tmax-width: 1680px;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\tgap: 0.5rem;\n\tpadding: 0 0.75rem;\n}\n\n[raggu_web_front_chrome_brand],\n[raggu_web_front_chrome_controls],\n[raggu_web_front_chrome_centre] {\n\tpointer-events: auto;\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tmin-height: var(--island-h);\n\talign-items: stretch;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.25rem;\n}\n\n[raggu_web_front_chrome_brand] {\n\tmin-width: 0;\n}\n\n[raggu_web_front_chrome_home_link] {\n\tdisplay: flex;\n\tflex-shrink: 0;\n\talign-items: center;\n\tgap: 0.625rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0 0.5rem;\n\ttransition: background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_home_link]:hover {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_chrome_wordmark] {\n\tdisplay: block;\n\tpadding-right: 0.25rem;\n}\n\n[raggu_web_front_chrome_word] {\n\tdisplay: block;\n\tfont-family: var(--font-display);\n\tfont-size: 1.05rem;\n\tline-height: 1;\n\tfont-weight: 500;\n\tletter-spacing: -0.01em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_word_sub] {\n\tdisplay: none;\n\tmargin-top: 0.25rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 9.5px;\n\tline-height: 1;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_chrome_switcher_box] {\n\tdisplay: flex;\n\talign-items: center;\n\toverflow: hidden;\n\twidth: 0;\n\topacity: 0;\n\ttransition:\n\t\twidth 520ms cubic-bezier(0.34, 1.12, 0.64, 1),\n\t\topacity 300ms var(--ease-out-quint);\n}\n\n[raggu_web_front_chrome_corpus] [raggu_web_front_chrome_switcher_box] {\n\twidth: auto;\n\topacity: 1;\n}\n\n[raggu_web_front_chrome_switcher_rule] {\n\tmargin: 0 0.375rem;\n\theight: 2rem;\n\twidth: 1px;\n\tflex-shrink: 0;\n\talign-self: center;\n\tbackground: var(--edge);\n}\n\n[raggu_web_front_chrome_right] {\n\tmargin-left: auto;\n\tdisplay: flex;\n\talign-items: flex-start;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_chrome_controls] {\n\tgap: 0.25rem;\n}\n\n[raggu_web_front_chrome_controls_rule] {\n\tmargin: 0.5rem 0;\n\twidth: 1px;\n\tflex-shrink: 0;\n\tbackground: var(--edge);\n}\n\n[raggu_web_front_chrome_settings_open],\n[raggu_web_front_chrome_menu_trigger] {\n\tdisplay: flex;\n\twidth: 2.5rem;\n\theight: 2.5rem;\n\talign-items: center;\n\tjustify-content: center;\n\talign-self: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_settings_open]:hover,\n[raggu_web_front_chrome_menu_trigger]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_chrome_menu_trigger][raggu_web_front_pop_open=\"true\"] {\n\tbackground: var(--accent-wash);\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_chrome_centre_box] {\n\torder: 9999;\n\tmargin-top: 0.5rem;\n\tdisplay: flex;\n\twidth: 100%;\n\tjustify-content: center;\n}\n\n[raggu_web_front_chrome_centre][raggu_web_front_chrome_centre_kind=\"home\"] {\n\tdisplay: none;\n}\n\n[raggu_web_front_chrome_pane_home],\n[raggu_web_front_chrome_pane_corpus] {\n\tdisplay: flex;\n\tflex-shrink: 0;\n\talign-items: stretch;\n\tgap: 0.25rem;\n\twhite-space: nowrap;\n\twidth: 0;\n\topacity: 0;\n\toverflow: clip;\n\tpadding: 24px 8px;\n\tmargin: -24px -8px;\n\tpointer-events: none;\n\ttransition:\n\t\twidth 440ms var(--ease-out-quint),\n\t\topacity 160ms linear;\n}\n\n[raggu_web_front_chrome_pane_home] > *,\n[raggu_web_front_chrome_pane_corpus] > * {\n\tpointer-events: auto;\n}\n\n[raggu_web_front_chrome_pane_home][data-active],\n[raggu_web_front_chrome_pane_corpus][data-active] {\n\twidth: auto;\n\topacity: 1;\n\ttransition:\n\t\twidth 440ms var(--ease-out-quint),\n\t\topacity 240ms linear 140ms;\n}\n\n[raggu_web_front_chrome_link_pipeline],\n[raggu_web_front_chrome_link_corpora] {\n\tdisplay: flex;\n\talign-items: center;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0 1rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_chrome_link_pipeline]:hover,\n[raggu_web_front_chrome_link_corpora]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n@media (min-width: 640px) {\n\n\t[raggu_web_front_chrome_row] {\n\t\tgap: 0.75rem;\n\t\tpadding: 0 1.25rem;\n\t}\n\n\t[raggu_web_front_chrome_right] {\n\t\tgap: 0.75rem;\n\t}\n\n\t[raggu_web_front_chrome_word_sub] {\n\t\tdisplay: block;\n\t}\n\n}\n\n@media (max-width: 639.98px) {\n\n\t[raggu_web_front_chrome_corpus] [raggu_web_front_chrome_wordmark] {\n\t\tdisplay: none;\n\t}\n\n}\n\n@media (min-width: 768px) {\n\n\t[raggu_web_front_chrome_centre][raggu_web_front_chrome_centre_kind=\"home\"] {\n\t\tdisplay: flex;\n\t}\n\n}\n\n@media (min-width: 1024px) {\n\n\t[raggu_web_front_chrome_centre_box] {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 50%;\n\t\torder: 0;\n\t\tmargin-top: 0;\n\t\twidth: auto;\n\t\ttransform: translateX(-50%);\n\t}\n\n}\n");
})($ || ($ = {}));
//raggu/web/front/chrome/-css/chrome.view.css.ts
;
	($.$raggu_web_front_settings) = class $raggu_web_front_settings extends ($.$mol_view) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.close(next))});
			return obj;
		}
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			(obj.solid) = () => (true);
			return obj;
		}
		title_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_title_label"));
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h2");
			(obj.sub) = () => ([(this.title_label())]);
			return obj;
		}
		subtitle_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_subtitle_label"));
		}
		Subtitle(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.subtitle_label()));
			return obj;
		}
		Head_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Title()), (this.Subtitle())]);
			return obj;
		}
		close_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_close_label"));
		}
		Close_glyph(){
			const obj = new this.$.$raggu_web_front_icon_close();
			return obj;
		}
		Close_icon(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.close_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.close_label())});
			(obj.click) = (next) => ((this.close(next)));
			(obj.sub) = () => ([(this.Close_glyph())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Head_text()), (this.Close_icon())]);
			return obj;
		}
		group_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_group_label"));
		}
		Group_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.group_label()));
			return obj;
		}
		group_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_group_hint"));
		}
		Group_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.group_hint()));
			return obj;
		}
		Group(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Group_label()), (this.Group_hint())]);
			return obj;
		}
		use_graph_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_use_graph_label"));
		}
		use_graph_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_use_graph_hint"));
		}
		use_graph(next){
			if(next !== undefined) return next;
			return false;
		}
		on_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_on_label"));
		}
		off_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_off_label"));
		}
		Use_graph(){
			const obj = new this.$.$raggu_web_front_settings_toggle();
			(obj.label) = () => ((this.use_graph_label()));
			(obj.hint) = () => ((this.use_graph_hint()));
			(obj.checked) = (next) => ((this.use_graph(next)));
			(obj.on_label) = () => ((this.on_label()));
			(obj.off_label) = () => ((this.off_label()));
			return obj;
		}
		query_plan_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_query_plan_label"));
		}
		query_plan_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_query_plan_hint"));
		}
		query_plan(next){
			if(next !== undefined) return next;
			return false;
		}
		Query_plan(){
			const obj = new this.$.$raggu_web_front_settings_toggle();
			(obj.label) = () => ((this.query_plan_label()));
			(obj.hint) = () => ((this.query_plan_hint()));
			(obj.checked) = (next) => ((this.query_plan(next)));
			(obj.on_label) = () => ((this.on_label()));
			(obj.off_label) = () => ((this.off_label()));
			return obj;
		}
		rerank_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_rerank_label"));
		}
		rerank_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_rerank_hint"));
		}
		rerank(next){
			if(next !== undefined) return next;
			return false;
		}
		Rerank(){
			const obj = new this.$.$raggu_web_front_settings_toggle();
			(obj.label) = () => ((this.rerank_label()));
			(obj.hint) = () => ((this.rerank_hint()));
			(obj.checked) = (next) => ((this.rerank(next)));
			(obj.on_label) = () => ((this.on_label()));
			(obj.off_label) = () => ((this.off_label()));
			return obj;
		}
		top_k_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_top_k_label"));
		}
		Top_k_label(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.top_k_label()));
			return obj;
		}
		top_k_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_top_k_hint"));
		}
		Top_k_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.top_k_hint()));
			return obj;
		}
		Top_k_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Top_k_label()), (this.Top_k_hint())]);
			return obj;
		}
		top_k_less_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_top_k_less_label"));
		}
		top_k_less_enabled(){
			return true;
		}
		top_k_less(next){
			if(next !== undefined) return next;
			return null;
		}
		Top_k_less(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.top_k_less_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.top_k_less_label())});
			(obj.enabled) = () => ((this.top_k_less_enabled()));
			(obj.click) = (next) => ((this.top_k_less(next)));
			(obj.sub) = () => (["−"]);
			return obj;
		}
		top_k_draft(next){
			if(next !== undefined) return next;
			return "8";
		}
		top_k_input(next){
			if(next !== undefined) return next;
			return null;
		}
		top_k_commit(next){
			if(next !== undefined) return next;
			return null;
		}
		top_k_key(next){
			if(next !== undefined) return next;
			return null;
		}
		Top_k_input(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("input");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"aria-label": (this.top_k_label()), 
				"inputmode": "numeric"
			});
			(obj.field) = () => ({...(this.$.$mol_view.prototype.field.call(obj)), "value": (this.top_k_draft())});
			(obj.event) = () => ({
				"input": (next) => (this.top_k_input(next)), 
				"change": (next) => (this.top_k_commit(next)), 
				"blur": (next) => (this.top_k_commit(next)), 
				"keydown": (next) => (this.top_k_key(next))
			});
			return obj;
		}
		top_k_more_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_top_k_more_label"));
		}
		top_k_more_enabled(){
			return true;
		}
		top_k_more(next){
			if(next !== undefined) return next;
			return null;
		}
		Top_k_more(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.top_k_more_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.top_k_more_label())});
			(obj.enabled) = () => ((this.top_k_more_enabled()));
			(obj.click) = (next) => ((this.top_k_more(next)));
			(obj.sub) = () => (["+"]);
			return obj;
		}
		Top_k_field(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Top_k_less()), 
				(this.Top_k_input()), 
				(this.Top_k_more())
			]);
			return obj;
		}
		Top_k(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Top_k_text()), (this.Top_k_field())]);
			return obj;
		}
		limit_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_limit_label"));
		}
		Limit_label(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.limit_label()));
			return obj;
		}
		limit_value(){
			return "600";
		}
		Limit_value(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.limit_value())]);
			return obj;
		}
		Limit_head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Limit_label()), (this.Limit_value())]);
			return obj;
		}
		limit_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_limit_hint"));
		}
		Limit_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.limit_hint()));
			return obj;
		}
		steps(){
			return [];
		}
		Steps(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.steps()));
			return obj;
		}
		api_cap(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_api_cap"));
		}
		Limit_note(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.api_cap()));
			return obj;
		}
		Limit(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Limit_head()), 
				(this.Limit_hint()), 
				(this.Steps()), 
				(this.Limit_note())
			]);
			return obj;
		}
		Rows(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Use_graph()), 
				(this.Query_plan()), 
				(this.Rerank()), 
				(this.Top_k()), 
				(this.Limit())
			]);
			return obj;
		}
		Divider(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		reset_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_settings_reset_label"));
		}
		Reset(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.reset(next)));
			(obj.sub) = () => ([(this.reset_label())]);
			return obj;
		}
		Done(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.close(next)));
			(obj.sub) = () => ([(this.close_label())]);
			return obj;
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Reset()), (this.Done())]);
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Head()), 
				(this.Group()), 
				(this.Rows()), 
				(this.Divider()), 
				(this.Foot())
			]);
			return obj;
		}
		Popup(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"role": "dialog", 
				"aria-modal": "true"
			});
			(obj.sub) = () => ([(this.Glass()), (this.Body())]);
			return obj;
		}
		step_active(id){
			return false;
		}
		step_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		step_pane_class(id){
			return "";
		}
		Step_pane(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"class": (this.step_pane_class(id)), 
				"aria-hidden": "true"
			});
			return obj;
		}
		step_text(id){
			return "";
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_settings_showed": (this.showed())};
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		sub(){
			return [(this.Backdrop()), (this.Popup())];
		}
		Step(id){
			const obj = new this.$.$mol_button();
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "raggu_web_front_settings_step_active": (this.step_active(id))});
			(obj.click) = (next) => ((this.step_pick(id, next)));
			(obj.sub) = () => ([(this.Step_pane(id)), (this.step_text(id))]);
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_settings.prototype), "keydown"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "close"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Backdrop"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Subtitle"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Head_text"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Close_glyph"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Close_icon"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Group_label"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Group_hint"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Group"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "use_graph"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Use_graph"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "query_plan"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Query_plan"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "rerank"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Rerank"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_label"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_hint"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_text"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_less"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_less"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_draft"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_input"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_commit"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_key"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_input"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "top_k_more"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_more"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k_field"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Top_k"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit_label"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit_value"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit_head"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit_hint"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Steps"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit_note"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Limit"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Rows"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Divider"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "reset"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Reset"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Done"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Foot"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "Popup"));
	($mol_mem_key(($.$raggu_web_front_settings.prototype), "step_pick"));
	($mol_mem_key(($.$raggu_web_front_settings.prototype), "Step_pane"));
	($mol_mem(($.$raggu_web_front_settings.prototype), "showed"));
	($mol_mem_key(($.$raggu_web_front_settings.prototype), "Step"));
	($.$raggu_web_front_settings_toggle) = class $raggu_web_front_settings_toggle extends ($.$mol_view) {
		Label(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.label()));
			return obj;
		}
		Hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.hint()));
			return obj;
		}
		Text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Label()), (this.Hint())]);
			return obj;
		}
		state_text(){
			return "";
		}
		State(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.state_text()));
			return obj;
		}
		flip(next){
			if(next !== undefined) return next;
			return null;
		}
		Thumb(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		Switch(){
			const obj = new this.$.$mol_button();
			(obj.attr) = () => ({
				...(this.$.$mol_button.prototype.attr.call(obj)), 
				"role": "switch", 
				"aria-checked": (this.checked()), 
				"aria-label": (this.label())
			});
			(obj.click) = (next) => ((this.flip(next)));
			(obj.sub) = () => ([(this.Thumb())]);
			return obj;
		}
		Control(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.State()), (this.Switch())]);
			return obj;
		}
		label(){
			return "";
		}
		hint(){
			return "";
		}
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		on_label(){
			return "On";
		}
		off_label(){
			return "Off";
		}
		sub(){
			return [(this.Text()), (this.Control())];
		}
	};
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Label"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Hint"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Text"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "State"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "flip"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Thumb"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Switch"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "Control"));
	($mol_mem(($.$raggu_web_front_settings_toggle.prototype), "checked"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_settings extends $.$raggu_web_front_settings {
            settings() {
                return $raggu_web_front_lib_settings.value();
            }
            use_graph(next) {
                if (next !== undefined)
                    $raggu_web_front_lib_settings.patch({ useGraph: next });
                return this.settings().useGraph;
            }
            query_plan(next) {
                if (next !== undefined)
                    $raggu_web_front_lib_settings.patch({ queryPlan: next });
                return this.settings().queryPlan;
            }
            rerank(next) {
                if (next !== undefined)
                    $raggu_web_front_lib_settings.patch({ rerank: next });
                return this.settings().rerank;
            }
            top_k_draft(next) {
                return next ?? String(this.settings().topK);
            }
            top_k_input(event) {
                this.top_k_draft(event.target.value);
            }
            top_k_commit() {
                const parsed = Number(this.top_k_draft().trim());
                if (!this.top_k_draft().trim() || !Number.isFinite(parsed)) {
                    this.top_k_draft(String(this.settings().topK));
                    return;
                }
                const committed = $raggu_web_front_lib_clamp(Math.round(parsed), $raggu_web_front_lib_top_k_min, $raggu_web_front_lib_top_k_max);
                $raggu_web_front_lib_settings.patch({ topK: committed });
                this.top_k_draft(String(committed));
            }
            top_k_key(event) {
                if (event.key === 'Enter')
                    this.top_k_commit();
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    this.top_k_more();
                }
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    this.top_k_less();
                }
            }
            top_k_step(delta) {
                const committed = $raggu_web_front_lib_clamp(this.settings().topK + delta, $raggu_web_front_lib_top_k_min, $raggu_web_front_lib_top_k_max);
                $raggu_web_front_lib_settings.patch({ topK: committed });
                this.top_k_draft(String(committed));
            }
            top_k_less() {
                this.top_k_step(-1);
            }
            top_k_more() {
                this.top_k_step(1);
            }
            top_k_less_enabled() {
                return this.settings().topK > $raggu_web_front_lib_top_k_min;
            }
            top_k_more_enabled() {
                return this.settings().topK < $raggu_web_front_lib_top_k_max;
            }
            limit_value() {
                return String(this.settings().graphLimit);
            }
            steps() {
                return $raggu_web_front_lib_graph_limit_steps.map(step => this.Step(step));
            }
            step_text(step) {
                return String(step);
            }
            step_active(step) {
                return this.settings().graphLimit === step;
            }
            step_pane_class(step) {
                return this.step_active(step) ? 'accent-pane' : 'step-edge';
            }
            step_pick(step) {
                $raggu_web_front_lib_settings.patch({ graphLimit: step });
            }
            reset() {
                $raggu_web_front_lib_settings.reset();
                this.top_k_draft(String($raggu_web_front_lib_settings_default.topK));
            }
            close() {
                this.showed(false);
            }
            keydown(event) {
                if (event.key === 'Escape' && this.showed())
                    this.close();
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_settings.prototype, "top_k_draft", null);
        $$.$raggu_web_front_settings = $raggu_web_front_settings;
        class $raggu_web_front_settings_toggle extends $.$raggu_web_front_settings_toggle {
            state_text() {
                return this.checked() ? this.on_label() : this.off_label();
            }
            flip() {
                this.checked(!this.checked());
            }
        }
        $$.$raggu_web_front_settings_toggle = $raggu_web_front_settings_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/settings/settings.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/settings/settings.view.css", "[raggu_web_front_settings] {\n\tdisplay: contents;\n}\n\n[raggu_web_front_settings_backdrop] {\n\tposition: fixed;\n\tinset: 0;\n\tz-index: 40;\n\tdisplay: block;\n\tbackground: color-mix(in oklab, var(--bg-deep) 72%, transparent);\n\tbackdrop-filter: blur(3px);\n\t-webkit-backdrop-filter: blur(3px);\n\topacity: 0;\n\tvisibility: hidden;\n\ttransition: opacity 300ms ease, visibility 0s linear 300ms;\n}\n\n[raggu_web_front_settings_popup] {\n\tposition: fixed;\n\ttop: 50%;\n\tleft: 50%;\n\tz-index: 50;\n\tisolation: isolate;\n\tdisplay: flex;\n\tflex-direction: column;\n\twidth: min(38rem, calc(100vw - 2rem));\n\ttransform: translate(-50%, -50%);\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n\topacity: 0;\n\tvisibility: hidden;\n\ttransition: opacity 200ms var(--ease-out-quint), visibility 0s linear 200ms;\n}\n\n[raggu_web_front_settings_popup] > [raggu_web_front_glass] {\n\ttransform: scale(0.955);\n\topacity: 0;\n}\n\n[raggu_web_front_settings_showed] > [raggu_web_front_settings_backdrop] {\n\topacity: 1;\n\tvisibility: visible;\n\ttransition: opacity 300ms ease;\n}\n\n[raggu_web_front_settings_showed] > [raggu_web_front_settings_popup] {\n\topacity: 1;\n\tvisibility: visible;\n\ttransition: opacity 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_settings_showed] > [raggu_web_front_settings_popup] > [raggu_web_front_glass] {\n\ttransform: none;\n\topacity: 1;\n}\n\n[raggu_web_front_settings_body] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmax-height: min(46rem, calc(100dvh - 6rem));\n\toverflow-y: auto;\n\tpadding: 1rem 1.25rem;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_settings_head] {\n\tdisplay: flex;\n\talign-items: flex-start;\n\tjustify-content: space-between;\n\tgap: 1rem;\n}\n\n[raggu_web_front_settings_head_text] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_settings_title] {\n\tfont-family: var(--font-display);\n\tfont-size: 1.5rem;\n\tline-height: 1.25;\n\tfont-weight: 400;\n\tletter-spacing: -0.02em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_subtitle] {\n\tmargin-top: 0.5rem;\n}\n\n[raggu_web_front_settings_close_icon] {\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.5rem;\n\tcolor: var(--text-3);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_settings_close_icon]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_group] {\n\tmargin-top: 1.5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_settings_group_label] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_settings_group_hint] {\n\tmargin-top: 0.375rem;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_settings_rows] {\n\tmargin-top: 0.5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_settings_rows] > * + * {\n\tborder-top: 1px solid var(--edge);\n}\n\n[raggu_web_front_settings_toggle],\n[raggu_web_front_settings_top_k] {\n\tdisplay: grid;\n\tgrid-template-columns: 1fr auto;\n\talign-items: start;\n\tcolumn-gap: 1.5rem;\n\trow-gap: 0.5rem;\n\tpadding: 1rem 0;\n}\n\n[raggu_web_front_settings_toggle_text],\n[raggu_web_front_settings_top_k_text] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmin-width: 0;\n}\n\n[raggu_web_front_settings_toggle_label],\n[raggu_web_front_settings_top_k_label],\n[raggu_web_front_settings_limit_label] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_toggle_hint],\n[raggu_web_front_settings_top_k_hint],\n[raggu_web_front_settings_limit_hint] {\n\tmargin-top: 0.25rem;\n\tmax-width: 46ch;\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_settings_toggle_control] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.75rem;\n}\n\n[raggu_web_front_settings_toggle_state] {\n\tfont-variant-numeric: tabular-nums;\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_settings_toggle_switch] {\n\tposition: relative;\n\tdisplay: inline-flex;\n\theight: 1.5rem;\n\twidth: 2.75rem;\n\tflex-shrink: 0;\n\talign-items: center;\n\tborder-radius: 9999px;\n\tborder: 1px solid var(--edge-strong);\n\tbackground: var(--surface-sunk);\n\tpadding: 0 3px;\n\ttransition:\n\t\tbackground-color 250ms var(--ease-out-quint),\n\t\tborder-color 250ms var(--ease-out-quint),\n\t\tbox-shadow 250ms var(--ease-out-quint);\n}\n\n[raggu_web_front_settings_toggle_thumb] {\n\tdisplay: block;\n\twidth: 18px;\n\theight: 18px;\n\tborder-radius: 9999px;\n\tbackground: #ffffff;\n\tbox-shadow: var(--elev-thumb);\n\ttransition: transform 250ms var(--ease-out-quint);\n}\n\n[data-theme='dark'] [raggu_web_front_settings_toggle_thumb] {\n\tbackground: #dde4ee;\n}\n\n[raggu_web_front_settings_toggle_switch][aria-checked=\"true\"] {\n\tborder-color: transparent;\n\tbackground: var(--accent);\n\tbox-shadow: var(--accent-glow);\n}\n\n[raggu_web_front_settings_toggle_switch][aria-checked=\"true\"] > [raggu_web_front_settings_toggle_thumb] {\n\ttransform: translateX(18px);\n}\n\n[raggu_web_front_settings_toggle]:has([aria-checked=\"true\"]) [raggu_web_front_settings_toggle_state] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_settings_top_k_field] {\n\tdisplay: flex;\n\theight: 2.25rem;\n\toverflow: hidden;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge-strong);\n\tbackground: var(--surface-sunk);\n\ttransition: border-color 200ms ease;\n}\n\n[raggu_web_front_settings_top_k_field]:focus-within {\n\tborder-color: var(--accent);\n}\n\n[raggu_web_front_settings_top_k_less],\n[raggu_web_front_settings_top_k_more] {\n\tdisplay: flex;\n\twidth: 2.25rem;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 0;\n\tcolor: var(--text-3);\n\ttransition: color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_settings_top_k_less]:hover,\n[raggu_web_front_settings_top_k_more]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_top_k_less][disabled],\n[raggu_web_front_settings_top_k_more][disabled] {\n\tpointer-events: none;\n\topacity: 0.35;\n}\n\n[raggu_web_front_settings_top_k_input] {\n\twidth: 3.5rem;\n\tborder-left: 1px solid var(--edge);\n\tborder-right: 1px solid var(--edge);\n\tbackground: transparent;\n\ttext-align: center;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text);\n\toutline: none;\n}\n\n[raggu_web_front_settings_top_k_input]:focus-visible {\n\toutline: none;\n}\n\n[raggu_web_front_settings_limit] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 1rem 0;\n}\n\n[raggu_web_front_settings_limit_head] {\n\tdisplay: flex;\n\talign-items: baseline;\n\tjustify-content: space-between;\n\tgap: 1rem;\n}\n\n[raggu_web_front_settings_limit_value] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_settings_steps] {\n\tmargin-top: 0.75rem;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_settings_step] {\n\tposition: relative;\n\tisolation: isolate;\n\tborder-radius: var(--radius-chip);\n\tpadding: 0.375rem 0.75rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text-3);\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_settings_step]:hover {\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_step][raggu_web_front_settings_step_active] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_settings_step_pane].step-edge {\n\tposition: absolute;\n\tinset: 0;\n\tz-index: -1;\n\tborder-radius: inherit;\n\tborder: 1px solid var(--edge);\n}\n\n[raggu_web_front_settings_limit_note] {\n\tmargin-top: 0.75rem;\n\tfont-size: 11px;\n\tline-height: 1.625;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_settings_divider] {\n\tmargin-top: 0.5rem;\n\theight: 1px;\n\twidth: 100%;\n\tbackground: var(--edge);\n}\n\n[raggu_web_front_settings_foot] {\n\tmargin-top: 1rem;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tgap: 0.75rem;\n}\n\n[raggu_web_front_settings_reset],\n[raggu_web_front_settings_done] {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-control);\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\ttransition:\n\t\tbackground-color 200ms var(--ease-out-quint),\n\t\tcolor 200ms var(--ease-out-quint),\n\t\ttransform 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_settings_reset] {\n\tpadding: 0.5rem 0.75rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_settings_reset]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_settings_done] {\n\tpadding: 0.625rem 1rem;\n\tbackground: var(--accent);\n\tcolor: var(--accent-ink);\n\tbox-shadow: 0 10px 28px -14px var(--accent-line);\n}\n\n[raggu_web_front_settings_done]:hover {\n\tbackground: var(--accent-hover);\n}\n\n[raggu_web_front_settings_reset]:active,\n[raggu_web_front_settings_done]:active {\n\ttransform: translateY(1px);\n}\n");
})($ || ($ = {}));
//raggu/web/front/settings/-css/settings.view.css.ts
;
	($.$raggu_web_front_home) = class $raggu_web_front_home extends ($.$mol_view) {
		eyebrow(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_eyebrow"));
		}
		Eyebrow(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.eyebrow()));
			return obj;
		}
		title_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_title_text"));
		}
		title_accent(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_title_accent"));
		}
		Title_accent(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.title_accent())]);
			return obj;
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ([(this.title_text()), (this.Title_accent())]);
			return obj;
		}
		lede(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_lede"));
		}
		Lede(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.lede()));
			return obj;
		}
		cta_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_cta_label"));
		}
		Cta_arrow(){
			const obj = new this.$.$raggu_web_front_icon_arrow();
			return obj;
		}
		Cta(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.arg) = () => ({"corpus": "medical"});
			(obj.sub) = () => ([(this.cta_label()), (this.Cta_arrow())]);
			return obj;
		}
		to_pipeline(next){
			if(next !== undefined) return next;
			return null;
		}
		how_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_how_label"));
		}
		How(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.to_pipeline(next)));
			(obj.sub) = () => ([(this.how_label())]);
			return obj;
		}
		Actions(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Cta()), (this.How())]);
			return obj;
		}
		Hero_main(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Eyebrow()), 
				(this.Title()), 
				(this.Lede()), 
				(this.Actions())
			]);
			return obj;
		}
		Metrics_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		metrics_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_metrics_title"));
		}
		Metrics_title(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.metrics_title()));
			return obj;
		}
		corpora_count(){
			return "3 corpora";
		}
		Metrics_count(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.corpora_count()));
			return obj;
		}
		Metrics_head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Metrics_title()), (this.Metrics_count())]);
			return obj;
		}
		metric_nodes(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_metric_nodes"));
		}
		total_nodes(){
			return "";
		}
		pending(){
			return false;
		}
		Metric_nodes(){
			const obj = new this.$.$raggu_web_front_home_metric();
			(obj.label) = () => ((this.metric_nodes()));
			(obj.value) = () => ((this.total_nodes()));
			(obj.pending) = () => ((this.pending()));
			return obj;
		}
		metric_edges(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_metric_edges"));
		}
		total_edges(){
			return "";
		}
		Metric_edges(){
			const obj = new this.$.$raggu_web_front_home_metric();
			(obj.label) = () => ((this.metric_edges()));
			(obj.value) = () => ((this.total_edges()));
			(obj.pending) = () => ((this.pending()));
			return obj;
		}
		metric_communities(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_metric_communities"));
		}
		total_communities(){
			return "";
		}
		Metric_communities(){
			const obj = new this.$.$raggu_web_front_home_metric();
			(obj.label) = () => ((this.metric_communities()));
			(obj.value) = () => ((this.total_communities()));
			(obj.pending) = () => ((this.pending()));
			return obj;
		}
		metric_chunks(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_metric_chunks"));
		}
		total_chunks(){
			return "";
		}
		Metric_chunks(){
			const obj = new this.$.$raggu_web_front_home_metric();
			(obj.label) = () => ((this.metric_chunks()));
			(obj.value) = () => ((this.total_chunks()));
			(obj.pending) = () => ((this.pending()));
			return obj;
		}
		Metric_list(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dl");
			(obj.sub) = () => ([
				(this.Metric_nodes()), 
				(this.Metric_edges()), 
				(this.Metric_communities()), 
				(this.Metric_chunks())
			]);
			return obj;
		}
		badges(){
			return [];
		}
		Badges(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.badges()));
			return obj;
		}
		Metrics_body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Metrics_head()), 
				(this.Metric_list()), 
				(this.Badges())
			]);
			return obj;
		}
		Metrics(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("aside");
			(obj.sub) = () => ([(this.Metrics_glass()), (this.Metrics_body())]);
			return obj;
		}
		Hero(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("section");
			(obj.sub) = () => ([(this.Hero_main()), (this.Metrics())]);
			return obj;
		}
		pipeline_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_title"));
		}
		pipeline_lede(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_lede"));
		}
		Pipeline_head(){
			const obj = new this.$.$raggu_web_front_home_head();
			(obj.eyebrow) = () => ("pipeline");
			(obj.title) = () => ((this.pipeline_title()));
			(obj.lede) = () => ((this.pipeline_lede()));
			return obj;
		}
		steps(){
			return [];
		}
		Steps(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ol");
			(obj.sub) = () => ((this.steps()));
			return obj;
		}
		Pipeline(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("section");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "id": "pipeline"});
			(obj.sub) = () => ([(this.Pipeline_head()), (this.Steps())]);
			return obj;
		}
		corpora_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_corpora_title"));
		}
		corpora_lede(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_corpora_lede"));
		}
		Corpora_head(){
			const obj = new this.$.$raggu_web_front_home_head();
			(obj.eyebrow) = () => ("corpora");
			(obj.title) = () => ((this.corpora_title()));
			(obj.lede) = () => ((this.corpora_lede()));
			return obj;
		}
		corpora(){
			return [];
		}
		Corpora_body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.corpora()));
			return obj;
		}
		Corpora(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("section");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "id": "corpora"});
			(obj.sub) = () => ([(this.Corpora_head()), (this.Corpora_body())]);
			return obj;
		}
		Footer_name(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ("RAGU");
			return obj;
		}
		footer_blurb(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_footer_blurb"));
		}
		Footer_blurb(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.footer_blurb()));
			return obj;
		}
		Footer_about(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Footer_name()), (this.Footer_blurb())]);
			return obj;
		}
		footer_project(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_footer_project"));
		}
		Footer_project_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.footer_project()));
			return obj;
		}
		Footer_github(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("https://github.com/RaguTeam/RAGU");
			(obj.sub) = () => (["GitHub"]);
			return obj;
		}
		Footer_arxiv(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("https://arxiv.org/abs/2607.11683");
			(obj.sub) = () => (["arXiv 2607.11683"]);
			return obj;
		}
		Footer_pypi(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("https://pypi.org/project/graph-ragu/");
			(obj.sub) = () => (["graph_ragu on PyPI"]);
			return obj;
		}
		Footer_project_list(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ([
				(this.Footer_github()), 
				(this.Footer_arxiv()), 
				(this.Footer_pypi())
			]);
			return obj;
		}
		Footer_project(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("nav");
			(obj.sub) = () => ([(this.Footer_project_label()), (this.Footer_project_list())]);
			return obj;
		}
		footer_this(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_footer_this"));
		}
		Footer_this_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.footer_this()));
			return obj;
		}
		Footer_web(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("https://github.com/RaguTeam/web");
			(obj.sub) = () => ([(this.footer_this())]);
			return obj;
		}
		Footer_mol_icon(){
			const obj = new this.$.$raggu_web_front_icon_mol();
			return obj;
		}
		footer_mol(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_footer_mol"));
		}
		Footer_mol(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("https://b-on-g.github.io/smalljs/");
			(obj.sub) = () => ([(this.Footer_mol_icon()), (this.footer_mol())]);
			return obj;
		}
		rights(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_rights"));
		}
		Footer_rights(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.rights()));
			return obj;
		}
		Footer_this_list(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ([
				(this.Footer_web()), 
				(this.Footer_mol()), 
				(this.Footer_rights())
			]);
			return obj;
		}
		Footer_this(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("nav");
			(obj.sub) = () => ([(this.Footer_this_label()), (this.Footer_this_list())]);
			return obj;
		}
		Footer_grid(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Footer_about()), 
				(this.Footer_project()), 
				(this.Footer_this())
			]);
			return obj;
		}
		Footer(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ([(this.Footer_grid())]);
			return obj;
		}
		badge_label(id){
			return "";
		}
		Badge_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.badge_label(id)));
			return obj;
		}
		badge_value(id){
			return "";
		}
		Badge_value(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.badge_value(id))]);
			return obj;
		}
		step_delay(id){
			return 0;
		}
		step_rail(id){
			return [];
		}
		Step_rail(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.step_rail(id)));
			return obj;
		}
		step_name(id){
			return "";
		}
		Step_name(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h3");
			(obj.sub) = () => ([(this.step_name(id))]);
			return obj;
		}
		step_detail(id){
			return "";
		}
		Step_detail(id){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.step_detail(id)));
			return obj;
		}
		step_output(id){
			return "";
		}
		Step_output(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.step_output(id)));
			return obj;
		}
		Step_dot_core(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		step_ordinal(id){
			return "";
		}
		card_dataset(id){
			return null;
		}
		card_featured(id){
			return false;
		}
		card_delay(id){
			return 0;
		}
		card_skeleton_featured(id){
			return false;
		}
		Error_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		error_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_error_title"));
		}
		Error_title(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.error_title()));
			return obj;
		}
		error_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_error_hint"));
		}
		Error_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.error_hint()));
			return obj;
		}
		retry(next){
			if(next !== undefined) return next;
			return null;
		}
		retry_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_retry_label"));
		}
		Retry(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.retry(next)));
			(obj.sub) = () => ([(this.retry_label())]);
			return obj;
		}
		sub(){
			return [
				(this.Hero()), 
				(this.Pipeline()), 
				(this.Corpora()), 
				(this.Footer())
			];
		}
		Badge(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Badge_label(id)), (this.Badge_value(id))]);
			return obj;
		}
		Step(id){
			const obj = new this.$.$raggu_web_front_reveal();
			(obj.dom_name) = () => ("li");
			(obj.delay) = () => ((this.step_delay(id)));
			(obj.sub) = () => ([
				(this.Step_rail(id)), 
				(this.Step_name(id)), 
				(this.Step_detail(id)), 
				(this.Step_output(id))
			]);
			return obj;
		}
		Step_dot(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Step_dot_core(id))]);
			return obj;
		}
		Step_ordinal(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.step_ordinal(id))]);
			return obj;
		}
		Step_line(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		Step_arrow(id){
			const obj = new this.$.$raggu_web_front_icon_arrow();
			return obj;
		}
		Card(id){
			const obj = new this.$.$raggu_web_front_home_card();
			(obj.dataset) = () => ((this.card_dataset(id)));
			(obj.featured) = () => ((this.card_featured(id)));
			(obj.delay) = () => ((this.card_delay(id)));
			return obj;
		}
		Card_skeleton(id){
			const obj = new this.$.$raggu_web_front_skeleton();
			(obj.attr) = () => ({...(this.$.$raggu_web_front_skeleton.prototype.attr.call(obj)), "raggu_web_front_home_card_skeleton_featured": (this.card_skeleton_featured(id))});
			return obj;
		}
		Error(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Error_glass()), 
				(this.Error_title()), 
				(this.Error_hint()), 
				(this.Retry())
			]);
			return obj;
		}
		corpora_word(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_corpora_word"));
		}
		Pipeline_text(){
			const obj = new this.$.$raggu_web_front_home_pipeline();
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_home.prototype), "Eyebrow"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Title_accent"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Lede"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Cta_arrow"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Cta"));
	($mol_mem(($.$raggu_web_front_home.prototype), "to_pipeline"));
	($mol_mem(($.$raggu_web_front_home.prototype), "How"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Actions"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Hero_main"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics_glass"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics_title"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics_count"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics_head"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metric_nodes"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metric_edges"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metric_communities"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metric_chunks"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metric_list"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Badges"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics_body"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Metrics"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Hero"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Pipeline_head"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Steps"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Pipeline"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Corpora_head"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Corpora_body"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Corpora"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_name"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_blurb"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_about"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_project_label"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_github"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_arxiv"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_pypi"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_project_list"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_project"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_this_label"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_web"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_mol_icon"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_mol"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_rights"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_this_list"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_this"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer_grid"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Footer"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Badge_label"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Badge_value"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_rail"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_name"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_detail"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_output"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_dot_core"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Error_glass"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Error_title"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Error_hint"));
	($mol_mem(($.$raggu_web_front_home.prototype), "retry"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Retry"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Badge"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_dot"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_ordinal"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_line"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Step_arrow"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Card"));
	($mol_mem_key(($.$raggu_web_front_home.prototype), "Card_skeleton"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Error"));
	($mol_mem(($.$raggu_web_front_home.prototype), "Pipeline_text"));
	($.$raggu_web_front_home_metric) = class $raggu_web_front_home_metric extends ($.$mol_view) {
		Label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("dt");
			(obj.text) = () => ((this.label()));
			return obj;
		}
		value_content(){
			return [];
		}
		Value(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dd");
			(obj.sub) = () => ((this.value_content()));
			return obj;
		}
		label(){
			return "";
		}
		value(){
			return "";
		}
		pending(){
			return false;
		}
		sub(){
			return [(this.Label()), (this.Value())];
		}
		Skeleton(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_home_metric.prototype), "Label"));
	($mol_mem(($.$raggu_web_front_home_metric.prototype), "Value"));
	($mol_mem(($.$raggu_web_front_home_metric.prototype), "Skeleton"));
	($.$raggu_web_front_home_head) = class $raggu_web_front_home_head extends ($.$raggu_web_front_reveal) {
		Eyebrow(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.eyebrow()));
			return obj;
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h2");
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		Lede(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.lede()));
			return obj;
		}
		eyebrow(){
			return "";
		}
		title(){
			return "";
		}
		lede(){
			return "";
		}
		sub(){
			return [
				(this.Eyebrow()), 
				(this.Title()), 
				(this.Lede())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_home_head.prototype), "Eyebrow"));
	($mol_mem(($.$raggu_web_front_home_head.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_home_head.prototype), "Lede"));
	($.$raggu_web_front_home_pipeline) = class $raggu_web_front_home_pipeline extends ($.$mol_object) {
		step_1_name(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_1_name"));
		}
		step_1_detail(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_1_detail"));
		}
		step_1_output(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_1_output"));
		}
		step_2_name(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_2_name"));
		}
		step_2_detail(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_2_detail"));
		}
		step_2_output(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_2_output"));
		}
		step_3_name(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_3_name"));
		}
		step_3_detail(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_3_detail"));
		}
		step_3_output(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_3_output"));
		}
		step_4_name(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_4_name"));
		}
		step_4_detail(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_4_detail"));
		}
		step_4_output(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_pipeline_step_4_output"));
		}
	};

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_home extends $.$raggu_web_front_home {
            datasets_state() {
                return $raggu_web_front_data_state(() => $raggu_web_front_data.datasets_now());
            }
            datasets() {
                return this.datasets_state().value;
            }
            pending() {
                return this.datasets_state().pending;
            }
            totals() {
                const data = this.datasets();
                if (!data)
                    return null;
                return data.reduce((sum, item) => ({
                    nodes: sum.nodes + item.stats.nodes,
                    edges: sum.edges + item.stats.edges,
                    communities: sum.communities + item.stats.communities,
                    chunks: sum.chunks + item.stats.chunks,
                }), { nodes: 0, edges: 0, communities: 0, chunks: 0 });
            }
            total(key) {
                const totals = this.totals();
                return totals ? $raggu_web_front_lib_full(totals[key]) : '—';
            }
            total_nodes() { return this.total('nodes'); }
            total_edges() { return this.total('edges'); }
            total_communities() { return this.total('communities'); }
            total_chunks() { return this.total('chunks'); }
            corpora_count() {
                return `${this.datasets()?.length ?? 3} ${this.corpora_word()}`;
            }
            badge_list() {
                return this.datasets()?.[0]?.badges ?? [];
            }
            badges() {
                const list = this.badge_list();
                return list.length ? list.map((_, index) => this.Badge(index)) : [];
            }
            badge_label(index) {
                return this.badge_list()[index].label;
            }
            badge_value(index) {
                return this.badge_list()[index].value;
            }
            to_pipeline() {
                this.$.$mol_dom_context.document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            pipeline() {
                const text = this.Pipeline_text();
                return [
                    { ordinal: '01', name: text.step_1_name(), detail: text.step_1_detail(), output: text.step_1_output() },
                    { ordinal: '02', name: text.step_2_name(), detail: text.step_2_detail(), output: text.step_2_output() },
                    { ordinal: '03', name: text.step_3_name(), detail: text.step_3_detail(), output: text.step_3_output() },
                    { ordinal: '04', name: text.step_4_name(), detail: text.step_4_detail(), output: text.step_4_output() },
                ];
            }
            steps() {
                return this.pipeline().map((_, index) => this.Step(index));
            }
            step_delay(index) {
                return index * 70;
            }
            step_rail(index) {
                const last = index === this.pipeline().length - 1;
                return [
                    this.Step_dot(index),
                    this.Step_ordinal(index),
                    this.Step_line(index),
                    ...last ? [] : [this.Step_arrow(index)],
                ];
            }
            step_ordinal(index) { return this.pipeline()[index].ordinal; }
            step_name(index) { return this.pipeline()[index].name; }
            step_detail(index) { return this.pipeline()[index].detail; }
            step_output(index) { return this.pipeline()[index].output; }
            sorted() {
                const data = this.datasets();
                return data ? [...data].sort((a, b) => b.stats.nodes - a.stats.nodes) : null;
            }
            corpora() {
                const state = this.datasets_state();
                if (state.error)
                    return [this.Error()];
                const sorted = this.sorted();
                if (!sorted)
                    return [0, 1, 2].map(index => this.Card_skeleton(index));
                return sorted.map((_, index) => this.Card(index));
            }
            card_dataset(index) {
                return this.sorted()[index];
            }
            card_featured(index) {
                return index === 0;
            }
            card_delay(index) {
                return index * 80;
            }
            card_skeleton_featured(index) {
                return index === 0;
            }
            retry() {
                $raggu_web_front_data.retry();
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_home.prototype, "totals", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_home.prototype, "sorted", null);
        $$.$raggu_web_front_home = $raggu_web_front_home;
        class $raggu_web_front_home_metric extends $.$raggu_web_front_home_metric {
            value_content() {
                return this.pending() ? [this.Skeleton()] : [this.value()];
            }
        }
        $$.$raggu_web_front_home_metric = $raggu_web_front_home_metric;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/home/home.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/home/home.view.css", "[raggu_web_front_home] {\n\tdisplay: block;\n}\n\n[raggu_web_front_home_hero] {\n\tposition: relative;\n\tmargin: 0 auto;\n\tdisplay: grid;\n\twidth: 100%;\n\tmax-width: 1680px;\n\tgrid-template-columns: repeat(12, minmax(0, 1fr));\n\talign-items: center;\n\tcolumn-gap: 2rem;\n\trow-gap: 3.5rem;\n\tpadding: 8rem 1.25rem 6rem;\n}\n\n[raggu_web_front_home_hero_main] {\n\tdisplay: block;\n\tgrid-column: span 12 / span 12;\n}\n\n[raggu_web_front_home_eyebrow] {\n\tcolor: var(--accent);\n\tanimation: ragu-rise 700ms var(--ease-out-quint) both;\n}\n\n[raggu_web_front_home_title] {\n\tdisplay: block;\n\tmargin-top: 1.5rem;\n\tfont-family: var(--font-display);\n\tfont-size: var(--text-display);\n\tline-height: 0.96;\n\tfont-weight: 300;\n\tletter-spacing: -0.035em;\n\tcolor: var(--text);\n\tanimation: ragu-rise 700ms var(--ease-out-quint) 60ms both;\n}\n\n[raggu_web_front_home_title_accent] {\n\tmargin-top: 0.25rem;\n\tdisplay: block;\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_lede] {\n\tmargin-top: 2rem;\n\tmax-width: 63ch;\n\tfont-size: 1.0625rem;\n\tline-height: 1.65;\n\tcolor: var(--text-2);\n\tanimation: ragu-rise 700ms var(--ease-out-quint) 120ms both;\n}\n\n[raggu_web_front_home_actions] {\n\tmargin-top: 2.5rem;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tcolumn-gap: 0.75rem;\n\trow-gap: 1rem;\n\tanimation: ragu-rise 700ms var(--ease-out-quint) 180ms both;\n}\n\n[raggu_web_front_home_cta] {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-control);\n\tpadding: 0.75rem 1.25rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tbackground: var(--accent);\n\tcolor: var(--accent-ink);\n\tbox-shadow: 0 10px 28px -14px var(--accent-line);\n\ttransition:\n\t\tbackground-color 200ms var(--ease-out-quint),\n\t\ttransform 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_home_cta]:hover {\n\tbackground: var(--accent-hover);\n}\n\n[raggu_web_front_home_cta]:active {\n\ttransform: translateY(1px);\n}\n\n[raggu_web_front_home_cta]:hover [raggu_web_front_home_cta_arrow] {\n\ttransform: translateX(2px);\n}\n\n[raggu_web_front_home_how] {\n\tborder-radius: var(--radius-control);\n\tpadding: 0.75rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text-2);\n\ttext-decoration: underline;\n\ttext-decoration-color: var(--edge-strong);\n\ttext-underline-offset: 6px;\n\ttransition: color 200ms ease, text-decoration-color 200ms ease;\n}\n\n[raggu_web_front_home_how]:hover {\n\tcolor: var(--accent);\n\ttext-decoration-color: var(--accent-line);\n}\n\n[raggu_web_front_home_metrics] {\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: block;\n\tgrid-column: span 12 / span 12;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n\tanimation: ragu-rise-far 850ms var(--ease-out-quint) 280ms both;\n}\n\n[raggu_web_front_home_metrics_body] {\n\tdisplay: block;\n\tpadding: 1rem;\n}\n\n[raggu_web_front_home_metrics_head] {\n\tdisplay: flex;\n\talign-items: baseline;\n\tjustify-content: space-between;\n\tgap: 1rem;\n}\n\n[raggu_web_front_home_metrics_count] {\n\tcolor: var(--accent);\n\tfont-variant-numeric: tabular-nums;\n}\n\n[raggu_web_front_home_metric_list] {\n\tmargin-top: 1.25rem;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(2, minmax(0, 1fr));\n\tcolumn-gap: 1.5rem;\n\trow-gap: 1.25rem;\n}\n\n[raggu_web_front_home_metric] {\n\tdisplay: block;\n}\n\n[raggu_web_front_home_metric_value] {\n\tdisplay: block;\n\tmargin-top: 0.375rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 1.35rem;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_metric_skeleton] {\n\theight: 1.25rem;\n\twidth: 5rem;\n}\n\n[raggu_web_front_home_badges] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_home_badges]:not(:empty) {\n\tmargin-top: 1.5rem;\n\tborder-top: 1px solid var(--edge);\n\tpadding-top: 1rem;\n}\n\n[raggu_web_front_home_badge] {\n\tdisplay: flex;\n\talign-items: baseline;\n\tjustify-content: space-between;\n\tgap: 1rem;\n}\n\n[raggu_web_front_home_badge_value] {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_pipeline],\n[raggu_web_front_home_corpora] {\n\tmargin: 0 auto;\n\tdisplay: block;\n\twidth: 100%;\n\tmax-width: 1680px;\n\tscroll-margin-top: 7rem;\n\tpadding: 6rem 1.25rem;\n}\n\n[raggu_web_front_home_head] {\n\tdisplay: block;\n\tmax-width: 52rem;\n}\n\n[raggu_web_front_home_head_eyebrow] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_home_head_title] {\n\tmargin-top: 1rem;\n\tfont-family: var(--font-display);\n\tfont-size: var(--text-section);\n\tline-height: 1.08;\n\tfont-weight: 400;\n\tletter-spacing: -0.02em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_head_lede] {\n\tmargin-top: 1rem;\n\tmax-width: 63ch;\n\tfont-size: 0.975rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_steps] {\n\tmargin-top: 3.5rem;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(1, minmax(0, 1fr));\n\tcolumn-gap: 1.5rem;\n\trow-gap: 2.5rem;\n}\n\n[raggu_web_front_home_step] {\n\tposition: relative;\n\tdisplay: block;\n}\n\n[raggu_web_front_home_step_rail] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.75rem;\n}\n\n[raggu_web_front_home_step_dot] {\n\tdisplay: flex;\n\twidth: 1.5rem;\n\theight: 1.5rem;\n\tflex-shrink: 0;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 9999px;\n\tborder: 1px solid var(--edge-strong);\n}\n\n[raggu_web_front_home_step_dot_core] {\n\tdisplay: block;\n\twidth: 5px;\n\theight: 5px;\n\tborder-radius: 9999px;\n\tbackground: var(--accent);\n}\n\n[raggu_web_front_home_step_ordinal] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_home_step_line] {\n\tdisplay: none;\n\theight: 1px;\n\tflex: 1;\n\tbackground: linear-gradient(to right, var(--edge-strong), transparent);\n}\n\n[raggu_web_front_home_step_arrow] {\n\tdisplay: none;\n\tflex-shrink: 0;\n\tcolor: var(--edge-strong);\n}\n\n[raggu_web_front_home_step_name] {\n\tmargin-top: 1.25rem;\n\tfont-family: var(--font-display);\n\tfont-size: 1.25rem;\n\tline-height: 1;\n\tfont-weight: 500;\n\tletter-spacing: -0.015em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_step_detail] {\n\tmargin-top: 0.75rem;\n\tmax-width: 34ch;\n\tfont-size: 0.875rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_step_output] {\n\tmargin-top: 1rem;\n}\n\n[raggu_web_front_home_corpora_body] {\n\tmargin-top: 3rem;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(12, minmax(0, 1fr));\n\tgap: 1.25rem;\n}\n\n[raggu_web_front_home_card_skeleton] {\n\tgrid-column: span 12 / span 12;\n\theight: 14rem;\n\tborder-radius: var(--radius-island);\n}\n\n[raggu_web_front_home_card_skeleton][raggu_web_front_home_card_skeleton_featured] {\n\theight: 30rem;\n}\n\n[raggu_web_front_home_error] {\n\tposition: relative;\n\tisolation: isolate;\n\tgrid-column: span 12 / span 12;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: flex-start;\n\tborder-radius: var(--radius-island);\n\tpadding: 2rem 1.5rem;\n}\n\n[raggu_web_front_home_error_title] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_error_hint] {\n\tmargin-top: 0.5rem;\n\tmax-width: 46ch;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_retry] {\n\tmargin-top: 1.25rem;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge-strong);\n\tpadding: 0.5rem 1rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\ttransition: border-color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_home_retry]:hover {\n\tborder-color: var(--accent-line);\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_home_footer] {\n\tmargin: 0 auto;\n\tdisplay: block;\n\twidth: 100%;\n\tmax-width: 1680px;\n\tpadding: 4rem 1.25rem 3.5rem;\n}\n\n[raggu_web_front_home_footer_grid] {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(1, minmax(0, 1fr));\n\tgap: 2.5rem;\n\tpadding-top: 2.5rem;\n}\n\n[raggu_web_front_home_footer_about],\n[raggu_web_front_home_footer_project],\n[raggu_web_front_home_footer_this] {\n\tdisplay: block;\n}\n\n[raggu_web_front_home_footer_name] {\n\tfont-family: var(--font-display);\n\tfont-size: 1.125rem;\n\tline-height: 1;\n\tfont-weight: 500;\n\tletter-spacing: -0.01em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_footer_blurb] {\n\tmargin-top: 0.75rem;\n\tmax-width: 63ch;\n\tfont-size: 0.875rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_home_footer_project_list],\n[raggu_web_front_home_footer_this_list] {\n\tmargin-top: 1rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.625rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n}\n\n[raggu_web_front_home_footer_project_list] > [raggu_web_front_link],\n[raggu_web_front_home_footer_this_list] > [raggu_web_front_link] {\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_home_footer_project_list] > [raggu_web_front_link]:hover,\n[raggu_web_front_home_footer_this_list] > [raggu_web_front_link]:hover {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_home_footer_mol] {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_home_footer_mol_icon] {\n\twidth: 16px;\n\theight: 16px;\n\tstroke-width: 1.2;\n}\n\n[raggu_web_front_home_footer_rights] {\n\tpadding-top: 0.25rem;\n}\n\n@media (min-width: 640px) {\n\n\t[raggu_web_front_home_hero],\n\t[raggu_web_front_home_pipeline],\n\t[raggu_web_front_home_corpora],\n\t[raggu_web_front_home_footer] {\n\t\tpadding-left: 2rem;\n\t\tpadding-right: 2rem;\n\t}\n\n\t[raggu_web_front_home_steps] {\n\t\tgrid-template-columns: repeat(2, minmax(0, 1fr));\n\t}\n\n\t[raggu_web_front_home_card_skeleton] {\n\t\tgrid-column: span 6 / span 6;\n\t}\n\n\t[raggu_web_front_home_card_skeleton][raggu_web_front_home_card_skeleton_featured] {\n\t\tgrid-column: span 12 / span 12;\n\t}\n\n}\n\n@media (min-width: 768px) {\n\n\t[raggu_web_front_home_footer_grid] {\n\t\tgrid-template-columns: 1.4fr 1fr 1fr;\n\t}\n\n}\n\n@media (min-width: 1024px) {\n\n\t[raggu_web_front_home_hero] {\n\t\tmin-height: 88dvh;\n\t\tpadding-top: 10rem;\n\t}\n\n\t[raggu_web_front_home_hero_main] {\n\t\tgrid-column: span 7 / span 7;\n\t}\n\n\t[raggu_web_front_home_metrics] {\n\t\tgrid-column: 9 / span 4;\n\t}\n\n\t[raggu_web_front_home_card_skeleton] {\n\t\tgrid-column: span 5 / span 5;\n\t}\n\n\t[raggu_web_front_home_card_skeleton][raggu_web_front_home_card_skeleton_featured] {\n\t\tgrid-column: span 7 / span 7;\n\t}\n\n}\n\n@media (min-width: 1280px) {\n\n\t[raggu_web_front_home_steps] {\n\t\tgrid-template-columns: repeat(4, minmax(0, 1fr));\n\t}\n\n\t[raggu_web_front_home_step_line],\n\t[raggu_web_front_home_step_arrow] {\n\t\tdisplay: block;\n\t}\n\n}\n");
})($ || ($ = {}));
//raggu/web/front/home/-css/home.view.css.ts
;
	($.$raggu_web_front_corpus_controls) = class $raggu_web_front_corpus_controls extends ($.$mol_view) {
		filtering(){
			return false;
		}
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		bar(){
			return [];
		}
		Bar(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.bar()));
			return obj;
		}
		summary(){
			return [];
		}
		Summary_line(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ((this.summary()));
			return obj;
		}
		Summary(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Summary_line())]);
			return obj;
		}
		search_box(){
			return [];
		}
		search_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_search_label"));
		}
		search(next){
			if(next !== undefined) return next;
			return "";
		}
		search_input(next){
			if(next !== undefined) return next;
			return null;
		}
		clear_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_clear_label"));
		}
		search_clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Search_clear_icon(){
			const obj = new this.$.$raggu_web_front_icon_close();
			return obj;
		}
		types_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_types_label"));
		}
		types_count(){
			return 0;
		}
		type_items(){
			return [];
		}
		types_clear(next){
			if(next !== undefined) return next;
			return null;
		}
		communities_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_communities_label"));
		}
		communities_count(){
			return 0;
		}
		community_items(){
			return [];
		}
		communities_clear(next){
			if(next !== undefined) return next;
			return null;
		}
		type_active(id){
			return false;
		}
		type_name(id){
			return "";
		}
		type_count(id){
			return 0;
		}
		type_toggle(id, next){
			if(next !== undefined) return next;
			return null;
		}
		community_active(id){
			return false;
		}
		community_name(id){
			return "";
		}
		community_count(id){
			return 0;
		}
		community_toggle(id, next){
			if(next !== undefined) return next;
			return null;
		}
		matches_text(){
			return "";
		}
		no_matches_text(){
			return "";
		}
		clear_all(next){
			if(next !== undefined) return next;
			return null;
		}
		clear_all_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_clear_all_label"));
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_corpus_controls_filtering": (this.filtering())};
		}
		sub(){
			return [
				(this.Glass()), 
				(this.Bar()), 
				(this.Summary())
			];
		}
		Search(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.search_box()));
			return obj;
		}
		Search_icon(){
			const obj = new this.$.$raggu_web_front_icon_search();
			return obj;
		}
		Search_input(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("input");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"placeholder": (this.search_label()), 
				"aria-label": (this.search_label())
			});
			(obj.field) = () => ({...(this.$.$mol_view.prototype.field.call(obj)), "value": (this.search())});
			(obj.event) = () => ({"input": (next) => (this.search_input(next))});
			return obj;
		}
		Search_clear(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.clear_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.clear_label())});
			(obj.click) = (next) => ((this.search_clear(next)));
			(obj.sub) = () => ([(this.Search_clear_icon())]);
			return obj;
		}
		Types(){
			const obj = new this.$.$raggu_web_front_corpus_controls_filter();
			(obj.label) = () => ((this.types_label()));
			(obj.count) = () => ((this.types_count()));
			(obj.items) = () => ((this.type_items()));
			(obj.clear) = (next) => ((this.types_clear(next)));
			return obj;
		}
		Communities(){
			const obj = new this.$.$raggu_web_front_corpus_controls_filter();
			(obj.label) = () => ((this.communities_label()));
			(obj.count) = () => ((this.communities_count()));
			(obj.items) = () => ((this.community_items()));
			(obj.clear) = (next) => ((this.communities_clear(next)));
			return obj;
		}
		Type_item(id){
			const obj = new this.$.$raggu_web_front_corpus_controls_facet();
			(obj.active) = () => ((this.type_active(id)));
			(obj.name) = () => ((this.type_name(id)));
			(obj.count) = () => ((this.type_count(id)));
			(obj.click) = (next) => ((this.type_toggle(id, next)));
			return obj;
		}
		Community_item(id){
			const obj = new this.$.$raggu_web_front_corpus_controls_facet();
			(obj.active) = () => ((this.community_active(id)));
			(obj.name) = () => ((this.community_name(id)));
			(obj.count) = () => ((this.community_count(id)));
			(obj.click) = (next) => ((this.community_toggle(id, next)));
			return obj;
		}
		Matches(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.matches_text())]);
			return obj;
		}
		No_matches(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.no_matches_text())]);
			return obj;
		}
		Clear_all(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.clear_all(next)));
			(obj.sub) = () => ([(this.clear_all_label())]);
			return obj;
		}
		matches_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_matches_label"));
		}
		no_matches_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_no_matches_label"));
		}
		no_matches_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_no_matches_hint"));
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Bar"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Summary_line"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Summary"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "search"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "search_input"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "search_clear"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Search_clear_icon"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "types_clear"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "communities_clear"));
	($mol_mem_key(($.$raggu_web_front_corpus_controls.prototype), "type_toggle"));
	($mol_mem_key(($.$raggu_web_front_corpus_controls.prototype), "community_toggle"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "clear_all"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Search"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Search_icon"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Search_input"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Search_clear"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Types"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Communities"));
	($mol_mem_key(($.$raggu_web_front_corpus_controls.prototype), "Type_item"));
	($mol_mem_key(($.$raggu_web_front_corpus_controls.prototype), "Community_item"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Matches"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "No_matches"));
	($mol_mem(($.$raggu_web_front_corpus_controls.prototype), "Clear_all"));
	($.$raggu_web_front_corpus_controls_filter) = class $raggu_web_front_corpus_controls_filter extends ($.$raggu_web_front_pop) {
		active(){
			return false;
		}
		pane_class(){
			return "";
		}
		Pane(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"class": (this.pane_class()), 
				"aria-hidden": "true"
			});
			return obj;
		}
		count_text(){
			return "";
		}
		Count(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.count_text())]);
			return obj;
		}
		Chevron(){
			const obj = new this.$.$raggu_web_front_icon_chevron();
			return obj;
		}
		Heading(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.label()));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.items()));
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		clear_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_controls_filter_clear_label"));
		}
		Clear(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.clear_label())]);
			return obj;
		}
		label(){
			return "";
		}
		count(){
			return 0;
		}
		items(){
			return [];
		}
		bubble_width(){
			return "min(22rem, calc(100vw - 2rem))";
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_corpus_controls_filter_active": (this.active())};
		}
		trigger_content(){
			return [
				(this.Pane()), 
				(this.label()), 
				(this.Count()), 
				(this.Chevron())
			];
		}
		bubble_content(){
			return [
				(this.Heading()), 
				(this.List()), 
				(this.Clear())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "Pane"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "Count"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "Chevron"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "Heading"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "List"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "clear"));
	($mol_mem(($.$raggu_web_front_corpus_controls_filter.prototype), "Clear"));
	($.$raggu_web_front_corpus_controls_facet) = class $raggu_web_front_corpus_controls_facet extends ($.$mol_button) {
		Box(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		Name(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.name())]);
			return obj;
		}
		Count(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.count())]);
			return obj;
		}
		active(){
			return false;
		}
		name(){
			return "";
		}
		count(){
			return 0;
		}
		attr(){
			return {...(super.attr()), "aria-pressed": (this.active())};
		}
		sub(){
			return [
				(this.Box()), 
				(this.Name()), 
				(this.Count())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_controls_facet.prototype), "Box"));
	($mol_mem(($.$raggu_web_front_corpus_controls_facet.prototype), "Name"));
	($mol_mem(($.$raggu_web_front_corpus_controls_facet.prototype), "Count"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_corpus_controls extends $.$raggu_web_front_corpus_controls {
            model() {
                return this.viewer().shown_now()?.model ?? null;
            }
            search(next) {
                return this.viewer().search(next);
            }
            search_input(event) {
                this.search(event.target.value);
            }
            search_clear() {
                this.search('');
            }
            filtering() {
                return this.viewer().filtering();
            }
            bar() {
                return [
                    this.Search(),
                    this.Types(),
                    ...this.communities_sorted().length ? [this.Communities()] : [],
                ];
            }
            search_box() {
                return [this.Search_icon(), this.Search_input(), ...this.search() ? [this.Search_clear()] : []];
            }
            types_count() {
                return this.viewer().types().length;
            }
            communities_count() {
                return this.viewer().communities().length;
            }
            type_items() {
                return (this.model()?.types ?? []).map(type => this.Type_item(type.name));
            }
            type_active(name) {
                return this.viewer().types().includes(name);
            }
            type_name(name) {
                return $raggu_web_front_lib_entity_name(name);
            }
            type_count(name) {
                return this.model()?.types.find(type => type.name === name)?.count ?? 0;
            }
            type_toggle(name) {
                this.viewer().toggle_type(name);
            }
            types_clear() {
                this.viewer().types([]);
            }
            communities_sorted() {
                return (this.model()?.communities ?? []).slice().sort((a, b) => b.size - a.size).slice(0, 60);
            }
            community_items() {
                return this.communities_sorted().map(community => this.Community_item(community.id));
            }
            community_active(id) {
                return this.viewer().communities().includes(id);
            }
            community_name(id) {
                return this.communities_sorted().find(item => item.id === id)?.title ?? id;
            }
            community_count(id) {
                return this.communities_sorted().find(item => item.id === id)?.size ?? 0;
            }
            community_toggle(id) {
                this.viewer().toggle_community(id);
            }
            communities_clear() {
                this.viewer().communities([]);
            }
            matches() {
                const model = this.model();
                if (!model)
                    return 0;
                const query = this.viewer().search().trim().toLowerCase();
                const types = new Set(this.viewer().types());
                const communities = new Set(this.viewer().communities());
                if (!query && types.size === 0 && communities.size === 0)
                    return model.nodes.length;
                let total = 0;
                for (const node of model.nodes) {
                    if (query && !node.label.toLowerCase().includes(query))
                        continue;
                    if (types.size > 0 && !types.has(node.entity_type))
                        continue;
                    if (communities.size > 0 && !(node.community_id && communities.has(node.community_id)))
                        continue;
                    total += 1;
                }
                return total;
            }
            matches_text() {
                return this.matches_label().replace('{n}', String(this.matches()));
            }
            no_matches_text() {
                return `${this.no_matches_label()} — ${this.no_matches_hint()}`;
            }
            summary() {
                return [this.matches() > 0 ? this.Matches() : this.No_matches(), this.Clear_all()];
            }
            clear_all() {
                this.viewer().clear_filters();
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_controls.prototype, "search_box", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_controls.prototype, "communities_sorted", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_controls.prototype, "matches", null);
        $$.$raggu_web_front_corpus_controls = $raggu_web_front_corpus_controls;
        class $raggu_web_front_corpus_controls_filter extends $.$raggu_web_front_corpus_controls_filter {
            active() {
                return this.count() > 0;
            }
            pane_class() {
                return this.active() ? 'accent-pane' : 'filter-edge';
            }
            count_text() {
                return this.active() ? String(this.count()) : '';
            }
            bubble_content() {
                return this.active() ? super.bubble_content() : [this.Heading(), this.List()];
            }
        }
        $$.$raggu_web_front_corpus_controls_filter = $raggu_web_front_corpus_controls_filter;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/corpus/controls/controls.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/corpus/controls/controls.view.css", "[raggu_web_front_corpus_controls] {\n\tpointer-events: auto;\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tflex-direction: column;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n}\n\n[raggu_web_front_corpus_controls_filtering] > [raggu_web_front_glass] {\n\tborder-color: color-mix(in oklab, var(--accent-line) 70%, transparent);\n}\n\n[raggu_web_front_corpus_controls_bar] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_corpus_controls_search] {\n\tposition: relative;\n\tdisplay: flex;\n\tmin-width: 13rem;\n\tflex: 1;\n\talign-items: center;\n}\n\n[raggu_web_front_corpus_controls_search_icon] {\n\tpointer-events: none;\n\tposition: absolute;\n\tleft: 0.75rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_controls_search_input] {\n\twidth: 100%;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tbackground: color-mix(in oklab, var(--surface) 40%, transparent);\n\tpadding: 0.625rem 2.5rem 0.625rem 2.25rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text);\n\toutline: none;\n\ttransition: border-color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_corpus_controls_search_input]:focus {\n\tborder-color: var(--accent-line);\n\tbackground: color-mix(in oklab, var(--surface) 70%, transparent);\n}\n\n[raggu_web_front_corpus_controls_search_input]:focus-visible {\n\toutline: none;\n}\n\n[raggu_web_front_corpus_controls_search_clear] {\n\tposition: absolute;\n\tright: 0.375rem;\n\tdisplay: inline-flex;\n\twidth: 1.75rem;\n\theight: 1.75rem;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms var(--ease-out-quint), color 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_controls_search_clear]:hover {\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_controls_search_clear_icon] {\n\twidth: 1rem;\n\theight: 1rem;\n}\n\n[raggu_web_front_corpus_controls_filter_trigger] {\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.375rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.625rem 0.75rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_corpus_controls_filter_trigger]:hover {\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_controls_filter_active] [raggu_web_front_corpus_controls_filter_trigger] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_controls_filter_pane].filter-edge {\n\tposition: absolute;\n\tinset: 0;\n\tz-index: -1;\n\tborder-radius: inherit;\n\tborder: 1px solid var(--edge);\n\ttransition: border-color 200ms ease;\n}\n\n[raggu_web_front_corpus_controls_filter_count] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n}\n\n[raggu_web_front_corpus_controls_filter_count]:empty {\n\tdisplay: none;\n}\n\n[raggu_web_front_corpus_controls_filter_chevron] {\n\twidth: 0.875rem;\n\theight: 0.875rem;\n\topacity: 0.6;\n}\n\n[raggu_web_front_corpus_controls_filter_bubble] {\n\tborder-radius: var(--radius-island);\n}\n\n[raggu_web_front_corpus_controls_filter_heading] {\n\tpadding: 0.5rem 0.75rem 0.25rem;\n}\n\n[raggu_web_front_corpus_controls_filter_list] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmax-height: min(24rem, 50dvh);\n\toverflow-y: auto;\n\tpadding: 0.25rem;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_corpus_controls_filter_clear] {\n\tmargin-top: 0.25rem;\n\twidth: 100%;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.5rem 0.625rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms ease, color 200ms ease;\n}\n\n[raggu_web_front_corpus_controls_filter_clear]:hover {\n\tbackground: var(--accent-wash);\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_controls_facet] {\n\tdisplay: grid;\n\twidth: 100%;\n\tgrid-template-columns: auto 1fr auto;\n\talign-items: center;\n\tgap: 0.625rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.5rem 0.625rem;\n\ttext-align: left;\n\ttransition: background-color 150ms ease;\n}\n\n[raggu_web_front_corpus_controls_facet]:hover {\n\tbackground: color-mix(in oklab, var(--text) 6%, transparent);\n}\n\n[raggu_web_front_corpus_controls_facet][aria-pressed=\"true\"] {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_corpus_controls_facet_box] {\n\tdisplay: block;\n\twidth: 0.5rem;\n\theight: 0.5rem;\n\tborder-radius: 3px;\n\tbackground: var(--edge-strong);\n\ttransition: background-color 150ms ease;\n}\n\n[raggu_web_front_corpus_controls_facet][aria-pressed=\"true\"] [raggu_web_front_corpus_controls_facet_box] {\n\tbackground: var(--accent);\n}\n\n[raggu_web_front_corpus_controls_facet_name] {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_controls_facet][aria-pressed=\"true\"] [raggu_web_front_corpus_controls_facet_name] {\n\tfont-weight: 500;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_controls_facet_count] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_controls_summary] {\n\tdisplay: grid;\n\tgrid-template-rows: 0fr;\n\topacity: 0;\n\toverflow: hidden;\n\tpadding: 0 0.5rem;\n\ttransition:\n\t\tgrid-template-rows 280ms var(--ease-out-quint),\n\t\topacity 280ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_controls_filtering] > [raggu_web_front_corpus_controls_summary] {\n\tgrid-template-rows: 1fr;\n\topacity: 1;\n}\n\n[raggu_web_front_corpus_controls_summary_line] {\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tcolumn-gap: 0.5rem;\n\tpadding-top: 0.625rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.6875rem;\n\tline-height: 1;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_controls_matches] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_controls_clear_all] {\n\ttext-decoration: underline;\n\ttext-decoration-color: var(--edge-strong);\n\ttext-underline-offset: 4px;\n\ttransition: color 200ms ease;\n\ttext-transform: inherit;\n}\n\n[raggu_web_front_corpus_controls_clear_all]:hover {\n\tcolor: var(--accent);\n}\n");
})($ || ($ = {}));
//raggu/web/front/corpus/controls/-css/controls.view.css.ts
;
	($.$raggu_web_front_corpus_loader) = class $raggu_web_front_corpus_loader extends ($.$mol_view) {
		Face1(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Face2(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Face3(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Face4(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Face5(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Face6(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("i");
			return obj;
		}
		Solid(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "aria-hidden": "true"});
			(obj.sub) = () => ([
				(this.Face1()), 
				(this.Face2()), 
				(this.Face3()), 
				(this.Face4()), 
				(this.Face5()), 
				(this.Face6())
			]);
			return obj;
		}
		Label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.label()));
			return obj;
		}
		Percent(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.percent()));
			return obj;
		}
		Caption(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"role": "status", 
				"aria-live": "polite"
			});
			(obj.sub) = () => ([(this.Label()), (this.Percent())]);
			return obj;
		}
		label(){
			return "";
		}
		percent(){
			return "";
		}
		quiet(){
			return false;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_corpus_loader_quiet": (this.quiet())};
		}
		sub(){
			return [(this.Solid()), (this.Caption())];
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face1"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face2"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face3"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face4"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face5"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Face6"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Solid"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Label"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Percent"));
	($mol_mem(($.$raggu_web_front_corpus_loader.prototype), "Caption"));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/corpus/loader/loader.view.css", "[raggu_web_front_corpus_loader] {\n\tpointer-events: none;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 1rem;\n\tcolor: var(--text-3);\n\tperspective: 320px;\n\tanimation: ragu-fade 400ms ease both;\n}\n\n[raggu_web_front_corpus_loader_quiet] {\n\tflex-direction: row;\n\tgap: 0.875rem;\n}\n\n[raggu_web_front_corpus_loader_solid] {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 30px;\n\theight: 30px;\n\ttransform-style: preserve-3d;\n\tanimation: ragu-tumble 5.2s linear infinite;\n}\n\n[raggu_web_front_corpus_loader_quiet] > [raggu_web_front_corpus_loader_solid] {\n\tscale: 0.6;\n}\n\n[raggu_web_front_corpus_loader_solid] > i {\n\tposition: absolute;\n\tinset: 0;\n\tdisplay: block;\n\tborder-radius: 3px;\n\tborder: 1px solid color-mix(in oklab, var(--accent) 42%, transparent);\n\tbackground: color-mix(in oklab, var(--accent) 7%, transparent);\n}\n\n[raggu_web_front_corpus_loader_solid] > i:nth-child(1) { transform: translateZ(15px); }\n[raggu_web_front_corpus_loader_solid] > i:nth-child(2) { transform: rotateY(90deg) translateZ(15px); }\n[raggu_web_front_corpus_loader_solid] > i:nth-child(3) { transform: rotateY(180deg) translateZ(15px); }\n[raggu_web_front_corpus_loader_solid] > i:nth-child(4) { transform: rotateY(270deg) translateZ(15px); }\n[raggu_web_front_corpus_loader_solid] > i:nth-child(5) { transform: rotateX(90deg) translateZ(15px); }\n[raggu_web_front_corpus_loader_solid] > i:nth-child(6) { transform: rotateX(-90deg) translateZ(15px); }\n\n[raggu_web_front_corpus_loader_caption] {\n\tdisplay: flex;\n\talign-items: baseline;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_corpus_loader_percent] {\n\tfont-size: 10px;\n\tfont-variant-numeric: tabular-nums;\n\topacity: 0.6;\n}\n\n[raggu_web_front_corpus_loader_percent]:empty {\n\tdisplay: none;\n}\n\n@media (prefers-reduced-motion: reduce) {\n\t[raggu_web_front_corpus_loader_solid] {\n\t\tanimation: none;\n\t\ttransform: rotateX(-22deg) rotateY(38deg);\n\t}\n}\n");
})($ || ($ = {}));
//raggu/web/front/corpus/loader/-css/loader.view.css.ts
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
//mol/svg/circle/circle.view.ts
;
	($.$raggu_web_front_rich) = class $raggu_web_front_rich extends ($.$mol_view) {
		has_html(){
			return false;
		}
		plain(){
			return true;
		}
		html(){
			return "";
		}
		text(){
			return "";
		}
		attr(){
			return {
				...(super.attr()), 
				"raggu_web_front_rich_html": (this.has_html()), 
				"raggu_web_front_rich_plain": (this.plain())
			};
		}
		field(){
			return {...(super.field()), "innerHTML": (this.html())};
		}
	};

;
"use strict";
var $;
(function ($) {
    /** Dynamic sources import. */
    class $mol_import extends $mol_object2 {
        static module(uri) {
            $mol_wire_solid();
            return $mol_wire_sync(this).module_async(uri);
        }
        static module_async(uri) {
            return import(uri);
        }
        static script(uri) {
            $mol_wire_solid();
            return $mol_wire_sync(this).script_async(uri);
        }
        static script_async(uri) {
            const doc = $mol_dom_context.document;
            const script = doc.createElement('script');
            script.src = uri;
            doc.head.appendChild(script);
            return new Promise((done, fail) => {
                script.onload = () => done($mol_dom_context);
                script.onerror = () => fail(new Error(`Can not import ${uri}`));
            });
        }
        static style(uri) {
            return $mol_wire_sync(this).style_async(uri);
        }
        static style_async(uri) {
            const doc = $mol_dom_context.document;
            const style = doc.createElement('link');
            style.rel = 'stylesheet';
            style.href = uri;
            doc.head.appendChild(style);
            return new Promise((done, fail) => {
                style.onload = () => done(style.sheet);
                style.onerror = () => fail(new Error(`Can not import ${uri}`));
            });
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_import, "module", null);
    __decorate([
        $mol_mem_key
    ], $mol_import, "script", null);
    __decorate([
        $mol_mem_key
    ], $mol_import, "style", null);
    $.$mol_import = $mol_import;
})($ || ($ = {}));
//mol/import/import.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const katex_uri = 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/';
        class $raggu_web_front_rich extends $.$raggu_web_front_rich {
            plain() {
                return !$raggu_web_front_lib_rich_markup(this.text());
            }
            has_html() {
                return $raggu_web_front_lib_rich_html(this.text());
            }
            katex() {
                if (!$raggu_web_front_lib_rich_math(this.text()))
                    return null;
                try {
                    this.$.$mol_import.style(katex_uri + 'katex.min.css');
                    return this.$.$mol_import.script(katex_uri + 'katex.min.js').katex;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return null;
                    return null;
                }
            }
            html() {
                const text = this.text();
                const doc = this.$.$mol_dom_context.document;
                const root = doc.createElement('div');
                if (!$raggu_web_front_lib_rich_markup(text)) {
                    root.textContent = text;
                    return root.innerHTML;
                }
                if ($raggu_web_front_lib_rich_html(text)) {
                    const parsed = new DOMParser().parseFromString(text, 'text/html');
                    root.append(...$raggu_web_front_rich_clean(parsed.body));
                }
                else {
                    root.append(doc.createTextNode(text));
                }
                const katex = this.katex();
                const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                const texts = [];
                for (let node = walker.nextNode(); node; node = walker.nextNode())
                    texts.push(node);
                for (const node of texts) {
                    const parts = $raggu_web_front_lib_rich_split(node.data);
                    if (!parts.some(part => part.kind === 'math'))
                        continue;
                    node.replaceWith(...parts.map(part => {
                        if (part.kind === 'text')
                            return doc.createTextNode(part.value);
                        const slot = doc.createElement('span');
                        slot.className = part.display ? 'rich-math rich-math-display' : 'rich-math';
                        if (katex)
                            slot.innerHTML = katex.renderToString(part.value, { displayMode: part.display, throwOnError: false, trust: false });
                        else
                            slot.textContent = part.value;
                        return slot;
                    }));
                }
                return root.innerHTML;
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_rich.prototype, "katex", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_rich.prototype, "html", null);
        $$.$raggu_web_front_rich = $raggu_web_front_rich;
        const allowed = new Set($raggu_web_front_lib_rich_tags);
        function $raggu_web_front_rich_clean(from) {
            const out = [];
            for (const child of Array.from(from.childNodes)) {
                if (child.nodeType === Node.TEXT_NODE) {
                    out.push(document.createTextNode(child.textContent ?? ''));
                    continue;
                }
                if (child.nodeType !== Node.ELEMENT_NODE)
                    continue;
                const element = child;
                const tag = element.tagName.toLowerCase();
                const kids = $raggu_web_front_rich_clean(element);
                if (tag === 'script' || tag === 'style' || tag === 'iframe' || tag === 'object')
                    continue;
                if (!allowed.has(tag)) {
                    out.push(...kids);
                    continue;
                }
                const copy = document.createElement(tag);
                for (const name of ['colspan', 'rowspan']) {
                    const value = element.getAttribute(name);
                    if (value !== null && /^\d+$/.test(value))
                        copy.setAttribute(name, value);
                }
                copy.append(...kids);
                out.push(copy);
            }
            return out;
        }
        $$.$raggu_web_front_rich_clean = $raggu_web_front_rich_clean;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/rich/rich.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/rich/rich.view.css", "[raggu_web_front_rich] {\n\tdisplay: block;\n}\n\n[raggu_web_front_rich]:not([raggu_web_front_rich_html]):not([raggu_web_front_rich_plain]) {\n\twhite-space: pre-line;\n}\n\n[raggu_web_front_rich] > * + * {\n\tmargin-top: 0.6em;\n}\n\n[raggu_web_front_rich] table {\n\tdisplay: block;\n\twidth: max-content;\n\tmax-width: 100%;\n\toverflow-x: auto;\n\tborder-collapse: collapse;\n\tfont-size: 0.92em;\n\tline-height: 1.45;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_rich] caption {\n\tpadding-bottom: 0.4em;\n\ttext-align: left;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_rich] th,\n[raggu_web_front_rich] td {\n\tpadding: 0.35em 0.7em;\n\tborder: 1px solid var(--edge);\n\ttext-align: left;\n\tvertical-align: top;\n}\n\n[raggu_web_front_rich] th {\n\tbackground: var(--surface-sunk);\n\tcolor: var(--text);\n\tfont-weight: 600;\n}\n\n[raggu_web_front_rich] ul,\n[raggu_web_front_rich] ol {\n\tpadding-left: 1.25em;\n}\n\n[raggu_web_front_rich] ul { list-style: disc; }\n[raggu_web_front_rich] ol { list-style: decimal; }\n\n[raggu_web_front_rich] code {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.9em;\n}\n\n[raggu_web_front_rich] .rich-math {\n\tcolor: var(--text);\n}\n\n[raggu_web_front_rich] .rich-math:not(:has(.katex)) {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.9em;\n}\n\n[raggu_web_front_rich] .rich-math-display {\n\tdisplay: block;\n\toverflow-x: auto;\n\tmargin: 0.5em 0;\n\ttext-align: center;\n}\n");
})($ || ($ = {}));
//raggu/web/front/rich/-css/rich.view.css.ts
;
	($.$raggu_web_front_disclosure) = class $raggu_web_front_disclosure extends ($.$mol_view) {
		Plate(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "aria-hidden": "true"});
			return obj;
		}
		toggle(next){
			if(next !== undefined) return next;
			return null;
		}
		Count(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.count_text())]);
			return obj;
		}
		Toggle(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.hint()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-expanded": (this.open())});
			(obj.click) = (next) => ((this.toggle(next)));
			(obj.sub) = () => ([
				(this.Icon()), 
				(this.label()), 
				(this.Count())
			]);
			return obj;
		}
		actions(){
			return [];
		}
		Actions(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.actions()));
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Toggle()), (this.Actions())]);
			return obj;
		}
		body(){
			return [];
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		Fold(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Body())]);
			return obj;
		}
		label(){
			return "";
		}
		count_text(){
			return "";
		}
		hint(){
			return "";
		}
		open(next){
			if(next !== undefined) return next;
			return false;
		}
		Icon(){
			const obj = new this.$.$raggu_web_front_icon_sources();
			return obj;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_disclosure_open": (this.open())};
		}
		sub(){
			return [
				(this.Plate()), 
				(this.Head()), 
				(this.Fold())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Plate"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "toggle"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Count"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Toggle"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Actions"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Fold"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "open"));
	($mol_mem(($.$raggu_web_front_disclosure.prototype), "Icon"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_disclosure extends $.$raggu_web_front_disclosure {
            toggle() {
                const next = !this.open();
                this.open(next);
                if (!next)
                    return;
                new this.$.$mol_after_timeout(340, () => {
                    ;
                    this.dom_node().scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            }
        }
        $$.$raggu_web_front_disclosure = $raggu_web_front_disclosure;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/disclosure/disclosure.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/disclosure/disclosure.view.css", "[raggu_web_front_disclosure] {\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_disclosure_plate] {\n\tposition: absolute;\n\tinset: -0.25rem;\n\tz-index: -1;\n\tborder-radius: var(--radius-inset);\n\tbackground: color-mix(in oklab, var(--text) 5%, transparent);\n\topacity: 0;\n\ttransition: opacity 300ms var(--ease-out-quint);\n}\n\n[raggu_web_front_disclosure_open] > [raggu_web_front_disclosure_plate] {\n\topacity: 1;\n}\n\n[raggu_web_front_disclosure_head] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.25rem;\n}\n\n[raggu_web_front_disclosure_toggle] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.375rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.375rem 0.5rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.6875rem;\n\tline-height: 1;\n\tletter-spacing: 0.1em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_disclosure_toggle]:hover,\n[raggu_web_front_disclosure_open] [raggu_web_front_disclosure_toggle] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_disclosure_toggle] > [raggu_web_front_icon] {\n\twidth: 1rem;\n\theight: 1rem;\n}\n\n[raggu_web_front_disclosure_count] {\n\tfont-variant-numeric: tabular-nums;\n\topacity: 0.7;\n}\n\n[raggu_web_front_disclosure_actions] {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n[raggu_web_front_disclosure_fold] {\n\tdisplay: grid;\n\tgrid-template-rows: 0fr;\n\topacity: 0;\n\toverflow: hidden;\n\ttransition:\n\t\tgrid-template-rows 320ms var(--ease-out-quint),\n\t\topacity 320ms var(--ease-out-quint);\n}\n\n[raggu_web_front_disclosure_open] > [raggu_web_front_disclosure_fold] {\n\tgrid-template-rows: 1fr;\n\topacity: 1;\n}\n\n[raggu_web_front_disclosure_body] {\n\tdisplay: block;\n\tmin-height: 0;\n\tmargin-top: 0.5rem;\n\tborder-top: 1px solid var(--edge);\n\tpadding: 0.75rem 0.5rem 0.25rem;\n}\n");
})($ || ($ = {}));
//raggu/web/front/disclosure/-css/disclosure.view.css.ts
;
	($.$raggu_web_front_corpus_detail) = class $raggu_web_front_corpus_detail extends ($.$mol_view) {
		entity_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_entity_label"));
		}
		open(){
			return false;
		}
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		hint_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_hint_title"));
		}
		Hint_dot(){
			const obj = new this.$.$mol_svg_circle();
			(obj.pos) = () => ([4.6, 3.1]);
			(obj.radius) = () => (3);
			return obj;
		}
		Hint_cursor(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ("M4.6 3.1 13.7 8.4 9.6 9.6 8.1 13.6 4.6 3.1Z");
			return obj;
		}
		Hint_glyph(){
			const obj = new this.$.$mol_svg_root();
			(obj.view_box) = () => ("0 0 18 18");
			(obj.sub) = () => ([(this.Hint_dot()), (this.Hint_cursor())]);
			return obj;
		}
		Hint_badge(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Hint_glyph())]);
			return obj;
		}
		hint_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_hint_text"));
		}
		Hint_text(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.hint_text())]);
			return obj;
		}
		Kind(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.entity_label()));
			return obj;
		}
		title_content(){
			return [];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h2");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		chips(){
			return [];
		}
		Chips(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.chips()));
			return obj;
		}
		Head_text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Kind()), 
				(this.Title()), 
				(this.Chips())
			]);
			return obj;
		}
		close_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_close_label"));
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Close_icon(){
			const obj = new this.$.$raggu_web_front_icon_close();
			return obj;
		}
		Close(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.close_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.close_label())});
			(obj.click) = (next) => ((this.close(next)));
			(obj.sub) = () => ([(this.Close_icon())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ([(this.Head_text()), (this.Close())]);
			return obj;
		}
		scroll_content(){
			return [];
		}
		Scroll(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.scroll_content()));
			return obj;
		}
		ask(next){
			if(next !== undefined) return next;
			return null;
		}
		Ask_icon(){
			const obj = new this.$.$raggu_web_front_icon_chat();
			return obj;
		}
		ask_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_ask_label"));
		}
		Ask(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.ask(next)));
			(obj.sub) = () => ([(this.Ask_icon()), (this.ask_label())]);
			return obj;
		}
		type_name(){
			return "";
		}
		Line1(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Line2(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Line3(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		failed_text(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_failed_text"));
		}
		description(){
			return "";
		}
		relations_title(){
			return "";
		}
		Relations_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.relations_title()));
			return obj;
		}
		relation_rows(){
			return [];
		}
		Relations_list(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ((this.relation_rows()));
			return obj;
		}
		relation_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		relation_out(id){
			return false;
		}
		relation_type(id){
			return "";
		}
		Relation_type(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.relation_type(id))]);
			return obj;
		}
		relation_other(id){
			return "";
		}
		Relation_other(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.relation_other(id))]);
			return obj;
		}
		provenance_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_provenance_label"));
		}
		chunks_count(){
			return "";
		}
		chunk_rows(){
			return [];
		}
		chunk_id(id){
			return "";
		}
		Chunk_id(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.chunk_id(id)));
			return obj;
		}
		chunk_text(id){
			return "";
		}
		Chunk_text(id){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.chunk_text(id)));
			return obj;
		}
		dom_name(){
			return "aside";
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		dense(){
			return false;
		}
		hint(){
			return false;
		}
		waiting(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"aria-label": (this.entity_label()), 
				"raggu_web_front_corpus_detail_open": (this.open()), 
				"raggu_web_front_corpus_detail_dense": (this.dense()), 
				"raggu_web_front_corpus_detail_waiting": (this.waiting())
			};
		}
		sub(){
			return [(this.Glass()), (this.Content())];
		}
		Hint(){
			const obj = new this.$.$mol_view();
			(obj.hint) = () => ((this.hint_title()));
			(obj.sub) = () => ([(this.Hint_badge()), (this.Hint_text())]);
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Head()), 
				(this.Scroll()), 
				(this.Ask())
			]);
			return obj;
		}
		Title_skeleton(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Type_chip(){
			const obj = new this.$.$raggu_web_front_home_chip();
			(obj.text) = () => ((this.type_name()));
			return obj;
		}
		Lines(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Line1()), 
				(this.Line2()), 
				(this.Line3())
			]);
			return obj;
		}
		Failed(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.failed_text()));
			return obj;
		}
		Description(){
			const obj = new this.$.$raggu_web_front_rich();
			(obj.text) = () => ((this.description()));
			return obj;
		}
		Relations(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("section");
			(obj.sub) = () => ([(this.Relations_label()), (this.Relations_list())]);
			return obj;
		}
		Relation(id){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.relation_pick(id, next)));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "raggu_web_front_corpus_detail_relation_out": (this.relation_out(id))});
			(obj.sub) = () => ([(this.Relation_type(id)), (this.Relation_other(id))]);
			return obj;
		}
		Chunks(){
			const obj = new this.$.$raggu_web_front_disclosure();
			(obj.label) = () => ((this.provenance_label()));
			(obj.count_text) = () => ((this.chunks_count()));
			(obj.body) = () => ((this.chunk_rows()));
			return obj;
		}
		Chunk(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Chunk_id(id)), (this.Chunk_text(id))]);
			return obj;
		}
		relations_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_relations_label"));
		}
		ask_template(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_detail_ask_template"));
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Content"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint_dot"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint_cursor"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint_glyph"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint_badge"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint_text"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Kind"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Chips"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Head_text"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "close"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Close_icon"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Close"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Scroll"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "ask"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Ask_icon"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Ask"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Line1"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Line2"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Line3"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Relations_label"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Relations_list"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "relation_pick"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Relation_type"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Relation_other"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Chunk_id"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Chunk_text"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Hint"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Title_skeleton"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Type_chip"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Lines"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Failed"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Description"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Relations"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Relation"));
	($mol_mem(($.$raggu_web_front_corpus_detail.prototype), "Chunks"));
	($mol_mem_key(($.$raggu_web_front_corpus_detail.prototype), "Chunk"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_corpus_detail extends $.$raggu_web_front_corpus_detail {
            node_id() {
                return this.viewer().selected();
            }
            open() {
                return this.node_id() !== null;
            }
            content() {
                if (this.open())
                    return [this.Body()];
                return this.hint() ? [this.Hint()] : [];
            }
            detail_state() {
                const id = this.node_id();
                const corpus = this.viewer().corpus();
                return $raggu_web_front_data_state(() => id ? $raggu_web_front_data.node(`${corpus}|${id}`) : null);
            }
            local() {
                const id = this.node_id();
                const model = this.viewer().shown_now()?.model;
                if (!id || !model)
                    return null;
                const index = model.index_of.get(id);
                return index === undefined ? null : model.nodes[index];
            }
            node() {
                return this.detail_state().value?.node ?? this.local();
            }
            title_content() {
                const node = this.node();
                return node ? [node.label] : [this.Title_skeleton()];
            }
            chips() {
                return this.node() ? [this.Type_chip()] : [];
            }
            type_name() {
                return $raggu_web_front_lib_entity_name(this.node()?.entity_type ?? '');
            }
            description() {
                return this.node()?.description ?? '';
            }
            relations() {
                const data = this.detail_state().value;
                return [...data?.outgoing_relations ?? [], ...data?.incoming_relations ?? []];
            }
            chunks() {
                return this.detail_state().value?.provenance_chunks ?? [];
            }
            scroll_content() {
                const state = this.detail_state();
                const local = this.local();
                const head = state.pending && !local
                    ? [this.Lines()]
                    : state.error && !local ? [this.Failed()] : [this.Description()];
                return [
                    ...head,
                    ...this.relations().length ? [this.Relations()] : [],
                    ...this.chunks().length ? [this.Chunks()] : [],
                ];
            }
            relations_title() {
                return this.relations_label().replace('{n}', String(this.relations().length));
            }
            relation_rows() {
                return this.relations().slice(0, this.dense() ? 6 : 40).map((_, index) => this.Relation(index));
            }
            relation_out(index) {
                return this.relations()[index].direction === 'outgoing';
            }
            relation_type(index) {
                const relation = this.relations()[index];
                return `${relation.direction === 'outgoing' ? '→' : '←'} ${$raggu_web_front_lib_relation_name(relation.relation_type)}`;
            }
            relation_other(index) {
                return this.relations()[index].other_node_label;
            }
            relation_pick(index) {
                this.viewer().selected(this.relations()[index].other_node_id);
            }
            chunks_count() {
                return String(this.chunks().length);
            }
            chunk_rows() {
                return this.chunks().slice(0, 6).map((_, index) => this.Chunk(index));
            }
            chunk_id(index) {
                return this.chunks()[index].id.slice(0, 16);
            }
            chunk_text(index) {
                const content = this.chunks()[index].content;
                return content.slice(0, 420) + (content.length > 420 ? '…' : '');
            }
            close() {
                this.viewer().selected(null);
            }
            ask() {
                const node = this.node();
                if (!node)
                    return;
                this.viewer().ask(this.ask_template().replace('{label}', node.label));
            }
        }
        $$.$raggu_web_front_corpus_detail = $raggu_web_front_corpus_detail;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/corpus/detail/detail.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/corpus/detail/detail.view.css", "[raggu_web_front_corpus_detail] {\n\tpointer-events: auto;\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex-direction: column;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n\tanimation: ragu-detail-in 240ms var(--ease-out-quint) both;\n}\n\n@keyframes ragu-detail-in {\n\tfrom { opacity: 0; transform: translateY(10px); }\n\tto { opacity: 1; transform: none; }\n}\n\n@keyframes ragu-swap-in {\n\tfrom { opacity: 0; transform: translateY(8px); }\n\tto { opacity: 1; transform: none; }\n}\n\n[raggu_web_front_corpus_detail]:not([raggu_web_front_corpus_detail_open]) {\n\talign-self: flex-start;\n}\n\n[raggu_web_front_corpus_detail] > [raggu_web_front_glass] {\n\topacity: 0.3;\n\ttransition: opacity 360ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_detail_open] > [raggu_web_front_glass] {\n\topacity: 1;\n}\n\n[raggu_web_front_corpus_detail_content] {\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex: 1;\n\tflex-direction: column;\n}\n\n[raggu_web_front_corpus_detail_hint] {\n\tdisplay: flex;\n\theight: 2.75rem;\n\talign-items: center;\n\tgap: 0.625rem;\n\tpadding: 0 0.625rem;\n\ttransition: opacity 500ms ease;\n\tanimation: ragu-swap-in 180ms var(--ease-out-quint) both;\n}\n\n[raggu_web_front_corpus_detail_waiting] [raggu_web_front_corpus_detail_hint] {\n\topacity: 0.45;\n}\n\n[raggu_web_front_corpus_detail_hint_badge] {\n\tdisplay: flex;\n\twidth: 1.75rem;\n\theight: 1.75rem;\n\tflex-shrink: 0;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 9999px;\n\tcolor: var(--text-3);\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n}\n\n[raggu_web_front_corpus_detail_hint_glyph] {\n\twidth: 14px;\n\theight: 14px;\n\toverflow: visible;\n}\n\n[raggu_web_front_corpus_detail_hint_dot] {\n\tfill: var(--accent);\n\topacity: 0.8;\n}\n\n[raggu_web_front_corpus_detail_hint_cursor] {\n\tfill: none;\n\tstroke: currentColor;\n\tstroke-width: 1.6;\n\tstroke-linejoin: round;\n}\n\n[raggu_web_front_corpus_detail_hint_text] {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_detail_body] {\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex: 1;\n\tflex-direction: column;\n\tanimation: ragu-swap-in 180ms var(--ease-out-quint) both;\n}\n\n[raggu_web_front_corpus_detail_head] {\n\tdisplay: flex;\n\talign-items: flex-start;\n\tjustify-content: space-between;\n\tgap: 0.75rem;\n\tpadding: 0.5rem 0.75rem 0;\n}\n\n[raggu_web_front_corpus_detail_head_text] {\n\tdisplay: block;\n\tmin-width: 0;\n}\n\n[raggu_web_front_corpus_detail_title] {\n\tmargin-top: 0.5rem;\n\tfont-family: var(--font-display);\n\tfont-size: 1.5rem;\n\tline-height: 1.25;\n\tfont-weight: 500;\n\tletter-spacing: -0.02em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_detail_dense] [raggu_web_front_corpus_detail_title] {\n\tfont-size: 1.125rem;\n}\n\n[raggu_web_front_corpus_detail_title_skeleton] {\n\tdisplay: block;\n\theight: 1.5rem;\n\twidth: 10rem;\n}\n\n[raggu_web_front_corpus_detail_chips] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tgap: 0.375rem;\n}\n\n[raggu_web_front_corpus_detail_chips]:not(:empty) {\n\tmargin-top: 0.625rem;\n}\n\n[raggu_web_front_corpus_detail_type_chip] {\n\tborder-color: color-mix(in oklab, var(--accent-line) 60%, transparent);\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_detail_close] {\n\tdisplay: inline-flex;\n\twidth: 2rem;\n\theight: 2rem;\n\tflex-shrink: 0;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms var(--ease-out-quint), color 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_detail_close]:hover {\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_detail_scroll] {\n\tdisplay: block;\n\tmargin-top: 0.75rem;\n\tmin-height: 0;\n\tflex: 1;\n\toverflow-y: auto;\n\tpadding: 0 0.75rem 0.5rem;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_corpus_detail_lines] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_corpus_detail_line1],\n[raggu_web_front_corpus_detail_line2],\n[raggu_web_front_corpus_detail_line3] {\n\theight: 0.75rem;\n}\n\n[raggu_web_front_corpus_detail_line2] { width: 92%; }\n[raggu_web_front_corpus_detail_line3] { width: 74%; }\n\n[raggu_web_front_corpus_detail_failed] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_detail_description] {\n\tfont-size: 0.875rem;\n\tline-height: 1.65;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_detail_dense] [raggu_web_front_corpus_detail_description] {\n\tfont-size: 0.85rem;\n}\n\n[raggu_web_front_corpus_detail_relations] {\n\tdisplay: block;\n\tmargin-top: 1.5rem;\n}\n\n[raggu_web_front_corpus_detail_relations_list] {\n\tmargin-top: 0.75rem;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[raggu_web_front_corpus_detail_relations_list] > * + * {\n\tborder-top: 1px solid var(--edge);\n}\n\n[raggu_web_front_corpus_detail_relation] {\n\tdisplay: grid;\n\twidth: 100%;\n\tgrid-template-columns: auto 1fr;\n\talign-items: baseline;\n\tcolumn-gap: 0.75rem;\n\tpadding: 0.625rem 0;\n\ttext-align: left;\n}\n\n[raggu_web_front_corpus_detail_relation_type] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.62rem;\n\tletter-spacing: 0.08em;\n\ttext-transform: uppercase;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_detail_relation_out] [raggu_web_front_corpus_detail_relation_type] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_detail_relation_other] {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tcolor: var(--text-2);\n\ttransition: color 200ms ease;\n}\n\n[raggu_web_front_corpus_detail_relation]:hover [raggu_web_front_corpus_detail_relation_other] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_detail_chunks] {\n\tmargin: 1.5rem -0.25rem 0 -0.5rem;\n}\n\n[raggu_web_front_corpus_detail_chunks] [raggu_web_front_disclosure_body] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.75rem;\n}\n\n[raggu_web_front_corpus_detail_chunk] {\n\tdisplay: block;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tbackground: color-mix(in oklab, var(--surface) 35%, transparent);\n\tpadding: 0.75rem;\n}\n\n[raggu_web_front_corpus_detail_chunk_text] {\n\tmargin-top: 0.5rem;\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_detail_ask] {\n\tmargin-top: 0.5rem;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-inset);\n\tpadding: 0.75rem 1rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tbackground: var(--accent);\n\tcolor: var(--accent-ink);\n\ttransition: background-color 200ms ease, transform 200ms ease;\n}\n\n[raggu_web_front_corpus_detail_ask]:hover {\n\tbackground: var(--accent-hover);\n}\n\n[raggu_web_front_corpus_detail_ask]:active {\n\ttransform: translateY(1px);\n}\n");
})($ || ($ = {}));
//raggu/web/front/corpus/detail/-css/detail.view.css.ts
;
	($.$raggu_web_front_corpus_chat) = class $raggu_web_front_corpus_chat extends ($.$mol_view) {
		chat_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_chat_label"));
		}
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		Head_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.chat_label()));
			return obj;
		}
		head_tools(){
			return [];
		}
		Head_tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.head_tools()));
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ([(this.Head_label()), (this.Head_tools())]);
			return obj;
		}
		scroll_content(){
			return [];
		}
		Scroll(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.scroll_content()));
			return obj;
		}
		starters(){
			return [];
		}
		Starters(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ((this.starters()));
			return obj;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		placeholder(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_placeholder"));
		}
		draft(next){
			if(next !== undefined) return next;
			return "";
		}
		draft_input(next){
			if(next !== undefined) return next;
			return null;
		}
		draft_key(next){
			if(next !== undefined) return next;
			return null;
		}
		Input(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("textarea");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"rows": 1, 
				"placeholder": (this.placeholder()), 
				"aria-label": (this.placeholder())
			});
			(obj.field) = () => ({...(this.$.$mol_view.prototype.field.call(obj)), "value": (this.draft())});
			(obj.event) = () => ({"input": (next) => (this.draft_input(next)), "keydown": (next) => (this.draft_key(next))});
			return obj;
		}
		action(){
			return [];
		}
		Action(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.action()));
			return obj;
		}
		Form(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("form");
			(obj.event) = () => ({"submit": (next) => (this.submit(next))});
			(obj.sub) = () => ([(this.Input()), (this.Action())]);
			return obj;
		}
		engine(){
			return "mix";
		}
		sweep_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_sweep_label"));
		}
		sweep(next){
			if(next !== undefined) return next;
			return null;
		}
		Sweep_icon(){
			const obj = new this.$.$raggu_web_front_icon_sweep();
			return obj;
		}
		hide_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_hide_label"));
		}
		hide(next){
			if(next !== undefined) return next;
			return null;
		}
		Hide_icon(){
			const obj = new this.$.$raggu_web_front_icon_close();
			return obj;
		}
		empty_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_empty_title"));
		}
		Empty_title(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.empty_title()));
			return obj;
		}
		empty_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_empty_hint"));
		}
		Empty_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.empty_hint()));
			return obj;
		}
		thread(){
			return [];
		}
		entry_text(id){
			return "";
		}
		User_text(id){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.entry_text(id)));
			return obj;
		}
		agent_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_agent_label"));
		}
		Agent_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.agent_label()));
			return obj;
		}
		answer(id){
			return [];
		}
		Answer(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.answer(id)));
			return obj;
		}
		agent_sources(id){
			return [];
		}
		Agent_sources(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.agent_sources(id)));
			return obj;
		}
		Streaming_label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.agent_label()));
			return obj;
		}
		streaming_answer(){
			return [];
		}
		Streaming_answer(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.streaming_answer()));
			return obj;
		}
		strong_text(id){
			return "";
		}
		citation_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_citation_label"));
		}
		ref_id(id){
			return "";
		}
		ref_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		ref_text(id){
			return "";
		}
		Ping_wave(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		Ping_dot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			return obj;
		}
		Ping(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.Ping_wave()), (this.Ping_dot())]);
			return obj;
		}
		thinking_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_thinking_label"));
		}
		Thinking(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.thinking_label()));
			return obj;
		}
		elapsed(){
			return "";
		}
		Elapsed(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.elapsed()));
			return obj;
		}
		Pending_head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Ping()), 
				(this.Thinking()), 
				(this.Elapsed())
			]);
			return obj;
		}
		thinking_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_thinking_hint"));
		}
		Thinking_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.thinking_hint()));
			return obj;
		}
		Bar1(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Bar2(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Bar3(){
			const obj = new this.$.$raggu_web_front_skeleton();
			return obj;
		}
		Bars(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Bar1()), 
				(this.Bar2()), 
				(this.Bar3())
			]);
			return obj;
		}
		Pending_box(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Pending_head()), 
				(this.Thinking_hint()), 
				(this.Bars())
			]);
			return obj;
		}
		failure_text(){
			return "";
		}
		Failure_title(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.failure_text()));
			return obj;
		}
		failure_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_failure_hint"));
		}
		Failure_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.failure_hint()));
			return obj;
		}
		starter_send(id, next){
			if(next !== undefined) return next;
			return null;
		}
		starter_text(id){
			return "";
		}
		Starter_button(id){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.starter_send(id, next)));
			(obj.sub) = () => ([(this.starter_text(id))]);
			return obj;
		}
		send_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_send_label"));
		}
		send_enabled(){
			return false;
		}
		send_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Send_icon(){
			const obj = new this.$.$raggu_web_front_icon_send();
			return obj;
		}
		stop_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_stop_label"));
		}
		stop(next){
			if(next !== undefined) return next;
			return null;
		}
		Stop_icon(){
			const obj = new this.$.$raggu_web_front_icon_stop();
			return obj;
		}
		sources_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_sources_label"));
		}
		sources_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_sources_hint"));
		}
		sources_count(id){
			return "";
		}
		meta_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_meta_label"));
		}
		Meta_icon(id){
			const obj = new this.$.$raggu_web_front_icon_info();
			return obj;
		}
		meta_body(id){
			return [];
		}
		Meta_body(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.meta_body(id)));
			return obj;
		}
		Meta(id){
			const obj = new this.$.$raggu_web_front_pop();
			(obj.hint) = () => ((this.meta_label()));
			(obj.bubble_width) = () => ("17rem");
			(obj.trigger_content) = () => ([(this.Meta_icon(id))]);
			(obj.bubble_content) = () => ([(this.Meta_body(id))]);
			return obj;
		}
		sources_body(id){
			return [];
		}
		meta_rows(id){
			return [];
		}
		meta_row_label(id){
			return "";
		}
		Meta_row_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("dt");
			(obj.text) = () => ((this.meta_row_label(id)));
			return obj;
		}
		meta_row_value(id){
			return "";
		}
		Meta_row_value(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dd");
			(obj.sub) = () => ([(this.meta_row_value(id))]);
			return obj;
		}
		energy_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_energy_label"));
		}
		Meta_energy_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.energy_label()));
			return obj;
		}
		meta_energy(id){
			return "";
		}
		Meta_energy_value(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.meta_energy(id))]);
			return obj;
		}
		plan_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_plan_label"));
		}
		Meta_plan_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.plan_label()));
			return obj;
		}
		meta_plan(id){
			return [];
		}
		Meta_plan_list(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ol");
			(obj.sub) = () => ((this.meta_plan(id)));
			return obj;
		}
		plan_index(id){
			return "";
		}
		Plan_index(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.plan_index(id))]);
			return obj;
		}
		plan_text(id){
			return "";
		}
		source_group_label(id){
			return "";
		}
		Source_group_label(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.source_group_label(id)));
			return obj;
		}
		source_group_items(id){
			return [];
		}
		Source_group_list(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ((this.source_group_items(id)));
			return obj;
		}
		source_entity_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		source_entity_text(id){
			return "";
		}
		source_relation_text(id){
			return "";
		}
		source_chunk_text(id){
			return "";
		}
		Source_chunk_text(id){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.source_chunk_text(id)));
			return obj;
		}
		no_sources_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_no_sources_label"));
		}
		dom_name(){
			return "section";
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		attr(){
			return {...(super.attr()), "aria-label": (this.chat_label())};
		}
		sub(){
			return [
				(this.Glass()), 
				(this.Head()), 
				(this.Scroll()), 
				(this.Starters()), 
				(this.Form())
			];
		}
		Engine(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("span");
			(obj.text) = () => ((this.engine()));
			return obj;
		}
		Sweep(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.sweep_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.sweep_label())});
			(obj.click) = (next) => ((this.sweep(next)));
			(obj.sub) = () => ([(this.Sweep_icon())]);
			return obj;
		}
		Hide(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.hide_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.hide_label())});
			(obj.click) = (next) => ((this.hide(next)));
			(obj.sub) = () => ([(this.Hide_icon())]);
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Empty_title()), (this.Empty_hint())]);
			return obj;
		}
		Thread(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ol");
			(obj.sub) = () => ((this.thread()));
			return obj;
		}
		User(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.User_text(id))]);
			return obj;
		}
		Agent(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([
				(this.Agent_label(id)), 
				(this.Answer(id)), 
				(this.Agent_sources(id))
			]);
			return obj;
		}
		Streaming(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Streaming_label()), (this.Streaming_answer())]);
			return obj;
		}
		Caret(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "aria-hidden": "true"});
			return obj;
		}
		Strong(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("strong");
			(obj.sub) = () => ([(this.strong_text(id))]);
			return obj;
		}
		Ref(id){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.citation_label()));
			(obj.attr) = () => ({
				...(this.$.$mol_button.prototype.attr.call(obj)), 
				"class": "ref", 
				"data-ref": (this.ref_id(id))
			});
			(obj.click) = (next) => ((this.ref_pick(id, next)));
			(obj.sub) = () => ([(this.ref_text(id))]);
			return obj;
		}
		Ref_muted(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"class": "ref ref--muted", 
				"data-ref": (this.ref_id(id))
			});
			(obj.sub) = () => ([(this.ref_text(id))]);
			return obj;
		}
		Pending(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Pending_box())]);
			return obj;
		}
		Failure(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Failure_title()), (this.Failure_hint())]);
			return obj;
		}
		Starter(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Starter_button(id))]);
			return obj;
		}
		Send(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.send_label()));
			(obj.attr) = () => ({
				...(this.$.$mol_button.prototype.attr.call(obj)), 
				"type": "submit", 
				"aria-label": (this.send_label())
			});
			(obj.enabled) = () => ((this.send_enabled()));
			(obj.click) = (next) => ((this.send_click(next)));
			(obj.sub) = () => ([(this.Send_icon())]);
			return obj;
		}
		Stop(){
			const obj = new this.$.$mol_button();
			(obj.hint) = () => ((this.stop_label()));
			(obj.attr) = () => ({...(this.$.$mol_button.prototype.attr.call(obj)), "aria-label": (this.stop_label())});
			(obj.click) = (next) => ((this.stop(next)));
			(obj.sub) = () => ([(this.Stop_icon())]);
			return obj;
		}
		Sources(id){
			const obj = new this.$.$raggu_web_front_disclosure();
			(obj.label) = () => ((this.sources_label()));
			(obj.hint) = () => ((this.sources_hint()));
			(obj.count_text) = () => ((this.sources_count(id)));
			(obj.actions) = () => ([(this.Meta(id))]);
			(obj.body) = () => ((this.sources_body(id)));
			return obj;
		}
		Meta_title(id){
			const obj = new this.$.$raggu_web_front_label();
			(obj.text) = () => ((this.meta_label()));
			return obj;
		}
		Meta_rows(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dl");
			(obj.sub) = () => ((this.meta_rows(id)));
			return obj;
		}
		Meta_row(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Meta_row_label(id)), (this.Meta_row_value(id))]);
			return obj;
		}
		Meta_energy(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Meta_energy_label(id)), (this.Meta_energy_value(id))]);
			return obj;
		}
		Meta_plan(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Meta_plan_label(id)), (this.Meta_plan_list(id))]);
			return obj;
		}
		Plan_item(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Plan_index(id)), (this.plan_text(id))]);
			return obj;
		}
		Source_group(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Source_group_label(id)), (this.Source_group_list(id))]);
			return obj;
		}
		Source_entity(id){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.source_entity_pick(id, next)));
			(obj.sub) = () => ([(this.source_entity_text(id))]);
			return obj;
		}
		Source_relation(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.source_relation_text(id))]);
			return obj;
		}
		Source_chunk(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("li");
			(obj.sub) = () => ([(this.Source_chunk_text(id))]);
			return obj;
		}
		No_sources(id){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.no_sources_label()));
			return obj;
		}
		entities_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_entities_label"));
		}
		relations_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_relations_label"));
		}
		chunks_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_chunks_label"));
		}
		engine_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_engine_label"));
		}
		top_k_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_top_k_label"));
		}
		rerank_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_rerank_label"));
		}
		retrieval_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_retrieval_label"));
		}
		generation_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_generation_label"));
		}
		total_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_total_label"));
		}
		on_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_on_label"));
		}
		off_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_off_label"));
		}
		elapsed_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_elapsed_label"));
		}
		failed_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_chat_failed_label"));
		}
	};
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Head_label"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Head_tools"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Head"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Scroll"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Starters"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "submit"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "draft"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "draft_input"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "draft_key"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Input"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Action"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Form"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "sweep"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Sweep_icon"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "hide"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Hide_icon"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Empty_title"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Empty_hint"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "User_text"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Agent_label"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Answer"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Agent_sources"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Streaming_label"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Streaming_answer"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "ref_pick"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Ping_wave"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Ping_dot"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Ping"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Thinking"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Elapsed"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Pending_head"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Thinking_hint"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Bar1"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Bar2"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Bar3"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Bars"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Pending_box"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Failure_title"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Failure_hint"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "starter_send"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Starter_button"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "send_click"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Send_icon"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "stop"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Stop_icon"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_icon"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_body"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_row_label"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_row_value"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_energy_label"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_energy_value"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_plan_label"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_plan_list"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Plan_index"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_group_label"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_group_list"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "source_entity_pick"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_chunk_text"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Engine"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Sweep"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Hide"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Empty"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Thread"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "User"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Agent"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Streaming"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Caret"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Strong"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Ref"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Ref_muted"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Pending"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Failure"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Starter"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Send"));
	($mol_mem(($.$raggu_web_front_corpus_chat.prototype), "Stop"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Sources"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_title"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_rows"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_row"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_energy"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Meta_plan"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Plan_item"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_group"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_entity"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_relation"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "Source_chunk"));
	($mol_mem_key(($.$raggu_web_front_corpus_chat.prototype), "No_sources"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_corpus_chat extends $.$raggu_web_front_corpus_chat {
            corpus() {
                return this.viewer().corpus();
            }
            entries() {
                return this.viewer().entries(this.corpus());
            }
            pending() {
                return this.viewer().pending(this.corpus());
            }
            partial() {
                return this.viewer().partial(this.corpus());
            }
            failure() {
                return this.viewer().failure(this.corpus());
            }
            engine() {
                return $raggu_web_front_lib_settings.value().useGraph ? 'mix' : 'naive';
            }
            head_tools() {
                return [this.Engine(), ...this.entries().length ? [this.Sweep()] : [], this.Hide()];
            }
            sweep() {
                this.viewer().clear_thread();
            }
            hide() {
                this.viewer().chat_open(false);
            }
            scroll_content() {
                if (this.entries().length === 0 && !this.pending())
                    return [this.Empty()];
                return [this.Thread()];
            }
            thread() {
                return [
                    ...this.entries().map((entry, index) => entry.role === 'user' ? this.User(index) : this.Agent(index)),
                    ...this.pending() ? [this.partial() ? this.Streaming() : this.Pending()] : [],
                    ...this.failure() ? [this.Failure()] : [],
                ];
            }
            entry(index) {
                return this.entries()[index];
            }
            entry_text(index) {
                return this.entry(index).content;
            }
            segments(index) {
                const content = index < 0 ? this.partial() ?? '' : this.entry(index).content;
                return $raggu_web_front_lib_cite_parse(content, (id, type) => this.resolve(id, type));
            }
            resolve(id, type) {
                const model = this.viewer().shown_now()?.model;
                if (!model)
                    return undefined;
                if (type === 'entity') {
                    const index = model.index_of.get(id);
                    return index === undefined ? undefined : model.nodes[index].label;
                }
                if (type === 'relation') {
                    const index = model.edge_index_of.get(id);
                    return index === undefined ? undefined : $raggu_web_front_lib_relation_name(model.edges[index].relation_type);
                }
                return undefined;
            }
            render_segments(index) {
                return this.segments(index).map((segment, position) => {
                    const key = `${index}:${position}`;
                    if (segment.kind === 'text')
                        return segment.value;
                    if (segment.kind === 'strong')
                        return this.Strong(key);
                    return segment.type === 'entity' ? this.Ref(key) : this.Ref_muted(key);
                });
            }
            answer(index) {
                return this.render_segments(index);
            }
            streaming_answer() {
                return [...this.render_segments(-1), this.Caret()];
            }
            segment(key) {
                const [index, position] = key.split(':').map(Number);
                return this.segments(index)[position];
            }
            strong_text(key) {
                const segment = this.segment(key);
                return segment.kind === 'strong' ? segment.value : '';
            }
            ref_id(key) {
                const segment = this.segment(key);
                return segment.kind === 'ref' ? segment.id : '';
            }
            ref_text(key) {
                const segment = this.segment(key);
                return segment.kind === 'ref' ? segment.text : '';
            }
            ref_pick(key) {
                this.viewer().selected(this.ref_id(key));
            }
            trace(index) {
                return this.entry(index).trace ?? null;
            }
            agent_sources(index) {
                return this.trace(index) ? [this.Sources(index)] : [];
            }
            sources_total(index) {
                const trace = this.trace(index);
                return (trace.entities?.length ?? 0) + (trace.relations?.length ?? 0) + (trace.chunks?.length ?? 0) + (trace.communities?.length ?? 0);
            }
            sources_count(index) {
                const total = this.sources_total(index);
                return total > 0 ? String(total) : '';
            }
            sources_body(index) {
                const trace = this.trace(index);
                return [
                    ...trace.entities?.length ? [this.Source_group(`${index}:entities`)] : [],
                    ...trace.relations?.length ? [this.Source_group(`${index}:relations`)] : [],
                    ...trace.chunks?.length ? [this.Source_group(`${index}:chunks`)] : [],
                    ...this.sources_total(index) === 0 ? [this.No_sources(index)] : [],
                ];
            }
            source_group_label(key) {
                const kind = key.split(':')[1];
                if (kind === 'entities')
                    return this.entities_label();
                if (kind === 'relations')
                    return this.relations_label();
                return this.chunks_label();
            }
            source_group_items(key) {
                const [index, kind] = key.split(':');
                const trace = this.trace(Number(index));
                if (kind === 'entities')
                    return (trace.entities ?? []).slice(0, 24).map((_, i) => this.Source_entity(`${index}:${i}`));
                if (kind === 'relations')
                    return (trace.relations ?? []).slice(0, 16).map((_, i) => this.Source_relation(`${index}:${i}`));
                return (trace.chunks ?? []).slice(0, 5).map((_, i) => this.Source_chunk(`${index}:${i}`));
            }
            pair(key) {
                const [index, i] = key.split(':').map(Number);
                return { trace: this.trace(index), i };
            }
            source_entity_text(key) {
                const { trace, i } = this.pair(key);
                return trace.entities[i].label;
            }
            source_entity_pick(key) {
                const { trace, i } = this.pair(key);
                this.viewer().selected(trace.entities[i].id);
            }
            source_relation_text(key) {
                const { trace, i } = this.pair(key);
                return $raggu_web_front_lib_relation_name(trace.relations[i].relation_type);
            }
            source_chunk_text(key) {
                const { trace, i } = this.pair(key);
                const content = trace.chunks[i].content;
                return content.slice(0, 260) + (content.length > 260 ? '…' : '');
            }
            meta_list(index) {
                const trace = this.trace(index);
                return [
                    [this.engine_label(), trace.engine],
                    [this.top_k_label(), String(trace.top_k)],
                    [this.rerank_label(), trace.rerank ? this.on_label() : this.off_label()],
                    [this.retrieval_label(), $raggu_web_front_lib_ms(trace.timings.retrieval_ms)],
                    [this.generation_label(), $raggu_web_front_lib_ms(trace.timings.generation_ms)],
                    [this.total_label(), $raggu_web_front_lib_ms(trace.timings.total_ms)],
                ];
            }
            meta_body(index) {
                const trace = this.trace(index);
                const plan = trace.query_plan?.used && trace.query_plan.sub_questions?.length;
                return [
                    this.Meta_title(index),
                    this.Meta_rows(index),
                    this.Meta_energy(index),
                    ...plan ? [this.Meta_plan(index)] : [],
                ];
            }
            meta_rows(index) {
                return this.meta_list(index).map((_, row) => this.Meta_row(`${index}:${row}`));
            }
            meta_row_label(key) {
                const [index, row] = key.split(':').map(Number);
                return this.meta_list(index)[row][0];
            }
            meta_row_value(key) {
                const [index, row] = key.split(':').map(Number);
                return this.meta_list(index)[row][1];
            }
            meta_energy(index) {
                return $raggu_web_front_lib_watt_hours(this.trace(index).energy.watt_hours);
            }
            meta_plan(index) {
                const questions = this.trace(index).query_plan?.sub_questions ?? [];
                return questions.map((_, i) => this.Plan_item(`${index}:${i}`));
            }
            plan_index(key) {
                return `${Number(key.split(':')[1]) + 1}.`;
            }
            plan_text(key) {
                const [index, i] = key.split(':').map(Number);
                return ' ' + (this.trace(index).query_plan?.sub_questions?.[i] ?? '');
            }
            elapsed() {
                const started = this.viewer().started(this.corpus());
                const now = this.$.$mol_state_time.now(250);
                const seconds = started ? Math.max(0, Math.floor((now - started) / 1000)) : 0;
                return this.elapsed_label().replace('{n}', String(seconds));
            }
            failure_text() {
                return this.failed_label();
            }
            suggestions() {
                const corpus = this.corpus();
                return $raggu_web_front_data_ready(() => $raggu_web_front_data.suggestions(`${corpus}|${$raggu_web_front_lib_lang()}`)) ?? [];
            }
            starters() {
                if (this.entries().length > 0)
                    return [];
                return this.suggestions().slice(0, 3).map((_, index) => this.Starter(index));
            }
            starter_text(index) {
                return this.suggestions()[index];
            }
            starter_send(index) {
                this.send(this.suggestions()[index]);
            }
            draft(next) {
                return next ?? '';
            }
            draft_input(event) {
                this.draft(event.target.value);
            }
            draft_key(event) {
                if (event.key !== 'Enter' || event.shiftKey)
                    return;
                event.preventDefault();
                this.send(this.draft());
            }
            submit(event) {
                event.preventDefault();
                this.send(this.draft());
            }
            send_click(event) {
                event?.preventDefault();
                this.send(this.draft());
            }
            send_enabled() {
                return this.draft().trim().length > 0;
            }
            send(text) {
                if (!text.trim() || this.pending())
                    return;
                this.viewer().failed_text = () => this.failed_label();
                this.draft('');
                this.viewer().send(text);
            }
            stop() {
                this.viewer().stop();
            }
            action() {
                return [this.pending() ? this.Stop() : this.Send()];
            }
            follow() {
                this.entries().length;
                this.pending();
                const scroll = this.Scroll().dom_node();
                new this.$.$mol_after_frame(() => scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' }));
                return null;
            }
            follow_stream() {
                const partial = this.partial();
                if (!partial)
                    return null;
                const scroll = this.Scroll().dom_node();
                new this.$.$mol_after_frame(() => {
                    if (scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 96)
                        scroll.scrollTop = scroll.scrollHeight;
                });
                return null;
            }
            auto() {
                this.follow();
                this.follow_stream();
                return [];
            }
        }
        __decorate([
            $mol_mem_key
        ], $raggu_web_front_corpus_chat.prototype, "segments", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_chat.prototype, "draft", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_chat.prototype, "follow", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus_chat.prototype, "follow_stream", null);
        $$.$raggu_web_front_corpus_chat = $raggu_web_front_corpus_chat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/corpus/chat/chat.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/corpus/chat/chat.view.css", "@keyframes ragu-chat-in {\n\tfrom { opacity: 0; transform: translateX(40px); }\n\tto { opacity: 1; transform: none; }\n}\n\n[raggu_web_front_corpus_chat] {\n\tpointer-events: auto;\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex-direction: column;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n\tanimation: ragu-chat-in 520ms cubic-bezier(0.25, 1.05, 0.4, 1) both;\n}\n\n[raggu_web_front_corpus_chat_head] {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tgap: 0.75rem;\n\tpadding: 0.5rem 0.75rem 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_head_tools] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.125rem;\n}\n\n[raggu_web_front_corpus_chat_engine] {\n\tmargin-right: 0.25rem;\n}\n\n[raggu_web_front_corpus_chat_sweep],\n[raggu_web_front_corpus_chat_hide] {\n\tdisplay: inline-flex;\n\twidth: 2rem;\n\theight: 2rem;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms var(--ease-out-quint), color 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_chat_sweep]:hover,\n[raggu_web_front_corpus_chat_hide]:hover {\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_sweep_icon],\n[raggu_web_front_corpus_chat_hide_icon] {\n\twidth: 1rem;\n\theight: 1rem;\n}\n\n[raggu_web_front_corpus_chat_scroll] {\n\tdisplay: block;\n\tflex: 1;\n\tmin-height: 0;\n\toverflow-y: auto;\n\tpadding: 0 0.75rem 0.5rem;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_corpus_chat_empty] {\n\tdisplay: flex;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: flex-end;\n\tpadding-bottom: 0.5rem;\n}\n\n[raggu_web_front_corpus_chat_empty_title] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_empty_hint] {\n\tmargin-top: 0.375rem;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_chat_thread] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 1.25rem;\n\tpadding: 0.5rem 0;\n}\n\n[raggu_web_front_corpus_chat_user] {\n\tdisplay: flex;\n\tjustify-content: flex-end;\n}\n\n[raggu_web_front_corpus_chat_user_text] {\n\tmax-width: 85%;\n\tborder-radius: var(--radius-inset);\n\tborder-bottom-right-radius: 6px;\n\tbackground: var(--accent);\n\tpadding: 0.625rem 1rem;\n\tfont-size: 0.9375rem;\n\tline-height: 1.625;\n\tcolor: var(--accent-ink);\n}\n\n[raggu_web_front_corpus_chat_agent],\n[raggu_web_front_corpus_chat_streaming] {\n\tdisplay: block;\n}\n\n[raggu_web_front_corpus_chat_agent_label],\n[raggu_web_front_corpus_chat_streaming_label] {\n\tmargin-bottom: 0.5rem;\n}\n\n[raggu_web_front_corpus_chat_answer],\n[raggu_web_front_corpus_chat_streaming_answer] {\n\tdisplay: block;\n\tfont-size: 0.9375rem;\n\tline-height: 1.75;\n\twhite-space: pre-wrap;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_strong] {\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_caret] {\n\tdisplay: inline-block;\n\twidth: 0.5em;\n\theight: 1em;\n\tmargin-left: 0.15em;\n\tvertical-align: -0.12em;\n\tborder-radius: 2px;\n\tbackground: var(--accent);\n\tanimation: ragu-caret 1s steps(1) infinite;\n}\n\n[raggu_web_front_corpus_chat] .ref {\n\tposition: relative;\n\tdisplay: inline;\n\tborder: 0;\n\tmargin: 0 -0.1em;\n\tpadding: 0.08em 0.3em;\n\tborder-radius: 5px;\n\tbackground: var(--accent-wash);\n\tcolor: var(--accent);\n\tfont: inherit;\n\ttext-decoration: none;\n\tcursor: pointer;\n\ttransition: background-color 180ms var(--ease-out-quint), color 180ms;\n}\n\n[raggu_web_front_corpus_chat] .ref:hover,\n[raggu_web_front_corpus_chat] .ref:focus-visible {\n\tbackground: color-mix(in oklab, var(--accent) 22%, transparent);\n}\n\n[raggu_web_front_corpus_chat] .ref--muted {\n\tbackground: color-mix(in oklab, var(--text-3) 14%, transparent);\n\tcolor: var(--text-2);\n\tcursor: default;\n}\n\n[raggu_web_front_corpus_chat] .ref--muted:hover {\n\tbackground: color-mix(in oklab, var(--text-3) 20%, transparent);\n}\n\n[raggu_web_front_corpus_chat] .ref::after {\n\tcontent: attr(data-ref);\n\tposition: absolute;\n\tbottom: calc(100% + 7px);\n\tleft: 50%;\n\ttransform: translateX(-50%) translateY(3px);\n\tz-index: 5;\n\topacity: 0;\n\tpointer-events: none;\n\twhite-space: nowrap;\n\tfont-family: var(--font-mono);\n\tfont-size: 10px;\n\tletter-spacing: 0.02em;\n\tcolor: var(--text-2);\n\tbackground: var(--surface-2);\n\tborder: 1px solid var(--edge);\n\tborder-radius: 6px;\n\tpadding: 3px 6px;\n\tbox-shadow: var(--elev-pop);\n\ttransition: opacity 160ms var(--ease-out-quint), transform 160ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_chat] .ref:hover::after,\n[raggu_web_front_corpus_chat] .ref:focus-visible::after {\n\topacity: 1;\n\ttransform: translateX(-50%) translateY(0);\n}\n\n[raggu_web_front_corpus_chat_pending_box] {\n\tdisplay: block;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tbackground: color-mix(in oklab, var(--surface) 40%, transparent);\n\tpadding: 1rem;\n}\n\n[raggu_web_front_corpus_chat_pending_head] {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.625rem;\n}\n\n[raggu_web_front_corpus_chat_ping] {\n\tposition: relative;\n\tdisplay: flex;\n\twidth: 0.5rem;\n\theight: 0.5rem;\n}\n\n[raggu_web_front_corpus_chat_ping_wave] {\n\tposition: absolute;\n\tdisplay: inline-flex;\n\twidth: 0.5rem;\n\theight: 0.5rem;\n\tborder-radius: 9999px;\n\tbackground: var(--accent);\n\topacity: 0.6;\n\tanimation: ragu-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n}\n\n[raggu_web_front_corpus_chat_ping_dot] {\n\tposition: relative;\n\tdisplay: inline-flex;\n\twidth: 0.5rem;\n\theight: 0.5rem;\n\tborder-radius: 9999px;\n\tbackground: var(--accent);\n}\n\n[raggu_web_front_corpus_chat_thinking] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_elapsed] {\n\tmargin-left: auto;\n\tfont-variant-numeric: tabular-nums;\n}\n\n[raggu_web_front_corpus_chat_thinking_hint] {\n\tmargin-top: 0.5rem;\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_chat_bars] {\n\tmargin-top: 0.75rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_corpus_chat_bar1],\n[raggu_web_front_corpus_chat_bar2],\n[raggu_web_front_corpus_chat_bar3] {\n\theight: 0.5rem;\n\tborder-radius: 9999px;\n\tbackground-color: color-mix(in oklab, var(--edge) 50%, transparent);\n}\n\n[raggu_web_front_corpus_chat_bar2] { width: 82%; }\n[raggu_web_front_corpus_chat_bar3] { width: 64%; }\n\n[raggu_web_front_corpus_chat_failure] {\n\tdisplay: block;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--accent-line);\n\tbackground: var(--accent-wash);\n\tpadding: 0.75rem 1rem;\n}\n\n[raggu_web_front_corpus_chat_failure_title] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_chat_failure_hint] {\n\tmargin-top: 0.25rem;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_chat_starters] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 0.375rem;\n\tpadding: 0 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_starters]:not(:empty) {\n\tpadding-bottom: 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_starter_button] {\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tpadding: 0.5rem 0.75rem;\n\ttext-align: left;\n\tfont-size: 0.75rem;\n\tline-height: 1.375;\n\tcolor: var(--text-2);\n\ttransition: border-color 200ms ease, background-color 200ms ease, color 200ms ease;\n}\n\n[raggu_web_front_corpus_chat_starter_button]:hover {\n\tborder-color: var(--accent-line);\n\tbackground: var(--accent-wash);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_form] {\n\tdisplay: flex;\n\talign-items: flex-end;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tbackground: color-mix(in oklab, var(--surface) 50%, transparent);\n\tpadding: 0.375rem;\n}\n\n[raggu_web_front_corpus_chat_input] {\n\tmax-height: 8rem;\n\tmin-height: 2.5rem;\n\tflex: 1;\n\tresize: none;\n\tbackground: transparent;\n\tpadding: 0.5rem 0.625rem;\n\tfont-size: 0.9375rem;\n\tline-height: 1.625;\n\tcolor: var(--text);\n\toutline: none;\n\tscrollbar-width: thin;\n\tscrollbar-color: var(--edge-strong) transparent;\n}\n\n[raggu_web_front_corpus_chat_input]:focus-visible {\n\toutline: none;\n}\n\n[raggu_web_front_corpus_chat_action] {\n\tdisplay: flex;\n}\n\n[raggu_web_front_corpus_chat_send],\n[raggu_web_front_corpus_chat_stop] {\n\tdisplay: flex;\n\twidth: 2.5rem;\n\theight: 2.5rem;\n\tflex-shrink: 0;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 11px;\n\ttransition: all 200ms ease;\n}\n\n[raggu_web_front_corpus_chat_send] {\n\tbackground: var(--accent);\n\tcolor: var(--accent-ink);\n}\n\n[raggu_web_front_corpus_chat_send]:hover {\n\tbackground: var(--accent-hover);\n}\n\n[raggu_web_front_corpus_chat_send]:active {\n\ttransform: translateY(1px);\n}\n\n[raggu_web_front_corpus_chat_send][disabled] {\n\tpointer-events: none;\n\topacity: 0.4;\n}\n\n[raggu_web_front_corpus_chat_stop] {\n\tborder: 1px solid var(--edge-strong);\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_chat_stop]:hover {\n\tborder-color: var(--accent-line);\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_chat_sources] {\n\tmargin: 1rem -0.25rem 0 -0.5rem;\n}\n\n[raggu_web_front_corpus_chat_sources] [raggu_web_front_disclosure_body] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 1rem;\n}\n\n[raggu_web_front_corpus_chat_source_group] {\n\tdisplay: block;\n}\n\n[raggu_web_front_corpus_chat_source_group_label],\n[raggu_web_front_corpus_chat_meta_row_label],\n[raggu_web_front_corpus_chat_meta_energy_label],\n[raggu_web_front_corpus_chat_meta_plan_label] {\n\tfont-size: 9.5px;\n}\n\n[raggu_web_front_corpus_chat_source_group_list] {\n\tmargin-top: 0.5rem;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 0.375rem;\n}\n\n[raggu_web_front_corpus_chat_source_entity] {\n\tborder-radius: var(--radius-chip);\n\tborder: 1px solid color-mix(in oklab, var(--accent-line) 40%, transparent);\n\tpadding: 0.25rem 0.5rem;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--accent);\n\ttransition: background-color 200ms ease;\n}\n\n[raggu_web_front_corpus_chat_source_entity]:hover {\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_corpus_chat_source_relation] {\n\tborder-radius: var(--radius-chip);\n\tborder: 1px solid var(--edge);\n\tpadding: 0.25rem 0.5rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.68rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_chat_source_group_list]:has([raggu_web_front_corpus_chat_source_chunk]) {\n\tflex-direction: column;\n\tflex-wrap: nowrap;\n\tgap: 0.5rem;\n}\n\n[raggu_web_front_corpus_chat_source_chunk] {\n\tborder-radius: var(--radius-inset);\n\tborder: 1px solid var(--edge);\n\tbackground: color-mix(in oklab, var(--surface) 35%, transparent);\n\tpadding: 0.625rem 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_source_chunk_text] {\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_chat_no_sources] {\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_corpus_chat_meta] > [raggu_web_front_pop_trigger] {\n\tdisplay: inline-flex;\n\twidth: 1.75rem;\n\theight: 1.75rem;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--radius-inset);\n\tcolor: var(--text-3);\n\ttransition: background-color 200ms var(--ease-out-quint), color 200ms var(--ease-out-quint);\n}\n\n[raggu_web_front_corpus_chat_meta] > [raggu_web_front_pop_trigger]:hover {\n\tbackground: color-mix(in oklab, var(--text) 7%, transparent);\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_chat_meta] > [raggu_web_front_pop_trigger][raggu_web_front_pop_open=\"true\"] {\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_chat_meta_icon] {\n\twidth: 1rem;\n\theight: 1rem;\n}\n\n[raggu_web_front_corpus_chat_meta_body] {\n\tdisplay: block;\n\tpadding: 0.625rem 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_meta_rows] {\n\tmargin-top: 0.75rem;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(2, minmax(0, 1fr));\n\tcolumn-gap: 1rem;\n\trow-gap: 0.625rem;\n}\n\n[raggu_web_front_corpus_chat_meta_row] {\n\tdisplay: block;\n}\n\n[raggu_web_front_corpus_chat_meta_row_value] {\n\tmargin-top: 0.25rem;\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_chat_meta_energy] {\n\tmargin-top: 0.75rem;\n\tdisplay: flex;\n\talign-items: baseline;\n\tjustify-content: space-between;\n\tgap: 0.75rem;\n\tborder-top: 1px solid var(--edge);\n\tpadding-top: 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_meta_energy_value] {\n\tfont-family: var(--font-mono);\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_corpus_chat_meta_plan] {\n\tmargin-top: 0.75rem;\n\tdisplay: block;\n\tborder-top: 1px solid var(--edge);\n\tpadding-top: 0.75rem;\n}\n\n[raggu_web_front_corpus_chat_meta_plan_list] {\n\tmargin-top: 0.5rem;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 0.375rem;\n}\n\n[raggu_web_front_corpus_chat_plan_item] {\n\tfont-size: 0.75rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_chat_plan_index] {\n\tfont-family: var(--font-mono);\n\tcolor: var(--accent);\n}\n");
})($ || ($ = {}));
//raggu/web/front/corpus/chat/-css/chat.view.css.ts
;
	($.$raggu_web_front_corpus) = class $raggu_web_front_corpus extends ($.$mol_view) {
		chat_open(){
			return false;
		}
		graph_open(){
			return true;
		}
		hint_only(){
			return true;
		}
		Spacer(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		row(){
			return [];
		}
		Row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.row()));
			return obj;
		}
		graph_column(){
			return [];
		}
		stage_content(){
			return [];
		}
		Failed_glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		failed_title(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_failed_title"));
		}
		Failed_title(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.failed_title()));
			return obj;
		}
		failed_hint(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_failed_hint"));
		}
		Failed_hint(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.failed_hint()));
			return obj;
		}
		retry(next){
			if(next !== undefined) return next;
			return null;
		}
		retry_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_retry_label"));
		}
		Failed_retry(){
			const obj = new this.$.$mol_button();
			(obj.click) = (next) => ((this.retry(next)));
			(obj.sub) = () => ([(this.retry_label())]);
			return obj;
		}
		loading_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_corpus_loading_label"));
		}
		percent(){
			return "";
		}
		cold(){
			return false;
		}
		viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"raggu_web_front_corpus_chatting": (this.chat_open()), 
				"raggu_web_front_corpus_graphing": (this.graph_open()), 
				"raggu_web_front_corpus_hint_only": (this.hint_only())
			};
		}
		sub(){
			return [(this.Spacer()), (this.Row())];
		}
		Graph(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.graph_column()));
			return obj;
		}
		Controls(){
			const obj = new this.$.$raggu_web_front_corpus_controls();
			(obj.viewer) = () => ((this.viewer()));
			return obj;
		}
		Stage(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.stage_content()));
			return obj;
		}
		Failed(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Failed_glass()), 
				(this.Failed_title()), 
				(this.Failed_hint()), 
				(this.Failed_retry())
			]);
			return obj;
		}
		Cold(){
			const obj = new this.$.$raggu_web_front_corpus_loader();
			(obj.label) = () => ((this.loading_label()));
			(obj.percent) = () => ((this.percent()));
			return obj;
		}
		Warm(){
			const obj = new this.$.$raggu_web_front_corpus_loader();
			(obj.quiet) = () => (true);
			(obj.label) = () => ((this.loading_label()));
			return obj;
		}
		Compact(){
			const obj = new this.$.$raggu_web_front_corpus_detail();
			(obj.viewer) = () => ((this.viewer()));
			(obj.dense) = () => (true);
			return obj;
		}
		Detail(){
			const obj = new this.$.$raggu_web_front_corpus_detail();
			(obj.viewer) = () => ((this.viewer()));
			(obj.hint) = () => (true);
			(obj.waiting) = () => ((this.cold()));
			return obj;
		}
		Chat(){
			const obj = new this.$.$raggu_web_front_corpus_chat();
			(obj.viewer) = () => ((this.viewer()));
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Spacer"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Row"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Failed_glass"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Failed_title"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Failed_hint"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "retry"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Failed_retry"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "viewer"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Graph"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Controls"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Stage"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Failed"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Cold"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Warm"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Compact"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Detail"));
	($mol_mem(($.$raggu_web_front_corpus.prototype), "Chat"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_corpus extends $.$raggu_web_front_corpus {
            chat_open() {
                return this.viewer().chat_open();
            }
            graph_open() {
                return this.viewer().graph_open();
            }
            hint_only() {
                return this.viewer().selected() === null;
            }
            cold() {
                return this.viewer().cold();
            }
            row() {
                const right = this.chat_open() ? this.Chat() : this.Detail();
                return this.graph_open() ? [this.Graph(), right] : [right];
            }
            graph_column() {
                const compact = this.chat_open() && this.viewer().selected() !== null;
                return [this.Controls(), this.Stage(), ...compact ? [this.Compact()] : []];
            }
            stage_content() {
                const viewer = this.viewer();
                if (viewer.graph_state().error)
                    return [this.Failed()];
                if (viewer.cold())
                    return [this.Cold()];
                if (viewer.warm())
                    return [this.Warm()];
                return [];
            }
            percent() {
                return this.viewer().graph_state().pending ? '' : `${Math.round(this.viewer().progress() * 100)}%`;
            }
            retry() {
                $raggu_web_front_data.retry();
            }
            stage_watch() {
                if (!this.graph_open()) {
                    this.viewer().stage(null);
                    return null;
                }
                const element = this.Stage().dom_node();
                let frame = 0;
                const measure = () => {
                    const rect = element.getBoundingClientRect();
                    if (rect.width < 200 || rect.height < 160)
                        return this.viewer().stage(null);
                    const previous = this.viewer().stage();
                    const moved = !previous
                        || Math.abs(previous.x - rect.x) > 0.5
                        || Math.abs(previous.y - rect.y) > 0.5
                        || Math.abs(previous.width - rect.width) > 0.5
                        || Math.abs(previous.height - rect.height) > 0.5;
                    if (moved)
                        this.viewer().stage({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
                };
                const schedule = () => {
                    cancelAnimationFrame(frame);
                    frame = requestAnimationFrame(measure);
                };
                schedule();
                const observer = new ResizeObserver(schedule);
                observer.observe(element);
                window.addEventListener('resize', schedule);
                return {
                    destructor: () => {
                        observer.disconnect();
                        window.removeEventListener('resize', schedule);
                        cancelAnimationFrame(frame);
                        this.viewer().stage(null);
                    },
                };
            }
            auto() {
                this.stage_watch();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_corpus.prototype, "stage_watch", null);
        $$.$raggu_web_front_corpus = $raggu_web_front_corpus;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/corpus/corpus.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/corpus/corpus.view.css", "[raggu_web_front_corpus] {\n\tpointer-events: none;\n\tposition: fixed;\n\tinset: 0;\n\tz-index: 20;\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding-right: var(--scrollbar-w, 0px);\n}\n\n[raggu_web_front_corpus_spacer] {\n\tflex-shrink: 0;\n\theight: calc(var(--chrome-h, 76px) + 1.75rem);\n}\n\n[raggu_web_front_corpus_row] {\n\tposition: relative;\n\tmargin: 0 auto;\n\tdisplay: flex;\n\tmin-height: 0;\n\twidth: 100%;\n\tmax-width: 1680px;\n\tflex: 1;\n\tflex-direction: column;\n\tgap: 1rem;\n\tpadding: 0 0.75rem 1rem;\n}\n\n[raggu_web_front_corpus_graph] {\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex: 1;\n\tflex-direction: column;\n}\n\n[raggu_web_front_corpus_chatting] [raggu_web_front_corpus_graph] {\n\tdisplay: none;\n}\n\n[raggu_web_front_corpus_controls] {\n\twidth: 100%;\n\tmax-width: 44rem;\n\talign-self: flex-start;\n}\n\n[raggu_web_front_corpus_stage] {\n\tposition: relative;\n\tdisplay: flex;\n\tmin-height: 0;\n\tflex: 1;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n[raggu_web_front_corpus_failed] {\n\tpointer-events: auto;\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tborder-radius: var(--radius-island);\n\tpadding: 1.5rem;\n\ttext-align: center;\n\tanimation: ragu-fade 300ms ease both;\n}\n\n[raggu_web_front_corpus_failed_title] {\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_corpus_failed_hint] {\n\tmargin-top: 0.5rem;\n\tmax-width: 36ch;\n\tfont-size: 0.75rem;\n\tline-height: 1rem;\n\tcolor: var(--text-2);\n}\n\n[raggu_web_front_corpus_failed_retry] {\n\tmargin-top: 1rem;\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tborder-radius: var(--radius-control);\n\tborder: 1px solid color-mix(in oklab, var(--edge-strong) 70%, transparent);\n\tpadding: 0.625rem 1rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 500;\n\tcolor: var(--text);\n\ttransition: border-color 200ms ease, background-color 200ms ease;\n}\n\n[raggu_web_front_corpus_failed_retry]:hover {\n\tborder-color: var(--accent-line);\n\tbackground: var(--accent-wash);\n}\n\n[raggu_web_front_corpus_warm] {\n\tposition: absolute;\n\tbottom: 0.5rem;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\topacity: 0.7;\n}\n\n[raggu_web_front_corpus_compact] {\n\twidth: 100%;\n\tmax-width: 44rem;\n\talign-self: flex-start;\n\tmax-height: 42vh;\n}\n\n[raggu_web_front_corpus_detail] {\n\twidth: 100%;\n}\n\n[raggu_web_front_corpus_detail][raggu_web_front_corpus_detail_open] {\n\tmin-height: 0;\n\tmax-height: 52vh;\n}\n\n[raggu_web_front_corpus_chat] {\n\tmin-height: 0;\n\twidth: 100%;\n}\n\n[raggu_web_front_corpus]:not([raggu_web_front_corpus_graphing]) [raggu_web_front_corpus_chat] {\n\tmargin: 0 auto;\n\tmax-width: 54rem;\n}\n\n@media (min-width: 640px) {\n\n\t[raggu_web_front_corpus_row] {\n\t\tpadding: 0 1.25rem 1rem;\n\t}\n\n}\n\n@media (min-width: 1024px) {\n\n\t[raggu_web_front_corpus_row] {\n\t\tflex-direction: row;\n\t}\n\n\t[raggu_web_front_corpus_chatting] [raggu_web_front_corpus_graph] {\n\t\tdisplay: flex;\n\t}\n\n\t[raggu_web_front_corpus_hint_only]:not([raggu_web_front_corpus_chatting]) [raggu_web_front_corpus_controls] {\n\t\tmax-width: min(44rem, calc(100% - 25rem));\n\t}\n\n\t[raggu_web_front_corpus_detail]:not([raggu_web_front_corpus_compact]) {\n\t\tmax-width: 24rem;\n\t}\n\n\t[raggu_web_front_corpus_hint_only] [raggu_web_front_corpus_detail]:not([raggu_web_front_corpus_compact]) {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tright: 1.25rem;\n\t}\n\n\t[raggu_web_front_corpus_detail][raggu_web_front_corpus_detail_open] {\n\t\tmax-height: none;\n\t}\n\n\t[raggu_web_front_corpus_compact][raggu_web_front_corpus_detail_open] {\n\t\tmax-height: 42vh;\n\t}\n\n\n\t[raggu_web_front_corpus][raggu_web_front_corpus_graphing] [raggu_web_front_corpus_chat] {\n\t\tmax-width: 34rem;\n\t}\n\n}\n");
})($ || ($ = {}));
//raggu/web/front/corpus/-css/corpus.view.css.ts
;
	($.$raggu_web_front_home_constellation) = class $raggu_web_front_home_constellation extends ($.$mol_svg_root) {
		links(){
			return "";
		}
		Links(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.links()));
			return obj;
		}
		points(){
			return "";
		}
		Points(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.points()));
			return obj;
		}
		hubs(){
			return "";
		}
		Hubs(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.hubs()));
			return obj;
		}
		seed(){
			return "";
		}
		nodes(){
			return 0;
		}
		edges(){
			return 0;
		}
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid slice";
		}
		attr(){
			return {...(super.attr()), "aria-hidden": "true"};
		}
		sub(){
			return [
				(this.Links()), 
				(this.Points()), 
				(this.Hubs())
			];
		}
	};
	($mol_mem(($.$raggu_web_front_home_constellation.prototype), "Links"));
	($mol_mem(($.$raggu_web_front_home_constellation.prototype), "Points"));
	($mol_mem(($.$raggu_web_front_home_constellation.prototype), "Hubs"));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_home_constellation extends $.$raggu_web_front_home_constellation {
            shape() {
                const hash01 = $raggu_web_front_graph_hash01;
                const seed = this.seed();
                const nodes = this.nodes();
                const edges = this.edges();
                let key = 0;
                for (let i = 0; i < seed.length; i++)
                    key = (Math.imul(key, 31) + seed.charCodeAt(i)) | 0;
                const density = Math.min(1, Math.log10(Math.max(10, nodes)) / 5);
                const count = Math.round(18 + density * 30);
                const points = [];
                for (let i = 0; i < count; i++) {
                    const angle = hash01(key + i * 7) * Math.PI * 2;
                    const radius = Math.pow(hash01(key + i * 13 + 1), 0.62) * 46;
                    const wobble = (hash01(key + i * 23 + 5) - 0.5) * 8;
                    points.push({
                        x: 50 + Math.cos(angle) * radius + wobble,
                        y: 50 + Math.sin(angle) * radius * 0.74 + wobble * 0.6,
                        r: 0.9 + hash01(key + i * 41 + 9) * 2.6,
                        hub: hash01(key + i * 57 + 3) > 0.88,
                    });
                }
                const ratio = Math.min(2.4, edges / Math.max(1, nodes));
                const wanted = Math.round(count * ratio * 0.8);
                const links = [];
                for (let i = 0; i < count && links.length < wanted; i++) {
                    for (let step = 1; step <= 3 && links.length < wanted; step++) {
                        const j = (i + step + Math.floor(hash01(key + i * 91 + step) * 5)) % count;
                        if (j === i)
                            continue;
                        const a = points[i];
                        const b = points[j];
                        if (Math.hypot(a.x - b.x, a.y - b.y) < 26)
                            links.push([i, j]);
                    }
                }
                return { points, links };
            }
            links() {
                const { points, links } = this.shape();
                return links.map(([a, b]) => `M${points[a].x} ${points[a].y}L${points[b].x} ${points[b].y}`).join('');
            }
            circles(hub) {
                return this.shape().points
                    .filter(point => point.hub === hub)
                    .map(({ x, y, r }) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`)
                    .join('');
            }
            points() {
                return this.circles(false);
            }
            hubs() {
                return this.circles(true);
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_home_constellation.prototype, "shape", null);
        $$.$raggu_web_front_home_constellation = $raggu_web_front_home_constellation;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/home/constellation/constellation.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/home/constellation/constellation.view.css", "[raggu_web_front_home_constellation] {\n\tdisplay: block;\n\toverflow: hidden;\n}\n\n[raggu_web_front_home_constellation_links] {\n\tfill: none;\n\tstroke: var(--edge-strong);\n\tstroke-width: 0.28;\n\topacity: 0.75;\n}\n\n[raggu_web_front_home_constellation_points] {\n\tfill: var(--text-3);\n\topacity: 0.5;\n}\n\n[raggu_web_front_home_constellation_hubs] {\n\tfill: var(--accent);\n\topacity: 0.95;\n}\n");
})($ || ($ = {}));
//raggu/web/front/home/constellation/-css/constellation.view.css.ts
;
	($.$raggu_web_front_home_card) = class $raggu_web_front_home_card extends ($.$raggu_web_front_reveal) {
		Glass(){
			const obj = new this.$.$raggu_web_front_glass();
			return obj;
		}
		id(){
			return "";
		}
		link_label(){
			return "";
		}
		nodes(){
			return 0;
		}
		edges(){
			return 0;
		}
		Constellation(){
			const obj = new this.$.$raggu_web_front_home_constellation();
			(obj.seed) = () => ((this.id()));
			(obj.nodes) = () => ((this.nodes()));
			(obj.edges) = () => ((this.edges()));
			return obj;
		}
		Shade(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		domain(){
			return "";
		}
		Domain(){
			const obj = new this.$.$raggu_web_front_home_chip();
			(obj.text) = () => ((this.domain()));
			return obj;
		}
		Preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Constellation()), 
				(this.Shade()), 
				(this.Domain())
			]);
			return obj;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h3");
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		description(){
			return "";
		}
		Description(){
			const obj = new this.$.$raggu_web_front_text();
			(obj.text) = () => ((this.description()));
			return obj;
		}
		nodes_text(){
			return "";
		}
		entities_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_entities_label"));
		}
		Stat_nodes(){
			const obj = new this.$.$raggu_web_front_home_card_stat();
			(obj.value) = () => ((this.nodes_text()));
			(obj.label) = () => ((this.entities_label()));
			return obj;
		}
		edges_text(){
			return "";
		}
		relations_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_relations_label"));
		}
		Stat_edges(){
			const obj = new this.$.$raggu_web_front_home_card_stat();
			(obj.value) = () => ((this.edges_text()));
			(obj.label) = () => ((this.relations_label()));
			return obj;
		}
		communities_text(){
			return "";
		}
		communities_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_communities_label"));
		}
		Stat_communities(){
			const obj = new this.$.$raggu_web_front_home_card_stat();
			(obj.value) = () => ((this.communities_text()));
			(obj.label) = () => ((this.communities_label()));
			return obj;
		}
		chunks_text(){
			return "";
		}
		chunks_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_chunks_label"));
		}
		Stat_chunks(){
			const obj = new this.$.$raggu_web_front_home_card_stat();
			(obj.value) = () => ((this.chunks_text()));
			(obj.label) = () => ((this.chunks_label()));
			return obj;
		}
		Stats(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dl");
			(obj.sub) = () => ([
				(this.Stat_nodes()), 
				(this.Stat_edges()), 
				(this.Stat_communities()), 
				(this.Stat_chunks())
			]);
			return obj;
		}
		types(){
			return [];
		}
		Types(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("ul");
			(obj.sub) = () => ((this.types()));
			return obj;
		}
		open_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_open_label"));
		}
		Open_arrow(){
			const obj = new this.$.$raggu_web_front_icon_arrow();
			return obj;
		}
		Open(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.open_label()), (this.Open_arrow())]);
			return obj;
		}
		Body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Title()), 
				(this.Description()), 
				(this.Stats()), 
				(this.Types()), 
				(this.Open())
			]);
			return obj;
		}
		Link(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.arg) = () => ({"corpus": (this.id())});
			(obj.hint) = () => ((this.link_label()));
			(obj.sub) = () => ([(this.Preview()), (this.Body())]);
			return obj;
		}
		type_name(id){
			return "";
		}
		dom_name(){
			return "article";
		}
		dataset(){
			return null;
		}
		featured(){
			return false;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_home_card_featured": (this.featured())};
		}
		sub(){
			return [(this.Glass()), (this.Link())];
		}
		Type(id){
			const obj = new this.$.$raggu_web_front_home_chip();
			(obj.text) = () => ((this.type_name(id)));
			return obj;
		}
		open_graph_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_home_card_open_graph_label"));
		}
	};
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Glass"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Constellation"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Shade"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Domain"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Preview"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Title"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Description"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Stat_nodes"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Stat_edges"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Stat_communities"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Stat_chunks"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Stats"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Types"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Open_arrow"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Open"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Body"));
	($mol_mem(($.$raggu_web_front_home_card.prototype), "Link"));
	($mol_mem_key(($.$raggu_web_front_home_card.prototype), "Type"));
	($.$raggu_web_front_home_card_stat) = class $raggu_web_front_home_card_stat extends ($.$mol_view) {
		Value(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("dd");
			(obj.sub) = () => ([(this.value())]);
			return obj;
		}
		Label(){
			const obj = new this.$.$raggu_web_front_label();
			(obj.dom_name) = () => ("dt");
			(obj.text) = () => ((this.label()));
			return obj;
		}
		value(){
			return "";
		}
		label(){
			return "";
		}
		sub(){
			return [(this.Value()), (this.Label())];
		}
	};
	($mol_mem(($.$raggu_web_front_home_card_stat.prototype), "Value"));
	($mol_mem(($.$raggu_web_front_home_card_stat.prototype), "Label"));
	($.$raggu_web_front_home_chip) = class $raggu_web_front_home_chip extends ($.$raggu_web_front_label) {
		dom_name(){
			return "span";
		}
	};

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_home_card extends $.$raggu_web_front_home_card {
            item() {
                return this.dataset();
            }
            id() {
                return this.item().id;
            }
            title() {
                return this.item().title;
            }
            domain() {
                return this.item().domain;
            }
            description() {
                return this.item().description;
            }
            link_label() {
                return `${this.open_graph_label()}: ${this.title()}`;
            }
            nodes() {
                return this.item().stats.nodes;
            }
            edges() {
                return this.item().stats.edges;
            }
            nodes_text() {
                return $raggu_web_front_lib_compact(this.item().stats.nodes);
            }
            edges_text() {
                return $raggu_web_front_lib_compact(this.item().stats.edges);
            }
            communities_text() {
                return $raggu_web_front_lib_compact(this.item().stats.communities);
            }
            chunks_text() {
                return $raggu_web_front_lib_compact(this.item().stats.chunks);
            }
            types() {
                const types = this.item().preview.primary_entity_types?.slice(0, this.featured() ? 6 : 3) ?? [];
                return types.map(type => this.Type(type));
            }
            type_name(type) {
                return type;
            }
        }
        $$.$raggu_web_front_home_card = $raggu_web_front_home_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/home/card/card.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/home/card/card.view.css", "[raggu_web_front_home_card] {\n\tposition: relative;\n\tisolation: isolate;\n\tdisplay: flex;\n\tflex-direction: column;\n\toverflow: hidden;\n\tgrid-column: span 12 / span 12;\n\tborder-radius: var(--radius-island);\n\tpadding: 0.375rem;\n}\n\n[raggu_web_front_home_card_link] {\n\tdisplay: flex;\n\theight: 100%;\n\tflex-direction: column;\n\toutline: none;\n}\n\n[raggu_web_front_home_card_preview] {\n\tposition: relative;\n\tdisplay: block;\n\theight: 9rem;\n\toverflow: hidden;\n\tborder-radius: var(--radius-inset);\n\tbackground: color-mix(in oklab, var(--surface-sunk) 60%, transparent);\n}\n\n[raggu_web_front_home_card_featured] [raggu_web_front_home_card_preview] {\n\theight: 14rem;\n}\n\n[raggu_web_front_home_card_constellation] {\n\tposition: absolute;\n\tinset: 0;\n\twidth: 100%;\n\theight: 100%;\n\ttransition: transform 900ms var(--ease-out-quint);\n}\n\n[raggu_web_front_home_card]:hover [raggu_web_front_home_card_constellation] {\n\ttransform: scale(1.06);\n}\n\n[raggu_web_front_home_card_shade] {\n\tposition: absolute;\n\tinset: 0;\n\tbackground: linear-gradient(to top, color-mix(in oklab, var(--surface) 62%, transparent), transparent 58%);\n}\n\n[raggu_web_front_home_chip] {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tgap: 0.375rem;\n\tborder-radius: var(--radius-chip);\n\tborder: 1px solid var(--edge);\n\tpadding: 0.25rem 0.5rem;\n\tcolor: var(--text-3);\n}\n\n[raggu_web_front_home_card_domain] {\n\tposition: absolute;\n\ttop: 0.75rem;\n\tleft: 0.75rem;\n\tbackground: var(--glass-tint-strong);\n\tbackdrop-filter: blur(12px);\n\t-webkit-backdrop-filter: blur(12px);\n}\n\n[raggu_web_front_home_card_body] {\n\tdisplay: flex;\n\tflex: 1;\n\tflex-direction: column;\n\tpadding: 1.25rem 1rem 1rem;\n}\n\n[raggu_web_front_home_card_title] {\n\tfont-family: var(--font-display);\n\tfont-size: 1.25rem;\n\tline-height: 1;\n\tfont-weight: 500;\n\tletter-spacing: -0.02em;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_card_featured] [raggu_web_front_home_card_title] {\n\tfont-size: 1.875rem;\n}\n\n[raggu_web_front_home_card_description] {\n\tmargin-top: 0.75rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.625;\n\tcolor: var(--text-2);\n\tdisplay: -webkit-box;\n\t-webkit-box-orient: vertical;\n\t-webkit-line-clamp: 3;\n\toverflow: hidden;\n}\n\n[raggu_web_front_home_card_featured] [raggu_web_front_home_card_description] {\n\tmax-width: 46ch;\n\tdisplay: block;\n\toverflow: visible;\n}\n\n[raggu_web_front_home_card_stats] {\n\tmargin-top: 1.25rem;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tcolumn-gap: 1.75rem;\n\trow-gap: 0.75rem;\n}\n\n[raggu_web_front_home_card_stat] {\n\tdisplay: block;\n}\n\n[raggu_web_front_home_card_stat_value] {\n\tdisplay: block;\n\tfont-family: var(--font-mono);\n\tfont-size: 1rem;\n\tline-height: 1;\n\tfont-variant-numeric: tabular-nums;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_home_card_stat_label] {\n\tmargin-top: 0.375rem;\n}\n\n[raggu_web_front_home_card_types] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 0.375rem;\n}\n\n[raggu_web_front_home_card_types]:not(:empty) {\n\tmargin-top: 1.25rem;\n}\n\n[raggu_web_front_home_card_open] {\n\tmargin-top: auto;\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.5rem;\n\tpadding-top: 1.75rem;\n\tfont-size: 0.875rem;\n\tline-height: 1.25rem;\n\tfont-weight: 600;\n\tcolor: var(--accent);\n}\n\n[raggu_web_front_home_card]:hover [raggu_web_front_home_card_open_arrow] {\n\ttransform: translateX(4px);\n}\n\n@media (min-width: 640px) {\n\n\t[raggu_web_front_home_card] {\n\t\tgrid-column: span 6 / span 6;\n\t}\n\n\t[raggu_web_front_home_card][raggu_web_front_home_card_featured] {\n\t\tgrid-column: span 12 / span 12;\n\t}\n\n}\n\n@media (min-width: 1024px) {\n\n\t[raggu_web_front_home_card] {\n\t\tgrid-column: span 5 / span 5;\n\t}\n\n\t[raggu_web_front_home_card][raggu_web_front_home_card_featured] {\n\t\tgrid-column: span 7 / span 7;\n\t\tgrid-row: span 2 / span 2;\n\t}\n\n\t[raggu_web_front_home_card_featured] [raggu_web_front_home_card_preview] {\n\t\theight: 18rem;\n\t}\n\n}\n");
})($ || ($ = {}));
//raggu/web/front/home/card/-css/card.view.css.ts
;
	($.$raggu_web_front_app) = class $raggu_web_front_app extends ($.$raggu_web_front_base) {
		corpus_page(){
			return false;
		}
		skip_label(){
			return (this.$.$mol_locale.text("$raggu_web_front_app_skip_label"));
		}
		Skip(){
			const obj = new this.$.$raggu_web_front_link();
			(obj.uri) = () => ("#main");
			(obj.sub) = () => ([(this.skip_label())]);
			return obj;
		}
		quiet(){
			return false;
		}
		Backdrop_base(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Aurora_a(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Aurora_b(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Aurora_c(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Aurora(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Aurora_a()), 
				(this.Aurora_b()), 
				(this.Aurora_c())
			]);
			return obj;
		}
		Vignette(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Grain(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Backdrop(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({
				...(this.$.$mol_view.prototype.attr.call(obj)), 
				"aria-hidden": "true", 
				"raggu_web_front_app_backdrop_quiet": (this.quiet())
			});
			(obj.sub) = () => ([
				(this.Backdrop_base()), 
				(this.Aurora()), 
				(this.Vignette()), 
				(this.Grain())
			]);
			return obj;
		}
		theme_resolved(){
			return "light";
		}
		Scene(){
			const obj = new this.$.$raggu_web_front_scene();
			(obj.viewer) = () => ((this.Viewer()));
			(obj.lights) = () => ((this.theme_resolved()));
			return obj;
		}
		theme_choice(next){
			if(next !== undefined) return next;
			return "system";
		}
		open_settings(next){
			if(next !== undefined) return next;
			return null;
		}
		Chrome(){
			const obj = new this.$.$raggu_web_front_chrome();
			(obj.viewer) = () => ((this.Viewer()));
			(obj.theme_choice) = (next) => ((this.theme_choice(next)));
			(obj.theme_resolved) = () => ((this.theme_resolved()));
			(obj.open_settings) = (next) => ((this.open_settings(next)));
			return obj;
		}
		main(){
			return [];
		}
		Main(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("main");
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "id": "main"});
			(obj.sub) = () => ((this.main()));
			return obj;
		}
		settings_open(next){
			if(next !== undefined) return next;
			return false;
		}
		Settings(){
			const obj = new this.$.$raggu_web_front_settings();
			(obj.showed) = (next) => ((this.settings_open(next)));
			return obj;
		}
		title(){
			return "RAGU";
		}
		Viewer(){
			const obj = new this.$.$raggu_web_front_viewer();
			return obj;
		}
		attr(){
			return {...(super.attr()), "raggu_web_front_app_corpus": (this.corpus_page())};
		}
		sub(){
			return [
				(this.Skip()), 
				(this.Backdrop()), 
				(this.Scene()), 
				(this.Chrome()), 
				(this.Main()), 
				(this.Settings())
			];
		}
		Home(){
			const obj = new this.$.$raggu_web_front_home();
			return obj;
		}
		Corpus(){
			const obj = new this.$.$raggu_web_front_corpus();
			(obj.viewer) = () => ((this.Viewer()));
			return obj;
		}
	};
	($mol_mem(($.$raggu_web_front_app.prototype), "Skip"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Backdrop_base"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Aurora_a"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Aurora_b"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Aurora_c"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Aurora"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Vignette"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Grain"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Backdrop"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Scene"));
	($mol_mem(($.$raggu_web_front_app.prototype), "theme_choice"));
	($mol_mem(($.$raggu_web_front_app.prototype), "open_settings"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Chrome"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Main"));
	($mol_mem(($.$raggu_web_front_app.prototype), "settings_open"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Settings"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Viewer"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Home"));
	($mol_mem(($.$raggu_web_front_app.prototype), "Corpus"));

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
//mol/media/media.ts
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
//raggu/web/front/analytics/analytics.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $raggu_web_front_app extends $.$raggu_web_front_app {
            corpus_page() {
                return !!this.Viewer().corpus();
            }
            main() {
                return this.corpus_page() ? [this.Corpus()] : [this.Home()];
            }
            quiet() {
                return this.corpus_page();
            }
            theme_choice(next) {
                const value = this.$.$mol_state_local.value('ragu.theme', next);
                return value === 'light' || value === 'dark' ? value : 'system';
            }
            theme_resolved() {
                const choice = this.theme_choice();
                if (choice !== 'system')
                    return choice;
                return this.$.$mol_media.match('(prefers-color-scheme: dark)') ? 'dark' : 'light';
            }
            open_settings() {
                this.settings_open(true);
            }
            document_sync() {
                const root = this.$.$mol_dom_context.document.documentElement;
                root.dataset.theme = this.theme_resolved();
                root.lang = $raggu_web_front_lib_lang();
                return null;
            }
            scrollbar_publish() {
                const measure = () => {
                    const probe = document.createElement('div');
                    probe.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden';
                    document.body.appendChild(probe);
                    const width = probe.offsetWidth - probe.clientWidth;
                    probe.remove();
                    document.documentElement.style.setProperty('--scrollbar-w', `${width}px`);
                };
                measure();
                window.addEventListener('resize', measure);
                return { destructor: () => window.removeEventListener('resize', measure) };
            }
            pageview() {
                const corpus = this.Viewer().corpus();
                $raggu_web_front_analytics_pageview(corpus ? 'corpus' : 'home', corpus);
                return corpus;
            }
            scroll_reset() {
                this.Viewer().corpus();
                window.scrollTo(0, 0);
                return null;
            }
            auto() {
                this.document_sync();
                this.scrollbar_publish();
                this.pageview();
                this.scroll_reset();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "theme_resolved", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "document_sync", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "scrollbar_publish", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "pageview", null);
        __decorate([
            $mol_mem
        ], $raggu_web_front_app.prototype, "scroll_reset", null);
        $$.$raggu_web_front_app = $raggu_web_front_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//raggu/web/front/app/app.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("raggu/web/front/app/app.view.css", "[raggu_web_front_app] {\n\tposition: relative;\n\tdisplay: block;\n\tmin-height: 100%;\n\tfont-family: var(--font-sans);\n\tfont-size: 1rem;\n\tline-height: 1.5;\n\tcolor: var(--text);\n}\n\n[raggu_web_front_app_skip] {\n\tposition: absolute;\n\twidth: 1px;\n\theight: 1px;\n\tpadding: 0;\n\tmargin: -1px;\n\toverflow: hidden;\n\tclip: rect(0, 0, 0, 0);\n\twhite-space: nowrap;\n\tborder-width: 0;\n\tz-index: 50;\n}\n\n[raggu_web_front_app_skip]:focus {\n\tposition: fixed;\n\ttop: 1rem;\n\tleft: 1rem;\n\twidth: auto;\n\theight: auto;\n\tmargin: 0;\n\toverflow: visible;\n\tclip: auto;\n\tborder-radius: var(--radius-control);\n\tbackground: var(--accent);\n\tpadding: 0.625rem 1rem;\n\tfont-size: 0.875rem;\n\tfont-weight: 600;\n\tcolor: var(--accent-ink);\n}\n\n[raggu_web_front_app_backdrop] {\n\tpointer-events: none;\n\tposition: fixed;\n\tinset: 0;\n\tz-index: -10;\n\tdisplay: block;\n\toverflow: hidden;\n}\n\n[raggu_web_front_app_backdrop_base] {\n\tposition: absolute;\n\tinset: 0;\n\tbackground: linear-gradient(175deg, var(--bg) 0%, var(--bg-deep) 100%);\n}\n\n[raggu_web_front_app_aurora] {\n\tposition: absolute;\n\tinset: 0;\n\tdisplay: block;\n\topacity: 1;\n\ttransition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1);\n}\n\n[raggu_web_front_app_backdrop_quiet] [raggu_web_front_app_aurora] {\n\topacity: 0.4;\n}\n\n[raggu_web_front_app_aurora_a],\n[raggu_web_front_app_aurora_b],\n[raggu_web_front_app_aurora_c] {\n\tposition: absolute;\n\tborder-radius: 9999px;\n\tfilter: blur(90px);\n\tanimation: ragu-drift 26s ease-in-out infinite;\n}\n\n[raggu_web_front_app_aurora_a] {\n\ttop: -22vh;\n\tright: -10vw;\n\twidth: 58vw;\n\theight: 58vw;\n\tbackground: radial-gradient(circle at 50% 50%, var(--aurora-a), transparent 68%);\n}\n\n[raggu_web_front_app_aurora_b] {\n\ttop: 38vh;\n\tleft: -16vw;\n\twidth: 54vw;\n\theight: 54vw;\n\tanimation-delay: -9s;\n\tbackground: radial-gradient(circle at 50% 50%, var(--aurora-b), transparent 66%);\n}\n\n[raggu_web_front_app_aurora_c] {\n\tbottom: -28vh;\n\tleft: 32vw;\n\twidth: 62vw;\n\theight: 62vw;\n\tanimation-delay: -17s;\n\tbackground: radial-gradient(circle at 50% 50%, var(--aurora-c), transparent 70%);\n}\n\n[raggu_web_front_app_vignette] {\n\tposition: absolute;\n\tinset: 0;\n\topacity: 0;\n\ttransition: opacity 700ms ease;\n\tbackground: radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--bg) 78%, transparent) 0%, transparent 46%);\n}\n\n[raggu_web_front_app_backdrop_quiet] [raggu_web_front_app_vignette] {\n\topacity: 1;\n}\n\n[raggu_web_front_app_grain] {\n\tposition: absolute;\n\tinset: 0;\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\");\n\topacity: var(--grain-opacity);\n\tmix-blend-mode: multiply;\n}\n\n[data-theme='dark'] [raggu_web_front_app_grain] {\n\tmix-blend-mode: screen;\n}\n\n[raggu_web_front_app_main] {\n\tposition: relative;\n\tz-index: 20;\n\tdisplay: block;\n}\n");
})($ || ($ = {}));
//raggu/web/front/app/-css/app.view.css.ts

//# sourceMappingURL=node.js.map
