
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();

  // Email Sign Up
  const handleEmailSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(
      formData.entries()
    ) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign up failed. Try again!");
        console.log(error);
        return;
      }

      if (data) {
        toast.success("Successfully signed up!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign up failed!");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

 

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto my-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Create an Account
          </CardTitle>
          <CardDescription>
            Sign up with Google, Github or your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>

              {/* Google Sign Up */}
              <Field>
                <Button
                  onClick={handleGoogleSignUp}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>


              <FieldSeparator>
                Or continue with email
              </FieldSeparator>

              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              {/* Image URL */}
              <Field>
                <FieldLabel htmlFor="image">
                  Image URL
                </FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter your image URL"
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  minLength={8}
                  required
                />
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" className="w-full">
                  Register
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:underline"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>.
      </FieldDescription>
    </div>
  );
}
