import React, { useState, useEffect, useRef } from 'react'
import { MdOutlineDirtyLens, MdOutlineDryCleaning, MdOutlineWash, MdStar, MdLocalOffer } from "react-icons/md"
import { Link } from 'react-router-dom';

function OurPricesMini() {
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

  const priceCards = [
    {
      icon: MdOutlineDryCleaning,
      price: "$2",
      item: "per shirt",
      service: "Iron and Folding",
      description: "Professional pressing and neat folding",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: MdOutlineWash,
      price: "$4",
      item: "per jeans",
      service: "Dry Cleaning",
      description: "Premium fabric care and cleaning",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      featured: true
    },
    {
      icon: MdOutlineDirtyLens,
      price: "$1",
      item: "per stain",
      service: "Stain Removal",
      description: "Expert stain treatment and removal",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ];

  const CheckIcon = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-green-500/10 to-green-500/20"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i % 3) * 20}%`,
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              animation: `float ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <MdLocalOffer className="text-green-600 w-4 h-4" />
            <span className='font-semibold text-green-600 text-sm lg:text-base'>
              Transparent Pricing
            </span>
          </div>

          <h1 className='font-black text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4'>
            Our <span className="text-green-600 relative inline-block">
              Prices
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
            </span>
          </h1>
          <p className='text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto'>
            Our prices are <span className="text-green-600 font-semibold">affordable and flexible</span>, 
            designed to give you premium service without breaking the bank
          </p>
        </div>

        {/* Price Cards Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {priceCards.map((card, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{transitionDelay: `${400 + index * 200}ms`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {card.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    <div className="flex items-center space-x-1">
                      <MdStar className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-[1.02] overflow-hidden ${
                card.featured ? 'ring-2 ring-green-500/30 shadow-green-500/10' : ''
              }`}>
                
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <card.icon className='text-4xl text-white' />
                    </div>
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className='text-4xl md:text-5xl font-black text-gray-800'>{card.price}</span>
                      <span className='text-lg md:text-xl text-gray-600 font-medium'>{card.item}</span>
                    </div>
                    <div className={`inline-flex items-center space-x-1 bg-gradient-to-r ${card.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      <CheckIcon />
                      <span>{card.service}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                    {card.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                      <CheckIcon />
                      <span>Quick turnaround</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                      <CheckIcon />
                      <span>Quality guaranteed</span>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                     style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Need a custom quote for bulk orders?
              </h3>
              <p className="text-gray-600 text-lg">
                Get personalized pricing for your specific needs and save more on larger orders
              </p>
              
              <button className='group inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden relative'>
                <span className="relative z-10"><Link to='/prices'>See All Prices</Link></span>
                <ArrowIcon />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
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
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  )
}

export default OurPricesMini