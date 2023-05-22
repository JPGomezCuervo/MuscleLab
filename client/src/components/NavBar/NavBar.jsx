import React from "react";
import style from "./NavBar.module.css";
import iconMan from "../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlansCLick } from "../../redux/features/utilsSlice";
import SignUp from "../SignUp/SignUp";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import adminIcon from "../../assets/icons/admin.png";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleClickLogo = () => {
    window.location.href = "/";
  };
  const handleClickPlan = () => {
    dispatch(setPlansCLick(true));
  };

  const {
    loginWithPopup,
    //loginWithRedirect,
    logout,
    user,
    isLoading,
    error,
    isAuthenticated,
    getAccessTokenSilent,
  } = useAuth0();
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav className={style.nav}>
        <div className={style.IconContainer} onClick={handleClickLogo}>
          <img
            className={style.IconMan}
            src={iconMan}
            alt="Icono silueta de hombre"
          />
          <h2>Muscle Lab</h2>
          <img
            className={style.IconWeight}
            src={iconWeight}
            alt="Icono de pesa"
          />
        </div>
        <div className={style.OpcionsContainer}>
          <Link to={"/sedes"}>
            <p className={style.Navbutton}>Sedes</p>
          </Link>

          <a className={style.Navbutton} href="http://localhost:3000/clases">
            Clases
          </a>

          <Link to={"/nosotros"}>
            <p className={style.Navbutton}>Nosotros</p>
          </Link>

          <Link to={"/contactanos"}>
            <p className={style.Navbutton}>Contáctanos</p>
          </Link>
        </div>
        <Link to={"/"} className={style.btnPlanes} onClick={handleClickPlan}>
          <button className={style.btnPlanes}>Planes</button>
        </Link>

        <div className={style.LogOpcions}>
          {/* <Link to={"/login"}> */}
          {token && (
            <Link to="dashboard">
              <button>dashboard</button>
            </Link>
          )}

          <Link to="/login">
            <button className={style.btnRegistro1} onClick={handleLogOut}>
              logout
            </button>
          </Link>
          {!isAuthenticated && (
            <button className={style.btnRegistro1} onClick={loginWithPopup}>
              Sign Up / Login
            </button>
          )}

          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && isAuthenticated && (
            <button className={style.btnRegistro} onClick={logout}>
              Cerrar sesion
            </button>
          )}

          {/* </Link> */}

          {isAuthenticated && (
            <div className={style.userLogin}>
              <span className={style.userName}>
                Hola, {user.name.split(" ")[0]}
              </span>
            </div>
          )}
          {isAuthenticated && (
            <Link to={"/user-face"}>
              <img
                className={style.adminIcon}
                src={adminIcon}
                alt={user.name}
              />
              {/* {<button className={style.btnRegistro}></button>} */}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
