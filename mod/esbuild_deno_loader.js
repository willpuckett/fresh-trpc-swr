// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const osType = (()=>{
    const { Deno: Deno1  } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
const CHAR_FORWARD_SLASH = 47;
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
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
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        const { Deno: Deno1  } = globalThis;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno1.cwd();
        } else {
            if (typeof Deno1?.env?.get !== "function" || typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = resolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function dirname(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path.slice(0, end);
}
function basename(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                    end = firstNonSlashEnd;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                    }
                }
            }
        }
        if (end === -1) return "";
        if (start === end) end = firstNonSlashEnd;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= start; --i){
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname(path) {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod = {
    sep: sep,
    delimiter: delimiter,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    toNamespacedPath: toNamespacedPath,
    dirname: dirname,
    basename: basename,
    extname: extname,
    format: format,
    parse: parse,
    fromFileUrl: fromFileUrl,
    toFileUrl: toFileUrl
};
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            const { Deno: Deno1  } = globalThis;
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
        }
        assertPath(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const isAbsolute = path.charCodeAt(0) === 47;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute) return `/${path}`;
    return path;
}
function isAbsolute1(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
}
function join1(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path) {
    return path;
}
function dirname1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const hasRoot = path.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path.length - 1; i >= 1; --i){
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
}
function basename1(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (isPosixPathSeparator(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                    end = firstNonSlashEnd;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                    }
                }
            }
        }
        if (end === -1) return "";
        if (start === end) end = firstNonSlashEnd;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= 0; --i){
            if (isPosixPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname1(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format1(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse1(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute = path.charCodeAt(0) === 47;
    let start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path) {
    if (!isAbsolute1(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod1 = {
    sep: sep1,
    delimiter: delimiter1,
    resolve: resolve1,
    normalize: normalize1,
    isAbsolute: isAbsolute1,
    join: join1,
    relative: relative1,
    toNamespacedPath: toNamespacedPath1,
    dirname: dirname1,
    basename: basename1,
    extname: extname1,
    format: format1,
    parse: parse1,
    fromFileUrl: fromFileUrl1,
    toFileUrl: toFileUrl1
};
const path = isWindows ? mod : mod1;
const { join: join2 , normalize: normalize2  } = path;
const path1 = isWindows ? mod : mod1;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format2 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join3 , normalize: normalize3 , parse: parse2 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2  } = path1;
new Deno.errors.AlreadyExists("dest already exists.");
var EOL;
(function(EOL) {
    EOL["LF"] = "\n";
    EOL["CRLF"] = "\r\n";
})(EOL || (EOL = {}));
function parse3(text, { allowTrailingComma =true  } = {}) {
    if (new.target) {
        throw new TypeError("parse is not a constructor");
    }
    return new JSONCParser(text, {
        allowTrailingComma
    }).parse();
}
var tokenType;
(function(tokenType) {
    tokenType[tokenType["beginObject"] = 0] = "beginObject";
    tokenType[tokenType["endObject"] = 1] = "endObject";
    tokenType[tokenType["beginArray"] = 2] = "beginArray";
    tokenType[tokenType["endArray"] = 3] = "endArray";
    tokenType[tokenType["nameSeparator"] = 4] = "nameSeparator";
    tokenType[tokenType["valueSeparator"] = 5] = "valueSeparator";
    tokenType[tokenType["nullOrTrueOrFalseOrNumber"] = 6] = "nullOrTrueOrFalseOrNumber";
    tokenType[tokenType["string"] = 7] = "string";
})(tokenType || (tokenType = {}));
const originalJSONParse = globalThis.JSON.parse;
class JSONCParser {
    #whitespace = new Set(" \t\r\n");
    #numberEndToken = new Set([
        ..."[]{}:,/",
        ...this.#whitespace
    ]);
    #text;
    #length;
    #tokenized;
    #options;
    constructor(text, options){
        this.#text = `${text}`;
        this.#length = this.#text.length;
        this.#tokenized = this.#tokenize();
        this.#options = options;
    }
    parse() {
        const token = this.#getNext();
        const res = this.#parseJSONValue(token);
        const { done , value  } = this.#tokenized.next();
        if (!done) {
            throw new SyntaxError(buildErrorMessage(value));
        }
        return res;
    }
    #getNext() {
        const { done , value  } = this.#tokenized.next();
        if (done) {
            throw new SyntaxError("Unexpected end of JSONC input");
        }
        return value;
    }
    *#tokenize() {
        for(let i = 0; i < this.#length; i++){
            if (this.#whitespace.has(this.#text[i])) {
                continue;
            }
            if (this.#text[i] === "/" && this.#text[i + 1] === "*") {
                i += 2;
                let hasEndOfComment = false;
                for(; i < this.#length; i++){
                    if (this.#text[i] === "*" && this.#text[i + 1] === "/") {
                        hasEndOfComment = true;
                        break;
                    }
                }
                if (!hasEndOfComment) {
                    throw new SyntaxError("Unexpected end of JSONC input");
                }
                i++;
                continue;
            }
            if (this.#text[i] === "/" && this.#text[i + 1] === "/") {
                i += 2;
                for(; i < this.#length; i++){
                    if (this.#text[i] === "\n" || this.#text[i] === "\r") {
                        break;
                    }
                }
                continue;
            }
            switch(this.#text[i]){
                case "{":
                    yield {
                        type: tokenType.beginObject,
                        position: i
                    };
                    break;
                case "}":
                    yield {
                        type: tokenType.endObject,
                        position: i
                    };
                    break;
                case "[":
                    yield {
                        type: tokenType.beginArray,
                        position: i
                    };
                    break;
                case "]":
                    yield {
                        type: tokenType.endArray,
                        position: i
                    };
                    break;
                case ":":
                    yield {
                        type: tokenType.nameSeparator,
                        position: i
                    };
                    break;
                case ",":
                    yield {
                        type: tokenType.valueSeparator,
                        position: i
                    };
                    break;
                case '"':
                    {
                        const startIndex = i;
                        let shouldEscapeNext = false;
                        i++;
                        for(; i < this.#length; i++){
                            if (this.#text[i] === '"' && !shouldEscapeNext) {
                                break;
                            }
                            shouldEscapeNext = this.#text[i] === "\\" && !shouldEscapeNext;
                        }
                        yield {
                            type: tokenType.string,
                            sourceText: this.#text.substring(startIndex, i + 1),
                            position: startIndex
                        };
                        break;
                    }
                default:
                    {
                        const startIndex = i;
                        for(; i < this.#length; i++){
                            if (this.#numberEndToken.has(this.#text[i])) {
                                break;
                            }
                        }
                        i--;
                        yield {
                            type: tokenType.nullOrTrueOrFalseOrNumber,
                            sourceText: this.#text.substring(startIndex, i + 1),
                            position: startIndex
                        };
                    }
            }
        }
    }
    #parseJSONValue(value) {
        switch(value.type){
            case tokenType.beginObject:
                return this.#parseObject();
            case tokenType.beginArray:
                return this.#parseArray();
            case tokenType.nullOrTrueOrFalseOrNumber:
                return this.#parseNullOrTrueOrFalseOrNumber(value);
            case tokenType.string:
                return this.#parseString(value);
            default:
                throw new SyntaxError(buildErrorMessage(value));
        }
    }
    #parseObject() {
        const target = {};
        for(let isFirst = true;; isFirst = false){
            const token1 = this.#getNext();
            if ((isFirst || this.#options.allowTrailingComma) && token1.type === tokenType.endObject) {
                return target;
            }
            if (token1.type !== tokenType.string) {
                throw new SyntaxError(buildErrorMessage(token1));
            }
            const key = this.#parseString(token1);
            const token2 = this.#getNext();
            if (token2.type !== tokenType.nameSeparator) {
                throw new SyntaxError(buildErrorMessage(token2));
            }
            const token3 = this.#getNext();
            Object.defineProperty(target, key, {
                value: this.#parseJSONValue(token3),
                writable: true,
                enumerable: true,
                configurable: true
            });
            const token4 = this.#getNext();
            if (token4.type === tokenType.endObject) {
                return target;
            }
            if (token4.type !== tokenType.valueSeparator) {
                throw new SyntaxError(buildErrorMessage(token4));
            }
        }
    }
    #parseArray() {
        const target = [];
        for(let isFirst = true;; isFirst = false){
            const token1 = this.#getNext();
            if ((isFirst || this.#options.allowTrailingComma) && token1.type === tokenType.endArray) {
                return target;
            }
            target.push(this.#parseJSONValue(token1));
            const token2 = this.#getNext();
            if (token2.type === tokenType.endArray) {
                return target;
            }
            if (token2.type !== tokenType.valueSeparator) {
                throw new SyntaxError(buildErrorMessage(token2));
            }
        }
    }
    #parseString(value) {
        let parsed;
        try {
            parsed = originalJSONParse(value.sourceText);
        } catch  {
            throw new SyntaxError(buildErrorMessage(value));
        }
        assert(typeof parsed === "string");
        return parsed;
    }
    #parseNullOrTrueOrFalseOrNumber(value) {
        if (value.sourceText === "null") {
            return null;
        }
        if (value.sourceText === "true") {
            return true;
        }
        if (value.sourceText === "false") {
            return false;
        }
        let parsed;
        try {
            parsed = originalJSONParse(value.sourceText);
        } catch  {
            throw new SyntaxError(buildErrorMessage(value));
        }
        assert(typeof parsed === "number");
        return parsed;
    }
}
function buildErrorMessage({ type , sourceText , position  }) {
    let token = "";
    switch(type){
        case tokenType.beginObject:
            token = "{";
            break;
        case tokenType.endObject:
            token = "}";
            break;
        case tokenType.beginArray:
            token = "[";
            break;
        case tokenType.endArray:
            token = "]";
            break;
        case tokenType.nameSeparator:
            token = ":";
            break;
        case tokenType.valueSeparator:
            token = ",";
            break;
        case tokenType.nullOrTrueOrFalseOrNumber:
        case tokenType.string:
            token = 30 < sourceText.length ? `${sourceText.slice(0, 30)}...` : sourceText;
            break;
        default:
            throw new Error("unreachable");
    }
    return `Unexpected token ${token} in JSONC at position ${position}`;
}
const mod2 = {
    parse: parse3
};
const lookup = [];
const revLookup = [];
const code = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
for(let i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
function encodeChunk(uint8, start, end) {
    let tmp;
    const output = [];
    for(let i = start; i < end; i += 5){
        tmp = uint8[i] << 16 & 0xff0000 | uint8[i + 1] << 8 & 0xff00 | uint8[i + 2] & 0xff;
        output.push(lookup[tmp >> 19 & 0x1f]);
        output.push(lookup[tmp >> 14 & 0x1f]);
        output.push(lookup[tmp >> 9 & 0x1f]);
        output.push(lookup[tmp >> 4 & 0x1f]);
        tmp = (tmp & 0xf) << 16 | uint8[i + 3] << 8 & 0xff00 | uint8[i + 4] & 0xff;
        output.push(lookup[tmp >> 15 & 0x1f]);
        output.push(lookup[tmp >> 10 & 0x1f]);
        output.push(lookup[tmp >> 5 & 0x1f]);
        output.push(lookup[tmp & 0x1f]);
    }
    return output.join("");
}
function encode(uint8) {
    let tmp;
    const len = uint8.length;
    const extraBytes = len % 5;
    const parts = [];
    const maxChunkLength = 16385;
    const len2 = len - extraBytes;
    for(let i = 0; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + 16385 > len2 ? len2 : i + 16385));
    }
    if (extraBytes === 4) {
        tmp = (uint8[len2] & 0xff) << 16 | (uint8[len2 + 1] & 0xff) << 8 | uint8[len2 + 2] & 0xff;
        parts.push(lookup[tmp >> 19 & 0x1f]);
        parts.push(lookup[tmp >> 14 & 0x1f]);
        parts.push(lookup[tmp >> 9 & 0x1f]);
        parts.push(lookup[tmp >> 4 & 0x1f]);
        tmp = (tmp & 0xf) << 11 | uint8[len2 + 3] << 3;
        parts.push(lookup[tmp >> 10 & 0x1f]);
        parts.push(lookup[tmp >> 5 & 0x1f]);
        parts.push(lookup[tmp & 0x1f]);
        parts.push("=");
    } else if (extraBytes === 3) {
        tmp = (uint8[len2] & 0xff) << 17 | (uint8[len2 + 1] & 0xff) << 9 | (uint8[len2 + 2] & 0xff) << 1;
        parts.push(lookup[tmp >> 20 & 0x1f]);
        parts.push(lookup[tmp >> 15 & 0x1f]);
        parts.push(lookup[tmp >> 10 & 0x1f]);
        parts.push(lookup[tmp >> 5 & 0x1f]);
        parts.push(lookup[tmp & 0x1f]);
        parts.push("===");
    } else if (extraBytes === 2) {
        tmp = (uint8[len2] & 0xff) << 12 | (uint8[len2 + 1] & 0xff) << 4;
        parts.push(lookup[tmp >> 15 & 0x1f]);
        parts.push(lookup[tmp >> 10 & 0x1f]);
        parts.push(lookup[tmp >> 5 & 0x1f]);
        parts.push(lookup[tmp & 0x1f]);
        parts.push("====");
    } else if (extraBytes === 1) {
        tmp = (uint8[len2] & 0xff) << 2;
        parts.push(lookup[tmp >> 5 & 0x1f]);
        parts.push(lookup[tmp & 0x1f]);
        parts.push("======");
    }
    return parts.join("");
}
function isObject(object) {
    return typeof object == "object" && object !== null && object.constructor === Object;
}
function sortObject(normalized) {
    const sorted = {};
    const sortedKeys = Object.keys(normalized).sort((a, b)=>b.length - a.length);
    for (const key of sortedKeys){
        sorted[key] = normalized[key];
    }
    return sorted;
}
function isImportMap(importMap) {
    return isObject(importMap) && (importMap.imports !== undefined ? isImports(importMap.imports) : true) && (importMap.scopes !== undefined ? isScopes(importMap.scopes) : true);
}
function isImports(importsMap) {
    return isObject(importsMap);
}
function isScopes(scopes) {
    return isObject(scopes) && Object.values(scopes).every((value)=>isSpecifierMap(value));
}
function isSpecifierMap(specifierMap) {
    return isObject(specifierMap);
}
function isURL(url) {
    try {
        new URL(url);
        return true;
    } catch  {
        return false;
    }
}
function sortAndNormalizeSpecifierMap(originalMap, baseURL) {
    const normalized = {};
    for (const [specifierKey, value] of Object.entries(originalMap)){
        const normalizedSpecifierKey = normalizeSpecifierKey(specifierKey, baseURL);
        if (normalizedSpecifierKey === null) continue;
        if (typeof value !== "string") {
            console.warn(`addresses need to be strings.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        const addressURL = parseUrlLikeImportSpecifier(value, baseURL);
        if (addressURL === null) {
            console.warn(`the address was invalid.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        if (specifierKey.endsWith("/") && !serializeURL(addressURL).endsWith("/")) {
            console.warn(`an invalid address was given for the specifier key specifierKey; since specifierKey ended in a slash, the address needs to as well.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        normalized[normalizedSpecifierKey] = serializeURL(addressURL);
    }
    return sortObject(normalized);
}
function serializeURL(url) {
    return url.href;
}
function sortAndNormalizeScopes(originalMap, baseURL) {
    const normalized = {};
    for (const [scopePrefix, potentialSpecifierMap] of Object.entries(originalMap)){
        if (!isSpecifierMap(potentialSpecifierMap)) {
            throw new TypeError(`the value of the scope with prefix scopePrefix needs to be an object.`);
        }
        let scopePrefixURL;
        try {
            scopePrefixURL = new URL(scopePrefix, baseURL);
        } catch  {
            console.warn(`the scope prefix URL was not parseable.`);
            continue;
        }
        const normalizedScopePrefix = serializeURL(scopePrefixURL);
        normalized[normalizedScopePrefix] = sortAndNormalizeSpecifierMap(potentialSpecifierMap, baseURL);
    }
    const sorted = {};
    for (const key of Object.keys(normalized)){
        sorted[key] = sortObject(normalized[key]);
    }
    return sortObject(sorted);
}
function normalizeSpecifierKey(specifierKey, baseURL) {
    if (!specifierKey.length) {
        console.warn("specifier key cannot be an empty string.");
        return null;
    }
    const url = parseUrlLikeImportSpecifier(specifierKey, baseURL);
    if (url !== null) {
        return serializeURL(url);
    }
    return specifierKey;
}
function parseUrlLikeImportSpecifier(specifier, baseURL) {
    if (baseURL && (specifier.startsWith("/") || specifier.startsWith("./") || specifier.startsWith("../"))) {
        try {
            const url = new URL(specifier, baseURL);
            return url;
        } catch  {
            return null;
        }
    }
    try {
        const url = new URL(specifier);
        return url;
    } catch  {
        return null;
    }
}
const specialSchemes = [
    "ftp",
    "file",
    "http",
    "https",
    "ws",
    "wss"
];
function isSpecial(asURL) {
    return specialSchemes.some((scheme)=>serializeURL(asURL).startsWith(scheme));
}
function resolveImportsMatch(normalizedSpecifier, asURL, specifierMap) {
    for (const [specifierKey, resolutionResult] of Object.entries(specifierMap)){
        if (specifierKey === normalizedSpecifier) {
            if (resolutionResult === null) {
                throw new TypeError(`resolution of specifierKey was blocked by a null entry.`);
            }
            if (!isURL(resolutionResult)) {
                throw new TypeError(`resolutionResult must be an URL.`);
            }
            return resolutionResult;
        } else if (specifierKey.endsWith("/") && normalizedSpecifier.startsWith(specifierKey) && (asURL === null || isSpecial(asURL))) {
            if (resolutionResult === null) {
                throw new TypeError(`resolution of specifierKey was blocked by a null entry.`);
            }
            if (!isURL(resolutionResult)) {
                throw new TypeError(`resolutionResult must be an URL.`);
            }
            const afterPrefix = normalizedSpecifier.slice(specifierKey.length);
            if (!resolutionResult.endsWith("/")) {
                throw new TypeError(`resolutionResult does not end with "/"`);
            }
            try {
                const url = new URL(afterPrefix, resolutionResult);
                if (!isURL(url)) {
                    throw new TypeError(`url must be an URL.`);
                }
                if (!serializeURL(url).startsWith(resolutionResult)) {
                    throw new TypeError(`resolution of normalizedSpecifier was blocked due to it backtracking above its prefix specifierKey.`);
                }
                return serializeURL(url);
            } catch  {
                throw new TypeError(`resolution of normalizedSpecifier was blocked since the afterPrefix portion could not be URL-parsed relative to the resolutionResult mapped to by the specifierKey prefix.`);
            }
        }
    }
    return null;
}
function resolveImportMap(importMap, baseURL) {
    let sortedAndNormalizedImports = {};
    if (!isImportMap(importMap)) {
        throw new TypeError(`the top-level value needs to be a JSON object.`);
    }
    const { imports , scopes  } = importMap;
    if (imports !== undefined) {
        if (!isImports(imports)) {
            throw new TypeError(`"imports" top-level key needs to be an object.`);
        }
        sortedAndNormalizedImports = sortAndNormalizeSpecifierMap(imports, baseURL);
    }
    let sortedAndNormalizedScopes = {};
    if (scopes !== undefined) {
        if (!isScopes(scopes)) {
            throw new TypeError(`"scopes" top-level key needs to be an object.`);
        }
        sortedAndNormalizedScopes = sortAndNormalizeScopes(scopes, baseURL);
    }
    if (Object.keys(importMap).find((key)=>key !== "imports" && key !== "scopes")) {
        console.warn(`an invalid top-level key was present in the import map.`);
    }
    return {
        imports: sortedAndNormalizedImports,
        scopes: sortedAndNormalizedScopes
    };
}
function resolveModuleSpecifier(specifier, { imports ={} , scopes ={}  }, baseURL) {
    const baseURLString = serializeURL(baseURL);
    const asURL = parseUrlLikeImportSpecifier(specifier, baseURL);
    const normalizedSpecifier = asURL !== null ? serializeURL(asURL) : specifier;
    for (const [scopePrefix, scopeImports] of Object.entries(scopes)){
        if (scopePrefix === baseURLString || scopePrefix.endsWith("/") && baseURLString.startsWith(scopePrefix)) {
            const scopeImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, scopeImports);
            if (scopeImportsMatch !== null) {
                return scopeImportsMatch;
            }
        }
    }
    const topLevelImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, imports);
    if (topLevelImportsMatch !== null) {
        return topLevelImportsMatch;
    }
    if (asURL !== null) {
        return serializeURL(asURL);
    }
    throw new TypeError(`specifier was a bare specifier, but was not remapped to anything by importMap.`);
}
const osType1 = (()=>{
    const { Deno: Deno1  } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows1 = osType1 === "windows";
const CHAR_FORWARD_SLASH1 = 47;
function assertPath1(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator1(code) {
    return code === 47;
}
function isPathSeparator1(code) {
    return isPosixPathSeparator1(code) || code === 92;
}
function isWindowsDeviceRoot1(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString1(path, allowAboveRoot, separator, isPathSeparator) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = CHAR_FORWARD_SLASH1;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format1(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
const WHITESPACE_ENCODINGS1 = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace1(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS1[c] ?? c;
    });
}
class DenoStdInternalError1 extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert1(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError1(msg);
    }
}
const sep3 = "\\";
const delimiter3 = ";";
function resolve3(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        const { Deno: Deno1  } = globalThis;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno1.cwd();
        } else {
            if (typeof Deno1?.env?.get !== "function" || typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath1(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator1(code)) {
                isAbsolute = true;
                if (isPathSeparator1(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator1(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator1(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator1(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot1(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator1(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator1(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString1(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator1);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize4(path) {
    assertPath1(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            isAbsolute = true;
            if (isPathSeparator1(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString1(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator1);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator1(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute3(path) {
    assertPath1(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator1(code)) {
        return true;
    } else if (isWindowsDeviceRoot1(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator1(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join4(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path = paths[i];
        assertPath1(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert1(firstPart != null);
    if (isPathSeparator1(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator1(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator1(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator1(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize4(joined);
}
function relative3(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    const fromOrig = resolve3(from);
    const toOrig = resolve3(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath3(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = resolve3(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot1(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function dirname3(path) {
    assertPath1(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator1(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator1(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator1(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path.slice(0, end);
}
function basename3(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath1(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot1(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if (isPathSeparator1(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= start; --i){
            if (isPathSeparator1(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname3(path) {
    assertPath1(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot1(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format3(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format1("\\", pathObject);
}
function parse4(path) {
    assertPath1(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = 1;
            if (isPathSeparator1(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator1(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator1(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator1(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl3(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function toFileUrl3(path) {
    if (!isAbsolute3(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod3 = {
    sep: sep3,
    delimiter: delimiter3,
    resolve: resolve3,
    normalize: normalize4,
    isAbsolute: isAbsolute3,
    join: join4,
    relative: relative3,
    toNamespacedPath: toNamespacedPath3,
    dirname: dirname3,
    basename: basename3,
    extname: extname3,
    format: format3,
    parse: parse4,
    fromFileUrl: fromFileUrl3,
    toFileUrl: toFileUrl3
};
const sep4 = "/";
const delimiter4 = ":";
function resolve4(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            const { Deno: Deno1  } = globalThis;
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
        }
        assertPath1(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH1;
    }
    resolvedPath = normalizeString1(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator1);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize5(path) {
    assertPath1(path);
    if (path.length === 0) return ".";
    const isAbsolute = path.charCodeAt(0) === 47;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeString1(path, !isAbsolute, "/", isPosixPathSeparator1);
    if (path.length === 0 && !isAbsolute) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute) return `/${path}`;
    return path;
}
function isAbsolute4(path) {
    assertPath1(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
}
function join5(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath1(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return normalize5(joined);
}
function relative4(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    from = resolve4(from);
    to = resolve4(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath4(path) {
    return path;
}
function dirname4(path) {
    assertPath1(path);
    if (path.length === 0) return ".";
    const hasRoot = path.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path.length - 1; i >= 1; --i){
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
}
function basename4(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath1(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= 0; --i){
            if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname4(path) {
    assertPath1(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format4(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format1("/", pathObject);
}
function parse5(path) {
    assertPath1(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute = path.charCodeAt(0) === 47;
    let start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute) ret.dir = "/";
    return ret;
}
function fromFileUrl4(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl4(path) {
    if (!isAbsolute4(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod4 = {
    sep: sep4,
    delimiter: delimiter4,
    resolve: resolve4,
    normalize: normalize5,
    isAbsolute: isAbsolute4,
    join: join5,
    relative: relative4,
    toNamespacedPath: toNamespacedPath4,
    dirname: dirname4,
    basename: basename4,
    extname: extname4,
    format: format4,
    parse: parse5,
    fromFileUrl: fromFileUrl4,
    toFileUrl: toFileUrl4
};
const path2 = isWindows1 ? mod3 : mod4;
const { join: join6 , normalize: normalize6  } = path2;
const path3 = isWindows1 ? mod3 : mod4;
const { basename: basename5 , delimiter: delimiter5 , dirname: dirname5 , extname: extname5 , format: format5 , fromFileUrl: fromFileUrl5 , isAbsolute: isAbsolute5 , join: join7 , normalize: normalize7 , parse: parse6 , relative: relative5 , resolve: resolve5 , sep: sep5 , toFileUrl: toFileUrl5 , toNamespacedPath: toNamespacedPath5  } = path3;
function getFileInfoType(fileInfo) {
    return fileInfo.isFile ? "file" : fileInfo.isDirectory ? "dir" : fileInfo.isSymlink ? "symlink" : undefined;
}
async function ensureDir(dir) {
    try {
        const fileInfo = await Deno.lstat(dir);
        if (!fileInfo.isDirectory) {
            throw new Error(`Ensure path exists, expected 'dir', got '${getFileInfoType(fileInfo)}'`);
        }
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            await Deno.mkdir(dir, {
                recursive: true
            });
            return;
        }
        throw err;
    }
}
const { Deno: Deno1  } = globalThis;
const noColor = typeof Deno1?.noColor === "boolean" ? Deno1.noColor : true;
let enabled = !noColor;
function setColorEnabled(value) {
    if (noColor) {
        return;
    }
    enabled = value;
}
function getColorEnabled() {
    return enabled;
}
function code1(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g")
    };
}
function run(str, code) {
    return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}
function reset(str) {
    return run(str, code1([
        0
    ], 0));
}
function bold(str) {
    return run(str, code1([
        1
    ], 22));
}
function dim(str) {
    return run(str, code1([
        2
    ], 22));
}
function italic(str) {
    return run(str, code1([
        3
    ], 23));
}
function underline(str) {
    return run(str, code1([
        4
    ], 24));
}
function inverse(str) {
    return run(str, code1([
        7
    ], 27));
}
function hidden(str) {
    return run(str, code1([
        8
    ], 28));
}
function strikethrough(str) {
    return run(str, code1([
        9
    ], 29));
}
function black(str) {
    return run(str, code1([
        30
    ], 39));
}
function red(str) {
    return run(str, code1([
        31
    ], 39));
}
function green(str) {
    return run(str, code1([
        32
    ], 39));
}
function yellow(str) {
    return run(str, code1([
        33
    ], 39));
}
function blue(str) {
    return run(str, code1([
        34
    ], 39));
}
function magenta(str) {
    return run(str, code1([
        35
    ], 39));
}
function cyan(str) {
    return run(str, code1([
        36
    ], 39));
}
function white(str) {
    return run(str, code1([
        37
    ], 39));
}
function gray(str) {
    return brightBlack(str);
}
function brightBlack(str) {
    return run(str, code1([
        90
    ], 39));
}
function brightRed(str) {
    return run(str, code1([
        91
    ], 39));
}
function brightGreen(str) {
    return run(str, code1([
        92
    ], 39));
}
function brightYellow(str) {
    return run(str, code1([
        93
    ], 39));
}
function brightBlue(str) {
    return run(str, code1([
        94
    ], 39));
}
function brightMagenta(str) {
    return run(str, code1([
        95
    ], 39));
}
function brightCyan(str) {
    return run(str, code1([
        96
    ], 39));
}
function brightWhite(str) {
    return run(str, code1([
        97
    ], 39));
}
function bgBlack(str) {
    return run(str, code1([
        40
    ], 49));
}
function bgRed(str) {
    return run(str, code1([
        41
    ], 49));
}
function bgGreen(str) {
    return run(str, code1([
        42
    ], 49));
}
function bgYellow(str) {
    return run(str, code1([
        43
    ], 49));
}
function bgBlue(str) {
    return run(str, code1([
        44
    ], 49));
}
function bgMagenta(str) {
    return run(str, code1([
        45
    ], 49));
}
function bgCyan(str) {
    return run(str, code1([
        46
    ], 49));
}
function bgWhite(str) {
    return run(str, code1([
        47
    ], 49));
}
function bgBrightBlack(str) {
    return run(str, code1([
        100
    ], 49));
}
function bgBrightRed(str) {
    return run(str, code1([
        101
    ], 49));
}
function bgBrightGreen(str) {
    return run(str, code1([
        102
    ], 49));
}
function bgBrightYellow(str) {
    return run(str, code1([
        103
    ], 49));
}
function bgBrightBlue(str) {
    return run(str, code1([
        104
    ], 49));
}
function bgBrightMagenta(str) {
    return run(str, code1([
        105
    ], 49));
}
function bgBrightCyan(str) {
    return run(str, code1([
        106
    ], 49));
}
function bgBrightWhite(str) {
    return run(str, code1([
        107
    ], 49));
}
function clampAndTruncate(n, max = 255, min = 0) {
    return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
    return run(str, code1([
        38,
        5,
        clampAndTruncate(color)
    ], 39));
}
function bgRgb8(str, color) {
    return run(str, code1([
        48,
        5,
        clampAndTruncate(color)
    ], 49));
}
function rgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code1([
            38,
            2,
            color >> 16 & 0xff,
            color >> 8 & 0xff,
            color & 0xff
        ], 39));
    }
    return run(str, code1([
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
    ], 39));
}
function bgRgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code1([
            48,
            2,
            color >> 16 & 0xff,
            color >> 8 & 0xff,
            color & 0xff
        ], 49));
    }
    return run(str, code1([
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
    ], 49));
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
].join("|"), "g");
function stripColor(string) {
    return string.replace(ANSI_PATTERN, "");
}
const mod5 = {
    setColorEnabled: setColorEnabled,
    getColorEnabled: getColorEnabled,
    reset: reset,
    bold: bold,
    dim: dim,
    italic: italic,
    underline: underline,
    inverse: inverse,
    hidden: hidden,
    strikethrough: strikethrough,
    black: black,
    red: red,
    green: green,
    yellow: yellow,
    blue: blue,
    magenta: magenta,
    cyan: cyan,
    white: white,
    gray: gray,
    brightBlack: brightBlack,
    brightRed: brightRed,
    brightGreen: brightGreen,
    brightYellow: brightYellow,
    brightBlue: brightBlue,
    brightMagenta: brightMagenta,
    brightCyan: brightCyan,
    brightWhite: brightWhite,
    bgBlack: bgBlack,
    bgRed: bgRed,
    bgGreen: bgGreen,
    bgYellow: bgYellow,
    bgBlue: bgBlue,
    bgMagenta: bgMagenta,
    bgCyan: bgCyan,
    bgWhite: bgWhite,
    bgBrightBlack: bgBrightBlack,
    bgBrightRed: bgBrightRed,
    bgBrightGreen: bgBrightGreen,
    bgBrightYellow: bgBrightYellow,
    bgBrightBlue: bgBrightBlue,
    bgBrightMagenta: bgBrightMagenta,
    bgBrightCyan: bgBrightCyan,
    bgBrightWhite: bgBrightWhite,
    rgb8: rgb8,
    bgRgb8: bgRgb8,
    rgb24: rgb24,
    bgRgb24: bgRgb24,
    stripColor: stripColor
};
const HEX_CHARS = "0123456789abcdef".split("");
const EXTRA = [
    -2147483648,
    8388608,
    32768,
    128
];
const SHIFT = [
    24,
    16,
    8,
    0
];
const K = [
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
];
const blocks = [];
class Sha256 {
    #block;
    #blocks;
    #bytes;
    #finalized;
    #first;
    #h0;
    #h1;
    #h2;
    #h3;
    #h4;
    #h5;
    #h6;
    #h7;
    #hashed;
    #hBytes;
    #is224;
    #lastByteIndex = 0;
    #start;
    constructor(is224 = false, sharedMemory = false){
        this.init(is224, sharedMemory);
    }
    init(is224, sharedMemory) {
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.#blocks = blocks;
        } else {
            this.#blocks = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ];
        }
        if (is224) {
            this.#h0 = 0xc1059ed8;
            this.#h1 = 0x367cd507;
            this.#h2 = 0x3070dd17;
            this.#h3 = 0xf70e5939;
            this.#h4 = 0xffc00b31;
            this.#h5 = 0x68581511;
            this.#h6 = 0x64f98fa7;
            this.#h7 = 0xbefa4fa4;
        } else {
            this.#h0 = 0x6a09e667;
            this.#h1 = 0xbb67ae85;
            this.#h2 = 0x3c6ef372;
            this.#h3 = 0xa54ff53a;
            this.#h4 = 0x510e527f;
            this.#h5 = 0x9b05688c;
            this.#h6 = 0x1f83d9ab;
            this.#h7 = 0x5be0cd19;
        }
        this.#block = this.#start = this.#bytes = this.#hBytes = 0;
        this.#finalized = this.#hashed = false;
        this.#first = true;
        this.#is224 = is224;
    }
    update(message) {
        if (this.#finalized) {
            return this;
        }
        let msg;
        if (message instanceof ArrayBuffer) {
            msg = new Uint8Array(message);
        } else {
            msg = message;
        }
        let index = 0;
        const length = msg.length;
        const blocks = this.#blocks;
        while(index < length){
            let i;
            if (this.#hashed) {
                this.#hashed = false;
                blocks[0] = this.#block;
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }
            if (typeof msg !== "string") {
                for(i = this.#start; index < length && i < 64; ++index){
                    blocks[i >> 2] |= msg[index] << SHIFT[i++ & 3];
                }
            } else {
                for(i = this.#start; index < length && i < 64; ++index){
                    let code = msg.charCodeAt(index);
                    if (code < 0x80) {
                        blocks[i >> 2] |= code << SHIFT[i++ & 3];
                    } else if (code < 0x800) {
                        blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else if (code < 0xd800 || code >= 0xe000) {
                        blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else {
                        code = 0x10000 + ((code & 0x3ff) << 10 | msg.charCodeAt(++index) & 0x3ff);
                        blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    }
                }
            }
            this.#lastByteIndex = i;
            this.#bytes += i - this.#start;
            if (i >= 64) {
                this.#block = blocks[16];
                this.#start = i - 64;
                this.hash();
                this.#hashed = true;
            } else {
                this.#start = i;
            }
        }
        if (this.#bytes > 4294967295) {
            this.#hBytes += this.#bytes / 4294967296 << 0;
            this.#bytes = this.#bytes % 4294967296;
        }
        return this;
    }
    finalize() {
        if (this.#finalized) {
            return;
        }
        this.#finalized = true;
        const blocks = this.#blocks;
        const i = this.#lastByteIndex;
        blocks[16] = this.#block;
        blocks[i >> 2] |= EXTRA[i & 3];
        this.#block = blocks[16];
        if (i >= 56) {
            if (!this.#hashed) {
                this.hash();
            }
            blocks[0] = this.#block;
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        blocks[14] = this.#hBytes << 3 | this.#bytes >>> 29;
        blocks[15] = this.#bytes << 3;
        this.hash();
    }
    hash() {
        let a = this.#h0;
        let b = this.#h1;
        let c = this.#h2;
        let d = this.#h3;
        let e = this.#h4;
        let f = this.#h5;
        let g = this.#h6;
        let h = this.#h7;
        const blocks = this.#blocks;
        let s0;
        let s1;
        let maj;
        let t1;
        let t2;
        let ch;
        let ab;
        let da;
        let cd;
        let bc;
        for(let j = 16; j < 64; ++j){
            t1 = blocks[j - 15];
            s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
            t1 = blocks[j - 2];
            s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
            blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
        }
        bc = b & c;
        for(let j = 0; j < 64; j += 4){
            if (this.#first) {
                if (this.#is224) {
                    ab = 300032;
                    t1 = blocks[0] - 1413257819;
                    h = t1 - 150054599 << 0;
                    d = t1 + 24177077 << 0;
                } else {
                    ab = 704751109;
                    t1 = blocks[0] - 210244248;
                    h = t1 - 1521486534 << 0;
                    d = t1 + 143694565 << 0;
                }
                this.#first = false;
            } else {
                s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
                s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
                ab = a & b;
                maj = ab ^ a & c ^ bc;
                ch = e & f ^ ~e & g;
                t1 = h + s1 + ch + K[j] + blocks[j];
                t2 = s0 + maj;
                h = d + t1 << 0;
                d = t1 + t2 << 0;
            }
            s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
            s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
            da = d & a;
            maj = da ^ d & b ^ ab;
            ch = h & e ^ ~h & f;
            t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
            t2 = s0 + maj;
            g = c + t1 << 0;
            c = t1 + t2 << 0;
            s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
            s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
            cd = c & d;
            maj = cd ^ c & a ^ da;
            ch = g & h ^ ~g & e;
            t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
            t2 = s0 + maj;
            f = b + t1 << 0;
            b = t1 + t2 << 0;
            s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
            s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
            bc = b & c;
            maj = bc ^ b & d ^ cd;
            ch = f & g ^ ~f & h;
            t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
            t2 = s0 + maj;
            e = a + t1 << 0;
            a = t1 + t2 << 0;
        }
        this.#h0 = this.#h0 + a << 0;
        this.#h1 = this.#h1 + b << 0;
        this.#h2 = this.#h2 + c << 0;
        this.#h3 = this.#h3 + d << 0;
        this.#h4 = this.#h4 + e << 0;
        this.#h5 = this.#h5 + f << 0;
        this.#h6 = this.#h6 + g << 0;
        this.#h7 = this.#h7 + h << 0;
    }
    hex() {
        this.finalize();
        const h0 = this.#h0;
        const h1 = this.#h1;
        const h2 = this.#h2;
        const h3 = this.#h3;
        const h4 = this.#h4;
        const h5 = this.#h5;
        const h6 = this.#h6;
        const h7 = this.#h7;
        let hex = HEX_CHARS[h0 >> 28 & 0x0f] + HEX_CHARS[h0 >> 24 & 0x0f] + HEX_CHARS[h0 >> 20 & 0x0f] + HEX_CHARS[h0 >> 16 & 0x0f] + HEX_CHARS[h0 >> 12 & 0x0f] + HEX_CHARS[h0 >> 8 & 0x0f] + HEX_CHARS[h0 >> 4 & 0x0f] + HEX_CHARS[h0 & 0x0f] + HEX_CHARS[h1 >> 28 & 0x0f] + HEX_CHARS[h1 >> 24 & 0x0f] + HEX_CHARS[h1 >> 20 & 0x0f] + HEX_CHARS[h1 >> 16 & 0x0f] + HEX_CHARS[h1 >> 12 & 0x0f] + HEX_CHARS[h1 >> 8 & 0x0f] + HEX_CHARS[h1 >> 4 & 0x0f] + HEX_CHARS[h1 & 0x0f] + HEX_CHARS[h2 >> 28 & 0x0f] + HEX_CHARS[h2 >> 24 & 0x0f] + HEX_CHARS[h2 >> 20 & 0x0f] + HEX_CHARS[h2 >> 16 & 0x0f] + HEX_CHARS[h2 >> 12 & 0x0f] + HEX_CHARS[h2 >> 8 & 0x0f] + HEX_CHARS[h2 >> 4 & 0x0f] + HEX_CHARS[h2 & 0x0f] + HEX_CHARS[h3 >> 28 & 0x0f] + HEX_CHARS[h3 >> 24 & 0x0f] + HEX_CHARS[h3 >> 20 & 0x0f] + HEX_CHARS[h3 >> 16 & 0x0f] + HEX_CHARS[h3 >> 12 & 0x0f] + HEX_CHARS[h3 >> 8 & 0x0f] + HEX_CHARS[h3 >> 4 & 0x0f] + HEX_CHARS[h3 & 0x0f] + HEX_CHARS[h4 >> 28 & 0x0f] + HEX_CHARS[h4 >> 24 & 0x0f] + HEX_CHARS[h4 >> 20 & 0x0f] + HEX_CHARS[h4 >> 16 & 0x0f] + HEX_CHARS[h4 >> 12 & 0x0f] + HEX_CHARS[h4 >> 8 & 0x0f] + HEX_CHARS[h4 >> 4 & 0x0f] + HEX_CHARS[h4 & 0x0f] + HEX_CHARS[h5 >> 28 & 0x0f] + HEX_CHARS[h5 >> 24 & 0x0f] + HEX_CHARS[h5 >> 20 & 0x0f] + HEX_CHARS[h5 >> 16 & 0x0f] + HEX_CHARS[h5 >> 12 & 0x0f] + HEX_CHARS[h5 >> 8 & 0x0f] + HEX_CHARS[h5 >> 4 & 0x0f] + HEX_CHARS[h5 & 0x0f] + HEX_CHARS[h6 >> 28 & 0x0f] + HEX_CHARS[h6 >> 24 & 0x0f] + HEX_CHARS[h6 >> 20 & 0x0f] + HEX_CHARS[h6 >> 16 & 0x0f] + HEX_CHARS[h6 >> 12 & 0x0f] + HEX_CHARS[h6 >> 8 & 0x0f] + HEX_CHARS[h6 >> 4 & 0x0f] + HEX_CHARS[h6 & 0x0f];
        if (!this.#is224) {
            hex += HEX_CHARS[h7 >> 28 & 0x0f] + HEX_CHARS[h7 >> 24 & 0x0f] + HEX_CHARS[h7 >> 20 & 0x0f] + HEX_CHARS[h7 >> 16 & 0x0f] + HEX_CHARS[h7 >> 12 & 0x0f] + HEX_CHARS[h7 >> 8 & 0x0f] + HEX_CHARS[h7 >> 4 & 0x0f] + HEX_CHARS[h7 & 0x0f];
        }
        return hex;
    }
    toString() {
        return this.hex();
    }
    digest() {
        this.finalize();
        const h0 = this.#h0;
        const h1 = this.#h1;
        const h2 = this.#h2;
        const h3 = this.#h3;
        const h4 = this.#h4;
        const h5 = this.#h5;
        const h6 = this.#h6;
        const h7 = this.#h7;
        const arr = [
            h0 >> 24 & 0xff,
            h0 >> 16 & 0xff,
            h0 >> 8 & 0xff,
            h0 & 0xff,
            h1 >> 24 & 0xff,
            h1 >> 16 & 0xff,
            h1 >> 8 & 0xff,
            h1 & 0xff,
            h2 >> 24 & 0xff,
            h2 >> 16 & 0xff,
            h2 >> 8 & 0xff,
            h2 & 0xff,
            h3 >> 24 & 0xff,
            h3 >> 16 & 0xff,
            h3 >> 8 & 0xff,
            h3 & 0xff,
            h4 >> 24 & 0xff,
            h4 >> 16 & 0xff,
            h4 >> 8 & 0xff,
            h4 & 0xff,
            h5 >> 24 & 0xff,
            h5 >> 16 & 0xff,
            h5 >> 8 & 0xff,
            h5 & 0xff,
            h6 >> 24 & 0xff,
            h6 >> 16 & 0xff,
            h6 >> 8 & 0xff,
            h6 & 0xff
        ];
        if (!this.#is224) {
            arr.push(h7 >> 24 & 0xff, h7 >> 16 & 0xff, h7 >> 8 & 0xff, h7 & 0xff);
        }
        return arr;
    }
    array() {
        return this.digest();
    }
    arrayBuffer() {
        this.finalize();
        const buffer = new ArrayBuffer(this.#is224 ? 28 : 32);
        const dataView = new DataView(buffer);
        dataView.setUint32(0, this.#h0);
        dataView.setUint32(4, this.#h1);
        dataView.setUint32(8, this.#h2);
        dataView.setUint32(12, this.#h3);
        dataView.setUint32(16, this.#h4);
        dataView.setUint32(20, this.#h5);
        dataView.setUint32(24, this.#h6);
        if (!this.#is224) {
            dataView.setUint32(28, this.#h7);
        }
        return buffer;
    }
}
function copy(src, dst, off = 0) {
    off = Math.max(0, Math.min(off, dst.byteLength));
    const dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
const MIN_READ = 32 * 1024;
const MAX_SIZE = 2 ** 32 - 2;
class Buffer {
    #buf;
    #off = 0;
    constructor(ab){
        this.#buf = ab === undefined ? new Uint8Array(0) : new Uint8Array(ab);
    }
    bytes(options = {
        copy: true
    }) {
        if (options.copy === false) return this.#buf.subarray(this.#off);
        return this.#buf.slice(this.#off);
    }
    empty() {
        return this.#buf.byteLength <= this.#off;
    }
    get length() {
        return this.#buf.byteLength - this.#off;
    }
    get capacity() {
        return this.#buf.buffer.byteLength;
    }
    truncate(n) {
        if (n === 0) {
            this.reset();
            return;
        }
        if (n < 0 || n > this.length) {
            throw Error("bytes.Buffer: truncation out of range");
        }
        this.#reslice(this.#off + n);
    }
    reset() {
        this.#reslice(0);
        this.#off = 0;
    }
    #tryGrowByReslice(n) {
        const l = this.#buf.byteLength;
        if (n <= this.capacity - l) {
            this.#reslice(l + n);
            return l;
        }
        return -1;
    }
    #reslice(len) {
        assert1(len <= this.#buf.buffer.byteLength);
        this.#buf = new Uint8Array(this.#buf.buffer, 0, len);
    }
    readSync(p) {
        if (this.empty()) {
            this.reset();
            if (p.byteLength === 0) {
                return 0;
            }
            return null;
        }
        const nread = copy(this.#buf.subarray(this.#off), p);
        this.#off += nread;
        return nread;
    }
    read(p) {
        const rr = this.readSync(p);
        return Promise.resolve(rr);
    }
    writeSync(p) {
        const m = this.#grow(p.byteLength);
        return copy(p, this.#buf, m);
    }
    write(p) {
        const n = this.writeSync(p);
        return Promise.resolve(n);
    }
    #grow(n) {
        const m = this.length;
        if (m === 0 && this.#off !== 0) {
            this.reset();
        }
        const i = this.#tryGrowByReslice(n);
        if (i >= 0) {
            return i;
        }
        const c = this.capacity;
        if (n <= Math.floor(c / 2) - m) {
            copy(this.#buf.subarray(this.#off), this.#buf);
        } else if (c + n > MAX_SIZE) {
            throw new Error("The buffer cannot be grown beyond the maximum size.");
        } else {
            const buf = new Uint8Array(Math.min(2 * c + n, MAX_SIZE));
            copy(this.#buf.subarray(this.#off), buf);
            this.#buf = buf;
        }
        this.#off = 0;
        this.#reslice(Math.min(m + n, MAX_SIZE));
        return m;
    }
    grow(n) {
        if (n < 0) {
            throw Error("Buffer.grow: negative count");
        }
        const m = this.#grow(n);
        this.#reslice(m);
    }
    async readFrom(r) {
        let n = 0;
        const tmp = new Uint8Array(MIN_READ);
        while(true){
            const shouldGrow = this.capacity - this.length < MIN_READ;
            const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
            const nread = await r.read(buf);
            if (nread === null) {
                return n;
            }
            if (shouldGrow) this.writeSync(buf.subarray(0, nread));
            else this.#reslice(this.length + nread);
            n += nread;
        }
    }
    readFromSync(r) {
        let n = 0;
        const tmp = new Uint8Array(MIN_READ);
        while(true){
            const shouldGrow = this.capacity - this.length < MIN_READ;
            const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
            const nread = r.readSync(buf);
            if (nread === null) {
                return n;
            }
            if (shouldGrow) this.writeSync(buf.subarray(0, nread));
            else this.#reslice(this.length + nread);
            n += nread;
        }
    }
}
async function readAll(r) {
    const buf = new Buffer();
    await buf.readFrom(r);
    return buf.bytes();
}
async function writeAll(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += await w.write(arr.subarray(nwritten));
    }
}
function assert2(cond, msg = "Assertion failed.") {
    if (!cond) {
        throw new Error(msg);
    }
}
function hash(value) {
    const sha256 = new Sha256();
    sha256.update(value);
    return sha256.hex();
}
function baseUrlToFilename(url) {
    const out = [];
    const scheme = url.protocol.replace(":", "");
    out.push(scheme);
    switch(scheme){
        case "http":
        case "https":
            {
                const host = url.hostname;
                const hostPort = url.port;
                out.push(hostPort ? `${host}_PORT${hostPort}` : host);
                break;
            }
        case "data":
        case "blob":
            break;
        default:
            throw new TypeError(`Don't know how to create cache name for scheme: ${scheme}`);
    }
    return join7(...out);
}
function urlToFilename(url) {
    const cacheFilename = baseUrlToFilename(url);
    let restStr = url.pathname;
    const query = url.search;
    if (query) {
        restStr += `?${query}`;
    }
    const hashedFilename = hash(restStr);
    return join7(cacheFilename, hashedFilename);
}
async function isFile(filePath) {
    try {
        const stats = await Deno.lstat(filePath);
        return stats.isFile;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}
class DiskCache {
    location;
    constructor(location){
        assert2(isAbsolute5(location));
        this.location = location;
    }
    async get(filename) {
        const path = join7(this.location, filename);
        const file = await Deno.open(path, {
            read: true
        });
        const value = await readAll(file);
        file.close();
        return value;
    }
    async set(filename, data) {
        const path = join7(this.location, filename);
        const parentFilename = dirname5(path);
        await ensureDir(parentFilename);
        const file = await Deno.open(path, {
            write: true,
            create: true,
            mode: 0o644
        });
        await writeAll(file, data);
        file.close();
    }
    static getCacheFilename(url) {
        const out = [];
        const scheme = url.protocol.replace(":", "");
        out.push(scheme);
        switch(scheme){
            case "wasm":
                {
                    const { hostname , port  } = url;
                    out.push(port ? `${hostname}_PORT${port}` : hostname);
                    out.push(...url.pathname.split("/"));
                    break;
                }
            case "http":
            case "https":
            case "data":
            case "blob":
                return urlToFilename(url);
            case "file":
                {
                    const path = fromFileUrl5(url);
                    if (!path) {
                        return undefined;
                    }
                    const { host  } = url;
                    if (host) {
                        out.push("UNC");
                        out.push(host.replaceAll(":", "_"));
                    }
                    const pathComponents = path.split(sep5).filter((p)=>p.length > 0);
                    if (Deno.build.os === "windows") {
                        if (host) {
                            pathComponents.shift();
                        }
                        const first = pathComponents.shift();
                        assert2(first);
                        out.push(first.replace(/:$/, ""));
                    }
                    out.push(...pathComponents);
                    break;
                }
            default:
                return undefined;
        }
        return join7(...out);
    }
    static getCacheFilenameWithExtension(url, extension) {
        const base = this.getCacheFilename(url);
        return base ? `${base}.${extension}` : undefined;
    }
}
new TextDecoder();
new TextEncoder();
function cacheDir() {
    if (Deno.build.os === "darwin") {
        const home = homeDir();
        if (home) {
            return join7(home, "Library/Caches");
        }
    } else if (Deno.build.os === "linux") {
        Deno.permissions.request({
            name: "env",
            variable: "XDG_CACHE_HOME"
        });
        const cacheHome = Deno.env.get("XDG_CACHE_HOME");
        if (cacheHome) {
            return cacheHome;
        } else {
            const home = homeDir();
            if (home) {
                return join7(home, ".cache");
            }
        }
    } else {
        Deno.permissions.request({
            name: "env",
            variable: "LOCALAPPDATA"
        });
        return Deno.env.get("LOCALAPPDATA");
    }
}
function homeDir() {
    switch(Deno.build.os){
        case "windows":
            Deno.permissions.request({
                name: "env",
                variable: "USERPROFILE"
            });
            return Deno.env.get("USERPROFILE");
        case "linux":
        case "darwin":
            Deno.permissions.request({
                name: "env",
                variable: "HOME"
            });
            return Deno.env.get("HOME");
        default:
            throw Error("unreachable");
    }
}
class Metadata {
    headers;
    url;
    constructor(headers, url){
        this.headers = headers;
        this.url = url;
    }
    async write(cacheFilename) {
        const metadataFilename = Metadata.filename(cacheFilename);
        const json = JSON.stringify({
            headers: this.headers,
            url: this.url
        }, undefined, "  ");
        await Deno.writeTextFile(metadataFilename, json, {
            mode: 0o644
        });
    }
    static filename(cacheFilename) {
        const currentExt = extname5(cacheFilename);
        if (currentExt) {
            const re = new RegExp(`\\${currentExt}$`);
            return cacheFilename.replace(re, ".metadata.json");
        } else {
            return `${cacheFilename}.metadata.json`;
        }
    }
}
class HttpCache {
    location;
    readOnly;
    constructor(location, readOnly){
        assert2(isAbsolute5(location));
        this.location = location;
        this.readOnly = readOnly;
    }
    getCacheFilename(url) {
        return join7(this.location, urlToFilename(url));
    }
    async get(url) {
        const cacheFilename = join7(this.location, urlToFilename(url));
        const metadataFilename = Metadata.filename(cacheFilename);
        if (!await isFile(cacheFilename)) {
            return undefined;
        }
        const file = await Deno.open(cacheFilename, {
            read: true
        });
        const metadataStr = await Deno.readTextFile(metadataFilename);
        const metadata = JSON.parse(metadataStr);
        assert2(metadata.headers);
        return [
            file,
            metadata.headers
        ];
    }
    async set(url, headers, content) {
        if (this.readOnly === undefined) {
            this.readOnly = (await Deno.permissions.query({
                name: "write"
            })).state === "denied" ? true : false;
        }
        if (this.readOnly) {
            return;
        }
        const cacheFilename = join7(this.location, urlToFilename(url));
        const parentFilename = dirname5(cacheFilename);
        await ensureDir(parentFilename);
        await Deno.writeTextFile(cacheFilename, content, {
            mode: 0o644
        });
        const metadata = new Metadata(headers, url);
        await metadata.write(cacheFilename);
    }
}
class DenoDir {
    deps;
    gen;
    root;
    constructor(root, readOnly){
        if (root) {
            if (root instanceof URL) {
                root = root.toString();
            }
            if (!isAbsolute5(root)) {
                root = normalize7(join7(Deno.cwd(), root));
            }
        } else {
            Deno.permissions.request({
                name: "env",
                variable: "DENO_DIR"
            });
            const dd = Deno.env.get("DENO_DIR");
            if (dd) {
                if (!isAbsolute5(dd)) {
                    root = normalize7(join7(Deno.cwd(), dd));
                } else {
                    root = dd;
                }
            } else {
                const cd = cacheDir();
                if (cd) {
                    root = join7(cd, "deno");
                } else {
                    const hd = homeDir();
                    if (hd) {
                        root = join7(hd, ".deno");
                    }
                }
            }
        }
        assert2(root, "Could not set the Deno root directory");
        assert2(isAbsolute5(root), `The root directory "${root}" is not absolute.`);
        Deno.permissions.request({
            name: "read"
        });
        this.root = root;
        this.deps = new HttpCache(join7(root, "deps"), readOnly);
        this.gen = new DiskCache(join7(root, "gen"));
    }
}
function splitLast(value, delimiter) {
    const split = value.split(delimiter);
    return [
        split.slice(0, -1).join(delimiter)
    ].concat(split.slice(-1));
}
function tokenAsValue(authToken) {
    return authToken.type === "basic" ? `Basic ${authToken.username}:${authToken.password}` : `Bearer ${authToken.token}`;
}
class AuthTokens {
    #tokens;
    constructor(tokensStr = ""){
        const tokens = [];
        for (const tokenStr of tokensStr.split(";").filter((s)=>s.length > 0)){
            if (tokensStr.includes("@")) {
                const [host, token] = splitLast(tokenStr, "@");
                if (token.includes(":")) {
                    const [password, username] = splitLast(token, ":");
                    tokens.push({
                        type: "basic",
                        host,
                        username,
                        password
                    });
                } else {
                    tokens.push({
                        type: "bearer",
                        host,
                        token
                    });
                }
            } else {
                console.error("Badly formed auth token discarded.");
            }
        }
        this.#tokens = tokens;
    }
    get(specifier) {
        for (const token of this.#tokens){
            if (token.host.endsWith(specifier.host)) {
                return tokenAsValue(token);
            }
        }
    }
}
function shouldUseCache(cacheSetting, specifier) {
    switch(cacheSetting){
        case "only":
        case "use":
            return true;
        case "reloadAll":
            return false;
        default:
            {
                const specifierStr = specifier.toString();
                for (const value of cacheSetting){
                    if (specifierStr.startsWith(value)) {
                        return false;
                    }
                }
                return true;
            }
    }
}
const SUPPORTED_SCHEMES = [
    "data:",
    "blob:",
    "file:",
    "http:",
    "https:"
];
function getValidatedScheme(specifier) {
    const scheme = specifier.protocol;
    if (!SUPPORTED_SCHEMES.includes(scheme)) {
        throw new TypeError(`Unsupported scheme "${scheme}" for module "${specifier.toString()}". Supported schemes: ${JSON.stringify(SUPPORTED_SCHEMES)}.`);
    }
    return scheme;
}
function stripHashbang(value) {
    return value.startsWith("#!") ? value.slice(value.indexOf("\n")) : value;
}
async function fetchLocal(specifier) {
    const local = fromFileUrl5(specifier);
    if (!local) {
        throw new TypeError(`Invalid file path.\n  Specifier: ${specifier.toString()}`);
    }
    try {
        const source = await Deno.readTextFile(local);
        const content = stripHashbang(source);
        return {
            kind: "module",
            content,
            specifier: specifier.toString()
        };
    } catch  {}
}
const decoder = new TextDecoder();
class FileFetcher {
    #allowRemote;
    #authTokens;
    #cache = new Map();
    #cacheSetting;
    #httpCache;
    constructor(httpCache, cacheSetting = "use", allowRemote = true){
        Deno.permissions.request({
            name: "env",
            variable: "DENO_AUTH_TOKENS"
        });
        this.#authTokens = new AuthTokens(Deno.env.get("DENO_AUTH_TOKENS"));
        this.#allowRemote = allowRemote;
        this.#cacheSetting = cacheSetting;
        this.#httpCache = httpCache;
    }
    async #fetchBlobDataUrl(specifier) {
        const cached = await this.#fetchCached(specifier, 0);
        if (cached) {
            return cached;
        }
        if (this.#cacheSetting === "only") {
            throw new Deno.errors.NotFound(`Specifier not found in cache: "${specifier.toString()}", --cached-only is specified.`);
        }
        const response = await fetch(specifier.toString());
        const content = await response.text();
        const headers = {};
        for (const [key, value] of response.headers){
            headers[key.toLowerCase()] = value;
        }
        await this.#httpCache.set(specifier, headers, content);
        return {
            kind: "module",
            specifier: specifier.toString(),
            headers,
            content
        };
    }
    async #fetchCached(specifier, redirectLimit) {
        if (redirectLimit < 0) {
            throw new Deno.errors.Http("Too many redirects");
        }
        const cached = await this.#httpCache.get(specifier);
        if (!cached) {
            return undefined;
        }
        const [file, headers] = cached;
        const location = headers["location"];
        if (location) {
            const redirect = new URL(location, specifier);
            file.close();
            return this.#fetchCached(redirect, redirectLimit - 1);
        }
        const bytes = await readAll(file);
        file.close();
        const content = decoder.decode(bytes);
        return {
            kind: "module",
            specifier: specifier.toString(),
            headers,
            content
        };
    }
    async #fetchRemote(specifier, redirectLimit) {
        if (redirectLimit < 0) {
            throw new Deno.errors.Http("Too many redirects.");
        }
        if (shouldUseCache(this.#cacheSetting, specifier)) {
            const response = await this.#fetchCached(specifier, redirectLimit);
            if (response) {
                return response;
            }
        }
        if (this.#cacheSetting === "only") {
            throw new Deno.errors.NotFound(`Specifier not found in cache: "${specifier.toString()}", --cached-only is specified.`);
        }
        const requestHeaders = new Headers();
        const cached = await this.#httpCache.get(specifier);
        if (cached) {
            const [file, cachedHeaders] = cached;
            file.close();
            if (cachedHeaders["etag"]) {
                requestHeaders.append("if-none-match", cachedHeaders["etag"]);
            }
        }
        const authToken = this.#authTokens.get(specifier);
        if (authToken) {
            requestHeaders.append("authorization", authToken);
        }
        console.log(`${mod5.green("Download")} ${specifier.toString()}`);
        const response = await fetch(specifier.toString(), {
            headers: requestHeaders
        });
        if (!response.ok) {
            if (response.status === 404) {
                return undefined;
            } else {
                throw new Deno.errors.Http(`${response.status} ${response.statusText}`);
            }
        }
        if (specifier.toString() !== response.url) {
            const headers = {
                "location": response.url
            };
            await this.#httpCache.set(specifier, headers, "");
        }
        const url = new URL(response.url);
        const content = await response.text();
        const headers = {};
        for (const [key, value] of response.headers){
            headers[key.toLowerCase()] = value;
        }
        await this.#httpCache.set(url, headers, content);
        return {
            kind: "module",
            specifier: response.url,
            headers,
            content
        };
    }
    async fetch(specifier) {
        const scheme = getValidatedScheme(specifier);
        const response = this.#cache.get(specifier.toString());
        if (response) {
            return response;
        } else if (scheme === "file:") {
            return fetchLocal(specifier);
        } else if (scheme === "data:" || scheme === "blob:") {
            const response = await this.#fetchBlobDataUrl(specifier);
            this.#cache.set(specifier.toString(), response);
            return response;
        } else if (!this.#allowRemote) {
            throw new Deno.errors.PermissionDenied(`A remote specifier was requested: "${specifier.toString()}", but --no-remote is specifier`);
        } else {
            const response = await this.#fetchRemote(specifier, 10);
            if (response) {
                this.#cache.set(specifier.toString(), response);
            }
            return response;
        }
    }
}
function mediaTypeToLoader(mediaType) {
    switch(mediaType){
        case "JavaScript":
        case "Mjs":
            return "js";
        case "JSX":
            return "jsx";
        case "TypeScript":
        case "Mts":
            return "ts";
        case "TSX":
            return "tsx";
        case "Json":
            return "json";
        default:
            throw new Error(`Unhandled media type ${mediaType}.`);
    }
}
function urlToEsbuildResolution(url) {
    if (url.protocol === "file:") {
        return {
            path: fromFileUrl2(url),
            namespace: "file"
        };
    }
    const namespace = url.protocol.slice(0, -1);
    const path = url.href.slice(namespace.length + 1);
    return {
        path,
        namespace
    };
}
function esbuildResolutionToURL(specifier) {
    if (specifier.namespace === "file") {
        return toFileUrl2(specifier.path);
    }
    return new URL(`${specifier.namespace}:${specifier.path}`);
}
async function readDenoConfig(path) {
    const file = await Deno.readTextFile(path);
    const res = mod2.parse(file);
    if (typeof res !== "object" || res === null || Array.isArray(res)) {
        throw new Error(`Deno config at ${path} must be an object`);
    }
    if ("imports" in res && (typeof res.imports !== "object" || res.imports === null || Array.isArray(res.imports))) {
        throw new Error(`Deno config at ${path} has invalid "imports" key`);
    }
    if ("scopes" in res && (typeof res.scopes !== "object" || res.scopes === null || Array.isArray(res.scopes))) {
        throw new Error(`Deno config at ${path} has invalid "scopes" key`);
    }
    if ("lock" in res && typeof res.lock !== "boolean" && typeof res.lock !== "string") {
        throw new Error(`Deno config at ${path} has invalid "lock" key`);
    }
    if ("importMap" in res && typeof res.importMap !== "string") {
        throw new Error(`Deno config at ${path} has invalid "importMap" key`);
    }
    return res;
}
function mapContentType(specifier, contentType) {
    if (contentType !== null) {
        const contentTypes = contentType.split(";");
        const mediaType = contentTypes[0].toLowerCase();
        switch(mediaType){
            case "application/typescript":
            case "text/typescript":
            case "video/vnd.dlna.mpeg-tts":
            case "video/mp2t":
            case "application/x-typescript":
                return mapJsLikeExtension(specifier, "TypeScript");
            case "application/javascript":
            case "text/javascript":
            case "application/ecmascript":
            case "text/ecmascript":
            case "application/x-javascript":
            case "application/node":
                return mapJsLikeExtension(specifier, "JavaScript");
            case "text/jsx":
                return "JSX";
            case "text/tsx":
                return "TSX";
            case "application/json":
            case "text/json":
                return "Json";
            case "application/wasm":
                return "Wasm";
            case "text/plain":
            case "application/octet-stream":
                return mediaTypeFromSpecifier(specifier);
            default:
                return "Unknown";
        }
    } else {
        return mediaTypeFromSpecifier(specifier);
    }
}
function mapJsLikeExtension(specifier, defaultType) {
    const path = specifier.pathname;
    switch(extname2(path)){
        case ".jsx":
            return "JSX";
        case ".mjs":
            return "Mjs";
        case ".cjs":
            return "Cjs";
        case ".tsx":
            return "TSX";
        case ".ts":
            if (path.endsWith(".d.ts")) {
                return "Dts";
            } else {
                return defaultType;
            }
        case ".mts":
            {
                if (path.endsWith(".d.mts")) {
                    return "Dmts";
                } else {
                    return defaultType == "JavaScript" ? "Mjs" : "Mts";
                }
            }
        case ".cts":
            {
                if (path.endsWith(".d.cts")) {
                    return "Dcts";
                } else {
                    return defaultType == "JavaScript" ? "Cjs" : "Cts";
                }
            }
        default:
            return defaultType;
    }
}
function mediaTypeFromSpecifier(specifier) {
    const path = specifier.pathname;
    switch(extname2(path)){
        case "":
            if (path.endsWith("/.tsbuildinfo")) {
                return "TsBuildInfo";
            } else {
                return "Unknown";
            }
        case ".ts":
            if (path.endsWith(".d.ts")) {
                return "Dts";
            } else {
                return "TypeScript";
            }
        case ".mts":
            if (path.endsWith(".d.mts")) {
                return "Dmts";
            } else {
                return "Mts";
            }
        case ".cts":
            if (path.endsWith(".d.cts")) {
                return "Dcts";
            } else {
                return "Cts";
            }
        case ".tsx":
            return "TSX";
        case ".js":
            return "JavaScript";
        case ".jsx":
            return "JSX";
        case ".mjs":
            return "Mjs";
        case ".cjs":
            return "Cjs";
        case ".json":
            return "Json";
        case ".wasm":
            return "Wasm";
        case ".tsbuildinfo":
            return "TsBuildInfo";
        case ".map":
            return "SourceMap";
        default:
            return "Unknown";
    }
}
function parseNpmSpecifier(specifier) {
    if (specifier.protocol !== "npm:") throw new Error("Invalid npm specifier");
    const path = specifier.pathname;
    const startIndex = path[0] === "/" ? 1 : 0;
    let pathStartIndex;
    let versionStartIndex;
    if (path[startIndex] === "@") {
        const firstSlash = path.indexOf("/", startIndex);
        if (firstSlash === -1) {
            throw new Error(`Invalid npm specifier: ${specifier}`);
        }
        pathStartIndex = path.indexOf("/", firstSlash + 1);
        versionStartIndex = path.indexOf("@", firstSlash + 1);
    } else {
        pathStartIndex = path.indexOf("/", startIndex);
        versionStartIndex = path.indexOf("@", startIndex);
    }
    if (pathStartIndex === -1) pathStartIndex = path.length;
    if (versionStartIndex === -1) versionStartIndex = path.length;
    if (versionStartIndex > pathStartIndex) {
        versionStartIndex = pathStartIndex;
    }
    if (startIndex === versionStartIndex) {
        throw new Error(`Invalid npm specifier: ${specifier}`);
    }
    return {
        name: path.slice(startIndex, versionStartIndex),
        version: versionStartIndex === pathStartIndex ? null : path.slice(versionStartIndex + 1, pathStartIndex),
        path: pathStartIndex === path.length ? null : path.slice(pathStartIndex)
    };
}
const IN_NODE_MODULES = Symbol("IN_NODE_MODULES");
const IN_NODE_MODULES_RESOLVED = Symbol("IN_NODE_MODULES_RESOLVED");
function denoResolverPlugin(options = {}) {
    return {
        name: "deno-resolver",
        setup (build) {
            let importMap = null;
            let nodeModulesPaths;
            build.onStart(async function onStart() {
                nodeModulesPaths = new Set();
                let importMapURL;
                if (options.importMapURL === undefined && options.configPath !== undefined) {
                    const config = await readDenoConfig(options.configPath);
                    if (config.imports !== undefined || config.scopes !== undefined) {
                        const configImportMap = {
                            imports: config.imports,
                            scopes: config.scopes
                        };
                        importMap = resolveImportMap(configImportMap, toFileUrl2(options.configPath));
                    } else if (config.importMap !== undefined) {
                        importMapURL = new URL(config.importMap, toFileUrl2(options.configPath)).href;
                    }
                } else if (options.importMapURL !== undefined) {
                    importMapURL = options.importMapURL;
                }
                if (importMapURL) {
                    const resp = await fetch(importMapURL);
                    const data = await resp.json();
                    importMap = resolveImportMap(data, new URL(resp.url));
                }
            });
            build.onResolve({
                filter: /.*/
            }, async function onResolve(args) {
                if (args.pluginData === IN_NODE_MODULES_RESOLVED) return {};
                if (args.pluginData === IN_NODE_MODULES) return undefined;
                if (nodeModulesPaths.has(args.importer)) {
                    const res = await build.resolve(args.path, {
                        importer: args.importer,
                        namespace: args.namespace,
                        kind: args.kind,
                        resolveDir: args.resolveDir,
                        pluginData: IN_NODE_MODULES
                    });
                    if (!res.external) nodeModulesPaths.add(res.path);
                    return res;
                }
                let referrer;
                if (args.importer !== "") {
                    if (args.namespace === "") {
                        throw new Error("[assert] namespace is empty");
                    }
                    referrer = new URL(`${args.namespace}:${args.importer}`);
                } else if (args.resolveDir !== "") {
                    referrer = new URL(`${toFileUrl2(args.resolveDir).href}/`);
                } else {
                    return undefined;
                }
                let resolved;
                if (importMap !== null) {
                    const res = resolveModuleSpecifier(args.path, importMap, new URL(referrer));
                    resolved = new URL(res);
                } else {
                    resolved = new URL(args.path, referrer);
                }
                const { path , namespace  } = urlToEsbuildResolution(resolved);
                const res = await build.resolve(path, {
                    namespace,
                    kind: args.kind
                });
                if (res.pluginData === IN_NODE_MODULES) nodeModulesPaths.add(res.path);
                return res;
            });
        }
    };
}
let tmpDir;
async function info(specifier, options) {
    const opts = {
        args: [
            "info",
            "--json"
        ],
        cwd: undefined,
        env: {
            DENO_NO_PACKAGE_JSON: "true"
        },
        stdout: "piped",
        stderr: "inherit"
    };
    if (typeof options.config === "string") {
        opts.args.push("--config", options.config);
    } else {
        opts.args.push("--no-config");
    }
    if (options.importMap) {
        opts.args.push("--import-map", options.importMap);
    }
    if (options.nodeModulesDir) {
        opts.args.push("--node-modules-dir");
    }
    if (options.cwd) {
        opts.cwd = options.cwd;
    } else {
        if (!tmpDir) tmpDir = Deno.makeTempDirSync();
        opts.cwd = tmpDir;
    }
    opts.args.push(specifier);
    const output = await new Deno.Command(Deno.execPath(), opts).output();
    if (!output.success) {
        throw new Error(`Failed to call 'deno info' on '${specifier}'`);
    }
    const txt = new TextDecoder().decode(output.stdout);
    return JSON.parse(txt);
}
class InfoCache {
    #options;
    #modules = new Map();
    #redirects = new Map();
    #npmPackages = new Map();
    constructor(options = {}){
        this.#options = options;
    }
    async get(specifier) {
        let entry = this.#getCached(specifier);
        if (entry !== undefined) return entry;
        await this.#load(specifier);
        entry = this.#getCached(specifier);
        if (entry === undefined) {
            throw new Error(`Unreachable: '${specifier}' loaded but not reachable`);
        }
        return entry;
    }
    getNpmPackage(id) {
        return this.#npmPackages.get(id);
    }
    #resolve(specifier) {
        return this.#redirects.get(specifier) ?? specifier;
    }
    #getCached(specifier) {
        specifier = this.#resolve(specifier);
        return this.#modules.get(specifier);
    }
    async #load(specifier) {
        const { modules , redirects , npmPackages  } = await info(specifier, this.#options);
        for (const module of modules){
            this.#modules.set(module.specifier, module);
        }
        for (const [from, to] of Object.entries(redirects)){
            this.#redirects.set(from, to);
        }
        for (const [id, npmPackage] of Object.entries(npmPackages)){
            this.#npmPackages.set(id, npmPackage);
        }
        specifier = this.#resolve(specifier);
        const entry = this.#modules.get(specifier);
        if (entry === undefined && specifier.startsWith("npm:")) {
            await this.#load(specifier);
        }
    }
}
let DENO_DIR;
class NativeLoader {
    #infoCache;
    #linkDirCache = new Map();
    constructor(options){
        this.#infoCache = new InfoCache(options.infoOptions);
    }
    async resolve(specifier) {
        const entry = await this.#infoCache.get(specifier.href);
        if ("error" in entry) throw new Error(entry.error);
        if (entry.kind === "npm") {
            const parsed = parseNpmSpecifier(new URL(entry.specifier));
            return {
                kind: "npm",
                packageId: entry.npmPackage,
                packageName: parsed.name,
                path: parsed.path ?? ""
            };
        } else if (entry.kind === "node") {
            return {
                kind: "node",
                path: entry.specifier
            };
        }
        return {
            kind: "esm",
            specifier: new URL(entry.specifier)
        };
    }
    async loadEsm(specifier) {
        if (specifier.protocol === "data:") {
            const resp = await fetch(specifier);
            const contents = new Uint8Array(await resp.arrayBuffer());
            const contentType = resp.headers.get("content-type");
            const mediaType = mapContentType(specifier, contentType);
            const loader = mediaTypeToLoader(mediaType);
            return {
                contents,
                loader
            };
        }
        const entry = await this.#infoCache.get(specifier.href);
        if ("error" in entry) throw new Error(entry.error);
        if (!("local" in entry)) {
            throw new Error("[unreachable] Not an ESM module.");
        }
        if (!entry.local) throw new Error("Module not downloaded yet.");
        const loader = mediaTypeToLoader(entry.mediaType);
        const contents = await Deno.readFile(entry.local);
        const res = {
            contents,
            loader
        };
        if (specifier.protocol === "file:") {
            res.watchFiles = [
                fromFileUrl2(specifier)
            ];
        }
        return res;
    }
    async nodeModulesDirForPackage(npmPackageId) {
        const npmPackage = this.#infoCache.getNpmPackage(npmPackageId);
        if (!npmPackage) throw new Error("NPM package not found.");
        let linkDir = this.#linkDirCache.get(npmPackageId);
        if (!linkDir) {
            linkDir = await this.#nodeModulesDirForPackageInner(npmPackageId, npmPackage);
            this.#linkDirCache.set(npmPackageId, linkDir);
        }
        return linkDir;
    }
    async #nodeModulesDirForPackageInner(npmPackageId, npmPackage) {
        let name = npmPackage.name;
        if (name.toLowerCase() !== name) {
            name = `_${encode(new TextEncoder().encode(name))}`;
        }
        if (!DENO_DIR) DENO_DIR = new DenoDir(undefined, true);
        const packageDir = join3(DENO_DIR.root, "npm", "registry.npmjs.org", name, npmPackage.version);
        const linkDirParent = join3(DENO_DIR.root, "deno_esbuild", npmPackageId, "node_modules");
        const linkDir = join3(linkDirParent, name);
        try {
            await Deno.stat(linkDir);
            this.#linkDirCache.set(npmPackageId, linkDir);
            return linkDir;
        } catch  {}
        const tmpDir = await Deno.makeTempDir();
        await linkRecursive(packageDir, tmpDir);
        try {
            await Deno.mkdir(linkDirParent, {
                recursive: true
            });
            await Deno.rename(tmpDir, linkDir);
        } catch (err) {
            if (err instanceof Deno.errors.AlreadyExists) {} else {
                throw err;
            }
        }
        return linkDir;
    }
    packageIdFromNameInPackage(name, parentPackageId) {
        const parentPackage = this.#infoCache.getNpmPackage(parentPackageId);
        if (!parentPackage) throw new Error("NPM package not found.");
        if (parentPackage.name === name) return parentPackageId;
        for (const dep of parentPackage.dependencies){
            const depPackage = this.#infoCache.getNpmPackage(dep);
            if (!depPackage) throw new Error("NPM package not found.");
            if (depPackage.name === name) return dep;
        }
        throw new Error("NPM package not found.");
    }
}
async function linkRecursive(from, to) {
    const fromStat = await Deno.stat(from);
    if (fromStat.isDirectory) {
        await Deno.mkdir(to, {
            recursive: true
        });
        for await (const entry of Deno.readDir(from)){
            await linkRecursive(join3(from, entry.name), join3(to, entry.name));
        }
    } else {
        await Deno.link(from, to);
    }
}
class PortableLoader {
    #fetchOngoing = new Map();
    #fetchModules = new Map();
    #fetchRedirects = new Map();
    async resolve(specifier) {
        switch(specifier.protocol){
            case "file:":
                {
                    return {
                        kind: "esm",
                        specifier
                    };
                }
            case "http:":
            case "https:":
            case "data:":
                {
                    const module = await this.#loadRemote(specifier.href);
                    return {
                        kind: "esm",
                        specifier: new URL(module.specifier)
                    };
                }
            case "npm:":
                {
                    const npmSpecifier = parseNpmSpecifier(specifier);
                    return {
                        kind: "npm",
                        packageId: "",
                        packageName: npmSpecifier.name,
                        path: npmSpecifier.path ?? ""
                    };
                }
            case "node:":
                {
                    return {
                        kind: "node",
                        path: specifier.pathname
                    };
                }
            default:
                throw new Error(`Unsupported scheme: '${specifier.protocol}'`);
        }
    }
    async loadEsm(url) {
        let module;
        switch(url.protocol){
            case "file:":
                {
                    module = await this.#loadLocal(url);
                    break;
                }
            case "http:":
            case "https:":
            case "data:":
                {
                    module = await this.#loadRemote(url.href);
                    break;
                }
            default:
                throw new Error("[unreachable] unsupported esm scheme " + url.protocol);
        }
        const loader = mediaTypeToLoader(module.mediaType);
        const res = {
            contents: module.data,
            loader
        };
        if (url.protocol === "file:") {
            res.watchFiles = [
                fromFileUrl2(module.specifier)
            ];
        }
        return res;
    }
    #resolveRemote(specifier) {
        return this.#fetchRedirects.get(specifier) ?? specifier;
    }
    async #loadRemote(specifier) {
        for(let i = 0; i < 10; i++){
            specifier = this.#resolveRemote(specifier);
            const module = this.#fetchModules.get(specifier);
            if (module) return module;
            let promise = this.#fetchOngoing.get(specifier);
            if (!promise) {
                promise = this.#fetch(specifier);
                this.#fetchOngoing.set(specifier, promise);
            }
            await promise;
        }
        throw new Error("Too many redirects. Last one: " + specifier);
    }
    async #fetch(specifier) {
        const resp = await fetch(specifier, {
            redirect: "manual"
        });
        if (resp.status < 200 && resp.status >= 400) {
            throw new Error(`Encountered status code ${resp.status} while fetching ${specifier}.`);
        }
        if (resp.status >= 300 && resp.status < 400) {
            await resp.body?.cancel();
            const location = resp.headers.get("location");
            if (!location) {
                throw new Error(`Redirected without location header while fetching ${specifier}.`);
            }
            const url = new URL(location, specifier);
            if (url.protocol !== "https:" && url.protocol !== "http:") {
                throw new Error(`Redirected to unsupported protocol '${url.protocol}' while fetching ${specifier}.`);
            }
            this.#fetchRedirects.set(specifier, url.href);
            return;
        }
        const contentType = resp.headers.get("content-type");
        const mediaType = mapContentType(new URL(specifier), contentType);
        const data = new Uint8Array(await resp.arrayBuffer());
        this.#fetchModules.set(specifier, {
            specifier,
            mediaType,
            data
        });
    }
    async #loadLocal(specifier) {
        const path = fromFileUrl2(specifier);
        const mediaType = mapContentType(specifier, null);
        const data = await Deno.readFile(path);
        return {
            specifier: specifier.href,
            mediaType,
            data
        };
    }
}
const LOADERS = [
    "native",
    "portable"
];
const DEFAULT_LOADER = await Deno.permissions.query({
    name: "run"
}).then((res)=>res.state !== "granted") ? "portable" : "native";
function denoLoaderPlugin(options = {}) {
    const loader = options.loader ?? DEFAULT_LOADER;
    if (LOADERS.indexOf(loader) === -1) {
        throw new Error(`Invalid loader: ${loader}`);
    }
    return {
        name: "deno-loader",
        setup (build) {
            const cwd = build.initialOptions.absWorkingDir ?? Deno.cwd();
            let nodeModulesDir = null;
            if (options.nodeModulesDir) {
                nodeModulesDir = join3(cwd, "node_modules");
            }
            let loaderImpl;
            const packageIdMapping = new Map();
            build.onStart(function onStart() {
                packageIdMapping.clear();
                switch(loader){
                    case "native":
                        loaderImpl = new NativeLoader({
                            infoOptions: {
                                cwd,
                                config: options.configPath,
                                importMap: options.importMapURL,
                                nodeModulesDir: options.nodeModulesDir
                            }
                        });
                        break;
                    case "portable":
                        loaderImpl = new PortableLoader();
                }
            });
            async function resolveInNodeModules(path, packageId, kind, resolveDir, importer, namespace) {
                const result = await build.resolve(path, {
                    kind,
                    resolveDir,
                    importer,
                    namespace,
                    pluginData: IN_NODE_MODULES_RESOLVED
                });
                result.pluginData = IN_NODE_MODULES;
                packageIdMapping.set(result.path, packageId);
                return result;
            }
            async function onResolve(args) {
                if (args.namespace === "file" && args.pluginData === IN_NODE_MODULES) {
                    if (nodeModulesDir) {
                        const result = await build.resolve(args.path, {
                            kind: args.kind,
                            resolveDir: args.resolveDir,
                            importer: args.importer,
                            namespace: args.namespace,
                            pluginData: IN_NODE_MODULES_RESOLVED
                        });
                        result.pluginData = IN_NODE_MODULES;
                        return result;
                    } else if (loaderImpl.nodeModulesDirForPackage && loaderImpl.packageIdFromNameInPackage) {
                        const parentPackageId = packageIdMapping.get(args.importer);
                        if (!parentPackageId) {
                            throw new Error(`Could not find package ID for importer: ${args.importer}`);
                        }
                        if (args.path.startsWith(".")) {
                            return resolveInNodeModules(args.path, parentPackageId, args.kind, args.resolveDir, args.importer, args.namespace);
                        } else {
                            let packageName;
                            let pathParts;
                            if (args.path.startsWith("@")) {
                                const [scope, name, ...rest] = args.path.split("/");
                                packageName = `${scope}/${name}`;
                                pathParts = rest;
                            } else {
                                const [name, ...rest] = args.path.split("/");
                                packageName = name;
                                pathParts = rest;
                            }
                            const packageId = loaderImpl.packageIdFromNameInPackage(packageName, parentPackageId);
                            const resolveDir = await loaderImpl.nodeModulesDirForPackage(packageId);
                            const path = [
                                packageName,
                                ...pathParts
                            ].join("/");
                            return resolveInNodeModules(path, parentPackageId, args.kind, resolveDir, args.importer, args.namespace);
                        }
                    } else {
                        throw new Error(`To use "npm:" specifiers, you must specify "nodeModulesDir: true", or use "loader: native".`);
                    }
                }
                const specifier = esbuildResolutionToURL(args);
                const res = await loaderImpl.resolve(specifier);
                switch(res.kind){
                    case "esm":
                        {
                            const { specifier  } = res;
                            return urlToEsbuildResolution(specifier);
                        }
                    case "npm":
                        {
                            let resolveDir;
                            if (nodeModulesDir) {
                                resolveDir = nodeModulesDir;
                            } else if (loaderImpl.nodeModulesDirForPackage) {
                                resolveDir = await loaderImpl.nodeModulesDirForPackage(res.packageId);
                            } else {
                                throw new Error(`To use "npm:" specifiers, you must specify "nodeModulesDir: true", or use "loader: native".`);
                            }
                            const path = `${res.packageName}${res.path ?? ""}`;
                            return resolveInNodeModules(path, res.packageId, args.kind, resolveDir, args.importer, args.namespace);
                        }
                    case "node":
                        {
                            return {
                                path: res.path,
                                external: true
                            };
                        }
                }
            }
            build.onResolve({
                filter: /.*/,
                namespace: "file"
            }, onResolve);
            build.onResolve({
                filter: /.*/,
                namespace: "http"
            }, onResolve);
            build.onResolve({
                filter: /.*/,
                namespace: "https"
            }, onResolve);
            build.onResolve({
                filter: /.*/,
                namespace: "data"
            }, onResolve);
            build.onResolve({
                filter: /.*/,
                namespace: "npm"
            }, onResolve);
            build.onResolve({
                filter: /.*/,
                namespace: "node"
            }, onResolve);
            async function onLoad(args) {
                if (args.namespace === "file" && args.pluginData === IN_NODE_MODULES) {
                    const contents = await Deno.readFile(args.path);
                    return {
                        loader: "js",
                        contents
                    };
                }
                const specifier = esbuildResolutionToURL(args);
                return loaderImpl.loadEsm(specifier);
            }
            build.onLoad({
                filter: /.*/,
                namespace: "file"
            }, onLoad);
            build.onLoad({
                filter: /.*/,
                namespace: "http"
            }, onLoad);
            build.onLoad({
                filter: /.*/,
                namespace: "https"
            }, onLoad);
            build.onLoad({
                filter: /.*/,
                namespace: "data"
            }, onLoad);
        }
    };
}
export { denoResolverPlugin as denoResolverPlugin };
export { DEFAULT_LOADER as DEFAULT_LOADER, denoLoaderPlugin as denoLoaderPlugin };
export { esbuildResolutionToURL as esbuildResolutionToURL, urlToEsbuildResolution as urlToEsbuildResolution };
function denoPlugins(opts = {}) {
    return [
        denoResolverPlugin(opts),
        denoLoaderPlugin(opts)
    ];
}
export { denoPlugins as denoPlugins };
