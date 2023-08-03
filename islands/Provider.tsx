import { ComponentChildren } from 'preact'
import { useSignal } from '@preact/signals'
import { trpc } from '@/trpc/swr.ts'

export default ({ children }: { children: ComponentChildren }) => {
  const client = useSignal(trpc.createClient())
  return (
    <trpc.Provider client={client.value}>
      {children}
    </trpc.Provider>
  )
}
