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
var A = E(a), c = {
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
function S(t) {
    return c[t] ?? 500;
}
function T(t) {
    let { code: r  } = t;
    return S(r);
}
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
function p(t) {
    let { path: r , error: e , config: s  } = t, { code: o  } = t.error, n = {
        message: e.message,
        code: a[o],
        data: {
            code: o,
            httpStatus: T(e)
        }
    };
    return s.isDev && typeof t.error.stack == "string" && (n.data.stack = t.error.stack), typeof r == "string" && (n.data.path = r), s.errorFormatter({
        ...t,
        shape: n
    });
}
function u(t, r) {
    return "error" in r ? {
        ...r,
        error: t.transformer.output.serialize(r.error)
    } : "data" in r.result ? {
        ...r,
        result: {
            ...r.result,
            data: t.transformer.output.serialize(r.result.data)
        }
    } : r;
}
function C(t, r) {
    return Array.isArray(r) ? r.map((e)=>u(t, e)) : u(t, r);
}
export { f as createFlatProxy, i as createRecursiveProxy, p as getErrorShape, C as transformTRPCResponse };
