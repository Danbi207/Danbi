import React,{ useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from "../../../Common/Footer/Footer";
import Header from "../../../Common/Header/Header";
import Time from './Components/Time/Time';
import Setting from "./Components/Setting/Setting";
const Request = () => {
  const [tap,setTap] = useState("time");
  const [year,setYear] = useState((new Date()).getFullYear()); // 연도 저장 2023
  const [month,setMonth] = useState((new Date()).getMonth()); // 달(현재-1) 저장 7
  const [day,setDay] = useState((new Date()).getDate());
  const [noon,setNoon] = useState("오전");
  const [hour,setHour] = useState(1);
  const [minute,setMinute] = useState(5);
  const [useTime,setUseTime] = useState(15);
  const [genderOption,setGenderOption] = useState(false);
  useEffect(()=>{console.log(day)},[day]);

  return (
    <Wrap>
      <Header></Header>
      <Tap>
        <TapItem $on = {tap==="time"} onClick={()=>setTap("time")}>시간예약</TapItem>
        <TapItem $on = {tap==="setting"} onClick={()=>setTap("setting")}>상세설정</TapItem>
      </Tap>
      <div>
        {
          tap==="time" ? <Time setGenderOption={setGenderOption} genderOption={genderOption} useTime={useTime} setUseTime={setUseTime} setMinute={setMinute} minute={minute} noon={noon} setNoon={setNoon} hour={hour} setHour={setHour} day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear}></Time>:null
        }
        {
          tap==="setting" ? <Setting></Setting>:null
        }
      </div>
      <Footer></Footer>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & >:nth-child(4){
    height: calc(100% - 9.2rem);
    padding: 1rem 30%;
    @media screen and (max-width: 728px) {
      padding: 1rem;
    }
  }
`

const Tap = styled.div`
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: repeat(2,1fr);
`
const TapItem = styled.button`
  border-bottom: 3px solid ${props=>props.$on ? props.theme.colors.titleColor : "transparent"};
`

export default Request