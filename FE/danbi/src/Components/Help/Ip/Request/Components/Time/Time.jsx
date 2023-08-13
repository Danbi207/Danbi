import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from "../Calendar/Calender";

const Time = ({genderOption,setGenderOption,useTime,setUseTime,hour,setHour,minute,setMinute,year,setYear,month,setMonth,day,setDay,setTap,props}) => {
  const [hourSelect,setHourSelect] = useState(false);
  const [minuteSelect,setMinuteSelect] = useState(false);
  return (
    <Wrap>
      <CalendarWrap>
        <Calendar day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} />
      </CalendarWrap>
      <Title>시작 시간</Title>
      <div>
        <Select>
          <div onClick={()=>setHourSelect(!hourSelect)}>{hour}시<SelectImg alt='' src={`${process.env.PUBLIC_URL}/assets/expend.svg`} /></div>
          <Options $open={hourSelect}>
            {
              (new Array(18)).fill(0).map((e,idx)=>
              <Option onClick={()=>{setHourSelect(false);setHour((idx+6));}} key={idx}>{idx+6}시</Option>)
            }
          </Options>
        </Select>
        <Select>
          <div onClick={()=>setMinuteSelect(!minuteSelect)}>{minute}분<SelectImg alt='' src={`${process.env.PUBLIC_URL}/assets/expend.svg`} /></div>
          <Options $open={minuteSelect}>
            {
              (new Array(11)).fill(0).map((e,idx)=>
              <Option onClick={()=>{setMinuteSelect(false);setMinute(5+idx*5);}} key={idx}>{5+idx*5}분</Option>)
            }
          </Options>
        </Select>
      </div>
      <Title>이용시간</Title>
        <div>
            <UseTimeItem $on={useTime===15} onClick={()=>setUseTime(15)}>15분</UseTimeItem>
            <UseTimeItem $on={useTime===30} onClick={()=>setUseTime(30)}>30분</UseTimeItem>
            <UseTimeItem $on={useTime===45} onClick={()=>setUseTime(45)}>45분</UseTimeItem>
            <UseTimeItem $on={useTime===60} onClick={()=>setUseTime(60)}>60분</UseTimeItem>
        </div>
      <Title>선택사항</Title>
      <Label><input onChange={()=>setGenderOption(!genderOption)} checked={genderOption} type="checkbox"/><div>동성이었으면 좋겠어요</div></Label>
      <RequestBtn onClick={()=>(setTap("setting"))}>다음</RequestBtn>
    </Wrap>
  )
}
const Label = styled.label`
  height: 3rem;
  margin-left: 1rem;
  display: flex;
  cursor: pointer;
  & > input{
    accent-color: #FFEA7E;
  }

  & > div{
    margin-left: 1rem;
    line-height: 3rem;
    color : ${props=>props.theme.colors.titleColor};
  }
`
const UseTimeItem = styled.button`
  width: 8rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  border: 1px solid #b0b0b0;
  background-color: ${props=>props.$on ? "#FFEA7E":"#fff"};
`

const SelectImg = styled.img`
  position : absolute;
  right: 0;
  width: 2rem;
  height: 2rem;
`
const Select = styled.ul`
  border-radius: 1rem;
  border: 1px solid #b0b0b0;
  width: 8rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  cursor: pointer;
  
  & > :first-child{
    display: flex;
    justify-content: center;
    position: relative;
  }
`
const Option = styled.li`
  flex: 0 0 auto;
  border-bottom: 1px solid #b0b0b0;
  z-index: 1;
`

const Options = styled.div`
  position: relative;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 10rem;
  overflow: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;
  background-color: #fff;
  border: 1px solid #b0b0b0;
  visibility:${props=>props.$open ? "visible" : "hidden"};
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  overflow-y: auto;
  & > * {
    flex: 0 0 auto;
  }
  & > :nth-child(3){
    display: flex;
    height: 2rem;
    width: 100%;
    justify-content: space-evenly;
    margin: 1rem 0;
  }
  & > :nth-child(5){
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    place-items: center;
    grid-row-gap: 1rem;
    margin: 1rem 0;
  }
`

const CalendarWrap = styled.div`
  width: 100%;
  height: 20rem;
  @media screen and (max-width: 768) {
    height: 15rem;
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 900;
  color : ${props=>props.theme.colors.titleColor};
`

const RequestBtn = styled.button`
  margin-left: calc((100% - 20rem)/2);
  border-radius: 1rem;
  font-size: 1.5rem;
  width: 20rem;
  height: 3rem;
  background-color: #FFEA7E;
`

export default Time