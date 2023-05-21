import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import styles from '../UserDetails/UserDetails.module.css'; 


function UserDetails() {
  const { 
  user,
  isAuthenticated,
  } = useAuth0();
  
return (
    
     
    <div className={styles.userDetails}>
      {!isAuthenticated && <h3 className={styles.userAccessCard}>Acceso denegado...</h3>}
      {isAuthenticated &&
      <div className={styles.userDetailsCard}>
        <div className={styles.userDetailsHeader}>
          <img src={user.picture} alt="Profile" className={styles.userDetailsAvatar} />
          <h2 className={styles.userDetailsName}>{user.name}</h2>
          <p className={styles.userDetailsEmail}>{user.email}</p>
        </div>

        <div className={styles.userDetailsSection}>
          <h3>Acerca de mi:</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  
          </p>
        </div>

        <div className={styles.userDetailsSection}>
          <h3>Contacto</h3>
          <p>{user.email}</p>
          <p>{}</p>
        </div>
        <hr/>
          <p></p>
        <div className={styles.userDetailsSection}>
          <h3>Tus Planes</h3>
          <ul className={styles.userDetailsSkills}>
              <li className={styles.userDetailsPlanes}>No tienes Planes activos aun!</li>
          </ul>
          <br/>
          <Link to={'/'}>   
          <button className={styles.userBtn1}>Ver todos los planes</button>
          </Link>
        </div>
          <p>Comprar Ahora!</p>
          <Link to={'/clases'}> 
            <button className={styles.userBtn1}>Ver todas las clases</button>
          </Link>
          <Link to={'/sedes'}> 
          <p className={styles.hq}>Escoge la sede mas cerca de ti!</p>
          </Link>
          <button className={styles.userBtn2}>Comprar ahora!</button><br/>
          
          <button className={styles.userBtn3}>Ver medios de pago!</button>

        </div>}
      
    </div>
  );
}

export default UserDetails;
