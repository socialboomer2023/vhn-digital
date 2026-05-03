import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Brain, Shield, Database, Layers, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Multi-cloud and hybrid infrastructure designed for scale, resilience, and cost optimization.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Custom models, predictive analytics, and intelligent automation integrated into your operations.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Zero-trust architecture, threat detection, and compliance frameworks for regulated industries.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Lakehouse platforms, real-time pipelines, and governance that turns raw data into decisions.',
  },
  {
    icon: Layers,
    title: 'Enterprise Software',
    description: 'Custom ERP, CRM, and workflow platforms built for your specific business logic.',
  },
  {
    icon: GitBranch,
    title: 'DevOps & SRE',
    description: 'CI/CD pipelines, infrastructure as code, and 24/7 reliability engineering.',
  },
];

export default function SolutionsGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1280px] mx-auto">
        <span className="label-mono block mb-4">What We Do</span>
        <h2 className="font-heading font-normal text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] tracking-[-0.01em] text-[#E8EDF5] mb-16">
          <span className="block">From cloud infrastructure</span>
          <span className="block">to intelligent edge</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Link
                key={solution.title}
                to="/services"
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className="glass-panel p-10 rounded transition-all duration-400 hover:-translate-y-1 group cursor-pointer"
                style={{
                  border: '1px solid rgba(78, 205, 196, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.3)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(78, 205, 196, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(78, 205, 196, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={32} className="text-[#4ECDC4] mb-6" />
                <h3 className="font-heading font-normal text-[1.25rem] text-[#E8EDF5] mb-3">
                  {solution.title}
                </h3>
                <p className="font-body text-[0.9375rem] leading-[1.6] text-[#8B95A5]">
                  {solution.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
