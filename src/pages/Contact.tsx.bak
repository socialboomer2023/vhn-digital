import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorCountdown, setErrorCountdown] = useState(5);

  // Auto-redirect to home after error
  useEffect(() => {
    if (status !== 'error') {
      setErrorCountdown(5);
      return;
    }
    setErrorCountdown(5);
    const interval = setInterval(() => {
      setErrorCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, navigate]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.fromTo(hero.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const form = formRef.current;
    const info = infoRef.current;
    if (form) {
      gsap.fromTo(form,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: form, start: 'top 80%' },
        }
      );
    }
    if (info) {
      gsap.fromTo(info,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: info, start: 'top 80%' },
        }
      );
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xnqevwje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main className="relative pt-[72px]" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="py-24 lg:py-32 px-6">
        <div ref={heroRef} className="max-w-[1280px] mx-auto">
          <span className="label-mono block mb-4">Contact Us</span>
          <h1 className="font-heading font-light text-[clamp(3rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[#E8EDF5] max-w-[800px]">
            Let's start a conversation
          </h1>
          <p className="font-body text-[1.125rem] leading-[1.7] text-[#8B95A5] max-w-[600px] mt-6">
            Whether you're exploring digital transformation or need a specific solution, our team is ready to help. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24 lg:pb-32 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3 opacity-0">
            {status === 'success' ? (
              <div className="glass-panel p-12 rounded text-center">
                <CheckCircle size={48} className="text-[#4ECDC4] mx-auto mb-4" />
                <h3 className="font-heading font-normal text-[1.5rem] text-[#E8EDF5] mb-2">
                  Thank you!
                </h3>
                <p className="font-body text-[1rem] text-[#8B95A5]">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B1628]">Select a service</option>
                    <option value="cloud" className="bg-[#0B1628]">Cloud Architecture</option>
                    <option value="ai" className="bg-[#0B1628]">AI & Machine Learning</option>
                    <option value="security" className="bg-[#0B1628]">Cybersecurity</option>
                    <option value="data" className="bg-[#0B1628]">Data Engineering</option>
                    <option value="software" className="bg-[#0B1628]">Enterprise Software</option>
                    <option value="devops" className="bg-[#0B1628]">DevOps & SRE</option>
                    <option value="other" className="bg-[#0B1628]">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-heading text-[0.8125rem] text-[#8B95A5] mb-2 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] rounded px-4 py-3 text-[#E8EDF5] font-body text-[0.9375rem] focus:outline-none focus:border-[#4ECDC4] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 font-body text-[0.875rem]">
                    Something went wrong. Please try again or email us directly. Redirecting to home in {errorCountdown}s…
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-3 font-heading text-[0.875rem] uppercase tracking-[0.04em] bg-[#4ECDC4] text-[#0B1628] px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#3DBDB5] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 opacity-0">
            <div className="space-y-8">
              <div className="glass-panel p-8 rounded">
                <h3 className="font-heading font-normal text-[1.25rem] text-[#E8EDF5] mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <UserIcon className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-[0.8125rem] uppercase tracking-wider text-[#8B95A5] mb-1">Contact Person</p>
                      <p className="font-body text-[1rem] text-[#E8EDF5]">Raj</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-[0.8125rem] uppercase tracking-wider text-[#8B95A5] mb-1">Phone</p>
                      <a href="tel:9519610982" className="font-body text-[1rem] text-[#E8EDF5] hover:text-[#4ECDC4] transition-colors">
                        951-961-0982
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-[0.8125rem] uppercase tracking-wider text-[#8B95A5] mb-1">Email</p>
                      <a href="mailto:info@vhnservices.com" className="font-body text-[1rem] text-[#E8EDF5] hover:text-[#4ECDC4] transition-colors">
                        info@vhnservices.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-[0.8125rem] uppercase tracking-wider text-[#8B95A5] mb-1">Business Hours</p>
                      <p className="font-body text-[1rem] text-[#E8EDF5]">Mon - Fri: 9:00 AM - 6:00 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="glass-panel p-8 rounded">
                <h3 className="font-heading font-normal text-[1.125rem] text-[#E8EDF5] mb-3">
                  We respond fast
                </h3>
                <p className="font-body text-[0.9375rem] text-[#8B95A5]">
                  Expect a response within 24 hours. For urgent inquiries, call Raj directly at <a href="tel:9519610982" className="text-[#4ECDC4] hover:underline">951-961-0982</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
