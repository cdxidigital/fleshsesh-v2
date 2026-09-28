import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { DigitalTabs } from "@/components/site/digital-tabs";

export const Route = createFileRoute("/digital")({ component: DigitalPage });

const OFFERS = [
  {
    to: "/sites" as const,
    k: "Sites",
    t: "A name. A site. 72 hours.",
    d: "Start $295, Signature $595, Black $995. Profile, links, enquiries. Care after launch.",
    cta: "Open the brief",
  },
  {
    to: "/os" as const,
    k: "OS",
    t: "Tools, not a tube.",
    d: "Storefront, calendar, leak watch, tax pack. Monthly. Zero take on money processed elsewhere.",
    cta: "See the tools",
  },
  {
    to: "/services" as const,
    k: "Studio",
    t: "A file, not a vibe.",
    d: "Launch kit, capture day, takedown. The desk reads the job before it starts.",
    cta: "Open a job",
  },
];

function DigitalPage() {
  return (
    <HouseChrome>
      <PageHero kicker="Digital services" title={<>For the name.<br />Not a tube.</>} image="/hero-corridor.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Sites, tools, and studio work for models and influencers. The site brief is the sales door. Seventy-two
          hours after the files land.
        </p>
      </PageHero>
      <DigitalTabs />
      <section className="grid lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <article key={offer.to} className="flex flex-col border-t border-line px-5 py-12 md:px-8 lg:border-l first:lg:border-l-0">
            <p className="font-display text-xs tracking-widest text-heat uppercase">{offer.k}</p>
            <h2 className="mt-3 font-display text-3xl tracking-wide uppercase">{offer.t}</h2>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{offer.d}</p>
            <Link
              to={offer.to}
              className="mt-8 inline-flex min-h-12 w-fit items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              {offer.cta}
            </Link>
          </article>
        ))}
      </section>
    </HouseChrome>
  );
}
