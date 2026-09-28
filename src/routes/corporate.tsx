import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { BrandLogo } from "@/components/site/brand-logo";
import { listProducts, listRooms, listTalent, type Product, type Room, type Talent } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/corporate")({ component: Corporate });

const DESKS = [
  ["Pass", "One ID. Sesh, Sesh Black, House. Member rates live on the ledger."],
  ["Atelier", "Objects cut for any body. Some are made when the order lands."],
  ["Academy", "Consent, language, money, and how a brand writes a brief."],
  ["Talent", "Signed people. Day rates. A file, not a type."],
  ["Sites", "Personal sites. Start $295, Signature $595, Black $995. 72 hours after the files land."],
  ["OS", "Storefront, calendar, leak watch, tax pack. Tools, not a tube."],
  ["Atlas", "Australian, American, and European industry databases. Law, Perth first."],
  ["Ledger", "Credit, points, and the tab. What was spent stays visible."],
];

const GROUPS: { kind: string; label: string; note: string }[] = [
  { kind: "membership", label: "Passes", note: "Monthly. Cancel any month." },
  { kind: "os", label: "Creator OS", note: "Monthly tools." },
  { kind: "academy", label: "Academy", note: "A seat. Library is monthly." },
  { kind: "exam", label: "Certificate", note: "Once." },
  { kind: "atelier", label: "Atelier", note: "Objects. Some are cut when you order." },
  { kind: "service", label: "Studio", note: "A site, a file, a day, or an incident." },
  { kind: "twin", label: "Lookbooks", note: "A lease of likeness. Signed talent only." },
  { kind: "atlas", label: "Atlas", note: "One research pack. Identifiers, no media." },
  { kind: "fee", label: "The desk", note: "A reading, not a yes." },
  { kind: "credit", label: "House credit", note: "Sits on the ledger." },
];

function Corporate() {
  const [products, setProducts] = useState<Product[]>([]);
  const [talent, setTalent] = useState<Talent[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    listProducts({ data: "" }).then(setProducts).catch(() => setProducts([]));
    listTalent().then(setTalent).catch(() => setTalent([]));
    listRooms().then(setRooms).catch(() => setRooms([]));
  }, []);

  return (
    <HouseChrome>
      <article className="brochure">
        <section className="relative flex min-h-dvh items-end overflow-hidden px-5 pb-16 pt-28 md:px-10">
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
          <div className="relative">
            <p className="font-display text-xs tracking-[0.32em] text-heat uppercase">Corporate</p>
            <BrandLogo className="mt-6 h-auto w-[min(88vw,40rem)]" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/85">
              A gender-fluid adult house. Perth. Objects, seats, talent, tools, and an index. The pricing guide is on
              this page.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print mt-8 inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              Print
            </button>
          </div>
        </section>

        <section className="grid gap-10 border-t border-line px-5 py-16 md:grid-cols-2 md:px-10">
          <div>
            <p className="font-display text-xs tracking-widest text-heat uppercase">The house</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide uppercase">One mark. Any body.</h2>
          </div>
          <p className="text-sm leading-relaxed text-ivory/80">
            fleshsesh is a Perth house for signed talent and the people who hire them. The identity is gender-fluid.
            Pronouns travel with the paperwork. Consent is dated and can be taken back. Eighteen to enter. Twenty-one
            on the live index. We do not host explicit media on this domain, and we do not run cams or classifieds.
          </p>
        </section>

        <section className="border-t border-line px-5 py-16 md:px-10">
          <p className="font-display text-xs tracking-widest text-heat uppercase">What the house holds</p>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2">
            {DESKS.map(([name, line]) => (
              <li key={name} className="bg-void px-5 py-6">
                <p className="font-display text-2xl tracking-wide uppercase">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid border-t border-line md:grid-cols-3">
          {[
            ["Seat", "Perth, Western Australia"],
            ["Door", "18+ on the site · 21+ on the live index"],
            ["Desk", "models@fleshsesh.com"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-line px-5 py-10 md:border-t-0 md:border-l md:px-8 first:md:border-l-0">
              <p className="font-display text-xs tracking-widest text-heat uppercase">{k}</p>
              <p className="mt-3 font-display text-2xl tracking-wide uppercase">{v}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-line px-5 py-16 md:px-10">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Pricing guide</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide uppercase">Every door. A price.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Australian dollars, as charged on the desk. Member rates apply at checkout. Not a quote for a campaign.
          </p>
        </section>

        {GROUPS.map((group) => {
          const rows = products.filter((p) => p.kind === group.kind);
          if (!rows.length) return null;
          return (
            <section key={group.kind} className="border-t border-line px-5 py-12 md:px-10">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-3xl tracking-wide uppercase">{group.label}</h2>
                <p className="text-sm text-muted">{group.note}</p>
              </div>
              <ul>
                {rows.map((p) => (
                  <li key={p.id} className="grid gap-2 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline">
                    <div>
                      <p className="font-display text-lg tracking-wide uppercase">{p.title}</p>
                      <p className="text-sm text-muted">{p.subtitle}</p>
                    </div>
                    <p className="font-display text-xl text-heat tabular-nums">{aud(p.price_cents)}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="border-t border-line px-5 py-12 md:px-10">
          <h2 className="font-display text-3xl tracking-wide uppercase">Talent day rates</h2>
          <p className="mt-2 text-sm text-muted">A day. One look unless the file says otherwise.</p>
          <ul className="mt-6">
            {talent.map((t) => (
              <li key={t.id} className="grid gap-1 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline">
                <div>
                  <p className="font-display text-lg tracking-wide uppercase">{t.name}</p>
                  <p className="text-sm text-muted">
                    {t.pronouns} · {t.role}
                  </p>
                </div>
                <p className="font-display text-xl text-heat tabular-nums">{aud(t.day_rate_cents)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line px-5 py-12 md:px-10">
          <h2 className="font-display text-3xl tracking-wide uppercase">Rooms</h2>
          <p className="mt-2 text-sm text-muted">Per hour. Two-hour minimum. Signed work, not a walk-up.</p>
          <ul className="mt-6">
            {rooms.map((r) => (
              <li key={r.id} className="grid gap-1 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline">
                <div>
                  <p className="font-display text-lg tracking-wide uppercase">{r.name}</p>
                  <p className="max-w-xl text-sm text-muted">{r.blurb}</p>
                </div>
                <p className="font-display text-xl text-heat tabular-nums">{aud(r.hourly_cents)} / hr</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line px-5 py-16 md:px-10">
          <p className="font-display text-xs tracking-widest text-heat uppercase">What we will not do</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            No cams. No escort listings. No nights. No walk-up rooms. No work with anyone under eighteen. A likeness is
            a lease and it ends when the person says it ends.
          </p>
        </section>
      </article>
    </HouseChrome>
  );
}
