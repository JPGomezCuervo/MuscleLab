import style from "./AdminBar.module.css"
import adminIcon from '../../assets/icons/admin.png'

const AdminBar = () => {

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };
    return(
        <div className= {style.Container}>
            <div className={style.Bar}>
                <img src={adminIcon} alt="Admin" />
                <select name="lolis" id="">
                <option value=""  selected={true} >Administrador</option>
                <option value="" onClick={handleLogOut}>Cerrar sesión</option>
                </select>
            </div>
        </div>
    )
}

export default AdminBar;