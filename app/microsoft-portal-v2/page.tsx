"use client";

import React, { useMemo, useState } from "react";

type Category =
  | "Microsoft 365"
  | "Security"
  | "Identity and Devices"
  | "Email"
  | "Collaboration"
  | "Data and Automation"
  | "AI";

type License = {
  id: string;
  name: string;
  category: Category;
  short: string;
  tags: string[];
  popular?: boolean;
  badge?: string;
  priceHint?: string;
};

const BRAND = {
  // Justera gärna dessa två om du vill matcha quantic.se ännu mer
  accent: "#4A87AA",
  accentSoft: "rgba(74, 135, 170, 0.14)",
  accentSoft2: "rgba(74, 135, 170, 0.08)",
  dark: "#0F172A",
};

const LICENSES: License[] = [
  {
    id: "m365-bp",
    name: "Microsoft 365 Business Premium",
    category: "Microsoft 365",
    short:
      "Komplett Microsoft 365 för SMB med säkerhet och enhetshantering i en licens.",
    tags: ["Office", "Enhetshantering", "Säkerhet", "SMB"],
    popular: true,
    badge: "Mest populär",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "m365-e3-eea",
    name: "Microsoft 365 E3 EEA",
    category: "Microsoft 365",
    short:
      "Enterprise licens för produktivitet och styrning. Stabil bas för större organisationer.",
    tags: ["Enterprise", "M365"],
    badge: "Enterprise",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "m365-e5-eea",
    name: "Microsoft 365 E5 EEA",
    category: "Microsoft 365",
    short:
      "Premium enterprise med avancerad säkerhet och compliance för högre krav och riskbild.",
    tags: ["Enterprise", "Premium", "Security"],
    badge: "Premium",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-eea",
    name: "Microsoft Teams EEA",
    category: "Collaboration",
    short:
      "Teams för chatt och möten. Relevант när man vill köpa Teams fristående.",
    tags: ["Teams", "Meetings"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-phone-eea",
    name: "Microsoft Teams Phone EEA",
    category: "Collaboration",
    short:
      "Telefoni i Teams. För er som vill ersätta eller komplettera växellösning.",
    tags: ["Phone", "Calling", "Teams"],
    badge: "Telefoni",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-rooms-pro",
    name: "Microsoft Teams Rooms Pro",
    category: "Collaboration",
    short:
      "Licens för mötesrum med Teams Rooms. Perfekt för konferensrum och hybridmöten.",
    tags: ["Meeting rooms", "Teams"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "exo-p1",
    name: "Exchange Online Plan 1",
    category: "Email",
    short: "E post och kalender i molnet. Basnivå för de flesta behov.",
    tags: ["Email", "Calendar"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "exo-p2",
    name: "Exchange Online Plan 2",
    category: "Email",
    short:
      "E post i molnet med mer avancerade funktioner och större flexibilitet för större krav.",
    tags: ["Email", "Advanced"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "entra-p2",
    name: "Microsoft Entra ID P2",
    category: "Identity and Devices",
    short:
      "Avancerad identitet och åtkomst. PIM, riskpolicys och starkare kontroll.",
    tags: ["Identity", "PIM", "Security"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "intune-p1",
    name: "Microsoft Intune Plan 1",
    category: "Identity and Devices",
    short:
      "Enhetshantering för Windows, macOS, iOS och Android. Policies, compliance och app deployment.",
    tags: ["MDM", "MAM", "Device"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "intune-suite",
    name: "Microsoft Intune Suite",
    category: "Identity and Devices",
    short:
      "Utökad Intune med mer avancerade funktioner för säkerhet, åtkomst och administration.",
    tags: ["Intune", "Advanced", "Security"],
    badge: "Pro",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "defender-endpoint-p2",
    name: "Microsoft Defender for Endpoint P2",
    category: "Security",
    short:
      "Avancerat skydd av datorer och servrar med detektion, respons och hotanalys.",
    tags: ["Endpoint", "EDR", "Security"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "defender-suite",
    name: "Microsoft Defender Suite",
    category: "Security",
    short:
      "Samlad säkerhetssvit för identitet, endpoint och moln med starkt skydd och översikt.",
    tags: ["Security", "Suite", "Enterprise"],
    badge: "Enterprise",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "defender-o365-p2",
    name: "Microsoft Defender for Office 365 Plan 2",
    category: "Security",
    short:
      "Avancerat mailskydd mot phishing och skadliga länkar, med bättre insyn och automatisering.",
    tags: ["Email security", "Phishing", "Security"],
    badge: "Mail security",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "purview",
    name: "Microsoft Purview",
    category: "Security",
    short:
      "Compliance, informationsskydd och datastyrning. Policy, DLP och eDiscovery.",
    tags: ["Compliance", "DLP", "Governance"],
    badge: "Compliance",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "m365-copilot",
    name: "Microsoft 365 Copilot",
    category: "AI",
    short:
      "AI assistent i Microsoft 365 som hjälper er arbeta snabbare i Outlook, Teams och Office.",
    tags: ["AI", "Add on"],
    badge: "Add on",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "power-bi-pro",
    name: "Power BI Pro",
    category: "Data and Automation",
    short:
      "Dela och samarbeta i rapporter och dashboards. Standardval för BI i Microsoft ekosystemet.",
    tags: ["BI", "Analytics"],
    popular: true,
    badge: "Populär",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "power-apps-premium",
    name: "Power Apps Premium",
    category: "Data and Automation",
    short:
      "Bygg appar snabbt med low code, med premium connectors och bättre möjligheter för integration.",
    tags: ["Low code", "Apps", "Automation"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "project-p3",
    name: "Planner and Project Plan 3",
    category: "Data and Automation",
    short:
      "Projektplanering för team och projektledare. Ofta lagom nivå jämfört med Plan 5.",
    tags: ["Project", "Planning"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "project-p5",
    name: "Planner and Project Plan 5",
    category: "Data and Automation",
    short:
      "Avancerad projektstyrning och portföljfunktioner för organisationer med komplexa behov.",
    tags: ["Project", "PMO"],
    badge: "Advanced",
    priceHint: "Pris på förfrågan",
  },
];

const CATEGORIES: Category[] = [
  "Microsoft 365",
  "Security",
  "Identity and Devices",
  "Email",
  "Collaboration",
  "Data and Automation",
  "AI",
];

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatQty(qty: number) {
  return Number.isFinite(qty) && qty > 0 ? qty : 1;
}

/**
 * DESIGN 2
 * Lägg denna i:
 * app/microsoft-portal-v2/page.tsx
 * och behåll v1 i app/microsoft-portal/page.tsx
 */
export default function QuanticMicrosoftPortalDesign2() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [onlyPopular, setOnlyPopular] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [cart, setCart] = useState<Record<string, number>>({});

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LICENSES.filter((l) => {
      const matchesCategory =
        activeCategory === "All" ? true : l.category === activeCategory;
      const matchesPopular = onlyPopular ? Boolean(l.popular) : true;
      const matchesQuery = q
        ? l.name.toLowerCase().includes(q) ||
          l.short.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
        : true;
      return matchesCategory && matchesPopular && matchesQuery;
    });
  }, [query, activeCategory, onlyPopular]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const lic = LICENSES.find((l) => l.id === id);
        if (!lic) return null;
        return { lic, qty: formatQty(qty) };
      })
      .filter(Boolean) as Array<{ lic: License; qty: number }>;
  }, [cart]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.qty, 0);
  }, [cartItems]);

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setCartOpen(true);
  }

  function setQty(id: string, qty: number) {
    const n = Math.max(0, Math.floor(qty || 0));
    setCart((prev) => {
      const next = { ...prev };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopNavV2
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCheckout={() => {
          setCartOpen(true);
          setCheckoutOpen(true);
        }}
      />

      <main>
        <HeroV2
          onPrimary={() => {
            const el = document.getElementById("catalog");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onSecondary={() => {
            const el = document.getElementById("packages");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <TrustStrip />

        <PackagesV2
          onSelect={(ids) => {
            ids.forEach((id) => addToCart(id));
          }}
        />

        <section id="catalog" className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Licenskatalog
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Klicka, lägg i varukorgen och skicka beställning. Perfekt även
                om ni kompletterar en befintlig setup.
              </p>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Sök. Till exempel E3, Intune, Defender"
                  className="w-full md:w-[420px] rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyPopular}
                  onChange={(e) => setOnlyPopular(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Visa populära
              </label>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <FilterChipV2
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              label="Alla"
            />
            {CATEGORIES.map((c) => (
              <FilterChipV2
                key={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
                label={c}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((lic) => (
              <LicenseCardV2 key={lic.id} license={lic} onAdd={() => addToCart(lic.id)} />
            ))}
          </div>

          <CalloutV2 />
        </section>

        <ContactV2 />
      </main>

      <FooterV2 />

      <CartDrawerV2
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
          setCheckoutOpen(false);
        }}
        items={cartItems}
        onQtyChange={setQty}
        onClear={clearCart}
        onCheckout={() => {
          setCartOpen(true);
          setCheckoutOpen(true);
        }}
        checkoutOpen={checkoutOpen}
      />
    </div>
  );
}

function TopNavV2({
  cartCount,
  onOpenCart,
  onOpenCheckout,
}: {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(74,135,170,1) 0%, rgba(15,23,42,1) 100%)",
            }}
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold">Quantic</div>
            <div className="text-xs text-slate-600">Microsoft portal</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <a className="hover:text-slate-900" href="#packages">
            Paket
          </a>
          <a className="hover:text-slate-900" href="#catalog">
            Licenser
          </a>
          <a className="hover:text-slate-900" href="#contact">
            Kontakt
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Varukorg
            {cartCount > 0 ? (
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs text-white"
                style={{ backgroundColor: BRAND.dark }}
              >
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            onClick={onOpenCheckout}
            className="rounded-2xl px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: BRAND.accent }}
          >
            Till kassan
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroV2({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Design 2
            <span
              className="rounded-full px-2 py-0.5 text-[11px] text-slate-700"
              style={{ backgroundColor: BRAND.accentSoft2 }}
            >
              Quantic vibe
            </span>
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Köp Microsoft licenser utan krångel
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-600">
            En tydlig licensportal för köp och komplettering. Snabb beställning,
            tydlig återkoppling och en partner som kan Microsoft på riktigt.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={onPrimary}
              className="rounded-2xl px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: BRAND.accent }}
            >
              Se licenser
            </button>
            <button
              onClick={onSecondary}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Se paket
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MiniStatV2 title="Snabb order" text="Skicka beställning på några minuter" />
            <MiniStatV2 title="Rätt val" text="Sök, filtrera och jämför" />
            <MiniStatV2 title="Skalbart" text="Redo för Arrow koppling" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div
            className="rounded-2xl border border-slate-200 p-4"
            style={{ backgroundColor: BRAND.accentSoft2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Populära val</div>
                <div className="text-xs text-slate-600">
                  Vanliga köp som ofta kompletteras
                </div>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs text-white"
                style={{ backgroundColor: BRAND.dark }}
              >
                Klickbart
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <HighlightRowV2
                title="Microsoft 365 Business Premium"
                sub="Komplett bas för SMB"
              />
              <HighlightRowV2 title="Microsoft Entra ID P2" sub="PIM och kontroll" />
              <HighlightRowV2 title="Power BI Pro" sub="BI för team och ledning" />
              <div className="pt-1 text-xs text-slate-600">
                Tips. Lägg till fler licenser när ni vill. Strukturen håller.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold">Varför Quantic</div>
            <div className="mt-2 space-y-2 text-sm text-slate-700">
              <BulletV2 text="Tydlig licensbild och kontroll över kostnader" />
              <BulletV2 text="Rådgivning vid behov, köp när det passar" />
              <BulletV2 text="Leverans och återkoppling utan strul" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <TrustCard
            title="Köp och komplettera"
            text="Beställ enstaka licenser även om ni redan har en befintlig tenant."
          />
          <TrustCard
            title="Trygg leverans"
            text="Vi verifierar underlag och återkopplar tydligt på order och startdatum."
          />
          <TrustCard
            title="Optimering"
            text="Vi hjälper er undvika dubbletter och överlicensiering om ni vill."
          />
        </div>
      </div>
    </section>
  );
}

function PackagesV2({ onSelect }: { onSelect: (ids: string[]) => void }) {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Paket</h2>
          <p className="mt-1 text-sm text-slate-600">
            Snabb väg till rätt licensmix. Allt är klickbart.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PackageCardV2
          name="Start"
          badge="Enkelt"
          desc="Stabil grund för mindre team."
          includes={[
            "Microsoft 365 Business Premium",
            "Valfritt. Exchange Plan 2 vid behov",
          ]}
          onClick={() => onSelect(["m365-bp"])}
        />
        <PackageCardV2
          name="Secure Workplace"
          badge="Mest populär"
          desc="Komplett arbetsplats med högre säkerhet och kontroll."
          includes={[
            "Microsoft 365 Business Premium",
            "Defender for Endpoint P2",
            "Entra ID P2",
          ]}
          onClick={() => onSelect(["m365-bp", "defender-endpoint-p2", "entra-p2"])}
        />
        <PackageCardV2
          name="Enterprise"
          badge="Enterprise"
          desc="För större organisationer med högre krav på styrning och compliance."
          includes={["Microsoft 365 E3 EEA", "Defender Suite", "Purview"]}
          onClick={() => onSelect(["m365-e3-eea", "defender-suite", "purview"])}
        />
        <PackageCardV2
          name="Data och automation"
          badge="Business value"
          desc="Analys, appar och planering som gör skillnad i vardagen."
          includes={["Power BI Pro", "Power Apps Premium", "Project Plan 3"]}
          onClick={() => onSelect(["power-bi-pro", "power-apps-premium", "project-p3"])}
        />
      </div>
    </section>
  );
}

function LicenseCardV2({ license, onAdd }: { license: License; onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-600">{license.category}</div>
          <h3 className="mt-1 text-sm font-semibold leading-snug">{license.name}</h3>
        </div>
        {license.badge ? <BadgeV2 text={license.badge} /> : null}
      </div>

      <p className="mt-3 text-sm text-slate-600">{license.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {license.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-1 text-xs text-slate-700"
            style={{ backgroundColor: BRAND.accentSoft2 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-900">
          {license.priceHint ?? "Pris på förfrågan"}
        </div>
        {license.popular ? (
          <span className="text-xs text-slate-600">Populär</span>
        ) : (
          <span className="text-xs text-slate-600">Klickbart</span>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={onAdd}
          className="flex-1 rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: BRAND.accent }}
        >
          Lägg i varukorg
        </button>
        <button
          onClick={() =>
            alert("Jämför vy kan byggas som nästa steg om ni vill.")
          }
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
        >
          Jämför
        </button>
      </div>
    </div>
  );
}

function CartDrawerV2({
  open,
  onClose,
  items,
  onQtyChange,
  onClear,
  onCheckout,
  checkoutOpen,
}: {
  open: boolean;
  onClose: () => void;
  items: Array<{ lic: License; qty: number }>;
  onQtyChange: (id: string, qty: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  checkoutOpen: boolean;
}) {
  return (
    <div className={classNames("fixed inset-0 z-50", open ? "" : "pointer-events-none")}>
      <div
        className={classNames(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={classNames(
          "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <div className="text-sm font-semibold">Varukorg</div>
            <div className="text-xs text-slate-600">
              Justera antal och gå till kassan
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Stäng
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 p-4 text-sm text-slate-700" style={{ backgroundColor: BRAND.accentSoft2 }}>
              Varukorgen är tom. Lägg till licenser från katalogen.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ lic, qty }) => (
                <div key={lic.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-600">{lic.category}</div>
                      <div className="mt-1 text-sm font-semibold">{lic.name}</div>
                      <div className="mt-1 text-xs text-slate-600">
                        {lic.priceHint ?? "Pris på förfrågan"}
                      </div>
                    </div>
                    {lic.badge ? <BadgeV2 text={lic.badge} /> : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-slate-600">Antal</div>
                    <div className="flex items-center gap-2">
                      <button
                        className="h-9 w-9 rounded-2xl border border-slate-200 hover:bg-slate-50"
                        onClick={() => onQtyChange(lic.id, qty - 1)}
                      >
                        -
                      </button>
                      <input
                        value={qty}
                        onChange={(e) => onQtyChange(lic.id, Number(e.target.value))}
                        className="h-9 w-16 rounded-2xl border border-slate-200 text-center text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                      <button
                        className="h-9 w-9 rounded-2xl border border-slate-200 hover:bg-slate-50"
                        onClick={() => onQtyChange(lic.id, qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={onClear}
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Töm
            </button>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className={classNames(
                "flex-1 rounded-2xl px-4 py-2 text-sm font-medium text-white",
                items.length === 0 ? "bg-slate-300" : "hover:opacity-90"
              )}
              style={items.length === 0 ? undefined : { backgroundColor: BRAND.accent }}
            >
              Till kassan
            </button>
          </div>

          {checkoutOpen ? <CheckoutFormV2 items={items} /> : null}
        </div>
      </aside>
    </div>
  );
}

function CheckoutFormV2({ items }: { items: Array<{ lic: License; qty: number }> }) {
  return (
    <div className="mt-5 rounded-3xl border border-slate-200 p-4" style={{ backgroundColor: BRAND.accentSoft2 }}>
      <div className="text-sm font-semibold">Kassa</div>
      <div className="mt-1 text-xs text-slate-600">
        Mock. Koppla senare till Arrow och orderflöde.
      </div>

      <div className="mt-3 space-y-2 text-xs text-slate-700">
        {items.map((i) => (
          <div key={i.lic.id} className="flex justify-between">
            <span className="truncate pr-2">
              {i.qty} st {i.lic.name}
            </span>
            <span className="text-slate-500">Order</span>
          </div>
        ))}
      </div>

      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Order skickad som mock. Nästa steg är backend och Arrow.");
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Företag"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />
          <input
            required
            placeholder="Organisationsnummer"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Kontakt e post"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Tenant domain, till exempel contoso.com"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Önskat startdatum"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <label className="flex items-start gap-2 text-xs text-slate-700">
          <input type="checkbox" required className="mt-0.5 h-4 w-4" />
          Jag godkänner villkor och att Quantic hanterar beställningen enligt
          integritetspolicy.
        </label>

        <button
          className="w-full rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: BRAND.accent }}
        >
          Skicka beställning
        </button>
      </form>
    </div>
  );
}

function CalloutV2() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 p-5" style={{ backgroundColor: BRAND.accentSoft2 }}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold">Osäker på vad ni behöver?</h3>
          <p className="text-sm text-slate-600">
            Boka en snabb licensgenomgång. Vi hjälper er hitta rätt och undvika felköp.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: BRAND.accent }}
            onClick={() => alert("Koppla till Calendly eller kontaktflöde.")}
          >
            Boka licensgenomgång
          </button>
          <button
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Kontakta oss
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactV2() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Kontakt</h2>
            <p className="mt-1 text-sm text-slate-600">
              Skriv kort vad ni vill köpa eller vad ni vill lösa, så återkopplar vi snabbt.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <BulletV2 text="Licensoptimering och kostnadskontroll" />
              <BulletV2 text="Onboarding. Entra, Intune och säkerhet" />
              <BulletV2 text="Support och rådgivning i Microsoft 365" />
            </div>
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Mock. Koppla till CRM, e post eller backend.");
            }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Namn"
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
              <input
                required
                placeholder="Företag"
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <input
              required
              type="email"
              placeholder="E post"
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
            <textarea
              required
              placeholder="Meddelande"
              className="h-28 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              className="w-full rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: BRAND.accent }}
            >
              Skicka
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FooterV2() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Quantic</div>
            <div className="mt-1 text-sm text-slate-600">
              Microsoft portal draft. Design 2 med Quantic accent.
            </div>
          </div>
          <div className="flex gap-4 text-sm text-slate-700">
            <a className="hover:text-slate-900" href="#catalog">
              Licenser
            </a>
            <a className="hover:text-slate-900" href="#packages">
              Paket
            </a>
            <a className="hover:text-slate-900" href="#contact">
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FilterChipV2({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded-full px-3 py-1 text-sm transition",
        active ? "text-white" : "text-slate-700 hover:bg-slate-100"
      )}
      style={active ? { backgroundColor: BRAND.dark } : { backgroundColor: BRAND.accentSoft2 }}
    >
      {label}
    </button>
  );
}

function BadgeV2({ text }: { text: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
      style={{ backgroundColor: BRAND.dark }}
    >
      {text}
    </span>
  );
}

function MiniStatV2({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{text}</div>
    </div>
  );
}

function HighlightRowV2({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-slate-600">{sub}</div>
      </div>
      <div
        className="h-9 w-9 rounded-2xl"
        style={{ backgroundColor: BRAND.accentSoft }}
      />
    </div>
  );
}

function BulletV2({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <span
        className="mt-2 h-2 w-2 rounded-full"
        style={{ backgroundColor: BRAND.accent }}
      />
      <span>{text}</span>
    </div>
  );
}

function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{text}</div>
    </div>
  );
}

function PackageCardV2({
  name,
  badge,
  desc,
  includes,
  onClick,
}: {
  name: string;
  badge: string;
  desc: string;
  includes: string[];
  onClick: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-600">Paket</div>
          <div className="mt-1 text-lg font-semibold tracking-tight">{name}</div>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
          style={{ backgroundColor: BRAND.accent }}
        >
          {badge}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600">{desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {includes.map((x) => (
          <li key={x} className="flex gap-2">
            <span
              className="mt-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: BRAND.dark }}
            />
            <span>{x}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className="mt-5 w-full rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        style={{ backgroundColor: BRAND.dark }}
      >
        Välj paket
      </button>
    </div>
  );
}

function CartDrawerHeaderTag({ text }: { text: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs text-white"
      style={{ backgroundColor: BRAND.dark }}
    >
      {text}
    </span>
  );
}

function CartDrawerV2Empty() {
  return (
    <div
      className="rounded-3xl border border-slate-200 p-4 text-sm text-slate-700"
      style={{ backgroundColor: BRAND.accentSoft2 }}
    >
      Varukorgen är tom. Lägg till licenser från katalogen.
    </div>
  );
}
