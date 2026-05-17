"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { initialExplorations } from "@/mock/explorations";
import type { Exploration, Station } from "@/types";

type AppContextValue = {
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
  explorations: Exploration[];
  setExplorations: Dispatch<SetStateAction<Exploration[]>>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [explorations, setExplorations] = useState<Exploration[]>(initialExplorations);

  return (
    <AppContext.Provider value={{ selectedStation, setSelectedStation, explorations, setExplorations }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
