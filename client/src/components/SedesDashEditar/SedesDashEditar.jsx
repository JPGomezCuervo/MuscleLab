import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./SedesDashEditar.module.css";
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { validate } from "../SedesDashCrear/validation";
import { weekDays } from "../../utils/constants";
import { URL } from "../../utils/constants";
import ReactModal from "react-modal";

const SedesDashEditar = () => {
  const params = useParams();
  const sId = params.id;

  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/branchoffice/${sId}`)
      .then((response) => {
        setSedes({
          name: response.data.branchoffice.name,
          location: response.data.branchoffice.location,
          scheduleDays: response.data.branchoffice.scheduleDays,
          scheduleHourStart: response.data.branchoffice.scheduleHourStart,
          scheduleHourFinish: response.data.branchoffice.scheduleHourFinish,
        });
        setDias(response.data.branchoffice.scheduleDays);
        setSedeEditada(response.data.branchoffice);
        setImage(response.data.branchoffice.image)
      })
      .catch((error) => {
        console.error("Error al obtener los datos del objeto:", error);
      });
  }, [sId]);

  const [sedeEditada, setSedeEditada] = useState(null);

  const [dias, setDias] = useState([]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [sedes, setSedes] = useState({
    name: "",
    location: "",
    scheduleDays: "",
    scheduleHourStart: "",
    scheduleHourFinish: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    location: "",
    scheduleDays: "",
    scheduleHourStart: "",
    scheduleHourFinish: "",
  });

  const [modalErrorAbierta, setModalErrorAbierta] = useState(false);
  const [modalConfirmacionAbierta, setModalConfirmacionAbierta] =
    useState(false);
  const [modalConfirmacionAbierta1, setModalConfirmacionAbierta1] =
    useState(false);
  const [modalExitoAbierta, setModalExitoAbierta] = useState(false);
  const [modalCancelacionAbierta, setModalCancelacionAbierta] = useState(false);

  const navigate = useNavigate();

 // Dentro de la función guardarCambiosSedes
  const confirmarGuardarCambios = () => {
    const id = params.id;
    const url = `${URL}/branchoffice/update/${id}`;
    if (!validatedays() || !validateHours() || errors.name || errors.location) {
      console.error("Errores de validación:", errors);
    } else {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("officeAttributes",JSON.stringify(sedes))
    console.log(JSON.stringify(sedes))
    console.log(image)
    axios
      .put(url, formData)
      .then((res) => {
        
        console.log("Cambios guardados exitosamente");
        setModalConfirmacionAbierta(false); // Cierra la ventana modal de confirmación
        // Abre la ventana modal de éxito
      })
      .catch((error) => {
        console.error("Error al guardar los cambios:", error);
        // Manejar el error si es necesario
      });
    setModalExitoAbierta(true);
    navigate("/dashboard/sedes");
  };
  }

  


  const eliminarSede = () => {
    const id = params.id;
    const url = `${URL}/branchoffice/delete/${id}`;

    setModalConfirmacionAbierta1(true); // Abre la ventana modal de confirmación

    axios
      .delete(url)
      .then((res) => {
        console.log("Sede eliminada exitosamente");
        setModalConfirmacionAbierta(false); // Cierra la ventana modal de confirmación
        setModalExitoAbierta(true); // Abre la ventana modal de éxito
      })
      .catch((error) => {
        console.error("Error al eliminar la sede:", error);
        // Manejar el error si es necesario
      });
    navigate("/dashboard/sedes");
  };

  const cancelarEliminar = () => {
    setModalConfirmacionAbierta(false); // Cierra la ventana modal de confirmación
    setModalCancelacionAbierta(true); // Establece la sede editada en null
    navigate("/dashboard/sedes");
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setSedes({ ...sedes, [field]: value });
  };
  const handleDayChange = (e) => {
    const dia = e.target.value;
    const isChecked = e.target.checked;
    let updatedDays = [...sedes.scheduleDays]; // Hacer una copia del array

    if (isChecked) {
      if (!updatedDays.includes(dia)) {
        updatedDays.push(dia); // Modificar la copia del array
      }
    } else {
      updatedDays = updatedDays.filter((d) => d !== dia); // Modificar la copia del array
    }

    setDias(updatedDays); // Actualizar el estado con la copia del array modificado
    setSedes({ ...sedes, scheduleDays: updatedDays });
  };
  const generateHourOptions = () => {
    const options = [];
    for (let i = 1; i <= 24; i++) {
      if (i > horaInicio) {
        options.push(
          <option key={i} value={i}>
            {i}:00
          </option>
        );
      }
    }
    return options;
  };
  // const validateHours = () => {
  //   if (!sedes.scheduleHourStart) {
  //     errors.scheduleHourStart = "Debe seleccionar hora de inicio";
  //     alert("Debe seleccionar hora de inicio");
  //     return false;
  //   } else if (!sedes.scheduleHourFinish) {
  //     errors.scheduleHourFinish = "Debe seleccionar hora de fin";
  //     alert("Debe seleccionar hora de fin");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const validateHours = () => {
    let startError = '';
    let finishError = '';
  
    if (!sedes.scheduleHourStart) {
      startError = "Debe seleccionar hora de inicio";
      alert("Debe seleccionar hora de inicio");
    }
  
    if (!sedes.scheduleHourFinish) {
      finishError = "Debe seleccionar hora de fin";
      alert("Debe seleccionar hora de fin");
    }
  
    setErrors({
      ...errors,
      scheduleHourStart: startError,
      scheduleHourFinish: finishError
    });
  
    return startError === '' && finishError === '';
  };
  


  // const validatedays = () => {
  //   if (dias.length !== 0) {
  //     sedes.scheduleDays = dias;
  //     return true;
  //   } else {
  //     errors.scheduleDays = "Debe seleccionar al menos un día";
  //     alert("Debe seleccionar al menos un día");
  //     return false;
  //   }
  // };

  const validatedays = () => {
    if (dias.length !== 0) {
      const updatedSedes = { ...sedes, scheduleDays: dias };
      setSedes(updatedSedes);
      return true;
    } else {
      setErrors({ ...errors, scheduleDays: "Debe seleccionar al menos un día" });
      return false;
    }
  };
  

  const handleImageChange = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
  
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImage(value)
      setImagePreviewUrl(reader.result);
    };
        
    
    reader.readAsDataURL(value);
  };

  return (
    <>
      <div className={style.BigBigContainer}>
        <div className={style.Navigation}>
          <Link to="/dashboard/sedes">
            <a href={`${URL}/dashboard/sedes`}>
              <img className={style.ArrowIcon} src={arrowIcon} alt="" />
            </a>
          </Link>
          <h1 className={style.tex}>Editar Sede</h1>
        </div>

        <div className={style.MainConteiner}>
          <div className={style.Description}>
            <label htmlFor="name" className={style.texto}>
              Nombre: *
            </label>
            <input
              type="text"
              placeholder="Nombre..."
              value={sedes.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          {errors.name && <div className={style.errores}>{errors.name}</div>}

          <div className={style.Description}>
            <label htmlFor="location" className={style.texto}>
              Dirección: *
            </label>
            <input
              type="text"
              placeholder="Dirección..."
              value={sedes.location}
              onChange={handleChange}
              name="location"
            />
          </div>

          {errors.location && (
            <div className={style.errores}>{errors.location}</div>
          )}

          <div className={style.Description}>
            <label htmlFor="scheduleDays" className={style.texto}>
              Días de atención: *
            </label>
            <div className={style.DaysContainer}>
              {weekDays.map((dia) => (
                <div key={dia}>
                  <label>
                    <input
                      type="checkbox"
                      value={dia}
                      onChange={handleDayChange}
                      checked={sedes.scheduleDays.includes(dia)}
                    />
                    <p className={style.check}>{dia}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={style.Description}>
            <label htmlFor="scheduleHours" className={style.texto}>
              Horario: *
            </label>
            <div className={style.horario}>
              <div className={`${style.HourContainer} ${style.HourContainer1}`}>
                <label className={style.Options}>Hora inicio</label>
                <select
                  className={style.select}
                  value={sedes.scheduleHourStart}
                  onChange={(e) => {
                    setHoraInicio(parseInt(e.target.value));
                    setSedes({
                      ...sedes,
                      scheduleHourStart: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="">Seleccione</option>
                  {[...Array(24)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}:00
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${style.HourContainer} ${style.HourContainer2}`}>
                <label className={style.Options}>Hora fin</label>
                <select
                  className={style.select}
                  value={sedes.scheduleHourFinish}
                  onChange={(e) => {
                    setHoraFin(parseInt(e.target.value));
                    setSedes({
                      ...sedes,
                      scheduleHourFinish: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="">Seleccione</option>
                  {generateHourOptions()}
                </select>
              </div>
            </div>

            <div className={style.FileInput}>
            <label>Imagen*</label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>

          {errors.image && <p className={style.Error}>{errors.image}</p>}

          <div className={style.leftContainer}>
            {imagePreviewUrl && (
              <div className={style.ImageContainer}>
                {sedes.image && (
                  <img src={imagePreviewUrl} alt="Tu imagen" />
                )}
              </div>
            )}
            {sedes.image && (
              <div className={style.ImageContainer}>
                {sedes.image && (
                  <img src={sedes.image} alt="Tu imagen" />
                )}
              </div>
            )}
          </div>

            <button
              onClick={() => {
                if (
                  errors.name ||
                  errors.location ||
                  !validateHours() ||
                  !validatedays()
                ) {
                  setModalErrorAbierta(true); // Abre la ventana modal de error si hay errores
                } else {
                  setModalConfirmacionAbierta(true); // Abre la ventana modal de confirmación
                }
              }}
              className={style.SaveButton}
            >
              Guardar cambios
            </button>

            <div className={style.content}>
              <ReactModal
                isOpen={modalErrorAbierta}
                onRequestClose={() => setModalErrorAbierta(false)}
                contentLabel="Error al guardar cambios"
                className={style.modal}
              >
                <h2 className={style.text}>Error</h2>
                <p className={style.text}>
                  Debe completar los campos obligatorios y corregir los errores.
                </p>
                <button
                  className={style.modalButton}
                  onClick={() => {
                    setModalErrorAbierta(false); // Cierra la ventana modal de error
                  }}
                >
                  Aceptar
                </button>
              </ReactModal>

              <ReactModal
                isOpen={modalConfirmacionAbierta}
                onRequestClose={() => setModalConfirmacionAbierta(false)}
                contentLabel="Confirmar guardar cambios"
                className={style.modal}
              >
                <h2 className={style.text}>Confirmación</h2>
                <p className={style.text}>
                  ¿Estás seguro de guardar los cambios?
                </p>
                <div className={style.botones}>
                  <button
                    onClick={confirmarGuardarCambios}
                    className={style.SaveButton}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setModalConfirmacionAbierta(false)}
                    className={style.SaveButton}
                  >
                    Cancelar
                  </button>
                </div>
              </ReactModal>

              <ReactModal
                isOpen={modalExitoAbierta}
                onRequestClose={() => setModalExitoAbierta(false)}
                contentLabel="Guardado exitoso"
                className={style.modal}
              >
                <h2 className={style.text}>Éxito</h2>
                <p className={style.text}>Cambios guardados exitosamente.</p>
                <button onClick={() => setModalExitoAbierta(false)}>
                  Aceptar
                </button>
              </ReactModal>
            </div>

            <button
              type="button"
              onClick={() => setModalConfirmacionAbierta1(true)}
              className={style.DeleteButton}
            >
              Eliminar
            </button>

            <div className={style.content}>
              <ReactModal
                isOpen={modalConfirmacionAbierta1}
                onRequestClose={() => setModalConfirmacionAbierta1(false)}
                contentLabel="Confirmar eliminación de sede"
                className={style.modal}
              >
                <h2 className={style.text}>Confirmación</h2>
                <p className={style.text}>
                  ¿Estás seguro de eliminar la sede seleccionada?
                </p>
                <div className={style.botones}>
                  <button className={style.DeleteButton} onClick={eliminarSede}>
                    Eliminar
                  </button>
                  <button
                    className={style.SaveButton}
                    onClick={cancelarEliminar}
                  >
                    Cancelar
                  </button>
                </div>
              </ReactModal>
              <ReactModal
                isOpen={modalExitoAbierta}
                onRequestClose={() => setModalExitoAbierta(false)}
                contentLabel="Eliminación exitosa de sede"
                className={style.modal}
              >
                <h2 className={style.text}>Éxito</h2>
                <p className={style.text}>Sede eliminada exitosamente.</p>
                <button
                  className={style.SaveButton}
                  onClick={() => setModalExitoAbierta(false)}
                >
                  Aceptar
                </button>
              </ReactModal>

              <ReactModal
                isOpen={modalCancelacionAbierta}
                onRequestClose={() => setModalCancelacionAbierta(false)}
                contentLabel="Cancelación de eliminación de sede"
                className={style.modal}
              >
                <h2 className={style.text}>Acción cancelada</h2>
                <div className={style.contenedorBoton}>
                  <button
                    className={style.modalButton}
                    onClick={() => setModalCancelacionAbierta(false)}
                  >
                    Aceptar
                  </button>
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SedesDashEditar;
