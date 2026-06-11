import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Send, CheckCircle } from 'lucide-react';
import { Route } from '../types';

interface FooterProps {
  onNavigate: (route: Route) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubsubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-luxury-charcoal border-t border-luxury-border/60 text-zinc-400 mt-auto overflow-hidden relative"
    >
      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-zinc-800/15 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-zinc-800/15 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand/About Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 sm:w-9 sm:h-9 border border-luxury-bronze flex items-center justify-center rotate-45 group-hover:border-luxury-bronze-light transition-all duration-500 bg-luxury-charcoal shrink-0">
                <span className="-rotate-45 font-serif text-[11px] sm:text-sm font-bold text-luxury-bronze group-hover:text-luxury-bronze-light transition-colors">SB</span>
              </div>
              <span className="hidden sm:inline font-serif text-base tracking-widest font-bold text-luxury-cream">
                SWAGGER & BLADE
              </span>
              <span className="inline sm:hidden font-serif text-sm tracking-widest font-bold text-luxury-cream">
                Seager & Blade
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-zinc-500 font-light">
              We define the modern standard of grooming. Step into a timeless sanctuary where high art meets classic straight-razor skill. Uncompromising standards for the refined gentleman.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/swaggerandblade_concept' },
                { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/swaggerandblade' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com/swagger_blade' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-luxury-border bg-luxury-slate/35 hover:bg-luxury-bronze hover:text-luxury-charcoal hover:border-luxury-bronze transition-colors duration-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-luxury-cream font-bold">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: 'Home Page', route: 'home' as Route },
                { label: 'Our Heritage', route: 'about' as Route },
                { label: 'Meet the Artisans', route: 'about' as Route /** leads to team scroll */ },
                { label: 'Grooming Parlours', route: 'locations' as Route },
                { label: 'Premium Services', route: 'services' as Route },
                { label: 'Photos', route: 'photos' as Route },
                { label: 'Leave Message', route: 'contact' as Route }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.route)}
                    className="hover:text-luxury-bronze transition-colors text-left py-0.5 cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-luxury-border rounded-full group-hover:bg-luxury-bronze group-hover:scale-125 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-luxury-cream font-bold">
              Contact & Hours
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-luxury-bronze shrink-0 mt-0.5" />
                <span className="text-zinc-500">
                  <strong className="text-zinc-300 block font-normal">Soho Flagship Parlour:</strong>
                  298 Mercer Street, New York, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-bronze shrink-0" />
                <span className="text-zinc-300">(212) 555-0129</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-bronze shrink-0" />
                <span className="text-zinc-300">concierge@swaggerandblade.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-luxury-cream font-bold">
              The Gentleman's Gazette
            </h4>
            <p className="text-sm font-light text-zinc-500 leading-relaxed">
              Subscribe to receive curated styling journals, exclusive event announcements, and priority member booking slots.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribed}
                  className="w-full bg-luxury-slate/70 border border-luxury-border/80 focus:border-luxury-bronze text-luxury-cream text-xs px-4 py-3.5 pr-11 outline-none transition-colors duration-300 font-light rounded-lg disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-luxury-bronze hover:text-luxury-bronze-light p-1.5 transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs text-luxury-bronze font-mono bg-luxury-bronze-dark/10 p-2.5 rounded border border-luxury-bronze/20 mt-2"
                  >
                    <CheckCircle className="w-4 h-4 text-luxury-bronze" />
                    <span>Welcome to the circle. Please check inbox.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="mt-16 pt-8 border-t border-luxury-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div>
            &copy; {currentYear} Swagger & Blade Barbershop. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-luxury-bronze transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-luxury-bronze transition-colors">Reservation Terms</a>
            <a href="#terms" className="hover:text-luxury-bronze transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
