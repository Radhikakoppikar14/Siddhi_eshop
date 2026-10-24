export interface BrandInfo {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  logo: string;
  featuredImg: string;
  categories: string[];
  productCount: string;
  origin: string;
  color: string;      // official brand colour
  colorDark: string;  // darker shade for text on light backgrounds
  colorTint: string;  // very light wash for card backgrounds
}

export interface ProductItem {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  category: string;
  code?: string;
  shortDesc: string;
  details: string;
  specifications: { label: string; value: string }[];
  image: string;
  standards: string[];
  isFeatured?: boolean;
}

export interface ClientPartner {
  name: string;
  logo: string;
  industry: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  clients: string;
  summary: string;
  highlights: string[];
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}

export interface SpecialOfferItem {
  partNo: string;
  description: string;
  category: string;
  brand: string;
  status: string;
  unit: string;
}

export const COMPANY_INFO = {
  name: "Siddhi Kabel Corporation Private Limited",
  shortName: "Siddhi Kabel",
  tagline: "Dependable Electrical Solutions for your Industrial Requirements",
  headline: "Transforming Indian Industry With Innovative Engineering Products",
  description:
    "Siddhi Kabel Corporation Private Limited is one of the leading and reliable suppliers of world-class Industrial Electrical, Automation & Safety Products. Established in 2008 with over 15 years of industry leadership.",
  establishedYear: "2008",
  experienceYears: "15+",
  segmentsServed: "25+",
  customersServed: "500+",
  contacts: {
    primaryPhone: "096200 00947",
    secondaryPhone: "098860 58511",
    landline: "080 – 2672 0440",
    primaryEmail: "info@siddhikabel.com",
    directorEmail: "guru@siddhikabel.com",
    address: {
      line1: "No.3, 1st Main Road, 1st Block",
      line2: "Banashankari 3rd Stage",
      city: "Bangalore",
      pincode: "560 085",
      state: "Karnataka",
      country: "India",
    },
    hours: "Monday – Saturday: 9:00 AM – 6:30 PM",
  },
  socials: {
    facebook: "https://www.facebook.com/siddhikabel/",
    twitter: "https://twitter.com/siddhikabel",
    linkedin: "https://www.linkedin.com/in/siddhikabel/",
  },
};

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: "lapp",
    name: "Lapp Kabel",
    shortDesc: "Global pioneer in integrated cable and connection technology.",
    fullDesc:
      "Lapp produces cables and conductors for different industries and markets. Known worldwide for engineering benchmarks like ÖLFLEX®, UNITRONIC® and ETHERLINE®.",
    logo: "/images/clients/lapp.png",
    featuredImg: "/images/olflex.png",
    categories: ["Power & Control Cables", "Data Communication", "Cable Glands & Connectors"],
    productCount: "40,000+ Items",
    origin: "Germany",
    color: "#FF6A00",
    colorDark: "#B34700",
    colorTint: "#FFF3E8",
  },
  {
    id: "eaton",
    name: "Eaton - Moeller",
    shortDesc: "World leader in intelligent motor control, switchgear, automation and power distribution.",
    fullDesc:
      "Eaton produces a broad range of products and services for power and control applications, including motor-protective circuit breakers, contactors, pilot devices and smart communication systems.",
    logo: "/images/clients/eaton.png",
    featuredImg: "/images/resource/et1.jpg",
    categories: ["Motor Protection (PKZ/PKE)", "Contactors & Relays", "Pilot Devices (RMQ 22.5)"],
    productCount: "Full Industrial Line",
    origin: "Germany / USA",
    color: "#0057B8",
    colorDark: "#003F87",
    colorTint: "#EAF2FC",
  },
  {
    id: "partex",
    name: "Partex",
    shortDesc: "Precision wire, cable and component marking systems engineered in Sweden since 1948.",
    fullDesc:
      "Partex Marking Systems makes wire, cable and component identification for panels, machines and plants: sleeves, markers, labels and printers that keep installations traceable.",
    logo: "/images/clients/partex.png",
    featuredImg: "/images/clients/partex.png",
    categories: ["Wire & Cable Markers", "Marking Sleeves", "Labels & Marking Printers"],
    productCount: "Marking Systems",
    origin: "Sweden",
    color: "#E30613",
    colorDark: "#A8040E",
    colorTint: "#FDECEE",
  },
  {
    id: "mennekes",
    name: "Mennekes",
    shortDesc: "Industry-defining standard in industrial plugs, CEE receptacles and distribution units.",
    fullDesc:
      "MENNEKES is a leading manufacturer of industrial plugs and sockets, CEE receptacles and interlocked combination units designed for harsh mechanical and chemical industrial environments.",
    logo: "/images/clients/mennekes.png",
    featuredImg: "/images/resource/me1.jpg",
    categories: ["CEE Plugs & Sockets (16A–125A)", "Interlocked Combinations", "Distribution Units"],
    productCount: "IP44 / IP67 Rated",
    origin: "Germany",
    color: "#D6001C",
    colorDark: "#9E0015",
    colorTint: "#FCEAEC",
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  // Lapp products
  {
    id: "lapp-olflex",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "ÖLFLEX® Flexible Power & Control Cables",
    category: "Power & Control Cables",
    code: "OLFLEX-CLASSIC-110",
    shortDesc: "Oil-resistant, highly flexible PVC control cable for fixed installation as well as occasional flexing.",
    details:
      "The classic ÖLFLEX® cable range offers superior mechanical strength, flame retardancy, and oil resistance. Widely used in machine tool manufacturing, assembly lines, and production facilities.",
    specifications: [
      { label: "Conductor", value: "Bare copper, fine wire class 5" },
      { label: "Nominal Voltage", value: "U0/U: 300/500 V" },
      { label: "Temperature Range", value: "-40°C to +80°C fixed" },
      { label: "Core Identification", value: "Black with white numbers + G/Y" },
    ],
    image: "/images/olflex.png",
    standards: ["VDE", "CE", "RoHS", "EAC"],
    isFeatured: true,
  },
  {
    id: "lapp-unitronic",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "UNITRONIC® Data Communication Shielded Cables",
    category: "Data & Bus Cables",
    code: "UNITRONIC-LiYCY",
    shortDesc: "Screened data transmission cable with color code according to DIN 47100.",
    details:
      "Shielded with high coverage tinned copper wire braid to prevent EMI interference. Essential for electronic control units, automated weighing systems, and computing terminals.",
    specifications: [
      { label: "Screening", value: "Tinned copper braid (85% coverage)" },
      { label: "Working Voltage", value: "Peak 350V / 500V test" },
      { label: "Characteristics", value: "Flame retardant IEC 60332-1-2" },
      { label: "Minimum Bending", value: "6x outer diameter" },
    ],
    image: "/images/unitronic.png",
    standards: ["DIN 47100", "CE", "UL Recognized"],
    isFeatured: true,
  },
  {
    id: "lapp-etherline",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "ETHERLINE® Industrial Ethernet & Profinet",
    category: "Data & Bus Cables",
    code: "ETHERLINE-CAT6A-PN",
    shortDesc: "High-speed Cat.6A industrial Ethernet cable for flexible and drag chain industrial operations.",
    details:
      "Supports 10 Gbit/s industrial Ethernet in heavy robotic and manufacturing automation settings. High resistance to lubricants, weld splatter, and continuous torsional stress.",
    specifications: [
      { label: "Transmission Rate", value: "Up to 10 Gbit/s Cat.6A" },
      { label: "Shielding", value: "SF/UTP (Braid + Foil)" },
      { label: "Outer Sheath", value: "PUR / Halogen-free FRNC" },
      { label: "Flexing Life", value: "> 5 million cycles" },
    ],
    image: "/images/etherline.png",
    standards: ["Profinet Type C", "Cat.6A", "UL/CSA"],
  },
  {
    id: "lapp-hitronic",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "HITRONIC® Superfast Optical Fibre Cables",
    category: "Data & Bus Cables",
    code: "HITRONIC-TDM",
    shortDesc: "Non-metallic, longitudinal and transversely watertight universal indoor/outdoor optical fiber cables.",
    details:
      "Engineered for high data bandwidth transmission immune to all electromagnetic interference. Perfect for high-voltage substations, campus networks, and automated storage systems.",
    specifications: [
      { label: "Fiber Types", value: "Single-mode 9/125, Multi-mode OM3/OM4" },
      { label: "Fiber Count", value: "4, 8, 12, 24 fibers" },
      { label: "Protection", value: "Rodent protection & LSZH jacket" },
      { label: "Tensile Strength", value: "Up to 3000 N" },
    ],
    image: "/images/hitronic.png",
    standards: ["IEC 60794", "CE", "RoHS"],
  },
  {
    id: "lapp-skintop",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "SKINTOP® High-Performance Cable Glands",
    category: "Cable Glands & Connectors",
    code: "SKINTOP-MS-M",
    shortDesc: "Nickel-plated brass cable gland with metric connecting thread and optimum strain relief.",
    details:
      "The benchmark in cable termination with patented lamellar clamp system that guarantees IP68 protection up to 10 bar. Chemical resistant, vibration-proof, and anti-twist.",
    specifications: [
      { label: "Protection Class", value: "IP68 (10 bar) / IP69" },
      { label: "Material", value: "Nickel-plated brass / Polyamide 6" },
      { label: "Thread Sizes", value: "M12 to M63 x 1.5" },
      { label: "Temperature", value: "-40°C to +100°C" },
    ],
    image: "/images/skintop.png",
    standards: ["IP68", "UL Recognized", "VDE", "DNV-GL"],
    isFeatured: true,
  },
  {
    id: "lapp-epic",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "EPIC® Heavy-Duty Industrial Connectors",
    category: "Cable Glands & Connectors",
    code: "EPIC-HBE-16",
    shortDesc: "Robust rectangular and circular power & signal multi-pin connectors for heavy industry.",
    details:
      "Die-cast aluminum housings with powder coating provide impenetrable shielding for harsh robotics, plastic molding, packaging machinery, and rolling stock.",
    specifications: [
      { label: "Rated Voltage", value: "Up to 500 V / 16 A" },
      { label: "Number of Pins", value: "6, 10, 16, 24, 32 contacts" },
      { label: "Locking Mechanism", value: "Single or double lever latching" },
      { label: "Enclosure Rating", value: "IP65 certified" },
    ],
    image: "/images/epic.png",
    standards: ["DIN EN 61984", "UL", "CSA"],
  },
  {
    id: "lapp-silvyn",
    brandId: "lapp",
    brandName: "Lapp Kabel",
    name: "SILVYN® Flexible Conduit & Protection Systems",
    category: "Cable Glands & Connectors",
    code: "SILVYN-RILL-PA6",
    shortDesc: "Corrugated protective conduits and matching fittings for comprehensive mechanical defense.",
    details:
      "Provides complete cable enclosure protecting conductors against abrasion, hot chips, oils, aggressive fluids, and heavy impacts in conveyor and machine tool applications.",
    specifications: [
      { label: "Material", value: "Specially formulated Polyamide 6" },
      { label: "Fire Classification", value: "UL94 V0 self-extinguishing" },
      { label: "Impact Strength", value: "Class 4 (Heavy duty)" },
      { label: "Fitting System", value: "Fast push-in lock" },
    ],
    image: "/images/silvyn.png",
    standards: ["EN 61386", "UL94-V0", "CE"],
  },

  // Eaton Moeller products
  {
    id: "eaton-pkz",
    brandId: "eaton",
    brandName: "Eaton - Moeller",
    name: "PKZ & PKE Motor-Protective Circuit Breakers",
    category: "Industrial Switchgear",
    code: "PKZM0-25",
    shortDesc: "Fuseless motor protection up to 65 A with short-circuit breaking capacity up to 150 kA.",
    details:
      "The global standard for motor isolation, overload protection, and phase failure detection. Integrates smoothly with contactors and SmartWire-DT communication modules.",
    specifications: [
      { label: "Current Range", value: "0.1 A to 65 A" },
      { label: "Short Circuit Capacity", value: "150 kA / 50 kA at 400V" },
      { label: "Tripping Class", value: "Class 10 adjustable" },
      { label: "Mounting", value: "Top-hat rail DIN EN 60715" },
    ],
    image: "/images/resource/et1.jpg",
    standards: ["IEC/EN 60947-4-1", "UL 508", "CSA"],
    isFeatured: true,
  },
  {
    id: "eaton-dil",
    brandId: "eaton",
    brandName: "Eaton - Moeller",
    name: "DIL Contactors & Contactor Relays",
    category: "Industrial Switchgear",
    code: "DILM-XT",
    shortDesc: "Compact power contactors with low coil consumption and long electrical lifespan.",
    details:
      "Engineered for heavy inductive duty (AC-3) in pump panels, motor control centers (MCC), and automated machinery. Features dual-box terminals for secure wiring.",
    specifications: [
      { label: "Rated Power", value: "Up to 2600 A / 900 kW" },
      { label: "Control Voltage", value: "24V DC to 230V AC" },
      { label: "Auxiliary Contacts", value: "Integrated 1NO + 1NC" },
      { label: "Mechanical Lifespan", value: "10 million operating cycles" },
    ],
    image: "/images/resource/et2.jpg",
    standards: ["IEC/EN 60947", "UL", "CCC"],
  },
  {
    id: "eaton-rmq",
    brandId: "eaton",
    brandName: "Eaton - Moeller",
    name: "RMQ-Titan 22.5mm Pilot Devices & Palm Switches",
    category: "Industrial Switchgear",
    code: "RMQ-TITAN-M22",
    shortDesc: "Ergonomic pushbuttons, emergency stops, indicator lamps, and palm switches.",
    details:
      "High ingress protection up to IP67 and IP69K allowing high-pressure washdowns in pharmaceutical, food, and automotive control consoles.",
    specifications: [
      { label: "Mounting Diameter", value: "22.5 mm" },
      { label: "Ingress Rating", value: "IP67 / IP69K (washdown)" },
      { label: "Illumination", value: "High-efficiency multi-LED" },
      { label: "Contact Modules", value: "Tool-less front clip-on" },
    ],
    image: "/images/resource/et4.jpg",
    standards: ["IP69K", "IEC 60947-5-1", "UL Listed"],
  },

  // Mennekes products
  {
    id: "mennekes-cee",
    brandId: "mennekes",
    brandName: "Mennekes",
    name: "CEE Industrial Plugs & Sockets (16A – 125A)",
    category: "Industrial Sockets & Receptacles",
    code: "MENNEKES-POWERTOP-XTRA",
    shortDesc: "Heavy-duty industrial plugs, connectors, and panel-mounted sockets for tough site operations.",
    details:
      "Features rubberized grip zones, highly heat-resistant contact carriers, and nickel-plated contacts. Guarantees moisture and dust tight connections up to IP67.",
    specifications: [
      { label: "Current Ratings", value: "16A, 32A, 63A, 125A" },
      { label: "Pin Configurations", value: "3-pin, 4-pin, 5-pin (230V / 400V)" },
      { label: "Enclosure Ingress", value: "IP44 / IP67 watertight" },
      { label: "Housing Material", value: "Impact-proof Polyamide (AM-TOP)" },
    ],
    image: "/images/resource/me1.jpg",
    standards: ["IEC 60309-1/-2", "EN 60309", "VDE"],
    isFeatured: true,
  },
  {
    id: "mennekes-receptacle",
    brandId: "mennekes",
    brandName: "Mennekes",
    name: "EverGUM & AMAXX Receptacle Combinations",
    category: "Industrial Sockets & Receptacles",
    code: "MENNEKES-AMAXX-DB",
    shortDesc: "Customizable power distributor boxes with integrated circuit breakers and residual current protection.",
    details:
      "Made of solid rubber (EverGUM) or high-grade thermoplastic (AMAXX) resisting chemicals, oils, and heavy physical shocks on construction and industrial workshop floors.",
    specifications: [
      { label: "Protection", value: "Integrated MCBs & RCDs" },
      { label: "Ingress Rating", value: "IP44 / IP67" },
      { label: "Impact Resistance", value: "IK08 / IK10" },
      { label: "Modular Design", value: "Up to 5 segment rows" },
    ],
    image: "/images/resource/me6.jpg",
    standards: ["DIN EN 61439", "CE", "DNV-GL"],
  },

  // Partex products
  {
    id: "partex-sleeves",
    brandId: "partex",
    brandName: "Partex",
    name: "PARTEX Marking Sleeves & Wire Markers",
    category: "Wire & Cable Marking",
    code: "PARTEX-PS-SLEEVE",
    shortDesc: "Pre-printed and print-on-demand sleeves for clear, lasting wire identification.",
    details:
      "Wire and cable markers for control panels, machine wiring and plant installations. Legible numbering that stays put through heat, oil and handling.",
    specifications: [
      { label: "Application", value: "Wire & cable identification" },
      { label: "Formats", value: "Sleeves, clip-on markers, flat labels" },
      { label: "Marking", value: "Pre-printed or printed on demand" },
      { label: "Origin", value: "Sweden" },
    ],
    image: "/images/clients/partex.png",
    standards: ["CE", "RoHS"],
    isFeatured: true,
  },
  {
    id: "partex-printers",
    brandId: "partex",
    brandName: "Partex",
    name: "PARTEX Marking Printers & Software",
    category: "Wire & Cable Marking",
    code: "PARTEX-PRINT",
    shortDesc: "Printers and software for producing wire and component markers in-house.",
    details:
      "Produce sleeves and labels on site with the sequence and legend your drawings call for, so panel shops spend less time on manual marking.",
    specifications: [
      { label: "Output", value: "Sleeves, labels, tags" },
      { label: "Use", value: "Panel building, maintenance, projects" },
      { label: "Origin", value: "Sweden" },
    ],
    image: "/images/clients/partex.png",
    standards: ["CE"],
  },
];


