
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./SedesDashEditar.module.css";
import arrowIcon from '../../assets/icons/arrow-yellow.png';


const SedesDashEditar = () => {
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
  const params = useParams();

  const navigate = useNavigate();

  
  const guardarCambiosSede = () => {
    const id = params.id;
    const url = `https://musclelabii.onrender.com/branchoffice/update/${id}`;
  
    const regexNombre = /^[A-Za-z\s,]+$/;
    const regexDireccion = /^[A-Za-z0-9\s]+$/;
    const regexDias = /^[A-Za-z\s,]+$/;
    const regexHorario = /^\d{2}-\d{2}$/;
  
    const errors = {};
  
    if (sedes.name.trim() === "") {
      errors.name = "El campo de nombre es requerido.";
    } else if (!regexNombre.test(sedes.name)) {
      errors.name = "El nombre debe contener solo letras, espacios y comas.";
    }
  
    if (sedes.location.trim() === "") {
      errors.location = "El campo de dirección es requerido.";
    } else if (!regexDireccion.test(sedes.location)) {
      errors.location = "La dirección debe contener letras y números sin caracteres especiales.";
    }
  
    if (sedes.scheduleDays.trim() === "") {
      errors.scheduleDays = "El campo de días de atención es requerido.";
    } else if (!regexDias.test(sedes.scheduleDays)) {
      errors.scheduleDays = "Los días de atención deben contener solo palabras, espacios y comas.";
    }
  
    if (sedes.scheduleHours.trim() === "") {
      errors.scheduleHours = "El campo de horario es requerido.";
    } else if (!regexHorario.test(sedes.scheduleHours)) {
      errors.scheduleHours = "El horario debe tener el formato HH-HH (por ejemplo, 09-22).";
    }
  
    // Verificar si hay errores de validación
    if (Object.keys(errors).length > 0) {
      console.error("Errores de validación:", errors);
      // Manejar los errores de validación si es necesario
      return;
    }
  
    // Ventana emergente de confirmación
    const confirmacion = window.confirm("¿Estás seguro de guardar los cambios?");
  
    if (confirmacion) {
      axios
        .put(url, sedes)
        .then((res) => {
          console.log("Cambios guardados exitosamente");
          alert("Cambios guardados exitosamente");
          navigate('/dashboard/sedes');
        })
        .catch((error) => {
          console.error("Error al guardar los cambios:", error);
          // Manejar el error si es necesario
        });
    } else {
      alert("Acción cancelada");
    }
  };
  
  

  const eliminarSede = () => {
    const id = params.id;
    const url = `https://musclelabii.onrender.com/branchoffice/delete/${id}`;
  
    // Ventana emergente de confirmación
    const confirmacion = window.confirm("¿Estás seguro de eliminar la sede seleccionada?");
  
    if (confirmacion) {
      axios
        .delete(url)
        .then((res) => {
          console.log("Sede eliminada exitosamente");
          alert("Sede eliminada exitosamente");
          navigate('/dashboard/sedes');
        })
        .catch((error) => {
          console.error("Error al eliminar la sede:", error);
          // Manejar el error si es necesario
        });
    } else {
      alert("Acción cancelada");
    }
  };
  


  return (
    <div>

      <div>
        <Link to="/dashboard/sedes">
        <button>
          <img className={style.ArrowIcon} src={arrowIcon} alt="" />
        </button>
        </Link>
        <h1 className={style.tex}>Editar Sede</h1>
        <hr className={style.hr} />
      </div>


      <div className={style.MainConteiner}>
        <div className={style.Description}>
          <label htmlFor="name" className={style.texto}>Nombre: *</label>
          <input
            type="text"
            placeholder="Nombre..."
            value={sedes.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className={style.Description}>
          <label htmlFor="location" className={style.texto}>Dirección: *</label>
          <input
            type="text"
            placeholder="Dirección..."
            value={sedes.location}
            onChange={handleChange}
            name="location"
          />
        </div>

        <div className={style.Description}>

          <label htmlFor="scheduleDays" className={style.texto}>Días de atención: *</label>
          <input
            type="text"
            placeholder="Días de atención..."
            value={sedes.scheduleDays}
            onChange={handleChange}
            name="scheduleDays"
          />
        </div>

        <div className={style.Description}>
          <label htmlFor="scheduleHours" className={style.texto}>Horario: *</label>
          <input
            type="text"
            placeholder="Horario..."
            value={sedes.scheduleHours}
            onChange={handleChange}
            name="scheduleHours"
          />
        </div>


        <div className={style.ButtonConteiner}>
          <button onClick={guardarCambiosSede} className={style.SaveButton}>Guardar Cambios</button>
          <button type="button" onClick={eliminarSede} className={style.DeleteButton}>Eliminar</button>
        </div>

      </div>
    </div>
  );
};

export default SedesDashEditar;
