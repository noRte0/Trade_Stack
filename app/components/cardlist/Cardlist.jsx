import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";


const getData = async (page) => {

    try {
        const res = await fetch(`http://localhost:3000/api/blogs?page=${page}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed");
        }
            return await res.json();
    } catch {
        console.log("An error occurred:");

        return { blogs: [], count: 0 };
     
    }
}

export default async function Cardlist({page}) {
    const {blogs,count} = await getData(page)
    
    const POST_PER_PAGE =5;
    const hasPrev = POST_PER_PAGE *(page-1)>0;
    const hasNext = POST_PER_PAGE *(page-1) + POST_PER_PAGE<count;

    return (
        <div className="pl-6 pr-6">
            <div className="container flex flex-col min-h-screen">
                <div className="flex-grow">
                    {blogs?.map((item) => ( 
                        <Card item={item} key={item.id}/>
                    ))}
                    <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
                </div>
                <a href="/components/write">
                    <button className="transition ease-in-out delay-150 duration-300 hover:scale-125 hover:bg-gray-200 border-gray border-gray-400 border-1 z-48 fixed bottom-5 left-8 bg-white py-2 px-2 shadow-lg rounded-full disabled:bg-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(0,0,0,1)"><path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                    </button>
                </a>
            </div>
        </div>
    )
}

