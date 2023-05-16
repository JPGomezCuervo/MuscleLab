import React from "react";
import style from "./LessonsDash.module.css"
import { selectAllLessons, fetchAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector , useDispatch} from "react-redux";
import { useEffect , useState} from "react";

const LessonsDash = ()=> {

    const allLessons = useSelector(selectAllLessons);

    console.log(allLessons)
    const dispatch = useDispatch();

   
    useEffect(()=>{
        dispatch(fetchAllLessons())
    },[])

    const [showDetails, setShowDetails] = useState(false);



return(
    <div className={style.contenedor}>

<div className={style.divVacio}></div>
            <div className={style.contNombre}>
              <h1>Clases</h1>
            </div>
             <hr className={style.hr}/>
        
    <div
  className={style.cartita}
  onMouseEnter={() => setShowDetails(true)}
  onMouseLeave={() => setShowDetails(false)}
>

      {allLessons ? (
          allLessons.map(el => (
              <div key={el.id} >           

            <div className={style.detalle}>
              <div className={style.imgDetalle}>
              <img src={el.image} alt="" className={style.imagenDeporte} />
              </div>
              <div className={style.contenido}>
              <h2>{el.name}</h2>
              <h2>status</h2>
              <h2>{el.shortDescription}</h2>
              </div>
            </div>
            <div className={`${style.divNuevo} ${showDetails ? style.show : style.hide}`}>
                <p lassName={style.texto}>{el.name}</p>
                <p className={style.texto}>{el.description}</p>
                <p className={style.texto}>{el.effort}</p>
                <p className={style.texto}>{el.exercisesTypes?.join(", ")}</p>
                <p className={style.texto}>{el.shortDescription}</p>
                <button className={style.texto}>Eliminar</button>
                <button className={style.texto}>Editar</button>
                <button className={style.texto}>Suspender</button>

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

                