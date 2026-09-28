# FleshSesh Personal Sites — Developer Handbook

**Product:** FleshSesh Personal Sites  
**Owner:** CDXI Ventures  
**Intake source:** `index.html` onboarding enquiry  
**Pricing year:** 2026/27 AUD  
**Support:** hello@fleshsesh.fans  

This file is the build-team contract. When an enquiry pack lands, you do not invent scope. You execute against the JSON + Markdown brief + media folder + this handbook.

---

## 1. What you receive

Every accepted booking should arrive as one ticket named after the invoice number.

| File | Purpose |
|---|---|
| `FS-YYYYMMDD-XXXX-enquiry.json` | Source of truth. Parse this. |
| `FS-YYYYMMDD-XXXX-brief.md` | Human brief. Pin it on the ticket. |
| Printed / PDF invoice | Proof of paid scope. Do not build unpaid extras. |
| Master asset folder URL | Drive / Dropbox / WeTransfer. Pull immediately. |
| Local file catalogue inside JSON `media.files[]` | Role of each asset on the site. |

If any of invoice number, stage name, plan, or asset folder is missing — stop and bounce to intake. Do not start the 72-hour clock.

---

## 2. Clock rules

- Clock starts when **all required content is in**, not when the invoice is raised.
- Required to start:
  - Stage name
  - Email
  - Confirmed 18+ (`legal.over18 === true`)
  - Content rights (`legal.ownContent === true`)
  - Adult terms (`legal.adultAck === true`)
  - At least one usable hero image **or** a complete asset folder URL
  - Plan selected
- Standard delivery: **72 hours after content supplied**.
- `speed` values:
  - `none` — standard 72h
  - `launch` — LAUNCH package. You assemble content, wire links, SEO, launch support. Still 72h but you own the assembly, not the talent.
  - `rush` — treat as priority in the same 72h window
  - `sameday` — same calendar day if content is already complete before kickoff

Preview goes to `identity.email`. Revisions: START 1 round · SIGNATURE 2 · BLACK reasonable ongoing. Extra work is **$75/hr** and needs a change order.

---

## 3. Plan skins

Read `plan` from JSON.

### START — `$295` + Care `$29/mo` or `$290/yr`
- One page only
- Subdomain `brand.subdomain`.fleshsesh.fans
- Profile, bio, social links, booking CTA
- Gallery **max 15** images
- Basic SEO, hosting, SSL
- Enquiry form capped at **20/month**
- No AI inbox
- No custom domain unless add-on `domain` is paid

### SIGNATURE — `$595` + Care `$59/mo` or `$590/yr`
- Everything in START
- Custom visual direction from `brand.vibe` / colours / fonts
- Multi-section layout
- Gallery **max 50**
- Advanced SEO + analytics
- Unlimited Enquiries Inbox
- Priority support + minor edits

### BLACK — `$995` + Care `$99/mo` or `$990/yr`
- Everything in SIGNATURE
- Fully custom design
- Multiple pages + advanced galleries
- Custom forms + integrations
- Full AI Inbox (triage + auto-reply)
- Custom domain **included**
- Monthly optimisation + dev priority

Do not silently upgrade a START client to SIGNATURE layout.

---

## 4. JSON map → site modules

```
identity.stageName          → hero name, <title>, OG title
identity.legalName          → invoice / staff only. NEVER publish unless brand.dont says otherwise
identity.pronouns           → about / media kit
identity.dob                → 18+ check only. Never publish
identity.email / phone      → enquiry routing, not public unless asked
identity.city / timezone    → availability copy. Respect legal.notes + brand.dont
identity.talent[]           → badges / schema / about
identity.representation     → footer or booking form if agency

brand.subdomain             → claim DNS immediately
brand.customDomain          → only if plan is black OR addon domain is paid
brand.tagline               → hero
brand.shortBio              → hero / social
brand.longBio               → about + auto media kit
brand.vibe / colours / fonts
brand.do / dont             → hard constraints
brand.inspiration           → mood only, do not clone
brand.features[]            → feature flags

commerce.ratePublic         → Public | Gated | On request
commerce.rates              → rate card module
commerce.customs            → custom content request form copy
commerce.collab             → brand / agency form copy
commerce.availability       → calendar helper text
commerce.touring            → discreet booking notes
commerce.platforms.*        → links hub

media.driveLink             → pull assets
media.notes                 → usage instructions
media.files[].category      → placement
media.files[].protect       → watermark / blur / disable save

legal.*                     → compliance gate
quote.lines[]               → paid scope only
```

