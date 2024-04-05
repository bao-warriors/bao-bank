"use server";
import { createClient } from "@/server/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(formData: FormData) {
  const supabase = createClient();
  const data = {
    data: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      address_line_1: formData.get("address_line_1"),
      address_line_2: formData.get("address_line_2"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      zip: formData.get("zip"),
      phone: formData.get("phone"),
    },
  };

  const { error } = await supabase.auth.updateUser(data);

  if (error) {
    console.error("Error updating user", error);
    redirect("/error");
  }

  revalidatePath("/profile");
}
