import React from 'react'
import LogImage from "../../Assets/Images/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useMutation } from 'react-query';
import { PiWarningCircle } from "react-icons/pi"
import { FaSoap } from 'react-icons/fa';

function Register() {
  
  const [userSuccess, setUserSuccess] = React.useState("");
  const [userFailed, setUserFailed] = React.useState("");

  async function postUser(fields) {
    try {
      const response = await axios.post("http://localhost:9000/api/users", fields);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
      }
      console.error("Error config:", error.config);
      throw error; // Re-throw the error to propagate it
    }
  }


  const navigate = useNavigate()

  const { mutate, isError, data } = useMutation(postUser, {
    onSuccess: () => {
      setUserSuccess("Registration Successful...");
    },
    onError: (error) => {
      setUserFailed(error.response ? error.response.data : "An error occurred.");
    },
  });
  

   const [fieldsData, setFieldsData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    password: ""
    });

    const [validateFieldsData, setValidateFieldsData] = React.useState({
      firstName: "",
      lastName: "",
      address: "",
      phoneNo: "",
      email: "",
      password: "",
      allData: ""
 })
  
    React.useEffect(() => {
      if(userSuccess){
          setTimeout(() => {
              navigate("/login");
          }, 2000)
      }
    }, [userSuccess])
  
    function handleFieldsChange(event){

      const validateFields = {...validateFieldsData};

      setFieldsData(oldFieldsData => {
          return {
              ...oldFieldsData,
              [event.target.name]: event.target.value
          }
      })

      if (event.target.name === "firstName") {
          if (event.target.value.match(/[@#$!^%*0-9]/) || !event.target.value.trim()) {
            validateFields.firstName = "First name cannot contain numbers or special characters";
          } else {
            validateFields.firstName = "";
          }
      }

      if (event.target.name === "lastName") {
          if (event.target.value.match(/[@#$!^%*0-9]/) || !event.target.value.trim()) {
            validateFields.lastName = "Last name cannot contain numbers or special characters";
          } else {
            validateFields.lastName = "";
          }
      }

      if(event.target.name === "address"){
          if(event.target.value.length < 10){
              validateFields.address = 'Address must have above 10 characters'
          }

          else{
              validateFields.address = "";
          }
          
      }

      if(event.target.name === "password"){
          if(event.target.value.length < 3){
              validateFields.password = "Password must be above 3 characters";
          }

          else if(parseInt(event.target.value.length) >= 3){
              if(!event.target.value.match(/[0-9]/i)){
                  validateFields.password = "Password must contain numbers";
              }
              else if(event.target.value.match(/[0-9]/i)){
                  validateFields.password = "";
                  console.log("password is great")
              }
          }

          else{
              validateFields.password = "";
          }
          
      }

      setValidateFieldsData(validateFields)
  }
  
  function handleSubmit(event){
    event.preventDefault();
    mutate({
        ...fieldsData,
    });
  }
  

  return (
    <div className='relative m-0 p-0 w-[100%] h-[100%]'>
      <img src={LogImage} alt="Login Image" className='w-[100%] h-[100vh]' />
      
      <div className='p-10 bg-whiteColor absolute top-[10%] right-[25%] w-[50%] h-max rounded-md text-center'>

        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-2xl flex justify-center items-center max-sm:text-xl mb-2'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>

        <h1 className="text-headerTextColor font-semibold text-2xl mb-5">Register to Get Started</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>

          {/* Validation Feedbacks */}
          {
            userSuccess ? 
            <p className="text-secon+aryColor">{userSuccess}</p>
            :
            <p className="text-red-500">{userFailed}</p>
          }

          
          <div className='flex items-center gap-2 w-full'>
              <input type="text" name="firstName" onChange={handleFieldsChange} value={fieldsData.firstName} required placeholder='First Name' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
              

            <input type="text" name="lastName" onChange={handleFieldsChange} value={fieldsData.lastName} required id="" placeholder='Last Name' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />

          </div>

          <div className='flex items-center gap-2 w-full'>
            <input type="number" name="phoneNo" onChange={handleFieldsChange} value={fieldsData.phoneNo} required id="" placeholder='Mobile No' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />

            <input type="email" name="email" onChange={handleFieldsChange} value={fieldsData.email} required id="" placeholder='Email' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />
          </div>

            <input type="text" name="address" onChange={handleFieldsChange} value={fieldsData.address} required id="" placeholder='Address' className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />

            <input required={true} type="password" placeholder="Password" name="password" onChange={handleFieldsChange} value={fieldsData.password} className='p-2 w-full rounded-md outline-0 bg-transparent border border-mainColor focus:border-secondaryColor' />

            {
            validateFieldsData.firstName && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.firstName}</p>
          }

          {
            validateFieldsData.lastName && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.lastName}</p>
          }

          {
            validateFieldsData.phoneNo && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.phoneNo}</p>
          }

          {
            validateFieldsData.email && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.email}</p>
          }
          
          {
            validateFieldsData.address && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.address}</p>
          }

          {
            validateFieldsData.password && <p className="text-red-500 flex gap-2 items-center"><PiWarningCircle /> {validateFieldsData.password}</p>
          }

            <button type="submit" className='btnbtnbtn p-3 rounded-md border bg-textColor text-whiteColor w-full text-xl'>Sign Up</button>
        </form>

        <h1 className='mt-2 text-xl'>Already Have an Account? - <Link to="/login" className='text-secondaryColor'>Sign In</Link></h1>

      </div>
    </div>
  )
}

export default Register
