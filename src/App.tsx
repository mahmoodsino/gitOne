import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import BookCalender from "./pages/BookCalender";
import EditCalendar from "./pages/EditCalendar";
import ViewCalendar from "./pages/ViewCalendar";


const routse = [
  { path: "/", name: "Book", Component: BookCalender },
  { path: "/viewcalendar", name: "View", Component: ViewCalendar },
  { path: "/editcalendar", name: "edit", Component: EditCalendar },
];

function App() {
  const { pathname } = useLocation();

  return (
    <div className="">
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
        </Switch>
      </div>
    </div>
  );
}

export default App;
