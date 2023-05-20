
import React, { useState } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";


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
    const id = params.id
    const url = `https://musclelabii.onrender.com/branchoffice/update/${id}`;

    axios
      .put(url, sedes)
      .then((res) => {
       console.log("cambios hechos")
        // Realizar acciones adicionales después de guardar los cambios si es necesario
      })
      .catch((error) => {
        alert("Error al guardar los cambios:", error);
        // Manejar el error si es necesario
      });
      alert("Cambios guardados exitosamente");
      navigate('/dashboard/sedes')
  };

  const eliminarSede = () => {
    const id = params.id
    const url = `https://musclelabii.onrender.com/branchoffice/delete/${id}`;
  
    axios
      .delete(url)
      .then((res) => {
        console.log("Sede eliminada exitosamente");
       
      })
      .catch((error) => {
        console.error("Error al eliminar la sede:", error);
        // Manejar el error si es necesario
      });
      alert("Clase Eliminada correctamente")
      navigate('/dashboard/sedes')
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

      <button onClick={guardarCambiosSede}>Guardar Cambios</button>
      <button type="button" onClick={eliminarSede}>Eliminar</button>

    </div>
  );
};

export default SedesDashEditar;
