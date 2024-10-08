"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }

    return data;
};

const Comments = ({ blogSlug }) => {
    const { status } = useSession();
    const { data, mutate, isLoading } = useSWR(
        `http://localhost:3000/api/comments?blogSlug=${blogSlug}`,
        fetcher
    );

    const [desc, setDesc] = useState("");

    const handleSubmit = async () => {
        if (desc.trim() === "") return; // Prevent submission if textarea is empty

        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, blogSlug }),
            headers: { 'Content-Type': 'application/json' },
        });
        setDesc(""); // Clear the textarea after submission
        mutate();
    };

    return (
        <div>
            <div className="pb-2">
                <h1>Discussion</h1>
            </div>
            {status === "authenticated" ? (
                <div>
                    <textarea
                        className="border-2 border-gray-300 rounded-lg px-0 w-full text-sm text-gray-900 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="write a comment..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <div className="pt-3 pb-2">
                        <button
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-300 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            onClick={handleSubmit}
                            disabled={desc.trim() === ""} // Disable button if textarea is empty
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Send
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <Link href="/sign_up">Login to write a comment</Link>
            )}
            <div>
                {isLoading
                    ? "loading"
                    : data?.map((item) => (
                        <div key={item._id} className="flex mb-4">
                            <div className="flex-shrink-0 mr-3">
                                <Image
                                    src={item?.user?.image || "https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg"}
                                    alt={item?.user?.image || "User image"}
                                    width={35}
                                    height={35}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="pt-1xw">
                                <div className="text-sm">
                                    <span>{item.createdAt.substring(0, 10)}</span>
                                </div>
                                <div className="font-semibold">
                                    <span>{item.user.name}</span>
                                </div>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Comments;
