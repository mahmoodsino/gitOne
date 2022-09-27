import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { atom, useRecoilState } from 'recoil';
import ViewBookedDateModal, { ViewBookedDateModalAtom } from './ViewBookedDateModal';


interface person { 
  firstName:string,
  lastName:string,
  phone:number
  id:any
}

export const BookDatetToViewAtom = atom<any[]>({
  key:"BookDatetToViewAtom",
  default:[]
})

export const personDataAtom = atom<person[]>({
  key:"personDataAtom",
  default:[]
}) 

const FullCalendarView = () => {
  const [bookedDateToView,setBookedDateToView]=useRecoilState(BookDatetToViewAtom)
  const [personData,setPersonData]=useRecoilState(personDataAtom)
  const [viewBookedDateModalAtomState,setViewBookedDateModalAtomState]=useRecoilState(ViewBookedDateModalAtom)
  const [info ,setInfo]=useState()

  const handleEventClick = (clickInfo: any) => {
    setInfo(clickInfo)
    setViewBookedDateModalAtomState(true)
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
        // selectable={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        editable= {false}
        events={bookedDateToView}
        />
      <ViewBookedDateModal selectInfo={info}/>
    </div>
  )
}

export default FullCalendarView
