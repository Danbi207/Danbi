import React from 'react'
import styled from 'styled-components';
import {setMode} from '../../../store/Slice/ModalSlice';
import { useDispatch } from 'react-redux';
const Accuse = () => {
  const dispatch = useDispatch();

  return (
    <AccuseWrap onClick={()=>dispatch(setMode(false))}>Accuse</AccuseWrap>
  )
}
const AccuseWrap = styled.div`
  position: fixed;
  z-index: 6;
  width: 80%;
  left: 10%;
  height: 50%;
  top: 25%;
  background-color: #fff;
  cursor: pointer;
`
export default Accuse