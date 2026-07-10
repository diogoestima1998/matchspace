import { Reveal } from "@/components/ui/Reveal/Reveal";

const STEPS = [
  {
    number: "1",
    icon: "search",
    title: "Browse profiles",
    description:
      "Filter by instrument, price and location. Every profile shows credentials, availability and a real hourly rate.",
  },
  {
    number: "2",
    icon: "calendar",
    title: "Request a lesson",
    description:
      "Pick a date and duration that suit you. No account needed - just your name and email.",
  },
  {
    number: "3",
    icon: "card",
    title: "Pay & you're booked",
    description:
      "Pay securely with Stripe. Your booking is confirmed instantly and your teacher gets in touch.",
  },
] as const;

function StepIcon({ icon }: { icon: (typeof STEPS)[number]["icon"] }) {
  if (icon === "search") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M16.5 16.5 21 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (icon === "calendar") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
      >
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M3.5 9.5h17M8 3v3.5M16 3v3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8.5 14.5l2.5 2.5 4.5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.5 14.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="how-it-works-heading"
              className="font-display text-2xl tracking-tight text-ink md:text-4xl"
            >
              How it works
            </h2>
            <p className="mt-3 text-ink/60">
              Three steps between you and your first lesson.
            </p>
          </div>
        </Reveal>
        <Reveal className="[transition-delay:150ms]">
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map(function renderStep(step) {
              return (
                <li key={step.number} className="group relative">
                  <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rausch/10 text-rausch transition-transform group-hover:scale-105">
                    <StepIcon icon={step.icon} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rausch text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-ink/60">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
