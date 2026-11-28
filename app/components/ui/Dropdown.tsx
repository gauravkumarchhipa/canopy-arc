import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import styles from "./Dropdown.module.css";

type DropdownProps = Omit<ComponentProps<"select">, "multiple" | "size"> & {
  size?: "sm" | "md" | "lg";
};

export default function Dropdown({ className, children, size = "md", ...props }: DropdownProps) {
  return (
    <span className={[styles.field, className].filter(Boolean).join(" ")} data-size={size}>
      <select {...props} className={styles.control}>
        {children}
      </select>
      <ChevronDown className={styles.chevron} aria-hidden="true" focusable="false" />
    </span>
  );
}
