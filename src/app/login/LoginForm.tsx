
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Email Login
  const handleEmailLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const user = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: callbackUrl,
      });

      if (error) {
        setErrorMessage(error.message || "Login failed!");
        return;
      }

      if (data) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignUp = async () => {
    try {
      setErrorMessage("");

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      if (error) {
        setErrorMessage(error.message || "Google login failed!");
        console.log(error);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your account to continue
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {/* Email Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignUp}
          className="w-full"
        >
          Continue with Google
        </Button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;
