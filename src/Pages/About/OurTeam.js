import React, { useState, useEffect, useRef } from 'react';
import { MdEmail, MdPhone, MdStar, MdWorkOutline } from 'react-icons/md';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function OurTeam() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
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

  const teamMembers = [
    {
      name: 'Daniel Jesuloba',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
      gradient: 'from-teal-400 to-cyan-400',
      bgGradient: 'from-teal-500/10 to-cyan-500/10',
      description: 'Visionary leader with 10+ years in laundry innovation',
      expertise: ['Leadership', 'Strategy', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'daniel@company.com'
      }
    },
    {
      name: 'Franky Kinney',
      role: 'Co-Founder',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
      gradient: 'from-emerald-400 to-teal-400',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      description: 'Operations expert ensuring seamless service delivery',
      expertise: ['Operations', 'Quality Control', 'Process Design'],
      social: {
        linkedin: '#',
        instagram: '#',
        email: 'franky@company.com'
      }
    },
    {
      name: 'Alexandra Berka',
      role: 'Creative Consultant',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
      gradient: 'from-cyan-400 to-blue-400',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
      description: 'Creative mastermind behind our brand experience',
      expertise: ['Brand Design', 'Marketing', 'Customer Experience'],
      social: {
        instagram: '#',
        twitter: '#',
        email: 'alexandra@company.com'
      }
    },
    {
      name: 'Markus Shinny',
      role: 'Creative Leader',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
      gradient: 'from-blue-400 to-indigo-400',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
      description: 'Innovation driver creating tomorrow\'s solutions today',
      expertise: ['Product Development', 'Technology', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#',
        phone: '+1-234-567-8900'
      }
    }
  ];

  const SocialIcon = ({ type, url }) => {
    const icons = {
      linkedin: FaLinkedin,
      twitter: FaTwitter,
      instagram: FaInstagram,
      email: MdEmail,
      phone: MdPhone
    };
    
    const Icon = icons[type];
    return Icon ? (
      <a href={url} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group">
        <Icon className="w-5 h-5 text-white group-hover:text-white" />
      </a>
    ) : null;
  };

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black'
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-teal-400/5 to-cyan-400/10"
            style={{
              left: `${2 + (i * 6.5)}%`,
              top: `${5 + (i % 5) * 18}%`,
              width: `${12 + (i % 4) * 8}px`,
              height: `${12 + (i % 4) * 8}px`,
              animation: `float ${7 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-teal-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '8s'}}></div>
      </div>

      <div className='container mx-auto px-6 lg:px-8 relative z-10'>
        
        {/* Enhanced Header Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Floating Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 shadow-xl">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <MdWorkOutline className="text-teal-300 w-5 h-5" />
            <span className='font-semibold text-white text-base lg:text-lg'>
              Meet Our Experts
            </span>
          </div>

          <h1 className='font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6'>
            Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 relative mx-4">
              Dream
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Team
            </span>
          </h1>
          
          <p className='text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto'>
            Meet the passionate professionals who make <span className="text-teal-300 font-semibold">excellence</span> happen every day.
            Our team combines <span className="text-cyan-300 font-semibold">expertise</span>, 
            <span className="text-blue-300 font-semibold"> innovation</span>, and 
            <span className="text-indigo-300 font-semibold"> dedication</span> to serve you better.
          </p>
        </div>

        {/* Enhanced Team Grid */}
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{transitionDelay: `${400 + index * 200}ms`}}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Main Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-105">
                
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className='w-full h-80 object-cover transition-all duration-700 group-hover:scale-110'
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Floating Social Icons */}
                  <div className={`absolute top-4 right-4 flex flex-col space-y-2 transform transition-all duration-500 ${
                    hoveredMember === index ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                  }`}>
                    {Object.entries(member.social).map(([platform, url]) => (
                      <SocialIcon key={platform} type={platform} url={url} />
                    ))}
                  </div>

                  {/* Role Badge */}
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${member.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm`}>
                    <div className="flex items-center space-x-2">
                      <MdStar className="w-3 h-3" />
                      <span>{member.role}</span>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 space-y-4">
                  
                  {/* Name & Role */}
                  <div className="text-center space-y-2">
                    <h3 className='text-xl lg:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300'>
                      {member.name}
                    </h3>
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${member.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{member.role}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-gray-300 text-sm lg:text-base leading-relaxed text-center'>
                    {member.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-white/10 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <div className="pt-4 text-center">
                    <button className={`group/btn inline-flex items-center space-x-2 bg-gradient-to-r ${member.gradient} text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden relative`}>
                      <span className="relative z-10">Contact Me</span>
                      <MdEmail className="relative z-10 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>

                {/* Enhanced Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                     style={{
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       maskComposite: 'xor',
                       WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       WebkitMaskComposite: 'xor'
                     }}>
                </div>
              </div>

              {/* Floating Achievement Badge */}
              {hoveredMember === index && (
                <div className="absolute -top-3 -right-3 z-20 animate-bounce">
                  <div className={`bg-gradient-to-r ${member.gradient} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl`}>
                    ⭐
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
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-white">
                  Want to Join Our Team?
                </h3>
                <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto">
                  We're always looking for talented individuals who share our passion for excellence and innovation
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className='group inline-flex items-center space-x-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-teal-400/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden relative'>
                  <span className="relative z-10">View Open Positions</span>
                  <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                <button className='group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105'>
                  <span>Contact HR</span>
                  <MdEmail className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
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
            transform: translateY(-12px) rotate(90deg);
          }
          50% {
            transform: translateY(-3px) rotate(180deg);
          }
          75% {
            transform: translateY(-8px) rotate(270deg);
          }
        }
      `}</style>
    </section>
  );
}

export default OurTeam;