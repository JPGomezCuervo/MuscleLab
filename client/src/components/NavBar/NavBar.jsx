import React from "react";
import logo from "../../assets/icons/Muscle.png"
import style from "./NavBar.module.css"

const NavBar = ()=>{


     return (
        <>
        <nav className={style.nav}>
        
            <div>
            <img src={logo} alt="logo" className={style.img}
            />
           
            </div>

            <div>
            <button className={style.button}>Sedes</button>
            </div>

            <div>
            <button className={style.button}>Clases</button>
            </div>

            <div>
            <button className={style.button}>Nosotros</button>
            </div>

            <div>
            <button className={style.button}>Contactanos</button>
            </div>
            

            
            <div>
            <button className={style.btnPlanes}>Planes</button>
            </div>

            <div>
            <button className={style.button}>Iniciar sesión</button>
            </div>

            <div>
            <button className={style.btnRegistro}>Registrate</button>
            </div>
            
        </nav>
        
        </>
     )
}


export default NavBar;


