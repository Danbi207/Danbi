import React from 'react'
import styled from 'styled-components';
import Accuse from './Accuse/Accuse';
import { useSelector } from 'react-redux';
import IpDetail from './Detail/IpDetail';

const Modal = () => {
  const mode = useSelector((state) => state.modal.mode);
  return (
    <>
      {
        mode === "accuse" ? <>
          <BackgroundWrap></BackgroundWrap>
          <Accuse></Accuse>
        </> : null
      }
      {
        mode === "ipdetail" ? <>
          <BackgroundWrap></BackgroundWrap>
          <IpDetail></IpDetail>
        </> : null
      }
    </>
  )
}
const BackgroundWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color:${props=>props.theme.colors.titleColor};
  opacity: 0.4;
`
export default Modal