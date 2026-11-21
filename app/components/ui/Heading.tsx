import type { ComponentProps } from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Props = ComponentProps<"h1"> & { level?: Level };

export default function Heading({ level = 2, ...props }: Props) {
  const Tag = `h${level}` as const;
  return <Tag {...props} />;
}
