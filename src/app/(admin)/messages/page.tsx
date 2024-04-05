import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const messages = [
  {
    id: "1",
    title: "Title 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05/04/2024",
  },
  {
    id: "2",
    title: "Title 2",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    date: "05/04/2024",
  },
  {
    id: "3",
    title: "Title 3",
    content:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    date: "05/04/2024",
  },
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div>
        <h1 className="mt-8 text-center text-2xl font-bold text-white">
          Your Messages
        </h1>
      </div>
      <div className="flex justify-center">
        <ScrollArea className="w-full rounded-md border border-transparent bg-transparent">
          <div className="flex w-max space-x-4 p-4">
            {messages.map((message) => (
              <figure key={message.id} className="shrink-0">
                <div
                  className="rounded-md"
                  style={{ height: "500px", width: "750px" }}
                >
                  <Card
                    key={message.id}
                    className="mt-4 flex flex-col rounded-lg bg-yellow-100 p-4 shadow-md"
                  >
                    <CardHeader>
                      <p className="opacity-50">{message.date}</p>
                      <h1 className="text-2xl font-bold">{message.title}</h1>
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
