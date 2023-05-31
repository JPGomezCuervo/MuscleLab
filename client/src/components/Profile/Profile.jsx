import { useEffect } from "react";
import { URL } from "../../utils/constants";
import decodeJwt from "../../utils/decodejwt";
import style from "../Profile/Profile.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";
import { Link } from "react-router-dom";
//import Calendar from "../Calendar/Calendar";
import clock from '../../assets/icons/clock.png' 
const Profile = () => {
  const token = localStorage.getItem("token");
  const decoded = decodeJwt(token);
  const dispatch = useDispatch();
  const id = decoded.payload.id;
  useEffect(() => {
    dispatch(fetchUserByID(id));
  }, [dispatch, id]);

  const usuario = useSelector(selectUserByID);
  const suspendido =
    usuario.deletedAt === null || usuario.deletedAt === undefined
      ? false
      : true;
  const user = usuario?.membresia ? usuario.detalle : usuario;
  const membresia = usuario.membresia;
  const isAdmin = decoded.payload.isAdmin;
  const phone = user?.phone;
  const isMonitor = user?.isMonitor;
  const clases = usuario?.detalle?.lessonDetails;

  const getInsigniaColor = () => {
    if (membresia) {
      const name = membresia.name;
      if (name === "Standar") {
        return "#CD7F32";
      } else if (name === "Plus") {
        return "#CCCCCC";
      } else {
        return "#FFD700";
      }
    }
  };
  const getBorderColor = () => {
    if (membresia) {
      const name = membresia.name;
      if (name === "Standar") {
        return "#CD7F32";
      } else if (name === "Plus") {
        return "#CCCCCC";
      } else {
        return "#FFD700";
      }
    }
  };

  return (
    <div className={style.general}>
      <Link to={"/calendar"}>
        <button 
            className={style.btnC}>
        <img className={style.img} 
              src={clock} alt="reloj"/> 
        Calendario</button>
      </Link>
      <div className={style.container}>
        <div className={style.insignias}>
          {suspendido ? <p></p> : isAdmin ? <span> Admin</span> : <p></p>}
          {suspendido ? <p></p> : isMonitor ? <span> Profesor</span> : <p></p>}
          {suspendido ? (
            <span style={{ backgroundColor: "red" }}>Cuenta Suspendida</span>
          ) : (
            <p></p>
          )}
          {membresia ? (
            <span
              style={{
                backgroundColor: getInsigniaColor(),
                border: getBorderColor(),
              }}
            >
              {membresia.name}
            </span>
          ) : (
            <p></p>
          )}
        </div>

        <h1>{user?.fullName}</h1>
        <div className={style.info}>
          <h2>Nombre de Usuario</h2>
          <p>{user?.fullName}</p>
        </div>

        <div className={style.info}>
          <h2>Email</h2>
          <p>{user?.email}</p>
        </div>
        <div className={style.info}>
          <h2>Numero de teléfono</h2>
          {phone ? <p>{user.phone} </p> : <p>No proporcionado</p>}
        </div>
        {usuario?.detalle?.lessonDetails ? (
          <div className={style.info}>
            <h2>Mis Clases</h2>
            {clases.map((clase, index) => (
              <p>{clase.name}</p>
            ))}
          </div>
        ) : (
          <p></p>
        )}

        {membresia ? (
          <div className={style.info}>
            <h2>Membresia {membresia?.name}</h2>
            <div className={style.membInfo}>
              <h3>Inicio: </h3>
              <p>
                {membresia?.start.split("T")[0].split("-").reverse().join("-")}
              </p>
              <h3>Fin: </h3>
              <p>
                {membresia?.end.split("T")[0].split("-").reverse().join("-")}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: "red" }}>No tienes una membresía activa</p>
        )}
        <hr />
        <Link to={`/profile/editar/${id}`}>
          <button className={style.ButtonEdit}>Editar perfil</button>
        </Link>
      </div>
    </div>
  );
};
export default Profile;
