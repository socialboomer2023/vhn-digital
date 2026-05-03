import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Landmark, HeartPulse, ShoppingCart, Factory, Cpu, Truck,
  GraduationCap, Signal, Zap, ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  {
    icon: Landmark,
    title: 'Banking & Financial Services',
    description: 'Digital transformation for banks, insurance companies, and fintechs. We deliver secure, compliant solutions for payments, lending, risk management, and customer engagement.',
    stats: { clients: '120+', growth: '35%' },
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    description: 'HIPAA-compliant cloud infrastructure, AI-powered diagnostics, and patient data platforms. We help healthcare organizations improve outcomes through intelligent technology.',
    stats: { clients: '85+', growth: '42%' },
  },
  {
    icon: ShoppingCart,
    title: 'Retail & Consumer Goods',
    description: 'Omnichannel commerce platforms, supply chain optimization, and customer analytics. Transform shopping experiences with data-driven personalization.',
    stats: { clients: '95+', growth: '28%' },
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Industry 4.0 solutions including IoT integration, predictive maintenance, and smart factory automation. Increase efficiency and reduce downtime with AI.',
    stats: { clients: '70+', growth: '38%' },
  },
  {
    icon: Cpu,
    title: 'Technology & Software',
    description: 'Scale your tech stack with cloud-native architecture, DevOps automation, and platform engineering. We help SaaS companies build for millions of users.',
    stats: { clients: '150+', growth: '45%' },
  },
  {
    icon: Truck,
    title: 'Transportation & Logistics',
    description: 'Real-time fleet management, route optimization, and supply chain visibility. Digital solutions that keep goods moving efficiently across the globe.',
    stats: { clients: '45+', growth: '32%' },
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Learning management systems, student analytics, and campus digitization. We build technology that enhances educational outcomes at every level.',
    stats: { clients: '60+', growth: '25%' },
  },
  {
    icon: Signal,
    title: 'Telecommunications',
    description: '5G infrastructure, network optimization, and customer experience platforms. Modernize telecom operations for the connected world.',
    stats: { clients: '30+', growth: '40%' },
  },
  {
    icon: Zap,
    title: 'Energy & Utilities',
    description: 'Smart grid solutions, asset management, and sustainability analytics. Drive operational excellence in the evolving energy landscape.',
    stats: { clients: '40+', growth: '33%' },
  },
];

export default function Industries() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.fromTo(hero.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
          delay: i % 3 * 0.1,
        }
      );
    });
  }, []);

  return (
    <main className="relative pt-[72px]" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6">
        <div ref={heroRef} className="max-w-[1280px] mx-auto">
          <span className="label-mono block mb-4">Industries</span>
          <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] max-w-[800px]">
            Deep expertise across sectors
          </h1>
          <p className="font-body text-[1.125rem] leading-[1.7] text-[#8B95A5] max-w-[600px] mt-6">
            We understand the unique challenges of your industry. Our domain experts combine sector knowledge with cutting-edge technology to deliver solutions that drive real results.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="pb-24 lg:pb-32 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className="glass-panel p-8 rounded opacity-0 group cursor-default"
                style={{ border: '1px solid rgba(78, 205, 196, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(78, 205, 196, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={32} className="text-[#4ECDC4] mb-4" />
                <h3 className="font-heading font-normal text-[1.25rem] text-[#E8EDF5] mb-3">
                  {industry.title}
                </h3>
                <p className="font-body text-[0.9375rem] leading-[1.6] text-[#8B95A5] mb-6">
                  {industry.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-[rgba(232,237,245,0.06)]">
                  <div>
                    <div className="font-heading text-[1.25rem] text-[#E8EDF5]">{industry.stats.clients}</div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-wider text-[#8B95A5]">Clients</div>
                  </div>
                  <div className="w-px h-8 bg-[rgba(232,237,245,0.1)]" />
                  <div>
                    <div className="font-heading text-[1.25rem] text-[#4ECDC4]">{industry.stats.growth}</div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-wider text-[#8B95A5]">YoY Growth</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-heading font-light text-[clamp(2rem,3vw,3rem)] text-[#E8EDF5] mb-4">
            Don't see your industry?
          </h2>
          <p className="font-body text-[1rem] text-[#8B95A5] max-w-[500px] mx-auto mb-8">
            We work with organizations across all sectors. Let's discuss how we can help yours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-heading text-[0.875rem] uppercase tracking-[0.04em] bg-[#4ECDC4] text-[#0B1628] px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#3DBDB5] hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
