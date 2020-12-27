import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import "./styles.css";
import Modal from 'react-modal';
import{ useStateValue } from '../StateProvider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {getEventList} from './build'
Modal.setAppElement('#root');

export default function Calendar({ value, onChange }) {
  const [{events},dispatch]=useStateValue();
  const [calendar, setCalendar] = useState([]);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const [event,setEvent]=useState('');
  const [day,setDay]=useState(moment());
  const [description,setDescription]=useState('')
  const [startTime,setStartTime]=useState('')
  const [endTime,setEndTime]=useState('');

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function buildCalendar(date) {
    const a = [];

    const startDay = date.clone().startOf("month").startOf("week");
    const endDay = date.clone().endOf("month").endOf("week");

    const _date = startDay.clone().subtract(1, "day");

    while (_date.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => _date.add(1, "day").clone())
      );
    }
    return a;
  }

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }
  function AfterMonth(day) {
    return moment(day).isAfter(new Date(), "month");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "before";
  //  if (AfterMonth(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }

  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }
  const closemodal=()=>{
    setModalIsOpen(false)
   
  }
  const openModal=()=>{
    setModalIsOpen(true)
  }
  const addEvent=()=>{
     dispatch({
       type:'ADD_EVENTS',
       payload:{
         title:event,
         day:day,
         description:description,
         startTime:startTime,
         endTime:endTime
       }
     })
     setDescription('');
     setEndTime('');
     setStartTime('')
     setEvent('')
  }
  console.log(events)
  //const eventOnDay=events.filter(event=>event.time.isSame(day))
  //console.log(eventOnDay);
  return (
    
    <>
    <div className="calendar">
      <Header value={value} onChange={onChange} />

      <div className="body">
        <div className="day-names">
          {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((d) => (
            <div className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi} >
            {week.map((day, di) => (
              <div
                key={di}
                className="day"
                onClick={() => {
                  if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);
                  setDay(day);
                  openModal();
                }}
              >
                <div className={dayStyles(day)}>
                  {day.format("D").toString()}
                    {getEventList(day,events)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <Modal
          isOpen={modalIsOpen}
             onRequestClose={closemodal}
             className="Modal"
             overlayClassName="Overlay">
               <div className="modal">
                 <h4>Add Event</h4>
                 <span>Title</span>
                 <input type="text" onChange={(e)=>setEvent(e.target.value)}/>
                 <span>Description</span>
                 <textarea rows="5" cols="25" value={description}
                  onChange={e=>setDescription(e.target.value)}/>
                 <section >
                   <section className="modal__time">
                     <span>Start Time</span>
                      <input type="time" value={startTime}
                       onChange={e=>setStartTime(e.target.value)}/>
                   </section>
                   <section className="modal__time">
                      <span>End Time</span>
                      <input type="time" value={endTime} 
                      onChange={e=>setEndTime(e.target.value)}/>
                      </section>
                 </section>
                 
                 <button onClick={()=>addEvent()} >Add</button>
                 
               </div>
       
    </Modal>
    </>
  );
}