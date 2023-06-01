import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import style from "./Users.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "../../redux/features/usersSlice";
import validation from "../CreateUser/validation";
//import Calendar from "../Calendar/Calendar";
import ReactModal from 'react-modal';

const Users = () => {
  //const [ initialServerData, setInitialServerData ] = useState([])

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const users = useSelector(selectAllUsers);

  const [serverResponse, setServerResponse] = useState(true);
  const [userSelectToEdit, setUserSelectToEdit] = useState(null);
 
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [serverResponse]); //eslint-disable-next-line react-hooks/exhaustive-deps
  //
  const [editUser, setEditUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    isMonitor: "",
    //isAdmin: '',
    statusMembershipIdStatus: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    password: "",
    email: "",
    phone: "",
    disabled: false,
    edit: "",
  });

  //Emergent window state
  const [windowVisible, setWindowVisible] = useState(false);

  const openWindowVisible = (event) => {
    const id = event.target.name;
    setWindowVisible(true);

    setUserSelectToEdit(id);
  };

  const closeWindowVisible = () => {
    setWindowVisible(false);
  };

  //Mapping server response by Select All Users

  const mappedUsers =
    users &&
    users.user?.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        isMonitor: user.isMonitor,
        isAdmin: user.isAdmin,
        statusMembershipIdStatus: user.statusMemberShipIdStatus,
        lessonDetails: user.lessonDetails,
      };
    });

  //console.log('usuarios desde FetchInit:',users);
  //console.log('usuariosMapeados:',mappedUsers);

  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [serverResponse1, setServerResponse1] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users1, setUsers1] = useState(users);

 
  const openConfirmModal = (id) => {
    setSelectedUserId(id);
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false);
    setSuccessModalIsOpen(true)
  };


  const closeConfirmModales = () => {
    setConfirmModalIsOpen(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setConfirmModalIsOpen(false);
    navigate("/dashboard/usuarios")
  };

  //Delete user
  // const removeUserHandler = async (event) => {
  //   const id = event.target.name;

  //   let text =
  //     "Esta accion no se podra revertir!\nPulse OK para Aceptar o Cancelar.";
  //   if (window.confirm(text) === true) {
  //     await fetch("https://musclelabii.onrender.com/users/delete/" + id, {
  //       method: "DELETE",
  //     })
  //       .then((response) => setServerResponse(response))
  //       .catch((error) => setServerResponse(error));

  //     alert("Borrado con exito!");
  //   } else {
  //     alert("Cancelado por el usuario");
  //   }
  // };
  //////////////////////////////////////////////////////////////////////
  const removeUserHandler = async () => {
    if (!selectedUserId) {
      return;
    }
  
    //closeConfirmModal(); // Cerrar el modal de confirmación
  
    try {
      const response = await fetch(
        "https://musclelabii.onrender.com/users/delete/" + selectedUserId,
        {
          method: "DELETE",
        }
      );
      const updatedUsers = users1.filter((user) => user.id !== selectedUserId);
setUsers1(updatedUsers);

setServerResponse1(response);

closeConfirmModal(); // Cerrar el modal de confirmación

    } catch (error) {
      setServerResponse1(error);
    }
  };

  /////////////////////////////////////////////////////////////////////////

  const handleChange = (event) => {
    const { id, value } = event.target;

    setEditUser({ ...editUser, [id]: value });

    setErrors(validation({ ...editUser, [id]: value }));
  };

  ///////////////////////////////////////////////////////////

   const editUserHandler = (event) => {
    let text = "Confirmar cambios!! \nPulse OK o Cancelar.";

    if (window.confirm(text) === true) {
      fetch(
        `https://musclelabii.onrender.com/users/update/${userSelectToEdit}`,
        {
          method: "PUT",
          body: JSON.stringify(editUser),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));
    } else {
      alert("Cancelado por el usuario");
    }
    if (serverResponse.response) alert("Accion completada con exito!");
    if (serverResponse.error) alert("Algo salio mal, intente nuevamente");
  };
//////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
  const userFiltered = mappedUsers?.filter(
    (user) => user.id === userSelectToEdit
  );
  //console.log("userselect", userSelectToEdit);
  //console.log("respuesta fetch editar", serverResponse.error);

  return (
    <div className={style.container}>
      <div className={style.container}>
        <h2 className={style.title}>Formulario de Usuarios</h2>

        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.th}>N°</th>
              <th className={style.th}>Nombre:</th>
              <th className={style.th}>Email:</th>
              <th className={style.th}>Teléfono:</th>
              <th className={style.th}>Rol:</th>
              <th className={style.th}>status Membresia:</th>
              <th className={style.th}>
                Acciones: <span className={style.crud1}>CR</span>
                <span className={style.crud2}>U</span>
                <span className={style.crud3}>D</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!mappedUsers?.length ? (
              <div className={style.empty}>
                <p>Upss! No hay usuarios para mostrar!</p>
                <p className={style.loading}>Loading...</p>
              </div>
            ) : (
              mappedUsers.map((user, index) => (
                <tr key={index}>
                  <td className={style.td}>{index + 1}</td>
                  <td className={style.td}>{user.fullName}</td>
                  <td className={style.td}>{user.email}</td>
                  <td className={style.td}>{user.phone}</td>
                  <td className={style.td}>
                    {user.isMonitor ? "Entrenador" : "Deportista"}
                  </td>
                  <td className={style.td}>
                    {user.lessonDetails.length ? "Activo" : "Inactivo"}
                  </td>
                  <td className={style.btnCrud}>
                    <button
                      className={style.btnEditarUsuario}
                      name={user.id}
                      onClick={openWindowVisible}
                    >
                      Editar
                    </button>
                    <button
                      className={style.btnEliminarUsuario}
                      onClick={() => openConfirmModal(user.id)}
                       // Pasar el id directamente al abrir el modal de confirmación
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <ReactModal isOpen={confirmModalIsOpen} onRequestClose={closeConfirmModal} className={style.modal}>
        <h2 className={style.text}>Confirmar acción</h2>
        <p className={style.text}>
          Esta acción no se podrá revertir. ¿Está seguro de que desea eliminar el usuario?
        </p>
        <div className={style.botones}>
          <button onClick={closeConfirmModales} className={style.DeleteButton}>Cancelar</button>
          <button onClick={removeUserHandler} className={style.SaveButton}>Aceptar</button> {/* Llamar a removeUserHandler para borrar el usuario */}
        </div>
      </ReactModal>

      <ReactModal isOpen={successModalIsOpen} onRequestClose={closeSuccessModal} className={style.modal}>
        <h2 className={style.text}>Borrado exitoso</h2>
        <p className={style.text}>El usuario ha sido borrado con éxito.</p>
        <button onClick={closeSuccessModal} className={style.SaveButton}>OK</button>
      </ReactModal>

        <div>
          <Link to={"crear"}>
            <button className={style.btnCrearUsuario}>Crear nuevo</button>
          </Link>
          <Link to="/dashboard/deletedusers">
            <button className={style.btnCrearUsuario}>
              Ver usuarios eliminados
            </button>
          </Link>
        </div>

        {/* Emergent window for user edition */}

        {windowVisible && (
          <div>
            <div className={style.BigBigContainer}></div>
            <div className={style.ventanaEmergente}>
              {userFiltered.map((user, index) => (
                <div className={style.contenido} key={index}>
                  {/*Filtrar Nombre de usuario con filter*/}
                  <h2 className={style.title1}>{user.fullName}</h2>

                  <form onSubmit={(e) => editUserHandler(e)}>
                    <label htmlFor="fullName">Nombre: </label>
                    <p className={style.error}>
                      {errors.edit && errors.fullName}
                    </p>
                    <input
                      type="text"
                      id="fullName"
                      autoComplete="off"
                      placeholder="*Nombre completo"
                      value={editUser.fullName}
                      onChange={(e) => handleChange(e)}
                      className={style.input}
                    />
                    <label className={style.label} htmlFor="password">
                      Password:{" "}
                    </label>
                    <p className={style.error}>
                      {errors.edit && errors.password}
                    </p>

                    <input
                      type="password"
                      id="password"
                      autoComplete="off"
                      placeholder="Password"
                      value={editUser.password}
                      onChange={(e) => handleChange(e)}
                      className={style.input}
                    />
                    <label htmlFor="email">Email:</label>
                    <p className={style.error}>{errors.edit && errors.email}</p>
                    <input
                      type="email"
                      id="email"
                      autoComplete="off"
                      name="email"
                      placeholder="*Correo electronico"
                      value={editUser.email}
                      onChange={(e) => handleChange(e)}
                      className={style.input}
                    />
                    <label htmlFor="phone">Telefono:</label>
                    <p className={style.error}>{errors.edit && errors.phone}</p>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="*Telefono: XXXXXXXXXX "
                      value={editUser.phone}
                      onChange={(e) => handleChange(e)}
                      className={style.input}
                    />

                    {/* <label htmlFor="status">Status:</label>
              <input
                type="text"
                id="status"
                name="status"
                placeholder="*Status digite 'yes' para activacion"
                value={editUser.statusMembershipIdStatus}
                onChange={(e)=>handleChange(e)}
                className={style.input}
              /> */}
                    {errors.edit ? (
                      <p className={style.errorForm}>
                        ⚠️ Revisar inputs antes de enviar! ⚠️
                      </p>
                    ) : (
                      <p className={style.validForm}>
                        Actualizar datos de usuario! ✔️
                      </p>
                    )}
                    <button
                      className={style.save}
                      type="submit"
                      onClick={editUserHandler}
                    >
                      Guardar
                    </button>
                  </form>
                  <button className={style.close} onClick={closeWindowVisible}>
                    Cerrar
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
