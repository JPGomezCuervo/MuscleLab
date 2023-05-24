import style from './TrainerDash.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMonitors, selectAllMonitors, selectStatus } from '../../redux/features/usersSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import plusIcon from '../../assets/icons/plus.png'
import editIcon from '../../assets/icons/edit.png'
import loadingGif from '../../assets/gifs/loading.gif'

const TrainerDash = () => {
    const dispatch = useDispatch();
    const monitors = useSelector(selectAllMonitors);
    const status = useSelector(selectStatus);
    
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
            {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
            <div className={style.BGContainer}>
                <div className={style.Container}>
                    {monitors.map((monitor) =>(
                        <div className={style.SectionContainer}>
                            <div className={style.InfoNameContainer}>
                                <h2 className={style.InfoName}>
                                    {monitor.fullName}
                                </h2>
                            </div>

                            <div className={style.SubContainer}>
                                <div className={style.ClaseContainer}>
                                    <h2 className={`${style.Info} ${style.Status}`}>
                                        {monitor.lessonDetails.map((lesson) => (
                                            <p>{lesson.name}</p>
                                        ))}    
                                    </h2>
                                </div>
                                <Link to={`editar/${monitor.id}`}>
                                    <img src={editIcon} alt="" />
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>

            </div>

                <Link to='crear/'>
                    <img className={style.PlusIcon} src={plusIcon} alt="" /> 
                </Link>
        </div>
    )
}

export default TrainerDash