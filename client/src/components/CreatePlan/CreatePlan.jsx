import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "./CreatePlan.module.css";
import arrowIcon from '../../assets/icons/arrow-yellow.png';

const CrearPlanes = ()=>{

    const [addPlan, setAddPlan] = useState({
        name:"",
        price:"",
        benefits:"",
        duration:"",
      });
    
      const handleChange = (e) => {
        setAddPlan({
          ...addPlan,
          [e.target.name]: e.target.value,
        });
      };
      
    
      const navigate = useNavigate();

      const crearPlan = () => {
        const regexNombre = /^[A-Za-z\s,]+$/;
        const regexBenefits = /^[A-Za-z0-9\s]+$/;
        const regexDuracion = /^[1-9][0-9]*$/;
        const regexPrecio = /^\d+(\.\d{1,2})?$/;
      
        const errors = {};
      
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
      
        if (Object.keys(errors).length === 0) {
          axios
            .post("https://musclelabii.onrender.com/memberships/create", addPlan)
            .then((res) => {
              alert("Plan creado exitosamente");
              // Realizar acciones adicionales después de crear la sede si es necesario
                setAddPlan({
                    name:"",
                    price:"",
                    benefits:"",
                    duration:"",
                  });
              // Redireccionar a la página correspondiente
              navigate("/dashboard/Planes");
            })
            .catch((error) => {
              console.error("Error al crear el plan:", error);
              // Manejar el error si es necesario
            });
        } else {
          console.error("Errores de validación:", errors);
          // Manejar los errores de validación si es necesario
        }
      };
      

      return (
        <div>


<div>
        <Link to="/dashboard/Plan">
        <button>
          <img className={style.ArrowIcon} src={arrowIcon} alt="" />
        </button>
        </Link>
        <h1 className={style.tex}>Crear nuevo plan</h1>
        <hr className={style.hr} />
      </div>
            <div className={style.MainConteiner}>

          <div className={style.Description}>
          <label htmlFor="name" className={style.texto}>Nombre: *</label>
          <input
            type="text"
            placeholder="Nombre"
            value={addPlan.name}
            onChange={handleChange}
            name="name"
          />
          </div>
    
          <div className={style.Description}>
          <label htmlFor="benefits" className={style.texto}>beneficios: *</label>
          <input
            type="text"
            placeholder="benefits"
            value={addPlan.benefits}
            onChange={handleChange}
            name="benefits"
          />          
          </div>
    
          <div className={style.Description}>
          <label htmlFor="duration" className={style.texto}>Duracion: *</label>
          <input
            type="text"
            placeholder="duracion"
            value={addPlan.duration}
            onChange={handleChange}
            name="duration"
            />
          </div>


        <div className={style.Description}>
          <label htmlFor="price" className={style.texto}>Precio: *</label>
          <input
            type="text"
            placeholder="Precio"
            value={addPlan.price}
            onChange={handleChange}
            name="price"
            />
          </div>

    
        <button onClick={crearPlan} className={style.SaveButton}>Crear</button>
    
        </div>
            </div>
      );

}


export default CrearPlanes;