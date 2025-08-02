import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaStar, FaCheckCircle } from 'react-icons/fa';

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images for rotation
  const heroImages = [
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Load animation trigger
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    { icon: FaCheckCircle, text: "Free Pickup & Delivery" },
    { icon: FaCheckCircle, text: "24/7 Service Available" },
    { icon: FaCheckCircle, text: "Eco-Friendly Process" }
  ];

  return (
    <div className='relative min-h-screen overflow-hidden pt-20'>
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image}
              alt={`Laundry Service ${index + 1}`}
              className='w-full h-full object-cover transform scale-110 transition-transform duration-[20000ms] ease-out hover:scale-105'
            />
          </div>
        ))}
      </div>

      {/* Multiple Overlay Layers for Depth */}
      <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30'></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondaryColor/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondaryColor/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex items-center justify-center px-4 lg:px-8'>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 text-center lg:text-left transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Now Available 24/7</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className='text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight'>
                  <span className="block">
                    <span className='text-secondaryColor relative inline-block'>
                      Book
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondaryColor to-transparent rounded-full"></div>
                    </span>{' '}
                    Your
                  </span>
                  <span className="block mt-2">
                    Laundry Services
                  </span>
                  <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-300 font-bold">
                    Hassle-Free
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className='text-gray-200 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0'>
                Experience <span className="text-secondaryColor font-semibold">premium laundry solutions</span> with 
                affordable pricing and top-quality service. Spend more time doing what you love.
              </p>

              {/* Feature List */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 text-white/90 transform transition-all duration-700 ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{transitionDelay: `${800 + index * 200}ms`}}
                  >
                    <feature.icon className="text-secondaryColor w-5 h-5" />
                    <span className="text-sm sm:text-base font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transform transition-all duration-1000 delay-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link 
                  to='/login' 
                  className='group relative px-8 py-4 bg-gradient-to-r from-secondaryColor to-secondary-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-secondaryColor/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden'
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>

              {/* Social Proof */}
              <div className={`flex items-center justify-center lg:justify-start space-x-6 text-white/80 transform transition-all duration-1000 delay-1200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-2">4.9/5 Rating</span>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="text-sm font-medium">2000+ Happy Customers</div>
              </div>
            </div>

            {/* Right Content - Stats/Cards */}
            <div className={`hidden lg:block space-y-6 transform transition-all duration-1000 delay-700 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              
              {/* Floating Stats Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondaryColor rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">24</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Hours Service</h3>
                      <p className="text-gray-300">Available anytime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 ml-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2K+</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Happy Clients</h3>
                      <p className="text-gray-300">And counting</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">99%</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Satisfaction</h3>
                      <p className="text-gray-300">Guaranteed quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-white/60 animate-bounce ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-1000 delay-1500`}>
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-px h-8 bg-white/30"></div>
      </div>

      {/* Image Carousel Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-secondaryColor scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;