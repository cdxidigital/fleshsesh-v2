import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getCart } from "@/lib/house/shop";
import { AgeGate } from "./age-gate";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";
import { readAgeOkClient, writeAgeOk } from "@/lib/house/pending";

export function openAcademySoon() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("fleshsesh-academy-soon"));
}

const NAV = [
  { to: "/pass", label: "Pass" },
  { to: "/atelier", label: "Atelier" },
  { to: "/academy", label: "Academy" },
  { to: "/talent", label: "Talent" },
  { to: "/os", label: "OS" },
  { to: "/digital", label: "Digital" },
  { to: "/atlas", label: "Atlas" },
  { to: "/ledger", label: "Ledger" },
  { to: "/join", label: "Join" },
];

export function AgeShell({ children, ssrOk = false }: { children: ReactNode; ssrOk?: boolean }) {
  const [allowed, setAllowed] = useState(ssrOk);

  useEffect(() => {
    if (ssrOk) {
      writeAgeOk();
      return;
    }
    if (readAgeOkClient()) {
      writeAgeOk();
      setAllowed(true);
    }
  }, [ssrOk]);

  function enter() {
    writeAgeOk();
    setAllowed(true);
  }

  if (!allowed) return <AgeGate onEnter={enter} />;
  return <>{children}</>;
}

export function SignInHere({ next }: { next?: string }) {
  const here = useRouterState({
    select: (s) => s.location.pathname + (s.location.searchStr || ""),
  });
  const href = typeof window !== "undefined" ? window.location.pathname + window.location.search : here;
  const candidate = next || href || here;
  const redirect =
    candidate.startsWith("/") && !candidate.startsWith("//") && !candidate.startsWith("/login")
      ? candidate
      : "/desk";
  return <Navigate to="/login" search={{ redirect }} />;
}

export function HouseChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [soon, setSoon] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }
    getCart()
      .then((rows) => setCount(rows.reduce((n, r) => n + r.qty, 0)))
      .catch(() => setCount(0));
  }, [user, path]);

  useEffect(() => {
    const onSoon = () => setSoon(true);
    window.addEventListener("fleshsesh-academy-soon", onSoon);
    return () => window.removeEventListener("fleshsesh-academy-soon", onSoon);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-dvh bg-void text-ivory">
      <div className="grain" />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line/70 bg-void/80 px-5 py-3.5 backdrop-blur-md md:px-8">
        <Link to="/" className="relative z-10 shrink-0" aria-label="fleshsesh home">
          <BrandLogo className="nav-mark h-8 w-auto md:h-9" />
        </Link>
        <nav className="hidden items-center gap-3 font-display text-[11px] tracking-widest uppercase xl:flex">
          {NAV.map((item) =>
            item.to === "/academy" ? (
              <button
                key={item.to}
                type="button"
                onClick={() => setSoon(true)}
                className="text-ivory/80 hover:text-heat"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-ivory/80 hover:text-heat",
                  (item.to === "/digital"
                    ? path === "/digital" || path.startsWith("/sites") || path.startsWith("/services")
                    : path.startsWith(item.to)) && "text-heat",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center text-ivory hover:text-heat"
            aria-label="Cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
          {isPending ? (
            <div className="h-8 w-20 animate-pulse bg-navy" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="/desk" className="text-heat">
                Desk
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-heat px-3 py-2 text-heat hover:bg-heat hover:text-navy"
            >
              Sign in
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-1 xl:hidden">
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center"
            aria-label="Cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-navy px-5 pt-28 xl:hidden">
          <nav className="flex flex-col font-display text-3xl tracking-wide uppercase">
            {NAV.map((item) =>
              item.to === "/academy" ? (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSoon(true);
                  }}
                  className="border-b border-line py-4 text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link to="/desk" onClick={() => setOpen(false)} className="border-b border-line py-4">
              Desk
            </Link>
            <SignedOut>
              <Link to="/login" onClick={() => setOpen(false)} className="py-4 text-heat">
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="py-4">
                <UserButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      ) : null}

      <main className="relative z-10">{children}</main>
      {soon ? (
        <div
          className="soon-veil fixed inset-0 z-[70] flex items-center justify-center bg-void/75 px-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="academy-soon"
          onClick={() => setSoon(false)}
        >
          <div
            className="soon-card w-full max-w-md border border-line bg-navy px-8 py-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-xs tracking-widest text-heat uppercase">Academy</p>
            <div className="soon-rule mx-auto mt-4 h-px w-16 bg-heat" />
            <h2 id="academy-soon" className="mt-4 font-display text-4xl tracking-wide uppercase">
              Coming soon
            </h2>
            <p className="soon-pulse mt-3 text-sm tracking-[0.28em] text-heat uppercase">Stay tuned.</p>
            <button
              type="button"
              onClick={() => setSoon(false)}
              className="mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <footer className="relative z-10 mt-auto flex flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs tracking-wide text-muted md:px-8">
        <div>© {new Date().getFullYear()} fleshsesh · Perth</div>
        <div>Gender-fluid · 18+ · No explicit media on this domain</div>
        <div className="flex gap-3">
          <Link to="/digital" className="hover:text-heat">
            Digital
          </Link>
          <Link to="/corporate" className="hover:text-heat">
            Corporate
          </Link>
          <Link to="/legal" className="hover:text-heat">
            Legal
          </Link>
          <Link to="/ledger" className="hover:text-heat">
            Ledger
          </Link>
          <Link to="/atlas" className="hover:text-heat">
            Atlas
          </Link>
          <Link to="/os" className="hover:text-heat">
            OS
          </Link>
          <Link to="/join" className="hover:text-heat">
            Join
          </Link>
          <Link to="/apply" className="hover:text-heat">
            Apply
          </Link>
          <Link to="/desk" className="hover:text-heat">
            Desk
          </Link>
        </div>
      </footer>
    </div>
  );
}

const FILM: Record<string, string> = {
  "/hero-corridor.jpg": "/hero-loop.mp4",
  "/still-live.jpg": "/room-loop.mp4",
  "/still-atelier.jpg": "/atelier-loop.mp4",
  "/still-talent.jpg": "/hero-loop.mp4",
  "/still-academy.jpg": "/atelier-loop.mp4",
  "/still-hands.jpg": "/room-loop.mp4",
  "/still-lips.jpg": "/room-loop.mp4",
};

export function PageHero({
  kicker,
  title,
  image,
  children,
}: {
  kicker: string;
  title: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  const film = FILM[image];
  return (
    <section className="relative flex min-h-[70dvh] items-end overflow-hidden px-5 pb-12 pt-32 md:px-8">
      {film ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={film}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <img src={image} alt="" className="film-still absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-void via-void/60 to-navy/30" />
      <div className="relative reveal">
        <p className="mb-3 font-display text-xs tracking-[0.28em] text-heat uppercase">{kicker}</p>
        <h1 className="font-display text-5xl font-medium tracking-wide text-ivory uppercase md:text-7xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function HeatButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center bg-heat px-6 py-3 font-display text-xs tracking-widest text-navy uppercase transition-colors hover:bg-ivory disabled:opacity-50",
        className,
      )}
    />
  );
}

export function GhostButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center border border-line px-6 py-3 font-display text-xs tracking-widest text-ivory uppercase transition-colors hover:border-heat hover:text-heat disabled:opacity-50",
        className,
      )}
    />
  );
}
