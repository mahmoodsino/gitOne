import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { atom, useRecoilState } from "recoil";
import EventsModal, { EventsModalAtom } from "./EventsModal";

// export interface pass {
//   allDay:boolean,
//   end:Date
//   start:Date
// }

// interface events {
//   title:string,
//   start:Date
//   end:Date,
//   allDay?:boolean
// }

export const EventsDataAtom = atom<any[]>({
  key:"EventsDataAtom",
  default:[]
})


const FullCalendarr = () => {
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom)
  const [passEvent,setPassEvents]=useState<any>({} as any)
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);

  console.log(eventsData);
  
  

  const handleEventClick = (clickInfo: any) => {
    
    setEventModal(true)
    setPassEvents(clickInfo)
  };

  const handleDateSelect = (selectInfo: any) => {
    setEventModal(true)
    setPassEvents(selectInfo)
  };

  // const handleEvents = (events:any) => {
  //   setEventsData(events);
  // }


  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        selectable={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        editable= {false}
        events={eventsData}
        />
      <EventsModal selectInfo={passEvent}/>

    </div>
  );
};

export default FullCalendarr;
