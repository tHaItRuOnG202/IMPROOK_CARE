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
import Error from "./components/Error";
import Profile from "./components/Profile"
import PhoneVerification from "./components/PhoneVerification"
import PersonalPage from "./components/PersonalPage"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import CollabDoctor from "./components/CollabDoctor";
import MedicalRecord from "./components/MedicalRecord";
import Test from "./components/Test";

export const MyUserContext = createContext();

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
          <Route path='/error' element={<Error />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='phoneverification' element={<PhoneVerification />} />
          <Route path='/register' element={<Register />} />
          <Route path='/personalpage' element={<PersonalPage />} />
          <Route path='/collabdoctor' element={<CollabDoctor />} />
          <Route path='/medicalrecord' element={<MedicalRecord />} />
          <Route path='/test' element={<Test />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;

