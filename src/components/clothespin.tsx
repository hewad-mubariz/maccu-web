function pinTilt(id: string) {
  let hash = 0;
  for (let index = 0; index < id.length; index++) {
    hash = (hash * 17 + id.charCodeAt(index)) | 0;
  }
  return ((Math.abs(hash) % 7) - 3) * 1.1;
}

export function Clothespin({
  pinId = "pin",
  className = "",
}: {
  pinId?: string;
  className?: string;
}) {
  const tilt = pinTilt(pinId);
  const grainId = `wood-${pinId.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox="-13 -31 26 61"
      className={`pin-stack ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grainId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a6d3d" />
          <stop offset="0.22" stopColor="#d3a46a" />
          <stop offset="0.58" stopColor="#bc8750" />
          <stop offset="0.84" stopColor="#e0b679" />
          <stop offset="1" stopColor="#8d6035" />
        </linearGradient>
        <filter id={`${grainId}-texture`} x="-30%" y="-10%" width="160%" height="120%">
          <feTurbulence baseFrequency="0.18 0.035" numOctaves="2" seed="7" result="noise" />
          <feComposite in="noise" in2="SourceAlpha" operator="in" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
        </filter>
      </defs>

      <rect x="-5.5" y="-26.5" width="11" height="47" rx="1" fill="#75502f" opacity=".2" transform="translate(1 2)" />
      <rect x="-5.5" y="-26.5" width="11" height="47" rx="1" fill="#a87d4e" />

      <g className="pin-jaw">
        <rect
          x="-6"
          y="-27"
          width="12"
          height="46"
          rx="1"
          fill={`url(#${grainId})`}
          filter={`url(#${grainId}-texture)`}
        />
        <path d="M-3 -24 Q-1 -9 -2 -3 M3 8 L2 17" fill="none" stroke="#76512f" strokeOpacity=".38" strokeWidth=".75" strokeLinecap="round" />
        <path d="M-7 -2V4Q-7 6-5 6H5Q7 6 7 3V-2M-6 1H6" fill="none" stroke="#6e695d" strokeWidth="1.15" strokeLinejoin="round" />
        <path d="M-6 .7H6" fill="none" stroke="#e8dfcf" strokeWidth=".38" />
      </g>
    </svg>
  );
}
