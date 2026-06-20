"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import ArrowIcon from "./ui/ArrowIcon";
import Eyebrow from "./ui/Eyebrow";

const ROLES = [
  "Family member",
  "Elder / patient",
  "Doctor",
  "Caregiver",
  "Partner",
  "Other",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share at least 2 characters."),
  email: z
    .email("That doesn't look like a valid email.")
    .trim()
    .min(1, "Email is required."),
  role: z.enum(ROLES, {
    message: "Pick one that fits best.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "A few more words help us reply meaningfully."),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: "",
      email: "",
      role: "Family member",
      message: "",
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
      className="border border-line bg-surface backdrop-blur-xl backdrop-saturate-140 rounded-3xl p-6 sm:p-8 md:p-12 space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Your name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          emailType
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Eyebrow className="mb-3">I am a</Eyebrow>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <label key={r} className="cursor-pointer" data-cursor="hover">
              <input
                type="radio"
                value={r}
                {...register("role")}
                className="peer sr-only"
              />
              <span className="inline-block px-4 py-2 rounded-full border border-line-strong text-sm peer-checked:border-accent peer-checked:bg-surface-strong transition-colors">
                {r}
              </span>
            </label>
          ))}
        </div>
        {errors.role?.message && (
          <span className="block mt-3 text-xs text-rose">
            {errors.role.message}
          </span>
        )}
      </div>

      <Textarea
        label="Tell us about who you care for"
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-xs text-muted leading-relaxed max-w-md">
          By submitting, you agree to our privacy policy. We use what you
          share only to reach back to you.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting || submitted || (isDirty && !isValid)}
        >
          {submitted
            ? "Thank you — we'll reply soon"
            : isSubmitting
              ? "Sending…"
              : "Send"}
          {!submitted && !isSubmitting && <ArrowIcon />}
        </Button>
      </div>
    </form>
  );
}
