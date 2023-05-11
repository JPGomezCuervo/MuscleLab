import style from "./Footer.module.css"

const Footer = () =>{
    return(
        <footer className={style.Footer}>
            <div className={style.InfoContainer}>
                <div className={style.Info}>texto</div>
                <div className={style.Info}>texto</div>
                <div className={style.Info}>texto</div>
                <div className={style.Info}>texto</div>
                <div className={style.Info}>texto</div>
            </div>
        </footer>
    )
}

export default Footer