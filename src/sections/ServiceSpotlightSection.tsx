import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  {
    id: 'cloud',
    label: 'Cloud Migration',
    description: 'Replatform legacy workloads to cloud-native architectures with zero downtime and full compliance. Our migration factory model has moved 10,000+ workloads across AWS, Azure, and GCP.',
    image: '/images/img-3.jpg',
  },
  {
    id: 'ai',
    label: 'AI Integration',
    description: 'Embed artificial intelligence into every layer of your operations. From custom LLMs to computer vision pipelines, we build AI systems that deliver measurable business outcomes.',
    image: '/images/img-2.jpg',
  },
  {
    id: 'security',
    label: 'Security Hardening',
    description: 'Fortify your digital perimeter with zero-trust frameworks, real-time threat intelligence, and automated incident response. Protect what matters most.',
    image: '/images/img-5.jpg',
  },
  {
    id: 'data',
    label: 'Data Modernization',
    description: 'Transform fragmented data silos into unified, governed data lakes. Real-time streaming, advanced analytics, and self-service BI for every decision-maker.',
    image: '/images/img-4.jpg',
  },
];

export default function ServiceSpotlightSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    if (!left) return;

    gsap.fromTo(left,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );
  }, []);

  function handleTabChange(index: number) {
    if (index === activeTab) return;

    const image = imageRef.current;
    const content = contentRef.current;

    if (image) {
      gsap.to(image, {
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(image,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
          );
        },
      });
    } else {
      setActiveTab(index);
    }

    if (content) {
      gsap.to(content, {
        opacity: 0, y: 10, duration: 0.2,
        onComplete: () => {
          gsap.to(content, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
        },
      });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col lg:flex-row"
      style={{ zIndex: 1 }}
    >
      {/* Left - Tab Navigation */}
      <div ref={leftRef} className="w-full lg:w-1/2 bg-[#0D1B2A] px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
        <span className="label-mono block mb-4">Service Spotlight</span>
        <h2 className="font-heading font-light text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] tracking-[-0.01em] text-[#E8EDF5] mb-12">
          Intelligent Operations
        </h2>

        {/* Tab List */}
        <div className="flex flex-row lg:flex-col gap-0 overflow-x-auto lg:overflow-visible mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className="text-left px-6 py-5 font-heading text-[1rem] whitespace-nowrap lg:whitespace-normal transition-all duration-300 border-b-2 lg:border-b-0 lg:border-l-2 flex-shrink-0"
              style={{
                borderColor: index === activeTab ? '#4ECDC4' : 'rgba(232, 237, 245, 0.1)',
                color: index === activeTab ? '#E8EDF5' : '#8B95A5',
                background: index === activeTab ? 'rgba(78, 205, 196, 0.05)' : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div ref={contentRef}>
          <p className="font-body text-[0.9375rem] leading-[1.7] text-[#8B95A5] mb-6">
            {TABS[activeTab].description}
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-heading text-[0.875rem] text-[#4ECDC4] hover:text-[#3DBDB5] transition-colors group"
          >
            Learn more
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Right - Image */}
      <div className="w-full lg:w-1/2 relative overflow-hidden" style={{ minHeight: '400px' }}>
        <img
          ref={imageRef}
          src={TABS[activeTab].image}
          alt={TABS[activeTab].label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(13, 27, 42, 0.6), transparent 30%)',
          }}
        />
      </div>
    </section>
  );
}
