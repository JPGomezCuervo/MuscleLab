import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import style from "./NavBar.module.css";
import iconMan from "./../../assets/icons/man-silhouette.png";
import iconWeight from "../../assets/icons/dumbbell.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlansCLick } from "../../redux/features/utilsSlice";
//import SignUp from "../SignUp/SignUp";
import adminIcon from '../../assets/icons/admin.png'

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
    getAccessTokenSilent } = useAuth0();
         

    // async function callApi() {
    //   await axios.get('http://localhost:3001/')
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))
    // }

    // async function callProtectedApi(){
    //   try {
    //     const token = await getAccessTokenSilent();
    //     const response = await axios.get('http://localhost:3001/protected', {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     })  
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // }
  
  //***Config in backend ***/ 

  // const verifyJwt = jwt(
  //   {
  //     secret: jwks.expressJwtSecret(
  //     {
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: 'url.json-from-account-in-auth0'
  //     }
  //     ),
  //     audience: 'audience-from-index.js-',
  //     issuer: 'issuer-from-account-auth0',
  //     algorithms: ['RS256'],
  //    }
  //    ).unless({ path: ['/']})  
  
  // app.use((req, res, next)=> {
  //   const error = new Error('Not Found')
  //   error.status = 404
  //   next(error)
  // })
  
  //Middleware
  //app.use(verifyJwt)
 
  //***Route example in server  */ 
  // app.get('/protected'), async (req, res) => {
  //   try {
  //     const accessToken = req.headers.authorization.split('')[1]
  //     const response => await axios.get("'issuer-from-account-auth0'/'userinfo'",{
  //       header: {
  //         authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //     const userinfo = response.data
  //     console.log(userinfo)
  //     res.send(user.req)    
  //   } catch (error) {
      
  //   }
  // }
  
  //******************** */

  
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
          
        { !isAuthenticated && (<button className={style.btnRegistro1} onClick={loginWithPopup}>Sign Up / Login</button>)}

        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && isAuthenticated &&  (<button className={style.btnRegistro} onClick={logout}>Cerrar sesion</button>)}
             
         {/* </Link> */}

        { isAuthenticated &&  
          (
            <div className={style.userLogin}>
              <span className={style.userName}>Hola, {user.name.split(' ')[0]}</span>
            </div> 
          )
        }
        {
          isAuthenticated &&(
          <Link to={"/user-face"}>
          <img className={style.adminIcon} src={adminIcon} alt={user.name}/>
          {/* {<button className={style.btnRegistro}></button>} */}
        </Link>)
        }
          
        </div>
      </nav>
    </>
  );
};

export default NavBar;
