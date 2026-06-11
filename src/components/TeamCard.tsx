import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Instagram, Award } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamCardProps {
  key?: string;
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

export default function TeamCard({ member, onSelect }: TeamCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // 3D Tilt Effect on Hover Calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max 10 degrees tilt rotation
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="perspective-1000 w-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(member)}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative group cursor-pointer overflow-hidden bg-luxury-slate border border-luxury-border/60 hover:border-luxury-bronze/60 rounded-xl preserve-3d shadow-xl transition-colors duration-400 p-3 card-glow-hover"
      >
        {/* Aspect Ratio Box with zoom-on-hover image */}
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-zinc-950 mb-4 z-10">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 saturate-[0.95]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate via-transparent to-transparent opacity-60 z-10" />
          
          {/* Custom Tag Indicator (Experience / Mastery) */}
          <span className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-luxury-charcoal/80 border border-luxury-bronze/20 rounded-full text-[10px] font-mono uppercase text-luxury-bronze tracking-wider">
            <Award className="w-3 h-3" />
            {member.experience}
          </span>
        </div>

        {/* Content Box */}
        <div className="px-1 pb-3 space-y-2 relative z-20">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-luxury-bronze font-mono uppercase tracking-widest block font-medium">
              {member.role}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{member.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-luxury-cream group-hover:text-luxury-bronze transition-colors tracking-wide">
            {member.name}
          </h3>

          <p className="text-zinc-500 text-xs font-light line-clamp-2 leading-relaxed">
            {member.bio}
          </p>

          {/* Prompt CTA Indicator */}
          <div className="pt-3 border-t border-luxury-border/30 flex items-center justify-between text-xs text-zinc-400 font-mono mt-2 group-hover:text-luxury-bronze transition-colors">
            <span>{member.specialty.split('&')[0]}</span>
            <span className="text-[10px] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all text-luxury-bronze uppercase tracking-widest font-bold">
              View Profile &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
