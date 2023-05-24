import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import style from '../UserDetails/UserDetails.module.css'; 


function UserDetails() {
  const { 
  user,
  isAuthenticated,
  } = useAuth0();
  
return (
    
     
    <div className={style.userDetails}>
      {!isAuthenticated && <h3 className={style.userAccessCard}>Acceso denegado...</h3>}
      {isAuthenticated &&
      <div className={style.userDetailsCard}>
        <div className={style.userDetailsHeader}>
          <img src={user.picture} alt="Profile" className={style.userDetailsAvatar} />
          <h2 className={style.userDetailsName}>{user.name}</h2>
          <p className={style.userDetailsEmail}>{user.email}</p>
        </div>

        <div className={style.userDetailsSection}>
          <h3>Acerca de mi:</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  
          </p>
        </div>

        <div className={style.userDetailsSection}>
          <h3>Contacto</h3>
          <p>{user.email}</p>
          <p>{}</p>
        </div>
        <hr/>
          <p></p>
        <div className={style.userDetailsSection}>
          <h3>Tus Planes</h3>
          <ul className={style.userDetailsSkills}>
              <li className={style.userDetailsPlanes}>No tienes Planes activos aun!</li>
          </ul>
          <br/>
          <Link to={'/'}>   
          <button className={style.userBtn1}>Ver todos los planes</button>
          </Link>
        </div>
          <p>Comprar Ahora!</p>
          <Link to={'/clases'}> 
            <button className={style.userBtn1}>Ver todas las clases</button>
          </Link>
          <Link to={'/sedes'}> 
          <p className={style.hq}>Escoge la sede mas cerca de ti!</p>
          </Link>
          <button className={style.userBtn2}>Comprar ahora!</button><br/>
          
          <button className={style.userBtn3}>Ver medios de pago!</button>

        </div>}
      
    </div>
  );
}

export default UserDetails;
