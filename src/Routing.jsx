import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ContentView } from "./ContentView";
import { getContentById, isValidId } from "./dataAccess";
import { ContentFeed } from "./ContentFeed";
import { CreateContent } from "./CreateContent";
import { Layout } from "./Layout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {index: true, Component: ContentFeed},
            {
                Component: ContentFeed,
                path: "content/:cid",
                children: 
                [    
                    {
                        index: true,
                        Component: ContentView,
                        loader: async ({ params }) => {
                            const cid = Number(params.cid) || 0;
                            const isValidContent = await isValidId(cid);
                            if (!isValidContent) return redirect("/");
                            const content = await getContentById(cid);
                            return {content: content};
                        }
                    }
                ]
            }
            ,
            {
                path: "create",
                Component: CreateContent
            }
        ]
    },

]);


export function CMSRouterProvider(){
    return (
        <RouterProvider router={router} />
    )
}

