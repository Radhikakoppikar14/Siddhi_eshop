export interface BrandSection {
  title: string;
  text?: string;
  items?: string[];
}

export interface BrandDetail {
  intro: string;
  sections: BrandSection[];
}

/**
 * Brand detail content.
 * Eaton and Mennekes follow siddhikabel.com/products_eaton.html and /products_mennekes.html.
 * Lapp and Partex: add their sections here when you have the page text; until then the
 * page lists their catalogue products from siddhiData.ts.
 */
export const BRAND_DETAILS: Record<string, BrandDetail> = {
  eaton: {
    intro:
      "Eaton’s electrical business is a global leader in power distribution, power quality, control and automation, power monitoring, and energy management products and services. Through its global electrical product series and solutions, Eaton is positioned to answer today’s most critical electrical power management challenges.",
    sections: [
      {
        title: "RMQ 22.5 mm Pilot Devices",
        items: [
          "Pushbutton illuminated / non-illuminated / twin pushbutton",
          "Foot and palm switches, emergency stop switches, selector switches",
          "Pushbutton surface-mounting enclosures: 1 way, 2 way, 3 and 4 way",
          "RMQ 16 mm pilot devices: square pushbuttons with and without illumination",
          "SL signal towers and accessories",
        ],
      },
      {
        title: "LS Position / MCS Pressure Switches / Sensors",
        items: [
          "Safety door switches and safety position switches",
          "MCS pressure switches for monitoring fluid and gaseous media",
          "Sensors and proximity switches",
        ],
      },
      {
        title: "Cam Switches and Switch Disconnectors",
        items: [
          "On/off, safety, changeover, reversing and star-delta switches",
          "Cam switches, mini rotary switches, isolators",
          "Switches for ATEX Zone 22",
        ],
      },
      {
        title: "Contactors & Contactor Relays",
        items: [
          "Mini contactor relays, AC and DC contactor systems",
          "High-rated contactors up to 1600 A AC-3 and up to 2600 A AC-1",
          "UL/CSA approved contactors",
          "Star-delta combinations, CMD contactor monitoring devices",
          "Bimetal overload relays up to 630 A",
          "Electronic overload relays up to 1500 A",
          "EMT6 thermistor overload relay for machine protection",
        ],
      },
      {
        title: "Motor Protective Circuit Breakers",
        items: [
          "With pushbuttons up to 16 A",
          "With rotary handle up to 65 A",
          "Compact starters, high-capacity compact starters",
          "DC string circuit breakers and DC switch disconnectors up to 63 A",
          "Motor starter combinations up to 1400 A",
        ],
      },
      {
        title: "Measuring and Monitoring Relays, Soft Starters and Drives",
        items: [
          "Electronic measuring and monitoring relays",
          "Electronic timing relays",
          "Multi-functional relays with remote potentiometer",
          "DS6 two-phase controlled soft starter with internal bypass",
          "DS7 two-phase controlled soft starter with asymmetrical trigger",
          "DM4 three-phase controlled soft starter",
          "M-Max and H-Max frequency inverters",
        ],
      },
      {
        title: "Compact Circuit Breakers MCCB up to 1600 A",
        items: [
          "Door-coupling rotary handles for MCCB",
          "Compact switch disconnectors N, PN up to 1600 A",
          "NZM1 to NZM4 series, remote operators",
          "Easy500, Easy700, Easy800, MFD-Titan",
        ],
      },
      {
        title: "Miniature Circuit Breakers (MCB) & RCCB",
        items: [
          "FAZ miniature circuit breakers with UL/CSA",
          "Digital residual current devices",
          "Cylindrical fuse switch disconnectors",
          "Fuse switch disconnectors, photovoltaics",
        ],
      },
      {
        title: "Circuit Breakers IZM up to 6300 A",
        items: [
          "IZM basic devices",
          "High-availability withdrawable units",
          "Comprehensive fixed-mounted accessories",
          "ARMS, the worldwide novelty",
        ],
      },
    ],
  },

  mennekes: {
    intro:
      "The right solution for every application. Where high currents have to be transferred safely and economically, customers and partners can rely on MENNEKES. They think holistically and create powerful connections that help people handle energy more innovatively and distribute and manage it more intelligently.",
    sections: [
      {
        title: "Heat-resistant contact carriers",
        text: "Receptacles with highly heat-resistant contact carriers, nickel-plated contacts and high resistance to chemicals.",
      },
      {
        title: "Corrosion resistance",
        text: "Guaranteed resistance to corrosive environments: high humidity, salt or acidic air, corrosive gases and vapours.",
      },
      {
        title: "Grip and quick installation",
        text: "Best grip and improved impact resistance through a unique rubber coating and ergonomic design. Largely tool-free installation substantially reduces installation time, with stable and fast locking without screws.",
      },
      {
        title: "AMELAN",
        text: "A plastic that combines high mechanical, thermal and electrical properties with excellent dimensional stability and chemical resistance. Fit for chemical plants, refineries, the food processing industry and washdown areas. AMELAN resists fuels, oils and fats, dilute acids and alkalines, cleaning fluids, most aqueous salt solutions and a wide variety of chemicals including aliphatic hydrocarbons.",
      },
      {
        title: "cepex data port receptacles",
        text: "The right choice for control stations, storage areas, laboratories, airports, production lines and more. Operated with standard patch cables and can be combined with cepex CEE and/or SCHUKO receptacles.",
      },
      {
        title: "AMAXX",
        text: "Extensively configurable receptacle combinations in six different sizes, with an appealing and unique design in many variations for all applications.",
      },
      {
        title: "EverGUM",
        text: "A solid rubber alternative to enclosures in AMAPLAST, AMELAN and sheet steel. Suitable for the most diverse environments, especially where rough handling or aggressive cleaning agents are likely.",
      },
    ],
  },
};
