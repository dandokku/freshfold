import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCheck, MdStar, MdTrendingUp, MdEco } from 'react-icons/md';
import { FaAward, FaClock, FaShieldAlt } from 'react-icons/fa';

function FewWords() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null); 
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

  const features = [
    { 
      icon: MdStar, 
      text: 'Premium Quality Service',
      description: 'Industry-leading cleaning standards'
    },
    { 
      icon: FaClock, 
      text: 'Express Fast Delivery',
      description: 'Same-day and next-day options'
    },
    { 
      icon: FaAward, 
      text: 'Highly Professional Staff',
      description: 'Trained and certified experts'
    },
    { 
      icon: FaShieldAlt, 
      text: '100% Satisfaction Guarantee',
      description: 'Your happiness is our priority'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Happy Customers' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Service Available' }
  ];

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-secondary-50'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Bubbles with CSS-only animations */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-secondaryColor/10 to-secondaryColor/20 animate-float`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: `${20 + (i % 3) * 15}px`,
              height: `${20 + (i % 3) * 15}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 3) * 2}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondaryColor/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-secondary-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          
          {/* Images Section with Enhanced Layout */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            
            {/* Image Grid */}
            <div className='relative'>
              {/* Main Large Image */}
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1624372635310-01d078c05dd9?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
                  alt='Premium Laundry Service'
                  className='w-full h-[400px] lg:h-[500px] rounded-2xl object-cover shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]'
                  onMouseEnter={() => setHoveredImage(0)}
                  onMouseLeave={() => setHoveredImage(null)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Secondary Image */}
              <div className="absolute -bottom-12 -right-6 lg:-right-12 group">
                <img
                  src="https://images.unsplash.com/photo-1582735689283-7b70dbe630ea?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
                  alt='Professional Laundry Care'
                  className='w-48 h-64 lg:w-56 lg:h-72 rounded-2xl object-cover shadow-2xl border-4 border-white transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105'
                  onMouseEnter={() => setHoveredImage(1)}
                  onMouseLeave={() => setHoveredImage(null)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute top-8 -left-4 lg:-left-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MdTrendingUp className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">98%</div>
                    <div className="text-sm text-gray-600">Customer Retention</div>
                  </div>
                </div>
              </div>

              {/* Eco-Friendly Badge */}
              <div className="absolute bottom-20 left-4 lg:left-8 bg-secondaryColor/90 backdrop-blur-md rounded-2xl p-3 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-2 text-white">
                  <MdEco className="w-5 h-5" />
                  <span className="text-sm font-semibold">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-secondaryColor/10 border border-secondaryColor/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-secondaryColor rounded-full animate-pulse"></div>
                <span className='font-semibold text-secondaryColor text-sm lg:text-base'>
                  Learn About Us
                </span>
              </div>
              
              <h2 className='text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 leading-tight'>
                We Provide <span className="text-secondaryColor">Premium</span> 
                <br />Laundry Services
              </h2>
              
              <p className='text-gray-600 text-lg lg:text-xl leading-relaxed max-w-xl'>
                We are industry professionals delivering exceptional laundry and dry cleaning services with cutting-edge technology, 
                eco-friendly methods, and meticulous attention to detail.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{transitionDelay: `${600 + index * 200}ms`}}
                >
                  <div className="text-2xl lg:text-3xl font-black text-secondaryColor">{stat.number}</div>
                  <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className='space-y-4'>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/60 hover:shadow-md transition-all duration-300 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{transitionDelay: `${800 + index * 150}ms`}}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondaryColor to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className='text-white w-6 h-6' />
                  </div>
                  <div className="flex-1">
                    <h4 className='font-bold text-gray-800 text-base lg:text-lg mb-1'>{feature.text}</h4>
                    <p className='text-gray-600 text-sm lg:text-base'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className={`pt-4 transform transition-all duration-1000 delay-1200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Link
                to='/about'
                className='group inline-flex items-center space-x-3 bg-gradient-to-r from-secondaryColor to-secondary-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-secondaryColor/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden relative'
              >
                <span className="relative z-10">Learn More About Us</span>
                <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
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
            transform: translateY(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(5px) rotate(240deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}

export default FewWords;