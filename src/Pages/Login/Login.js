// import React from 'react'
// import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
// import {Link, useNavigate} from 'react-router-dom'
// import axios from "axios";
// import { useMutation } from "react-query";
// import splashkini from "../../Assets/Images/seongmin-park-p1qYb9pvLPU-unsplash.jpg"

// function Login() {

//   const [ splashActive, setSplashActive ] = React.useState(false);
//   const [showSplash, setShowSplash] = React.useState(false);
//   const [confirmImageClass, setConfirmImageClass] = React.useState("completed-image");
//   const [errorMessage, setErrorMessage] = React.useState("");

//   async function postUser(fields) {
//     const response = await axios.post("http://localhost:9000/api/auth", fields);
//     const authToken = response.headers["x-auth-token"];
//     localStorage.setItem("user-jwt", JSON.stringify(authToken));
//   }

//   const navigate = useNavigate();

//   const { mutate } = useMutation(postUser, {
//     onError: (error) => {
//       setErrorMessage(error.response.data)
//     }
//   })

//   const [fieldsData, setFieldsData] = React.useState({
//     email: "",
//     password: ""
//   })

//   function handleFieldsChange(event) {
//     setFieldsData(oldFieldsData => {
//       return {
//         ...oldFieldsData,
//         [event.target.name]: event.target.value
//       }
//     })
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     mutate(fieldsData)
//   }

//   React.useEffect(() => {
//     if(localStorage.getItem("user-jwt")){
//         setSplashActive(true)
//         setShowSplash(true);
//         if(splashActive){
//             setTimeout(() => {
//                 setShowSplash(false);
//                 setConfirmImageClass("completed-image show");
//                 setTimeout(() => {
//                     navigate("/");
//                 }, 2000)
//             }, 2000)
//         }
//     }
//   })
  

//   return (
//     <div isSplashActive={splashActive}>
//         {
//       splashActive ?
      
//       <div className="splash-screen">
//         <img src={splashkini} className={confirmImageClass}></img>
//       </div >
                  
//         :
        
//         <div className='relative m-0 p-0'>
//       <img src={LogImage} alt="Login Image" className='w-[100%] h-[100vh]'/>
//       <div className='p-10 bg-whiteColor absolute top-[25%] right-[25%] w-[50%] h-max rounded-md text-center'>

//         <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Welcome Back, <span className='text-secondaryColor font-bold'>Login</span></h1>
        
//         <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
                
//           {
//             errorMessage &&
//             <p style={{color: 'red'}}>{errorMessage}</p>
//           }
                
//           <input type="email" name="email" onChange={handleFieldsChange} required value={fieldsData.email} placeholder='Email' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor'/>
//           <input type="password" name="password" onChange={handleFieldsChange} value={fieldsData.password} placeholder='Password' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor'/>
//           <button type="submit" className='btnbtn p-3 rounded-md border bg-textColor text-whiteColor w-full text-xl hover:bg-secondaryColor hover:text-whiteColor'>Sign In</button>
//         </form>

//         <h1 className='mt-5 text-xl'>Don't Have an Account? - <Link to="/register" className='text-secondaryColor'>Register</Link></h1>

//       </div>
//     </div>
//     }
    
//     </div>
  
//   )
// }

// export default Login











import React, { useState, useEffect } from 'react';
import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMutation } from "react-query";
import splashkini from "../../Assets/Images/seongmin-park-p1qYb9pvLPU-unsplash.jpg";

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
          <div className='p-10 bg-whiteColor absolute top-[25%] right-[25%] w-[50%] h-max rounded-md text-center'>
            <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Welcome Back, <span className='text-secondaryColor font-bold'>Login</span></h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <input type="email" name="email" onChange={handleFieldsChange} required value={fieldsData.email} placeholder='Email' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor' />
              <input type="password" name="password" onChange={handleFieldsChange} value={fieldsData.password} placeholder='Password' className='p-2 w-full rounded-md outline-0 bg-transparent border border-textColor focus:border-secondaryColor' />
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

