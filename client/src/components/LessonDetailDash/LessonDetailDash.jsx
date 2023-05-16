import { useSelector, useDispatch } from 'react-redux';
import { selectLesson, fetchLessonsByID } from '../../redux/features/lessonsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const LessonsDetailDash = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const lesson = useSelector(selectLesson);

    useEffect(() => {
        dispatch((fetchLessonsByID(id)));
    }, [dispatch, id]);

    return (
        <>
        </>
    )
};

export default LessonsDetailDash;