import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputCalender = () => {
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <CalWrap>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      shouldCloseOnSelect={false}
    />
    </CalWrap>
  );
};

const CalWrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
`

export default InputCalender;