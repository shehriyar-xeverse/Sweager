import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Compass, Calendar, ArrowUpRight } from 'lucide-react';
import { LocationBranch } from '../types';

interface LocationCardProps {
  key?: string;
  branch: LocationBranch;
  onSelect: (branchId: string) => void;
}

export default function LocationCard({ branch, onSelect }: LocationCardProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="bg-luxury-slate border border-luxury-border/60 hover:border-luxury-bronze/60 rounded-2xl overflow-hidden card-glow-hover flex flex-col h-full shadow-2xl transition-colors duration-300"
    >
      {/* 1. Card Top Media / Map container */}
      <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
        <AnimatePresence mode="wait">
          {!showMap ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 group"
            >
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-transparent to-transparent/30 z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-neutral-900"
            >
              <iframe
                title={`Map of ${branch.name}`}
                src={branch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(185deg) contrast(100%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Toggle Badges */}
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-3 py-1.5 bg-luxury-charcoal/90 hover:bg-luxury-bronze hover:text-luxury-charcoal border border-luxury-border/80 text-[10px] font-mono uppercase text-luxury-bronze tracking-widest rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-3 h-3 anim-spin-hover" />
            {showMap ? 'Show Photo' : 'Interactive Map'}
          </button>
        </div>
      </div>

      {/* 2. Card Content details block */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-luxury-bronze shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-cream tracking-wide">
                {branch.name}
              </h3>
              <p className="text-zinc-500 text-sm font-light mt-1.5">
                {branch.address}, {branch.city}
              </p>
            </div>
          </div>

          <div className="py-4 border-t border-b border-luxury-border/30 grid grid-cols-1 gap-3 text-xs font-mono text-zinc-400">
            <div className="flex gap-2">
              <Clock className="w-4 h-4 text-luxury-bronze shrink-0" />
              <div className="space-y-1">
                <p className="text-zinc-500 uppercase tracking-widest text-[9px]">Business Hours</p>
                <p>Mon — Fri: <span className="text-zinc-300">{branch.hours.weekdays}</span></p>
                <p>Saturday: <span className="text-zinc-300">{branch.hours.saturday}</span></p>
                {branch.hours.sunday !== 'Closed' && (
                  <p>Sunday: <span className="text-zinc-300">{branch.hours.sunday}</span></p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-luxury-border/10">
              <Phone className="w-4 h-4 text-luxury-bronze shrink-0" />
              <span>Contact Parlour: <strong className="text-zinc-300">{branch.phone}</strong></span>
            </div>
          </div>
        </div>

        {/* 3. CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => onSelect(branch.id)}
            className="w-full py-3.5 bg-luxury-bronze hover:bg-luxury-bronze-light text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book This Parlour
          </button>
          
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(branch.address + ', ' + branch.city)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-4 py-3.5 bg-luxury-charcoal/40 hover:bg-luxury-card hover:text-luxury-bronze border border-zinc-700 text-zinc-400 text-xs font-mono uppercase tracking-widest rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            Directions
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
