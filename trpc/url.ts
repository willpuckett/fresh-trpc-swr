const where = window.location
  ? window.location?.origin
  : 'https://tropic.deno.dev'
const path = new URL(where)
path.pathname = '/api'
export const url = path.href
