import { HandUnderline, HeartDoodle, Logo } from "@/components/brand";
import { GetMaccu } from "@/components/meet-maccu";
import Link from "next/link";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/our-story", label: "Our story" },
  { href: "/support", label: "Support" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/delete-account", label: "Delete account" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="pointer-events-none relative z-40 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 lg:px-[5.7vw] lg:pt-[calc(var(--u)*1.45)]">
      <Link href="/" className="pointer-events-auto shrink-0" aria-label="Maccu home">
        <Logo className="text-[2.2rem] lg:text-[length:calc(var(--u)*3.9)]" />
      </Link>
      <nav className="pointer-events-auto flex items-center gap-4 sm:gap-8 lg:gap-[calc(var(--u)*2.4)]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative z-10 hidden font-serif text-[16px] text-ink transition-colors hover:text-coral-deep md:inline lg:text-[length:calc(var(--u)*1.2)]"
          >
            {link.label}
          </Link>
        ))}
        <GetMaccu />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-20 mt-auto px-5 pb-8 sm:px-8 lg:px-[5.7vw] lg:pb-[calc(var(--u)*1.2)]">
      <div className="flex flex-col gap-5 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between lg:-mx-[calc(var(--u)*2)] lg:px-[calc(var(--u)*2)] lg:pt-[calc(var(--u)*1.4)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-[calc(var(--u)*3.2)]">
          <Link href="/" aria-label="Maccu home">
            <Logo className="text-[1.6rem] lg:text-[length:calc(var(--u)*2.2)]" />
          </Link>
          {legal.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="font-serif text-[14px] text-ink transition-colors hover:text-coral-deep lg:text-[length:calc(var(--u)*1.05)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="relative flex -rotate-[5deg] items-end gap-3 self-start font-hand text-[22px] leading-[1.05] text-ink-soft sm:self-auto lg:mr-[calc(var(--u)*1.2)] lg:text-[length:calc(var(--u)*1.65)]">
          <span>
            Good things
            <span className="block pl-[1.3em]">
              should be remembered.
            </span>
          </span>
          <HandUnderline className="absolute -bottom-[0.25em] left-[5.4em] h-[0.3em] w-[3.8em] text-ink-soft" />
          <HeartDoodle className="mb-[0.15em] h-[1.1em] w-[0.95em] text-coral" />
        </p>
      </div>
    </footer>
  );
}
