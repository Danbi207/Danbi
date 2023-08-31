import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const Calendar = ({year,setYear,month,setMonth,day,setDay}) => {
  const [weekCnt, setWeekCnt] = useState(6);

  const getWeek = (year, month) => {
    //DO : 해당 달의 주차 수를 계산
    const endDay = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    return Math.ceil((endDay + startDay) / 7);
  };
  
  const nextMonth = ()=> {
    let temp = month+1;
    if(temp === 12){
      setMonth(0);
      setYear(year+1);
    }else{
      setMonth(month+1);
    }
  };

  const prevMonth = ()=>{
    let temp = month-1;
    if(temp === -1){
      setMonth(11);
      setYear(year-1);
    }else{
      setMonth(month-1);
    }
  };

  useEffect(() => {
    //DO : 달이 바뀔때마다 주차 수를 자동으로 계산
    setWeekCnt(getWeek(year, month));
  }, [year, month]);

  // 요일을 가져오는 로직
  const getWeekItems = useMemo(() => {
    const days = [];
    const week = ["일","월","화","수","목","금","토"];
    for(let i = 0; i < 7; i++){//한 주 가져오기
      days.push(
        <div className='col' key={week[i]}>
          {week[i]}
        </div>
      );
    }
    return days;
  },[])

  // 날짜를 가져오는 로직
  const getCalenderItems = useMemo(()=>{
    const res = [];
    const startDate = new Date(year,month,1); //현재달 1일
    const endDate = new Date(year,(month+1),0); //현재달 마지막날
    const lastEndDate = new Date(year, month, 0) // 전달의 마지막 날
    const nextStartDate = new Date(year, (month +2), 1) // 다음 달의 1일d
    const curDay = new Date();

    for (let i = startDate.getDay()-1; i >= 0; i--){ // 첫째 날 전일에 날짜 넣기
      res.unshift(
        <CalenderItem className='not-valid' key={'lastMonth' + lastEndDate.getDate()}>{lastEndDate.getDate()}</CalenderItem>
      );
      lastEndDate.setDate(lastEndDate.getDate() - 1);
    }

    for(let i = startDate.getDate(); i <= endDate.getDate(); i++){ //달력값 넣기
      let className = 'valid'

      const currentLoopDate = new Date(year, month, i);
      curDay.setHours(0, 0, 0, 0);
      
      // 지난 날짜이면
      if (currentLoopDate.getTime() < curDay.getTime()) {
        className = 'not-valid';
      }

      // 선택된 날이 오늘이면
      if (curDay.getFullYear() === year && curDay.getMonth() === month && day === i) {
        className = 'selected';
      }

      res.push(<CalenderItem
        className={className}
        onClick={()=>{
          setDay(i);
          // dispatch(setCurrentDay([year, month+1, i]))
        }} 
        key={"calender"+i}>{i}</CalenderItem>)
    }
    
    for (let i = endDate.getDay(); i < 6; i++) { // 마지막 날 이후 날짜 넣기
      res.push(
        <CalenderItem 
          className='not-valid' 
          key={"nextStartDate" + nextStartDate.getDate()}>
          {nextStartDate.getDate()}</CalenderItem>
      );
      nextStartDate.setDate(nextStartDate.getDate() + 1);
    }
    return res;
  },[year,month,day,setDay]);

  return (
    <CalenderWrap>
      <HeaderWrap>
        <HeaderStart>
          <HeaderText>
            <HeaderText className='month'>{month+1}월</HeaderText>
            {year}년
          </HeaderText>
        </HeaderStart>
        <HeaderEnd>
          <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} className='Icon'></Icon>
          <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} className='Icon'></Icon>
        </HeaderEnd>
      </HeaderWrap>
      <DaysWrap>
        {
          getWeekItems
        }
      </DaysWrap>
      <Body $weekCnt={weekCnt}>
        {
          getCalenderItems
        }
      </Body>
    </CalenderWrap>
  )
}

const CalenderWrap = styled.div `
  width: 100%;
  height: 100%;
  padding : 1rem 0;
`

const HeaderWrap = styled.div `
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
`

const HeaderStart = styled.div`
  width : 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const HeaderText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color : ${props=>props.theme.colors.titleColor};

  &>.month{
    margin-right: 1rem;
    font-size: 1.6rem;
  }
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

const DaysWrap = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  padding: 2px;
  

  &>.col {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  padding-left: 1%;
  background-color: ${props=>props.theme.colors.CalDayColor};
  color : #000; 
  border-radius: 10px;
  }
`

const Body = styled.div`
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-template-rows: repeat(${(props) => props.$weekCnt}, 1fr);
`

const CalenderItem = styled.div`
  border : 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 0.5rem;
  margin: 0.1rem;
  font-size: 0.8rem;
  padding: 2px 0 0 2px;

  &.not-valid{
    color : ${props=>props.theme.colors.calDateColor};
    pointer-events: none;
  }

  &.valid{
    color : ${props=>props.theme.colors.titleColor};
    /* &:hover {
      transform: scale(1.01);
      border: none;
      background-color: #FFEA7E;
    } */
  }

  &.selected {
    transform: scale(1.02);
    border: none;
    background-color: #FFEA7E;
    font-weight: 600;
  }
`



export default Calendar