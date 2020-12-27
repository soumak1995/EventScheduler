import moment from 'moment'
export default function buildCalendar(value) {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];
    while (day.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
  
    return calendar;
  }
  export const getEventList=(day,events,openModal)=>{
   
    const eventList=events?.filter(event=>event.day.toDate().getTime()===day.toDate().getTime());
    console.log(eventList)
    if(eventList?.length>3){
      const list=eventList?.slice(0,3);
      console.log(list)
      return(
        <>
        {list?.map((m)=><p>{m.title}</p>)}
         <a onClick={openModal}>more</a>
        </>
      )
    }else{
      console.log(events)
      return(events?.filter(event=>event.day.toDate().getTime()===day.toDate().getTime())?.map((event,index)=>
      <p key={index}>{event?.title}</p>
        ))
      
    }
  
  }
  