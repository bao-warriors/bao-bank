import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const donations_msg = [
  {
    id: "1",
    content: "Warehouse A successfully donated 50kg of rice and potatoes!!!",
    date: "05/04/2024",
  },
  {
    id: "2",
    content: "Warehouse B recently received a donation of fruits ....",
    date: "05/04/2024",
  },
  {
    id: "3",
    content: "Warehouse B recently received a donation of fruits ....",
    date: "05/04/2024",
  },
  {
    id: "4",
    content: "Warehouse B recently received a donation of fruits ....",
    date: "05/04/2024",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-row items-center">
        <Image
          src="/WelcomeBaoBank2.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-3/4 w-1/2 object-cover dark:grayscale"
        />
        {/* <h1 className="mt-8  text-4xl font-bold text-white">
          Welcome to Bao Bank
        </h1> */}
        <Image
          src="/WelcomeBaoBank.jpg"
          alt="Image"
          width="1920"
          height="110"
          className="h-3/4 w-1/2 object-cover dark:grayscale"
        />
      </div>
      <div className="flex justify-center">
        <ScrollArea className="w-full rounded-md border border-transparent">
          <div className="flex w-max space-x-4 p-4">
            {donations_msg.map((message) => (
              <figure key={message.id} className="shrink-0">
                <div
                  className="rounded-md"
                  style={{ height: "250px", width: "500px" }}
                >
                  <Card
                    key={message.id}
                    className="mt-4 flex flex-col rounded-lg bg-gray-100 p-4 shadow-md"
                  >
                    <CardHeader>
                      <p className="opacity-50">{message.date}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="font-bold">Message: </p>
                      <p>{message.content}</p>
                    </CardContent>
                  </Card>
                </div>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
}
