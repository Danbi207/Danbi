import React, { useState } from 'react'
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';


const RenderHeader = ({ currentMonth, prevMonth, nextMonth}) => {
  return (
    <HeaderWrap>
      <HeaderStart>
        <HeaderText>
          <HeaderTextmonth>{format(currentMonth, 'M')}월</HeaderTextmonth>
          {format(currentMonth, 'yyyy')}
        </HeaderText>
      </HeaderStart>
      <HeaderEnd>
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} className='Icon'></Icon>
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} className='Icon'></Icon>
      </HeaderEnd>
    </HeaderWrap>
  )
}

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    )
  }

  return <Days>{days}</Days>
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++){
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day}
          onClick={() => {
            onDateClick(cloneDay); 
            alert(`너가 클릭한건 ${format(cloneDay, 'yyyy-MM-dd')}`)
          }}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''}
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <BodyRow key={day}>
          {days}
      </BodyRow>
    );
    days = [];
  }
  return <Body>{rows}</Body>
};

const Calender3 = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = ()=> {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const onDateClick = (day) => {
    setSelectedDate(day);
  }

  return (
    <CalenderWrap>
      <RenderHeader 
        currentMonth={currentMonth} 
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays/>
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </CalenderWrap>
  )
}

const CalenderWrap = styled.div `
  width: 90%;
  height: 100%;
  position: relative;
  left: 5%;
  top: 5%;
  /* background-color: red; */
`

const HeaderWrap = styled.div `
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  /* background-color: blue; */
`

const HeaderStart = styled.div`
  width : 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const HeaderEnd = styled.div`
  width : 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  &>.Icon{
    width: 11%;
    height: fit-content;
    width: fit-content;
    margin-left: 5%;
    color: gray;

    &:hover {
      transform: scale(1.2);
      color: darkgray;
    }
  }

`
const HeaderText = styled.span`
  font-size: 1rem;
  font-weight: 600;
`

const HeaderTextmonth = styled.span`
  margin-right: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const Days = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 2px;

  &>.col{
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    padding-left: 1%;
    background-color:   #ebcfc6;
    color : #000; 
    border-radius: 10px;
  }
`

const Body = styled.div`
  width: 100%;
  height: 89%;
  display: flex;
  flex-direction: column;
`

const BodyRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &>.col{
    width: 15%;
    height: 93%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    border: 0.4px solid gray;
    border-radius: 3px;
    font-size: 0.8rem;
   
    &>span{
      margin : 4px 0 0 4px;
    }

    &>.not-valid{
      color : #c4c4c4;
    }
  }

  &>.col.cell.valid{
    &:hover {
      transform: scale(1.01);
      border: none;
      background-color: #c4c4c4;
    }
  }

  &>.col.cell.selected {
    transform: scale(1.02);
    box-shadow: 1.5px 1.5px rgba(104, 104, 104, 1), 0.1;
    border: none;
    background-color: #f3c5b6;
    font-weight: 600;
  }
`


export default Calender3;