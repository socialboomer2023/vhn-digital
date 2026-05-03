import { Link } from 'react-router';
import { Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070F1A] py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left - Logo & Copyright */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8L16 4L28 8V24L16 28L4 24V8Z" stroke="#4ECDC4" strokeWidth="1.5" fill="none" />
                <path d="M16 4V28" stroke="#4ECDC4" strokeWidth="1" opacity="0.4" />
                <path d="M4 8L16 12L28 8" stroke="#4ECDC4" strokeWidth="1" opacity="0.4" />
                <path d="M16 12V28" stroke="#4ECDC4" strokeWidth="1.5" />
                <text x="10" y="21" fill="#4ECDC4" fontSize="10" fontFamily="Outfit" fontWeight="500">V</text>
              </svg>
              <span className="font-heading font-normal text-[1rem] text-[#E8EDF5]">
                VHN Services
              </span>
            </Link>
            <p className="font-mono text-[0.75rem] text-[#8B95A5] mt-4">
              2025 VHN Services LLC. All rights reserved.
            </p>
            <p className="font-mono text-[0.75rem] text-[#8B95A5] mt-1">
              Contact: Raj | <a href="tel:9519610982" className="hover:text-[#4ECDC4] transition-colors">951-961-0982</a>
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <Link to="/services" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">Solutions</Link>
              <Link to="/industries" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">Industries</Link>
              <Link to="/about" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">Insights</Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/careers" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">Careers</Link>
              <Link to="/about" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">About</Link>
              <Link to="/contact" className="font-heading text-[0.875rem] text-[#8B95A5] hover:text-[#E8EDF5] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right - Social */}
          <div className="flex gap-4">
            <a href="#" className="text-[#8B95A5] hover:text-[#4ECDC4] transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-[#8B95A5] hover:text-[#4ECDC4] transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-[#8B95A5] hover:text-[#4ECDC4] transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
