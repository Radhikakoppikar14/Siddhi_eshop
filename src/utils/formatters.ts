/**
 * Utility functions for clean B2B industrial catalog typography and concise naming.
 */

export const getShortProductName = (name: string): string => {
  if (!name) return "";
  let clean = name.trim();

  // Remove common verbose boilerplate in industrial descriptions
  clean = clean
    .replace(/\s*\(Industrial Drum\)/gi, "")
    .replace(/\s*\(Bangalore Warehouse Ready Stock\)/gi, "")
    .replace(/Flexible Industrial Cable/gi, "Cable")
    .replace(/Continuous Chain Cable/gi, "Chain Cable")
    .replace(/Control Cable/gi, "")
    .replace(/Nickel-Plated Brass Cable Gland/gi, "Gland")
    .replace(/Motor Protection Circuit Breaker/gi, "Breaker")
    .replace(/Thermal Transfer Wire Marking Printer/gi, "Printer")
    .replace(/Acid-Proof Stainless Steel \d+/gi, "SS-316")
    .replace(/Industrial 5-Pin Straight Plug/gi, "Plug")
    .replace(/Industrial 3-Pole/gi, "")
    .replace(/\s*3-Pole Contactor/gi, " Contactor")
    .replace(/\s*\(230V 50Hz Coil\)/gi, "")
    .replace(/\s*\(6\.3-10A\)/gi, "")
    .replace(/\s+I\s+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Cap at 34 chars on word boundary if still too verbose
  if (clean.length > 34) {
    const parts = clean.split(" ");
    let result = "";
    for (const part of parts) {
      if ((result + " " + part).trim().length <= 34) {
        result = (result + " " + part).trim();
      } else {
        break;
      }
    }
    return result || clean.slice(0, 32) + "…";
  }

  return clean;
};

export interface ProductColorInfo {
  label: string;
  dotColor: string;
  badgeBg: string;
}

export const getProductCores = (product: {
  cores?: number | string;
  specs?: string[];
  name?: string;
  pe?: string;
}): string => {
  if (product.cores !== undefined && product.cores !== null && product.cores !== "") {
    if (typeof product.cores === "number") {
      const earthStr = product.pe === "G" ? " (with Earth)" : "";
      return `${product.cores} Cores${earthStr}`;
    }
    return String(product.cores);
  }

  // Fallback regex detection from name or specs
  const str = `${product.name || ""} ${(product.specs || []).join(" ")}`;
  const coreMatch = str.match(/(\d+)\s*(?:Cores?|Core|C|G|X)/i);
  if (coreMatch) {
    return `${coreMatch[1]} Cores`;
  }
  return "Multi-Core";
};

export const getProductSize = (product: {
  size?: number | string;
  specs?: string[];
  name?: string;
}): string => {
  if (product.size !== undefined && product.size !== null && product.size !== "") {
    if (typeof product.size === "number") {
      return `${product.size} mm²`;
    }
    return String(product.size);
  }

  const str = `${product.name || ""} ${(product.specs || []).join(" ")}`;
  const sizeMatch = str.match(/(\d+(?:[.,]\d+)?)\s*(?:sq\s*mm|sqmm|mm²|mm2)/i);
  if (sizeMatch) {
    return `${sizeMatch[1].replace(",", ".")} mm²`;
  }
  return "Standard";
};

export const getProductColor = (product: {
  color?: string;
  name?: string;
  brand?: string;
}): ProductColorInfo => {
  const colorStr = (product.color || "").toLowerCase();
  const nameStr = (product.name || "").toLowerCase();
  const full = `${colorStr} ${nameStr}`;

  if (full.includes("transparent")) {
    return {
      label: product.color || "Transparent Sheath",
      dotColor: "#CBD5E1",
      badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    };
  }
  if (full.includes("black")) {
    return {
      label: product.color || "Industrial Black",
      dotColor: "#164D96",
      badgeBg: "bg-blue-800 text-white border-slate-800",
    };
  }
  if (full.includes("teal") || full.includes("green") || full.includes("profinet")) {
    return {
      label: product.color || "Teal Green (RAL 6018)",
      dotColor: "#10B981",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-300",
    };
  }
  if (full.includes("red")) {
    return {
      label: product.color || "Safety Red (400V)",
      dotColor: "#EF4444",
      badgeBg: "bg-red-50 text-red-800 border-red-300",
    };
  }
  if (full.includes("yellow")) {
    return {
      label: product.color || "Safety Yellow",
      dotColor: "#1D96ED",
      badgeBg: "bg-sky-50 text-sky-900 border-sky-300",
    };
  }
  if (full.includes("copper")) {
    return {
      label: product.color || "Electrolytic Copper",
      dotColor: "#1779CF",
      badgeBg: "bg-sky-100 text-sky-900 border-sky-300",
    };
  }
  if (full.includes("anthracite")) {
    return {
      label: product.color || "Industrial Anthracite",
      dotColor: "#334155",
      badgeBg: "bg-blue-700 text-white border-slate-700",
    };
  }
  if (full.includes("metallic") || full.includes("stainless") || full.includes("nickel")) {
    return {
      label: product.color || "Metallic Silver",
      dotColor: "#94A3B8",
      badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    };
  }

  // Default for LAPP cables and industrial standard is Silver-Grey RAL 7001
  return {
    label: product.color || "Silver-Grey (RAL 7001)",
    dotColor: "#94A3B8",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
  };
};
