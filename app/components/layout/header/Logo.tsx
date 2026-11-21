import Link from "next/link";
import BrandLockup from "../BrandLockup";
import { brand } from "../../../content/shared/brand";
import NavbarMark from "./NavbarMark";

export default function Logo() {
  return (
    <Link href="/" className="premium-logo" aria-label={`${brand.name} home`}>
      <BrandLockup mark={<NavbarMark />} />
    </Link>
  );
}
