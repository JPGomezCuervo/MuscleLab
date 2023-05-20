import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



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
        axios
          .post("https://musclelabii.onrender.com/branchoffice/create", sedes)
          .then((res) => {
            console.log("Sede creada exitosamente");
            // Realizar acciones adicionales después de crear la sede si es necesario
    
            // Redireccionar a la página correspondiente
           ; // Reemplaza "/sedes" con la ruta correcta hacia la página de sedes
          })
          .catch((error) => {
            console.error("Error al crear la sede:", error);
            // Manejar el error si es necesario
          });
          alert("Sede creada exitosamente")
          navigate("/dashboard/sedes")
      };



      return (
        <div>
          <label htmlFor="name">Nombre: *</label>
          <input
            type="text"
            placeholder="Nombre"
            value={sedes.name}
            onChange={handleChange}
            name="name"
          />
    
          <label htmlFor="location">Dirección: *</label>
          <input
            type="text"
            placeholder="Dirección"
            value={sedes.location}
            onChange={handleChange}
            name="location"
          />
    
          <label htmlFor="scheduleDays">Días de atención: *</label>
          <input
            type="text"
            placeholder="Días de atención"
            value={sedes.scheduleDays}
            onChange={handleChange}
            name="scheduleDays"
          />
    
          <label htmlFor="scheduleHours">Horario: *</label>
          <input
            type="text"
            placeholder="Horario"
            value={sedes.scheduleHours}
            onChange={handleChange}
            name="scheduleHours"
          />
    
        <button onClick={crearSede}>Crear</button>
    
        </div>
      );

}


export default SedesDashCrear;