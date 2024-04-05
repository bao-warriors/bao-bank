import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Fake data for testing
const warehouses = [
  {
    id: "1",
    name: "Warehouse A",
    location: "City A",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  {
    id: "2",
    name: "Warehouse B",
    location: "City B",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  {
    id: "3",
    name: "Warehouse C",
    location: "City C",
    phone: "12345678",
    email: "1234567890@3456",
    monday_start_time: "9:00",
    monday_end_time: "15:00",
    tuesday_start_time: "9:00",
    tuesday_end_time: "15:00",
    wednesday_start_time: "9:00",
    wednesday_end_time: "15:00",
    thursday_start_time: "9:00",
    thursday_end_time: "15:00",
    friday_start_time: "9:00",
    friday_end_time: "15:00",
    saturday_start_time: "9:00",
    saturday_end_time: "15:00",
    sunday_start_time: "9:00",
    sunday_end_time: "15:00",
  },
  // Add more fake data as needed
];

export default function Page() {
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
          {warehouses.map((warehouse) => (
            <Card
              key={warehouse.id}
              className="flex w-full flex-col rounded-lg bg-white p-4 shadow-md md:w-2/3 md:flex-row"
            >
              {/* First Section: Email, Phone Number */}
              <CardHeader className="justify-center">
                <h1 className="text-2xl font-bold">{warehouse.name}</h1>
                <p className="text-gray-800">Phone number: {warehouse.phone}</p>
                <p className="text-gray-800">
                  Email address: {warehouse.email}
                </p>
                <Button variant={"secondary"} className="w-3/4">
                  Request Food
                </Button>
              </CardHeader>
              <CardContent className="mb-4 w-full text-gray-800  md:mr-4 md:w-1/3">
                {/* Second Section: Opening Times */}
                <p className="text-xl font-semibold">Opening Times</p>
                <p>
                  Monday: {warehouse.monday_start_time} -{" "}
                  {warehouse.monday_end_time}
                </p>
                <p>
                  Tuesday: {warehouse.tuesday_start_time} -{" "}
                  {warehouse.tuesday_end_time}
                </p>
                <p>
                  Wednesday: {warehouse.wednesday_start_time} -{" "}
                  {warehouse.wednesday_end_time}
                </p>
                <p>
                  Thursday: {warehouse.thursday_start_time} -{" "}
                  {warehouse.thursday_end_time}
                </p>
                <p>
                  Friday: {warehouse.friday_start_time} -{" "}
                  {warehouse.friday_end_time}
                </p>
                <p>
                  Saturday: {warehouse.saturday_start_time} -{" "}
                  {warehouse.saturday_end_time}
                </p>
                <p>
                  Sunday: {warehouse.sunday_start_time} -{" "}
                  {warehouse.sunday_end_time}
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
