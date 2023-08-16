import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import NavBar from '../NavBar/NavBar';
import { useCallback } from 'react';
import { authDelete, authGet } from '../../../Util/apis/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [navFlag,setNavFlag] = useState(false);
  const [alramFlag,setAlramFlag] = useState(false);
  const [alramlist, setAlramList] = useState([]);
  const navigate = useNavigate();
  // const [alrcount, setAlrCount] = useState(0);

  const mvHome = ()=>{
    navigate(`/help/${localStorage.getItem("role")}`)
  }

  const toggleAlram = ()=>{
    setAlramFlag(!alramFlag);
  }

  // 알람 전체 데이터를 가져온다.
  const Alrams = useCallback(async() => {
    try {
      const response = await authGet('/api/v1/pofile/alarm');
      if(response){
        setAlramList(response.alarm_list); 
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const NotReadAlrams = useCallback(async()=>{
  //   try {
  //     const setAlrCount = await authGet('/api/v1/pofile/alarm/notread/count');
  //     if (setAlrCount){
  //       setAlrCount(setAlrCount)
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // },[])

  // 알람 데이터 일괄 삭제
  const DeleteAlrams = useCallback(async()=>{
    try { 
      await authDelete('/api/v1/pofile/alarm', {});
      Alrams(); 
    }
    catch(err) {
      console.log(err)
    }
  },[Alrams])

  useEffect(()=>{
    if (alramFlag === true){
      Alrams();
    }
  },[alramFlag])

  return (
    <>
      <HeaderWrap>
        <Logo onClick={mvHome}></Logo>
        <IconWrap>
          <AlramBtn onClick={toggleAlram}></AlramBtn>
          <NavBarBtn onClick={()=>{setNavFlag(true)}}></NavBarBtn>
        </IconWrap>
        <AlramWrap $out={alramFlag}>
            <BTNWrap>
              <DeleteBTN onClick={()=>{DeleteAlrams()}}>알림 모두 삭제</DeleteBTN>
            </BTNWrap>
            {alramlist.map((item, idx) => 
            <React.Fragment key={item.alarmId}>
            <AlramsWrap>
              <TitleWrap>{item.title}</TitleWrap>
              <TimeWrap>{item.creatTime}</TimeWrap>
              <ContetnWrap>{item.content}</ContetnWrap>
            </AlramsWrap>
            <HR/>
            </React.Fragment>)}
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
  width: 100%;
  height: 100%;
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
  background-color: ${props=>props.theme.colors.bgColor};

  z-index: 3;
  visibility: ${props => props.$out ? 'visible' : 'hidden'};
  animation: ${props => props.$out ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
  transform-origin : 100% 0 0;

  overflow-y: auto; 
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar { 
    display: none;
	  }
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

const BTNWrap = styled.div`
  display: flex;
  justify-content: center;
`

const DeleteBTN = styled.button`
  width: 50%;
  height: 2rem;
  background-color: red;
  color : #fff;
  border-radius: 10px;
  font-size: 0.8rem;
  text-align: center;
  margin : 0.5rem 0 0.5rem 0; 
`

const AlramsWrap = styled.div`
  margin : 0.5rem;
`

const TitleWrap = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding-bottom: 0.2rem;
  display: inline-block;
  margin-right: 0.5rem;
  color : ${props=>props.theme.colors.jandibgColor}
`

const ContetnWrap = styled.div`
  font-size: 0.7rem;
  color : ${props=>props.theme.colors.jandibgColor};
  padding-bottom: 0.2rem;
  font-family: "NanumGothicLight";
  font-weight : ${props=>props.theme.font.fontWeight}
`

const TimeWrap = styled.span`
  font-size: 0.3rem ;
  color: ${props=>props.theme.colors.AlrDateColor};
  padding-bottom: 0.2rem;

`

const HR = styled.hr`
  width: 100%;
  background-color: #939393;
  margin : 0;
`


export default Header