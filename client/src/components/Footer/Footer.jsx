import style from "./Footer.module.css"
import twitter from "../../assets/icons/twitter.png"
import facebook from "../../assets/icons/facebook.png"
import instagram from "../../assets/icons/instagram.png"
import linkedin from "../../assets/icons/linkedin.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOffices, selectAllOffices } from "../../redux/features/officesSlice"
import { useEffect } from "react"
const Footer = () =>{
    const dispatch = useDispatch();
    const sedes = useSelector(selectAllOffices);
     


    useEffect(()=>{
        dispatch(fetchAllOffices())
    }, [dispatch])
    
    return(
        <footer className={style.Footer}>
            <div className={style.IconContainer}>
                <div className={style.TwitterContainer}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img className={`${style.Icon} ${style.Twitter}`} src={twitter} alt='Icono de twitter' />
                    </a>
                </div>
                <div>
                    <a href="https://es-la.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img className={style.Icon} src={facebook} alt='Icono de facebook' />
                    </a>
                </div>
                <div>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img className={style.Icon} src={instagram} alt='Icono de instagram' />
                    </a>
                </div>
                <div className={style.LinkedinContainer}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img className={`${style.Icon} ${style.Linkedin}`} src={linkedin} alt='Icono de linkedin' />
                    </a>
                </div>
            </div>
            <div className={style.InfoContainer}>
                <div className={style.Container}>
                    <div className={style.Info}>
                        <h3>Información</h3>
                        <p>Tel: 8352430032</p>
                        <p>musclelabgym@gmail.com</p>
                        <p>115</p>
                    </div>
                    <div className={style.Info}>
                        <h3>Navegación</h3>
                        <Link to={'/clases'}> <p>Clases</p></Link>
                        <Link to={'/sedes'}> <p>Sedes</p></Link>
                        <Link to={'/contactanos'}> <p>Contáctanos</p></Link>
                    </div>
                    <div className={style.Info}>
                        <h3>Nosotros</h3>
                       <Link to={'/nosotros'}><p>Nosotros</p></Link>
                        <p></p>
                        <p>FAQ</p>
                    </div>
                      <div className={style.Info} >
                        <h3>Sedes</h3>
                        {sedes?.map((sede, index)=> (   
                        <Link to={'sedes'} > <p key={index}>{sede.name}</p></Link>
                        )
                        )}
                    </div>
                                     
                </div>
            </div>
        </footer>
    )
}

export default Footer