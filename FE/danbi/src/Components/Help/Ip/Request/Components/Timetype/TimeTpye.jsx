import React from 'react'
import styled from 'styled-components';

import Checkbox from './Checkbox';
import { useDispatch } from 'react-redux';
import Calendar from '../Calendar/Calender'
import TimeSelect from './TimeSelect';
import { setTabMode } from "../../../../../../store/Slice/ipSlice"
import UseTime from './UseTime';

const TimeTpye = () => {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <CalendarWrap>
        <Calendar/>
      </CalendarWrap>
      <SelectWrap>
        <TimeSelect/>
        <UseTime/>
        <Checkbox></Checkbox>
        <NextBTN onClick={() => { dispatch(setTabMode('time')); } }>다음</NextBTN>
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

const NextBTN  = styled.button`
  width: 30rem;
  height: 3rem;
  margin: 1rem auto;
  border-radius: 0.75rem;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  color: ${props=> props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 3rem;
    left : calc(( 100% - 20rem )/2);
    bottom: 3.2rem;
    position: absolute;
  }
`

export default TimeTpye;