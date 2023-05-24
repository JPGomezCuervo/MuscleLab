import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./EditarPlan.module.css";
import arrowIcon from '../../assets/icons/arrow-yellow.png';


const PlanDashEditar = () => {
  const [addPlan, setPlan] = useState({
    name:"",
        price:"",
        benefits:"",
        duration:"",
  });


  const [errors, setErrors] = useState({
    name:"",
    price:"",
    benefits:"",
    duration:"",
  });

 
  const params = useParams();

  const navigate = useNavigate();

 

  const validarFormulario = () => {
    const regexNombre = /^[A-Za-z\s,]+$/;
    const regexBenefits = /^[A-Za-z0-9\s]+$/;
    const regexDuracion = /^[1-9][0-9]*$/;
    const regexPrecio = /^\d+(\.\d{1,2})?$/;
    let errors = {};

    if (addPlan.name.trim() === "") {
      errors.name = "El campo de nombre es requerido.";
    } else if (!regexNombre.test(addPlan.name)) {
      errors.name = "El nombre debe contener solo letras.";
    }
  
    if (addPlan.benefits.trim() === "") {
      errors.benefits = "El campo de beneficios es requerido.";
    } else if (!regexBenefits.test(addPlan.benefits)) {
      errors.benefits = "Los beneficios debe contener letras y números sin caracteres especiales.";
    }
  
    if (addPlan.duration.trim() === "") {
      errors.duration = "El campo de duracion es requerido.";
    } else if (!regexDuracion.test(addPlan.duration)) {
      errors.duration = "Seleccionar la cantidad de meses en numeros.";
    }
  
    if (addPlan. price.trim() === "") {
      errors. price = "El campo de precio es requerido.";
    } else if (!regexPrecio.test(addPlan. price)) {
      errors. price = "El precio debe tener el formato adecuado.";
    }
     setErrors(errors)
  };

  const guardarCambiosPlan = () => {
    const id = params.id;
    const url = `https://musclelabii.onrender.com/memberships/update/${id}`;
   

    if (Object.values(errors).some((error) => error !== "")) {
      return alert("Faltan datos");
    }

    const confirmacion = window.confirm("¿Estás seguro de guardar los cambios?");

    if (confirmacion) {
      axios
        .put(url, addPlan)
        .then((res) => {
          console.log("Cambios guardados exitosamente");
          alert("Cambios guardados exitosamente");
          navigate('/dashboard/Planes');
        })
        .catch((error) => {
          console.error("Error al guardar los cambios:", error);
          // Manejar el error si es necesario
        });
    } else {
      alert("Acción cancelada");
    }
  };

  

  const eliminarPlan = () => {
    const id = params.id;
    const url = `https://musclelabii.onrender.com/memberships/delete/${id}`;
  
    // Ventana emergente de confirmación
    const confirmacion = window.confirm("¿Estás seguro de eliminar el plan seleccionado?");
  
    if (confirmacion) {
      axios
        .delete(url)
        .then((res) => {
          console.log("Plan eliminado exitosamente");
          alert("Plan eliminado exitosamente");
          navigate('/dashboard/Planes');
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
      ...addPlan,
      [e.target.name]: e.target.value
     })

    setPlan({
      ...addPlan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>

      <div>
        <Link to="/dashboard/sedes">
        <button>
          <img className={style.ArrowIcon} src={arrowIcon} alt="" />
        </button>
        </Link>
        <h1 className={style.tex}>Editar Plan</h1>
        <hr className={style.hr} />
      </div>


      <div className={style.MainConteiner}>
        <div className={style.Description}>
          <label htmlFor="name" className={style.texto}>Nombre: *</label>
          <input
            type="text"
            placeholder="Nombre..."
            value={addPlan.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        {errors.name && <p>{errors.name}</p>}


        <div className={style.Description}>
          <label htmlFor="benefits" className={style.texto}>Beneficios: *</label>
          <input
            type="text"
            placeholder="Beneficios..."
            value={addPlan.benefits}
            onChange={handleChange}
            name="benefits"
          />
        </div>

        {errors.benefits && <p>{errors.benefits}</p>}

        <div className={style.Description}>

          <label htmlFor="duration" className={style.texto}>Duracion: *</label>
          <input
            type="text"
            placeholder="Duracion..."
            value={addPlan.duration}
            onChange={handleChange}
            name="duracion"
          />
        </div>

        {errors.duration && <p>{errors.duration}</p>}

        <div className={style.Description}>
          <label htmlFor="price" className={style.texto}>Precio: *</label>
          <input
            type="text"
            placeholder="Precio..."
            value={addPlan.price}
            onChange={handleChange}
            name="price"
          />
        </div>

        {errors.price && <p>{errors.price}</p>}

        <div className={style.ButtonConteiner}>
          <button onClick={guardarCambiosPlan} className={style.SaveButton}>Guardar Cambios</button>
          <button type="button" onClick={eliminarPlan} className={style.DeleteButton}>Eliminar</button>
        </div>

      </div>
    </div>
  );
};

export default PlanDashEditar;