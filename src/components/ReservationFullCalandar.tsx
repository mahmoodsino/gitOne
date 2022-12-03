import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { atom, useRecoilState } from "recoil";
import EventsModal, { EventsModalAtom } from "./EventsModal";
import { BookDateAtom } from "./BookDate";
import listPlugin from "@fullcalendar/list";
import moment from "moment";


export const EventsDataAtom = atom<any[]>({
  key: "EventsDataAtom",
  default: [],
});

const ReservationFullCalandar = () => {
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom);
  const [passEvent, setPassEvents] = useState<any>({} as any);
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);
  const [bookDateState, setBookDateState] = useRecoilState(BookDateAtom);

  const imgg = (clickInfo: any) => {
    return (
      <div style={{backgroundColor:`${(clickInfo.event?.backgroundColor).toString()}`}}  className={`flex  cursor-pointer rounded py-0.5 px-1 border-l-4 `}>
        <div className="w-12">
        <img
          className="h-5 object-contain bg-transparent rounded"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYy3MXcjvjjHgJd877q-SlfK69HcfZ7wlQYhxziOqC&s"
          alt=""
        />

        </div>
        <span>{clickInfo.event.title}</span>
        <span>{moment(clickInfo.event.start).format("hh:mm A")}</span>
      </div>
    );
  };

  const handleEventClick = (clickInfo: any) => {
    setEventModal(true);
    setPassEvents(clickInfo);
  };

  const handleDateSelect = (selectInfo: any) => {
    setEventModal(true);
    setPassEvents(selectInfo);
  };

  return (
    <div className="px-20 ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        selectable={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        slotMinTime="8:00:00"
        slotMaxTime="19:00:00"
        navLinks={true}
        eventContent={imgg}
        select={handleDateSelect}
        editable={false}
        events={eventsData}
        
      />
      <EventsModal selectInfo={passEvent} />
    </div>
  );
};

export default ReservationFullCalandar;