export const CLIENTS_LIST: ClientPartner[] = [
  { name: "Toyota Kirloskar", logo: "/images/clients/toyota.png", industry: "Automotive" },
  { name: "Tata Motors", logo: "/images/clients/tata-motors.png", industry: "Commercial Vehicles" },
  { name: "Tata Advanced Materials", logo: "/images/clients/tata-advanced-materials.png", industry: "Aerospace" },
  { name: "Bharat Electronics (BEL)", logo: "/images/clients/bel.png", industry: "Defense Electronics" },
  { name: "BEML Limited", logo: "/images/clients/beml.png", industry: "Heavy Engineering & Metro" },
  { name: "GE Transportation", logo: "/images/clients/ge-transportation.png", industry: "Locomotives & Energy" },
  { name: "Kennametal", logo: "/images/clients/kennametal.png", industry: "Precision Tooling" },
  { name: "SKF Bearings", logo: "/images/clients/skf.png", industry: "Industrial Engineering" },
  { name: "Ace Designers Ltd", logo: "/images/clients/ace-designers.png", industry: "CNC Machine Tools" },
  { name: "AMS (Ace Micromatic)", logo: "/images/clients/ams.png", industry: "Machining Systems" },
  { name: "Biesse India", logo: "/images/clients/biesse.png", industry: "Wood & Glass Machinery" },
  { name: "DISA India", logo: "/images/clients/disa.png", industry: "Foundry Machinery" },
  { name: "Rittal India", logo: "/images/clients/rittal.png", industry: "Enclosures & IT Infra" },
  { name: "TVS Motor Company", logo: "/images/clients/tvs.png", industry: "Automobile" },
  { name: "TEAL (Titan Engineering)", logo: "/images/clients/teal.png", industry: "Automation & Aerospace" },
  { name: "Orb Energy", logo: "/images/clients/orb-energy.png", industry: "Solar Power Systems" },
  { name: "Saint-Gobain Gyproc", logo: "/images/clients/gyproc.png", industry: "Building Materials" },
  { name: "Faiveley Transport", logo: "/images/clients/faiveley.png", industry: "Railway Systems" },
  { name: "Nordson", logo: "/images/clients/nordson.png", industry: "Dispensing Systems" },
  { name: "Saint-Gobain Norton", logo: "/images/clients/norton.png", industry: "Abrasives & Refractories" },
  { name: "Steer Engineering", logo: "/images/clients/steer.png", industry: "Extrusion Technology" },
  { name: "TD Power Systems (TDPS)", logo: "/images/clients/tdps.png", industry: "Generators & Turbines" },
  { name: "EFD Induction", logo: "/images/clients/efd.png", industry: "Induction Heating" },
  { name: "Gabriel India", logo: "/images/clients/gabriel.png", industry: "Ride Control Products" },
  { name: "Aplcom Technologies", logo: "/images/clients/aplcom.png", industry: "Automation Systems" },
  { name: "ETA Technology", logo: "/images/clients/eta.png", industry: "Welding & Test Benches" },
  { name: "Vee Vee Controls", logo: "/images/clients/vee-vee-controls.png", industry: "Control Panels" },
];

