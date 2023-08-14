import React from 'react'
import styled from 'styled-components';
const Tap = (props) => {
  return (
    <TapWrap>
      <TapItem $defaultMode="Infomation"  $mode={props.mode} onClick={()=>{
        props.stopCurPosition();
        props.setMode("Infomation");
      }}>도움 정보</TapItem>
      <TapItem $defaultMode="Chat" $mode={props.mode} onClick={()=>{
        props.checkRoomId();
        props.stopCurPosition();
        props.setMode("Chat");
      }}>소통</TapItem>
      {
        props.faceFlag?
        <TapItem $defaultMode="RealtimeMap" $mode={props.mode} onClick={()=>{
          props.startCurPosition();
          props.setMode("RealtimeMap");
        }}>실시간 위치</TapItem>
        :null
      }
    </TapWrap>
  )
}
const TapWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  width: 100%;
  height: 3rem;
`
const TapItem = styled.button`
  width: 100%;
  font-size: 1.25rem;
  white-space: nowrap;
  border-bottom: 3px solid ${props=>props.$mode === props.$defaultMode ? props.theme.colors.titleColors : "transparent"};
  cursor: pointer;
`
export default Tap