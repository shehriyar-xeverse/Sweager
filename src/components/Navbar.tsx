import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Menu, X, ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { Route } from '../types';

interface NavbarProps {
  currentRoute: Route;
  onNavigate: (route: Route, scrollTarget?: string) => void;
}

export default function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Monitor scrolling to make Navbar sticky with premium styling changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home' as Route },
    {
      label: 'About',
      route: 'about' as Route,
      dropdown: [
        { label: 'Our Team', route: 'about' as Route, hash: 'team-section' }
      ]
    },
    { label: 'Locations', route: 'locations' as Route },
    { label: 'Services', route: 'services' as Route },
    { label: 'Photos', route: 'photos' as Route },
    { label: 'Contact', route: 'contact' as Route },
  ];

  const handleNavClick = (route: Route, hash?: string) => {
    onNavigate(route, hash);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-luxury-charcoal/95 border-b border-luxury-border py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md'
          : 'bg-luxury-charcoal/90 backdrop-blur-md py-5 border-b border-luxury-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <motion.div
            id="navbar-brand"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-luxury-bronze flex items-center justify-center rotate-45 group-hover:border-luxury-bronze-light transition-all duration-500 bg-luxury-charcoal shrink-0">
              <span className="-rotate-45 font-serif text-sm sm:text-lg font-bold text-luxury-bronze group-hover:text-luxury-bronze-light transition-colors">SB</span>
            </div>
            <div>
              <span className="hidden md:block font-serif text-lg tracking-[0.15em] uppercase font-bold text-luxury-cream group-hover:text-white transition-colors duration-300">
                SWAGGER <span className="text-luxury-bronze">&</span> BLADE
              </span>
              <span className="block md:hidden font-serif text-sm tracking-widest uppercase font-bold text-luxury-cream group-hover:text-white transition-colors duration-300">
                Seager & Blade
              </span>
              <span className="hidden md:block text-[9px] uppercase tracking-[0.4em] text-luxury-bronze font-mono">
                BARBERSHOP • EST. 1994
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation Link Deck */}
          <nav id="navbar-desktop-nav" className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;

              // RENDER ABOUT DROPDOWN LINK
              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.route)}
                      className={`flex items-center gap-1.5 px-3 py-1 text-sm font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        isActive ? 'text-luxury-bronze font-semibold' : 'text-zinc-400 hover:text-luxury-cream'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* About Dropdown Menu List with Custom Framer Anim */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-0 mt-2 w-48 rounded-lg bg-luxury-slate border border-luxury-border shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden py-1 z-50 backdrop-blur-md"
                        >
                          {item.dropdown.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => handleNavClick(sub.route, sub.hash)}
                              className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest text-zinc-300 hover:text-luxury-bronze hover:bg-luxury-card transition-colors flex items-center justify-between group/sub"
                            >
                              {sub.label}
                              <ArrowRight className="w-3 h-3 text-luxury-bronze opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // STANDARD NAV LINK
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.route)}
                  className="relative px-3 py-1 text-sm font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  <span className={`${isActive ? 'text-luxury-bronze font-semibold' : 'text-zinc-400 hover:text-luxury-cream'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-luxury-bronze"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Book Now Button (Desktop CTA) */}
          <motion.div
            id="navbar-cta-wrapper"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <button
              onClick={() => handleNavClick('book')}
              className="bg-luxury-bronze hover:bg-luxury-bronze-light text-black text-[12px] font-bold uppercase tracking-widest px-8 py-3 rounded-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-[0_4px_15px_rgba(176,141,87,0.2)]"
            >
              Book Now
              <Calendar className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Toggle Button for Mobile Navigation Menu */}
          <div className="flex lg:hidden items-center">
            <button
              id="navbar-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-cream hover:text-luxury-bronze p-2 bg-luxury-slate/50 border border-luxury-border rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 animate-spin-once" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="navbar-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="lg:hidden bg-luxury-slate border-b border-luxury-border overflow-hidden absolute top-full left-0 right-0 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="px-5 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-luxury-border/30 pb-3">
                  {item.dropdown ? (
                    <div>
                      <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono mb-2">
                        {item.label}
                      </span>
                      <div className="pl-4 space-y-3">
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => handleNavClick(sub.route, sub.hash)}
                            className="block text-sm text-zinc-300 hover:text-luxury-bronze uppercase tracking-widest text-left"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.route)}
                      className={`block font-serif text-base tracking-[0.15em] uppercase text-left w-full ${
                        currentRoute === item.route ? 'text-luxury-bronze font-bold' : 'text-zinc-200 hover:text-luxury-bronze'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => handleNavClick('book')}
                  className="w-full py-4 bg-luxury-bronze text-luxury-charcoal font-serif font-bold text-center block uppercase tracking-widest hover:bg-luxury-bronze-light transition-all rounded"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
