"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ActiveScreen } from "@/features/active/ActiveScreen";
import { CollectionScreen } from "@/features/collection/CollectionScreen";
import { CreateLogScreen } from "@/features/create/CreateLogScreen";
import { HomeScreen } from "@/features/home/HomeScreen";
import { LogsScreen } from "@/features/logs/LogsScreen";
import { ProfileScreen } from "@/features/profile/ProfileScreen";
import { RandomScreen } from "@/features/random/RandomScreen";
import { initialExplorations } from "@/mock/explorations";
import type { Exploration, Station } from "@/types";

export default function RoamitPrototype() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [explorations, setExplorations] = useState<Exploration[]>(initialExplorations);

  const screen = renderScreen(currentTab, {
    explorations,
    setExplorations,
    selectedStation,
    setSelectedStation,
    setCurrentTab,
  });

  return (
    <AppShell currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {screen}
    </AppShell>
  );
}

type ScreenProps = {
  explorations: Exploration[];
  setExplorations: Dispatch<SetStateAction<Exploration[]>>;
  selectedStation: Station | null;
  setSelectedStation: (s: Station) => void;
  setCurrentTab: (tab: string) => void;
};

function renderScreen(tab: string, props: ScreenProps) {
  const { explorations, setExplorations, selectedStation, setSelectedStation, setCurrentTab } = props;
  switch (tab) {
    case "home":
      return <HomeScreen explorations={explorations} setCurrentTab={setCurrentTab} />;
    case "random":
      return (
        <RandomScreen
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          setCurrentTab={setCurrentTab}
        />
      );
    case "active":
      return <ActiveScreen selectedStation={selectedStation} setCurrentTab={setCurrentTab} />;
    case "create":
      return (
        <CreateLogScreen
          selectedStation={selectedStation}
          setExplorations={setExplorations}
          setCurrentTab={setCurrentTab}
        />
      );
    case "logs":
      return <LogsScreen explorations={explorations} />;
    case "collection":
      return <CollectionScreen />;
    case "profile":
      return <ProfileScreen explorations={explorations} />;
    default:
      return null;
  }
}
