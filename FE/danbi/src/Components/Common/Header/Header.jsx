import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import NavBar from '../NavBar/NavBar';
const Header = () => {
  const [navFlag,setNavFlag] = useState(false);
  const [alramFlag,setAlramFlag] = useState(false);
  const mvHome = ()=>{
    //FIXME : 유저정보를 읽어서 ip홈 or helper홈 라우팅
  }
  const toggleAlram = ()=>{
    setAlramFlag(!alramFlag);
  }
  return (
    <>
      <HeaderWrap>
        <Logo onClick={mvHome}></Logo>
        <IconWrap>
          <AlramBtn onClick={toggleAlram}></AlramBtn>
          <NavBarBtn onClick={()=>{setNavFlag(true)}}></NavBarBtn>
        </IconWrap>
        <AlramWrap $out={alramFlag}></AlramWrap>
      </HeaderWrap>
      <NavBarWrap $out={navFlag}><NavBar setNavFlag={setNavFlag} /></NavBarWrap>
    </>
  )
}
const NavBarWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  z-index: 4;
  visibility: ${props => props.$out ? 'visible' : 'hidden'};
  animation: ${props => props.$out ? fadeIn : fadeOut} 0.5s linear;
  transition: visibility 0.5s linear;
  transform-origin : 100% 0 0;

`
const fadeIn = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scaleX(1);
    opacity: 0;
  }

  to {
    transform: scaleX(0);
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: scaleY(1);
    opacity: 0;
  }

  to {
    transform: scaleY(0);
    opacity: 1;
  }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 8rem;
`

const AlramBtn = styled.div`
  background-image: url(${props=>props.theme.images.alram});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: 4rem;
`
const AlramWrap = styled.div`
  position: absolute;
  width: 15rem;
  height: 30rem;
  bottom: -30rem;
  right: 0;
  background-color: red;

  z-index: 3;
  visibility: ${props => props.$out ? 'visible' : 'hidden'};
  animation: ${props => props.$out ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
  transform-origin : 100% 0 0
`

const NavBarBtn = styled.div`
  background-image: url(${props=>props.theme.images.navigation});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: 4rem;
`

const Logo = styled.div`
  width: 2.5rem;
  background-image: url(${props=>props.theme.images.logo});
  background-repeat: no-repeat;
  background-size:2.5rem;
  cursor: pointer;
`
const HeaderWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  border-bottom:solid #19191B 1px;
  background-color: ${props=>props.theme.colors.whiteBgColor};
`
export default Header