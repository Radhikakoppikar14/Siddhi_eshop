import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { BRANDS_DATA, PRODUCTS_CATALOG, ProductItem } from '../data/siddhiData';
import { BRAND_DETAILS } from '../data/brandDetails';
import { BrandIndustries } from '../components/BrandIndustries';
import { BRAND_INDUSTRIES } from '../data/industries';

// Image shown beside each brand's intro (stills live in /public/images/industries)
const BRAND_IMAGES: Record<string, string> = {
  lapp: '/images/industries/automation-robotics.jpg',
  eaton: '/images/industries/oem-machines.jpg',
  partex: '/images/industries/plant-engineering.jpg',
  mennekes: '/images/industries/construction.jpg',
};

interface BrandPageProps {
  onOpenSpecs: (product: ProductItem) => void;
  onGoToContact: (subject?: string) => void;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onOpenSpecs, onGoToContact }) => {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = BRANDS_DATA.find((b) => b.id === brandId);
  if (!brand) return <Navigate to="/products" replace />;

  const bgVideo = ['lapp', 'partex'].includes(brand.id) ? '/assets/videos/hero-1.mp4' : '/assets/videos/hero-2.mp4';
  const detail = BRAND_DETAILS[brand.id];
  const products = PRODUCTS_CATALOG.filter((p) => p.brandId === brand.id);

  return (
    <div className="bg-white text-[#231815]">
      {/* Brand colour header */}
      <header style={{ backgroundColor: brand.color }} className="relative overflow-hidden text-white">
        {/* Background video with a brand-colour wash so each brand keeps its own colour */}
        <video
          key={bgVideo}
          src={bgVideo}
          poster={bgVideo.replace('.mp4', '-poster.jpg')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${brand.color}F2 0%, ${brand.color}CC 45%, ${brand.color}80 100%)` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/90" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:underline">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold">{brand.name}</span>
          </nav>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="bg-white rounded-md w-52 h-20 flex items-center justify-center shrink-0">
              <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-[80%] object-contain" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial leading-none">{brand.name}</h1>
              <p className="mt-2 text-white/90">{brand.origin}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <p className="lg:col-span-8 text-lg leading-relaxed text-[#3D332E]">
          {detail?.intro ?? brand.fullDesc}
        </p>
        <div className="lg:col-span-4">
          <div
            className="overflow-hidden rounded-2xl shadow-md w-full max-w-xs sm:max-w-sm lg:max-w-none"
            style={{ border: `1px solid ${brand.color}55`, borderBottom: `5px solid ${brand.color}` }}
          >
            <img
              src={BRAND_IMAGES[brand.id] ?? '/images/industries/automation-robotics.jpg'}
              alt={`${brand.name} products in use`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // hide the whole frame if the file is missing so no empty gap is left
                const frame = e.currentTarget.parentElement;
                if (frame) frame.style.display = 'none';
              }}
              className="w-full aspect-[16/10] max-h-56 lg:max-h-60 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand range */}
      {detail && (
        <section className="border-t border-[#F1D9CA]" style={{ backgroundColor: brand.colorTint }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial" style={{ color: brand.colorDark }}>
              {brand.name.split(' ')[0]} product range
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {detail.sections.map((sec) => (
                <article
                  key={sec.title}
                  className="bg-white rounded-md border p-6"
                  style={{ borderColor: brand.color, borderTopWidth: 4 }}
                >
                  <h3 className="text-xl font-bold" style={{ color: brand.colorDark }}>{sec.title}</h3>
                  {sec.text && <p className="mt-3 text-sm leading-relaxed text-[#3D332E]">{sec.text}</p>}
                  {sec.items && (
                    <ul className="mt-3 space-y-2 text-sm text-[#3D332E]">
                      {sec.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0" style={{ backgroundColor: brand.color }} />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalogue products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial">Featured {brand.name.split(' ')[0]} products</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <article key={p.id} className="flex flex-col border border-[#F1D9CA] rounded-md overflow-hidden">
                <div className="h-44 bg-[#FFFAF6] flex items-center justify-center p-4">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-5 flex flex-col flex-1 border-t-4" style={{ borderColor: brand.color }}>
                  <h3 className="font-bold leading-snug">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#5F524C] leading-relaxed">{p.shortDesc}</p>
                  <button
                    type="button"
                    onClick={() => onOpenSpecs(p)}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer self-start"
                    style={{ color: brand.colorDark }}
                  >
                    View specifications <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Industries using this brand */}
      {(BRAND_INDUSTRIES[brand.id]?.length ?? 0) > 0 && (
        <section className="border-t border-[#F1D9CA]" style={{ backgroundColor: brand.colorTint }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial" style={{ color: brand.colorDark }}>
              Industries using {brand.name.split(' ')[0]}
            </h2>
            <div className="mt-8">
              <BrandIndustries brand={brand} />
            </div>
          </div>
        </section>
      )}

      {/* Other brands */}
      <section className="border-t border-[#F1D9CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="font-semibold">Other brands</span>
          {BRANDS_DATA.filter((b) => b.id !== brand.id).map((b) => (
            <Link key={b.id} to={`/products/${b.id}`} className="font-semibold hover:underline" style={{ color: b.colorDark }}>
              {b.name}
            </Link>
          ))}
          <button type="button" onClick={() => onGoToContact(brand.name)} className="ml-auto font-semibold text-[#D2430F] hover:underline cursor-pointer">
            Contact us about {brand.name.split(' ')[0]}
          </button>
        </div>
      </section>
    </div>
  );
};