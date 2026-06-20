import { IMPACT_ICONS } from "./impact-icons";

type ImpactIconProps = {
  name: string;
  className?: string;
};

export default function ImpactIcon({ name, className }: ImpactIconProps) {
  const icon = IMPACT_ICONS[name];
  if (!icon) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {icon}
    </span>
  );
}
