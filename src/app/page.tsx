"use client";

import { useState } from "react";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";

export type UserProfile = {
  name: string;
  age: number;
  gender: "male" | "female";
  currentWeight: number;
  targetWeight: number;
  height: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal: "lose-weight" | "maintain" | "gain-muscle";
  targetDate: string;
  // GLP-1 medication info
  usesGLP1?: boolean;
  glp1Medication?: string;
  glp1Frequency?: "daily" | "weekly" | "monthly";
};

export type WeightRecord = {
  date: string;
  weight: number;
  notes?: string;
};

export default function Home() {
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);

  const handleCompleteOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setHasProfile(true);
    // Adiciona o peso inicial como primeiro registro
    setWeightRecords([
      {
        date: new Date().toISOString().split("T")[0],
        weight: profile.currentWeight,
        notes: "Peso inicial",
      },
    ]);
  };

  const handleAddWeightRecord = (record: WeightRecord) => {
    setWeightRecords((prev) => [...prev, record].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const handleResetProfile = () => {
    setHasProfile(false);
    setUserProfile(null);
    setWeightRecords([]);
  };

  if (!hasProfile) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <Dashboard
      profile={userProfile!}
      weightRecords={weightRecords}
      onAddWeightRecord={handleAddWeightRecord}
      onResetProfile={handleResetProfile}
    />
  );
}
