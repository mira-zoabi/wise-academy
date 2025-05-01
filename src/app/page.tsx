"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/admission-flow");
  }, [router]);

return (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
    <span className="ml-2">Redirecting...</span>
  </div>
);

}