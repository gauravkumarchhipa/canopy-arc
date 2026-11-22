import type { RefObject } from "react";
import CardModels, { type CardLighting } from "../../three/CardModels";
import { buildWorkCardModel } from "./work-card-models";

const workLighting = {
  light: { exposure: 0.92, key: 2.0, rim: 2.15, rimColor: "#ffdeb6", fill: 0.74 },
  dark: { exposure: 1.09, key: 2.4, rim: 2.85, rimColor: "#e4e4dc", fill: 0.94 },
} satisfies Record<"light" | "dark", CardLighting>;

export default function WorkCardModels({ gridRef }: { gridRef: RefObject<HTMLDivElement | null> }) {
  return (
    <CardModels
      gridRef={gridRef}
      buildModel={buildWorkCardModel}
      instructionsId="work-card-model-instructions"
      lighting={workLighting}
    />
  );
}
