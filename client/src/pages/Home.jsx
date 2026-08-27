
import { useState, useRef } from 'react';
import {
  Map,
  ArrowUpRight,
  Navigation,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeTab, setActiveTab] = useState('route');

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [4, -4]),
    { stiffness: 180, damping: 25 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-4, 4]),
    { stiffness: 180, damping: 25 }
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6">

      {/* Ambient Liquid Light */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-[8%] h-[420px] w-[420px] rounded-full bg-white/80 blur-[120px]" />

        <div className="absolute right-[5%] top-[18%] h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-[140px]" />

        <div className="absolute bottom-[-150px] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-[130px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center pt-12 text-center sm:pt-20">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7"
        >
          <div className="liquid-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
            Smarter journeys. Beautifully simple.
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-[3.4rem] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Explore more.
          <br />

          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Worry less.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 max-w-lg text-base leading-relaxed tracking-[-0.01em] text-slate-500 sm:text-lg"
        >
          Intelligent travel planning that adapts to your time,
          your route, and the world around you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link to="/itinerary">
            <button className="group flex items-center gap-2 rounded-full bg-[#007aff] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,122,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#006ee6] hover:shadow-[0_12px_35px_rgba(0,122,255,0.32)] active:scale-95">
              Start exploring

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </Link>

          <Link to="/grievances">
            <button className="liquid-pill rounded-full px-6 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-white/80 hover:shadow-lg active:scale-95">
              Civic services
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Main Glass Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="mx-auto mt-16 w-full max-w-5xl sm:mt-20"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="liquid-window relative overflow-hidden rounded-[2.5rem] p-3 sm:rounded-[3rem] sm:p-4"
        >

          {/* Glass Reflection */}
          <div className="pointer-events-none absolute left-[8%] top-0 h-px w-[84%] bg-white/90 blur-[1px]" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/30 p-5 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-7">

            {/* Top Bar */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-blue-500 shadow-sm">
                  <Map size={19} strokeWidth={2} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Your journey
                  </p>

                  <p className="text-xs text-slate-400">
                    Raipur
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/40 p-1 sm:flex">

                <button
                  onClick={() => setActiveTab('route')}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeTab === 'route'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Route
                </button>

                <button
                  onClick={() => setActiveTab('crowd')}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeTab === 'crowd'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Crowd
                </button>

              </div>

            </div>

            {/* Route Visualization */}
            <div className="relative mt-6 h-[270px] overflow-hidden rounded-[1.8rem] border border-white/60 bg-gradient-to-br from-slate-100/70 via-white/50 to-sky-100/50 sm:h-[330px]">

              {/* Decorative map lines */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-[8%] top-[20%] h-px w-[80%] rotate-[8deg] bg-slate-400" />
                <div className="absolute left-[15%] top-[65%] h-px w-[75%] -rotate-[12deg] bg-slate-400" />
                <div className="absolute left-[35%] top-[-10%] h-[130%] w-px rotate-[20deg] bg-slate-300" />
                <div className="absolute right-[25%] top-[-10%] h-[130%] w-px -rotate-[28deg] bg-slate-300" />
              </div>

              {/* Route */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 330"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M80 260 C170 240 180 110 300 145 C410 180 425 65 535 90 C620 110 650 200 725 65"
                  stroke="rgba(0,122,255,0.75)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 10"
                />
              </svg>

              {/* Location points */}
              <div className="absolute left-[9%] top-[72%] h-4 w-4 rounded-full border-[3px] border-white bg-blue-500 shadow-[0_0_0_6px_rgba(0,122,255,0.12)]" />

              <div className="absolute left-[37%] top-[39%] h-4 w-4 rounded-full border-[3px] border-white bg-blue-500 shadow-[0_0_0_6px_rgba(0,122,255,0.12)]" />

              <div className="absolute right-[9%] top-[17%] h-5 w-5 rounded-full border-[3px] border-white bg-slate-900 shadow-lg" />

              {/* Floating Glass Card */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/80 bg-white/65 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                    <Navigation size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Recommended route
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Optimized for your day
                    </p>
                  </div>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3">

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock size={12} />
                    4h 15m
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                    Optimal
                  </span>

                </div>
              </motion.div>

              {/* Top Right Floating Control */}
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-slate-600 shadow-sm backdrop-blur-xl">
                <Navigation size={15} />
              </div>

            </div>

            {/* Bottom Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={13} />
                  Time
                </div>

                <p className="mt-2 text-lg font-semibold tracking-tight text-slate-800">
                  4h 15m
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Users size={13} />
                  Crowd
                </div>

                <p className="mt-2 text-lg font-semibold tracking-tight text-slate-800">
                  Low
                </p>
              </div>

              <div className="hidden rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-xl sm:block">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles size={13} />
                  Planning
                </div>

                <p className="mt-2 text-lg font-semibold tracking-tight text-slate-800">
                  Adaptive
                </p>
              </div>

            </div>

            {/* Recommendation */}
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/70 bg-white/35 px-4 py-3 backdrop-blur-xl">

              <div className="flex min-w-0 items-center gap-2">
                <Sparkles
                  size={14}
                  className="shrink-0 text-blue-500"
                />

                <span className="truncate text-xs font-medium text-slate-600">
                  A quieter route is available.
                </span>
              </div>

              <Link
                to="/itinerary"
                className="ml-3 shrink-0 text-xs font-semibold text-blue-500 transition-colors hover:text-blue-600"
              >
                View
              </Link>

            </div>

          </div>
        </motion.div>
      </motion.section>

      {/* Minimal Footer Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-12 pb-8 text-center"
      >
        <p className="text-xs tracking-wide text-slate-400">
          Designed for effortless exploration.
        </p>
      </motion.div>

    </main>
  );
}

