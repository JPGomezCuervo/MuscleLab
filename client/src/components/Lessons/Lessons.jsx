    import style from './Lessons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLessons, selectStatus, fetchAllLessons, selectError } from '../../redux/features/lessonsSlice';
import { fetchAllLessonTypes, selectAllLessonTypes } from '../../redux/features/typesSlice';
import { useEffect, useState } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import Lesson from '../Lesson/Lesson';
import LessonMobile from '../LessonMobile/LessonMobile';

const Lessons = () => {
    const dispatch = useDispatch();
    const lessons = useSelector(selectAllLessons);
    const error = useSelector(selectError);
    const lessonTypes = useSelector(selectAllLessonTypes);

    const [retryButton, setRetryButton] = useState(false);

    const handleRetryClick = () => {
        setRetryButton(true);
    };
    
    useEffect(() => {
        dispatch(fetchAllLessons());
        dispatch(fetchAllLessonTypes());
    }, [dispatch]);
    
    useEffect(() => {
        window.scrollTo({top: 0, left:0, behavior: 'auto'})

    }, [])

    

    return (
            <div className={style.Frame}>  
            <FilterBar lessonsAttributes= {lessonTypes} retryButton ={retryButton} setRetryButton={setRetryButton}/>
            <div className={style.Container}>
                {error && <div className={style.Error}>{error}</div>}
                {error && <button className ={style.RetryButton}onClick={handleRetryClick}>Intenta de nuevo</button>}
                {lessons.map((lesson, index)=> {
                    return <Lesson key={lesson.id} lesson={lesson} index={index} />
                })}
            </div>
            <div className={style.ContainerMobile}>
                {error && <div className={style.Error}>{error}</div>}
                {error && <button className ={style.RetryButton}onClick={handleRetryClick}>Intenta de nuevo</button>}
                {lessons.map((lesson, index)=> {
                    return <LessonMobile key={lesson.id} lesson={lesson} index={index} />
                })}
            </div>
            </div>
    );
};

export default Lessons;