import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[a-z]/, "Include at least one lowercase letter.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.");

export const signInSchema = z.object({
  email: z
    .email("Enter a valid email address.")
    .trim()
    .min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

export const signUpSchema = z
  .object({
    email: z
      .email("Enter a valid email address.")
      .trim()
      .min(1, "Email is required."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
