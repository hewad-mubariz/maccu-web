import Image from "next/image";

export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <figure className={`phone ${className}`} aria-label="Maccu running on an iPhone">
      <span className="phone-key phone-key-action" aria-hidden />
      <span className="phone-key phone-key-up" aria-hidden />
      <span className="phone-key phone-key-down" aria-hidden />
      <span className="phone-key phone-key-power" aria-hidden />

      <div className="phone-body">
        <div className="phone-glass">
          <div className="phone-screen">
            <Image
              src="/art/app-home.jpg"
              alt="The Maccu home screen: a sketchbook of Usman's coloured drawings with a camera to save the next one"
              fill
              priority
              sizes="(min-width: 1024px) 26vw, 300px"
              className="object-cover object-top"
            />
            <span className="phone-island" aria-hidden>
              <span className="phone-lens" />
            </span>
            <span className="phone-glare" aria-hidden />
          </div>
        </div>
      </div>
    </figure>
  );
}
