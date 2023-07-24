import React, { useState } from 'react'
import styled from 'styled-components';
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
    <HeaderWrap>
      {navFlag ? <NavBarWrap><NavBar setNavFlag={setNavFlag} /></NavBarWrap>:null}
      <Logo onClick={mvHome}></Logo>
      <IconWrap>
        <AlramBtn onClick={toggleAlram}></AlramBtn>
        <NavBarBtn onClick={()=>{setNavFlag(true)}}></NavBarBtn>
        {alramFlag ? <AlramWrap></AlramWrap>:null}
      </IconWrap>
    </HeaderWrap>
  )
}
const NavBarWrap = styled.div`
  position: absolute;
  right: 0;
  width: 25%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  z-index: 1;
`

const IconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 8rem;
  position: relative;
`

const AlramBtn = styled.div`
  background-image: url(${props=>props.theme.images.alram});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`
const AlramWrap = styled.div`
  position: absolute;
  width: 15rem;
  height: 30rem;
  top: 3rem;
  right: 0;
  background-color: red;
`

const NavBarBtn = styled.div`
  background-image: url(${props=>props.theme.images.navigation});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const Logo = styled.div`
  width: 2.5rem;
  background-image: url(${props=>props.theme.images.logo});
  background-repeat: no-repeat;
  background-size:2.5rem;
  cursor: pointer;
`
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  border-bottom:solid #19191B 1px;
`
export default Header