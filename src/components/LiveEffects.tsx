import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * LiveEffects
 * -----------------------------------------------------------------
 * Drop-in global animation layer. Mounted once in App.tsx and it:
 *  1. Reveals every section heading, paragraph, card, list item and image
 *     as it scrolls into view (staggered, with left / right / zoom variants).
 *  2. Adds a shine sweep + click ripple to every solid call-to-action button.
 *  3. Shows a scroll-progress bar at the top of the page.
 *  4. Adds a soft cursor-following glow on desktop.
 *
 * It re-scans automatically on route change and whenever new content is
 * mounted (tabs, filters, modals), and it skips anything that Framer Motion
 * already animates, so nothing is animated twice.
 */

const REVEAL_SELECTOR = [
  'section h1',
  'section h2',
  'section h3',
  'section > div > p',
  'section [class*="grid"] > *',
  'section ul > li',
  'section img',
  'footer [class*="grid"] > *',
  'footer ul > li',
].join(',');

const SHINE_SELECTOR = [
  'main button[class*="bg-[#6D3FD6]"]',
  'main a[class*="bg-[#6D3FD6]"]',
  'main button[class*="bg-[#1E1B2E]"]',
  'main a[class*="bg-[#1E1B2E]"]',
  'header a[class*="bg-[#6D3FD6]"]',
  'footer button[class*="bg-[#6D3FD6]"]',
].join(',');

const isFramerManaged = (el: Element): boolean => {
  const style = el.getAttribute('style') || '';
  return /opacity|transform/i.test(style);
};

const shouldSkip = (el: HTMLElement): boolean => {
  if (el.dataset.live) return true;
  if (isFramerManaged(el)) return true;
  if (el.closest('[class*="fixed"]')) return true;
  if (el.closest('.no-live')) return true;
  const cls = typeof el.className === 'string' ? el.className : '';
  if (/translate|animate-|absolute|sticky/.test(cls)) return true;
  // Skip tiny images (icons / bullets)
  if (el.tagName === 'IMG') {
    const r = el.getBoundingClientRect();
    if (r.width < 56 && r.height < 56) return true;
  }
  return false;
};

export const LiveEffects: React.FC = () => {
  const location = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<number | null>(null);

  /* ---------- Scroll reveal + shine scanner ---------- */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const VARIANTS = ['live-in', 'live-in-left', 'live-in-right', 'live-in-zoom'];

    // Play (or replay) the entrance animation
    const reveal = (el: HTMLElement) => {
      el.classList.remove('live-pre', ...VARIANTS);
      void el.offsetWidth; // force reflow so the animation restarts every time
      el.classList.add(el.dataset.liveVariant || 'live-in');
    };

    // Reset to hidden once it has left the screen, so it can play again next visit
    const hide = (el: HTMLElement) => {
      el.classList.remove(...VARIANTS);
      el.classList.add('live-pre');
    };

    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) reveal(el);
          else hide(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const scan = () => {
      if (reduce) return;

      // 1) Scroll reveal targets
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (shouldSkip(el)) return;
        el.dataset.live = '1';

        // Don't double-animate children of something we already reveal
        const parentTarget = el.parentElement?.closest('[data-live-parent]');
        if (parentTarget && el.tagName !== 'IMG') return;

        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.setProperty('--live-delay', `${Math.min(idx, 7) * 0.08}s`);

        let variant = 'live-in';
        if (el.tagName === 'IMG') variant = 'live-in-zoom';
        else if (el.matches('section [class*="grid"] > *') && siblings.length > 1 && siblings.length <= 4) {
          variant = idx % 2 === 0 ? 'live-in-left' : 'live-in-right';
        }
        el.dataset.liveVariant = variant;
        if (el.matches('[class*="rounded-"], li')) el.setAttribute('data-live-parent', '1');

        const r = el.getBoundingClientRect();
        const inView = r.bottom > 0 && r.top < window.innerHeight * 0.92;
        el.classList.add(inView ? variant : 'live-pre'); // visible now -> animate; else wait
        ioRef.current?.observe(el); // keep observing so it replays on every visit
      });

      // Re-attach pending elements (e.g. footer) after the observer was recreated on route change
      document.querySelectorAll<HTMLElement>('[data-live-variant]').forEach((el) => ioRef.current?.observe(el));

      // 2) Shine on solid CTA buttons
      document.querySelectorAll<HTMLElement>(SHINE_SELECTOR).forEach((btn) => {
        if (btn.classList.contains('live-shine') || btn.getAttribute('aria-label') === 'Back to top') return;
        const pos = window.getComputedStyle(btn).position;
        if (pos === 'absolute' || pos === 'fixed' || pos === 'sticky') return;
        btn.classList.add('live-shine');
      });

      // Safety net: never leave anything hidden
      window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.live-pre').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        });
      }, 6000);
    };

    const scheduleScan = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(scan, 140);
    };

    scheduleScan();
    const mo = new MutationObserver(scheduleScan);
    const targets = [document.querySelector('main'), document.querySelector('footer')];
    targets.forEach((t) => t && mo.observe(t, { childList: true, subtree: true }));

    return () => {
      mo.disconnect();
      ioRef.current?.disconnect();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  /* ---------- Click ripple on shine buttons ---------- */
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement)?.closest?.('.live-shine') as HTMLElement | null;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const dot = document.createElement('span');
      dot.className = 'live-ripple';
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - rect.left - size / 2}px`;
      dot.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(dot);
      window.setTimeout(() => dot.remove(), 700);
    };
    document.addEventListener('pointerdown', onDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  /* ---------- Scroll progress bar ---------- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

  /* ---------- Cursor glow (desktop only) ---------- */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      glowRef.current?.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => glowRef.current?.classList.remove('is-on');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="live-progress" aria-hidden="true" />
      <div ref={glowRef} className="live-glow" aria-hidden="true" />
    </>
  );
};