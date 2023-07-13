var Status;
(function(Status) {
    Status[Status["Continue"] = 100] = "Continue";
    Status[Status["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    Status[Status["Processing"] = 102] = "Processing";
    Status[Status["EarlyHints"] = 103] = "EarlyHints";
    Status[Status["OK"] = 200] = "OK";
    Status[Status["Created"] = 201] = "Created";
    Status[Status["Accepted"] = 202] = "Accepted";
    Status[Status["NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
    Status[Status["NoContent"] = 204] = "NoContent";
    Status[Status["ResetContent"] = 205] = "ResetContent";
    Status[Status["PartialContent"] = 206] = "PartialContent";
    Status[Status["MultiStatus"] = 207] = "MultiStatus";
    Status[Status["AlreadyReported"] = 208] = "AlreadyReported";
    Status[Status["IMUsed"] = 226] = "IMUsed";
    Status[Status["MultipleChoices"] = 300] = "MultipleChoices";
    Status[Status["MovedPermanently"] = 301] = "MovedPermanently";
    Status[Status["Found"] = 302] = "Found";
    Status[Status["SeeOther"] = 303] = "SeeOther";
    Status[Status["NotModified"] = 304] = "NotModified";
    Status[Status["UseProxy"] = 305] = "UseProxy";
    Status[Status["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    Status[Status["PermanentRedirect"] = 308] = "PermanentRedirect";
    Status[Status["BadRequest"] = 400] = "BadRequest";
    Status[Status["Unauthorized"] = 401] = "Unauthorized";
    Status[Status["PaymentRequired"] = 402] = "PaymentRequired";
    Status[Status["Forbidden"] = 403] = "Forbidden";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Status[Status["NotAcceptable"] = 406] = "NotAcceptable";
    Status[Status["ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
    Status[Status["RequestTimeout"] = 408] = "RequestTimeout";
    Status[Status["Conflict"] = 409] = "Conflict";
    Status[Status["Gone"] = 410] = "Gone";
    Status[Status["LengthRequired"] = 411] = "LengthRequired";
    Status[Status["PreconditionFailed"] = 412] = "PreconditionFailed";
    Status[Status["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    Status[Status["RequestURITooLong"] = 414] = "RequestURITooLong";
    Status[Status["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    Status[Status["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    Status[Status["ExpectationFailed"] = 417] = "ExpectationFailed";
    Status[Status["Teapot"] = 418] = "Teapot";
    Status[Status["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    Status[Status["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    Status[Status["Locked"] = 423] = "Locked";
    Status[Status["FailedDependency"] = 424] = "FailedDependency";
    Status[Status["TooEarly"] = 425] = "TooEarly";
    Status[Status["UpgradeRequired"] = 426] = "UpgradeRequired";
    Status[Status["PreconditionRequired"] = 428] = "PreconditionRequired";
    Status[Status["TooManyRequests"] = 429] = "TooManyRequests";
    Status[Status["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    Status[Status["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    Status[Status["InternalServerError"] = 500] = "InternalServerError";
    Status[Status["NotImplemented"] = 501] = "NotImplemented";
    Status[Status["BadGateway"] = 502] = "BadGateway";
    Status[Status["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    Status[Status["GatewayTimeout"] = 504] = "GatewayTimeout";
    Status[Status["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    Status[Status["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    Status[Status["InsufficientStorage"] = 507] = "InsufficientStorage";
    Status[Status["LoopDetected"] = 508] = "LoopDetected";
    Status[Status["NotExtended"] = 510] = "NotExtended";
    Status[Status["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(Status || (Status = {}));
({
    [Status.Accepted]: "Accepted",
    [Status.AlreadyReported]: "Already Reported",
    [Status.BadGateway]: "Bad Gateway",
    [Status.BadRequest]: "Bad Request",
    [Status.Conflict]: "Conflict",
    [Status.Continue]: "Continue",
    [Status.Created]: "Created",
    [Status.EarlyHints]: "Early Hints",
    [Status.ExpectationFailed]: "Expectation Failed",
    [Status.FailedDependency]: "Failed Dependency",
    [Status.Forbidden]: "Forbidden",
    [Status.Found]: "Found",
    [Status.GatewayTimeout]: "Gateway Timeout",
    [Status.Gone]: "Gone",
    [Status.HTTPVersionNotSupported]: "HTTP Version Not Supported",
    [Status.IMUsed]: "IM Used",
    [Status.InsufficientStorage]: "Insufficient Storage",
    [Status.InternalServerError]: "Internal Server Error",
    [Status.LengthRequired]: "Length Required",
    [Status.Locked]: "Locked",
    [Status.LoopDetected]: "Loop Detected",
    [Status.MethodNotAllowed]: "Method Not Allowed",
    [Status.MisdirectedRequest]: "Misdirected Request",
    [Status.MovedPermanently]: "Moved Permanently",
    [Status.MultiStatus]: "Multi Status",
    [Status.MultipleChoices]: "Multiple Choices",
    [Status.NetworkAuthenticationRequired]: "Network Authentication Required",
    [Status.NoContent]: "No Content",
    [Status.NonAuthoritativeInfo]: "Non Authoritative Info",
    [Status.NotAcceptable]: "Not Acceptable",
    [Status.NotExtended]: "Not Extended",
    [Status.NotFound]: "Not Found",
    [Status.NotImplemented]: "Not Implemented",
    [Status.NotModified]: "Not Modified",
    [Status.OK]: "OK",
    [Status.PartialContent]: "Partial Content",
    [Status.PaymentRequired]: "Payment Required",
    [Status.PermanentRedirect]: "Permanent Redirect",
    [Status.PreconditionFailed]: "Precondition Failed",
    [Status.PreconditionRequired]: "Precondition Required",
    [Status.Processing]: "Processing",
    [Status.ProxyAuthRequired]: "Proxy Auth Required",
    [Status.RequestEntityTooLarge]: "Request Entity Too Large",
    [Status.RequestHeaderFieldsTooLarge]: "Request Header Fields Too Large",
    [Status.RequestTimeout]: "Request Timeout",
    [Status.RequestURITooLong]: "Request URI Too Long",
    [Status.RequestedRangeNotSatisfiable]: "Requested Range Not Satisfiable",
    [Status.ResetContent]: "Reset Content",
    [Status.SeeOther]: "See Other",
    [Status.ServiceUnavailable]: "Service Unavailable",
    [Status.SwitchingProtocols]: "Switching Protocols",
    [Status.Teapot]: "I'm a teapot",
    [Status.TemporaryRedirect]: "Temporary Redirect",
    [Status.TooEarly]: "Too Early",
    [Status.TooManyRequests]: "Too Many Requests",
    [Status.Unauthorized]: "Unauthorized",
    [Status.UnavailableForLegalReasons]: "Unavailable For Legal Reasons",
    [Status.UnprocessableEntity]: "Unprocessable Entity",
    [Status.UnsupportedMediaType]: "Unsupported Media Type",
    [Status.UpgradeRequired]: "Upgrade Required",
    [Status.UseProxy]: "Use Proxy",
    [Status.VariantAlsoNegotiates]: "Variant Also Negotiates"
});
class DenoStdInternalError extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
function toIMF(date) {
    function dtPad(v, lPad = 2) {
        return v.padStart(lPad, "0");
    }
    const d = dtPad(date.getUTCDate().toString());
    const h = dtPad(date.getUTCHours().toString());
    const min = dtPad(date.getUTCMinutes().toString());
    const s = dtPad(date.getUTCSeconds().toString());
    const y = date.getUTCFullYear();
    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec", 
    ];
    return `${days[date.getUTCDay()]}, ${d} ${months[date.getUTCMonth()]} ${y} ${h}:${min}:${s} GMT`;
}
const FIELD_CONTENT_REGEXP = /^(?=[\x20-\x7E]*$)[^()@<>,;:\\"\[\]?={}\s]+$/;
function toString(cookie) {
    if (!cookie.name) {
        return "";
    }
    const out = [];
    validateName(cookie.name);
    validateValue(cookie.name, cookie.value);
    out.push(`${cookie.name}=${cookie.value}`);
    if (cookie.name.startsWith("__Secure")) {
        cookie.secure = true;
    }
    if (cookie.name.startsWith("__Host")) {
        cookie.path = "/";
        cookie.secure = true;
        delete cookie.domain;
    }
    if (cookie.secure) {
        out.push("Secure");
    }
    if (cookie.httpOnly) {
        out.push("HttpOnly");
    }
    if (typeof cookie.maxAge === "number" && Number.isInteger(cookie.maxAge)) {
        assert(cookie.maxAge >= 0, "Max-Age must be an integer superior or equal to 0");
        out.push(`Max-Age=${cookie.maxAge}`);
    }
    if (cookie.domain) {
        validateDomain(cookie.domain);
        out.push(`Domain=${cookie.domain}`);
    }
    if (cookie.sameSite) {
        out.push(`SameSite=${cookie.sameSite}`);
    }
    if (cookie.path) {
        validatePath(cookie.path);
        out.push(`Path=${cookie.path}`);
    }
    if (cookie.expires) {
        const { expires  } = cookie;
        const dateString = toIMF(typeof expires === "number" ? new Date(expires) : expires);
        out.push(`Expires=${dateString}`);
    }
    if (cookie.unparsed) {
        out.push(cookie.unparsed.join("; "));
    }
    return out.join("; ");
}
function validateName(name) {
    if (name && !FIELD_CONTENT_REGEXP.test(name)) {
        throw new TypeError(`Invalid cookie name: "${name}".`);
    }
}
function validatePath(path) {
    if (path == null) {
        return;
    }
    for(let i = 0; i < path.length; i++){
        const c = path.charAt(i);
        if (c < String.fromCharCode(0x20) || c > String.fromCharCode(0x7E) || c == ";") {
            throw new Error(path + ": Invalid cookie path char '" + c + "'");
        }
    }
}
function validateValue(name, value) {
    if (value == null || name == null) return;
    for(let i = 0; i < value.length; i++){
        const c = value.charAt(i);
        if (c < String.fromCharCode(0x21) || c == String.fromCharCode(0x22) || c == String.fromCharCode(0x2c) || c == String.fromCharCode(0x3b) || c == String.fromCharCode(0x5c) || c == String.fromCharCode(0x7f)) {
            throw new Error("RFC2616 cookie '" + name + "' cannot contain character '" + c + "'");
        }
        if (c > String.fromCharCode(0x80)) {
            throw new Error("RFC2616 cookie '" + name + "' can only have US-ASCII chars as value" + c.charCodeAt(0).toString(16));
        }
    }
}
function validateDomain(domain) {
    if (domain == null) {
        return;
    }
    const char1 = domain.charAt(0);
    const charN = domain.charAt(domain.length - 1);
    if (char1 == "-" || charN == "." || charN == "-") {
        throw new Error("Invalid first/last char in cookie domain: " + domain);
    }
}
function getCookies(headers) {
    const cookie = headers.get("Cookie");
    if (cookie != null) {
        const out = {};
        const c = cookie.split(";");
        for (const kv of c){
            const [cookieKey, ...cookieVal] = kv.split("=");
            assert(cookieKey != null);
            const key = cookieKey.trim();
            out[key] = cookieVal.join("=");
        }
        return out;
    }
    return {};
}
function setCookie(headers, cookie) {
    const v = toString(cookie);
    if (v) {
        headers.append("Set-Cookie", v);
    }
}
function deleteCookie(headers, name, attributes) {
    setCookie(headers, {
        name: name,
        value: "",
        expires: new Date(0),
        ...attributes
    });
}
class MissingClientSecretError extends Error {
    constructor(){
        super("this grant requires a clientSecret to be set");
    }
}
class OAuth2ResponseError extends Error {
    error;
    errorDescription;
    errorUri;
    state;
    constructor(response){
        super(response.error_description || response.error);
        this.error = response.error;
        this.errorDescription = response.error_description;
        this.errorUri = response.error_uri;
        this.state = response.state;
    }
    static fromURLSearchParams(params) {
        const error = params.get("error");
        if (error === null) {
            throw new TypeError("error URL parameter must be set");
        }
        const response = {
            error: params.get("error")
        };
        const description = params.get("error_description");
        if (description !== null) {
            response.error_description = description;
        }
        const uri = params.get("error_uri");
        if (uri !== null) {
            response.error_uri = uri;
        }
        const state = params.get("state");
        if (state !== null) {
            response.state = state;
        }
        return new OAuth2ResponseError(response);
    }
}
class AuthorizationResponseError extends Error {
    constructor(description){
        super(`Invalid authorization response: ${description}`);
    }
}
class TokenResponseError extends Error {
    response;
    constructor(description, response){
        super(`Invalid token response: ${description}`);
        this.response = response;
    }
}
class OAuth2GrantBase {
    constructor(client){
        this.client = client;
    }
    buildRequest(baseUrl, options, overrideOptions = {}) {
        const url = this.toUrl(baseUrl);
        const clientDefaults = this.client.config.defaults?.requestOptions;
        const urlParams = {
            ...clientDefaults?.urlParams,
            ...options.urlParams ?? {},
            ...overrideOptions.urlParams ?? {}
        };
        Object.keys(urlParams).forEach((key)=>{
            url.searchParams.append(key, urlParams[key]);
        });
        const method = (overrideOptions.method ?? options.method) ?? "GET";
        return new Request(url.toString(), {
            method,
            headers: new Headers({
                ...{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                ...clientDefaults?.headers ?? {},
                ...options.headers ?? {},
                ...overrideOptions.headers ?? {}
            }),
            body: method !== 'HEAD' && method !== 'GET' && new URLSearchParams({
                ...clientDefaults?.body ?? {},
                ...options.body ?? {},
                ...overrideOptions.body ?? {}
            }).toString() || undefined
        });
    }
    toUrl(url) {
        if (typeof url === "string") {
            return new URL(url, "http://example.com");
        }
        return url;
    }
    async parseTokenResponse(response) {
        if (!response.ok) {
            throw await this.getTokenResponseError(response);
        }
        let body;
        try {
            body = await response.json();
        } catch  {
            throw new TokenResponseError("Response is not JSON encoded", response);
        }
        if (typeof body !== "object" || Array.isArray(body) || body === null) {
            throw new TokenResponseError("body is not a JSON object", response);
        }
        if (typeof body.access_token !== "string") {
            throw new TokenResponseError(body.access_token ? "access_token is not a string" : "missing access_token", response);
        }
        if (typeof body.token_type !== "string") {
            throw new TokenResponseError(body.token_type ? "token_type is not a string" : "missing token_type", response);
        }
        if (body.refresh_token !== undefined && typeof body.refresh_token !== "string") {
            throw new TokenResponseError("refresh_token is not a string", response);
        }
        if (body.expires_in !== undefined && typeof body.expires_in !== "number") {
            throw new TokenResponseError("expires_in is not a number", response);
        }
        if (body.scope !== undefined && typeof body.scope !== "string") {
            throw new TokenResponseError("scope is not a string", response);
        }
        const tokens = {
            accessToken: body.access_token,
            tokenType: body.token_type
        };
        if (body.refresh_token) {
            tokens.refreshToken = body.refresh_token;
        }
        if (body.expires_in) {
            tokens.expiresIn = body.expires_in;
        }
        if (body.scope) {
            tokens.scope = body.scope.split(" ");
        }
        return tokens;
    }
    async getTokenResponseError(response) {
        try {
            const body = await response.json();
            if (typeof body.error !== "string") {
                throw new TypeError("body should contain an error");
            }
            return new OAuth2ResponseError(body);
        } catch  {
            return new TokenResponseError(`Server returned ${response.status} and no error description was given`, response);
        }
    }
    client;
}
const base64abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/", 
];
function encode(data) {
    const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
    let result = "", i;
    const l = uint8.length;
    for(i = 2; i < l; i += 3){
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 0x0f) << 2 | uint8[i] >> 6];
        result += base64abc[uint8[i] & 0x3f];
    }
    if (i === l + 1) {
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4];
        result += "==";
    }
    if (i === l) {
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}
function encodeUrlSafe(data) {
    return encode(data).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
async function sha256(str) {
    const bytes = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return hash;
}
function getRandomBytes(length) {
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);
    return randomBytes;
}
async function createPkceChallenge() {
    const randomBytes = _internals.getRandomBytes(32);
    const codeVerifier = encodeUrlSafe(randomBytes);
    const hash = await sha256(codeVerifier);
    const codeChallenge = encodeUrlSafe(hash);
    return {
        codeVerifier,
        codeChallenge,
        codeChallengeMethod: "S256"
    };
}
const _internals = {
    getRandomBytes
};
class AuthorizationCodeGrant extends OAuth2GrantBase {
    constructor(client){
        super(client);
    }
    async getAuthorizationUri(options = {}) {
        const params = new URLSearchParams();
        params.set("response_type", "code");
        params.set("client_id", this.client.config.clientId);
        if (typeof this.client.config.redirectUri === "string") {
            params.set("redirect_uri", this.client.config.redirectUri);
        }
        const scope = options.scope ?? this.client.config.defaults?.scope;
        if (scope) {
            params.set("scope", Array.isArray(scope) ? scope.join(" ") : scope);
        }
        if (options.state) {
            params.set("state", options.state);
        }
        if (options.disablePkce === true) {
            return {
                uri: new URL(`?${params}`, this.client.config.authorizationEndpointUri)
            };
        }
        const challenge = await createPkceChallenge();
        params.set("code_challenge", challenge.codeChallenge);
        params.set("code_challenge_method", challenge.codeChallengeMethod);
        return {
            uri: new URL(`?${params}`, this.client.config.authorizationEndpointUri),
            codeVerifier: challenge.codeVerifier
        };
    }
    async getToken(authResponseUri, options = {}) {
        const validated = await this.validateAuthorizationResponse(this.toUrl(authResponseUri), options);
        const request = this.buildAccessTokenRequest(validated.code, options.codeVerifier, options.requestOptions);
        const accessTokenResponse = await fetch(request);
        return this.parseTokenResponse(accessTokenResponse);
    }
    async validateAuthorizationResponse(url, options) {
        if (typeof this.client.config.redirectUri === "string") {
            const expectedUrl = new URL(this.client.config.redirectUri);
            if (typeof url.pathname === "string" && url.pathname !== expectedUrl.pathname) {
                throw new AuthorizationResponseError(`Redirect path should match configured path, but got: ${url.pathname}`);
            }
        }
        if (!url.search || !url.search.substr(1)) {
            throw new AuthorizationResponseError(`URI does not contain callback parameters: ${url}`);
        }
        const params = new URLSearchParams(url.search || "");
        if (params.get("error") !== null) {
            throw OAuth2ResponseError.fromURLSearchParams(params);
        }
        const code = params.get("code") || "";
        if (!code) {
            throw new AuthorizationResponseError("Missing code, unable to request token");
        }
        const state = params.get("state");
        const stateValidator = options.stateValidator || options.state && ((s)=>s === options.state) || this.client.config.defaults?.stateValidator;
        if (stateValidator && !await stateValidator(state)) {
            if (state === null) {
                throw new AuthorizationResponseError("Missing state");
            } else {
                throw new AuthorizationResponseError(`Invalid state: ${params.get("state")}`);
            }
        }
        if (state) {
            return {
                code,
                state
            };
        }
        return {
            code
        };
    }
    buildAccessTokenRequest(code, codeVerifier, requestOptions = {}) {
        const body = {
            "grant_type": "authorization_code",
            code
        };
        const headers = {
            "Accept": "application/json"
        };
        if (typeof codeVerifier === "string") {
            body.code_verifier = codeVerifier;
        }
        if (typeof this.client.config.redirectUri === "string") {
            body.redirect_uri = this.client.config.redirectUri;
        }
        if (typeof this.client.config.clientSecret === "string") {
            const { clientId , clientSecret  } = this.client.config;
            headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
        } else {
            body.client_id = this.client.config.clientId;
        }
        return this.buildRequest(this.client.config.tokenUri, {
            method: "POST",
            headers,
            body
        }, requestOptions);
    }
}
class ClientCredentialsGrant extends OAuth2GrantBase {
    constructor(client){
        super(client);
    }
    async getToken(options = {}) {
        const request = this.buildTokenRequest(options);
        const accessTokenResponse = await fetch(request);
        return this.parseTokenResponse(accessTokenResponse);
    }
    buildTokenRequest(options) {
        const { clientId , clientSecret  } = this.client.config;
        if (typeof clientSecret !== "string") {
            throw new MissingClientSecretError();
        }
        const body = {
            "grant_type": "client_credentials"
        };
        const headers = {
            "Accept": "application/json",
            "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        };
        const scope = options.scope ?? this.client.config.defaults?.scope;
        if (scope) {
            if (Array.isArray(scope)) {
                body.scope = scope.join(" ");
            } else {
                body.scope = scope;
            }
        }
        return this.buildRequest(this.client.config.tokenUri, {
            method: "POST",
            headers,
            body
        }, options.requestOptions);
    }
}
class ImplicitGrant extends OAuth2GrantBase {
    constructor(client){
        super(client);
    }
    getAuthorizationUri(options = {}) {
        const params = new URLSearchParams();
        params.set("response_type", "token");
        params.set("client_id", this.client.config.clientId);
        if (typeof this.client.config.redirectUri === "string") {
            params.set("redirect_uri", this.client.config.redirectUri);
        }
        const scope = options.scope ?? this.client.config.defaults?.scope;
        if (scope) {
            params.set("scope", Array.isArray(scope) ? scope.join(" ") : scope);
        }
        if (options.state) {
            params.set("state", options.state);
        }
        return new URL(`?${params}`, this.client.config.authorizationEndpointUri);
    }
    async getToken(authResponseUri, options = {}) {
        const url = authResponseUri instanceof URL ? authResponseUri : new URL(authResponseUri);
        if (typeof this.client.config.redirectUri === "string") {
            const expectedUrl = new URL(this.client.config.redirectUri);
            if (typeof url.pathname === "string" && url.pathname !== expectedUrl.pathname) {
                throw new AuthorizationResponseError(`redirect path should match configured path, but got: ${url.pathname}`);
            }
        }
        if (!url.hash || !url.hash.substring(1)) {
            throw new AuthorizationResponseError(`URI does not contain callback fragment parameters: ${url}`);
        }
        const params = new URLSearchParams(url.hash.substring(1));
        if (params.get("error") !== null) {
            throw OAuth2ResponseError.fromURLSearchParams(params);
        }
        const accessToken = params.get("access_token");
        if (!accessToken) {
            throw new AuthorizationResponseError("missing access_token");
        }
        const tokenType = params.get("token_type");
        if (!tokenType) {
            throw new AuthorizationResponseError("missing token_type");
        }
        const state = params.get("state");
        const stateValidator = options.stateValidator || options.state && ((s)=>s === options.state) || this.client.config.defaults?.stateValidator;
        const tokens = {
            accessToken,
            tokenType
        };
        const expiresInRaw = params.get("expires_in");
        if (expiresInRaw) {
            if (!expiresInRaw.match(/^\d+$/)) {
                throw new AuthorizationResponseError("expires_in is not a number");
            }
            tokens.expiresIn = parseInt(expiresInRaw, 10);
        }
        if (stateValidator && !await stateValidator(state)) {
            if (state === null) {
                throw new AuthorizationResponseError("missing state");
            } else {
                throw new AuthorizationResponseError(`invalid state: ${params.get("state")}`);
            }
        }
        const scope = params.get("scope");
        if (scope) {
            tokens.scope = scope.split(" ");
        }
        return tokens;
    }
}
class RefreshTokenGrant extends OAuth2GrantBase {
    constructor(client){
        super(client);
    }
    async refresh(refreshToken, options = {}) {
        const body = {
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        };
        if (typeof options?.scope === "string") {
            body.scope = options.scope;
        } else if (Array.isArray(options?.scope)) {
            body.scope = options.scope.join(" ");
        }
        const headers = {};
        if (typeof this.client.config.clientSecret === "string") {
            const { clientId , clientSecret  } = this.client.config;
            headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
        }
        const req = this.buildRequest(this.client.config.tokenUri, {
            method: "POST",
            body,
            headers
        }, options.requestOptions);
        const accessTokenResponse = await fetch(req);
        return this.parseTokenResponse(accessTokenResponse);
    }
}
class ResourceOwnerPasswordCredentialsGrant extends OAuth2GrantBase {
    constructor(client){
        super(client);
    }
    async getToken(options) {
        const request = this.buildTokenRequest(options);
        const accessTokenResponse = await fetch(request);
        return this.parseTokenResponse(accessTokenResponse);
    }
    buildTokenRequest(options) {
        const body = {
            "grant_type": "password",
            username: options.username,
            password: options.password
        };
        const headers = {
            "Accept": "application/json"
        };
        const scope = options.scope ?? this.client.config.defaults?.scope;
        if (scope) {
            if (Array.isArray(scope)) {
                body.scope = scope.join(" ");
            } else {
                body.scope = scope;
            }
        }
        if (typeof this.client.config.clientSecret === "string") {
            const { clientId , clientSecret  } = this.client.config;
            headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
        } else {
            body.client_id = this.client.config.clientId;
        }
        return this.buildRequest(this.client.config.tokenUri, {
            method: "POST",
            headers,
            body
        }, options.requestOptions);
    }
}
class OAuth2Client {
    code;
    implicit;
    ropc;
    clientCredentials;
    refreshToken;
    constructor(config){
        this.config = config;
        this.code = new AuthorizationCodeGrant(this);
        this.implicit = new ImplicitGrant(this);
        this.ropc = new ResourceOwnerPasswordCredentialsGrant(this);
        this.clientCredentials = new ClientCredentialsGrant(this);
        this.refreshToken = new RefreshTokenGrant(this);
    }
    config;
}
function createDiscordOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("DISCORD_CLIENT_ID"),
        clientSecret: Deno.env.get("DISCORD_CLIENT_SECRET"),
        authorizationEndpointUri: "https://discord.com/oauth2/authorize",
        tokenUri: "https://discord.com/api/oauth2/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createDiscordOAuth2Client as createDiscordOAuth2Client };
function createDropboxOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("DROPBOX_CLIENT_ID"),
        clientSecret: Deno.env.get("DROPBOX_CLIENT_SECRET"),
        authorizationEndpointUri: "https://www.dropbox.com/oauth2/authorize",
        tokenUri: "https://api.dropboxapi.com/oauth2/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createDropboxOAuth2Client as createDropboxOAuth2Client };
function createFacebookOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("FACEBOOK_CLIENT_ID"),
        clientSecret: Deno.env.get("FACEBOOK_CLIENT_SECRET"),
        authorizationEndpointUri: "https://www.facebook.com/v17.0/dialog/oauth",
        tokenUri: "https://graph.facebook.com/v17.0/oauth/access_token",
        ...additionalOAuth2ClientConfig
    });
}
export { createFacebookOAuth2Client as createFacebookOAuth2Client };
function createGitHubOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("GITHUB_CLIENT_ID"),
        clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET"),
        authorizationEndpointUri: "https://github.com/login/oauth/authorize",
        tokenUri: "https://github.com/login/oauth/access_token",
        ...additionalOAuth2ClientConfig
    });
}
export { createGitHubOAuth2Client as createGitHubOAuth2Client };
function createGitLabOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("GITLAB_CLIENT_ID"),
        clientSecret: Deno.env.get("GITLAB_CLIENT_SECRET"),
        authorizationEndpointUri: "https://gitlab.com/oauth/authorize",
        tokenUri: "https://gitlab.com/oauth/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createGitLabOAuth2Client as createGitLabOAuth2Client };
function createGoogleOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("GOOGLE_CLIENT_ID"),
        clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET"),
        authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenUri: "https://oauth2.googleapis.com/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createGoogleOAuth2Client as createGoogleOAuth2Client };
function createNotionOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("NOTION_CLIENT_ID"),
        clientSecret: Deno.env.get("NOTION_CLIENT_SECRET"),
        authorizationEndpointUri: "https://api.notion.com/v1/oauth/authorize?owner=user",
        tokenUri: "https://api.notion.com/v1/oauth/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createNotionOAuth2Client as createNotionOAuth2Client };
function createPatreonOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("PATREON_CLIENT_ID"),
        clientSecret: Deno.env.get("PATREON_CLIENT_SECRET"),
        authorizationEndpointUri: "https://www.patreon.com/oauth2/authorize",
        tokenUri: "https://www.patreon.com/api/oauth2/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createPatreonOAuth2Client as createPatreonOAuth2Client };
function createSlackOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("SLACK_CLIENT_ID"),
        clientSecret: Deno.env.get("SLACK_CLIENT_SECRET"),
        authorizationEndpointUri: "https://slack.com/oauth/v2/authorize",
        tokenUri: "https://slack.com/api/oauth.v2.access",
        ...additionalOAuth2ClientConfig
    });
}
export { createSlackOAuth2Client as createSlackOAuth2Client };
function createSpotifyOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("SPOTIFY_CLIENT_ID"),
        clientSecret: Deno.env.get("SPOTIFY_CLIENT_SECRET"),
        authorizationEndpointUri: "https://accounts.spotify.com/authorize",
        tokenUri: "https://accounts.spotify.com/api/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createSpotifyOAuth2Client as createSpotifyOAuth2Client };
function createTwitterOAuth2Client(additionalOAuth2ClientConfig) {
    return new OAuth2Client({
        clientId: Deno.env.get("TWITTER_CLIENT_ID"),
        clientSecret: Deno.env.get("TWITTER_CLIENT_SECRET"),
        authorizationEndpointUri: "https://twitter.com/i/oauth2/authorize",
        tokenUri: "https://api.twitter.com/2/oauth2/token",
        ...additionalOAuth2ClientConfig
    });
}
export { createTwitterOAuth2Client as createTwitterOAuth2Client };
const OAUTH_COOKIE_NAME = "oauth-session";
const SITE_COOKIE_NAME = "site-session";
function isSecure(requestUrl) {
    return new URL(requestUrl).protocol === "https:";
}
function getCookieName(name, isSecure) {
    return isSecure ? "__Host-" + name : name;
}
const COOKIE_BASE = {
    path: "/",
    httpOnly: true,
    maxAge: 7776000,
    sameSite: "Lax"
};
const KV_PATH_KEY = "KV_PATH";
let path = undefined;
if ((await Deno.permissions.query({
    name: "env",
    variable: KV_PATH_KEY
})).state === "granted") {
    path = Deno.env.get(KV_PATH_KEY);
}
const kv = await Deno.openKv(path);
addEventListener("beforeunload", async ()=>{
    await kv.close();
});
const OAUTH_SESSION_PREFIX = "oauth_sessions";
async function getOAuthSession(oauthSessionId) {
    const result = await kv.get([
        OAUTH_SESSION_PREFIX,
        oauthSessionId, 
    ]);
    return result.value;
}
async function setOAuthSession(oauthSessionId, oauthSession) {
    await kv.set([
        OAUTH_SESSION_PREFIX,
        oauthSessionId
    ], oauthSession);
}
async function deleteOAuthSession(oauthSessionId) {
    await kv.delete([
        OAUTH_SESSION_PREFIX,
        oauthSessionId
    ]);
}
const STORED_TOKENS_BY_SESSION_PREFIX = "stored_tokens_by_session";
function toStoredTokens(tokens) {
    if (tokens.expiresIn === undefined) return tokens;
    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1e3);
    const storedTokens = {
        ...tokens
    };
    delete storedTokens.expiresIn;
    return {
        ...storedTokens,
        expiresAt
    };
}
function toTokens(storedTokens) {
    if (storedTokens.expiresAt === undefined) return storedTokens;
    const expiresIn = (Date.now() - Date.parse(storedTokens.expiresAt.toString())) / 1e3;
    const tokens = {
        ...storedTokens
    };
    delete tokens.expiresAt;
    return {
        ...tokens,
        expiresIn
    };
}
async function getTokensBySession(sessionId, consistency) {
    const result = await kv.get([
        STORED_TOKENS_BY_SESSION_PREFIX,
        sessionId, 
    ], {
        consistency
    });
    return result.value !== null ? toTokens(result.value) : null;
}
async function setTokensBySession(sessionId, tokens) {
    const storedTokens = toStoredTokens(tokens);
    await kv.set([
        STORED_TOKENS_BY_SESSION_PREFIX,
        sessionId
    ], storedTokens);
}
async function deleteStoredTokensBySession(sessionId) {
    await kv.delete([
        STORED_TOKENS_BY_SESSION_PREFIX,
        sessionId
    ]);
}
function redirect(location) {
    return new Response(null, {
        headers: {
            location
        },
        status: Status.Found
    });
}
function assert1(cond, message) {
    if (!cond) {
        throw new Error(message);
    }
}
async function getSessionAccessToken(oauth2Client, sessionId) {
    const tokens = await getTokensBySession(sessionId);
    if (tokens === null) return null;
    if (tokens.refreshToken === undefined || tokens.expiresIn && tokens.expiresIn < 5 * 1e3) {
        return tokens.accessToken;
    }
    const newTokens = await oauth2Client.refreshToken.refresh(tokens.refreshToken);
    await setTokensBySession(sessionId, newTokens);
    return newTokens.accessToken;
}
export { getSessionAccessToken as getSessionAccessToken };
async function handleCallback(request, oauth2Client, redirectUrl = "/") {
    const oauthCookieName = getCookieName(OAUTH_COOKIE_NAME, isSecure(request.url));
    const oauthSessionId = getCookies(request.headers)[oauthCookieName];
    assert1(oauthSessionId, `OAuth 2.0 cookie not found`);
    const oauthSession = await getOAuthSession(oauthSessionId);
    assert1(oauthSession, `OAuth 2.0 session ${oauthSessionId} entry not found`);
    await deleteOAuthSession(oauthSessionId);
    const tokens = await oauth2Client.code.getToken(request.url, oauthSession);
    const sessionId = crypto.randomUUID();
    await setTokensBySession(sessionId, tokens);
    const response = redirect(redirectUrl);
    setCookie(response.headers, {
        ...COOKIE_BASE,
        name: getCookieName(SITE_COOKIE_NAME, isSecure(request.url)),
        value: sessionId,
        secure: isSecure(request.url)
    });
    return {
        response,
        sessionId,
        accessToken: tokens.accessToken
    };
}
export { handleCallback as handleCallback };
async function getSessionId(request) {
    const cookieName = getCookieName(SITE_COOKIE_NAME, isSecure(request.url));
    const sessionId = getCookies(request.headers)[cookieName];
    if (sessionId === undefined) return null;
    if (await getTokensBySession(sessionId, "eventual") || await getTokensBySession(sessionId)) {
        return sessionId;
    }
    return null;
}
export { getSessionId as getSessionId };
async function signIn(request, oauth2Client) {
    const state = crypto.randomUUID();
    const { uri , codeVerifier  } = await oauth2Client.code.getAuthorizationUri({
        state
    });
    const oauthSessionId = crypto.randomUUID();
    await setOAuthSession(oauthSessionId, {
        state,
        codeVerifier
    });
    const response = redirect(uri.toString());
    setCookie(response.headers, {
        ...COOKIE_BASE,
        name: getCookieName(OAUTH_COOKIE_NAME, isSecure(request.url)),
        value: oauthSessionId,
        secure: isSecure(request.url),
        maxAge: 10 * 60
    });
    return response;
}
export { signIn as signIn };
async function signOut(request, redirectUrl = "/") {
    const sessionId = await getSessionId(request);
    if (sessionId === null) return redirect(redirectUrl);
    await deleteStoredTokensBySession(sessionId);
    const response = redirect(redirectUrl);
    const cookieName = getCookieName(SITE_COOKIE_NAME, isSecure(request.url));
    deleteCookie(response.headers, cookieName, {
        path: "/"
    });
    return response;
}
export { signOut as signOut };
