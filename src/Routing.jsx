import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ContentView } from "./ContentView";
import { createContent, getContentById, isValidId } from "./dataAccess";
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
                Component: CreateContent,
                children: [{
                    path: "submit",
                    action: async ({request}) => {

                        const formData = await request.formData();
                        await createContent(formData.get("title"), formData.get("image"), formData.get("content"));
                        
                        return redirect("/");
                        
                    }
                }],
                
                
            },
        ]
    },

]);


export function CMSRouterProvider(){
    return (
        <RouterProvider router={router} />
    )
}

