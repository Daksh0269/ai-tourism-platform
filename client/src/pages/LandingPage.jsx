function LandingPage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border-b border-white/20 dark:border-outline-variant/10 shadow-sm z-50">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed">AeroMind</div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300" href="#">Product</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300" href="#">Destinations</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300" href="#">Pricing</a>
          </div>
          <button className="font-body-md text-body-md text-primary dark:text-primary-fixed font-semibold hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300 active:scale-95 duration-200">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="flex flex-col gap-6 z-10">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
              Travel smarter.<br />
              <span className="text-gradient">Experience more.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Your AI-powered travel companion that plans, adapts, and guides your entire journey with precision and ease.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="btn-gradient text-on-primary font-body-md text-body-md font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-shadow active:scale-95 duration-200">
                Plan My Trip
              </button>
              <button className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md font-semibold px-8 py-4 rounded-full hover:bg-surface-variant transition-colors active:scale-95 duration-200">
                Explore How It Works
              </button>
            </div>
          </div>

          {/* Hero Visual (Complex Dashboard Preview) */}
          <div className="relative w-full h-[600px] perspective-1000 z-10 mt-12 lg:mt-0">
            {/* Main Map Backdrop */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/50"
              style={{ transform: 'rotateY(-5deg) rotateX(2deg) translateZ(0)', transformStyle: 'preserve-3d' }}
            >
              <img
                className="w-full h-full object-cover"
                alt="A highly detailed, modern, light-mode interface map showing a stylized view of central Tokyo with soft blue and teal overlays indicating travel routes and points of interest. The map has a clean, high-tech aesthetic, resembling a premium travel app."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTdC9OSFrk41qR4pHUaQHy-ThL-yyEXNir6QBd4mJgyObMjbaCwb_Y66D4WbXLCSFABjPPPf2BC-8Kyzvq4BM24uexwBzTZCSrTD1Ve_xUBJEqKCuMCsGktFKSupPrlUKyDONHCUn2KsTGG-WETq6h1CKhqyUPnu2Yh06qoBoBnABcvsdQCbD7b2ijs4wn8Jy6e5jAxEC7Zx4O4CRnXmARX8waBEJvxJncTLtfj7malvebz7brtdiC"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
            </div>

            {/* Itinerary Panel */}
            <div className="glass-panel absolute top-8 left-8 w-64 p-4 rounded-xl shadow-lg transform-gpu hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
                <h3 className="font-headline-md text-label-sm font-bold text-on-surface">Tokyo Trip</h3>
              </div>
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-[11px] top-6 bottom-4 w-px bg-tertiary-container/30" />
                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center border-2 border-white flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-on-tertiary" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface font-bold">Day 1: Shibuya</p>
                    <p className="font-body-md text-[10px] text-on-surface-variant">Arrive, check-in, scramble crossing.</p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10 opacity-70">
                  <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center border-2 border-outline-variant flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-outline-variant" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface font-bold">Day 2: Asakusa</p>
                    <p className="font-body-md text-[10px] text-on-surface-variant">Senso-ji Temple, Skytree.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crowd Intelligence Widget */}
            <div className="glass-panel absolute top-12 right-8 w-48 p-4 rounded-xl shadow-lg transform-gpu hover:translate-y-[-5px] transition-transform duration-300">
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">Crowd Intel</p>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body-md text-sm font-semibold text-on-surface">Senso-ji Temple</span>
                <span className="material-symbols-outlined text-error text-sm">groups</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-1.5 mb-1">
                <div className="bg-error h-1.5 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="font-body-md text-[10px] text-error">High Occupancy</p>
            </div>

            {/* Cost Estimator */}
            <div className="glass-panel absolute bottom-24 right-12 w-56 p-4 rounded-xl shadow-lg transform-gpu hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex justify-between items-end mb-2">
                <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Est. Cost</p>
                <span className="font-headline-md text-lg font-bold text-primary">$2,450</span>
              </div>
              <div className="flex gap-1">
                <div className="h-1 bg-primary rounded-l-full" style={{ width: '40%' }} />
                <div className="h-1 bg-secondary" style={{ width: '35%' }} />
                <div className="h-1 bg-tertiary rounded-r-full" style={{ width: '25%' }} />
              </div>
              <div className="flex justify-between mt-2 font-body-md text-[9px] text-on-surface-variant">
                <span>Flights</span>
                <span>Hotels</span>
                <span>Food/Activities</span>
              </div>
            </div>

            {/* AI Assistant Bubble */}
            <div className="absolute bottom-8 left-12 flex gap-3 items-end transform-gpu hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div className="glass-panel p-3 rounded-2xl rounded-bl-none shadow-md max-w-[200px]">
                <p className="font-body-md text-xs text-on-surface">I noticed rain is forecasted tomorrow. Should I swap your outdoor plans for museum visits?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AeroMind Section (Bento Grid) */}
      <section className="py-20 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">Why AeroMind?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Intelligent tools designed to make every step of your journey seamless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1 */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col justify-between md:col-span-2 group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">AI Itinerary</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Fully personalized schedules built around your pace, interests, and energy levels.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-2xl">route</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Smart Routes</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Optimized multi-city travel logic.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-error-container/50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-error text-2xl">groups</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Crowd Intelligence</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Live updates on tourist traffic.</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-tertiary text-2xl">insights</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Traveler Insights</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Analysis of recent reviews.</p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex flex-col justify-between md:col-span-1 group hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">AI Travel Assistant</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Your 24/7 on-trip companion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-dim w-full rounded-t-xl border-t border-outline-variant/20">
        <div className="py-stack-lg px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-stack-md max-w-container-max mx-auto">
          <div className="flex flex-col gap-4">
            <div className="font-display-lg text-headline-md text-primary dark:text-primary-fixed">AeroMind</div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant">© 2024 AeroMind AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center md:justify-end">
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Terms of Service</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Cookie Policy</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Support</a>
            <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
