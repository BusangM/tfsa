"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { IkagengScene } from "@/types/tfsa";

const IkagengSceneContext = createContext<IkagengScene>("home");

export function IkagengSceneProvider({
  scene,
  children,
}: {
  scene: IkagengScene;
  children: ReactNode;
}) {
  return (
    <IkagengSceneContext.Provider value={scene}>
      {children}
    </IkagengSceneContext.Provider>
  );
}

export function useIkagengScene() {
  return useContext(IkagengSceneContext);
}
