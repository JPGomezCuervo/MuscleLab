import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "./SedesDashCrear.module.css";
import arrowIcon from '../../assets/icons/arrow-yellow.png';

const SedesDashCrear = ()=>{

    const [sedes, setSedes] = useState({
        name: "",
        location: "",
        scheduleDays: "",
        scheduleHours: "",
      });
    
      const handleChange = (e) => {
        setSedes({
          ...sedes,
          [e.target.name]: e.target.value,
        });
      };
      
    
      const navigate = useNavigate();

      const crearSede = () => {
        const regexNombre = /^[A-Za-z\s,]+$/;
        const regexDireccion = /^[A-Za-z0-9\s]+$/;
        const regexDias = /^[A-Za-z\s,]+$/;
        const regexHorario = /^\d{2}-\d{2}$/;
      
        const errors = {};
      
        if (sedes.name.trim() === "") {
          errors.name = "El campo de nombre es requerido.";
        } else if (!regexNombre.test(sedes.name)) {
          errors.name = "El nombre debe contener solo letras.";
        }
      
        if (sedes.location.trim() === "") {
          errors.location = "El campo de dirección es requerido.";
        } else if (!regexDireccion.test(sedes.location)) {
          errors.location = "La dirección debe contener letras y números sin caracteres especiales.";
        }
      
        if (sedes.scheduleDays.trim() === "") {
          errors.scheduleDays = "El campo de días de atención es requerido.";
        } else if (!regexDias.test(sedes.scheduleDays)) {
          errors.scheduleDays = "Los días de atención deben contener solo palabras sin números.";
        }
      
        if (sedes.scheduleHours.trim() === "") {
          errors.scheduleHours = "El campo de horario es requerido.";
        } else if (!regexHorario.test(sedes.scheduleHours)) {
          errors.scheduleHours = "El horario debe tener el formato HH-HH (por ejemplo, 09-22).";
        }
      
        if (Object.keys(errors).length === 0) {
          axios
            .post("https://musclelabii.onrender.com/branchoffice/create", sedes)
            .then((res) => {
              alert("Sede creada exitosamente");
              // Realizar acciones adicionales después de crear la sede si es necesario
                setSedes({
                  name: "",
                  location: "",
                  scheduleDays: "",
                  scheduleHours: "",
                })
              // Redireccionar a la página correspondiente
              navigate("/dashboard/sedes");
            })
            .catch((error) => {
              console.error("Error al crear la sede:", error);
              // Manejar el error si es necesario
            });
        } else {
          console.error("Errores de validación:", errors);
          // Manejar los errores de validación si es necesario
        }
      };
      
      

   


      return (
        <div className={style.BigBigContainer}>
        <div>


<div>
        <Link to="/dashboard/sedes">
        <a href="http://localhost:3000/dashboard/sedes">
          <img className={style.ArrowIcon} src={arrowIcon} alt="" />
        </a>
        </Link>
        <h1 className={style.tex}>Crear Sede Sede</h1>
        <hr className={style.hr} />
      </div>
            <div className={style.MainConteiner}>

          <div className={style.Description}>
          <label htmlFor="name" className={style.texto}>Nombre: *</label>
          <input
            type="text"
            placeholder="Nombre"
            value={sedes.name}
            onChange={handleChange}
            name="name"
          />
          </div>
    
          <div className={style.Description}>
          <label htmlFor="location" className={style.texto}>Dirección: *</label>
          <input
            type="text"
            placeholder="Dirección"
            value={sedes.location}
            onChange={handleChange}
            name="location"
          />          
          </div>
    
          <div className={style.Description}>
          <label htmlFor="scheduleDays" className={style.texto}>Días de atención: *</label>
          <input
            type="text"
            placeholder="Días de atención"
            value={sedes.scheduleDays}
            onChange={handleChange}
            name="scheduleDays"
            />
          </div>


        <div className={style.Description}>
          <label htmlFor="scheduleHours" className={style.texto}>Horario: *</label>
          <input
            type="text"
            placeholder="Horario"
            value={sedes.scheduleHours}
            onChange={handleChange}
            name="scheduleHours"
            />
          </div>

    
        <button onClick={crearSede} className={style.SaveButton}>Crear</button>
    
        </div>
            </div>
        </div>
      );

}


export default SedesDashCrear;