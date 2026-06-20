import { SERVICE_ICONS } from "./service-icons";

type ServiceIconProps = {
  name: string;
  className?: string;
};

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  const icon = SERVICE_ICONS[name];
  if (!icon) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {icon}
    </span>
  );
}
