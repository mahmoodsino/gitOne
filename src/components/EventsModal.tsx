import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import CloseIcon from "./icon/CloseIcon";
import TrashIcon from "./icon/TrashIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventsDataAtom } from "./FullCalendar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schdualeShcema } from "../help/validatoin";
import { v4 } from "uuid";

export const EventsModalAtom = atom({
  key: "eventsModalAtom",
  default: false,
});

interface Props {
  selectInfo: any;
}

interface IFormInputs {
  title: string;
  check: boolean;
}

const EventsModal = ({ selectInfo }: Props) => {
  const [eventModal, setEventModal] = useRecoilState(EventsModalAtom);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom);
  const [colore, setColore] = useState("#00FFFF");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schdualeShcema),
  });

  useEffect(() => {
    if (selectInfo.start) {
      setStartDate(selectInfo.start);
      setEndDate(selectInfo.end);
    } else if (selectInfo.event?.id) {
      setStartDate(selectInfo?.event?.start);
      setEndDate(selectInfo.event?.end);
      setColore(selectInfo.event?.colore);
      setValue("title", selectInfo.event?.title);
      setValue("check", selectInfo.event?.allDay);
    }
  }, [selectInfo]);

  const submit = (data: IFormInputs) => {
    if (selectInfo.event?.id) {
      const index = eventsData.findIndex(
        (date) => date.id === selectInfo.event?.id
      );
      const updateEvet = {
        id: selectInfo.event?.id,
        title: data.title,
        start: startDate,
        end: endDate,
        allDay: data.check,
        color: colore,
      };
      const events = [...eventsData];
      events.splice(index, 1, updateEvet);
      setEventsData(events);
      setEventModal(false);
    } else {
      setEventsData([
        ...eventsData,
        {
          id: v4(),
          title: data.title,
          start: startDate,
          end: endDate,
          allDay: data.check,
          color: colore,
        },
      ]);
      // let calendarApi = selectInfo.view.calendar
      // calendarApi.unselect()
      // calendarApi.addEvent({
      //   id: createEventId(),
      //   title:data.title,
      //   start:startDate,
      //   end: endDate,
      // })
      setEventModal(false);
    }
    setValue("title", "");
    console.log(data.check);
  };
  const deleteEvent = () => {
    if (selectInfo.event?.id) {
      const delet = eventsData.filter(
        (date) => date.id !== selectInfo.event?.id
      );
      setEventsData(delet);
      setEventModal(false);
    }
  };
  return (
    <>
      <div
        className={`${
          eventModal ? "opacity-100 visible" : " opacity-0 invisible"
        } inset-0 sm:w-[95%] bg-white md:w-[50%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-200 ease-in-out`}
      >
        <div className=" ">
          <div className="bg-gray-200 flex justify-between px-3 py-1 ">
            <button onClick={() => setEventModal(false)}>
              <CloseIcon className="w-5" />
            </button>
            <button onClick={() => deleteEvent()}>
              <TrashIcon className="w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit(submit)} className="px-20 py-5">
            <input
              {...(register && { ...register("title") })}
              className="w-full h-10 outline-none border-b border-b-black focus:border-b-blue-800 px-5"
              placeholder="title"
            />
            <div className="mt-5 flex justify-between  space-x-5">
              <DatePicker
                className="outline-none border-b border-b-black w-full"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                showTimeSelect
              />
              <DatePicker
                className="outline-none border-b border-b-black w-full"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                showTimeSelect
              />
            </div>
            <div className="flex items-center mb-4 mt-5">
              <input
                {...register("check")}
                name="check"
                id="disabled-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="disabled-checkbox"
                className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                All Day
              </label>
            </div>
            <div>
              <span className="block">colore</span>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => setColore("#00FFFF")}
                  className={`${
                    colore === "#00FFFF" && "border border-black "
                  } rounded-full p-1`}
                >
                  <span
                    className={`bg-[#00FFFF]  block px-3 py-3 rounded-full`}
                  ></span>
                </button>
                <button
                  type="button"
                  onClick={() => setColore("#7FFFD4")}
                  className={`${colore === "#7FFFD4" && "border border-black"} rounded-full p-1`}
                >
                  <span
                    className={`bg-[#7FFFD4]  block px-3 py-3 rounded-full`}
                  ></span>
                </button>
                <button
                  type="button"
                  onClick={() => setColore("#DC143C")}
                  className={`${colore === "#DC143C" && "border border-black"} rounded-full p-1`}
                >
                  <span
                    className={`bg-[#DC143C]  block px-3 py-3 rounded-full`}
                  ></span>
                </button>
                <button
                  type="button"
                  onClick={() => setColore("#8B008B")}
                  className={`${colore === "#8B008B" && "border border-black"} rounded-full p-1`}
                >
                  <span
                    className={`bg-[#8B008B]  block px-3 py-3 rounded-full`}
                  ></span>
                </button>
                <button
                  type="button"
                  onClick={() => setColore("#FF8C00")}
                  className={`${colore === "#FF8C00" && "border border-black"} rounded-full p-1`}
                >
                  <span
                    className={`bg-[#FF8C00]  block px-3 py-3 rounded-full`}
                  ></span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 px-3 py-1 bg-blue-800 text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      {eventModal ? (
        <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
      ) : null}
    </>
  );
};

export default EventsModal;
