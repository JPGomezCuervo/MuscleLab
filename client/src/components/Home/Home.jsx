
import ExtraInfo from "../ExtraInfo/ExtraInfo";
import Gallery from "../Gallery/Gallery";
import Plans from "../Plans/Plans";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlansCLick,
  selectPlansClicked,
} from "../../redux/features/utilsSlice";
import {
  fetchAllMemberships,
  selectAllMemberships,
} from "../../redux/features/membershipsSlice";
import { selectIsActive } from "../../redux/features/authSlice";

const Home = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const plansCLick = useSelector(selectPlansClicked);
  const plansRef = useRef(null);
  const isActive = useSelector(selectIsActive);

  const handleOnclick = () => {
    plansRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(fetchAllMemberships());
  }, [dispatch]);

  
  useEffect(() => {
    if (plansCLick) {
      plansRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch(setPlansCLick(false));
    }
  }, [plansCLick, dispatch]);
  

  return (
    <>
      <Gallery handleOnclick={handleOnclick} />
      <ExtraInfo />
      {
        !isActive ? (
          <section ref={plansRef}>
          <Plans/>
          </section>
        ) 
        : null
      }
    </>
  );
};

export default Home;
