import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import "./styles.css";
import Modal from 'react-modal';
import{ useStateValue } from '../StateProvider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {getEventList} from './build'
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {db} from '../firebase'
Modal.setAppElement('#root');


export default function Calendar({ value, onChange }) {
  const [state,dispatch]=useStateValue();
  const [calendar, setCalendar] = useState([]);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const [modalIsOpen_2,setModalIsOpen_2]=useState(false);
  const [event,setEvent]=useState('');
  const [day,setDay]=useState(moment());
  const [description,setDescription]=useState('')
  const [startTime,setStartTime]=useState('')
  const [endTime,setEndTime]=useState('');
  const [search,setSearch]=useState('');
  const [listOfEvent,setListOfEvent]=useState([]);
  const [error,setError]=useState('');
  useEffect(() => {
    setCalendar(buildCalendar(value));

  }, [value]);
  useEffect(()=>{
      db.collection('events').onSnapshot((snapshot)=>{  
        setListOfEvent( 
           snapshot.docs.map((doc)=>doc.data()))
         
        
      })
      
  },[])
  console.log(listOfEvent)
  // const sentMessage=e=>{
  //   e.preventDefault();
  //  db.collection('channels').doc(ChannelId).collection('message')
  //  .add({
  //    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  //    message:input,
  //    user:user
  //  });
  //  setInput('');
  // };
  useEffect(()=>{
    dispatch({
      type:'ADD_EVENTS',
      payload:listOfEvent
      
    })
  },[listOfEvent])
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
  const closemodal_2=()=>{
    setModalIsOpen(false)
    setModalIsOpen_2(false)
  }
  const openModal_2=()=>{

    setModalIsOpen_2(true)
  }
  const addEvent=()=>{
    if(event==='' || day==='' || description===''
     || startTime==='' || endTime===''){
      setError('Please fill all the details!!')
      return;
    }else{
    setError('');
     dispatch({
       type:'ADD_EVENTS',
       payload:[{
        title:event,
        day:day.toDate(),
        description:description,
        startTime:startTime,
        endTime:endTime
       }]
       
     })
     db.collection('events')
       .add({
           title:event,
           day:day.toDate(),
           description:description,
           startTime:startTime,
           endTime:endTime
      });
     setDescription('');
     setEndTime('');
     setStartTime('')
     setEvent('')
    }
  }
  console.log(state)
  //const eventOnDay=events.filter(event=>event.time.isSame(day))
  //console.log(eventOnDay);
  let eventList=state?.filter((state)=>state?.title?.toLowerCase().includes(search?.toLowerCase()));
  eventList=state?.filter((state)=>state?.description?.toLowerCase().includes(search?.toLowerCase()))
  return (
    
    <>
    <div className="calendar">
      <Header value={value} onChange={onChange} search={search} setSearch={setSearch} />

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
                    {getEventList(day,eventList,openModal_2)}
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
                <div className="Modal_header">
                 <MoreHorizIcon/>
                 <CloseIcon onClick={closemodal}/>
               </div>
               <div className="modal">
              
                 <h4>Add Event</h4>
                 
                 <span>Title</span>
                 <input className="modal__input"type="text" 
                 placeholder="Enter your title"
                  onChange={(e)=>setEvent(e.target.value)}/>
                 <span>Description</span>
                 <textarea rows="5" cols="25"
                 placeholder="Enter your description"
                  value={description}
                  onChange={e=>setDescription(e.target.value)}/>
                 <section >
                   <section className="modal__time">
                     <span>Start Time</span>
                      <input type="time" 
                       
                       value={startTime}
                       onChange={e=>setStartTime(e.target.value)}/>
                   </section>
                   <section className="modal__time">
                      <span>End Time</span>
                      <input type="time" value={endTime} 
                      onChange={e=>setEndTime(e.target.value)}/>
                      </section>
                 </section>
                {error && <p style={{color:'red'}}>{error}</p>}
                 <button onClick={()=>addEvent()} >Add</button>
                 
               </div>
       
    </Modal>
    <Modal
     isOpen={modalIsOpen_2}
     onRequestClose={closemodal_2}
     className="Modal_2"
     overlayClassName="Overlay">
       <div className="Modal_header">
                 <MoreHorizIcon/>
                 <CloseIcon onClick={closemodal_2}/>
               </div>
      <section className="Modal_2__section">
      <table>
                   {state?.filter(event=>event.day.seconds===day.toDate().getTime()/ 1000)?.map((m,index)=>
                   
                  <tr className="Modal_2__section__info">
                    <td className={"Modal_2__section__title"}><p  key={index}>{m.title}</p></td>
                   <td className={"Modal_2__section__description"}><p  >{m.description}</p></td>
                   <td className={"Modal_2__section__time"} > <p  >{m.startTime}</p></td>--
                  <td className={"Modal_2__section__time"} ><p >{m.endTime}</p></td> </tr>
                   
          )}
          </table>
                 </section>
    </Modal>
    </>
  );
}