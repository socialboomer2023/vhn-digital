import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4)
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.75)
      .to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.5 }, 0.95)
      .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5 }, 1.2);

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 100);
        scrollIndicatorRef.current.style.opacity = String(opacity);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center"
      style={{ zIndex: 1, paddingLeft: '8vw' }}
    >
      <div className="max-w-[680px]">
        <span
          ref={labelRef}
          className="label-mono block mb-6 opacity-0 translate-y-5"
        >
          AI-Native Enterprise Solutions
        </span>

        <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5]">
          <span ref={line1Ref} className="block opacity-0 translate-y-10" style={{ textShadow: '0 2px 30px rgba(11, 22, 40, 0.5)' }}>
            Intelligent systems.
          </span>
          <span ref={line2Ref} className="block opacity-0 translate-y-10" style={{ textShadow: '0 2px 30px rgba(11, 22, 40, 0.5)' }}>
            Infinite scale.
          </span>
        </h1>

        <p
          ref={subRef}
          className="font-body text-[1.125rem] leading-[1.7] tracking-[0.01em] text-[#8B95A5] max-w-[480px] mt-8 opacity-0 translate-y-5"
        >
          We architect cloud-native platforms, AI-driven analytics, and enterprise software that transforms how global organizations operate.
        </p>

        <div ref={ctaRef} className="mt-10 opacity-0 scale-95">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-heading text-[0.875rem] uppercase tracking-[0.04em] bg-[#4ECDC4] text-[#0B1628] px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#3DBDB5] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(78,205,196,0.25)]"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            Explore our solutions
            <ArrowRight
              size={16}
              className="transition-transform duration-300"
              style={{ transform: ctaHover ? 'translateX(4px)' : 'translateX(0)' }}
            />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div
          className="w-px h-10 bg-[#8B95A5]"
          style={{
            animation: 'scrollBounce 1.5s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(12px); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
