import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'down':
      return { x: 0, y: -distance, scale: 1 };
    case 'left':
      return { x: distance, y: 0, scale: 1 };
    case 'right':
      return { x: -distance, y: 0, scale: 1 };
    case 'zoom':
      return { x: 0, y: 0, scale: 0.92 };
    case 'none':
      return { x: 0, y: 0, scale: 1 };
    case 'up':
    default:
      return { x: 0, y: distance, scale: 1 };
  }
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
  /** Direction the content flies in from (default: up) */
  direction?: Direction;
}

/** Fades + slides + (optionally) zooms any block into view on scroll. */
export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  className = '',
  once = false,
  direction = 'up',
}) => {
  const o = getOffset(direction, yOffset);
  return (
    <motion.div
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Parent that staggers its <StaggerItem> children as it scrolls into view. */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerDelta?: number;
  once?: boolean;
}> = ({ children, className = '', delayChildren = 0.05, staggerDelta = 0.1, once = false }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelta,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
}> = ({ children, className = '', direction = 'up' }) => {
  const o = getOffset(direction, 32);
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: o.x, y: o.y, scale: o.scale === 1 ? 0.97 : o.scale },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

/** Card with hover lift, cursor spotlight and shimmer sheen. */
export const InteractiveCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden group transition-shadow duration-300 shadow-sm hover:shadow-2xl ${className}`}
    >
      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(230, 222, 250,0.35), transparent 70%)',
        }}
      />
      {/* Shimmer sheen on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />
      {children}
    </motion.div>
  );
};

/** Image that reveals with a clip + zoom and gently parallaxes while scrolling. */
export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
}> = ({ src, alt, className = '', imgClassName = '', strength = 40 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(12% 8% 12% 8% round 24px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE }}
      className={`overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className={`w-full h-full object-cover ${imgClassName}`}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

/** Animated headline: words rise in one-by-one. */
export const WordReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};