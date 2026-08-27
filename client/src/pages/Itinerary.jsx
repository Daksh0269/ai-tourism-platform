import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Wallet, Sparkles, Map, Tag, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchApi } from '../lib/api'; // Smart API helper

const CATEGORIES = [
  { id: 'culture', label: 'Culture & Heritage' },
  { id: 'nature', label: 'Nature & Parks' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'museum', label: 'Museums' }
];

export default function Itinerary() {
  const [location, setLocation] = useState('Raipur');
  const [budget, setBudget] = useState(1000);
  const [timeMinutes, setTimeMinutes] = useState(480);
  const [selectedCats, setSelectedCats] = useState(['culture', 'nature']);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');

  const toggleCategory = (catId) => {
    setSelectedCats(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setItinerary(null);
    setError('');
    
    try {
      const payload = {
        location,
        maxBudget: budget,
        availableTimeMinutes: timeMinutes,
        preferredCategories: selectedCats
      };

      // Calls your actual AI Engine on the backend
      const res = await fetchApi('/itineraries/generate', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res?.success && res.data) {
        // Flatten backend structure for easy UI mapping
        setItinerary({
          title: res.data.title,
          totalCost: res.data.version.totalCost,
          totalDuration: res.data.version.totalDuration,
          stops: res.data.version.stops
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to generate itinerary. Ensure you have seeded attractions first.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-apple-text tracking-tight flex items-center gap-3">
          <Map className="text-apple-blue" size={32} />
          AI Itinerary Builder
        </h1>
        <p className="text-apple-text-muted mt-2 text-lg">
          Configure your preferences and let our engine map the perfect route.
        </p>
      </header>

      <div className="bg-glass rounded-3xl shadow-apple border border-white/40 p-6 md:p-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-apple-text flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-apple-blue"/> Target Location
              </label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-black/[0.03] border border-transparent rounded-2xl px-4 py-3 text-apple-text focus:bg-white focus:outline-none focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue/30 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-apple-text flex items-center gap-2 mb-2">
                  <Wallet size={16} className="text-apple-blue"/> Max Budget (₹)
                </label>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full bg-black/[0.03] border border-transparent rounded-2xl px-4 py-3 text-apple-text focus:bg-white focus:outline-none focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue/30 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-apple-text flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-apple-blue"/> Time (Mins)
                </label>
                <input 
                  type="number" 
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(Number(e.target.value))}
                  className="w-full bg-black/[0.03] border border-transparent rounded-2xl px-4 py-3 text-apple-text focus:bg-white focus:outline-none focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-apple-text flex items-center gap-2 mb-3">
              <Tag size={16} className="text-apple-blue"/> Preferred Vibes
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCats.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                      isSelected 
                        ? "bg-apple-blue text-white border-apple-blue shadow-sm" 
                        : "bg-white text-apple-text-muted border-black/5 hover:border-apple-blue/30 hover:text-apple-text"
                    )}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 flex justify-end">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-apple-text hover:bg-black text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-apple disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Sparkles size={18} className="text-apple-blue" />
              </motion.div>
            ) : (
              <Sparkles size={18} className="text-apple-blue" />
            )}
            {isGenerating ? 'Mapping Route...' : 'Generate Itinerary'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {itinerary && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-bold text-apple-text">{itinerary.title}</h2>
                <div className="flex gap-4 mt-2 text-sm text-apple-text-muted font-medium">
                  <span className="flex items-center gap-1"><Wallet size={14}/> ₹{itinerary.totalCost} Total</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {itinerary.totalDuration} Mins</span>
                </div>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 md:pl-0">
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-black/10 -translate-x-1/2"></div>
              
              <div className="space-y-8">
                {itinerary.stops.map((stop, index) => (
                  <motion.div 
                    key={stop.attractionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative md:w-[50%] flex",
                      index % 2 === 0 ? "md:pr-12 md:justify-end" : "md:pl-12 md:ml-auto"
                    )}
                  >
                    {/* Timeline Node */}
                    <div className={cn(
                      "absolute top-6 w-4 h-4 rounded-full bg-apple-blue border-4 border-apple-bg shadow-sm z-10",
                      index % 2 === 0 ? "left-[-29px] md:left-auto md:-right-2" : "left-[-29px] md:-left-2"
                    )}/>

                    {/* Attraction Card */}
                    <div className="bg-glass p-6 rounded-3xl shadow-apple border border-white/40 w-full group hover:shadow-apple-floating transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold tracking-wider text-apple-blue uppercase">
                          Stop {stop.stopOrder}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-apple-text mb-2 group-hover:text-apple-blue transition-colors">
                        {stop.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-apple-text-muted mb-4">
                        <span className="flex items-center gap-1 bg-black/5 px-2.5 py-1 rounded-md"><Clock size={14}/> {stop.visitDurationMinutes}m</span>
                        <span className="flex items-center gap-1 bg-black/5 px-2.5 py-1 rounded-md"><Wallet size={14}/> ₹{stop.entryFee}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}