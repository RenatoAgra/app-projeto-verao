"use client";

import { useState, useEffect } from "react";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";
import { toast } from "sonner";
import { 
  createUserProfile, 
  getLatestUserProfile,
  addWeightRecord,
  getWeightRecords,
  saveGLP1Info,
  getGLP1Info,
  updateUserProfile
} from "@/lib/supabase-service";

export type UserProfile = {
  id?: string;
  name?: string;
  age: number;
  currentWeight: number;
  height: number;
  targetWeight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal?: string;
  gender?: "male" | "female";
  targetDate: string;
  usesGLP1: boolean;
  glp1Medication?: string;
  glp1Frequency?: string;
};

export type WeightRecord = {
  id?: string;
  user_id?: string;
  date: string;
  weight: number;
  notes?: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);

  // Carregar dados do Supabase ao iniciar
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Tentar carregar perfil existente
      const existingProfile = await getLatestUserProfile();
      
      if (existingProfile) {
        // Converter dados do Supabase para formato do app
        const profileData: UserProfile = {
          id: existingProfile.id,
          age: existingProfile.age,
          currentWeight: existingProfile.current_weight,
          height: existingProfile.height,
          targetWeight: existingProfile.goal_weight,
          activityLevel: existingProfile.activity_level as any,
          targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          usesGLP1: false,
        };

        // Carregar informações GLP-1
        const glp1Data = await getGLP1Info(existingProfile.id);
        if (glp1Data) {
          profileData.usesGLP1 = glp1Data.uses_glp1;
          profileData.glp1Medication = glp1Data.medication_name || undefined;
          profileData.glp1Frequency = glp1Data.dosage_frequency || undefined;
        }

        setProfile(profileData);

        // Carregar registros de peso
        const records = await getWeightRecords(existingProfile.id);
        setWeightRecords(records.map(r => ({
          id: r.id,
          user_id: r.user_id,
          date: r.date,
          weight: r.weight,
          notes: r.notes || undefined,
        })));

        toast.success("Dados carregados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      // Se houver erro, continua sem dados (mostra onboarding)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOnboarding = async (newProfile: UserProfile) => {
    try {
      // Criar perfil no Supabase
      const createdProfile = await createUserProfile({
        age: newProfile.age,
        current_weight: newProfile.currentWeight,
        height: newProfile.height,
        goal_weight: newProfile.targetWeight,
        activity_level: newProfile.activityLevel,
      });

      // Salvar informações GLP-1 se aplicável
      if (newProfile.usesGLP1) {
        await saveGLP1Info({
          user_id: createdProfile.id,
          uses_glp1: true,
          medication_name: newProfile.glp1Medication,
          dosage_frequency: newProfile.glp1Frequency,
        });
      }

      // Adicionar registro inicial de peso
      await addWeightRecord({
        user_id: createdProfile.id,
        weight: newProfile.currentWeight,
        date: new Date().toISOString().split("T")[0],
        notes: "Peso inicial",
      });

      // Atualizar estado local
      setProfile({ ...newProfile, id: createdProfile.id });
      setWeightRecords([{
        user_id: createdProfile.id,
        date: new Date().toISOString().split("T")[0],
        weight: newProfile.currentWeight,
        notes: "Peso inicial",
      }]);

      toast.success("Perfil criado com sucesso! Bem-vindo ao Projeto Verão! 🎉");
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      toast.error("Erro ao salvar dados. Verifique sua conexão com o Supabase.");
    }
  };

  const handleAddWeightRecord = async (record: WeightRecord) => {
    if (!profile?.id) return;

    try {
      const newRecord = await addWeightRecord({
        user_id: profile.id,
        weight: record.weight,
        date: record.date,
        notes: record.notes,
      });

      setWeightRecords([newRecord, ...weightRecords]);
      toast.success("Peso registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar peso:", error);
      toast.error("Erro ao salvar peso. Tente novamente.");
    }
  };

  const handleResetProfile = () => {
    if (confirm("Tem certeza que deseja sair? Seus dados estão salvos no Supabase.")) {
      setProfile(null);
      setWeightRecords([]);
      toast.info("Você saiu do aplicativo. Seus dados estão salvos!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <Dashboard
      profile={profile}
      weightRecords={weightRecords}
      onAddWeightRecord={handleAddWeightRecord}
      onResetProfile={handleResetProfile}
    />
  );
}
