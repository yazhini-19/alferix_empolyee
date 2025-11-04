"use client";

import Image from "next/image";
import { useState } from "react";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f5f8ff] font-sans px-4 overflow-hidden">
      {/* Background logo (faded & centered) */}
      <div className="flex items-center justify-center opacity-10">
        <Image
          src="/logo-dark.png"
          alt="Alferix Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Auth card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-white/30">
        {isSignIn ? (
          <>
            <h2 className="text-center text-xl font-semibold mb-1">Sign In</h2>
            <p className="text-center text-gray-600 mb-6">
              Please enter your credentials to sign in
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@alferix.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-2 rounded-md hover:bg-gray-900 transition"
              >
                Sign In
              </button>
            </form>
            <p className="text-center text-gray-700 mt-6">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center text-xl font-semibold mb-1">
              Create an Account
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Use your Alferix email address
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@alferix.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block font-semibold mb-1"
                >
                  Re-enter Password
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-2 rounded-md hover:bg-gray-900 transition"
              >
                Send OTP
              </button>
            </form>
            <p className="text-center text-gray-700 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign innnnnn
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}