
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
const token = localStorage.getItem("token");
const Home = () => {
  const dispatch = useDispatch();
  const plansCLick = useSelector(selectPlansClicked);
  const plansRef = useRef(null);

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
      <section ref={plansRef}>
        <Plans/>
      </section>
    </>
  );
};

export default Home;
