import React from "react";
import Image from "next/image";
import Comments from "@/app/components/comments/Comments";

const getData = async (slug) => {

    try {
        const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed");
        }
        return res.json();
    } catch {
        console.log("An error occurred:");

    }
}

export default async function Singlepost({ params }) {
    const { slug } = params;

    const data = await getData(slug);

    return (
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                <div class="py-8">
                <div className="relative w-full h-screen">
                        <Image
                            src={data?.photo || "https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg"}
                            alt="Sample Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl pb-5"
                        />
                    </div>
               
                    <h1 class="text-3xl font-bold mb-2">{data?.product}</h1>
                    <p class="text-gray-500 text-sm">Published on <time>{data?.createdAt.substring(0, 10)}</time></p>
                </div>

                <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                    <p>{data?.about}</p>
                </div>
                <div className="pt-6 pb-4">
                <hr className='block max-w-screen-xl mx-auto text-black shadow-md rounded-xl bg-opacity-90 bg-gradient-to-r from-blue-500 to-yellow-500 h-1' />
                </div>
                <div className="pt-4">
                    <Comments blogSlug={slug}/>
                </div>
            </div>
        </div>
    )
}