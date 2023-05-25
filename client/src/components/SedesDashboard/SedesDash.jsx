import React from "react";
import style from "./SedesDash.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

import {
  fetchAllOffices,
  selectAllOffices,
  clearOffice,
} from "../../redux/features/officesSlice";
import edit from "../../assets/icons/edit.png";
import trash from "../../assets/icons/trash-bin.png";
import { URL } from "../../utils/constants";

const SedesDash = () => {
  const sedes = useSelector(selectAllOffices);

  const dispatch = useDispatch();

  const [serverResponse, setServerResponse] = useState(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationId,setConfirmationId] = useState(null);
  const [confirmationType,setConfirmationType] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOffices());
  }, [dispatch, serverResponse]);

  // const removeSedeHandler = async (id) => {
  //   //const id = event.target.name;
  //   let text = "Esta acción no se podrá revertir!\nPulse OK o Cancelar.";
  //   if (true) {
  //     //console.log(id);
  //     // Eliminar directamente del servidor
  //    await fetch("https://musclelabii.onrender.com/branchoffice/delete/" + id, { method: "DELETE" })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           // Eliminación exitosa
  //           setServerResponse(true);
  //           alert("Borrado con éxito!");

  //           dispatch(clearOffice(id));
  //         } else if (response.status === 400) {
  //           // Error en el servidor
  //           setServerResponse(false);
  //           return response.json();
  //         } else {
  //           // Otro código de estado
  //           throw new Error("Error de red");
  //         }
  //       })
  //       .then((data) => {
  //         // Manejar el mensaje de error del servidor
  //         if (data && data.error) {
  //         // alert(data.error);
  //         }
  //       })
  //       .catch((error) => {
  //       // alert(error.message);
  //       });
  //   } else {
  //    //alert("Cancelado por el usuario");
  //   }
  // }

  // const removeSedeHandler = async (id) => {
  //   const confirmation = window.confirm(
  //     "Esta acción no se podrá revertir!\nPulse OK o Cancelar."
  //   );

  //   if (confirmation) {
  //     try {
  //       await fetch(`${URL}/branchoffice/delete/${id}`, { method: "DELETE" });

  //       setServerResponse(true);
  //       alert("Borrado con éxito!");

  //       dispatch(clearOffice(id));
  //     } catch (error) {}
  //   } else {
  //     alert("Cancelado por el usuario");
  //   }
  // };

  const removeSedeHandler = async (id) => {
    setConfirmationOpen(true);
    setConfirmationId(id);
  };
  
  const handleConfirmation = async (id) => {
  try {
    await fetch(`${URL}/branchoffice/delete/${id}`, { method: "DELETE" });

    setServerResponse(true);
    // Mostrar el mensaje de éxito utilizando un modal de React o cualquier otro componente de notificación.

    dispatch(clearOffice(id));
      setConfirmationType(true)

  } catch (error) {
    // Manejar el error si ocurre.
  }

  setConfirmationOpen(false);
};


  return (
    <div className={style.BigBigContainer}>
      <div className={style.ImageContainer}>
        <div className={style.contNombre}>
          <h1>Sedes</h1>
        </div>
        <hr className={style.hr} />

        <Link to="/dashboard/sedes/crear">
          <button className={style.button}>Crear Sede</button>
        </Link>

        <div className={style.contenedor}>
          {sedes ? (
            sedes?.map((sede) => {
              return (
                <div className={style.todo} key={sede.id}>
                  <div className={style.detalle}>
                    <h2 className={style.texto}>Nombre: {sede.name}</h2>
                    <h2 className={style.texto}>Dirección: {sede.location}</h2>
                    <h2 className={style.texto}>
                      Días: {sede.scheduleDays?.join(", ")}
                    </h2>
                    <h2 className={style.texto}>
                      Horario de atanción: {sede.scheduleHourStart}hs -{" "}
                      {sede.scheduleHourFinish}hs
                    </h2>

                    <div className={style.divCont}>
                      <Link to={`editar/${sede.id}`}>
                        <button className={style.btnIcono1}>
                          <img src={edit} alt="edit" className={style.icono} />
                        </button>
                      </Link>
                      <button
                        className={style.btnIcono2}
                        onClick={() => removeSedeHandler(sede.id)}
                        name={sede.id}
                      >
                        <img src={trash} alt="trash" className={style.icono} />
                      </button>

  <ReactModal  className={style.modal}isOpen={confirmationOpen} onRequestClose={() => setConfirmationOpen(true)}>
  <h2 className={style.text}>Confirmación</h2>
  <p className={style.text}>Esta acción no se podrá revertir!</p>
  <p className={style.text}>Pulse OK o Cancelar.</p>
  <div className={style.botones}>
  <button className={style.SaveButton} onClick={() => handleConfirmation(confirmationId)}>OK</button>
  <button className={style.DeleteButton} onClick={() => setConfirmationOpen(false)}>Cancelar</button>
  </div>
</ReactModal>

<ReactModal  className={style.modal} isOpen={confirmationType} onRequestClose={() => setConfirmationType(true)}>
  <h2 className={style.text}>Confirmación</h2>
  <p className={style.text}>Sede borrada con exito</p>
  
  <div className={style.botones}>
  <button className={style.SaveButton} onClick={() => handleConfirmation(confirmationId)}>OK</button>

  </div>
  </ReactModal>
{/* const handleDeleteOk = ()=>{
  handleConfirmation(confirmationId)
  setConfirmationOpen(false)
} */}

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SedesDash;
