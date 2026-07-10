import type { ReactNode } from "react";

export type Testimonial = {
  name: string;
  role: string;
  img: string;
  description: ReactNode;
};

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-rausch/10 px-1 py-0.5 font-medium text-rausch-deep">
      {children}
    </span>
  );
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mara Keller-Huber",
    img: "/reviews/mara.jpg",
    role: "Piano student, Zürich",
    description: (
      <p>
        I hadn&apos;t touched a piano in twenty years. Anna made the first
        lesson feel like coming home instead of an exam.{" "}
        <Highlight>Three months in, I play every single evening.</Highlight>
      </p>
    ),
  },
  {
    name: "Thomas Brunner",
    img: "/reviews/thomas.jpg",
    role: "Parent of a drum student, Basel",
    description: (
      <p>
        Our son counts down the days to his lesson with Jonas.{" "}
        <Highlight>He practises without being asked</Highlight> - any parent
        knows what a miracle that is.
      </p>
    ),
  },
  {
    name: "Laura Schmid",
    img: "/reviews/laura.jpg",
    role: "Violin student, Lausanne",
    description: (
      <p>
        Élodie rebuilt my posture and my confidence before my conservatory
        audition. <Highlight>I got the place.</Highlight> Strict, warm, and
        worth every franc.
      </p>
    ),
  },
  {
    name: "Marc Dubois",
    img: "/reviews/marc.jpg",
    role: "Saxophone student, online",
    description: (
      <p>
        I was sceptical about online lessons until David&apos;s two-camera
        setup. <Highlight>I can see every fingering in detail</Highlight> -
        better than leaning over a stand in person, honestly.
      </p>
    ),
  },
  {
    name: "Nicole Steffen",
    img: "/reviews/nicole.jpg",
    role: "Voice student, Bern",
    description: (
      <p>
        Sofia taught me to trust my voice instead of forcing it. After eight
        lessons I sang at my sister&apos;s wedding.{" "}
        <Highlight>Nobody believed I was a beginner.</Highlight>
      </p>
    ),
  },
  {
    name: "Reto Baumgartner",
    img: "/reviews/reto.jpg",
    role: "Cello student, Zürich",
    description: (
      <p>
        I&apos;m 58 and always wanted to try the cello. Matteo lent me an
        instrument and never once made me feel late to the party.{" "}
        <Highlight>Best decision I&apos;ve made in years.</Highlight>
      </p>
    ),
  },
  {
    name: "Sandra Meili",
    img: "/reviews/sandra.jpg",
    role: "Booked for her daughter, Luzern",
    description: (
      <p>
        Found Marc, requested a Saturday slot and{" "}
        <Highlight>paid securely in under five minutes</Highlight> - no phone
        calls, no cash envelopes, no chasing. This is how it should work.
      </p>
    ),
  },
  {
    name: "Camille Perret",
    img: "/reviews/camille.jpg",
    role: "Flute student, Geneva",
    description: (
      <p>
        Céline balances technique and joy exactly as her profile promises.{" "}
        <Highlight>
          My tone improved more in two months than in two years
        </Highlight>{" "}
        of teaching myself.
      </p>
    ),
  },
  {
    name: "Daniel Frey",
    img: "/reviews/daniel.jpg",
    role: "Guitar student, Lugano",
    description: (
      <p>
        Luca had me playing from the first minute of the first lesson. Flamenco
        always felt out of reach -{" "}
        <Highlight>now it&apos;s my Sunday morning ritual.</Highlight>
      </p>
    ),
  },
  {
    name: "Priya Sharma",
    img: "/reviews/priya.jpg",
    role: "Piano exam candidate, Basel",
    description: (
      <p>
        Hana prepared me for my ABRSM Grade 8 with a precision I&apos;ve never
        experienced. <Highlight>Distinction, first try.</Highlight> Enough said.
      </p>
    ),
  },
  {
    name: "Luc Girard",
    img: "/reviews/luc.jpg",
    role: "Guitar student, online",
    description: (
      <p>
        Pedro&apos;s lessons fit around my shift work, and the recorded feedback
        between sessions keeps me honest.{" "}
        <Highlight>Progress without rearranging my life.</Highlight>
      </p>
    ),
  },
  {
    name: "Anina Vogt",
    img: "/reviews/anina.jpg",
    role: "Voice student, Winterthur",
    description: (
      <p>
        Selin gets what pop singers actually need - mic technique, confidence,
        healthy belting.{" "}
        <Highlight>My band noticed the difference after one month.</Highlight>
      </p>
    ),
  },
];
