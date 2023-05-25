import React from "react";
import style from "./LessonsDash.module.css"
import { fetchAllLessonsDashboard, selectAllLessonsDashboard, selectStatus } from "../../redux/features/lessonsDashSlice";
import { selectSelectedTypes, setSelectedTypes } from "../../redux/features/filtersSlice";
import { useSelector , useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";
import edit from "../../assets/icons/edit.png"
import loadingGif from '../../assets/gifs/loading.gif';
import plusIcon from '../../assets/icons/plus.png';




const LessonsDash = ()=> {

    const allLessons = useSelector(selectAllLessonsDashboard);
    const status = useSelector(selectStatus);
    

    const selectedTypes = useSelector(selectSelectedTypes);

    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(fetchAllLessonsDashboard())
    },[dispatch])


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
      <select onChange={handleFilterTypes}className={style.seleccion}>
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

      {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
    <div className={style.contenedorTodo}>
      {allLessons ? (
        allLessons
        .filter(el => selectedTypes.length === 0 || el.types.some(type => selectedTypes.includes(type)))
        .map(el => (
        
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
                {/* <button className={style.btnIcono2} onClick={removeLessonHandler} name={`${el.id}`}>
                  <img src={trash} alt="trash" className={style.icono}/>
                </button> */}
              
              </div>
            
            </div>

          </div>
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

                