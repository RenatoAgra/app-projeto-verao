"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Target, 
  TrendingDown, 
  Calendar, 
  Flame, 
  Apple, 
  Dumbbell,
  Scale,
  Trophy,
  ChevronRight,
  LogOut,
  Pill,
  Info
} from "lucide-react";
import { UserProfile, WeightRecord } from "../page";
import { WeightTracker } from "./WeightTracker";
import { MealPlan } from "./MealPlan";
import { WorkoutPlan } from "./WorkoutPlan";

type DashboardProps = {
  profile: UserProfile;
  weightRecords: WeightRecord[];
  onAddWeightRecord: (record: WeightRecord) => void;
  onResetProfile: () => void;
};

export function Dashboard({ profile, weightRecords, onAddWeightRecord, onResetProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Cálculos
  const currentWeight = weightRecords.length > 0 ? weightRecords[0].weight : profile.currentWeight;
  const weightLost = profile.currentWeight - currentWeight;
  const weightToLose = profile.currentWeight - profile.targetWeight;
  const progressPercentage = Math.min((weightLost / weightToLose) * 100, 100);
  
  const heightInMeters = profile.height / 100;
  const currentBMI = currentWeight / (heightInMeters * heightInMeters);
  
  // Cálculo de calorias diárias (fórmula Mifflin-St Jeor)
  const bmr = profile.gender === "male"
    ? 10 * currentWeight + 6.25 * profile.height - 5 * profile.age + 5
    : 10 * currentWeight + 6.25 * profile.height - 5 * profile.age - 161;
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
  };
  
  const tdee = bmr * activityMultipliers[profile.activityLevel];
  const targetCalories = Math.round(tdee - 500); // Déficit de 500 calorias para perda saudável

  const daysRemaining = Math.ceil(
    (new Date(profile.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getMedicationName = () => {
    if (!profile.usesGLP1) return "";
    switch (profile.glp1Medication) {
      case "ozempic": return "Ozempic";
      case "monjaro": return "Monjaro";
      case "wegovy": return "Wegovy";
      case "saxenda": return "Saxenda";
      default: return "GLP-1";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-600 flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                  Projeto Verão
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Olá, {profile.name}! 👋</p>
              </div>
            </div>
            <Button
              onClick={onResetProfile}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* GLP-1 Alert Banner */}
        {profile.usesGLP1 && (
          <Alert className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <Pill className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-sm text-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>
                  <strong>Usando {getMedicationName()}</strong> - Seu plano alimentar foi adaptado com dicas especiais
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("meals")}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 ml-2"
              >
                <Info className="w-4 h-4 mr-1" />
                Ver Dicas
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Início</span>
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Scale className="w-4 h-4" />
              <span>Peso</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Alimentação</span>
              <span className="sm:hidden">Dieta</span>
              {profile.usesGLP1 && (
                <Badge className="ml-1 bg-purple-500 text-white text-[10px] px-1 py-0">GLP-1</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="workouts" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Dumbbell className="w-4 h-4" />
              <span>Treinos</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Progress Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-400 to-pink-600 text-white overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">Seu Progresso</CardTitle>
                    <CardDescription className="text-orange-50 text-sm sm:text-base">
                      Continue assim, você está indo muito bem! 🎉
                    </CardDescription>
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs sm:text-sm">
                    {daysRemaining} dias restantes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-orange-100 text-xs sm:text-sm">Peso Atual</p>
                    <p className="text-2xl sm:text-3xl font-bold">{currentWeight.toFixed(1)} kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-orange-100 text-xs sm:text-sm">Meta</p>
                    <p className="text-2xl sm:text-3xl font-bold">{profile.targetWeight.toFixed(1)} kg</p>
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <p className="text-orange-100 text-xs sm:text-sm">Já Perdeu</p>
                    <p className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                      {weightLost.toFixed(1)} kg
                      {weightLost > 0 && <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-orange-100">Progresso</span>
                    <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-white/20" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{currentBMI.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">IMC Atual</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{targetCalories}</p>
                  <p className="text-sm text-gray-600">Calorias/dia</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{(weightToLose - weightLost).toFixed(1)} kg</p>
                  <p className="text-sm text-gray-600">Falta Perder</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{daysRemaining}</p>
                  <p className="text-sm text-gray-600">Dias Restantes</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setActiveTab("weight")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Registrar Peso</p>
                        <p className="text-xs text-gray-600">Acompanhe sua evolução</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setActiveTab("meals")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                        <Apple className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Plano Alimentar</p>
                        <p className="text-xs text-gray-600">
                          {profile.usesGLP1 ? "Adaptado para GLP-1" : "Dieta personalizada"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setActiveTab("workouts")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Treinos</p>
                        <p className="text-xs text-gray-600">Exercícios diários</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weight Tab */}
          <TabsContent value="weight">
            <WeightTracker
              profile={profile}
              weightRecords={weightRecords}
              onAddWeightRecord={onAddWeightRecord}
            />
          </TabsContent>

          {/* Meals Tab */}
          <TabsContent value="meals">
            <MealPlan targetCalories={targetCalories} profile={profile} />
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts">
            <WorkoutPlan profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
