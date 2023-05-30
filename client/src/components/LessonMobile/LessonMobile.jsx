import React from 'react';
import { Link } from 'react-router-dom';
import style from './LessonMobile.module.css';
const LessonMobile = ({lesson, index}) => {


    const {name, shortDescription, exercisesTypes, image, id, effort} = lesson;

  
    

    return (
        <div className={style.Card}>
          
            <>
              <div className={style.ImageContainer}>
                <img src={image} alt={name} />
              </div>
              <div className={style.InfoContainer}>
                <h2>{name}</h2>
                <p>{shortDescription}</p>


                {<p>Tipo de ejercicio: {exercisesTypes?.join(', ')}</p>}
                {<p>Intensidad: {effort}</p>} 

                <Link to={`/clases/${name}`}>
                  <button>Más info</button>
                </Link>
              </div>
            </>
         
        </div>
      );
      
}

export default LessonMobile;