import React from 'react'
import styled from 'styled-components';
const Tap = (props) => {
  return (
    <TapWrap>
      <TapBtn $mode={"untact"===props.mode} onClick={props.setUntact}>비대면 도움</TapBtn>
      <TapBtn $mode={"map"===props.mode} onClick={()=>{if(props.mode!=="map")props.setMap()}}>지도</TapBtn>
      <TapBtn $mode={"contact"===props.mode} onClick={props.setContact}>대면 도움</TapBtn>
    </TapWrap>
  )
}
const TapBtn = styled.button`
  height: 100%;
  line-height: 3rem;
  border-bottom: ${props=>props.$mode ? `3px solid ${props.theme.colors.titleColor}` : null };
`
const TapWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  height: 3rem;
`

export default Tap