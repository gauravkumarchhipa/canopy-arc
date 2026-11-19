import type { RefObject } from "react";
import CardModels, { type CardLighting } from "../../three/CardModels";
import { buildWorkCardModel } from "./work-card-models";

const workLighting = {
  light: { exposure: 0.96, key: 2.1, rim: 2.45, rimColor: "#ffd9ae", fill: 0.95 },
  dark: { exposure: 1.19, key: 2.6, rim: 3.35, rimColor: "#dce9ff", fill: 1.16 },
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
