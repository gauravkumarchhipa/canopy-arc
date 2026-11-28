"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSchema } from "../../lib/form-validation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { IconSend } from "./footer/FooterIcons";

const schema = z.object({ email: emailSchema });

export default function NewsletterForm({ recipient }: { recipient: string }) {
  const [draftPrepared, setDraftPrepared] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const openDraft = handleSubmit(({ email }) => {
    const subject = encodeURIComponent("Canopy Arc newsletter subscription");
    const body = encodeURIComponent(`Please subscribe this address to the Canopy Arc newsletter: ${email}`);
    window.location.assign(`mailto:${recipient}?subject=${subject}&body=${body}`);
    setDraftPrepared(true);
  });

  return (
    <form className="footer-subscribe-form" noValidate onSubmit={openDraft} onChange={() => setDraftPrepared(false)}>
      <Input
        type="email"
        autoComplete="email"
        required
        normalize={false}
        size="lg"
        variant="outline"
        placeholder="Enter your email"
        aria-label="Newsletter email"
        {...register("email")}
        error={errors.email?.message}
        rightIcon={
          <Button variant="unstyled" type="submit" className="footer-subscribe-button" aria-label="Open newsletter subscription email draft">
            <IconSend />
          </Button>
        }
      />
      <p role="status" className="footer-subscribe-status">
        {draftPrepared && "Review and send your subscription request in your email app."}
      </p>
    </form>
  );
}
