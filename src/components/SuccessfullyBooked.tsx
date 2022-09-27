import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseIcon from "./icon/CloseIcon";

export const SuccessfullyBookedAtom = atom({
  key: "SuccessfullyBookedAtom",
  default: false,
});

const SuccessfullyBooked = () => {
  const [successfullyBookedState, setSuccessfullyBookedAState] = useRecoilState(
    SuccessfullyBookedAtom
  );
  return (
    <>
      <div
        className={`${
          successfullyBookedState ? "top-0" : "-top-[200%]"
        } inset-0 sm:w-[95%] bg-white md:w-[50%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-200 ease-in-out`}
      >
        <div className=" ">
          <button onClick={() => setSuccessfullyBookedAState(false)}>
            <CloseIcon className="w-7" />
          </button>
          <div className="flex justify-center items-center py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-check-square fill-green-700 w-12 mr-3"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
            </svg>
            <span className="font-bold ">we successfull booked the appointment </span>
          </div>
        </div>
      </div>
      {successfullyBookedState ? (
        <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
      ) : null}
    </>
  );
};

export default SuccessfullyBooked;
