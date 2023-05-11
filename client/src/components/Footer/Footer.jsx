import style from "./Footer.module.css"

const Footer = () =>{
    return(
        <footer className={style.Footer}>
            <div className={style.InfoContainer}>
                <div className={style.Container}>
                    <div className={style.Info}>
                        <h3>Información</   h3>
                    </div>
                    <div className={style.Info}>
                        <h3>Navegación</h3>
                    </div>
                    <div className={style.Info}>
                        <h3>Nosotros</h3>
                    </div>
                    <div className={style.Info}>
                        <h3>Sedes</h3>
                    </div>
                    <div className={style.Info}>
                        <h3>Redes Sociales</h3>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer