import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom component imports
import SharedLayout from './Components/SharedLayout';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Services from './Pages/Services/Services';
import Contact from './Pages/Contact/Contact';
import Prices from './Pages/Prices/Price';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Book from './Pages/Services/Book';
import SharedProfile from './Pages/Profile/SharedProfile';
import MyProfile from './Pages/Profile/MyProfile';
import EditProfile from './Pages/Profile/EditProfile';



// Redux imports
import { setUserLoginDetails } from './Pages/Features/userSlice';
import SharedServiceLayout from './Pages/Services/SharedServiceLayout';
import BookingHistory from './Pages/Profile/BookingHistory';
import ProtectedLogin from './Pages/Login/ProtectedLogin';
import History from './Pages/Profile/History';
import ScrollToTop from './Components/ScrollToTop';


function App() {

  const dispatch = useDispatch();

  async function getUser() {
    const localData = localStorage.getItem("user-jwt");
    const token = JSON.parse(localData);
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
  
    try {
      const response = await axios.get("https://freshfoldserver.onrender.com/api/users/me", config);
      return response.data;
    } catch (error) {
      // Handle the error, e.g., display a message to the user or log it.
      console.error("Error fetching user:", error);
      throw error; // Rethrow the error for React Query to handle.
    }
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
      console.log("user data:", data);
    }
  }, [data, dispatch]);
  
  const initialState = {
    data: {
      _id: null,
    },
  };
  
  return (
    <BrowserRouter>
        <ScrollToTop />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />} />
          <Route path="services" element={<SharedServiceLayout />}>
            <Route index element={<Services />}/>
            <Route path="/services/:serviceId" element={<Book />}/>
          </Route>
          <Route path="prices" element={<Prices />} />
          <Route path="book" element={<Book />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path='profile' element={<SharedProfile />}>
          <Route index element={<MyProfile />} />
          <Route path='editprofile' element={<EditProfile />} />
          <Route path='history'>
            <Route index element={<BookingHistory />} />
            <Route path=':bookingId' element={<History /> } />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />

          <Route path="/login" element={<ProtectedLogin user={data}>
            <Login />
          </ProtectedLogin>} />
        
          <Route path='register' element={<Register />} />
      </Routes>

    
      <ToastContainer position="top-center" autoClose={3000} style={{zIndex: "9999999999999999999999999999999"}} />
    </BrowserRouter>
  );
}

export default App;
