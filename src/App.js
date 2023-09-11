import './App.css';
import SharedLayout from './Components/SharedLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
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
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
