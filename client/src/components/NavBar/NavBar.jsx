import React from "react";
import style from "./NavBar.module.css";
import iconMan from "../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import menuIcon from "../../assets/icons/menu.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlansCLick } from "../../redux/features/utilsSlice";
import SignUp from "../SignUp/SignUp";
import axios from "axios";
import adminIcon from "../../assets/icons/admin.png";
import jwt_decode from "jwt-decode";
import { useState, useRef } from "react";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const isAdmin = token ? jwt_decode(token).isAdmin : false;
  const dispatch = useDispatch();

  const handleClickLogo = () => {
    window.location.href = "/";
  };
  const handleClickPlan = () => {
    dispatch(setPlansCLick(true));
  };
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

        <input
          type="checkbox"
          className={style.Checkbox}
          name="checkbox"
          id="checkbox"
        />
        <label className={style.Label} htmlFor="checkbox">
          <img src={menuIcon} alt="" />
        </label>

        <div className={style.DropMenuPhoneContainer}>
          <ul className={style.OptionsContainer}>
            <li>
              <Link to={"/sedes"}>
                <p className={style.Navbutton}>Sedes</p>
              </Link>
            </li>

            <li>
              <a className={style.Navbutton} href="/clases">
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
          {isAdmin && (
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
