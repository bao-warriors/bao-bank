/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//diable ts errors for this file
/*ts-ignore*/
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/server/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();

  const { data: warehouses, error } = await supabase
    .from("warehouses")
    .select(
      ` id, name, moderator_name, moderator_email, moderator_phone, warehouse_opening_hours (id, monday_open, monday_close, tuesday_open, tuesday_close, wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open, friday_close, saturday_open, saturday_close, sunday_open, sunday_close) warehouse_location (id, latitude, longitude, address, city, postcode) warehouse_contact (id, phone, email, website`,
    );

  if (error ?? !warehouses) {
    console.log(error);
    return <div>Error loading data</div>;
  }

  //set types of warehouses

  console.log(warehouses[0]);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="page-container pt-6">
        <div className="mt-4 flex justify-center">
          <div>
            {/* <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Add Warehouse
            </button> */}
            <Button variant={"secondary"}>Add Warehouse</Button>
          </div>
          <div className="ml-4 flex w-full max-w-sm items-center">
            <Input type="warehouse name" placeholder="Warehouse name..." />
            <Button type="submit">Search</Button>
          </div>
        </div>

        {/* Display warehouses */}
        <div className="mt-8 flex flex-col items-center justify-start gap-4 p-4">
          {warehouses?.map((warehouse) => (
            <Card
              key={warehouse.id}
              className="flex w-full flex-col rounded-lg bg-white p-4 shadow-md md:w-2/3 md:flex-row"
            >
              {/* First Section: Email, Phone Number */}
              <CardHeader className="justify-center">
                <h1 className="text-2xl font-bold">{warehouse.name}</h1>
                <p className="text-gray-800">
                  Phone number: {warehouse.moderator_phone}
                </p>
                <p className="text-gray-800">
                  Email address: {warehouse.moderator_email}
                </p>
                <Link href={"/warehouses/" + warehouse.id + "/request"}>
                  <Button variant={"secondary"} className="w-3/4">
                    Request Food
                  </Button>
                </Link>
                <Link href={"/warehouses/" + warehouse.id + "/donate"}>
                  <Button variant={"secondary"} className="w-3/4">
                    Donate Food
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="mb-4 w-full text-gray-800  md:mr-4 md:w-1/3">
                {/* Second Section: Opening Times */}
                <p className="text-xl font-semibold">Opening Times</p>
                <p>
                  Monday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].monday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].monday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Tuesday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].tuesday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].tuesday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Wednesday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].wednesday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].wednesday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Thursday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].thursday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].thursday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Friday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].friday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].friday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Saturday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].saturday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].saturday_close,
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Sunday:{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].sunday_open,
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    warehouse.warehouse_opening_hours[0].sunday_close,
                  ).toLocaleTimeString()}
                </p>
              </CardContent>
              <CardContent className="w-full md:w-1/3">
                {/* Third Section: Location */}
                <p className="text-xl font-semibold text-gray-800">Location</p>
                <Image src="/map.jpg" alt="Map" width={500} height={500} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
