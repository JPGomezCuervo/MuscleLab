import style from "./AdminBar.module.css"
import adminIcon from '../../assets/icons/admin.png'

const AdminBar = () => {
    return(
        <div className= {style.Container}>
            <div className={style.Bar}>
                <img src={adminIcon} alt="Admin" />
                <select name="" id="">
                    <option value="">Administrador</option>
                </select>
            </div>
        </div>
    )
}

export default AdminBar;