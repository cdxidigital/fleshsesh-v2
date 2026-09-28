import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HouseChrome, PageHero, HeatButton, GhostButton } from "@/components/site/chrome";
import { submitBrief } from "@/lib/house/shop";
import { aud, isUnauthorized } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { stashSite, takeSite, type SiteDraft } from "@/lib/house/pending";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sites")({ component: SitesPage });

const PLANS = [
  {
    id: "start" as const,
    title: "Start",
    once: 29500,
    month: 2900,
    year: 29000,
    line: "One page. Name, bio, links, a gallery of 15, a short enquiry form.",
    points: ["brand.fleshsesh.fans", "20 enquiries a month", "Basic SEO, hosting, SSL"],
  },
  {
    id: "signature" as const,
    title: "Signature",
    once: 59500,
    month: 5900,
    year: 59000,
    line: "Your visual direction. More than one section. Gallery of 50. Unlimited inbox.",
    points: ["Colours and type from the brief", "Analytics", "Two revision rounds"],
  },
  {
    id: "black" as const,
    title: "Black",
    once: 99500,
    month: 9900,
    year: 99000,
    line: "A custom site. More than one page. AI inbox. The domain is included.",
    points: ["Custom domain", "Fan, brand, and collab forms", "Ongoing edits on Care"],
  },
];

const ADDONS = [
  { id: "domain", label: "Custom domain", cents: 9900, note: "Waived on Black" },
  { id: "animation", label: "Custom animation", cents: 19500, note: "Once" },
  { id: "monthlycontent", label: "Monthly content", cents: 4900, note: "On top of Care" },
];

const SPEEDS = [
  { id: "none" as const, label: "Standard", note: "72 hours after the files are in." },
  { id: "launch" as const, label: "Launch", note: "We assemble what you send. Still 72 hours." },
  { id: "rush" as const, label: "Rush", note: "First in the same 72-hour window." },
  { id: "sameday" as const, label: "Same day", note: "Only if the folder is already complete." },
];

const empty: SiteDraft = {
  step: 0,
  plan: "signature",
  care: "month",
  speed: "none",
  addons: [],
  stageName: "",
  legalName: "",
  pronouns: "",
  email: "",
  phone: "",
  city: "",
  over18: false,
  ownContent: false,
  adultAck: false,
  subdomain: "",
  customDomain: "",
  tagline: "",
  shortBio: "",
  vibe: "",
  dont: "",
  driveLink: "",
  onlyfans: "",
  fansly: "",
  instagram: "",
  x: "",
  ratePublic: "On request",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

function invoiceId() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const tail = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FS-${stamp}-${tail}`;
}

function quoteFor(draft: SiteDraft) {
  const plan = PLANS.find((p) => p.id === draft.plan) ?? PLANS[1];
  const lines: { id: string; label: string; cents: number; cadence: "once" | "month" | "year" }[] = [
    { id: plan.id, label: `${plan.title} build`, cents: plan.once, cadence: "once" },
  ];
  for (const addon of ADDONS) {
    if (!draft.addons.includes(addon.id)) continue;
    if (addon.id === "domain" && draft.plan === "black") {
      lines.push({ id: "domain", label: "Custom domain (included)", cents: 0, cadence: "once" });
      continue;
    }
    if (addon.id === "monthlycontent") {
      lines.push({ id: addon.id, label: addon.label, cents: addon.cents, cadence: "month" });
      continue;
    }
    lines.push({ id: addon.id, label: addon.label, cents: addon.cents, cadence: "once" });
  }
  const careCents = draft.care === "year" ? plan.year : plan.month;
  lines.push({
    id: "care",
    label: `Care · ${draft.care === "year" ? "year" : "month"}`,
    cents: careCents,
    cadence: draft.care === "year" ? "year" : "month",
  });
  const once = lines.filter((l) => l.cadence === "once").reduce((sum, l) => sum + l.cents, 0);
  return { plan, lines, once, careCents };
}

function packJson(id: string, draft: SiteDraft) {
  const quote = quoteFor(draft);
  return {
    invoice: id,
    plan: draft.plan,
    speed: draft.speed,
    identity: {
      stageName: draft.stageName.trim(),
      legalName: draft.legalName.trim(),
      pronouns: draft.pronouns.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      city: draft.city.trim(),
    },
    brand: {
      subdomain: draft.subdomain,
      customDomain: draft.plan === "black" || draft.addons.includes("domain") ? draft.customDomain.trim() : "",
      tagline: draft.tagline.trim(),
      shortBio: draft.shortBio.trim(),
      vibe: draft.vibe.trim(),
      dont: draft.dont.trim(),
    },
    commerce: {
      ratePublic: draft.ratePublic,
      platforms: {
        onlyfans: draft.onlyfans.trim(),
        fansly: draft.fansly.trim(),
        instagram: draft.instagram.trim(),
        x: draft.x.trim(),
      },
    },
    media: { driveLink: draft.driveLink.trim() },
    legal: { over18: draft.over18, ownContent: draft.ownContent, adultAck: draft.adultAck },
    quote: {
      once: quote.once,
      care: quote.careCents,
      careCadence: draft.care,
      lines: quote.lines,
    },
  };
}

function packMarkdown(id: string, draft: SiteDraft) {
  const quote = quoteFor(draft);
  const url = `${draft.subdomain || "name"}.fleshsesh.fans`;
  return [
    `# ${id}`,
    "",
    `Talent: ${draft.stageName.trim()}`,
    `Plan: ${quote.plan.title}`,
    `Speed: ${draft.speed}`,
    `URL: ${url}`,
    `Custom domain: ${draft.customDomain.trim() || "—"}`,
    `Due now (AUD): ${(quote.once / 100).toFixed(0)}`,
    `Care: ${draft.care} · ${(quote.careCents / 100).toFixed(0)}`,
    `Email: ${draft.email.trim()}`,
    `Pronouns: ${draft.pronouns.trim() || "—"}`,
    `City: ${draft.city.trim() || "—"}`,
    `18+: ${draft.over18 ? "Y" : "N"}`,
    `Rights: ${draft.ownContent ? "Y" : "N"}`,
    `Asset folder: ${draft.driveLink.trim() || "not in — clock has not started"}`,
    "",
    "## Public",
    draft.tagline.trim() || "No tagline yet.",
    "",
    draft.shortBio.trim() || "No short bio yet.",
    "",
    `Rates: ${draft.ratePublic}`,
    `Do not: ${draft.dont.trim() || "—"}`,
    "",
    "## Staff only",
    `Legal name: ${draft.legalName.trim() || "not given"}`,
    "Do not publish the legal name, and do not put ID files on the site.",
    "",
    "FleshSesh Personal Sites · a CDXI Ventures product",
  ].join("\n");
}

