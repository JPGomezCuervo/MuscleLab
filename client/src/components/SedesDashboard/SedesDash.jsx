import React from "react";
import style from "./SedesDash.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

import {
  fetchAllOfficesDashboard,
  selectAllOffices,
  clearOfficeDashboard,
  selectStatus,
} from "../../redux/features/officesDashSlice";
import edit from "../../assets/icons/edit.png";
import trash from "../../assets/icons/trash-bin.png";
import { URL } from "../../utils/constants";
import loadingGif from "../../assets/gifs/loading.gif";

const SedesDash = () => {
  const sedes = useSelector(selectAllOffices);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverResponse, setServerResponse] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);
  const [confirmationType, setConfirmationType] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficesDashboard());
  }, [dispatch]);

  const removeSedeHandler = async (id) => {
    setConfirmationOpen(true);
    setConfirmationId(id);
  };

  const handleConfirmation = async (id) => {
    try {
      await fetch(`${URL}/branchoffice/delete/${id}`, { method: "DELETE" });

      setServerResponse(true);
      dispatch(clearOfficeDashboard(id));
      setConfirmationType(true);
    } catch (error) {
      // Manejar el error si ocurre.
    }

    setConfirmationOpen(false);
  };

  const eliminadoCorrectamente = () => {
    setConfirmationType(false);
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
        {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt="" />}
        <div className={style.contenedor}>
          {sedes ? (
            sedes?.map((sede) => {
              return (
                <div className={style.todo} key={sede.id}>
                  <div className={style.detalle}>
                    <img src={sede.image} alt="imagen" className={style.imagen} />
                    <div className={style.info}>
                      <h2 className={style.texto}>Nombre: {sede.name}</h2>
                      <h2 className={style.texto}>Dirección: {sede.location}</h2>
                      <h2 className={style.texto}>
                        Días: {sede.scheduleDays?.join(", ")}
                      </h2>
                      <h2 className={style.texto}>
                        Horario de atanción: {sede.scheduleHourStart}hs - {sede.scheduleHourFinish}hs
                      </h2>
                    </div>

                    <div className={style.divCont}>
                      <div className={style.botones}>
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

                      <ReactModal
                        className={style.modal}
                        isOpen={confirmationOpen}
                        onRequestClose={() => setConfirmationOpen(true)}
                      >
                        <h2 className={style.text}>Confirmación</h2>
                        <p className={style.text}>Esta acción no se podrá revertir!</p>
                        <p className={style.text}>Pulse OK o Cancelar.</p>
                        <div className={style.botones}>
                          <button className={style.SaveButton} onClick={() => handleConfirmation(confirmationId)}>
                            OK
                          </button>
                          <button className={style.DeleteButton} onClick={() => setConfirmationOpen(false)}>
                            Cancelar
                          </button>
                        </div>
                      </ReactModal>

                      <ReactModal
                        className={style.modal}
                        isOpen={confirmationType}
                        onRequestClose={() => setConfirmationType(true)}
                      >
                        <h2 className={style.text}>Confirmación</h2>
                        <p className={style.text}>Sede borrada con éxito</p>
                        <div className={style.botones}>
                          <button className={style.SaveButton} onClick={eliminadoCorrectamente}>
                            OK
                          </button>
                        </div>
                      </ReactModal>
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
