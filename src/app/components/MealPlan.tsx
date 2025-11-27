"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Coffee, Salad, Pizza, Flame, CheckCircle2 } from "lucide-react";
import { UserProfile } from "../page";
import { GLP1Tips } from "./GLP1Tips";

type MealPlanProps = {
  targetCalories: number;
  profile: UserProfile;
};

type Meal = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
};

export function MealPlan({ targetCalories, profile }: MealPlanProps) {
  // Ajusta plano alimentar se usuário usa GLP-1
  const isUsingGLP1 = profile.usesGLP1;
  
  // Distribuição de calorias por refeição
  // Se usa GLP-1, aumenta número de refeições e reduz porções
  const breakfastCalories = Math.round(targetCalories * (isUsingGLP1 ? 0.20 : 0.25));
  const lunchCalories = Math.round(targetCalories * (isUsingGLP1 ? 0.25 : 0.35));
  const snackCalories = Math.round(targetCalories * 0.15);
  const dinnerCalories = Math.round(targetCalories * (isUsingGLP1 ? 0.20 : 0.25));
  const extraSnackCalories = Math.round(targetCalories * 0.05);

  const mealPlan: Meal[] = isUsingGLP1 ? [
    {
      name: "Café da Manhã",
      calories: breakfastCalories,
      protein: 20,
      carbs: 30,
      fats: 10,
      foods: [
        "2 ovos mexidos (leves, pouco óleo)",
        "1 fatia de pão integral",
        "1/2 banana",
        "Café com leite desnatado",
      ],
    },
    {
      name: "Lanche da Manhã",
      calories: snackCalories,
      protein: 12,
      carbs: 15,
      fats: 4,
      foods: [
        "1 iogurte grego natural (rico em proteína)",
        "1 porção pequena de frutas vermelhas",
      ],
    },
    {
      name: "Almoço",
      calories: lunchCalories,
      protein: 35,
      carbs: 35,
      fats: 10,
      foods: [
        "100g de frango grelhado (sem pele)",
        "3 colheres de arroz integral",
        "Salada verde à vontade",
        "Legumes cozidos no vapor",
      ],
    },
    {
      name: "Lanche da Tarde",
      calories: snackCalories,
      protein: 10,
      carbs: 12,
      fats: 5,
      foods: [
        "Shake de proteína com frutas",
        "Ou: 1 fatia de queijo branco + torradas",
      ],
    },
    {
      name: "Jantar Leve",
      calories: dinnerCalories,
      protein: 30,
      carbs: 20,
      fats: 8,
      foods: [
        "Sopa de legumes com frango desfiado",
        "Ou: 100g de peixe grelhado + salada",
        "Evite carboidratos pesados à noite",
      ],
    },
    {
      name: "Ceia (Opcional)",
      calories: extraSnackCalories,
      protein: 8,
      carbs: 5,
      fats: 3,
      foods: [
        "Chá de camomila",
        "1 fatia fina de queijo branco",
      ],
    },
  ] : [
    {
      name: "Café da Manhã",
      calories: breakfastCalories,
      protein: 25,
      carbs: 45,
      fats: 12,
      foods: [
        "2 ovos mexidos",
        "2 fatias de pão integral",
        "1 banana",
        "Café com leite desnatado",
      ],
    },
    {
      name: "Lanche da Manhã",
      calories: snackCalories,
      protein: 10,
      carbs: 20,
      fats: 5,
      foods: [
        "1 iogurte natural",
        "1 porção de frutas vermelhas",
        "1 colher de granola",
      ],
    },
    {
      name: "Almoço",
      calories: lunchCalories,
      protein: 40,
      carbs: 50,
      fats: 15,
      foods: [
        "150g de frango grelhado",
        "4 colheres de arroz integral",
        "Salada verde à vontade",
        "2 colheres de feijão",
        "Legumes cozidos",
      ],
    },
    {
      name: "Lanche da Tarde",
      calories: snackCalories,
      protein: 8,
      carbs: 18,
      fats: 6,
      foods: [
        "1 fatia de queijo branco",
        "Torradas integrais",
        "Chá verde",
      ],
    },
    {
      name: "Jantar",
      calories: dinnerCalories,
      protein: 35,
      carbs: 30,
      fats: 12,
      foods: [
        "150g de peixe assado",
        "Batata doce média",
        "Salada de folhas verdes",
        "Legumes grelhados",
      ],
    },
  ];

  const mealIcons = isUsingGLP1 
    ? [Coffee, Apple, Pizza, Coffee, Salad, Coffee]
    : [Coffee, Apple, Pizza, Coffee, Salad];

  return (
    <div className="space-y-6">
      {/* GLP-1 Tips - Mostra apenas se usuário usa GLP-1 */}
      {isUsingGLP1 && <GLP1Tips profile={profile} />}

      {/* Header Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-green-400 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
            Plano Alimentar {isUsingGLP1 && "Adaptado"}
          </CardTitle>
          <CardDescription className="text-green-50">
            {isUsingGLP1 
              ? "Dieta personalizada para quem usa GLP-1 - refeições menores e mais frequentes"
              : "Dieta personalizada para atingir sua meta de forma saudável"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-green-100 text-sm">Meta Diária</p>
              <p className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                {targetCalories}
                <Flame className="w-5 h-5" />
              </p>
              <p className="text-xs text-green-100">calorias</p>
            </div>
            <div className="space-y-1">
              <p className="text-green-100 text-sm">Proteínas</p>
              <p className="text-2xl sm:text-3xl font-bold">{isUsingGLP1 ? "115g" : "118g"}</p>
              <p className="text-xs text-green-100">por dia</p>
            </div>
            <div className="space-y-1">
              <p className="text-green-100 text-sm">Carboidratos</p>
              <p className="text-2xl sm:text-3xl font-bold">{isUsingGLP1 ? "117g" : "163g"}</p>
              <p className="text-xs text-green-100">por dia</p>
            </div>
            <div className="space-y-1">
              <p className="text-green-100 text-sm">Gorduras</p>
              <p className="text-2xl sm:text-3xl font-bold">{isUsingGLP1 ? "40g" : "50g"}</p>
              <p className="text-xs text-green-100">por dia</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                {isUsingGLP1 ? "Dicas para Quem Usa GLP-1" : "Dicas Importantes"}
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {isUsingGLP1 ? (
                  <>
                    <li>• Faça refeições menores a cada 2-3 horas</li>
                    <li>• Priorize proteínas em todas as refeições</li>
                    <li>• Evite alimentos gordurosos e fritos</li>
                    <li>• Beba água aos poucos ao longo do dia</li>
                    <li>• Coma devagar e mastigue bem os alimentos</li>
                    <li>• Evite bebidas alcoólicas</li>
                  </>
                ) : (
                  <>
                    <li>• Beba pelo menos 2 litros de água por dia</li>
                    <li>• Evite alimentos processados e açúcares refinados</li>
                    <li>• Faça refeições a cada 3 horas para manter o metabolismo ativo</li>
                    <li>• Prefira alimentos integrais e naturais</li>
                    <li>• Ajuste as porções de acordo com sua fome e saciedade</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">
          {isUsingGLP1 ? "Refeições do Dia (Porções Menores)" : "Refeições do Dia"}
        </h3>
        {mealPlan.map((meal, index) => {
          const Icon = mealIcons[index];
          return (
            <Card key={meal.name} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {meal.calories} calorias
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      P: {meal.protein}g
                    </Badge>
                    <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                      C: {meal.carbs}g
                    </Badge>
                    <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                      G: {meal.fats}g
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Alimentos sugeridos:</p>
                  <ul className="space-y-2">
                    {meal.foods.map((food, foodIndex) => (
                      <li
                        key={foodIndex}
                        className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Substitutions Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Substituições Permitidas</CardTitle>
          <CardDescription>
            {isUsingGLP1 
              ? "Varie seu cardápio com opções leves e de fácil digestão"
              : "Varie seu cardápio mantendo as calorias"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">Proteínas</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Frango → Peixe, Carne magra, Ovo</li>
                <li>• Peixe → Frango, Atum, Sardinha</li>
                <li>• Ovo → Queijo cottage, Iogurte grego</li>
                {isUsingGLP1 && <li className="text-blue-600">• Prefira preparos grelhados ou cozidos</li>}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">Carboidratos</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Arroz integral → Quinoa, Macarrão integral</li>
                <li>• Batata doce → Mandioca, Inhame</li>
                <li>• Pão integral → Tapioca, Aveia</li>
                {isUsingGLP1 && <li className="text-blue-600">• Reduza porções se sentir desconforto</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
