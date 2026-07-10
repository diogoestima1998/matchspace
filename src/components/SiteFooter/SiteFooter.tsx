import Link from "next/link";

import { Logo } from "@/components/Logo/Logo";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Find a teacher", href: "/teachers" },
      { label: "Become a teacher", href: "/signup" },
      { label: "Log in", href: "/login" },
    ],
  },
  {
    heading: "Instruments",
    links: [
      { label: "Piano", href: "/teachers?instrument=piano" },
      { label: "Guitar", href: "/teachers?instrument=guitar" },
      { label: "Violin", href: "/teachers?instrument=violin" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/matchspacemusic#",
    path: "M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.6-1.6h1.4V4.8c-.6-.1-1.4-.2-2.3-.2-2.4 0-4 1.4-4 4.1V11H7.8v3h2.4v7h3.3z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/matchspace-music/posts/?feedView=all",
    path: "M6.9 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM5.4 10h3v9.5h-3V10zm5 0h2.9v1.3h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.6v5.1h-3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.6h-3V10z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC2dwy8vptJI-jiin_j6G_9g",
    path: "M21.6 8.2a2.4 2.4 0 0 0-1.7-1.7C18.4 6.1 12 6.1 12 6.1s-6.4 0-7.9.4A2.4 2.4 0 0 0 2.4 8.2 25 25 0 0 0 2 12a25 25 0 0 0 .4 3.8 2.4 2.4 0 0 0 1.7 1.7c1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4a2.4 2.4 0 0 0 1.7-1.7A25 25 0 0 0 22 12a25 25 0 0 0-.4-3.8zM10 15V9l5.2 3L10 15z",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo className="h-9" />
            <p className="mt-3 text-sm leading-relaxed text-ink/50">
              Private music lessons across Switzerland - in person or online.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(function renderSocial(social) {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Matchspace Music on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-ink hover:text-ink"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-16">
            {FOOTER_COLUMNS.map(function renderColumn(column) {
              return (
                <nav key={column.heading} aria-label={column.heading}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
                    {column.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {column.links.map(function renderLink(link) {
                      return (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-ink/70 transition-colors hover:text-rausch"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>
        <div className="mt-12 space-y-2 border-t border-line pt-6 text-center text-xs text-ink/40">
          <p>
            © 2026 Matchspace Music. Made with ♥ by{" "}
            <a
              href="https://www.diogoestima.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink/60 transition-colors hover:text-rausch"
            >
              Diogo Estima
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
