import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineDirtyLens, MdOutlineDryCleaning, MdOutlineIron, MdOutlineLocalLaundryService, MdTrendingUp } from 'react-icons/md';
import CountUp from 'react-countup';

function CountStuffs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Enhanced Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statsData = [
    { 
      icon: MdOutlineLocalLaundryService, 
      count: 4000, 
      label: "Clothes Washed",
      gradient: "from-teal-400 to-cyan-400",
      bgGradient: "from-teal-500/10 to-cyan-500/10",
      description: "Premium washing service"
    },
    { 
      icon: MdOutlineDryCleaning, 
      count: 9200, 
      label: "Shirts Washed and Folded",
      gradient: "from-emerald-400 to-teal-400",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      description: "Professional care & folding"
    },
    { 
      icon: MdOutlineIron, 
      count: 7920, 
      label: "Shirts Ironed",
      gradient: "from-cyan-400 to-blue-400",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      description: "Crisp ironing perfection"
    },
    { 
      icon: MdOutlineDirtyLens, 
      count: 6000, 
      label: "Stains Removed",
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      description: "Expert stain elimination"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className='relative min-h-[80vh] w-full overflow-hidden'
    >
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1624372635310-01d078c05dd9?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0" 
          alt="Premium Laundry Background" 
          className='h-full w-full object-cover scale-110 transition-transform duration-[20s] ease-out hover:scale-105' 
        />
        {/* Enhanced Multi-layer Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-black/90'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-cyan-900/20'></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Floating Orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-teal-400/10 to-cyan-400/20 backdrop-blur-sm"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i % 4) * 20}%`,
              width: `${15 + (i % 4) * 10}px`,
              height: `${15 + (i % 4) * 10}px`,
              animation: `float ${8 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-6 lg:px-8 py-20 lg:py-32'>
        
        {/* Enhanced Header Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 shadow-xl">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <MdTrendingUp className="text-teal-300 w-5 h-5" />
            <span className='font-semibold text-white text-base lg:text-lg'>
              Our Achievements
            </span>
          </div>

          <h2 className='font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6'>
            Numbers That 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 relative">
              {" "}Speak
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Excellence
            </span>
          </h2>
          
          <p className='text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto'>
            Every number tells a story of <span className="text-teal-300 font-semibold">dedication</span>, 
            <span className="text-cyan-300 font-semibold"> quality</span>, and 
            <span className="text-blue-300 font-semibold"> customer satisfaction</span>
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{transitionDelay: `${400 + index * 200}ms`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Main Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-105 overflow-hidden">
                
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  
                  {/* Enhanced Icon Container */}
                  <div className="relative">
                    <div className={`w-24 h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                      <stat.icon className='text-4xl lg:text-5xl text-white' />
                    </div>
                    {/* Icon Glow Effect */}
                    <div className={`absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  {/* Enhanced Counter */}
                  <div className="space-y-3">
                    <div className="relative">
                      <CountUp 
                        start={0} 
                        end={isVisible ? stat.count : 0} 
                        duration={2.5} 
                        delay={index * 0.3}
                        separator="," 
                        className='text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-lg' 
                      />
                      <div className="text-lg lg:text-xl text-teal-300 font-bold">+</div>
                    </div>
                    
                    {/* Service Badge */}
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${stat.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Premium Service</span>
                    </div>
                  </div>

                  {/* Enhanced Label */}
                  <div className="space-y-2">
                    <h4 className='text-white font-bold text-lg lg:text-xl leading-tight'>
                      {stat.label}
                    </h4>
                    <p className='text-gray-300 text-sm lg:text-base'>
                      {stat.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-2000 ease-out`}
                      style={{
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${800 + index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Floating Accent Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{transitionDelay: '100ms'}}></div>

                {/* Enhanced Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                     style={{
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       maskComposite: 'xor',
                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       WebkitMaskComposite: 'xor'
                     }}>
                </div>
              </div>

              {/* Floating Achievement Badge */}
              {hoveredCard === index && (
                <div className="absolute -top-3 -right-3 z-20 animate-bounce">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-xl">
                    🏆
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Join Our Success Story
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Experience the quality that thousands of customers trust every day
            </p>
            <button className='group inline-flex items-center space-x-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-teal-400/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden relative'>
              <span className="relative z-10">Get Started Today</span>
              <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
          }
        }
      `}</style>
    </section>
  );
}

export default CountStuffs;