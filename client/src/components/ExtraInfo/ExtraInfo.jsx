import style from './ExtraInfo.module.css';
import iconWeight from '../../assets/icons/dumbbell.png'
const ExtraInfo = () => {
    return (
        <>
            <div className= {style.Title}>¿Por qué escogernos?</div>
            <div className= {style.Container}>

                <div className= {style.BoxLeft}>
                    <img src={iconWeight} alt="Icono de pesas" />
                    <h2>Nos ajustamos </h2>
                    <h2>a tus horarios</h2>
                    <h3>En Muscle Lab te entendemos y por eso ofrecemos una amplia gama de clases, sedes, y horarios</h3>
                    <button>Encuentra tu sede</button>
                </div>

                <div className= {style.BoxRight}>
                    
                </div>

            </div>
        </>
    )
}

export default ExtraInfo