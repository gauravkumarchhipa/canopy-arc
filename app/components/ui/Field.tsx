import type { ReactNode } from "react";
import styles from "./Field.module.css";

export type FieldProps = {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "underline";
  containerClassName?: string;
};

export const fieldDescription = (id: string, describedBy?: string, message?: string) =>
  [describedBy, message && `${id}-message`].filter(Boolean).join(" ") || undefined;

export default function Field({
  id, label, error, helperText, size = "md", variant = "underline", containerClassName, children,
}: FieldProps & { id: string; children: ReactNode }) {
  const message = error || helperText;
  return (
    <div className={[styles.field, containerClassName].filter(Boolean).join(" ")} data-size={size} data-variant={variant}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      {children}
      {message && (
        <span id={`${id}-message`} className={error ? styles.error : styles.helper} role={error ? "alert" : undefined}>
          {message}
        </span>
      )}
    </div>
  );
}
