import style from "./Plans.module.css"
import {selectAllMemberships} from "../../redux/features/membershipsSlice"
import muscleIcon from "../../assets/icons/Bicep.png"
import muscleManIcon from "../../assets/icons/man-silhouette.png"
import clockIcon from "../../assets/icons/clock.png"
import checkIcon from "../../assets/icons/check.png"
import { useSelector } from "react-redux"

const Plans = () =>{

    const memberships = useSelector(selectAllMemberships)
    console.log(memberships)
    


    return(
            <div className={style.BGContainer}>
                <div className={style.TitleContainer}>
                    <h1>¡Alcanza tu mejor version</h1>
                    <h2>Ya sea que busques un entretenamiento básico o un plan avanzado para toda la familia, aquí encontrarás todo lo que necesitas para alcanzar tus metas</h2>
                </div>

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
                                

                                    <button>Compra ahora</button>
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

export default Plans;