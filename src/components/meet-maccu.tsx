"use client";

import { LoopSquiggle } from "@/components/brand";
import { blowLine } from "@/lib/audio";
import Link from "next/link";

export function MeetMaccu() {
  return (
    <div className="relative mt-8 flex lg:mt-[calc(var(--u)*2.5)]">
      <Link
        href="#how-it-works"
        className="inline-flex items-center gap-3 rounded-full bg-forest px-8 py-3.5 font-serif text-[19px] text-[#f6efe4] shadow-[0_8px_18px_rgb(16_57_43/0.18)] transition-transform hover:-translate-y-0.5 lg:h-[calc(var(--u)*4.5)] lg:gap-[calc(var(--u)*1.9)] lg:px-[calc(var(--u)*4)] lg:py-0 lg:text-[length:calc(var(--u)*1.7)]"
        onClick={() => blowLine(1)}
      >
        Meet Maccu
        <svg viewBox="0 0 28 16" className="h-[0.6em] w-[1.15em]" fill="none" aria-hidden>
          <path d="M1.5 8h24M19 1.5 25.8 8 19 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <LoopSquiggle className="pointer-events-none absolute top-[-0.6rem] left-[calc(100%+1rem)] hidden h-16 w-44 text-coral sm:block lg:top-[calc(var(--u)*-1.4)] lg:left-[calc(var(--u)*21.4)] lg:h-[calc(var(--u)*5.2)] lg:w-[calc(var(--u)*18.2)]" />
    </div>
  );
}

export function GetMaccu() {
  return (
    <Link
      href="/#how-it-works"
      className="relative z-10 whitespace-nowrap rounded-full bg-coral px-4 py-2 font-serif text-[15px] text-white shadow-[0_6px_14px_rgb(224_106_80/0.24)] transition-colors hover:bg-coral-deep sm:px-6 lg:px-[calc(var(--u)*1.9)] lg:py-[calc(var(--u)*0.72)] lg:text-[length:calc(var(--u)*1.2)]"
      onClick={() => blowLine(1)}
    >
      Get Maccu
    </Link>
  );
}
