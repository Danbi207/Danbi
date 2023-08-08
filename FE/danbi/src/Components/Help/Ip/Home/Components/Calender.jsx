import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { authPost } from '../../../../../Util/apis/api';

const Calendar = () => {
  const [year,setYear] = useState((new Date()).getFullYear()); // 연도 저장 2023
  const [month,setMonth] = useState((new Date()).getMonth()); // 달(현재-1) 저장 7
  const [help,setHelpData] = useState({});  // help 정보 저장
  const [weekCnt, setWeekCnt] = useState(6);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeek = (year, month) => {
    //DO : 해당 달의 주차 수를 계산
    const endDay = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    return Math.ceil((endDay + startDay) / 7);
  };

  const getHelpData = (year,month,day) =>{
    month+=1;
    if(month < 10){ //달력포맷팅 1 -> 01
      month = "0"+month;
    }
    if(day < 10){ //날짜포맷팅 1 -> 01
      day = "0"+day;
    }
    
    if(!(year in help)){ //year가 help 있는지 판단
      return [];
    }
    
    if(!(month in help[year])){ //month가 help[year]에 있는지 판단
      return [];
    }
    
    if(!(day in help[year][month])){ //day가 help[year][month]에 있는지 판단
      return [];
    }

    return help[year][month][day];
  }

  // 캘린더에서 달마다 목록을 가져오게 만들기
  const GetMonth = useCallback(async () => {
    let temp = month+1;
    if(temp < 10){
      temp = "0"+month;
    }
    const res = {};
    try {
      const data = await authPost('api/v1/help/registers', {"yearAndMonth" : year+"-"+temp+"-01"});
      if (data) {
        for(let i = 0; i < data.data.helpList.length; i++){
          const temp = data.data.helpList[i].startTime.split(" "); //[yyyy-MM-dd,HH:mm]
          const date = temp[0].split("-"); //[year,month,day]
          
          if(!(date[0] in res)){ //year가 res안에 있는지 판단
            res[date[0]]={}; //없다면 객체생성
          }
  
          if(!(date[1] in res[date[0]])){ //month가 res[year]에 있는지 판단
            res[date[0]][date[1]]={}; //없다면 객체s생성
          }
          
          if(!(date[2] in res[date[0]][date[1]])){ //day가 res[year][month]에 있는지 판단
            res[date[0]][date[1]][date[2]]=[]; //없다면 배열생성
          }
  
          res[date[0]][date[1]][date[2]].push(data.data.helpList[i]); //res[year][month][day]에 data를 push
        }
      }
      setHelpData(res);
      console.log(res);
    }
    catch (error) {
      setHelpData(res);
      console.error("에러 발생", error);
    }
  },[year, month])

  // useEffect(()=>{
  //   GetMonth();
  // }, [GetMonth]);
  
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

  useEffect((year, month) => {
    //DO : 달이 바뀔때마다 주차 수를 자동으로 계산
    setWeekCnt(getWeek(year, month));
    GetMonth();
  }, [year, month, GetMonth]);

  // 요일을 가져오는 로직
  const getWeekItems = () => {
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
  }

  // 날짜를 가져오는 로직
  const getCalenderItems = ()=>{
    const res = [];
    const startDate = new Date(year,month,1); //현재달 1일
    const endDate = new Date(year,(month+1),0); //현재달 마지막날
    const lastEndDate = new Date(year, month, 0) // 전달의 마지막 날
    const nextStartDate = new Date(year, (month +2), 1) // 다음 달의 1일d

    for (let i = startDate.getDay()-1; i >= 0; i--){ // 첫째 날 전일에 날짜 넣기
      res.unshift(
        <CalenderItem className='not-valid' key={'lastMonth' + lastEndDate.getDate()}>{lastEndDate.getDate()}</CalenderItem>
      );
      lastEndDate.setDate(lastEndDate.getDate() - 1);
    }

    for(let i = startDate.getDate(); i <= endDate.getDate(); i++){ //달력값 넣기
      let className = 'valid'
      
      if (selectedDate.getFullYear() === year 
            && selectedDate.getMonth() === month
            && selectedDate.getDate() === i) {
          className = 'selected';
      }

      res.push(<CalenderItem
        className={className}
        onClick={()=>{
        getHelpData(year ,month, i);
        console.log(getHelpData(year ,month, i));
        }} key={"calender"+i}>{i}</CalenderItem>)
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
  }

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
          getWeekItems()
        }
      </DaysWrap>
      <Body $weekCnt={weekCnt}>
        {
          getCalenderItems()
        }
      </Body>
    </CalenderWrap>
  )
}

const CalenderWrap = styled.div `
  width: 100%;
  height: 100%;
`

const HeaderWrap = styled.div `
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  /* background-color: #7979ff; */
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
  /* padding-left: 1rem; */

  &>.month{
    margin-right: 1rem;
    font-size: 1.6rem;
    /* padding-left: 0; */
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
    /* color: gray; */

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
  background-color:#ebcfc6;
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
  border : 1px solid #000;
  border-radius: 0.5rem;
  margin: 0.1rem;
  font-size: 0.8rem;
  padding: 2px 0 0 2px;

  &.not-valid{
    color : #c4c4c4;
  }

  &.valid{
    &:hover {
      transform: scale(1.01);
      box-shadow: 1.5px 1.5px 0 rgba(0, 0, 0, 0.1), 0.1;
      border: none;
      background-color: #c4c4c4;
    }
  }

  &.selected {
    transform: scale(1.02);
    box-shadow: 1.5px 1.5px 0 rgba(0, 0, 0, 0.1), 0.1;
    border: none;
    background-color: #f3c5b6;
    font-weight: 600;
  }
`



export default Calendar