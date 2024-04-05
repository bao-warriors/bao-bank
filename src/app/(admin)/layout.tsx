import NavBar from "@/components/ui/NavBar";
import { createClient } from "@/server/supabase/server";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  console.log("USER", data.user?.user_metadata);

  return (
    <main className="flex w-full flex-col items-center justify-start ">
      <NavBar user={data.user} />
      <section className=" w-full flex-1">{children}</section>
    </main>
  );
}
