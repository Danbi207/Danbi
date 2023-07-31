import React from 'react'
import styled from 'styled-components'

const Tab = ({tabmode, setTabMode}) => {
  return (
    <TapWarp>
        <TapItem $default='meet' $tabmode={tabmode} onClick={()=>{setTabMode('meet')}}>대면여부</TapItem>
        <TapItem $default='time' $tabmode={tabmode} onClick={()=>{setTabMode('time')}}>시간예약</TapItem>
    </TapWarp>
  )
}

const TapWarp = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 3rem;
`

const TapItem = styled.button`
    width: 100%;
    font-size: 1.25rem;
    white-space: nowrap;
    border-bottom: 3px solid ${props=>props.$default === props.$tabmode ? '#000' : "transparent"};
    cursor: pointer;
`

export default Tab; 