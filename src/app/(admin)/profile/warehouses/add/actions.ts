"use server";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createClient } from "@/server/supabase/server";
import { redirect } from "next/navigation";

export async function createWarehouse(formData: FormData) {
  const supabase = createClient();

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const warehouseData = {
    name: formData.get("warehouse_name") as string,
    address:
      (formData.get("address_line_1") as string) +
      ", " +
      (formData.get("address_line_2") as string) +
      ", " +
      (formData.get("city") as string) +
      ", " +
      (formData.get("state") as string) +
      ", " +
      (formData.get("country") as string) +
      ", " +
      (formData.get("zip") as string),

    created: new Date().toISOString(),
    moderator_name: formData.get("moderator_name"),
    moderator_email: formData.get("moderator_email"),

    moderator_phone: formData.get("moderator_phone"),
  };

  const { data, error } = await supabase
    .from("warehouses")
    .insert(warehouseData)
    .select()
    .single();

  //now we need to add oopening hours to the warehouse using its new id
  const openingHoursData = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    warehouse_id: data.id,
    monday_open: formData.get("monday_open"),
    monday_close: formData.get("monday_close"),
    tuesday_open: formData.get("tuesday_open"),
    tuesday_close: formData.get("tuesday_close"),
    wednesday_open: formData.get("wednesday_open"),
    wednesday_close: formData.get("wednesday_close"),
    thursday_open: formData.get("thursday_open"),
    thursday_close: formData.get("thursday_close"),
    friday_open: formData.get("friday_open"),
    friday_close: formData.get("friday_close"),
    saturday_open: formData.get("saturday_open"),
    saturday_close: formData.get("saturday_close"),
    sunday_open: formData.get("sunday_open"),
    sunday_close: formData.get("sunday_close"),
  };

  const { error: openingHoursError } = await supabase
    .from("warehouse_opening_hours")
    .insert(openingHoursData);

  if (error) {
    console.error("Error creating warehouse", error);
    redirect("/error");
  }

  if (openingHoursError) {
    console.error("Error creating warehouse opening hours", openingHoursError);
    redirect("/error");
  }

  redirect("/profile/warehouses");
}
