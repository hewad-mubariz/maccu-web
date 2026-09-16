import {
  CameraIcon,
  CrayonSun,
  DashArrow,
  HandUnderline,
  HeartDoodle,
  MemoryUnderline,
  SketchbookIcon,
  StarsIcon,
} from "@/components/brand";
import { HungLine } from "@/components/hung-line";
import { MeetMaccu } from "@/components/meet-maccu";
import { PhoneMockup } from "@/components/phone-mockup";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import Image from "next/image";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-hidden">
      <CrayonSun className="pointer-events-none absolute top-[calc(var(--u)*2.4)] -right-[calc(var(--u)*1.6)] z-0 hidden h-[calc(var(--u)*8.4)] w-[calc(var(--u)*8.4)] lg:block" />
      <SiteHeader />
      <HungLine />

      <main className="relative w-full flex-1 px-5 sm:px-8 lg:px-[5.7vw]">
        <section className="hero relative pt-48 sm:pt-60 lg:pt-0">
          <div className="hero-copy relative z-20">
            <h1 className="display-bold font-display text-[clamp(3.2rem,13vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-ink lg:text-[length:calc(var(--u)*7.4)]">
              Little art.
              <span className="relative block">
                Big memories.
                <MemoryUnderline className="absolute top-[100%] left-[1.45em] h-[0.14em] w-[3.5em] text-ink lg:mt-[0.04em]" />
              </span>
            </h1>

            <p className="mt-9 font-serif text-[clamp(1.15rem,4.6vw,1.45rem)] leading-snug text-ink lg:mt-[calc(var(--u)*3.3)] lg:text-[length:calc(var(--u)*1.58)] lg:whitespace-nowrap">
              Turn their drawings into a childhood you can keep.
            </p>
            <HeartDoodle className="absolute top-[calc(var(--u)*16.6)] left-[calc(var(--u)*39.6)] hidden h-[calc(var(--u)*3)] w-[calc(var(--u)*2.6)] rotate-[8deg] text-coral lg:block" />

            <MeetMaccu />

            <p className="relative mt-8 ml-1 inline-block -rotate-[7deg] font-hand text-[1.7rem] leading-[1.05] text-ink-soft lg:mt-[calc(var(--u)*1.2)] lg:text-[length:calc(var(--u)*1.85)]">
              Made for their
              <span className="block pl-[1.4em]">masterpieces.</span>
              <HandUnderline className="absolute -bottom-[0.3em] left-[3.9em] h-[0.3em] w-[4.2em] text-ink-soft" />
            </p>
          </div>

          <div
            id="how-it-works"
            role="list"
            className="hero-steps relative z-20 order-last mt-14 grid scroll-mt-24 gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-0"
          >
            <Step n="1" title="Capture" body="Photograph their drawings in seconds." icon={<CameraIcon className="h-full w-auto" />} />
            <Step n="2" title="Collect" body="Organise them into beautiful sketchbooks." icon={<SketchbookIcon className="h-full w-auto" />} arrow />
            <Step n="3" title="Keep" body={<>A childhood of creativity,<br className="hidden lg:block" /> always with you.</>} icon={<StarsIcon className="h-full w-auto" />} arrow />
          </div>

          <div className="hero-phone relative z-[35] mx-auto mt-16 w-[min(78vw,300px)] lg:mt-0">
            <PhoneMockup />
          </div>

          <p className="hero-note pointer-events-none absolute z-20 hidden -rotate-[13deg] text-center font-hand leading-[1.05] text-ink-soft lg:block">
            Their
            <br />
            art lives
            <br />
            on here.
            <HeartDoodle className="mx-auto mt-[0.3em] block h-[1.15em] w-[1em] -rotate-6 text-ink-soft" />
          </p>

          <div className="hero-book pointer-events-none absolute z-20 hidden lg:block" aria-hidden>
            <Image
              src="/art/sketchbook-physical-transparent.png"
              alt=""
              width={1310}
              height={1200}
              className="hero-book-cover"
            />
            <Image
              src="/art/sketchbook-physical-transparent.png"
              alt=""
              width={1310}
              height={1200}
              className="hero-crayon"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Step({
  n,
  title,
  body,
  icon,
  arrow = false,
}: {
  n: string;
  title: string;
  body: ReactNode;
  icon: ReactNode;
  arrow?: boolean;
}) {
  return (
    <article role="listitem" className="relative min-w-0">
      {arrow ? (
        <DashArrow className="pointer-events-none absolute top-[calc(var(--u)*2.6)] -left-[44%] hidden h-[calc(var(--u)*3.1)] w-[calc(var(--u)*10.6)] text-ink-soft lg:block" />
      ) : null}
      <div className="mb-3 ml-7 h-16 lg:mb-[calc(var(--u)*1.4)] lg:ml-[calc(var(--u)*2.3)] lg:h-[calc(var(--u)*6.6)]">{icon}</div>
      <div className="flex items-center gap-3 lg:gap-[calc(var(--u)*1)]">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peach font-serif text-[15px] font-semibold text-ink lg:h-[calc(var(--u)*2.3)] lg:w-[calc(var(--u)*2.3)] lg:text-[length:calc(var(--u)*1.2)]">
          {n}
        </span>
        <h2 className="display-bold font-display text-[1.75rem] leading-none tracking-[-0.02em] text-ink lg:text-[length:calc(var(--u)*1.95)]">
          {title}
        </h2>
      </div>
      <p className="mt-2 max-w-[15rem] pl-11 font-serif text-[16px] leading-[1.3] text-ink-soft lg:mt-[calc(var(--u)*0.7)] lg:max-w-[calc(var(--u)*18)] lg:pl-[calc(var(--u)*3.3)] lg:text-[length:calc(var(--u)*1.1)]">
        {body}
      </p>
    </article>
  );
}
