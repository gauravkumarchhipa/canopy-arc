"use client";

import Button from "./Button";
import Field, { fieldDescription, type FieldProps } from "./Field";
import styles from "./Field.module.css";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

type TrimType = "trim" | "trimStart";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & FieldProps & {
  // Value transformations
  trimType?: TrimType;
  emailType?: boolean;
  numberType?: boolean;
  noSpecialChars?: boolean;
  alphanumeric?: boolean;
  alphanumericCharacter?: boolean;
  normalize?: boolean;
  // Features
  isPassword?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onValueChange?: (val: string) => void;
  ref?: Ref<HTMLInputElement>;
};

type TransformOpts = {
  emailType?: boolean;
  isPassword?: boolean;
  type?: string;
  trimType?: TrimType;
  noSpecialChars?: boolean;
  alphanumeric?: boolean;
  alphanumericCharacter?: boolean;
  numberType?: boolean;
  maxLength?: number;
};

function transformValue(raw: string, opts: TransformOpts): string {
  let val = raw;

  // Email / password — never allow whitespace
  if (
    opts.emailType ||
    opts.isPassword ||
    opts.type === "email" ||
    opts.type === "password"
  ) {
    val = val.replace(/\s+/g, "");
    if (opts.emailType) val = val.toLowerCase();
  } else {
    const mode = opts.trimType || "trimStart";
    if (mode === "trim") {
      val = val.replace(/\s+/g, "").trim();
    } else {
      val = val.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    }
  }

  // Character filters
  if (opts.noSpecialChars) {
    val = val.replace(/[^a-zA-Z0-9-_ ]/g, "");
  }
  if (opts.alphanumeric) {
    val = val
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/^\s+/, "")
      .replace(/\s{2,}/g, " ");
  }
  if (opts.alphanumericCharacter) {
    val = val
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/^\s+/, "")
      .replace(/\s{2,}/g, " ");
  }

  // Numeric only
  if (opts.numberType) {
    val = val.replace(/\D/g, "");
  }

  // Max length cap
  if (opts.maxLength && val.length > opts.maxLength) {
    val = val.slice(0, opts.maxLength);
  }

  return val;
}

export default function Input({
  label,
  error,
  helperText,
  className,
  containerClassName,
  size,
  variant,
  id,
  trimType,
  emailType,
  numberType,
  noSpecialChars,
  alphanumeric,
  alphanumericCharacter,
  normalize = true,
  isPassword,
  clearable,
  leftIcon,
  rightIcon,
  onValueChange,
  type = "text",
  maxLength,
  onChange,
  ref,
  ...rest
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const internalRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(
    Boolean(rest.defaultValue ?? rest.value),
  );

  // Track the input's value via the native `input` event so we catch
  // changes from any source (typing, RHF setValue, reset, etc.) and can
  // toggle the clear button correctly.
  useEffect(() => {
    const node = internalRef.current;
    if (!node) return;
    const sync = () => setHasValue(node.value.length > 0);
    sync();
    node.addEventListener("input", sync);
    return () => node.removeEventListener("input", sync);
  }, []);

  const setRef = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && "current" in ref) {
      (ref as React.RefObject<HTMLInputElement | null>).current = node;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const original = e.target.value;
    const cleaned = normalize ? transformValue(original, {
      emailType,
      isPassword,
      type,
      trimType,
      noSpecialChars,
      alphanumeric,
      alphanumericCharacter,
      numberType,
      maxLength,
    }) : original;
    if (cleaned !== original) {
      e.target.value = cleaned;
    }
    setHasValue(cleaned.length > 0);
    onValueChange?.(cleaned);
    onChange?.(e);
  };

  const handleClear = () => {
    const node = internalRef.current;
    if (!node) return;
    // React tracks input value via its prototype setter. Use the native
    // setter + dispatch an `input` event so RHF (and any other listener)
    // sees the change.
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(node, "");
    node.dispatchEvent(new Event("input", { bubbles: true }));
    setHasValue(false);
    onValueChange?.("");
  };

  const inputType =
    isPassword || type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const showClear = clearable && hasValue && !isPassword && type !== "password";
  const showRightIcon =
    rightIcon && !isPassword && type !== "password" && !showClear;

  const reservesRight = isPassword || type === "password" || showClear || showRightIcon;
  const inputCls = [styles.control, leftIcon && styles.withStart, reservesRight && styles.withEnd, className].filter(Boolean).join(" ");

  return (
    <Field id={inputId} label={label} error={error} helperText={helperText} size={size} variant={variant} containerClassName={containerClassName}>
      <div className="relative">
        {leftIcon && (
          <span className={styles.start}>
            {leftIcon}
          </span>
        )}

        <input
          {...rest}
          id={inputId}
          ref={setRef}
          type={inputType}
          maxLength={maxLength}
          onChange={handleChange}
          className={inputCls}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={fieldDescription(inputId, rest["aria-describedby"], error || helperText)}
        />

        {(isPassword || type === "password") && (
          <Button variant="unstyled"
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
            className={`${styles.end} hover:text-foreground transition-colors`}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        )}

        {showClear && (
          <Button variant="unstyled"
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
            className={`${styles.end} hover:text-foreground transition-colors`}
          >
            <XIcon />
          </Button>
        )}

        {showRightIcon && (
          <span className={styles.end}>
            {rightIcon}
          </span>
        )}
      </div>
    </Field>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
