import React from 'react'
import { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputCalender = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}/>
    </div>
  )
}

export default InputCalender;