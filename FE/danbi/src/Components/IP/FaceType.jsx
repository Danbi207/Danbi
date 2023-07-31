import React from 'react'
import styled from 'styled-components'

import HelpDetail from './HelpRequest/HelpDetail';
import Preset from './HelpRequest/Preset.jsx';

const FaceType = ({meetType, setMeetType, setTab}) => {
  return (
    <Wrap>
        <Boxes>
          <SelectBTN $default='face' $meetType={meetType} onClick={()=>{setMeetType('face')}}>대면</SelectBTN>
          <SelectBTN $default='noface' $meetType={meetType} onClick={()=>{setMeetType('noface')}}>비대면</SelectBTN>
        </Boxes>    
        <HelpDetail></HelpDetail>
        <Preset></Preset>
        <NextBTN onClick={()=>{setTab('time')}}>다음</NextBTN>
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
    background-color: ${props=> props.$default === props.$meetType ? '#8383FF' : '#E3E3E3'};
    color : ${props=> props.$default === props.$meetType ? '#fff' : '#000'};
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
const NextBTN  = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 4rem;
  width: 30rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: #6161FF;
  color: #fff;
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 3rem;
    left : calc(( 100% - 20rem )/2);
  }
`


export default FaceType;