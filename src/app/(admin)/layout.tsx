import NavBar from "@/components/ui/NavBar";
import { createClient } from "@/server/supabase/server";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="flex h-full w-full flex-col items-center justify-start ">
      <NavBar user={data.user} />
      <section className="flex-1 w-full">{children}</section>
    </main>
  );
}
