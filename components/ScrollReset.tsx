"use client";

import { usePathname } from "next/navigation";
import { useMountEffect } from "@/hooks/useMountEffect";
import { resetScroll } from "@/lib/smoothScroll";

function Reset() {
  useMountEffect(() => {
    resetScroll();
  });
  return null;
}

export function ScrollReset() {
  const pathname = usePathname();
  return <Reset key={pathname} />;
}
