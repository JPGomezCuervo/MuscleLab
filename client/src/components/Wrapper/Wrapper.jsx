import { useParams, useLocation } from "react-router-dom";
import CreateLessonDash from "../CreateLessonDash/CreateLessonDash";
import EditLessonDash from "../EditlLessonDash/EditLessonDash";

const Wrapper = () => {
    const id = useParams().id;
    const pathName = useLocation().pathname;

    return (
        <>
            {pathName.includes("editar") ? <EditLessonDash id={id} /> : <CreateLessonDash id={id} />}
        </>
    );
};

export default Wrapper;
