"use client"

import React, { useState } from 'react'

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    //-------------------------------------------------------- 1. common variable//  
    const handleSubmit = async (e) => {  //-handlesubmit (handle error,fetch API)-//

        e.preventDefault();  //-ช่วยให้เราสามารถควบคุมการทำงานของฟอร์มได้เอง โดยไม่ให้เกิดการรีเฟรชหน้าเว็บ-//

        if (password != confirmPassword) {
            setError("Password do not match!");
            return;
        }

        if (!name || !password || !email || !confirmPassword) {
            setError("plese complete all input");
            return;
        }
        //-------------------------------------------------------- 2. variable function for handle error//
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {   //-ใช้ฟังก์ชัน fetch เพื่อทำคำร้องขอ (request) แบบ HTTP ไปยัง URL ที่กำหนด - //
                method: "POST",   //-กำหนดว่าคำร้องขอนี้เป็นคำร้องขอแบบ POST ซึ่งใช้สำหรับการส่งข้อมูลใหม่ไปยังเซิร์ฟเวอร์-//
                headers: {
                    "Content-Type": "application/json"   //-กำหนดให้ข้อมูลที่ส่งไปนั้นมีรูปแบบเป็น JSON-//
                },
                body: JSON.stringify({    //-ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์อยู่ในรูปแบบของ JSON สตริง โดยใช้ JSON.stringify เพื่อแปลงออบเจกต์ { name, email, password } ให้เป็นสตริง JSON-//
                    name,
                    email,
                    password
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                form.reset();
            } else {
                console.log("User registration failed")
            }

        } catch (error) {
            console.log("Error during Registration", error);
        }
    }

    //--------------------------------------------------------3. API to api/auth/signup//
    return (
        <div className="flex h-screen items-center justify-center">
            <div className='bg-gradient-to-r from-yellow-500 to-blue-500 p-2 rounded-md shadow-md w-96'>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                    {error && (
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                            {error}
                        </div>
                    )}
                    <h3 className='text-center font-extrabold pb-4'>Sign up</h3>
                    <div className='justify-center items-center'>
                        <div className=' py-1'>
                            <div>username</div>
                            <input onChange={(e) => setName(e.target.value)} type="text" className=' border-gray-300 border rounded-md pr-32' />
                        </div>
                        <div className=' py-1'>
                            <div>Email</div>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className=' border-gray-300 border rounded-md pr-32' />
                        </div>
                        <div className='py-1'>
                            <div>Password</div>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className=' border-gray-300 border rounded-md pr-32' />
                        </div>
                        <div className='py-1 pb-4'>
                            <div>Confirmpassword</div>
                            <input onChange={(e) => setconfirmPassword(e.target.value)} type="password" className=' border-gray-300 border rounded-md pr-32' />
                        </div>
                    </div>
                    <button type='submit' className=' bg-sky-500 p-2 rounded-lg text-white w-full' >sign up</button>
                </form>
            </div>
        </div>
    )
    //--------------------------------------------------------4. HTML to get input from user//
}
