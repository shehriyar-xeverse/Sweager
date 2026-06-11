import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Compass, HelpCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Booking Query');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSubmitting(true);
    // Simulate high-fidelity message delivery sending
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Cleanup inputs
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1800);
  };

  return (
    <div id="contact-interactive-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      {/* Detail Column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-luxury-bronze">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-cream">
            The Concierge Desk
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Have questions regarding hosting private grooming events, custom franchise inquiries, group bookings, or specialized brand sponsorships? Our support staff responds within 4 operational hours.
          </p>
        </div>

        {/* Info Rows */}
        <div className="space-y-5">
          {[
            {
              icon: <Phone className="w-5 h-5 text-luxury-bronze" />,
              title: 'Telephone direct line',
              subtitle: '(212) 555-0129',
              desc: 'Available Monday through Saturday, 9am — 8pm.'
            },
            {
              icon: <Mail className="w-5 h-5 text-luxury-bronze" />,
              title: 'Email communication address',
              subtitle: 'concierge@swaggerandblade.com',
              desc: 'Direct line for digital media and corporate relations.'
            },
            {
              icon: <MapPin className="w-5 h-5 text-luxury-bronze" />,
              title: 'Soho Head Offices',
              subtitle: '298 Mercer Street, New York, NY',
              desc: 'Premium parlor suite and private guest bookings.'
            }
          ].map((info, i) => (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i}
              className="flex gap-4 p-4 rounded-xl border border-luxury-border/60 bg-luxury-slate/50"
            >
              <div className="p-2.5 bg-luxury-charcoal border border-luxury-border/80 rounded-lg height-fit h-fit mt-0.5">
                {info.icon}
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono uppercase text-[9px] block">
                  {info.title}
                </span>
                <p className="font-serif font-bold text-sm sm:text-base text-luxury-cream">
                  {info.subtitle}
                </p>
                <p className="text-zinc-500 text-xs font-light">
                  {info.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Inputs Form Box Column */}
      <div className="lg:col-span-7 bg-luxury-slate border border-luxury-border shadow-2xl rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Absolute Glowing highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-luxury-bronze/5 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="message-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 space-y-6 max-w-md mx-auto"
            >
              <CheckCircle2 className="w-16 h-16 text-luxury-bronze mx-auto text-glow-bronze animate-pulse" />
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-cream">
                  Message Dispatched Safely!
                </h3>
                <p className="text-zinc-500 text-sm font-light">
                  Our front-desk concierge will inspect details and contact you shortly. Thank you for choosing Swagger & Blade.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 bg-transparent border border-luxury-bronze text-luxury-bronze hover:bg-luxury-bronze hover:text-luxury-charcoal text-xs uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
              >
                Send Another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream">
                  Establish Direct Link
                </h3>
                <p className="text-zinc-500 text-xs font-light">
                  Fill out structural fields below. All inputs are transmitted under encrypted channels.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Responsive Name/Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Liam Mercer"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Email address *
                    </label>
                    <input
                      type="email"
                      placeholder="concierge@guest.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Telephone / contact
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 012-3456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Subject Matter
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-zinc-400 px-4 py-3.5 outline-none focus:border-luxury-bronze transition-colors duration-300"
                    >
                      <option value="Booking Query">Booking/Reservation help</option>
                      <option value="Private Booking">Private Event inquiry</option>
                      <option value="Franchise Opportunity">Franchise & Careers</option>
                      <option value="Products Query">Product line distribution</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                    Detailed Message Brief *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe context clearly. Include any requested dates or operational targets."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream p-4 outline-none focus:border-luxury-bronze transition-colors duration-300 resize-none"
                  />
                </div>

              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={submitting || !name || !email || !message}
                className="w-full py-4 bg-luxury-bronze hover:bg-luxury-bronze-light disabled:opacity-30 disabled:pointer-events-none text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                {submitting ? (
                  <span>Transmitting Secure Packet...</span>
                ) : (
                  <>
                    <span>Transmit Message Packet</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
