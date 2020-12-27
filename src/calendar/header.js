import React from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
export default function CalendarHeader({ value, onChange }) {
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
      <div className="next" onClick={() => onChange(nextMonth())}>
         <ChevronRightIcon fontSize="large"/>
      </div>
    </div>
  );
}