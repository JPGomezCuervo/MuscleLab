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

import Events from "./EventsMocks/EventsMocks";

import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//pasar por props isAdmin, token desde app.js ej: <Calendar isAdmin={isAdmin} />
function Calendar() {
 
  const {
    user,
    isAuthenticated,
    } = useAuth0();

  const location = useLocation().pathname;
  useEffect(() => {
    setEvents(Events())
  }, [location]);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null);

  
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
      
  (isAuthenticated ) && (
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
                  fontSize:"1.1rem", 
                  padding:"2px",
                  color: "#fff",
                  background:"orange",
                  borderRadius:"3px",
                  
                }}
                >Calendario </span></p>
      <div className={styles.calendarBody} style={{ position: "relative", 
                  zIndex: 0, 
                   }}>
        {/**modificar para admin */}
        {isAuthenticated && <button onClick={()=>setModalOpen(true)}>Nuevo Evento</button>}
        
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
          height={"48.5vh"}
          
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
  ));
}
export default Calendar



