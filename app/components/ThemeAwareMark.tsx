"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Theme } from "../lib/theme";
import { useTheme } from "./layout/ThemeProvider";

const defaultSrc = "/canopy-arc-mark.png";
const lightSrc = "/canopy-arc-mark1.png";

function getThemeSrc(theme: Theme) {
  return theme === "light" ? lightSrc : defaultSrc;
}

type Props = {
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  useNextImage?: boolean;
  style?: CSSProperties;
};

export default function ThemeAwareMark({
  alt,
  className,
  imgClassName,
  width,
  height,
  priority,
  useNextImage,
  style,
}: Props) {
  const theme = useTheme();
  const src = getThemeSrc(theme);

  if (useNextImage) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width ?? 64}
        height={height ?? 64}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imgClassName ?? className}
      style={style}
    />
  );
}
