import React from "react";
import style from "./LessonsDash.module.css"
import { selectAllLessons, fetchAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector , useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";
import edit from "../../assets/icons/edit.png"
import trash from "../../assets/icons/trash-bin.png"


const LessonsDash = ()=> {

    const allLessons = useSelector(selectAllLessons);

    console.log(allLessons)

    const dispatch = useDispatch();
    const navigate= useNavigate();

   
    
    
    const [serverResponse, setServerResponse] = useState(true);

    useEffect(()=>{
        dispatch(fetchAllLessons())
    },[serverResponse])

    const removeLessonHandler = (event) => {
      const id = event.target.name;
    
      let text = "Esta acción no se podrá revertir!\nPulse OK o Cancelar.";
      if (window.confirm(text) === true) {
        console.log(id)
        fetch("https://musclelabii.onrender.com/lessons/delete/" + id, { method: "DELETE" })
          .then((response) => {
            setServerResponse(true);
            alert("Borrado con éxito!");
          })
          .catch((error) => {
            setServerResponse(false);
            alert("Error al borrar la lección.");
          });
      } else {
        alert("Cancelado por el usuario");
      }
        navigate("/dashboard/lessons")
    };

return(
    <div className={style.contenedor}>

            <div className={style.contNombre}>
              <h1>Clases</h1>
            </div>
             <hr className={style.hr}/>        
    <div className={style.contenedorTodo}>

      {allLessons ? (
          allLessons.map(el => (
              <div key={el.id}>           

            <div className={style.detalle}>
             
              <div className={style.imgDetalle}>
              <img src={el.image} alt="" className={style.imagenDeporte} />
              </div>
              <div className={style.contenido}>
              <h2>Nombre: {el.name}</h2>
              <h2>status</h2>
              <h2>Descripcion corta: {el.shortDescription}</h2>
              </div>

              <div className={style.divCont}>
                <Link to={`dashboard/clases/detalles/${el.id}`}>
              <button className={style.btnIcono1}><img src={edit} alt="edit" className={style.icono} /></button>
              </Link>
              <button className={style.btnIcono2} onClick={removeLessonHandler} name={`${el.id}`}><img src={trash} alt="trash" className={style.icono} /></button>
              
              </div>
            

</div>

            
          </div>
        ))
        ) : (
            <p>Loading</p>
            )}
            </div>

          
    </div>
  );
};





export default LessonsDash;

                