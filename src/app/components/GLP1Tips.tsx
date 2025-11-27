"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Pill, AlertCircle, CheckCircle2, Lightbulb, Apple, Droplet, Coffee } from "lucide-react";
import { UserProfile } from "../page";

type GLP1TipsProps = {
  profile: UserProfile;
};

export function GLP1Tips({ profile }: GLP1TipsProps) {
  if (!profile.usesGLP1) {
    return null;
  }

  const getMedicationName = () => {
    switch (profile.glp1Medication) {
      case "ozempic":
        return "Ozempic";
      case "monjaro":
        return "Monjaro";
      case "wegovy":
        return "Wegovy";
      case "saxenda":
        return "Saxenda";
      default:
        return "GLP-1";
    }
  };

  const getFrequencyText = () => {
    switch (profile.glp1Frequency) {
      case "daily":
        return "diária";
      case "weekly":
        return "semanal";
      case "monthly":
        return "mensal";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-600 flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Dicas para Uso de GLP-1</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {getMedicationName()}
                </Badge>
                <span className="text-xs text-gray-600">Dose {getFrequencyText()}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-800">
              <strong>Lembrete importante:</strong> Sempre siga as orientações do seu médico sobre o uso de {getMedicationName()}. 
              Estas dicas são complementares ao acompanhamento profissional.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              Lidando com Efeitos Comuns
            </h4>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">Enjoo e Náusea</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Faça refeições menores e mais frequentes (5-6 por dia)</li>
                      <li>Prefira alimentos leves e de fácil digestão</li>
                      <li>Evite alimentos muito gordurosos ou fritos</li>
                      <li>Coma devagar e mastigue bem</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Apple className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">Pouco Apetite</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Priorize alimentos ricos em proteína (ovos, frango, peixe)</li>
                      <li>Consuma iogurtes proteicos e queijos magros</li>
                      <li>Prepare shakes com proteína e frutas</li>
                      <li>Sopas leves de legumes com frango desfiado são ótimas opções</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Droplet className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">Hidratação</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Beba pelo menos 2 litros de água por dia</li>
                      <li>Evite bebidas açucaradas e refrigerantes</li>
                      <li>Chás naturais sem açúcar são bem-vindos</li>
                      <li>Água de coco natural é uma boa opção</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coffee className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">O Que Evitar</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Alimentos muito gordurosos ou fritos</li>
                      <li>Bebidas alcoólicas (podem intensificar náuseas)</li>
                      <li>Refeições muito volumosas</li>
                      <li>Alimentos muito condimentados ou apimentados</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Refeições Ideais para Você
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Café da manhã:</strong> Omelete com legumes + 1 fatia de pão integral</p>
              <p><strong>Lanche:</strong> Iogurte grego com frutas vermelhas</p>
              <p><strong>Almoço:</strong> Peito de frango grelhado + arroz integral (porção pequena) + salada</p>
              <p><strong>Lanche:</strong> Shake de proteína com banana</p>
              <p><strong>Jantar:</strong> Sopa de legumes com frango desfiado ou peixe grelhado com legumes</p>
            </div>
          </div>

          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm text-amber-800">
              <strong>Atenção:</strong> Se os efeitos colaterais forem muito intensos ou persistentes, 
              consulte seu médico imediatamente. Não ajuste a dose por conta própria.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
