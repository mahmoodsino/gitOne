import React from "react";
import { atom, useRecoilState } from "recoil";
import { BookDatetToViewAtom } from "../View/FullCalendarView";

export const ConfirmDeleteAtom = atom({
  key: "ConfirmDeleteAtom",
  default: false,
});

interface Props {
  selectInfo: any;
}

const ConfirmDelete = ({ selectInfo }: Props) => {
  const [confirmDeleteState, seTConfirmDeletState] =
    useRecoilState(ConfirmDeleteAtom);
  const [bookedDateToView, setBookedDateToView] =
    useRecoilState(BookDatetToViewAtom);

  const handelCancelApp = () => {
    const dates = bookedDateToView.filter(
      (date) => date.id !== selectInfo?.event?.id
    );
    setBookedDateToView(dates);
    seTConfirmDeletState(false);
  };
  return (
    <>
      <div
        className={`${
          confirmDeleteState ? "opacity-100 visible" : " opacity-0 invisible"
        } inset-0 sm:w-[95%] bg-white md:w-[50%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-200 ease-in-out`}
      >
        <div className=" pb-5 flex justify-center  ">
          <div className="w-[60%]">
            <span className="text-lg font-bold block mt-3 text-center">
              Are You Sure!!
            </span>
            <div className=" flex justify-between mt-5">
              <button
                onClick={() => handelCancelApp()}
                className="px-5 py-1 border border-red-600 text-red-600 font-bold "
              >
                Yes
              </button>
              <button
                onClick={() => seTConfirmDeletState(false)}
                className="px-5 py-1 border border-black font-bold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {confirmDeleteState ? (
        <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
      ) : null}
    </>
  );
};

export default ConfirmDelete;
