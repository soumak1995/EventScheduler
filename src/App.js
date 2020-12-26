import React,{useState} from 'react'
import './App.css';
import Calendar from './calendar/index'
import moment from "moment";
function App() {
  const [selectedDate, setSelectedDate] = useState(moment());
  return (
    <div className="App">
       <Calendar value={selectedDate} onChange={setSelectedDate} />;
    </div>
  );
}

export default App;
