import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./SedesDashEditar.module.css";
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { validate } from "../SedesDashCrear/validation";
import { weekDays } from "../../utils/constants";
const SedesDashEditar = () => {
  const params = useParams();
  const sId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/branchoffice/${sId}`)
      .then((response) => {
        setSedes({
          name: response.data.branchoffice.name,
          location: response.data.branchoffice.location,
          scheduleDays: response.data.branchoffice.scheduleDays,
          scheduleHourStart: response.data.branchoffice.scheduleHourStart,
          scheduleHourFinish: response.data.branchoffice.scheduleHourFinish,
        });
        setDias(response.data.branchoffice.scheduleDays);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del objeto:", error);
      });
  }, [sId]);

  const [dias, setDias] = useState([]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [sedes, setSedes] = useState({
    name: "",
    location: "",
    scheduleDays: [],
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

  const navigate = useNavigate();

  // const validarFormulario = () => {
  //   const regexNombre = /^[A-Za-z\s,]+$/;
  //   const regexDireccion = /^[A-Za-z0-9\s]+$/;
  //   const regexDias = /^[A-Za-z\s,]+$/;
  //   const regexHorario = /^\d{2}-\d{2}$/;

  //   let newErrors = {};

  //   if (sedes.name.trim() === "") {
  //     newErrors.name = "El campo de nombre es requerido.";
  //   } else if (!regexNombre.test(sedes.name)) {
  //     newErrors.name = "El nombre debe contener solo letras, espacios y comas.";
  //   }

  //   if (sedes.location.trim() === "") {
  //     newErrors.location = "El campo de dirección es requerido.";
  //   } else if (!regexDireccion.test(sedes.location)) {
  //     newErrors.location =
  //       "La dirección debe contener letras y números sin caracteres especiales.";
  //   }

  //   if (sedes.scheduleDays.trim() === "") {
  //     newErrors.scheduleDays = "El campo de días de atención es requerido.";
  //   } else if (!regexDias.test(sedes.scheduleDays)) {
  //     newErrors.scheduleDays =
  //       "Los días de atención deben contener solo palabras, espacios y comas.";
  //   }

  //   if (sedes.scheduleHours.trim() === "") {
  //     newErrors.scheduleHours = "El campo de horario es requerido.";
  //   } else if (!regexHorario.test(sedes.scheduleHours)) {
  //     newErrors.scheduleHours =
  //       "El horario debe tener el formato HH-HH (por ejemplo, 09-22).";
  //   }

  //   setErrors(newErrors);
  // };

  const guardarCambiosSede = () => {
    console.log(sedes.scheduleHourStart, sedes.scheduleHourFinish);
    if (errors.name || errors.location || !validateHours() || !validatedays()) {
      alert("Debe completar los campos obligatorios y corregir los errores.");
    } else {
      const id = params.id;
      const url = `http://localhost:3001/branchoffice/update/${id}`;
      const confirmacion = window.confirm(
        "¿Estás seguro de guardar los cambios?"
      );
      if (confirmacion) {
        console.log(sedes);
        axios
          .put(url, sedes)
          .then((res) => {
            console.log("Cambios guardados exitosamente");
            alert("Cambios guardados exitosamente");
            navigate("/dashboard/sedes");
          })
          .catch((error) => {
            console.error("Error al guardar los cambios:", error);
            // Manejar el error si es necesario
          });
      } else {
        alert("Acción cancelada");
      }
    }
  };

  const eliminarSede = () => {
    const id = params.id;
    const url = `http://localhost:3001/branchoffice/delete/${id}`;

    // Ventana emergente de confirmación
    const confirmacion = window.confirm(
      "¿Estás seguro de eliminar la sede seleccionada?"
    );

    if (confirmacion) {
      axios
        .delete(url)
        .then((res) => {
          console.log("Sede eliminada exitosamente");
          alert("Sede eliminada exitosamente");
          navigate("/dashboard/sedes");
        })
        .catch((error) => {
          console.error("Error al eliminar la sede:", error);
          // Manejar el error si es necesario
        });
    } else {
      alert("Acción cancelada");
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setSedes({ ...sedes, [field]: value });
    // validarFormulario({
    //   ...sedes,
    //   [e.target.name]: e.target.value,
    // });

    // setSedes({
    //   ...sedes,
    //   [e.target.name]: e.target.value,
    // });
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
  const validateHours = () => {
    if (!sedes.scheduleHourStart) {
      errors.scheduleHourStart = "Debe seleccionar hora de inicio";
      alert("Debe seleccionar hora de inicio");
      return false;
    } else if (!sedes.scheduleHourFinish) {
      errors.scheduleHourFinish = "Debe seleccionar hora de fin";
      alert("Debe seleccionar hora de fin");
      return false;
    } else {
      return true;
    }
  };
  const validatedays = () => {
    if (dias.length !== 0) {
      sedes.scheduleDays = dias;
      return true;
    } else {
      errors.scheduleDays = "Debe seleccionar al menos un día";
      alert("Debe seleccionar al menos un día");
      return false;
    }
  };
  return (
    <>
      <div className={style.BigBigContainer}>
        <div className={style.Navigation}>
          <Link to="/dashboard/sedes">
            <a href="http://localhost:3000/dashboard/sedes">
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
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

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
            <div style={{ color: "red" }}>{errors.location}</div>
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
                    <p>{dia}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={style.Description}>
            <label htmlFor="scheduleHours" className={style.texto}>
              Horario: *
            </label>
            <div className={`${style.HourContainer} ${style.HourContainer1}`}>
              <label className={style.Options}>Hora inicio</label>
              <select
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

          <div className={style.ButtonConteiner}>
            <button onClick={guardarCambiosSede} className={style.SaveButton}>
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={eliminarSede}
              className={style.DeleteButton}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SedesDashEditar;
