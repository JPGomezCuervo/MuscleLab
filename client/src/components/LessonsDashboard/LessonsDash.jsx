import React from "react";
import style from "./LessonsDash.module.css"
import { selectAllLessons, fetchAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector , useDispatch} from "react-redux";
import { useEffect , useState} from "react";
import edit from "../../assets/icons/edit.png"
import trash from "../../assets/icons/trash-bin.png"

const LessonsDash = ()=> {

    const allLessons = useSelector(selectAllLessons);

    console.log(allLessons)
    const dispatch = useDispatch();

   
    useEffect(()=>{
        dispatch(fetchAllLessons())
    },[])

    



return(
    <div className={style.contenedor}>

            <div className={style.contNombre}>
              <h1>Clases</h1>
            </div>
             <hr className={style.hr}/>        
    <div>

      {allLessons ? (
          allLessons.map(el => (
              <div key={el.id} >           

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
              <button className={style.btnIcono1}><img src={edit} alt="edit" className={style.icono} /></button>
              <button className={style.btnIcono2}><img src={trash} alt="trash" className={style.icono} /></button>

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

                