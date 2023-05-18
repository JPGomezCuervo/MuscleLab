import style from './TrainerDash.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMonitors, selectAllMonitors } from '../../redux/features/usersSlice';
import { useEffect } from 'react';

const TrainerDash = () => {
    const dispatch = useDispatch();
    const monitors = useSelector(selectAllMonitors);
    
    useEffect(() => {
        dispatch(fetchAllMonitors());
    }, [dispatch]);

    return(
        <div className={style.MainContainer}>
            <div className={style.Navigator}>
                <h2>Clases</h2>
            </div>

            <div className={style.StatusBar}>
                <span> Nombre </span>
                <span> Clases </span>
                <span> Status </span>
            </div>

            <div className={style.TeachersContainer}>
                <div className={style.NameContainer}>
                    
                </div>

                <div className={style.Lessons}>
                    
                </div>
            </div>

        </div>
    )
}

export default TrainerDash