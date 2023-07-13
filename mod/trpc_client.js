function l(r) {
    return r;
}
function p(r) {
    return r.length === 0 ? l : r.length === 1 ? r[0] : function(t) {
        return r.reduce((e, n)=>n(e), t);
    };
}
function m(r) {
    let u = {
        subscribe (t) {
            let e = null, n = !1, s = !1, c = !1;
            function o() {
                if (e === null) {
                    c = !0;
                    return;
                }
                s || (s = !0, typeof e == "function" ? e() : e && e.unsubscribe());
            }
            return e = r({
                next (i) {
                    n || t.next?.(i);
                },
                error (i) {
                    n || (n = !0, t.error?.(i), o());
                },
                complete () {
                    n || (n = !0, t.complete?.(), o());
                }
            }), c && o(), {
                unsubscribe: o
            };
        },
        pipe (...t) {
            return p(t)(u);
        }
    };
    return u;
}
function x(r) {
    return (u)=>{
        let t = 0, e = null, n = [];
        function s() {
            e || (e = u.subscribe({
                next (o) {
                    for (let i of n)i.next?.(o);
                },
                error (o) {
                    for (let i of n)i.error?.(o);
                },
                complete () {
                    for (let o of n)o.complete?.();
                }
            }));
        }
        function c() {
            if (t === 0 && e) {
                let o = e;
                e = null, o.unsubscribe();
            }
        }
        return {
            subscribe (o) {
                return t++, n.push(o), s(), {
                    unsubscribe () {
                        t--, c();
                        let i = n.findIndex((f)=>f === o);
                        i > -1 && n.splice(i, 1);
                    }
                };
            }
        };
    };
}
function y(r) {
    return (u)=>({
            subscribe (t) {
                return u.subscribe({
                    next (e) {
                        r.next?.(e), t.next?.(e);
                    },
                    error (e) {
                        r.error?.(e), t.error?.(e);
                    },
                    complete () {
                        r.complete?.(), t.complete?.();
                    }
                });
            }
        });
}
var b = class r extends Error {
    constructor(u){
        super(u), this.name = "ObservableAbortError", Object.setPrototypeOf(this, r.prototype);
    }
};
function w(r) {
    let u;
    return {
        promise: new Promise((e, n)=>{
            let s = !1;
            function c() {
                s || (s = !0, n(new b("This operation was aborted.")), o.unsubscribe());
            }
            let o = r.subscribe({
                next (i) {
                    s = !0, e(i), c();
                },
                error (i) {
                    s = !0, n(i), c();
                },
                complete () {
                    s = !0, c();
                }
            });
            u = c;
        }),
        abort: u
    };
}
function E(t) {
    let r = Object.create(null);
    for(let e in t){
        let s = t[e];
        r[s] = e;
    }
    return r;
}
var a = {
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
}, N = E(a);
E(a);
var _ = ()=>{};
function O(t, r) {
    return new Proxy(_, {
        get (s, o) {
            if (!(typeof o != "string" || o === "then")) return O(t, [
                ...r,
                o
            ]);
        },
        apply (s, o, n) {
            let R = r[r.length - 1] === "apply";
            return t({
                args: R ? n.length >= 2 ? n[1] : [] : n,
                path: R ? r.slice(0, -1) : r
            });
        }
    });
}
var i = (t)=>O(t, []), f = (t)=>new Proxy(_, {
        get (r, e) {
            if (!(typeof e != "string" || e === "then")) return t(e);
        }
    });
