import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex h-full w-full flex-col  items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] p-6 text-white">
      <section
        className={"flex w-2/3 flex-row justify-between overflow-visible"}
      >
        <p className="text-start text-3xl font-bold">Your Warehouses</p>
        <Link passHref href="/profile/warehouses/add">
          <Button variant="default" className="h-full w-full text-lg">
            Add Warehouse
          </Button>
        </Link>
      </section>

      
    </main>
  );
}
