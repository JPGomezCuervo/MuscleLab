import style from "./CreateLesson.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLessonTypes, fetchAllLessonTypes } from "../../redux/features/typesSlice";
import { useState, useEffect } from "react";
import { validate } from "./Validation";

const CreateLesson = () => {
  const dispatch = useDispatch();
  const lessonTypes = useSelector(selectAllLessonTypes);
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
  useEffect(() => {
    dispatch(fetchAllLessonTypes());
  }, [dispatch]);
  
  return (
    <div className={style.container}>
      <h1>CREA UNA CLASE</h1>
      <p> Rellena todos los campos del siguiente formulario para crear una clase.</p>
      <form onSubmit={submitHandler} className={style.FormContainer}>
        <div className={style.individual}>
          <label className={style.Label}>Nombre*</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Nombre de la clase"
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div className={style.individual}>
          <label className={style.Label}>Descripción*</label>
          <input
            name="description"
            type="text"
            value={form.description}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Descripción de la clase"
          />
        </div>
        <div className={style.individual}>
          <label className={style.Label}>ShortDescripción*</label>
          <input
            name="shortDescription"
            type="text"
            value={form.shortDescription}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Descripción corta de la clase"
          />
        </div>

        <div className={style.individual}>
          <label className={style.Label}>Intensidad*</label>
          <input
            name="effort"
            type="text"
            value={form.effort}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Intensidad de la clase de 1 a 5"
          />
          {errors.effort && <div style={{ color: "red" }}>{errors.effort}</div>}
        </div>
        <div className={style.individual}>
          <label className={style.Label}>Objetivos*</label>
          <input
            name="goals"
            type="text"
            value={form.goals}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Objetivos de la clase"
          />
          {errors.goals && <div style={{ color: "red" }}>{errors.goals}</div>}
        </div>

        <div className={style.individualHora}>
          <div className={`${style.HourContainer} ${style.HourContainer1}`}>
          <label className= {style.Options}>Hora inicio*</label>
          <select onChange={(e) => setHoraInicio(parseInt(e.target.value))}>
            <option value="">Seleccione...</option>
            {[...Array(24)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}:00
              </option>
            ))}
          </select>
          </div>
          
          <div className={`${style.HourContainer} ${style.HourContainer2}`}>
            <label className= {style.Options}>Hora fin*</label>
            <select onChange={(e) => setHoraFin(parseInt(e.target.value))}>
              <option value="">Seleccione...</option>
              {generateHourOptions()}
            </select>  
          </div>
        </div>

        <div className={style.individual}>
          <label className= {style.Options}>Días*</label>
          <div className={style.DaysContainer}>
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
                  <p>{dia}</p>
                </label>
              </div>
            ))}
          </div>
          {errors.scheduleDays && (
            <div style={{ color: "red" }}>{errors.scheduleDays}</div>
          )}
        </div>
        <div className={style.individual}>
          <label className= {style.Options}>Types*</label>

          <div className={style.TypesContainer}>
            {lessonTypes.map((type) => {
              return (<div key={type}>
                <label>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleTypeChange}
                  />
                  <p>{type}</p>
                </label>
              </div>)
            })}
          </div>
        </div>
        <button type="submit" className={style.BtnSubmit}>Crear</button>
      </form>
    </div>
  );
};

export default CreateLesson;
