import style from "./EditTrainerDash.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { useParams } from "react-router-dom";

const EditTrainerDash = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(selectUserByID);

    useEffect(() => {
        dispatch(fetchUserByID(id));
    }, [dispatch, id]);
    
    return (
        <>
        <form className={style.MainContainer}>
            <div className={style.Navigation}>
                <button>
                    <img className={style.ArrowIcon} src={arrowIcon} alt="" />
                </button>
                <h2>{user.fullName}</h2>
            </div>
        </form>
        </>
    );

};

export default EditTrainerDash;