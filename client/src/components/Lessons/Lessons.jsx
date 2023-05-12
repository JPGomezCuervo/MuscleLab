import style from './Lessons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLessons, selectStatus, fetchAllLessons, fetchLesonsByID } from '../../redux/features/lessonsSlice';
import { useEffect } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import Lesson from '../Lesson/Lesson';
import tiposClase from '../../utils/tiposClase';

const Lessons = () => {
    const dispatch = useDispatch();
    const lessons = useSelector(selectAllLessons);
    const status = useSelector(selectStatus);
    
    console.log(lessons);
    console.log(status);
    useEffect(() => {
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
        dispatch(fetchAllLessons());
        
    }, [dispatch]);
    
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