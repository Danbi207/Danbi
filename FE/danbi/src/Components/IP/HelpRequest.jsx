import React, { useState } from 'react'
import styled from 'styled-components';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import Preset from './Preset';
import Checkbox from './Checkbox';

import InputCalender from './Calender/InputCalender';
import StartTime from './Calender/StartTime';

import './CSS/Preset.css'


const HelpRequest = () => {
  let [reservetype, setReserve] = useState('');

  return (
    <RequestWrap>
      <Header></Header>
      <Wrap>
        <Boxes>
          <SelectBTN $default='now' $reservetype={reservetype} onClick={()=>{setReserve('now')}}>즉시</SelectBTN>
          <SelectBTN $default='reserve' $reservetype={reservetype} onClick={()=>{setReserve('reserve')}}>예약</SelectBTN>
        </Boxes>
        <InputCalender></InputCalender>
        <StartTime></StartTime>
        <Preset></Preset>
        <Checkbox></Checkbox>

      </Wrap>
      <Footer></Footer>
    </RequestWrap>
  )
}

const RequestWrap = styled.div`
  width: 100%;
  height: 100%;
`

const Wrap = styled.div`
`

const Boxes = styled.div`
    height : 12rem;
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
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





export default HelpRequest;