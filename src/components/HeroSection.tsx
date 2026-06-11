import { motion } from 'motion/react';
import { Play, Calendar, ChevronsDown } from 'lucide-react';
import { Route } from '../types';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  ctaTextPrimary?: string;
  ctaRoutePrimary?: Route;
  ctaTextSecondary?: string;
  ctaRouteSecondary?: Route;
  onNavigate?: (route: Route) => void;
  heightClass?: string; // e.g. "h-screen" or "h-[65vh]"
}

export default function HeroSection({
  title,
  subtitle,
  description,
  videoUrl,
  imageUrl,
  ctaTextPrimary,
  ctaRoutePrimary,
  ctaTextSecondary,
  ctaRouteSecondary,
  onNavigate,
  heightClass = 'min-h-[85vh]',
}: HeroSectionProps) {

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="hero-banner-section"
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-luxury-charcoal`}
    >
      {/* 1. LAYER: Media Background (Video or Image) */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-100 filter brightness-100 contrast-100 saturate-100"
          />
        ) : imageUrl ? (
          <motion.img
            initial={{ scale: 1.05, filter: 'blur(4px) brightness(1)' }}
            animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-luxury-slate to-luxury-charcoal" />
        )}

        {/* 2. LAYER: Premium overlays - ONLY very light subtle transparent bottom gradient for section blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent z-10" />
        
        {/* Subtle glowing lines */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-bronze/35 to-transparent z-10" />
      </div>

      {/* 3. LAYER: Content Overlay (with robust background text backup and drop shadows) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 bg-black/35 backdrop-blur-[2px] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 inline-block w-full shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Subtitle Accent */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-[9px] sm:text-xs tracking-[0.16em] sm:tracking-[0.3em] md:tracking-[0.45em] text-luxury-bronze font-bold uppercase block font-mono pl-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            {subtitle}
          </motion.div>

          {/* Main Display Headline with Luxury Font */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-luxury-cream leading-tight max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            {title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                className="inline-block mr-3 md:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Luxury Description Text with powerful drop shadows */}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="text-zinc-100 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed pl-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
            >
              {description}
            </motion.p>
          )}

          {/* Action Call-to-Buttons with 3D interactions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {ctaTextPrimary && ctaRoutePrimary && onNavigate && (
              <button
                onClick={() => onNavigate(ctaRoutePrimary)}
                className="w-full sm:w-auto px-7 py-3.5 bg-luxury-bronze hover:bg-luxury-bronze-light text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(16,185,129,0.25)] rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.45)] cursor-pointer flex items-center justify-center gap-2 group hoverable"
              >
                {ctaTextPrimary}
                <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 text-luxury-charcoal" />
              </button>
            )}

            {ctaTextSecondary && ctaRouteSecondary && onNavigate && (
              <button
                onClick={() => onNavigate(ctaRouteSecondary)}
                className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-zinc-500 hover:border-luxury-bronze text-luxury-cream hover:text-luxury-bronze font-serif font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group hoverable"
              >
                {ctaTextSecondary}
                <Play className="w-3.5 h-3.5 text-current transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 4. LAYER: Scroll indicator chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 text-center hidden sm:block">
        <motion.button
          onClick={handleScrollDown}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-zinc-600 hover:text-luxury-bronze transition-colors p-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono block mb-1">Scroll Reveal</span>
          <ChevronsDown className="w-4 h-4 mx-auto" />
        </motion.button>
      </div>
    </section>
  );
}
