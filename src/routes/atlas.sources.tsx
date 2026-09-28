import { createFileRoute, Link } from "@tanstack/react-router";
import { LIVE_DATABASES, LIVE_REGIONS } from "@/lib/live/sources";

export const Route = createFileRoute("/atlas/sources")({ component: SourcesPage });

function SourcesPage() {
  const rest = LIVE_DATABASES.filter((s) => s.region === "Also" || s.region === "Index");
  return (
    <article className="mx-auto max-w-2xl px-5 py-12">
      <p className="font-display text-xs tracking-widest text-heat uppercase">Live index</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">Databases</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Three desks: Australian, American, and European. Search reads Wikidata identifiers from those industry
        databases. Tube sites are not indexed. No explicit media is stored. Performer records require a Wikidata
        birth year of 21 or older.
      </p>
      {LIVE_REGIONS.map((region) => (
        <section key={region} className="mt-12">
          <h2 className="font-display text-xs tracking-widest text-heat uppercase">{region}</h2>
          <ul className="mt-4">
            {LIVE_DATABASES.filter((s) => s.region === region).map((s) => (
              <li key={s.name} className="border-t border-line py-5">
                <p className="font-display text-2xl tracking-wide uppercase">{s.name}</p>
                <p className="mt-1 text-sm text-muted">{s.full}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.what}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mt-12">
        <h2 className="font-display text-xs tracking-widest text-muted uppercase">Also on the file</h2>
        <ul className="mt-4">
          {rest.map((s) => (
            <li key={s.name} className="border-t border-line py-5">
              <p className="font-display text-2xl tracking-wide uppercase">{s.name}</p>
              <p className="mt-1 text-sm text-muted">{s.full}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.what}</p>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-10 text-sm">
        <Link to="/atlas/search" search={{ q: "", kind: "all" }} className="text-heat">
          Open search
        </Link>
      </p>
    </article>
  );
}