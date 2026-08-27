import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchApi } from '../lib/api';

const AVAILABLE_LOCATIONS = [
  "Raipur, Chhattisgarh",
  "Naya Raipur, Chhattisgarh",
  "Rajim, Chhattisgarh",
  "Sirpur, Chhattisgarh",
  "Bastar, Chhattisgarh",
  "Kawardha, Chhattisgarh",
  "Dantewada, Chhattisgarh",
  "Mainpat, Chhattisgarh",
  "Gariaband, Chhattisgarh",
  "Khajuraho, Madhya Pradesh",
  "Sanchi, Madhya Pradesh",
  "Kanha, Madhya Pradesh",
  "Umaria, Madhya Pradesh",
  "Ujjain, Madhya Pradesh",
  "Pachmarhi, Madhya Pradesh",
  "Bhojpur, Madhya Pradesh",
  "Jaipur, Rajasthan",
  "Jodhpur, Rajasthan",
  "Jaisalmer, Rajasthan",
  "Udaipur, Rajasthan",
  "Pushkar, Rajasthan",
  "New Delhi, Delhi",
  "Agra, Uttar Pradesh",
  "Varanasi, Uttar Pradesh",
  "Ayodhya, Uttar Pradesh",
  "Mumbai, Maharashtra",
  "Aurangabad, Maharashtra",
  "Goa",
  "Old Goa, Goa",
  "Mysuru, Karnataka",
  "Hampi, Karnataka",
  "Bengaluru, Karnataka",
  "Munnar, Kerala",
  "Alappuzha, Kerala",
  "Kochi, Kerala",
  "Varkala, Kerala",
  "Madurai, Tamil Nadu",
  "Chennai, Tamil Nadu",
  "Ooty, Tamil Nadu",
  "Rameswaram, Tamil Nadu",
  "Rishikesh, Uttarakhand",
  "Haridwar, Uttarakhand",
  "Nainital, Uttarakhand",
  "Mussoorie, Uttarakhand",
  "Shimla, Himachal Pradesh",
  "Manali, Himachal Pradesh",
  "Srinagar, Jammu and Kashmir",
  "Gulmarg, Jammu and Kashmir",
  "Kolkata, West Bengal",
  "Darjeeling, West Bengal",
  "Puri, Odisha",
  "Konark, Odisha",
  "Bhubaneswar, Odisha",
  "Kevadia, Gujarat",
  "Ahmedabad, Gujarat",
  "Hyderabad, Telangana",
  "Amritsar, Punjab",
  "Bodh Gaya, Bihar",
  "Tirupati, Andhra Pradesh",
  "Kaziranga, Assam",
  "Gangtok, Sikkim",
  "Cherrapunji, Meghalaya",
  "Ladakh",
  "Leh, Ladakh",
];

const PriorityBadge = ({ priority }) => {
  const styles = {
    low: 'bg-blue-50/70 text-blue-600 border-blue-100/70',
    medium: 'bg-amber-50/70 text-amber-600 border-amber-100/70',
    high: 'bg-red-50/70 text-red-600 border-red-100/70',
    critical:
      'bg-red-500 text-white border-red-400/50 shadow-[0_4px_15px_rgba(239,68,68,0.2)]',
  };

  const p = priority?.toLowerCase() || 'medium';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1',
        'text-[10px] font-semibold tracking-wide',
        'backdrop-blur-xl',
        styles[p] || styles.medium
      )}
    >
      {p === 'critical' && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      )}
      {p.charAt(0).toUpperCase() + p.slice(1)} priority
    </span>
  );
};

