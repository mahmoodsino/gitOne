import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseIcon from "../icon/CloseIcon";
import { personDataAtom } from "./FullCalendarView";

export const ViewBookedDateModalAtom = atom({
  key: "ViewBookedDateModalAtom",
  default: false,
});
interface Props {
  selectInfo: any;
}

const ViewBookedDateModal = ({ selectInfo }: Props) => {
  const [viewBookedDateModalAtomState, setViewBookedDateModalAtomState] =
    useRecoilState(ViewBookedDateModalAtom);
  const [personData, setPersonData] = useRecoilState(personDataAtom);

  return (
    <>
      <div
        className={`${
          viewBookedDateModalAtomState
            ? "opacity-100 visible"
            : " opacity-0 invisible"
        } inset-0 sm:w-[95%] bg-white md:w-[50%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-200 ease-in-out`}
      >
        <div className=" pb-5 ">
          <button onClick={() => setViewBookedDateModalAtomState(false)}>
            <CloseIcon className="w-7" />
          </button>
          <div className="flex justify-center">
            <div className="w-[60%] ">
              <span className="block justify-center text-center font-bold text-lg mb-10">
                Appointment Details
              </span>

              <div className="flex justify-between items-center ">
                <span className="font-bold text-lg">Start Date: </span>
                <span className="font-semibold">
                  {selectInfo?.event?.start.toLocaleDateString()}{" "}
                  {selectInfo?.event?.start.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">End Date: </span>
                <span className="font-semibold">
                  {selectInfo?.event?.end.toLocaleDateString()}{" "}
                  {selectInfo?.event?.end.toLocaleTimeString()}
                </span>
              </div>

              {personData.map((data) => {
                if (data.id === selectInfo?.event?.id) {
                  return (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">first Name</span>
                        <span className="font-semibold">{data.firstName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">last Name</span>
                        <span className="font-semibold">{data.lastName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">phone</span>
                        <span className="font-semibold">{data.phone}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {viewBookedDateModalAtomState ? (
        <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
      ) : null}
    </>
  );
};

export default ViewBookedDateModal;
