import React, { useState } from 'react';
import styled from 'sty'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
// import moment from 'moment';


function Calender() {
  const [value, onChange] = useState(new Date());
  

  return (
    <CalenderWrap>
      <Calendar onChange={onChange} value={value} />
    </CalenderWrap>
  );
}

const CalenderWrap = styled.div`
    width: 100%;
    height: 100%;
`




export default Calender;