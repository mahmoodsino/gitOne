import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { atom, useRecoilState } from "recoil";
import EventsModal, { EventsModalAtom } from "./EventsModal";
import BookDate, { BookDateAtom } from "./BookDate";
import SuccessfullyBooked from "./SuccessfullyBooked";
import { EventsDataAtom } from "./ReservationFullCalandar";
import listPlugin from '@fullcalendar/list'

const FullCalendarr = () => {
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom);
  const [passEvent, setPassEvents] = useState<any>({} as any);
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);
  const [bookDateState, setBookDateState] = useRecoilState(BookDateAtom);

  const handleEventClick = (clickInfo: any) => {
    setBookDateState(true);
    setPassEvents(clickInfo);
  };

  return (
    <div className="px-20">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        // select={handleDateSelect}
        navLinks={true}
        editable={false}
        
        slotMinTime= '8:00:00'
        slotMaxTime= '19:00:00'
        events={eventsData}
      />
      <EventsModal selectInfo={passEvent} />
      <BookDate selectInfo={passEvent} />
      <SuccessfullyBooked />
    </div>
  );
};

export default FullCalendarr;
