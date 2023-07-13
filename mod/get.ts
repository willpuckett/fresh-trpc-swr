import { download } from "https://deno.land/x/download/mod.ts";

const mods = {
    "twind": "https://bundle.deno.dev/https://esm.sh/twind@0.16.19",
    "@trpc/client": "https://bundle.deno.dev/https://esm.sh/@trpc/client@10.34.0",
    "@trpc/server": "https://bundle.deno.dev/https://esm.sh/@trpc/server@10.34.0",
    "kv_oauth": "https://bundle.deno.dev/https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts",
    "zod": "https://bundle.deno.dev/https://esm.sh/zod@3.21.4",
    "@preact/signals-core": "https://bundle.deno.dev/https://esm.sh/@preact/signals-core@1.2.3",
    // "use-sync-external-store": "https://bundle.deno.dev/https://esm.sh/*use-sync-external-store@1.2.0",
}

for (const [file, url] of Object.entries(mods)) {

    try {
      const fileObj = await download(url, {
        file: file.replace('@', '').replace('/', '_') + ".ts",
        dir: "./mod",
      });
    } catch (err) {
      console.log(err);
    }
}
