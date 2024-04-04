"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { type User } from "@supabase/auth-js";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { createClient } from "@/server/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
const supabase = createClient();

export default function NavBar({ user }: { user: User | null }) {
  const router = useRouter();
  console.log(user);
  return (
    <nav className="flex h-16 w-full flex-row justify-between px-16 py-2">
      <div className="flex h-full flex-row items-center">
        <Image
          src="/bao_bank_logo.jpg"
          alt="BaoBank Logo"
          width={50}
          height={70}
          className={"object-cover "}
        />
        <Link href="/" className="flex flex-row text-2xl font-bold ">
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

              <DropdownMenuItem
                key={"logout"}
                className="hover:bg-destructive hover:text-white"
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
