"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Flame, CheckCircle2, Circle, Play } from "lucide-react";
import { UserProfile } from "../page";

type WorkoutPlanProps = {
  profile: UserProfile;
};

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  calories: number;
};

type Workout = {
  day: string;
  title: string;
  duration: string;
  totalCalories: number;
  exercises: Exercise[];
  completed?: boolean;
};

export function WorkoutPlan({ profile }: WorkoutPlanProps) {
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());

  const toggleWorkoutCompletion = (day: string) => {
    setCompletedWorkouts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const workoutPlan: Workout[] = [
    {
      day: "Segunda-feira",
      title: "Treino de Peito e Tríceps",
      duration: "45 min",
      totalCalories: 350,
      exercises: [
        { name: "Supino reto", sets: "3", reps: "12", rest: "60s", calories: 80 },
        { name: "Supino inclinado", sets: "3", reps: "12", rest: "60s", calories: 75 },
        { name: "Crucifixo", sets: "3", reps: "15", rest: "45s", calories: 60 },
        { name: "Tríceps testa", sets: "3", reps: "12", rest: "45s", calories: 70 },
        { name: "Tríceps corda", sets: "3", reps: "15", rest: "45s", calories: 65 },
      ],
    },
    {
      day: "Terça-feira",
      title: "Treino de Costas e Bíceps",
      duration: "45 min",
      totalCalories: 360,
      exercises: [
        { name: "Puxada frontal", sets: "3", reps: "12", rest: "60s", calories: 85 },
        { name: "Remada curvada", sets: "3", reps: "12", rest: "60s", calories: 80 },
        { name: "Remada unilateral", sets: "3", reps: "12", rest: "45s", calories: 70 },
        { name: "Rosca direta", sets: "3", reps: "12", rest: "45s", calories: 65 },
        { name: "Rosca martelo", sets: "3", reps: "15", rest: "45s", calories: 60 },
      ],
    },
    {
      day: "Quarta-feira",
      title: "Treino de Pernas",
      duration: "50 min",
      totalCalories: 420,
      exercises: [
        { name: "Agachamento livre", sets: "4", reps: "12", rest: "90s", calories: 120 },
        { name: "Leg press 45°", sets: "3", reps: "15", rest: "60s", calories: 100 },
        { name: "Cadeira extensora", sets: "3", reps: "15", rest: "45s", calories: 70 },
        { name: "Mesa flexora", sets: "3", reps: "15", rest: "45s", calories: 70 },
        { name: "Panturrilha em pé", sets: "4", reps: "20", rest: "45s", calories: 60 },
      ],
    },
    {
      day: "Quinta-feira",
      title: "Treino de Ombros e Abdômen",
      duration: "40 min",
      totalCalories: 320,
      exercises: [
        { name: "Desenvolvimento com halteres", sets: "3", reps: "12", rest: "60s", calories: 80 },
        { name: "Elevação lateral", sets: "3", reps: "15", rest: "45s", calories: 60 },
        { name: "Elevação frontal", sets: "3", reps: "15", rest: "45s", calories: 60 },
        { name: "Abdominal supra", sets: "3", reps: "20", rest: "30s", calories: 60 },
        { name: "Prancha", sets: "3", reps: "60s", rest: "30s", calories: 60 },
      ],
    },
    {
      day: "Sexta-feira",
      title: "Treino Full Body + Cardio",
      duration: "50 min",
      totalCalories: 450,
      exercises: [
        { name: "Burpees", sets: "3", reps: "15", rest: "60s", calories: 100 },
        { name: "Agachamento com salto", sets: "3", reps: "15", rest: "60s", calories: 90 },
        { name: "Flexão de braço", sets: "3", reps: "15", rest: "45s", calories: 70 },
        { name: "Mountain climbers", sets: "3", reps: "30", rest: "45s", calories: 90 },
        { name: "Corrida estacionária", sets: "3", reps: "2 min", rest: "60s", calories: 100 },
      ],
    },
    {
      day: "Sábado",
      title: "Cardio Leve + Alongamento",
      duration: "30 min",
      totalCalories: 250,
      exercises: [
        { name: "Caminhada rápida", sets: "1", reps: "20 min", rest: "-", calories: 150 },
        { name: "Alongamento completo", sets: "1", reps: "10 min", rest: "-", calories: 50 },
        { name: "Yoga básico", sets: "1", reps: "10 min", rest: "-", calories: 50 },
      ],
    },
    {
      day: "Domingo",
      title: "Descanso Ativo",
      duration: "20 min",
      totalCalories: 100,
      exercises: [
        { name: "Caminhada leve", sets: "1", reps: "15 min", rest: "-", calories: 80 },
        { name: "Meditação", sets: "1", reps: "5 min", rest: "-", calories: 20 },
      ],
    },
  ];

  const totalWeeklyCalories = workoutPlan.reduce((sum, workout) => sum + workout.totalCalories, 0);
  const completedCount = completedWorkouts.size;
  const completionPercentage = (completedCount / workoutPlan.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-400 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">Plano de Treinos</CardTitle>
          <CardDescription className="text-purple-50">
            Treinos personalizados para acelerar seus resultados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-purple-100 text-sm">Esta Semana</p>
              <p className="text-2xl sm:text-3xl font-bold">{completedCount}/7</p>
              <p className="text-xs text-purple-100">treinos</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm">Progresso</p>
              <p className="text-2xl sm:text-3xl font-bold">{completionPercentage.toFixed(0)}%</p>
              <p className="text-xs text-purple-100">completo</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm">Calorias</p>
              <p className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                {totalWeeklyCalories}
                <Flame className="w-5 h-5" />
              </p>
              <p className="text-xs text-purple-100">por semana</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm">Duração</p>
              <p className="text-2xl sm:text-3xl font-bold">5h</p>
              <p className="text-xs text-purple-100">por semana</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Dicas para Treinar Melhor</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Faça aquecimento de 5-10 minutos antes de cada treino</li>
                <li>• Mantenha a forma correta em todos os exercícios</li>
                <li>• Hidrate-se antes, durante e após o treino</li>
                <li>• Respeite os dias de descanso para recuperação muscular</li>
                <li>• Aumente a carga progressivamente conforme evoluir</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workout Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Treinos da Semana</h3>
        {workoutPlan.map((workout) => {
          const isCompleted = completedWorkouts.has(workout.day);
          
          return (
            <Card
              key={workout.day}
              className={`border-0 shadow-lg hover:shadow-xl transition-all ${
                isCompleted ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-purple-400 to-purple-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Dumbbell className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base sm:text-lg">{workout.day}</CardTitle>
                        {isCompleted && (
                          <Badge className="bg-green-500 text-white text-xs">Completo</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm sm:text-base font-medium text-gray-700">
                        {workout.title}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {workout.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {workout.totalCalories} cal
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleWorkoutCompletion(workout.day)}
                    variant={isCompleted ? "outline" : "default"}
                    className={
                      isCompleted
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white"
                    }
                  >
                    {isCompleted ? (
                      <>
                        <Circle className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Desmarcar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Iniciar</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{exercise.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {exercise.sets} séries × {exercise.reps} reps
                            {exercise.rest !== "-" && ` • ${exercise.rest} descanso`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm">
                        <Flame className="w-4 h-4" />
                        <span className="hidden sm:inline">{exercise.calories}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Equipment Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Equipamentos Necessários</CardTitle>
          <CardDescription>O que você precisa para treinar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">Academia</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Halteres e barras</li>
                <li>• Máquinas de musculação</li>
                <li>• Esteira ou bicicleta</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">Casa (alternativas)</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Peso corporal (exercícios funcionais)</li>
                <li>• Elásticos de resistência</li>
                <li>• Garrafas com água (pesos improvisados)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
