"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { tw } from "../../lib/tw";
import { signInSchema, type SignInValues } from "./auth-schemas";

type SignInResponse = {
  ok?: boolean;
  error?: string;
};

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");
  const [authError, setAuthError] = useState<string | null>(
    callbackError === "auth_callback_failed"
      ? "Email confirmation failed. Please try signing in again."
      : null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setAuthError(null);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as SignInResponse;

      if (!response.ok || !result.ok) {
        setAuthError(result.error ?? "Invalid email or password. Please try again.");
        return;
      }

      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setAuthError(
        "Cannot reach the server. Check your connection and Supabase configuration.",
      );
    }
  };

  return (
    <div className={`${tw.glass} rounded-3xl p-6 sm:p-8`}>
      <p className="text-xs tracking-[0.28em] uppercase text-muted">Welcome back</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-[1.75rem]">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-muted">
        Enter your email and password to continue.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-6"
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          emailType
          placeholder="you@company.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          isPassword
          autoComplete="current-password"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {authError ? (
          <p className="rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
            {authError}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-accent transition-colors hover:text-foreground"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
