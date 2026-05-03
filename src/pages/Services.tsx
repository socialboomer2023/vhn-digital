import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cloud, Brain, Shield, Database, Layers, GitBranch,
  ArrowRight, Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    subtitle: 'Multi-Cloud & Hybrid Infrastructure',
    description: 'Design, migrate, and optimize cloud environments across AWS, Azure, and Google Cloud Platform. Our certified architects build resilient, cost-efficient infrastructure that scales with your business.',
    features: ['Cloud-native application design', 'Multi-cloud strategy & governance', 'Kubernetes & container orchestration', 'Serverless architecture', 'Cloud cost optimization', 'Disaster recovery & backup'],
    image: '/images/img-3.jpg',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent Automation & Insights',
    description: 'From predictive analytics to generative AI, we build and deploy machine learning models that solve real business problems. Our data scientists work alongside your teams to identify high-value AI opportunities.',
    features: ['Custom ML model development', 'Natural language processing', 'Computer vision solutions', 'Predictive analytics', 'LLM integration & fine-tuning', 'MLOps & model governance'],
    image: '/images/img-2.jpg',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    subtitle: 'Zero-Trust Security Frameworks',
    description: 'Protect your digital assets with enterprise-grade security. We implement zero-trust architectures, continuous threat monitoring, and compliance frameworks that meet the strictest regulatory requirements.',
    features: ['Zero-trust architecture', 'Threat detection & response', 'Security audits & assessments', 'Compliance (SOC2, ISO 27001, HIPAA)', 'Identity & access management', 'Security awareness training'],
    image: '/images/img-5.jpg',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    subtitle: 'Modern Data Platforms',
    description: 'Build the data foundation for intelligent decision-making. We design lakehouse architectures, real-time data pipelines, and governance frameworks that unlock the full potential of your data.',
    features: ['Data lakehouse architecture', 'Real-time streaming pipelines', 'Data governance & quality', 'ETL/ELT pipeline development', 'Data mesh implementation', 'Business intelligence & reporting'],
    image: '/images/img-4.jpg',
  },
  {
    icon: Layers,
    title: 'Enterprise Software',
    subtitle: 'Custom Business Applications',
    description: 'From ERP integrations to custom workflow platforms, we build enterprise software tailored to your business logic. Our solutions integrate seamlessly with existing systems while modernizing your technology stack.',
    features: ['Custom ERP development', 'CRM integration & customization', 'Workflow automation platforms', 'Legacy system modernization', 'API development & integration', 'Microservices architecture'],
    image: '/images/img-1.jpg',
  },
  {
    icon: GitBranch,
    title: 'DevOps & SRE',
    subtitle: 'Continuous Delivery & Reliability',
    description: 'Accelerate delivery while maintaining rock-solid reliability. Our DevOps engineers implement CI/CD pipelines, infrastructure as code, and site reliability practices that keep your systems running at 99.9% uptime.',
    features: ['CI/CD pipeline implementation', 'Infrastructure as Code (IaC)', 'Kubernetes & Docker management', 'Site reliability engineering', 'Performance monitoring', 'Incident response automation'],
    image: '/images/img-3.jpg',
  },
];

export default function Services() {
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
    if (cards.length === 0) return;

    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        }
      );
    });
  }, []);

  return (
    <main className="relative pt-[72px]" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6">
        <div ref={heroRef} className="max-w-[1280px] mx-auto">
          <span className="label-mono block mb-4">Our Solutions</span>
          <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] max-w-[800px]">
            Enterprise solutions for the digital age
          </h1>
          <p className="font-body text-[1.125rem] leading-[1.7] text-[#8B95A5] max-w-[600px] mt-6">
            From cloud infrastructure to AI-powered analytics, we deliver end-to-end technology services that drive transformation and accelerate growth.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-24 lg:pb-32 px-6">
        <div className="max-w-[1280px] mx-auto space-y-16">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.title}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center opacity-0`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 overflow-hidden rounded">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[300px] lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <Icon size={32} className="text-[#4ECDC4] mb-4" />
                  <h2 className="font-heading font-normal text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] text-[#E8EDF5]">
                    {service.title}
                  </h2>
                  <p className="font-mono text-[0.75rem] uppercase tracking-wider text-[#4ECDC4] mt-2">
                    {service.subtitle}
                  </p>
                  <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5] mt-4">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-[#8B95A5]">
                        <Zap size={14} className="text-[#4ECDC4] flex-shrink-0" />
                        <span className="font-body text-[0.9375rem]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-heading text-[0.875rem] text-[#4ECDC4] hover:text-[#3DBDB5] transition-colors mt-6 group"
                  >
                    Discuss your needs
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
