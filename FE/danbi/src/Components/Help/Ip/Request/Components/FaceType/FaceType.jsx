import React, { useEffect } from 'react'
import styled from 'styled-components'

import HelpDetail from './HelpDetail';
import Preset from './Preset.jsx';
import Positioin from './Positioin';
import { useDispatch, useSelector } from 'react-redux';

import { setMeetType } from "../../../../../../store/Slice/ipSlice"
import { useState } from 'react';
import { useCallback } from 'react';
import { authPost } from '../../../../../../Util/apis/api';

function FaceType({location}) {
  const dispatch = useDispatch();
  const ip = useSelector(state => state.ip)
  const meetType = ip.meetType
  const currentDay = ip.currentDay
  const currentTime = ip.currentTime
  const useTimes = ip.useTimes
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');

  
  // 시작, 끝나는 시간 정하는 로직
  useEffect(()=>{
    // YYYY-MM-DD HH:mm 포맷으로 변환
    const formatDateTime = (day, time) => {
      return `${day[0]}-${String(day[1]).padStart(2, '0')}-${String(day[2]).padStart(2, '0')} ${String(time[0]).padStart(2, '0')}:${String(time[1]).padStart(2, '0')}`;
    };
    
    setStartTime(formatDateTime(currentDay, currentTime));

    // 끝 시간 계산
    let endHour = currentTime[0];
    let endMinute = currentTime[1] + useTimes;

    // 60분을 넘어가면 시간에 1을 더하고, 분에서 60을 빼줍니다.
    while (endMinute >= 60) {
      endHour += 1;
      endMinute -= 60;
    }

    // 만약 시간이 24를 넘어가면, 일자에 1을 더해주고 시간에서 24를 빼줍니다.
    if (endHour >= 24) {
      endHour -= 24;
      currentDay[2] += 1; // 일자에 1을 더해줍니다. (단, 월마다의 일자 한계는 고려하지 않았습니다.)
    }

    setEndTime(formatDateTime(currentDay, [endHour, endMinute]));

    // console.log(`startTime: ${starttime}`);
    // console.log(`endTime: ${endtime}`);
  },[])
  
  
  // authPost 보내는 로직
  const IpRequestHelp = useCallback(async()=> {
    const ipData = {
      "help_id" : 1,
      "position" : {
          "latitude" : ip.position.cur_latitude,
          "longitude" : ip.position.cur_longitude,
          "addr" : ip.position.cur_addr,
          "destLatitude" : ip.position.dest_latitude,
          "destLongitude" : ip.position.dest_longitude,
          "destAddr" : ip.position.dest_addr,
          "meetLatitude" : ip.position.meet_latitude,
          "meetLongitude" : ip.position.meet_longitude,
          "meetAddr" : ip.position.meet_addr,
      },
      "category" : ip.category,
      "caution" : ip.caution,
      "faceFlag": ip.meetType==='face',
      "emergencyFlag": false, 
      "genderFlag" : ip.ischecked,
      "content": ip.content,
      "start_time" : starttime,
      "end_time" : endtime
    }
    try{
      await authPost('/api/v1/help/create', ipData)
      navigator('/help/ip')
    }
    catch (err) {
      console.log(err.error)
    }
  }, [ip, starttime, endtime])


  return (
    <Wrap>
      <Boxes>
        <SelectBTN $default='face' $meetType={meetType} onClick={() => { dispatch(setMeetType('face')); } }>대면</SelectBTN>
        <SelectBTN $default='noface' $meetType={meetType} onClick={() => { dispatch(setMeetType('noface')); } }>비대면</SelectBTN>
      </Boxes>
      { meetType === 'face' ? <Positioin/> : null}  
      <HelpDetail/>
      <Preset/>
      {location.state !== null ? <button>수정</button> : <RequestBTN onClick={()=>{IpRequestHelp()}}>도움 요청하기</RequestBTN>}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 6.2rem);
  
  overflow-y: auto;
  flex-wrap: nowrap;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  }
  &>*{
    flex: 0 0 auto;
  }
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
  background-color: ${props=> props.$default === props.$meetType ? 
    props.theme.colors.buttonbgColor : props.theme.colors.boxColor };
  color : ${props=> props.theme.colors.buttontextColor};
  display: flex;
  justify-content : center;
  align-items : center;
  transition: 0.5s;
  &:hover {
      background-color: ${props=>props.theme.colors.buttonbgColor};
      color: ${props=> props.theme.colors.buttontextColor};
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
  background-color: ${props=>props.theme.colors.buttonbgColor};
  color: ${props=>props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
  }
`

export default FaceType;