import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import style from "./SedesDashCrear.module.css";
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { validate } from "./validation";
import { weekDays } from "../../utils/constants";
import { URL } from "../../utils/constants";
const SedesDashCrear = () => {
  const [dias, setDias] = useState([]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
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
    if (!horaInicio) {
      errors.scheduleHourStart = "Debe seleccionar hora de inicio";
      alert("debe seleccionar hora de inicio");
      return false;
    } else if (!horaFin) {
      errors.scheduleHourFinish = "Debe seleccionar hora de fin";
      alert("debe seleccionar hora de fin");
      return false;
    } else {
      sedes.scheduleHourStart = horaInicio;
      sedes.scheduleHourFinish = horaFin;
      return true;
    }
  };
  const handleDayChange = (e) => {
    const dia = e.target.value;
    const isChecked = e.target.checked;
    const updatedDias = isChecked
      ? [...dias, dia]
      : dias.filter((d) => d !== dia);
    setDias(updatedDias);
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
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setSedes({ ...sedes, [field]: value });
  };

  const navigate = useNavigate();

  const crearSede = () => {
    console.log("entramos con", sedes);
    if (!validatedays() || !validateHours() || errors.name || errors.location) {
      console.error("Errores de validación:", errors);
    } else {
      axios
        .post(`${URL}/branchoffice/create`, sedes)
        .then((res) => {
          alert("Sede creada exitosamente");
          // Realizar acciones adicionales después de crear la sede si es necesario
          setSedes({
            name: "",
            location: "",
            scheduleDays: "",
            scheduleHours: "",
          });
          // Redireccionar a la página correspondiente
          navigate("/dashboard/sedes");
        })
        .catch((error) => {
          console.error("Error al crear la sede:", error);
          // Manejar el error si es necesario
        });
    }
  };

  return (
    <div className={style.BigBigContainer}>
      <div>
        <div className={style.Navigation}>
          <a href="http://localhost:3000/dashboard/sedes">
            <img className={style.ArrowIcon} src={arrowIcon} alt="" />
          </a>
          <h1 className={style.tex}>Crear Sede</h1>
        </div>
        <div className={style.MainConteiner}>
          <div className={style.Description}>
            <label htmlFor="name" className={style.texto}>
              Nombre: *
            </label>
            <input
              type="text"
              placeholder="Nombre"
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
              placeholder="Dirección"
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
                <select onChange={(e) => setHoraInicio(parseInt(e.target.value))} className={style.select}>
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
                <select className={style.select} onChange={(e) => setHoraFin(parseInt(e.target.value))}>
                  <option value="">Seleccione</option>
                  {generateHourOptions()}
                </select>
              </div>
            </div>
          </div>


          <button onClick={crearSede} className={style.SaveButton}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SedesDashCrear;
