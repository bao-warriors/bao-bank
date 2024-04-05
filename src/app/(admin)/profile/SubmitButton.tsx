"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <section
      className={
        "text-md flex w-full flex-col items-center justify-end font-medium"
      }
    >
      <Button
        type="submit"
        variant={"secondary"}
        disabled={pending}
        className=" w-full"
      >
        {pending && <Loader2 size={16} className="mr-6 animate-spin" />}
        Save
      </Button>
    </section>
  );
}
