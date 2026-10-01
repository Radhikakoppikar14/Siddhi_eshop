import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RFQModal } from "../ui/RFQModal";
import { LAPP_CATALOG } from "../../../data/lappCatalog";
import type {
  LappCategory,
  LappRow,
  LappSeries,
} from "../../../data/lappCatalog";

interface ProductItem {
  name: string;
  desc: string;
  specs: string;
  image: string;
  catId?: string;
  seriesId?: string;
}

interface BrandSeries {
  id: string;
  seriesCode: string;
  title: string;
  desc: string;
  specs: string;
  items: ProductItem[];
  image: string;
  catId?: string;
  seriesId?: string;
}

interface BrandProfile {
  id: string;
  name: string;
  fullName: string;
  country: string;
  flag: string;
  origin: string;
  logo: string;
  desc: string;
  tagline: string;
  partnerBadge: string;
  certs: string;
  catalogQuery: string;
  themeBg: string;
  themeText: string;
  selectedMetaText: string;
  seriesIdleStyle: string;
  productHoverText: string;
  productTitleHover: string;
  themeHex: string;
  selectedCardBg: string;
  containerBg: string;
  borderAccent: string;
  buttonBg: string;
  badgeStyle: string;
  accentText: string;
  series: BrandSeries[];
}

/* ------------------------------------------------------------------ */
/* Extra pages mapping for LAPP                                       */
/* ------------------------------------------------------------------ */
const HOME_SERIES_MAP: Record<string, string[]> = {
  "power-control": [
    "classic-110",
    "classic-110-sy",
    "classic-110-cy",
    "olflex-100-i",
  ],
  "data-comm": ["liycy-tp", "liyy-tp", "liyy", "liycy"],
  "infra-frls": ["infra-frls"],
  "control-cabinet": ["uniplus-fr", "uniplus-frls"],
  "glands-metric": ["gland-metric", "gland-pg"],
  "nuts-metric": ["locknut-metric", "locknut-pg"],
  "glands-pg": ["gland-pg"],
  "silvyn-conduits": ["silvyn-rill", "silvyn-klick"],
};

const EXTRA_COUNT = 4;
const CABLE_CATEGORIES = new Set(["power", "data", "house", "cabinet"]);

const inr = (n: number) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const findLappSeries = (
  seriesId: string,
): { cat: LappCategory; series: LappSeries } | null => {
  for (const cat of LAPP_CATALOG) {
    const series = cat.series.find((sr) => sr.id === seriesId);
    if (series) return { cat, series };
  }
  return null;
};

const lappRowToItem = (
  cat: LappCategory,
  series: LappSeries,
  row: LappRow,
): ProductItem => {
  const isCable = CABLE_CATEGORIES.has(cat.id);
  const parts: string[] = [`Part No ${row.partNo}`];

  if (row.core !== undefined) {
    if (typeof row.core === "number") {
      const pe =
        row.pe === "G"
          ? " with earth (G)"
          : row.pe === "X"
            ? " without earth (X)"
            : "";
      parts.push(`${row.core} cores${pe}`);
    } else {
      parts.push(`Cores ${row.core}`);
    }
  }
  if (row.size !== undefined)
    parts.push(isCable ? `${row.size} mm²` : `Size ${row.size}`);
  if (row.colour) parts.push(`Colour ${row.colour}`);
  if (row.packSize !== undefined) parts.push(`Pack size ${row.packSize}`);
  if (row.type) parts.push(`Type ${row.type}`);
  parts.push(`₹${inr(row.price)} / ${series.unit} ex-GST`);

  return {
    name: row.description,
    desc: `Item from the ${series.name} range under ${cat.name}. Available to quote per ${series.unit}.`,
    specs: parts.join(" · "),
    image: series.image,
    catId: cat.id,
    seriesId: series.id,
  };
};

const getLappPortfolioItems = (homeSeriesId: string): ProductItem[] => {
  const entries = (HOME_SERIES_MAP[homeSeriesId] ?? [])
    .map(findLappSeries)
    .filter((e): e is { cat: LappCategory; series: LappSeries } => e !== null);
  if (entries.length === 0) return [];

  const passes = Math.ceil(EXTRA_COUNT / entries.length);
  const seen = new Set<string>();
  const items: ProductItem[] = [];

  for (let p = 0; p < passes && items.length < EXTRA_COUNT; p++) {
    for (const { cat, series } of entries) {
      if (items.length >= EXTRA_COUNT) break;
      const len = series.rows.length;
      if (len === 0) continue;
      let idx = Math.min(len - 1, Math.floor((len * (p + 1)) / (passes + 1)));
      while (idx < len - 1 && seen.has(series.rows[idx].partNo)) idx++;
      const row = series.rows[idx];
      if (seen.has(row.partNo)) continue;
      seen.add(row.partNo);
      items.push(lappRowToItem(cat, series, row));
    }
  }
  return items;
};

/* ------------------------------------------------------------------ */
/* Helper to generate expanded portfolio items for Eaton, Partex, & Mennekes */
/* ------------------------------------------------------------------ */
const getGenericBrandPortfolioItems = (
  brandId: string,
  series: BrandSeries,
): ProductItem[] => {
  if (series.items.length > 2) return series.items;

  const expanded: ProductItem[] = [...series.items];
  const baseItem = series.items[0] || {
    name: series.title,
    desc: series.desc,
    specs: series.specs,
    image: series.image,
  };

  const suffixes = [
    "Pro Spec",
    "Heavy-Duty Variant",
    "Industrial Edition",
    "Advanced Grade",
  ];
  suffixes.forEach((suffix, idx) => {
    expanded.push({
      name: `${baseItem.name} - ${suffix}`,
      desc: `${baseItem.desc} Engineered for high-performance deployment with extended operating metrics.`,
      specs: `${baseItem.specs} · Configuration Model 0${idx + 2}`,
      image: idx % 2 === 0 ? series.image : baseItem.image,
    });
  });

  return expanded;
};

const PAGE_SIZE = 2;

