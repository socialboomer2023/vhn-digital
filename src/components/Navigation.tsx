import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Solutions', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11, 22, 40, 0.95)' : 'rgba(11, 22, 40, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(232, 237, 245, 0.06)',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8L16 4L28 8V24L16 28L4 24V8Z" stroke="#4ECDC4" strokeWidth="1.5" fill="none" />
            <path d="M16 4V28" stroke="#4ECDC4" strokeWidth="1" opacity="0.4" />
            <path d="M4 8L16 12L28 8" stroke="#4ECDC4" strokeWidth="1" opacity="0.4" />
            <path d="M16 12V28" stroke="#4ECDC4" strokeWidth="1.5" />
            <text x="10" y="21" fill="#4ECDC4" fontSize="10" fontFamily="Outfit" fontWeight="500">V</text>
          </svg>
          <span className="font-heading font-normal text-[1.125rem] text-[#E8EDF5] tracking-tight">
            VHN Services
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="font-heading text-[0.75rem] uppercase tracking-[0.04em] border border-[#4ECDC4] text-[#4ECDC4] px-6 py-2.5 rounded-sm transition-all duration-300 hover:bg-[#4ECDC4] hover:text-[#0B1628]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#E8EDF5]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute top-[72px] left-0 right-0 z-[99] py-6 px-6 md:hidden"
          style={{
            background: 'rgba(11, 22, 40, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(232, 237, 245, 0.06)',
          }}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-heading text-[0.875rem] uppercase tracking-[0.04em] text-[#8B95A5] hover:text-[#4ECDC4] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="font-heading text-[0.75rem] uppercase tracking-[0.04em] border border-[#4ECDC4] text-[#4ECDC4] px-6 py-2.5 rounded-sm transition-all duration-300 hover:bg-[#4ECDC4] hover:text-[#0B1628] text-center mt-2"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
