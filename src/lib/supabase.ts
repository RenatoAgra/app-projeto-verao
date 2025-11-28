import { createClient } from '@supabase/supabase-js';

// Valores padrão para desenvolvimento (evita erro se env vars não estiverem configuradas)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  age: number;
  current_weight: number;
  height: number;
  goal_weight: number;
  activity_level: string;
  created_at: string;
  updated_at: string;
}

export interface WeightRecord {
  id: string;
  user_id: string;
  weight: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface GLP1Info {
  id: string;
  user_id: string;
  uses_glp1: boolean;
  medication_name?: string;
  dosage_frequency?: string;
  created_at: string;
  updated_at: string;
}

export interface MealLog {
  id: string;
  user_id: string;
  meal_type: string;
  description: string;
  calories: number;
  date: string;
  created_at: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  workout_name: string;
  duration_minutes: number;
  completed: boolean;
  date: string;
  created_at: string;
}
