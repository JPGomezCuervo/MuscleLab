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

            <div className={style.Container}>
                <div className={style.NameContainer}>
                    <h2 className={`${style.Title} ${style.Info}`}> Nombre</h2>

                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                    <h2 className={style.InfoName}> Lorem ipsum dolor</h2>
                </div>

                <div className={style.TrainerContainer}>
                    <h2 className={`${style.Title} ${style.Info}`}> Profesor</h2>
                    <h2 className={style.Info}> Brad Pitt</h2>
                    <h2 className={style.Info}> Antonio Gomez</h2>
                    <h2 className={style.Info}> Brad Pitt</h2>
                    <h2 className={style.Info}> Brad Pitt</h2>
                    <h2 className={style.Info}> Antonio Gomez</h2>
                    <h2 className={style.Info}> Antonio Gomez</h2>
                </div>

                <div className={style.StatusContainer}>
                    <h2 className={`${style.Title} ${style.Info}`}> Nombre</h2>

                    <h2 className={style.Info}> Activo</h2>
                    <h2 className={style.Info}> Inactivo</h2>
                    <h2 className={style.Info}> Inactivo</h2>
                    <h2 className={style.Info}> Activo</h2>
                    <h2 className={style.Info}> Activo</h2>
                    <h2 className={style.Info}> Inactivo</h2>
                </div>
            </div>

        </div>
    )
}

export default TrainerDash