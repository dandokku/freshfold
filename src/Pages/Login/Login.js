import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from "react-query";
import splashkini from "../../Assets/Images/ok.jpg";
import { FaSoap, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiMail, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';


function Login() {
  const [splashActive, setSplashActive] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [confirmImageClass, setConfirmImageClass] = useState("completed-image");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Function to handle login
  async function postUser(fields) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:9000/api/auth", fields);
      const authToken = response.headers["x-auth-token"];
      localStorage.setItem("user-jwt", JSON.stringify(authToken));
  
      toast.success("Login successful! Redirecting...");
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const message = error.response?.data || "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  // Using React Query's mutation hook
  const { mutate } = useMutation(postUser);

  // Form data state
  const [fieldsData, setFieldsData] = useState({
    email: "",
    password: ""
  });

  // Handle input field changes
  const handleFieldsChange = (event) => {
    setErrorMessage(""); // Clear errors when user types
    setFieldsData({
      ...fieldsData,
      [event.target.name]: event.target.value
    });
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fieldsData.email || !fieldsData.password) {
      toast.warn("Please fill in all fields");
      return;
    }
    mutate(fieldsData);
  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-sans">
      {splashActive ? (
        <div className="splash-screen">
          <img src={splashkini} className={`${confirmImageClass} transition-all duration-500`} alt="Splash" />
        </div>
      ) : (
        <div className="flex min-h-screen">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Link to='/'>
                  <span className='logo text-secondaryColor font-bold text-3xl flex justify-center items-center mb-2'>
                    Fresh <span className='text-secondaryColor flex items-center'>F <FaSoap className="text-secondaryColor mx-1" size={28} /> ld</span>
                  </span>
                </Link>
                <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Sign in to your account
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
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
                        autoComplete="email"
                        required
                        value={fieldsData.email}
                        onChange={handleFieldsChange}
                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

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
                        autoComplete="current-password"
                        required
                        value={fieldsData.password}
                        onChange={handleFieldsChange}
                        className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondaryColor focus:border-secondaryColor sm:text-sm"
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
                  </div>
                </div>


                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondaryColor hover:bg-secondaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryColor ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-secondaryColor hover:text-secondaryColor/80">
                  Register now
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
                  The best laundry service in town. Quality cleaning with care for your clothes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;