export const SERVICES_DATA = [
  {
    id: "electrical",
    title: "Cost-Effective & Reliable Electrical Solutions",
    subtitle: "Engineered Power & Control",
    description:
      "We offer customized electrical control equipment, wire harness assemblies, LT and HT cables, cable glands, conductors, and connectors specifically configured for high-stress manufacturing plants.",
    features: [
      "Custom control panel wiring & harness assemblies",
      "Authorized Lapp Olflex & Uniplus bulk supply",
      "Comprehensive cable glanding & conduit protection systems",
      "End-to-end statutory and electrical safety compliance",
    ],
    image: "/images/gallery/are.jpg",
  },
  {
    id: "energy",
    title: "Energy Saving LED Lighting Solutions",
    subtitle: "Sustainable Illumination",
    description:
      "Supply and complete installation of all kinds of high-efficacy LED light fittings for retrofits and new establishments, reducing shop floor power consumption by up to 65%.",
    features: [
      "Factory & shop floor high-bay LED retrofit projects",
      "Commercial office and cleanroom luminaires",
      "Lighting lux level auditing & ROI payback simulation",
      "Heavy duty surge protected luminaires for harsh plants",
    ],
    image: "/images/gallery/led.jpg",
  },
  {
    id: "grounding",
    title: "Earthing & Lightning Protection Systems",
    subtitle: "Complete Personnel & Asset Safety",
    description:
      "Specialized auditing and precision installation of electrical earth pits, maintenance-free chemical grounding solutions, and active ESE lightning arrestor networks.",
    features: [
      "Auditing and testing of existing electrical earth pits",
      "Maintenance-free chemical grounding installation",
      "Early Streamer Emission (ESE) lightning arrestors",
      "Exothermic welding for low-impedance permanent bonding",
    ],
    image: "/images/gallery/grounding.jpg",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-grounding",
    title: "Precision Chemical Grounding Systems",
    category: "Safety & Protection",
    clients: "GE India, Toyota, National Aerospace Laboratory (NAL), Orb Energy",
    summary:
      "Complete supply and precision installation of maintenance-free carbon chemical grounding systems across Bangalore manufacturing plants and critical research laboratories.",
    highlights: [
      "Achieved sub-1-Ohm resistance across high-resistivity soil",
      "Zero periodic watering required with 25-year service life guarantee",
      "Certified to IEEE 80, IS 3043, and IEC safety standards",
    ],
    image: "/images/resource/ind1.jpg",
  },
  {
    id: "cs-led",
    title: "Industrial LED High-Bay & Office Retrofits",
    category: "Energy Efficiency",
    clients: "Denso Kirloskar, Sartorius, EFD, BP Biotree, Tata Advance Materials, Sutures India, Kennametal",
    summary:
      "Comprehensive retrofit and installation of high-efficiency industrial LED light fixtures for new factory blocks, CNC shop floors, cleanrooms, and corporate offices.",
    highlights: [
      "Over 60% lighting energy savings across continuous 24/7 operating lines",
      "Uniform lux distribution improving operator inspection accuracy",
      "Complete seamless execution during scheduled maintenance downtime",
    ],
    image: "/images/resource/ind3.jpg",
  },
  {
    id: "cs-lightning",
    title: "Active ESE Lightning Protection Network",
    category: "Infrastructure Defense",
    clients: "Ace Designers Ltd, Himalaya Drug Company, H & R Johnson",
    summary:
      "Specialized installation of advanced Early Streamer Emission (ESE) lightning arrestor systems protecting high-bay factory structures, CNC tooling shops, and pharmaceutical labs.",
    highlights: [
      "Expanded 120-meter protection umbrella per terminal",
      "Complete surge protection safeguarding computerized CNC machine controls",
      "Accompanied by shop floor LED retrofit for maximum operating savings",
    ],
    image: "/images/resource/ind2.jpg",
  },
];

