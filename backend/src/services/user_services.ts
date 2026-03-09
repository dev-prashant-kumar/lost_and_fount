import { supabase } from "../config/supabase";


export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from("User")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}