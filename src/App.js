import React from 'react'
import './App.css';
import SharedLayout from './Components/SharedLayout';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Services from './Pages/Services/Services';
import Contact from './Pages/Contact/Contact';
import Prices from './Pages/Prices/Price';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import Book from './Pages/Book/Book'
import SharedProfile from './Pages/Profile/SharedProfile';
import MyProfile from './Pages/Profile/MyProfile';
import EditProfile from './Pages/Profile/EditProfile';
import History from './Pages/Profile/History';

import { useQuery } from 'react-query';
import axios from 'axios';
import { setUserLoginDetails } from './Pages/Features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch();

  async function getUser(){
    const localData = localStorage.getItem("user-jwt");
    const token = JSON.parse(localData);
    const config = {
      headers: {
        'x-auth-token': token
      }
    };
  
  return axios.get("http://localhost:9000/api/users/me", config);
  }

  const localUserData = localStorage.getItem("user-jwt");

  const { data } = useQuery("user", getUser, {
    onSuccess: (success) => console.log(success),
    onError: (error) => console.log(error),
    enabled: localUserData ? true : false
  });

  let user = useSelector((state) => state.user);

  React.useEffect(() => {
    if (data) {
      dispatch(setUserLoginDetails(data.data));
      // console.log()
      console.log("user: ", user);
    }
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="prices" element={<Prices />} />
          <Route path="book" element={<Book />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path='profile' element={<SharedProfile />}>
          <Route index path='myprofile' element={<MyProfile />} />
          <Route path='editprofile' element={<EditProfile />} />
          <Route path='history' element={<History />} />
        </Route>

        <Route path='*' element={<NotFound />} />

        <Route path='login' element={<Login />} />
        {/* <Route path='login' element={<ProtectedLogin user={data} />}>
          <Login />
        </Route> */}
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
