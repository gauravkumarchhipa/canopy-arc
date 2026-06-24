import { WORK_PRODUCT_ICONS } from "./work-product-icons";

type Props = {
  name: string;
  className?: string;
};

export default function WorkProductIcon({ name, className }: Props) {
  const icon = WORK_PRODUCT_ICONS[name];
  if (!icon) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {icon}
    </span>
  );
}
