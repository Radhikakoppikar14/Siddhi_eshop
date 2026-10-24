export interface IndustryItem {
  name: string;
  desc: string;
  image: string; // drop a relevant photo at this path in /public
}

// Images live in /public/images/industries (.jpg stills from the hero videos).
export const INDUSTRIES: IndustryItem[] = [
  { name: 'Automobile & Rail Transport', desc: 'Flexible control and power cables, connectors and glands for assembly lines, robotic cells and vehicle manufacturing plants.', image: '/images/industries/automobile-rail.jpg' },
  { name: 'Automation & Robotics', desc: 'Servo, data and control cabling with industrial plugs and motor protection for conveyor systems and automated material handling.', image: '/images/industries/automation-robotics.jpg' },
  { name: 'Mechanical & Plant Engineering', desc: 'Cables, connectors, circuit breakers and safety relays for machine tool builders and plant engineering.', image: '/images/industries/plant-engineering.jpg' },
  { name: 'OEM & Machine Manufacturers', desc: 'Custom harness, motor circuit breakers and flexible cables for machine builders.', image: '/images/industries/oem-machines.jpg' },
  { name: 'Panel Builders & System Integrators', desc: 'Contactors, pilot devices, wire marking and DIN-rail components for control panels.', image: '/images/industries/panel-builders.jpg' },
  { name: 'Renewable Energy (Solar & Wind)', desc: 'UV-resistant cables, connectors and protection for solar and wind installations.', image: '/images/industries/renewable-energy.jpg' },
  { name: 'Food & Beverage', desc: 'Washdown-rated pilot devices and cables for hygienic production lines.', image: '/images/industries/food-beverage.jpg' },
  { name: 'Oil, Gas, Chemical & Paint', desc: 'Chemical-resistant cables, glands and plugs for process plants.', image: '/images/industries/oil-gas-chemical.jpg' },
  { name: 'Steel & Cement', desc: 'Heavy-duty contactors, glands and conduit for demanding plant conditions.', image: '/images/industries/steel-cement.jpg' },
  { name: 'Packaging Machinery', desc: 'Drag-chain cables, industrial Ethernet and connectors for high-speed machines.', image: '/images/industries/packaging.jpg' },
  { name: 'Pharmaceutical & Bio Tech', desc: 'Washdown pilot switches, cables and marking for cleanroom and process areas.', image: '/images/industries/pharma-biotech.jpg' },
  { name: 'Research & Development', desc: 'Data and control cables and switchgear for laboratories and test setups.', image: '/images/industries/research-development.jpg' },
  { name: 'Garment & Textile', desc: 'Control cables, plugs and motor protection for textile machinery.', image: '/images/industries/garment-textile.jpg' },
  { name: 'Construction Industry', desc: 'Site power distribution units and CEE plugs and sockets for construction sites.', image: '/images/industries/construction.jpg' },
  { name: 'Contractors & Projects Management', desc: 'Project supply of cables, switchgear and plugs with documentation.', image: '/images/industries/contractors-projects.jpg' },
  { name: 'Medical Equipment', desc: 'Certified cables and connectors for medical and imaging equipment.', image: '/images/industries/medical-equipment.jpg' },
  { name: 'Marine Engineering', desc: 'Approved cables, glands and plugs for marine and offshore use.', image: '/images/industries/marine.jpg' },
  { name: 'Defense', desc: 'Fire-retardant wiring and precision connectors for defense electronics.', image: '/images/industries/defense.jpg' },
];

/**
 * Which industries each authorised brand serves (keyed by brand id in BRANDS_DATA).
 * Edit these lists to change what shows under each brand.
 */
export const BRAND_INDUSTRIES: Record<string, string[]> = {
  lapp: [
    'Automobile & Rail Transport', 'Automation & Robotics', 'Mechanical & Plant Engineering',
    'OEM & Machine Manufacturers', 'Renewable Energy (Solar & Wind)', 'Food & Beverage',
    'Packaging Machinery', 'Garment & Textile', 'Marine Engineering', 'Medical Equipment', 'Defense',
  ],
  eaton: [
    'Panel Builders & System Integrators', 'Automation & Robotics', 'OEM & Machine Manufacturers',
    'Steel & Cement', 'Renewable Energy (Solar & Wind)', 'Pharmaceutical & Bio Tech',
    'Food & Beverage', 'Research & Development', 'Packaging Machinery',
  ],
  partex: [
    'Panel Builders & System Integrators', 'OEM & Machine Manufacturers', 'Automobile & Rail Transport',
    'Contractors & Projects Management', 'Marine Engineering', 'Defense', 'Renewable Energy (Solar & Wind)',
  ],
  mennekes: [
    'Construction Industry', 'Contractors & Projects Management', 'Oil, Gas, Chemical & Paint',
    'Food & Beverage', 'Steel & Cement', 'Marine Engineering', 'Mechanical & Plant Engineering',
  ],
};

export const getIndustriesForBrand = (brandId: string): IndustryItem[] =>
  (BRAND_INDUSTRIES[brandId] ?? [])
    .map((name) => INDUSTRIES.find((i) => i.name === name))
    .filter((i): i is IndustryItem => Boolean(i));
