import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, RotateCw } from "lucide-react";

const icons = {
  down: ArrowDown,
  left: ArrowLeft,
  right: ArrowRight,
  "up-right": ArrowUpRight,
  "chevron-right": ChevronRight,
  clockwise: RotateCw,
} as const;

type Props = {
  direction?: keyof typeof icons;
  size?: number | string;
  className?: string;
};

export default function ArrowIcon({ direction = "up-right", size = "1.15em", className }: Props) {
  const Icon = icons[direction];

  return (
    <Icon
      size={size}
      strokeWidth={1.85}
      className={["inline-block shrink-0 align-middle", className].filter(Boolean).join(" ")}
      data-arrow-direction={direction}
      aria-hidden="true"
      focusable="false"
    />
  );
}
