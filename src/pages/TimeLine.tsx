import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import FullCalendar from "@fullcalendar/react";
import { useRecoilState } from "recoil";
import { EventsDataAtom } from "../components/ReservationFullCalandar";
import { useState } from "react";
import EventsModal, { EventsModalAtom } from "../components/EventsModal";
import moment from "moment";

const Cc = () => {
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom);
  const [passEvent, setPassEvents] = useState<any>({} as any);
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);
  const imgg = (clickInfo: any) => {
    return (
      <div
        style={{
          backgroundColor: `${(clickInfo.event?.backgroundColor).toString()}`,
        }}
        className={`flex  cursor-pointer rounded py-0.5 px-1 border-l-4 `}
      >
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

  const calendarOptions = {
    plugins: [
      adaptivePlugin,
      interactionPlugin,
      dayGridPlugin,
      listPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
    ],
    schedulerLicenseKey: "XXX",
    editable: true,
    aspectRatio: 1.8,
    scrollTime: "00:00",
    slotMinTime: "8:00:00",
    slotMaxTime: "19:00:00",
    dayMaxEvents:true,
    

    headerToolbar: {
      left: "today prev,next",
      center: "title",
      right:
        "resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek",
    },
    initialView: "resourceTimelineDay",
    eventClick: handleEventClick,
    select: handleDateSelect,
    selectable: true,
    eventContent: imgg,

    views: {
      resourceTimelineThreeDays: {
        type: "resourceTimeline",
        duration: { days: 3 },
        buttonText: "3 day",
      },
    },
    navLinks:true,
    resourceAreaHeaderContent: "Rooms",
    resources: [
      { id: "a", title: "Auditorium A" },
      { id: "b", title: "Auditorium B", eventColor: "green" },
      { id: "c", title: "Auditorium C", eventColor: "orange" },
      {
        id: "d",
        title: "Auditorium D",
        children: [
          { id: "d1", title: "Room D1" },
          { id: "d2", title: "Room D2" },
        ],
      },
      { id: "e", title: "Auditorium E" },
      { id: "f", title: "Auditorium F", eventColor: "red" },
      { id: "g", title: "Auditorium G" },
      { id: "h", title: "Auditorium H" },
      { id: "i", title: "Auditorium I" },
      { id: "j", title: "Auditorium J" },
      { id: "k", title: "Auditorium K" },
      { id: "l", title: "Auditorium L" },
      { id: "m", title: "Auditorium M" },
      { id: "n", title: "Auditorium N" },
      { id: "o", title: "Auditorium O" },
      { id: "p", title: "Auditorium P" },
      { id: "q", title: "Auditorium Q" },
      { id: "r", title: "Auditorium R" },
      { id: "s", title: "Auditorium S" },
      { id: "t", title: "Auditorium T" },
      { id: "u", title: "Auditorium U" },
      { id: "v", title: "Auditorium V" },
      { id: "w", title: "Auditorium W" },
      { id: "x", title: "Auditorium X" },
      { id: "y", title: "Auditorium Y" },
      { id: "z", title: "Auditorium Z" },
    ],
    events: eventsData,
  };

  return (
    <div>
      <FullCalendar {...calendarOptions} />
      <EventsModal selectInfo={passEvent} />
    </div>
  );
};

export default Cc;
