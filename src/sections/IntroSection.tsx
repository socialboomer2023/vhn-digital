import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const masks = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current].filter(Boolean);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      end: 'top 30%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.inOut')(progress);
        masks.forEach((mask, index) => {
          if (!mask) return;
          const staggerDelay = index * 0.15;
          const adjustedProgress = Math.max(0, Math.min(1, (easedProgress - staggerDelay) / (1 - staggerDelay)));
          mask.style.clipPath = `inset(0 0 ${100 - adjustedProgress * 100}% 0)`;
        });
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6"
      style={{ zIndex: 1 }}
    >
      {/* Dark halo for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(11, 22, 40, 0.7) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[800px] mx-auto text-center">
        <span className="label-mono block mb-8">Our Approach</span>

        <div className="reveal-text">
          <h2 className="font-heading font-light text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] tracking-[-0.01em] text-[#E8EDF5]">
            <div ref={line1Ref} className="line" style={{ clipPath: 'inset(0 0 100% 0)' }}>
              We don't just implement
            </div>
            <div ref={line2Ref} className="line" style={{ clipPath: 'inset(0 0 100% 0)' }}>
              technology.
            </div>
            <div ref={line3Ref} className="line" style={{ clipPath: 'inset(0 0 100% 0)' }}>
              We engineer the systems that
            </div>
            <div ref={line4Ref} className="line" style={{ clipPath: 'inset(0 0 100% 0)' }}>
              define your next decade.
            </div>
          </h2>
        </div>

        <p className="font-body text-[1.125rem] leading-[1.7] tracking-[0.01em] text-[#8B95A5] mt-6 max-w-[640px] mx-auto">
          From Fortune 500 enterprises to high-growth startups, we build the digital infrastructure, intelligence layers, and secure architectures that turn complexity into competitive advantage.
        </p>
      </div>
    </section>
  );
}
