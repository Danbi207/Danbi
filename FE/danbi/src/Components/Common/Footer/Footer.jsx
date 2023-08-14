import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { ReactComponent as Frined } from '../../../static/Friends-white.svg'
import { ReactComponent as Home } from '../../../static/Home-white.svg'
import { ReactComponent as Profile } from '../../../static/Profile-white.svg'

const Footer = () => {
  const navigate = useNavigate();
  const userId = useSelector(state=>state.user.userId);

  /* Todo : 1. setting에서 해당하는 모드에 따라 white, black 이미지를 가져올 수 있게(theme.js 참고) 
  2. Mode를 통해 해당되는 페이지에 이동시 Filled 이미지가 나올 수 있게 */
  const [mode,setMode] = useState("home");
  const location = useLocation();
  
  useEffect(()=>{
    console.log(location.pathname)
    if(location.pathname==="/" || location.pathname==="/helper"){setMode("home");}
    else
      setMode(location.pathname.replaceAll("/",""));
  },[location]);

  return (
    <FooterWrap>      
      <Box>
        <Frined 
          fill={mode === 'friend' ? '#FFEA7E' : '#000'}
          width={30} height={30}
          onClick={()=>{setMode("friend"); navigate("/user/friend")}}></Frined>
        <P $mode={mode}>친구</P>
      </Box>
      <Box>
      <Home 
        fill={mode === 'home' ? '#FFEA7E' : '#000'}
        width={30} height={30}
        $mode={mode} onClick={()=>{setMode("home"); navigate(`/help/${localStorage.getItem("role")}`) }}></Home>
        <P $mode={mode}>홈</P>
      </Box>
      <Box>
      <Profile 
        fill={mode === 'profile' ? '#FFEA7E' : '#000'}
        width={30} height={30}
        onClick={()=>{setMode("profile"); navigate(`/user/profile/${userId}`) }}></Profile>
        <P $mode={mode}>프로필</P>
      </Box>
    </FooterWrap> 
  )
}

const FooterWrap = styled.div`
    width: 100%; 
    height: 3.2rem;
    z-index: 4;
    background-color: ${props=>props.theme.colors.whiteBgColor};
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  &>p {
    font-size: 12px;
    text-align: center;
  }
`

const P = styled.div`
  font-size: 12px;
  text-align: center;
  color : ${props=>props.$mode === 'friend' || props.$mode === 'profile' || props.$mode === 'profile' ? '#FFEA7E' : '#000' }
`

export default Footer;