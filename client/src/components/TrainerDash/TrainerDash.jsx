import style from './TrainerDash.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMonitors, selectAllMonitors } from '../../redux/features/usersSlice';
import { useEffect } from 'react';
import plusIcon from '../../assets/icons/plus.png'
import editIcon from '../../assets/icons/edit.png'

const TrainerDash = () => {
    const dispatch = useDispatch();
    const monitors = useSelector(selectAllMonitors);
    
    useEffect(() => {
        dispatch(fetchAllMonitors());
    }, [dispatch]);

    return(
        <div className={style.MainContainer}>
            <div className={style.Navigator}>
                <h2>Profesores</h2>
            </div>

            <div className={style.TitleContainer}>
                <h2 className={`${style.Title} ${style.Info}`}> Nombre</h2>
                <h2 className={`${style.Title} ${style.Info}`}> Clase</h2>
            </div>

            <div className={style.BGContainer}>

                <div className={style.Container}>
                    <div className={style.NameContainer}>
                        {monitors.map((monitor) => (
                            <h2 className={style.InfoName}>{monitor.fullName}</h2>
                        ))}

                    </div>

                    <div className={style.StatusContainer}>
                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Taijutsu, ninjutsu, Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>

                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Taijutsu, ninjutsu, Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>
                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Taijutsu, ninjutsu, Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>
                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Taijutsu, ninjutsu, Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>
                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>
                        <div className={style.ContainerS}>
                            <h2 className={`${style.Info} ${style.Status}`}>
                                Taijutsu, ninjutsu, Boxeo
                            </h2>
                            <img src={editIcon} alt="" />
                        </div>
                    </div>
                </div>

                <button>
                    <img className={style.PlusIcon} src={plusIcon} alt="" /> 
                </button>
            </div>

        </div>
    )
}

export default TrainerDash