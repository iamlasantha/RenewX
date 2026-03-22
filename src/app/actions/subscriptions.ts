"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export type Subscription = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  amount: number;
  billing_cycle: "Monthly" | "Yearly";
  renewal_date: string;
  status: "Active" | "Cancelled";
};

export async function getSubscriptions() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("renewal_date", { ascending: true });

  if (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }

  return data as Subscription[];
}

export async function addSubscription(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount"));
  const cycleVal = formData.get("cycle") as string;
  const cycle = (cycleVal.charAt(0).toUpperCase() + cycleVal.slice(1)) as "Monthly" | "Yearly";
  const categoryVal = formData.get("category") as string;
  const category = categoryVal.charAt(0).toUpperCase() + categoryVal.slice(1);
  const date = formData.get("date") as string;

  const { error } = await supabase.from("subscriptions").insert({
    user_id: user.id,
    name,
    amount,
    billing_cycle: cycle,
    category,
    renewal_date: date,
    status: "Active"
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
