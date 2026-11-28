import { useId, type ComponentProps } from "react";
import Field, { fieldDescription, type FieldProps } from "./Field";
import styles from "./Field.module.css";

type Props = ComponentProps<"textarea"> & FieldProps;

export default function Textarea({
  label, error, helperText, size, variant, containerClassName, className, id, rows = 5, ...props
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field id={inputId} label={label} error={error} helperText={helperText} size={size} variant={variant} containerClassName={containerClassName}>
      <textarea
        {...props}
        id={inputId}
        rows={rows}
        className={[styles.control, styles.textarea, className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={fieldDescription(inputId, props["aria-describedby"], error || helperText)}
      />
    </Field>
  );
}
