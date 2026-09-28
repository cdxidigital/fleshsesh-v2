import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as LIVE_REGIONS, t as LIVE_DATABASES } from "./sources-CYrc5u-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.sources-DFUOdHLF.js
var import_jsx_runtime = require_jsx_runtime();
function SourcesPage() {
	const rest = LIVE_DATABASES.filter((s) => s.region === "Also" || s.region === "Index");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Live index"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-wide uppercase",
				children: "Databases"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "Three desks: Australian, American, and European. Search reads Wikidata identifiers from those industry databases. Tube sites are not indexed. No explicit media is stored. Performer records require a Wikidata birth year of 21 or older."
			}),
			LIVE_REGIONS.map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: region
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: LIVE_DATABASES.filter((s) => s.region === region).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-wide uppercase",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: s.full
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: s.what
							})
						]
					}, s.name))
				})]
			}, region)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-muted uppercase",
					children: "Also on the file"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: rest.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-wide uppercase",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: s.full
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: s.what
							})
						]
					}, s.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/search",
					search: {
						q: "",
						kind: "all"
					},
					className: "text-heat",
					children: "Open search"
				})
			})
		]
	});
}
//#endregion
export { SourcesPage as component };
