import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, openAcademySoon } from "@/components/site/chrome";
import { BrandLogo } from "@/components/site/brand-logo";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/")({ component: Home });

const MARQUEE = ["PASS", "ATELIER", "ACADEMY", "TALENT", "DIGITAL", "OS", "ATLAS", "LEDGER", "PERTH", "GENDER-FLUID"];

function Home() {
  const [drop, setDrop] = useState<Product[]>([]);

  useEffect(() => {
    listProducts({ data: "atelier" })
      .then((rows) => setDrop(rows.slice(0, 3)))
      .catch(() => setDrop([]));
  }, []);

  return (
    <HouseChrome>
      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden px-5 pb-20 pt-28">
        <video
          className="absolute inset-0 size-full object-cover"
          src="/hero-loop.mp4"
          poster="/hero-corridor.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-t from-void via-void/50 to-navy/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(11,2,45,0.62)_78%)]" />
        <div className="relative flex flex-col items-center text-center">
          <p className="mb-5 font-display text-xs tracking-[0.35em] text-heat uppercase">
            Gender-fluid adult house · Perth
          </p>
          <BrandLogo variant="wordmark" className="hero-mark h-auto w-[min(86vw,46rem)]" />
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ivory/85">
            Membership, objects, seats, talent, tools, and an industry index — a ledger, not a landing page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/digital"
              className="inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
            >
              Digital services
            </Link>
            <Link
              to="/atelier"
              className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              This drop
            </Link>
            <Link
              to="/corporate"
              className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              Corporate
            </Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-navy py-3" aria-hidden="true">
        <div className="marquee-track flex w-max gap-9 font-display text-xs tracking-widest text-heat uppercase">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="flex items-center gap-9">
              {w}
              <i className="size-1.5 rounded-full bg-ivory/30" />
            </span>
          ))}
        </div>
      </div>

      <section className="relative grid min-h-[70vh] overflow-hidden md:grid-cols-2">
        <video
          className="h-80 w-full object-cover md:h-full"
          src="/hero-loop.mp4"
          poster="/hero-corridor.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="flex flex-col justify-center bg-navy px-5 py-16 md:px-12">
          <p className="font-display text-xs tracking-widest text-heat uppercase">The identity</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide uppercase md:text-6xl">
            Not a side.
            <br />
            The house.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            Gender-fluid by design. The mark does not pick a gender and neither does the roster,
            the rooms, or the tab. Four desks take money. One ledger holds it.
          </p>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: "01", to: "/talent" as const, t: "Talent", d: "Day rates. Campaign deposits. Signed bodies only." },
          { n: "02", to: "/os" as const, t: "OS", d: "Storefront, calendar, leak watch, BAS pack." },
          { n: "03", to: "/atlas" as const, t: "Atlas", d: "The trade, indexed. Compile a dossier from live identifiers." },
          { n: "04", to: "/academy" as const, t: "Academy", d: "Paid seats. Identity, consent, house craft." },
          { n: "05", to: "/lookbook" as const, t: "Lookbook", d: "Permissioned editorial likeness. A lease." },
          { n: "06", to: "/digital" as const, t: "Digital", d: "Sites, tools, and studio work. The brief opens here." },
          { n: "07", to: "/ledger" as const, t: "Ledger", d: "FLESH Points. Rewards. A pass you can claim." },
          { n: "08", to: "/corporate" as const, t: "Corporate", d: "The house file and every public price." },
        ].map((h) =>
          h.to === "/academy" ? (
            <button
              key={h.n}
              type="button"
              onClick={() => openAcademySoon()}
              className="border-t border-line px-5 py-12 text-left transition-colors hover:bg-navy md:px-8"
            >
              <p className="font-display text-xs tracking-widest text-heat uppercase">{h.n}</p>
              <h3 className="mt-3 font-display text-3xl tracking-wide uppercase">{h.t}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{h.d}</p>
            </button>
          ) : (
            <Link
              key={h.n}
              to={h.to}
              className="border-t border-line px-5 py-12 transition-colors hover:bg-navy md:px-8"
            >
              <p className="font-display text-xs tracking-widest text-heat uppercase">{h.n}</p>
              <h3 className="mt-3 font-display text-3xl tracking-wide uppercase">{h.t}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{h.d}</p>
            </Link>
          ),
        )}
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-widest text-heat uppercase">Atelier</p>
            <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">This drop</h2>
          </div>
          <Link to="/atelier" className="font-display text-xs tracking-widest text-heat uppercase">
            Full floor
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {drop.map((p) => (
            <Link key={p.id} to="/atelier/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-portrait overflow-hidden bg-navy">
                <img
                  src={p.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <p className="font-display text-sm tracking-wide uppercase">{p.title}</p>
                <p className="font-display text-sm text-heat tabular-nums">{aud(p.price_cents)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid place-items-center px-5 py-24 text-center">
        <p className="font-display text-xs tracking-widest text-heat uppercase">The door is open</p>
        <h2 className="mt-3 font-display text-5xl tracking-wide uppercase md:text-7xl">
          Come in
          <br />
          as you are.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/pass"
            className="inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
          >
            House pass
          </Link>
          <Link
            to="/join"
            className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
          >
            Open a file
          </Link>
        </div>
      </section>
    </HouseChrome>
  );
}
