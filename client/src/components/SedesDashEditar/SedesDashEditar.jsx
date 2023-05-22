
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


  const [errors, setErrors] = useState({
    name: "",
    location: "",
    scheduleDays: "",
    scheduleHours: "",
  });

 
  const params = useParams();

  const navigate = useNavigate();

 

  const validarFormulario = () => {
    const regexNombre = /^[A-Za-z\s,]+$/;
    const regexDireccion = /^[A-Za-z0-9\s]+$/;
    const regexDias = /^[A-Za-z\s,]+$/;
    const regexHorario = /^\d{2}-\d{2}$/;

    let newErrors = {};

    if (sedes.name.trim() === "") {
      newErrors.name = "El campo de nombre es requerido.";
    } else if (!regexNombre.test(sedes.name)) {
      newErrors.name = "El nombre debe contener solo letras, espacios y comas.";
    }

    if (sedes.location.trim() === "") {
      newErrors.location = "El campo de dirección es requerido.";
    } else if (!regexDireccion.test(sedes.location)) {
      newErrors.location =
        "La dirección debe contener letras y números sin caracteres especiales.";
    }

    if (sedes.scheduleDays.trim() === "") {
      newErrors.scheduleDays = "El campo de días de atención es requerido.";
    } else if (!regexDias.test(sedes.scheduleDays)) {
      newErrors.scheduleDays =
        "Los días de atención deben contener solo palabras, espacios y comas.";
    }

    if (sedes.scheduleHours.trim() === "") {
      newErrors.scheduleHours = "El campo de horario es requerido.";
    } else if (!regexHorario.test(sedes.scheduleHours)) {
      newErrors.scheduleHours =
        "El horario debe tener el formato HH-HH (por ejemplo, 09-22).";
    }

     setErrors(newErrors)
  };

  const guardarCambiosSede = () => {
    const id = params.id;
    const url = `https://musclelabii.onrender.com/branchoffice/update/${id}`;
   

    if (Object.values(errors).some((error) => error !== "")) {
      return alert("Faltan datos");
    }

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
  
  const handleChange = (e) => {
    validarFormulario({
      ...sedes,
      [e.target.name]: e.target.value
     })

    setSedes({
      ...sedes,
      [e.target.name]: e.target.value,
    });
  };

  return (
  <>
    <div className={style.BigBigContainer}>

      <div>
        <Link to="/dashboard/sedes">
        <a href="http://localhost:3000/dashboard/sedes">
          <img className={style.ArrowIcon} src={arrowIcon} alt="" />
        </a>
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

        {errors.name && <p>{errors.name}</p>}


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

        {errors.description && <p>{errors.description}</p>}

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

        {errors.scheduleDays && <p>{errors.scheduleDays}</p>}

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

        {errors.scheduleHours && <p>{errors.scheduleHours}</p>}

        <div className={style.ButtonConteiner}>
          <button onClick={guardarCambiosSede} className={style.SaveButton}>Guardar Cambios</button>
          <button type="button" onClick={eliminarSede} className={style.DeleteButton}>Eliminar</button>
        </div>

      </div>
    </div>
</>
  );
};

export default SedesDashEditar;
