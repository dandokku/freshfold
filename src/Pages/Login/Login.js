import React, { useState, useEffect } from 'react';
import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from "react-query";
import splashkini from "../../Assets/Images/ok.jpg";
import { FaSoap } from 'react-icons/fa';

function Login() {
  const [splashActive, setSplashActive] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [confirmImageClass, setConfirmImageClass] = useState("completed-image");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function postUser(fields) {
    try {
      const response = await axios.post("http://localhost:9000/api/auth", fields);
      const authToken = response.headers["x-auth-token"];
      localStorage.setItem("user-jwt", JSON.stringify(authToken));
      setSplashActive(true);
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        setConfirmImageClass("completed-image show");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : "An error occurred.");
    }
  }

  const { mutate } = useMutation(postUser);

  const [fieldsData, setFieldsData] = useState({
    email: "",
    password: ""
  });

  const handleFieldsChange = (event) => {
    setFieldsData({
      ...fieldsData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(fieldsData);
  }

  return (
    <div>
      {splashActive ? (
        <div className="splash-screen">
          <img src={splashkini} className={confirmImageClass} alt="Splash" />
        </div>
      ) : (
        <div className='relative m-0 p-0'>
          <img src={LogImage} alt="Login Image" className='w-[100%] h-[100vh]' />
          <div className='p-10 bg-whiteColor absolute top-[20%] right-[25%] w-[50%] h-max rounded-md text-center'>
            <Link to='/'>
              <span className='logo text-secondaryColor font-bold text-2xl flex justify-center items-center max-sm:text-xl mb-2'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
            </Link>
            <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Welcome Back, <span className='text-secondaryColor font-bold'>Login</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <input type="email" name="email" onChange={handleFieldsChange} required value={fieldsData.email} placeholder='Email' className='p-2 w-full rounded-md outline-0 border bg-transparent border-mainColor focus:border-secondaryColor' />
              <input type="password" name="password" onChange={handleFieldsChange} value={fieldsData.password} placeholder='Password' className='p-2 w-full rounded-md outline-0 border bg-transparent border-mainColor focus:border-secondaryColor' />
              <button type="submit" className='btnbtn p-3 rounded-md border bg-textColor text-whiteColor w-full text-xl hover:bg-secondaryColor hover:text-whiteColor'>Sign In</button>
            </form>
            <h1 className='mt-5 text-xl'>Don't Have an Account? - <Link to="/register" className='text-secondaryColor'>Register</Link></h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

