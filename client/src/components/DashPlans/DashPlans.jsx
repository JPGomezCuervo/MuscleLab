import style from './DashPlans.module.css'
import clockIcon from "../../assets/icons/clock.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {selectAllMemberships, fetchAllMemberships} from "../../redux/features/membershipsSlice"
import edit from "../../assets/icons/edit.png";


import { Link } from "react-router-dom";



const DashPlans = () =>{
    const dispatch = useDispatch();
    const memberships = useSelector(selectAllMemberships)
    console.log(memberships)
    

    useEffect(() => {
        dispatch(fetchAllMemberships());
    }, [dispatch]);


    return(
            <div className={style.BGContainer}>

                <div className={style.PlansContainer}>

                    <div className={`${style.Plan} ${style.Plan1}`}>
                        <div className={style.PlanContainer1}>

                            {
                                memberships?.map(membership=>{
                                    return(
                                        
                                        <div>
                                
                                   <div className={style.color}>
                                        <div className={style.Title}><h2> {membership.name}</h2></div>
                                            <img className={style.MainIcon} src={clockIcon} alt="" />
                                
                                <h2>{membership.duration}</h2>
                                <h2> {membership.benefits}</h2>
                                <h2> {membership.price}</h2>
                                

                                <Link to={`editar/${membership.id}`}>
                        <button className={style.btnIcono1}>
                          <img src={edit} alt="edit" className={style.icono} />
                        </button>
                      </Link>
                                    </div>
                                    </div>
                                    )
                            })}
                           
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default DashPlans;