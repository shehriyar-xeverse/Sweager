import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Route, TeamMember } from './types';
import { TEAM_MEMBERS, SERVICES, LOCATIONS, GALLERY_PHOTOS, INSTAGRAM_PREVIEW } from './data';

// Import Modular Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import TeamCard from './components/TeamCard';
import TeamModal from './components/TeamModal';
import LocationCard from './components/LocationCard';
import ServiceCard from './components/ServiceCard';
import PhotoGallery from './components/PhotoGallery';
import ContactForm from './components/ContactForm';
import BookingWizard from './components/BookingWizard';

// Import Icons
import { Scissors, Star, MapPin, Sparkles, Instagram, Calendar, ArrowRight, Quote, Clock, ShieldCheck, FileText, Compass } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  // Dynamic booking arguments
  const [targetBarberId, setTargetBarberId] = useState<string | undefined>(undefined);
  const [targetServiceId, setTargetServiceId] = useState<string | undefined>(undefined);

  // Lightbox & Profile modallers
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

  // Update Page Metadata & Page Titles Dynamically
  useEffect(() => {
    const titles: Record<Route, string> = {
      home: 'Seager & Blade | High-End Premium Grooming Barbershop',
      about: 'Our Heritage & Cultured Artisans | Seager & Blade',
      locations: 'Our Parlour Locations & Hours | Seager & Blade',
      services: 'Premium Service Pricing Menu | Seager & Blade',
      photos: 'Artisan Photo Gallery & Showcase | Seager & Blade',
      contact: 'Reserve direct contact link | Seager & Blade',
      book: 'Schedule Premium Barber Session | Seager & Blade'
    };
    document.title = titles[currentRoute] || 'Seager & Blade Barbershop';
  }, [currentRoute]);

  // Page Scrolling Target Router Action
  useEffect(() => {
    if (scrollTarget) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          const offset = 90; // account for fixed header menu
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setScrollTarget(null); // clear target state after transition
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentRoute, scrollTarget]);

  const handleNavigate = (route: Route, targetId?: string) => {
    if (targetId) {
      setScrollTarget(targetId);
    } else {
      setScrollTarget(null);
      window.scrollTo(0, 0);
    }
    setCurrentRoute(route);
  };

  // Quick action from other grids to Booking wizard
  const handleDirectBookBarber = (barberId: string) => {
    setTargetBarberId(barberId);
    setTargetServiceId(undefined);
    setSelectedTeamMember(null);
    setCurrentRoute('book');
  };

  const handleDirectBookService = (serviceId: string) => {
    setTargetServiceId(serviceId);
    setTargetBarberId(undefined);
    setCurrentRoute('book');
  };

  const handleDirectBookLocation = (branchId: string) => {
    // Determine typical manager barber for the select location
    const matchedBarber = branchId === 'arts_district' ? 'elena' : branchId === 'beverly_hills' ? 'samantha' : 'marcus';
    setTargetBarberId(matchedBarber);
    setTargetServiceId(undefined);
    setCurrentRoute('book');
  };

  return (
    <div className="flex flex-col min-h-screen bg-luxury-charcoal bg-elegant-pinstripe selection:bg-luxury-bronze selection:text-luxury-charcoal relative w-full max-w-full overflow-x-hidden">
      
      {/* 1. High-End Custom Tracking lag Cursor */}
      <CustomCursor />

      {/* 2. Responsive sticky header dropdown menu */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* 3. Main Dynamic Content section wrapped by Framer AnimatePresence */}
      <main className="flex-grow pt-20 lg:pt-[84px] bg-luxury-charcoal relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, filter: 'blur(4px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(4px)', y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            
            {/* =========================================================================
                A. HOME ROUTE
                ========================================================================= */}
            {currentRoute === 'home' && (
              <div id="home-route-content" className="space-y-24 pb-24">
                
                {/* 1. Cinematic Video Hero banner */}
                <HeroSection
                  title="Uncompromising Standards In Modern Grooming"
                  subtitle="ESTABLISHED WITH HONOUR"
                  description="Where precision scissor techniques, classical straight-razor mastery, and modern luxury aesthetics converge. Experience the elite standard of artisan barbering."
                  videoUrl="https://res.cloudinary.com/dju25z9v3/video/upload/v1781183133/SWEAGER_HERO_SECTION_tbjv6f.mp4"
                  ctaTextPrimary="Schedule Appointment"
                  ctaRoutePrimary="book"
                  ctaTextSecondary="Explore Our Menu"
                  ctaRouteSecondary="services"
                  onNavigate={handleNavigate}
                  heightClass="h-screen"
                />

                {/* 2. Brand Story short Section */}
                <section id="home-story-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Visual left side with overlay cards */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-luxury-border bg-luxury-slate group h-[380px] sm:h-[450px]"
                    >
                      <img
                        src="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0117-1920w_gndzje.webp"
                        alt="Workspace Heritage"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-transparent to-transparent opacity-80" />
                      
                      {/* Interactive floating elements */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 bg-luxury-charcoal/90 border border-luxury-border shadow-2xl rounded-xl z-20 backdrop-blur-sm">
                        <p className="font-serif text-sm font-bold text-luxury-cream">"The seat of a gentleman is a sanctuary of honor, style, and crisp focus."</p>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-bronze block mt-2">— SWAGGER CONCEPT REVELATION</span>
                      </div>
                    </motion.div>

                    {/* Descriptive right side text reveal details */}
                    <div className="lg:col-span-6 space-y-7 xl:pl-8">
                      <div className="space-y-3">
                        <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze">
                          The Heritage Code
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-luxury-cream leading-tight">
                          Our Story
                        </h2>
                      </div>

                      <div className="space-y-5 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                        <p>
                          We do not construct simple haircuts; we sculpt personal silhouettes tailored exclusively to your skull geometry, natural crowns, and daily lifestyle contours. Founded by Master Artisan Marcus Vance, Swagger & Blade was established as an antidote to cookie-cutter salons.
                        </p>
                        <p>
                          Combining traditional straight-edge towel therapies, high-contrast fades, and dynamic hair treatments, we ensure every guest experiences complete mental recovery and precision styling.
                        </p>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-6 text-xs font-mono text-zinc-500 uppercase tracking-widest border-t border-luxury-border/30">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-luxury-bronze" />
                          <span>Strictly Certified Artisans</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-luxury-bronze" />
                          <span>Bespoke Grooming Oils</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => handleNavigate('about')}
                          className="px-6 py-3 bg-transparent border border-luxury-bronze text-luxury-bronze hover:bg-luxury-bronze hover:text-luxury-charcoal text-xs font-serif font-bold uppercase tracking-widest rounded transition-all duration-300"
                        >
                          Discover Our Heritage &rarr;
                        </button>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 3. Services Preview Section */}
                <section id="home-services-section" className="bg-luxury-slate border-t border-b border-luxury-border/40 py-24">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    {/* Centered Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze">
                        Curated Offerings
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-luxury-cream">
                        Premium Treatments
                      </h2>
                      <p className="text-zinc-400 text-xs sm:text-sm font-light">
                        Extract select options from our signature menu. Every treatment includes scalp washing, razor lineup finishing, and soothing essential hot towels.
                      </p>
                    </div>

                    {/* Preview list cards (4 select services) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {SERVICES.slice(1, 5).map((service, index) => (
                        <div
                          key={service.id}
                          className="p-6 bg-luxury-charcoal border border-luxury-border hover:border-luxury-bronze/60 rounded-xl transition-all duration-300 flex flex-col justify-between group relative card-glow-hover h-full"
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline gap-2">
                              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">
                                {service.duration}
                              </span>
                              <span className="text-luxury-bronze font-serif font-black text-xl">
                                ${service.price}
                              </span>
                            </div>
                            <h3 className="font-serif text-base font-bold text-luxury-cream group-hover:text-luxury-bronze transition-colors">
                              {service.name}
                            </h3>
                            <p className="text-zinc-500 text-xs font-light leading-relaxed line-clamp-3">
                              {service.description}
                            </p>
                          </div>
                          
                          <div className="pt-5 mt-4 border-t border-luxury-border/30 text-right">
                            <button
                              onClick={() => handleDirectBookService(service.id)}
                              className="text-[10px] text-zinc-500 hover:text-luxury-bronze uppercase tracking-widest font-mono transition-colors cursor-pointer"
                            >
                              Quick Book &rarr;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <button
                        onClick={() => handleNavigate('services')}
                        className="px-6 py-3.5 bg-luxury-bronze text-luxury-charcoal hover:bg-luxury-bronze-light font-serif font-bold text-xs uppercase tracking-widest rounded shadow-xl transition-colors cursor-pointer"
                      >
                        View Full Services Menu & Pricing
                      </button>
                    </div>
                  </div>
                </section>

                {/* 4. Our Locations Preview Section */}
                <section id="home-locations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze">
                      Refined Havens
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-luxury-cream">
                      Our Parlour Locations
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light">
                      Step into any of our meticulously integrated salons across NY and LA. Experience the comfort of classical Italian chairs, espresso counters, and private styling alcoves.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {LOCATIONS.map((branch) => (
                      <div
                        key={branch.id}
                        className="relative group rounded-xl overflow-hidden border border-luxury-border bg-luxury-slate shadow-xl aspect-[3/4] cursor-pointer"
                        onClick={() => handleNavigate('locations')}
                      >
                        <img
                          src={branch.image}
                          alt={branch.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.4]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-transparent to-transparent opacity-90 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 z-10" />
                        
                        <div className="absolute bottom-6 left-6 right-6 z-25 space-y-3">
                          <span className="text-[9px] font-mono tracking-widest uppercase text-luxury-bronze block bg-luxury-bronze/10 border border-luxury-bronze/20 px-2.5 py-0.5 rounded-full width-fit w-fit">
                            {branch.phone}
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream group-hover:text-luxury-bronze transition-colors">
                            {branch.name}
                          </h3>
                          <p className="text-xs text-zinc-500 font-light truncate">
                            {branch.address}
                          </p>
                          <div className="pt-2 border-t border-luxury-border/30 flex items-center justify-between text-xs text-luxury-bronze font-mono uppercase tracking-widest font-bold">
                            <span>Locations Details</span>
                            <span>&rarr;</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Follow us on Instagram (Masonry Layout preview) */}
                <section id="home-instagram" className="bg-luxury-slate/40 border-t border-luxury-border/30 py-24">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                      <Instagram className="w-7 h-7 text-luxury-bronze mx-auto text-glow-bronze" />
                      <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-zinc-500 block">
                        @swaggerandblade_concept
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-cream">
                        The Instagram Gazette
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {INSTAGRAM_PREVIEW.map((item) => (
                        <div
                          key={item.id}
                          className="relative group rounded-lg overflow-hidden border border-luxury-border aspect-square bg-zinc-900 shadow-lg cursor-pointer"
                          onClick={() => handleNavigate('photos')}
                        >
                          <img
                            src={item.url}
                            alt="Instagram Post"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-95 saturate-[0.9]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          {/* Hover display for instagram stats */}
                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-xs font-mono text-luxury-cream space-y-1.5 z-20">
                            <span className="font-serif text-xs px-2.5 py-0.5 border border-luxury-bronze text-luxury-bronze rounded bg-luxury-charcoal/80 uppercase">
                              View Gallery
                            </span>
                            <span className="text-[10px] text-zinc-500 mt-1 block">Likes: {item.likes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                
              </div>
            )}

            {/* =========================================================================
                B. ABOUT / HERITAGE ROUTE
                ========================================================================= */}
            {currentRoute === 'about' && (
              <div id="about-route-content" className="space-y-24 pb-24">
                
                {/* 1. Cinematic Hero Banner */}
                <HeroSection
                  title="Our Heritage & Master Barbers"
                  subtitle="ESTABLISHED SINCE 2012"
                  description="Meet the visionaries, designers, and certified artisans behind Swagger & Blade. Grounded in mid-century styling legacy with a sharp eye for contemporary texture works."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0117-1920w_gndzje.webp"
                  heightClass="min-h-[60vh] h-[65vh]"
                />

                {/* 2. Story Section with scroll animations */}
                <section id="story-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-6 space-y-6">
                      <div className="space-y-3">
                        <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze block">
                          Established Heritage
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-cream">
                          The Swagger Philosophy
                        </h2>
                      </div>
                      <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light">
                        <p>
                          Our name embodies two distinct principles: **Swagger**, the poise, confidence, and bespoke presence a flawless grooming treatment reveals; and **Blade**, representing the classic, straight-razor craftsmanship and extreme technical focus our certified barbers apply.
                        </p>
                        <p>
                          For over a decade, we have rejected the fast-service methodology of conveyor-belt hair salons. At Swagger & Blade, every guest has access to private consultation chairs, single-estate Italian espresso prep, luxurious straight razor shaves, and skin nourishment mud masks. Our standards are uncompromising because your hair is an extension of your legacy.
                        </p>
                      </div>
                    </div>

                    {/* Classic Quote Box right side layout */}
                    <div className="lg:col-span-6 p-8 sm:p-12 rounded-2xl bg-luxury-slate border border-luxury-border/60 relative overflow-hidden flex flex-col justify-between h-fit lg:min-h-[320px]">
                      <div className="absolute -top-10 -left-10 text-zinc-800 pointer-events-none opacity-20">
                        <Quote className="w-48 h-48 rotate-180" />
                      </div>
                      <Quote className="w-8 h-8 text-luxury-bronze mb-6" />
                      
                      <p className="font-serif text-lg sm:text-xl text-luxury-cream italic leading-relaxed relative z-10">
                        "Your image is an unspoken story. It dictates the gravity you hold when entering a boardroom or meeting family. We make sure that story is spoken with absolute confidence."
                      </p>

                      <div className="mt-8 relative z-10 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-luxury-bronze">
                          <img
                            src="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186324/Image-1-ef321fb2-1920w_tzbaj1.webp"
                            alt="Marcus Vance"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="font-serif font-bold text-sm text-luxury-cream block">Marcus "Vito" Vance</span>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Founder & CEO, Swagger & Blade</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 3. Team grid section */}
                <section id="team-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze">
                      Cultured Technicians
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-cream">
                      Meet Our Artisans
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light">
                      Click on any member card to reveal their biography, specialized straight-razor treatments, and coordinate an instant priority booking.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member) => (
                      <TeamCard
                        key={member.id}
                        member={member}
                        onSelect={(m) => setSelectedTeamMember(m)}
                      />
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* =========================================================================
                C. LOCATIONS ROUTE
                ========================================================================= */}
            {currentRoute === 'locations' && (
              <div id="locations-route-content" className="space-y-24 pb-24">
                
                {/* Hero section */}
                <HeroSection
                  title="Our Luxury Grooming Parlours"
                  subtitle="COORDINATES & DIRECTIONS"
                  description="Select a parlour near you to check physical hours, inspect layout, find contact details and schedule a premium, certified grooming package."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0127-1920w_dqnhsy.webp"
                  heightClass="min-h-[55vh] h-[60vh]"
                />

                {/* Locations Branches block */}
                <section id="locations-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
                    {LOCATIONS.map((branch) => (
                      <LocationCard
                        key={branch.id}
                        branch={branch}
                        onSelect={handleDirectBookLocation}
                      />
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* =========================================================================
                D. SERVICES ROUTE
                ========================================================================= */}
            {currentRoute === 'services' && (
              <div id="services-route-content" className="space-y-24 pb-24">
                
                {/* Hero section */}
                <HeroSection
                  title="Premium Treatment Menu & Pricing"
                  subtitle="TAILORED CUTS, SHAVES & PACKAGES"
                  description="We offer structured options depending on technician mastery tiers. Every treatment includes scalp massages, straight edge cleanup, and organic essential oils."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0035-1920w_ljaz4c.webp"
                  heightClass="min-h-[55vh] h-[60vh]"
                />

                {/* Services component section */}
                <section id="services-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ServiceCard
                    services={SERVICES}
                    onBook={handleDirectBookService}
                  />
                </section>

              </div>
            )}

            {/* =========================================================================
                E. PHOTOS ROUTE (GALLERY)
                ========================================================================= */}
            {currentRoute === 'photos' && (
              <div id="photos-route-content" className="space-y-24 pb-24">
                
                {/* Hero Section */}
                <HeroSection
                  title="Artisan Photo Gallery"
                  subtitle="VISUAL ARCHIVES"
                  description="Step inside our studio spaces. Hover over any frame to inspect scissor silhouettes, workspaces, and organic detailing artifacts."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0085-1920w_ec3yvu.webp"
                  heightClass="min-h-[55vh] h-[60vh]"
                />

                {/* Pinterest Gallery container */}
                <section id="photos-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <PhotoGallery />
                </section>

              </div>
            )}

            {/* =========================================================================
                F. CONTACT ROUTE
                ========================================================================= */}
            {currentRoute === 'contact' && (
              <div id="contact-route-content" className="space-y-24 pb-24">
                
                {/* Hero Section */}
                <HeroSection
                  title="Establish Direct Line"
                  subtitle="CONCIERGE DESK CONTACT"
                  description="Reach out to Swagger & Blade regarding special events, franchising partnerships, or private group bookings."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0049-1920w_jort38.webp"
                  heightClass="min-h-[55vh] h-[60vh]"
                />

                {/* Contact form component */}
                <section id="contact-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ContactForm />
                </section>

              </div>
            )}

            {/* =========================================================================
                G. BOOK NOW ROUTE
                ========================================================================= */}
            {currentRoute === 'book' && (
              <div id="book-route-content" className="space-y-24 pb-24">
                
                {/* Hero Section */}
                <HeroSection
                  title="Schedule Private Ritual"
                  subtitle="APPOINTMENT RESERVATIONS"
                  description="Reserve your styling chair instantly online. Choose your treatment class, pick an expert technician, and select a convenient coordinate time."
                  imageUrl="https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0129-1920w_qrzkfz.webp"
                  heightClass="min-h-[55vh] h-[60vh]"
                />

                {/* Booking Wizard module */}
                <section id="booking-wizard-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <BookingWizard
                    initialBarberId={targetBarberId}
                    initialServiceId={targetServiceId}
                  />
                </section>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Highly stylized custom footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Lightbox / Profile Detail Modal Backdrop */}
      <AnimatePresence>
        {selectedTeamMember && (
          <TeamModal
            member={selectedTeamMember}
            onClose={() => setSelectedTeamMember(null)}
            onDirectBook={handleDirectBookBarber}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
