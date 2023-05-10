import React from 'react';
import style from './NavBar.module.css';
import iconMan from './../../assets/icons/man-silhouette.png';
import iconWeight from '../../assets/icons/dumbbell.png';
import { Link } from 'react-router-dom';

const NavBar = ()=>{


     return (
        <>
        <nav className={style.nav}>
            <div className={style.IconContainer}>
                <img className={style.IconMan} src={iconMan} alt='Icono silueta de hombre' />
                <h2>Muscle Lab</h2>
                <img className={style.IconWeight} src={iconWeight} alt='Icono de pesa' />
                
            </div>
            <div className={style.OpcionsContainer}>
                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Sedes</p>
                </Link>

                <Link to = {'/clases'}>
                    <p className={style.Navbutton}>Clases</p>
                </Link>

                <Link to = {'/nosotros'}>
                    <p className={style.Navbutton}>Nosotros</p>
                </Link>

                <Link to = {'/contactanos'}>
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





// /* Logo */

// position: absolute;
// width: 184px;
// height: 82px;
// left: -4px;
// top: 12px;



// /* muscular-man-flexing-silhouette 1 */

// position: absolute;
// width: 77px;
// height: 81px;
// left: -4px;
// top: 13px;

// background: url(muscular-man-flexing-silhouette.png);


// /* Muscle Lab */

// position: absolute;
// width: 117px;
// height: 75px;
// left: 63px;
// top: 12px;

// font-family: 'Montserrat';
// font-style: normal;
// font-weight: 800;
// font-size: 30px;
// line-height: 37px;

// color: #FFFFFF;



// /* dumbbell 1 */

// position: absolute;
// width: 37px;
// height: 37px;
// left: 131px;
// top: 45px;

// background: url(dumbbell.png);

