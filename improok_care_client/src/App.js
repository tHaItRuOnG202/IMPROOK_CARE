import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/Home";
import Login from "./components/Login"
import Register from "./components/Register";
import { createContext } from "react";
import { useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import cookie from "react-cookies"
import Admin from "./components/Admin/Admin";
import Doctor from "./components/Doctor/Doctor";
import Profile from "./components/Profile"
import Booking from "./components/Booking"
import PhoneVerification from "./components/PhoneVerification"
import PersonalPage from "./components/PersonalPage"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import CollabDoctor from "./components/CollabDoctor";
import MedicalRecord from "./components/MedicalRecord";
import ProfileDoctor from "./components/Doctor/ProfileDoctor";
import Schedule from "./components/Doctor/Schedule";
import ProfileDoctorDetail from "./components/ProfileDoctorDetail";
import BookingDetail from "./components/BookingDetail";
import ChangePassword from "./components/ChangePassword"
import ForgetPassword from "./components/ForgetPassword"
import BookingManagement from "./components/Doctor/BookingManagement";
import Appointment from "./components/Appointment";
import Presciption from "./components/Doctor/Presciption";

export const MyUserContext = createContext();
// export const PhonenumberContext = createContext();

const App = () => {

  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null)

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/phoneverification' element={<PhoneVerification />} />
          <Route path='/register' element={<Register />} />
          <Route path='/personalpage' element={<PersonalPage />} />
          <Route path='/collabdoctor' element={<CollabDoctor />} />
          <Route path='/medicalrecord' element={<MedicalRecord />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/profiledoctor' element={<ProfileDoctor />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/doctor/:profileDoctorId' element={<ProfileDoctorDetail />} />
          <Route path='/booking/doctor/:profileDoctorId' element={<BookingDetail />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/bookingmanagement' element={<BookingManagement />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/prescription' element={<Presciption />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;

