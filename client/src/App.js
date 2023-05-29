import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Lessons from "./components/Lessons/Lessons";
import Footer from "./components/Footer/Footer";
import DetailLesson from "./components/DetailLesson/DetailLesson";
import ContactUs from "./components/ContactUs/ContactUs";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Nosotros from "./components/Nosotros/Nosotros";
import Dashboard from "./components/Dashboard/Dashboard";
import Sedes from "./components/Sedes/Sedes";
import Users from "./components/Users/Users";
import CreateUser from "./components/CreateUser/CreateUser";
import { useSelector } from "react-redux";
import { selectDashAuth } from "./redux/features/authSlice";
import { useEffect } from "react";
import NavBardDash from "./components/NavBarDash/NavBarDash";
import LessonsDash from "./components/LessonsDashboard/LessonsDash";
import AdminBar from "./components/AdminBar/AdminBar";
import Wrapper from "./components/Wrapper/Wrapper";
import TrainerDash from "./components/TrainerDash/TrainerDash";
import EditTrainerDash from "./components/EditTrainerDash/EditTrainerDash";
import CreateTrainerDash from "./components/CreateTrainerDash/CreateTrainerDash";
import UserDetails from "./components/UserDetails/UserDetails";
import SedesDash from "./components/SedesDashboard/SedesDash";
import SedesDashEditar from "./components/SedesDashEditar/SedesDashEditar";
import SedesDashCrear from "./components/SedesDashCrear/SedesDashCrear";
import SedeHomeDetalle from "./components/SedeHomeDetalle/SedeHomeDetalle";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import StripeRender from "./components/StripeRender/StripeRender";
import jwt_decode from "jwt-decode";

import CreatePlan from './components/CreatePlan/CreatePlan'
import PlanDashEditar from './components/EditarPlan/EditarPlan'
import Review from "./components/Review/Review";
import DashPlans from "./components/DashPlans/DashPlans";
import UserUpdate from "./components/UserUpdate/UserUpdate";


function App() {
  const location = useLocation().pathname;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    const decodedToken = jwt_decode(token);
    isAdmin = decodedToken.isAdmin;
  } else {
    isAdmin = false;
  }
  if (!isAdmin && location.includes("dashboard")) {
    navigate("/");
  }

  return (
    <>
      {location.includes("dashboard") && isAdmin ? <NavBardDash /> : <NavBar />}
      {location.includes("dashboard") ? <AdminBar /> : null}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/clases" element={<Lessons />} />
        <Route path="/detail" element={<DetailLesson />} />
        <Route path="/contactanos" element={<ContactUs />} />
        <Route path="/clases/:name" element={<DetailLesson />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/sedes/detalles/:id" element={<SedeHomeDetalle />} />

        
        <Route path="/stripe" element={<StripeRender/>}/>
        {/* <Route path='/dashboard' element={<LessonsDash/>}>
        <Route path= '/dashboard/lessons/detail/:id' element={<LessonsDash/>}/> 
      <Route/>  */}

        {/* {isAdmin ? (
          <> */}
        <Route path="/dashboard" element={<LessonsDash />} />
        <Route path="dashboard/clases" element={<LessonsDash />} />
        <Route path="/dashboard/clases/editar/:id" element={<Wrapper />} />
        <Route path="/dashboard/clases/crear" element={<Wrapper />} />
        <Route path="/dashboard/profesores" element={<TrainerDash />} />
        <Route
          path="dashboard/profesores/crear"
          element={<CreateTrainerDash />}
        />
        <Route
          path="dashboard/profesores/editar/:id"
          element={<EditTrainerDash />}
        />
        <Route path="/dashboard/usuarios" element={<Users />} />
        <Route path="/dashboard/usuarios/crear" element={<CreateUser />} />
        <Route path="/dashboard/sedes" element={<SedesDash />} />
        <Route
          path="/dashboard/sedes/editar/:id"
          element={<SedesDashEditar />}
        />
        <Route path="/dashboard/sedes/crear" element={<SedesDashCrear />} />

        <Route path="/profile/editar/:id" element={<UserUpdate />} />

        <Route path= '/dashboard/plans/crear' element={<CreatePlan/>}/>
      <Route path= '/dashboard/plans/editar/:id' element={<PlanDashEditar/>}/>
      <Route path= '/dashboard/plans' element={<DashPlans/>}/>
      <Route path= '/review' element={<Review />}/>


        {/* </>
        ) : ( */}
        <Route path="/denegado" element={<login />}></Route>
        {/* )} */}

      </Routes>
      {location.includes("dashboard") ? null : <Footer />}
    </>
  );
}

export default App;