---

## 5. Feature flags

If a feature is in `brand.features[]` **and** the plan allows it, build it. If the feature needs a paid add-on the client did not buy, skip it and note it on the preview.

| Feature | START | SIGNATURE | BLACK |
|---|---|---|---|
| Custom URL (subdomain) | Yes | Yes | Yes |
| Cinematic hero | Simple | Yes | Full |
| Platform links hub | Yes | Yes | Yes |
| Photo gallery | 15 | 50 | Advanced / multi |
| Blur / watermark / unlock | Basic | Yes | Yes + forensic watermark |
| Custom content request form | Basic enquiry | Yes | Custom |
| Collab & brand booking form | Same form | Separate | Custom |
| Rate card public or gated | Yes | Yes | Yes |
| Auto media kit PDF | No unless add-on | Preferred | Yes |
| Availability calendar | Optional | Yes | Yes |
| AI Enquiries Inbox | No | Unlimited | Full triage + auto-reply |
| Analytics dashboard | Basic | Yes | Yes |
| Content protection | Basic | Yes | Yes |
| Custom domain | Add-on $99 | Add-on $99 | Included |
| Custom animation | Add-on $195 | Add-on $195 | Add-on unless quoted into design |

Add-on IDs from intake: `section`, `page`, `domain`, `copy`, `socialsetup`, `photoopt`, `gallery`, `bookingform`, `email`, `analytics`, `seo`, `animation`, `logo`, `refresh`, `monthlycontent`.

Waivers already handled in the quote engine:
- `domain` waived on BLACK
- `analytics` waived on SIGNATURE and BLACK

---

## 6. Media handling

Categories you will see on files:

- Hero / cover
- Portrait
- Full body
- Lingerie / glamour
- Explicit / unlock
- Brand / press
- Logo / mark
- Mood / reference
- Video teaser
- ID / verification (staff only)

Rules:
1. **ID / verification** never goes on the public site, repo, CDN, or preview that the client forwards. Staff vault only.
2. `protect: true` → disable right-click where possible, show screenshot warning, apply watermark, consider click-to-unlock.
3. Explicit / unlock stays behind the unlock pattern. Public gallery stays clean enough for brand/agency traffic.
4. Hero is the first `Hero / cover` file. If none, first strong portrait.
5. Optimise everything for mobile-first. START includes photo optimisation only if add-on `photoopt` is paid; SIGNATURE/BLACK you still compress for web as standard.
6. Do not scrape the talent’s OnlyFans or socials for extra images. Use what they supplied.

---

## 7. Hard product constraints

FleshSesh sites are **profile, portfolio, marketing and enquiry destinations**.

Build:
- Links out to OnlyFans, Fansly, Instagram, X, booking forms
- Enquiry inbox / forms
- Rate information they asked to publish or gate

Do **not** build:
- Card checkout for adult content
- Wallet / crypto paywalls for explicit media
- Anything that violates platform or payment-provider rules
- Public legal name, home address, or geolocated EXIF
- Under-18 anything. If DOB implies under 18, kill the job and escalate

Discretion defaults:
- Publish stage name only
- City only if they gave it and `brand.dont` / `legal.notes` do not forbid it
- Touring / incall / outcall copy stays vague unless they wrote specific public text

---

## 8. Build sequence (do this in order)

