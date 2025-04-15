import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ContentView } from "./ContentView";
import { createContent, editContent, getContentById, getContentList, getNumberOfPages, isValidId, removeContent } from "./dataAccess";
import { ContentFeed } from "./ContentFeed";
import { CreateContent } from "./CreateContent";
import { Layout } from "./Layout";
import { ManagementMode } from "./ManagementMode";
import { EditContent } from "./EditContent";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {index: true, Component: ContentFeed, loader: paginationLoader,},
            {path: "manage", Component: ManagementMode,
            loader: paginationLoader,
                children: [
                    {
                        path: "remove",
                        action: async ({request}) => {
                            const cid = Number((await request.formData()).get("cid"));
                            await removeContent(cid);
                        }
                    },
                ]
            },
            {
                Component: ContentFeed,
                loader: paginationLoader,
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
            },
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
            {
                path: "edit/:cid",
                Component: EditContent,
                loader: async ({params}) => {
                    const cid = Number(params.cid) || 0;
                    const isValidContent = await isValidId(cid);
                    if (!isValidContent) return redirect("/manage");
                    return await getContentById(cid);
                },
                children:[{
                    path: "submitChanges",
                    action: async({request}) => {
                        const formData = await request.formData();
                        await editContent(formData.get("title"), formData.get("image"), formData.get("content"), formData.get("id"));
                        return redirect("/manage");
                    }
                }]
            }
        ]
    },
    
]);


export function CMSRouterProvider(){
    return (
        <RouterProvider router={router} />
        )
    }
    
    
async function paginationLoader({request}){
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 9;
    const page = Number(url.searchParams.get("page")) || 1;
    const maxPageNumber = await getNumberOfPages(limit);

    if (maxPageNumber > 0 && (page > maxPageNumber || page < 1)){
        url.searchParams.set("page", page < 1 ? 1 : maxPageNumber);
        return redirect(url.toString());
    } 

    const contentList = await getContentList(limit, page - 1);
    return {contentList, maxPageNumber, currentPage: page, currentUrlParams: url.searchParams.toString()}
}