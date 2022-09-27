import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { atom, useRecoilState } from "recoil";
import EventsModal, { EventsModalAtom } from "./EventsModal";
import BookDate, { BookDateAtom } from "./BookDate";
import SuccessfullyBooked from "./SuccessfullyBooked";

// export interface pass {
//   allDay:boolean,
//   end:Date
//   start:Date
// }

// interface events {
//   id:any
//   title:string,
//   start:Date
//   end:Date,
//   allDay?:boolean
//   color?:any
// }

export const EventsDataAtom = atom<any[]>({
  key:"EventsDataAtom",
  default:[{id: '1243601e-1399-42b5-90f7-01bb9ba621eb', title: 'data1', start: new Date(2022,8,27,1,30), end:new Date(2022,8,27,2), allDay: false},
  {id: '1243601e-1399-42bckjsankjc', title: 'data2', start: new Date(2022,8,27,2,20), end:new Date(2022,8,27,3), allDay: false},
  {id: '1243601ekjcbs-90f7-01bb9ba621eb', title: 'data3', start: new Date(2022,8,27,3,20), end:new Date(2022,8,27,4), allDay: false},
  {id: 'kcjbsalj-1399-42b5-90f7-01bb9ba621eb', title: 'data4', start: new Date(2022,8,27,4,30), end:new Date(2022,8,27,6), allDay: false},
  {id: '12436,hagsvckhb9ba621eb', title: 'data5', start: new Date(2022,8,28,1,30), end:new Date(2022,8,28,2), allDay: false},
  {id: '12436,hagsvsadfg1eb', title: 'data6', start: new Date(2022,8,28,2,20), end:new Date(2022,8,28,3,10), allDay: false},
  {id: '12dsfdghjfghagsvckhb9ba621eb', title: 'data7', start: new Date(2022,8,28,5,10), end:new Date(2022,8,28,6), allDay: false},

  ]
})


const FullCalendarr = () => {
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom)
  const [passEvent,setPassEvents]=useState<any>({} as any)
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);
  const [bookDateState,setBookDateState]=useRecoilState(BookDateAtom)

  
  

  const handleEventClick = (clickInfo: any) => {
    // setEventModal(true)
    // setPassEvents(clickInfo)


    setBookDateState(true)
    setPassEvents(clickInfo)

  };

  // const handleDateSelect = (selectInfo: any) => {
    
  //   setEventModal(true)
  //   setPassEvents(selectInfo)

  // };


  return (
    <div className="px-20">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        // selectable={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        // select={handleDateSelect}
        editable= {false}
        events={eventsData}
        />
      <EventsModal selectInfo={passEvent}/>
      <BookDate selectInfo={passEvent}/>
      <SuccessfullyBooked />

    </div>
  );
};

export default FullCalendarr;




 

