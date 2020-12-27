import React from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
export default function CalendarHeader({ value, onChange,setSearch,search}) {
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (
    <div className="header">
      <div
        className="previous"
        onClick={() => !thisMonth() && onChange(prevMonth())}
      >
        {!thisMonth() ? <ChevronLeftIcon fontSize="large"/>: null}
      </div>
      <div className="current">
        {currMonthName()} {currYear()}
      </div>
      <div className="search">
        <SearchIcon />
        <input type="text" placeholder="Search your event"  onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="next" onClick={() => onChange(nextMonth())}>
         <ChevronRightIcon fontSize="large"/>
      </div>
    </div>
  );
}