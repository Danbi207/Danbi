import React from 'react'
import styled from 'styled-components';

import Checkbox from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../Calender/Calender';
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
        <TimeSelect/>
        <TimeWrap>
        <PresetName>이용 시간</PresetName>

        </TimeWrap>
      </CalendarWrap>
        <Checkbox></Checkbox>
        {location.state !== null ? <button>수정</button> : <RequestBTN>도움 요청하기</RequestBTN>}
    </Wrap>
  )
} 

const Wrap = styled.div`
  width : 100%;
  height: 100%;
`

const CalendarWrap = styled.div`
  width: 90%;
  height: 60%;
`


const TimeWrap = styled.div`
  width: 90%;
  height: 25%;
  background-color: blue;
`

const PresetName = styled.div `
    height: 3rem;
    padding: 1rem;
`


const RequestBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 5rem;
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: #6161FF;
  color: #fff;
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
  }
`

export default TimeTpye;