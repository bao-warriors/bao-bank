"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/server/supabase/client";
import { type User } from "@supabase/auth-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
const supabase = createClient();

export default function NavBar({ user }: { user: User | null }) {
  const router = useRouter();
  return (
    <nav className="flex h-16 w-full flex-row justify-between border border-b px-16 py-2">
      <div className="flex h-full flex-row items-center overflow-hidden">
        <Image
          src="/bao_bank_logo.jpg"
          alt="BaoBank Logo"
          width={50}
          height={50}
          className={"rounded-full "}
        />
        <Link href="/" className="flex flex-row  text-2xl font-bold ">
          BaoBank
        </Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/warehouses" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Warehouses
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border-2 border-foreground">
                <AvatarImage
                  src={`https://api.dicebear.com/8.x/open-peeps/svg?seed=${user.email}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="/profile" passHref>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile/messages" passHref>
                  Your Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile/warehouses" passHref>
                  Your Warehouses
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                key={"logout"}
                className=" "
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </nav>
  );
}
