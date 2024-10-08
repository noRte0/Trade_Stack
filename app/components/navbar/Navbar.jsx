'use client';
import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the hamburger menu
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";


export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the mobile menu visibility
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage the profile menu visibility
  const profileMenuRef = useRef(null); // Ref to track profile menu container

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close the profile menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="pt-12">
      <div className="pt-12">
        <div className="block w-full max-w-screen-xl pt-9 px-8 py-10 mx-auto text-black bg-white border shadow-md rounded-xl border-white/80 bg-opacity-90 backdrop-blur-2xl backdrop-saturate-200 fixed top-2 left-0 right-0 bg-gradient-to-r from-yellow-500 to-blue-500 z-50">
          {/* Navbar top layer */}
          <nav className="block w-full max-w-screen-xl px-6 py-3 mx-auto text-black bg-white border shadow-md rounded-xl border-white/80 backdrop-blur-2xl backdrop-saturate-200 fixed top-0 left-0 right-0 z-49">
            <div className="flex items-center justify-between text-blue-gray-900">
              {/* Leftside text */}
              <a
                href="/"
                className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-extrabold leading-relaxed tracking-normal text-inherit antialiased"
              >
                TradeStack
              </a>

              {/* Hamburger Menu for mobile */}
              <div className="lg:hidden">
                <button
                  className="text-blue-gray-900 focus:outline-none"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <FaTimes size={20} /> // Close icon when menu is open (smaller size)
                  ) : (
                    <FaBars size={20} /> // Menu icon when menu is closed (smaller size)
                  )}
                </button>
              </div>

              {/* Regular Navbar links for larger screens */}
              <div className="hidden lg:flex flex-row items-center gap-2">
                <ul className="flex flex-row gap-1">
                  <li className="block p-2.5 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-300 border rounded-xl border-white/80">
                    <a href="/" className="flex items-center transition-colors hover:text-slate-500">
                      Blog
                    </a>
                  </li>
                  <li className="block p-2.5 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-300 border rounded-xl border-white/80">
                    <a href="/tools" className="flex items-center transition-colors hover:text-slate-500">
                      Tools
                    </a>
                  </li>
                  <li className="block p-2.5 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-300 border rounded-xl border-white/80">
                    <a href="/news" className="flex items-center transition-colors hover:text-slate-500">
                      News
                    </a>
                  </li>
                  <li className="block p-2.5 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-300 border rounded-xl border-white/80">
                    <a href="/techniques" className="flex items-center transition-colors hover:text-slate-500">
                      Techniques
                    </a>
                  </li>
                  <li className="block p-2.5 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-300 border rounded-xl border-white/80">
                    <a href="/profile" className="flex items-center transition-colors hover:text-slate-400">
                      Profile
                    </a>
                  </li>
                </ul>

                <div className="h-9 w-0.5 bg-black"></div>

                {/* Conditional Rendering for Authenticated User */}
                {status === "authenticated" ? (
                  // Profile Picture when authenticated
                  <div className="relative ml-3" ref={profileMenuRef}>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={isProfileMenuOpen}
                      aria-haspopup="true"
                      onClick={toggleProfileMenu}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        src={session?.user?.image ||"https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg"}
                        alt={session?.user?.image ||"User Profile"}
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full text-black py-2 rounded text-left px-4"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // SIGN IN button when not authenticated
                  <li className="block p-2.5 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 hover:bg-gradient-to-r from-blue-300 to-blue-500 border rounded-xl border-white/80">
                    <a href="/sign_in" className="flex items-center transition-colors hover:text-gray-50">
                      SIGN IN
                    </a>
                  </li>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu - Separate Layer */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white/90 shadow-md rounded-lg py-4 lg:hidden z-40">
              <ul className="flex flex-col gap-1 px-4">
                <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                  <a href="/" className="flex items-center transition-colors hover:text-slate-500">
                    Blog
                  </a>
                </li>
                <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                  <a href="/news" className="flex items-center transition-colors hover:text-slate-500">
                    News
                  </a>
                </li>
                <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                  <a href="/techniques" className="flex items-center transition-colors hover:text-slate-500">
                    Techniques
                  </a>
                </li>
                <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                  <a href="/profile" className="flex items-center transition-colors hover:text-slate-400">
                    Profile
                  </a>
                </li>
                <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                  <a href="/tools" className="flex items-center transition-colors hover:text-slate-400">
                    Tools
                  </a>
                </li>
                {status === "authenticated" ? (
                  <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 hover:bg-gray-200 border rounded-lg border-white/80">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-black py-2 rounded"
                    >
                      <IoLogOutOutline />
                    </button>
                  </li>
                ) : (
                  <li className="block p-2 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 hover:bg-gradient-to-r from-blue-300 to-blue-500 border rounded-lg border-white/80">
                    <a href="/sign_in" className="flex items-center transition-colors hover:text-gray-50">
                      SIGN IN
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
