import { Logo } from "@/components/brand";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { ReactNode } from "react";

export function ProsePage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 sm:px-8">
        <Logo className="mb-8 text-[1.4rem]" />
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink sm:text-5xl">
          {title}
        </h1>
        {updated ? (
          <p className="mt-4 font-serif text-[0.95rem] text-ink-faint">
            Last updated {updated}
          </p>
        ) : null}
        <div className="mt-8 font-serif text-[1.05rem] leading-relaxed text-ink-soft [&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-[1.7rem] [&>h2]:leading-[1.15] [&>h2]:tracking-[-0.03em] [&>h2]:text-ink [&>h2+p]:mt-4 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[1.25rem] [&>h3]:leading-snug [&>h3]:text-ink [&>h3+p]:mt-3 [&>p+p]:mt-4 [&>p+ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul+p]:mt-4 [&>ul+h2]:mt-12 [&_a]:text-ink [&_a]:underline [&_a]:decoration-coral/70 [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-ink">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
