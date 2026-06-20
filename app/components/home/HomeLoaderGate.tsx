"use client";

import dynamic from "next/dynamic";

const HomeLoader = dynamic(() => import("./HomeLoader"), { ssr: false });

export default function HomeLoaderGate() {
  return <HomeLoader />;
}
