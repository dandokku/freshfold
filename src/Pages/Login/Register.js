import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from 'react-query';
import { FaSoap, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiUser, FiMail, FiPhone, FiHome, FiLock } from 'react-icons/fi';

function Register() {
  const [userSuccess, setUserSuccess] = useState("");
  const [userFailed, setUserFailed] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function postUser(fields) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:9000/api/users", fields);
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
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      setUserFailed(error.response?.data?.message || "An error occurred during registration.");
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

  return (
    <div className="font-sans">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <Link to='/'>
                <span className='logo text-secondaryColor font-bold text-3xl flex justify-center items-center mb-2'>
                  Fresh <span className='text-secondaryColor flex items-center'>F <FaSoap className="text-secondaryColor mx-1" size={28} /> ld</span>
                </span>
              </Link>
              <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Join our laundry service today
              </p>
            </div>

            {/* Success/Error Messages */}
            {userSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{userSuccess}</p>
                  </div>
                </div>
              </div>
            )}

            {userFailed && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{userFailed}</p>
                  </div>
                </div>
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={fieldsData.firstName}
                      onChange={handleFieldsChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-3 border ${validateFieldsData.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                      placeholder="First name"
                    />
                  </div>
                  {validateFieldsData.firstName && (
                    <p className="mt-1 text-sm text-red-600">{validateFieldsData.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="sr-only">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={fieldsData.lastName}
                      onChange={handleFieldsChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-3 border ${validateFieldsData.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                      placeholder="Last name"
                    />
                  </div>
                  {validateFieldsData.lastName && (
                    <p className="mt-1 text-sm text-red-600">{validateFieldsData.lastName}</p>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNo" className="sr-only">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNo"
                      name="phoneNo"
                      type="tel"
                      value={fieldsData.phoneNo}
                      onChange={handleFieldsChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-3 border ${validateFieldsData.phoneNo ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                      placeholder="Phone number"
                    />
                  </div>
                  {validateFieldsData.phoneNo && (
                    <p className="mt-1 text-sm text-red-600">{validateFieldsData.phoneNo}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={fieldsData.email}
                      onChange={handleFieldsChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-3 border ${validateFieldsData.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                      placeholder="Email address"
                    />
                  </div>
                  {validateFieldsData.email && (
                    <p className="mt-1 text-sm text-red-600">{validateFieldsData.email}</p>
                  )}
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="sr-only">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={fieldsData.address}
                    onChange={handleFieldsChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${validateFieldsData.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                    placeholder="Full address"
                  />
                </div>
                {validateFieldsData.address && (
                  <p className="mt-1 text-sm text-red-600">{validateFieldsData.address}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={fieldsData.password}
                    onChange={handleFieldsChange}
                    className={`appearance-none block w-full pl-10 pr-10 py-3 border ${validateFieldsData.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {validateFieldsData.password && (
                  <p className="mt-1 text-sm text-red-600">{validateFieldsData.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isFormValid ? 'bg-secondaryColor hover:bg-secondaryColor/90' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryColor`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Sign up'
                  )}
                </button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-secondaryColor hover:text-secondaryColor/80">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1678218580850-15c50b9f3525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Decorative background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
          <div className="relative h-full flex items-end p-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Fresh Fold</h2>
              <p className="text-gray-200 max-w-md">
                Join thousands of satisfied customers who trust us with their laundry needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;