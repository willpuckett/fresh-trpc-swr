var g;
(function(s) {
    s.assertEqual = (n)=>n;
    function e(n) {}
    s.assertIs = e;
    function t(n) {
        throw new Error;
    }
    s.assertNever = t, s.arrayToEnum = (n)=>{
        let a = {};
        for (let i of n)a[i] = i;
        return a;
    }, s.getValidEnumValues = (n)=>{
        let a = s.objectKeys(n).filter((o)=>typeof n[n[o]] != "number"), i = {};
        for (let o of a)i[o] = n[o];
        return s.objectValues(i);
    }, s.objectValues = (n)=>s.objectKeys(n).map(function(a) {
            return n[a];
        }), s.objectKeys = typeof Object.keys == "function" ? (n)=>Object.keys(n) : (n)=>{
        let a = [];
        for(let i in n)Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
        return a;
    }, s.find = (n, a)=>{
        for (let i of n)if (a(i)) return i;
    }, s.isInteger = typeof Number.isInteger == "function" ? (n)=>Number.isInteger(n) : (n)=>typeof n == "number" && isFinite(n) && Math.floor(n) === n;
    function r(n, a = " | ") {
        return n.map((i)=>typeof i == "string" ? `'${i}'` : i).join(a);
    }
    s.joinValues = r, s.jsonStringifyReplacer = (n, a)=>typeof a == "bigint" ? a.toString() : a;
})(g || (g = {}));
var me;
(function(s) {
    s.mergeShapes = (e, t)=>({
            ...e,
            ...t
        });
})(me || (me = {}));
var d = g.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
]), I = (s)=>{
    switch(typeof s){
        case "undefined":
            return d.undefined;
        case "string":
            return d.string;
        case "number":
            return isNaN(s) ? d.nan : d.number;
        case "boolean":
            return d.boolean;
        case "function":
            return d.function;
        case "bigint":
            return d.bigint;
        case "symbol":
            return d.symbol;
        case "object":
            return Array.isArray(s) ? d.array : s === null ? d.null : s.then && typeof s.then == "function" && s.catch && typeof s.catch == "function" ? d.promise : typeof Map < "u" && s instanceof Map ? d.map : typeof Set < "u" && s instanceof Set ? d.set : typeof Date < "u" && s instanceof Date ? d.date : d.object;
        default:
            return d.unknown;
    }
}, c = g.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
]), Ne = (s)=>JSON.stringify(s, null, 2).replace(/"([^"]+)":/g, "$1:"), w = class extends Error {
    constructor(e){
        super(), this.issues = [], this.addIssue = (r)=>{
            this.issues = [
                ...this.issues,
                r
            ];
        }, this.addIssues = (r = [])=>{
            this.issues = [
                ...this.issues,
                ...r
            ];
        };
        let t = new.target.prototype;
        Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
    }
    get errors() {
        return this.issues;
    }
    format(e) {
        let t = e || function(a) {
            return a.message;
        }, r = {
            _errors: []
        }, n = (a)=>{
            for (let i of a.issues)if (i.code === "invalid_union") i.unionErrors.map(n);
            else if (i.code === "invalid_return_type") n(i.returnTypeError);
            else if (i.code === "invalid_arguments") n(i.argumentsError);
            else if (i.path.length === 0) r._errors.push(t(i));
            else {
                let o = r, f = 0;
                for(; f < i.path.length;){
                    let l = i.path[f];
                    f === i.path.length - 1 ? (o[l] = o[l] || {
                        _errors: []
                    }, o[l]._errors.push(t(i))) : o[l] = o[l] || {
                        _errors: []
                    }, o = o[l], f++;
                }
            }
        };
        return n(this), r;
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, g.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(e = (t)=>t.message) {
        let t = {}, r = [];
        for (let n of this.issues)n.path.length > 0 ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n))) : r.push(e(n));
        return {
            formErrors: r,
            fieldErrors: t
        };
    }
    get formErrors() {
        return this.flatten();
    }
};
w.create = (s)=>new w(s);
var re = (s, e)=>{
    let t;
    switch(s.code){
        case c.invalid_type:
            s.received === d.undefined ? t = "Required" : t = `Expected ${s.expected}, received ${s.received}`;
            break;
        case c.invalid_literal:
            t = `Invalid literal value, expected ${JSON.stringify(s.expected, g.jsonStringifyReplacer)}`;
            break;
        case c.unrecognized_keys:
            t = `Unrecognized key(s) in object: ${g.joinValues(s.keys, ", ")}`;
            break;
        case c.invalid_union:
            t = "Invalid input";
            break;
        case c.invalid_union_discriminator:
            t = `Invalid discriminator value. Expected ${g.joinValues(s.options)}`;
            break;
        case c.invalid_enum_value:
            t = `Invalid enum value. Expected ${g.joinValues(s.options)}, received '${s.received}'`;
            break;
        case c.invalid_arguments:
            t = "Invalid function arguments";
            break;
        case c.invalid_return_type:
            t = "Invalid function return type";
            break;
        case c.invalid_date:
            t = "Invalid date";
            break;
        case c.invalid_string:
            typeof s.validation == "object" ? "includes" in s.validation ? (t = `Invalid input: must include "${s.validation.includes}"`, typeof s.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${s.validation.position}`)) : "startsWith" in s.validation ? t = `Invalid input: must start with "${s.validation.startsWith}"` : "endsWith" in s.validation ? t = `Invalid input: must end with "${s.validation.endsWith}"` : g.assertNever(s.validation) : s.validation !== "regex" ? t = `Invalid ${s.validation}` : t = "Invalid";
            break;
        case c.too_small:
            s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "more than"} ${s.minimum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "over"} ${s.minimum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(s.minimum))}` : t = "Invalid input";
            break;
        case c.too_big:
            s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "less than"} ${s.maximum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "under"} ${s.maximum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "bigint" ? t = `BigInt must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly" : s.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(s.maximum))}` : t = "Invalid input";
            break;
        case c.custom:
            t = "Invalid input";
            break;
        case c.invalid_intersection_types:
            t = "Intersection results could not be merged";
            break;
        case c.not_multiple_of:
            t = `Number must be a multiple of ${s.multipleOf}`;
            break;
        case c.not_finite:
            t = "Number must be finite";
            break;
        default:
            t = e.defaultError, g.assertNever(s);
    }
    return {
        message: t
    };
}, ke = re;
function Ee(s) {
    ke = s;
}
function ie() {
    return ke;
}
var oe = (s)=>{
    let { data: e , path: t , errorMaps: r , issueData: n  } = s, a = [
        ...t,
        ...n.path || []
    ], i = {
        ...n,
        path: a
    }, o = "", f = r.filter((l)=>!!l).slice().reverse();
    for (let l of f)o = l(i, {
        data: e,
        defaultError: o
    }).message;
    return {
        ...n,
        path: a,
        message: n.message || o
    };
}, Ze = [];
function u(s, e) {
    let t = oe({
        issueData: e,
        data: s.data,
        path: s.path,
        errorMaps: [
            s.common.contextualErrorMap,
            s.schemaErrorMap,
            ie(),
            re
        ].filter((r)=>!!r)
    });
    s.common.issues.push(t);
}
var x = class s {
    constructor(){
        this.value = "valid";
    }
    dirty() {
        this.value === "valid" && (this.value = "dirty");
    }
    abort() {
        this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(e, t) {
        let r = [];
        for (let n of t){
            if (n.status === "aborted") return m;
            n.status === "dirty" && e.dirty(), r.push(n.value);
        }
        return {
            status: e.value,
            value: r
        };
    }
    static async mergeObjectAsync(e, t) {
        let r = [];
        for (let n of t)r.push({
            key: await n.key,
            value: await n.value
        });
        return s.mergeObjectSync(e, r);
    }
    static mergeObjectSync(e, t) {
        let r = {};
        for (let n of t){
            let { key: a , value: i  } = n;
            if (a.status === "aborted" || i.status === "aborted") return m;
            a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), (typeof i.value < "u" || n.alwaysSet) && (r[a.value] = i.value);
        }
        return {
            status: e.value,
            value: r
        };
    }
}, m = Object.freeze({
    status: "aborted"
}), be = (s)=>({
        status: "dirty",
        value: s
    }), k = (s)=>({
        status: "valid",
        value: s
    }), ye = (s)=>s.status === "aborted", ve = (s)=>s.status === "dirty", ce = (s)=>s.status === "valid", de = (s)=>typeof Promise < "u" && s instanceof Promise, h;
(function(s) {
    s.errToObj = (e)=>typeof e == "string" ? {
            message: e
        } : e || {}, s.toString = (e)=>typeof e == "string" ? e : e?.message;
})(h || (h = {}));
var O = class {
    constructor(e, t, r, n){
        this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = n;
    }
    get path() {
        return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
}, ge = (s, e)=>{
    if (ce(e)) return {
        success: !0,
        data: e.value
    };
    if (!s.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
        success: !1,
        get error () {
            if (this._error) return this._error;
            let t = new w(s.common.issues);
            return this._error = t, this._error;
        }
    };
};
function y(s) {
    if (!s) return {};
    let { errorMap: e , invalid_type_error: t , required_error: r , description: n  } = s;
    if (e && (t || r)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return e ? {
        errorMap: e,
        description: n
    } : {
        errorMap: (i, o)=>i.code !== "invalid_type" ? {
                message: o.defaultError
            } : typeof o.data > "u" ? {
                message: r ?? o.defaultError
            } : {
                message: t ?? o.defaultError
            },
        description: n
    };
}
var v = class {
    constructor(e){
        this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
        return this._def.description;
    }
    _getType(e) {
        return I(e.data);
    }
    _getOrReturnCtx(e, t) {
        return t || {
            common: e.parent.common,
            data: e.data,
            parsedType: I(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent
        };
    }
    _processInputParams(e) {
        return {
            status: new x,
            ctx: {
                common: e.parent.common,
                data: e.data,
                parsedType: I(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent
            }
        };
    }
    _parseSync(e) {
        let t = this._parse(e);
        if (de(t)) throw new Error("Synchronous parse encountered promise.");
        return t;
    }
    _parseAsync(e) {
        let t = this._parse(e);
        return Promise.resolve(t);
    }
    parse(e, t) {
        let r = this.safeParse(e, t);
        if (r.success) return r.data;
        throw r.error;
    }
    safeParse(e, t) {
        var r;
        let n = {
            common: {
                issues: [],
                async: (r = t?.async) !== null && r !== void 0 ? r : !1,
                contextualErrorMap: t?.errorMap
            },
            path: t?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: I(e)
        }, a = this._parseSync({
            data: e,
            path: n.path,
            parent: n
        });
        return ge(n, a);
    }
    async parseAsync(e, t) {
        let r = await this.safeParseAsync(e, t);
        if (r.success) return r.data;
        throw r.error;
    }
    async safeParseAsync(e, t) {
        let r = {
            common: {
                issues: [],
                contextualErrorMap: t?.errorMap,
                async: !0
            },
            path: t?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: I(e)
        }, n = this._parse({
            data: e,
            path: r.path,
            parent: r
        }), a = await (de(n) ? n : Promise.resolve(n));
        return ge(r, a);
    }
    refine(e, t) {
        let r = (n)=>typeof t == "string" || typeof t > "u" ? {
                message: t
            } : typeof t == "function" ? t(n) : t;
        return this._refinement((n, a)=>{
            let i = e(n), o = ()=>a.addIssue({
                    code: c.custom,
                    ...r(n)
                });
            return typeof Promise < "u" && i instanceof Promise ? i.then((f)=>f ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
        });
    }
    refinement(e, t) {
        return this._refinement((r, n)=>e(r) ? !0 : (n.addIssue(typeof t == "function" ? t(r, n) : t), !1));
    }
    _refinement(e) {
        return new T({
            schema: this,
            typeName: p.ZodEffects,
            effect: {
                type: "refinement",
                refinement: e
            }
        });
    }
    superRefine(e) {
        return this._refinement(e);
    }
    optional() {
        return S.create(this, this._def);
    }
    nullable() {
        return j.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return Z.create(this, this._def);
    }
    promise() {
        return M.create(this, this._def);
    }
    or(e) {
        return U.create([
            this,
            e
        ], this._def);
    }
    and(e) {
        return B.create(this, e, this._def);
    }
    transform(e) {
        return new T({
            ...y(this._def),
            schema: this,
            typeName: p.ZodEffects,
            effect: {
                type: "transform",
                transform: e
            }
        });
    }
    default(e) {
        let t = typeof e == "function" ? e : ()=>e;
        return new H({
            ...y(this._def),
            innerType: this,
            defaultValue: t,
            typeName: p.ZodDefault
        });
    }
    brand() {
        return new he({
            typeName: p.ZodBranded,
            type: this,
            ...y(this._def)
        });
    }
    catch(e) {
        let t = typeof e == "function" ? e : ()=>e;
        return new te({
            ...y(this._def),
            innerType: this,
            catchValue: t,
            typeName: p.ZodCatch
        });
    }
    describe(e) {
        let t = this.constructor;
        return new t({
            ...this._def,
            description: e
        });
    }
    pipe(e) {
        return ne.create(this, e);
    }
    isOptional() {
        return this.safeParse(void 0).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}, je = /^c[^\s-]{8,}$/i, Ie = /^[a-z][a-z0-9]*$/, Re = /[0-9A-HJKMNP-TV-Z]{26}/, Ae = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, Me = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, Ve = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, Pe = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, $e = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Le = (s)=>s.precision ? s.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}Z$`) : s.precision === 0 ? s.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : s.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function De(s, e) {
    return !!((e === "v4" || !e) && Pe.test(s) || (e === "v6" || !e) && $e.test(s));
}
var R = class s extends v {
    constructor(){
        super(...arguments), this._regex = (e, t, r)=>this.refinement((n)=>e.test(n), {
                validation: t,
                code: c.invalid_string,
                ...h.errToObj(r)
            }), this.nonempty = (e)=>this.min(1, h.errToObj(e)), this.trim = ()=>new s({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "trim"
                    }
                ]
            }), this.toLowerCase = ()=>new s({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "toLowerCase"
                    }
                ]
            }), this.toUpperCase = ()=>new s({
                ...this._def,
                checks: [
                    ...this._def.checks,
                    {
                        kind: "toUpperCase"
                    }
                ]
            });
    }
    _parse(e) {
        if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== d.string) {
            let a = this._getOrReturnCtx(e);
            return u(a, {
                code: c.invalid_type,
                expected: d.string,
                received: a.parsedType
            }), m;
        }
        let r = new x, n;
        for (let a1 of this._def.checks)if (a1.kind === "min") e.data.length < a1.value && (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.too_small,
            minimum: a1.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "max") e.data.length > a1.value && (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.too_big,
            maximum: a1.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "length") {
            let i = e.data.length > a1.value, o = e.data.length < a1.value;
            (i || o) && (n = this._getOrReturnCtx(e, n), i ? u(n, {
                code: c.too_big,
                maximum: a1.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a1.message
            }) : o && u(n, {
                code: c.too_small,
                minimum: a1.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a1.message
            }), r.dirty());
        } else if (a1.kind === "email") Me.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "email",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "emoji") Ve.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "emoji",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "uuid") Ae.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "uuid",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "cuid") je.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "cuid",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "cuid2") Ie.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "cuid2",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "ulid") Re.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "ulid",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty());
        else if (a1.kind === "url") try {
            new URL(e.data);
        } catch  {
            n = this._getOrReturnCtx(e, n), u(n, {
                validation: "url",
                code: c.invalid_string,
                message: a1.message
            }), r.dirty();
        }
        else a1.kind === "regex" ? (a1.regex.lastIndex = 0, a1.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "regex",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty())) : a1.kind === "trim" ? e.data = e.data.trim() : a1.kind === "includes" ? e.data.includes(a1.value, a1.position) || (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.invalid_string,
            validation: {
                includes: a1.value,
                position: a1.position
            },
            message: a1.message
        }), r.dirty()) : a1.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a1.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a1.kind === "startsWith" ? e.data.startsWith(a1.value) || (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.invalid_string,
            validation: {
                startsWith: a1.value
            },
            message: a1.message
        }), r.dirty()) : a1.kind === "endsWith" ? e.data.endsWith(a1.value) || (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.invalid_string,
            validation: {
                endsWith: a1.value
            },
            message: a1.message
        }), r.dirty()) : a1.kind === "datetime" ? Le(a1).test(e.data) || (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.invalid_string,
            validation: "datetime",
            message: a1.message
        }), r.dirty()) : a1.kind === "ip" ? De(e.data, a1.version) || (n = this._getOrReturnCtx(e, n), u(n, {
            validation: "ip",
            code: c.invalid_string,
            message: a1.message
        }), r.dirty()) : g.assertNever(a1);
        return {
            status: r.value,
            value: e.data
        };
    }
    _addCheck(e) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                e
            ]
        });
    }
    email(e) {
        return this._addCheck({
            kind: "email",
            ...h.errToObj(e)
        });
    }
    url(e) {
        return this._addCheck({
            kind: "url",
            ...h.errToObj(e)
        });
    }
    emoji(e) {
        return this._addCheck({
            kind: "emoji",
            ...h.errToObj(e)
        });
    }
    uuid(e) {
        return this._addCheck({
            kind: "uuid",
            ...h.errToObj(e)
        });
    }
    cuid(e) {
        return this._addCheck({
            kind: "cuid",
            ...h.errToObj(e)
        });
    }
    cuid2(e) {
        return this._addCheck({
            kind: "cuid2",
            ...h.errToObj(e)
        });
    }
    ulid(e) {
        return this._addCheck({
            kind: "ulid",
            ...h.errToObj(e)
        });
    }
    ip(e) {
        return this._addCheck({
            kind: "ip",
            ...h.errToObj(e)
        });
    }
    datetime(e) {
        var t;
        return typeof e == "string" ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            message: e
        }) : this._addCheck({
            kind: "datetime",
            precision: typeof e?.precision > "u" ? null : e?.precision,
            offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
            ...h.errToObj(e?.message)
        });
    }
    regex(e, t) {
        return this._addCheck({
            kind: "regex",
            regex: e,
            ...h.errToObj(t)
        });
    }
    includes(e, t) {
        return this._addCheck({
            kind: "includes",
            value: e,
            position: t?.position,
            ...h.errToObj(t?.message)
        });
    }
    startsWith(e, t) {
        return this._addCheck({
            kind: "startsWith",
            value: e,
            ...h.errToObj(t)
        });
    }
    endsWith(e, t) {
        return this._addCheck({
            kind: "endsWith",
            value: e,
            ...h.errToObj(t)
        });
    }
    min(e, t) {
        return this._addCheck({
            kind: "min",
            value: e,
            ...h.errToObj(t)
        });
    }
    max(e, t) {
        return this._addCheck({
            kind: "max",
            value: e,
            ...h.errToObj(t)
        });
    }
    length(e, t) {
        return this._addCheck({
            kind: "length",
            value: e,
            ...h.errToObj(t)
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((e)=>e.kind === "datetime");
    }
    get isEmail() {
        return !!this._def.checks.find((e)=>e.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((e)=>e.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((e)=>e.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((e)=>e.kind === "uuid");
    }
    get isCUID() {
        return !!this._def.checks.find((e)=>e.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((e)=>e.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((e)=>e.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((e)=>e.kind === "ip");
    }
    get minLength() {
        let e = null;
        for (let t of this._def.checks)t.kind === "min" && (e === null || t.value > e) && (e = t.value);
        return e;
    }
    get maxLength() {
        let e = null;
        for (let t of this._def.checks)t.kind === "max" && (e === null || t.value < e) && (e = t.value);
        return e;
    }
};
R.create = (s)=>{
    var e;
    return new R({
        checks: [],
        typeName: p.ZodString,
        coerce: (e = s?.coerce) !== null && e !== void 0 ? e : !1,
        ...y(s)
    });
};
function ze(s, e) {
    let t = (s.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, n = t > r ? t : r, a = parseInt(s.toFixed(n).replace(".", "")), i = parseInt(e.toFixed(n).replace(".", ""));
    return a % i / Math.pow(10, n);
}
var V = class s extends v {
    constructor(){
        super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
        if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== d.number) {
            let a = this._getOrReturnCtx(e);
            return u(a, {
                code: c.invalid_type,
                expected: d.number,
                received: a.parsedType
            }), m;
        }
        let r, n = new x;
        for (let a1 of this._def.checks)a1.kind === "int" ? g.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.invalid_type,
            expected: "integer",
            received: "float",
            message: a1.message
        }), n.dirty()) : a1.kind === "min" ? (a1.inclusive ? e.data < a1.value : e.data <= a1.value) && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.too_small,
            minimum: a1.value,
            type: "number",
            inclusive: a1.inclusive,
            exact: !1,
            message: a1.message
        }), n.dirty()) : a1.kind === "max" ? (a1.inclusive ? e.data > a1.value : e.data >= a1.value) && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.too_big,
            maximum: a1.value,
            type: "number",
            inclusive: a1.inclusive,
            exact: !1,
            message: a1.message
        }), n.dirty()) : a1.kind === "multipleOf" ? ze(e.data, a1.value) !== 0 && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.not_multiple_of,
            multipleOf: a1.value,
            message: a1.message
        }), n.dirty()) : a1.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.not_finite,
            message: a1.message
        }), n.dirty()) : g.assertNever(a1);
        return {
            status: n.value,
            value: e.data
        };
    }
    gte(e, t) {
        return this.setLimit("min", e, !0, h.toString(t));
    }
    gt(e, t) {
        return this.setLimit("min", e, !1, h.toString(t));
    }
    lte(e, t) {
        return this.setLimit("max", e, !0, h.toString(t));
    }
    lt(e, t) {
        return this.setLimit("max", e, !1, h.toString(t));
    }
    setLimit(e, t, r, n) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind: e,
                    value: t,
                    inclusive: r,
                    message: h.toString(n)
                }
            ]
        });
    }
    _addCheck(e) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                e
            ]
        });
    }
    int(e) {
        return this._addCheck({
            kind: "int",
            message: h.toString(e)
        });
    }
    positive(e) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: h.toString(e)
        });
    }
    negative(e) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: h.toString(e)
        });
    }
    nonpositive(e) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: h.toString(e)
        });
    }
    nonnegative(e) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: h.toString(e)
        });
    }
    multipleOf(e, t) {
        return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: h.toString(t)
        });
    }
    finite(e) {
        return this._addCheck({
            kind: "finite",
            message: h.toString(e)
        });
    }
    safe(e) {
        return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: h.toString(e)
        })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: h.toString(e)
        });
    }
    get minValue() {
        let e = null;
        for (let t of this._def.checks)t.kind === "min" && (e === null || t.value > e) && (e = t.value);
        return e;
    }
    get maxValue() {
        let e = null;
        for (let t of this._def.checks)t.kind === "max" && (e === null || t.value < e) && (e = t.value);
        return e;
    }
    get isInt() {
        return !!this._def.checks.find((e)=>e.kind === "int" || e.kind === "multipleOf" && g.isInteger(e.value));
    }
    get isFinite() {
        let e = null, t = null;
        for (let r of this._def.checks){
            if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf") return !0;
            r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
        }
        return Number.isFinite(t) && Number.isFinite(e);
    }
};
V.create = (s)=>new V({
        checks: [],
        typeName: p.ZodNumber,
        coerce: s?.coerce || !1,
        ...y(s)
    });
var P = class s extends v {
    constructor(){
        super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
        if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== d.bigint) {
            let a = this._getOrReturnCtx(e);
            return u(a, {
                code: c.invalid_type,
                expected: d.bigint,
                received: a.parsedType
            }), m;
        }
        let r, n = new x;
        for (let a1 of this._def.checks)a1.kind === "min" ? (a1.inclusive ? e.data < a1.value : e.data <= a1.value) && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.too_small,
            type: "bigint",
            minimum: a1.value,
            inclusive: a1.inclusive,
            message: a1.message
        }), n.dirty()) : a1.kind === "max" ? (a1.inclusive ? e.data > a1.value : e.data >= a1.value) && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.too_big,
            type: "bigint",
            maximum: a1.value,
            inclusive: a1.inclusive,
            message: a1.message
        }), n.dirty()) : a1.kind === "multipleOf" ? e.data % a1.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), u(r, {
            code: c.not_multiple_of,
            multipleOf: a1.value,
            message: a1.message
        }), n.dirty()) : g.assertNever(a1);
        return {
            status: n.value,
            value: e.data
        };
    }
    gte(e, t) {
        return this.setLimit("min", e, !0, h.toString(t));
    }
    gt(e, t) {
        return this.setLimit("min", e, !1, h.toString(t));
    }
    lte(e, t) {
        return this.setLimit("max", e, !0, h.toString(t));
    }
    lt(e, t) {
        return this.setLimit("max", e, !1, h.toString(t));
    }
    setLimit(e, t, r, n) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind: e,
                    value: t,
                    inclusive: r,
                    message: h.toString(n)
                }
            ]
        });
    }
    _addCheck(e) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                e
            ]
        });
    }
    positive(e) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: h.toString(e)
        });
    }
    negative(e) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: h.toString(e)
        });
    }
    nonpositive(e) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: h.toString(e)
        });
    }
    nonnegative(e) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: h.toString(e)
        });
    }
    multipleOf(e, t) {
        return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: h.toString(t)
        });
    }
    get minValue() {
        let e = null;
        for (let t of this._def.checks)t.kind === "min" && (e === null || t.value > e) && (e = t.value);
        return e;
    }
    get maxValue() {
        let e = null;
        for (let t of this._def.checks)t.kind === "max" && (e === null || t.value < e) && (e = t.value);
        return e;
    }
};
P.create = (s)=>{
    var e;
    return new P({
        checks: [],
        typeName: p.ZodBigInt,
        coerce: (e = s?.coerce) !== null && e !== void 0 ? e : !1,
        ...y(s)
    });
};
var $ = class extends v {
    _parse(e) {
        if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== d.boolean) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.boolean,
                received: r.parsedType
            }), m;
        }
        return k(e.data);
    }
};
$.create = (s)=>new $({
        typeName: p.ZodBoolean,
        coerce: s?.coerce || !1,
        ...y(s)
    });
var L = class s extends v {
    _parse(e) {
        if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== d.date) {
            let a = this._getOrReturnCtx(e);
            return u(a, {
                code: c.invalid_type,
                expected: d.date,
                received: a.parsedType
            }), m;
        }
        if (isNaN(e.data.getTime())) {
            let a1 = this._getOrReturnCtx(e);
            return u(a1, {
                code: c.invalid_date
            }), m;
        }
        let r = new x, n;
        for (let a2 of this._def.checks)a2.kind === "min" ? e.data.getTime() < a2.value && (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.too_small,
            message: a2.message,
            inclusive: !0,
            exact: !1,
            minimum: a2.value,
            type: "date"
        }), r.dirty()) : a2.kind === "max" ? e.data.getTime() > a2.value && (n = this._getOrReturnCtx(e, n), u(n, {
            code: c.too_big,
            message: a2.message,
            inclusive: !0,
            exact: !1,
            maximum: a2.value,
            type: "date"
        }), r.dirty()) : g.assertNever(a2);
        return {
            status: r.value,
            value: new Date(e.data.getTime())
        };
    }
    _addCheck(e) {
        return new s({
            ...this._def,
            checks: [
                ...this._def.checks,
                e
            ]
        });
    }
    min(e, t) {
        return this._addCheck({
            kind: "min",
            value: e.getTime(),
            message: h.toString(t)
        });
    }
    max(e, t) {
        return this._addCheck({
            kind: "max",
            value: e.getTime(),
            message: h.toString(t)
        });
    }
    get minDate() {
        let e = null;
        for (let t of this._def.checks)t.kind === "min" && (e === null || t.value > e) && (e = t.value);
        return e != null ? new Date(e) : null;
    }
    get maxDate() {
        let e = null;
        for (let t of this._def.checks)t.kind === "max" && (e === null || t.value < e) && (e = t.value);
        return e != null ? new Date(e) : null;
    }
};
L.create = (s)=>new L({
        checks: [],
        coerce: s?.coerce || !1,
        typeName: p.ZodDate,
        ...y(s)
    });
var K = class extends v {
    _parse(e) {
        if (this._getType(e) !== d.symbol) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.symbol,
                received: r.parsedType
            }), m;
        }
        return k(e.data);
    }
};
K.create = (s)=>new K({
        typeName: p.ZodSymbol,
        ...y(s)
    });
var D = class extends v {
    _parse(e) {
        if (this._getType(e) !== d.undefined) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.undefined,
                received: r.parsedType
            }), m;
        }
        return k(e.data);
    }
};
D.create = (s)=>new D({
        typeName: p.ZodUndefined,
        ...y(s)
    });
var z = class extends v {
    _parse(e) {
        if (this._getType(e) !== d.null) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.null,
                received: r.parsedType
            }), m;
        }
        return k(e.data);
    }
};
z.create = (s)=>new z({
        typeName: p.ZodNull,
        ...y(s)
    });
var A = class extends v {
    constructor(){
        super(...arguments), this._any = !0;
    }
    _parse(e) {
        return k(e.data);
    }
};
A.create = (s)=>new A({
        typeName: p.ZodAny,
        ...y(s)
    });
var E = class extends v {
    constructor(){
        super(...arguments), this._unknown = !0;
    }
    _parse(e) {
        return k(e.data);
    }
};
E.create = (s)=>new E({
        typeName: p.ZodUnknown,
        ...y(s)
    });
var C = class extends v {
    _parse(e) {
        let t = this._getOrReturnCtx(e);
        return u(t, {
            code: c.invalid_type,
            expected: d.never,
            received: t.parsedType
        }), m;
    }
};
C.create = (s)=>new C({
        typeName: p.ZodNever,
        ...y(s)
    });
var Q = class extends v {
    _parse(e) {
        if (this._getType(e) !== d.undefined) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.void,
                received: r.parsedType
            }), m;
        }
        return k(e.data);
    }
};
Q.create = (s)=>new Q({
        typeName: p.ZodVoid,
        ...y(s)
    });
var Z = class s extends v {
    _parse(e) {
        let { ctx: t , status: r  } = this._processInputParams(e), n = this._def;
        if (t.parsedType !== d.array) return u(t, {
            code: c.invalid_type,
            expected: d.array,
            received: t.parsedType
        }), m;
        if (n.exactLength !== null) {
            let i = t.data.length > n.exactLength.value, o = t.data.length < n.exactLength.value;
            (i || o) && (u(t, {
                code: i ? c.too_big : c.too_small,
                minimum: o ? n.exactLength.value : void 0,
                maximum: i ? n.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: n.exactLength.message
            }), r.dirty());
        }
        if (n.minLength !== null && t.data.length < n.minLength.value && (u(t, {
            code: c.too_small,
            minimum: n.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: n.minLength.message
        }), r.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (u(t, {
            code: c.too_big,
            maximum: n.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: n.maxLength.message
        }), r.dirty()), t.common.async) return Promise.all([
            ...t.data
        ].map((i, o)=>n.type._parseAsync(new O(t, i, t.path, o)))).then((i)=>x.mergeArray(r, i));
        let a = [
            ...t.data
        ].map((i, o)=>n.type._parseSync(new O(t, i, t.path, o)));
        return x.mergeArray(r, a);
    }
    get element() {
        return this._def.type;
    }
    min(e, t) {
        return new s({
            ...this._def,
            minLength: {
                value: e,
                message: h.toString(t)
            }
        });
    }
    max(e, t) {
        return new s({
            ...this._def,
            maxLength: {
                value: e,
                message: h.toString(t)
            }
        });
    }
    length(e, t) {
        return new s({
            ...this._def,
            exactLength: {
                value: e,
                message: h.toString(t)
            }
        });
    }
    nonempty(e) {
        return this.min(1, e);
    }
};
Z.create = (s, e)=>new Z({
        type: s,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: p.ZodArray,
        ...y(e)
    });
function X(s) {
    if (s instanceof b) {
        let e = {};
        for(let t in s.shape){
            let r = s.shape[t];
            e[t] = S.create(X(r));
        }
        return new b({
            ...s._def,
            shape: ()=>e
        });
    } else return s instanceof Z ? new Z({
        ...s._def,
        type: X(s.element)
    }) : s instanceof S ? S.create(X(s.unwrap())) : s instanceof j ? j.create(X(s.unwrap())) : s instanceof N ? N.create(s.items.map((e)=>X(e))) : s;
}
var b = class s extends v {
    constructor(){
        super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null) return this._cached;
        let e = this._def.shape(), t = g.objectKeys(e);
        return this._cached = {
            shape: e,
            keys: t
        };
    }
    _parse(e) {
        if (this._getType(e) !== d.object) {
            let l = this._getOrReturnCtx(e);
            return u(l, {
                code: c.invalid_type,
                expected: d.object,
                received: l.parsedType
            }), m;
        }
        let { status: r , ctx: n  } = this._processInputParams(e), { shape: a , keys: i  } = this._getCached(), o = [];
        if (!(this._def.catchall instanceof C && this._def.unknownKeys === "strip")) for(let l1 in n.data)i.includes(l1) || o.push(l1);
        let f = [];
        for (let l2 of i){
            let _ = a[l2], G = n.data[l2];
            f.push({
                key: {
                    status: "valid",
                    value: l2
                },
                value: _._parse(new O(n, G, n.path, l2)),
                alwaysSet: l2 in n.data
            });
        }
        if (this._def.catchall instanceof C) {
            let l3 = this._def.unknownKeys;
            if (l3 === "passthrough") for (let _1 of o)f.push({
                key: {
                    status: "valid",
                    value: _1
                },
                value: {
                    status: "valid",
                    value: n.data[_1]
                }
            });
            else if (l3 === "strict") o.length > 0 && (u(n, {
                code: c.unrecognized_keys,
                keys: o
            }), r.dirty());
            else if (l3 !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
        } else {
            let l4 = this._def.catchall;
            for (let _2 of o){
                let G1 = n.data[_2];
                f.push({
                    key: {
                        status: "valid",
                        value: _2
                    },
                    value: l4._parse(new O(n, G1, n.path, _2)),
                    alwaysSet: _2 in n.data
                });
            }
        }
        return n.common.async ? Promise.resolve().then(async ()=>{
            let l = [];
            for (let _ of f){
                let G = await _.key;
                l.push({
                    key: G,
                    value: await _.value,
                    alwaysSet: _.alwaysSet
                });
            }
            return l;
        }).then((l)=>x.mergeObjectSync(r, l)) : x.mergeObjectSync(r, f);
    }
    get shape() {
        return this._def.shape();
    }
    strict(e) {
        return h.errToObj, new s({
            ...this._def,
            unknownKeys: "strict",
            ...e !== void 0 ? {
                errorMap: (t, r)=>{
                    var n, a, i, o;
                    let f = (i = (a = (n = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(n, t, r).message) !== null && i !== void 0 ? i : r.defaultError;
                    return t.code === "unrecognized_keys" ? {
                        message: (o = h.errToObj(e).message) !== null && o !== void 0 ? o : f
                    } : {
                        message: f
                    };
                }
            } : {}
        });
    }
    strip() {
        return new s({
            ...this._def,
            unknownKeys: "strip"
        });
    }
    passthrough() {
        return new s({
            ...this._def,
            unknownKeys: "passthrough"
        });
    }
    extend(e) {
        return new s({
            ...this._def,
            shape: ()=>({
                    ...this._def.shape(),
                    ...e
                })
        });
    }
    merge(e) {
        return new s({
            unknownKeys: e._def.unknownKeys,
            catchall: e._def.catchall,
            shape: ()=>({
                    ...this._def.shape(),
                    ...e._def.shape()
                }),
            typeName: p.ZodObject
        });
    }
    setKey(e, t) {
        return this.augment({
            [e]: t
        });
    }
    catchall(e) {
        return new s({
            ...this._def,
            catchall: e
        });
    }
    pick(e) {
        let t = {};
        return g.objectKeys(e).forEach((r)=>{
            e[r] && this.shape[r] && (t[r] = this.shape[r]);
        }), new s({
            ...this._def,
            shape: ()=>t
        });
    }
    omit(e) {
        let t = {};
        return g.objectKeys(this.shape).forEach((r)=>{
            e[r] || (t[r] = this.shape[r]);
        }), new s({
            ...this._def,
            shape: ()=>t
        });
    }
    deepPartial() {
        return X(this);
    }
    partial(e) {
        let t = {};
        return g.objectKeys(this.shape).forEach((r)=>{
            let n = this.shape[r];
            e && !e[r] ? t[r] = n : t[r] = n.optional();
        }), new s({
            ...this._def,
            shape: ()=>t
        });
    }
    required(e) {
        let t = {};
        return g.objectKeys(this.shape).forEach((r)=>{
            if (e && !e[r]) t[r] = this.shape[r];
            else {
                let a = this.shape[r];
                for(; a instanceof S;)a = a._def.innerType;
                t[r] = a;
            }
        }), new s({
            ...this._def,
            shape: ()=>t
        });
    }
    keyof() {
        return we(g.objectKeys(this.shape));
    }
};
b.create = (s, e)=>new b({
        shape: ()=>s,
        unknownKeys: "strip",
        catchall: C.create(),
        typeName: p.ZodObject,
        ...y(e)
    });
b.strictCreate = (s, e)=>new b({
        shape: ()=>s,
        unknownKeys: "strict",
        catchall: C.create(),
        typeName: p.ZodObject,
        ...y(e)
    });
b.lazycreate = (s, e)=>new b({
        shape: s,
        unknownKeys: "strip",
        catchall: C.create(),
        typeName: p.ZodObject,
        ...y(e)
    });
var U = class extends v {
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e), r = this._def.options;
        function n(a) {
            for (let o of a)if (o.result.status === "valid") return o.result;
            for (let o1 of a)if (o1.result.status === "dirty") return t.common.issues.push(...o1.ctx.common.issues), o1.result;
            let i = a.map((o)=>new w(o.ctx.common.issues));
            return u(t, {
                code: c.invalid_union,
                unionErrors: i
            }), m;
        }
        if (t.common.async) return Promise.all(r.map(async (a)=>{
            let i = {
                ...t,
                common: {
                    ...t.common,
                    issues: []
                },
                parent: null
            };
            return {
                result: await a._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: i
                }),
                ctx: i
            };
        })).then(n);
        {
            let a, i = [];
            for (let f of r){
                let l = {
                    ...t,
                    common: {
                        ...t.common,
                        issues: []
                    },
                    parent: null
                }, _ = f._parseSync({
                    data: t.data,
                    path: t.path,
                    parent: l
                });
                if (_.status === "valid") return _;
                _.status === "dirty" && !a && (a = {
                    result: _,
                    ctx: l
                }), l.common.issues.length && i.push(l.common.issues);
            }
            if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
            let o = i.map((f)=>new w(f));
            return u(t, {
                code: c.invalid_union,
                unionErrors: o
            }), m;
        }
    }
    get options() {
        return this._def.options;
    }
};
U.create = (s, e)=>new U({
        options: s,
        typeName: p.ZodUnion,
        ...y(e)
    });
var ae = (s)=>s instanceof W ? ae(s.schema) : s instanceof T ? ae(s.innerType()) : s instanceof q ? [
        s.value
    ] : s instanceof J ? s.options : s instanceof Y ? Object.keys(s.enum) : s instanceof H ? ae(s._def.innerType) : s instanceof D ? [
        void 0
    ] : s instanceof z ? [
        null
    ] : null, ue = class s extends v {
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e);
        if (t.parsedType !== d.object) return u(t, {
            code: c.invalid_type,
            expected: d.object,
            received: t.parsedType
        }), m;
        let r = this.discriminator, n = t.data[r], a = this.optionsMap.get(n);
        return a ? t.common.async ? a._parseAsync({
            data: t.data,
            path: t.path,
            parent: t
        }) : a._parseSync({
            data: t.data,
            path: t.path,
            parent: t
        }) : (u(t, {
            code: c.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [
                r
            ]
        }), m);
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    static create(e, t, r) {
        let n = new Map;
        for (let a of t){
            let i = ae(a.shape[e]);
            if (!i) throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
            for (let o of i){
                if (n.has(o)) throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
                n.set(o, a);
            }
        }
        return new s({
            typeName: p.ZodDiscriminatedUnion,
            discriminator: e,
            options: t,
            optionsMap: n,
            ...y(r)
        });
    }
};
function _e(s, e) {
    let t = I(s), r = I(e);
    if (s === e) return {
        valid: !0,
        data: s
    };
    if (t === d.object && r === d.object) {
        let n = g.objectKeys(e), a = g.objectKeys(s).filter((o)=>n.indexOf(o) !== -1), i = {
            ...s,
            ...e
        };
        for (let o of a){
            let f = _e(s[o], e[o]);
            if (!f.valid) return {
                valid: !1
            };
            i[o] = f.data;
        }
        return {
            valid: !0,
            data: i
        };
    } else if (t === d.array && r === d.array) {
        if (s.length !== e.length) return {
            valid: !1
        };
        let n1 = [];
        for(let a1 = 0; a1 < s.length; a1++){
            let i1 = s[a1], o1 = e[a1], f1 = _e(i1, o1);
            if (!f1.valid) return {
                valid: !1
            };
            n1.push(f1.data);
        }
        return {
            valid: !0,
            data: n1
        };
    } else return t === d.date && r === d.date && +s == +e ? {
        valid: !0,
        data: s
    } : {
        valid: !1
    };
}
var B = class extends v {
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e), n = (a, i)=>{
            if (ye(a) || ye(i)) return m;
            let o = _e(a.value, i.value);
            return o.valid ? ((ve(a) || ve(i)) && t.dirty(), {
                status: t.value,
                value: o.data
            }) : (u(r, {
                code: c.invalid_intersection_types
            }), m);
        };
        return r.common.async ? Promise.all([
            this._def.left._parseAsync({
                data: r.data,
                path: r.path,
                parent: r
            }),
            this._def.right._parseAsync({
                data: r.data,
                path: r.path,
                parent: r
            })
        ]).then(([a, i])=>n(a, i)) : n(this._def.left._parseSync({
            data: r.data,
            path: r.path,
            parent: r
        }), this._def.right._parseSync({
            data: r.data,
            path: r.path,
            parent: r
        }));
    }
};
B.create = (s, e, t)=>new B({
        left: s,
        right: e,
        typeName: p.ZodIntersection,
        ...y(t)
    });
var N = class s extends v {
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e);
        if (r.parsedType !== d.array) return u(r, {
            code: c.invalid_type,
            expected: d.array,
            received: r.parsedType
        }), m;
        if (r.data.length < this._def.items.length) return u(r, {
            code: c.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array"
        }), m;
        !this._def.rest && r.data.length > this._def.items.length && (u(r, {
            code: c.too_big,
            maximum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array"
        }), t.dirty());
        let a = [
            ...r.data
        ].map((i, o)=>{
            let f = this._def.items[o] || this._def.rest;
            return f ? f._parse(new O(r, i, r.path, o)) : null;
        }).filter((i)=>!!i);
        return r.common.async ? Promise.all(a).then((i)=>x.mergeArray(t, i)) : x.mergeArray(t, a);
    }
    get items() {
        return this._def.items;
    }
    rest(e) {
        return new s({
            ...this._def,
            rest: e
        });
    }
};
N.create = (s, e)=>{
    if (!Array.isArray(s)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new N({
        items: s,
        typeName: p.ZodTuple,
        rest: null,
        ...y(e)
    });
};
var le = class s extends v {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e);
        if (r.parsedType !== d.object) return u(r, {
            code: c.invalid_type,
            expected: d.object,
            received: r.parsedType
        }), m;
        let n = [], a = this._def.keyType, i = this._def.valueType;
        for(let o in r.data)n.push({
            key: a._parse(new O(r, o, r.path, o)),
            value: i._parse(new O(r, r.data[o], r.path, o))
        });
        return r.common.async ? x.mergeObjectAsync(t, n) : x.mergeObjectSync(t, n);
    }
    get element() {
        return this._def.valueType;
    }
    static create(e, t, r) {
        return t instanceof v ? new s({
            keyType: e,
            valueType: t,
            typeName: p.ZodRecord,
            ...y(r)
        }) : new s({
            keyType: R.create(),
            valueType: e,
            typeName: p.ZodRecord,
            ...y(t)
        });
    }
}, F = class extends v {
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e);
        if (r.parsedType !== d.map) return u(r, {
            code: c.invalid_type,
            expected: d.map,
            received: r.parsedType
        }), m;
        let n = this._def.keyType, a = this._def.valueType, i = [
            ...r.data.entries()
        ].map(([o, f], l)=>({
                key: n._parse(new O(r, o, r.path, [
                    l,
                    "key"
                ])),
                value: a._parse(new O(r, f, r.path, [
                    l,
                    "value"
                ]))
            }));
        if (r.common.async) {
            let o = new Map;
            return Promise.resolve().then(async ()=>{
                for (let f of i){
                    let l = await f.key, _ = await f.value;
                    if (l.status === "aborted" || _.status === "aborted") return m;
                    (l.status === "dirty" || _.status === "dirty") && t.dirty(), o.set(l.value, _.value);
                }
                return {
                    status: t.value,
                    value: o
                };
            });
        } else {
            let o1 = new Map;
            for (let f of i){
                let l = f.key, _ = f.value;
                if (l.status === "aborted" || _.status === "aborted") return m;
                (l.status === "dirty" || _.status === "dirty") && t.dirty(), o1.set(l.value, _.value);
            }
            return {
                status: t.value,
                value: o1
            };
        }
    }
};
F.create = (s, e, t)=>new F({
        valueType: e,
        keyType: s,
        typeName: p.ZodMap,
        ...y(t)
    });
var ee = class s extends v {
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e);
        if (r.parsedType !== d.set) return u(r, {
            code: c.invalid_type,
            expected: d.set,
            received: r.parsedType
        }), m;
        let n = this._def;
        n.minSize !== null && r.data.size < n.minSize.value && (u(r, {
            code: c.too_small,
            minimum: n.minSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: n.minSize.message
        }), t.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (u(r, {
            code: c.too_big,
            maximum: n.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: n.maxSize.message
        }), t.dirty());
        let a = this._def.valueType;
        function i(f) {
            let l = new Set;
            for (let _ of f){
                if (_.status === "aborted") return m;
                _.status === "dirty" && t.dirty(), l.add(_.value);
            }
            return {
                status: t.value,
                value: l
            };
        }
        let o = [
            ...r.data.values()
        ].map((f, l)=>a._parse(new O(r, f, r.path, l)));
        return r.common.async ? Promise.all(o).then((f)=>i(f)) : i(o);
    }
    min(e, t) {
        return new s({
            ...this._def,
            minSize: {
                value: e,
                message: h.toString(t)
            }
        });
    }
    max(e, t) {
        return new s({
            ...this._def,
            maxSize: {
                value: e,
                message: h.toString(t)
            }
        });
    }
    size(e, t) {
        return this.min(e, t).max(e, t);
    }
    nonempty(e) {
        return this.min(1, e);
    }
};
ee.create = (s, e)=>new ee({
        valueType: s,
        minSize: null,
        maxSize: null,
        typeName: p.ZodSet,
        ...y(e)
    });
var fe = class s extends v {
    constructor(){
        super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e);
        if (t.parsedType !== d.function) return u(t, {
            code: c.invalid_type,
            expected: d.function,
            received: t.parsedType
        }), m;
        function r(o, f) {
            return oe({
                data: o,
                path: t.path,
                errorMaps: [
                    t.common.contextualErrorMap,
                    t.schemaErrorMap,
                    ie(),
                    re
                ].filter((l)=>!!l),
                issueData: {
                    code: c.invalid_arguments,
                    argumentsError: f
                }
            });
        }
        function n(o, f) {
            return oe({
                data: o,
                path: t.path,
                errorMaps: [
                    t.common.contextualErrorMap,
                    t.schemaErrorMap,
                    ie(),
                    re
                ].filter((l)=>!!l),
                issueData: {
                    code: c.invalid_return_type,
                    returnTypeError: f
                }
            });
        }
        let a = {
            errorMap: t.common.contextualErrorMap
        }, i = t.data;
        return this._def.returns instanceof M ? k(async (...o)=>{
            let f = new w([]), l = await this._def.args.parseAsync(o, a).catch((pe)=>{
                throw f.addIssue(r(o, pe)), f;
            }), _ = await i(...l);
            return await this._def.returns._def.type.parseAsync(_, a).catch((pe)=>{
                throw f.addIssue(n(_, pe)), f;
            });
        }) : k((...o)=>{
            let f = this._def.args.safeParse(o, a);
            if (!f.success) throw new w([
                r(o, f.error)
            ]);
            let l = i(...f.data), _ = this._def.returns.safeParse(l, a);
            if (!_.success) throw new w([
                n(l, _.error)
            ]);
            return _.data;
        });
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...e) {
        return new s({
            ...this._def,
            args: N.create(e).rest(E.create())
        });
    }
    returns(e) {
        return new s({
            ...this._def,
            returns: e
        });
    }
    implement(e) {
        return this.parse(e);
    }
    strictImplement(e) {
        return this.parse(e);
    }
    static create(e, t, r) {
        return new s({
            args: e || N.create([]).rest(E.create()),
            returns: t || E.create(),
            typeName: p.ZodFunction,
            ...y(r)
        });
    }
}, W = class extends v {
    get schema() {
        return this._def.getter();
    }
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e);
        return this._def.getter()._parse({
            data: t.data,
            path: t.path,
            parent: t
        });
    }
};
W.create = (s, e)=>new W({
        getter: s,
        typeName: p.ZodLazy,
        ...y(e)
    });
var q = class extends v {
    _parse(e) {
        if (e.data !== this._def.value) {
            let t = this._getOrReturnCtx(e);
            return u(t, {
                received: t.data,
                code: c.invalid_literal,
                expected: this._def.value
            }), m;
        }
        return {
            status: "valid",
            value: e.data
        };
    }
    get value() {
        return this._def.value;
    }
};
q.create = (s, e)=>new q({
        value: s,
        typeName: p.ZodLiteral,
        ...y(e)
    });
function we(s, e) {
    return new J({
        values: s,
        typeName: p.ZodEnum,
        ...y(e)
    });
}
var J = class s extends v {
    _parse(e) {
        if (typeof e.data != "string") {
            let t = this._getOrReturnCtx(e), r = this._def.values;
            return u(t, {
                expected: g.joinValues(r),
                received: t.parsedType,
                code: c.invalid_type
            }), m;
        }
        if (this._def.values.indexOf(e.data) === -1) {
            let t1 = this._getOrReturnCtx(e), r1 = this._def.values;
            return u(t1, {
                received: t1.data,
                code: c.invalid_enum_value,
                options: r1
            }), m;
        }
        return k(e.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        let e = {};
        for (let t of this._def.values)e[t] = t;
        return e;
    }
    get Values() {
        let e = {};
        for (let t of this._def.values)e[t] = t;
        return e;
    }
    get Enum() {
        let e = {};
        for (let t of this._def.values)e[t] = t;
        return e;
    }
    extract(e) {
        return s.create(e);
    }
    exclude(e) {
        return s.create(this.options.filter((t)=>!e.includes(t)));
    }
};
J.create = we;
var Y = class extends v {
    _parse(e) {
        let t = g.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
        if (r.parsedType !== d.string && r.parsedType !== d.number) {
            let n = g.objectValues(t);
            return u(r, {
                expected: g.joinValues(n),
                received: r.parsedType,
                code: c.invalid_type
            }), m;
        }
        if (t.indexOf(e.data) === -1) {
            let n1 = g.objectValues(t);
            return u(r, {
                received: r.data,
                code: c.invalid_enum_value,
                options: n1
            }), m;
        }
        return k(e.data);
    }
    get enum() {
        return this._def.values;
    }
};
Y.create = (s, e)=>new Y({
        values: s,
        typeName: p.ZodNativeEnum,
        ...y(e)
    });
var M = class extends v {
    unwrap() {
        return this._def.type;
    }
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e);
        if (t.parsedType !== d.promise && t.common.async === !1) return u(t, {
            code: c.invalid_type,
            expected: d.promise,
            received: t.parsedType
        }), m;
        let r = t.parsedType === d.promise ? t.data : Promise.resolve(t.data);
        return k(r.then((n)=>this._def.type.parseAsync(n, {
                path: t.path,
                errorMap: t.common.contextualErrorMap
            })));
    }
};
M.create = (s, e)=>new M({
        type: s,
        typeName: p.ZodPromise,
        ...y(e)
    });
var T = class extends v {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === p.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e), n = this._def.effect || null;
        if (n.type === "preprocess") {
            let i = n.transform(r.data);
            return r.common.async ? Promise.resolve(i).then((o)=>this._def.schema._parseAsync({
                    data: o,
                    path: r.path,
                    parent: r
                })) : this._def.schema._parseSync({
                data: i,
                path: r.path,
                parent: r
            });
        }
        let a = {
            addIssue: (i)=>{
                u(r, i), i.fatal ? t.abort() : t.dirty();
            },
            get path () {
                return r.path;
            }
        };
        if (a.addIssue = a.addIssue.bind(a), n.type === "refinement") {
            let i1 = (o)=>{
                let f = n.refinement(o, a);
                if (r.common.async) return Promise.resolve(f);
                if (f instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                return o;
            };
            if (r.common.async === !1) {
                let o = this._def.schema._parseSync({
                    data: r.data,
                    path: r.path,
                    parent: r
                });
                return o.status === "aborted" ? m : (o.status === "dirty" && t.dirty(), i1(o.value), {
                    status: t.value,
                    value: o.value
                });
            } else return this._def.schema._parseAsync({
                data: r.data,
                path: r.path,
                parent: r
            }).then((o)=>o.status === "aborted" ? m : (o.status === "dirty" && t.dirty(), i1(o.value).then(()=>({
                        status: t.value,
                        value: o.value
                    }))));
        }
        if (n.type === "transform") if (r.common.async === !1) {
            let i2 = this._def.schema._parseSync({
                data: r.data,
                path: r.path,
                parent: r
            });
            if (!ce(i2)) return i2;
            let o1 = n.transform(i2.value, a);
            if (o1 instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
            return {
                status: t.value,
                value: o1
            };
        } else return this._def.schema._parseAsync({
            data: r.data,
            path: r.path,
            parent: r
        }).then((i)=>ce(i) ? Promise.resolve(n.transform(i.value, a)).then((o)=>({
                    status: t.value,
                    value: o
                })) : i);
        g.assertNever(n);
    }
};
T.create = (s, e, t)=>new T({
        schema: s,
        typeName: p.ZodEffects,
        effect: e,
        ...y(t)
    });
T.createWithPreprocess = (s, e, t)=>new T({
        schema: e,
        effect: {
            type: "preprocess",
            transform: s
        },
        typeName: p.ZodEffects,
        ...y(t)
    });
var S = class extends v {
    _parse(e) {
        return this._getType(e) === d.undefined ? k(void 0) : this._def.innerType._parse(e);
    }
    unwrap() {
        return this._def.innerType;
    }
};
S.create = (s, e)=>new S({
        innerType: s,
        typeName: p.ZodOptional,
        ...y(e)
    });
var j = class extends v {
    _parse(e) {
        return this._getType(e) === d.null ? k(null) : this._def.innerType._parse(e);
    }
    unwrap() {
        return this._def.innerType;
    }
};
j.create = (s, e)=>new j({
        innerType: s,
        typeName: p.ZodNullable,
        ...y(e)
    });
var H = class extends v {
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e), r = t.data;
        return t.parsedType === d.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
            data: r,
            path: t.path,
            parent: t
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
};
H.create = (s, e)=>new H({
        innerType: s,
        typeName: p.ZodDefault,
        defaultValue: typeof e.default == "function" ? e.default : ()=>e.default,
        ...y(e)
    });
var te = class extends v {
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e), r = {
            ...t,
            common: {
                ...t.common,
                issues: []
            }
        }, n = this._def.innerType._parse({
            data: r.data,
            path: r.path,
            parent: {
                ...r
            }
        });
        return de(n) ? n.then((a)=>({
                status: "valid",
                value: a.status === "valid" ? a.value : this._def.catchValue({
                    get error () {
                        return new w(r.common.issues);
                    },
                    input: r.data
                })
            })) : {
            status: "valid",
            value: n.status === "valid" ? n.value : this._def.catchValue({
                get error () {
                    return new w(r.common.issues);
                },
                input: r.data
            })
        };
    }
    removeCatch() {
        return this._def.innerType;
    }
};
te.create = (s, e)=>new te({
        innerType: s,
        typeName: p.ZodCatch,
        catchValue: typeof e.catch == "function" ? e.catch : ()=>e.catch,
        ...y(e)
    });
var se = class extends v {
    _parse(e) {
        if (this._getType(e) !== d.nan) {
            let r = this._getOrReturnCtx(e);
            return u(r, {
                code: c.invalid_type,
                expected: d.nan,
                received: r.parsedType
            }), m;
        }
        return {
            status: "valid",
            value: e.data
        };
    }
};
se.create = (s)=>new se({
        typeName: p.ZodNaN,
        ...y(s)
    });
var Ue = Symbol("zod_brand"), he = class extends v {
    _parse(e) {
        let { ctx: t  } = this._processInputParams(e), r = t.data;
        return this._def.type._parse({
            data: r,
            path: t.path,
            parent: t
        });
    }
    unwrap() {
        return this._def.type;
    }
}, ne = class s extends v {
    _parse(e) {
        let { status: t , ctx: r  } = this._processInputParams(e);
        if (r.common.async) return (async ()=>{
            let a = await this._def.in._parseAsync({
                data: r.data,
                path: r.path,
                parent: r
            });
            return a.status === "aborted" ? m : a.status === "dirty" ? (t.dirty(), be(a.value)) : this._def.out._parseAsync({
                data: a.value,
                path: r.path,
                parent: r
            });
        })();
        {
            let n = this._def.in._parseSync({
                data: r.data,
                path: r.path,
                parent: r
            });
            return n.status === "aborted" ? m : n.status === "dirty" ? (t.dirty(), {
                status: "dirty",
                value: n.value
            }) : this._def.out._parseSync({
                data: n.value,
                path: r.path,
                parent: r
            });
        }
    }
    static create(e, t) {
        return new s({
            in: e,
            out: t,
            typeName: p.ZodPipeline
        });
    }
}, Te = (s, e = {}, t)=>s ? A.create().superRefine((r, n)=>{
        var a, i;
        if (!s(r)) {
            let o = typeof e == "function" ? e(r) : typeof e == "string" ? {
                message: e
            } : e, f = (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null && i !== void 0 ? i : !0, l = typeof o == "string" ? {
                message: o
            } : o;
            n.addIssue({
                code: "custom",
                ...l,
                fatal: f
            });
        }
    }) : A.create(), Be = {
    object: b.lazycreate
}, p;
(function(s) {
    s.ZodString = "ZodString", s.ZodNumber = "ZodNumber", s.ZodNaN = "ZodNaN", s.ZodBigInt = "ZodBigInt", s.ZodBoolean = "ZodBoolean", s.ZodDate = "ZodDate", s.ZodSymbol = "ZodSymbol", s.ZodUndefined = "ZodUndefined", s.ZodNull = "ZodNull", s.ZodAny = "ZodAny", s.ZodUnknown = "ZodUnknown", s.ZodNever = "ZodNever", s.ZodVoid = "ZodVoid", s.ZodArray = "ZodArray", s.ZodObject = "ZodObject", s.ZodUnion = "ZodUnion", s.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", s.ZodIntersection = "ZodIntersection", s.ZodTuple = "ZodTuple", s.ZodRecord = "ZodRecord", s.ZodMap = "ZodMap", s.ZodSet = "ZodSet", s.ZodFunction = "ZodFunction", s.ZodLazy = "ZodLazy", s.ZodLiteral = "ZodLiteral", s.ZodEnum = "ZodEnum", s.ZodEffects = "ZodEffects", s.ZodNativeEnum = "ZodNativeEnum", s.ZodOptional = "ZodOptional", s.ZodNullable = "ZodNullable", s.ZodDefault = "ZodDefault", s.ZodCatch = "ZodCatch", s.ZodPromise = "ZodPromise", s.ZodBranded = "ZodBranded", s.ZodPipeline = "ZodPipeline";
})(p || (p = {}));
var We = (s, e = {
    message: `Input not instance of ${s.name}`
})=>Te((t)=>t instanceof s, e), Oe = R.create, Se = V.create, qe = se.create, Je = P.create, Ce = $.create, Ye = L.create, He = K.create, Ge = D.create, Xe = z.create, Ke = A.create, Qe = E.create, Fe = C.create, et = Q.create, tt = Z.create, st = b.create, rt = b.strictCreate, nt = U.create, at = ue.create, it = B.create, ot = N.create, ct = le.create, dt = F.create, ut = ee.create, lt = fe.create, ft = W.create, ht = q.create, pt = J.create, mt = Y.create, yt = M.create, xe = T.create, vt = S.create, _t = j.create, gt = T.createWithPreprocess, xt = ne.create, kt = ()=>Oe().optional(), bt = ()=>Se().optional(), wt = ()=>Ce().optional(), Tt = {
    string: (s)=>R.create({
            ...s,
            coerce: !0
        }),
    number: (s)=>V.create({
            ...s,
            coerce: !0
        }),
    boolean: (s)=>$.create({
            ...s,
            coerce: !0
        }),
    bigint: (s)=>P.create({
            ...s,
            coerce: !0
        }),
    date: (s)=>L.create({
            ...s,
            coerce: !0
        })
}, Ot = m, St = Object.freeze({
    __proto__: null,
    defaultErrorMap: re,
    setErrorMap: Ee,
    getErrorMap: ie,
    makeIssue: oe,
    EMPTY_PATH: Ze,
    addIssueToContext: u,
    ParseStatus: x,
    INVALID: m,
    DIRTY: be,
    OK: k,
    isAborted: ye,
    isDirty: ve,
    isValid: ce,
    isAsync: de,
    get util () {
        return g;
    },
    get objectUtil () {
        return me;
    },
    ZodParsedType: d,
    getParsedType: I,
    ZodType: v,
    ZodString: R,
    ZodNumber: V,
    ZodBigInt: P,
    ZodBoolean: $,
    ZodDate: L,
    ZodSymbol: K,
    ZodUndefined: D,
    ZodNull: z,
    ZodAny: A,
    ZodUnknown: E,
    ZodNever: C,
    ZodVoid: Q,
    ZodArray: Z,
    ZodObject: b,
    ZodUnion: U,
    ZodDiscriminatedUnion: ue,
    ZodIntersection: B,
    ZodTuple: N,
    ZodRecord: le,
    ZodMap: F,
    ZodSet: ee,
    ZodFunction: fe,
    ZodLazy: W,
    ZodLiteral: q,
    ZodEnum: J,
    ZodNativeEnum: Y,
    ZodPromise: M,
    ZodEffects: T,
    ZodTransformer: T,
    ZodOptional: S,
    ZodNullable: j,
    ZodDefault: H,
    ZodCatch: te,
    ZodNaN: se,
    BRAND: Ue,
    ZodBranded: he,
    ZodPipeline: ne,
    custom: Te,
    Schema: v,
    ZodSchema: v,
    late: Be,
    get ZodFirstPartyTypeKind () {
        return p;
    },
    coerce: Tt,
    any: Ke,
    array: tt,
    bigint: Je,
    boolean: Ce,
    date: Ye,
    discriminatedUnion: at,
    effect: xe,
    enum: pt,
    function: lt,
    instanceof: We,
    intersection: it,
    lazy: ft,
    literal: ht,
    map: dt,
    nan: qe,
    nativeEnum: mt,
    never: Fe,
    null: Xe,
    nullable: _t,
    number: Se,
    object: st,
    oboolean: wt,
    onumber: bt,
    optional: vt,
    ostring: kt,
    pipeline: xt,
    preprocess: gt,
    promise: yt,
    record: ct,
    set: ut,
    strictObject: rt,
    string: Oe,
    symbol: He,
    transformer: xe,
    tuple: ot,
    undefined: Ge,
    union: nt,
    unknown: Qe,
    void: et,
    NEVER: Ot,
    ZodIssueCode: c,
    quotelessJson: Ne,
    ZodError: w
});
export { Ue as BRAND, be as DIRTY, Ze as EMPTY_PATH, m as INVALID, Ot as NEVER, k as OK, x as ParseStatus, v as Schema, A as ZodAny, Z as ZodArray, P as ZodBigInt, $ as ZodBoolean, he as ZodBranded, te as ZodCatch, L as ZodDate, H as ZodDefault, ue as ZodDiscriminatedUnion, T as ZodEffects, J as ZodEnum, w as ZodError, p as ZodFirstPartyTypeKind, fe as ZodFunction, B as ZodIntersection, c as ZodIssueCode, W as ZodLazy, q as ZodLiteral, F as ZodMap, se as ZodNaN, Y as ZodNativeEnum, C as ZodNever, z as ZodNull, j as ZodNullable, V as ZodNumber, b as ZodObject, S as ZodOptional, d as ZodParsedType, ne as ZodPipeline, M as ZodPromise, le as ZodRecord, v as ZodSchema, ee as ZodSet, R as ZodString, K as ZodSymbol, T as ZodTransformer, N as ZodTuple, v as ZodType, D as ZodUndefined, U as ZodUnion, E as ZodUnknown, Q as ZodVoid, u as addIssueToContext, Ke as any, tt as array, Je as bigint, Ce as boolean, Tt as coerce, Te as custom, Ye as date, re as defaultErrorMap, at as discriminatedUnion, xe as effect, pt as enum, lt as function, ie as getErrorMap, I as getParsedType, We as instanceof, it as intersection, ye as isAborted, de as isAsync, ve as isDirty, ce as isValid, Be as late, ft as lazy, ht as literal, oe as makeIssue, dt as map, qe as nan, mt as nativeEnum, Fe as never, Xe as null, _t as nullable, Se as number, st as object, me as objectUtil, wt as oboolean, bt as onumber, vt as optional, kt as ostring, xt as pipeline, gt as preprocess, yt as promise, Ne as quotelessJson, ct as record, ut as set, Ee as setErrorMap, rt as strictObject, Oe as string, He as symbol, xe as transformer, ot as tuple, Ge as undefined, nt as union, Qe as unknown, g as util, et as void, St as z };
export { St as default };
