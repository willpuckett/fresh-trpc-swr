function w(e) {
    let r = Object.create(null);
    for(let t in e){
        let n = e[t];
        r[n] = t;
    }
    return r;
}
var y = {
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
}, G = w(y);
var j = w(y), J = {
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
function I(e) {
    return J[e] ?? 500;
}
function U(e) {
    let r = Array.isArray(e) ? e : [
        e
    ], t = new Set(r.map((s)=>{
        if ("error" in s) {
            let o = s.error.data;
            if (typeof o.httpStatus == "number") return o.httpStatus;
            let i = j[s.error.code];
            return I(i);
        }
        return 200;
    }));
    return t.size !== 1 ? 207 : t.values().next().value;
}
function N(e) {
    let { code: r  } = e;
    return I(r);
}
function L(e) {
    return !!e && !Array.isArray(e) && typeof e == "object";
}
function D(e) {
    if (e instanceof _) return e;
    let r = new _({
        code: "INTERNAL_SERVER_ERROR",
        cause: e
    });
    return e instanceof Error && e.stack && (r.stack = e.stack), r;
}
var C = class extends Error {
};
function Y(e) {
    if (e instanceof Error) return e;
    let r = typeof e;
    if (!(r === "undefined" || r === "function" || e === null)) {
        if (r !== "object") return new Error(String(e));
        if (L(e)) {
            let t = new C;
            for(let n in e)t[n] = e[n];
            return t;
        }
    }
}
var _ = class extends Error {
    constructor(r){
        let t = Y(r.cause), n = (r.message ?? t?.message) ?? r.code;
        super(n, {
            cause: t
        }), this.code = r.code, this.name = this.constructor.name;
    }
};
function q(e) {
    let { type: r , path: t  } = e;
    if (!(t in e.procedures) || !e.procedures[t]?._def[r]) throw new _({
        code: "NOT_FOUND",
        message: `No "${r}"-procedure on path "${t}"`
    });
    let n = e.procedures[t];
    return n(e);
}
typeof window > "u" || "Deno" in window || globalThis.process?.env?.NODE_ENV === "test" || !!globalThis.process?.env?.JEST_WORKER_ID || !!globalThis.process?.env?.VITEST_WORKER_ID;
function A(e) {
    let { path: r , error: t , config: n  } = e, { code: s  } = e.error, o = {
        message: t.message,
        code: y[s],
        data: {
            code: s,
            httpStatus: N(t)
        }
    };
    return n.isDev && typeof e.error.stack == "string" && (o.data.stack = e.error.stack), typeof r == "string" && (o.data.path = r), n.errorFormatter({
        ...e,
        shape: o
    });
}
function H(e, r) {
    return "error" in r ? {
        ...r,
        error: e.transformer.output.serialize(r.error)
    } : "data" in r.result ? {
        ...r,
        result: {
            ...r.result,
            data: e.transformer.output.serialize(r.result.data)
        }
    } : r;
}
function P(e, r) {
    return Array.isArray(r) ? r.map((t)=>H(e, t)) : H(e, r);
}
function z(e) {
    let { req: r  } = e;
    try {
        if (r.method === "GET") {
            if (!r.query.has("input")) return;
            let t = r.query.get("input");
            return JSON.parse(t);
        }
        return !e.preprocessedBody && typeof r.body == "string" ? r.body.length === 0 ? void 0 : JSON.parse(r.body) : r.body;
    } catch (t1) {
        throw new _({
            code: "PARSE_ERROR",
            cause: t1
        });
    }
}
var k = (e, r)=>typeof e < "u" ? r.input.deserialize(e) : e, v = (e)=>{
    let r = z(e), t = e.router._def._config.transformer;
    if (!e.isBatchCall) return {
        0: k(r, t)
    };
    if (r == null || typeof r != "object" || Array.isArray(r)) throw new _({
        code: "BAD_REQUEST",
        message: '"input" needs to be an object when doing a batch call'
    });
    let n = {};
    for(let s in r){
        let o = s, i = r[o], a = k(i, t);
        n[o] = a;
    }
    return n;
};
var $ = {
    GET: "query",
    POST: "mutation"
}, K = {
    getInputs: v
};
function x(e) {
    let { ctx: r , paths: t , type: n , responseMeta: s , untransformedJSON: o , errors: i = []  } = e, a = o ? U(o) : 200, d = {
        "Content-Type": "application/json"
    }, p = !o, E = p ? [] : Array.isArray(o) ? o : [
        o
    ], T = s?.({
        ctx: r,
        paths: t,
        type: n,
        data: E,
        errors: i,
        eagerGeneration: p
    }) ?? {};
    for (let [R, h] of Object.entries(T.headers ?? {}))d[R] = h;
    return T.status && (a = T.status), {
        status: a,
        headers: d
    };
}
async function Q(e) {
    let { opts: r , ctx: t , type: n , input: s , path: o  } = e;
    try {
        return {
            result: {
                data: await q({
                    procedures: r.router._def.procedures,
                    path: o,
                    rawInput: s,
                    ctx: t,
                    type: n
                })
            }
        };
    } catch (i) {
        let a = D(i);
        return r.onError?.({
            error: a,
            path: o,
            input: s,
            ctx: t,
            type: n,
            req: r.req
        }), {
            error: A({
                config: r.router._def._config,
                error: a,
                type: n,
                path: o,
                input: s,
                ctx: t
            })
        };
    }
}
function F(e, r) {
    let { router: t , req: n , onError: s  } = r.opts, o = D(e);
    s?.({
        error: o,
        path: r.path,
        input: r.input,
        ctx: r.ctx,
        type: r.type,
        req: n
    });
    let i = {
        error: A({
            config: t._def._config,
            error: o,
            type: r.type,
            path: r.path,
            input: r.input,
            ctx: r.ctx
        })
    }, a = P(t._def._config, i), d = JSON.stringify(a);
    return {
        error: o,
        untransformedJSON: i,
        body: d
    };
}
async function B(e) {
    let { router: r , req: t , unstable_onHead: n , unstable_onChunk: s  } = e;
    if (t.method === "HEAD") {
        let R = {
            status: 204
        };
        return n?.(R, !1), s?.([
            -1,
            ""
        ]), R;
    }
    let o = e.contentTypeHandler ?? K, i = e.batching?.enabled ?? !0, a = $[t.method] ?? "unknown", d, p, E = !!t.query.get("batch"), T = E && n && s && t.headers["trpc-batch-mode"] === "stream";
    try {
        if (e.error) throw e.error;
        if (E && !i) throw new Error("Batching is not enabled on the server");
        if (a === "subscription") throw new _({
            message: "Subscriptions should use wsLink",
            code: "METHOD_NOT_SUPPORTED"
        });
        if (a === "unknown") throw new _({
            message: `Unexpected request method ${t.method}`,
            code: "METHOD_NOT_SUPPORTED"
        });
        let R1 = await o.getInputs({
            isBatchCall: E,
            req: t,
            router: r,
            preprocessedBody: e.preprocessedBody ?? !1
        });
        p = E ? e.path.split(",") : [
            e.path
        ], d = await e.createContext();
        let h = p.map((u, c)=>Q({
                opts: e,
                ctx: d,
                type: a,
                input: R1[c],
                path: u
            }));
        if (!T) {
            let u = await Promise.all(h), c = u.flatMap((b)=>"error" in b ? [
                    b.error
                ] : []), l = x({
                ctx: d,
                paths: p,
                type: a,
                responseMeta: e.responseMeta,
                untransformedJSON: u,
                errors: c
            });
            n?.(l, !1);
            let m = E ? u : u[0], g = P(r._def._config, m), S = JSON.stringify(g);
            return s?.([
                -1,
                S
            ]), {
                status: l.status,
                headers: l.headers,
                body: S
            };
        }
        let O = x({
            ctx: d,
            paths: p,
            type: a,
            responseMeta: e.responseMeta
        });
        n(O, !0);
        let f = new Map(h.map((u, c)=>[
                c,
                u.then((l)=>[
                        c,
                        l
                    ])
            ]));
        for (let u1 of p){
            let [c1, l1] = await Promise.race(f.values());
            f.delete(c1);
            try {
                let m1 = P(r._def._config, l1), g1 = JSON.stringify(m1);
                s([
                    c1,
                    g1
                ]);
            } catch (m2) {
                let g2 = p[c1], S1 = R1[c1], { body: b  } = F(m2, {
                    opts: e,
                    ctx: d,
                    type: a,
                    path: g2,
                    input: S1
                });
                s([
                    c1,
                    b
                ]);
            }
        }
        return;
    } catch (R2) {
        let { error: h1 , untransformedJSON: O1 , body: f1  } = F(R2, {
            opts: e,
            ctx: d,
            type: a
        }), u2 = x({
            ctx: d,
            paths: p,
            type: a,
            responseMeta: e.responseMeta,
            untransformedJSON: O1,
            errors: [
                h1
            ]
        });
        return n?.(u2, !1), s?.([
            -1,
            f1
        ]), {
            status: u2.status,
            headers: u2.headers,
            body: f1
        };
    }
}
function M() {
    let e = !0;
    function r(t, n) {
        let s = e ? "{" : ",";
        return e = !1, `${s}"${t}":${n}
`;
    }
    return r.end = ()=>"}", r;
}
async function we(e) {
    let r = new Headers, t = async ()=>e.createContext?.({
            req: e.req,
            resHeaders: r
        }), n = new URL(e.req.url), s = n.pathname.slice(e.endpoint.length + 1), o = {
        query: n.searchParams,
        method: e.req.method,
        headers: Object.fromEntries(e.req.headers),
        body: e.req.headers.get("content-type") === "application/json" ? await e.req.text() : ""
    }, i, a = new Promise((f)=>i = f), d = 200, p = !1, E, T, R, h = (f, u)=>{
        for (let [c, l] of Object.entries(f.headers ?? {})){
            if (!(typeof l > "u")) {
                if (typeof l == "string") {
                    r.set(c, l);
                    continue;
                }
                for (let m of l)r.append(c, m);
            }
        }
        if (d = f.status, u) {
            r.set("Transfer-Encoding", "chunked"), r.append("Vary", "trpc-batch-mode");
            let c1 = new ReadableStream({
                start (m) {
                    E = m;
                }
            }), l1 = new Response(c1, {
                status: d,
                headers: r
            });
            i(l1), T = new TextEncoder, R = M(), p = !0;
        }
    }, O = ([f, u])=>{
        if (f === -1) {
            let c = new Response(u || null, {
                status: d,
                headers: r
            });
            i(c);
        } else E.enqueue(T.encode(R(f, u)));
    };
    return B({
        req: o,
        createContext: t,
        path: s,
        router: e.router,
        batching: e.batching,
        responseMeta: e.responseMeta,
        onError (f) {
            e?.onError?.({
                ...f,
                req: e.req
            });
        },
        unstable_onHead: h,
        unstable_onChunk: O
    }).then(()=>{
        p && (E.enqueue(T.encode(R.end())), E.close());
    }).catch(()=>{
        p && E.close();
    }), a;
}
export { we as fetchRequestHandler };
