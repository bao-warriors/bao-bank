import NavBar from "@/components/ui/NavBar";
import { createClient } from "@/server/supabase/server";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex  w-screen flex-col items-center justify-start ">
      <NavBar user={user} />
      <section className="w-full flex-1">{children}</section>
    </main>
  );
}
