"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Scale, Plus, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { UserProfile, WeightRecord } from "../page";

type WeightTrackerProps = {
  profile: UserProfile;
  weightRecords: WeightRecord[];
  onAddWeightRecord: (record: WeightRecord) => void;
};

export function WeightTracker({ profile, weightRecords, onAddWeightRecord }: WeightTrackerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const handleAddWeight = () => {
    if (!newWeight) return;

    onAddWeightRecord({
      date: newDate,
      weight: parseFloat(newWeight),
      notes: notes || undefined,
    });

    setNewWeight("");
    setNotes("");
    setNewDate(new Date().toISOString().split("T")[0]);
    setIsDialogOpen(false);
  };

  const currentWeight = weightRecords.length > 0 ? weightRecords[0].weight : profile.currentWeight;
  const previousWeight = weightRecords.length > 1 ? weightRecords[1].weight : profile.currentWeight;
  const weightChange = previousWeight - currentWeight;
  const totalWeightLost = profile.currentWeight - currentWeight;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">Acompanhamento de Peso</CardTitle>
              <CardDescription className="text-blue-50">
                Registre seu peso regularmente para acompanhar seu progresso
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Adicionar Peso</span>
                  <span className="sm:hidden">Adicionar</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Peso</DialogTitle>
                  <DialogDescription>
                    Adicione seu peso atual para acompanhar seu progresso
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 72.5"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Ex: Após treino, manhã, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddWeight}
                    disabled={!newWeight}
                    className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-blue-100 text-sm">Peso Atual</p>
              <p className="text-3xl font-bold">{currentWeight.toFixed(1)} kg</p>
            </div>
            <div className="space-y-1">
              <p className="text-blue-100 text-sm">Última Mudança</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                {weightChange > 0 ? (
                  <>
                    -{weightChange.toFixed(1)} kg
                    <TrendingDown className="w-5 h-5" />
                  </>
                ) : weightChange < 0 ? (
                  <>
                    +{Math.abs(weightChange).toFixed(1)} kg
                    <TrendingUp className="w-5 h-5" />
                  </>
                ) : (
                  "0.0 kg"
                )}
              </p>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <p className="text-blue-100 text-sm">Total Perdido</p>
              <p className="text-3xl font-bold">{totalWeightLost.toFixed(1)} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Histórico de Peso
          </CardTitle>
          <CardDescription>
            {weightRecords.length} {weightRecords.length === 1 ? "registro" : "registros"} no total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {weightRecords.length === 0 ? (
            <div className="text-center py-12">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Nenhum registro ainda</p>
              <p className="text-sm text-gray-500">Adicione seu primeiro peso para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {weightRecords.map((record, index) => {
                const prevRecord = weightRecords[index + 1];
                const change = prevRecord ? prevRecord.weight - record.weight : 0;

                return (
                  <div
                    key={`${record.date}-${index}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {record.weight.toFixed(1)} kg
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        {record.notes && (
                          <p className="text-xs text-gray-500 mt-1">{record.notes}</p>
                        )}
                      </div>
                    </div>
                    {change !== 0 && (
                      <div className="flex items-center gap-2">
                        {change > 0 ? (
                          <div className="flex items-center gap-1 text-green-600 font-semibold">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">-{change.toFixed(1)} kg</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600 font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">+{Math.abs(change).toFixed(1)} kg</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Chart Placeholder */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Gráfico de Evolução</CardTitle>
          <CardDescription>Visualize seu progresso ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
            <div className="text-center">
              <TrendingDown className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Gráfico em desenvolvimento</p>
              <p className="text-sm text-gray-500 mt-1">
                Continue registrando seu peso para ver a evolução visual
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
