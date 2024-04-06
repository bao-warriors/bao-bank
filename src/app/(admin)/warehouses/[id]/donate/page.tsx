import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex h-full w-full flex-grow flex-col items-center justify-center py-6 ">
      <Card className="flex flex-col">
        <CardHeader>
          <h1 className="text-3xl font-bold">Donate Food Form</h1>
        </CardHeader>
        <CardContent>
          <form
            className={
              "flex flex-col items-center justify-start gap-6 text-nowrap"
            }
          >
            {" "}
            {/* First Name  */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              First Name
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
              />
            </section>
            {/* Last Name  */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              Last Name
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
              />
            </section>
            {/* Email  */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              Email
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="john_doe@xxx.com"
              />
            </section>
            {/* Phone Number  */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              Phone Number (with country code)
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="+61 123 456 789"
              />
            </section>
            {/* What food are you donating? */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              What food are you donating?
              <Input type="text" placeholder="Type here..." />
            </section>
            {/* What is your food storage requirements? */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              What is your food storage requirements?
              <Input type="text" placeholder="Type here..." />
            </section>
          </form>
          <Button
            variant={"secondary"}
            className="text-md mt-4 flex w-full flex-col items-center justify-end font-medium"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
