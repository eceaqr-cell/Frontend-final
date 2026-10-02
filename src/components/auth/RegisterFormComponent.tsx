"use client"; 

import Link from 'next/link';
import React from 'react';

export default function CreateAccount() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };



  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen font-sans">

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8 mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Email address
            </label>
            <input 
              type="email" 
              required 
              className="w-full px-3.5 py-2.5 text-gray-900 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              required 
              className="w-full px-3.5 py-2.5 text-gray-900 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-[#1a1a1a] hover:bg-black text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            <Link href="/">Register</Link>
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-gray-900 font-semibold hover:underline">Login</Link>
      </div>
    </div>
  );
}
