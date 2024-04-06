import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/server/supabase/server";
import { redirect } from "next/navigation";
import { updateUser } from "./actions";
import SubmitButton from "./SubmitButton";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-full w-full flex-grow flex-col items-center justify-center py-6 ">
      <Card className="flex flex-col">
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <h1 className="text-3xl font-bold">Profile</h1>

          <Avatar className="h-16 w-16 border-2 border-foreground ">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/open-peeps/svg?seed=${user.email}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <form
            action={updateUser}
            className={
              "flex flex-col items-center justify-start gap-6 text-nowrap"
            }
          >
            <section className={"text-md flex w-full flex-col font-medium"}>
              First Name
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="John"
                defaultValue={user?.user_metadata?.first_name as string}
              />
            </section>
            <section className={"text-md flex w-full flex-col font-medium"}>
              Last Name
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Smith"
                defaultValue={user?.user_metadata?.last_name as string}
              />
            </section>
            <section className={"text-md flex w-full flex-col font-medium"}>
              Email
              <Input
                type="email"
                name="email"
                id="email"
                disabled
                defaultValue={user?.email}
              />
            </section>
            <section
              className={
                "text-md flex w-full flex-col gap-2 rounded-md border border-border p-2 font-medium "
              }
            >
              <div className={"flex w-full flex-row gap-4"}>
                <div className={"flex w-full flex-col "}>
                  Address Line 1
                  <Input
                    type="text"
                    name="address_line_1"
                    id="address_line_1"
                    placeholder="123 Main St."
                    defaultValue={user?.user_metadata?.address_line_1 as string}
                  />
                </div>
                <div className={"flex w-full flex-col"}>
                  Address Line 2
                  <Input
                    type="text"
                    name="address_line_2"
                    id="address_line_2"
                    placeholder="Apt. 123"
                    defaultValue={user?.user_metadata?.address_line_2 as string}
                  />
                </div>
              </div>
              <div className={"flex w-full flex-row gap-4"}>
                <div className={"flex w-full flex-col"}>
                  City
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Melbourne"
                    defaultValue={user?.user_metadata?.city as string}
                  />
                </div>
                <div className={"flex w-full flex-col"}>
                  State
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Victoria"
                    defaultValue={user?.user_metadata?.state as string}
                  />
                </div>
                <div className={"flex w-full flex-col"}>
                  Zip
                  <Input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="3000"
                    defaultValue={user?.user_metadata?.zip as string}
                  />
                </div>
              </div>
            </section>
            <section className={"text-md flex w-full flex-col font-medium"}>
              Country
              <Input
                type="text"
                name="country"
                id="country"
                placeholder="Australia"
                defaultValue={user?.user_metadata?.country as string}
              />
            </section>
            <section className={"text-md flex w-full flex-col font-medium"}>
              Phone Number (with country code)
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="+61 123 456 789"
                defaultValue={user?.user_metadata?.phone as string}
              />
            </section>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
