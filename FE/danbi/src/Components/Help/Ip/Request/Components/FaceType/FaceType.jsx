import React, { useEffect } from 'react'
import styled from 'styled-components'

import HelpDetail from './HelpDetail';
import Preset from './Preset.jsx';
import Positioin from './Positioin';
import { useDispatch, useSelector } from 'react-redux';

import { setMeetType } from "../../../../../../store/Slice/ipSlice"

function FaceType({location}) {
  const dispatch = useDispatch();
  const meetType = useSelector(state => state.ip.meetType);

  useEffect(()=>{
    console.log(meetType)
  }, [meetType])

  
  return (
    <Wrap>
      <Boxes>
        <SelectBTN $default='face' $meetType={meetType} onClick={() => { dispatch(setMeetType('face')); } }>대면</SelectBTN>
        <SelectBTN $default='noface' $meetType={meetType} onClick={() => { dispatch(setMeetType('noface')); } }>비대면</SelectBTN>
      </Boxes>
      { meetType === 'face' ? <Positioin/> : null}  
      <HelpDetail/>
      <Preset/>
      {location.state !== null ? <button>수정</button> : <RequestBTN>도움 요청하기</RequestBTN>}
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