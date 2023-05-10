import style from './Gallery.module.css';
import arrow from '../../assets/icons/arrow-white.png'
const Gallery = () => {
    return (
        <div className={style.DivContainer}>

            <div className={style.ImageContainer}>
                <div className={style.messageContainer}>

                    <h2>Supera tus límites</h2>
                    <button className={style.btnPlanes}>Mira nuestros planes</button>


                <div className={style.Arrows}>
                    <img src={arrow} alt='Flecha de navegación' className={style.ArrowLeft}/>
                    <h2>1/8</h2>
                        <img src={arrow} alt='Flecha de navegación' className={style.ArrowRight}/>
                    </div>

                    </div>
                </div>
            </div>
                    

        )
    }
    export default Gallery;