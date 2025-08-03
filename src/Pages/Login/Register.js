import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from 'react-query';
import { FaSoap, FaEye, FaEyeSlash, FaCheckCircle, FaStar, FaUser, FaShieldAlt } from 'react-icons/fa';
import { FiUser, FiMail, FiPhone, FiHome, FiLock, FiArrowRight, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

function Register() {
  const [userSuccess, setUserSuccess] = useState("");
  const [userFailed, setUserFailed] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // Hero images for background rotation
  const heroImages = [
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
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

  async function postUser(fields) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://freshfoldserver.onrender.com/api/users", fields);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const { mutate } = useMutation(postUser, {
    onSuccess: () => {
      setUserSuccess("Registration successful! Redirecting to login...");
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "An error occurred during registration.";
      setUserFailed(message);
      toast.error(message);
    },
  });

  const [fieldsData, setFieldsData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    password: ""
  });

  const [validateFieldsData, setValidateFieldsData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    password: ""
  });

  function handleFieldsChange(event) {
    const { name, value } = event.target;
    const validateFields = { ...validateFieldsData };

    setFieldsData(oldFieldsData => ({
      ...oldFieldsData,
      [name]: value
    }));

    // Clear any existing messages when user types
    if (userFailed) setUserFailed("");
    if (userSuccess) setUserSuccess("");

    // Common validation patterns
    const patterns = {
      name: /^[A-Za-z]+$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phoneNo: /^[0-9]{10,15}$/,
    };

    // Validation logic for each field
    switch (name) {
      case "firstName":
      case "lastName":
        validateFields[name] = patterns.name.test(value) ? "" : `${name === "firstName" ? "First name" : "Last name"} cannot contain numbers or special characters.`;
        break;
      case "email":
        validateFields.email = patterns.email.test(value) ? "" : "Please enter a valid email address.";
        break;
      case "phoneNo":
        validateFields.phoneNo = patterns.phoneNo.test(value) ? "" : "Please enter a valid phone number (10-15 digits).";
        break;
      case "address":
        validateFields.address = value.length >= 10 ? "" : "Address must have at least 10 characters.";
        break;
      case "password":
        validateFields.password = value.length >= 6 && /[0-9]/.test(value) ? "" : "Password must be at least 6 characters long and contain numbers.";
        break;
      default:
        break;
    }

    setValidateFieldsData(validateFields);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Check if any validation errors exist
    const hasErrors = Object.values(validateFieldsData).some(error => error !== "");
    if (hasErrors) {
      setUserFailed("Please fix the errors in the form.");
      toast.warn("Please fix the errors in the form.");
      return;
    }

    mutate(fieldsData);
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check if form is valid
  const isFormValid = Object.values(validateFieldsData).every(error => error === "") && 
                     Object.values(fieldsData).every(value => value !== "");

  const features = [
    { icon: FaCheckCircle, text: "24/7 Service Available" },
    { icon: FaCheckCircle, text: "Eco-Friendly Process" },
    { icon: FaCheckCircle, text: "Free Pickup & Delivery" }
  ];

  const benefits = [
    { icon: FaUser, title: "Personalized Service", desc: "Tailored to your needs" },
    { icon: FaShieldAlt, title: "Secure & Safe", desc: "Your clothes are protected" },
    { icon: FaStar, title: "Premium Quality", desc: "Professional results" }
  ];

  return (
    <div className="font-sans">
      <div className="relative min-h-screen overflow-hidden">
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
                alt={`Background ${index + 1}`}
                className='w-full h-full object-cover transform scale-110 transition-transform duration-[20000ms] ease-out'
              />
            </div>
          ))}
        </div>

        {/* Multiple Overlay Layers for Depth */}
        <div className='absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60'></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondaryColor/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondaryColor/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              
              {/* Left side - Welcome Content */}
              <div className={`hidden lg:block space-y-8 transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Join Our Community</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className='text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight'>
                    <span className="block">
                      <span className='text-secondaryColor relative inline-block'>
                        Start
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondaryColor to-transparent rounded-full"></div>
                      </span>{' '}
                      Your
                    </span>
                    <span className="block mt-2">
                      Laundry Journey
                    </span>
                    <span className="block mt-2 text-3xl lg:text-4xl xl:text-5xl text-gray-300 font-bold">
                      Today
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className='text-gray-200 text-lg lg:text-xl leading-relaxed max-w-2xl'>
                  Join <span className="text-secondaryColor font-semibold">2000+ satisfied customers</span> who 
                  trust us with their laundry needs. Experience premium service from day one.
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 text-white/90 transform transition-all duration-700 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{transitionDelay: `${800 + index * 200}ms`}}
                    >
                      <feature.icon className="text-secondaryColor w-5 h-5" />
                      <span className="text-base font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Benefits Cards */}
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                      style={{transitionDelay: `${1200 + index * 150}ms`}}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-secondaryColor rounded-xl flex items-center justify-center">
                          <benefit.icon className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base">{benefit.title}</h3>
                          <p className="text-gray-300 text-sm">{benefit.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className={`flex items-center space-x-6 text-white/80 transform transition-all duration-1000 delay-1500 ${
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

              {/* Right side - Register Form */}
              <div className={`transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-lg mx-auto lg:mx-0">
                  
                  {/* Logo & Header */}
                  <div className="text-center mb-8">
                    <Link to='/'>
                      <div className='flex justify-center items-center mb-6'>
                        <span className='logo text-secondaryColor font-bold text-3xl lg:text-4xl flex items-center'>
                          Fresh 
                          <span className='text-secondaryColor flex items-center ml-1'>
                            F <FaSoap className="text-secondaryColor mx-1" size={32} /> ld
                          </span>
                        </span>
                      </div>
                    </Link>
                    
                    <div className="space-y-2 mb-8">
                      <h1 className="text-2xl lg:text-3xl font-black text-white">
                        Create Account
                      </h1>
                      <p className="text-gray-300 text-base lg:text-lg">
                        Join our premium laundry service
                      </p>
                    </div>
                  </div>

                  {/* Success/Error Messages */}
                  {userSuccess && (
                    <div className="mb-6 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <FiCheck className="h-5 w-5 text-green-400" />
                        </div>
                        <p className="text-sm text-green-300">{userSuccess}</p>
                      </div>
                    </div>
                  )}

                  {userFailed && (
                    <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm text-red-300">{userFailed}</p>
                      </div>
                    </div>
                  )}

                  {/* Registration Form */}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-2">
                          First Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiUser className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.firstName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={fieldsData.firstName}
                            onChange={handleFieldsChange}
                            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                              validateFieldsData.firstName 
                                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                                : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                            }`}
                            placeholder="Enter first name"
                          />
                        </div>
                        {validateFieldsData.firstName && (
                          <p className="mt-2 text-sm text-red-400">{validateFieldsData.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-2">
                          Last Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiUser className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.lastName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={fieldsData.lastName}
                            onChange={handleFieldsChange}
                            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                              validateFieldsData.lastName 
                                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                                : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                            }`}
                            placeholder="Enter last name"
                          />
                        </div>
                        {validateFieldsData.lastName && (
                          <p className="mt-2 text-sm text-red-400">{validateFieldsData.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-200 mb-2">
                          Phone Number
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiPhone className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.phoneNo ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                          </div>
                          <input
                            id="phoneNo"
                            name="phoneNo"
                            type="tel"
                            value={fieldsData.phoneNo}
                            onChange={handleFieldsChange}
                            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                              validateFieldsData.phoneNo 
                                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                                : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                            }`}
                            placeholder="Enter phone number"
                          />
                        </div>
                        {validateFieldsData.phoneNo && (
                          <p className="mt-2 text-sm text-red-400">{validateFieldsData.phoneNo}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiMail className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={fieldsData.email}
                            onChange={handleFieldsChange}
                            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                              validateFieldsData.email 
                                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                                : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                            }`}
                            placeholder="Enter email address"
                          />
                        </div>
                        {validateFieldsData.email && (
                          <p className="mt-2 text-sm text-red-400">{validateFieldsData.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-gray-200 mb-2">
                        Full Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FiHome className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.address ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                        </div>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={fieldsData.address}
                          onChange={handleFieldsChange}
                          className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                            validateFieldsData.address 
                              ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                              : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                          }`}
                          placeholder="Enter your full address"
                        />
                      </div>
                      {validateFieldsData.address && (
                        <p className="mt-2 text-sm text-red-400">{validateFieldsData.address}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FiLock className={`h-5 w-5 transition-colors duration-300 ${validateFieldsData.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-secondaryColor'}`} />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={fieldsData.password}
                          onChange={handleFieldsChange}
                          className={`block w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl shadow-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-white/15 ${
                            validateFieldsData.password 
                              ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                              : 'border-white/20 focus:ring-secondaryColor focus:border-secondaryColor'
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-secondaryColor transition-colors duration-300" />
                          ) : (
                            <FaEye className="h-5 w-5 text-gray-400 hover:text-secondaryColor transition-colors duration-300" />
                          )}
                        </button>
                      </div>
                      {validateFieldsData.password && (
                        <p className="mt-2 text-sm text-red-400">{validateFieldsData.password}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`group relative w-full flex justify-center items-center space-x-3 py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform overflow-hidden ${
                          isFormValid && !isSubmitting
                            ? 'bg-gradient-to-r from-secondaryColor to-secondary-500 text-white hover:shadow-secondaryColor/25 hover:-translate-y-1 hover:scale-105'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center space-x-3">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Creating account...</span>
                          </span>
                        ) : (
                          <>
                            <span className="relative z-10">Create Account</span>
                            <FiArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                        {isFormValid && !isSubmitting && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-300 text-sm lg:text-base">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="font-semibold text-secondaryColor hover:text-secondary-300 transition-colors duration-300 hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondaryColor/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Carousel Indicators */}
        <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
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
    </div>
  );
}

export default Register;