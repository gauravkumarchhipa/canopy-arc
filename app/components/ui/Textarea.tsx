import type { TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label?: string;
  error?: string;
  className?: string;
};

export default function Textarea({
  label,
  error,
  className,
  rows = 5,
  ...textareaProps
}: Props) {
  const borderCls = error
    ? "border-rose focus:border-rose"
    : "border-line-strong focus:border-accent";

  const cls = `w-full bg-transparent border-b ${borderCls} outline-none py-3 text-base resize-none transition-colors${
    className ? " " + className : ""
  }`;

  const errorMsg = error ? (
    <span className="block mt-2 text-xs text-rose">{error}</span>
  ) : null;

  if (!label) {
    return (
      <div className="block">
        <textarea
          rows={rows}
          {...textareaProps}
          className={cls}
          aria-invalid={error ? "true" : undefined}
        />
        {errorMsg}
      </div>
    );
  }

  return (
    <label className="block group">
      <span className="block text-xs tracking-[0.25em] uppercase text-muted mb-3">
        {label}
      </span>
      <textarea
        rows={rows}
        {...textareaProps}
        className={cls}
        aria-invalid={error ? "true" : undefined}
      />
      {errorMsg}
    </label>
  );
}
