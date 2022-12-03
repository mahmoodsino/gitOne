import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import BookCalender from "./pages/BookCalender";
import EditCalendar from "./pages/EditCalendar";
import ViewCalendar from "./pages/ViewCalendar";
import ReservationFullCalandar from "./components/ReservationFullCalandar";
import Cc from "./pages/TimeLine";
import { useEffect, useState } from "react";


const routse = [
  { path: "/", name: "Book", Component: BookCalender },
  { path: "/viewcalendar", name: "View", Component: ViewCalendar },
  { path: "/editcalendar", name: "edit", Component: EditCalendar },
  { path: "/reservationcalandar", name: "Reservation", Component: ReservationFullCalandar },
  { path: "/timeline", name: "Time Line", Component: Cc },
];



function App() {
  const { pathname } = useLocation();
  const [offline,setOffline]=useState(false)


  useEffect(() => {
    if(!navigator.onLine){
      setOffline(true);
    }else{
      setOffline(false);
      
    }
  },[])

  return (
    <div className="">
      {!offline ?
      <div className=" ">
        <div className="flex space-x-10 mb-10 py-3   justify-center bg-gray-200">
          {routse.map((route,i) => {
            return(
              <Link key={i} className={`${
                pathname.slice(1) !== route.path.slice(1)
                  ? "font-semibold"
                  : "underline font-bold"
              }`} to={route.path}>
              {route.name}
            </Link>
            )
          })}
          </div>

        <Switch>
          <Route exact path="/" component={BookCalender} />
          <Route path="/viewcalendar" component={ViewCalendar} />
          <Route path="/editcalendar" component={EditCalendar} />
          <Route path="/reservationcalandar" component={ReservationFullCalandar} />
          <Route path="/timeline" component={Cc} />

        </Switch>
      </div> : 
      <h1>you are offline now</h1>
      
    }
    </div>
  );
}

export default App;
