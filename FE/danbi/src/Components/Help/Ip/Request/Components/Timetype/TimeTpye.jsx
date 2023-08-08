import React from 'react'
import styled from 'styled-components';

import Checkbox from './Checkbox';
import { useSelector } from 'react-redux';
import Calendar from '../../../Home/Components/Calender'
import TimeSelect from './TimeSelect';

const TimeTpye = ({location}) => {
  const ip = useSelector(state => state.ip)

  const ipData = {
		"help_id" : 1,
		 "position" : {
				"cur_longitude" : "128.3444",
				"cur_latitude" : "36.119485",
				"cur_addr" : "",
				"dest_longitude" : "128.3444",
				"dest_latitude" : "128.3444",
				"dest_addr" : "", 
				"meet_longitude" : "128.3444",
				"meet_latitude" : "128.3444",
				"meet_addr" : "",
			},
      "category" : "ETC",
      "caution" : "qweqweqwe", // 주의 사항(content)
			"face_flag": ip.meetType === 'meet', // 대면
			"reservation_flag": ip.meetType === 'reserve', // 예약
			"content": ip.content, // 도움 상세정보
			"start_time" : "2023-01-01 12:00",
			"end_time" : "2023-01-01 13:00",
  }

  
  return (
    <Wrap>
      <CalendarWrap>
        <Calendar/>
      </CalendarWrap>
      <SelectWrap>
        <TimeSelect/>
        <PresetName>이용 시간</PresetName>
        <ButtonWrap>
          <TimeButton>15분</TimeButton>
          <TimeButton>30분</TimeButton> 
          <TimeButton>45분</TimeButton>
          <TimeButton>60분</TimeButton>
        </ButtonWrap>
        <Checkbox></Checkbox>
        {location.state !== null ? <button>수정</button> : <RequestBTN>도움 요청하기</RequestBTN>}
        </SelectWrap>
    </Wrap>
  )
} 

const Wrap = styled.div`
  width : 100%;
  height: 100%;
  padding: 1rem;
`

const CalendarWrap = styled.div`
  width: 100%;
  height: 40%;
`

const SelectWrap = styled.div`
  width: 100%;
  height: 40%;
`

const PresetName = styled.div `
  height: 3rem;
  padding: 2rem 0;
`

const ButtonWrap = styled.div`
  width: 100%;
  height: 17%;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  place-items: center;
  grid-row-gap: 0.5rem;
`

const TimeButton = styled.button`
  width: 8rem;
  height: 2rem;
  font-size: 1.2rem;
  border: 1px solid #000;
  border-radius: 5rem;
  background-color: white;
`

const RequestBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 5rem;
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  color: ${props=>props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
  }
`

export default TimeTpye;