import { supabase } from './supabase';
import type { UserProfile, WeightRecord, GLP1Info, MealLog, WorkoutLog } from './supabase';

// User Profile Services
export async function createUserProfile(data: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) {
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return profile;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getLatestUserProfile() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return profile;
}

// Weight Records Services
export async function addWeightRecord(data: Omit<WeightRecord, 'id' | 'created_at'>) {
  const { data: record, error } = await supabase
    .from('weight_records')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return record;
}

export async function getWeightRecords(userId: string) {
  const { data, error } = await supabase
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getLatestWeight(userId: string) {
  const { data, error } = await supabase
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// GLP-1 Info Services
export async function saveGLP1Info(data: Omit<GLP1Info, 'id' | 'created_at' | 'updated_at'>) {
  const { data: info, error } = await supabase
    .from('glp1_info')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return info;
}

export async function getGLP1Info(userId: string) {
  const { data, error } = await supabase
    .from('glp1_info')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateGLP1Info(userId: string, data: Partial<GLP1Info>) {
  const { data: info, error } = await supabase
    .from('glp1_info')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return info;
}

// Meal Logs Services
export async function addMealLog(data: Omit<MealLog, 'id' | 'created_at'>) {
  const { data: meal, error } = await supabase
    .from('meal_logs')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return meal;
}

export async function getMealLogs(userId: string, date?: string) {
  let query = supabase
    .from('meal_logs')
    .select('*')
    .eq('user_id', userId);
  
  if (date) {
    query = query.eq('date', date);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Workout Logs Services
export async function addWorkoutLog(data: Omit<WorkoutLog, 'id' | 'created_at'>) {
  const { data: workout, error } = await supabase
    .from('workout_logs')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return workout;
}

export async function getWorkoutLogs(userId: string, date?: string) {
  let query = supabase
    .from('workout_logs')
    .select('*')
    .eq('user_id', userId);
  
  if (date) {
    query = query.eq('date', date);
  }
  
  const { data, error } = await query.order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function updateWorkoutLog(workoutId: string, completed: boolean) {
  const { data, error } = await supabase
    .from('workout_logs')
    .update({ completed })
    .eq('id', workoutId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
