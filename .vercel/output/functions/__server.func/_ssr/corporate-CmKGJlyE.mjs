import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { F as listTalent, M as listProducts, P as listRooms, _ as HouseChrome, b as BrandLogo } from "./router-DIMByEGm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/corporate-CmKGJlyE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DESKS = [
	["Pass", "One ID. Sesh, Sesh Black, House. Member rates live on the ledger."],
	["Atelier", "Objects cut for any body. Some are made when the order lands."],
	["Academy", "Consent, language, money, and how a brand writes a brief."],
	["Talent", "Signed people. Day rates. A file, not a type."],
	["OS", "Storefront, calendar, leak watch, tax pack. Tools, not a tube."],
	["Atlas", "Australian, American, and European industry databases. Law, Perth first."],
	["Ledger", "Credit, points, and the tab. What was spent stays visible."]
];
var GROUPS = [
	{
		kind: "membership",
		label: "Passes",
		note: "Monthly. Cancel any month."
	},
	{
		kind: "os",
		label: "Creator OS",
		note: "Monthly tools."
	},
	{
		kind: "academy",
		label: "Academy",
		note: "A seat. Library is monthly."
	},
	{
		kind: "exam",
		label: "Certificate",
		note: "Once."
	},
	{
		kind: "atelier",
		label: "Atelier",
		note: "Objects. Some are cut when you order."
	},
	{
		kind: "service",
		label: "Studio",
		note: "A file, a day, or an incident."
	},
	{
		kind: "twin",
		label: "Lookbooks",
		note: "A lease of likeness. Signed talent only."
	},
	{
		kind: "atlas",
		label: "Atlas",
		note: "One research pack. Identifiers, no media."
	},
	{
		kind: "fee",
		label: "The desk",
		note: "A reading, not a yes."
	},
	{
		kind: "credit",
		label: "House credit",
		note: "Sits on the ledger."
	}
];
function Corporate() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [talent, setTalent] = (0, import_react.useState)([]);
	const [rooms, setRooms] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "" }).then(setProducts).catch(() => setProducts([]));
		listTalent().then(setTalent).catch(() => setTalent([]));
		listRooms().then(setRooms).catch(() => setRooms([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "brochure",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative flex min-h-dvh items-end overflow-hidden px-5 pb-16 pt-28 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "absolute inset-0 size-full object-cover",
						src: "/hero-loop.mp4",
						poster: "/hero-corridor.jpg",
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-void via-void/50 to-navy/35" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-[0.32em] text-heat uppercase",
								children: "Corporate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "mt-6 h-auto w-[min(88vw,40rem)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-md text-sm leading-relaxed text-ivory/85",
								children: "A gender-fluid adult house. Perth. Objects, seats, talent, tools, and an index. The pricing guide is on this page."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => window.print(),
								className: "no-print mt-8 inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
								children: "Print"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-10 border-t border-line px-5 py-16 md:grid-cols-2 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "The house"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl tracking-wide uppercase",
					children: "One mark. Any body."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-ivory/80",
					children: "fleshsesh is a Perth house for signed talent and the people who hire them. The identity is gender-fluid. Pronouns travel with the paperwork. Consent is dated and can be taken back. Eighteen to enter. Twenty-one on the live index. We do not host explicit media on this domain, and we do not run cams or classifieds."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-5 py-16 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "What the house holds"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-px bg-line sm:grid-cols-2",
					children: DESKS.map(([name, line]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "bg-void px-5 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tracking-wide uppercase",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: line
						})]
					}, name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid border-t border-line md:grid-cols-3",
				children: [
					["Seat", "Perth, Western Australia"],
					["Door", "18+ on the site · 21+ on the live index"],
					["Desk", "models@fleshsesh.com"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line px-5 py-10 md:border-t-0 md:border-l md:px-8 first:md:border-l-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl tracking-wide uppercase",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-5 py-16 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Pricing guide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl tracking-wide uppercase",
						children: "Every door. A price."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
						children: "Australian dollars, as charged on the desk. Member rates apply at checkout. Not a quote for a campaign."
					})
				]
			}),
			GROUPS.map((group) => {
				const rows = products.filter((p) => p.kind === group.kind);
				if (!rows.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-t border-line px-5 py-12 md:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl tracking-wide uppercase",
							children: group.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: group.note
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-wide uppercase",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: p.subtitle
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-heat tabular-nums",
							children: aud(p.price_cents)
						})]
					}, p.id)) })]
				}, group.kind);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-5 py-12 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-wide uppercase",
						children: "Talent day rates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A day. One look unless the file says otherwise."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6",
						children: talent.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-1 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg tracking-wide uppercase",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									t.pronouns,
									" · ",
									t.role
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-heat tabular-nums",
								children: aud(t.day_rate_cents)
							})]
						}, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-5 py-12 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-wide uppercase",
						children: "Rooms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Per hour. Two-hour minimum. Signed work, not a walk-up."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6",
						children: rooms.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-1 border-t border-line py-4 md:grid-cols-[1fr_auto] md:items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg tracking-wide uppercase",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-sm text-muted",
								children: r.blurb
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xl text-heat tabular-nums",
								children: [aud(r.hourly_cents), " / hr"]
							})]
						}, r.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-line px-5 py-16 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "What we will not do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
					children: "No cams. No escort listings. No nights. No walk-up rooms. No work with anyone under eighteen. A likeness is a lease and it ends when the person says it ends."
				})]
			})
		]
	}) });
}
//#endregion
export { Corporate as component };
