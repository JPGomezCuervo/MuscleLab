import { useEffect } from "react";
import { URL } from "../../utils/constants";
import decodeJwt from "../../utils/decodejwt";
import style from "../Profile/Profile.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const decoded = decodeJwt(token);
  const nombre = decoded.payload.nombre;
  const id = decoded.payload.id;
  const dispatch = useDispatch();
  const user = useSelector(selectUserByID);

  useEffect(() => {
    dispatch(fetchUserByID(id));
  }, [dispatch, id]);

  const phone = user.phone;
  const isAdmin = user.isAdmin;
  const isMonitor = user.isMonitor;

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={style.container}>
        <div className={style.insignias}>
          {isAdmin ? <span> Admin</span> : <p></p>}
          {isMonitor ? <span> Profesor</span> : <p></p>}
        </div>

        <h1>{nombre}</h1>
        <div className={style.info}>
          <h2>id</h2>
          <p>{id}</p>
        </div>
        <div className={style.info}>
          <h2>Email</h2>
          <p>{user.email}</p>
        </div>
        <div className={style.info}>
          <h2>Numero de teléfono</h2>
          {phone ? <p>phone </p> : <p>No proporcionado</p>}
        </div>
        <hr />
        <Link to={`/profile/editar/${id}`}>
          <button className={style.ButtonEdit}>Editar perfil</button>
        </Link>
      </div>
    </div>
  );
};
export default Profile;
