import {QueryClient} from "@tanstack/react-query";

const ONE_MINUTES = 60*1000

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: ONE_MINUTES
        }
    }
})