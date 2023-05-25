import React from "react";
import style from "./SedesDash.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllOffices,
  selectAllOffices,
  clearOffice,
  selectStatus
  
} from "../../redux/features/officesSlice";
import edit from "../../assets/icons/edit.png";
import trash from "../../assets/icons/trash-bin.png";
import { URL } from "../../utils/constants";
import loadingGif from '../../assets/gifs/loading.gif'

const SedesDash = () => {
  const sedes = useSelector(selectAllOffices);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllOffices());
  }, [dispatch]);

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

  const removeSedeHandler = async (id) => {
    const confirmation = window.confirm(
      "Esta acción no se podrá revertir!\nPulse OK o Cancelar."
    );

    if (confirmation) {
      try {
        await fetch(`${URL}/branchoffice/delete/${id}`, { method: "DELETE" });

        alert("Borrado con éxito!");

        dispatch(clearOffice(id));
      } catch (error) {}
    } else {
      alert("Cancelado por el usuario");
    }
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
        {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
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