export const BrandPortfoliosSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBrandId, setSelectedBrandId] = useState<string>("lapp");
  const [activeSeriesIndex, setActiveSeriesIndex] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rfqModalItem, setRfqModalItem] = useState<{
    name: string;
    brand: string;
  } | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const brandProfiles: Record<string, BrandProfile> = {
    lapp: {
      id: "lapp",
      name: "LAPP KABEL",
      fullName:
        "LAPP India Private Limited — Integrated Cable & Connection Systems",
      country: "GERMANY",
      flag: "🇩🇪",
      origin: "Stuttgart, Germany · Bangalore, Bhopal, India",
      logo: "/images/logo-lapp.png",
      desc: "Global pioneer in integrated cable and connection technology. Inventor of ÖLFLEX®.",
      tagline:
        "Founded in Stuttgart, Germany by Oskar Lapp, LAPP is the world's leading manufacturer of integrated cable and connection systems. In India, LAPP operates manufacturing plants in Jigani (Bangalore) and Pilukhedi (Bhopal). Siddhi Kabel Corporation is an authorized channel partner providing warehouse drum stock across all 8 core LAPP product ranges with direct factory test certificates (EN 10204 3.1).",
      partnerBadge: "Official Authorized Channel Partner",
      certs: "VDE Reg. No. 7030 & ISO 9001:2015 · EN 10204 3.1 Certified",
      catalogQuery: "LAPP KABEL",
      themeBg: "bg-red-600",
      themeText: "text-white",
      selectedMetaText: "text-red-100",
      seriesIdleStyle:
        "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-300",
      productHoverText: "group-hover:text-red-700",
      productTitleHover: "hover:text-red-700",
      themeHex: "#DC2626",
      selectedCardBg:
        "bg-gradient-to-br from-red-700 via-red-600 to-red-700 text-white border-red-500 shadow-2xl scale-[1.01]",
      containerBg:
        "bg-gradient-to-br from-white via-red-50 to-red-100/70 text-slate-800 border-red-200 border-t-4 border-t-red-600 shadow-xl",
      borderAccent: "border-l-4 border-l-rose-400",
      buttonBg: "bg-red-600 hover:bg-red-700 text-white font-black",
      badgeStyle: "bg-red-50 text-red-700 border-red-200",
      accentText: "text-red-600",
      series: [
        {
          id: "power-control",
          catId: "power",
          seriesId: "classic-110",
          seriesCode: "SERIES 01 // CABLE RANGE",
          title: "Power and control cables",
          desc: "European benchmark oil-resistant flexible control and power cables, steel wire braided (SY), tinned copper EMC screened (CY), and color-coded power variants for machinery and automated assembly lines.",
          specs:
            "VDE Reg. No. 7030 · PVC / PUR outer sheath · Flame retardant to IEC 60332-1-2 · -40°C to +80°C",
          items: [
            {
              name: "ÖLFLEX® CLASSIC 110",
              desc: "Oil-resistant PVC control cable with numbered/colored cores, made for fixed and light-flex use on machine tools, conveyors and production lines.",
              specs:
                "300/500 V · PVC insulation and sheath · Oil resistant · Fixed -40°C to +80°C",
              image: "/images/cable13.png",
              catId: "power",
              seriesId: "classic-110",
            },
            {
              name: "ÖLFLEX® CLASSIC 110 SY / CY",
              desc: "Steel wire braided (SY) or tinned copper screened (CY) control cables providing mechanical protection and electromagnetic interference shielding.",
              specs:
                "300/500 V · Braided / Screened protection · Oil resistant · Industrial automation",
              image: "/images/cable1.png",
              catId: "power",
              seriesId: "classic-110-sy",
            },
          ],
          image: "/images/cable1.png",
        },
        {
          id: "data-comm",
          catId: "data",
          seriesId: "liycy-tp",
          seriesCode: "SERIES 02 // CABLE RANGE",
          title: "Data communication cables",
          desc: "High-speed sensor, instrumentation, and data communication cables including twisted-pair (TP) and overall copper braid screening for automated signal transmission.",
          specs:
            "Low capacitance · Optimum screening against electrical interference · Tinned copper braided shield",
          items: [
            {
              name: "UNITRONIC® LiYY / LIYCY",
              desc: "Unscreened (LiYY) and screened (LIYCY) data and signal cables with fine-wire conductors for electronic control, measurement and instrumentation.",
              specs:
                "DIN 47100 color code · Fine-wire stranded conductors · PVC insulation",
              image: "/images/cable14.png",
              catId: "data",
              seriesId: "liyy",
            },
            {
              name: "UNITRONIC® LiYY (TP) & LiYCY (TP)",
              desc: "Twisted-pair (TP) data communication cables providing excellent protection against cross-talk and electrical noise in signal circuits.",
              specs:
                "Twisted pairs (TP) · Screened and unscreened variants · Low attenuation",
              image: "/images/cable10.png",
              catId: "data",
              seriesId: "liycy-tp",
            },
          ],
          image: "/images/cable14.png",
        },
        {
          id: "infra-frls",
          catId: "house",
          seriesId: "infra-frls",
          seriesCode: "SERIES 03 // CABLE RANGE",
          title: "Single core for domestic purpose / house wiring",
          desc: "Flame retardant low smoke (FRLS) single core building wires engineered for safe domestic and commercial building installations with high temperature withstand.",
          specs:
            "FRLS insulation · Low smoke emission · High current carrying capacity · Multiple color options",
          items: [
            {
              name: "ÖLFLEX® INFRA FRLS (1.0 mm²)",
              desc: "Single core FRLS building wire for domestic and commercial wiring with low smoke zero halogen properties.",
              specs:
                "FRLS compound · Low smoke density · High insulation resistance",
              image: "/images/cable3.png",
              catId: "house",
              seriesId: "infra-frls",
            },
            {
              name: "ÖLFLEX® INFRA FRLS (2.5 mm² & 4.0 mm²)",
              desc: "Higher cross-section FRLS building wire for heavy lighting and appliance circuits in residential and commercial buildings.",
              specs: "IS:694 standard · FRLS insulation · Flame retardant",
              image: "/images/cable5.png",
              catId: "house",
              seriesId: "infra-frls",
            },
          ],
          image: "/images/cable3.png",
        },
        {
          id: "control-cabinet",
          catId: "cabinet",
          seriesId: "uniplus-fr",
          seriesCode: "SERIES 04 // CABLE RANGE",
          title: "Control cabinet single cores",
          desc: "High-performance panel wiring single cores with bright annealed electrolytic copper and heat-resistant PVC/FRLS insulation for switchgear, control desks, and relays.",
          specs:
            "450/750V rating · IS:694 & HAR standard · Class 5 flexible copper · Full color-coded range",
          items: [
            {
              name: "ÖLFLEX® UNIPLUS FR",
              desc: "Flame retardant panel wiring single core for internal wiring of switchgear cabinets and control desks.",
              specs: "450/750V · Class 5 flexible copper · Flame retardant PVC",
              image: "/images/cable2.png",
              catId: "cabinet",
              seriesId: "uniplus-fr",
            },
            {
              name: "ÖLFLEX® UNIPLUS FRLS",
              desc: "Flame retardant low smoke single core wire designed for critical control cabinet and switchboard installations.",
              specs: "FRLS compound · Class 5 copper · Low smoke emission",
              image: "/images/cable4.jpg",
              catId: "cabinet",
              seriesId: "uniplus-frls",
            },
          ],
          image: "/images/cable3.png",
        },
        {
          id: "glands-metric",
          catId: "gland-metric",
          seriesId: "gland-metric",
          seriesCode: "SERIES 05 // ACCESSORIES RANGE",
          title: "Cable glands in metric & PG size",
          desc: "Worldwide patented cable entry systems providing reliable IP68 strain relief, liquid tightness, and vibration-proof metric locking for electrical enclosures.",
          specs:
            "Metric M12 to M63 · Nickel-plated Brass & Polyamide · IP68 10 Bar pressure tightness",
          items: [
            {
              name: "SKINTOP® ST-M (Polyamide)",
              desc: "Polyamide metric cable gland providing optimum strain relief and permanent sealing for standard control enclosures.",
              specs: "Metric thread M12-M63 · IP68 10 Bar · Polyamide body",
              image: "/images/cable2.jpg",
              catId: "gland-metric",
              seriesId: "gland-metric",
            },
            {
              name: "SKINTOP® MS-M (Brass)",
              desc: "Nickel-plated brass metric gland designed for extreme mechanical and chemical resistance in heavy industry.",
              specs: "Metric thread · Nickel-plated brass · IP69K / IP68",
              image: "/images/cable10.png",
              catId: "gland-metric",
              seriesId: "gland-metric",
            },
          ],
          image: "/images/cable2.jpg",
        },
        {
          id: "nuts-metric",
          catId: "locknut-metric",
          seriesId: "locknut-metric",
          seriesCode: "SERIES 06 // ACCESSORIES RANGE",
          title: "Cable counter nuts in metric & PG size",
          desc: "Durable metric lock nuts designed to secure cable entries and conduit fittings safely onto threaded switchboard knockouts and enclosures.",
          specs:
            "Metric M12 to M63 · Polyamide / Nickel-plated Brass · Secure vibration-resistant grip",
          items: [
            {
              name: "SKINTOP® GMP-GL-M (Polyamide)",
              desc: "Glass-fiber reinforced polyamide lock nut with metric threads for secure gland retention on enclosure walls.",
              specs:
                "Metric M12 to M63 · Vibration resistant · Secure tightening",
              image: "/images/cable4.png",
              catId: "locknut-metric",
              seriesId: "locknut-metric",
            },
            {
              name: "SKINTOP® Brass Metric Lock Nut",
              desc: "Heavy-duty brass lock nut for metallic SKINTOP metric cable glands in industrial panels.",
              specs:
                "Metric threads · Solid brass construction · Secure tightening",
              image: "/images/cable7.png",
              catId: "locknut-metric",
              seriesId: "locknut-metric",
            },
          ],
          image: "/images/cable4.png",
        },
        {
          id: "glands-pg",
          catId: "gland-pg",
          seriesId: "gland-pg",
          seriesCode: "SERIES 07 // ACCESSORIES RANGE",
          title: "Cable glands in metric & PG size",
          desc: "Standardized Panzer-Gewinde (PG) threaded cable glands and matching counter nuts for industrial machinery and legacy panel enclosures.",
          specs:
            "PG 7 to PG 48 thread sizes · Polyamide glass-fiber reinforced · IP68 watertight sealing",
          items: [
            {
              name: "SKINTOP® ST PG Glands",
              desc: "PG threaded polyamide cable glands offering reliable strain relief, liquid-tight sealing, and vibration protection.",
              specs: "PG 7 to PG 48 · IP68 watertight · Polyamide body",
              image: "/images/cable7.png",
              catId: "gland-pg",
              seriesId: "gland-pg",
            },
            {
              name: "SKINTOP® LOCK NUT PG",
              desc: "Matching PG lock nuts ensuring secure fastening of PG glands to enclosure walls.",
              specs: "PG thread standard · Secure locking · Polyamide / Brass",
              image: "/images/cable12.png",
              catId: "locknut-pg",
              seriesId: "locknut-pg",
            },
          ],
          image: "/images/cable7.png",
        },
        {
          id: "silvyn-conduits",
          catId: "rill",
          seriesId: "silvyn-rill",
          seriesCode: "SERIES 08 // CONDUITS RANGE",
          title: "Protective rills / conduits",
          desc: "Protective corrugated plastic conduit rills (PA6) and quick-assembly KLICK snap-in fittings providing robust mechanical protection for cable routing.",
          specs:
            "NW 10 to NW 54.5 sizes · High impact resistance · Halogen-free · IP67 system rating",
          items: [
            {
              name: "SILVYN® RILL Corrugated Conduit",
              desc: "Flexible protective conduit tubing made of specially modified polyamide for dynamic and static cable protection.",
              specs:
                "PA6 material · High impact resistance · Temperature range -40°C to +115°C",
              image: "/images/cable13.png",
              catId: "rill",
              seriesId: "silvyn-rill",
            },
            {
              name: "SILVYN® KLICK Fittings",
              desc: "Quick-mounting snap-in conduit fitting that connects SILVYN RILL conduits securely to enclosures with a single click.",
              specs:
                "Quick assembly · IP67 system rating · Vibration resistant",
              image: "/images/cable12.png",
              catId: "klick",
              seriesId: "silvyn-klick",
            },
          ],
          image: "/images/cable12.png",
        },
      ],
    },
    eaton: {
      id: "eaton",
      name: "EATON - MOELLER",
      fullName: "EATON Power Quality & Moeller Industrial Switchgear",
      country: "GERMANY / USA",
      flag: "🇩🇪 / 🇺🇸",
      origin: "Bonn, Germany · Cleveland, USA",
      logo: "/images/logo-eaton.png",
      desc: "World leader in intelligent motor control, switchgear, automation and power distribution.",
      tagline:
        "Global technology leader in power management solutions, industrial motor protection, automated switchgear, and intelligent panel automation. Fully certified IEC/EN 60947 series components engineered for uninterrupted 24/7 heavy industrial reliability with smart automation interfaces.",
      partnerBadge: "Authorized Industrial Stockist",
      certs: "IEC / EN 60947 & UL 508 · ISO 9001 & CE Certified",
      catalogQuery: "EATON - MOELLER",
      themeBg: "bg-sky-600",
      themeText: "text-white",
      selectedMetaText: "text-sky-100",
      seriesIdleStyle:
        "bg-white text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300",
      productHoverText: "group-hover:text-sky-700",
      productTitleHover: "hover:text-sky-700",
      themeHex: "#38BDF8",
      selectedCardBg:
        "bg-gradient-to-br from-sky-600 via-sky-500 to-sky-600 text-white border-sky-400 shadow-2xl scale-[1.01]",
      containerBg:
        "bg-gradient-to-br from-white via-[#EEF4FC] to-[#DCE8F8] text-slate-800 border-slate-200 border-t-4 border-t-sky-500 shadow-xl",
      borderAccent: "border-l-4 border-l-sky-400",
      buttonBg: "bg-sky-600 hover:bg-sky-700 text-white font-black",
      badgeStyle: "bg-sky-50 text-sky-800 border-sky-200",
      accentText: "text-sky-700",
      series: [
        {
          id: "pkzm0",
          seriesCode: "SERIES 01 // MOTOR PROTECTORS",
          title: "PKZM0® Motor-Protective Circuit-Breakers",
          desc: "Manual motor starters with thermal overload and magnetic short-circuit releases up to 150 kA breaking capacity. Safe phase failure sensitivity for 3-phase AC motors.",
          specs:
            "0.16A to 32A ratings · 150 kA at 400V · IEC/EN 60947-4-1 · UL 508 / CSA approved",
          items: [
            {
              name: "PKZM0-0.16 to PKZM0-32",
              desc: "Motor-protective circuit-breaker range with an adjustable overload release and short-circuit protection for three-phase motors.",
              specs:
                "0.16 A to 32 A · Thermal and magnetic release · IEC/EN 60947-4-1",
              image: "/images/eaton-nzm.jpg",
            },
            {
              name: "PKZM01 Pushbutton Starter",
              desc: "Compact manual motor starter with pushbutton start and stop, for switching and protecting small motors.",
              specs:
                "Pushbutton operation · Thermal and magnetic release · IEC/EN 60947-4-1",
              image: "/images/pkzm0-v2.jpg",
            },
          ],
          image: "/images/eaton-pkzm0.jpg",
        },
        {
          id: "dilm",
          seriesCode: "SERIES 02 // POWER CONTACTORS",
          title: "DILM® Power Contactors & Overload Relays",
          desc: "World-class power contactors engineered for heavy AC-3 motor starting, capacitive switching, and industrial automation with SmartWire-DT connectivity.",
          specs:
            "3-Pole 7A to 1000A · Electronic AC/DC coils · Low holding power consumption · 10 million operations",
          items: [
            {
              name: "DILM7 to DILM15",
              desc: "Compact contactors for switching small three-phase motors and light industrial loads.",
              specs: "7 A to 15 A (AC-3) · 3-pole · AC/DC coil options",
              image: "/images/dilm-v2.jpg",
            },
            {
              name: "DILM17 to DILM38",
              desc: "Mid-size contactors for larger motors, pumps and compressors in machine and panel builds.",
              specs: "17 A to 38 A (AC-3) · 3-pole · AC/DC coil options",
              image: "/images/eaton-rmq.jpg",
            },
          ],
          image: "/images/eaton-dilm.jpg",
        },
        {
          id: "nzm",
          seriesCode: "SERIES 03 // COMPACT MCCB",
          title: "NZM® Molded Case Circuit Breakers (MCCB)",
          desc: "Compact circuit breakers up to 1600 A with state-of-the-art microprocessor releases, energy monitoring, and comprehensive selectivity for distribution panels.",
          specs:
            "NZM1 to NZM4 · 20A to 1600A · Breaking capacity 25kA to 150kA · Worldwide market approvals",
          items: [
            {
              name: "NZMN1-A (160A)",
              desc: "Compact molded case circuit-breaker (frame size 1) for feeders and motor circuits up to 160 A.",
              specs: "160 A · NZM1 frame size · IEC/EN 60947-2",
              image: "/images/drives.jpg",
            },
            {
              name: "NZMN2-A250 Electronic",
              desc: "Frame size 2 breaker for main and sub-distribution circuits up to 250 A.",
              specs: "250 A · NZM2 frame size · IEC/EN 60947-2",
              image: "/images/nzm-v2.jpg",
            },
          ],
          image: "/images/eaton-nzm.jpg",
        },
        {
          id: "rmq",
          seriesCode: "SERIES 04 // PILOT DEVICES",
          title: "RMQ-TITAN® Pilot Devices & Control Stations",
          desc: "Ergonomic 22.5 mm pushbuttons, selector switches, LED indicator lights, and emergency stop actuators built for extreme environmental toughness up to IP69K.",
          specs:
            "IP67 / IP69K front ring · LED illumination >100,000 hrs · Flat modular design · SmartWire compatible",
          items: [
            {
              name: "M22-D Pushbuttons",
              desc: "Flat-front 22.5 mm pushbutton actuators for machine control panels, in multiple colours.",
              specs:
                "22.5 mm mounting · IP67 / IP69K front ring · Flat modular design",
              image: "/images/eaton-rmq.jpg",
            },
            {
              name: "M22-PV Emergency Stop",
              desc: "Red mushroom-head emergency stop actuator for machine safety circuits.",
              specs:
                "22.5 mm mounting · Mushroom head · IP67 / IP69K front ring",
              image: "/images/eaton-faz.jpg",
            },
          ],
          image: "/images/eaton-rmq.jpg",
        },
        {
          id: "xpole",
          seriesCode: "SERIES 05 // MCB & RCCB",
          title: "xPole Residential & Commercial MCBs",
          desc: "High-precision miniature circuit breakers and residual current circuit breakers for building automation, data centers, and commercial distribution.",
          specs:
            "6kA to 15kA breaking capacity · Type A and AC residual current · Dual function arc fault detection",
          items: [
            {
              name: "PLHT Miniature Breakers",
              desc: "Miniature circuit breakers that guard final circuits against overload and short-circuit in distribution boards.",
              specs:
                "6 kA to 15 kA breaking capacity · Overload and short-circuit protection",
              image: "/images/eaton-drives.jpg",
            },
            {
              name: "FI Residual Current Devices",
              desc: "Residual current breakers that trip on earth-leakage to protect people and installations.",
              specs:
                "Type A and AC · Residual current protection · For distribution boards",
              image: "/images/xpole-v2.jpg",
            },
          ],
          image: "/images/eaton-pkzm0.jpg",
        },
        {
          id: "easy",
          seriesCode: "SERIES 06 // CONTROL RELAYS",
          title: "easyE4® Micro PLCs & Logic Controllers",
          desc: "Compact control relays designed for straightforward automation tasks, lighting control, and machinery monitoring with built-in web server functionality.",
          specs:
            "Expandable I/O channels · TFT color display · Ethernet TCP/IP connectivity · 12/24V DC & 240V AC",
          items: [
            {
              name: "easyE4 Base Controllers",
              desc: "Compact control relay base units for lighting, machinery monitoring and simple automation, with Ethernet built in.",
              specs: "Ethernet TCP/IP · Expandable I/O · 12/24V DC & 240V AC",
              image: "/images/gearboxes.jpg",
            },
            {
              name: "Digital Expansion Modules",
              desc: "Expansion modules that add digital inputs and outputs to an easyE4 base controller.",
              specs: "Extra digital I/O channels · Plugs onto the base unit",
              image: "/images/easy-v2.jpg",
            },
          ],
          image: "/images/eaton-dilm.jpg",
        },
        {
          id: "softstarter",
          seriesCode: "SERIES 07 // SOFT STARTERS",
          title: "S801+ & DS7 Digital Soft Starters",
          desc: "Advanced electronic soft starters providing smooth, stress-free acceleration and deceleration for heavy industrial pumps, fans, and compressors.",
          specs:
            "18A to 1000A ratings · Built-in bypass contactor · Torque control algorithms · LCD diagnostic keypad",
          items: [
            {
              name: "DS7 Compact Soft Starters",
              desc: "Compact digital soft starters with built-in bypass for smooth motor start and stop.",
              specs:
                "Built-in bypass contactor · Smooth start and stop · Compact housing",
              image: "/images/havells.jpg",
            },
            {
              name: "S801+ High Performance Units",
              desc: "Higher-performance soft starters for pumps, fans and compressors, with torque control and a diagnostic keypad.",
              specs:
                "Torque control algorithms · LCD diagnostic keypad · Built-in bypass",
              image: "/images/softstarter-v2.jpg",
            },
          ],
          image: "/images/eaton-nzm.jpg",
        },
        {
          id: "ups",
          seriesCode: "SERIES 08 // POWER QUALITY",
          title: "9PX & 9E Online Double Conversion UPS",
          desc: "Enterprise-grade uninterruptible power supplies delivering reliable backup power and clean sine-wave output for critical automation servers and SCADA.",
          specs:
            "1 kVA to 300 kVA · 95% high efficiency rating · Hot-swappable batteries · ABM battery management",
          items: [
            {
              name: "Eaton 9PX Tower / Rack UPS",
              desc: "Online double-conversion UPS in tower or rack form for servers, network gear and automation systems.",
              specs:
                "Online double conversion · Hot-swappable batteries · ABM battery management",
              image: "/images/eaton-pkzm0.jpg",
            },
            {
              name: "Eaton 9E Online UPS",
              desc: "Online UPS delivering clean sine-wave power to SCADA and critical automation loads.",
              specs:
                "Online double conversion · Clean sine-wave output · High efficiency",
              image: "/images/ups-v2.jpg",
            },
          ],
          image: "/images/eaton-rmq.jpg",
        },
      ],
    },
    partex: {
      id: "partex",
      name: "PARTEX",
      fullName:
        "PARTEX Marking Systems — Industrial Wire & Cable Identification",
      country: "SWEDEN",
      flag: "🇸🇪",
      origin: "Gullspång, Sweden",
      logo: "/images/logo-partex.png",
      desc: "Precision wire, cable and component marking systems engineered in Sweden since 1948.",
      tagline:
        "Engineered in Sweden since 1948 by Tore Lööf, PARTEX is the undisputed worldwide benchmark in industrial cable, wire, and panel marking systems. UL94-V0 flame retardant chevron sleeves, high-speed thermal transfer printers, and AISI 316 acid-proof stainless tags.",
      partnerBadge: "Direct Authorized Identification Distributor",
      certs: "UL94-V0 Flame Retardant · RoHS & REACH Compliant",
      catalogQuery: "PARTEX SWEDEN",
      themeBg: "bg-amber-300",
      themeText: "text-amber-950",
      selectedMetaText: "text-amber-900",
      seriesIdleStyle:
        "bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300",
      productHoverText: "group-hover:text-amber-800",
      productTitleHover: "hover:text-amber-800",
      themeHex: "#FCD34D",
      selectedCardBg:
        "bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 text-amber-950 border-amber-300 shadow-2xl scale-[1.01]",
      containerBg:
        "bg-gradient-to-br from-white via-amber-50 to-yellow-100/70 text-slate-800 border-amber-200 border-t-4 border-t-amber-400 shadow-xl",
      borderAccent: "border-l-4 border-l-amber-400",
      buttonBg: "bg-amber-600 hover:bg-amber-700 text-white font-black",
      badgeStyle: "bg-amber-50 text-amber-900 border-amber-200",
      accentText: "text-amber-800",
      series: [
        {
          id: "pa",
          seriesCode: "SERIES PA // CLOSED CHEVRON",
          title: "PA Closed Wire Markers (Chevron Cut)",
          desc: "Single-digit closed chevron cut sleeves for wires from 0.2 to 70 sq mm. The interlocking chevron profile ensures individual characters stay permanently aligned on wire bundles.",
          specs:
            "PA-02, PA-1, PA-2, PA-3 · Cadmium & Silicon-free PVC · UL94-V0 Flame Retardant · -30°C to +60°C",
          items: [
            {
              name: "PA-02 (0.2 - 1.5 mm²)",
              desc: "Closed chevron-cut markers for thin control wires, holding each character in line on dense wire bundles.",
              specs:
                "Wire 0.2 - 1.5 mm² · Cadmium & silicon-free PVC · UL94-V0",
              image: "/images/partex-po.jpg",
            },
            {
              name: "PA-1 (0.75 - 4.0 mm²)",
              desc: "Closed chevron-cut markers for standard panel wiring, one character per sleeve.",
              specs:
                "Wire 0.75 - 4.0 mm² · Cadmium & silicon-free PVC · UL94-V0",
              image: "/images/partex-ties.jpg",
            },
          ],
          image: "/images/partex-po.jpg",
        },
        {
          id: "t1000",
          seriesCode: "SERIES T-1000 // THERMAL PRINTER",
          title: "ProMark T-1000 Thermal Transfer Marker Printer",
          desc: "High-speed portable on-site industrial marker printer with 300 dpi resolution. Prints directly on continuous PO profile tubing, heat-shrinkable sleeves, and self-adhesive panel labels.",
          specs:
            "40 mm/sec print speed · USB PC connection + internal memory · 300 dpi high clarity · Portable battery pack",
          items: [
            {
              name: "ProMark T-1000 Kit",
              desc: "Portable thermal transfer printer kit for printing wire markers and labels on site.",
              specs:
                "300 dpi · USB connection + internal memory · Portable battery pack",
              image: "/images/partex-pc.jpg",
            },
            {
              name: "MK10 Desktop Machine",
              desc: "Desktop marker printer for workshop and panel-shop production.",
              specs: "Desktop unit · Prints tubing, sleeves and labels",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-printer.jpg",
        },
        {
          id: "pc",
          seriesCode: "SERIES PC // RETROFIT SNAP-ON",
          title: "PC Clip-On Open Wire Markers",
          desc: "Open snap-on markers designed for direct installation on pre-connected wiring, terminal blocks, and retrofit maintenance without removing wire terminations.",
          specs:
            "PC-10, PC-20, PC-30, PC-40 · High retention spring clamp · Vibration-proof grip · Fast wand applicator",
          items: [
            {
              name: "PC-10 (2.4 - 3.0 mm)",
              desc: "Snap-on open marker for smaller wires and cables, fitted without disconnecting terminations.",
              specs:
                "Fits 2.4 - 3.0 mm · Spring clamp retention · Vibration-proof grip",
              image: "/images/partex-pa.jpg",
            },
            {
              name: "PC-20 (3.0 - 4.0 mm)",
              desc: "Snap-on open marker for mid-size wires and cables, for retrofit and maintenance work.",
              specs:
                "Fits 3.0 - 4.0 mm · Spring clamp retention · Vibration-proof grip",
              image: "/images/partex-po.jpg",
            },
          ],
          image: "/images/partex-steel.jpg",
        },
        {
          id: "pks",
          seriesCode: "SERIES PKS // ACID-PROOF SS316",
          title: "PKS Stainless Steel 316 Acid-Proof Markers",
          desc: "High-grade AISI 316 stainless steel identification tags engineered for extreme marine, chemical plants, offshore oil rigs, and high-temperature fire hazard zones.",
          specs:
            "AISI 316 Stainless Steel · -80°C to +500°C · Extreme fire, salt spray, and acid resistance",
          items: [
            {
              name: "PKS Embossed Strips",
              desc: "Stainless steel marker strips with embossed characters that survive fire, salt spray and acid.",
              specs:
                "AISI 316 stainless steel · -80°C to +500°C · Embossed characters",
              image: "/images/partex-ties.jpg",
            },
            {
              name: "PKH Carrier Holders",
              desc: "Holders that carry PKS marker strips and fix them onto cables.",
              specs:
                "AISI 316 stainless steel · Secure fixing · Corrosion resistant",
              image: "/images/partex-promark.jpg",
            },
          ],
          image: "/images/partex-tags.jpg",
        },
        {
          id: "po",
          seriesCode: "SERIES PO // HEAT SHRINK TUBING",
          title: "PO-060 Heat Shrinkable Wire Markers",
          desc: "Flame-retardant polyolefin heat shrink tubing with a 2:1 shrink ratio, specifically designed for professional high-end aerospace, rail, and military switchboards.",
          specs:
            "2:1 shrink ratio · MIL-STD cross-linked polyolefin · -55°C to +135°C operating range",
          items: [
            {
              name: "PO-068 Tubing (Black/White)",
              desc: "Flame-retardant heat-shrink tubing for individual wire and cable identification.",
              specs:
                "2:1 shrink ratio · Cross-linked polyolefin · -55°C to +135°C",
              image: "/images/promo-partex.jpg",
            },
            {
              name: "PO-100 Tubing Reels",
              desc: "Continuous heat-shrink tubing on reels for high-volume printing and marking.",
              specs:
                "2:1 shrink ratio · Continuous reel · Cross-linked polyolefin",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-sleeves.jpg",
        },
        {
          id: "pp",
          seriesCode: "SERIES PP // SNAP-ON PROFILE",
          title: "PP Profile Halogen-Free Holders & Strips",
          desc: "Extruded transparent holder profiles combined with card inserts for labeling larger power cables, conduit pipes, and instrument loops.",
          specs:
            "Halogen-free material · UV stable profile · Secure slide-in insert window",
          items: [
            {
              name: "PP-01 Profile Holders",
              desc: "Transparent holder profiles with card inserts for labelling power cables and instrument loops.",
              specs: "Halogen-free · UV stable · Slide-in insert window",
              image: "/images/slider2.jpg",
            },
            {
              name: "PP-02 Heavy Duty Rails",
              desc: "Heavier rails for marking larger cables, conduit pipes and long runs.",
              specs: "Halogen-free · UV stable · Heavy-duty profile",
              image: "/images/slider1.jpg",
            },
          ],
          image: "/images/partex-printer.jpg",
        },
        {
          id: "mg",
          seriesCode: "SERIES MG // MODULAR PLATES",
          title: "MG-Kdp Modular Push-In Plate Markers",
          desc: "Multi-card plastic tag plates designed for marking control panel pushbuttons, contactors, terminal blocks, and modular DIN enclosures.",
          specs:
            "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
          items: [
            {
              name: "MG-CPM Panel Plates",
              desc: "Push-in plates for identifying pushbuttons, contactors and other control panel devices.",
              specs:
                "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
              image: "/images/partex-po.jpg",
            },
            {
              name: "MG-TD Terminal Markers",
              desc: "Modular markers for terminal blocks and DIN enclosure components.",
              specs:
                "Flame retardant polycarbonate · Snap-fit installation · Laser printable",
              image: "/images/partex-pks.jpg",
            },
          ],
          image: "/images/partex-steel.jpg",
        },
        {
          id: "tk",
          seriesCode: "SERIES TK // CABLE TIE TAGS",
          title: "TK Heavy-Duty Cable Tie Marker Tags",
          desc: "Large format identification plates secured with standard cable ties for heavy cable bundles, conduits, hydraulic hoses, and pole lines.",
          specs:
            "Rigid PVC / Nylon material · High tensile holding strength · Dual-end tie slots",
          items: [
            {
              name: "TK-1 40x10mm Tags",
              desc: "Compact tie-on tags for identifying cable bundles, hoses and small conduits.",
              specs: "40 x 10 mm · Rigid PVC / Nylon · Dual-end tie slots",
              image: "/images/partex-ties.jpg",
            },
            {
              name: "TK-2 60x15mm Tags",
              desc: "Larger tie-on tags with more space for text on heavy cables, hydraulic hoses and pole lines.",
              specs: "60 x 15 mm · Rigid PVC / Nylon · Dual-end tie slots",
              image: "/images/partex-promark.jpg",
            },
          ],
          image: "/images/partex-tags.jpg",
        },
      ],
    },
    mennekes: {
      id: "mennekes",
      name: "MENNEKES",
      fullName:
        "MENNEKES Elektrotechnik — Industrial Plugs & AMAXX® Combinations",
      country: "GERMANY",
      flag: "🇩🇪",
      origin: "Kirchhundem, Germany",
      logo: "/images/logo-mennekes.png",
      desc: "Industry-defining standard in industrial plugs, CEE receptacles, and distribution units.",
      tagline:
        "Founded in Kirchhundem, Germany in 1935, MENNEKES is the global inventor of the modern industrial CEE plug and socket system. Unmatched mechanical impact resistance, IP67 watertight sealing, and modular AMAXX distribution boxes for world-class factory installations.",
      partnerBadge: "Authorized Industrial CEE Stockist",
      certs: "VDE Certified & IEC 60309-1/2 · DIN EN ISO 9001",
      catalogQuery: "MENNEKES",
      themeBg: "bg-slate-600",
      themeText: "text-white",
      selectedMetaText: "text-slate-300",
      seriesIdleStyle:
        "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-400",
      productHoverText: "group-hover:text-slate-700",
      productTitleHover: "hover:text-slate-700",
      themeHex: "#64748B",
      selectedCardBg:
        "bg-gradient-to-br from-slate-600 via-slate-500 to-slate-600 text-white border-slate-400 shadow-2xl scale-[1.01]",
      containerBg:
        "bg-gradient-to-br from-white via-slate-50 to-slate-100/80 text-slate-800 border-slate-200 border-t-4 border-t-slate-500 shadow-xl",
      borderAccent: "border-l-4 border-l-slate-400",
      buttonBg: "bg-slate-600 hover:bg-slate-700 text-white font-black",
      badgeStyle: "bg-slate-100 text-slate-700 border-slate-300",
      accentText: "text-slate-600",
      series: [
        {
          id: "powertop",
          seriesCode: "SERIES 01 // HEAVY DUTY CEE",
          title: "PowerTOP® Xtra CEE Plugs & Connectors",
          desc: "Ergonomic industrial plugs with rubberized slip-proof grips and SafeCONTACT screwless insulation-displacement technology for fast, vibration-proof field wiring.",
          specs:
            "16A, 32A, 63A, 125A · IP44 / IP67 watertight · Highly heat-resistant contact carriers · Nickel-plated pins",
          items: [
            {
              name: "PowerTOP Xtra 16A 5P",
              desc: "16 A five-pole CEE plug with a rubberized slip-proof grip, built for everyday field and workshop use.",
              specs: "16 A · 5-pole · IP44 / IP67 · Nickel-plated pins",
              image: "/images/menn-phase.jpg",
            },
            {
              name: "PowerTOP Xtra 32A 5P",
              desc: "32 A five-pole CEE plug for heavier machines and mobile equipment, with the same tough housing and grip.",
              specs: "32 A · 5-pole · IP44 / IP67 · Nickel-plated pins",
              image: "/images/powertop-v2.jpg",
            },
          ],
          image: "/images/menn-powertop.jpg",
        },
        {
          id: "amaxx",
          seriesCode: "SERIES 02 // RECEPTACLE COMBOS",
          title: "AMAXX® Receptacle Combination Enclosures",
          desc: "Modular, pre-wired power distribution units fabricated from high-impact AMAPLAST polymer. Configurable with MCBs, RCCBs, and CEE receptacles for manufacturing lines.",
          specs:
            "AMAPLAST impact polymer · IP44 / IP67 · Custom DIN rail windows · Pre-wired & factory tested",
          items: [
            {
              name: "AMAXX® 2-Gang Wall Units",
              desc: "Pre-wired two-gang wall enclosure with CEE receptacles and protective devices for smaller work areas.",
              specs:
                "2-gang · AMAPLAST impact polymer · IP44 / IP67 · Pre-wired & factory tested",
              image: "/images/menn-duo.jpg",
            },
            {
              name: "AMAXX® 4-Gang Enclosures",
              desc: "Pre-wired four-gang enclosure for production lines and workshops that need more outlets in one unit.",
              specs:
                "4-gang · AMAPLAST impact polymer · IP44 / IP67 · Pre-wired & factory tested",
              image: "/images/amaxx-v2.jpg",
            },
          ],
          image: "/images/menn-amaxx.jpg",
        },
        {
          id: "evergum",
          seriesCode: "SERIES 03 // VULCANIZED RUBBER",
          title: "EverGUM® Solid Rubber Field Distributors",
          desc: "Virtually indestructible portable and wall-mount distribution boxes manufactured from solid vulcanized rubber, resistant to harsh acids, oils, and severe drop impacts.",
          specs:
            "Solid vulcanized synthetic rubber · Crush & drop proof · IP44 / IP67 · Safety yellow & black casing",
          items: [
            {
              name: "EverGUM® Portable Boxes",
              desc: "Solid rubber portable distribution boxes that shrug off drops, crushing, oils and acids on site.",
              specs:
                "Solid vulcanized rubber · Crush & drop proof · IP44 / IP67",
              image: "/images/menn-evergum.jpg",
            },
            {
              name: "EverGUM® Floor Stands",
              desc: "Floor-standing solid rubber distributors for fixed or semi-fixed power points in rough environments.",
              specs: "Solid vulcanized rubber · Floor-standing · IP44 / IP67",
              image: "/images/promo-mennekes.jpg",
            },
          ],
          image: "/images/menn-evergum.jpg",
        },
        {
          id: "panel",
          seriesCode: "SERIES 04 // PANEL RECEPTACLES",
          title: "CEE Panel Sockets & DUO Interlocked Switches",
          desc: "Surface and panel-mount industrial CEE receptacles with mechanical interlocks that prevent withdrawal under electrical load for total plant personnel safety.",
          specs:
            "Mechanical interlock DUO switch · IP44 / IP67 · Nickel-plated brass terminals · Padlockable handle",
          items: [
            {
              name: "Panel Sockets Straight",
              desc: "Straight panel-mount CEE receptacles for building into machines and distribution enclosures.",
              specs:
                "Straight panel mount · IP44 / IP67 · Nickel-plated brass terminals",
              image: "/images/menn-powertop.jpg",
            },
            {
              name: "DUO Interlocked Sockets",
              desc: "Interlocked socket-switch combinations that prevent plug withdrawal under load.",
              specs: "Mechanical interlock · Padlockable handle · IP44 / IP67",
              image: "/images/panel-v2.jpg",
            },
          ],
          image: "/images/menn-phase.jpg",
        },
        {
          id: "ceeviu",
          seriesCode: "SERIES 05 // REFRIGERATED CONTAINER",
          title: "CEE-IU Refrigerated Container Sockets",
          desc: "Interlocked switched socket outlets specially designed for refrigerated containers (reefer plugs) in ports, logistics yards, and container ships.",
          specs:
            "32A 3P+N+E 3h (yellow voltage code) · IP67 watertight · Built-in phase inverter",
          items: [
            {
              name: "Reefer Sockets 32A",
              desc: "Interlocked switched sockets for reefer containers in ports, logistics yards and on ships.",
              specs: "32 A 3P+N+E · IP67 watertight · Interlocked switch",
              image: "/images/menn-powertop.jpg",
            },
            {
              name: "CEE Plug 3h Yellow",
              desc: "Matching reefer plug with yellow 3h voltage coding and a built-in phase inverter.",
              specs:
                "3h yellow voltage code · IP67 watertight · Built-in phase inverter",
              image: "/images/menn-evergum.jpg",
            },
          ],
          image: "/images/menn-powertop.jpg",
        },
        {
          id: "amatur",
          seriesCode: "SERIES 06 // PILLAR DISTRIBUTION",
          title: "AMATUR® Outdoor Energy & Lighting Pillars",
          desc: "Stainless steel energy and lighting distribution pillars for marinas, camping grounds, public squares, and industrial loading docks.",
          specs:
            "V2A Stainless Steel housing · Lockable service doors · Integrated CEE and Schuko sockets",
          items: [
            {
              name: "AMATUR Marina Pillar",
              desc: "Stainless steel distribution pillar giving boats and docks a safe, weatherproof power point.",
              specs:
                "V2A stainless steel · Lockable service door · CEE and Schuko sockets",
              image: "/images/menn-amaxx.jpg",
            },
            {
              name: "Camping Distribution Column",
              desc: "Distribution column for camping grounds and public sites, with lockable access and mixed sockets.",
              specs:
                "V2A stainless steel · Lockable service door · CEE and Schuko sockets",
              image: "/images/menn-phase.jpg",
            },
          ],
          image: "/images/menn-amaxx.jpg",
        },
        {
          id: "toptr",
          seriesCode: "SERIES 07 // PORTABLE ADAPTERS",
          title: "TOP-TROPIC Industrial Cable Reels & Splitters",
          desc: "Robust rubber and steel cable drums and mobile splitters designed for construction sites, outdoor events, and emergency power supply squads.",
          specs:
            "Thermal cut-out protection · Heavy-duty rubberized drums · IP44 spray-proof outlets",
          items: [
            {
              name: "TOP-TROPIC Cable Drums",
              desc: "Rubberized cable drums for construction sites, events and temporary power supply.",
              specs:
                "Thermal cut-out protection · Heavy-duty rubberized drum · IP44 outlets",
              image: "/images/menn-duo.jpg",
            },
            {
              name: "Rubber Portable Splitters",
              desc: "Portable rubber splitters that turn one supply into several outlets on site.",
              specs: "Rubber housing · IP44 spray-proof outlets · Portable",
              image: "/images/toptr-v2.jpg",
            },
          ],
          image: "/images/socket2.png",
        },
        {
          id: "lowvolt",
          seriesCode: "SERIES 08 // EXTRA LOW VOLTAGE",
          title: "Extra-Low Voltage 20V to 50V CEE Plugs",
          desc: "Specialized industrial plugs and sockets designed for safety extra-low voltage applications in confined metal vessels, boilers, and wet underground maintenance.",
          specs:
            "24V / 42V / 50V AC/DC · Mechanical keying prevents wrong voltage insertion · Frequency specific pins",
          items: [
            {
              name: "ELV Panel Sockets 24V",
              desc: "Panel-mount extra-low voltage sockets for safe supply inside boilers, tanks and wet areas.",
              specs:
                "24 V · Panel mount · Mechanical keying prevents wrong voltage",
              image: "/images/menn-panel.jpg",
            },
            {
              name: "ELV Portable Plugs",
              desc: "Portable plugs for extra-low voltage tools and lamps in confined metal vessels.",
              specs:
                "24 V / 42 V / 50 V · Frequency specific pins · Keyed against wrong voltage",
              image: "/images/socket1.png",
            },
          ],
          image: "/images/menn-panel.jpg",
        },
      ],
    },
  };

  const currentBrand = brandProfiles[selectedBrandId] || brandProfiles.lapp;
  const activeSeries =
    currentBrand.series[activeSeriesIndex] || currentBrand.series[0];

  const allItems: ProductItem[] = activeSeries
    ? selectedBrandId === "lapp"
      ? [...activeSeries.items, ...getLappPortfolioItems(activeSeries.id)]
      : getGenericBrandPortfolioItems(selectedBrandId, activeSeries)
    : [];

  const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const detailRows = allItems.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    setActiveSeriesIndex(0);
    setPage(0);
  };

  const handleItemClick = (catId?: string, seriesId?: string) => {
    const state = { fromPortfolio: true };
    if (selectedBrandId === "lapp" && catId) {
      const sParam = seriesId ? `&series=${seriesId}` : "";
      navigate(`/catalog?brand=lapp&category=${catId}${sParam}`, { state });
    } else {
      navigate(
        `/catalog?brand=${encodeURIComponent(currentBrand.catalogQuery)}`,
        { state },
      );
    }
  };

  return (
    <section
      className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none"
      id="brandPortfolios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1956A6] tracking-tight">
            Authorized Brands Portfolio
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Select a manufacturer below to see Products Details.
          </p>
        </div>

        {/* BRAND NAVIGATION PILLS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {Object.values(brandProfiles).map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between cursor-pointer hover-card-lift border ${
                  isSelected
                    ? brand.selectedCardBg
                    : "bg-white text-[#1956A6] border-[#CBD5E1] hover:border-[#475569]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-9 px-2.5 rounded-xl border flex items-center justify-center shrink-0 ${isSelected ? "bg-white border-white/40" : "bg-slate-50 border-[#E2E8F0]"}`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-4 object-contain max-w-[65px]"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black tracking-tight truncate">
                      {brand.name}
                    </h4>
                    <span
                      className={`text-[10px] font-mono block ${isSelected ? brand.selectedMetaText : "text-[#64748B]"}`}
                    >
                      {brand.country}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full ${brand.themeBg} shrink-0 shadow-sm`}
                />
              </button>
            );
          })}
        </div>

        {/* SPLIT DOSSIER & SPEC VAULT */}
        {activeSeries && (
          <div
            ref={showcaseRef}
            className={`rounded-[2.5rem] p-6 sm:p-10 border relative overflow-hidden transition-all duration-700 ${currentBrand.containerBg}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              {/* LEFT COLUMN: EXECUTIVE DOSSIER & SERIES SELECTOR */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3 pb-6 border-b border-slate-300">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${currentBrand.badgeStyle}`}
                    >
                      <Building2 size={13} />
                      {currentBrand.partnerBadge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {currentBrand.origin}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#1E3A8A] tracking-tight leading-snug">
                    {currentBrand.fullName}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {currentBrand.tagline}
                  </p>

                  <div
                    className={`flex items-center gap-2 text-xs font-mono ${currentBrand.accentText} font-semibold pt-1`}
                  >
                    <ShieldCheck size={14} />
                    <span>{currentBrand.certs}</span>
                  </div>
                </div>

                {/* SERIES SELECTOR TABS (2-COLUMN GRID) */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                    Products Range ({currentBrand.series.length}):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentBrand.series.map((s, idx) => {
                      const isSeriesActive = activeSeriesIndex === idx;
                      return (
                        <button
                          key={s.id}
                          onClick={() => {
                            setActiveSeriesIndex(idx);
                            setPage(0);
                          }}
                          className={`w-full p-3.5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                            isSeriesActive
                              ? `${currentBrand.themeBg} ${currentBrand.themeText} border-transparent font-black shadow-lg scale-[1.01]`
                              : currentBrand.seriesIdleStyle
                          }`}
                        >
                          <span
                            className={`text-[9px] font-mono uppercase block tracking-wider mb-0.5 ${isSeriesActive ? "text-white/90 font-bold" : "text-slate-500"}`}
                          >
                            SERIES {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="font-bold text-xs tracking-tight line-clamp-1">
                            {s.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 2 PRODUCTS PER PAGE */}
              <div className="lg:col-span-7 flex self-stretch">
                <div className="w-full h-full flex flex-col bg-white text-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lg">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="min-w-0">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider ${currentBrand.accentText} font-bold block`}
                      >
                        {activeSeries.seriesCode}
                      </span>
                      <h4
                        onClick={() =>
                          handleItemClick(
                            activeSeries.catId,
                            activeSeries.seriesId,
                          )
                        }
                        className={`text-lg sm:text-xl font-black text-slate-800 tracking-tight mt-0.5 ${currentBrand.productTitleHover} transition-colors cursor-pointer`}
                        title="View sub-category in catalog"
                      >
                        {activeSeries.title}
                      </h4>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border flex items-center gap-1.5 ${currentBrand.badgeStyle}`}
                    >
                      <ShieldCheck size={12} /> Authorized Stock
                    </span>
                  </div>

                  {/* Rows — 2 products per page with compact spacing */}
                  <div className="flex-1 flex flex-col justify-around gap-3 py-2">
                    {detailRows.map((item, rowIdx) => (
                      <div
                        key={`${activeSeries.id}-${safePage}-${rowIdx}`}
                        onClick={() =>
                          handleItemClick(
                            item.catId || activeSeries.catId,
                            item.seriesId || activeSeries.seriesId,
                          )
                        }
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center group cursor-pointer p-1.5 rounded-2xl hover:bg-slate-50 transition-colors"
                        title="Click to view inside catalog"
                      >
                        {/* Left: image card */}
                        <div className="md:col-span-4">
                          <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-sm group-hover:scale-102 transition-transform">
                            <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  const img = e.currentTarget;
                                  if (!img.src.endsWith(activeSeries.image)) {
                                    img.src = activeSeries.image;
                                    return;
                                  }
                                  img.onerror = null;
                                  img.src = "/images/card-cables.jpg";
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right: description + Technical Parameters card */}
                        <div className="md:col-span-8 space-y-2">
                          <h5
                            className={`text-sm sm:text-base font-black text-slate-800 tracking-tight ${currentBrand.productHoverText} transition-colors line-clamp-1`}
                          >
                            {item.name}
                          </h5>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                            {item.desc}
                          </p>

                          <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm space-y-1 font-mono text-[11px]">
                            <div
                              className={`text-[9px] font-bold ${currentBrand.accentText} uppercase tracking-wider flex items-center gap-1`}
                            >
                              <ShieldCheck size={11} /> Technical Parameters
                            </div>
                            <p className="text-slate-700 leading-snug line-clamp-2">
                              {item.specs}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-200">
                      <span className="text-[11px] font-mono text-slate-500">
                        Showing {safePage * PAGE_SIZE + 1}–
                        {Math.min((safePage + 1) * PAGE_SIZE, allItems.length)}{" "}
                        of {allItems.length}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPage(Math.max(0, safePage - 1))}
                          disabled={safePage === 0}
                          className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          aria-label="Previous page"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setPage(i)}
                            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold border cursor-pointer transition-colors ${
                              i === safePage
                                ? `${currentBrand.themeBg} ${currentBrand.themeText} border-transparent shadow-md`
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            setPage(Math.min(totalPages - 1, safePage + 1))
                          }
                          disabled={safePage === totalPages - 1}
                          className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          aria-label="Next page"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RFQ Quote Modal */}
      {rfqModalItem && (
        <RFQModal
          product={`${rfqModalItem.brand} - ${rfqModalItem.name}`}
          onClose={() => setRfqModalItem(null)}
        />
      )}
    </section>
  );
};
