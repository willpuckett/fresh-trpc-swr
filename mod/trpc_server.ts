function G(r) {
    return !!r && !Array.isArray(r) && typeof r == "object";
}
function O(r) {
    if (r instanceof d) return r;
    let e = new d({
        code: "INTERNAL_SERVER_ERROR",
        cause: r
    });
    return r instanceof Error && r.stack && (e.stack = r.stack), e;
}
var P = class extends Error {
};
function J(r) {
    if (r instanceof Error) return r;
    let e = typeof r;
    if (!(e === "undefined" || e === "function" || r === null)) {
        if (e !== "object") return new Error(String(r));
        if (G(r)) {
            let t = new P;
            for(let n in r)t[n] = r[n];
            return t;
        }
    }
}
var d = class extends Error {
    constructor(e){
        let t = J(e.cause), n = (e.message ?? t?.message) ?? e.code;
        super(n, {
            cause: t
        }), this.code = e.code, this.name = this.constructor.name;
    }
};
function b(r) {
    let e = Object.create(null);
    for(let t in r){
        let n = r[t];
        e[n] = t;
    }
    return e;
}
var h = {
    PARSE_ERROR: -32700,
    BAD_REQUEST: -32600,
    INTERNAL_SERVER_ERROR: -32603,
    UNAUTHORIZED: -32001,
    FORBIDDEN: -32003,
    NOT_FOUND: -32004,
    METHOD_NOT_SUPPORTED: -32005,
    TIMEOUT: -32008,
    CONFLICT: -32009,
    PRECONDITION_FAILED: -32012,
    PAYLOAD_TOO_LARGE: -32013,
    UNPROCESSABLE_CONTENT: -32022,
    TOO_MANY_REQUESTS: -32029,
    CLIENT_CLOSED_REQUEST: -32099
}, le = b(h);
var _e = b(h), Z = {
    PARSE_ERROR: 400,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    TIMEOUT: 408,
    CONFLICT: 409,
    CLIENT_CLOSED_REQUEST: 499,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    METHOD_NOT_SUPPORTED: 405,
    UNPROCESSABLE_CONTENT: 422,
    TOO_MANY_REQUESTS: 429
};
function X(r) {
    return Z[r] ?? 500;
}
function T(r) {
    let { code: e  } = r;
    return X(e);
}
var j = ()=>{};
function M(r, e) {
    return new Proxy(j, {
        get (n, o) {
            if (!(typeof o != "string" || o === "then")) return M(r, [
                ...e,
                o
            ]);
        },
        apply (n, o, s) {
            let i = e[e.length - 1] === "apply";
            return r({
                args: i ? s.length >= 2 ? s[1] : [] : s,
                path: i ? e.slice(0, -1) : e
            });
        }
    });
}
var q = (r)=>M(r, []), Y = (r)=>new Proxy(j, {
        get (e, t) {
            if (!(typeof t != "string" || t === "then")) return r(t);
        }
    });
