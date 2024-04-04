"use client";
import { createClient } from "@/server/supabase/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { type User } from "@supabase/auth-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";
const supabase = createClient();

export default function NavBar({ user }: { user: User | null }) {
  const router = useRouter();
  return (
    <nav className="flex h-16 w-full flex-row justify-between px-16 py-4">
      <Link href="/" className="text-2xl font-bold">
        BaoBank
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center">
        {user ? (
          <Link href="/profile" className="mr-4">
            {user.email}
          </Link>
        ) : (
          <Link href="/login" className="mr-4">
            Login
          </Link>
        )}
        {user ? (
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Link href="/signup">Signup</Link>
        )}
      </div>
    </nav>
  );
}
