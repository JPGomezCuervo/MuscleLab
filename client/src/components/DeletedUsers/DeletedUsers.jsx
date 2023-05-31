import { useDispatch, useSelector } from "react-redux";
import style from "../DeletedUsers/DeletedUsers.module.css";
import {
  fetchDeletedUsers,
  selectDeletedUsers,
} from "../../redux/features/usersSlice";
import axios from "axios";
import { URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import trash from "../../assets/icons/undo.png";
const DeletedUsers = () => {
  const dispatch = useDispatch();
  const deleted = useSelector(selectDeletedUsers);
  const users = deleted.user;
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    dispatch(fetchDeletedUsers());
    setRestored(false);
  }, [dispatch, restored]);

  const handleRestore = async (userId) => {
    console.log("vas a restaurar el elemento");
    const response = await axios.put(`${URL}/users/restore/${userId}`);
    alert("Usuario restaurado con éxito");
    setRestored(true);
  };

  return (
    <div className={style.MainContainer}>
      <div className={style.Navigator}>
        <h2>Usuarios Suspendidos</h2>
      </div>
      <div className={style.TitleContainer}>
        <h2 className={`${style.Title} ${style.Info}`}> Email</h2>
        <h2 className={`${style.Title} ${style.Info}`}> Nombre</h2>
        <h2 className={`${style.Title} ${style.Info}`}> Fecha de suspensión</h2>
      </div>
      <div className={style.BGContainer}>
        <div className={style.Container}>
          {users?.map((user) => (
            <div className={style.SectionContainer}>
              <div className={style.InfoNameContainer}>
                <h2 className={style.InfoName}>{user.email}</h2>
                <h2 className={style.InfoName}>{user.fullName}</h2>
                <h2 className={style.InfoName}>
                  {user.deletedAt.split("T")[0].split("-").reverse().join("-")}
                </h2>
                <img
                  className={style.img}
                  src={trash}
                  alt="trash"
                  onClick={() => handleRestore(user.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DeletedUsers;
