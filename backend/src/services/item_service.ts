import { supabase } from "../config/supabase";
import { CreateItemInput } from "../types/item";

export async function createItem(data: CreateItemInput) {
  const { data: item, error } = await supabase
    .from("Item")
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return item;
}
export async function getItems() {
  const { data, error } = await supabase
    .from("Item")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getItemById(id: string) {
  const { data, error } = await supabase
    .from("Item")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function deleteItem(id: string) {
  const { error } = await supabase
    .from("Item")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { message: "Item deleted successfully" };
}