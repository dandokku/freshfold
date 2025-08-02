import React, { useState, useEffect, useRef } from 'react'
import { MdOutlineCheck, MdOutlineCrueltyFree, MdOutlineMoney, MdStar, MdVerified } from 'react-icons/md'

function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
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

  const advantages = [
    {
      icon: MdOutlineCrueltyFree,
      title: "Personalized Experience",
      description: "We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement.",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      glowColor: "purple-500/30"
    },
    {
      icon: MdOutlineCheck,
      title: "Premium Quality",
      description: "We use the best in class products to ensure that your favorite clothes are always ready to wear.",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      glowColor: "green-500/30",
      featured: true
    },
    {
      icon: MdOutlineMoney,
      title: "Affordable Pricing",
      description: "We offer pricing options that suit your pocket, providing flexibility and affordability.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      glowColor: "blue-500/30"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50/30'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-green-500/10 to-green-500/20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              animation: `float ${5 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <MdVerified className="text-green-600 w-4 h-4" />
            <span className='font-semibold text-green-600 text-sm lg:text-base'>
              Our Advantages
            </span>
          </div>

          <h1 className='font-black text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6'>
            Why <span className="text-green-600 relative inline-block">
              Choose Us
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
            </span>
          </h1>
          
          <p className='text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto'>
            We stand out from the competition with our <span className="text-green-600 font-semibold">exceptional service quality</span>, 
            personalized approach, and unmatched value for your investment
          </p>
        </div>

        {/* Advantages Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{transitionDelay: `${300 + index * 200}ms`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {advantage.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    <div className="flex items-center space-x-1">
                      <MdStar className="w-3 h-3" />
                      <span>Most Valued</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-[1.02] overflow-hidden ${
                advantage.featured ? 'ring-2 ring-green-500/30 shadow-green-500/10' : ''
              }`}>
                
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Icon Container */}
                  <div className="relative mx-auto w-fit">
                    {/* Glow Background */}
                    <div className={`absolute inset-0 w-28 h-28 bg-gradient-to-r ${advantage.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform scale-110`}></div>
                    
                    {/* Icon Background */}
                    <div className={`relative w-28 h-28 bg-gradient-to-r ${advantage.gradient} rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                      <advantage.icon className='text-5xl text-white' />
                    </div>

                    {/* Floating Accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg transform group-hover:scale-125 group-hover:rotate-45 transition-all duration-500">
                      <div className={`w-full h-full bg-gradient-to-r ${advantage.gradient} rounded-full opacity-80`}></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className='text-2xl lg:text-3xl font-black text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                    {advantage.title}
                  </h2>

                  {/* Description */}
                  <p className='text-gray-600 text-base lg:text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                    {advantage.description}
                  </p>

                  {/* Feature Points */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm lg:text-base">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${advantage.gradient}`}></div>
                      <span>Professional service</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm lg:text-base">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${advantage.gradient}`}></div>
                      <span>Guaranteed satisfaction</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className={`w-full h-full bg-gradient-to-r ${advantage.gradient} rounded-full transform rotate-45`}></div>
                </div>
                <div className="absolute bottom-4 left-4 w-6 h-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className={`w-full h-full bg-gradient-to-r ${advantage.gradient} rounded-full`}></div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${advantage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                     style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-green-600 mb-2">2000+</div>
                <div className="text-gray-600 font-medium">Satisfied Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-purple-600 mb-2">99%</div>
                <div className="text-gray-600 font-medium">Customer Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(120deg);
          }
          66% {
            transform: translateY(4px) rotate(240deg);
          }
        }
      `}</style>
    </section>
  )
}

export default WhyChooseUs