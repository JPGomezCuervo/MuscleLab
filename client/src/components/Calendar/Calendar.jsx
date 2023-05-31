import React, { useEffect, useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"
import AddEventModal from "./AddEventModal/AddEventModal";
import interactionPlugin  from "@fullcalendar/interaction";
import axios from "axios"
import moment from "moment";
import styles from "../Calendar/Calendar.module.css"

//import Events from "./EventsMocks/EventsMocks";

import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "../../redux/features/usersSlice";

import decodeJwt from "../../utils/decodejwt";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const token = localStorage.getItem("token");
  const decoded = decodeJwt(token);
  const id = decoded.payload.id;

  useEffect(() => {
    dispatch(fetchUserByID(id));

  }, [dispatch, id]);

  const userTargeted = useSelector(selectUserByID);

 // const memberUser = userTargeted?.membresia ? userTargeted.detalle : userTargeted;
  const membership = userTargeted.membresia;
  const membershipName = userTargeted?.detalle;
  const isAdmin = decoded.payload.isAdmin;
  
  //console.log('title', membership?.name,'detalle:',userTargeted.detalle.lessonDetails);

  const lessonName = userTargeted.detalle?.lessonDetails.map(lessonName=> lessonName.name)
    //console.log('Nombre usuario logueado:',membershipName?.fullName);
    const eventsUserFromApi = [{
      title: `Plan: ${membership?.name}-Clases: ${lessonName}`,
      start: membership?.start,
      end: membership?.end
    }]
    //console.log('HolaDetalle!', eventsUserFromApi);  
    //Events(), 
  useEffect(() => {
    setEvents(eventsUserFromApi)   
  }, [location]);

  const users = useSelector(selectAllUsers);
  //console.log('Hay clases para user?', users.user[0].lessonDetails);
   
  //console.log('Token isLogin:',token);
  
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    })
    //calendarApi.next();
  };

  // request for create events:
  // async function handleEventAdd(data){
  //   await axios.post("https://musclelabii.onrender.com/'calendar/create-event'", data.event)
  // }
  

  //request for get user's events(lessons) from db.
  async function handleDateSet(data) {
     const response = await axios
       .get("https://musclelabii.onrender.com/(title,start,end)?start="
            +moment(data.start).toISOString()
            +"&end="+moment(data.end).toISOString())
        setEvents(response.data)  
    }
    
  return (
        
    <section className={styles.calendar}>
      <p 
        style={{ 
              fontWeight:"bold", 
              fontSize:"1.25rem", 
              padding:".2px",
              color: "orange",
              }} 
              >MUSCLE LAB GYM <span 
        style={{ 
              fontWeight:"bold", 
              fontSize:"1.15rem", 
              padding:"2px",
              color: "#fff",
              background:"orange",
              borderRadius:"3px",
                  
              }}
         >Calendario </span><span style={{fontSize:'1.5rem', textTransform:'uppercase' }}>{membershipName?.fullName}</span></p>
      <div className={styles.calendarBody} style={{ position: "relative", 
              zIndex: 0, 
                   }}>
        
        {isAdmin && <button className={styles.btn1} onClick={()=>setModalOpen(true)}>Nuevo Evento</button>}
        <Link to="/profile">
           <button className={styles.btn2}>Atras</button>
        </Link>
        <Fullcalendar
          
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView={"dayGridMonth"}
          //eventAdd={event=>handleEventAdd(event)}          
          editable={true}
          eventDrop= {(info)=> 
            !window.confirm("No se puede cambiar la fecha de la clase!") ?
            info.revert() : info.revert()
                   }
          eventResize={false}          
          headerToolbar={
            {
              start: "prev next", // will normally be on the left. if RTL, will be on the right
              center: "title",
              end: "dayGridMonth timeGridWeek timeGridDay list", // will normally be on the right. if RTL, will be on the left
            }}
            buttonText={
            {
              today:    "hoy",
              month:    "mes",
              week:     "semana",
              day:      "dia",
              list:     "lista"
            }
            }
          height={"50vh"}
          
        />
      </div>
      <div>
        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={(event) => onEventAdded(event) }
          dateSet={(date)=>handleDateSet(date)}
        />
      </div>
      
    </section>
  );
}
export default Calendar