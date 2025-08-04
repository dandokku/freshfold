import React, { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiStar, FiShield, FiClock, FiAward } from "react-icons/fi";
import { MdVerified, MdLocalLaundryService, MdTrendingUp } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OfferedServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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

  // Mock API call - replace with your actual API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - replace with your actual API call
        const mockData = {
          data: [
            {
              _id: "1",
              serviceName: "Premium Wash & Fold",
              description: "Professional washing, drying, and folding service with premium detergents and fabric care. Your clothes handled with utmost care.",
              imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
              icon: MdLocalLaundryService,
              gradient: "from-emerald-400 to-teal-400",
              bgGradient: "from-emerald-500/10 to-teal-500/10",
              features: ["Eco-Friendly", "Same Day", "Premium Care"]
            },
            {
              _id: "2", 
              serviceName: "Dry Cleaning Experts",
              description: "Professional dry cleaning for delicate fabrics, suits, and specialty items. Advanced stain removal and fabric restoration.",
              imageUrl: "https://images.unsplash.com/photo-1582735689283-7b70dbe630ea?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
              icon: FiShield,
              gradient: "from-teal-400 to-cyan-400", 
              bgGradient: "from-teal-500/10 to-cyan-500/10",
              features: ["Expert Care", "Stain Removal", "Fabric Safe"]
            },
            {
              _id: "3",
              serviceName: "Express Service",
              description: "Need it fast? Our express service delivers professional cleaning within hours. Perfect for urgent cleaning needs.",
              imageUrl: "https://images.unsplash.com/photo-1624372635310-01d078c05dd9?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
              icon: FiClock,
              gradient: "from-cyan-400 to-blue-400",
              bgGradient: "from-cyan-500/10 to-blue-500/10", 
              features: ["2-Hour Service", "Priority", "Quality Assured"]
            },
            {
              _id: "4",
              serviceName: "Premium Care Package", 
              description: "Complete garment care including alterations, repairs, and specialized treatments. The ultimate clothing care experience.",
              imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
              icon: FiAward,
              gradient: "from-blue-400 to-indigo-400",
              bgGradient: "from-blue-500/10 to-indigo-500/10",
              features: ["Full Service", "Alterations", "Premium"]
            }
          ]
        };
        
        setData(mockData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enhanced Loading State
  if (isLoading) {
    return (
      <section 
        ref={sectionRef}
        className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-emerald-50/30"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton height={60} width={400} className="mx-auto mb-4" />
            <Skeleton height={20} width={300} className="mx-auto" />
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
                <Skeleton height={200} />
                <div className="p-6">
                  <Skeleton height={24} width="80%" className="mb-3" />
                  <Skeleton height={16} count={3} className="mb-2" />
                  <Skeleton height={20} width="60%" />
                </div>
              </div>
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
        className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-emerald-50/30"
      >
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-red-600 text-sm lg:text-base">Service Error</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 leading-tight mb-4">
              Our Premium <span className="text-emerald-600">Services</span>
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              Experience top-quality cleaning solutions
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-red-50/80 backdrop-blur-md border border-red-200/50 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Services</h3>
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
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-emerald-50/30"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-emerald-400/5 to-teal-400/10"
            style={{
              left: `${2 + (i * 6.5)}%`,
              top: `${5 + (i % 5) * 18}%`,
              width: `${8 + (i % 4) * 6}px`,
              height: `${8 + (i % 4) * 6}px`,
              animation: `float ${6 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-teal-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '8s'}}></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Enhanced Header */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <MdVerified className="text-emerald-600 w-4 h-4" />
            <span className="font-semibold text-emerald-600 text-sm lg:text-base">
              Premium Services
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 leading-tight mb-6">
            Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 relative mx-2">
              Premium
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Services
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Experience <span className="text-emerald-600 font-semibold">top-quality cleaning solutions</span> designed to exceed your expectations with 
            <span className="text-teal-600 font-semibold"> professional care</span> and attention to detail
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.data.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service._id}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{transitionDelay: `${400 + index * 200}ms`}}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <a 
                  href={`/services/${service._id}`}
                  className="block h-full no-underline"
                >
                  {/* Main Card */}
                  <div className="relative h-full bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-105">
                    
                    {/* Background Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={service.imageUrl}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Service Icon */}
                      <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <Icon className="text-white w-6 h-6" />
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <FiStar className="w-3 h-3" />
                        <span>Premium</span>
                      </div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6 space-y-4">
                      
                      {/* Service Name */}
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                        {service.serviceName}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="bg-gray-100 group-hover:bg-white/60 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-4">
                        <div className={`group/btn inline-flex items-center space-x-2 text-white bg-gradient-to-r ${service.gradient} px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden relative`}>
                          <span className="relative z-10">Book Now</span>
                          <FiArrowRight className="relative z-10 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className={`w-full h-full bg-gradient-to-r ${service.gradient} rounded-full transform rotate-45`}></div>
                    </div>

                    {/* Enhanced Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
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
                      <div className={`bg-gradient-to-r ${service.gradient} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl`}>
                        ⭐
                      </div>
                    </div>
                  )}
                </a>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Section */}
        <div className={`mt-20 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-black text-emerald-600">5000+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-black text-teal-600">99.5%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-black text-cyan-600">24/7</div>
                <div className="text-gray-600 font-medium">Service Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-black text-blue-600">2hrs</div>
                <div className="text-gray-600 font-medium">Express Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Need Something Custom?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We offer personalized cleaning solutions tailored to your specific needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden relative">
                <span className="relative z-10">Get Custom Quote</span>
                <MdTrendingUp className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <a 
                href="/services"
                className="group inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:border-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 no-underline"
              >
                <span>View All Services</span>
                <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
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
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-2px) rotate(180deg);
          }
          75% {
            transform: translateY(-6px) rotate(270deg);
          }
        }
      `}</style>
    </section>
  );
}