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
  badge?: string;
  priceHint?: string;
};

const BRAND = {
  accent: "#DC2626",
  accentSoft: "rgba(220, 38, 38, 0.14)",
  accentSoft2: "rgba(220, 38, 38, 0.08)",
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
      "Teams för chatt och möten. Relevans när man vill köpa Teams fristående.",
    tags: ["Teams", "Möten"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "teams-phone-eea",
    name: "Microsoft Teams Phone EEA",
    category: "Collaboration",
    short:
      "Telefoni i Teams. För er som vill ersätta eller komplettera växel.",
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
    short: "E-post och kalender i molnet. Basnivå för de flesta behov.",
    tags: ["Email", "Calendar"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "exo-p2",
    name: "Exchange Online Plan 2",
    category: "Email",
    short: "E-post i molnet med mer avancerade funktioner och större flexibilitet.",
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
      "AI-assistent i Microsoft 365 som hjälper er arbeta snabbare i Outlook, Teams och Office.",
    tags: ["AI", "Add-on"],
    badge: "Add-on",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "power-bi-pro",
    name: "Power BI Pro",
    category: "Data and Automation",
    short:
      "Dela och samarbeta i rapporter och dashboards. Standardval för BI i Microsoft-ekosystemet.",
    tags: ["BI", "Analytics"],
    badge: "Populär",
    priceHint: "Pris på förfrågan",
  },
  {
    id: "power-apps-premium",
    name: "Power Apps Premium",
    category: "Data and Automation",
    short:
      "Bygg appar snabbt med low-code med premium connectors och bättre möjligheter för integration.",
    tags: ["Low-code", "Apps", "Automation"],
    priceHint: "Pris på förfrågan",
  },
  {
    id: "project-p3",
    name: "Planner and Project Plan 3",
    category: "Data and Automation",
    short:
      "Projektplanering för team och projektledare. Lagom nivå jämfört med Plan 5.",
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

const PACKS = [
  {
    id: "pack-njord-employee",
    name: "Njord Employee Pack",
    includesLabel: "Business Premium + Defender Suite + Purview",
    badge: "Bas",
    note: "Standardpaket för alla anställda på Njord Survey.",
    bullets: [
      "Microsoft 365 Business Premium",
      "Microsoft Defender Suite",
      "Microsoft Purview",
    ],
  },
  {
    id: "pack-njord-ai-productivity",
    name: "Njord AI Productivity Pack",
    includesLabel: "Microsoft 365 Copilot",
    badge: "Add-on",
    note: "AI-tillägg för utvalda roller. Tillägg till Njord Employee Pack.",
    bullets: ["Microsoft 365 Copilot"],
  },
  {
    id: "pack-secure-workplace",
    name: "Secure Workplace Pack",
    includesLabel: "Microsoft Intune Suite",
    badge: "Add-on",
    note:
      "Tillägg till Njord Employee Pack för roller och enheter med högre säkerhetskrav.",
    bullets: ["Microsoft Intune Suite"],
  },
  {
    id: "pack-data-automation",
    name: "Data and Automation Pack",
    includesLabel: "Power BI Pro + Power Apps Premium + Project Plan 3",
    badge: "Add-on",
    note: "Tillägg till Njord Employee Pack för analys, planering och automation.",
    bullets: ["Power BI Pro", "Power Apps Premium", "Project Plan 3"],
  },
] as const;

type PackId = (typeof PACKS)[number]["id"];

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatQty(qty: number) {
  return Number.isFinite(qty) && qty > 0 ? qty : 1;
}

type CartRow =
  | {
      kind: "pack";
      id: string;
      name: string;
      includesLabel: string;
      includes: readonly string[];
      qty: number;
    }
  | {
      kind: "license";
      id: string;
      lic: License;
      qty: number;
    };

export default function NjordLicensePortalV3() {
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

      const matchesPopular = onlyPopular ? Boolean(l.badge) : true;

      const matchesQuery = q
        ? l.name.toLowerCase().includes(q) ||
          l.short.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
        : true;

      return matchesCategory && matchesPopular && matchesQuery;
    });
  }, [query, activeCategory, onlyPopular]);

  const cartItems = useMemo((): CartRow[] => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const pack = PACKS.find((p) => p.id === id);
        if (pack) {
          return {
            kind: "pack",
            id: pack.id,
            name: pack.name,
            includesLabel: pack.includesLabel,
            includes: [...pack.bullets],
            qty: formatQty(qty),
          } as CartRow;
        }

        const lic = LICENSES.find((l) => l.id === id);
        if (!lic) return null;

        return { kind: "license", id, lic, qty: formatQty(qty) } as CartRow;
      })
      .filter(Boolean) as CartRow[];
  }, [cart]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      if (item.kind === "pack") return sum;
      return sum + item.qty;
    }, 0);
  }, [cartItems]);

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setCartOpen(true);
  }

  function addPackToCart(packId: PackId) {
    setCart((prev) => ({ ...prev, [packId]: (prev[packId] ?? 0) + 1 }));
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
          onPrimary={() =>
            document
              .getElementById("catalog")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onSecondary={() =>
            document
              .getElementById("packages")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onAddPack={addPackToCart}
          onAddLicense={addToCart}
        />

        <TrustStrip />

        <Packages onSelectPack={addPackToCart} />

        <section id="catalog" className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold tracking-tight">Licenser</h2>
              <p className="mt-1 text-sm text-slate-600">
                Välj licenser och tillägg. Lägg i varukorgen och skicka
                beställning.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök. Till exempel E3, Intune, Defender"
                className="w-full md:w-[420px] rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />

              <label className="flex items-center gap-2 text-sm text-slate-700 select-none whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={onlyPopular}
                  onChange={(e) => setOnlyPopular(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Visa filtrerat
              </label>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
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

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {results.map((lic) => (
              <LicenseCard
                key={lic.id}
                license={lic}
                onAdd={() => addToCart(lic.id)}
              />
            ))}
          </div>
        </section>

        <Contact />
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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="
              flex items-center justify-center
              h-10
              max-w-[7rem] sm:max-w-[8rem]
              px-3
              rounded-xl
              border border-slate-200
              bg-white
              shadow-sm
            "
          >
            <img
              src="/njord-logo.png"
              alt="Njord Survey"
              className="h-full max-h-6 w-auto max-w-full object-contain"
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold">Njord Survey</div>
            <div className="text-xs text-slate-600">License portal</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <a className="hover:text-slate-900" href="#packages">
            Paket
          </a>
          <a className="hover:text-slate-900" href="#catalog">
            Licenser
          </a>
          <a className="hover:text-slate-900" href="/befintliga-licenser">
            Befintliga licenser
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

function Hero({
  onPrimary,
  onSecondary,
  onAddPack,
  onAddLicense,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
  onAddPack: (id: PackId) => void;
  onAddLicense: (id: string) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Microsoft licenser för Njord
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-600">
            Portal för beställning av paket och tillägg. Välj licenser, lägg i
            varukorgen och skicka beställning.
          </p>

          <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
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
            <MiniStat title="Tydligt" text="Paket, tillägg och licenser på samma ställe" />
            <MiniStat title="Snabbt" text="Beställning med varukorg och kassa" />
            <MiniStat title="Tryggt" text="Paket som matchar Njords upplägg" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div
            className="rounded-2xl border border-slate-200 p-4"
            style={{ backgroundColor: BRAND.accentSoft2 }}
          >
            <div>
              <div className="text-sm font-semibold">Populära val</div>
              <div className="text-xs text-slate-600">
                Snabba val för paket och vanliga tillägg
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <PopularRow
                title="Njord Employee Pack"
                sub="Business Premium + Defender Suite + Purview"
                onAdd={() => onAddPack("pack-njord-employee")}
              />
              <PopularRow
                title="Njord AI Productivity Pack"
                sub="Microsoft 365 Copilot"
                onAdd={() => onAddPack("pack-njord-ai-productivity")}
              />
              <PopularRow
                title="Power BI Pro"
                sub="Licens per användare"
                onAdd={() => onAddLicense("power-bi-pro")}
              />
              <PopularRow
                title="Project Plan 3"
                sub="Licens per användare"
                onAdd={() => onAddLicense("project-p3")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularRow({
  title,
  sub,
  onAdd,
}: {
  title: string;
  sub: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4">
      <div className="min-w-0">
        <div className="text-sm font-semibold truncate">{title}</div>
        <div className="text-xs text-slate-600 truncate">{sub}</div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="shrink-0 rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        style={{ backgroundColor: BRAND.accent }}
      >
        Lägg till
      </button>
    </div>
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
            title="Tydlig återkoppling"
            text="Vi bekräftar order, antal och startdatum."
          />
          <TrustCard
            title="Tillägg som passar"
            text="AI, säkerhet och automation kan läggas på per roll."
          />
        </div>
      </div>
    </section>
  );
}

function Packages({ onSelectPack }: { onSelectPack: (packId: PackId) => void }) {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Paket</h2>
          <p className="mt-1 text-sm text-slate-600">
            Bas och tillägg. Tydligt och anpassat för Njord.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 items-stretch">
        {PACKS.map((p) => (
          <PackageCard
            key={p.id}
            name={p.name}
            badge={p.badge}
            desc={p.note}
            includes={p.bullets}
            onClick={() => onSelectPack(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PackageCard({
  name,
  badge,
  desc,
  includes,
  onClick,
}: {
  name: string;
  badge: string;
  desc: string;
  includes: readonly string[];
  onClick: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col h-full">
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

      {/* Spacer så knappen hamnar längst ner och blir prydligt alignad */}
      <div className="mt-auto" />

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

function LicenseCard({
  license,
  onAdd,
}: {
  license: License;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-600">{license.category}</div>
          <h3 className="mt-1 text-sm font-semibold leading-snug">
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
      </div>

      <div className="mt-auto pt-5 flex items-center gap-2">
        <button
          onClick={onAdd}
          className="flex-1 rounded-2xl px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: BRAND.accent }}
        >
          Lägg i varukorg
        </button>
        <button
          onClick={() => alert("Jämförvy kan läggas till vid behov.")}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
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
  items: CartRow[];
  onQtyChange: (id: string, qty: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  checkoutOpen: boolean;
}) {
  const [expandedPacks, setExpandedPacks] = useState<Record<string, boolean>>({});

  // Endast ett paket öppet i taget
  function togglePack(id: string) {
    setExpandedPacks((prev) => {
      const willOpen = !prev[id];
      return willOpen ? { [id]: true } : {};
    });
  }

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50",
        open ? "" : "pointer-events-none"
      )}
    >
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
        <div className="flex h-full flex-col">
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

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div
                className="rounded-3xl border border-slate-200 p-4 text-sm text-slate-700"
                style={{ backgroundColor: BRAND.accentSoft2 }}
              >
                Varukorgen är tom. Lägg till paket eller licenser.
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((item) => {
                  if (item.kind === "pack") {
                    const isOpen = Boolean(expandedPacks[item.id]);

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 p-3"
                        style={{ backgroundColor: BRAND.accentSoft2 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[11px] text-slate-600">Paket</div>
                            <div className="mt-0.5 text-sm font-semibold truncate">
                              {item.name}
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <div className="text-xs text-slate-700">
                                Ingår. {item.includesLabel}
                              </div>

                              <button
                                type="button"
                                onClick={() => togglePack(item.id)}
                                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                              >
                                {isOpen ? "Dölj innehåll" : "Visa innehåll"}
                              </button>
                            </div>
                          </div>

                          <Badge text="Paket" />
                        </div>

                        {isOpen ? (
                          <ul className="mt-2 space-y-1 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                            {item.includes.map((x) => (
                              <li key={x} className="flex gap-2">
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: BRAND.dark }}
                                />
                                <span className="min-w-0">{x}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-[11px] text-slate-600">Antal</div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50"
                              onClick={() => onQtyChange(item.id, item.qty - 1)}
                            >
                              -
                            </button>
                            <input
                              value={item.qty}
                              onChange={(e) =>
                                onQtyChange(item.id, Number(e.target.value))
                              }
                              className="h-8 w-14 rounded-xl border border-slate-200 text-center text-sm outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <button
                              type="button"
                              className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50"
                              onClick={() => onQtyChange(item.id, item.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] text-slate-600">
                            {item.lic.category}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold truncate">
                            {item.lic.name}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-600">
                            {item.lic.priceHint ?? "Pris på förfrågan"}
                          </div>
                        </div>
                        {item.lic.badge ? <Badge text={item.lic.badge} /> : null}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-[11px] text-slate-600">Antal</div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50"
                            onClick={() => onQtyChange(item.id, item.qty - 1)}
                          >
                            -
                          </button>
                          <input
                            value={item.qty}
                            onChange={(e) =>
                              onQtyChange(item.id, Number(e.target.value))
                            }
                            className="h-8 w-14 rounded-xl border border-slate-200 text-center text-sm outline-none focus:ring-2 focus:ring-slate-200"
                          />
                          <button
                            type="button"
                            className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-50"
                            onClick={() => onQtyChange(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-2">
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
                style={
                  items.length === 0 ? undefined : { backgroundColor: BRAND.accent }
                }
              >
                Till kassan
              </button>
            </div>

            {checkoutOpen ? <CheckoutForm items={items} /> : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

function CheckoutForm({ items }: { items: CartRow[] }) {
  return (
    <div
      className="mt-4 rounded-3xl border border-slate-200 p-4"
      style={{ backgroundColor: BRAND.accentSoft2 }}
    >
      <div className="text-sm font-semibold">Kassa</div>
      <div className="mt-1 text-xs text-slate-600">
        Skicka beställning så återkopplar vi med bekräftelse och startdatum.
      </div>

      <div className="mt-3 space-y-2 text-xs text-slate-700">
        {items.map((i) => (
          <div key={i.id} className="flex justify-between gap-3">
            <span className="truncate">
              {i.qty} st {i.kind === "pack" ? i.name : i.lic.name}
            </span>
            <span className="text-slate-500 whitespace-nowrap">Orderrad</span>
          </div>
        ))}
      </div>

      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Tack. Beställningen är mottagen.");
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
          placeholder="Kontakt e-post"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Tenant domän, till exempel contoso.com"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <input
          placeholder="Önskat startdatum"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        <label className="flex items-start gap-2 text-xs text-slate-700">
          <input type="checkbox" required className="mt-0.5 h-4 w-4" />
          Jag godkänner villkor och att beställningen hanteras enligt policy.
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

function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function sendMail() {
    const to = "info@quantic.se";
    const subject = encodeURIComponent("Kontakt via Njord License Portal");
    const body = encodeURIComponent(
      `Namn: ${name}\nFöretag: ${company}\nE-post: ${email}\n\nMeddelande:\n${message}\n`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Kontakt</h2>
            <p className="mt-1 text-sm text-slate-600">
              Skriv kort vad ni behöver hjälp med, så återkopplar vi så snabbt vi
              kan.
            </p>
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMail();
            }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Namn"
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Företag"
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Njord Survey</div>
            <div className="mt-1 text-sm text-slate-600">
              Licensportal för beställning av paket och tillägg.
            </div>
          </div>

          <div className="flex gap-4 text-sm text-slate-700">
            <a className="hover:text-slate-900" href="#catalog">
              Licenser
            </a>
            <a className="hover:text-slate-900" href="#packages">
              Paket
            </a>
            <a className="hover:text-slate-900" href="/befintliga-licenser">
              Befintliga licenser
            </a>
            <a className="hover:text-slate-900" href="#contact">
              Kontakt
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600">Powered by</div>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <img
                src="/arrow-logo.png"
                alt="Arrow"
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
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
        "rounded-full px-3 py-1 text-sm transition",
        active ? "text-white" : "text-slate-700 hover:bg-slate-100"
      )}
      style={
        active
          ? { backgroundColor: BRAND.dark }
          : { backgroundColor: BRAND.accentSoft2 }
      }
    >
      {label}
    </button>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium text-white whitespace-nowrap"
      style={{ backgroundColor: BRAND.dark }}
    >
      {text}
    </span>
  );
}

function MiniStat({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{text}</div>
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