function download(name: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block font-display text-xs tracking-widest text-heat uppercase">
      {label}
      {children}
    </label>
  );
}

const inputClass = "mt-2 block w-full border-b border-line bg-transparent py-3 font-sans text-sm normal-case tracking-normal text-ivory";

function SitesPage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SiteDraft>(empty);
  const [invoice, setInvoice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = takeSite();
    if (!saved?.stageName && !saved?.plan) return;
    setDraft({ ...empty, ...saved, step: saved.step ?? 0 });
  }, []);

  const quote = useMemo(() => quoteFor(draft), [draft]);

  function set<K extends keyof SiteDraft>(key: K, value: SiteDraft[K]) {
    setDraft((cur) => ({ ...cur, [key]: value }));
  }

  function toggleAddon(id: string) {
    setDraft((cur) => ({
      ...cur,
      addons: cur.addons.includes(id) ? cur.addons.filter((a) => a !== id) : [...cur.addons, id],
    }));
  }

  function next() {
    if (draft.step === 1) {
      if (draft.stageName.trim().length < 2) return toast.error("The stage name is the public name.");
      if (!draft.email.includes("@")) return toast.error("A real email. The preview goes there.");
      if (!draft.over18 || !draft.ownContent || !draft.adultAck) {
        return toast.error("18+, your own content, and the adult terms. All three.");
      }
      if (!draft.subdomain) set("subdomain", slugify(draft.stageName));
    }
    if (draft.step === 2) {
      const slug = slugify(draft.subdomain || draft.stageName);
      if (slug.length < 2) return toast.error("The subdomain needs at least two letters.");
      set("subdomain", slug);
    }
    set("step", Math.min(4, draft.step + 1) as SiteDraft["step"]);
  }

  function savePack(id: string) {
    const json = packJson(id, draft);
    download(`${id}-enquiry.json`, JSON.stringify(json, null, 2), "application/json");
    download(`${id}-brief.md`, packMarkdown(id, draft), "text/markdown");
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const id = invoice || invoiceId();
    setInvoice(id);
    savePack(id);
    const summary = [
      `Invoice: ${id}`,
      `Plan: ${quote.plan.title} · speed ${draft.speed}`,
      `Due now: ${aud(quote.once)}`,
      `Care: ${aud(quote.careCents)} / ${draft.care}`,
      `URL: ${draft.subdomain}.fleshsesh.fans`,
      `Email: ${draft.email.trim()}`,
      "18+: Y · Rights: Y · Terms: Y",
      draft.driveLink.trim() ? `Assets: ${draft.driveLink.trim()}` : "Assets: not in yet. Clock has not started.",
      draft.addons.length ? `Add-ons: ${draft.addons.join(", ")}` : "",
      draft.tagline.trim() ? `Tagline: ${draft.tagline.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (!user) {
      stashSite(draft);
      toast.success("Pack downloaded. Sign in to file it on the desk.");
      navigate({ to: "/login", search: { redirect: "/sites" } });
      return;
    }

    setBusy(true);
    try {
      await submitBrief({
        data: {
          kind: "service",
          company: draft.stageName.trim(),
          contactName: draft.stageName.trim(),
          details: summary,
          payFee: false,
        },
      });
      toast.success(`${id} is on the desk. The clock starts when the folder is in.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        stashSite(draft);
        navigate({ to: "/login", search: { redirect: "/sites" } });
        return;
      }
      toast.error(err instanceof Error ? err.message : "The desk could not take the file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HouseChrome>
      <PageHero kicker="Personal sites" title={<>A name.<br />A site. 72 hours.</>} image="/hero-corridor.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Start, Signature, or Black. Profile, links, and enquiries. Not a tube, and not a checkout for content. The
          preview goes to your email.
        </p>
      </PageHero>

      <section className="grid border-t border-line lg:grid-cols-3">
        {PLANS.map((plan) => {
          const on = draft.plan === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => set("plan", plan.id)}
              className={cn(
                "border-t border-line px-5 py-12 text-left md:px-8 lg:border-l first:lg:border-l-0",
                on && "bg-navy",
              )}
            >
              <p className="font-display text-xs tracking-widest text-heat uppercase">{on ? "Selected" : "2026/27"}</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{plan.title}</h2>
              <p className="mt-3 font-display text-3xl text-heat tabular-nums">{aud(plan.once)}</p>
              <p className="mt-1 text-sm text-muted">
                Care {aud(plan.month)} / mo or {aud(plan.year)} / yr
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/80">{plan.line}</p>
              <ul className="mt-4 space-y-1 text-sm text-muted">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </section>

      <form onSubmit={send} className="mx-auto max-w-xl px-5 py-16">
        <p className="font-display text-xs tracking-widest text-muted uppercase">
          Step {draft.step + 1} of 5
        </p>

        {draft.step === 0 ? (
          <div className="mt-6 space-y-8">
            <h2 className="font-display text-4xl tracking-wide uppercase">Plan, care, speed.</h2>
            <Field label="Care">
              <select className={inputClass} value={draft.care} onChange={(e) => set("care", e.target.value as SiteDraft["care"])}>
                <option value="month" className="bg-navy">
                  Monthly · {aud(quote.plan.month)}
                </option>
                <option value="year" className="bg-navy">
                  Yearly · {aud(quote.plan.year)}
                </option>
              </select>
            </Field>
            <fieldset>
              <legend className="font-display text-xs tracking-widest text-heat uppercase">Speed</legend>
              <div className="mt-3 grid gap-2">
                {SPEEDS.map((speed) => (
                  <button
                    key={speed.id}
                    type="button"
                    onClick={() => set("speed", speed.id)}
                    className={cn(
                      "border px-4 py-3 text-left",
                      draft.speed === speed.id ? "border-heat text-ivory" : "border-line text-muted",
                    )}
                  >
                    <span className="font-display text-sm tracking-widest uppercase">{speed.label}</span>
                    <span className="mt-1 block text-sm normal-case">{speed.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-display text-xs tracking-widest text-heat uppercase">Add-ons</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ADDONS.map((addon) => {
                  const on = draft.addons.includes(addon.id);
                  const waived = addon.id === "domain" && draft.plan === "black";
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={cn("border px-3 py-2 text-sm", on ? "border-heat text-heat" : "border-line text-muted")}
                    >
                      {addon.label}
                      {waived ? " · included" : ` · ${aud(addon.cents)}`}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ) : null}

        {draft.step === 1 ? (
          <div className="mt-6 space-y-5">
            <h2 className="font-display text-4xl tracking-wide uppercase">Who it is for.</h2>
            <Field label="Stage name">
              <input className={inputClass} value={draft.stageName} onChange={(e) => set("stageName", e.target.value)} required maxLength={80} />
            </Field>
            <Field label="Email">
              <input className={inputClass} type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} required maxLength={120} />
            </Field>
            <Field label="Pronouns">
              <input className={inputClass} value={draft.pronouns} onChange={(e) => set("pronouns", e.target.value)} maxLength={40} placeholder="they/them" />
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={draft.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} />
            </Field>
            <Field label="City">
              <input className={inputClass} value={draft.city} onChange={(e) => set("city", e.target.value)} maxLength={80} placeholder="Only if it can be public" />
            </Field>
            <Field label="Legal name · staff only, never on the site">
              <input className={inputClass} value={draft.legalName} onChange={(e) => set("legalName", e.target.value)} maxLength={80} />
            </Field>
            {(
              [
                ["over18", "I am 18 or older"],
                ["ownContent", "I own the content, or I have the rights to use it"],
                ["adultAck", "This is an adult site. I accept that"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-start gap-3 text-sm text-ivory/80">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={draft[key]}
                  onChange={(e) => set(key, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        ) : null}

        {draft.step === 2 ? (
          <div className="mt-6 space-y-5">
            <h2 className="font-display text-4xl tracking-wide uppercase">The look.</h2>
            <Field label="Subdomain">
              <input
                className={inputClass}
                value={draft.subdomain}
                onChange={(e) => set("subdomain", slugify(e.target.value))}
                placeholder={slugify(draft.stageName) || "name"}
              />
            </Field>
            <p className="-mt-3 text-sm text-muted">{draft.subdomain || "name"}.fleshsesh.fans</p>
            <Field label="Custom domain">
              <input
                className={inputClass}
                value={draft.customDomain}
                onChange={(e) => set("customDomain", e.target.value)}
                placeholder={draft.plan === "black" ? "Included" : "Add-on, $99"}
                maxLength={120}
              />
            </Field>
            <Field label="Tagline">
              <input className={inputClass} value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} maxLength={140} />
            </Field>
            <Field label="Short bio">
              <textarea className={inputClass} value={draft.shortBio} onChange={(e) => set("shortBio", e.target.value)} maxLength={400} rows={3} />
            </Field>
            <Field label="Vibe">
              <input className={inputClass} value={draft.vibe} onChange={(e) => set("vibe", e.target.value)} maxLength={160} placeholder="Navy, heat, quiet" />
            </Field>
            <Field label="Do not">
              <input className={inputClass} value={draft.dont} onChange={(e) => set("dont", e.target.value)} maxLength={200} placeholder="No city. No real name." />
            </Field>
          </div>
        ) : null}

        {draft.step === 3 ? (
          <div className="mt-6 space-y-5">
            <h2 className="font-display text-4xl tracking-wide uppercase">Links and files.</h2>
            <Field label="Asset folder">
              <input className={inputClass} value={draft.driveLink} onChange={(e) => set("driveLink", e.target.value)} placeholder="Drive, Dropbox, or WeTransfer" maxLength={300} />
            </Field>
            <p className="-mt-3 text-sm text-muted">The 72-hour clock starts when this folder is in. ID images stay off the site.</p>
            {(
              [
                ["onlyfans", "OnlyFans"],
                ["fansly", "Fansly"],
                ["instagram", "Instagram"],
                ["x", "X"],
              ] as const
            ).map(([key, label]) => (
              <Field key={key} label={label}>
                <input className={inputClass} value={draft[key]} onChange={(e) => set(key, e.target.value)} maxLength={200} placeholder="Leave blank to skip" />
              </Field>
            ))}
            <Field label="Rates">
              <select className={inputClass} value={draft.ratePublic} onChange={(e) => set("ratePublic", e.target.value as SiteDraft["ratePublic"])}>
                <option className="bg-navy" value="On request">On request</option>
                <option className="bg-navy" value="Gated">Gated</option>
                <option className="bg-navy" value="Public">Public</option>
              </select>
            </Field>
          </div>
        ) : null}

        {draft.step === 4 ? (
          <div className="mt-6">
            <h2 className="font-display text-4xl tracking-wide uppercase">The quote.</h2>
            <ul className="mt-6">
              {quote.lines.map((line) => (
                <li key={line.id} className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-sm">
                  <span>
                    {line.label}
                    {line.cadence !== "once" ? <span className="text-muted"> · {line.cadence}</span> : null}
                  </span>
                  <span className="font-display text-heat tabular-nums">{aud(line.cents)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-2xl tracking-wide uppercase">
              Due now <span className="text-heat">{aud(quote.once)}</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              {draft.stageName || "Stage name"} · {draft.subdomain || "name"}.fleshsesh.fans · Care {aud(quote.careCents)} / {draft.care}. Extra edits after the included rounds are $75 an hour.
            </p>
            <p className="mt-4 text-sm text-muted">
              Filing downloads the enquiry pack and opens the ticket. No checkout for content. hello@fleshsesh.fans
            </p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {draft.step > 0 ? (
            <GhostButton type="button" onClick={() => set("step", (draft.step - 1) as SiteDraft["step"])}>
              Back
            </GhostButton>
          ) : null}
          {draft.step < 4 ? (
            <HeatButton type="button" onClick={next}>
              Next
            </HeatButton>
          ) : (
            <HeatButton type="submit" disabled={busy || isPending}>
              {busy ? "Filing…" : user ? "Download and file" : "Download and sign in"}
            </HeatButton>
          )}
        </div>
      </form>
    </HouseChrome>
  );
}
