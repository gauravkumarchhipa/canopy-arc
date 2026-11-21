import Link from "next/link";
import type { ComponentProps } from "react";
import { tw } from "../../lib/tw";

const variants = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  secondary: "btn-secondary",
  "header-primary": `${tw.headerBtnBase} ${tw.headerBtnPrimary}`,
  "header-ghost": `${tw.headerBtnBase} ${tw.headerBtnGhost}`,
  "story-primary": "story-button",
  "story-ghost": "story-ghost-button",
  "story-text": "story-text-link",
  unstyled: "",
} as const;

const routerOptions = [
  "onNavigate", "prefetch", "replace", "scroll", "shallow", "passHref", "legacyBehavior", "locale",
] as const;

type VariantProps = { variant?: keyof typeof variants };
type NativeButtonProps = VariantProps & ComponentProps<"button"> & { href?: never; as?: never };
type NativeLinkProps = VariantProps & ComponentProps<"a"> & { href: string; as: "a" };
type RouterLinkProps = VariantProps & Omit<ComponentProps<typeof Link>, "as" | "href"> & { href: string; as?: never };

function isExternal(href: string) {
  return /^(?:https?:\/\/|mailto:|tel:)/.test(href);
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: NativeButtonProps | NativeLinkProps | RouterLinkProps) {
  const classes = [variants[variant], className].filter(Boolean).join(" ") || undefined;

  if (typeof props.href === "string") {
    if (props.as === "a") {
      const { as: Tag, ...anchor } = props;
      return <Tag {...anchor} className={classes} />;
    }

    if (isExternal(props.href)) {
      const anchor = { ...props };
      for (const option of routerOptions) delete anchor[option];
      const rel = anchor.rel ?? (/^https?:\/\//.test(anchor.href) ? "noopener noreferrer" : undefined);
      return <a {...anchor} rel={rel} className={classes} />;
    }

    return <Link {...props} className={classes} />;
  }

  return <button {...props} type={props.type ?? "button"} className={classes} />;
}
