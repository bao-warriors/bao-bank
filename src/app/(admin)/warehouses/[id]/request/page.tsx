import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <main className="flex min-h-full w-full flex-grow flex-col items-center justify-center py-6 ">
      <Card className="flex flex-col">
        <CardHeader>
          <h1 className="text-3xl font-bold">Request Food Form</h1>
        </CardHeader>
        <CardContent>
          <form
            className={
              "flex flex-col items-center justify-start gap-6 text-nowrap"
            }
            action={(formData: FormData) => {
              "use server";
              console.log(formData);
              redirect("/home");
            }}
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
            {/* Dietary Requirements */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              Dietary Requirements
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dietary Requirements</SelectLabel>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Gluten free">Gluten free</SelectItem>
                    <SelectItem value="Diary free">Diary free</SelectItem>
                    <SelectItem value="Vegan">Vegan</SelectItem>
                    <SelectItem value="Tree Nut and peanut allergies">
                      Tree Nut and peanut allergies
                    </SelectItem>
                    <SelectItem value="Fish and shellfish allergies">
                      Fish and shellfish allergies
                    </SelectItem>
                    <SelectItem value="Other">
                      Others (Please Specify)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="text"
                name="color"
                id="color"
                style={{ display: "bg-grey" }}
                placeholder="For other dietary requirements"
                className="mt-4"
              />
            </section>
            {/* Why do you need the food? */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              Explain you current situation and the reason you need help.
              <Input type="text" placeholder="Type here..." />
            </section>
            {/* What are your requests? */}
            <section className={"text-md flex w-full flex-col font-medium"}>
              What are your food requests?
              <Input type="text" placeholder="Type here..." />
            </section>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
