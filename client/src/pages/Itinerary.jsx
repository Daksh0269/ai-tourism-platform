
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Wallet,
  Sparkles,
  Users,
  ChevronDown,
  ArrowUpRight,
  Navigation,
  Check,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchApi } from '../lib/api';

const CATEGORIES = [
  { id: 'culture', label: 'Culture' },
  { id: 'nature', label: 'Nature' },
  { id: 'entertainment', label: 'Fun' },
  { id: 'museum', label: 'Museums' },
];

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

export default function Itinerary() {
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const [budget, setBudget] = useState(1000);
  const [timeMinutes, setTimeMinutes] = useState(480);

  const [selectedCats, setSelectedCats] = useState([
    'culture',
    'nature',
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');

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

  const toggleCategory = (catId) => {
    setSelectedCats((prev) =>
      prev.includes(catId)
        ? prev.filter((c) => c !== catId)
        : [...prev, catId]
    );
  };

  const filteredLocations = AVAILABLE_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleGenerate = async () => {
    if (!location) {
      setError('Choose a destination to continue.');
      return;
    }

    setIsGenerating(true);
    setItinerary(null);
    setError('');

    try {
      const payload = {
        location,
        maxBudget: budget,
        availableTimeMinutes: timeMinutes,
        preferredCategories: selectedCats,
      };

      const res = await fetchApi('/itineraries/generate', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res?.success && res.data) {
        setItinerary({
          title: res.data.title,
          totalCost: res.data.version.totalCost,
          totalDuration: res.data.version.totalDuration,
          stops: res.data.version.stops,
        });
      }
    } catch (err) {
      setError(
        err.message ||
          'Unable to create your itinerary. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6">

      {/* Ambient Liquid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-[-120px] top-[8%] h-[420px] w-[420px] rounded-full bg-white/90 blur-[120px]" />

        <div className="absolute right-[-100px] top-[15%] h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-[140px]" />

        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-[140px]" />

      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl pt-8 text-center sm:pt-14"
      >

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-xl">
          <Sparkles
            size={13}
            className="text-blue-500"
          />
          Intelligent travel planning
        </div>

        <h1 className="text-[3.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl">
          Plan your day.
          <br />

          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Your way.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
          Tell us where you're going, how much time you have,
          and what you love.
        </p>

      </motion.header>

      {/* Planner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-12 max-w-3xl"
      >

        <div className="liquid-window relative overflow-visible rounded-[2.5rem] p-3 sm:rounded-[3rem] sm:p-4">

          <div className="rounded-[2rem] border border-white/60 bg-white/30 p-5 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8">

            {/* Destination */}
            <div
              ref={dropdownRef}
              className="relative"
            >

              <label className="mb-3 flex items-center gap-2 px-1 text-xs font-medium text-slate-500">
                <MapPin size={14} className="text-blue-500" />
                Where are you going?
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
                  placeholder="Search a city or destination"
                  className="h-14 w-full rounded-2xl border border-white/80 bg-white/55 px-5 pr-12 text-sm font-medium text-slate-800 outline-none backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-blue-300/60 focus:bg-white/75 focus:shadow-[0_0_0_5px_rgba(0,122,255,0.06)]"
                />

                <Navigation
                  size={17}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

              <AnimatePresence>
                {showDropdown && location && (
                  <motion.div
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
                    className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/80 bg-white/75 p-2 shadow-[0_25px_70px_rgba(15,23,42,0.14)] backdrop-blur-3xl"
                  >
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setLocation(loc);
                            setShowDropdown(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-700 transition-all hover:bg-white/80"
                        >
                          <MapPin
                            size={14}
                            className="text-slate-400"
                          />

                          {loc}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-center text-sm text-slate-400">
                        No destinations found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Preferences */}
            <div className="mt-8">

              <div className="mb-3 flex items-center gap-2 px-1">
                <Sparkles
                  size={14}
                  className="text-blue-500"
                />

                <span className="text-xs font-medium text-slate-500">
                  What sounds good?
                </span>
              </div>

              <div className="flex flex-wrap gap-2">

                {CATEGORIES.map((cat) => {
                  const isSelected =
                    selectedCats.includes(cat.id);

                  return (
                    <button
                      key={cat.id}
                      onClick={() =>
                        toggleCategory(cat.id)
                      }
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                        isSelected
                          ? 'border-blue-500 bg-blue-500 text-white shadow-[0_5px_20px_rgba(0,122,255,0.18)]'
                          : 'border-white/80 bg-white/45 text-slate-500 hover:bg-white/75'
                      )}
                    >
                      {isSelected && (
                        <Check size={13} />
                      )}

                      {cat.label}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Budget + Time */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Budget */}
              <div className="rounded-2xl border border-white/70 bg-white/40 p-4 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Wallet size={14} />
                    Budget
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    ₹{budget.toLocaleString()}
                  </span>

                </div>

                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={budget}
                  onChange={(e) =>
                    setBudget(Number(e.target.value))
                  }
                  className="mt-5 w-full accent-[#007aff]"
                />

                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>₹100</span>
                  <span>₹10,000</span>
                </div>

              </div>

              {/* Time */}
              <div className="rounded-2xl border border-white/70 bg-white/40 p-4 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    Available time
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    {Math.floor(timeMinutes / 60)}h{' '}
                    {timeMinutes % 60 > 0
                      ? `${timeMinutes % 60}m`
                      : ''}
                  </span>

                </div>

                <input
                  type="range"
                  min="60"
                  max="720"
                  step="30"
                  value={timeMinutes}
                  onChange={(e) =>
                    setTimeMinutes(Number(e.target.value))
                  }
                  className="mt-5 w-full accent-[#007aff]"
                />

                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>1 hour</span>
                  <span>12 hours</span>
                </div>

              </div>

            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3 text-sm text-red-600">
                    <AlertCircle size={15} />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="mt-7">

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#007aff] text-sm font-semibold text-white shadow-[0_10px_35px_rgba(0,122,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006ee6] hover:shadow-[0_15px_40px_rgba(0,122,255,0.3)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                    >
                      <Sparkles size={17} />
                    </motion.div>

                    Finding your route...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />

                    Create my itinerary

                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}

              </button>

            </div>

          </div>
        </div>
      </motion.section>

      {/* Results */}
      <AnimatePresence mode="wait">
        {itinerary && !isGenerating && (
          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto mt-16 max-w-3xl pb-16"
          >

            {/* Result Header */}
            <div className="mb-7 text-center">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-[11px] font-medium text-slate-500 backdrop-blur-xl">
                <Sparkles
                  size={12}
                  className="text-blue-500"
                />
                Your day, mapped
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                {itinerary.title}
              </h2>

              <div className="mt-3 flex justify-center gap-5 text-xs text-slate-400">

                <span className="flex items-center gap-1.5">
                  <Wallet size={13} />
                  ₹{itinerary.totalCost}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {itinerary.totalDuration} min
                </span>

                <span className="flex items-center gap-1.5">
                  <Users size={13} />
                  {itinerary.stops.length} stops
                </span>

              </div>
            </div>

            {/* Timeline */}
            <div className="relative">

              <div className="absolute left-[18px] top-6 bottom-6 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent" />

              <div className="space-y-4">

                {itinerary.stops.map((stop, index) => (
                  <motion.div
                    key={stop.attractionId}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="relative pl-12"
                  >

                    {/* Timeline Node */}
                    <div className="absolute left-[11px] top-7 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-[3px] border-white bg-blue-500 shadow-[0_0_0_5px_rgba(0,122,255,0.08)]" />

                    {/* Stop */}
                    <div className="group rounded-[1.8rem] border border-white/75 bg-white/45 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.045)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-500">
                            {index === 0
                              ? 'Start'
                              : `Next`}
                          </p>

                          <h3 className="text-lg font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-blue-600">
                            {stop.name}
                          </h3>

                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/65 text-slate-400 shadow-sm">
                          <ArrowUpRight size={15} />
                        </div>

                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">

                        <span className="flex items-center gap-1.5 rounded-full bg-white/65 px-3 py-1.5 text-[11px] font-medium text-slate-500">
                          <Clock size={12} />
                          {stop.visitDurationMinutes} min
                        </span>

                        <span className="flex items-center gap-1.5 rounded-full bg-white/65 px-3 py-1.5 text-[11px] font-medium text-slate-500">
                          <Wallet size={12} />
                          ₹{stop.entryFee}
                        </span>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </motion.section>
        )}
      </AnimatePresence>

    </main>
  );
}

