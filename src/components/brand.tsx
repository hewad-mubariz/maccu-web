type IconProps = { className?: string };

const stroke = {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Sprout({ className = "h-5 w-auto" }: IconProps) {
  return (
    <svg viewBox="0 0 30 34" className={className} fill="none" aria-hidden="true">
      <path d="M12.5 32c-.6-6.2.4-12.6 4.6-19.4" {...stroke} strokeWidth="2.6" />
      <path
        d="M16.6 13.4c-.4-5.2 3-9.8 10.4-11.2.8 6.4-3.4 11-10.4 11.2Z"
        {...stroke}
        strokeWidth="2.4"
      />
      <path d="M17.4 12.4c2.4-3 4.6-5 7.4-7.6" {...stroke} strokeWidth="1.6" />
      <path
        d="M13.4 22.4C12.2 17.4 7.8 14.2 2 14.6c.4 5.2 4.8 8.6 11.4 7.8Z"
        {...stroke}
        strokeWidth="2.4"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  sproutClassName = "h-[0.78em] w-auto",
}: {
  className?: string;
  sproutClassName?: string;
}) {
  return (
    <span
      className={`display-logo inline-flex items-end gap-[0.14em] font-display text-[1.85rem] leading-none tracking-[-0.035em] text-ink ${className}`}
    >
      maccu
      <Sprout className={`mb-[0.02em] ${sproutClassName}`} />
    </span>
  );
}

export function CameraIcon({ className = "h-14 w-14" }: IconProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" aria-hidden="true">
      <g className="text-coral" {...stroke} strokeWidth="4.6">
        <path d="M13 44.5c-.4-6.2 3-9.6 8.8-9.8l12.6-.4 4.8-8.4c1-1.8 2.6-2.6 4.6-2.6l17.4.2c2 0 3.4 1 4.4 2.8l4.2 8.2 14.6.2c5.6.2 8.8 3.6 8.8 9.6l-.4 34.4c0 5.8-3.4 8.8-9 8.8l-61.4.6c-5.6 0-8.8-3-8.8-8.6Z" />
        <path d="M52.5 44.8c9.8-.6 16.8 6.2 16.6 15.2-.2 9-7.4 15.6-16.4 15.4-9-.2-15.6-7-15.4-15.6.2-8 6.4-14.4 15.2-15Z" />
        <path d="M52.6 53.6c3.8-.2 6.8 2.8 6.6 6.4 0 3.6-3 6.4-6.6 6.2-3.6 0-6.2-2.8-6.2-6.4 0-3.4 2.6-6 6.2-6.2Z" />
        <path d="M76.8 45.4h5.4" />
      </g>
      <g className="text-sun" {...stroke} strokeWidth="4.2">
        <path d="M95 22.5l4.4-9.4" />
        <path d="M101.5 30.5l12-4.8" />
        <path d="M86.5 17.5l-.4-9.8" />
      </g>
    </svg>
  );
}

export function SketchbookIcon({ className = "h-14 w-14" }: IconProps) {
  return (
    <svg viewBox="0 0 110 100" className={className} fill="none" aria-hidden="true">
      <g className="text-coral" {...stroke}>
        <path
          d="M18.6 16.4c20.4-4.6 49.2-8.4 70.4-9.2 5.4-.2 8.4 2.4 9 7.8l4.6 55.6c.4 5.2-2.2 8.2-7.4 9l-64.6 12c-5.2 1-8.4-1.4-9.2-6.6L12.8 26.4c-.8-5.4 1.2-8.8 5.8-10Z"
          strokeWidth="4.6"
        />
        <path d="M28.2 14.6l9.4 74" strokeWidth="4" />
        <path
          d="M7.4 29.6l11.6-1.4M8.6 43.6l11.6-1.4M10 57.6l11.6-1.4M11.4 71.6l11.6-1.4"
          strokeWidth="4"
        />
        <path
          d="M65.4 42.2c3-5.8 12-5.6 12.6 1.2.6 6.4-6 11.4-14.2 17.4-6.8-6.4-12.6-10.4-12.8-17-.2-6.6 8.6-8.2 12.6-3.2"
          strokeWidth="4.4"
        />
      </g>
    </svg>
  );
}

export function StarsIcon({ className = "h-14 w-14" }: IconProps) {
  return (
    <svg viewBox="0 0 110 100" className={className} fill="none" aria-hidden="true">
      <g className="text-sun" {...stroke} strokeWidth="4.2">
        <path d="M75.8 8.4l4.8 11.4 12.2.6-9.4 7.8 3.2 12-10.4-6.6-10.4 6.8 3-12.2-9.6-7.6 12.4-.8Z" />
        <path d="M38 40.6c2.4 13.4 7.2 19.4 19.8 22-12.4 2.8-17.6 8.8-19.8 22.6-2.4-13.6-7.8-19.8-20.2-22.4 12.6-2.6 17.8-8.8 20.2-22.2Z" />
      </g>
    </svg>
  );
}

export function HeartDoodle({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <path
        d="M21.4 40.6C15 33.2 5.6 24 4.2 15.2 3 7.4 10.2 2.6 15.6 6.4c2.8 2 4.4 5.4 5.2 9.2 1.6-5.2 4.4-10.6 9.6-11.6 5.8-1.2 9.4 4.4 7.2 11.4-2.2 7.2-9.2 15.8-15.2 24.4-.4.6-1 1.6-1 1.6"
        {...stroke}
        strokeWidth="3.4"
      />
    </svg>
  );
}

export function LoopSquiggle({ className = "h-16 w-40" }: IconProps) {
  return (
    <svg viewBox="0 0 280 80" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 62c34 8 82 6 112-10 18-10 30-26 22-32-8-6-22 8-20 26 2 16 18 22 42 16 36-10 72-34 116-52"
        {...stroke}
        strokeWidth="3"
      />
    </svg>
  );
}

export function MemoryUnderline({ className = "h-3 w-64" }: IconProps) {
  return (
    <svg viewBox="0 0 420 20" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 15c90-9 200-12 296-10 44 1 82 3 112 2" {...stroke} strokeWidth="5" />
    </svg>
  );
}

export function HandUnderline({ className = "h-2 w-32" }: IconProps) {
  return (
    <svg viewBox="0 0 200 14" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 10c52-6 118-8 192-5" {...stroke} strokeWidth="3" />
    </svg>
  );
}

export function DashArrow({ className = "h-8 w-28" }: IconProps) {
  return (
    <svg viewBox="0 0 170 56" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 44c26 4 46-6 66-22 22-16 52-18 74-2 8 6 14 14 18 22"
        {...stroke}
        strokeWidth="2.6"
        strokeDasharray="8 8"
      />
      <path d="M150 44.5l12.4 7.4 1.6-14" {...stroke} strokeWidth="2.6" />
    </svg>
  );
}

export function CrayonSun({ className = "h-28 w-28" }: IconProps) {
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" aria-hidden="true">
      <defs>
        <filter id="crayon-sun" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.45" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g filter="url(#crayon-sun)" stroke="#f1b92e" strokeLinecap="round">
        <circle cx="72" cy="72" r="22" fill="#f4c23d" strokeWidth="6" />
        <path
          d="M72 32V14M72 112v18M32 72H14M112 72h18M43 43 30 30M101 101l13 13M101 43l13-13M43 101l-13 13"
          strokeWidth="8"
        />
      </g>
    </svg>
  );
}
