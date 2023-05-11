import style from './Lessons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLessons } from '../../redux/features/lessonsSlice';
import FilterBar from '../FilterBar/FilterBar';
import Lesson from '../Lesson/Lesson';
import lessons from '../../utils/lessons';
import tiposClase from '../../utils/tiposClase';
const Lessons = () => {
    //cuando se funcionen las rutas del server descomenta esto:
//   const lessons = useSelector(selectAllLessons);
    
    return (
            <div className={style.Frame}>  
            <FilterBar lessonsAtributtes= {tiposClase}/>
            <div className={style.Container}>
                {lessons.map((lesson, index)=> {
                    return <Lesson key={lesson.id} lesson={lesson} index={index} />
                })}
            </div>
            </div>
    );
};

export default Lessons;