import React from 'react'
import { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputCalender = () => {
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
        <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        showDisabledMonthNavigation/>
    </div>
  )
}

export default InputCalender;