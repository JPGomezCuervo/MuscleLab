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

  const uncheck = () => {
    document.getElementById("checkbox").checked = false;
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
              <Link className={style.Navbutton} to={"/sedes"} onClick={uncheck}>
                Sedes
              </Link>
            </li>

            <li>
              <Link className={style.Navbutton} to="/clases" onClick={uncheck}>
                Clases
              </Link>
            </li>

            <li>
              <Link
                className={style.Navbutton}
                to={"/nosotros"}
                onClick={uncheck}
              >
                Nosotros
              </Link>
            </li>

            <li>
              <Link
                className={style.Navbutton}
                to={"/contactanos"}
                onClick={uncheck}
              >
                Contáctanos
              </Link>
            </li>
          </ul>
          <div className={style.SpecialLI}>
            {!isActive && !token && (
              <Link className={style.Login} to="/login" onClick={uncheck}>
                Iniciar sesión
              </Link>
            )}

            {token && (
              <Link className={style.Login} to="/profile" onClick={uncheck}>
                Mi Perfil
              </Link>
            )}
          </div>

          <div className={style.SpecialLI}>
            {token && (
              <Link
                className={style.Login}
                to="/login"
                onClick={() => {
                  handleLogOut();
                  uncheck();
                }}
              >
                Cerrar Sesión
              </Link>
            )}
          </div>
        </div>

        {!isActive && (
          <Link to={"/"} className={style.BtnLink} onClick={handleClickPlan}>
            <button className={style.btnPlanes}>Planes</button>
          </Link>
        )}

        {!isActive && !token && (
          <div className={style.LogOptions}>
            <Link className={style.Login} to="/login" onClick={uncheck}> 
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
