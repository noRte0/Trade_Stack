'use client';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { app } from "@/app/utils/firebase";

const storage = getStorage(app);

export default function CreateBlog() {
  const { data: session, status } = useSession();
  const [product, setProduct] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false); // New state for upload status

  useEffect(() => {
    const upload = () => {
      if (!file) return; // Exit if there is no file
      const name = new Date().getTime() + file.name; // Correctly call getTime
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true); // Set uploading to true

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          setError("Upload failed: " + error.message); // Set error state on failure
          setUploading(false); // Set uploading to false
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            setUploading(false); // Set uploading to false
          });
        }
      );
    };

    upload(); // Correctly call the upload function
  }, [file]);

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/sign_in");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!about || !product || !media) { // Ensure media is present
      setError("All fields are required");
      return;
    }

    const slugify = (str) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    try {
      const res = await fetch("/api/blog-write/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product,
          about,
          photo: media,
          slug: slugify(product),
        })
      });
      console.log(res)

      if (res.ok) {
        const form = e.target;
        setError("");
        form.reset();
      } else {
        const errorMessage = await res.json();
        setError(errorMessage.message);
        console.log("Create blog failed:", errorMessage);
      }

    } catch (error) {
      console.log("Error during Create", error);
    }
  }

  return (
    <div className="mx-11 my-4">
      <form onSubmit={handleSubmit} className="mx-11 my-11">

        {error && (
          <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
            {error}
          </div>
        )}

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">Share your ideas!</h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">Title and Product</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input onChange={(e) => setProduct(e.target.value)} type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                <div className="mt-2">
                  <input onChange={(e) => setAbout(e.target.value)} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setFile(e.target.files[0])} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-2">
          <a href="/">
            <button type="button" className="text-sm font-semibold leading-6 shadow-xl p-3 rounded-2xl bg-gray-700 text-white delay-150 duration-100 hover:scale-125">Cancel</button>
          </a>
          <button type="submit" className={`text-sm font-semibold leading-6 text-white shadow-xl bg-green-600 p-3 rounded-2xl transition ease-in-out delay-75 duration-75 hover:scale-125 hover:text-white ${uploading ? "bg-gray-400" : "hover:bg-gradient-to-r from-yellow-500 to-blue-500"}`} disabled={uploading}>
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}
