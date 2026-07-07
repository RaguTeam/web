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
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
    function $node_internal_check(name: string): boolean;
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    function $node_autoinstall(this: typeof $, name: string): void;
}

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
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
    function $mol_env(): Record<string, string | undefined>;
}

declare namespace $ {
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
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
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
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        /** Span for begin of unknown resource */
        static unknown: $mol_span;
        /** Makes new span for begin of resource. */
        static begin(uri: string, source?: string): $mol_span;
        /** Makes new span for end of resource. */
        static end(uri: string, source: string): $mol_span;
        /** Makes new span for entire resource. */
        static entire(uri: string, source: string): $mol_span;
        toString(): string;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        /** Makes new error for this span. */
        error(message: string, Class?: ErrorConstructor): Error;
        /** Makes new span for same uri. */
        span(row: number, col: number, length: number): $mol_span;
        /** Makes new span after end of this. */
        after(length?: number): $mol_span;
        /** Makes new span between begin and end. */
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    /** Path by types in tree. */
    type $mol_tree2_path = Array<string | number | null>;
    /** Hask tool for processing node. */
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    /** Collection of hask tools for processing tree. */
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        /** Type of structural node, `value` should be empty */
        readonly type: string;
        /** Content of data node, `type` should be empty */
        readonly value: string;
        /** Child nodes */
        readonly kids: readonly $mol_tree2[];
        /** Position in most far source resource */
        readonly span: $mol_span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type: string, 
        /** Content of data node, `type` should be empty */
        value: string, 
        /** Child nodes */
        kids: readonly $mol_tree2[], 
        /** Position in most far source resource */
        span: $mol_span);
        /** Makes collection node. */
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived collection node. */
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        /** Makes data node for any string. */
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived data node. */
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes struct node. */
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived structural node. */
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes new derived node with different kids id defined. */
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Returns multiline text content. */
        text(): string;
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str: string, uri?: string): $mol_tree2;
        /** Serializes to tree format. */
        toString(): string;
        /** Makes new tree with node overrided by path. */
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        /** Makes new tree with node overrided by path. */
        update(value: readonly $mol_tree2[], ...path: $mol_tree2_path): readonly $mol_tree2[];
        /** Query nodes by path. */
        select(...path: $mol_tree2_path): $mol_tree2;
        /** Filter kids by path or value. */
        filter(path: string[], value?: string): $mol_tree2;
        hack_self<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): readonly $mol_tree2[];
        /** Transform tree through context with transformers */
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        /** Makes Error with node coordinates. */
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $ {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    function $mol_array_chunks<Item>(array: readonly Item[], rule: number | ((item: Item, index: number) => boolean)): Item[][];
}

declare namespace $ {
    function $mol_tree2_from_json(json: any, span?: $mol_span): $mol_tree2;
}

declare namespace $ {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset: (str: string) => string;
        static bold: (str: string) => string;
        static italic: (str: string) => string;
        static underline: (str: string) => string;
        static inverse: (str: string) => string;
        static hidden: (str: string) => string;
        static strike: (str: string) => string;
        static gray: (str: string) => string;
        static red: (str: string) => string;
        static green: (str: string) => string;
        static yellow: (str: string) => string;
        static blue: (str: string) => string;
        static magenta: (str: string) => string;
        static cyan: (str: string) => string;
        static Gray: (str: string) => string;
        static Red: (str: string) => string;
        static Green: (str: string) => string;
        static Yellow: (str: string) => string;
        static Blue: (str: string) => string;
        static Magenta: (str: string) => string;
        static Cyan: (str: string) => string;
        static ansi(open: number, close: number): (str: string) => string;
    }
}

declare namespace $ {
    function $mol_log3_node_make(level: keyof Console, output: 'stdout' | 'stderr', type: string, color: (str: string) => string): (this: $, event: $mol_log3_event<{}>) => () => void;
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
    type $mol_run_error_context = {
        pid?: number;
        stdout: Buffer | string;
        stderr: Buffer | string;
    };
    class $mol_run_error extends $mol_error_mix<{
        timeout_kill?: boolean;
        pid?: number;
        signal?: NodeJS.Signals | null;
        status?: number | null;
        command: string;
        dir: string;
    }> {
    }
    const $mol_run_spawn: (...args: Parameters<(typeof $node)["child_process"]["spawn"]>) => import("node:child_process").ChildProcess;
    const $mol_run_spawn_sync: (...args: Parameters<(typeof $node)["child_process"]["spawnSync"]>) => import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer>;
    type $mol_run_options = {
        command: readonly string[] | string;
        dir: string;
        timeout?: number;
        env?: Record<string, string | undefined>;
    };
    class $mol_run extends $mol_object {
        static async_enabled(): boolean;
        static spawn(options: $mol_run_options): import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer> | $mol_run_error_context;
        static spawn_async({ dir, sync, timeout, command, env }: $mol_run_options & {
            sync?: boolean;
        }): import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer> | (Promise<$mol_run_error_context> & {
            destructor: () => void;
        });
        static error_message(res?: $mol_run_error_context): string;
    }
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
    export type $mol_style_properties_color = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen' | 'transparent' | 'currentcolor' | $mol_style_func<'hsla' | 'rgba' | 'var'> | `#${string}` | `hsl(${Space}${Angle} ${Portion} ${Portion}${'' | `${Space}/${Space}${Portion}`}${Space})`;
    type Length = 0 | `${number}${$mol_style_unit_length}` | $mol_style_func<'calc' | 'var' | 'clamp'>;
    type Size = 'auto' | 'max-content' | 'min-content' | 'fit-content' | Length | Common;
    type Sides<Value> = {
        top?: Value;
        right?: Value;
        bottom?: Value;
        left?: Value;
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
    const $mol_theme: Record<"image" | "line" | "text" | "field" | "focus" | "hue" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "spirit" | "hue_spread", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    let $mol_gap: Record<"text" | "space" | "blur" | "page" | "block" | "round" | "emoji", $mol_style_func<"var", unknown>>;
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
    class $mol_window extends $mol_object {
        static size(): {
            width: number;
            height: number;
        };
    }
}

declare namespace $ {
    /** Returns string key for any value. */
    function $mol_key<Value>(value: Value): string;
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
    class $mol_after_frame extends $mol_after_timeout {
        task: () => void;
        constructor(task: () => void);
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
    /**
     * Returns `Tuple` without first element.
     *
     * 	$mol_type_tail<[ 1 , 2 , 3 ]> // [ 2, 3 ]
     */
    type $mol_type_tail<Tuple extends readonly any[]> = ((...tail: Tuple) => any) extends ((head: any, ...tail: infer Tail) => any) ? Tail : never;
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
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    export function $mol_wire_solo<Args extends any[]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): TypedPropertyDescriptor<(...args: First_optional<Args>) => any>;
    type First_optional<Args extends any[]> = Args extends [] ? [] : [Args[0] | undefined, ...$mol_type_tail<Args>];
    export {};
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
    function $mol_guard_defined<T>(value: T): value is NonNullable<T>;
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], notify?: 'notify'): Element[];
    }
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
    /** Run code without state changes */
    function $mol_wire_probe<Value>(task: () => Value, def?: Value): Value | undefined;
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
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid(): void;
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
    /**
     * Picks keys from `Input` which values extends `Upper`.
     *
     * 	type MathConstants = $mol_type_pick< Math , number > // { E , PI , ... }
     */
    type $mol_type_pick<Input, Upper> = Pick<Input, $mol_type_keys_extract<Input, Upper>>;
}

declare namespace $ {
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

declare namespace $ {
    /**
     * BuilderUI design tokens — CSS variables in --bog_builderui_*.
     * Used in .view.css.ts via $bog_builderui_tokens.text, $bog_builderui_tokens.back, etc.
     */
    const $bog_builderui_tokens: Record<"line" | "text" | "field" | "focus" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "font_body" | "font_head" | "radius", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
    type $mol_style_pseudo_class = ':active' | ':any' | ':any-link' | ':checked' | ':default' | ':defined' | ':dir(rtl)' | ':dir(ltr)' | ':disabled' | ':empty' | ':enabled' | ':first' | ':first-child' | ':first-of-type' | ':fullscreen' | ':focus' | ':focus-visible' | ':focus-within' | ':hover' | ':indeterminate' | ':in-range' | ':invalid' | ':last-child' | ':last-of-type' | ':left' | ':link' | `:not(${string})` | `:nth-child(${string})` | `:nth-last-child(${string})` | `:nth-of-type(${string})` | `:nth-last-of-type(${string})` | ':only-child' | ':only-of-type' | ':optional' | ':out-of-range' | ':placeholder-shown' | ':read-only' | ':read-write' | ':required' | ':right' | ':root' | ':scope' | ':target' | ':valid' | ':visited';
}

declare namespace $ {
    type $mol_style_pseudo_element = '::after' | '::before' | '::cue' | '::first-letter' | '::first-line' | '::selection' | '::slotted' | '::backdrop' | '::placeholder' | '::marker' | '::spelling-error' | '::grammar-error' | '::-webkit-calendar-picker-indicator' | '::-webkit-color-swatch' | '::-webkit-color-swatch-wrapper' | '::-webkit-details-marker' | '::-webkit-file-upload-button' | '::-webkit-image-inner-element' | '::-webkit-inner-spin-button' | '::-webkit-input-placeholder' | '::-webkit-input-speech-button' | '::-webkit-keygen-select' | '::-webkit-media-controls-panel' | '::-webkit-media-controls-timeline-container' | '::-webkit-media-slider-container' | '::-webkit-meter-bar' | '::-webkit-meter-even-less-good-value' | '::-webkit-meter-optimum-value' | '::-webkit-meter-suboptimal-value' | '::-webkit-progress-bar' | '::-webkit-progress-value' | '::-webkit-resizer' | '::-webkit-resizer:window-inactive' | '::-webkit-scrollbar' | '::-webkit-scrollbar-button' | '::-webkit-scrollbar-button:disabled' | '::-webkit-scrollbar-button:double-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:start:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:decrement' | '::-webkit-scrollbar-button:double-button:vertical:end:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:vertical:start:decrement' | '::-webkit-scrollbar-button:double-button:vertical:start:increment' | '::-webkit-scrollbar-button:end' | '::-webkit-scrollbar-button:end:decrement' | '::-webkit-scrollbar-button:end:increment' | '::-webkit-scrollbar-button:horizontal' | '::-webkit-scrollbar-button:horizontal:decrement' | '::-webkit-scrollbar-button:horizontal:decrement:active' | '::-webkit-scrollbar-button:horizontal:decrement:hover' | '::-webkit-scrollbar-button:horizontal:decrement:window-inactive' | '::-webkit-scrollbar-button:horizontal:end' | '::-webkit-scrollbar-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:horizontal:end:increment' | '::-webkit-scrollbar-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:horizontal:increment' | '::-webkit-scrollbar-button:horizontal:increment:active' | '::-webkit-scrollbar-button:horizontal:increment:hover' | '::-webkit-scrollbar-button:horizontal:increment:window-inactive' | '::-webkit-scrollbar-button:horizontal:start' | '::-webkit-scrollbar-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:horizontal:start:increment' | '::-webkit-scrollbar-button:start' | '::-webkit-scrollbar-button:start:decrement' | '::-webkit-scrollbar-button:start:increment' | '::-webkit-scrollbar-button:vertical' | '::-webkit-scrollbar-button:vertical:decrement' | '::-webkit-scrollbar-button:vertical:decrement:active' | '::-webkit-scrollbar-button:vertical:decrement:hover' | '::-webkit-scrollbar-button:vertical:decrement:window-inactive' | '::-webkit-scrollbar-button:vertical:end' | '::-webkit-scrollbar-button:vertical:end:decrement' | '::-webkit-scrollbar-button:vertical:end:increment' | '::-webkit-scrollbar-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:vertical:increment' | '::-webkit-scrollbar-button:vertical:increment:active' | '::-webkit-scrollbar-button:vertical:increment:hover' | '::-webkit-scrollbar-button:vertical:increment:window-inactive' | '::-webkit-scrollbar-button:vertical:start' | '::-webkit-scrollbar-button:vertical:start:decrement' | '::-webkit-scrollbar-button:vertical:start:increment' | '::-webkit-scrollbar-corner' | '::-webkit-scrollbar-corner:window-inactive' | '::-webkit-scrollbar-thumb' | '::-webkit-scrollbar-thumb:horizontal' | '::-webkit-scrollbar-thumb:horizontal:active' | '::-webkit-scrollbar-thumb:horizontal:hover' | '::-webkit-scrollbar-thumb:horizontal:window-inactive' | '::-webkit-scrollbar-thumb:vertical' | '::-webkit-scrollbar-thumb:vertical:active' | '::-webkit-scrollbar-thumb:vertical:hover' | '::-webkit-scrollbar-thumb:vertical:window-inactive' | '::-webkit-scrollbar-track' | '::-webkit-scrollbar-track-piece' | '::-webkit-scrollbar-track-piece:disabled' | '::-webkit-scrollbar-track-piece:end' | '::-webkit-scrollbar-track-piece:horizontal:decrement' | '::-webkit-scrollbar-track-piece:horizontal:decrement:active' | '::-webkit-scrollbar-track-piece:horizontal:decrement:hover' | '::-webkit-scrollbar-track-piece:horizontal:end' | '::-webkit-scrollbar-track-piece:horizontal:end:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:double-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:single-button' | '::-webkit-scrollbar-track-piece:horizontal:increment' | '::-webkit-scrollbar-track-piece:horizontal:increment:active' | '::-webkit-scrollbar-track-piece:horizontal:increment:hover' | '::-webkit-scrollbar-track-piece:horizontal:start' | '::-webkit-scrollbar-track-piece:horizontal:start:double-button' | '::-webkit-scrollbar-track-piece:horizontal:start:no-button' | '::-webkit-scrollbar-track-piece:horizontal:start:single-button' | '::-webkit-scrollbar-track-piece:start' | '::-webkit-scrollbar-track-piece:vertical:decrement' | '::-webkit-scrollbar-track-piece:vertical:decrement:active' | '::-webkit-scrollbar-track-piece:vertical:decrement:hover' | '::-webkit-scrollbar-track-piece:vertical:end' | '::-webkit-scrollbar-track-piece:vertical:end:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:double-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:single-button' | '::-webkit-scrollbar-track-piece:vertical:increment' | '::-webkit-scrollbar-track-piece:vertical:increment:active' | '::-webkit-scrollbar-track-piece:vertical:increment:hover' | '::-webkit-scrollbar-track-piece:vertical:start' | '::-webkit-scrollbar-track-piece:vertical:start:double-button' | '::-webkit-scrollbar-track-piece:vertical:start:no-button' | '::-webkit-scrollbar-track-piece:vertical:start:single-button' | '::-webkit-scrollbar-track:disabled' | '::-webkit-scrollbar-track:horizontal' | '::-webkit-scrollbar-track:horizontal:disabled' | '::-webkit-scrollbar-track:horizontal:disabled:corner-present' | '::-webkit-scrollbar-track:vertical:disabled' | '::-webkit-scrollbar-track:vertical:disabled:corner-present' | '::-webkit-scrollbar:horizontal' | '::-webkit-scrollbar:horizontal:corner-present' | '::-webkit-scrollbar:horizontal:window-inactive' | '::-webkit-scrollbar:vertical' | '::-webkit-scrollbar:vertical:corner-present' | '::-webkit-scrollbar:vertical:window-inactive' | '::-webkit-search-cancel-button' | '::-webkit-search-decoration' | '::-webkit-search-results-button' | '::-webkit-search-results-decoration' | '::-webkit-slider-container' | '::-webkit-slider-runnable-track' | '::-webkit-slider-thumb' | '::-webkit-slider-thumb:disabled' | '::-webkit-slider-thumb:hover' | '::-webkit-textfield-decoration-container' | '::-webkit-validation-bubble' | '::-webkit-validation-bubble-arrow' | '::-webkit-validation-bubble-arrow-clipper' | '::-webkit-validation-bubble-heading' | '::-webkit-validation-bubble-message' | '::-webkit-validation-bubble-text-block';
}

declare namespace $ {
    /** Returns error type, that don't match to normal value. */
    type $mol_type_error<Message, Info = {}> = Message & {
        $mol_type_error: Info;
    };
}

declare namespace $ {
    type Attrs<View extends $mol_view, Config, Attrs = ReturnType<View['attr']>> = {
        [name in keyof Attrs]?: {
            [val in keyof Config[Extract<name, keyof Config>]]: $mol_style_guard<View, Config[Extract<name, keyof Config>][val]>;
        };
    };
    type Medias<View extends $mol_view, Config> = {
        [query in keyof Config]: $mol_style_guard<View, Config[query]>;
    };
    type Keys<View extends $mol_view> = '>' | '@' | keyof $mol_style_properties | $mol_style_pseudo_element | $mol_style_pseudo_class | $mol_type_keys_extract<View, () => $mol_view> | `$${string}`;
    export type $mol_style_guard<View extends $mol_view, Config> = {
        [key in Keys<View>]?: unknown;
    } & $mol_style_properties & {
        [key in keyof Config]: key extends keyof $mol_style_properties ? $mol_style_properties[key] : key extends '>' | $mol_style_pseudo_class | $mol_style_pseudo_element ? $mol_style_guard<View, Config[key]> : key extends '@' ? Attrs<View, Config[key]> : key extends ('@media' | '@container') ? Medias<View, Config[key]> : key extends '@starting-style' ? $mol_style_guard<View, Config[key]> : key extends `[${string}]` ? {
            [val in keyof Config[key]]: $mol_style_guard<View, Config[key][val]>;
        } : key extends `--${string}` ? any : key extends keyof $ ? $mol_style_guard<InstanceType<Extract<$[key], typeof $mol_view>>, Config[key]> : key extends keyof View ? View[key] extends (id?: any) => infer Sub ? Sub extends $mol_view ? $mol_style_guard<Sub, Config[key]> : $mol_type_error<'Property returns non $mol_view', {
            Returns: Sub;
        }> : $mol_type_error<'Field is not a Property'> : key extends `$${string}` ? $mol_type_error<'Unknown View Class'> : $mol_type_error<'Unknown CSS Property'>;
    };
    export {};
}

declare namespace $ {
    function $mol_style_sheet<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config0: Config): string;
}

declare namespace $ {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config: Config): HTMLStyleElement | null;
}

declare namespace $ {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next?: Element): Element;
        render(): void;
    }
}

declare namespace $ {

	export class $bog_builderui_div extends $mol_view {
	}
	
}

//# sourceMappingURL=div.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision: number, reset?: null): $mol_after_timeout | $mol_after_frame;
        static now(precision: number): number;
    }
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
declare namespace $.$$ {
    /** Base SVG component to display SVG images or icons. */
    class $mol_svg extends $.$mol_svg {
        computed_style(): Record<string, any>;
        font_size(): number;
        font_family(): any;
    }
}

declare namespace $ {
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
    /**
     * Fails if `Actual` type is not subtype of `Expected`.
     */
    type $mol_type_enforce<Actual extends Expected, Expected> = Actual;
}

declare namespace $ {
}

declare namespace $ {

	type $mol_svg_path__geometry_mol_icon_1 = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_graph extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=graph.view.tree.d.ts.map
declare namespace $ {

	export class $bog_favicon extends $mol_plugin {
		Icon( ): $mol_view
	}
	
}

//# sourceMappingURL=favicon.view.tree.d.ts.map
declare namespace $.$$ {
    /** Плагин, который ставит favicon из переданного $mol_icon_* и подобных */
    class $bog_favicon extends $.$bog_favicon {
        Icon(next?: $mol_view): $mol_view;
        favicon_data(): string;
        apply_favicon(): void;
        auto(): any;
        sub(): readonly [];
    }
}

declare namespace $ {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    const $bog_theme: Record<"image" | "line" | "text" | "field" | "focus" | "background" | "back" | "hover" | "card" | "current" | "special" | "control" | "shade" | "spirit", $mol_style_func<"var", unknown>>;
    /**
     * Available theme names.
     * Add new theme to theme.css and add its name here.
     */
    const $bog_theme_names: readonly ["$mol_theme_giper_smash_dark", "$mol_theme_giper_smash_light", "$mol_theme_light", "$mol_theme_dark", "$mol_theme_monefro_light", "$mol_theme_monefro_dark", "$mol_theme_homerent_light", "$mol_theme_homerent_dark", "$mol_theme_upwork", "$mol_theme_ainews_light", "$mol_theme_ainews_dark", "$mol_theme_calm_dark", "$mol_theme_calm_light"];
    /**
     * Type-safe theme name
     */
    type $bog_theme_name = (typeof $bog_theme_names)[number];
}

declare namespace $ {
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
    class $mol_storage extends $mol_object2 {
        static native(): StorageManager;
        static persisted(next?: boolean, cache?: 'cache'): boolean;
        static estimate(): StorageEstimate;
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
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    let $mol_action: typeof $mol_wire_method;
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
    class $mol_file_transaction_node extends $mol_file_transaction {
        protected descr(): number;
        write({ buffer, offset, length, position }: {
            buffer: ArrayBufferView | string | readonly ArrayBufferView[];
            offset?: number | null;
            length?: number | null;
            position?: number | null;
        }): number;
        truncate(size: number): void;
        read(): Uint8Array<ArrayBuffer>;
        flush(): void;
        close(): void;
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
    function $mol_file_node_buffer_normalize(buf: Buffer<ArrayBuffer>): Uint8Array<ArrayBuffer>;
    class $mol_file_node extends $mol_file {
        static relative<This extends typeof $mol_file>(this: This, path: string): InstanceType<This>;
        watcher(reset?: null): {
            destructor(): void;
        };
        protected info(path: string): $mol_file_stat | null;
        protected ensure(): null | undefined;
        protected copy(to: string): void;
        protected drop(): void;
        protected read(): Uint8Array<ArrayBuffer>;
        protected write(buffer: Uint8Array<ArrayBuffer>): undefined;
        protected kids(): this[];
        resolve(path: string): this;
        relate(base?: $mol_file): string;
        readable(opts: {
            start?: number;
            end?: number;
        }): ReadableStream<Uint8Array<ArrayBuffer>>;
        writable(opts?: {
            start?: number;
        }): WritableStream<Uint8Array<ArrayBuffer>>;
    }
}

declare namespace $ {
    class $mol_state_local_node<Value> extends $mol_state_local<Value> {
        static dir(): $mol_file;
        static value<Value>(key: string, next?: Value | null): Value | null;
    }
}

declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    /** State of arguments like `foo=bar xxx` */
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static prolog: string;
        static separator: string;
        static href(next?: string): string;
        static href_normal(): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static value(key: string, next?: string | null): string | null;
        static link(next: Record<string, string | null>): string;
        static make_link(next: Record<string, string | null>): string;
        static go(next: {
            [key: string]: string | null;
        }): void;
        static commit(): void;
        constructor(prefix?: string);
        value(key: string, next?: string): string | null;
        sub(postfix: string): $mol_state_arg;
        link(next: Record<string, string | null>): string;
    }
}

declare namespace $ {
    class $mol_media extends $mol_object2 {
        static match(query: string, next?: boolean): boolean;
    }
}

declare namespace $ {
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(this: $, next?: boolean): boolean;
}

declare namespace $ {

