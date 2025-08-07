import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { FiDollarSign, FiStar, FiTrendingUp, FiAward } from "react-icons/fi";
import { MdVerified, MdLocalOffer } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TABS = [
  { 
    id: 1, 
    label: "Iron & Fold", 
    key: "Iron and Fold",
    icon: FiStar,
    gradient: "from-emerald-400 to-teal-400",
    bgGradient: "from-emerald-500/10 to-teal-500/10"
  },
  { 
    id: 2, 
    label: "Dry Cleaning", 
    key: "Dry Cleaning",
    icon: FiAward,
    gradient: "from-teal-400 to-cyan-400",
    bgGradient: "from-teal-500/10 to-cyan-500/10"
  },
  { 
    id: 3, 
    label: "Stain Removal", 
    key: "Stain Removal",
    icon: FiTrendingUp,
    gradient: "from-cyan-400 to-blue-400",
    bgGradient: "from-cyan-500/10 to-blue-500/10"
  },
];

export default function PriceList() {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const { data, isLoading, isError } = useQuery("prices", () =>
    axios.get("https://freshfoldserver.onrender.com/api/prices")
  );

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

  const categorizedPrices = useMemo(() => {
    const categories = {
      "Iron and Fold": [],
      "Dry Cleaning": [],
      "Stain Removal": [],
    };

    data?.data.forEach((price) => {
      if (categories[price.group]) {
        categories[price.group].push(price);
      }
    });

    return categories;
  }, [data]);

  const activeTabData = TABS.find(tab => tab.id === activeTab);

  // Enhanced Loading State
  if (isLoading) {
    return (
      <section 
        ref={sectionRef}
        className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/30"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton height={60} width={400} className="mx-auto mb-4" />
            <Skeleton height={20} width={300} className="mx-auto" />
          </div>
          
          {/* Tabs Skeleton */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {TABS.map((tab) => (
              <Skeleton key={tab.id} height={60} width={180} className="rounded-2xl" />
            ))}
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height={120} className="rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Enhanced Error State
  if (isError) {
    return (
      <section 
        ref={sectionRef}
        className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/30"
      >
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-red-600 text-sm lg:text-base">Service Error</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 leading-tight mb-4">
              Our Services & <span className="text-teal-600">Pricing</span>
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              Transparent pricing for all our services
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-red-50/80 backdrop-blur-md border border-red-200/50 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Prices</h3>
            <p className="text-red-600 mb-4">Please try again later or contact support</p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300">
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/30"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Floating Orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-teal-400/5 to-emerald-400/10"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i % 4) * 20}%`,
              width: `${8 + (i % 3) * 6}px`,
              height: `${8 + (i % 3) * 6}px`,
              animation: `float ${6 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Enhanced Header */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 mb-6">
            <MdLocalOffer className="text-teal-600 w-4 h-4" />
            <span className="font-semibold text-teal-600 text-sm lg:text-base">
              Transparent Pricing
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 leading-tight mb-6">
            Our Services & 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 relative mx-2">
              Pricing
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            Professional laundry services with <span className="text-teal-600 font-semibold">competitive rates</span> and 
            <span className="text-emerald-600 font-semibold"> premium quality</span>
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className={`flex justify-center gap-4 mb-12 flex-wrap transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 ${
                  isActive 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl shadow-teal-500/25` 
                    : 'bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:bg-white hover:border-teal-200/50'
                } rounded-2xl px-6 py-4 font-bold text-base lg:text-lg`}
                style={{
                  transitionDelay: `${400 + index * 100}ms`
                }}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-100 group-hover:bg-teal-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-gray-600 group-hover:text-teal-600'
                    }`} />
                  </div>
                  <span>{tab.label}</span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/50 rounded-full"></div>
                )}

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            );
          })}
        </div>

        {/* Enhanced Price Grid */}
        <div className="relative min-h-[400px]">
          {TABS.map((tab, tabIndex) => (
            <div
              key={tab.id}
              className={`${
                activeTab === tab.id ? 'block' : 'hidden'
              } grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500`}
              style={{
                animation: activeTab === tab.id ? 'fadeInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              {categorizedPrices[tab.key]?.length > 0 ? (
                categorizedPrices[tab.key].map((price, idx) => (
                  <div
                    key={price.id || idx}
                    className={`group relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${600 + idx * 100}ms`
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Background Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeTabData?.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          {/* Service Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${activeTabData?.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <MdVerified className="text-white w-6 h-6" />
                          </div>
                          
                          <div className="">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-2">
                              {price.name}
                            </h3>
                            
                            {/* Service Features */}
                         
                          </div>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="text-right">
                        <div className={`flex items-center justify-end text-2xl lg:text-3xl font-black bg-gradient-to-r ${activeTabData?.gradient} bg-clip-text text-transparent mb-2`}>
                          <FiDollarSign className="w-6 h-6 lg:w-7 lg:h-7 text-teal-600 mr-1" />
                          <span>{price.price.toFixed(2)}</span>
                        </div>
                        <p className="text-gray-500 text-sm">per item</p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className={`w-full h-full bg-gradient-to-r ${activeTabData?.gradient} rounded-full transform rotate-45`}></div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Hover Border Effect */}
                    {hoveredCard === idx && (
                      <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${activeTabData?.gradient} opacity-100 transition-opacity duration-500`} 
                           style={{
                             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                             maskComposite: 'xor',
                             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                             WebkitMaskComposite: 'xor'
                           }}>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="max-w-md mx-auto bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Prices Available</h3>
                    <p className="text-gray-600">Prices for this category will be available soon</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
     
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(90deg);
          }
          50% {
            transform: translateY(-2px) rotate(180deg);
          }
          75% {
            transform: translateY(-6px) rotate(270deg);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}