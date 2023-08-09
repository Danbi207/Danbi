import React, {useState} from 'react'
import styled from 'styled-components';

import {setUseTimes} from '../../../../../../store/Slice/ipSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const UseTime = () => {
  const times = [15, 30, 45, 60];
  const [selectedTimes, setSelectedTimes] = useState({
    15: false,
    30: false,
    45: false,
    60: false
  });

  const dispatch = useDispatch();
  const useTimes = useSelector(state => state.ip.useTimes)

  const handleButtonClick = (time) => {
    const newSelectedTimes = {
      ...selectedTimes,
      [time]: !selectedTimes[time]
    };

    setSelectedTimes(newSelectedTimes);

    const newTotalTime = Object.entries(newSelectedTimes).reduce((acc, [key, value]) => {
      if (value) {
        return acc + parseInt(key);
      }
      return acc;
    }, 0);

    dispatch(setUseTimes(newTotalTime));
  };

  // useEffect(()=>{
  //   console.log(useTimes)
  // },[useTimes])

  return (
    <>
      <PresetName>이용 시간</PresetName>
      <ButtonWrap>
        {times.map((time) => (
          <TimeButton
            key={time}
            className={selectedTimes[time] ? 'selected' : ''}
            onClick={() => handleButtonClick(time)}
          >
            {time}분
          </TimeButton>
        ))}
      </ButtonWrap>
    </>
  )
}


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
  &.selected {
    background-color: ${props => props.theme.colors.buttonbgColor};  // 선택됐을 때의 스타일입니다.
  }
`


export default UseTime;