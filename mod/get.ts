import { download } from "https://deno.land/x/download/mod.ts";

const mods = {
    "twind": "https://bundle.deno.dev/https://esm.sh/twind@0.16.19",
    "@trpc/client": "https://bundle.deno.dev/https://esm.sh/@trpc/client@10.34.0",
    "@trpc/server": "https://bundle.deno.dev/https://esm.sh/@trpc/server@10.34.0",
    "kv_oauth": "https://bundle.deno.dev/https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts",
    "zod": "https://bundle.deno.dev/https://esm.sh/zod@3.21.4",
    "@preact/signals-core": "https://bundle.deno.dev/https://esm.sh/@preact/signals-core@1.2.3",
    "@trpc/server/adapters/fetch": "https://bundle.deno.dev/https://esm.sh/@trpc/server@10.34.0/adapters/fetch",
    "@trpc/server/shared": "https://bundle.deno.dev/https://esm.sh/@trpc/server@10.34.0/shared",
       "preact": "https://esm.sh/preact@10.15.1?deps=preact@10.15.1&external=preact",
    "preact/hooks": "https://bundle.deno.dev/https://esm.sh/preact@10.15.1/hooks?deps=preact@10.15.1&external=preact",
    "preact/debug": "https://bundle.deno.dev/https://esm.sh/preact@10.15.1/debug?deps=preact@10.15.1&external=preact",
    "preact/jsx-runtime": "https://esm.sh/preact@10.15.1/jsx-runtime?deps=preact@10.15.1&external=preact",
    "preact/compat": "https://bundle.deno.dev/https://esm.sh/preact@10.15.1/compat?deps=preact@10.15.1&external=preact",
    "preact/devtools": "https://bundle.deno.dev/https://esm.sh/preact@10.15.1/devtools?deps=preact@10.15.1&external=preact",
    "react": "https://esm.sh/preact@10.15.1/compat?deps=preact@10.15.1&external=preact",
    "react/jsx-runtime": "https://bundle.deno.dev/https://esm.sh/preact@10.15.1/jsx-runtime?deps=preact@10.15.1&external=preact",
  
}

for (const [file, url] of Object.entries(mods)) {

    try {
      const fileObj = await download(url, {
        file: file.replaceAll('@', '').replaceAll('/', '_').replaceAll('-', '_') + ".js",
        dir: "./mod",
      });
      console.log(fileObj);
    } catch (err) {
      console.log(err);
    }
}


// deno bundle https://deno.land/x/fresh@1.2.0/src/server/deps.ts mod/fresh_src_server_deps.js