function O1(e) {
    return m((t)=>{
        function n(o = 0, c = e.op) {
            let i = e.links[o];
            if (!i) throw new Error("No more links to execute - did you forget to add an ending link?");
            return i({
                op: c,
                next (a) {
                    return n(o + 1, a);
                }
            });
        }
        return n().subscribe(t);
    });
}
function G(e) {
    return Array.isArray(e) ? e : [
        e
    ];
}
function ee(e) {
    return (t)=>{
        let n = G(e.true).map((o)=>o(t)), r = G(e.false).map((o)=>o(t));
        return (o)=>m((c)=>{
                let i = e.condition(o.op) ? n : r;
                return O1({
                    op: o.op,
                    links: i
                }).subscribe(c);
            });
    };
}
function te(e) {
    return e instanceof g || e.name === "TRPCClientError";
}
var g = class e extends Error {
    static from(t, n = {}) {
        return t instanceof Error ? te(t) ? (n.meta && (t.meta = {
            ...t.meta,
            ...n.meta
        }), t) : new e(t.message, {
            ...n,
            cause: t,
            result: null
        }) : new e(t.error.message ?? "", {
            ...n,
            cause: void 0,
            result: t
        });
    }
    constructor(t, n){
        let r = n?.cause;
        super(t, {
            cause: r
        }), this.meta = n?.meta, this.cause = r, this.shape = n?.result?.error, this.data = n?.result?.error.data, this.name = "TRPCClientError", Object.setPrototypeOf(this, e.prototype);
    }
};
var _1 = (e)=>typeof e == "function";
function K(e) {
    if (e) return e;
    if (typeof Deno < "u" && _1(window.fetch)) return window.fetch;
    if (typeof globalThis < "u" && _1(globalThis.fetch)) return globalThis.fetch;
    throw new Error("No fetch implementation found");
}
function ne(e) {
    return e || (typeof Deno < "u" && window.AbortController ? window.AbortController : typeof globalThis < "u" && globalThis.AbortController ? globalThis.AbortController : null);
}
function q(e) {
    return {
        url: e.url,
        fetch: e.fetch,
        AbortController: ne(e.AbortController)
    };
}
function re(e) {
    let t = {};
    for(let n = 0; n < e.length; n++){
        let r = e[n];
        t[n] = r;
    }
    return t;
}
var oe = {
    query: "GET",
    mutation: "POST"
};
function Q(e) {
    return "input" in e ? e.runtime.transformer.serialize(e.input) : re(e.inputs.map((t)=>e.runtime.transformer.serialize(t)));
}
var L = (e)=>{
    let t = e.url + "/" + e.path, n = [];
    if ("inputs" in e && n.push("batch=1"), e.type === "query") {
        let r = Q(e);
        r !== void 0 && n.push(`input=${encodeURIComponent(JSON.stringify(r))}`);
    }
    return n.length && (t += "?" + n.join("&")), t;
}, $ = (e)=>{
    if (e.type === "query") return;
    let t = Q(e);
    return t !== void 0 ? JSON.stringify(t) : void 0;
}, A = (e)=>N1({
        ...e,
        contentTypeHeader: "application/json",
        getUrl: L,
        getBody: $
    });
