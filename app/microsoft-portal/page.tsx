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
  priceHint?: string; // keep as placeholder for now
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
    id: "purview",
    name: "Microsoft Purview",
    category: "Security",
    short:
      "Compliance, informationsskydd och datastyrning. Bra för policy, DLP och eDiscovery.",
    tags: ["Compliance", "DLP", "Governance"],
    badge: "Compliance",
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
      "Avancerad identitet och åtkomst. Stöd för PIM, riskbaserade policys och starkare kontroll.",
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
    id: "teams-rooms-pro",
    name: "Microsoft Teams Rooms Pro",
    category: "Collaboration",
    short:
      "Licens för mötesrum med Teams Rooms. Perfekt för konferensrum och hybridmöten.",
    tags: ["Meeting rooms", "Teams"],
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
    id: "power-apps-premium",
    name: "Power Apps Premium",
    category: "Data and Automation",
    short:
      "Bygg appar snabbt med low code, med premium connectors och bättre möjligheter för integration.",
    tags: ["Low code", "Apps", "Automation"],
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
    id: "m365-e3-eea",
    name: "Microsoft 365 E3 EEA",
    category: "Microsoft 365",
    short:
      "Enterprise licens för produktivitet och styrning. Bra bas för större organisationer.",
    tags: ["Enterprise", "M365"],
    badge: "Enterprise",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "m365-e5-eea",
    name: "Microsoft 365 E5 EEA",
    category: "Microsoft 365",
    short:
      "Premium enterprise med avancerad säkerhet och compliance. För högre krav och större riskbild.",
    tags: ["Enterprise", "Premium", "Security"],
    badge: "Premium",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-eea",
    name: "Microsoft Teams EEA",
    category: "Collaboration",
    short:
      "Teams för chatt och möten, särskilt relevant när man vill köpa Teams fristående.",
    tags: ["Teams", "Meetings"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-phone-eea",
    name: "Microsoft Teams Phone EEA",
    category: "Collaboration",
    short:
      "Telefoni i Teams. För organisationer som vill ersätta eller komplettera växellösning.",
    tags: ["Phone", "Calling", "Teams"],
    badge: "Telefoni",
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

export default function QuanticMicrosoftPortalDraft() {
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
      <TopNav
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCheckout={() => {
          setCartOpen(true);
          setCheckoutOpen(true);
        }}
      />

      <main>
        <Hero
          onPrimary={() => {
            const el = document.getElementById("catalog");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onSecondary={() => {
            const el = document.getElementById("packages");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <HowItWorks />

        <Packages
          onSelect={(ids) => {
            ids.forEach((id) => addToCart(id));
          }}
        />

        <section id="catalog" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Alla Microsoft licenser
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Sök, filtrera och lägg i varukorgen. Ni kan beställa enstaka
                licenser även om ni redan har andra.
              </p>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Sök licens, till exempel E3, Intune, Defender"
                  className="w-full md:w-[420px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
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

          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              label="Alla"
            />
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
                label={c}
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((lic) => (
              <LicenseCard
                key={lic.id}
                license={lic}
                onAdd={() => addToCart(lic.id)}
                onCompare={() => {
                  alert(
                    "Jämför vy kan byggas som nästa steg. Jag kan lägga in en compare drawer med 2 till 3 val."
                  );
                }}
              />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold">Osäker på vad ni behöver?</h3>
                <p className="text-sm text-slate-600">
                  Boka en snabb licensgenomgång. Vi hjälper er hitta rätt och
                  undvika felköp.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() =>
                    alert(
                      "Koppla denna knapp till calendly eller ert kontaktflöde."
                    )
                  }
                >
                  Boka licensgenomgång
                </button>
                <button
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
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
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Skicka en förfrågan
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Det här formuläret kan användas för allmän kontakt. Checkout
                  skickar separat beställning.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>Support och rådgivning i Microsoft 365</li>
                  <li>Licensoptimering och kostnadskontroll</li>
                  <li>Onboarding, Intune, Entra och säkerhet</li>
                </ul>
              </div>

              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Koppla till ert backend, e post eller CRM. Just nu är detta en mock."
                  );
                }}
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Namn"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  <input
                    required
                    placeholder="Företag"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="E post"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
                <textarea
                  required
                  placeholder="Meddelande"
                  className="h-28 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                  Skicka
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
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

function TopNav({
  cartCount,
  onOpenCart,
  onOpenCheckout,
}: {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900" />
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
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Varukorg
            {cartCount > 0 ? (
              <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            onClick={onOpenCheckout}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Till kassan
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
            Quantic Microsoft portal
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
              Draft
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Köp Microsoft licenser enkelt och tryggt
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Välj licenser, ange antal och skicka beställning. Perfekt även om ni
            redan har andra licenser och bara vill komplettera.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={onPrimary}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Se licenser
            </button>
            <button
              onClick={onSecondary}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Se paket
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MiniStat title="Snabb order" text="Skicka beställning på 2 min" />
            <MiniStat title="Rätt licens" text="Få stöd om ni vill" />
            <MiniStat title="Skalbart" text="Redo för Arrow integration" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Populärt just nu</div>
              <div className="text-xs text-slate-600">
                Snabba val som många beställer
              </div>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              Uppdateras enkelt
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <HighlightRow
              title="Microsoft 365 Business Premium"
              sub="Komplett för SMB"
            />
            <HighlightRow
              title="Power BI Pro"
              sub="Delning och samarbete i BI"
            />
            <HighlightRow
              title="Microsoft Entra ID P2"
              sub="PIM och avancerad åtkomst"
            />
            <div className="pt-2 text-xs text-slate-600">
              Tips. Ni kan visa priser här senare eller hålla det som offertläge
              i början.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold tracking-tight">Så funkar det</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StepCard
            title="1. Välj licenser"
            text="Sök och filtrera. Lägg i varukorgen och ange antal."
          />
          <StepCard
            title="2. Skicka beställning"
            text="Fyll i företagets uppgifter och önskat startdatum."
          />
          <StepCard
            title="3. Vi levererar"
            text="Vi verifierar och aktiverar. Ni får tydlig återkoppling."
          />
        </div>
      </div>
    </section>
  );
}

function Packages({ onSelect }: { onSelect: (ids: string[]) => void }) {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Våra vanligaste paket
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Paket är ett snabbt sätt att välja. Ni kan alltid komplettera med
            enskilda licenser.
          </p>
        </div>
        <div className="text-xs text-slate-600">
          Alla paket är klickbara i denna draft.
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PackageCard
          name="Start"
          badge="Enkelt"
          desc="För mindre team som vill ha en stabil bas."
          includes={[
            "Microsoft 365 Business Premium",
            "Valfritt. Exchange Plan 2 vid behov",
          ]}
          cta="Välj paket"
          onClick={() => onSelect(["m365-bp"])}
        />
        <PackageCard
          name="Secure Workplace"
          badge="Mest populär"
          desc="Komplett arbetsplats med högre säkerhet och kontroll."
          includes={[
            "Microsoft 365 Business Premium",
            "Defender for Endpoint P2",
            "Entra ID P2",
          ]}
          cta="Välj paket"
          onClick={() =>
            onSelect(["m365-bp", "defender-endpoint-p2", "entra-p2"])
          }
        />
        <PackageCard
          name="Enterprise"
          badge="Enterprise"
          desc="För större organisationer och högre krav på styrning."
          includes={[
            "Microsoft 365 E3 EEA",
            "Defender Suite",
            "Purview",
          ]}
          cta="Välj paket"
          onClick={() => onSelect(["m365-e3-eea", "defender-suite", "purview"])}
        />
        <PackageCard
          name="Data och automation"
          badge="Business value"
          desc="För analys, appar och projektstyrning."
          includes={[
            "Power BI Pro",
            "Power Apps Premium",
            "Project Plan 3 eller Plan 5",
          ]}
          cta="Välj paket"
          onClick={() =>
            onSelect(["power-bi-pro", "power-apps-premium", "project-p3"])
          }
        />
      </div>
    </section>
  );
}

function LicenseCard({
  license,
  onAdd,
  onCompare,
}: {
  license: License;
  onAdd: () => void;
  onCompare: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-slate-600">{license.category}</div>
          <h3 className="mt-1 text-base font-semibold leading-snug">
            {license.name}
          </h3>
        </div>
        {license.badge ? <Badge text={license.badge} /> : null}
      </div>

      <p className="mt-3 text-sm text-slate-600">{license.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {license.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
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
          <span className="text-xs text-slate-600">Klickbar</span>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={onAdd}
          className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Lägg i varukorg
        </button>
        <button
          onClick={onCompare}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
        >
          Jämför
        </button>
      </div>
    </div>
  );
}

function CartDrawer({
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
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Stäng
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Varukorgen är tom. Lägg till licenser från katalogen.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ lic, qty }) => (
                <div
                  key={lic.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-600">{lic.category}</div>
                      <div className="mt-1 text-sm font-semibold">{lic.name}</div>
                      <div className="mt-1 text-xs text-slate-600">
                        {lic.priceHint ?? "Pris på förfrågan"}
                      </div>
                    </div>
                    {lic.badge ? <Badge text={lic.badge} /> : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-slate-600">Antal</div>
                    <div className="flex items-center gap-2">
                      <button
                        className="h-9 w-9 rounded-xl border border-slate-200 hover:bg-slate-50"
                        onClick={() => onQtyChange(lic.id, qty - 1)}
                      >
                        -
                      </button>
                      <input
                        value={qty}
                        onChange={(e) =>
                          onQtyChange(lic.id, Number(e.target.value))
                        }
                        className="h-9 w-16 rounded-xl border border-slate-200 text-center text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                      <button
                        className="h-9 w-9 rounded-xl border border-slate-200 hover:bg-slate-50"
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
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Töm varukorg
            </button>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className={classNames(
                "flex-1 rounded-xl px-4 py-2 text-sm font-medium text-white",
                items.length === 0
                  ? "bg-slate-300"
                  : "bg-slate-900 hover:bg-slate-800"
              )}
            >
              Till kassan
            </button>
          </div>

          {checkoutOpen ? <CheckoutForm items={items} /> : null}
        </div>
      </aside>
    </div>
  );
}

function CheckoutForm({ items }: { items: Array<{ lic: License; qty: number }> }) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm font-semibold">Kassa</div>
      <div className="mt-1 text-xs text-slate-600">
        Detta är en mock. Koppla senare till Arrow och order API.
      </div>

      <div className="mt-3 space-y-2 text-xs text-slate-700">
        {items.map((i) => (
          <div key={i.lic.id} className="flex justify-between">
            <span className="truncate pr-2">
              {i.qty} st {i.lic.name}
            </span>
            <span className="text-slate-500">Beställning</span>
          </div>
        ))}
      </div>

      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            "Order skickad som mock. Nästa steg är att koppla till backend och skicka order till Arrow."
          );
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Företag"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />
          <input
            required
            placeholder="Organisationsnummer"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Kontakt e post"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Tenant domain, till exempel contoso.com"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Önskat startdatum"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <label className="flex items-start gap-2 text-xs text-slate-700">
          <input type="checkbox" required className="mt-0.5 h-4 w-4" />
          Jag godkänner villkor och att Quantic hanterar beställningen enligt
          integritetspolicy.
        </label>

        <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          Skicka beställning
        </button>
      </form>
    </div>
  );
}

function FilterChip({
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
        "rounded-full px-3 py-1 text-sm",
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      )}
    >
      {label}
    </button>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
      {text}
    </span>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{text}</div>
    </div>
  );
}

function MiniStat({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{text}</div>
    </div>
  );
}

function HighlightRow({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-slate-600">{sub}</div>
      </div>
      <div className="h-9 w-9 rounded-xl bg-slate-100" />
    </div>
  );
}

function PackageCard({
  name,
  badge,
  desc,
  includes,
  cta,
  onClick,
}: {
  name: string;
  badge: string;
  desc: string;
  includes: string[];
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-slate-600">Paket</div>
          <div className="mt-1 text-xl font-semibold tracking-tight">{name}</div>
        </div>
        <Badge text={badge} />
      </div>

      <p className="mt-3 text-sm text-slate-600">{desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {includes.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
            <span>{x}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        {cta}
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Quantic</div>
            <div className="mt-1 text-sm text-slate-600">
              Microsoft portal draft. Byggs för att senare kopplas till Arrow.
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
