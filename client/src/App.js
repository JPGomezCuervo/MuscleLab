import './App.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Footer from './components/Footer/Footer';
import DetailLesson from './components/DetailLesson/DetailLesson';
import ContactUs from './components/ContactUs/ContactUs'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NewLessons from './components/NewLessons/NewLessons';
import Nosotros from './components/Nosotros/Nosotros';
import Dashboard from './components/Dashboard/Dashboard';
import CreateLesson from "./components/CreateLesson/CreateLesson";
import Sedes from './components/Sedes/Sedes';
import { useSelector } from 'react-redux';
import { selectDashAuth } from './redux/features/authSlice';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavBardDash from './components/NavBarDash/NavBarDash';
import LessonsDash from './components/LesssonsDash/LessonsDash';


function App() {
  const location = useLocation().pathname;
  const dashAuth = useSelector(selectDashAuth);
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
   <>
    {(location.includes('dashboard') ? <NavBardDash/>: <NavBar/>)}
    {(location.includes('dashboard') ? <AdminBar/>: null)}
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path='/clases' element={<Lessons/>}/>
      <Route path= '/detail' element={<DetailLesson/>}/>
      <Route path= '/contactanos' element={<ContactUs />}/>
      <Route path= '/clases/detalles/:id' element={<DetailLesson/>}/>
      <Route path= '/nosotros' element={<Nosotros />}/>
      <Route path="/create" element={<CreateLesson />} />
      <Route path = '/sedes' element= {<Sedes/>}/>
      {/* <Route path='/dashboard' element={<LessonsDash/>}>
        <Route path= '/dashboard/lessons/detail/:id' element={<LessonsDash/>}/> 
      <Route/>  */}
      <Route path = 'dashboard/clases/editar/:id' element={<Wrapper/>}/>
      <Route path = 'dashboard/clases/crear/:id' element={<Wrapper/>}/> 
      
       
    </Routes>
    {(location.includes('dashboard') ? null: <Footer/>)}
  </> 

  );
}

export default App;