async function H(e, t) {
    let n = e.getUrl(e), r = e.getBody(e), { type: o  } = e, c = await e.headers();
    if (o === "subscription") throw new Error("Subscriptions should use wsLink");
    let i = {
        ...e.contentTypeHeader ? {
            "content-type": e.contentTypeHeader
        } : {},
        ...e.batchModeHeader ? {
            "trpc-batch-mode": e.batchModeHeader
        } : {},
        ...c
    };
    return K(e.fetch)(n, {
        method: oe[o],
        signal: t?.signal,
        body: r,
        headers: i
    });
}
function N1(e) {
    let t = e.AbortController ? new e.AbortController : null, n = {};
    return {
        promise: new Promise((c, i)=>{
            H(e, t).then((s)=>(n.response = s, s.json())).then((s)=>{
                n.responseJSON = s, c({
                    json: s,
                    meta: n
                });
            }).catch((s)=>{
                i(g.from(s, {
                    meta: n
                }));
            });
        }),
        cancel: ()=>{
            t?.abort();
        }
    };
}
function X(e) {
    return !!e && !Array.isArray(e) && typeof e == "object";
}
function ie(e, t) {
    if ("error" in e) {
        let r = t.transformer.deserialize(e.error);
        return {
            ok: !1,
            error: {
                ...e,
                error: r
            }
        };
    }
    return {
        ok: !0,
        result: {
            ...e.result,
            ...(!e.result.type || e.result.type === "data") && {
                type: "data",
                data: t.transformer.deserialize(e.result.data)
            }
        }
    };
}
var E1 = class extends Error {
    constructor(){
        super("Unable to transform response from server");
    }
};
function j(e, t) {
    let n;
    try {
        n = ie(e, t);
    } catch  {
        throw new E1;
    }
    if (!n.ok && (!X(n.error.error) || typeof n.error.error.code != "number")) throw new E1;
    if (n.ok && !X(n.result)) throw new E1;
    return n;
}
var I = ()=>{
    throw new Error("Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new");
};
function M(e) {
    let t = null, n = null, r = ()=>{
        clearTimeout(n), n = null, t = null;
    };
    function o(s) {
        let a = [
            []
        ], l = 0;
        for(;;){
            let d = s[l];
            if (!d) break;
            let u = a[a.length - 1];
            if (d.aborted) {
                d.reject?.(new Error("Aborted")), l++;
                continue;
            }
            if (e.validate(u.concat(d).map((m)=>m.key))) {
                u.push(d), l++;
                continue;
            }
            if (u.length === 0) {
                d.reject?.(new Error("Input is too big for a single dispatch")), l++;
                continue;
            }
            a.push([]);
        }
        return a;
    }
    function c() {
        let s = o(t);
        r();
        for (let a of s){
            if (!a.length) continue;
            let l = {
                items: a,
                cancel: I
            };
            for (let m of a)m.batch = l;
            let d = (m, h)=>{
                let w = l.items[m];
                w.resolve?.(h), w.batch = null, w.reject = null, w.resolve = null;
            }, { promise: u , cancel: f  } = e.fetch(l.items.map((m)=>m.key), d);
            l.cancel = f, u.then((m)=>{
                for(let h = 0; h < m.length; h++){
                    let w = m[h];
                    d(h, w);
                }
                for (let h1 of l.items)h1.reject?.(new Error("Missing result")), h1.batch = null;
            }).catch((m)=>{
                for (let h of l.items)h.reject?.(m), h.batch = null;
            });
        }
    }
    function i(s) {
        let a = {
            aborted: !1,
            key: s,
            batch: null,
            resolve: I,
            reject: I
        }, l = new Promise((u, f)=>{
            a.reject = f, a.resolve = u, t || (t = []), t.push(a);
        });
        return n || (n = setTimeout(c)), {
            promise: l,
            cancel: ()=>{
                a.aborted = !0, a.batch?.items.every((u)=>u.aborted) && (a.batch.cancel(), a.batch = null);
            }
        };
    }
    return {
        load: i
    };
}
function z(e) {
    return function(n) {
        let r = q(n), o = n.maxURLLength ?? 1 / 0;
        return (c)=>{
            let i = (u)=>{
                let f = (h)=>{
                    if (o === 1 / 0) return !0;
                    let w = h.map((k)=>k.path).join(","), P = h.map((k)=>k.input);
                    return L({
                        ...r,
                        runtime: c,
                        type: u,
                        path: w,
                        inputs: P
                    }).length <= o;
                }, m = e({
                    ...r,
                    runtime: c,
                    type: u,
                    opts: n
                });
                return {
                    validate: f,
                    fetch: m
                };
            }, s = M(i("query")), a = M(i("mutation")), l = M(i("subscription")), d = {
                query: s,
                subscription: l,
                mutation: a
            };
            return ({ op: u  })=>m((f)=>{
                    let m = d[u.type], { promise: h , cancel: w  } = m.load(u), P;
                    return h.then((T)=>{
                        P = T;
                        let k = j(T.json, c);
                        if (!k.ok) {
                            f.error(g.from(k.error, {
                                meta: T.meta
                            }));
                            return;
                        }
                        f.next({
                            context: T.meta,
                            result: k.result
                        }), f.complete();
                    }).catch((T)=>{
                        f.error(g.from(T, {
                            meta: P?.meta
                        }));
                    }), ()=>{
                        w();
                    };
                });
        };
    };
}
var ce = (e)=>(t)=>{
        let n = t.map((i)=>i.path).join(","), r = t.map((i)=>i.input), { promise: o , cancel: c  } = A({
            ...e,
            path: n,
            inputs: r,
            headers () {
                return e.opts.headers ? typeof e.opts.headers == "function" ? e.opts.headers({
                    opList: t
                }) : e.opts.headers : {};
            }
        });
        return {
            promise: o.then((i)=>(Array.isArray(i.json) ? i.json : t.map(()=>i.json)).map((l)=>({
                        meta: i.meta,
                        json: l
                    }))),
            cancel: c
        };
    }, ae = z(ce);
