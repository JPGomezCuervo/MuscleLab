import React from "react";
import style from "./NavBar.module.css";
import iconMan from "../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import menuIcon from "../../assets/icons/menu.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlansCLick } from "../../redux/features/utilsSlice";
import { selectIsActive, setIsActive } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const isAdmin = token ? jwt_decode(token).isAdmin : false;
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsActive);

  const handleClickLogo = () => {
    window.location.href = "/";
  };
  const handleClickPlan = () => {
    dispatch(setPlansCLick(true));
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setIsActive(false));
  };

  return (
    <>
      <nav className={style.nav}>
        <div className={style.IconContainer} onClick={handleClickLogo}>
          <img className={style.IconMan} src={iconMan} alt="" />
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

        {!isActive && (
          <Link to={"/"} className={style.BtnLink} onClick={handleClickPlan}>
            <button className={style.btnPlanes}>Planes</button>
          </Link>
        )}

        {!isActive && !token && (
          <div className={style.LogOptions}>
            <Link className={style.Login} to="/login">
              Iniciar sesión
            </Link>
          </div>
        )}

        {token && !isActive && (
          <div className={style.LogOptions}>
            <Link className={style.Login} to="/profile">
              Mi Perfil
            </Link>
            <Link className={style.Login} to="/login" onClick={handleLogOut}>
              Cerrar Sesión
            </Link>
          </div>
        )}

        {token && isActive && (
          <div className={`${style.LogOptions} ${style.MarginAuto}`}>
            {isAdmin && (
              <div className={`${style.LogOptions} ${style.MarginAuto}`}>
                <Link className={style.Login} to="/dashboard/clases">
                  Dashboard
                </Link>
              </div>
            )}
            <Link className={style.Login} to="/profile">
              Mi Perfil
            </Link>
            <Link className={style.Login} to="/login" onClick={handleLogOut}>
              Cerrar Sesión
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
