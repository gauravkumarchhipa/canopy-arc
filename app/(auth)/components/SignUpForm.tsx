"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { tw } from "../../lib/tw";
import { signUpSchema, type SignUpValues } from "./auth-schemas";

type SignUpResponse = {
  ok?: boolean;
  needsEmailConfirmation?: boolean;
  error?: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setAuthError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as SignUpResponse;

      if (!response.ok || !result.ok) {
        setAuthError(result.error ?? "Sign up failed. Please try again.");
        return;
      }

      if (result.needsEmailConfirmation) {
        setSuccessMessage(
          "Account created. Check your email to confirm your address, then sign in.",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setAuthError(
        "Cannot reach the server. Check your connection and Supabase configuration.",
      );
    }
  };

  return (
    <div className={`${tw.glass} rounded-3xl p-6 sm:p-8`}>
      <p className="text-xs tracking-[0.28em] uppercase text-muted">Get started</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-[1.75rem]">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-muted">
        Join Canopy Arc to collaborate and ship faster.
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          helperText="Use 8+ characters with upper, lower, and a number."
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          label="Confirm password"
          isPassword
          autoComplete="new-password"
          placeholder="Repeat your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {authError ? (
          <p className="rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
            {authError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground">
            {successMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-accent transition-colors hover:text-foreground"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
