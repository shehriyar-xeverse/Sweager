import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS } from '../data';
import { X, Search, Sparkles, Scissors, Smile, Image as ImageIcon, ZoomIn, Eye } from 'lucide-react';
import { PhotoItem } from '../types';

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'haircut' | 'shave' | 'styling' | 'workspace' | 'details'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { label: 'All Photos', value: 'all' as const, icon: <ImageIcon className="w-4.5 h-4.5" /> },
    { label: 'Artisan Haircuts', value: 'haircut' as const, icon: <Scissors className="w-4.5 h-4.5" /> },
    { label: 'Precision Shaves', value: 'shave' as const, icon: <Smile className="w-4.5 h-4.5" /> },
    { label: 'Styling Rituals', value: 'styling' as const, icon: <Sparkles className="w-4.5 h-4.5 text-zinc-500" /> },
    { label: 'The Workspace', value: 'workspace' as const, icon: <ImageIcon className="w-4.5 h-4.5 text-amber-500" /> },
    { label: 'Grooming Details', value: 'details' as const, icon: <ImageIcon className="w-4.5 h-4.5" /> }
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div id="pinterest-gallery-wrapper" className="space-y-12">
      
      {/* 1. Category Filter Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? 'border-luxury-bronze text-luxury-charcoal bg-luxury-bronze'
                  : 'border-luxury-border text-zinc-400 bg-luxury-slate/30 hover:text-luxury-cream hover:border-zinc-500'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* 2. Masonry style Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => {
            const isLoaded = loadedImages[photo.id];
            return (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.55, delay: index * 0.03, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-xl bg-luxury-slate group cursor-pointer border border-luxury-border/50 hover:border-luxury-bronze/60 group aspect-[4/5] "
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image Element */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  onLoad={() => handleImageLoad(photo.id)}
                  className={`w-full h-full object-cover transition-all duration-800 ease-out group-hover:scale-108 group-hover:filter group-hover:brightness-[0.7] ${
                    isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                  }`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* SKELETON PLACEHOLDER */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-luxury-slate via-luxury-card to-zinc-800 animate-pulse flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-zinc-700 animate-bounce" />
                  </div>
                )}

                {/* Overlay Text Details (Fade In on hover) */}
                <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20 pointer-events-none">
                  <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-luxury-bronze bg-luxury-bronze-dark/15 border border-luxury-bronze/20 px-2 py-0.5 rounded-full inline-block">
                      {photo.category}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-luxury-cream">
                      {photo.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-luxury-bronze" />
                      Reveal Full Screen
                    </span>
                  </div>
                </div>

                {/* Micro zoom magnifying icon on top right corner */}
                <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-luxury-charcoal/80 text-zinc-500 group-hover:text-luxury-bronze border border-luxury-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 3. LIGHTBOX POPUP DETAIL VIEW */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-50 bg-luxury-charcoal/80 border border-luxury-border text-zinc-400 hover:text-luxury-bronze p-3 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner responsive layout container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[85vh] bg-luxury-slate rounded-2xl overflow-hidden border border-luxury-border shadow-[0_24px_80px_rgba(0,0,0,0.95)] grid grid-cols-1 md:grid-cols-12"
            >
              {/* Media showcase frame */}
              <div className="md:col-span-8 bg-zinc-950 flex items-center justify-center h-[350px] md:h-[70vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Media text details */}
              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-luxury-slate">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-bronze font-bold block">
                    {selectedPhoto.category} showcase
                  </span>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-cream">
                    {selectedPhoto.title}
                  </h3>

                  <div className="w-12 h-0.5 bg-luxury-bronze-dark" />

                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    This captures our trademark visual precision in the studio. Hand-crafted products, master scissor disciplines, and specialized double-lather straight shaves designed for the modern gentleman.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 block">
                    Shared on Official Gazette
                  </span>
                  <div className="flex gap-4 text-xs font-mono text-zinc-400">
                    <div>
                      <span className="text-luxury-cream font-bold">12k+</span> likes
                    </div>
                    <div>
                      <span className="text-luxury-cream font-bold">489+</span> comments
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full py-3 border border-zinc-600 hover:border-luxury-bronze text-zinc-400 hover:text-luxury-bronze text-xs font-serif font-bold uppercase tracking-widest rounded transition-colors cursor-pointer"
                  >
                    Back To Pinterest Masonry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
