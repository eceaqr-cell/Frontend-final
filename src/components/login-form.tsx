"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Incorrect email or password");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "theme-page flex min-h-screen flex-col items-center justify-center bg-muted/40 p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className="w-full max-w-sm">
        <Card className="border border-border/60 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-4">
                <Field className="space-y-2">
                  <FieldLabel htmlFor="email" className="text-sm font-medium">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    required
                    className="h-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Field className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Password
                    </FieldLabel>
                    <Link
                      href="#"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="h-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Field className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    className="h-10 w-full font-medium"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  <FieldDescription className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/Register"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Sign up
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
