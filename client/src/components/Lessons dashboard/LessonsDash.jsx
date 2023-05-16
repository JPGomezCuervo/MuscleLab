import React from "react";
import style from "./LessonsDash.module.css"
import { selectAllLessons, fetchAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";

const LessonsDash = ({lesson})=> {

    const allLessons = useSelector(selectAllLessons);

    console.log(allLessons)
    const dispatch = useDispatch();

   
    useEffect(()=>{
        dispatch(fetchAllLessons())
    },[])

return(
    <div className={style.contenedor}>

<div className={style.divVacio}></div>
            <div className={style.contNombre}>
              <h1>CLASES</h1>
              <button className={style.button}>Crear clase</button>
            </div>
        
    <div className={style.card}>
      {allLessons ? (
          allLessons.map(el => (
              <div key={el.id} >           

            <div className={style.detalle}>
              <img src={el.image} alt="" className={style.imagenDeporte} />
              <h2>{el.name}</h2>
              <h2>status</h2>
            </div>

            
          </div>
        ))
        ) : (
            <p>Loading</p>
            )}
            </div>

            <div className={style.botones}>
              <button className={style.button}>Editar</button>
              <button className={style.button}>Eliminar</button>
            </div>

    </div>
  );
};





export default LessonsDash;

