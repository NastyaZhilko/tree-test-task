import React from 'react';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../shared/api/query-client";
import {Tree} from "../modules/tree/Tree";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Tree/>
        </QueryClientProvider>
    )
}

export default App;