1. Open JSON. Confirm plan, speed, legal flags.
2. Claim `subdomain`.fleshsesh.fans. Park custom domain if in scope.
3. Pull asset folder. Quarantine ID files.
4. Apply plan template.
5. Set colour / type from brief. If blank, use FleshSesh system: near-black `#070708`, hot pink `#FF2D8A`, purple `#8B5CF6`, gold `#F5C16C`, Sora / Syne.
6. Hero: name, tagline, primary platform CTAs.
7. Links hub from `commerce.platforms` — skip empty fields.
8. Gallery from catalogued files. Honour protect flags.
9. Rate card module using `commerce.ratePublic`.
10. Forms:
    - Fan customs ← `commerce.customs`
    - Brand / collab / agency ← `commerce.collab`
    - START may share one form. SIGNATURE+ split them.
11. Inbox:
    - START: native form, 20/month cap
    - SIGNATURE: unlimited inbox
    - BLACK: AI triage Fan / Brand / Agency / Collab / Flag + auto-reply templates
12. SEO basics on all plans. Advanced on SIGNATURE+. Schema as CreativeWork / Person using stage name only.
13. Protection layer.
14. Analytics if plan or add-on allows.
15. Internal preview QA (section 10).
16. Send preview to talent email. Start revision clock.
17. Launch on approval or when included rounds are exhausted and no blocker remains.

---

## 9. Enquiry routing

Suggested inbox tags (SIGNATURE / BLACK):

| Tag | Source |
|---|---|
| Fan | customs form, tip-style questions |
| Brand | sponsorship / usage |
| Agency | representation |
| Collab | shoot / content swap |
| Flag | underage suspicion, blackmail, payment-processor bait, threats |

START has no AI triage. Forward the single form to email.

Never put the legal name in auto-replies.

---

## 10. QA before preview

- [ ] 18+ and rights flags true
- [ ] Legal name not in page source, alt text, filenames, or schema
- [ ] ID assets absent from CDN
- [ ] Subdomain resolves HTTPS
- [ ] Mobile hero does not crop the face off
- [ ] Every supplied platform link works
- [ ] Empty platform fields omitted
- [ ] Gallery count within plan cap
- [ ] Protected assets cannot be saved cleanly
- [ ] No payment checkout
- [ ] Rate visibility matches brief
- [ ] Enquiry form lands in the right inbox
- [ ] Footer: FleshSesh Personal Sites · a CDXI Ventures product
- [ ] Care plan does not need to be visible as pricing on the public page

---

## 11. Care plan after launch

Care is not optional. Hosting, SSL, backups, security sit on Care.

| | START $29/mo | SIGNATURE $59/mo | BLACK $99/mo |
|---|---|---|---|
| Hosting + SSL | Yes | Yes | Yes |
| Daily backups | Yes | Yes | Yes |
| Security monitoring | Yes | Yes | Yes |
| Minor edits | Limited | Included | Ongoing reasonable |
| Content updates | No unless `monthlycontent` | Monthly | Monthly + optimisation |
| Support | Standard | Priority | Dedicated |
| Design refresh | No | No | Included in BLACK Care |

`monthlycontent` add-on is `$49/mo` on top of Care.

---

## 12. Ticket template

```
Invoice: FS-
Talent: 
Plan: START | SIGNATURE | BLACK
Speed: none | launch | rush | sameday
URL: .fleshsesh.fans
Custom domain: 
Due now (AUD): 
Care: monthly | annual
Asset folder: 
18+: Y/N
Rights: Y/N
Preview due: 
Assigned:
```

Paste the Markdown brief under the ticket description. Attach the JSON. Do not attach ID images to Slack/Discord.

---

## 13. Local intake app

The onboarding UI lives in this folder:

- `index.html` — wizard
- `styles.css` — FleshSesh dark system
- `app.js` — pricing engine + pack export
- `README.md` — operator overview
- `DEVELOPERS.md` — this file

No backend yet. Production should POST the JSON to bookings, create the tax invoice from `quote.once`, and open the ticket above.

Pricing engine constants in `app.js`: `PLANS`, `ADDONS`, `SPEED`. If brochure prices change, change them there and here in the same commit.

---

## 14. Out of scope unless quoted

- Payment processing
- Custom app features not on the brochure
- Weekly filming or social management
- AI clone / likeness generation (different product)
- Escort dispatch software
- Publishing content the client did not supply

If they ask mid-build, price at `$75/hr` or a brochure add-on and wait for a revised invoice line.
