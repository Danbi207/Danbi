import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {setTabMode} from '../../../store/Slice/ipSlice'

const Tab = () => {
  const dispatch = useDispatch();
  const tabmode = useSelector((state)=>state.ip.tabmode); 

  return (
    <TapWarp>
        <TapItem $default='time' $tabmode={tabmode} onClick={()=>{dispatch(setTabMode('time'))}}>시간예약</TapItem>
        <TapItem $default='meet' $tabmode={tabmode} onClick={()=>{dispatch(setTabMode('meet'))}}>대면여부</TapItem>
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