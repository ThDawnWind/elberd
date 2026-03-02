"use client";

import { Grid3X3 } from "lucide-react";

export default function CatalogHeader({ title }: { title: string }) {
  return (
    <div className="bg-white/95 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b w-full font-mono">
      <div className="mx-4 md:mx-[60px] px-4 py-4 xs:py-2">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-berd-primary" aria-hidden="true" />
          <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
        </div>
      </div>
    </div>
  );
}