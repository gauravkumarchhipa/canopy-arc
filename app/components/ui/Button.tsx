import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "secondary";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  secondary: "btn-secondary",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type Props = ButtonAsButton | ButtonAsLink;

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export default function Button(props: Props) {
  const variant = props.variant ?? "primary";
  const cls = `${VARIANT_CLASS[variant]}${props.className ? " " + props.className : ""}`;

  if ("href" in props && props.href) {
    const linkProps = props as ButtonAsLink;
    if (isExternalHref(linkProps.href)) {
      return (
        <a
          href={linkProps.href}
          target={linkProps.target}
          rel={
            linkProps.rel ??
            (linkProps.href.startsWith("http") ? "noopener noreferrer" : undefined)
          }
          className={cls}
        >
          {linkProps.children}
        </a>
      );
    }
    return (
      <Link href={linkProps.href} className={cls}>
        {linkProps.children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      className={cls}
    >
      {buttonProps.children}
    </button>
  );
}
