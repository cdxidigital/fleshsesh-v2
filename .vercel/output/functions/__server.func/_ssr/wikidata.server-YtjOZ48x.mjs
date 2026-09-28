//#region node_modules/.nitro/vite/services/ssr/assets/wikidata.server-YtjOZ48x.js
var ENDPOINT = "https://query.wikidata.org/sparql";
var UA = "fleshsesh/1.0 (adult-industry metadata index; no media)";
var MIN_AGE_YEAR = (/* @__PURE__ */ new Date()).getUTCFullYear() - 21;
function sanitizeQuery(raw) {
	return raw.replace(/[^\p{L}\p{N} .'-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}
function sparqlEscape(s) {
	return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
function isQid(value) {
	return /^Q[1-9]\d{0,12}$/.test(value);
}
function cleanDesc(raw) {
	return raw.replace(/\s*\(born [^)]+\)/gi, "").replace(/\s*\(\d{4}\s*[–-].*?\)/g, "").replace(/\s+/g, " ").trim().slice(0, 280);
}
function binding(row, key) {
	return row[key]?.value ?? "";
}
function qidFromUri(uri) {
	const id = uri.split("/").pop() ?? "";
	return isQid(id) ? id : "";
}
function token(raw) {
	return raw.replace(/[^A-Za-z0-9._~-]/g, "");
}
function iafdTitleHref(id) {
	const slug = id.replace(/[^A-Za-z0-9+._=/-]/g, "");
	return slug ? `https://www.iafd.com/title.rme/title=${slug}` : "";
}
function databasesFromRow(row) {
	const out = [];
	const push = (name, href) => {
		if (href && !out.some((d) => d.name === name)) out.push({
			name,
			href
		});
	};
	const iafdUuid = binding(row, "iafdUuid");
	const iafdF = binding(row, "iafdF");
	const iafdM = binding(row, "iafdM");
	const iafdFilmUuid = binding(row, "iafdFilmUuid");
	const iafdFilm = binding(row, "iafdFilm");
	const iafdDist = binding(row, "iafdDist");
	const afdbA = binding(row, "afdbA");
	const afdbF = binding(row, "afdbF");
	const afdbS = binding(row, "afdbS");
	const afdbD = binding(row, "afdbD");
	const afdbSeries = binding(row, "afdbSeries");
	const avnP = binding(row, "avnP");
	const avnM = binding(row, "avnM");
	const xxxF = token(binding(row, "xxxF"));
	const xxxT = token(binding(row, "xxxT"));
	const egafdA = token(binding(row, "egafdA"));
	const egafdF = token(binding(row, "egafdF"));
	const bgafdA = token(binding(row, "bgafdA"));
	const bgafdF = token(binding(row, "bgafdF"));
	const euro = token(binding(row, "euro"));
	const babes = token(binding(row, "babes"));
	const indexxx = token(binding(row, "indexxx"));
	const pureA = token(binding(row, "pureA"));
	const pureS = token(binding(row, "pureS"));
	const rakuP = token(binding(row, "rakuP"));
	const rakuM = token(binding(row, "rakuM"));
	const xbiz = token(binding(row, "xbiz"));
	if (iafdUuid) push("IAFD", `https://www.iafd.com/person.rme/id=${encodeURIComponent(iafdUuid)}`);
	else if (iafdF) push("IAFD", `https://www.iafd.com/person.rme/perfid=${encodeURIComponent(iafdF)}/gender=f`);
	else if (iafdM) push("IAFD", `https://www.iafd.com/person.rme/perfid=${encodeURIComponent(iafdM)}/gender=m`);
	if (iafdFilmUuid) push("IAFD", `https://www.iafd.com/title.rme/id=${encodeURIComponent(iafdFilmUuid)}`);
	else {
		const filmHref = iafdTitleHref(iafdFilm);
		if (filmHref) push("IAFD", filmHref);
	}
	if (iafdDist) push("IAFD", `https://www.iafd.com/distrib.rme/distrib=${encodeURIComponent(iafdDist)}`);
	if (afdbA) push("AFDB", `https://www.adultfilmdatabase.com/actor.cfm?actorid=${encodeURIComponent(afdbA)}`);
	if (afdbF) push("AFDB", `https://www.adultfilmdatabase.com/video.cfm?videoid=${encodeURIComponent(afdbF)}`);
	if (afdbS) push("AFDB", `https://www.adultfilmdatabase.com/studio.cfm?studioid=${encodeURIComponent(afdbS)}`);
	if (afdbD) push("AFDB", `https://www.adultfilmdatabase.com/director.cfm?directorid=${encodeURIComponent(afdbD)}`);
	if (afdbSeries) push("AFDB", `https://www.adultfilmdatabase.com/series.cfm?seriesid=${encodeURIComponent(afdbSeries)}`);
	if (avnP) push("AVN", `https://avn.com/profiles/${encodeURIComponent(avnP)}`);
	if (avnM) push("AVN", `https://avn.com/movies/${encodeURIComponent(avnM)}.html`);
	if (xxxF) push("XXXBios", `https://xxxbios.com/${encodeURIComponent(xxxF)}/`);
	else if (xxxT) push("XXXBios", `https://xxxbios.com/${encodeURIComponent(xxxT)}-biography/`);
	if (egafdA) push("EGAFD", `https://www.egafd.com/actresses/details.php/id/${encodeURIComponent(egafdA)}`);
	if (egafdF) push("EGAFD", `https://www.egafd.com/films/details.php/id/${encodeURIComponent(egafdF)}`);
	if (bgafdA) push("BGAFD", `https://www.bgafd.co.uk/actresses/details.php/id/${encodeURIComponent(bgafdA)}`);
	if (bgafdF) push("BGAFD", `https://www.bgafd.co.uk/films/details.php/id/${encodeURIComponent(bgafdF)}`);
	if (euro) push("EuroBabeIndex", `https://www.eurobabeindex.com/sbandoindex/${encodeURIComponent(euro)}.html`);
	if (babes) push("Babesdirectory", `https://babesdirectory.online/profile/${encodeURIComponent(babes)}`);
	if (indexxx) push("indexxx", `https://indexxx.com/m/${encodeURIComponent(indexxx)}`);
	if (pureA) push("Pure Adult", `https://pureadult.co.jp/user_data/sp_artist_product.php?aid=${encodeURIComponent(pureA)}`);
	if (pureS) push("Pure Adult", `https://pureadult.co.jp/user_data/sp_artist_product.php?mid=${encodeURIComponent(pureS)}`);
	if (rakuP) push("Rakuten TV Adult", `https://tv.rakuten.co.jp/adult/search/cast_staff/${encodeURIComponent(rakuP)}/`);
	if (rakuM) push("Rakuten TV Adult", `https://tv.rakuten.co.jp/adult/search/maker/${encodeURIComponent(rakuM)}/`);
	if (xbiz) push("XBIZ", `https://www.xbiz.com/p/${encodeURIComponent(xbiz)}`);
	const imdb = token(binding(row, "imdb"));
	if (imdb.startsWith("nm")) push("IMDb", `https://www.imdb.com/name/${imdb}/`);
	else if (imdb.startsWith("tt")) push("IMDb", `https://www.imdb.com/title/${imdb}/`);
	else if (imdb.startsWith("co")) push("IMDb", `https://www.imdb.com/company/${imdb}/`);
	const ofdbF = token(binding(row, "ofdbF"));
	const ofdbP = token(binding(row, "ofdbP"));
	if (ofdbF) push("OFDb", `https://www.ofdb.de/film/${encodeURIComponent(ofdbF)}`);
	if (ofdbP) push("OFDb", `https://www.ofdb.de/person/${encodeURIComponent(ofdbP)}`);
	const alloF = token(binding(row, "alloF"));
	const alloP = token(binding(row, "alloP"));
	if (alloF) push("AlloCiné", `https://www.allocine.fr/film/fichefilm_gen_cfilm=${encodeURIComponent(alloF)}.html`);
	if (alloP) push("AlloCiné", `https://www.allocine.fr/personne/fichepersonne_gen_cpersonne=${encodeURIComponent(alloP)}.html`);
	const csfdF = token(binding(row, "csfdF"));
	const csfdP = token(binding(row, "csfdP"));
	if (csfdF) push("ČSFD", `https://www.csfd.cz/film/${encodeURIComponent(csfdF)}`);
	if (csfdP) push("ČSFD", `https://www.csfd.cz/tvurce/${encodeURIComponent(csfdP)}`);
	const faF = token(binding(row, "faF"));
	const faP = token(binding(row, "faP"));
	if (faF) push("FilmAffinity", `https://www.filmaffinity.com/en/film${encodeURIComponent(faF)}.html`);
	if (faP) push("FilmAffinity", `https://www.filmaffinity.com/en/name.php?name-id=${encodeURIComponent(faP)}`);
	const filmportal = token(binding(row, "filmportal"));
	if (filmportal) push("Filmportal", `https://www.filmportal.de/${encodeURIComponent(filmportal)}`);
	const ausClass = token(binding(row, "ausClass"));
	if (ausClass) push("Australian Classification", `https://www.classification.gov.au/titles/${encodeURIComponent(ausClass)}`);
	const qid = qidFromUri(binding(row, "item"));
	if (qid) push("Wikidata", `https://www.wikidata.org/wiki/${qid}`);
	return out;
}
var ID_OPTIONALS = `
  OPTIONAL { ?item wdt:P3869 ?iafdF }
  OPTIONAL { ?item wdt:P4505 ?iafdM }
  OPTIONAL { ?item wdt:P12776 ?iafdUuid }
  OPTIONAL { ?item wdt:P5098 ?iafdFilm }
  OPTIONAL { ?item wdt:P12654 ?iafdFilmUuid }
  OPTIONAL { ?item wdt:P8815 ?iafdDist }
  OPTIONAL { ?item wdt:P3351 ?afdbA }
  OPTIONAL { ?item wdt:P5083 ?afdbF }
  OPTIONAL { ?item wdt:P14493 ?afdbS }
  OPTIONAL { ?item wdt:P14030 ?afdbD }
  OPTIONAL { ?item wdt:P14492 ?afdbSeries }
  OPTIONAL { ?item wdt:P8718 ?avnP }
  OPTIONAL { ?item wdt:P9032 ?avnM }
  OPTIONAL { ?item wdt:P9233 ?xxxF }
  OPTIONAL { ?item wdt:P9174 ?xxxT }
  OPTIONAL { ?item wdt:P8767 ?egafdA }
  OPTIONAL { ?item wdt:P14428 ?egafdF }
  OPTIONAL { ?item wdt:P14241 ?bgafdA }
  OPTIONAL { ?item wdt:P14435 ?bgafdF }
  OPTIONAL { ?item wdt:P9187 ?euro }
  OPTIONAL { ?item wdt:P10155 ?babes }
  OPTIONAL { ?item wdt:P14246 ?indexxx }
  OPTIONAL { ?item wdt:P14605 ?pureA }
  OPTIONAL { ?item wdt:P14606 ?pureS }
  OPTIONAL { ?item wdt:P14638 ?rakuP }
  OPTIONAL { ?item wdt:P14781 ?rakuM }
  OPTIONAL { ?item wdt:P14829 ?xbiz }
  OPTIONAL { ?item wdt:P345 ?imdb }
  OPTIONAL { ?item wdt:P3138 ?ofdbF }
  OPTIONAL { ?item wdt:P9404 ?ofdbP }
  OPTIONAL { ?item wdt:P1265 ?alloF }
  OPTIONAL { ?item wdt:P1266 ?alloP }
  OPTIONAL { ?item wdt:P2529 ?csfdF }
  OPTIONAL { ?item wdt:P2605 ?csfdP }
  OPTIONAL { ?item wdt:P480 ?faF }
  OPTIONAL { ?item wdt:P12153 ?faP }
  OPTIONAL { ?item wdt:P2639 ?filmportal }
  OPTIONAL { ?item wdt:P8326 ?ausClass }
  OPTIONAL { ?item schema:description ?desc . FILTER(LANG(?desc) = "en") }
  OPTIONAL { ?item rdfs:label ?enLabel . FILTER(LANG(?enLabel) = "en") }
  OPTIONAL { ?item wdt:P27 ?country . ?country rdfs:label ?countryLabel . FILTER(LANG(?countryLabel) = "en") }
  OPTIONAL {
    ?wikipedia schema:about ?item ;
               schema:isPartOf <https://en.wikipedia.org/> .
    OPTIONAL { ?wikipedia schema:name ?wikiTitle }
  }
`;
function kindBlock(kind) {
	const performers = `{
    {
      ?item wdt:P106 wd:Q488111
    } UNION {
      ?item wdt:P3869|wdt:P4505|wdt:P12776|wdt:P3351|wdt:P14030|wdt:P8718|wdt:P9233|wdt:P9174|wdt:P8767|wdt:P14241|wdt:P9187|wdt:P10155|wdt:P14246|wdt:P14605|wdt:P14638 ?_pid
    }
    ?item wdt:P569 ?birth .
    FILTER(YEAR(?birth) <= ${MIN_AGE_YEAR})
    BIND("performers" AS ?kind)
  }`;
	const productions = `{
    { ?item wdt:P5098|wdt:P12654|wdt:P5083|wdt:P9032|wdt:P14428|wdt:P14435|wdt:P14492 ?_fid }
    UNION { ?item wdt:P31/wdt:P279* wd:Q185529 }
    BIND("productions" AS ?kind)
  }`;
	const companies = `{
    { ?item wdt:P14493 ?_s1 } UNION { ?item wdt:P8815 ?_s2 } UNION { ?item wdt:P14606 ?_s3 } UNION { ?item wdt:P14781 ?_s4 } UNION { ?item wdt:P31/wdt:P279* wd:Q30941437 }
    BIND("companies" AS ?kind)
  }`;
	if (kind === "performers") return performers;
	if (kind === "productions") return productions;
	if (kind === "companies") return companies;
	return `${performers} UNION ${productions} UNION ${companies}`;
}
async function runSparql(query) {
	const url = `${ENDPOINT}?${new URLSearchParams({
		format: "json",
		query
	})}`;
	const res = await fetch(url, {
		headers: {
			Accept: "application/sparql-results+json",
			"User-Agent": UA
		},
		signal: AbortSignal.timeout(18e3)
	});
	if (!res.ok) throw new Error(`Wikidata ${res.status}`);
	return (await res.json()).results?.bindings ?? [];
}
function pickName(row) {
	return [
		binding(row, "enLabel"),
		binding(row, "wikiTitle"),
		binding(row, "itemLabel")
	].find((n) => n && !isQid(n)) ?? "";
}
function mapRow(row) {
	const qid = qidFromUri(binding(row, "item"));
	if (!qid) return null;
	const kind = binding(row, "kind");
	if (kind !== "performers" && kind !== "productions" && kind !== "companies") return null;
	const name = pickName(row);
	if (!name) return null;
	const summary = cleanDesc(binding(row, "desc")) || (kind === "performers" ? "Adult performer listed in public industry databases." : kind === "productions" ? "Title listed in public industry databases." : "Company listed in public industry databases.");
	const wikipedia = binding(row, "wikipedia") || void 0;
	return {
		qid,
		kind,
		name,
		summary,
		region: binding(row, "countryLabel") || void 0,
		databases: databasesFromRow(row),
		wikipedia
	};
}
var cache = /* @__PURE__ */ new Map();
var TTL = 6e5;
function cached(key, load) {
	const hit = cache.get(key);
	if (hit && Date.now() - hit.at < TTL) return Promise.resolve(hit.value);
	return load().then((value) => {
		cache.set(key, {
			at: Date.now(),
			value
		});
		return value;
	});
}
var SELECT_VARS = "?item ?itemLabel ?enLabel ?desc ?kind ?iafdF ?iafdM ?iafdUuid ?iafdFilm ?iafdFilmUuid ?iafdDist ?afdbA ?afdbF ?afdbS ?afdbD ?afdbSeries ?avnP ?avnM ?xxxF ?xxxT ?egafdA ?egafdF ?bgafdA ?bgafdF ?euro ?babes ?indexxx ?pureA ?pureS ?rakuP ?rakuM ?xbiz ?imdb ?ofdbF ?ofdbP ?alloF ?alloP ?csfdF ?csfdP ?faF ?faP ?filmportal ?ausClass ?countryLabel ?wikipedia ?wikiTitle";
async function searchWikidata(rawQ, rawKind) {
	const q = sanitizeQuery(rawQ);
	const kind = rawKind === "performers" || rawKind === "productions" || rawKind === "companies" ? rawKind : "all";
	if (q.length < 2) return {
		q,
		hits: []
	};
	if (rawKind === "agents" || rawKind === "events" || rawKind === "social" || rawKind === "law") return {
		q,
		hits: []
	};
	return cached(`s:${kind}:${q.toLowerCase()}`, async () => {
		const query = `
SELECT DISTINCT ${SELECT_VARS} WHERE {
  SERVICE wikibase:mwapi {
    bd:serviceParam wikibase:endpoint "www.wikidata.org";
                    wikibase:api "EntitySearch";
                    mwapi:search "${sparqlEscape(q)}";
                    mwapi:language "en".
    ?item wikibase:apiOutputItem mwapi:item.
  }
  ${kindBlock(kind)}
  ${ID_OPTIONALS}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 24`.trim();
		try {
			const hits = (await runSparql(query)).map(mapRow).filter((h) => Boolean(h));
			const seen = /* @__PURE__ */ new Set();
			return {
				q,
				hits: hits.filter((h) => {
					if (seen.has(h.qid)) return false;
					seen.add(h.qid);
					return true;
				})
			};
		} catch (err) {
			return {
				q,
				hits: [],
				error: err instanceof Error ? err.message : "Live index unavailable"
			};
		}
	});
}
async function getWikidataEntity(rawQid) {
	const qid = rawQid.trim();
	if (!isQid(qid)) return null;
	return cached(`e:${qid}`, async () => {
		const query = `
SELECT DISTINCT ${SELECT_VARS} WHERE {
  BIND(wd:${qid} AS ?item)
  ${kindBlock("all")}
  ${ID_OPTIONALS}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 4`.trim();
		try {
			return (await runSparql(query)).map(mapRow).filter((h) => Boolean(h))[0] ?? null;
		} catch {
			return null;
		}
	});
}
//#endregion
export { getWikidataEntity, searchWikidata };
