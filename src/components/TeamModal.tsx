import { motion } from 'motion/react';
import { X, Star, Calendar, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamModalProps {
  member: TeamMember;
  onClose: () => void;
  onDirectBook: (barberId: string) => void;
}

export default function TeamModal({ member, onClose, onDirectBook }: TeamModalProps) {
  return (
    <div
      id="team-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-luxury-slate border border-luxury-border shadow-[0_24px_80px_rgba(0,0,0,0.95)] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Absolute Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-35 cursor-pointer bg-luxury-charcoal/85 hover:bg-luxury-bronze hover:text-luxury-charcoal border border-luxury-border hover:border-luxury-bronze p-2 rounded-full text-zinc-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Member Visual Column */}
          <div className="md:col-span-5 relative h-[350px] md:h-auto min-h-[300px] bg-zinc-950">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-luxury-slate/95 via-transparent to-transparent md:to-transparent z-10" />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="px-3 py-1 bg-luxury-bronze text-luxury-charcoal font-mono text-[9px] uppercase tracking-widest font-black rounded-full">
                {member.experience} EXP
              </span>
            </div>
          </div>

          {/* Member Detailed Content Column */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              
              {/* Badge & Rating Block */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-luxury-bronze font-bold">
                  {member.role}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-luxury-charcoal rounded border border-luxury-border/40 text-xs font-mono text-zinc-300">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{member.rating.toFixed(1)} Rating</span>
                </div>
              </div>

              {/* Name Details */}
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wide text-luxury-cream">
                {member.name}
              </h2>

              {/* Bio Block */}
              <div className="space-y-4">
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  {member.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-luxury-charcoal/50 rounded-lg border border-luxury-border/30">
                    <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Primary Specialty</span>
                    <p className="text-xs text-luxury-cream mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-luxury-bronze shrink-0" />
                      {member.specialty}
                    </p>
                  </div>

                  <div className="p-3.5 bg-luxury-charcoal/50 rounded-lg border border-luxury-border/30">
                    <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Direct Contact</span>
                    <a
                      href={`https://instagram.com/${member.instagram.substring(1)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-luxury-bronze hover:text-luxury-bronze-light hover:underline mt-1 flex items-center gap-1.5"
                    >
                      <Instagram className="w-3.5 h-3.5 shrink-0" />
                      {member.instagram}
                    </a>
                  </div>
                </div>
              </div>

              {/* Highlight Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Master Beard Shaver', 'Modern Scissors Artist', 'Lather Professional', 'Sanitized Care Certified'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-luxury-card border border-luxury-border/60 rounded text-[10px] font-mono text-zinc-500 hover:text-luxury-bronze transition-colors flex items-center gap-1"
                  >
                    <Heart className="w-2.5 h-2.5 text-luxury-bronze/40" />
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* CTA action trigger directly to Booking wizard with this selected barber */}
            <div className="pt-6 border-t border-luxury-border/40 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onDirectBook(member.id)}
                className="w-full sm:w-auto px-6 py-4 bg-luxury-bronze hover:bg-luxury-bronze-light text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-luxury-charcoal" />
                Book Session with {member.name.split(' ')[0]}
              </button>
              
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-4 bg-transparent border border-zinc-600 hover:border-luxury-bronze text-zinc-400 hover:text-luxury-bronze text-xs font-serif font-bold uppercase tracking-widest rounded transition-colors"
              >
                Back To Team Carousel
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
