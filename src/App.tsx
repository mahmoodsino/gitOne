import './App.css';
import {Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda,EventSettingsModel} from "@syncfusion/ej2-react-schedule"
import {DataManager,WebApiAdaptor} from "@syncfusion/ej2-data"

function App() {
  const data :EventSettingsModel = {
    dataSource :[{
      EndTime:new Date(2022,9,24,6,30),
      StartTime:new Date(2022,9,24,7,30)
    }]
  }


  return (
    <div className="App">
      <ScheduleComponent currentView='Month' selectedDate={new Date(2022,9,24)} eventSettings={data}>
        <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
      </ScheduleComponent>
    </div>
  );
}

export default App;
