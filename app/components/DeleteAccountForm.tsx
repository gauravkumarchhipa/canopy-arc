"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import ArrowIcon from "./ui/ArrowIcon";

const schema = z.object({
  email: z
    .email("That doesn't look like a valid email.")
    .trim()
    .min(1, "Email is required."),
  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required.")
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number."),
  reason: z
    .string()
    .trim()
    .min(10, "Please share a brief reason (at least 10 characters)."),
});

type FormValues = z.infer<typeof schema>;

export default function DeleteAccountForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      mobile: "",
      reason: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Replace with real submission (API call, server action, etc.)
    await new Promise((r) => setTimeout(r, 600));
    void data;
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass rounded-3xl p-6 sm:p-8 md:p-12 space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Email"
          emailType
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Mobile number"
          numberType
          maxLength={10}
          inputMode="numeric"
          placeholder="10-digit number"
          {...register("mobile")}
          error={errors.mobile?.message}
        />
      </div>

      <Textarea
        label="Reason for deletion"
        rows={4}
        placeholder="Tell us why you'd like to close your account…"
        {...register("reason")}
        error={errors.reason?.message}
      />

      <div className="rounded-2xl border border-line-strong bg-surface/50 p-5">
        <p className="text-xs tracking-[0.25em] uppercase text-rose mb-2">
          Permanent action
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Account deletion removes your personal identifiers from SAHAI. This
          cannot be undone. We process requests within two working days.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-xs text-muted leading-relaxed max-w-md">
          By submitting, you confirm this request is for your own account. See
          our{" "}
          <a href="/privacy-policy" className="text-accent hover:underline">
            privacy policy
          </a>{" "}
          for how we handle deletion.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting || submitted || (isDirty && !isValid)}
        >
          {submitted
            ? "Request received — we'll follow up"
            : isSubmitting
              ? "Submitting…"
              : "Request deletion"}
          {!submitted && !isSubmitting && <ArrowIcon />}
        </Button>
      </div>
    </form>
  );
}
