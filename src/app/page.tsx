"use client";

import { useState, useEffect } from "react";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";

export type UserProfile = {
  id?: string;
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
  id?: string;
  date: string;
  weight: number;
  notes?: string;
};

export default function Home() {
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Tentar carregar do localStorage primeiro
      const savedProfile = localStorage.getItem('userProfile');
      const savedWeights = localStorage.getItem('weightRecords');
      
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setHasProfile(true);
      }
      
      if (savedWeights) {
        setWeightRecords(JSON.parse(savedWeights));
      }
      
      setLoading(false);
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
      setLoading(false);
    }
  };

  const handleCompleteOnboarding = async (profile: UserProfile) => {
    try {
      // Gerar ID único
      profile.id = `user_${Date.now()}`;
      
      // Salvar no localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      // Adicionar peso inicial
      const initialWeight: WeightRecord = {
        id: `weight_${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        weight: profile.currentWeight,
        notes: "Peso inicial",
      };
      
      const newWeights = [initialWeight];
      localStorage.setItem('weightRecords', JSON.stringify(newWeights));
      
      setUserProfile(profile);
      setWeightRecords(newWeights);
      setHasProfile(true);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    }
  };

  const handleAddWeightRecord = async (record: WeightRecord) => {
    if (!userProfile?.id) return;

    try {
      record.id = `weight_${Date.now()}`;
      
      const newWeights = [...weightRecords, record].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      localStorage.setItem('weightRecords', JSON.stringify(newWeights));
      setWeightRecords(newWeights);
    } catch (error) {
      console.error('Erro ao adicionar registro de peso:', error);
      alert('Erro ao adicionar registro. Tente novamente.');
    }
  };

  const handleResetProfile = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('weightRecords');
    setHasProfile(false);
    setUserProfile(null);
    setWeightRecords([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
