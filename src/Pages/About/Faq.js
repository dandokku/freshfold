import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineAdd, MdHelpOutline, MdQuestionAnswer, MdSupport } from 'react-icons/md';

export default function Faq() {
  const [showAnswers, setShowAnswers] = useState([false, false, false, false, false]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
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

  // Function to toggle the visibility of answers for a specific question
  const toggleAnswers = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  const faqData = [
    {
      question: "How does the booking process work?",
      answer: "The booking process is simple and intuitive. Create an account, select your laundry preferences, choose a convenient time slot, and submit your order. Our professional team will handle pickup, cleaning, and delivery with care and precision.",
      icon: MdQuestionAnswer,
      gradient: "from-teal-300 to-cyan-300"
    },
    {
      question: "What are your pickup and delivery hours?",
      answer: "We offer flexible pickup and delivery services from 7 AM to 9 PM, Monday through Sunday. You can schedule your preferred time slot during checkout, and we'll send you confirmation and tracking details.",
      icon: MdSupport,
      gradient: "from-teal-300 to-cyan-300"
    },
    {
      question: "How do you handle different fabric types?",
      answer: "Our expert team carefully sorts and treats each fabric type according to industry standards. We use specialized cleaning methods for delicate items, professional dry cleaning for suits, and eco-friendly processes for everyday wear.",
      icon: MdHelpOutline,
      gradient: "from-teal-300 to-cyan-300"
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll re-clean your items free of charge or provide a full refund within 48 hours.",
      icon: MdQuestionAnswer,
      gradient: "from-teal-300 to-cyan-300"
    },
    {
      question: "Do you offer same-day service?",
      answer: "Yes! We provide same-day service for orders placed before 10 AM (subject to availability). Express service is available for an additional fee, and we guarantee delivery within 8 hours for urgent requests.",
      icon: MdSupport,
      gradient: "from-teal-300 to-cyan-300"
    }
  ];

  // SVG Illustration Component
  const FaqIllustration = () => (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        {/* Background Circle */}
        <circle cx="200" cy="150" r="120" fill="url(#bgGradient)" opacity="0.1"/>
        
        {/* Question Mark */}
        <path d="M180 80 Q200 60 220 80 Q240 100 220 120 L210 130 L210 140 M210 160 L210 170" 
              stroke="url(#questionGradient)" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <circle cx="210" cy="185" r="6" fill="url(#questionGradient)"/>
        
        {/* Floating Elements */}
        <circle cx="120" cy="100" r="8" fill="url(#accentGradient1)" opacity="0.6">
          <animate attributeName="cy" values="95;105;95" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="280" cy="120" r="6" fill="url(#accentGradient2)" opacity="0.7">
          <animate attributeName="cy" values="115;125;115" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="150" cy="220" r="4" fill="url(#accentGradient3)" opacity="0.5">
          <animate attributeName="cy" values="215;225;215" dur="4s" repeatCount="indefinite"/>
        </circle>
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981"/>
            <stop offset="100%" stopColor="#059669"/>
          </linearGradient>
          <linearGradient id="questionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#1D4ED8"/>
          </linearGradient>
          <linearGradient id="accentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
          <linearGradient id="accentGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B"/>
            <stop offset="100%" stopColor="#D97706"/>
          </linearGradient>
          <linearGradient id="accentGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444"/>
            <stop offset="100%" stopColor="#DC2626"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Question Marks */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-500/10 select-none"
            style={{
              left: `${20 + (i * 18)}%`,
              top: `${15 + (i % 3) * 30}%`,
              fontSize: `${16 + (i % 3) * 8}px`,
              animation: `float ${3 + (i % 2)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            ?
          </div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:25px_25px] opacity-30"></div>
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className={`text-center mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <MdHelpOutline className="from-teal-300 to-cyan-300 w-4 h-4" />
            <span className='font-semibold from-teal-300 to-cyan-300 text-sm lg:text-base'>
              Got Questions?
            </span>
          </div>

          <h1 className='font-black text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6'>
            Frequently Asked <span className="from-teal-300 to-cyan-300 relative inline-block">
              Questions
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-300 to-cyan-300 to-transparent rounded-full"></div>
            </span>
          </h1>
          
          <p className='text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto'>
            Have questions about our laundry booking service? You're in the right place! 
            We've compiled answers to help you make the most of your <span className="from-teal-300 to-cyan-300 font-semibold">laundry experience</span>.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* FAQ Items */}
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className={`group relative transform transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{transitionDelay: `${400 + index * 150}ms`}}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  showAnswers[index] ? 'ring-2 ring-blue-500/30' : ''
                }`}>
                  
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Question Header */}
                  <div
                    className='flex items-center justify-between cursor-pointer p-6 group-hover:bg-gray-50/50 transition-colors duration-300'
                    onClick={() => toggleAnswers(index)}
                    aria-expanded={showAnswers[index]}
                    aria-controls={`answer-${index}`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-12 h-12 bg-gradient-to-r ${faq.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <faq.icon className='text-white text-xl' />
                      </div>
                      <p className='font-bold text-gray-800 text-base lg:text-lg group-hover:text-gray-900 transition-colors duration-300'>
                        {faq.question}
                      </p>
                    </div>
                    <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transform transition-all duration-300 ${
                      showAnswers[index] ? 'rotate-45 bg-blue-500' : 'group-hover:bg-gray-200'
                    }`}>
                      <MdOutlineAdd className={`text-xl transition-colors duration-300 ${
                        showAnswers[index] ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>

                  {/* Answer Section */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showAnswers[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div id={`answer-${index}`} className='p-6 pt-0'>
                      <div className={`bg-gradient-to-r ${faq.gradient} bg-opacity-10 rounded-xl p-6 border-l-4 border-gradient-to-b ${faq.gradient.replace('to-', 'border-')}`}>
                        <p className='text-gray-700 text-base lg:text-lg leading-relaxed'>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration and Info Section */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            {/* Custom SVG Illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                <FaqIllustration />
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Can't find the answer you're looking for? Our friendly support team is here to help you 
                    with personalized assistance and detailed information about our services.
                  </p>
                </div>

                {/* Support Features */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MdSupport className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">24/7 Support</div>
                      <div className="text-sm text-gray-600">Always here when you need us</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <MdQuestionAnswer className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Quick Response</div>
                      <div className="text-sm text-gray-600">Average response time: 2 minutes</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center pt-4">
                  <button className='group inline-flex items-center space-x-3 bg-gradient-to-r from-teal-300 to-cyan-300 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative'>
                    <span className="relative z-10">Contact Support</span>
                    <MdSupport className="relative z-10 w-4 h-4" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
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
          50% {
            transform: translateY(-10px) rotate(10deg);
          }
        }
      `}</style>
    </section>
  );
}