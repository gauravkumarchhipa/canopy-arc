"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../../layout/ThemeProvider";

export default function ContactWave() {
  const artwork = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = artwork.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const dark = theme === "dark";
    const strand = dark ? "255, 250, 244" : "168, 143, 125";
    const gold = dark ? "255, 241, 218" : "200, 139, 75";

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const trace = (offset: number) => {
        context.beginPath();
        context.moveTo(-0.04 * width, (1.05 + 0.14 * offset) * height);
        context.bezierCurveTo(0.18 * width, (1.00 + 0.28 * offset) * height,
          0.31 * width, (0.36 + 0.59 * offset) * height, 0.55 * width, (0.64 + 0.25 * offset) * height);
        context.bezierCurveTo(0.77 * width, (0.95 + 0.23 * offset) * height,
          0.80 * width, (0.09 + 0.51 * offset) * height, 1.06 * width, (-0.03 + 0.56 * offset) * height);
      };

      const filaments = context.createLinearGradient(0, 0, width, 0);
      filaments.addColorStop(0, `rgba(${strand}, 0)`);
      filaments.addColorStop(0.36, `rgba(${strand}, 0.52)`);
      filaments.addColorStop(0.73, `rgba(${strand}, 0.92)`);
      filaments.addColorStop(1, `rgba(${strand}, 0.62)`);
      context.strokeStyle = filaments;
      context.lineWidth = dark ? 0.8 : 0.92;
      for (let index = 0; index < 25; index++) {
        trace(index / 24);
        context.stroke();
      }

      const highlight = context.createLinearGradient(0, 0, width, 0);
      highlight.addColorStop(0, `rgba(${gold}, 0)`);
      highlight.addColorStop(0.38, `rgba(${gold}, 0.28)`);
      highlight.addColorStop(0.76, dark ? "#fff2d6" : `rgb(${gold})`);
      highlight.addColorStop(1, `rgba(${gold}, 0.24)`);
      context.strokeStyle = highlight;
      context.shadowColor = "#ffd4a2";
      context.shadowBlur = 12;
      context.lineWidth = 2;
      trace(0.47);
      context.stroke();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [theme]);

  return <canvas ref={artwork} className="contact-wave" aria-hidden="true" />;
}
