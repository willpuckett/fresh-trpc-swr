#!/usr/bin/env -S deno run -A --watch=static/,routes/
import dev from '$fresh/dev.ts'
Deno.env.set('IS_DEV', 'true')
await dev(import.meta.url, './main.ts')
