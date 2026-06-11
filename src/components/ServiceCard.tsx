import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Scissors, Skull, RefreshCw, Star, Calendar, Clock, DollarSign } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  services: Service[];
  onBook: (serviceId: string) => void;
}

export default function ServiceCard({ services, onBook }: ServiceCardProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cuts' | 'shaves' | 'styling' | 'packages'>('all');

  const categories = [
    { label: 'All Treatments', value: 'all' as const, icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Haircuts', value: 'cuts' as const, icon: <Scissors className="w-4 h-4" /> },
    { label: 'Face Shaves', value: 'shaves' as const, icon: <Skull className="w-4 h-4 text-zinc-500" /> },
    { label: 'Styling', value: 'styling' as const, icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'Royal Packages', value: 'packages' as const, icon: <Star className="w-4 h-4 text-amber-500" /> },
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div id="services-interactive-dashboard" className="space-y-10">
      
      {/* 1. Category Filter Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 border-b border-luxury-border/30 pb-4"
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 relative cursor-pointer border ${
                isSelected
                  ? 'border-luxury-bronze text-luxury-charcoal bg-luxury-bronze shadow-[0_4px_15px_rgba(16,185,129,0.25)]'
                  : 'border-luxury-border/60 text-zinc-400 bg-luxury-slate/40 hover:text-luxury-cream hover:border-zinc-500'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* 2. Services Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative group bg-luxury-slate border border-luxury-border/60 hover:border-luxury-bronze/60 rounded-xl p-5 sm:p-7 flex flex-col justify-between h-full preserve-3d card-glow-hover transition-all duration-400"
            >
              <div className="space-y-4">
                
                {/* Visual Category Label */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">
                    Category: {service.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-luxury-charcoal/80 rounded font-mono text-[10px] text-zinc-400 border border-luxury-border/20">
                    <Clock className="w-3 h-3 text-luxury-bronze" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream group-hover:text-luxury-bronze transition-colors tracking-wide pr-12">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {service.description}
                </p>

              </div>

              {/* Price & Action Footer Grid */}
              <div className="mt-6 pt-5 border-t border-luxury-border/30 flex items-center justify-between gap-4">
                <div className="flex items-baseline">
                  <span className="text-luxury-bronze text-sm font-mono mr-0.5">$</span>
                  <span className="text-luxury-cream text-2xl sm:text-3xl font-serif font-black tracking-tight group-hover:text-glow-bronze transition-all">
                    {service.price}
                  </span>
                </div>

                <button
                  onClick={() => onBook(service.id)}
                  className="px-4 py-2 bg-transparent border border-luxury-bronze text-luxury-bronze hover:bg-luxury-bronze hover:text-luxury-charcoal text-[10px] font-mono uppercase tracking-widest rounded transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-[0_2px_10px_transparent] hover:shadow-[0_4px_15px_rgba(16,185,129,0.25)]"
                >
                  <Calendar className="w-3 h-3 text-current" />
                  Quick Book
                </button>
              </div>

              {/* Custom background dynamic glow ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-luxury-bronze-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
