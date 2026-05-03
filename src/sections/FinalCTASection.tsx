import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.35'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center py-[120px] px-6"
      style={{
        zIndex: 1,
        minHeight: '60vh',
        background: 'rgba(11, 22, 40, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <h2
        ref={headlineRef}
        className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] text-center opacity-0"
      >
        Let's build what's next.
      </h2>

      <p
        ref={subRef}
        className="font-body text-[1.125rem] leading-[1.7] tracking-[0.01em] text-[#8B95A5] text-center mt-6 opacity-0"
      >
        Start a conversation about your transformation journey.
      </p>

      <div ref={ctaRef} className="mt-10 opacity-0">
        <Link
          to="/contact"
          className="inline-flex items-center font-heading text-[1rem] uppercase tracking-[0.04em] bg-[#4ECDC4] text-[#0B1628] px-10 py-4 rounded-sm transition-all duration-300 hover:bg-[#3DBDB5] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(78,205,196,0.25)]"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
