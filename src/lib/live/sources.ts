export const LIVE_DATABASES = [
  {
    region: "Australian",
    name: "Australian Classification",
    full: "Australian Classification Board",
    what: "Title decisions from the Commonwealth classifier. The Australian file on a work — not a tube.",
  },
  {
    region: "American",
    name: "IAFD",
    full: "Internet Adult Film Database",
    what: "Performers, titles, and distributors. The principal American filmography.",
  },
  {
    region: "American",
    name: "AFDB",
    full: "Adult Film Database",
    what: "US actors, directors, films, series, and studios.",
  },
  {
    region: "American",
    name: "AVN",
    full: "Adult Video News",
    what: "American trade profiles and movie IDs.",
  },
  {
    region: "American",
    name: "XBIZ",
    full: "XBIZ",
    what: "American trade-press topics. News and company files, not clips.",
  },
  {
    region: "American",
    name: "IMDb",
    full: "Internet Movie Database",
    what: "American name, title, and company identifiers when the record is already an industry file.",
  },
  {
    region: "American",
    name: "XXXBios",
    full: "XXXBios",
    what: "Performer biographies. Female and transgender identifiers only.",
  },
  {
    region: "European",
    name: "EGAFD",
    full: "European Girls Adult Film Database",
    what: "European performers and titles.",
  },
  {
    region: "European",
    name: "BGAFD",
    full: "British Girls Adult Film Database",
    what: "UK performers and titles.",
  },
  {
    region: "European",
    name: "EuroBabeIndex",
    full: "EuroBabeIndex",
    what: "European performer index.",
  },
  {
    region: "European",
    name: "OFDb",
    full: "Online-Filmdatenbank",
    what: "German film and person identifiers.",
  },
  {
    region: "European",
    name: "AlloCiné",
    full: "AlloCiné",
    what: "French film and person identifiers.",
  },
  {
    region: "European",
    name: "ČSFD",
    full: "Česko-Slovenská filmová databáze",
    what: "Czech and Slovak film and person identifiers.",
  },
  {
    region: "European",
    name: "FilmAffinity",
    full: "FilmAffinity",
    what: "Spanish film and person identifiers.",
  },
  {
    region: "European",
    name: "Filmportal",
    full: "Filmportal.de",
    what: "German film archive identifiers.",
  },
  {
    region: "Also",
    name: "Babesdirectory",
    full: "Babesdirectory",
    what: "Performer profiles. Identifiers only.",
  },
  {
    region: "Also",
    name: "indexxx",
    full: "indexxx",
    what: "Model directory. Identifiers only — no media is pulled.",
  },
  {
    region: "Also",
    name: "Pure Adult",
    full: "Pure Adult",
    what: "Japanese performer and studio identifiers.",
  },
  {
    region: "Also",
    name: "Rakuten TV Adult",
    full: "Rakuten TV Adult",
    what: "Japanese cast and maker identifiers.",
  },
  {
    region: "Index",
    name: "Wikidata",
    full: "Wikidata Query Service",
    what: "The union index. Occupation, 21+ birth-year filter, English labels. No photographs.",
  },
  {
    region: "Index",
    name: "Wikipedia",
    full: "English Wikipedia",
    what: "Outbound sitelink only. fleshsesh does not ingest article text or photographs.",
  },
] as const;

export const LIVE_REGIONS = ["Australian", "American", "European"] as const;

export const LIVE_SOURCE_LINE = "Australia · America · Europe — Classification, IAFD, AFDB, AVN, IMDb, EGAFD, OFDb, AlloCiné";
