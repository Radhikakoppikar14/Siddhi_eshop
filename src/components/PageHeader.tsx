import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  category?: string;
  bgImage?: string;
  bgVideo?: string;
  onOpenRfq?: (subject?: string) => void;
}

const DEFAULT_SUBTITLE =
  'Delivering manufacturer-certified cables, industrial switchgear, automation accessories, and electrical safety solutions with guaranteed reliability across India.';

const POINTS = ['Direct Factory Sourcing', '100% Genuine MTC', 'Pan-India Logistics'];

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  category = 'Siddhi Kabel LTD.',
  bgImage = '/images/main-slider/1.jpg',
  bgVideo,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [bgVideo]);

  return (
    <header className="relative overflow-hidden bg-white border-b border-[#F1D9CA]">
      {/* Photo shown as-is, no colour overlay, no pattern */}
      <div className="absolute inset-0 z-0">
        {bgVideo ? (
          <video
            ref={videoRef}
            src={bgVideo}
            poster={bgImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="no-zoom absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={bgImage}
            alt=""
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Plain white fade on the left so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
        <div className="max-w-3xl space-y-4">
          <nav className="flex items-center gap-2 text-sm text-[#5F524C]" aria-label="Breadcrumb">
            <Link to="/" className="font-medium hover:text-[#D2430F] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#231815]">{breadcrumb}</span>
          </nav>

          <p className="text-sm font-semibold text-[#D2430F]">
            {category}
            <span className="text-[#5F524C] font-normal"> &nbsp;|&nbsp; Official Channel Partner</span>
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#231815] font-editorial leading-[1.05]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#3D332E] leading-relaxed max-w-2xl">
            {subtitle || DEFAULT_SUBTITLE}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-medium text-[#231815]">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D2430F]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
