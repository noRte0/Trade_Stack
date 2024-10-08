"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function Pagination({page,hasPrev,hasNext}) {

    const router = useRouter();

    return (
        <div className="justify-between flex">
            <div className="left-0 mr-6 ml-6 pt-5 pl-6">
            <button disabled={!hasPrev} onClick={()=> router.push(`?page=${page-1}`)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:text-neutral-300">Previous</button>
            </div>
            <div className="right-0 mr-6 ml-6 pt-5">
            <button disabled={!hasNext} onClick={()=> router.push(`?page=${page+1}`)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:text-neutral-300">Next</button>
            </div>
        </div>
    )
}