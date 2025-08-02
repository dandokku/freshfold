import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineFormatQuote, MdStar, MdVerified, MdFavorite } from 'react-icons/md';

function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const testimonials = [
    {
      id: 1,
      text: "The seamless booking process has made my life so much easier, and the quality of service is consistently excellent. I highly recommend this service to anyone looking for a hassle-free laundry solution. Thanks to this website, I've reclaimed valuable time and gained peace of mind.",
      author: "Sarah Johnson",
      role: "Busy Professional",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1fe?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      id: 2,
      text: "The convenience of scheduling pick-ups and deliveries online has saved me so much time, and the laundry always comes back fresh and neatly folded. I highly recommend this website to anyone looking for a hassle-free laundry experience!",
      author: "Michael Chen",
      role: "Working Parent",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      id: 3,
      text: "I no longer worry about laundry day because I know I can rely on this platform for a hassle-free experience. From booking to delivery, this service has truly transformed my laundry routine. I highly recommend it to anyone looking for a stress-free laundry solution.",
      author: "Emma Williams",
      role: "College Student",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <MdStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50/30'
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/10"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + (i % 2) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <MdFavorite size={12 + (i % 3) * 6} />
          </div>
        ))}

        {/* Quote Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
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
              Customer Stories
            </span>
          </div>

          <h1 className='font-black text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6'>
            What Our <span className="text-green-600 relative inline-block">
              Customers Say
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
            </span>
          </h1>
          
          <p className='text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto'>
            See what our satisfied customers have to say about our laundry booking service. 
            Discover how we've made laundry day <span className="text-green-600 font-semibold">hassle-free and convenient</span> for them. 
            Don't just take our word for it – read their testimonials and join the ranks of happy customers today!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16'>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              } ${currentTestimonial === index ? 'lg:scale-105' : ''}`}
              style={{transitionDelay: `${300 + index * 200}ms`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Active Indicator for Auto-Rotation */}
              {currentTestimonial === index && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-[1.02] overflow-hidden ${
                currentTestimonial === index ? 'ring-2 ring-green-500/30 shadow-green-500/10' : ''
              }`}>
                
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Quote Icon */}
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <MdOutlineFormatQuote className='text-2xl text-white' />
                    </div>
                    {/* Quote Glow */}
                    <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-3">
                    <StarRating rating={testimonial.rating} />
                    <span className="text-sm text-gray-600 font-medium">5.0</span>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className='text-gray-700 text-base lg:text-lg leading-relaxed italic group-hover:text-gray-800 transition-colors duration-300'>
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-200/50">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm lg:text-base">{testimonial.author}</div>
                      <div className="text-gray-600 text-xs lg:text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <MdOutlineFormatQuote className={`text-2xl text-gray-400`} />
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                     style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Navigation Dots */}
        <div className={`flex justify-center space-x-3 mb-12 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-green-500 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Ready to experience the same satisfaction?
              </h3>
              <p className="text-gray-600 text-lg">
                Join thousands of happy customers who trust us with their laundry needs
              </p>
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MdStar className="text-yellow-400 w-5 h-5" />
                  <span className="font-semibold">4.9/5 Average Rating</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MdVerified className="text-green-500 w-5 h-5" />
                  <span className="font-semibold">2000+ Reviews</span>
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
            transform: translateY(-12px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials;