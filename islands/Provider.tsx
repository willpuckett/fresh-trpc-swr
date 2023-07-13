// // routes/_app.tsx
import { ComponentChildren } from 'preact'
import { trpc } from "../trpc/swr.ts";
import { useSignal } from "@preact/signals";

    export default ({ children }: { children: ComponentChildren }) => {
    const client = useSignal( trpc.createClient());
    return (
        <trpc.Provider client={client.value}>
{children}        
</trpc.Provider>
    );
};