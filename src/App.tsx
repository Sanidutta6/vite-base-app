import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import {  } from "@/components/component-example";

const router = createRouter({
    routeTree,
    context: undefined,
})

export function App() {
    return (
        <RouterProvider
            router={router}
        />
    );
}

export default App;