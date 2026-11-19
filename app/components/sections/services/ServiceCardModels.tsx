import type { RefObject } from "react";
import CardModels from "../../three/CardModels";
import { buildServiceCardModel } from "./service-card-models";

export default function ServiceCardModels({ gridRef }: { gridRef: RefObject<HTMLDivElement | null> }) {
  return <CardModels gridRef={gridRef} buildModel={buildServiceCardModel} instructionsId="services-model-instructions" />;
}