export const INDUSTRIES_SERVED = [
  { name: "OEM & Machine Manufacturers", icon: "Cog", desc: "Custom harness, motor circuit breakers, and flexible cables." },
  { name: "Panel Builders & System Integrators", icon: "Cpu", desc: "Modular switchgears, pilot devices, and DIN-rail terminals." },
  { name: "Renewable Energy (Solar & Wind)", icon: "Sun", desc: "Chemical grounding, UV-resistant cables, and surge protection." },
  { name: "Automobile & Rail Transport", icon: "Car", desc: "Vibration-proof connectors, CEE receptacles, and high-temp cables." },
  { name: "Pharmaceutical & Biotech", icon: "Shield", desc: "IP69K washdown pilot switches, cleanroom LEDs, and earthing." },
  { name: "Packaging & Bottling Machinery", icon: "Box", desc: "Continuous drag-chain cables, high-speed ethernet, and sensors." },
  { name: "Steel, Cement & Heavy Industry", icon: "Layers", desc: "Robust metal glands, heavy-duty contactors, and cable conduits." },
  { name: "Defense & Aerospace", icon: "Compass", desc: "UL/CSA certified fire-retardant wiring and precision connectors." },
];

export const SPECIAL_OFFERS: SpecialOfferItem[] = [
  {
    partNo: "OLFLEX-110-3G1.5",
    description: "Lapp Olflex Classic 110 3 Core 1.5 sq.mm Flexible Control Cable",
    category: "Control Cable",
    brand: "Lapp",
    status: "In Stock - Special Lot",
    unit: "100m Coils / Reels",
  },
  {
    partNo: "PKZM0-16",
    description: "Eaton Moeller Motor Protective Circuit Breaker 10A - 16A",
    category: "Switchgear",
    brand: "Eaton",
    status: "Limited Stock",
    unit: "Units",
  },
  {
    partNo: "MENN-13A-32A-4P",
    description: "Mennekes 32A 4P 400V IP44 CEE Panel Mounted Socket",
    category: "Industrial Socket",
    brand: "Mennekes",
    status: "Ready for Dispatch",
    unit: "Pack of 5",
  },
  {
    partNo: "SKIN-MS-M25",
    description: "Lapp Skintop MS-M Nickel Plated Brass Cable Glands M25",
    category: "Cable Glands",
    brand: "Lapp",
    status: "Special Clearance",
    unit: "Box of 25",
  },
  {
    partNo: "PARTEX-PS-SLEEVE",
    description: "Partex Wire Marking Sleeves, pre-printed numbering sets",
    category: "Wire Marking",
    brand: "Partex",
    status: "Ready for Dispatch",
    unit: "Packs",
  },
];
