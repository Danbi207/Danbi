import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const week = ["일","월","화","수","목","금","토"];
const Calendar = () => {
  const [year,setYear] = useState((new Date()).getFullYear()); // 연도 저장하기
  const [month,setMonth] = useState((new Date()).getMonth()); // 달 저장
  const [help,setHelpData] = useState({});  // help 정보 저장

  const getWeekItems = () => {
    const res = [];
    for(let i = 0; i < 7; i++){//한 주 가져오기
      res.push(<CalenderItem key={week[i]}>{week[i]}</CalenderItem>);
    }
    return res;
  }

  const getHelpData = (year,month,day) =>{
    month+=1;
    if(month < 10){//달력포맷팅 1 -> 01
      month = "0"+month;
    }
    if(day < 10){//날짜포맷팅 1 -> 01
      day = "0"+day;
    }
    
    if(!(year in help)){//year가 help 있는지 판단
      return [];
    }
    
    if(!(month in help[year])){//month가 help[year]에 있는지 판단
      return [];
    }
    
    if(!(day in help[year][month])){//day가 help[year][month]에 있는지 판단
      return [];
    }

    return help[year][month][day];
  }
  useEffect(()=>{
    //DO : IP 도움목록을 불러와 데이터 저장
    const res = {};
    axios({
      method:"get",
      url:`${process.env.PUBLIC_URL}/IpCalendarList.json`
    }).then(({data})=>{
      for(let i = 0; i < data.data.helpList.length; i++){
        const temp = data.data.helpList[i].startTime.split(" ");//[yyyy-MM-dd,HH:mm]
        const date = temp[0].split("-");//[year,month,day]

        if(!(date[0] in res)){//year가 res안에 있는지 판단
          res[date[0]]={};//없다면 객체생성
        }

        if(!(date[1] in res[date[0]])){//month가 res[year]에 있는지 판단
          res[date[0]][date[1]]={};//없다면 객체s생성
        }

        if(!(date[2] in res[date[0]][date[1]])){//day가 res[year][month]에 있는지 판단
          res[date[0]][date[1]][date[2]]=[];//없다면 배열생성
        }

        res[date[0]][date[1]][date[2]].push(data.data.helpList[i]);//res[year][month][day]에 data를 push
      }

      setHelpData(res);
      console.log(res);
    }).catch((err)=>console.log(err));
    setHelpData(res);
  },[]);

  const nextMonth = ()=> {
    let temp = month+1;
    if(temp === 12){
      setMonth(0);
      setYear(year+1);
    }else{
      setMonth(month+1);
    }
  }

  const prevMonth = ()=>{
    let temp = month-1;
    if(temp === -1){
      setMonth(11);
      setYear(year-1);
    }else{
      setMonth(month-1);
    }
  }

  const getCalenderItems = ()=>{
    const res = [];
    const startDay = new Date(year,month,1);//현재달 1일
    const endDay = new Date(year,(month+1),0);//현재달 마지막날

    let emptyIdx = 0;

    for(let i = 0; i < startDay.getDay(); i++){//빈값 넣기
      res.push(<CalenderItem key={"empty"+emptyIdx++}></CalenderItem>)
    }
    console.log(startDay.getDay());
    for(let i = startDay.getDate(); i <= endDay.getDate(); i++){//달력값 넣기
      res.push(<CalenderItem onClick={()=>{
        // console.log(help)
        console.log(getHelpData(year,month,i));
        // axios({
        //   method:"get",
        //   url:`~?year=${year}&month=${month+1}&day=${i}`
        // }).then(({data})=>{
        //   props.setData(data);
        // })
        }} key={"calender"+i}>{i}</CalenderItem>)
    }

    for(let i = endDay.getDay(); i < 6; i++){//남은 빈값 넣기
      res.push(<CalenderItem key={"empty"+emptyIdx++}></CalenderItem>)
    }
    
    return res;
  }
  return (
    <>
      <ButtonWrap>
        <button onClick={prevMonth}>이전</button> {year}년 {month+1}월 <button onClick={nextMonth}>다음</button>
      </ButtonWrap>
      <WeekWrap>
        {
          getWeekItems()
        }
      </WeekWrap>
      <CalenderWrap>
        {
          getCalenderItems()
        }
      </CalenderWrap>
    </>
  )
}

const WeekWrap = styled.div`
  margin-left: 10%;
  width: 80%;
  height: 2rem;
  display: grid;
  grid-template-columns: repeat(7,1fr);
`

const ButtonWrap = styled.div`
  font-size: 1.5rem;
  padding: 2rem 0;
  margin-left: 20%;
  width: 60%;
  display: flex;
  justify-content: space-around;
  &>:button{
    width: 10rem;
  }
`
const CalenderItem = styled.div`
  border : 1px solid #000;
  border-radius: 0.5rem;
  margin: 0.1rem;
`
const CalenderWrap = styled.div`
  margin-left: 10%;
  width: 80%;
  height: 40%;
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-template-rows: repeat(6,1fr);
`
export default Calendar