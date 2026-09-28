import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/digital", label: "Overview", on: (path: string) => path === "/digital" },
  { to: "/sites", label: "Sites", on: (path: string) => path.startsWith("/sites") },
  { to: "/os", label: "OS", on: (path: string) => path.startsWith("/os") },
  { to: "/services", label: "Studio", on: (path: string) => path.startsWith("/services") },
] as const;

export function DigitalTabs() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky top-[4.25rem] z-30 flex gap-6 overflow-x-auto border-b border-line bg-void/90 px-5 backdrop-blur-md md:px-8">
      {TABS.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={cn(
            "shrink-0 border-b-2 py-3 font-display text-xs tracking-widest uppercase",
            tab.on(path) ? "border-heat text-heat" : "border-transparent text-muted hover:text-ivory",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
