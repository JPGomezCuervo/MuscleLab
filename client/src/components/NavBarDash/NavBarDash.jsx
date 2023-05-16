import style from "./NavBarDash.module.css";
import iconMan from '../../assets/icons/man-silhouette.png';
import iconWeight from '../../assets/icons/dumbbell.png';
import locationIcon from '../../assets/icons/locations.png'
import usersIcon from '../../assets/icons/users.png'
import TeachersIcon from '../../assets/icons/teachers.png'
import lessonsIcon from '../../assets/icons/lessons.png'
import MemberShipsIcon from '../../assets/icons/memberships.png'


const NavBardDash = () => {
    return(
        <nav className={style.NavBarDash}>
            <div className={style.IconContainer}>
                <img className={style.IconMan} src={iconMan} alt='Icono silueta de hombre' />
                <h2>Muscle Lab</h2>
                <img className={style.IconWeight} src={iconWeight} alt='Icono de pesa' />               
            </div>
            <h2 className={style.Title}>Dashboard</h2>

            <div className={`${style.OptionContainer} ${style.OptionContainerMember}`}>
                <img className={`${style.OptionImg} ${style.MemberIcon}`} src={MemberShipsIcon} alt="Membresias"/>
                <h3>Membresias</h3>
            </div>
                
            <div className={style.OptionContainer}>
                <img className={`${style.OptionImg} ${style.LocateIcon}`} src={locationIcon} alt="Sedes"/>
                <h3>Sedes</h3>
            </div>

            <div className={style.OptionContainer}>
                <img className={style.OptionImg} src={usersIcon} alt="Usuarios"/>
                <h3>Usuarios</h3>
            </div>

            <div className={style.OptionContainer}>
                <img className={style.OptionImg} src={TeachersIcon} alt="Profesores"/>
                <h3>Profesores</h3>
            </div>

            <div className={`${style.OptionContainer} ${style.OptionContainerLessons}`}>
                <img className={`${style.OptionImg} ${style.LessonIcon}`} src={lessonsIcon} alt="Clases" />
                <h3>Clases</h3>
            </div>

            <button>
                Página principal
            </button>
            
        </nav>
    )
}

export default NavBardDash