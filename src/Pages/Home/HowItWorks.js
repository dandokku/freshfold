import React, { useState, useEffect, useRef } from 'react';
import { FaTruck, FaWater, FaHandPaper, FaShippingFast, FaArrowRight, FaClock, FaCheckCircle } from 'react-icons/fa';
import { MdLocalLaundryService } from 'react-icons/md';

function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
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

  // Auto-advance active step
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      id: 1,
      title: 'Schedule Pickup',
      subtitle: 'Easy Online Booking',
      description: 'Book your pickup online or via our app. Choose your preferred time slot.',
      icon: FaTruck,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      features: ['Free pickup', 'Flexible timing', 'GPS tracking'],
      time: '5 min'
    },
    {
      id: 2,
      title: 'Professional Wash',
      subtitle: 'Premium Care Process',
      description: 'Your clothes receive expert treatment with eco-friendly detergents and advanced equipment.',
      icon: MdLocalLaundryService,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
      features: ['Eco-friendly', 'Stain removal', 'Fabric care'],
      time: '24 hrs'
    },
    {
      id: 3,
      title: 'Careful Folding',
      subtitle: 'Attention to Detail',
      description: 'Each item is carefully folded and packaged to maintain freshness and quality.',
      icon: FaHandPaper,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      features: ['Hand folded', 'Quality check', 'Fresh packaging'],
      time: '2 hrs'
    },
    {
      id: 4,
      title: 'Swift Delivery',
      subtitle: 'Right to Your Door',
      description: 'Your freshly cleaned and folded laundry is delivered back to your doorstep.',
      icon: FaShippingFast,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      features: ['Same day', 'Contactless', 'Satisfaction guaranteed'],
      time: '1 hr'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 bg-gradient-to-br from-secondaryColor via-secondary-600 to-secondary-700 overflow-hidden'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-white/[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className='font-semibold text-white text-sm lg:text-base'>
              Simple Process
            </span>
          </div>
          
          <h2 className='text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6'>
            Get it done in{' '}
            <span className="relative inline-block">
              <span className="text-yellow-300">4 steps</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Our streamlined process ensures your laundry gets the premium care it deserves, 
            from pickup to delivery.
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              } ${activeStep === index ? 'scale-105' : ''}`}
              style={{transitionDelay: `${index * 200}ms`}}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Connection Line (Desktop) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-white/30 z-0">
                  <FaArrowRight className="absolute -right-2 -top-2 text-white/50 w-4 h-4" />
                </div>
              )}

              {/* Step Card */}
              <div className={`relative h-full bg-white rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden ${
                hoveredStep === index || activeStep === index 
                  ? 'shadow-3xl ring-4 ring-white/30 transform -translate-y-2' 
                  : ''
              }`}>
                
                {/* Active Indicator */}
                {activeStep === index && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                )}

                {/* Card Content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Step Number & Time */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-8 h-8 ${step.iconBg} text-white rounded-full text-sm font-bold`}>
                      {step.id}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <FaClock className="w-3 h-3" />
                      <span>{step.time}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="text-white w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className='font-bold text-xl text-gray-800 mb-2'>
                        {step.title}
                      </h3>
                      <p className="text-sm text-secondaryColor font-semibold mb-3">
                        {step.subtitle}
                      </p>
                      <p className='text-gray-600 text-sm leading-relaxed'>
                        {step.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <FaCheckCircle className="text-green-500 w-3 h-3 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-${step.bgColor} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-3xl opacity-50"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 lg:mt-20 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to experience hassle-free laundry?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their laundry needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-secondaryColor px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2">
                <span>Start Your First Order</span>
                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="flex items-center space-x-4 text-white/80">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Free pickup & delivery</span>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;