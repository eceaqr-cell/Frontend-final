"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateAccount() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="theme-page flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans text-foreground transition-colors">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Create an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="register-email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email address
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            Register
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-3 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-foreground hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
