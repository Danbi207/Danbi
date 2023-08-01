import React from 'react'
import styled from 'styled-components';

import StartTime from '../Calender/StartTime';
import Checkbox from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import { setReserveType } from '../../../store/Slice/ipSlice'

const TimeTpye = () => {
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
			"category" : "etc",
			"face_flag": ip.meetType === 'meet',
			"reservation_flag": ip.meetType === 'reserve', // 예약
			"content": ip.content,
			"start_time" : "2023-01-01 12:00",
			"end_time" : "2023-01-01 13:00",
			"total_time" : 60
  }

  const dispatch = useDispatch();
  const reservetype = useSelector(state => state.ip.reservetype)
  // 도움 요청하기 버튼을 통해서 ip 데이터를 쏠 수 있게
  
  return (
    <Wrap>
        <Boxes>
          <SelectBTN $default='now' $reservetype={reservetype} onClick={()=>{dispatch(setReserveType('now'))}}>즉시</SelectBTN>
          <SelectBTN $default='reserve' $reservetype={reservetype} onClick={()=>{dispatch(setReserveType('reserve'))}}>예약</SelectBTN>
        </Boxes>
        <StartTime ></StartTime>
        <Checkbox></Checkbox>
        <RequestBTN>도움 요청하기</RequestBTN>
    </Wrap>
  )
} 

const Wrap = styled.div`
`

const Boxes = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0rem;
`

const SelectBTN = styled.button`
    width: 9.4rem;
    height: 9.4rem;
    border-radius: 0.75rem;
    font-size: 2.3rem;
    background-color: ${props=> props.$default === props.$reservetype ? '#8383FF' : '#E3E3E3'};
    color : ${props=> props.$default === props.$reservetype ? '#fff' : '#000'};
    display: flex;
    justify-content : center;
    align-items : center;
    transition: 0.5s;
    &:hover {
        background-color: #8383FF;
        color: white;
        transform: scale(1.1);
        transition: 0.5s;
    }
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