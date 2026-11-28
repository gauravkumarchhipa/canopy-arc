"use client";

import Button from "../../ui/Button";
import ArrowIcon from "../../ui/ArrowIcon";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema } from "../../../lib/form-validation";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name using at least 2 characters."),
  email: emailSchema,
  message: z.string().trim().min(10, "Tell us about your project in at least 10 characters."),
});

export default function ContactForm({ email }: { email: string }) {
  const [draftPrepared, setDraftPrepared] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const openDraft = handleSubmit(({ name, email: replyTo, message }) => {
    const subject = encodeURIComponent("Canopy Arc project inquiry");
    const body = encodeURIComponent(`Name: ${name}\r\nEmail: ${replyTo}\r\n\r\n${message}`);
    window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
    setDraftPrepared(true);
  });

  return (
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      noValidate
      className="contact-panel contact-form"
      aria-labelledby="contact-form-title"
      onSubmit={openDraft}
      onChange={() => setDraftPrepared(false)}
    >
      <Heading id="contact-form-title">Project inquiry</Heading>
      <div className="contact-form-fields">
        <Input label="Name" variant="outline" normalize={false} required autoComplete="name"
          placeholder="Your name" {...register("name")} error={errors.name?.message} />
        <Input label="Email" variant="outline" normalize={false} required type="email" autoComplete="email"
          placeholder="you@company.com" {...register("email")} error={errors.email?.message} />
      </div>

      <Textarea label="Message" variant="outline" required placeholder="Tell us what you want to build…"
        {...register("message")} error={errors.message?.message} />

      <div className="contact-form-footer">
        <Button variant="unstyled" type="submit" className="contact-submit">
          Open email draft <span aria-hidden="true"><ArrowIcon direction="right" /></span>
        </Button>
        <p role="status">
          {draftPrepared ? "Review and send the draft in your email app." : "Send the inquiry from your email app."}
        </p>
      </div>
    </form>
  );
}
