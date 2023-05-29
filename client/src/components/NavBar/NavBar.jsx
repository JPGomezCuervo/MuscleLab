import React from "react";
import style from "./NavBar.module.css";
import iconMan from "../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import menuIcon from "../../assets/icons/menu.png"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlansCLick } from "../../redux/features/utilsSlice";
import SignUp from "../SignUp/SignUp";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import adminIcon from "../../assets/icons/admin.png";
import jwt_decode from "jwt-decode";
import {useState, useRef} from "react"

let isAdmin = false; // Declaración inicial con valor predeterminado
const token = localStorage.getItem("token");

if (token) {
  const decodedToken = jwt_decode(token);
  isAdmin = decodedToken.isAdmin;
} else {
  isAdmin = false; // Establecer isAdmin en false si no hay token
}
const NavBar = () => {
  const dispatch = useDispatch();

  const handleClickLogo = () => {
    window.location.href = "/";
  };
  const handleClickPlan = () => {
    dispatch(setPlansCLick(true));
  };
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
            alt=""
          />
          <h2>Muscle Lab</h2>
          <img
            className={style.IconWeight}
            src={iconWeight}
            alt="Icono de pesa"
          />
        </div>
        


        <input type="checkbox" className={style.Checkbox} name="checkbox" id="checkbox"/>
        <label className={style.Label} htmlFor="checkbox">
          <img src={menuIcon} alt="" />
        </label>

        <div className={style.DropMenuPhoneContainer}>
            <ul className={style.OptionsContainer}>
          {/* <Link to={"/login"}> */}

          {token && (
            <li className ={style.LogOpcion1}>
                <Link to="dashboard/clases">
                  <button className={style.btnRegistro1}>dashboard</button>
                </Link>
            </li>
          )}
          {token && (
            <li className ={style.LogOpcion1}>
                <Link to="/profile">
                  <button className={style.btnRegistro1}>Mi Perfil</button>
                </Link>
            </li>
          )}
          {token ? (
            <li className ={style.LogOpcion1}>
              <Link to="/login">
                <button className={style.btnRegistro1} onClick={handleLogOut}>
                  Cerrar sesion
                </button>
              </Link>
            </li>
          ) : (
            <li className ={style.LogOpcion1}>
              <Link to="/login">
                <button className={style.btnRegistro1} onClick={handleLogOut}>
                  Iniciar sesión
                </button>
              </Link>
            </li>
          )}

              <li>
                <Link to={"/sedes"}>
                  <p className={style.Navbutton}>Sedes</p>
                </Link>
              </li>

              <li>
                <a className={style.Navbutton} href="http://localhost:3000/clases">
                  <p>Clases</p>
                </a>
              </li>

              <li>
                <Link to={"/nosotros"}>
                  <p className={style.Navbutton}>Nosotros</p>
                </Link>
              </li>

              <li>
                <Link to={"/contactanos"}>
                  <p className={style.Navbutton}>Contáctanos</p>
                </Link>
              </li>

            </ul>

        </div>
        
        <Link to={"/"} className={style.btnPlanes} onClick={handleClickPlan}>
          <button className={style.btnPlanes}>Planes</button>
        </Link>

        <div className={style.LogOpcions}>
          {/* <Link to={"/login"}> */}

          {token && (
            <Link to="dashboard/clases">
              <button className={style.btnRegistro1}>dashboard</button>
            </Link>
          )}
          {token && (
            <Link to="/profile">
              <button className={style.btnRegistro1}>Mi Perfil</button>
            </Link>
          )}
          {token ? (
            <Link to="/login">
              <button className={style.btnRegistro1} onClick={handleLogOut}>
                Cerrar sesion
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className={style.btnRegistro1} onClick={handleLogOut}>
                Iniciar sesión
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
