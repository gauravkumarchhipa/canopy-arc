import { IMPACT_ICONS } from "./impact-icons";

type ImpactIconProps = {
  name: string;
  className?: string;
};

export default function ImpactIcon({ name, className }: ImpactIconProps) {
  return <span className={className}>{IMPACT_ICONS[name]}</span>;
}