	export class $bog_theme_auto extends $mol_plugin {
		themes_default( ): readonly(any)[]
		theme( ): string
		themes( ): ReturnType< $bog_theme_auto['themes_default'] >
		theme_light( ): string
		theme_dark( ): string
		mode( next?: string ): string
		mode_next( next?: any ): any
		theme_next( next?: any ): any
		theme_prev( next?: any ): any
		theme_set( next?: any ): any
		is_light_now( ): boolean
		attr( ): ({ 
			'mol_theme': ReturnType< $bog_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $.$$ {
    type $bog_theme_mode = 'light' | 'dark' | 'system' | 'custom';
    class $bog_theme_auto extends $.$bog_theme_auto {
        themes_default(): readonly $.$bog_theme_name[];
        /** Stores current mode in localStorage. Defaults to 'system'.
         *  При записи дёргает класс `.bog_theme_switching` на `<html>` —
         *  это активирует CSS-transition'ы на цветах темы.
         */
        mode(next?: $bog_theme_mode): $bog_theme_mode;
        click_step(next?: number): number;
        /** 3-click cycle: opposite → back → system. */
        mode_next(): void;
        is_light_now(): any;
        theme_index(next?: number): number;
        system_theme_index(): number;
        theme(): any;
        theme_next(): void;
        theme_prev(): void;
        /** Called by picker. Sets mode to light/dark or custom for themed palettes. */
        theme_set(index: number): void;
    }
}

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

	type $bog_builderui_div__sub_bog_norweb_front_sidebar_nav_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_nav_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_sidebar_nav extends $bog_builderui_div {
		click( next?: any ): any
		Icon( ): $bog_builderui_div
		Label( ): $bog_builderui_div
		icon( ): string
		label( ): string
		active( ): boolean
		disabled( ): boolean
		attr( ): ({ 
			'bog_norweb_front_sidebar_nav_active': ReturnType< $bog_norweb_front_sidebar_nav['active'] >,
			'bog_norweb_front_sidebar_nav_disabled': ReturnType< $bog_norweb_front_sidebar_nav['disabled'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		event( ): ({ 
			click( next?: ReturnType< $bog_norweb_front_sidebar_nav['click'] > ): ReturnType< $bog_norweb_front_sidebar_nav['click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
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
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
        static warn(key: string): null;
    }
}

declare namespace $ {

	export class $mol_icon_white_balance_sunny extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sunny.view.tree.d.ts.map
declare namespace $ {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    let $mol_layer: Record<"focus" | "float" | "hover" | "speck" | "popup", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
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

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_monitor extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=monitor.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_weather_night extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=night.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__attr_bog_theme_switch_1 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['light_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_2 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['light_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_3 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_light'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__attr_bog_theme_switch_5 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['system_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_6 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['system_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_7 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_system'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__attr_bog_theme_switch_9 = $mol_type_enforce<
		({ 
			'bog_theme_switch_active': ReturnType< $bog_theme_switch['dark_active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		,
		ReturnType< $mol_button_minor['attr'] >
	>
	type $mol_button_minor__hint_bog_theme_switch_10 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['dark_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_theme_switch_11 = $mol_type_enforce<
		ReturnType< $bog_theme_switch['set_dark'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_theme_switch_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $bog_theme_switch extends $mol_view {
		light_active( ): boolean
		light_hint( ): string
		set_light( next?: any ): any
		Light_icon( ): $mol_icon_white_balance_sunny
		Light( ): $mol_button_minor
		system_active( ): boolean
		system_hint( ): string
		set_system( next?: any ): any
		System_icon( ): $mol_icon_monitor
		System( ): $mol_button_minor
		dark_active( ): boolean
		dark_hint( ): string
		set_dark( next?: any ): any
		Dark_icon( ): $mol_icon_weather_night
		Dark( ): $mol_button_minor
		theme_auto( ): $bog_theme_auto
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=switch.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_theme_switch extends $.$bog_theme_switch {
        light_active(): boolean;
        system_active(): boolean;
        dark_active(): boolean;
        set_light(): null;
        set_system(): null;
        set_dark(): null;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_norweb_front_sidebar_lang extends $bog_builderui_div {
		click( next?: any ): any
		label( ): string
		active( ): boolean
		attr( ): ({ 
			'bog_norweb_front_sidebar_lang_active': ReturnType< $bog_norweb_front_sidebar_lang['active'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		event( ): ({ 
			click( next?: ReturnType< $bog_norweb_front_sidebar_lang['click'] > ): ReturnType< $bog_norweb_front_sidebar_lang['click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=lang.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $mol_image__uri_bog_norweb_front_sidebar_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title_bog_norweb_front_sidebar_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_sidebar_nav__icon_bog_norweb_front_sidebar_7 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['icon'] >
	>
	type $bog_norweb_front_sidebar_nav__label_bog_norweb_front_sidebar_8 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['label'] >
	>
	type $bog_norweb_front_sidebar_nav__active_bog_norweb_front_sidebar_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_gallery'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['active'] >
	>
	type $bog_norweb_front_sidebar_nav__click_bog_norweb_front_sidebar_10 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_gallery'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['click'] >
	>
	type $bog_norweb_front_sidebar_nav__icon_bog_norweb_front_sidebar_11 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['icon'] >
	>
	type $bog_norweb_front_sidebar_nav__label_bog_norweb_front_sidebar_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['label'] >
	>
	type $bog_norweb_front_sidebar_nav__active_bog_norweb_front_sidebar_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_explorer'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['active'] >
	>
	type $bog_norweb_front_sidebar_nav__disabled_bog_norweb_front_sidebar_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['no_dataset'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['disabled'] >
	>
	type $bog_norweb_front_sidebar_nav__click_bog_norweb_front_sidebar_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_explorer'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['click'] >
	>
	type $bog_norweb_front_sidebar_nav__icon_bog_norweb_front_sidebar_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['icon'] >
	>
	type $bog_norweb_front_sidebar_nav__label_bog_norweb_front_sidebar_17 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['label'] >
	>
	type $bog_norweb_front_sidebar_nav__active_bog_norweb_front_sidebar_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_chat'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['active'] >
	>
	type $bog_norweb_front_sidebar_nav__disabled_bog_norweb_front_sidebar_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['no_dataset'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['disabled'] >
	>
	type $bog_norweb_front_sidebar_nav__click_bog_norweb_front_sidebar_20 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_chat'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['click'] >
	>
	type $bog_norweb_front_sidebar_nav__icon_bog_norweb_front_sidebar_21 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['icon'] >
	>
	type $bog_norweb_front_sidebar_nav__label_bog_norweb_front_sidebar_22 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['label'] >
	>
	type $bog_norweb_front_sidebar_nav__active_bog_norweb_front_sidebar_23 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_dashboard'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['active'] >
	>
	type $bog_norweb_front_sidebar_nav__disabled_bog_norweb_front_sidebar_24 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['no_dataset'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['disabled'] >
	>
	type $bog_norweb_front_sidebar_nav__click_bog_norweb_front_sidebar_25 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_dashboard'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['click'] >
	>
	type $bog_norweb_front_sidebar_nav__icon_bog_norweb_front_sidebar_26 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['icon'] >
	>
	type $bog_norweb_front_sidebar_nav__label_bog_norweb_front_sidebar_27 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_nav['label'] >
	>
	type $bog_norweb_front_sidebar_nav__active_bog_norweb_front_sidebar_28 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_summary'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['active'] >
	>
	type $bog_norweb_front_sidebar_nav__click_bog_norweb_front_sidebar_29 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_summary'] >
		,
		ReturnType< $bog_norweb_front_sidebar_nav['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_theme_switch__theme_auto_bog_norweb_front_sidebar_35 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['Theme_auto'] >
		,
		ReturnType< $bog_theme_switch['theme_auto'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_sidebar_lang__label_bog_norweb_front_sidebar_37 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_lang['label'] >
	>
	type $bog_norweb_front_sidebar_lang__active_bog_norweb_front_sidebar_38 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_en'] >
		,
		ReturnType< $bog_norweb_front_sidebar_lang['active'] >
	>
	type $bog_norweb_front_sidebar_lang__click_bog_norweb_front_sidebar_39 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_en'] >
		,
		ReturnType< $bog_norweb_front_sidebar_lang['click'] >
	>
	type $bog_norweb_front_sidebar_lang__label_bog_norweb_front_sidebar_40 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_sidebar_lang['label'] >
	>
	type $bog_norweb_front_sidebar_lang__active_bog_norweb_front_sidebar_41 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['is_ru'] >
		,
		ReturnType< $bog_norweb_front_sidebar_lang['active'] >
	>
	type $bog_norweb_front_sidebar_lang__click_bog_norweb_front_sidebar_42 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_sidebar['click_ru'] >
		,
		ReturnType< $bog_norweb_front_sidebar_lang['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_sidebar_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_sidebar extends $bog_builderui_div {
		Brand_logo( ): $mol_image
		Brand_title( ): $bog_builderui_div
		Brand_badge( ): $bog_builderui_div
		Brand( ): $bog_builderui_div
		Sections_label( ): $bog_builderui_div
		is_gallery( ): boolean
		click_gallery( next?: any ): any
		Nav_gallery( ): $bog_norweb_front_sidebar_nav
		is_explorer( ): boolean
		no_dataset( ): boolean
		click_explorer( next?: any ): any
		Nav_explorer( ): $bog_norweb_front_sidebar_nav
		is_chat( ): boolean
		click_chat( next?: any ): any
		Nav_chat( ): $bog_norweb_front_sidebar_nav
		is_dashboard( ): boolean
		click_dashboard( next?: any ): any
		Nav_dashboard( ): $bog_norweb_front_sidebar_nav
		is_summary( ): boolean
		click_summary( next?: any ): any
		Nav_summary( ): $bog_norweb_front_sidebar_nav
		Nav( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Corpus_label( ): $bog_builderui_div
		Corpus_name( ): $bog_builderui_div
		Corpus_meta( ): $bog_builderui_div
		Corpus_card( ): $bog_builderui_div
		Theme_switch( ): $bog_theme_switch
		Lang_label( ): $bog_builderui_div
		is_en( ): boolean
		click_en( next?: any ): any
		Lang_en( ): $bog_norweb_front_sidebar_lang
		is_ru( ): boolean
		click_ru( next?: any ): any
		Lang_ru( ): $bog_norweb_front_sidebar_lang
		Lang_row( ): $bog_builderui_div
		Footer( ): $bog_builderui_div
		screen( next?: string ): string
		dataset_id( ): string
		dataset_title( ): string
		Theme_auto( ): $bog_theme_auto
		sections_label_text( ): string
		corpus_label_text( ): string
		corpus_meta_text( ): string
		lang_label_text( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=sidebar.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_sidebar extends $.$bog_norweb_front_sidebar {
        is_gallery(): boolean;
        is_explorer(): boolean;
        is_chat(): boolean;
        is_dashboard(): boolean;
        is_summary(): boolean;
        no_dataset(): boolean;
        is_en(): boolean;
        is_ru(): boolean;
        click_gallery(): null;
        click_explorer(): null;
        click_chat(): null;
        click_dashboard(): null;
        click_summary(): null;
        click_en(): null;
        click_ru(): null;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $bog_norweb_front_topbar_preset extends $bog_builderui_div {
		click( next?: any ): any
		label( ): string
		active( ): boolean
		attr( ): ({ 
			'bog_norweb_front_topbar_preset_active': ReturnType< $bog_norweb_front_topbar_preset['active'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		event( ): ({ 
			click( next?: ReturnType< $bog_norweb_front_topbar_preset['click'] > ): ReturnType< $bog_norweb_front_topbar_preset['click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=preset.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_ghost extends $mol_view {
		Sub( ): $mol_view
	}
	
}

//# sourceMappingURL=ghost.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Mixin view logic to DOM node of another component.
     */
    class $mol_ghost extends $.$mol_ghost {
        dom_node_external(next?: Element): Element;
        dom_node_actual(): Element;
        dom_tree(): Element;
        title(): string;
        minimal_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {

	export class $mol_follower extends $mol_ghost {
		transform( ): string
		Anchor( ): $mol_view
		align( ): readonly(number)[]
		offset( ): readonly(number)[]
		style( ): ({ 
			'transform': ReturnType< $mol_follower['transform'] >,
		})  & ReturnType< $mol_ghost['style'] >
	}
	
}

//# sourceMappingURL=follower.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Marker on top of another component with tracking of its position.
     */
    class $mol_follower extends $.$mol_follower {
        pos(): {
            left: number;
            top: number;
        } | null;
        transform(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_dom_listener extends $mol_object {
        _node: any;
        _event: string;
        _handler: (event: any) => any;
        _config: boolean | {
            passive: boolean;
        };
        constructor(_node: any, _event: string, _handler: (event: any) => any, _config?: boolean | {
            passive: boolean;
        });
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_print extends $mol_object {
        static before(): $mol_dom_listener;
        static after(): $mol_dom_listener;
        static active(next?: boolean): boolean;
    }
}

declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Scrolling pane.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
     */
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number, cache?: 'cache'): number;
        scroll_left(next?: number, cache?: 'cache'): number;
        event_scroll(next?: Event): void;
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	type $mol_pop_bubble__content_mol_pop_1 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_content'] >
		,
		ReturnType< $mol_pop_bubble['content'] >
	>
	type $mol_pop_bubble__height_max_mol_pop_2 = $mol_type_enforce<
		ReturnType< $mol_pop['height_max'] >
		,
		ReturnType< $mol_pop_bubble['height_max'] >
	>
	type $mol_follower__offset_mol_pop_3 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_offset'] >
		,
		ReturnType< $mol_follower['offset'] >
	>
	type $mol_follower__align_mol_pop_4 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_align'] >
		,
		ReturnType< $mol_follower['align'] >
	>
	type $mol_follower__Anchor_mol_pop_5 = $mol_type_enforce<
		ReturnType< $mol_pop['Anchor'] >
		,
		ReturnType< $mol_follower['Anchor'] >
	>
	type $mol_follower__Sub_mol_pop_6 = $mol_type_enforce<
		ReturnType< $mol_pop['Bubble'] >
		,
		ReturnType< $mol_follower['Sub'] >
	>
	export class $mol_pop extends $mol_view {
		bubble( ): any
		Anchor( ): any
		bubble_offset( ): readonly(number)[]
		bubble_align( ): readonly(number)[]
		bubble_content( ): readonly($mol_view_content)[]
		height_max( ): number
		Bubble( ): $mol_pop_bubble
		Follower( ): $mol_follower
		showed( next?: boolean ): boolean
		align_vert( ): string
		align_hor( ): string
		align( ): string
		prefer( ): string
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		sub_visible( ): readonly(any)[]
	}
	
	export class $mol_pop_bubble extends $mol_view {
		content( ): readonly($mol_view_content)[]
		height_max( ): number
		sub( ): ReturnType< $mol_pop_bubble['content'] >
		style( ): ({ 
			'maxHeight': ReturnType< $mol_pop_bubble['height_max'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'tabindex': number,
			'popover': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * `Bubble` that can be shown anchored to `Anchor` element.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
     */
    class $mol_pop extends $.$mol_pop {
        showed(next?: boolean): boolean;
        sub_visible(): any[];
        height_max(): number;
        align(): string;
        align_vert(): "suspense" | "top" | "bottom";
        align_hor(): "suspense" | "left" | "right";
        bubble_offset(): number[];
        bubble_align(): number[];
        bubble(): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_card extends $bog_builderui_div {
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin which adds handlers for keyboard keys.
     * @see [mol_keyboard_code](../keyboard/code/code.ts)
     */
    class $mol_hotkey extends $.$mol_hotkey {
        key(): { [key in keyof typeof $mol_keyboard_code]?: (event: KeyboardEvent) => void; };
        keydown(event?: KeyboardEvent): void;
    }
}

declare namespace $ {

	type $mol_hotkey__mod_ctrl_mol_string_1 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key_mol_string_2 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * An input field for entering single line text.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
     */
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        error_report(): void;
        hint_visible(): string;
        disabled(): boolean;
        autocomplete_native(): "on" | "off";
        selection_watcher(): $mol_dom_listener;
        selection_change(event: Event): void;
        selection_start(): number;
        selection_end(): number;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_field extends $mol_string {
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $mol_gallery__style_mol_gallery_1 = $mol_type_enforce<
		({ 
			'flexGrow': ReturnType< $mol_gallery['side_size'] >,
		}) 
		,
		ReturnType< $mol_gallery['style'] >
	>
	type $mol_gallery__items_mol_gallery_2 = $mol_type_enforce<
		ReturnType< $mol_gallery['side_items'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	export class $mol_gallery extends $mol_view {
		items( ): readonly($mol_view)[]
		side_size( id: any): string
		side_items( id: any): readonly($mol_view)[]
		sub( ): ReturnType< $mol_gallery['items'] >
		Side( id: any): $mol_gallery
	}
	
}

//# sourceMappingURL=gallery.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
     */
    class $mol_gallery extends $.$mol_gallery {
        sub(): readonly $mol_view[];
        side_items(id: number): $mol_view[];
        side_size(id: number): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_svg_group extends $mol_svg {
		dom_name( ): string
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {
    class $mol_vector<Value, Length extends number> extends Array<Value> {
        get length(): Length;
        constructor(...values: Value[] & {
            length: Length;
        });
        map<Res>(convert: (value: Value, index: number, array: this) => Res, self?: any): $mol_vector<Res, Length>;
        merged<Patch>(patches: readonly Patch[] & {
            length: Length;
        }, combine: (value: Value, patch: Patch) => Value): this;
        limited(this: $mol_vector<number, Length>, limits: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
        added0(this: $mol_vector<number, Length>, diff: number): this;
        added1(this: $mol_vector<number, Length>, diff: readonly number[] & {
            length: Length;
        }): this;
        substracted1(this: $mol_vector<number, Length>, diff: readonly number[] & {
            length: Length;
        }): this;
        multed0(this: $mol_vector<number, Length>, mult: number): this;
        multed1(this: $mol_vector<number, Length>, mults: readonly number[] & {
            length: Length;
        }): this;
        divided1(this: $mol_vector<number, Length>, mults: readonly number[] & {
            length: Length;
        }): this;
        powered0(this: $mol_vector<number, Length>, mult: number): this;
        expanded1(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly number[] & {
            length: Length;
        }): this;
        expanded2(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
        center<Item extends $mol_vector<number, number>>(this: $mol_vector<Item, Length>): Item;
        distance(this: $mol_vector<$mol_vector<number, number>, Length>): number;
        transponed(this: $mol_vector<$mol_vector<number, number>, Length>): $mol_vector<$mol_vector<number, Length>, typeof this[0]['length']>;
        get x(): Value;
        set x(next: Value);
        get y(): Value;
        set y(next: Value);
        get z(): Value;
        set z(next: Value);
    }
    class $mol_vector_1d<Value> extends $mol_vector<Value, 1> {
    }
    class $mol_vector_2d<Value> extends $mol_vector<Value, 2> {
    }
    class $mol_vector_3d<Value> extends $mol_vector<Value, 3> {
    }
    class $mol_vector_range<Value> extends $mol_vector<Value, 2> {
        0: Value;
        1: Value;
        constructor(min: Value, max?: Value);
        get min(): Value;
        set min(next: Value);
        get max(): Value;
        set max(next: Value);
        get inversed(): $mol_vector_range<Value>;
        expanded0(value: Value): $mol_vector_range<Value>;
    }
    let $mol_vector_range_full: $mol_vector_range<number>;
    class $mol_vector_matrix<Width extends number, Height extends number> extends $mol_vector<readonly number[] & {
        length: Width;
    }, Height> {
        added2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
        multed2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
    }
}

declare namespace $ {

	export class $mol_svg_title extends $mol_svg {
		dom_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=title.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_plot_graph_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_2d__mol_plot_graph_9 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['viewport_x'] >, ReturnType< $mol_plot_graph['viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_11 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_pane_x'] >, ReturnType< $mol_plot_graph['dimensions_pane_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_12 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_x'] >, ReturnType< $mol_plot_graph['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_13 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_14 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['gap_x'] >, ReturnType< $mol_plot_graph['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_svg_title__title_mol_plot_graph_15 = $mol_type_enforce<
		ReturnType< $mol_plot_graph['hint'] >
		,
		ReturnType< $mol_svg_title['title'] >
	>
	export class $mol_plot_graph extends $mol_svg_group {
		type( ): string
		color( ): string
		viewport_x( ): $mol_vector_range<number>
		viewport_y( ): $mol_vector_range<number>
		dimensions_pane_x( ): $mol_vector_range<number>
		dimensions_pane_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		title( ): string
		hint( ): ReturnType< $mol_plot_graph['title'] >
		series_x( ): readonly(number)[]
		series_y( ): readonly(number)[]
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph['type'] >,
		})  & ReturnType< $mol_svg_group['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph['color'] >,
		})  & ReturnType< $mol_svg_group['style'] >
		viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		shift( ): readonly(number)[]
		scale( ): readonly(number)[]
		cursor_position( ): $mol_vector_2d<number>
		dimensions_pane( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		size_real( ): $mol_vector_2d<number>
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		repos_x( id: any): number
		repos_y( id: any): number
		indexes( ): readonly(number)[]
		points( ): readonly(readonly(number)[])[]
		front( ): readonly($mol_svg)[]
		back( ): readonly($mol_svg)[]
		Hint( ): $mol_svg_title
		hue( next?: number ): number
		Sample( ): any
	}
	
	export class $mol_plot_graph_sample extends $mol_view {
		type( ): string
		color( ): string
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph_sample['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph_sample['color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=graph.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_plot_graph extends $.$mol_plot_graph {
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        indexes(): readonly number[];
        repos_x(val: number): number;
        repos_y(val: number): number;
        points(): readonly (readonly number[])[];
        series_x(): readonly number[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        color(): string;
        front(): readonly $.$mol_svg[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_gallery__items_mol_chart_legend_1 = $mol_type_enforce<
		ReturnType< $mol_chart_legend['graph_legends'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_view__sub_mol_chart_legend_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_chart_legend extends $mol_scroll {
		graph_legends( ): readonly($mol_view)[]
		Gallery( ): $mol_gallery
		Graph_sample( id: any): any
		Graph_sample_box( id: any): $mol_view
		graph_title( id: any): string
		Graph_title( id: any): $mol_view
		graphs( ): readonly($mol_plot_graph)[]
		graphs_front( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
		Graph_legend( id: any): $mol_view
	}
	
}

//# sourceMappingURL=legend.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_chart_legend extends $.$mol_chart_legend {
        graphs_front(): readonly $mol_plot_graph[];
        graph_legends(): readonly $mol_view[];
        graph_title(index: number): string;
        Graph_sample(index: number): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_vector_2d__mol_touch_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	export class $mol_touch extends $mol_plugin {
		event_start( next?: any ): any
		event_move( next?: any ): any
		event_end( next?: any ): any
		event_leave( next?: any ): any
		event_wheel( next?: any ): any
		start_zoom( next?: number ): number
		start_distance( next?: number ): number
		zoom( next?: number ): number
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( next?: string ): string
		action_point( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		start_pan( next?: readonly(any)[] ): readonly(any)[]
		pan( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		pointer_center( ): $mol_vector_2d<number>
		start_pos( next?: any ): any
		swipe_precision( ): number
		swipe_right( next?: any ): any
		swipe_bottom( next?: any ): any
		swipe_left( next?: any ): any
		swipe_top( next?: any ): any
		swipe_from_right( next?: any ): any
		swipe_from_bottom( next?: any ): any
		swipe_from_left( next?: any ): any
		swipe_from_top( next?: any ): any
		swipe_to_right( next?: any ): any
		swipe_to_bottom( next?: any ): any
		swipe_to_left( next?: any ): any
		swipe_to_top( next?: any ): any
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		style( ): ({ 
			'touch-action': string,
			'overscroll-behavior': string,
		})  & ReturnType< $mol_plugin['style'] >
		event( ): ({ 
			pointerdown( next?: ReturnType< $mol_touch['event_start'] > ): ReturnType< $mol_touch['event_start'] >,
			pointermove( next?: ReturnType< $mol_touch['event_move'] > ): ReturnType< $mol_touch['event_move'] >,
			pointerup( next?: ReturnType< $mol_touch['event_end'] > ): ReturnType< $mol_touch['event_end'] >,
			pointerleave( next?: ReturnType< $mol_touch['event_leave'] > ): ReturnType< $mol_touch['event_leave'] >,
			wheel( next?: ReturnType< $mol_touch['event_wheel'] > ): ReturnType< $mol_touch['event_wheel'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=touch.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin for touch gestures.
     * @see [mol_plugin](../plugin/readme.md)
     */
    class $mol_touch extends $.$mol_touch {
        auto(): void;
        pointer_events(next?: readonly PointerEvent[]): readonly PointerEvent[];
        pointer_coords(): $mol_vector<$mol_vector_2d<number>, number>;
        pointer_center(): $mol_vector_2d<number>;
        event_coords(event: PointerEvent | WheelEvent): $mol_vector_2d<number>;
        action_point(): $mol_vector_2d<number>;
        event_eat(event: PointerEvent | WheelEvent): string;
        event_start(event: PointerEvent): void;
        event_move(event: PointerEvent): void;
        event_end(event: PointerEvent): void;
        event_leave(event: PointerEvent): void;
        swipe_left(event: PointerEvent): void;
        swipe_right(event: PointerEvent): void;
        swipe_top(event: PointerEvent): void;
        swipe_bottom(event: PointerEvent): void;
        event_wheel(event: WheelEvent): void;
    }
}

declare namespace $ {

	type $mol_vector_range__mol_plot_pane_1 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_left'] >, ReturnType< $mol_plot_pane['gap_right'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_2 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_bottom'] >, ReturnType< $mol_plot_pane['gap_top'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_9 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_touch__zoom_mol_plot_pane_11 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['zoom'] >
		,
		ReturnType< $mol_touch['zoom'] >
	>
	type $mol_touch__pan_mol_plot_pane_12 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['shift'] >
		,
		ReturnType< $mol_touch['pan'] >
	>
	type $mol_touch__allow_draw_mol_plot_pane_13 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_draw'] >
		,
		ReturnType< $mol_touch['allow_draw'] >
	>
	type $mol_touch__allow_pan_mol_plot_pane_14 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_pan'] >
		,
		ReturnType< $mol_touch['allow_pan'] >
	>
	type $mol_touch__allow_zoom_mol_plot_pane_15 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_zoom'] >
		,
		ReturnType< $mol_touch['allow_zoom'] >
	>
	type $mol_touch__draw_start_mol_plot_pane_16 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_start'] >
		,
		ReturnType< $mol_touch['draw_start'] >
	>
	type $mol_touch__draw_mol_plot_pane_17 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw'] >
		,
		ReturnType< $mol_touch['draw'] >
	>
	type $mol_touch__draw_end_mol_plot_pane_18 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_end'] >
		,
		ReturnType< $mol_touch['draw_end'] >
	>
	type $mol_vector_2d__mol_plot_pane_19 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_x'] >, ReturnType< $mol_plot_pane['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_20 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['shift_limit_x'] >, ReturnType< $mol_plot_pane['shift_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_21 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_22 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_23 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['scale_limit_x'] >, ReturnType< $mol_plot_pane['scale_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_24 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_25 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_26 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_27 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_28 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_x'] >, ReturnType< $mol_plot_pane['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_29 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_viewport_x'] >, ReturnType< $mol_plot_pane['dimensions_viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_plot_pane extends $mol_svg_root {
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		shift_limit_x( ): $mol_vector_range<number>
		shift_limit_y( ): $mol_vector_range<number>
		scale_limit_x( ): $mol_vector_range<number>
		scale_limit_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		dimensions_viewport_x( ): $mol_vector_range<number>
		dimensions_viewport_y( ): $mol_vector_range<number>
		graphs_sorted( ): readonly($mol_svg)[]
		graphs( ): readonly($mol_plot_graph)[]
		graphs_positioned( ): ReturnType< $mol_plot_pane['graphs'] >
		graphs_visible( ): ReturnType< $mol_plot_pane['graphs_positioned'] >
		zoom( next?: number ): number
		cursor_position( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['pointer_center'] >
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_type'] >
		action_point( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_point'] >
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		Touch( ): $mol_touch
		aspect( ): string
		hue_base( next?: number ): number
		hue_shift( next?: number ): number
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_right( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_top( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap_bottom( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_default( ): $mol_vector_2d<number>
		shift( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		scale_default( ): $mol_vector_2d<number>
		scale( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_x( next?: number ): number
		scale_y( next?: number ): number
		size( ): $mol_vector_2d<number>
		size_real( ): $mol_vector_2d<number>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions_viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		sub( ): ReturnType< $mol_plot_pane['graphs_sorted'] >
		graphs_colored( ): ReturnType< $mol_plot_pane['graphs_visible'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=pane.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Fastest plot lib for vector graphics.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
     */
    class $mol_plot_pane extends $.$mol_plot_pane {
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        size(): $mol_vector_2d<number>;
        graph_hue(index: number): number;
        graphs_colored(): $.$mol_plot_graph[];
        size_real(): $mol_vector_2d<number>;
        view_box(): string;
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        scale_default(): $mol_vector_2d<number>;
        scale(next?: $mol_vector_2d<number>): $mol_vector_2d<number>;
        scale_x(next?: number): number;
        scale_y(next?: number): number;
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_default(): $mol_vector_2d<number>;
        graph_touched: boolean;
        shift(next?: $mol_vector_2d<number>): $mol_vector_2d<number>;
        reset(event?: Event): void;
        graphs_visible(): $.$mol_plot_graph[];
        graphs_positioned(): readonly $.$mol_plot_graph[];
        dimensions_viewport(): $mol_vector<$mol_vector_range<number>, 2>;
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        graphs_sorted(): $.$mol_svg[];
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	type $mol_chart_legend__graphs_mol_chart_1 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs_colored'] >
		,
		ReturnType< $mol_chart_legend['graphs'] >
	>
	type __mol_chart_2 = $mol_type_enforce<
		Parameters< $mol_chart['zoom'] >[0]
		,
		Parameters< ReturnType< $mol_chart['Plot'] >['scale_x'] >[0]
	>
	type $mol_plot_pane__zoom_mol_chart_3 = $mol_type_enforce<
		ReturnType< $mol_chart['zoom'] >
		,
		ReturnType< $mol_plot_pane['zoom'] >
	>
	type $mol_plot_pane__gap_left_mol_chart_4 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_left'] >
		,
		ReturnType< $mol_plot_pane['gap_left'] >
	>
	type $mol_plot_pane__gap_right_mol_chart_5 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_right'] >
		,
		ReturnType< $mol_plot_pane['gap_right'] >
	>
	type $mol_plot_pane__gap_bottom_mol_chart_6 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_bottom'] >
		,
		ReturnType< $mol_plot_pane['gap_bottom'] >
	>
	type $mol_plot_pane__gap_top_mol_chart_7 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_top'] >
		,
		ReturnType< $mol_plot_pane['gap_top'] >
	>
	type $mol_plot_pane__graphs_mol_chart_8 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs'] >
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	type $mol_plot_pane__hue_base_mol_chart_9 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_base'] >
		,
		ReturnType< $mol_plot_pane['hue_base'] >
	>
	type $mol_plot_pane__hue_shift_mol_chart_10 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_shift'] >
		,
		ReturnType< $mol_plot_pane['hue_shift'] >
	>
	export class $mol_chart extends $mol_view {
		Legend( ): $mol_chart_legend
		zoom( next?: ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] > ): ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] >
		graphs_colored( ): ReturnType< ReturnType< $mol_chart['Plot'] >['graphs_colored'] >
		hue_base( ): number
		hue_shift( ): number
		Plot( ): $mol_plot_pane
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_chart['gap_hor'] >
		gap_right( ): ReturnType< $mol_chart['gap_hor'] >
		gap_bottom( ): ReturnType< $mol_chart['gap_vert'] >
		gap_top( ): ReturnType< $mol_chart['gap_vert'] >
		graphs( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map
declare namespace $ {

	export class $bog_builderui_chart extends $mol_chart {
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
    class $mol_dom_event<EventType extends Event> extends $mol_object {
        readonly native: EventType;
        constructor(native: EventType);
        prevented(next?: boolean): boolean;
        static wrap<EventType extends Event>(event: EventType): $mol_dom_event<EventType>;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub_mol_check_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Checkbox UI component. See Variants for more concrete implementations.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
     */
    class $mol_check extends $.$mol_check {
        click(next?: Event): void;
        sub(): readonly $mol_view_content[];
        label(): readonly any[];
        aria_checked(): string;
    }
}

declare namespace $ {

	type $mol_check__minimal_width_mol_pick_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_width'] >
	>
	type $mol_check__minimal_height_mol_pick_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	type $mol_check__enabled_mol_pick_3 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__checked_mol_pick_4 = $mol_type_enforce<
		ReturnType< $mol_pick['showed'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__clicks_mol_pick_5 = $mol_type_enforce<
		ReturnType< $mol_pick['clicks'] >
		,
		ReturnType< $mol_check['clicks'] >
	>
	type $mol_check__sub_mol_pick_6 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_content'] >
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_check__hint_mol_pick_7 = $mol_type_enforce<
		ReturnType< $mol_pick['hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	export class $mol_pick extends $mol_pop {
		keydown( next?: any ): any
		trigger_enabled( ): boolean
		clicks( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		hint( ): string
		Trigger( ): $mol_check
		event( ): ({ 
			keydown( next?: ReturnType< $mol_pick['keydown'] > ): ReturnType< $mol_pick['keydown'] >,
		})  & ReturnType< $mol_pop['event'] >
		Anchor( ): ReturnType< $mol_pick['Trigger'] >
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Pop-up display and hide by mouse click, also hide by unfocus.
     * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
     */
    class $mol_pick extends $.$mol_pick {
        keydown(event: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_paragraph extends $.$mol_paragraph {
        maximal_width(): number;
        width_limit(): number;
        minimal_width(): number;
        row_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {
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
    /**
     * Reqursive converts intersection of records to record of intersections
     *
     * 	// { a : { x : 1 , y : 2 } }
     * 	$mol_type_merge< { a : { x : 1 } }&{ a : { y : 2 } } >
     */
    type $mol_type_merge<Intersection> = Intersection extends (...a: any[]) => any ? Intersection : Intersection extends new (...a: any[]) => any ? Intersection : Intersection extends object ? $mol_type_merge_object<Intersection> extends Intersection ? true extends $mol_type_equals<{
        [Key in keyof Intersection]: Intersection[Key];
    }, Intersection> ? Intersection : {
        [Key in keyof Intersection]: $mol_type_merge<Intersection[Key]>;
    } : Intersection : Intersection;
    /**
     * Flat converts intersection of records to record of intersections
     *
     * 	// { a: 1, b: 2 }
     * 	$mol_type_merge< { a: 1 } & { b: 2 } >
     */
    type $mol_type_merge_object<Intersection> = {
        [Key in keyof Intersection]: Intersection[Key];
    };
}

declare namespace $ {
    /**
     * Converts union of types to intersection of same types
     *
     * 	$mol_type_intersect< number | string > // number & string
     */
    type $mol_type_intersect<Union> = (Union extends any ? (_: Union) => void : never) extends ((_: infer Intersection) => void) ? Intersection : never;
}

declare namespace $ {
    type $mol_unicode_category = [$mol_unicode_category_binary] | ['General_Category', $mol_char_category_general] | ['Script', $mol_unicode_category_script] | ['Script_Extensions', $mol_unicode_category_script];
    type $mol_unicode_category_binary = 'ASCII' | 'ASCII_Hex_Digit' | 'Alphabetic' | 'Any' | 'Assigned' | 'Bidi_Control' | 'Bidi_Mirrored' | 'Case_Ignorable' | 'Cased' | 'Changes_When_Casefolded' | 'Changes_When_Casemapped' | 'Changes_When_Lowercased' | 'Changes_When_NFKC_Casefolded' | 'Changes_When_Titlecased' | 'Changes_When_Uppercased' | 'Dash' | 'Default_Ignorable_Code_Point' | 'Deprecated' | 'Diacritic' | 'Emoji' | 'Emoji_Component' | 'Emoji_Modifier' | 'Emoji_Modifier_Base' | 'Emoji_Presentation' | 'Extended_Pictographic' | 'Extender' | 'Grapheme_Base' | 'Grapheme_Extend' | 'Hex_Digit' | 'IDS_Binary_Operator' | 'IDS_Trinary_Operator' | 'ID_Continue' | 'ID_Start' | 'Ideographic' | 'Join_Control' | 'Logical_Order_Exception' | 'Lowercase' | 'Math' | 'Noncharacter_Code_Point' | 'Pattern_Syntax' | 'Pattern_White_Space' | 'Quotation_Mark' | 'Radical' | 'Regional_Indicator' | 'Sentence_Terminal' | 'Soft_Dotted' | 'Terminal_Punctuation' | 'Unified_Ideograph' | 'Uppercase' | 'Variation_Selector' | 'White_Space' | 'XID_Continue' | 'XID_Start';
    type $mol_char_category_general = 'Cased_Letter' | 'Close_Punctuation' | 'Connector_Punctuation' | 'Control' | 'Currency_Symbol' | 'Dash_Punctuation' | 'Decimal_Number' | 'Enclosing_Mark' | 'Final_Punctuation' | 'Format' | 'Initial_Punctuation' | 'Letter' | 'Letter_Number' | 'Line_Separator' | 'Lowercase_Letter' | 'Mark' | 'Math_Symbol' | 'Modifier_Letter' | 'Modifier_Symbol' | 'Nonspacing_Mark' | 'Number' | 'Open_Punctuation' | 'Other' | 'Other_Letter' | 'Other_Number' | 'Other_Punctuation' | 'Other_Symbol' | 'Paragraph_Separator' | 'Private_Use' | 'Punctuation' | 'Separator' | 'Space_Separator' | 'Spacing_Mark' | 'Surrogate' | 'Symbol' | 'Titlecase_Letter' | 'Unassigned' | 'Uppercase_Letter';
    type $mol_unicode_category_script = 'Adlam' | 'Ahom' | 'Anatolian_Hieroglyphs' | 'Arabic' | 'Armenian' | 'Avestan' | 'Balinese' | 'Bamum' | 'Bassa_Vah' | 'Batak' | 'Bengali' | 'Bhaiksuki' | 'Bopomofo' | 'Brahmi' | 'Braille' | 'Buginese' | 'Buhid' | 'Canadian_Aboriginal' | 'Carian' | 'Caucasian_Albanian' | 'Chakma' | 'Cham' | 'Chorasmian' | 'Cherokee' | 'Common' | 'Coptic' | 'Cuneiform' | 'Cypriot' | 'Cyrillic' | 'Deseret' | 'Devanagari' | 'Dives_Akuru' | 'Dogra' | 'Duployan' | 'Egyptian_Hieroglyphs' | 'Elbasan' | 'Elymaic' | 'Ethiopic' | 'Georgian' | 'Glagolitic' | 'Gothic' | 'Grantha' | 'Greek' | 'Gujarati' | 'Gunjala_Gondi' | 'Gurmukhi' | 'Han' | 'Hangul' | 'Hanifi_Rohingya' | 'Hanunoo' | 'Hatran' | 'Hebrew' | 'Hiragana' | 'Imperial_Aramaic' | 'Inherited' | 'Inscriptional_Pahlavi' | 'Inscriptional_Parthian' | 'Javanese' | 'Kaithi' | 'Kannada' | 'Katakana' | 'Kayah_Li' | 'Kharoshthi' | 'Khitan_Small_Script' | 'Khmer' | 'Khojki' | 'Khudawadi' | 'Lao' | 'Latin' | 'Lepcha' | 'Limbu' | 'Linear_A' | 'Linear_B' | 'Lisu' | 'Lycian' | 'Lydian' | 'Mahajani' | 'Makasar' | 'Malayalam' | 'Mandaic' | 'Manichaean' | 'Marchen' | 'Medefaidrin' | 'Masaram_Gondi' | 'Meetei_Mayek' | 'Mende_Kikakui' | 'Meroitic_Cursive' | 'Meroitic_Hieroglyphs' | 'Miao' | 'Modi' | 'Mongolian' | 'Mro' | 'Multani' | 'Myanmar' | 'Nabataean' | 'Nandinagari' | 'New_Tai_Lue' | 'Newa' | 'Nko' | 'Nushu' | 'Nyiakeng_Puachue_Hmong' | 'Ogham' | 'Ol_Chiki' | 'Old_Hungarian' | 'Old_Italic' | 'Old_North_Arabian' | 'Old_Permic' | 'Old_Persian' | 'Old_Sogdian' | 'Old_South_Arabian' | 'Old_Turkic' | 'Oriya' | 'Osage' | 'Osmanya' | 'Pahawh_Hmong' | 'Palmyrene' | 'Pau_Cin_Hau' | 'Phags_Pa' | 'Phoenician' | 'Psalter_Pahlavi' | 'Rejang' | 'Runic' | 'Samaritan' | 'Saurashtra' | 'Sharada' | 'Shavian' | 'Siddham' | 'SignWriting' | 'Sinhala' | 'Sogdian' | 'Sora_Sompeng' | 'Soyombo' | 'Sundanese' | 'Syloti_Nagri' | 'Syriac' | 'Tagalog' | 'Tagbanwa' | 'Tai_Le' | 'Tai_Tham' | 'Tai_Viet' | 'Takri' | 'Tamil' | 'Tangut' | 'Telugu' | 'Thaana' | 'Thai' | 'Tibetan' | 'Tifinagh' | 'Tirhuta' | 'Ugaritic' | 'Vai' | 'Wancho' | 'Warang_Citi' | 'Yezidi' | 'Yi' | 'Zanabazar_Square';
}

interface String {
    match<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.match]>;
    matchAll<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.matchAll]>;
}
declare namespace $ {
    type Groups_to_params<T> = {
        [P in keyof T]?: T[P] | boolean | undefined;
    };
    export type $mol_regexp_source = number | string | RegExp | {
        [key in string]: $mol_regexp_source;
    } | readonly [$mol_regexp_source, ...$mol_regexp_source[]];
    export type $mol_regexp_groups<Source extends $mol_regexp_source> = Source extends number ? {} : Source extends string ? {} : Source extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{
        [key in Extract<keyof Source, number>]: $mol_regexp_groups<Source[key]>;
    }[Extract<keyof Source, number>]>> : Source extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> ? {} : NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> : Source extends {
        readonly [key in string]: $mol_regexp_source;
    } ? $mol_type_merge<$mol_type_intersect<{
        [key in keyof Source]: $mol_type_merge<$mol_type_override<{
            readonly [k in Extract<keyof Source, string>]: string;
        }, {
            readonly [k in key]: Source[key] extends string ? Source[key] : string;
        }> & $mol_regexp_groups<Source[key]>>;
    }[keyof Source]>> : never;
    /** Type safe reguar expression builder */
    export class $mol_regexp<Groups extends Record<string, string>> extends RegExp {
        readonly groups: (Extract<keyof Groups, string>)[];
        /** Prefer to use $mol_regexp.from */
        constructor(source: string, flags?: string, groups?: (Extract<keyof Groups, string>)[]);
        [Symbol.matchAll](str: string): RegExpStringIterator<RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }>>;
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str: string): null | RegExpMatchArray;
        /** Splits string by regexp edges */
        [Symbol.split](str: string): string[];
        test(str: string): boolean;
        exec(str: string): RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }> | null;
        generate(params: Groups_to_params<Groups>): string | null;
        get native(): RegExp;
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated<Chunk extends $mol_regexp_source, Sep extends $mol_regexp_source>(chunk: Chunk, sep: Sep): $mol_regexp<[$mol_regexp<[[Chunk], Sep] extends infer T ? T extends [[Chunk], Sep] ? T extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key in Extract<keyof T, number>]: $mol_regexp_groups<T[key]>; }[Extract<keyof T, number>]>> : T extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T["exec"]>>["groups"]> : T extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_1 in keyof T]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T, string>]: string; }, key_1> & { readonly [k_1 in key_1]: T[key_1] extends string ? T[key_1] : string; } & $mol_regexp_groups<T[key_1]>>; }[keyof T]>> : never : never : never>, Chunk] extends infer T_1 ? T_1 extends [$mol_regexp<[[Chunk], Sep] extends infer T_2 ? T_2 extends [[Chunk], Sep] ? T_2 extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key_4 in Extract<keyof T_2, number>]: $mol_regexp_groups<T_2[key_4]>; }[Extract<keyof T_2, number>]>> : T_2 extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T_2["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T_2["exec"]>>["groups"]> : T_2 extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_5 in keyof T_2]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T_2, string>]: string; }, key_5> & { readonly [k_1 in key_5]: T_2[key_5] extends string ? T_2[key_5] : string; } & $mol_regexp_groups<T_2[key_5]>>; }[keyof T_2]>> : never : never : never>, Chunk] ? T_1 extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{ [key_2 in Extract<keyof T_1, number>]: $mol_regexp_groups<T_1[key_2]>; }[Extract<keyof T_1, number>]>> : T_1 extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<T_1["exec"]>>["groups"]> ? {} : NonNullable<NonNullable<ReturnType<T_1["exec"]>>["groups"]> : T_1 extends {
            readonly [x: string]: $mol_regexp_source;
        } ? $mol_type_merge<$mol_type_intersect<{ [key_3 in keyof T_1]: $mol_type_merge<Omit<{ readonly [k in Extract<keyof T_1, string>]: string; }, key_3> & { readonly [k_1 in key_3]: T_1[key_3] extends string ? T_1[key_3] : string; } & $mol_regexp_groups<T_1[key_3]>>; }[keyof T_1]>> : never : never : never>;
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that match any of options */
        static vary<Sources extends readonly $mol_regexp_source[]>(sources: Sources, flags?: string): $mol_regexp<$mol_regexp_groups<Sources[number]>>;
        /** Makes regexp that allow absent of this pattern */
        static optional<Source extends $mol_regexp_source>(source: Source): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp that look ahead for pattern */
        static force_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        /** Converts some js values to regexp */
        static from<Source extends $mol_regexp_source>(source: Source, { ignoreCase, multiline }?: Partial<Pick<RegExp, 'ignoreCase' | 'multiline'>>): $mol_regexp<$mol_regexp_groups<Source>>;
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static char_range(from: number, to: number): $mol_regexp<{}>;
        static char_only(...allowed: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static char_except(...forbidden: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static decimal_only: $mol_regexp<{}>;
        static decimal_except: $mol_regexp<{}>;
        static latin_only: $mol_regexp<{}>;
        static latin_except: $mol_regexp<{}>;
        static space_only: $mol_regexp<{}>;
        static space_except: $mol_regexp<{}>;
        static word_break_only: $mol_regexp<{}>;
        static word_break_except: $mol_regexp<{}>;
        static tab: $mol_regexp<{}>;
        static slash_back: $mol_regexp<{}>;
        static nul: $mol_regexp<{}>;
        static char_any: $mol_regexp<{}>;
        static begin: $mol_regexp<{}>;
        static end: $mol_regexp<{}>;
        static or: $mol_regexp<{}>;
        static line_end: $mol_regexp<{
            readonly win_end: string;
            readonly mac_end: string;
        }>;
    }
    export {};
}

declare namespace $ {

	type $mol_paragraph__sub_mol_dimmer_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_dimmer_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Output text with dimmed mismatched substrings.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
     */
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_nav extends $mol_plugin {
		event_key( next?: any ): any
		cycle( next?: boolean ): boolean
		mod_ctrl( ): boolean
		mod_shift( ): boolean
		mod_alt( ): boolean
		keys_x( next?: readonly(any)[] ): readonly(any)[]
		keys_y( next?: readonly(any)[] ): readonly(any)[]
		current_x( next?: any ): any
		current_y( next?: any ): any
		event_up( next?: any ): any
		event_down( next?: any ): any
		event_left( next?: any ): any
		event_right( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_nav['event_key'] > ): ReturnType< $mol_nav['event_key'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Plugin which can navigate in list of items
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
     */
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): undefined;
        event_up(event?: KeyboardEvent): undefined;
        event_down(event?: KeyboardEvent): undefined;
        event_left(event?: KeyboardEvent): undefined;
        event_right(event?: KeyboardEvent): undefined;
        index_y(): number | null;
        index_x(): number | null;
    }
}

declare namespace $ {
    function $mol_support_css_overflow_anchor(this: $): boolean;
}

declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
     * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
     */
    class $mol_list extends $.$mol_list {
        sub(): readonly $mol_view[];
        render_visible_only(): boolean;
        _view_window_last: number[];
        view_window(next?: [number, number]): [number, number];
        item_height_min(index: number): number;
        row_width_min(index: number): number;
        gap_before(): number;
        gap_after(): number;
        sub_visible(): $mol_view[];
        minimal_height(): number;
        minimal_width(): number;
        force_render(path: Set<$mol_view>): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_search_1 = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $mol_search['clear'] > ): ReturnType< $mol_search['clear'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_nav__keys_y_mol_search_2 = $mol_type_enforce<
		ReturnType< $mol_search['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_search_3 = $mol_type_enforce<
		ReturnType< $mol_search['nav_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_string__value_mol_search_4 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_search_5 = $mol_type_enforce<
		ReturnType< $mol_search['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_mol_search_6 = $mol_type_enforce<
		ReturnType< $mol_search['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_search_7 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__keyboard_mol_search_8 = $mol_type_enforce<
		ReturnType< $mol_search['keyboard'] >
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__enter_mol_search_9 = $mol_type_enforce<
		ReturnType< $mol_search['enter'] >
		,
		ReturnType< $mol_string['enter'] >
	>
	type $mol_button_minor__hint_mol_search_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_search_11 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_search_12 = $mol_type_enforce<
		ReturnType< $mol_search['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_list__rows_mol_search_14 = $mol_type_enforce<
		ReturnType< $mol_search['menu_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_search_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_dimmer__haystack_mol_search_16 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_search_17 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_search_plugins__18 = $mol_type_enforce<
		ReturnType< $mol_pop['plugins'] >[number]
		,
		$mol_plugin
	>
	type $mol_view__sub_mol_search_19 = $mol_type_enforce<
		ReturnType< $mol_search['anchor_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_mol_search_20 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_select'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_21 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_search extends $mol_pop {
		clear( next?: any ): any
		Hotkey( ): $mol_hotkey
		nav_components( ): readonly($mol_view)[]
		nav_focused( next?: any ): any
		Nav( ): $mol_nav
		suggests_showed( next?: boolean ): boolean
		query( next?: string ): string
		hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		keyboard( ): string
		enter( ): string
		bring( ): ReturnType< ReturnType< $mol_search['Query'] >['bring'] >
		Query( ): $mol_string
		Clear_icon( ): $mol_icon_close
		Clear( ): $mol_button_minor
		anchor_content( ): readonly(any)[]
		menu_items( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		suggest_select( id: any, next?: any ): any
		suggest_label( id: any): string
		Suggest_label( id: any): $mol_dimmer
		suggest_content( id: any): readonly($mol_view_content)[]
		suggests( ): readonly(string)[]
		plugins( ): readonly($mol_plugin)[]
		showed( next?: ReturnType< $mol_search['suggests_showed'] > ): ReturnType< $mol_search['suggests_showed'] >
		align_hor( ): string
		Anchor( ): $mol_view
		bubble_content( ): readonly($mol_view_content)[]
		Suggest( id: any): $mol_button_minor
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Search input with suggest and clear button.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
     */
    class $mol_search extends $.$mol_search {
        anchor_content(): ($.$mol_string | $mol_button_minor)[];
        suggests_showed(next?: boolean): boolean;
        suggest_selected(next?: string): void;
        nav_components(): ($.$mol_string | $mol_button_minor)[];
        nav_focused(component?: $mol_view): $mol_view | $.$mol_string | null;
        suggest_label(key: string): string;
        menu_items(): $mol_button_minor[];
        suggest_select(id: string, event?: MouseEvent): void;
        clear(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_dots_vertical extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=vertical.view.tree.d.ts.map
declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => readonly string[]): (variant: Variant) => boolean;
}

declare namespace $ {

	type $mol_dimmer__haystack_mol_select_1 = $mol_type_enforce<
		ReturnType< $mol_select['option_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_select_2 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_nav__keys_y_mol_select_3 = $mol_type_enforce<
		ReturnType< $mol_select['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_select_4 = $mol_type_enforce<
		ReturnType< $mol_select['option_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_nav__cycle_mol_select_5 = $mol_type_enforce<
		ReturnType< $mol_select['nav_cycle'] >
		,
		ReturnType< $mol_nav['cycle'] >
	>
	type $mol_list__rows_mol_select_6 = $mol_type_enforce<
		ReturnType< $mol_select['menu_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_select_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_button_minor__enabled_mol_select_8 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__event_click_mol_select_9 = $mol_type_enforce<
		ReturnType< $mol_select['event_select'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__sub_mol_select_10 = $mol_type_enforce<
		ReturnType< $mol_select['option_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_select_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__query_mol_select_12 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint_mol_select_13 = $mol_type_enforce<
		ReturnType< $mol_select['filter_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__submit_mol_select_14 = $mol_type_enforce<
		ReturnType< $mol_select['submit'] >
		,
		ReturnType< $mol_search['submit'] >
	>
	type $mol_search__enabled_mol_select_15 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_search['enabled'] >
	>
	export class $mol_select extends $mol_pick {
		enabled( ): boolean
		event_select( id: any, next?: any ): any
		option_label( id: any): string
		filter_pattern( next?: string ): string
		Option_label( id: any): $mol_dimmer
		option_content( id: any): readonly(any)[]
		no_options_message( ): string
		nav_components( ): readonly($mol_view)[]
		option_focused( next?: any ): any
		nav_cycle( next?: boolean ): boolean
		Nav( ): $mol_nav
		menu_content( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		filter_hint( ): string
		submit( next?: any ): any
		dictionary( next?: Record<string, any> ): Record<string, any>
		options( ): readonly(string)[]
		value( next?: string ): string
		option_label_default( ): string
		Option_row( id: any): $mol_button_minor
		No_options( ): $mol_view
		plugins( ): readonly(any)[]
		hint( ): string
		bubble_content( ): readonly(any)[]
		Filter( ): $mol_search
		Trigger_icon( ): $mol_icon_dots_vertical
		trigger_enabled( ): ReturnType< $mol_select['enabled'] >
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Allow user to select value from various options and displays current value.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
     */
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        open(): void;
        options(): readonly string[];
        options_filtered(): readonly string[];
        option_label(id: string): any;
        option_rows(): $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $.$mol_search | null;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($mol_button_minor | $.$mol_search)[];
        trigger_content(): readonly $mol_view_content[];
        menu_content(): $mol_view[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_select extends $mol_select {
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_pop_over extends $mol_pop {
		hovered( next?: boolean ): boolean
		event_show( next?: any ): any
		event_hide( next?: any ): any
		showed( ): ReturnType< $mol_pop_over['hovered'] >
		attr( ): ({ 
			'tabindex': number,
		})  & ReturnType< $mol_pop['attr'] >
		event( ): ({ 
			mouseenter( next?: ReturnType< $mol_pop_over['event_show'] > ): ReturnType< $mol_pop_over['event_show'] >,
			mouseleave( next?: ReturnType< $mol_pop_over['event_hide'] > ): ReturnType< $mol_pop_over['event_hide'] >,
		})  & ReturnType< $mol_pop['event'] >
	}
	
}

//# sourceMappingURL=over.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Bubble that can be shown anchored to Anchor element.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_over_demo
     */
    class $mol_pop_over extends $.$mol_pop_over {
        event_show(event?: MouseEvent): void;
        event_hide(event?: MouseEvent): void;
        showed(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_tooltip extends $mol_pop_over {
	}
	
}

//# sourceMappingURL=tooltip.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_menu extends $bog_builderui_card {
		items( ): readonly(any)[]
		sub( ): ReturnType< $bog_builderui_menu['items'] >
	}
	
	export class $bog_builderui_menu_item extends $mol_button_minor {
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_menu__items_bog_norweb_front_export_1 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_export['items'] >
		,
		ReturnType< $bog_builderui_menu['items'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_export_2 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_export['toggle'] > ): ReturnType< $bog_norweb_front_export['toggle'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_export_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_menu_item__title_bog_norweb_front_export_4 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_export['item_label'] >
		,
		ReturnType< $bog_builderui_menu_item['title'] >
	>
	type $bog_builderui_menu_item__click_bog_norweb_front_export_5 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_export['item_click'] >
		,
		ReturnType< $bog_builderui_menu_item['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_export_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_export extends $mol_pop {
		toggle( next?: any ): any
		items( ): readonly(any)[]
		Menu( ): $bog_builderui_menu
		item_label( id: any): string
		item_click( id: any, next?: any ): any
		screen( ): string
		showed( next?: boolean ): boolean
		export_btn_text( ): string
		empty_text( ): string
		Anchor( ): $bog_builderui_div
		bubble_content( ): readonly(any)[]
		Item( id: any): $bog_builderui_menu_item
		Empty( ): $bog_builderui_div
	}
	
}

//# sourceMappingURL=export.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $.$$ {
    type FormatId = 'graphml' | 'gexf' | 'json_graph' | 'png_graph' | 'md_chat' | 'json_chat' | 'csv_dash' | 'json_dash';
    type FormatDef = {
        id: FormatId;
        label_key: string;
        fallback: string;
        ext: string;
        mime: string;
    };
    export class $bog_norweb_front_export extends $.$bog_norweb_front_export {
        toggle(): null;
        formats(): FormatDef[];
        items(): $bog_builderui_div[];
        format_at(i: number): FormatDef;
        item_label(i: number): string;
        item_click(i: number): null;
        filename(f: FormatDef): string;
        payload(id: FormatId): Blob;
        download(f: FormatDef): void;
    }
    export {};
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_topbar_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_topbar_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_topbar_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_topbar_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_topbar_preset__label_bog_norweb_front_topbar_5 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['preset_fast_label'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['label'] >
	>
	type $bog_norweb_front_topbar_preset__active_bog_norweb_front_topbar_6 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['is_fast'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['active'] >
	>
	type $bog_norweb_front_topbar_preset__click_bog_norweb_front_topbar_7 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['click_fast'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['click'] >
	>
	type $bog_norweb_front_topbar_preset__label_bog_norweb_front_topbar_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['preset_accurate_label'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['label'] >
	>
	type $bog_norweb_front_topbar_preset__active_bog_norweb_front_topbar_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['is_accurate'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['active'] >
	>
	type $bog_norweb_front_topbar_preset__click_bog_norweb_front_topbar_10 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['click_accurate'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['click'] >
	>
	type $bog_norweb_front_topbar_preset__label_bog_norweb_front_topbar_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['preset_demo_label'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['label'] >
	>
	type $bog_norweb_front_topbar_preset__active_bog_norweb_front_topbar_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['is_demo'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['active'] >
	>
	type $bog_norweb_front_topbar_preset__click_bog_norweb_front_topbar_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['click_demo'] >
		,
		ReturnType< $bog_norweb_front_topbar_preset['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_topbar_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_topbar_15 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_topbar['open_settings'] > ): ReturnType< $bog_norweb_front_topbar['open_settings'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_topbar_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_export__screen_bog_norweb_front_topbar_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_topbar['screen'] >
		,
		ReturnType< $bog_norweb_front_export['screen'] >
	>
	export class $bog_norweb_front_topbar extends $bog_builderui_div {
		Title( ): $bog_builderui_div
		Subtitle( ): $bog_builderui_div
		Title_block( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Preset_label( ): $bog_builderui_div
		is_fast( ): boolean
		click_fast( next?: any ): any
		Preset_fast( ): $bog_norweb_front_topbar_preset
		is_accurate( ): boolean
		click_accurate( next?: any ): any
		Preset_accurate( ): $bog_norweb_front_topbar_preset
		is_demo( ): boolean
		click_demo( next?: any ): any
		Preset_demo( ): $bog_norweb_front_topbar_preset
		Preset_group( ): $bog_builderui_div
		open_settings( next?: any ): any
		Settings_btn( ): $bog_builderui_div
		Export( ): $bog_norweb_front_export
		screen( ): string
		dataset_id( ): string
		dataset_title( ): string
		screen_title( ): string
		preset( next?: string ): string
		preset_label_text( ): string
		settings_btn_text( ): string
		preset_fast_label( ): string
		preset_accurate_label( ): string
		preset_demo_label( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=topbar.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_topbar extends $.$bog_norweb_front_topbar {
        is_fast(): boolean;
        is_accurate(): boolean;
        is_demo(): boolean;
        click_fast(): null;
        click_accurate(): null;
        click_demo(): null;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_button extends $mol_button_minor {
		minimal_height( ): number
		minimal_width( ): number
		variant( ): string
		attr( ): ({ 
			'bog_builderui_button_variant': ReturnType< $bog_builderui_button['variant'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_settings_group_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_settings_group_2 = $mol_type_enforce<
		({ 
			'bog_norweb_front_settings_group_reindex': ReturnType< $bog_norweb_front_settings_group['reindex'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_group_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_group_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_group_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_group_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_group_7 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings_group['controls'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_settings_group extends $bog_builderui_div {
		Step( ): $bog_builderui_div
		Reindex( ): $bog_builderui_div
		Head( ): $bog_builderui_div
		Title( ): $bog_builderui_div
		Opts( ): $bog_builderui_div
		Controls( ): $bog_builderui_div
		step( ): string
		title( ): string
		opts( ): string
		controls( ): readonly(any)[]
		reindex( ): boolean
		reindex_text( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_tick extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tick.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_check_box extends $mol_check {
		Icon( ): $mol_icon_tick
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_rise_range_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $rise_range_input__disabled_rise_range_5 = $mol_type_enforce<
		ReturnType< $rise_range['disabled'] >
		,
		ReturnType< $rise_range_input['disabled'] >
	>
	type $rise_range_input__min_rise_range_6 = $mol_type_enforce<
		ReturnType< $rise_range['min'] >
		,
		ReturnType< $rise_range_input['min'] >
	>
	type $rise_range_input__max_rise_range_7 = $mol_type_enforce<
		ReturnType< $rise_range['max'] >
		,
		ReturnType< $rise_range_input['max'] >
	>
	type $rise_range_input__step_rise_range_8 = $mol_type_enforce<
		ReturnType< $rise_range['step'] >
		,
		ReturnType< $rise_range_input['step'] >
	>
	type $rise_range_input__value_rise_range_9 = $mol_type_enforce<
		ReturnType< $rise_range['value'] >
		,
		ReturnType< $rise_range_input['value'] >
	>
	type $rise_range_input__event_input_rise_range_10 = $mol_type_enforce<
		ReturnType< $rise_range['event_input'] >
		,
		ReturnType< $rise_range_input['event_input'] >
	>
	type $rise_range_value__sub_rise_range_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_range_value['sub'] >
	>
	type $rise_range_value__disabled_rise_range_12 = $mol_type_enforce<
		ReturnType< $rise_range['disabled'] >
		,
		ReturnType< $rise_range_value['disabled'] >
	>
	type $mol_view__sub_rise_range_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $rise_range extends $mol_view {
		label_min( ): string
		Min( ): $mol_view
		label_medium( ): string
		Medium( ): $mol_view
		label_max( ): string
		Max( ): $mol_view
		Labels( ): $mol_view
		disabled( ): boolean
		min( next?: number ): number
		max( next?: number ): number
		step( next?: number ): number
		value( next?: number ): number
		event_input( next?: any ): any
		Input( ): $rise_range_input
		Value( ): $rise_range_value
		Current( ): $mol_view
		percent( ): string
		minimal_height( ): number
		unit( ): string
		medium( next?: number ): number
		enabled( ): boolean
		sub( ): readonly(any)[]
		attr( ): ({ 
			'disabled': ReturnType< $rise_range['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'--rise_range_percent': ReturnType< $rise_range['percent'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
	export class $rise_range_input extends $mol_view {
		disabled( ): boolean
		min( next?: number ): number
		max( next?: number ): number
		step( next?: number ): number
		value( next?: number ): number
		event_input( next?: any ): any
		dom_name( ): string
		attr( ): ({ 
			'type': string,
			'disabled': ReturnType< $rise_range_input['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
		field( ): ({ 
			'min': ReturnType< $rise_range_input['min'] >,
			'max': ReturnType< $rise_range_input['max'] >,
			'step': ReturnType< $rise_range_input['step'] >,
			'value': ReturnType< $rise_range_input['value'] >,
		})  & ReturnType< $mol_view['field'] >
		event( ): ({ 
			input( next?: ReturnType< $rise_range_input['event_input'] > ): ReturnType< $rise_range_input['event_input'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
	export class $rise_range_value extends $mol_view {
		disabled( ): boolean
		attr( ): ({ 
			'disabled': ReturnType< $rise_range_value['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=range.view.tree.d.ts.map
declare namespace $.$$ {
    class $rise_range extends $.$rise_range {
        event_input(event: Event): void;
        medium(): number;
        label_min(): string;
        label_max(): string;
        label_medium(): string;
        percent(): string;
        disabled(): boolean;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	export class $bog_builderui_slider extends $rise_range {
	}
	
}

//# sourceMappingURL=slider.view.tree.d.ts.map
declare namespace $ {

	type $bog_builderui_div__event_bog_norweb_front_settings_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_settings['close'] > ): ReturnType< $bog_norweb_front_settings['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_settings_5 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_settings['close'] > ): ReturnType< $bog_norweb_front_settings['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_button__title_bog_norweb_front_settings_8 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_builderui_button['title'] >
	>
	type $bog_builderui_button__click_bog_norweb_front_settings_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['preset_fast'] >
		,
		ReturnType< $bog_builderui_button['click'] >
	>
	type $bog_builderui_button__title_bog_norweb_front_settings_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_builderui_button['title'] >
	>
	type $bog_builderui_button__click_bog_norweb_front_settings_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['preset_accurate'] >
		,
		ReturnType< $bog_builderui_button['click'] >
	>
	type $bog_builderui_button__title_bog_norweb_front_settings_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_builderui_button['title'] >
	>
	type $bog_builderui_button__click_bog_norweb_front_settings_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['preset_demo'] >
		,
		ReturnType< $bog_builderui_button['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['chunking_strategy'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_16 = $mol_type_enforce<
		({ 
			'Simple': string,
			'SemanticText': string,
			'SmartSemantic': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_field__type_bog_norweb_front_settings_18 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_builderui_field['type'] >
	>
	type $bog_builderui_field__value_bog_norweb_front_settings_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['chunking_size_str'] >
		,
		ReturnType< $bog_builderui_field['value'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_field__type_bog_norweb_front_settings_22 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_builderui_field['type'] >
	>
	type $bog_builderui_field__value_bog_norweb_front_settings_23 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['chunking_overlap_str'] >
		,
		ReturnType< $bog_builderui_field['value'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_25 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_26 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_27 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_28 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_30 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['extraction_mode'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_31 = $mol_type_enforce<
		({ 
			'single': string,
			'two-stage': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_32 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['extraction_model'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_33 = $mol_type_enforce<
		({ 
			'meno-lite-7b': string,
			'gpt-4': string,
			'llama3-70b': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_34 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['extraction_icl'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_35 = $mol_type_enforce<
		({ 
			'semantic': string,
			'BM25': string,
			'hybrid': string,
			'random': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_36 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_37 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_38 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_39 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $mol_check_box__checked_bog_norweb_front_settings_41 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['summarization_dbscan'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_bog_norweb_front_settings_42 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_bog_norweb_front_settings_43 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['summarization_llm'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_bog_norweb_front_settings_44 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_45 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_46 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_47 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_48 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_50 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['communities_algo'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_51 = $mol_type_enforce<
		({ 
			'Leiden': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_slider__value_bog_norweb_front_settings_55 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['communities_resolution_x10'] >
		,
		ReturnType< $bog_builderui_slider['value'] >
	>
	type $bog_builderui_slider__min_bog_norweb_front_settings_56 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['min'] >
	>
	type $bog_builderui_slider__max_bog_norweb_front_settings_57 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['max'] >
	>
	type $bog_builderui_slider__step_bog_norweb_front_settings_58 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['step'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_59 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_60 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_61 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_62 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $mol_check_box__checked_bog_norweb_front_settings_64 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['refinement_isolated'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_bog_norweb_front_settings_65 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_66 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_67 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_68 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_69 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $bog_builderui_select__value_bog_norweb_front_settings_71 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['search_mode'] >
		,
		ReturnType< $bog_builderui_select['value'] >
	>
	type $bog_builderui_select__dictionary_bog_norweb_front_settings_72 = $mol_type_enforce<
		({ 
			'Local': string,
			'Global': string,
			'Naive': string,
			'Mix': string,
			'QueryPlan': string,
		}) 
		,
		ReturnType< $bog_builderui_select['dictionary'] >
	>
	type $mol_check_box__checked_bog_norweb_front_settings_73 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['search_rerank'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_bog_norweb_front_settings_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_75 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_76 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_77 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_slider__value_bog_norweb_front_settings_78 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_settings['search_topk'] >
		,
		ReturnType< $bog_builderui_slider['value'] >
	>
	type $bog_builderui_slider__min_bog_norweb_front_settings_79 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['min'] >
	>
	type $bog_builderui_slider__max_bog_norweb_front_settings_80 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['max'] >
	>
	type $bog_builderui_slider__step_bog_norweb_front_settings_81 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_builderui_slider['step'] >
	>
	type $bog_norweb_front_settings_group__step_bog_norweb_front_settings_82 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['step'] >
	>
	type $bog_norweb_front_settings_group__title_bog_norweb_front_settings_83 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['title'] >
	>
	type $bog_norweb_front_settings_group__opts_bog_norweb_front_settings_84 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_norweb_front_settings_group['opts'] >
	>
	type $bog_norweb_front_settings_group__reindex_bog_norweb_front_settings_85 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_norweb_front_settings_group['reindex'] >
	>
	type $bog_norweb_front_settings_group__controls_bog_norweb_front_settings_86 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_settings_group['controls'] >
	>
	type $mol_scroll__sub_bog_norweb_front_settings_87 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_settings_88 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_settings extends $bog_builderui_div {
		close( next?: any ): any
		Backdrop( ): $bog_builderui_div
		Header_title( ): $bog_builderui_div
		Header_sub( ): $bog_builderui_div
		Header_text( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Close_btn( ): $bog_builderui_div
		Header( ): $bog_builderui_div
		preset_fast( next?: any ): any
		Preset_fast( ): $bog_builderui_button
		preset_accurate( next?: any ): any
		Preset_accurate( ): $bog_builderui_button
		preset_demo( next?: any ): any
		Preset_demo( ): $bog_builderui_button
		Presets( ): $bog_builderui_div
		chunking_strategy( next?: string ): string
		Chunking_strategy( ): $bog_builderui_select
		chunking_size_label_text( ): string
		Chunking_size_label( ): $bog_builderui_div
		chunking_size_str( next?: string ): string
		Chunking_size_input( ): $bog_builderui_field
		Chunking_size_row( ): $bog_builderui_div
		chunking_overlap_label_text( ): string
		Chunking_overlap_label( ): $bog_builderui_div
		chunking_overlap_str( next?: string ): string
		Chunking_overlap_input( ): $bog_builderui_field
		Chunking_overlap_row( ): $bog_builderui_div
		Group_chunking( ): $bog_norweb_front_settings_group
		extraction_mode( next?: string ): string
		Extraction_mode( ): $bog_builderui_select
		extraction_model( next?: string ): string
		Extraction_model( ): $bog_builderui_select
		extraction_icl( next?: string ): string
		Extraction_icl( ): $bog_builderui_select
		Group_extraction( ): $bog_norweb_front_settings_group
		summarization_dbscan( next?: boolean ): boolean
		Summarization_dbscan( ): $mol_check_box
		summarization_llm( next?: boolean ): boolean
		Summarization_llm( ): $mol_check_box
		Group_summarization( ): $bog_norweb_front_settings_group
		communities_algo( next?: string ): string
		Communities_algo( ): $bog_builderui_select
		communities_resolution_label_text( ): string
		Communities_resolution_label( ): $bog_builderui_div
		communities_resolution_label( ): string
		Communities_resolution_value( ): $bog_builderui_div
		Communities_resolution_row( ): $bog_builderui_div
		communities_resolution_x10( next?: number ): number
		Communities_resolution( ): $bog_builderui_slider
		Group_communities( ): $bog_norweb_front_settings_group
		refinement_isolated( next?: boolean ): boolean
		Refinement_isolated( ): $mol_check_box
		Group_refinement( ): $bog_norweb_front_settings_group
		search_mode( next?: string ): string
		Search_mode( ): $bog_builderui_select
		search_rerank( next?: boolean ): boolean
		Search_rerank( ): $mol_check_box
		search_topk_label_text( ): string
		Search_topk_label( ): $bog_builderui_div
		search_topk_label( ): string
		Search_topk_value( ): $bog_builderui_div
		Search_topk_row( ): $bog_builderui_div
		search_topk( next?: number ): number
		Search_topk( ): $bog_builderui_slider
		Group_search( ): $bog_norweb_front_settings_group
		Body( ): $mol_scroll
		Panel( ): $bog_builderui_div
		showed( next?: boolean ): boolean
		attr( ): ({ 
			'bog_norweb_front_settings_showed': ReturnType< $bog_norweb_front_settings['showed'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=settings.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_settings extends $.$bog_norweb_front_settings {
        close(): null;
        preset_fast(): null;
        preset_accurate(): null;
        preset_demo(): null;
        apply_preset(name: string): null;
        chunking_strategy(next?: string): string;
        chunking_size_str(next?: string): string;
        chunking_overlap_str(next?: string): string;
        extraction_mode(next?: string): string;
        extraction_model(next?: string): string;
        extraction_icl(next?: string): string;
        summarization_dbscan(next?: boolean): boolean;
        summarization_llm(next?: boolean): boolean;
        communities_algo(next?: string): string;
        communities_resolution_x10(next?: number): number;
        communities_resolution_label(): string;
        refinement_isolated(next?: boolean): boolean;
        search_mode(next?: string): string;
        search_rerank(next?: boolean): boolean;
        search_topk(next?: number): number;
        search_topk_label(): string;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_norweb_front_gallery_card_preview extends $bog_builderui_div {
	}
	
}

//# sourceMappingURL=preview.view.tree.d.ts.map
declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_gallery_card_preview__sub_bog_norweb_front_gallery_card_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_gallery_card_preview['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_card_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_gallery_card extends $bog_builderui_div {
		click( next?: any ): any
		Preview_label( ): $bog_builderui_div
		Domain_badge( ): $bog_builderui_div
		Preview( ): $bog_norweb_front_gallery_card_preview
		Title( ): $bog_builderui_div
		Desc( ): $bog_builderui_div
		tag_nodes( ): string
		Tag_nodes( ): $bog_builderui_div
		tag_edges( ): string
		Tag_edges( ): $bog_builderui_div
		tag_comms( ): string
		Tag_comms( ): $bog_builderui_div
		Tags( ): $bog_builderui_div
		id( ): string
		title( ): string
		domain( ): string
		desc( ): string
		nodes( ): string
		edges( ): string
		comms( ): string
		active( ): boolean
		preview_label_text( ): string
		attr( ): ({ 
			'bog_norweb_front_gallery_card_active': ReturnType< $bog_norweb_front_gallery_card['active'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		event( ): ({ 
			click( next?: ReturnType< $bog_norweb_front_gallery_card['click'] > ): ReturnType< $bog_norweb_front_gallery_card['click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_gallery_card extends $.$bog_norweb_front_gallery_card {
        unit(key: 'nodes' | 'edges' | 'comms'): string;
        tag_nodes(): string;
        tag_edges(): string;
        tag_comms(): string;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_progress extends $mol_view {
		value( ): number
		max( ): number
		dom_name( ): string
		attr( ): ({ 
			'value': ReturnType< $bog_builderui_progress['value'] >,
			'max': ReturnType< $bog_builderui_progress['max'] >,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=progress.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__event_bog_norweb_front_gallery_upload_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_gallery_upload['close'] > ): ReturnType< $bog_norweb_front_gallery_upload['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_gallery_upload_5 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_gallery_upload['close'] > ): ReturnType< $bog_norweb_front_gallery_upload['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery_upload['body'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_card__sub_bog_norweb_front_gallery_upload_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_card['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_progress__max_bog_norweb_front_gallery_upload_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery_upload['total_steps'] >
		,
		ReturnType< $bog_builderui_progress['max'] >
	>
	type $bog_builderui_progress__value_bog_norweb_front_gallery_upload_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery_upload['step'] >
		,
		ReturnType< $bog_builderui_progress['value'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery_upload['step_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_gallery_upload_20 = $mol_type_enforce<
		({ 
			'bog_norweb_front_gallery_upload_step_status': ReturnType< $bog_norweb_front_gallery_upload['step_status'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_upload_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_gallery_upload extends $bog_builderui_div {
		close( next?: any ): any
		Backdrop( ): $bog_builderui_div
		panel_title( ): string
		Header_title( ): $bog_builderui_div
		Header_subtitle( ): $bog_builderui_div
		Header_text( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Close_btn( ): $bog_builderui_div
		Header( ): $bog_builderui_div
		Body( ): $bog_builderui_div
		Panel( ): $bog_builderui_card
		Error_title( ): $bog_builderui_div
		Error_text( ): $bog_builderui_div
		Progress_bar( ): $bog_builderui_progress
		progress_label_separator( ): string
		step_label( ): string
		progress_label_slash( ): string
		total_steps_text( ): string
		Progress_label( ): $bog_builderui_div
		Steps_list( ): $bog_builderui_div
		step_status( id: any): string
		step_marker_text( id: any): string
		Step_marker( id: any): $bog_builderui_div
		step_name_text( id: any): string
		Step_name( id: any): $bog_builderui_div
		showed( next?: boolean ): boolean
		kind( ): string
		step( next?: number ): number
		total_steps( ): number
		error( ): string
		complete( next?: any ): any
		title_text( ): string
		subtitle_text( ): string
		panel_title_document_text( ): string
		panel_title_index_text( ): string
		error_too_large_template( ): string
		step_chunking_text( ): string
		step_extraction_text( ): string
		step_summarization_text( ): string
		step_communities_text( ): string
		step_refinement_text( ): string
		step_search_text( ): string
		progress_label_text( ): string
		close_text( ): string
		error_title_text( ): string
		retry_text( ): string
		body( ): readonly(any)[]
		step_rows( ): readonly(any)[]
		attr( ): ({ 
			'bog_norweb_front_gallery_upload_showed': ReturnType< $bog_norweb_front_gallery_upload['showed'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		sub( ): readonly(any)[]
		Error_body( ): $bog_builderui_div
		Progress_body( ): $bog_builderui_div
		Step( id: any): $bog_builderui_div
	}
	
}

//# sourceMappingURL=upload.view.tree.d.ts.map
declare namespace $.$$ {
    const STEP_KEYS: readonly ["chunking", "extraction", "summarization", "communities", "refinement", "search"];
    type StepKey = typeof STEP_KEYS[number];
    type StepStatus = 'pending' | 'active' | 'done';
    export class $bog_norweb_front_gallery_upload extends $.$bog_norweb_front_gallery_upload {
        step(next?: number): number;
        error(next?: string): string;
        has_error(): "false" | "true";
        panel_title(): string;
        body(): $bog_builderui_div[];
        step_label(): string;
        step_rows(): $bog_builderui_div[];
        step_status(key: StepKey): StepStatus;
        step_marker_text(key: StepKey): string;
        step_name_text(key: StepKey): string;
        progress_label_separator(): string;
        progress_label_slash(): string;
        total_steps_text(): string;
        /**
         * Mock pipeline: validates size limit, then advances step 0→6 via setTimeout chain.
         * Returns immediately; UI re-renders on each step setter call.
         */
        start(mock_file_size_mb: number): void;
        tick(next_step: number): void;
        close(): null;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
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
        status(): "unknown" | "success" | "inform" | "redirect" | "wrong" | "failed";
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
    /**
     * Operation descriptor produced by the generator in `-openapi/*.ts`.
     * Each entry carries HTTP method, route template with `{placeholders}`,
     * plus typed `params` / `query` / `body` / `out` marker fields.
     */
    type $bog_norweb_front_api_operation = {
        method: string;
        route: string;
        params: any;
        query: any;
        body: any;
        out: any;
    };
    /** Options passed alongside operation call. */
    type $bog_norweb_front_api_options<Op extends $bog_norweb_front_api_operation> = {
        params?: Op['params'];
        query?: Op['query'];
        body?: Op['body'];
    };
    /**
     * Backend base URL — the ONE line to change when the backend is deployed.
     * No path suffix here: operation `route`s already carry `/api/v1/...`
     * from FastAPI's OpenAPI dump.
     */
    const $bog_norweb_front_api_endpoint_default = "https://ragu-back.duckdns.org";
    /**
     * Effective endpoint: the `?api=<url>` app argument overrides the default,
     * so a freshly deployed backend can be pointed at WITHOUT a rebuild —
     * e.g. `...test.html#!api=https%3A%2F%2Fback.example.com`.
     * Reactive: reads propagate via $mol_state_arg, so changing the arg refetches.
     */
    function $bog_norweb_front_api_endpoint(): string;
    /**
     * Typed REST client factory for OpenAPI-generated operation descriptors.
     *
     * Returns a callable that takes an operation constant plus options and
     * synchronously (via wire) returns the parsed JSON body. Any network
     * error propagates as an exception so `$mol_view` shows an error plate.
     */
    const $bog_norweb_front_api: <Op extends $bog_norweb_front_api_operation>(op: Op, opts?: $bog_norweb_front_api_options<Op>) => Op["out"];
}

declare namespace $.$bog_norweb_front_api_ragu {
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
                 * @default local
                 * @enum {string}
                 */
                engine: "local" | "global" | "naive" | "mix" | "query_plan";
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
                engine: "local" | "global" | "naive" | "mix" | "query_plan";
                /** Top K */
                top_k: number;
                /** Rerank */
                rerank: boolean;
                /** Entities */
                entities?: components["schemas"]["TraceEntity"][];
                /** Relations */
                relations?: components["schemas"]["TraceRelation"][];
                /** Chunks */
                chunks?: components["schemas"]["TraceChunk"][];
                /** Communities */
                communities?: components["schemas"]["TraceCommunity"][];
                timings: components["schemas"]["TraceTimings"];
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
                 * @default local
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
                entity_types?: ("AGE" | "FAMILY" | "AWARD" | "IDEOLOGY" | "PERCENT" | "CITY" | "LANGUAGE" | "PERSON" | "COUNTRY" | "LAW" | "PRODUCT" | "CRIME" | "PENALTY" | "PROFESSION" | "DATE" | "MONEY" | "RELIGION" | "DISEASE" | "NATIONALITY" | "STATE_OR_PROV" | "ORDINAL" | "TIME" | "EVENT" | "DISTRICT" | "WORK_OF_ART" | "ORGANIZATION" | "FACILITY" | "NUMBER" | "LOCATION")[] | null;
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
                /**
                 * Entity Type
                 * @enum {string}
                 */
                entity_type: "AGE" | "FAMILY" | "AWARD" | "IDEOLOGY" | "PERCENT" | "CITY" | "LANGUAGE" | "PERSON" | "COUNTRY" | "LAW" | "PRODUCT" | "CRIME" | "PENALTY" | "PROFESSION" | "DATE" | "MONEY" | "RELIGION" | "DISEASE" | "NATIONALITY" | "STATE_OR_PROV" | "ORDINAL" | "TIME" | "EVENT" | "DISTRICT" | "WORK_OF_ART" | "ORGANIZATION" | "FACILITY" | "NUMBER" | "LOCATION";
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
                /**
                 * Entity Type
                 * @enum {string}
                 */
                entity_type: "AGE" | "FAMILY" | "AWARD" | "IDEOLOGY" | "PERCENT" | "CITY" | "LANGUAGE" | "PERSON" | "COUNTRY" | "LAW" | "PRODUCT" | "CRIME" | "PENALTY" | "PROFESSION" | "DATE" | "MONEY" | "RELIGION" | "DISEASE" | "NATIONALITY" | "STATE_OR_PROV" | "ORDINAL" | "TIME" | "EVENT" | "DISTRICT" | "WORK_OF_ART" | "ORGANIZATION" | "FACILITY" | "NUMBER" | "LOCATION";
                /** Score */
                score: number;
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
            /** TraceTimings */
            TraceTimings: {
                /** Retrieval Ms */
                retrieval_ms: number;
                /** Generation Ms */
                generation_ms: number;
                /** Total Ms */
                total_ms: number;
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
                    entity_types?: ("AGE" | "FAMILY" | "AWARD" | "IDEOLOGY" | "PERCENT" | "CITY" | "LANGUAGE" | "PERSON" | "COUNTRY" | "LAW" | "PRODUCT" | "CRIME" | "PENALTY" | "PROFESSION" | "DATE" | "MONEY" | "RELIGION" | "DISEASE" | "NATIONALITY" | "STATE_OR_PROV" | "ORDINAL" | "TIME" | "EVENT" | "DISTRICT" | "WORK_OF_ART" | "ORGANIZATION" | "FACILITY" | "NUMBER" | "LOCATION")[] | null;
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
    const $bog_norweb_front_api_ragu_health: {
        method: string;
        route: string;
        params: undefined;
        query: undefined;
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["health"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_capabilities: {
        method: string;
        route: string;
        params: undefined;
        query: undefined;
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["capabilities"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_list_datasets: {
        method: string;
        route: string;
        params: undefined;
        query: $bog_norweb_front_api_ragu.operations["list_datasets"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["list_datasets"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_dataset: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_dataset"]["parameters"]["path"];
        query: $bog_norweb_front_api_ragu.operations["get_dataset"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_dataset"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_graph: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_graph"]["parameters"]["path"];
        query: $bog_norweb_front_api_ragu.operations["get_graph"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_graph"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_node: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_node"]["parameters"]["path"];
        query: undefined;
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_node"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_node_neighbors: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_node_neighbors"]["parameters"]["path"];
        query: $bog_norweb_front_api_ragu.operations["get_node_neighbors"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_node_neighbors"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_communities: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_communities"]["parameters"]["path"];
        query: undefined;
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_communities"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_create_agent_message: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["create_agent_message"]["parameters"]["path"];
        query: undefined;
        body: ($bog_norweb_front_api_ragu.operations["create_agent_message"]["requestBody"] extends {
            content: {
                "application/json": infer B;
            };
        } ? B : unknown);
        out: NonNullable<$bog_norweb_front_api_ragu.operations["create_agent_message"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
    const $bog_norweb_front_api_ragu_get_agent_suggestions: {
        method: string;
        route: string;
        params: $bog_norweb_front_api_ragu.operations["get_agent_suggestions"]["parameters"]["path"];
        query: $bog_norweb_front_api_ragu.operations["get_agent_suggestions"]["parameters"]["query"];
        body: undefined;
        out: NonNullable<$bog_norweb_front_api_ragu.operations["get_agent_suggestions"]["responses"][200] extends {
            content: {
                "application/json": infer R;
            };
        } ? R : unknown>;
    };
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_gallery_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_gallery_3 = $mol_type_enforce<
		({ 
			'bog_norweb_front_gallery_mock_badge_showed': ReturnType< $bog_norweb_front_gallery['is_mock'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_gallery_7 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_gallery['upload_doc_click'] > ): ReturnType< $bog_norweb_front_gallery['upload_doc_click'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_gallery_9 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_gallery['upload_idx_click'] > ): ReturnType< $bog_norweb_front_gallery['upload_idx_click'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_gallery_card__id_bog_norweb_front_gallery_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_id'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['id'] >
	>
	type $bog_norweb_front_gallery_card__title_bog_norweb_front_gallery_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_title'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['title'] >
	>
	type $bog_norweb_front_gallery_card__domain_bog_norweb_front_gallery_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_domain'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['domain'] >
	>
	type $bog_norweb_front_gallery_card__desc_bog_norweb_front_gallery_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_desc'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['desc'] >
	>
	type $bog_norweb_front_gallery_card__nodes_bog_norweb_front_gallery_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_nodes'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['nodes'] >
	>
	type $bog_norweb_front_gallery_card__edges_bog_norweb_front_gallery_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_edges'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['edges'] >
	>
	type $bog_norweb_front_gallery_card__comms_bog_norweb_front_gallery_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_comms'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['comms'] >
	>
	type $bog_norweb_front_gallery_card__active_bog_norweb_front_gallery_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['card_active'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['active'] >
	>
	type $bog_norweb_front_gallery_card__click_bog_norweb_front_gallery_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['click'] >
		,
		ReturnType< $bog_norweb_front_gallery_card['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_gallery_20 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_gallery_upload__showed_bog_norweb_front_gallery_21 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['upload_showed'] >
		,
		ReturnType< $bog_norweb_front_gallery_upload['showed'] >
	>
	type $bog_norweb_front_gallery_upload__kind_bog_norweb_front_gallery_22 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['upload_kind'] >
		,
		ReturnType< $bog_norweb_front_gallery_upload['kind'] >
	>
	type $bog_norweb_front_gallery_upload__complete_bog_norweb_front_gallery_23 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['upload_complete'] >
		,
		ReturnType< $bog_norweb_front_gallery_upload['complete'] >
	>
	type $bog_norweb_front_gallery_upload__close_bog_norweb_front_gallery_24 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_gallery['upload_close'] >
		,
		ReturnType< $bog_norweb_front_gallery_upload['close'] >
	>
	export class $bog_norweb_front_gallery extends $bog_builderui_div {
		Header_title( ): $bog_builderui_div
		Header_subtitle( ): $bog_builderui_div
		is_mock( ): boolean
		Mock_badge( ): $bog_builderui_div
		Header_text( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		upload_doc_click( next?: any ): any
		Upload_doc( ): $bog_builderui_div
		upload_idx_click( next?: any ): any
		Upload_idx( ): $bog_builderui_div
		Header( ): $bog_builderui_div
		card_id( id: any): string
		card_title( id: any): string
		card_domain( id: any): string
		card_desc( id: any): string
		card_nodes( id: any): string
		card_edges( id: any): string
		card_comms( id: any): string
		card_active( id: any): boolean
		click( id: any, next?: any ): any
		Card( id: any): $bog_norweb_front_gallery_card
		rows( ): readonly(any)[]
		Grid( ): $bog_builderui_div
		upload_showed( next?: boolean ): boolean
		upload_complete( next?: any ): any
		upload_close( next?: any ): any
		Upload( ): $bog_norweb_front_gallery_upload
		dataset_id( ): string
		select_dataset( next?: any ): any
		datasets( ): readonly(any)[]
		upload_kind( next?: string ): string
		header_title_text( ): string
		header_subtitle_text( ): string
		mock_badge_text( ): string
		upload_doc_text( ): string
		upload_idx_text( ): string
		uploaded_document_title( ): string
		uploaded_index_title( ): string
		uploaded_domain( ): string
		uploaded_desc( ): string
		dataset_law_title( ): string
		dataset_law_domain( ): string
		dataset_law_desc( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=gallery.view.tree.d.ts.map
declare namespace $.$$ {
    type DatasetStats = {
        id: string;
        nodes: string;
        edges: string;
        comms: string;
        /** Dynamic title for user-uploaded datasets. Built-ins use $mol_locale. */
        dynamic?: {
            title: string;
            domain: string;
            desc: string;
        };
    };
    export class $bog_norweb_front_gallery extends $.$bog_norweb_front_gallery {
        extra_datasets(next?: DatasetStats[]): DatasetStats[];
        mock_flag(): boolean;
        remote_datasets(): DatasetStats[] | null;
        is_mock(): boolean;
        datasets(): DatasetStats[];
        rows(): $.$bog_norweb_front_gallery_card[];
        dataset(id: string): DatasetStats;
        card_id(id: string): string;
        card_active(id: string): boolean;
        card_title(id: string): string;
        card_domain(id: string): string;
        card_desc(id: string): string;
        card_nodes(id: string): string;
        card_edges(id: string): string;
        card_comms(id: string): string;
        click(id: string): null;
        /** Mock file size in MB for upload validation. */
        mock_file_size(kind: string): number;
        upload_doc_click(): null;
        upload_idx_click(): null;
        start_upload(kind: 'document' | 'index'): null;
        upload_complete(): null;
        upload_close(): null;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_svg_line extends $mol_svg {
		from( ): readonly(any)[]
		to( ): readonly(any)[]
		from_x( ): string
		from_y( ): string
		to_x( ): string
		to_y( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'x1': ReturnType< $mol_svg_line['from_x'] >,
			'y1': ReturnType< $mol_svg_line['from_y'] >,
			'x2': ReturnType< $mol_svg_line['to_x'] >,
			'y2': ReturnType< $mol_svg_line['to_y'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_svg_line extends $.$mol_svg_line {
        from(): any;
        from_x(): any;
        from_y(): any;
        to(): any;
        to_x(): any;
        to_y(): any;
    }
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

	export class $mol_svg_rect extends $mol_svg {
		width( ): string
		height( ): string
		pos_x( ): string
		pos_y( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'width': ReturnType< $mol_svg_rect['width'] >,
			'height': ReturnType< $mol_svg_rect['height'] >,
			'x': ReturnType< $mol_svg_rect['pos_x'] >,
			'y': ReturnType< $mol_svg_rect['pos_y'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=rect.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_svg_rect extends $.$mol_svg_rect {
        pos_x(): any;
        pos_y(): any;
    }
}

declare namespace $ {

	export class $mol_svg_text extends $mol_svg {
		pos_x( ): string
		pos_y( ): string
		align( ): string
		align_hor( ): ReturnType< $mol_svg_text['align'] >
		align_vert( ): string
		text( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'x': ReturnType< $mol_svg_text['pos_x'] >,
			'y': ReturnType< $mol_svg_text['pos_y'] >,
			'text-anchor': ReturnType< $mol_svg_text['align_hor'] >,
			'alignment-baseline': ReturnType< $mol_svg_text['align_vert'] >,
		})  & ReturnType< $mol_svg['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_svg_text extends $.$mol_svg_text {
        pos_x(): any;
        pos_y(): any;
    }
}

declare namespace $ {
}

declare namespace $ {
    type $bog_norweb_front_explorer_forcegraph_node_type = string;
    type $bog_norweb_front_explorer_forcegraph_node = {
        id: string;
        label: string;
        type: $bog_norweb_front_explorer_forcegraph_node_type;
        degree: number;
        x: number;
        y: number;
    };
    type $bog_norweb_front_explorer_forcegraph_edge = {
        id: string;
        source: string;
        target: string;
        strength: number;
        relation: string;
    };
    /** Deterministic color for any entity_type string. */
    function $bog_norweb_front_explorer_forcegraph_type_color(type: string): string;
    function $bog_norweb_front_explorer_forcegraph_build_mock(seed?: number, n_nodes?: number, n_edges?: number): {
        nodes: $bog_norweb_front_explorer_forcegraph_node[];
        edges: $bog_norweb_front_explorer_forcegraph_edge[];
    };
    type $bog_norweb_front_explorer_forcegraph_layout_params = {
        gravity: number;
        force_scale: number;
        damping: number;
        min_move: number;
        max_speed: number;
    };
    /**
     * Velocity-Verlet sim tick — d3-force / ForceAtlas2 style.
     *   v[i] = ( v[i] + acceleration[i] ) * damping     ← momentum with friction
     *   p[i] += v[i] * smoothstep_gate                  ← smooth freeze at low speed
     * Repulsion via Barnes-Hut quadtree ( O(N log N) instead of naive O(N²) ).
     */
    function $bog_norweb_front_explorer_forcegraph_tick_layout(nodes: $bog_norweb_front_explorer_forcegraph_node[], edges: $bog_norweb_front_explorer_forcegraph_edge[], positions: Record<string, {
        x: number;
        y: number;
    }>, velocities: Record<string, {
        vx: number;
        vy: number;
    }>, pinned_id: string, params: $bog_norweb_front_explorer_forcegraph_layout_params): {
        positions: Record<string, {
            x: number;
            y: number;
        }>;
        velocities: Record<string, {
            vx: number;
            vy: number;
        }>;
    };
    function $bog_norweb_front_explorer_forcegraph_initial_positions(nodes: $bog_norweb_front_explorer_forcegraph_node[]): Record<string, {
        x: number;
        y: number;
    }>;
}

declare namespace $ {

	type $mol_svg_line__from_x_bog_norweb_front_explorer_forcegraph_1 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['edge_x1'] >
		,
		ReturnType< $mol_svg_line['from_x'] >
	>
	type $mol_svg_line__from_y_bog_norweb_front_explorer_forcegraph_2 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['edge_y1'] >
		,
		ReturnType< $mol_svg_line['from_y'] >
	>
	type $mol_svg_line__to_x_bog_norweb_front_explorer_forcegraph_3 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['edge_x2'] >
		,
		ReturnType< $mol_svg_line['to_x'] >
	>
	type $mol_svg_line__to_y_bog_norweb_front_explorer_forcegraph_4 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['edge_y2'] >
		,
		ReturnType< $mol_svg_line['to_y'] >
	>
	type $mol_svg_line__attr_bog_norweb_front_explorer_forcegraph_5 = $mol_type_enforce<
		({ 
			'stroke': ReturnType< $bog_norweb_front_explorer_forcegraph['edge_color'] >,
			'stroke-width': ReturnType< $bog_norweb_front_explorer_forcegraph['edge_width'] >,
			'stroke-opacity': ReturnType< $bog_norweb_front_explorer_forcegraph['edge_opacity'] >,
		})  & ReturnType< $mol_svg_line['attr'] >
		,
		ReturnType< $mol_svg_line['attr'] >
	>
	type $mol_svg_group__sub_bog_norweb_front_explorer_forcegraph_6 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['edge_views'] >
		,
		ReturnType< $mol_svg_group['sub'] >
	>
	type $mol_svg_circle__pos_x_bog_norweb_front_explorer_forcegraph_7 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['node_x'] >
		,
		ReturnType< $mol_svg_circle['pos_x'] >
	>
	type $mol_svg_circle__pos_y_bog_norweb_front_explorer_forcegraph_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['node_y'] >
		,
		ReturnType< $mol_svg_circle['pos_y'] >
	>
	type $mol_svg_circle__radius_bog_norweb_front_explorer_forcegraph_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['node_radius'] >
		,
		ReturnType< $mol_svg_circle['radius'] >
	>
	type $mol_svg_circle__attr_bog_norweb_front_explorer_forcegraph_10 = $mol_type_enforce<
		({ 
			'data-node-id': ReturnType< $bog_norweb_front_explorer_forcegraph['node_id'] >,
			'fill': ReturnType< $bog_norweb_front_explorer_forcegraph['node_color'] >,
			'fill-opacity': ReturnType< $bog_norweb_front_explorer_forcegraph['node_opacity'] >,
			'stroke': ReturnType< $bog_norweb_front_explorer_forcegraph['node_stroke'] >,
			'stroke-width': ReturnType< $bog_norweb_front_explorer_forcegraph['node_stroke_width'] >,
			'cursor': string,
		})  & ReturnType< $mol_svg_circle['attr'] >
		,
		ReturnType< $mol_svg_circle['attr'] >
	>
	type $mol_svg_circle__event_bog_norweb_front_explorer_forcegraph_11 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['click'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['click'] >,
			pointerenter( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['hover_enter'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['hover_enter'] >,
			pointerleave( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['hover_leave'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['hover_leave'] >,
		})  & ReturnType< $mol_svg_circle['event'] >
		,
		ReturnType< $mol_svg_circle['event'] >
	>
	type $mol_svg_group__sub_bog_norweb_front_explorer_forcegraph_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['node_views'] >
		,
		ReturnType< $mol_svg_group['sub'] >
	>
	type $mol_svg_rect__pos_x_bog_norweb_front_explorer_forcegraph_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_bg_x'] >
		,
		ReturnType< $mol_svg_rect['pos_x'] >
	>
	type $mol_svg_rect__pos_y_bog_norweb_front_explorer_forcegraph_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_bg_y'] >
		,
		ReturnType< $mol_svg_rect['pos_y'] >
	>
	type $mol_svg_rect__width_bog_norweb_front_explorer_forcegraph_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_bg_w'] >
		,
		ReturnType< $mol_svg_rect['width'] >
	>
	type $mol_svg_rect__height_bog_norweb_front_explorer_forcegraph_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_bg_h'] >
		,
		ReturnType< $mol_svg_rect['height'] >
	>
	type $mol_svg_rect__attr_bog_norweb_front_explorer_forcegraph_17 = $mol_type_enforce<
		({ 
			'rx': string,
			'ry': string,
			'stroke-width': string,
			'data-forcegraph-tooltip-bg': string,
		})  & ReturnType< $mol_svg_rect['attr'] >
		,
		ReturnType< $mol_svg_rect['attr'] >
	>
	type $mol_svg_text__pos_x_bog_norweb_front_explorer_forcegraph_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_x'] >
		,
		ReturnType< $mol_svg_text['pos_x'] >
	>
	type $mol_svg_text__pos_y_bog_norweb_front_explorer_forcegraph_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_y'] >
		,
		ReturnType< $mol_svg_text['pos_y'] >
	>
	type $mol_svg_text__align_bog_norweb_front_explorer_forcegraph_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg_text['align'] >
	>
	type $mol_svg_text__align_vert_bog_norweb_front_explorer_forcegraph_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg_text['align_vert'] >
	>
	type $mol_svg_text__text_bog_norweb_front_explorer_forcegraph_22 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_text'] >
		,
		ReturnType< $mol_svg_text['text'] >
	>
	type $mol_svg_text__attr_bog_norweb_front_explorer_forcegraph_23 = $mol_type_enforce<
		({ 
			'font-size': ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_font_size'] >,
			'font-weight': string,
			'data-forcegraph-tooltip-text': string,
		})  & ReturnType< $mol_svg_text['attr'] >
		,
		ReturnType< $mol_svg_text['attr'] >
	>
	type $mol_svg_group__attr_bog_norweb_front_explorer_forcegraph_24 = $mol_type_enforce<
		({ 
			'pointer-events': string,
		})  & ReturnType< $mol_svg_group['attr'] >
		,
		ReturnType< $mol_svg_group['attr'] >
	>
	type $mol_svg_group__sub_bog_norweb_front_explorer_forcegraph_25 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer_forcegraph['tooltip_sub'] >
		,
		ReturnType< $mol_svg_group['sub'] >
	>
	export class $bog_norweb_front_explorer_forcegraph extends $mol_svg_root {
		computed_view_box( ): string
		wheel( next?: any ): any
		pan_start( next?: any ): any
		pan_move( next?: any ): any
		pan_end( next?: any ): any
		bg_click( next?: any ): any
		edge_x1( id: any): string
		edge_y1( id: any): string
		edge_x2( id: any): string
		edge_y2( id: any): string
		edge_color( id: any): string
		edge_width( id: any): string
		edge_opacity( id: any): string
		Edge( id: any): $mol_svg_line
		edge_views( ): readonly(any)[]
		G_edges( ): $mol_svg_group
		node_x( id: any): string
		node_y( id: any): string
		node_radius( id: any): string
		node_id( id: any): string
		node_color( id: any): string
		node_opacity( id: any): string
		node_stroke( id: any): string
		node_stroke_width( id: any): string
		click( id: any, next?: any ): any
		hover_enter( id: any, next?: any ): any
		hover_leave( id: any, next?: any ): any
		Node( id: any): $mol_svg_circle
		node_views( ): readonly(any)[]
		G_nodes( ): $mol_svg_group
		tooltip_bg_x( ): string
		tooltip_bg_y( ): string
		tooltip_bg_w( ): string
		tooltip_bg_h( ): string
		Tooltip_bg( ): $mol_svg_rect
		tooltip_x( ): string
		tooltip_y( ): string
		tooltip_text( ): string
		tooltip_font_size( ): string
		Tooltip_text( ): $mol_svg_text
		tooltip_sub( ): readonly(any)[]
		Tooltip( ): $mol_svg_group
		view_box( ): ReturnType< $bog_norweb_front_explorer_forcegraph['computed_view_box'] >
		aspect( ): string
		select( next?: any ): any
		selected_id( next?: string ): string
		hovered_id( next?: string ): string
		drag_id( next?: string ): string
		search( ): string
		filter_type( ): string
		graph_key( ): string
		nodes( ): readonly(any)[]
		edges( ): readonly(any)[]
		pan_x( next?: number ): number
		pan_y( next?: number ): number
		zoom( next?: number ): number
		positions( next?: Record<string, any> ): Record<string, any>
		gravity( ): number
		force_scale( ): number
		damping( ): number
		min_move( ): number
		max_speed( ): number
		node_size_base( ): number
		node_size_growth( ): number
		event( ): ({ 
			wheel( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['wheel'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['wheel'] >,
			pointerdown( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['pan_start'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['pan_start'] >,
			pointermove( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['pan_move'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['pan_move'] >,
			pointerup( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['pan_end'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['pan_end'] >,
			pointercancel( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['pan_end'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['pan_end'] >,
			click( next?: ReturnType< $bog_norweb_front_explorer_forcegraph['bg_click'] > ): ReturnType< $bog_norweb_front_explorer_forcegraph['bg_click'] >,
		})  & ReturnType< $mol_svg_root['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=forcegraph.view.tree.d.ts.map
declare namespace $.$$ {
    type GraphNode = $bog_norweb_front_explorer_forcegraph_node;
    type GraphEdge = $bog_norweb_front_explorer_forcegraph_edge;
    type LayoutParams = $bog_norweb_front_explorer_forcegraph_layout_params;
    export class $bog_norweb_front_explorer_forcegraph extends $.$bog_norweb_front_explorer_forcegraph {
        nodes(): readonly GraphNode[];
        edges(): readonly GraphEdge[];
        drag_id_raw: string;
        drag_id(next?: string): string;
        computed_view_box(): string;
        wheel(event?: WheelEvent): void;
        dragging: boolean;
        last_x: number;
        last_y: number;
        moved_px: number;
        start_x: number;
        start_y: number;
        readonly DRAG_THRESHOLD = 4;
        pan_start(event?: PointerEvent): void;
        svg_scale(): {
            ax: number;
            ay: number;
        };
        pan_move(event?: PointerEvent): void;
        pan_end(): void;
        client_to_svg(event: PointerEvent): {
            x: number;
            y: number;
        };
        initial_positions(): Record<string, {
            x: number;
            y: number;
        }>;
        ensure_positions(): Record<string, {
            x: number;
            y: number;
        }>;
        velocities: Record<string, {
            vx: number;
            vy: number;
        }>;
        layout_params(): LayoutParams;
        tick(): void;
        sim_running: boolean;
        sim_frames_left: number;
        readonly SIM_INITIAL_FRAMES = 260;
        readonly SIM_DRAG_FRAMES = 60;
        start_sim(frames?: number): void;
        params_kick(): null;
        initial_sim_started: boolean;
        dom_tree(): Element;
        node_by_id(): Record<string, GraphNode>;
        node_views(): $.$mol_svg_circle[];
        edge_views(): $.$mol_svg_line[];
        pos(id: string): any;
        node_id(id: string): string;
        node_x(id: string): string;
        node_y(id: string): string;
        node_radius_num(id: string): number;
        node_radius(id: string): string;
        node_color(id: string): string;
        search_lc(): string;
        filter_active(): boolean;
        node_matches(id: string): boolean;
        node_opacity(id: string): "1" | "0.12";
        node_stroke(id: string): "#ffffff" | "transparent";
        node_stroke_width(id: string): "2.5" | "1.5" | "0";
        hover_enter(id: string): null;
        hover_leave(): null;
        edge_by_id(): Record<string, GraphEdge>;
        edge_x1(id: string): string;
        edge_y1(id: string): string;
        edge_x2(id: string): string;
        edge_y2(id: string): string;
        edge_width(id: string): string;
        edge_opacity(id: string): "0.08" | "0.55" | "0.95" | "0.18";
        edge_color(id: string): "#ffffff" | "#7a7672";
        just_dragged: string;
        click(id: string): null;
        bg_click(event?: MouseEvent): null | undefined;
        active_id(): string;
        tooltip_sub(): readonly $mol_view[];
        tooltip_text(): string;
        tooltip_font_size(): string;
        tooltip_anchor(): {
            x: any;
            y: any;
            r: number;
        };
        tooltip_x(): string;
        tooltip_y(): string;
        tooltip_bg_w(): string;
        tooltip_bg_h(): string;
        tooltip_bg_x(): string;
        tooltip_bg_y(): string;
        selected_node(): GraphNode | null;
        selected_color(): string;
        selected_relations(): Array<{
            relation: string;
            target_label: string;
        }>;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_norweb_front_explorer_forcegraph__graph_key_bog_norweb_front_explorer_1 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['graph_key'] >
	>
	type $bog_norweb_front_explorer_forcegraph__nodes_bog_norweb_front_explorer_2 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['graph_nodes'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['nodes'] >
	>
	type $bog_norweb_front_explorer_forcegraph__edges_bog_norweb_front_explorer_3 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['graph_edges'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['edges'] >
	>
	type $bog_norweb_front_explorer_forcegraph__selected_id_bog_norweb_front_explorer_4 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['selected_id'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['selected_id'] >
	>
	type $bog_norweb_front_explorer_forcegraph__search_bog_norweb_front_explorer_5 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['search'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['search'] >
	>
	type $bog_norweb_front_explorer_forcegraph__filter_type_bog_norweb_front_explorer_6 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['type_filter'] >
		,
		ReturnType< $bog_norweb_front_explorer_forcegraph['filter_type'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_string__hint_bog_norweb_front_explorer_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['filter_search_text'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_norweb_front_explorer_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['search'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_explorer_14 = $mol_type_enforce<
		({ 
			'bog_norweb_front_explorer_legend_on': ReturnType< $bog_norweb_front_explorer['legend_active'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_explorer_15 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_explorer['legend_click'] > ): ReturnType< $bog_norweb_front_explorer['legend_click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['legend_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_explorer_19 = $mol_type_enforce<
		({ 
			'bog_norweb_front_explorer_mock_badge_showed': ReturnType< $bog_norweb_front_explorer['is_mock'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_31 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_explorer['rel_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_explorer_35 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_explorer['ask_click'] > ): ReturnType< $bog_norweb_front_explorer['ask_click'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_explorer_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_explorer extends $bog_builderui_div {
		graph_nodes( ): readonly(any)[]
		graph_edges( ): readonly(any)[]
		Graph( ): $bog_norweb_front_explorer_forcegraph
		Canvas_bg( ): $bog_builderui_div
		Filter_search( ): $mol_string
		Filters( ): $bog_builderui_div
		Legend_title( ): $bog_builderui_div
		legend_active( id: any): boolean
		legend_click( id: any, next?: any ): any
		Legend_dot( id: any): $bog_builderui_div
		legend_label( id: any): string
		Legend_label( id: any): $bog_builderui_div
		legend_count( id: any): string
		Legend_count( id: any): $bog_builderui_div
		Legend_row( id: any): $bog_builderui_div
		legend_rows( ): readonly(any)[]
		Legend_list( ): $bog_builderui_div
		Legend( ): $bog_builderui_div
		is_mock( ): boolean
		Mock_badge( ): $bog_builderui_div
		Canvas( ): $bog_builderui_div
		Aside_title( ): $bog_builderui_div
		Entity_dot( ): $bog_builderui_div
		entity_name( ): string
		Entity_name( ): $bog_builderui_div
		Entity_head( ): $bog_builderui_div
		entity_type( ): string
		Entity_type( ): $bog_builderui_div
		entity_desc( ): string
		Entity_desc( ): $bog_builderui_div
		relations_title( ): string
		Relations_title( ): $bog_builderui_div
		rel_type( id: any): string
		Rel_type( id: any): $bog_builderui_div
		rel_target( id: any): string
		Rel_target( id: any): $bog_builderui_div
		Rel( id: any): $bog_builderui_div
		rel_rows( ): readonly(any)[]
		Relations_list( ): $bog_builderui_div
		Sources_title( ): $bog_builderui_div
		Sources( ): $bog_builderui_div
		ask_click( next?: any ): any
		Ask_btn( ): $bog_builderui_div
		Aside( ): $bog_builderui_div
		dataset_id( ): string
		selected_id( next?: string ): string
		search( next?: string ): string
		type_filter( next?: string ): string
		filter_search_text( ): string
		aside_title_text( ): string
		aside_empty_text( ): string
		relations_title_template( ): string
		sources_title_text( ): string
		sources_text( ): string
		ask_btn_text( ): string
		legend_title_text( ): string
		mock_badge_text( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=explorer.view.tree.d.ts.map
declare namespace $.$$ {
    type GraphNode = $bog_norweb_front_explorer_forcegraph_node;
    type GraphEdge = $bog_norweb_front_explorer_forcegraph_edge;
    export class $bog_norweb_front_explorer extends $.$bog_norweb_front_explorer {
        mock_flag(): boolean;
        graph_remote(): {
            nodes: GraphNode[];
            edges: GraphEdge[];
        } | null;
        is_mock(): boolean;
        legend_entries(): Array<{
            type: string;
            count: number;
        }>;
        legend_rows(): $bog_builderui_div[];
        legend_label(i: number): string;
        legend_count(i: number): string;
        legend_active(i: number): boolean;
        Legend_dot(i: number): $bog_builderui_div;
        legend_click(i: number): null;
        graph_data(): {
            nodes: readonly GraphNode[];
            edges: readonly GraphEdge[];
        };
        graph_nodes(): readonly GraphNode[];
        graph_edges(): readonly GraphEdge[];
        graph_view(): $.$$.$bog_norweb_front_explorer_forcegraph;
        selected(): $bog_norweb_front_explorer_forcegraph_node | null;
        entity_name(): string;
        entity_type(): string;
        entity_desc(): string;
        relations_title(): string;
        rels(): Array<{
            relation: string;
            target_label: string;
        }>;
        rel_rows(): $bog_builderui_div[];
        rel_type(i: number): string;
        rel_target(i: number): string;
        Entity_dot(): $bog_builderui_div;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_builderui_skeleton extends $bog_builderui_div {
		attr( ): ({ 
			'mol_view_error': string,
		}) 
	}
	
}

//# sourceMappingURL=skeleton.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_stack extends $mol_view {
	}
	
}

//# sourceMappingURL=stack.view.tree.d.ts.map
declare namespace $ {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2<Lexems extends {
        [name: string]: RegExp;
    } = {}> {
        lexems: Lexems;
        constructor(lexems: Lexems);
        rules: Array<{
            regExp: RegExp;
            name: string;
            size: number;
        }>;
        regexp: RegExp;
        tokenize(text: string, handle: (name: string, found: string, chunks: string[], offset: number) => void): void;
        parse(text: string, handlers: {
            [key in keyof Lexems | '']: (found: string, chunks: string[], offset: number) => void;
        }): void;
    }
}

declare namespace $ {

	export class $mol_text_code_token extends $mol_dimmer {
		type( ): string
		attr( ): ({ 
			'mol_text_code_token_type': ReturnType< $mol_text_code_token['type'] >,
		})  & ReturnType< $mol_dimmer['attr'] >
	}
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		uri( ): string
		dom_name( ): string
		type( ): string
		attr( ): ({ 
			'href': ReturnType< $mol_text_code_token_link['uri'] >,
			'target': string,
		})  & ReturnType< $mol_text_code_token['attr'] >
	}
	
}

//# sourceMappingURL=token.view.tree.d.ts.map
declare namespace $.$$ {
}

declare namespace $ {
    var $mol_syntax2_md_flow: $mol_syntax2<{
        quote: RegExp;
        spoiler: RegExp;
        header: RegExp;
        list: RegExp;
        code: RegExp;
        'code-indent': RegExp;
        table: RegExp;
        grid: RegExp;
        cut: RegExp;
        block: RegExp;
    }>;
    var $mol_syntax2_md_line: $mol_syntax2<{
        strong: RegExp;
        emphasis: RegExp;
        code: RegExp;
        insert: RegExp;
        delete: RegExp;
        embed: RegExp;
        link: RegExp;
        'image-link': RegExp;
        'text-link': RegExp;
        'text-link-http': RegExp;
    }>;
    const $mol_syntax2_md_code: $mol_syntax2<{
        'code-indent': RegExp;
        'code-docs': RegExp;
        'code-comment-block': RegExp;
        'code-link': RegExp;
        'code-comment-inline': RegExp;
        'code-string': RegExp;
        'code-number': RegExp;
        'code-call': RegExp;
        'code-sexpr': RegExp;
        'code-field': RegExp;
        'code-keyword': RegExp;
        'code-global': RegExp;
        'code-word': RegExp;
        'code-decorator': RegExp;
        'code-tag': RegExp;
        'code-punctuation': RegExp;
    }>;
}

declare namespace $ {

	type $mol_view__sub_mol_text_code_line_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text_code_token__type_mol_text_code_line_2 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_type'] >
		,
		ReturnType< $mol_text_code_token['type'] >
	>
	type $mol_text_code_token__haystack_mol_text_code_line_3 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token['haystack'] >
	>
	type $mol_text_code_token__needle_mol_text_code_line_4 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token['needle'] >
	>
	type $mol_text_code_token_link__haystack_mol_text_code_line_5 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token_link['haystack'] >
	>
	type $mol_text_code_token_link__needle_mol_text_code_line_6 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token_link['needle'] >
	>
	type $mol_text_code_token_link__uri_mol_text_code_line_7 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_uri'] >
		,
		ReturnType< $mol_text_code_token_link['uri'] >
	>
	export class $mol_text_code_line extends $mol_paragraph {
		numb( ): number
		token_type( id: any): string
		token_text( id: any): string
		highlight( ): string
		token_uri( id: any): string
		text( ): string
		minimal_height( ): number
		numb_showed( ): boolean
		syntax( ): any
		uri_resolve( id: any): string
		Numb( ): $mol_view
		Token( id: any): $mol_text_code_token
		Token_link( id: any): $mol_text_code_token_link
		find_pos( id: any): any
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_text_code_line extends $.$mol_text_code_line {
        maximal_width(): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        tokens(path: number[]): Readonly<{
            name: string;
            found: string;
            chunks: string[];
        }[]>;
        sub(): (string | $mol_view)[];
        row_content(path: number[]): string[] | $mol_text_code_token[];
        Token(path: number[]): $mol_text_code_token;
        token_type(path: number[]): string;
        token_content(path: number[]): (string | $mol_text_code_token)[];
        token_text(path: number[]): string;
        token_uri(path: number[]): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        find_pos(offset: number): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
        find_token_pos([offset, ...path]: number[]): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    type $mol_blob = Blob;
    let $mol_blob: {
        prototype: Blob;
        new (blobParts?: readonly BlobPart[], options?: BlobPropertyBag): Blob;
    };
}

declare namespace $ {

	export class $mol_icon_clipboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clipboard.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {
    function $mol_html_encode(text: string): string;
}

declare namespace $ {

	type $mol_blob__mol_button_copy_1 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	type $mol_blob__mol_button_copy_2 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	export class $mol_button_copy extends $mol_button_minor {
		text( ): ReturnType< $mol_button_copy['title'] >
		text_blob( next?: $mol_blob ): $mol_blob
		html( ): string
		html_blob( next?: $mol_blob ): $mol_blob
		Icon( ): $mol_icon_clipboard_outline
		title( ): string
		blobs( ): readonly($mol_blob)[]
		data( ): Record<string, any>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Button copy text() value to clipboard
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
     */
    class $mol_button_copy extends $.$mol_button_copy {
        data(): {
            [k: string]: Blob;
        };
        html(): string;
        attachments(): ClipboardItem[];
        click(event?: Event): void;
    }
}

declare namespace $ {

	type $mol_text_code_line__numb_showed_mol_text_code_1 = $mol_type_enforce<
		ReturnType< $mol_text_code['sidebar_showed'] >
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__numb_mol_text_code_2 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_numb'] >
		,
		ReturnType< $mol_text_code_line['numb'] >
	>
	type $mol_text_code_line__theme_mol_text_code_3 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_theme'] >
		,
		ReturnType< $mol_text_code_line['theme'] >
	>
	type $mol_text_code_line__text_mol_text_code_4 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__syntax_mol_text_code_5 = $mol_type_enforce<
		ReturnType< $mol_text_code['syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_code_6 = $mol_type_enforce<
		ReturnType< $mol_text_code['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__highlight_mol_text_code_7 = $mol_type_enforce<
		ReturnType< $mol_text_code['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_list__render_visible_only_mol_text_code_8 = $mol_type_enforce<
		ReturnType< $mol_text_code['render_visible_only'] >
		,
		ReturnType< $mol_list['render_visible_only'] >
	>
	type $mol_list__rows_mol_text_code_9 = $mol_type_enforce<
		ReturnType< $mol_text_code['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__hint_mol_text_code_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__text_mol_text_code_11 = $mol_type_enforce<
		ReturnType< $mol_text_code['text_export'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	export class $mol_text_code extends $mol_stack {
		sidebar_showed( ): boolean
		render_visible_only( ): boolean
		row_numb( id: any): number
		row_theme( id: any): string
		row_text( id: any): string
		syntax( ): any
		uri_resolve( id: any): string
		highlight( ): string
		Row( id: any): $mol_text_code_line
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		text_export( ): string
		Copy( ): $mol_button_copy
		attr( ): ({ 
			'mol_text_code_sidebar_showed': ReturnType< $mol_text_code['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		text( ): string
		text_lines( ): readonly(string)[]
		find_pos( id: any): any
		uri_base( ): string
		row_themes( ): readonly(string)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Code visualizer.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
     */
    class $mol_text_code extends $.$mol_text_code {
        render_visible_only(): boolean;
        text_lines(): readonly string[];
        rows(): $.$mol_text_code_line[];
        row_text(index: number): string;
        row_numb(index: number): number;
        find_pos(offset: number): any;
        sub(): ($.$mol_list | $.$mol_button_copy)[];
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        uri_base(): string;
        uri_resolve(uri: string): string;
        text_export(): string;
        row_theme(row: number): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	type $mol_textarea_edit__value_mol_textarea_1 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_textarea_edit['value'] >
	>
	type $mol_textarea_edit__hint_mol_textarea_2 = $mol_type_enforce<
		ReturnType< $mol_textarea['hint'] >
		,
		ReturnType< $mol_textarea_edit['hint'] >
	>
	type $mol_textarea_edit__enabled_mol_textarea_3 = $mol_type_enforce<
		ReturnType< $mol_textarea['enabled'] >
		,
		ReturnType< $mol_textarea_edit['enabled'] >
	>
	type $mol_textarea_edit__spellcheck_mol_textarea_4 = $mol_type_enforce<
		ReturnType< $mol_textarea['spellcheck'] >
		,
		ReturnType< $mol_textarea_edit['spellcheck'] >
	>
	type $mol_textarea_edit__length_max_mol_textarea_5 = $mol_type_enforce<
		ReturnType< $mol_textarea['length_max'] >
		,
		ReturnType< $mol_textarea_edit['length_max'] >
	>
	type $mol_textarea_edit__selection_mol_textarea_6 = $mol_type_enforce<
		ReturnType< $mol_textarea['selection'] >
		,
		ReturnType< $mol_textarea_edit['selection'] >
	>
	type $mol_textarea_edit__submit_mol_textarea_7 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit'] >
		,
		ReturnType< $mol_textarea_edit['submit'] >
	>
	type $mol_textarea_edit__submit_with_ctrl_mol_textarea_8 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit_with_ctrl'] >
		,
		ReturnType< $mol_textarea_edit['submit_with_ctrl'] >
	>
	type $mol_text_code__text_mol_textarea_9 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__render_visible_only_mol_textarea_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['render_visible_only'] >
	>
	type $mol_text_code__row_numb_mol_textarea_11 = $mol_type_enforce<
		ReturnType< $mol_textarea['row_numb'] >
		,
		ReturnType< $mol_text_code['row_numb'] >
	>
	type $mol_text_code__sidebar_showed_mol_textarea_12 = $mol_type_enforce<
		ReturnType< $mol_textarea['sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__highlight_mol_textarea_13 = $mol_type_enforce<
		ReturnType< $mol_textarea['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__syntax_mol_textarea_14 = $mol_type_enforce<
		ReturnType< $mol_textarea['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	export class $mol_textarea extends $mol_stack {
		clickable( next?: boolean ): boolean
		sidebar_showed( ): boolean
		press( next?: any ): any
		hover( next?: any ): any
		value( next?: string ): string
		hint( ): string
		enabled( ): boolean
		spellcheck( ): boolean
		length_max( ): number
		selection( next?: readonly(number)[] ): readonly(number)[]
		bring( ): ReturnType< ReturnType< $mol_textarea['Edit'] >['bring'] >
		submit( next?: any ): any
		submit_with_ctrl( ): boolean
		Edit( ): $mol_textarea_edit
		row_numb( id: any): number
		highlight( ): string
		syntax( ): $mol_syntax2
		View( ): $mol_text_code
		attr( ): ({ 
			'mol_textarea_clickable': ReturnType< $mol_textarea['clickable'] >,
			'mol_textarea_sidebar_showed': ReturnType< $mol_textarea['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $mol_textarea['press'] > ): ReturnType< $mol_textarea['press'] >,
			pointermove( next?: ReturnType< $mol_textarea['hover'] > ): ReturnType< $mol_textarea['hover'] >,
		}) 
		sub( ): readonly(any)[]
		symbols_alt( ): Record<string, string>
		symbols_alt_ctrl( ): Record<string, string>
		symbols_alt_shift( ): Record<string, string>
	}
	
	export class $mol_textarea_edit extends $mol_string {
		dom_name( ): string
		enter( ): string
		field( ): ({ 
			'scrollTop': number,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * An input field for entering multiline text.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    class $mol_textarea extends $.$mol_textarea {
        indent_inc(): void;
        indent_dec(): void;
        symbol_insert(event: KeyboardEvent): void;
        clickable(next?: boolean): boolean;
        hover(event: PointerEvent): void;
        press(event: KeyboardEvent): void;
        row_numb(index: number): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
    }
}

declare namespace $ {
}

declare namespace $ {
    type $mol_data_value<Input = any, Output = any> = (val: Input) => Output;
}

declare namespace $ {
    /**
     * Fields that can be set to undefined makes optional
     *
     * 	type User = $mol_type_partial_undefined<{ name : string , age : number | undefined }> // { name : string , age? : number | undefined }
     */
    type $mol_type_partial_undefined<Val> = $mol_type_merge<$mol_type_override<Partial<Val>, Pick<Val, {
        [Field in keyof Val]: undefined extends Val[Field] ? never : Field;
    }[keyof Val]>>>;
}

declare namespace $ {
    function $mol_data_setup<Value extends $mol_data_value, Config = never>(value: Value, config: Config): Value & {
        config: Config;
        Value: ReturnType<Value>;
    };
}

declare namespace $ {
    /**
     * Checks for record of given fields with by its runtypes and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_record_demo
     */
    function $mol_data_record<Sub extends Record<string, $mol_data_value>>(sub: Sub): ((val: $mol_type_merge<$mol_type_override<Partial<{ [key in keyof Sub]: Parameters<Sub[key]>[0]; }>, Pick<{ [key in keyof Sub]: Parameters<Sub[key]>[0]; }, { [Field in keyof { [key in keyof Sub]: Parameters<Sub[key]>[0]; }]: undefined extends { [key in keyof Sub]: Parameters<Sub[key]>[0]; }[Field] ? never : Field; }[keyof Sub]>>>) => Readonly<$mol_type_merge<$mol_type_override<Partial<{ [key_1 in keyof Sub]: ReturnType<Sub[key_1]>; }>, Pick<{ [key_1 in keyof Sub]: ReturnType<Sub[key_1]>; }, { [Field_1 in keyof { [key_1 in keyof Sub]: ReturnType<Sub[key_1]>; }]: undefined extends { [key_1 in keyof Sub]: ReturnType<Sub[key_1]>; }[Field_1] ? never : Field_1; }[keyof Sub]>>>>) & {
        config: Sub;
        Value: Readonly<$mol_type_merge<$mol_type_override<Partial<{ [key in keyof Sub]: ReturnType<Sub[key]>; }>, Pick<{ [key in keyof Sub]: ReturnType<Sub[key]>; }, { [Field in keyof { [key in keyof Sub]: ReturnType<Sub[key]>; }]: undefined extends { [key in keyof Sub]: ReturnType<Sub[key]>; }[Field] ? never : Field; }[keyof Sub]>>>>;
    };
}

declare namespace $ {
    class $mol_data_error extends $mol_error_mix {
    }
}

declare namespace $ {
    /**
     * Checks for equality to given value and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_const_demo
     */
    function $mol_data_const<const Val>(ref: Val): ((val: Val) => Val) & {
        config: Val;
        Value: Val;
    };
}

declare namespace $ {
    /**
     * Checks for string and returns string type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_string_demo
     */
    let $mol_data_string: (val: string) => string;
}

declare namespace $ {
    /**
     * Checks for some of given runtype or throws error.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_variant_demo
     */
    function $mol_data_variant<Sub extends $mol_data_value[]>(...sub: Sub): ((val: Parameters<Sub[number]>[0]) => ReturnType<Sub[number]>) & {
        config: Sub;
        Value: ReturnType<Sub[number]>;
    };
}

declare namespace $ {
    /**
     * Checks for array of given runtype and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_array_demo
     */
    function $mol_data_array<Sub extends $mol_data_value>(sub: Sub): ((val: readonly Parameters<Sub>[0][]) => readonly ReturnType<Sub>[]) & {
        config: Sub;
        Value: readonly ReturnType<Sub>[];
    };
}

declare namespace $ {
    /**
     * Checks for null or passing given runtype.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_nullable_demo
     */
    function $mol_data_nullable<Sub extends $mol_data_value>(sub: Sub): ((val: Parameters<Sub>[0] | null) => ReturnType<Sub> | null) & {
        config: Sub;
        Value: ReturnType<Sub> | null;
    };
}

declare namespace $ {
    /**
     * Checks for undefined or passing given runtype.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_optional_demo
     */
    function $mol_data_optional<Sub extends $mol_data_value, Fallback extends undefined | (() => ReturnType<Sub>)>(sub: Sub, fallback?: Fallback): ((val: Parameters<Sub>[0] | undefined) => ReturnType<Sub> | (Fallback extends undefined ? undefined : ReturnType<Extract<Fallback, () => any>>)) & {
        config: {
            sub: Sub;
            fallback: Fallback | undefined;
        };
        Value: ReturnType<Sub> | (Fallback extends undefined ? undefined : ReturnType<Extract<Fallback, () => any>>);
    };
}

declare namespace $ {
    function $mol_array_shuffle<Item>(array: readonly Item[]): any[];
}

declare namespace $ {
    let $mol_array_shuffle_sync: typeof $mol_array_shuffle;
}

declare namespace $ {
    export const $mol_github_model_keys: string[];
    export const $mol_github_model_polyglots: string[];
    const Message: ((val: {
        content: string | readonly ({
            text: string;
            type: "text";
        } | {
            type: "image_url";
            image_url: {
                url: string;
            };
        })[];
        role: "system";
    } | {
        tool_calls?: readonly {
            function: {
                name: string;
                arguments: string;
            };
            id: string;
            type: "function";
        }[] | undefined;
        content: string | readonly ({
            text: string;
            type: "text";
        } | {
            type: "image_url";
            image_url: {
                url: string;
            };
        })[] | null;
        role: "assistant";
    } | {
        content: string | readonly ({
            text: string;
            type: "text";
        } | {
            type: "image_url";
            image_url: {
                url: string;
            };
        })[];
        role: "user";
    } | {
        content: string | readonly ({
            text: string;
            type: "text";
        } | {
            type: "image_url";
            image_url: {
                url: string;
            };
        })[];
        role: "tool";
        tool_call_id: string;
    }) => Readonly<{
        content: string | readonly (Readonly<{
            text: string;
            type: "text";
        }> | Readonly<{
            type: "image_url";
            image_url: Readonly<{
                url: string;
            }>;
        }>)[];
        role: "system";
    }> | Readonly<{
        tool_calls?: readonly Readonly<{
            function: Readonly<{
                name: string;
                arguments: string;
            }>;
            id: string;
            type: "function";
        }>[] | undefined;
        content: string | readonly (Readonly<{
            text: string;
            type: "text";
        }> | Readonly<{
            type: "image_url";
            image_url: Readonly<{
                url: string;
            }>;
        }>)[] | null;
        role: "assistant";
    }> | Readonly<{
        content: string | readonly (Readonly<{
            text: string;
            type: "text";
        }> | Readonly<{
            type: "image_url";
            image_url: Readonly<{
                url: string;
            }>;
        }>)[];
        role: "user";
    }> | Readonly<{
        content: string | readonly (Readonly<{
            text: string;
            type: "text";
        }> | Readonly<{
            type: "image_url";
            image_url: Readonly<{
                url: string;
            }>;
        }>)[];
        role: "tool";
        tool_call_id: string;
    }>) & {
        config: [((val: {
            content: string | readonly ({
                text: string;
                type: "text";
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                };
            })[];
            role: "system";
        }) => Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "system";
        }>) & {
            config: {
                role: ((val: "system") => "system") & {
                    config: "system";
                    Value: "system";
                };
                content: ((val: string | readonly ({
                    text: string;
                    type: "text";
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                    };
                })[]) => string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[]) & {
                    config: [(val: string) => string, ((val: readonly ({
                        text: string;
                        type: "text";
                    } | {
                        type: "image_url";
                        image_url: {
                            url: string;
                        };
                    })[]) => readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[]) & {
                        config: ((val: {
                            text: string;
                            type: "text";
                        } | {
                            type: "image_url";
                            image_url: {
                                url: string;
                            };
                        }) => Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>) & {
                            config: [((val: {
                                text: string;
                                type: "text";
                            }) => Readonly<{
                                text: string;
                                type: "text";
                            }>) & {
                                config: {
                                    type: ((val: "text") => "text") & {
                                        config: "text";
                                        Value: "text";
                                    };
                                    text: (val: string) => string;
                                };
                                Value: Readonly<{
                                    text: string;
                                    type: "text";
                                }>;
                            }, ((val: {
                                type: "image_url";
                                image_url: {
                                    url: string;
                                };
                            }) => Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>) & {
                                config: {
                                    type: ((val: "image_url") => "image_url") & {
                                        config: "image_url";
                                        Value: "image_url";
                                    };
                                    image_url: ((val: {
                                        url: string;
                                    }) => Readonly<{
                                        url: string;
                                    }>) & {
                                        config: {
                                            url: (val: string) => string;
                                        };
                                        Value: Readonly<{
                                            url: string;
                                        }>;
                                    };
                                };
                                Value: Readonly<{
                                    type: "image_url";
                                    image_url: Readonly<{
                                        url: string;
                                    }>;
                                }>;
                            }];
                            Value: Readonly<{
                                text: string;
                                type: "text";
                            }> | Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>;
                        };
                        Value: readonly (Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>)[];
                    }];
                    Value: string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[];
                };
            };
            Value: Readonly<{
                content: string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[];
                role: "system";
            }>;
        }, ((val: {
            tool_calls?: readonly {
                function: {
                    name: string;
                    arguments: string;
                };
                id: string;
                type: "function";
            }[] | undefined;
            content: string | readonly ({
                text: string;
                type: "text";
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                };
            })[] | null;
            role: "assistant";
        }) => Readonly<{
            tool_calls?: readonly Readonly<{
                function: Readonly<{
                    name: string;
                    arguments: string;
                }>;
                id: string;
                type: "function";
            }>[] | undefined;
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[] | null;
            role: "assistant";
        }>) & {
            config: {
                role: ((val: "assistant") => "assistant") & {
                    config: "assistant";
                    Value: "assistant";
                };
                content: ((val: string | readonly ({
                    text: string;
                    type: "text";
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                    };
                })[] | null) => string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[] | null) & {
                    config: ((val: string | readonly ({
                        text: string;
                        type: "text";
                    } | {
                        type: "image_url";
                        image_url: {
                            url: string;
                        };
                    })[]) => string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[]) & {
                        config: [(val: string) => string, ((val: readonly ({
                            text: string;
                            type: "text";
                        } | {
                            type: "image_url";
                            image_url: {
                                url: string;
                            };
                        })[]) => readonly (Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>)[]) & {
                            config: ((val: {
                                text: string;
                                type: "text";
                            } | {
                                type: "image_url";
                                image_url: {
                                    url: string;
                                };
                            }) => Readonly<{
                                text: string;
                                type: "text";
                            }> | Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>) & {
                                config: [((val: {
                                    text: string;
                                    type: "text";
                                }) => Readonly<{
                                    text: string;
                                    type: "text";
                                }>) & {
                                    config: {
                                        type: ((val: "text") => "text") & {
                                            config: "text";
                                            Value: "text";
                                        };
                                        text: (val: string) => string;
                                    };
                                    Value: Readonly<{
                                        text: string;
                                        type: "text";
                                    }>;
                                }, ((val: {
                                    type: "image_url";
                                    image_url: {
                                        url: string;
                                    };
                                }) => Readonly<{
                                    type: "image_url";
                                    image_url: Readonly<{
                                        url: string;
                                    }>;
                                }>) & {
                                    config: {
                                        type: ((val: "image_url") => "image_url") & {
                                            config: "image_url";
                                            Value: "image_url";
                                        };
                                        image_url: ((val: {
                                            url: string;
                                        }) => Readonly<{
                                            url: string;
                                        }>) & {
                                            config: {
                                                url: (val: string) => string;
                                            };
                                            Value: Readonly<{
                                                url: string;
                                            }>;
                                        };
                                    };
                                    Value: Readonly<{
                                        type: "image_url";
                                        image_url: Readonly<{
                                            url: string;
                                        }>;
                                    }>;
                                }];
                                Value: Readonly<{
                                    text: string;
                                    type: "text";
                                }> | Readonly<{
                                    type: "image_url";
                                    image_url: Readonly<{
                                        url: string;
                                    }>;
                                }>;
                            };
                            Value: readonly (Readonly<{
                                text: string;
                                type: "text";
                            }> | Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>)[];
                        }];
                        Value: string | readonly (Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>)[];
                    };
                    Value: string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[] | null;
                };
                tool_calls: ((val: readonly {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    id: string;
                    type: "function";
                }[] | undefined) => readonly Readonly<{
                    function: Readonly<{
                        name: string;
                        arguments: string;
                    }>;
                    id: string;
                    type: "function";
                }>[] | undefined) & {
                    config: {
                        sub: ((val: readonly {
                            function: {
                                name: string;
                                arguments: string;
                            };
                            id: string;
                            type: "function";
                        }[]) => readonly Readonly<{
                            function: Readonly<{
                                name: string;
                                arguments: string;
                            }>;
                            id: string;
                            type: "function";
                        }>[]) & {
                            config: ((val: {
                                function: {
                                    name: string;
                                    arguments: string;
                                };
                                id: string;
                                type: "function";
                            }) => Readonly<{
                                function: Readonly<{
                                    name: string;
                                    arguments: string;
                                }>;
                                id: string;
                                type: "function";
                            }>) & {
                                config: {
                                    type: ((val: "function") => "function") & {
                                        config: "function";
                                        Value: "function";
                                    };
                                    id: (val: string) => string;
                                    function: ((val: {
                                        name: string;
                                        arguments: string;
                                    }) => Readonly<{
                                        name: string;
                                        arguments: string;
                                    }>) & {
                                        config: {
                                            name: (val: string) => string;
                                            arguments: (val: string) => string;
                                        };
                                        Value: Readonly<{
                                            name: string;
                                            arguments: string;
                                        }>;
                                    };
                                };
                                Value: Readonly<{
                                    function: Readonly<{
                                        name: string;
                                        arguments: string;
                                    }>;
                                    id: string;
                                    type: "function";
                                }>;
                            };
                            Value: readonly Readonly<{
                                function: Readonly<{
                                    name: string;
                                    arguments: string;
                                }>;
                                id: string;
                                type: "function";
                            }>[];
                        };
                        fallback: (() => readonly Readonly<{
                            function: Readonly<{
                                name: string;
                                arguments: string;
                            }>;
                            id: string;
                            type: "function";
                        }>[]) | undefined;
                    };
                    Value: readonly Readonly<{
                        function: Readonly<{
                            name: string;
                            arguments: string;
                        }>;
                        id: string;
                        type: "function";
                    }>[] | undefined;
                };
            };
            Value: Readonly<{
                tool_calls?: readonly Readonly<{
                    function: Readonly<{
                        name: string;
                        arguments: string;
                    }>;
                    id: string;
                    type: "function";
                }>[] | undefined;
                content: string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[] | null;
                role: "assistant";
            }>;
        }, ((val: {
            content: string | readonly ({
                text: string;
                type: "text";
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                };
            })[];
            role: "user";
        }) => Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "user";
        }>) & {
            config: {
                role: ((val: "user") => "user") & {
                    config: "user";
                    Value: "user";
                };
                content: ((val: string | readonly ({
                    text: string;
                    type: "text";
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                    };
                })[]) => string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[]) & {
                    config: [(val: string) => string, ((val: readonly ({
                        text: string;
                        type: "text";
                    } | {
                        type: "image_url";
                        image_url: {
                            url: string;
                        };
                    })[]) => readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[]) & {
                        config: ((val: {
                            text: string;
                            type: "text";
                        } | {
                            type: "image_url";
                            image_url: {
                                url: string;
                            };
                        }) => Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>) & {
                            config: [((val: {
                                text: string;
                                type: "text";
                            }) => Readonly<{
                                text: string;
                                type: "text";
                            }>) & {
                                config: {
                                    type: ((val: "text") => "text") & {
                                        config: "text";
                                        Value: "text";
                                    };
                                    text: (val: string) => string;
                                };
                                Value: Readonly<{
                                    text: string;
                                    type: "text";
                                }>;
                            }, ((val: {
                                type: "image_url";
                                image_url: {
                                    url: string;
                                };
                            }) => Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>) & {
                                config: {
                                    type: ((val: "image_url") => "image_url") & {
                                        config: "image_url";
                                        Value: "image_url";
                                    };
                                    image_url: ((val: {
                                        url: string;
                                    }) => Readonly<{
                                        url: string;
                                    }>) & {
                                        config: {
                                            url: (val: string) => string;
                                        };
                                        Value: Readonly<{
                                            url: string;
                                        }>;
                                    };
                                };
                                Value: Readonly<{
                                    type: "image_url";
                                    image_url: Readonly<{
                                        url: string;
                                    }>;
                                }>;
                            }];
                            Value: Readonly<{
                                text: string;
                                type: "text";
                            }> | Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>;
                        };
                        Value: readonly (Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>)[];
                    }];
                    Value: string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[];
                };
            };
            Value: Readonly<{
                content: string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[];
                role: "user";
            }>;
        }, ((val: {
            content: string | readonly ({
                text: string;
                type: "text";
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                };
            })[];
            role: "tool";
            tool_call_id: string;
        }) => Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "tool";
            tool_call_id: string;
        }>) & {
            config: {
                role: ((val: "tool") => "tool") & {
                    config: "tool";
                    Value: "tool";
                };
                tool_call_id: (val: string) => string;
                content: ((val: string | readonly ({
                    text: string;
                    type: "text";
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                    };
                })[]) => string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[]) & {
                    config: [(val: string) => string, ((val: readonly ({
                        text: string;
                        type: "text";
                    } | {
                        type: "image_url";
                        image_url: {
                            url: string;
                        };
                    })[]) => readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[]) & {
                        config: ((val: {
                            text: string;
                            type: "text";
                        } | {
                            type: "image_url";
                            image_url: {
                                url: string;
                            };
                        }) => Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>) & {
                            config: [((val: {
                                text: string;
                                type: "text";
                            }) => Readonly<{
                                text: string;
                                type: "text";
                            }>) & {
                                config: {
                                    type: ((val: "text") => "text") & {
                                        config: "text";
                                        Value: "text";
                                    };
                                    text: (val: string) => string;
                                };
                                Value: Readonly<{
                                    text: string;
                                    type: "text";
                                }>;
                            }, ((val: {
                                type: "image_url";
                                image_url: {
                                    url: string;
                                };
                            }) => Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>) & {
                                config: {
                                    type: ((val: "image_url") => "image_url") & {
                                        config: "image_url";
                                        Value: "image_url";
                                    };
                                    image_url: ((val: {
                                        url: string;
                                    }) => Readonly<{
                                        url: string;
                                    }>) & {
                                        config: {
                                            url: (val: string) => string;
                                        };
                                        Value: Readonly<{
                                            url: string;
                                        }>;
                                    };
                                };
                                Value: Readonly<{
                                    type: "image_url";
                                    image_url: Readonly<{
                                        url: string;
                                    }>;
                                }>;
                            }];
                            Value: Readonly<{
                                text: string;
                                type: "text";
                            }> | Readonly<{
                                type: "image_url";
                                image_url: Readonly<{
                                    url: string;
                                }>;
                            }>;
                        };
                        Value: readonly (Readonly<{
                            text: string;
                            type: "text";
                        }> | Readonly<{
                            type: "image_url";
                            image_url: Readonly<{
                                url: string;
                            }>;
                        }>)[];
                    }];
                    Value: string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[];
                };
            };
            Value: Readonly<{
                content: string | readonly (Readonly<{
                    text: string;
                    type: "text";
                }> | Readonly<{
                    type: "image_url";
                    image_url: Readonly<{
                        url: string;
                    }>;
                }>)[];
                role: "tool";
                tool_call_id: string;
            }>;
        }];
        Value: Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "system";
        }> | Readonly<{
            tool_calls?: readonly Readonly<{
                function: Readonly<{
                    name: string;
                    arguments: string;
                }>;
                id: string;
                type: "function";
            }>[] | undefined;
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[] | null;
            role: "assistant";
        }> | Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "user";
        }> | Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "tool";
            tool_call_id: string;
        }>;
    };
    type Primitive<Type extends 'string' | 'number' | 'integer' | 'boolean'> = Readonly<{
        type: Type;
        enum?: Type[];
    }>;
    type Obj<Params extends Record<string, Type>> = Readonly<{
        type: 'object';
        parameters: Params;
        required: keyof Params;
    }>;
    type List<Item extends Type> = Readonly<{
        type: 'array';
        items: Item;
    }>;
    type Type = Obj<any> | List<any> | Primitive<any>;
    /**
     * Github hosted LLM API.
     */
    export class $mol_github_model extends $mol_object {
        /** Model names from https://github.com/marketplace/models */
        names(): string[];
        /** System rules */
        rules(): string;
        /** List of callable functions */
        tools(): Map<string, {
            descr: string;
            params: Obj<any>;
            func: Function;
        }>;
        /** Actual system state */
        state(next?: readonly string[]): readonly string[];
        /** Additional model query params */
        params(next?: {}): {};
        /** Dialog history */
        history(next?: typeof Message.Value[]): (Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "system";
        }> | Readonly<{
            tool_calls?: readonly Readonly<{
                function: Readonly<{
                    name: string;
                    arguments: string;
                }>;
                id: string;
                type: "function";
            }>[] | undefined;
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[] | null;
            role: "assistant";
        }> | Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "user";
        }> | Readonly<{
            content: string | readonly (Readonly<{
                text: string;
                type: "text";
            }> | Readonly<{
                type: "image_url";
                image_url: Readonly<{
                    url: string;
                }>;
            }>)[];
            role: "tool";
            tool_call_id: string;
        }>)[];
        /** Independent copy of current state. */
        fork(): $mol_github_model;
        /** One-shot stateless prompting */
        shot(prompt: any[], context?: any, params?: {}): any;
        /** Add user prompt */
        ask(chunks: any[]): this;
        /** Add assistant context */
        tell(chunks: any[]): this;
        /** Add tools answer */
        answer(id: string, chunks: any[]): this;
        request_body(model: string): string;
        request(model: string, key: string): Readonly<{
            choices: readonly Readonly<{
                message: Readonly<{
                    tool_calls?: readonly Readonly<{
                        function: Readonly<{
                            name: string;
                            arguments: string;
                        }>;
                        id: string;
                        type: "function";
                    }>[] | undefined;
                    content: string | readonly (Readonly<{
                        text: string;
                        type: "text";
                    }> | Readonly<{
                        type: "image_url";
                        image_url: Readonly<{
                            url: string;
                        }>;
                    }>)[] | null;
                    role: "assistant";
                }>;
            }>[];
        }>;
        /** Last response from LLM */
        response(): any;
    }
    export {};
}

declare namespace $ {

	type $mol_list__rows_bog_norweb_front_chat_1 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $bog_builderui_card__attr_bog_norweb_front_chat_2 = $mol_type_enforce<
		({ 
			'raggu_loading': ReturnType< $bog_norweb_front_chat['is_communicating'] >,
		})  & ReturnType< $bog_builderui_card['attr'] >
		,
		ReturnType< $bog_builderui_card['attr'] >
	>
	type $bog_builderui_card__sub_bog_norweb_front_chat_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_card['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_scroll__sub_bog_norweb_front_chat_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_chat_7 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_chat['use_sug_one'] > ): ReturnType< $bog_norweb_front_chat['use_sug_one'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_chat_9 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_chat['use_sug_two'] > ): ReturnType< $bog_norweb_front_chat['use_sug_two'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $mol_button_minor__hint_bog_norweb_front_chat_10 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['clear_text'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_norweb_front_chat_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['clear_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_norweb_front_chat_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_textarea__hint_bog_norweb_front_chat_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['input_hint_text'] >
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_bog_norweb_front_chat_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['prompt_text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__submit_bog_norweb_front_chat_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['prompt_submit'] >
		,
		ReturnType< $mol_textarea['submit'] >
	>
	type $mol_button_minor__hint_bog_norweb_front_chat_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['send_label_text'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_norweb_front_chat_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_chat['prompt_submit'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_norweb_front_chat_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_chat_22 = $mol_type_enforce<
		({ 
			'raggu_role': ReturnType< $bog_norweb_front_chat['message_role'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_chat_24 = $mol_type_enforce<
		({ 
			'raggu_off_graph': ReturnType< $bog_norweb_front_chat['message_off_graph'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__attr_bog_norweb_front_chat_26 = $mol_type_enforce<
		({ 
			'raggu_role': ReturnType< $bog_norweb_front_chat['message_role'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		,
		ReturnType< $bog_builderui_div['attr'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_chat_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_chat extends $bog_builderui_div {
		Messages( ): $mol_list
		is_communicating( ): boolean
		Skel_line_one( ): $bog_builderui_skeleton
		Skel_line_two( ): $bog_builderui_skeleton
		Skel_line_three( ): $bog_builderui_skeleton
		Status( ): $bog_builderui_card
		Body_flow( ): $bog_builderui_div
		Body( ): $mol_scroll
		use_sug_one( next?: any ): any
		Sug_one( ): $bog_builderui_div
		use_sug_two( next?: any ): any
		Sug_two( ): $bog_builderui_div
		clear_click( next?: any ): any
		Clear( ): $mol_button_minor
		Suggestions( ): $bog_builderui_div
		prompt_text( next?: string ): string
		prompt_submit( next?: any ): any
		Prompt( ): $mol_textarea
		Input_send( ): $mol_button_minor
		Input_row( ): $bog_builderui_div
		Footer( ): $bog_builderui_div
		Message_text( id: any): $bog_builderui_div
		Message_badge( id: any): $bog_builderui_div
		dataset_id( ): string
		sug_one_text( ): string
		sug_two_text( ): string
		input_hint_text( ): string
		send_label_text( ): string
		seed_user_text( ): string
		seed_assistant_text( ): string
		clear_text( ): string
		off_graph_text( ): string
		rows( ): readonly(any)[]
		message_text( id: any): string
		message_role( id: any): string
		message_off_graph( id: any): boolean
		sub( ): readonly(any)[]
		Message( id: any): $bog_builderui_div
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map
declare namespace $.$$ {
    type Raggu_chat_role = 'user' | 'assistant';
    type Raggu_chat_item = {
        role: Raggu_chat_role;
        text: string;
        /** Отвечено фолбэком (прямой LLM без графа), а не GraphRAG-бэком. */
        off_graph?: boolean;
    };
    class $bog_norweb_front_chat extends $.$bog_norweb_front_chat {
        history(next?: Raggu_chat_item[]): Raggu_chat_item[];
        prompt_text(next?: string): string;
        llm(): $mol_github_model;
        rows(): $bog_builderui_div[];
        auto(): any;
        message_text(index: number): string;
        message_role(index: number): Raggu_chat_role;
        message_off_graph(index: number): boolean;
        prompt_submit(): null;
        is_communicating(): boolean;
        ask(text: string): void;
        ask_backend(text: string): void;
        graph_context(): string;
        ask_llm(text: string): void;
        use_sug_one(): null;
        use_sug_two(): null;
        clear_click(): null;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $bog_norweb_front_dashboard_dist extends $bog_builderui_div {
	}
	
}

//# sourceMappingURL=dist.view.tree.d.ts.map
declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_dashboard_metric_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_metric_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_metric_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_dashboard_metric extends $bog_builderui_div {
		Name( ): $bog_builderui_div
		Bar_fill( ): $bog_builderui_div
		Bar( ): $bog_builderui_div
		Value( ): $bog_builderui_div
		name( ): string
		value( ): string
		pct( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=metric.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_dashboard_metric extends $.$bog_norweb_front_dashboard_metric {
        Bar_fill(): $bog_builderui_div;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_dashboard_stage_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_stage_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_stage_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_dashboard_stage extends $bog_builderui_div {
		Name( ): $bog_builderui_div
		Bar_fill( ): $bog_builderui_div
		Bar( ): $bog_builderui_div
		Time( ): $bog_builderui_div
		name( ): string
		time( ): string
		pct( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=stage.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_dashboard_stage extends $.$bog_norweb_front_dashboard_stage {
        Bar_fill(): $bog_builderui_div;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_log_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_dashboard_log extends $bog_builderui_div {
		expanded( next?: boolean ): boolean
		toggle( next?: any ): any
		Time( ): $bog_builderui_div
		Text( ): $bog_builderui_div
		Mode( ): $bog_builderui_div
		Dur( ): $bog_builderui_div
		Arrow( ): $bog_builderui_div
		Head( ): $bog_builderui_div
		Trace_label( ): $bog_builderui_div
		Trace_stat_chunks( ): $bog_builderui_div
		Trace_stat_comms( ): $bog_builderui_div
		Trace_stat_retr( ): $bog_builderui_div
		Trace_stat_gen( ): $bog_builderui_div
		Trace_stat_power( ): $bog_builderui_div
		Trace_stats( ): $bog_builderui_div
		Trace_link( ): $bog_builderui_div
		Trace( ): $bog_builderui_div
		time( ): string
		text( ): string
		mode( ): string
		dur( ): string
		chunks( ): string
		communities( ): string
		retrieval( ): string
		generation( ): string
		power( ): string
		trace_label( ): string
		trace_link( ): string
		arrow( ): string
		attr( ): ({ 
			'bog_norweb_front_dashboard_log_expanded': ReturnType< $bog_norweb_front_dashboard_log['expanded'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=log.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_dashboard_log extends $.$bog_norweb_front_dashboard_log {
        toggle(next?: Event | null): null;
        arrow(): "▴" | "▾";
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_dashboard_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_dashboard_dist__sub_bog_norweb_front_dashboard_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_norweb_front_dashboard_dist['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_dashboard_metric__name_bog_norweb_front_dashboard_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['metric_name'] >
		,
		ReturnType< $bog_norweb_front_dashboard_metric['name'] >
	>
	type $bog_norweb_front_dashboard_metric__value_bog_norweb_front_dashboard_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['metric_value'] >
		,
		ReturnType< $bog_norweb_front_dashboard_metric['value'] >
	>
	type $bog_norweb_front_dashboard_metric__pct_bog_norweb_front_dashboard_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['metric_pct'] >
		,
		ReturnType< $bog_norweb_front_dashboard_metric['pct'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_20 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['metric_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_23 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_dashboard_stage__name_bog_norweb_front_dashboard_35 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['stage_name'] >
		,
		ReturnType< $bog_norweb_front_dashboard_stage['name'] >
	>
	type $bog_norweb_front_dashboard_stage__time_bog_norweb_front_dashboard_36 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['stage_time'] >
		,
		ReturnType< $bog_norweb_front_dashboard_stage['time'] >
	>
	type $bog_norweb_front_dashboard_stage__pct_bog_norweb_front_dashboard_37 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['stage_pct'] >
		,
		ReturnType< $bog_norweb_front_dashboard_stage['pct'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_38 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['stage_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_dashboard_log__time_bog_norweb_front_dashboard_41 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_time'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['time'] >
	>
	type $bog_norweb_front_dashboard_log__text_bog_norweb_front_dashboard_42 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_text'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['text'] >
	>
	type $bog_norweb_front_dashboard_log__mode_bog_norweb_front_dashboard_43 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_mode'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['mode'] >
	>
	type $bog_norweb_front_dashboard_log__dur_bog_norweb_front_dashboard_44 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_dur'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['dur'] >
	>
	type $bog_norweb_front_dashboard_log__expanded_bog_norweb_front_dashboard_45 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_expanded'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['expanded'] >
	>
	type $bog_norweb_front_dashboard_log__chunks_bog_norweb_front_dashboard_46 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_chunks'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['chunks'] >
	>
	type $bog_norweb_front_dashboard_log__communities_bog_norweb_front_dashboard_47 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_communities'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['communities'] >
	>
	type $bog_norweb_front_dashboard_log__retrieval_bog_norweb_front_dashboard_48 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_retrieval'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['retrieval'] >
	>
	type $bog_norweb_front_dashboard_log__generation_bog_norweb_front_dashboard_49 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_generation'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['generation'] >
	>
	type $bog_norweb_front_dashboard_log__power_bog_norweb_front_dashboard_50 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_power'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['power'] >
	>
	type $bog_norweb_front_dashboard_log__trace_label_bog_norweb_front_dashboard_51 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['trace_label_text'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['trace_label'] >
	>
	type $bog_norweb_front_dashboard_log__trace_link_bog_norweb_front_dashboard_52 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['trace_link_text'] >
		,
		ReturnType< $bog_norweb_front_dashboard_log['trace_link'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_53 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_dashboard['log_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_dashboard_55 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_dashboard extends $bog_builderui_div {
		Title( ): $bog_builderui_div
		Subtitle( ): $bog_builderui_div
		Card_stats_label( ): $bog_builderui_div
		Stat_nodes_val( ): $bog_builderui_div
		Stat_nodes_lbl( ): $bog_builderui_div
		Stat_nodes( ): $bog_builderui_div
		Stat_edges_val( ): $bog_builderui_div
		Stat_edges_lbl( ): $bog_builderui_div
		Stat_edges( ): $bog_builderui_div
		Stat_comms_val( ): $bog_builderui_div
		Stat_comms_lbl( ): $bog_builderui_div
		Stat_comms( ): $bog_builderui_div
		Stats_row( ): $bog_builderui_div
		Stats_dist( ): $bog_norweb_front_dashboard_dist
		Card_stats( ): $bog_builderui_div
		Card_quality_label( ): $bog_builderui_div
		metric_name( id: any): string
		metric_value( id: any): string
		metric_pct( id: any): string
		Metric( id: any): $bog_norweb_front_dashboard_metric
		metric_rows( ): readonly(any)[]
		Metric_rows( ): $bog_builderui_div
		Quality_footer( ): $bog_builderui_div
		Card_quality( ): $bog_builderui_div
		Card_energy_label( ): $bog_builderui_div
		energy_kwh_val( ): string
		Energy_kwh_val( ): $bog_builderui_div
		Energy_kwh_lbl( ): $bog_builderui_div
		Energy_kwh( ): $bog_builderui_div
		energy_cost_val( ): string
		Energy_cost_val( ): $bog_builderui_div
		Energy_cost_lbl( ): $bog_builderui_div
		Energy_cost( ): $bog_builderui_div
		Energy_row( ): $bog_builderui_div
		Energy_formula( ): $bog_builderui_div
		Energy_note( ): $bog_builderui_div
		Card_energy( ): $bog_builderui_div
		Card_timings_label( ): $bog_builderui_div
		stage_name( id: any): string
		stage_time( id: any): string
		stage_pct( id: any): string
		Stage( id: any): $bog_norweb_front_dashboard_stage
		stage_rows( ): readonly(any)[]
		Stage_rows( ): $bog_builderui_div
		Card_timings( ): $bog_builderui_div
		Card_logs_label( ): $bog_builderui_div
		log_time( id: any): string
		log_text( id: any): string
		log_mode( id: any): string
		log_dur( id: any): string
		log_expanded( id: any, next?: boolean ): boolean
		log_chunks( id: any): string
		log_communities( id: any): string
		log_retrieval( id: any): string
		log_generation( id: any): string
		log_power( id: any): string
		Log( id: any): $bog_norweb_front_dashboard_log
		log_rows( ): readonly(any)[]
		Log_list( ): $bog_builderui_div
		Card_logs( ): $bog_builderui_div
		Grid( ): $bog_builderui_div
		metrics( ): readonly(any)[]
		stages( ): readonly(any)[]
		logs( ): readonly(any)[]
		title_text( ): string
		subtitle_text( ): string
		card_stats_label_text( ): string
		stat_nodes_lbl_text( ): string
		stat_edges_lbl_text( ): string
		stat_comms_lbl_text( ): string
		stats_dist_text( ): string
		card_quality_label_text( ): string
		quality_footer_text( ): string
		card_energy_label_text( ): string
		energy_kwh_lbl_text( ): string
		energy_cost_lbl_text( ): string
		energy_formula_text( ): string
		energy_note_text( ): string
		card_timings_label_text( ): string
		card_logs_label_text( ): string
		trace_label_text( ): string
		trace_link_text( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=dashboard.view.tree.d.ts.map
declare namespace $.$$ {
    type Metric = {
        id: string;
        name: string;
        value: string;
        pct: string;
    };
    type Stage = {
        id: string;
        name: string;
        time: string;
        pct: string;
    };
    type Log = {
        id: string;
        time: string;
        text: string;
        mode: string;
        dur: string;
        chunks: string;
        communities: string;
        retrieval: string;
        generation: string;
    };
    export class $bog_norweb_front_dashboard extends $.$bog_norweb_front_dashboard {
        metrics(): Metric[];
        stages(): Stage[];
        logs(): Log[];
        metric_rows(): $.$bog_norweb_front_dashboard_metric[];
        stage_rows(): $.$bog_norweb_front_dashboard_stage[];
        log_rows(): $.$bog_norweb_front_dashboard_log[];
        metric(id: string): Metric;
        stage(id: string): Stage;
        log(id: string): Log;
        metric_name(id: string): string;
        metric_value(id: string): string;
        metric_pct(id: string): string;
        stage_name(id: string): string;
        stage_time(id: string): string;
        stage_pct(id: string): string;
        log_time(id: string): string;
        log_text(id: string): string;
        log_mode(id: string): string;
        log_dur(id: string): string;
        log_chunks(id: string): string;
        log_communities(id: string): string;
        log_retrieval(id: string): string;
        log_generation(id: string): string;
        log_power(id: string): string;
        pipeline_seconds(): number;
        energy_kwh(): number;
        energy_kwh_val(): string;
        energy_cost_val(): string;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_summary_card_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_card_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_card_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_card_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_card_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_card_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	export class $bog_norweb_front_summary_card extends $bog_builderui_div {
		click( next?: any ): any
		Icon( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Badge( ): $bog_builderui_div
		Head( ): $bog_builderui_div
		Title( ): $bog_builderui_div
		Desc( ): $bog_builderui_div
		More( ): $bog_builderui_div
		icon( ): string
		badge( ): string
		title( ): string
		desc( ): string
		more( ): string
		event( ): ({ 
			click( next?: ReturnType< $bog_norweb_front_summary_card['click'] > ): ReturnType< $bog_norweb_front_summary_card['click'] >,
		})  & ReturnType< $bog_builderui_div['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_toggle'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $.$$ {
    /**
     * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
     */
    class $mol_link extends $.$mol_link {
        uri_toggle(): string;
        uri(): string;
        uri_off(): string;
        uri_native(): URL;
        current(): boolean;
        file_name(): string;
        minimal_height(): number;
        external(): boolean;
        target(): '_self' | '_blank' | '_top' | '_parent' | string;
        hint_safe(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__event_bog_norweb_front_summary_detail_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_summary_detail['close'] > ): ReturnType< $bog_norweb_front_summary_detail['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__event_bog_norweb_front_summary_detail_6 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_norweb_front_summary_detail['close'] > ): ReturnType< $bog_norweb_front_summary_detail['close'] >,
		}) 
		,
		ReturnType< $bog_builderui_div['event'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary_detail['body'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_scroll__sub_bog_norweb_front_summary_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_image__uri_bog_norweb_front_summary_detail_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary_detail['image'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_detail_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary_detail['link_rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $mol_link__uri_bog_norweb_front_summary_detail_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary_detail['link_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__title_bog_norweb_front_summary_detail_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary_detail['link_label'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__attr_bog_norweb_front_summary_detail_19 = $mol_type_enforce<
		({ 
			'target': string,
		})  & ReturnType< $mol_link['attr'] >
		,
		ReturnType< $mol_link['attr'] >
	>
	export class $bog_norweb_front_summary_detail extends $bog_builderui_div {
		close( next?: any ): any
		Backdrop( ): $bog_builderui_div
		Icon( ): $bog_builderui_div
		Title( ): $bog_builderui_div
		Badge( ): $bog_builderui_div
		Header_text( ): $bog_builderui_div
		Spacer( ): $bog_builderui_div
		Close_btn( ): $bog_builderui_div
		Header( ): $bog_builderui_div
		Content( ): $bog_builderui_div
		Body( ): $mol_scroll
		Panel( ): $bog_builderui_div
		Fact_marker( id: any): $bog_builderui_div
		fact( id: any): string
		Fact_text( id: any): $bog_builderui_div
		link_rows( ): readonly(any)[]
		link_uri( id: any): string
		link_label( id: any): string
		showed( ): boolean
		icon( ): string
		badge( ): string
		title( ): string
		image( ): string
		facts( ): readonly(any)[]
		links( ): readonly(any)[]
		body( ): readonly(any)[]
		attr( ): ({ 
			'bog_norweb_front_summary_detail_showed': ReturnType< $bog_norweb_front_summary_detail['showed'] >,
		})  & ReturnType< $bog_builderui_div['attr'] >
		sub( ): readonly(any)[]
		Image( ): $mol_image
		Fact( id: any): $bog_builderui_div
		Links( ): $bog_builderui_div
		Link( id: any): $mol_link
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_summary_detail extends $.$bog_norweb_front_summary_detail {
        body(): ($bog_builderui_div | $.$mol_image)[];
        fact(i: number): any;
        link_rows(): $.$mol_link[];
        link_uri(i: number): any;
        link_label(i: number): any;
    }
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_builderui_div__sub_bog_norweb_front_summary_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_summary_card__icon_bog_norweb_front_summary_4 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['card_icon'] >
		,
		ReturnType< $bog_norweb_front_summary_card['icon'] >
	>
	type $bog_norweb_front_summary_card__badge_bog_norweb_front_summary_5 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['card_badge'] >
		,
		ReturnType< $bog_norweb_front_summary_card['badge'] >
	>
	type $bog_norweb_front_summary_card__title_bog_norweb_front_summary_6 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['card_title'] >
		,
		ReturnType< $bog_norweb_front_summary_card['title'] >
	>
	type $bog_norweb_front_summary_card__desc_bog_norweb_front_summary_7 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['card_desc'] >
		,
		ReturnType< $bog_norweb_front_summary_card['desc'] >
	>
	type $bog_norweb_front_summary_card__more_bog_norweb_front_summary_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['more_text'] >
		,
		ReturnType< $bog_norweb_front_summary_card['more'] >
	>
	type $bog_norweb_front_summary_card__click_bog_norweb_front_summary_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['click'] >
		,
		ReturnType< $bog_norweb_front_summary_card['click'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_summary_10 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['rows'] >
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_summary_detail__showed_bog_norweb_front_summary_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['detail_showed'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['showed'] >
	>
	type $bog_norweb_front_summary_detail__icon_bog_norweb_front_summary_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_icon'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['icon'] >
	>
	type $bog_norweb_front_summary_detail__badge_bog_norweb_front_summary_13 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_badge'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['badge'] >
	>
	type $bog_norweb_front_summary_detail__title_bog_norweb_front_summary_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_title'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['title'] >
	>
	type $bog_norweb_front_summary_detail__facts_bog_norweb_front_summary_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_facts'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['facts'] >
	>
	type $bog_norweb_front_summary_detail__links_bog_norweb_front_summary_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_links'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['links'] >
	>
	type $bog_norweb_front_summary_detail__image_bog_norweb_front_summary_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['opened_image'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['image'] >
	>
	type $bog_norweb_front_summary_detail__close_bog_norweb_front_summary_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_summary['close'] >
		,
		ReturnType< $bog_norweb_front_summary_detail['close'] >
	>
	export class $bog_norweb_front_summary extends $bog_builderui_div {
		Header_title( ): $bog_builderui_div
		Header_subtitle( ): $bog_builderui_div
		Header( ): $bog_builderui_div
		card_icon( id: any): string
		card_badge( id: any): string
		card_title( id: any): string
		card_desc( id: any): string
		click( id: any, next?: any ): any
		Card( id: any): $bog_norweb_front_summary_card
		rows( ): readonly(any)[]
		Grid( ): $bog_builderui_div
		detail_showed( ): boolean
		opened_icon( ): string
		opened_badge( ): string
		opened_title( ): string
		opened_facts( ): readonly(any)[]
		opened_links( ): readonly(any)[]
		opened_image( ): string
		close( next?: any ): any
		opened( next?: string ): string
		header_title_text( ): string
		header_subtitle_text( ): string
		more_text( ): string
		ragu_badge( ): string
		ragu_desc( ): string
		ragu_fact_1( ): string
		ragu_fact_2( ): string
		ragu_fact_3( ): string
		mol_badge( ): string
		mol_desc( ): string
		mol_fact_1( ): string
		mol_fact_2( ): string
		mol_fact_3( ): string
		menolite_badge( ): string
		menolite_desc( ): string
		menolite_fact_1( ): string
		menolite_fact_2( ): string
		menolite_fact_3( ): string
		nerel_badge( ): string
		nerel_desc( ): string
		nerel_fact_1( ): string
		nerel_fact_2( ): string
		nerel_fact_3( ): string
		ocr_badge( ): string
		ocr_desc( ): string
		ocr_fact_1( ): string
		ocr_fact_2( ): string
		sub( ): readonly(any)[]
		Detail( ): $bog_norweb_front_summary_detail
	}
	
}

//# sourceMappingURL=summary.view.tree.d.ts.map
declare namespace $.$$ {
    type TechLink = {
        label: string;
        uri: string;
    };
    export class $bog_norweb_front_summary extends $.$bog_norweb_front_summary {
        ids(): string[];
        rows(): $bog_norweb_front_summary_card[];
        card_icon(id: string): "" | "🧠" | "⚡" | "🤖" | "🏷" | "📄";
        card_title(id: string): "" | "RAGU" | "$mol" | "Meno-Lite-0.1" | "NEREL+" | "OCR";
        card_badge(id: string): string;
        card_desc(id: string): string;
        card_facts(id: string): string[];
        card_links(id: string): TechLink[];
        card_image(id: string): "" | "bog/norweb/front/assets/ragu.jpg";
        detail_showed(): boolean;
        opened_icon(): "" | "🧠" | "⚡" | "🤖" | "🏷" | "📄";
        opened_badge(): string;
        opened_title(): "" | "RAGU" | "$mol" | "Meno-Lite-0.1" | "NEREL+" | "OCR";
        opened_facts(): string[];
        opened_links(): TechLink[];
        opened_image(): "" | "bog/norweb/front/assets/ragu.jpg";
        click(id: string): null;
        close(): null;
    }
    export {};
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

declare namespace $ {

	type $bog_favicon__Icon_bog_norweb_front_app_1 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['favicon_icon'] >
		,
		ReturnType< $bog_favicon['Icon'] >
	>
	type $bog_norweb_front_sidebar__screen_bog_norweb_front_app_2 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['screen'] >
		,
		ReturnType< $bog_norweb_front_sidebar['screen'] >
	>
	type $bog_norweb_front_sidebar__dataset_id_bog_norweb_front_app_3 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_sidebar['dataset_id'] >
	>
	type $bog_norweb_front_sidebar__dataset_title_bog_norweb_front_app_4 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_title'] >
		,
		ReturnType< $bog_norweb_front_sidebar['dataset_title'] >
	>
	type $bog_norweb_front_sidebar__Theme_auto_bog_norweb_front_app_5 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['Theme_auto'] >
		,
		ReturnType< $bog_norweb_front_sidebar['Theme_auto'] >
	>
	type $bog_norweb_front_topbar__screen_bog_norweb_front_app_6 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['screen'] >
		,
		ReturnType< $bog_norweb_front_topbar['screen'] >
	>
	type $bog_norweb_front_topbar__dataset_id_bog_norweb_front_app_7 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_topbar['dataset_id'] >
	>
	type $bog_norweb_front_topbar__dataset_title_bog_norweb_front_app_8 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_title'] >
		,
		ReturnType< $bog_norweb_front_topbar['dataset_title'] >
	>
	type $bog_norweb_front_topbar__screen_title_bog_norweb_front_app_9 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['screen_title'] >
		,
		ReturnType< $bog_norweb_front_topbar['screen_title'] >
	>
	type $bog_norweb_front_topbar__preset_bog_norweb_front_app_10 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['preset'] >
		,
		ReturnType< $bog_norweb_front_topbar['preset'] >
	>
	type $bog_norweb_front_topbar__open_settings_bog_norweb_front_app_11 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['open_settings'] >
		,
		ReturnType< $bog_norweb_front_topbar['open_settings'] >
	>
	type $mol_scroll__sub_bog_norweb_front_app_12 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['body'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $bog_builderui_div__sub_bog_norweb_front_app_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_builderui_div['sub'] >
	>
	type $bog_norweb_front_settings__showed_bog_norweb_front_app_14 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['settings_open'] >
		,
		ReturnType< $bog_norweb_front_settings['showed'] >
	>
	type $bog_norweb_front_gallery__dataset_id_bog_norweb_front_app_15 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_gallery['dataset_id'] >
	>
	type $bog_norweb_front_gallery__select_dataset_bog_norweb_front_app_16 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['select_dataset'] >
		,
		ReturnType< $bog_norweb_front_gallery['select_dataset'] >
	>
	type $bog_norweb_front_explorer__dataset_id_bog_norweb_front_app_17 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_explorer['dataset_id'] >
	>
	type $bog_norweb_front_explorer__ask_click_bog_norweb_front_app_18 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['ask_chat'] >
		,
		ReturnType< $bog_norweb_front_explorer['ask_click'] >
	>
	type $bog_norweb_front_chat__dataset_id_bog_norweb_front_app_19 = $mol_type_enforce<
		ReturnType< $bog_norweb_front_app['dataset_id'] >
		,
		ReturnType< $bog_norweb_front_chat['dataset_id'] >
	>
	export class $bog_norweb_front_app extends $bog_builderui_div {
		favicon_icon( ): $mol_icon_graph
		Favicon( ): $bog_favicon
		Theme_auto( ): $bog_theme_auto
		dataset_title( ): string
		Sidebar( ): $bog_norweb_front_sidebar
		screen_title( ): string
		open_settings( next?: any ): any
		Topbar( ): $bog_norweb_front_topbar
		Body( ): $mol_scroll
		Main( ): $bog_builderui_div
		Settings( ): $bog_norweb_front_settings
		Summary_popup( ): $mol_view
		select_dataset( next?: any ): any
		ask_chat( next?: any ): any
		screen( next?: string ): string
		preset( next?: string ): string
		dataset_id( next?: string ): string
		settings_open( next?: boolean ): boolean
		body( ): readonly(any)[]
		lights_mode( ): string
		screen_gallery_title( ): string
		screen_explorer_title( ): string
		screen_chat_title( ): string
		screen_dashboard_title( ): string
		screen_summary_title( ): string
		ask_entity_template( ): string
		attr( ): ({ 
			'bog_builderui_lights': ReturnType< $bog_norweb_front_app['lights_mode'] >,
			'bog_builderui_base': string,
			'bog_builderui_theme': string,
			'bog_builderui_chart': string,
			'bog_builderui_radius': string,
			'bog_builderui_font_body': string,
			'bog_builderui_font_head': string,
		})  & ReturnType< $bog_builderui_div['attr'] >
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
		Gallery( ): $bog_norweb_front_gallery
		Explorer( ): $bog_norweb_front_explorer
		Chat( ): $bog_norweb_front_chat
		Dashboard( ): $bog_norweb_front_dashboard
		Summary( ): $bog_norweb_front_summary
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $.$$ {
    class $bog_norweb_front_app extends $.$bog_norweb_front_app {
        body(): $.$bog_norweb_front_summary[] | $.$bog_norweb_front_gallery[] | $.$bog_norweb_front_explorer[] | $.$bog_norweb_front_chat[] | $.$bog_norweb_front_dashboard[];
        auto(): any;
        lights_mode(): "light" | "dark";
        Summary_popup(): $.$bog_norweb_front_summary_detail;
        open_settings(): null;
        select_dataset(id: string): null;
        ask_chat(): null;
        screen_title(): string;
        dataset_title(): string;
        arg_value(key: string, next: string | undefined, fallback: string): string;
        screen(next?: string): string;
        preset(next?: string): string;
        dataset_id(next?: string): string;
    }
}

declare namespace $ {
}

/** @see $bog_builderui_tokens */
declare namespace $ {
}

export = $;
//# sourceMappingURL=node.d.ts.map
