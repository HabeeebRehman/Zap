"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import useSignIn from "@/features/auth/api/use-sign-in";
import SignInForm from "@/features/auth/components/sign-in-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const signInMutation = useSignIn();
  const isPending = signInMutation.isPending;

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-2xl font-black text-white italic">Z</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SignInForm 
          defaultValues={{ email: "", password: "" }} 
          disabled={isPending} 
          onSubmit={(values) => signInMutation.mutate(values)} 
        />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center pb-8 border-t bg-muted/30 pt-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link 
            href="/sign-up" 
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
