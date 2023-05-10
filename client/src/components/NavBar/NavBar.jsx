import React from "react";
import style from "./NavBar.module.css";
import iconMan from "./../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import { Link } from "react-router-dom";

const NavBar = ()=>{


     return (
        <>
        <nav className={style.nav}>
            <div className={style.IconContainer}>
                <img className={style.IconMan} src={iconMan} alt="" />
                <h2>Muscle Lab</h2>
                <img className={style.IconWeight} src={iconWeight} alt="" />
                
            </div>
            <div className={style.OpcionsContainer}>
                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Sedes</p>
                </Link>

                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Clases</p>
                </Link>

                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Nosotros</p>
                </Link>

                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Contáctanos</p>
                </Link>

            </div>
            <button className={style.btnPlanes}>Planes</button>

            <div className={style.LogOpcions}>
                <button className={style.btnInicioSesion}>Iniciar sesión</button>
                <button className={style.btnRegistro}>Regístrate</button>
            </div>
            
        </nav>
        
        </>
     )
}


export default NavBar;


