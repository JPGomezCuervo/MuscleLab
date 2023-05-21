import React from "react";
import style from "./LessonsDash.module.css"
import { selectAllLessonsDashboard, fetchAllLessonsDashboard, clearLesson } from "../../redux/features/lessonsSlice";
import { selectSelectedTypes, setSelectedTypes } from "../../redux/features/filtersSlice";
import { useSelector , useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";
import edit from "../../assets/icons/edit.png"
import trash from "../../assets/icons/trash-bin-blue.png"
import plusIcon from '../../assets/icons/plus.png'



console.log("estas aca?");


const LessonsDash = ()=> {

    const allLessons = useSelector(selectAllLessonsDashboard);

    

    const selectedTypes = useSelector(selectSelectedTypes);

    const dispatch = useDispatch();
    const navigate= useNavigate();

   
    
    
    const [serverResponse, setServerResponse] = useState(true);

    useEffect(()=>{
        dispatch(fetchAllLessonsDashboard())
    },[dispatch])

    // const removeLessonHandler = (event) => {
    //   const id = event.target.name;    
    //   let text = "Esta acción no se podrá revertir!\nPulse OK o Cancelar.";
    //   if (window.confirm(text) === true) {
    //     console.log(id)
    //     fetch("https://musclelabii.onrender.com/lessons/delete/" + id, { method: "DELETE" })
    //       .then((response) => {
    //         setServerResponse(true, response);
    //         alert("Borrado con éxito!");
    //       })
    //       .catch((error) => {
    //         setServerResponse(false, error);
    //         alert("Error al borrar la lección.");
    //       });
    //   } else {
    //     alert("Cancelado por el usuario");
    //   }
       
    // };

    const removeLessonHandler = (event) => {
      const id = event.target.name;
    
      let text = "Esta acción no se podrá revertir!\nPulse OK o Cancelar.";
      if (window.confirm(text) === true) {
        console.log(id);
        // Eliminar directamente del servidor
        fetch("https://musclelabii.onrender.com/lessons/delete/" + id, { method: "DELETE" })
          .then((response) => {
            if (response.status === 200) {
              // Eliminación exitosa
              setServerResponse(true);
              alert("Borrado con éxito!");
              // Llamar a la acción clearLesson para actualizar el estado local
              dispatch(clearLesson(id));
            } else if (response.status === 400) {
              // Error en el servidor
              setServerResponse(false);
              return response.json();
            } else {
              // Otro código de estado
              throw new Error("Error de red");
            }
          })
          .then((data) => {
            // Manejar el mensaje de error del servidor
            if (data && data.error) {
              alert(data.error);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("Cancelado por el usuario");
      }
    };
    


    const handleFilterTypes = (event) => {
      const selectedValue = event.target.value;
      if (selectedValue === "all") {
        dispatch(setSelectedTypes([]));
      } else {
        dispatch(setSelectedTypes(selectedValue));
      }
    }
    


return(
  <>

  <div className={style.contenedor}>

    <Link to= 'crear'>
    <img src={plusIcon} alt="crear" className={style.PlusIcon} />
    </Link>

    <div className={style.contNombre}><h1>Clases</h1></div>

    <hr className={style.hr}/>  

    <div className={style.divSelect}>
      <select onChange={handleFilterTypes} value={selectedTypes} className={style.seleccion}>
        <option value="">All</option>
        <option value="Fuerza">Fuerza</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibilidad">Flexibilidad</option>
        <option value="Equilibrio">Equilibrio</option>
        <option value="Coordinación">Coordinación</option>
        <option value="Velocidad">Velocidad</option>
        <option value="Resistencia">Resistencia</option>
        <option value="Agilidad">Agilidad</option>
        <option value="Potencia">Potencia</option>
        <option value="Movilidad">Movilidad</option>
        <option value="Estiramiento">Estiramiento</option>
        <option value="Relajación">Relajación</option>

      </select>
    </div>

    <div className={style.contenedorTodo}>
      {allLessons ? (
        allLessons
        .filter(el => selectedTypes.length === 0 || el.types.some(type => selectedTypes.includes(type)))
        .map(el => (
          <Link to={`editar/${el.id}`} key={el.id}>
          <div key={el.id}>           

            <div className={style.detalle}>
             
              <div className={style.imgDetalle}>
                <img src={el.image} alt="" className={style.imagenDeporte} />
              </div>

              <div className={style.contenido}>
                <h2>Nombre: <span>{el.name}</span></h2>
                <h2>status: <span>{(el.isAvailable)? 'Activa' : 'Inactiva'}</span> </h2>
                <h2>Descripcion: <span>{el.shortDescription}</span> </h2>
                <h2>Tipo de ejercicio: <span>{el.types?.join(", ")}</span> </h2>
              </div>

              <div className={style.divCont}>
                <Link to={`editar/${el.id}`}>
                    <img src={edit} alt="edit" className={style.icono}/>
                </Link>
                <button className={style.btnIcono2} onClick={removeLessonHandler} name={`${el.id}`}>
                  <img src={trash} alt="trash" className={style.icono}/>
                </button>
              
              </div>
            
            </div>

          </div>
          </Link>
        ))
        ) : (
            <p>Loading</p>
            )}
        </div>       
  </div>
  </>
  );
};





export default LessonsDash;

                