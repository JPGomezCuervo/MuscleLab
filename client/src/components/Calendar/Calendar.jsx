import React, { useEffect, useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"
import AddEventModal from "./AddEventModal/AddEventModal";
import interactionPlugin  from "@fullcalendar/interaction";
import axios from "axios"
import moment from "moment";

import Events from "./EventsMocks/EventsMocks";

import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Calendar() {
 let isAdmin = false; // Declaración inicial con valor predeterminado
  const token = localStorage.getItem("token");
  const {
    user,
    isAuthenticated,
  } = useAuth0();

  const location = useLocation().pathname;
  useEffect(() => {
    setEvents(Events())
  }, [location]);

  token && (isAdmin = true)

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
      
  (isAdmin || isAuthenticated  ) && (
    <section>
      <p style={{ 
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
      <div style={{ position: "relative", 
                  zIndex: 0, 
                  background:"#01356519.5" }}>
        {/**modificar para admin */}
        {isAdmin && <button onClick={()=>setModalOpen(true)}>Nuevo Evento</button>}
        
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



