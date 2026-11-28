import { z } from "zod";

export const emailSchema = z.string().trim()
  .min(1, "Enter your email address.")
  .pipe(z.email("Enter a valid email address."));
