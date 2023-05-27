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

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  
const [image, setImage] = useState("");

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

 const navigate = useNavigate();

  const generateHourOptions = () => {
    const options = [];
    for (let i = 1; i <= 24; i++) {
      if (i > parseInt(horaInicio, 10)){
        options.push(
          <option key={i}>
            {i}:00
          </option>
        );
      }
    }
    return options;
  };

  // const validateHours = () => {
  //   if (!horaInicio) {
  //     errors.scheduleHourStart = "Debe seleccionar hora de inicio";
  //     alert("debe seleccionar hora de inicio");
  //     return false;
  //   } else if (!horaFin) {
  //     errors.scheduleHourFinish = "Debe seleccionar hora de fin";
  //     alert("debe seleccionar hora de fin");
  //     return false;
  //   } else {
  //     sedes.scheduleHourStart = horaInicio;
  //     sedes.scheduleHourFinish = horaFin;
  //     return true;
  //   }
  // };

  const validateHours = () => {
    if (!horaInicio) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        scheduleHourStart: "Debe seleccionar hora de inicio",
      }));
      alert("Debe seleccionar hora de inicio");
      return false;
    } else if (!horaFin) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        scheduleHourFinish: "Debe seleccionar hora de fin",
      }));
      alert("Debe seleccionar hora de fin");
      return false;
    } else {
      setSedes((prevSedes) => ({
        ...prevSedes,
        scheduleHourStart: horaInicio,
        scheduleHourFinish: horaFin,
      }));
      return true;
    }
  };
  

  // const handleDayChange = (e) => {
  //   const dia = e.target.value;
  //   const isChecked = e.target.checked;
  //   const updatedDias = isChecked
  //     ? [...dias, dia]
  //     : dias.filter((d) => d !== dia);
  //     console.log(updatedDias)
  //   setSedes({ ...sedes, scheduleDays: updatedDias });}
  const handleDayChange = (e) => {
    const dia = e.target.value;
    const isChecked = e.target.checked;
    let updatedDias = [...dias];
  
    if (isChecked) {
      updatedDias.push(dia);
    } else {
      updatedDias = updatedDias.filter((d) => d !== dia);
    }
  
    console.log(updatedDias); // Verificar si los días se actualizan correctamente
  
    setDias(updatedDias);
    setSedes({ ...sedes, scheduleDays: updatedDias });
  };
  

    // setErrors((prevErrors)=> ({
    //   ...prevErrors,
    //   scheduleDays:"",
    // }))
  
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
      setSedes((prevSedes) => ({
        ...prevSedes,
        scheduleDays: dias,
      }));
      return true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        scheduleDays: "Debe seleccionar al menos un día",
      }));
      alert("Debe seleccionar al menos un día");
      return false;
    }
  };
  

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const fieldErrors = validate(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldErrors[field],
    }));
    
    setSedes({ ...sedes, [field]: value });
  };

  const handleStartHourChange = (e) => {
    const value = e.target.value;
    setSedes({ ...sedes, scheduleHourStart: value });
    setHoraInicio(value);
  };

  const handleFinishHourChange = (e) => {
    const value = e.target.value;
    setSedes({ ...sedes, scheduleHourFinish: value });
    setHoraFin(value);
  };

 

  const crearSede = () => {
    console.log("entramos con", sedes);
    if (!validatedays() || !validateHours() || errors.name || errors.location) {
      console.error("Errores de validación:", errors);
    } else {
     // console.log(sedes)
       const formData = new FormData();
       formData.append("image", image)
       formData.append("officeAttributes",JSON.stringify(sedes))
      // console.log(JSON.stringify(sedes))
       console.log(formData)
      axios
        .post(`${URL}/branchoffice/create`, formData)
        .then((res) => {
          alert("Sede creada exitosamente");
          // Realizar acciones adicionales después de crear la sede si es necesario
          setSedes({
            name: "",
            location: "",
            scheduleDays: "",
            scheduleHourStart: "",
            scheduleHourFinish: "",
            image: null,
          });
          // Redireccionar a la página correspondiente
          navigate("/dashboard/sedes");
        })
       .catch((error)=> {
        console.error("Error al crear la sede:", error);
        // Manejar el error si es necesario
      })
    }
  };
  

  const handleImageChange = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
  
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImage(value);
      setImagePreviewUrl(reader.result);
    };
        
    
    reader.readAsDataURL(value);
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
            <div className={style.SelectorContainer}>
              <div className={`${style.HourContainer} ${style.HourContainer1}`}>
                <label className={style.Options}>Hora inicio</label>
                <select onChange={handleStartHourChange}>
                  <option value="">Seleccione</option>
                  {[...Array(24)].map((_, index) => (
                    <option key={index + 1}>
                      {index + 1}:00
                    </option>
                  ))}
                </select>
              </div>
              

              <div className={`${style.HourContainer} ${style.HourContainer2}`}>
                <label className={style.Options}>Hora fin</label>
                <select onChange={handleFinishHourChange}>
                  <option value="">Seleccione</option>
                  {generateHourOptions()}
                </select>
              </div>
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

          <button onClick={crearSede} className={style.SaveButton}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SedesDashCrear;
