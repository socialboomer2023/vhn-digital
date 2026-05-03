import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin, Clock, ArrowRight, Code2, Cloud,
  Shield, Database, Brain, ChevronDown, CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CULTURE_PERKS = [
  'Competitive salary & equity',
  'Health, dental & vision coverage',
  'Unlimited PTO',
  'Remote-first culture',
  'Professional development budget',
  '401(k) with company match',
  'Home office stipend',
  'Parental leave',
];

const OPENINGS = [
  {
    title: 'Senior Cloud Architect',
    department: 'Cloud Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    icon: Cloud,
    description: 'Lead cloud architecture design for enterprise clients across AWS, Azure, and GCP. 8+ years experience required.',
  },
  {
    title: 'AI/ML Engineer',
    department: 'Artificial Intelligence',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    icon: Brain,
    description: 'Build and deploy machine learning models for production environments. Experience with PyTorch, TensorFlow, and LLMs preferred.',
  },
  {
    title: 'DevOps Engineer',
    department: 'Platform Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    icon: Code2,
    description: 'Design CI/CD pipelines and manage Kubernetes infrastructure. Strong Terraform and Ansible experience required.',
  },
  {
    title: 'Cybersecurity Consultant',
    department: 'Security',
    location: 'Remote (US)',
    type: 'Full-time',
    icon: Shield,
    description: 'Implement zero-trust security frameworks and conduct security assessments. CISSP or equivalent certification preferred.',
  },
  {
    title: 'Data Engineer',
    department: 'Data & Analytics',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    icon: Database,
    description: 'Build real-time data pipelines and lakehouse architectures. Experience with Spark, Kafka, and dbt required.',
  },
  {
    title: 'Full-Stack Developer',
    department: 'Software Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    icon: Code2,
    description: 'Develop enterprise web applications using React, Node.js, and cloud-native technologies. 5+ years experience.',
  },
];

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.fromTo(hero.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const perks = perksRef.current;
    if (!perks) return;
    gsap.fromTo(perks.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: perks, start: 'top 80%' },
      }
    );
  }, []);

  useEffect(() => {
    const jobs = jobsRef.current;
    if (!jobs) return;
    gsap.fromTo(jobs.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: jobs, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <main className="relative pt-[72px]" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6">
        <div ref={heroRef} className="max-w-[1280px] mx-auto">
          <span className="label-mono block mb-4">Careers</span>
          <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] max-w-[800px]">
            Build your career with purpose
          </h1>
          <p className="font-body text-[1.125rem] leading-[1.7] text-[#8B95A5] max-w-[600px] mt-6">
            Join a team of exceptional engineers, architects, and consultants solving the world's most complex technology challenges.
          </p>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="pb-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Culture */}
            <div>
              <h2 className="font-heading font-normal text-[clamp(1.5rem,2.5vw,2rem)] text-[#E8EDF5] mb-6">
                Our Culture
              </h2>
              <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5] mb-4">
                At VHN Services, we believe the best work happens when talented people are given the freedom to innovate. Our remote-first culture empowers team members to do their best work from anywhere while staying deeply connected through collaboration.
              </p>
              <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5] mb-4">
                We invest heavily in professional development, providing every team member with an annual learning budget, access to cutting-edge certifications, and mentorship from industry leaders.
              </p>
              <p className="font-body text-[1rem] leading-[1.7] text-[#8B95A5]">
                Diversity and inclusion aren't just policies — they're woven into our DNA. We actively seek out diverse perspectives because we know they lead to better solutions.
              </p>
            </div>

            {/* Perks */}
            <div>
              <h2 className="font-heading font-normal text-[clamp(1.5rem,2.5vw,2rem)] text-[#E8EDF5] mb-6">
                Perks & Benefits
              </h2>
              <div ref={perksRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CULTURE_PERKS.map((perk) => (
                  <div key={perk} className="flex items-center gap-3 opacity-0">
                    <CheckCircle2 size={18} className="text-[#4ECDC4] flex-shrink-0" />
                    <span className="font-body text-[0.9375rem] text-[#E8EDF5]">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-24 lg:pb-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-heading font-normal text-[clamp(2rem,3vw,3rem)] text-[#E8EDF5] mb-12">
            Open Positions
          </h2>

          <div ref={jobsRef} className="space-y-4">
            {OPENINGS.map((job, index) => {
              const Icon = job.icon;
              const isExpanded = expandedJob === index;

              return (
                <div
                  key={job.title}
                  className="glass-panel rounded overflow-hidden"
                  style={{ border: '1px solid rgba(78, 205, 196, 0.1)' }}
                >
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : index)}
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-[rgba(78,205,196,0.03)] transition-colors"
                  >
                    <Icon size={24} className="text-[#4ECDC4] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-normal text-[1.125rem] text-[#E8EDF5]">
                        {job.title}
                      </h3>
                      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-[#8B95A5] mt-1">
                        {job.department}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-[#8B95A5]">
                      <span className="flex items-center gap-1.5 text-[0.8125rem]">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-[0.8125rem]">
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className="text-[#8B95A5] transition-transform flex-shrink-0"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-[rgba(232,237,245,0.06)]">
                      <p className="font-body text-[0.9375rem] leading-[1.6] text-[#8B95A5] mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-4 sm:hidden">
                        <span className="flex items-center gap-1.5 text-[#8B95A5] text-[0.8125rem]">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-[#8B95A5] text-[0.8125rem]">
                          <Clock size={14} /> {job.type}
                        </span>
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-heading text-[0.875rem] text-[#4ECDC4] hover:text-[#3DBDB5] transition-colors group"
                      >
                        Apply Now
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
