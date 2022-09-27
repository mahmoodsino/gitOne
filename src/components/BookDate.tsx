import { atom, useRecoilState } from "recoil";
import { EventsDataAtom } from "./FullCalendar";
import CloseIcon from "./icon/CloseIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookShcema } from "../help/validatoin";
import { SuccessfullyBookedAtom } from "./SuccessfullyBooked";
import { BookDatetToViewAtom, personDataAtom } from "./View/FullCalendarView";


export const BookDateAtom = atom({
  key: "BookDateAtom",
  default: false,
});
interface Props {
    selectInfo: any;
  }

  interface IFormInputs {
    firstName:string,
    lastName:string,
    phone:number
  }

const BookDate = ({selectInfo}:Props) => {
  const [bookDateState, setBookDateState] = useRecoilState(BookDateAtom);
  const [eventsData, setEventsData] = useRecoilState(EventsDataAtom)
  const [successfullyBookedState,setSuccessfullyBookedAState]=useRecoilState(SuccessfullyBookedAtom)
  const [bookedDateToView,setBookedDateToView]=useRecoilState(BookDatetToViewAtom)
  const [personData,setPersonData]=useRecoilState(personDataAtom)

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(BookShcema),
  });

  const submit = (data:IFormInputs) => {
    setBookDateState(false)
    setSuccessfullyBookedAState(true)
    eventsData.map(date => {
      if(date.id===selectInfo?.event?.id){
        setBookedDateToView([...bookedDateToView,date])
      }
    })
    setPersonData([...personData,{
      firstName:data.firstName,
      lastName:data.lastName,
      phone:data.phone,
      id:selectInfo?.event?.id
    }])

    const dates = eventsData.filter(date => date.id!==selectInfo?.event?.id)
    setEventsData(dates)

  }


  return (
    <>
      <div
        className={`${
          bookDateState ? "opacity-100 visible" : " opacity-0 invisible"
        } inset-0 sm:w-[95%] bg-white md:w-[50%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-200 ease-in-out`}
      >
        <div className=" ">
          <button onClick={() => setBookDateState(false)}>
            <CloseIcon className="w-7" />
          </button>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(submit)} className="w-[60%] space-y-3 pb-5">

                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Start Date: </span>
                        <span className="font-semibold">{selectInfo?.event?.start.toLocaleDateString()} {selectInfo?.event?.start.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">End Date: </span>
                        <span className="font-semibold">{selectInfo?.event?.end.toLocaleDateString()} {selectInfo?.event?.end.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="firstname" className="text-lg font-bold">First Name</label>
                        <input  {...(register && { ...register("firstName") })} type="text" className=" border outline-none border-black px-2" id="firstname"  />
                    </div>
                    <p className="text-xs text-red-700">{errors.firstName?.message}</p>
                    <div className="flex justify-between items-center">
                        <label htmlFor="lastname" className="text-lg font-bold">last Name</label>
                        <input  {...(register && { ...register("lastName") })} type="text" className=" border outline-none border-black px-2" id="lastname"  />
                    </div>
                    <p className="text-xs text-red-700">{errors.lastName?.message}</p>

                    <div className="flex justify-between items-center">
                        <label htmlFor="phone" className="text-lg font-bold">phone</label>
                        <input  {...(register && { ...register("phone") })} type="text" className=" border outline-none border-black px-2" id="phone"  />
                    </div>
                    <p className="text-xs text-red-700">{errors.phone?.message}</p>

                    <button type="submit" className="font-semibold border border-black px-1">schedule this date</button>
            </form>
          </div>
        </div>
      </div>
      {bookDateState ? (
        <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
      ) : null}
    </>
  );
};

export default BookDate;
