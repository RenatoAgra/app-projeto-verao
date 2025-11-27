"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Target, User, Activity, Pill } from "lucide-react";
import { UserProfile } from "../page";

type OnboardingProps = {
  onComplete: (profile: UserProfile) => void;
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    activityLevel: "moderate",
    goal: "lose-weight",
    gender: "male",
    usesGLP1: false,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calcula data alvo (60 dias a partir de hoje)
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 60);
      
      onComplete({
        ...formData,
        targetDate: targetDate.toISOString().split("T")[0],
      } as UserProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.age && formData.gender;
      case 2:
        return formData.currentWeight && formData.height;
      case 3:
        return formData.targetWeight;
      case 4:
        return formData.activityLevel;
      case 5:
        // GLP-1 step - always valid (optional info)
        if (formData.usesGLP1) {
          return formData.glp1Medication && formData.glp1Frequency;
        }
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                  Projeto Verão
                </CardTitle>
                <CardDescription className="text-base">
                  Seu corpo dos sonhos em 60 dias
                </CardDescription>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Passo {step} de {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-pink-600 transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {/* Step 1: Informações Pessoais */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Vamos nos conhecer!</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Como você se chama?</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={formData.name || ""}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-base font-medium">Qual sua idade?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ex: 25"
                  value={formData.age || ""}
                  onChange={(e) => updateFormData("age", parseInt(e.target.value))}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Sexo</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateFormData("gender", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer text-base">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer text-base">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Medidas Atuais */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Suas medidas atuais</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentWeight" className="text-base font-medium">Peso atual (kg)</Label>
                <Input
                  id="currentWeight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 75.5"
                  value={formData.currentWeight || ""}
                  onChange={(e) => updateFormData("currentWeight", parseFloat(e.target.value))}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-base font-medium">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 170"
                  value={formData.height || ""}
                  onChange={(e) => updateFormData("height", parseInt(e.target.value))}
                  className="h-12 text-base"
                />
              </div>

              {formData.currentWeight && formData.height && (
                <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Seu IMC atual:</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {(formData.currentWeight / Math.pow(formData.height / 100, 2)).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Meta de Peso */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Qual é sua meta?</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetWeight" className="text-base font-medium">Peso desejado (kg)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 68.0"
                  value={formData.targetWeight || ""}
                  onChange={(e) => updateFormData("targetWeight", parseFloat(e.target.value))}
                  className="h-12 text-base"
                />
              </div>

              {formData.currentWeight && formData.targetWeight && (
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600 mb-1">Você precisa perder:</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {(formData.currentWeight - formData.targetWeight).toFixed(1)} kg
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Meta saudável em 60 dias:</p>
                    <p className="text-lg font-semibold text-blue-600">
                      Perda de {((formData.currentWeight - formData.targetWeight) / 8).toFixed(1)} kg por semana
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData.currentWeight - formData.targetWeight) > 8 
                        ? "⚠️ Meta ambiciosa! Recomendamos acompanhamento profissional."
                        : "✅ Meta saudável e alcançável!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Nível de Atividade */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Nível de atividade física</h3>
              </div>

              <RadioGroup
                value={formData.activityLevel}
                onValueChange={(value) => updateFormData("activityLevel", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="sedentary" id="sedentary" className="mt-1" />
                  <Label htmlFor="sedentary" className="cursor-pointer flex-1">
                    <p className="font-semibold text-base">Sedentário</p>
                    <p className="text-sm text-gray-600">Pouco ou nenhum exercício</p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="light" id="light" className="mt-1" />
                  <Label htmlFor="light" className="cursor-pointer flex-1">
                    <p className="font-semibold text-base">Levemente ativo</p>
                    <p className="text-sm text-gray-600">Exercício leve 1-3 dias/semana</p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-orange-300 bg-orange-50 hover:border-orange-400 transition-colors cursor-pointer">
                  <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                  <Label htmlFor="moderate" className="cursor-pointer flex-1">
                    <p className="font-semibold text-base">Moderadamente ativo</p>
                    <p className="text-sm text-gray-600">Exercício moderado 3-5 dias/semana</p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="active" id="active" className="mt-1" />
                  <Label htmlFor="active" className="cursor-pointer flex-1">
                    <p className="font-semibold text-base">Muito ativo</p>
                    <p className="text-sm text-gray-600">Exercício intenso 6-7 dias/semana</p>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="very-active" id="very-active" className="mt-1" />
                  <Label htmlFor="very-active" className="cursor-pointer flex-1">
                    <p className="font-semibold text-base">Extremamente ativo</p>
                    <p className="text-sm text-gray-600">Exercício muito intenso diariamente</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 5: GLP-1 Medication */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Pill className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Medicação GLP-1</h3>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-blue-800 font-medium mb-1">
                  ℹ️ Informação importante
                </p>
                <p className="text-xs text-blue-700">
                  Sempre siga as orientações do seu médico sobre o uso de medicamentos GLP-1. 
                  Esta informação nos ajuda a personalizar dicas nutricionais para você.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Você faz uso de medicamentos GLP-1?</Label>
                  <RadioGroup
                    value={formData.usesGLP1 ? "yes" : "no"}
                    onValueChange={(value) => updateFormData("usesGLP1", value === "yes")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="no" id="no-glp1" />
                      <Label htmlFor="no-glp1" className="cursor-pointer text-base">Não</Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="yes" id="yes-glp1" />
                      <Label htmlFor="yes-glp1" className="cursor-pointer text-base">Sim</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.usesGLP1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="glp1Medication" className="text-base font-medium">
                        Qual medicamento você usa?
                      </Label>
                      <RadioGroup
                        value={formData.glp1Medication || ""}
                        onValueChange={(value) => updateFormData("glp1Medication", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="ozempic" id="ozempic" />
                          <Label htmlFor="ozempic" className="cursor-pointer flex-1">Ozempic</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="monjaro" id="monjaro" />
                          <Label htmlFor="monjaro" className="cursor-pointer flex-1">Monjaro</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="wegovy" id="wegovy" />
                          <Label htmlFor="wegovy" className="cursor-pointer flex-1">Wegovy</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="saxenda" id="saxenda" />
                          <Label htmlFor="saxenda" className="cursor-pointer flex-1">Saxenda</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="other" id="other-med" />
                          <Label htmlFor="other-med" className="cursor-pointer flex-1">Outro similar</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-medium">Frequência da dose</Label>
                      <RadioGroup
                        value={formData.glp1Frequency || ""}
                        onValueChange={(value) => updateFormData("glp1Frequency", value)}
                        className="flex gap-3"
                      >
                        <div className="flex items-center space-x-2 flex-1 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily" className="cursor-pointer text-base">Diária</Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly" className="cursor-pointer text-base">Semanal</Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="cursor-pointer text-base">Mensal</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12 text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 h-12 text-base bg-gradient-to-r from-orange-400 to-pink-600 hover:from-orange-500 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {step === totalSteps ? "Começar Jornada" : "Próximo"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
