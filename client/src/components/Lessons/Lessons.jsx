import style from './Lessons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLessons } from '../../redux/features/lessonsSlice';
import Lesson from '../Lesson/Lesson';
import lessons from '../../utils/lessons';

const Lessons = () => {
    //cuando se funcionen las rutas del server descomenta esto:
//   const lessons = useSelector(selectAllLessons);
    console.log(lessons);
    return (
        <div className={style.Frame}>  
            {lessons.map((lesson)=> {
                return <Lesson key={lesson.id} lesson={lesson} />
            })}
        </div>
    );
};

export default Lessons;