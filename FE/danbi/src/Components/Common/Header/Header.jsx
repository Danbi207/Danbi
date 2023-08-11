import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import NavBar from '../NavBar/NavBar';
import { useCallback } from 'react';
import { authGet } from '../../../Util/apis/api';
import { useEffect } from 'react';
const Header = () => {
  const [navFlag,setNavFlag] = useState(false);
  const [alramFlag,setAlramFlag] = useState(false);
  const [alramlist, setAlramList] = useState([]);

  const mvHome = ()=>{
    //FIXME : 유저정보를 읽어서 ip홈 or helper홈 라우팅
  }

  const toggleAlram = ()=>{
    setAlramFlag(!alramFlag);
  }

  // 알람 전체 데이터를 가져온다.
  const Alrams = useCallback(async() => {
    try {
      const response = await authGet('/api/v1/pofile/alarm');
      setAlramList(response.data.alarm_list); 
      console.log(alramlist);
    } catch (err) {
      console.log(err);
    }
  }, [alramlist]);

  useEffect(()=>{
    Alrams();
  },[Alrams])

  return (
    <>
      <HeaderWrap>
        <Logo onClick={mvHome}></Logo>
        <IconWrap>
          <AlramBtn onClick={toggleAlram}></AlramBtn>
          <NavBarBtn onClick={()=>{setNavFlag(true)}}></NavBarBtn>
        </IconWrap>
        <AlramWrap $out={alramFlag}>
          {alramlist.map((item, idx) => 
            <AlramsWrap key={idx}>
              <TitleWrap>{item.title}</TitleWrap>
              <ContetnWrap>{item.content}</ContetnWrap>
              <TimeWrap>{item.creatTime}</TimeWrap>
              <HR/>
            </AlramsWrap>)}
        </AlramWrap>
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
  background-color: aquamarine;

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

const AlramsWrap = styled.div`
  /* display: flex; */
  
`

const TitleWrap = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

const ContetnWrap = styled.div`
  font-size: 0.7rem;
  color: #000;
`

const TimeWrap = styled.div`
  font-size: 0.3rem ;
  color: gray;
`

const HR = styled.hr`
  width: 100%;
  border-color: #000000;
`


export default Header