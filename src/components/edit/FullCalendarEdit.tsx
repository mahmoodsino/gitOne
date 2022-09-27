import React, { useState } from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import { useRecoilState } from 'recoil';
import { BookDatetToViewAtom } from '../View/FullCalendarView';
import CancelViewBookedDate, { CancelViewBookedDateAtom } from './CancelViewBookedDate';
//@ts-ignore
import ConfirmDelete from './ConfirmDelete';

const FullCalendarEdit = () => {
  const [bookedDateToView,setBookedDateToView]=useRecoilState(BookDatetToViewAtom)
  const [info ,setInfo]=useState()
  const [cancelViewBookedDateState,setCancelViewBookedDateState]=useRecoilState(CancelViewBookedDateAtom)


  const handleEventClick = (clickInfo: any) => {
    setInfo(clickInfo)
    setCancelViewBookedDateState(true)
  };

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
        dayMaxEvents={true}
        eventClick={handleEventClick}
        editable= {false}
        events={bookedDateToView}
        />
        <CancelViewBookedDate selectInfo={info} />
        <ConfirmDelete selectInfo={info}/>
    </div>
  )
}

export default FullCalendarEdit
