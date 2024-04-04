"use server";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "./actions";

export default async function Signup() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="bg-muted relative hidden h-full lg:block">
        <Image
          src="/foodbank5.jpg"
          alt="Image"
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground text-balance">
              Fill out the form below to sign up
            </p>
          </div>
          <form action={signup} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>

              <Input name="first_name" id="first_name" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>

              <Input name="last_name" id="last_name" type="text" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jsmith@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" className=" w-full">
              Signup
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
