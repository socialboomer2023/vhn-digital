import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, Lightbulb, TrendingUp, ArrowRight, Award, Globe, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: Target,
    title: 'Purpose-Driven',
    description: 'Every solution we build starts with understanding your business objectives. Technology is a means to an end — your success is our metric.',
  },
  {
    icon: Users,
    title: 'Partnership First',
    description: "We don't just deliver projects; we build lasting relationships. Our teams embed with yours to ensure knowledge transfer and sustainable outcomes.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation Mindset',
    description: "We stay ahead of the curve so you don't have to. Continuous learning, R&D investment, and early adoption of proven technologies keep you competitive.",
  },
  {
    icon: TrendingUp,
    title: 'Measurable Impact',
    description: 'We define success in business terms — cost reduction, revenue growth, risk mitigation. Every engagement has clear KPIs and accountability.',
  },
];

const STATS = [
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Globe, value: '500+', label: 'Global Clients' },
  { icon: Users, value: '2,500+', label: 'Team Members' },
  { icon: Clock, value: '99.9%', label: 'Client Retention' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.fromTo(hero.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    gsap.fromTo(content,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: content, start: 'top 75%' },
      }
    );
  }, []);

  useEffect(() => {
    const values = valuesRef.current.filter(Boolean);
    values.forEach((val) => {
      gsap.fromTo(val,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: val, start: 'top 80%' },
        }
      );
    });
  }, []);

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;
    gsap.fromTo(stats.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: stats, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <main className="relative pt-[72px]" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6">
        <div ref={heroRef} className="max-w-[1280px] mx-auto">
          <span className="label-mono block mb-4">About Us</span>
          <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] max-w-[900px]">
            Engineering the future of enterprise technology
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-24 lg:pb-32 px-6">
        <div ref={contentRef} className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center opacity-0">
          <div>
            <img
              src="/images/img-1.jpg"
              alt="VHN Services Operations Center"
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
          <div>
            <h2 className="font-heading font-normal text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] text-[#E8EDF5] mb-6">
              Our Story
            </h2>
            <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5] mb-4">
              Founded with a vision to bridge the gap between complex enterprise technology and tangible business outcomes, VHN Services has grown into a trusted partner for organizations worldwide.
            </p>
            <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5] mb-4">
              Our team of 2,500+ engineers, architects, and consultants brings deep expertise across cloud, AI, cybersecurity, and data engineering. We combine technical excellence with business acumen to deliver solutions that don't just work — they transform.
            </p>
            <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5]">
              Headquartered with a global delivery model, we serve clients across North America, Europe, and Asia-Pacific. Our culture of innovation, integrity, and client obsession drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: 'rgba(13, 27, 42, 0.6)', backdropFilter: 'blur(12px)' }}>
        <div ref={statsRef} className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center opacity-0">
                <Icon size={28} className="text-[#4ECDC4] mx-auto mb-3" />
                <div className="font-heading text-[2.5rem] text-[#E8EDF5]">{stat.value}</div>
                <div className="font-mono text-[0.75rem] uppercase tracking-wider text-[#8B95A5]">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <span className="label-mono block mb-4">Our Values</span>
            <h2 className="font-heading font-light text-[clamp(2rem,3vw,3rem)] text-[#E8EDF5]">
              What drives us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={(el) => { if (el) valuesRef.current[index] = el; }}
                  className="glass-panel p-8 rounded opacity-0"
                  style={{ border: '1px solid rgba(78, 205, 196, 0.1)' }}
                >
                  <Icon size={28} className="text-[#4ECDC4] mb-4" />
                  <h3 className="font-heading font-normal text-[1.25rem] text-[#E8EDF5] mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-[0.9375rem] leading-[1.6] text-[#8B95A5]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-heading font-light text-[clamp(2rem,3vw,3rem)] text-[#E8EDF5] mb-4">
            Want to join our team?
          </h2>
          <p className="font-body text-[1rem] text-[#8B95A5] max-w-[500px] mx-auto mb-8">
            We're always looking for exceptional talent. Explore opportunities to grow your career with us.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 font-heading text-[0.875rem] uppercase tracking-[0.04em] bg-[#4ECDC4] text-[#0B1628] px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#3DBDB5] hover:-translate-y-0.5"
          >
            View Careers
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
