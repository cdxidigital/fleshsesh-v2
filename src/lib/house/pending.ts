const ADD_KEY = "fleshsesh-pending-add";
const BRIEF_KEY = "fleshsesh-pending-brief";

export function safeRedirect(value: unknown) {
  if (typeof value !== "string") return "/desk";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "/desk";
  if (value.startsWith("/login")) return "/desk";
  return value;
}

export function stashAdd(productId: string, spec = "") {
  try {
    sessionStorage.setItem(ADD_KEY, JSON.stringify({ productId, spec }));
  } catch {
    /* ignore */
  }
}

export function takeAdd(): { productId: string; spec: string } | null {
  try {
    const raw = sessionStorage.getItem(ADD_KEY);
    sessionStorage.removeItem(ADD_KEY);
    if (!raw) return null;
    if (raw.startsWith("{")) {
      const o = JSON.parse(raw) as { productId?: string; spec?: string };
      if (!o.productId) return null;
      return { productId: o.productId, spec: o.spec ?? "" };
    }
    return { productId: raw, spec: "" };
  } catch {
    return null;
  }
}

export type BriefDraft = {
  kind: "talent" | "campaign" | "twin" | "service";
  talentId?: string;
  company: string;
  contactName: string;
  details: string;
  payFee: boolean;
};

export function stashBrief(draft: BriefDraft) {
  try {
    sessionStorage.setItem(BRIEF_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function takeBrief(): BriefDraft | null {
  try {
    const raw = sessionStorage.getItem(BRIEF_KEY);
    sessionStorage.removeItem(BRIEF_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BriefDraft;
  } catch {
    return null;
  }
}

const SITE_KEY = "fleshsesh-pending-site";

export type SiteDraft = {
  step: number;
  plan: "start" | "signature" | "black";
  care: "month" | "year";
  speed: "none" | "launch" | "rush" | "sameday";
  addons: string[];
  stageName: string;
  legalName: string;
  pronouns: string;
  email: string;
  phone: string;
  city: string;
  over18: boolean;
  ownContent: boolean;
  adultAck: boolean;
  subdomain: string;
  customDomain: string;
  tagline: string;
  shortBio: string;
  vibe: string;
  dont: string;
  driveLink: string;
  onlyfans: string;
  fansly: string;
  instagram: string;
  x: string;
  ratePublic: "Public" | "Gated" | "On request";
};

export function stashSite(draft: SiteDraft) {
  try {
    sessionStorage.setItem(SITE_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function takeSite(): SiteDraft | null {
  try {
    const raw = sessionStorage.getItem(SITE_KEY);
    sessionStorage.removeItem(SITE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteDraft;
  } catch {
    return null;
  }
}

export const AGE_KEY = "fleshsesh-age-ok";

export function writeAgeOk() {
  try {
    localStorage.setItem(AGE_KEY, "1");
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${AGE_KEY}=1; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readAgeOkClient() {
  try {
    if (localStorage.getItem(AGE_KEY) === "1") return true;
  } catch {
    /* ignore */
  }
  try {
    return document.cookie.split("; ").includes(`${AGE_KEY}=1`);
  } catch {
    return false;
  }
}