export default function Grievances() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = AVAILABLE_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !description) {
      setError('Please provide both a location and a description.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetchApi('/grievance/submit', {
        method: 'POST',
        body: JSON.stringify({
          location,
          text: description,
        }),
      });

      if (res?.success && res.data) {
        setTickets((prev) => [res.data, ...prev]);
        setDescription('');
        setLocation('');
      }
    } catch (err) {
      setError(
        err.message ||
          'Failed to submit grievance. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6">

      {/* Ambient Liquid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-white/90 blur-[130px]" />

        <div className="absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-[140px]" />

        <div className="absolute bottom-[-250px] left-1/2 h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-[150px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl pt-6 sm:pt-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-xl">
          <Sparkles
            size={13}
            className="text-blue-500"
          />
          Civic support
        </div>

        <h1 className="mt-6 max-w-2xl text-[3rem] font-semibold leading-[1] tracking-[-0.055em] text-slate-950 sm:text-6xl">
          Speak up.
          <br />

          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            We'll take it from here.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Report a civic issue and let intelligent routing
          send it to the right place.
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">

        {/* Submission */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-30 lg:col-span-5"
        >
          <div className="liquid-window overflow-visible rounded-[2.5rem] p-3 sm:rounded-[3rem]">

            <div className="rounded-[2rem] border border-white/60 bg-white/30 p-5 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-7">

              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10">
                    <MessageSquare
                      size={15}
                      className="text-blue-500"
                    />
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    New report
                  </span>
                </div>

                <p className="text-sm text-slate-400">
                  A few details are all we need.
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 rounded-2xl border border-red-100/70 bg-red-50/70 px-4 py-3 text-sm text-red-600 backdrop-blur-xl">
                      <AlertTriangle size={15} />
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Location */}
                <div
                  className="relative"
                  ref={dropdownRef}
                >
                  <label className="mb-2.5 ml-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin
                      size={14}
                      className="text-blue-500"
                    />
                    Location
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="Where is the issue?"
                      className="
                        h-14 w-full rounded-2xl
                        border border-white/70
                        bg-white/45
                        px-4
                        text-sm font-medium text-slate-800
                        placeholder:text-slate-400
                        outline-none
                        backdrop-blur-xl
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
                        transition-all duration-300
                        hover:bg-white/60
                        focus:border-blue-300/60
                        focus:bg-white/70
                        focus:shadow-[0_0_0_4px_rgba(0,122,255,0.07)]
                      "
                    />

                    <MapPin
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>

                  <AnimatePresence>
                    {showDropdown && location && (
                      <motion.ul
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.98,
                        }}
                        className="
                          absolute left-0 right-0 top-full z-50 mt-2
                          max-h-60 overflow-y-auto
                          rounded-2xl
                          border border-white/80
                          bg-white/75
                          p-2
                          shadow-[0_25px_70px_rgba(15,23,42,0.14)]
                          backdrop-blur-3xl
                        "
                      >
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((loc) => (
                            <li
                              key={loc}
                              onClick={() => {
                                setLocation(loc);
                                setShowDropdown(false);
                              }}
                              className="
                                flex cursor-pointer items-center gap-3
                                rounded-xl px-4 py-3
                                text-sm text-slate-700
                                transition-all
                                hover:bg-white/80
                              "
                            >
                              <MapPin
                                size={13}
                                className="text-slate-400"
                              />

                              {loc}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-4 text-center text-sm text-slate-400">
                            No matching locations found
                          </li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2.5 ml-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MessageSquare
                      size={14}
                      className="text-blue-500"
                    />
                    What's happening?
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Describe the issue in your own words..."
                    className="
                      min-h-[155px] w-full resize-none
                      rounded-2xl
                      border border-white/70
                      bg-white/45
                      px-4 py-3.5
                      text-sm font-medium text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      backdrop-blur-xl
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
                      transition-all duration-300
                      hover:bg-white/60
                      focus:border-blue-300/60
                      focus:bg-white/70
                      focus:shadow-[0_0_0_4px_rgba(0,122,255,0.07)]
                    "
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group flex h-14 w-full items-center justify-center gap-2
                    rounded-2xl
                    bg-[#007aff]
                    text-sm font-semibold text-white
                    shadow-[0_10px_30px_rgba(0,122,255,0.22)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#006ee6]
                    hover:shadow-[0_15px_40px_rgba(0,122,255,0.28)]
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                      >
                        <Clock size={17} />
                      </motion.div>

                      Analyzing your report...
                    </>
                  ) : (
                    <>
                      <Send
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />

                      Send report
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </motion.section>

        {/* Tickets */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7"
        >

          <div className="mb-5 flex items-end justify-between px-2">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Activity
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-slate-900">
                Your reports
              </h2>
            </div>

            {tickets.length > 0 && (
              <span className="rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-[11px] font-medium text-slate-500 backdrop-blur-xl">
                {tickets.length} submitted
              </span>
            )}
          </div>

          <div className="space-y-4">

            <AnimatePresence mode="popLayout">

              {tickets.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    rounded-[2rem]
                    border border-white/70
                    bg-white/35
                    p-10
                    text-center
                    backdrop-blur-2xl
                    shadow-[0_15px_50px_rgba(15,23,42,0.04)]
                  "
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/55 shadow-sm">
                    <CheckCircle
                      size={24}
                      className="text-slate-300"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-slate-700">
                    You're all clear
                  </h3>

                  <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-slate-400">
                    Reports you submit will appear here with
                    their status and priority.
                  </p>
                </motion.div>
              ) : (
                tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.$id || index}
                    layout
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    className="
                      group relative overflow-hidden
                      rounded-[2rem]
                      border border-white/75
                      bg-white/45
                      p-5
                      backdrop-blur-2xl
                      shadow-[0_12px_40px_rgba(15,23,42,0.045)]
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-white/60
                      hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)]
                    "
                  >

                    {/* Glass highlight */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90" />

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                            <MapPin
                              size={13}
                              className="text-blue-500"
                            />
                          </div>

                          <span className="truncate text-sm font-semibold text-slate-800">
                            {ticket.location}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                          {ticket.text || ticket.description}
                        </p>

                        <p className="mt-3 text-[10px] font-medium text-slate-400">
                          ID · {ticket.$id || `TCKT-${index + 1}`}
                        </p>

                      </div>

                      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">

                        <PriorityBadge
                          priority={
                            ticket.priority || 'medium'
                          }
                        />

                        <span className="rounded-full border border-white/70 bg-white/50 px-3 py-1 text-[10px] font-medium text-slate-500 backdrop-blur-xl">
                          {ticket.status || 'Pending'}
                        </span>

                      </div>

                    </div>

                  </motion.div>
                ))
              )}

            </AnimatePresence>

          </div>
        </motion.section>

      </div>
    </main>
  );
}