function v(e) {
    return (t)=>{
        let n = q(t);
        return (r)=>({ op: o  })=>m((c)=>{
                    let { path: i , input: s , type: a  } = o, { promise: l , cancel: d  } = e.requester({
                        ...n,
                        runtime: r,
                        type: a,
                        path: i,
                        input: s,
                        headers () {
                            return t.headers ? typeof t.headers == "function" ? t.headers({
                                op: o
                            }) : t.headers : {};
                        }
                    }), u;
                    return l.then((f)=>{
                        u = f.meta;
                        let m = j(f.json, r);
                        if (!m.ok) {
                            c.error(g.from(m.error, {
                                meta: u
                            }));
                            return;
                        }
                        c.next({
                            context: f.meta,
                            result: m.result
                        }), c.complete();
                    }).catch((f)=>{
                        c.error(g.from(f, {
                            meta: u
                        }));
                    }), ()=>{
                        d();
                    };
                });
    };
}
var le = v({
    requester: A
});
function me(e) {
    return typeof FormData > "u" ? !1 : e instanceof FormData;
}
var B = {
    css: {
        query: [
            "72e3ff",
            "3fb0d8"
        ],
        mutation: [
            "c5a3fc",
            "904dfc"
        ],
        subscription: [
            "ff49e1",
            "d83fbe"
        ]
    },
    ansi: {
        regular: {
            query: [
                "\x1B[30;46m",
                "\x1B[97;46m"
            ],
            mutation: [
                "\x1B[30;45m",
                "\x1B[97;45m"
            ],
            subscription: [
                "\x1B[30;42m",
                "\x1B[97;42m"
            ]
        },
        bold: {
            query: [
                "\x1B[1;30;46m",
                "\x1B[1;97;46m"
            ],
            mutation: [
                "\x1B[1;30;45m",
                "\x1B[1;97;45m"
            ],
            subscription: [
                "\x1B[1;30;42m",
                "\x1B[1;97;42m"
            ]
        }
    }
};
function pe(e) {
    let { direction: t , type: n , path: r , id: o , input: c  } = e, i = [], s = [];
    if (e.colorMode === "ansi") {
        let [u, f] = B.ansi.regular[n], [m, h] = B.ansi.bold[n], w = "\x1B[0m";
        return i.push(t === "up" ? u : f, t === "up" ? ">>" : "<<", n, t === "up" ? m : h, `#${o}`, r, w), t === "up" ? s.push({
            input: e.input
        }) : s.push({
            input: e.input,
            result: "result" in e.result ? e.result.result : e.result,
            elapsedMs: e.elapsedMs
        }), {
            parts: i,
            args: s
        };
    }
    let [a, l] = B.css[n], d = `
    background-color: #${t === "up" ? a : l}; 
    color: ${t === "up" ? "black" : "white"};
    padding: 2px;
  `;
    return i.push("%c", t === "up" ? ">>" : "<<", n, `#${o}`, `%c${r}%c`, "%O"), s.push(d, `${d}; font-weight: bold;`, `${d}; font-weight: normal;`), t === "up" ? s.push({
        input: c,
        context: e.context
    }) : s.push({
        input: c,
        result: e.result,
        elapsedMs: e.elapsedMs,
        context: e.context
    }), {
        parts: i,
        args: s
    };
}
var he = ({ c: e = console , colorMode: t = "css"  })=>(n)=>{
        let r = n.input, o = me(r) ? Object.fromEntries(r) : r, { parts: c , args: i  } = pe({
            ...n,
            colorMode: t,
            input: o
        }), s = n.direction === "down" && n.result && (n.result instanceof Error || "error" in n.result.result) ? "error" : "log";
        e[s].apply(null, [
            c.join(" ")
        ].concat(i));
    };
