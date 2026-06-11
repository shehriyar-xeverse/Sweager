import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, TEAM_MEMBERS } from '../data';
import { Calendar, User, ShoppingBag, Clock, ArrowRight, ArrowLeft, CheckCircle, Smartphone, Mail, Info, CalendarClock, ShieldAlert } from 'lucide-react';

interface BookingWizardProps {
  initialBarberId?: string;
  initialServiceId?: string;
}

export default function BookingWizard({ initialBarberId, initialServiceId }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialServiceId || '');
  const [selectedBarber, setSelectedBarber] = useState(initialBarberId || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  // Form Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Dropdown helper controls
  const [isSubmitRunning, setIsSubmitRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick reset if inputs shift
  useEffect(() => {
    if (initialBarberId) setSelectedBarber(initialBarberId);
    if (initialServiceId) setSelectedService(initialServiceId);
  }, [initialBarberId, initialServiceId]);

  // Generate mock dates for the next 7 days
  const getWeekDates = () => {
    const dates = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      // Skip Sundays for locations that are closed
      if (d.getDay() === 0 && selectedBarber === 'beverly_hills_residency') {
        continue;
      }
      
      dates.push({
        raw: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options),
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        num: d.getDate()
      });
    }
    return dates;
  };

  const datesList = getWeekDates();

  // Mock luxury time slots
  const TIME_SLOTS = [
    { label: 'Morning slots', slots: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'] },
    { label: 'Afternoon slots', slots: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM'] },
    { label: 'Evening slots', slots: ['06:00 PM', '06:45 PM', '07:30 PM'] }
  ];

  // Helper selectors
  const activeServiceObj = SERVICES.find(s => s.id === selectedService);
  const activeBarberObj = TEAM_MEMBERS.find(b => b.id === selectedBarber);

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedBarber) return;
    if (step === 3 && (!selectedDate || !selectedTimeSlot)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    
    setIsSubmitRunning(true);
    // Simulate premium server-side calculation & booking scheduling
    setTimeout(() => {
      setIsSubmitRunning(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <div id="booking-wizard-component" className="w-full max-w-4xl mx-auto bg-luxury-slate border border-luxury-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl p-5 sm:p-10 relative overflow-hidden">
      
      {/* Absolute Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luxury-bronze/5 via-transparent to-transparent pointer-events-none" />

      {/* 5-Step Process Bar indicators */}
      {!isSuccess && (
        <div className="mb-10 block">
          <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>Step {step} of 4</span>
            <span className="text-luxury-bronze font-bold">
              {step === 1 && 'Select Treatment'}
              {step === 2 && 'Choose Barber'}
              {step === 3 && 'Pick Schedule'}
              {step === 4 && 'Client Information'}
            </span>
          </div>
          <div className="w-full bg-luxury-charcoal h-1 md:h-1.5 rounded-full mt-3 overflow-hidden flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-grow h-full rounded-full transition-all duration-500 ${
                  s === step
                    ? 'bg-gradient-to-r from-luxury-bronze-dark to-luxury-bronze scale-x-105'
                    : s < step
                    ? 'bg-luxury-bronze/50'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* SUCCESS STATE VIEW */}
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-7 max-w-xl mx-auto"
          >
            <div className="relative inline-block">
              <CheckCircle className="w-20 h-20 text-luxury-bronze mx-auto text-glow-bronze" />
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-luxury-bronze rounded-full -z-10"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-luxury-cream">
                Reservation Confirmed!
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                Your luxury grooming ritual has been scheduled. A confirmation summary is sent to your email.
              </p>
            </div>

            {/* Structured Receipt Summary block */}
            <div className="bg-luxury-charcoal/80 border border-luxury-border/60 rounded-xl p-5 text-left text-xs space-y-4 font-mono shadow-inner">
              <div className="flex items-center justify-between border-b border-luxury-border/30 pb-3">
                <span className="text-zinc-500">RESERVATION ID</span>
                <span className="text-luxury-bronze font-bold">#SB-{Math.floor(Math.random() * 90000 + 10000)}</span>
              </div>

              <div className="space-y-2 flex flex-col justify-start">
                <div className="flex items-start gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-luxury-bronze shrink-0" />
                  <div className="text-xs">
                    <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Treatment Class</p>
                    <p className="text-luxury-cream text-sm font-serif mt-0.5">{activeServiceObj?.name} (${activeServiceObj?.price})</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <User className="w-4 h-4 text-luxury-bronze shrink-0" />
                  <div>
                    <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Barber Artisan</p>
                    <p className="text-luxury-cream text-xs mt-0.5">{activeBarberObj?.name} — {activeBarberObj?.role}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <Clock className="w-4 h-4 text-luxury-bronze shrink-0" />
                  <div>
                    <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Appointment Slot</p>
                    <p className="text-luxury-cream text-xs mt-0.5">
                      {datesList.find(d => d.raw === selectedDate)?.formatted} at {selectedTimeSlot}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-luxury-border/30 pt-3 flex items-center justify-between text-xs font-serif font-bold text-luxury-cream">
                <span>Guest Name:</span>
                <span>{clientName}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedService('');
                  setSelectedBarber('');
                  setSelectedDate('');
                  setSelectedTimeSlot('');
                  setClientName('');
                  setClientEmail('');
                  setClientPhone('');
                  setClientNotes('');
                  setIsSuccess(false);
                }}
                className="px-6 py-3 bg-transparent border border-luxury-bronze text-luxury-bronze hover:bg-luxury-bronze hover:text-luxury-charcoal text-xs uppercase tracking-widest font-bold rounded transition-all cursor-pointer"
              >
                Book Another Ritual
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmitBooking} className="space-y-8">
            
            {/* STEP 1: TREATMENT SERVICE SELECT */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream">Select Treatment Service</h3>
                  <p className="text-zinc-500 text-xs font-light">Explore from our exquisite lists curated to absolute precision.</p>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                  {SERVICES.map((serv) => {
                    const isSelected = selectedService === serv.id;
                    return (
                      <div
                        key={serv.id}
                        onClick={() => setSelectedService(serv.id)}
                        className={`p-4 border rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-luxury-bronze bg-luxury-bronze/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                            : 'border-luxury-border/60 hover:border-zinc-500 bg-luxury-charcoal/55'
                        }`}
                      >
                        <div className="flex-grow space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-sm font-bold text-luxury-cream block">
                              {serv.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">({serv.duration})</span>
                          </div>
                          <span className="text-xs text-zinc-400 font-light block line-clamp-1 pr-10">
                            {serv.description}
                          </span>
                        </div>
                        <span className="text-sm font-serif font-black text-luxury-bronze">
                          ${serv.price}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer validation check */}
                <div className="pt-2 flex items-center justify-between border-t border-luxury-border/30">
                  <span className="text-xs text-zinc-500 font-mono">
                    {selectedService ? '✓ Service selected: ' : 'ℹ Select a service above'}
                    <strong className="text-luxury-bronze">{activeServiceObj?.name}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!selectedService}
                    className="px-5 py-3 bg-luxury-bronze hover:bg-luxury-bronze-light disabled:opacity-30 disabled:pointer-events-none text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: BARBER SELECTIONS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream">Choose Barber Artisan</h3>
                  <p className="text-zinc-500 text-xs font-light">Each technician is dynamically certified in distinct luxury textures.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-1">
                  {TEAM_MEMBERS.map((barber) => {
                    const isSelected = selectedBarber === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber.id)}
                        className={`p-3.5 border rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-300 relative ${
                          isSelected
                            ? 'border-luxury-bronze bg-luxury-bronze/10'
                            : 'border-luxury-border/60 hover:border-zinc-500 bg-luxury-charcoal/55'
                        }`}
                      >
                        <img
                          src={barber.image}
                          alt={barber.name}
                          className="w-12 h-12 rounded-lg object-cover filter brightness-90 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-grow">
                          <span className="font-serif text-xs font-bold text-luxury-cream block truncate">
                            {barber.name.split(' "')[0]}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono mt-0.5 truncate">
                            {barber.role.split(' & ')[0]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-luxury-border/30">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 border border-zinc-600 hover:border-luxury-bronze text-zinc-400 hover:text-luxury-bronze text-xs font-serif font-bold uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                    Barber: <strong className="text-luxury-bronze">{activeBarberObj?.name || '---'}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!selectedBarber}
                    className="px-5 py-3 bg-luxury-bronze hover:bg-luxury-bronze-light disabled:opacity-30 disabled:pointer-events-none text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCHEDULE DATE & TIME SELECT */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream">Pick Date & Time Schedule</h3>
                  <p className="text-zinc-500 text-xs font-light">Custom real-time reservation window for next 7 calendar days.</p>
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {datesList.map((dt) => {
                    const isSelected = selectedDate === dt.raw;
                    return (
                      <div
                        key={dt.raw}
                        onClick={() => setSelectedDate(dt.raw)}
                        className={`p-3 text-center rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'border-luxury-bronze text-luxury-bronze bg-luxury-bronze/10'
                            : 'border-luxury-border bg-luxury-charcoal/50 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-wider block text-zinc-500 font-mono">
                          {dt.day}
                        </span>
                        <span className="text-base font-serif font-bold block mt-1">
                          {dt.num}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Time slots accordian list */}
                {selectedDate ? (
                  <div className="space-y-4 pt-2">
                    {TIME_SLOTS.map((cat, idx) => (
                      <div key={idx} className="space-y-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          {cat.label}
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {cat.slots.map((sl) => {
                            const isSelected = selectedTimeSlot === sl;
                            return (
                              <button
                                type="button"
                                key={sl}
                                onClick={() => setSelectedTimeSlot(sl)}
                                className={`py-2 text-xs rounded font-mono transition-all text-center border cursor-pointer ${
                                  isSelected
                                    ? 'border-luxury-bronze text-luxury-bronze bg-luxury-bronze/15'
                                    : 'border-luxury-border/60 text-zinc-400 bg-luxury-charcoal/[0.3] hover:text-luxury-cream hover:border-zinc-500'
                                }`}
                              >
                                {sl}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 border border-dashed border-luxury-border/60 rounded-xl flex flex-col items-center justify-center text-center text-zinc-600 space-y-2.5">
                    <CalendarClock className="w-8 h-8 text-zinc-700" />
                    <p className="text-xs font-mono uppercase tracking-widest">Select a Date above to reveal details</p>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between border-t border-luxury-border/30">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 border border-zinc-600 hover:border-luxury-bronze text-zinc-400 hover:text-luxury-bronze text-xs font-serif font-bold uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className="px-5 py-3 bg-luxury-bronze hover:bg-luxury-bronze-light disabled:opacity-30 disabled:pointer-events-none text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: GUEST INFORMATION FORM */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-cream">Guest Information</h3>
                  <p className="text-zinc-500 text-xs font-light">Specify details for the final scheduling check.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                      />
                      <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="johndoe@example.com"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                      />
                      <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="(212) 555-0123"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream px-4 py-3 outline-none focus:border-luxury-bronze transition-colors duration-300"
                      />
                      <Smartphone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                      Special Requests / Notes
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        placeholder="Please advise on hair density treatments or pre-shave requests if any."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-luxury-border rounded-lg text-sm text-luxury-cream p-4 outline-none focus:border-luxury-bronze transition-colors duration-300 resize-none"
                      />
                      <Info className="absolute right-3.5 bottom-3 w-4 h-4 text-zinc-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Luxury pricing confirmation guarantee badge */}
                <div className="flex gap-3 p-4 bg-luxury-charcoal rounded-lg border border-luxury-border/70 text-xs text-zinc-400 items-start">
                  <ShieldAlert className="w-5 h-5 text-luxury-bronze shrink-0" />
                  <div>
                    <span className="font-serif font-bold text-luxury-cream text-xs block">Swagger & Blade Policy Code</span>
                    <span className="font-light text-xs mt-1 block">Your appointment will be reserved. Rescheduling or cancellation is available with 24-hours advance notification. Payment is calculated directly after styling.</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-luxury-border/30">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 border border-zinc-600 hover:border-luxury-bronze text-zinc-400 hover:text-luxury-bronze text-xs font-serif font-bold uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={!clientName || !clientEmail || !clientPhone || isSubmitRunning}
                    className="px-6 py-3 bg-luxury-bronze hover:bg-luxury-bronze-light disabled:opacity-30 disabled:pointer-events-none text-luxury-charcoal font-serif font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_transparent] hover:shadow-[0_4px_25px_rgba(16,185,129,0.35)]"
                  >
                    {isSubmitRunning ? 'Verifying Availability...' : 'Confirm Appointment'}
                    {!isSubmitRunning && <CheckCircle className="w-4 h-4 text-luxury-charcoal" />}
                  </button>
                </div>
              </motion.div>
            )}

          </form>
        )}

      </AnimatePresence>

    </div>
  );
}
