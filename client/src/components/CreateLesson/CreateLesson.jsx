import styles from "./CreateLesson.module.css";
import axios from "axios";

import { useState } from "react";
import { validate } from "./Validation";

const CreateLesson = () => {
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [dias, setDias] = useState([]);
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    effort: "",
    goals: "",
    shortDescription: "",
    scheduleDays: [],
    scheduleHours: "",
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    effort: "",
    goals: "",
    shortDescription: "",
    scheduleDays: [],
    scheduleHours: "",
    types: [],
  });
  //!FUNCIONES
  const submitHandler = (e) => {
    e.preventDefault();
    form.scheduleDays = dias;
    form.types = types;
    form.scheduleHours = horaInicio + "-" + horaFin;
    axios
      .post("http://localhost:3001/lessons/create", form)
      .then((res) => {
        alert("Lesson creada correctamente");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;

          alert("Debe completar los campos obligatorios");
        } else {
          alert(`Error: ${error.message}`);
        }
      });
  };

  const changeHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setForm({ ...form, [field]: value });
  };

  const blurHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    if (!value) {
      setErrors({ ...errors, [field]: "" });
    }
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
  const handleDiaChange = (e) => {
    const dia = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setDias((dias) => [...dias, dia]);
    } else {
      setDias((dias) => dias.filter((d) => d !== dia));
    }
  };
  const handleTypeChange = (e) => {
    const type = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setTypes((types) => [...types, type]);
    } else {
      setTypes((types) => types.filter((t) => t !== type));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crear clase</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.individual}>
          <label>Nombre</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div className={styles.individual}>
          <label>Descripción</label>
          <input
            name="description"
            type="text"
            value={form.description}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
        </div>
        <div className={styles.individual}>
          <label>ShortDescripción</label>
          <input
            name="shortDescription"
            type="text"
            value={form.shortDescription}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
        </div>

        <div className={styles.individual}>
          <label>Intensidad</label>
          <input
            name="effort"
            type="text"
            value={form.effort}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {errors.effort && <div style={{ color: "red" }}>{errors.effort}</div>}
        </div>
        <div className={styles.individual}>
          <label>Objetivos</label>
          <input
            name="goals"
            type="text"
            value={form.goals}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {errors.goals && <div style={{ color: "red" }}>{errors.goals}</div>}
        </div>

        <div className={styles.individual}>
          <label>Hora inicio</label>
          <select onChange={(e) => setHoraInicio(parseInt(e.target.value))}>
            <option value="">Seleccione...</option>
            {[...Array(24)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}:00
              </option>
            ))}
          </select>
        </div>

        <div className={styles.individual}>
          <label>Hora fin</label>
          <select onChange={(e) => setHoraFin(parseInt(e.target.value))}>
            <option value="">Seleccione...</option>
            {generateHourOptions()}
          </select>
        </div>

        <div className={styles.individual}>
          <label>Días</label>
          <div className={styles.dias}>
            {[
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
              "Domingo",
            ].map((dia) => (
              <div key={dia}>
                <label>
                  <input
                    type="checkbox"
                    value={dia}
                    onChange={handleDiaChange}
                  />
                  {dia}
                </label>
              </div>
            ))}
          </div>
          {errors.scheduleDays && (
            <div style={{ color: "red" }}>{errors.scheduleDays}</div>
          )}
        </div>
        <div className={styles.individual}>
          <label>Types</label>

          <div className={styles.dias}>
            {[
              "Cardio",
              "Flexibilidad",
              "Coordinación",
              "Movilidad",
              "Relajación",
              "Resistencia",
              "Agilidad",
              "Potencia",
              "Fuerza",
              "Equilibrio",
              "Velocidad",
              "Estiramiento",
            ].map((type) => (
              <div key={type}>
                <label>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleTypeChange}
                  />
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateLesson;