function be(e = {}) {
    let { enabled: t = ()=>!0  } = e, n = e.colorMode ?? (typeof window > "u" ? "ansi" : "css"), { logger: r = he({
        c: e.console,
        colorMode: n
    })  } = e;
    return ()=>({ op: o , next: c  })=>m((i)=>{
                t({
                    ...o,
                    direction: "up"
                }) && r({
                    ...o,
                    direction: "up"
                });
                let s = Date.now();
                function a(l) {
                    let d = Date.now() - s;
                    t({
                        ...o,
                        direction: "down",
                        result: l
                    }) && r({
                        ...o,
                        direction: "down",
                        elapsedMs: d,
                        result: l
                    });
                }
                return c(o).pipe(y({
                    next (l) {
                        a(l);
                    },
                    error (l) {
                        a(l);
                    }
                })).subscribe(i);
            });
}
var ge = (e)=>e === 0 ? 0 : Math.min(1e3 * 2 ** e, 3e4);
function we(e) {
    let { url: t , WebSocket: n = WebSocket , retryDelayMs: r = ge , onOpen: o , onClose: c  } = e;
    if (!n) throw new Error("No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill");
    let i = [], s = Object.create(null), a = 0, l = null, d = null, u = W(), f = "connecting";
    function m() {
        f !== "open" || l || (l = setTimeout(()=>{
            l = null, i.length === 1 ? u.send(JSON.stringify(i.pop())) : u.send(JSON.stringify(i)), i = [];
        }));
    }
    function h() {
        if (d !== null || f === "closed") return;
        let b = r(a++);
        P(b);
    }
    function w() {
        f = "connecting";
        let b = u;
        u = W(), T(b);
    }
    function P(b) {
        d || (f = "connecting", d = setTimeout(w, b));
    }
    function T(b) {
        Object.values(s).some((R)=>R.ws === b) || b.close();
    }
    function k() {
        Object.values(s).forEach((b)=>{
            b.type === "subscription" && b.callbacks.complete();
        });
    }
    function J(b) {
        i.some((y)=>y.id === b.op.id) || U(b.op, b.callbacks);
    }
    function W() {
        let b = typeof t == "function" ? t() : t, y = new n(b);
        clearTimeout(d), d = null, y.addEventListener("open", ()=>{
            y === u && (a = 0, f = "open", o?.(), m());
        }), y.addEventListener("error", ()=>{
            y === u && h();
        });
        let R = (x)=>{
            if (x.method === "reconnect" && y === u) {
                f === "open" && c?.(), w();
                for (let p of Object.values(s))p.type === "subscription" && J(p);
            }
        }, D = (x)=>{
            let p = x.id !== null && s[x.id];
            if (p) {
                if (p.callbacks.next?.(x), p.ws !== u && y === u) {
                    let C = p.ws;
                    p.ws = u, T(C);
                }
                "result" in x && x.result.type === "stopped" && y === u && p.callbacks.complete();
            }
        };
        return y.addEventListener("message", ({ data: x  })=>{
            let p = JSON.parse(x);
            "method" in p ? R(p) : D(p), (y !== u || f === "closed") && T(y);
        }), y.addEventListener("close", ({ code: x  })=>{
            f === "open" && c?.({
                code: x
            }), u === y && h();
            for (let [p, C] of Object.entries(s))if (C.ws === y) {
                if (f === "closed") {
                    delete s[p], C.callbacks.complete?.();
                    continue;
                }
                C.type === "subscription" ? J(C) : (delete s[p], C.callbacks.error?.(g.from(new F("WebSocket closed prematurely"))));
            }
        }), y;
    }
    function U(b, y) {
        let { type: R , input: D , path: x , id: p  } = b, C = {
            id: p,
            method: R,
            params: {
                input: D,
                path: x
            }
        };
        return s[p] = {
            ws: u,
            type: R,
            callbacks: y,
            op: b
        }, i.push(C), m(), ()=>{
            let Y = s[p]?.callbacks;
            delete s[p], i = i.filter((Z)=>Z.id !== p), Y?.complete?.(), u.readyState === n.OPEN && b.type === "subscription" && (i.push({
                id: p,
                method: "subscription.stop"
            }), m());
        };
    }
    return {
        close: ()=>{
            f = "closed", c?.(), k(), T(u), clearTimeout(d), d = null;
        },
        request: U,
        getConnection () {
            return u;
        }
    };
}
var F = class e extends Error {
    constructor(t){
        super(t), this.name = "TRPCWebSocketClosedError", Object.setPrototypeOf(this, e.prototype);
    }
};
function xe(e) {
    return (t)=>{
        let { client: n  } = e;
        return ({ op: r  })=>m((o)=>{
                let { type: c , path: i , id: s , context: a  } = r, l = t.transformer.serialize(r.input), d = n.request({
                    type: c,
                    path: i,
                    input: l,
                    id: s,
                    context: a
                }, {
                    error (u) {
                        o.error(u), d();
                    },
                    complete () {
                        o.complete();
                    },
                    next (u) {
                        let f = j(u, t);
                        if (!f.ok) {
                            o.error(g.from(f.error));
                            return;
                        }
                        o.next({
                            result: f.result
                        }), r.type !== "subscription" && (d(), o.complete());
                    }
                });
                return ()=>{
                    d();
                };
            });
    };
}
var S = class {
    $request({ type: t , input: n , path: r , context: o = {}  }) {
        return O1({
            links: this.links,
            op: {
                id: ++this.requestId,
                type: t,
                path: r,
                input: n,
                context: o
            }
        }).pipe(x());
    }
    requestAsPromise(t) {
        let n = this.$request(t), { promise: r , abort: o  } = w(n);
        return new Promise((i, s)=>{
            t.signal?.addEventListener("abort", o), r.then((a)=>{
                i(a.result.data);
            }).catch((a)=>{
                s(g.from(a));
            });
        });
    }
    query(t, n, r) {
        return this.requestAsPromise({
            type: "query",
            path: t,
            input: n,
            context: r?.context,
            signal: r?.signal
        });
    }
    mutation(t, n, r) {
        return this.requestAsPromise({
            type: "mutation",
            path: t,
            input: n,
            context: r?.context,
            signal: r?.signal
        });
    }
    subscription(t, n, r) {
        return this.$request({
            type: "subscription",
            path: t,
            input: n,
            context: r?.context
        }).subscribe({
            next (c) {
                c.result.type === "started" ? r.onStarted?.() : c.result.type === "stopped" ? r.onStopped?.() : r.onData?.(c.result.data);
            },
            error (c) {
                r.onError?.(c);
            },
            complete () {
                r.onComplete?.();
            }
        });
    }
    constructor(t){
        this.requestId = 0;
        let n = (()=>{
            let r = t.transformer;
            return r ? "input" in r ? t.transformer : {
                input: r,
                output: r
            } : {
                input: {
                    serialize: (o)=>o,
                    deserialize: (o)=>o
                },
                output: {
                    serialize: (o)=>o,
                    deserialize: (o)=>o
                }
            };
        })();
        this.runtime = {
            transformer: {
                serialize: (r)=>n.input.serialize(r),
                deserialize: (r)=>n.output.deserialize(r)
            },
            combinedTransformer: n
        }, this.links = t.links.map((r)=>r(this.runtime));
    }
};
function mt(e) {
    return new S(e);
}
function pt(e) {
    return new S(e);
}
var Re = {
    query: "query",
    mutate: "mutation",
    subscribe: "subscription"
}, je = (e)=>Re[e];
function Le(e) {
    return f((t)=>e.hasOwnProperty(t) ? e[t] : t === "__untypedClient" ? e : i(({ path: n , args: r  })=>{
            let o = [
                t,
                ...n
            ], c = je(o.pop()), i = o.join(".");
            return e[c](i, ...r);
        }));
}
function ht(e) {
    let t = new S(e);
    return Le(t);
}
function bt(e) {
    return e.__untypedClient;
}
function Ee(e) {
    if (e) return e;
    if (typeof Deno < "u" && window.TextDecoder) return new window.TextDecoder;
    if (typeof globalThis < "u" && globalThis.TextDecoder) return new globalThis.TextDecoder;
    throw new Error("No TextDecoder implementation found");
}
async function Se(e) {
    let t = e.parse ?? JSON.parse, n = (r)=>{
        if (e.signal?.aborted || !r || r === "}") return;
        let o = r.indexOf(":"), c = r.substring(2, o - 1), i = r.substring(o + 1);
        e.onSingle(Number(c), t(i));
    };
    await qe(e.readableStream, n, e.textDecoder);
}
async function qe(e, t, n) {
    let r = "", o = (c)=>{
        let s = n.decode(c).split(`
`);
        if (s.length === 1) r += s[0];
        else if (s.length > 1) {
            t(r + s[0]);
            for(let a = 1; a < s.length - 1; a++)t(s[a]);
            r = s[s.length - 1];
        }
    };
    "getReader" in e ? await ve(e, o) : await Ae(e, o), t(r);
}
function Ae(e, t) {
    return new Promise((n)=>{
        e.on("data", t), e.on("end", n);
    });
}
async function ve(e, t) {
    let n = e.getReader(), r = await n.read();
    for(; !r.done;)t(r.value), r = await n.read();
}
var De = (e, t)=>{
    let n = e.AbortController ? new e.AbortController : null, r = H({
        ...e,
        contentTypeHeader: "application/json",
        batchModeHeader: "stream",
        getUrl: L,
        getBody: $
    }, n), o = ()=>n?.abort(), c = r.then(async (i)=>{
        if (!i.body) throw new Error("Received response without body");
        let s = {
            response: i
        };
        return Se({
            readableStream: i.body,
            onSingle: t,
            parse: (a)=>({
                    json: JSON.parse(a),
                    meta: s
                }),
            signal: n?.signal,
            textDecoder: e.textDecoder
        });
    });
    return {
        cancel: o,
        promise: c
    };
}, Oe = (e)=>{
    let t = Ee(e.opts.textDecoder);
    return (n, r)=>{
        let o = n.map((a)=>a.path).join(","), c = n.map((a)=>a.input), { cancel: i , promise: s  } = De({
            ...e,
            textDecoder: t,
            path: o,
            inputs: c,
            headers () {
                return e.opts.headers ? typeof e.opts.headers == "function" ? e.opts.headers({
                    opList: n
                }) : e.opts.headers : {};
            }
        }, (a, l)=>{
            r(a, l);
        });
        return {
            promise: s.then(()=>[]),
            cancel: i
        };
    };
}, yt = z(Oe), $e = (e)=>{
    if ("input" in e) {
        if (!(e.input instanceof FormData)) throw new Error("Input is not FormData");
        return e.input;
    }
}, He = (e)=>{
    if (e.type !== "mutation") throw new Error("We only handle mutations with formdata");
    return N1({
        ...e,
        getUrl () {
            return `${e.url}/${e.path}`;
        },
        getBody: $e
    });
}, gt = v({
    requester: He
});
export { g as TRPCClientError, je as clientCallTypeToProcedureType, pt as createTRPCClient, Le as createTRPCClientProxy, ht as createTRPCProxyClient, mt as createTRPCUntypedClient, we as createWSClient, gt as experimental_formDataLink, K as getFetch, bt as getUntypedClient, ae as httpBatchLink, le as httpLink, v as httpLinkFactory, be as loggerLink, ee as splitLink, yt as unstable_httpBatchStreamLink, xe as wsLink };