function S(r) {
    return "input" in r ? r : {
        input: r,
        output: r
    };
}
var w = {
    _default: !0,
    input: {
        serialize: (r)=>r,
        deserialize: (r)=>r
    },
    output: {
        serialize: (r)=>r,
        deserialize: (r)=>r
    }
}, _ = ({ shape: r  })=>r;
function ee(r) {
    return Object.assign(Object.create(null), r);
}
var $ = [
    "query",
    "mutation",
    "subscription"
];
function re(r) {
    return "router" in r._def;
}
var te = {
    _ctx: null,
    _errorShape: null,
    _meta: null,
    queries: {},
    mutations: {},
    subscriptions: {},
    errorFormatter: _,
    transformer: w
}, ne = [
    "then"
];
function g(r) {
    return function(t) {
        let n = new Set(Object.keys(t).filter((a)=>ne.includes(a)));
        if (n.size > 0) throw new Error("Reserved words used in `router({})` call: " + Array.from(n).join(", "));
        let o = ee({});
        function s(a, c = "") {
            for (let [u, p] of Object.entries(a ?? {})){
                let l = `${c}${u}`;
                if (re(p)) {
                    s(p._def.procedures, `${l}.`);
                    continue;
                }
                if (o[l]) throw new Error(`Duplicate key: ${l}`);
                o[l] = p;
            }
        }
        s(t);
        let i = {
            _config: r,
            router: !0,
            procedures: o,
            ...te,
            record: t,
            queries: Object.entries(o).filter((a)=>a[1]._def.query).reduce((a, [c, u])=>({
                    ...a,
                    [c]: u
                }), {}),
            mutations: Object.entries(o).filter((a)=>a[1]._def.mutation).reduce((a, [c, u])=>({
                    ...a,
                    [c]: u
                }), {}),
            subscriptions: Object.entries(o).filter((a)=>a[1]._def.subscription).reduce((a, [c, u])=>({
                    ...a,
                    [c]: u
                }), {})
        };
        return {
            ...t,
            _def: i,
            createCaller (a) {
                return q(({ path: u , args: p  })=>{
                    if (u.length === 1 && $.includes(u[0])) return B({
                        procedures: i.procedures,
                        path: p[0],
                        rawInput: p[1],
                        ctx: a,
                        type: u[0]
                    });
                    let l = u.join("."), y = i.procedures[l], R = "query";
                    return y._def.mutation ? R = "mutation" : y._def.subscription && (R = "subscription"), y({
                        path: l,
                        rawInput: p[0],
                        ctx: a,
                        type: R
                    });
                });
            },
            getErrorShape (a) {
                let { path: c , error: u  } = a, { code: p  } = a.error, l = {
                    message: u.message,
                    code: h[p],
                    data: {
                        code: p,
                        httpStatus: T(u)
                    }
                };
                return r.isDev && typeof a.error.stack == "string" && (l.data.stack = a.error.stack), typeof c == "string" && (l.data.path = c), this._def._config.errorFormatter({
                    ...a,
                    shape: l
                });
            }
        };
    };
}
function B(r) {
    let { type: e , path: t  } = r;
    if (!(t in r.procedures) || !r.procedures[t]?._def[e]) throw new d({
        code: "NOT_FOUND",
        message: `No "${e}"-procedure on path "${t}"`
    });
    let n = r.procedures[t];
    return n(r);
}
var v = typeof window > "u" || "Deno" in window || globalThis.process?.env?.NODE_ENV === "test" || !!globalThis.process?.env?.JEST_WORKER_ID || !!globalThis.process?.env?.VITEST_WORKER_ID;
var L = "middlewareMarker";
function V(r) {
    let e = r;
    if (typeof e == "function") return e;
    if (typeof e.parseAsync == "function") return e.parseAsync.bind(e);
    if (typeof e.parse == "function") return e.parse.bind(e);
    if (typeof e.validateSync == "function") return e.validateSync.bind(e);
    if (typeof e.create == "function") return e.create.bind(e);
    throw new Error("Could not find a validator fn");
}
var x = class {
    _def() {
        return {
            middlewares: this.middlewares,
            resolver: this.resolver,
            inputParser: this.inputParser,
            outputParser: this.outputParser,
            meta: this.meta
        };
    }
    async parseInput(e) {
        try {
            return await this.parseInputFn(e);
        } catch (t) {
            throw new d({
                code: "BAD_REQUEST",
                cause: t
            });
        }
    }
    async parseOutput(e) {
        try {
            return await this.parseOutputFn(e);
        } catch (t) {
            throw new d({
                code: "INTERNAL_SERVER_ERROR",
                cause: t,
                message: "Output validation failed"
            });
        }
    }
    async call(e) {
        let t = this.middlewares.concat([
            async ({ ctx: s  })=>{
                let i = await this.parseInput(e.rawInput), f = await this.resolver({
                    ...e,
                    ctx: s,
                    input: i
                }), a = await this.parseOutput(f);
                return {
                    marker: L,
                    ok: !0,
                    data: a,
                    ctx: s
                };
            }
        ]), n = async (s = {
            index: 0,
            ctx: e.ctx
        })=>{
            try {
                return await t[s.index]({
                    ctx: s.ctx,
                    type: e.type,
                    path: e.path,
                    rawInput: e.rawInput,
                    meta: this.meta,
                    next: async (f)=>await n({
                            index: s.index + 1,
                            ctx: f ? f.ctx : s.ctx
                        })
                });
            } catch (i) {
                return {
                    ctx: s.ctx,
                    ok: !1,
                    error: O(i),
                    marker: L
                };
            }
        }, o = await n();
        if (!o) throw new d({
            code: "INTERNAL_SERVER_ERROR",
            message: "No result from middlewares - did you forget to `return next()`?"
        });
        if (!o.ok) throw o.error;
        return o.data;
    }
    inheritMiddlewares(e) {
        let t = this.constructor;
        return new t({
            middlewares: [
                ...e,
                ...this.middlewares
            ],
            resolver: this.resolver,
            inputParser: this.inputParser,
            outputParser: this.outputParser,
            meta: this.meta
        });
    }
    constructor(e){
        this.middlewares = e.middlewares, this.resolver = e.resolver, this.inputParser = e.inputParser, this.parseInputFn = V(this.inputParser), this.outputParser = e.outputParser, this.parseOutputFn = V(this.outputParser), this.meta = e.meta;
    }
};
function N(r) {
    let e = "input" in r ? r.input : (n)=>{
        if (n != null) throw new d({
            code: "BAD_REQUEST",
            message: "No input expected"
        });
    }, t = "output" in r && r.output ? r.output : (n)=>n;
    return new x({
        inputParser: e,
        resolver: r.resolve,
        middlewares: [],
        outputParser: t,
        meta: r.meta
    });
}
function C(r) {
    let e = r;
    if (typeof e == "function") return e;
    if (typeof e.parseAsync == "function") return e.parseAsync.bind(e);
    if (typeof e.parse == "function") return e.parse.bind(e);
    if (typeof e.validateSync == "function") return e.validateSync.bind(e);
    if (typeof e.create == "function") return e.create.bind(e);
    if (typeof e.assert == "function") return (t)=>(e.assert(t), t);
    throw new Error("Could not find a validator fn");
}
function Q(r) {
    return r ? C(r) : (e)=>e;
}
function k(r, ...e) {
    let t = Object.assign(Object.create(null), r);
    for (let n of e)for(let o in n){
        if (o in t && t[o] !== n[o]) throw new Error(`Duplicate key ${o}`);
        t[o] = n[o];
    }
    return t;
}
function oe() {
    function r(t) {
        return {
            _middlewares: t,
            unstable_pipe (n) {
                let o = "_middlewares" in n ? n._middlewares : [
                    n
                ];
                return r([
                    ...t,
                    ...o
                ]);
            }
        };
    }
    function e(t) {
        return r([
            t
        ]);
    }
    return e;
}
function H(r) {
    return r && typeof r == "object" && !Array.isArray(r);
}
function K(r) {
    let e = async ({ next: t , rawInput: n , input: o  })=>{
        let s;
        try {
            s = await r(n);
        } catch (f) {
            throw new d({
                code: "BAD_REQUEST",
                cause: f
            });
        }
        let i = H(o) && H(s) ? {
            ...o,
            ...s
        } : s;
        return t({
            input: i
        });
    };
    return e._type = "input", e;
}
function z(r) {
    let e = async ({ next: t  })=>{
        let n = await t();
        if (!n.ok) return n;
        try {
            let o = await r(n.data);
            return {
                ...n,
                data: o
            };
        } catch (o1) {
            throw new d({
                message: "Output validation failed",
                code: "INTERNAL_SERVER_ERROR",
                cause: o1
            });
        }
    };
    return e._type = "output", e;
}
var W = "middlewareMarker";
function E(r, e) {
    let { middlewares: t = [] , inputs: n , meta: o , ...s } = e;
    return U({
        ...k(r, s),
        inputs: [
            ...r.inputs,
            ...n ?? []
        ],
        middlewares: [
            ...r.middlewares,
            ...t
        ],
        meta: r.meta && o ? {
            ...r.meta,
            ...o
        } : o ?? r.meta
    });
}
function U(r = {}) {
    let e = {
        inputs: [],
        middlewares: [],
        ...r
    };
    return {
        _def: e,
        input (t) {
            let n = C(t);
            return E(e, {
                inputs: [
                    t
                ],
                middlewares: [
                    K(n)
                ]
            });
        },
        output (t) {
            let n = C(t);
            return E(e, {
                output: t,
                middlewares: [
                    z(n)
                ]
            });
        },
        meta (t) {
            return E(e, {
                meta: t
            });
        },
        unstable_concat (t) {
            return E(e, t._def);
        },
        use (t) {
            let n = "_middlewares" in t ? t._middlewares : [
                t
            ];
            return E(e, {
                middlewares: n
            });
        },
        query (t) {
            return D({
                ...e,
                query: !0
            }, t);
        },
        mutation (t) {
            return D({
                ...e,
                mutation: !0
            }, t);
        },
        subscription (t) {
            return D({
                ...e,
                subscription: !0
            }, t);
        }
    };
}
function D(r, e) {
    let t = E(r, {
        resolver: e,
        middlewares: [
            async function(o) {
                let s = await e(o);
                return {
                    marker: W,
                    ok: !0,
                    data: s,
                    ctx: o.ctx
                };
            }
        ]
    });
    return ie(t._def);
}
var se = `
If you want to call this function on the server, you do the following:
This is a client-only function.

const caller = appRouter.createCaller({
  /* ... your context */
});

const result = await caller.call('myProcedure', input);
`.trim();
function ie(r) {
    let e = async function(n) {
        if (!n || !("rawInput" in n)) throw new Error(se);
        let o = async (i = {
            index: 0,
            ctx: n.ctx
        })=>{
            try {
                let f = r.middlewares[i.index];
                return await f({
                    ctx: i.ctx,
                    type: n.type,
                    path: n.path,
                    rawInput: i.rawInput ?? n.rawInput,
                    meta: r.meta,
                    input: i.input,
                    next (c) {
                        let u = c;
                        return o({
                            index: i.index + 1,
                            ctx: u && "ctx" in u ? {
                                ...i.ctx,
                                ...u.ctx
                            } : i.ctx,
                            input: u && "input" in u ? u.input : i.input,
                            rawInput: u && "rawInput" in u ? u.rawInput : i.rawInput
                        });
                    }
                });
            } catch (f1) {
                return {
                    ok: !1,
                    error: O(f1),
                    marker: W
                };
            }
        }, s = await o();
        if (!s) throw new d({
            code: "INTERNAL_SERVER_ERROR",
            message: "No result from middlewares - did you forget to `return next()`?"
        });
        if (!s.ok) throw s.error;
        return s.data;
    };
    return e._def = r, e.meta = r.meta, e;
}
function I(r, e) {
    let t = r._def(), n = Q(t.inputParser), o = Q(t.outputParser), s = K(n);
    return U({
        inputs: [
            t.inputParser
        ],
        middlewares: [
            ...t.middlewares,
            s,
            z(o)
        ],
        meta: t.meta,
        output: t.outputParser,
        mutation: e === "mutation",
        query: e === "query",
        subscription: e === "subscription"
    })[e]((a)=>t.resolver(a));
}
function ae(r) {
    let e = r._def.errorFormatter, t = r._def.transformer, n = {}, o = {}, s = {};
    for (let [a, c] of Object.entries(r._def.queries))n[a] = I(c, "query");
    for (let [a1, c1] of Object.entries(r._def.mutations))o[a1] = I(c1, "mutation");
    for (let [a2, c2] of Object.entries(r._def.subscriptions))s[a2] = I(c2, "subscription");
    let i = k(n, o, s);
    return g({
        transformer: t,
        errorFormatter: e,
        isDev: !1
    })(i);
}
function ue(r) {
    return "input" in r ? r : {
        input: r,
        output: r
    };
}
var ce = {
    query: "queries",
    mutation: "mutations",
    subscription: "subscriptions"
};
function m(...r) {
    return Object.assign(Object.create(null), ...r);
}
var F = class r {
    static prefixProcedures(e, t) {
        let n = m();
        for (let [o, s] of Object.entries(e))n[t + o] = s;
        return n;
    }
    query(e, t) {
        let n = new r({
            queries: m({
                [e]: N(t)
            })
        });
        return this.merge(n);
    }
    mutation(e, t) {
        let n = new r({
            mutations: m({
                [e]: N(t)
            })
        });
        return this.merge(n);
    }
    subscription(e, t) {
        let n = new r({
            subscriptions: m({
                [e]: N(t)
            })
        });
        return this.merge(n);
    }
    merge(e, t) {
        let n = "", o;
        if (typeof e == "string" && t instanceof r) n = e, o = t;
        else if (e instanceof r) o = e;
        else throw new Error("Invalid args");
        let s = Object.keys(o._def.queries).filter((u)=>!!this._def.queries[n + u]), i = Object.keys(o._def.mutations).filter((u)=>!!this._def.mutations[n + u]), f = Object.keys(o._def.subscriptions).filter((u)=>!!this._def.subscriptions[n + u]), a = [
            ...s,
            ...i,
            ...f
        ];
        if (a.length) throw new Error(`Duplicate endpoint(s): ${a.join(", ")}`);
        let c = (u)=>{
            let p = m();
            for (let [l, y] of Object.entries(u)){
                let R = y.inheritMiddlewares(this._def.middlewares);
                p[l] = R;
            }
            return r.prefixProcedures(p, n);
        };
        return new r({
            ...this._def,
            queries: m(this._def.queries, c(o._def.queries)),
            mutations: m(this._def.mutations, c(o._def.mutations)),
            subscriptions: m(this._def.subscriptions, c(o._def.subscriptions))
        });
    }
    async call(e) {
        let { type: t , path: n  } = e, o = ce[t], i = this._def[o][n];
        if (!i) throw new d({
            code: "NOT_FOUND",
            message: `No "${t}"-procedure on path "${n}"`
        });
        return i.call(e);
    }
    createCaller(e) {
        return {
            query: (t, ...n)=>this.call({
                    type: "query",
                    ctx: e,
                    path: t,
                    rawInput: n[0]
                }),
            mutation: (t, ...n)=>this.call({
                    type: "mutation",
                    ctx: e,
                    path: t,
                    rawInput: n[0]
                }),
            subscription: (t, ...n)=>this.call({
                    type: "subscription",
                    ctx: e,
                    path: t,
                    rawInput: n[0]
                })
        };
    }
    middleware(e) {
        return new r({
            ...this._def,
            middlewares: [
                ...this._def.middlewares,
                e
            ]
        });
    }
    formatError(e) {
        if (this._def.errorFormatter !== _) throw new Error("You seem to have double `formatError()`-calls in your router tree");
        return new r({
            ...this._def,
            errorFormatter: e
        });
    }
    getErrorShape(e) {
        let { path: t , error: n  } = e, { code: o  } = e.error, s = {
            message: n.message,
            code: h[o],
            data: {
                code: o,
                httpStatus: T(n)
            }
        };
        return globalThis.process?.env?.NODE_ENV !== "production" && typeof e.error.stack == "string" && (s.data.stack = e.error.stack), typeof t == "string" && (s.data.path = t), this._def.errorFormatter({
            ...e,
            shape: s
        });
    }
    transformer(e) {
        let t = ue(e);
        if (this._def.transformer !== w) throw new Error("You seem to have double `transformer()`-calls in your router tree");
        return new r({
            ...this._def,
            transformer: t
        });
    }
    flat() {
        return this;
    }
    interop() {
        return ae(this);
    }
    constructor(e){
        this._def = {
            queries: e?.queries ?? m(),
            mutations: e?.mutations ?? m(),
            subscriptions: e?.subscriptions ?? m(),
            middlewares: e?.middlewares ?? [],
            errorFormatter: e?.errorFormatter ?? _,
            transformer: e?.transformer ?? w
        };
    }
};
function Se() {
    return new F;
}
function de(...r) {
    let e = k({}, ...r.map((s)=>s._def.record)), t = r.reduce((s, i)=>{
        if (i._def._config.errorFormatter && i._def._config.errorFormatter !== _) {
            if (s !== _ && s !== i._def._config.errorFormatter) throw new Error("You seem to have several error formatters");
            return i._def._config.errorFormatter;
        }
        return s;
    }, _), n = r.reduce((s, i)=>{
        if (i._def._config.transformer && i._def._config.transformer !== w) {
            if (s !== w && s !== i._def._config.transformer) throw new Error("You seem to have several transformers");
            return i._def._config.transformer;
        }
        return s;
    }, w);
    return g({
        errorFormatter: t,
        transformer: n,
        isDev: r.some((s)=>s._def._config.isDev),
        allowOutsideOfServer: r.some((s)=>s._def._config.allowOutsideOfServer),
        isServer: r.some((s)=>s._def._config.isServer),
        $types: r[0]?._def._config.$types
    })(e);
}
var A = class r {
    context() {
        return new r;
    }
    meta() {
        return new r;
    }
    create(e) {
        return fe()(e);
    }
}, ve = new A;
function fe() {
    return function(e) {
        let t = e?.errorFormatter ?? _, o = {
            transformer: S(e?.transformer ?? w),
            isDev: e?.isDev ?? globalThis.process?.env?.NODE_ENV !== "production",
            allowOutsideOfServer: e?.allowOutsideOfServer ?? !1,
            errorFormatter: t,
            isServer: e?.isServer ?? v,
            $types: Y((s)=>{
                throw new Error(`Tried to access "$types.${s}" which is not available at runtime`);
            })
        };
        if (!(e?.isServer ?? v) && e?.allowOutsideOfServer !== !0) throw new Error("You're trying to use @trpc/server in a non-server environment. This is not supported by default.");
        return {
            _config: o,
            procedure: U({
                meta: e?.defaultMeta
            }),
            middleware: oe(),
            router: g(o),
            mergeRouters: de
        };
    };
}
export { d as TRPCError, B as callProcedure, K as createInputMiddleware, z as createOutputMiddleware, w as defaultTransformer, S as getDataTransformer, O as getTRPCErrorFromUnknown, ve as initTRPC, $ as procedureTypes, Se as router };
