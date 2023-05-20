// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { selectOffice, fetchAllOffices, fetchOfficeByID } from "../../redux/features/officesSlice";



// const SedeHomeDetalle = () => {

//     const office = useSelector(selectOffice)

  

//     const dispatch= useDispatch();
//     const params = useParams();


//     useEffect(()=>{        
//         dispatch(fetchOfficeByID(params.name))
//     }, [dispatch, params.name])

// console.log(office)

//     return(
//         <div>
//             {
//               Object.keys(office[0]).length !== 0
//                 ?
//                 office.map((off)=>{
//                     return (
//                 <div>
//                     <h1>{off?.name}</h1>
                    
//                 </div>
//                     )
//                 })
//                     :
//                     <p>Loading</p>
//             }
//         </div>
//     )

// }


// export default SedeHomeDetalle;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOfficeByID, selectOffice } from "../../redux/features/officesSlice";

const SedeHomeDetalle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const office = useSelector(selectOffice);

  console.log(office)

  useEffect(() => {
    dispatch(fetchOfficeByID(params.id));
  }, [dispatch, params.id]);

  console.log(params.id)

  return (
    <div>
      {  Object.keys(office).length !== 0
                    ?
                   (
      
        <div>
          <h1>{office.branchoffice.name}</h1>
          <p>Dirección: {office.branchoffice.location}</p>
          <p>Días de atención: {office.branchoffice.scheduleDays}</p>
          <p>Horario: {office.branchoffice.scheduleHours}</p>
        </div>)
       : 
        <p>Loading</p>
}
    </div>
  );
};

export default SedeHomeDetalle;
