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
    let path = location.pathname
    // console.log(location)
    // console.log(path)
    if (path === '/user/friend') {setMode('friend');}
    if(path.startsWith("/help/ip") || path.startsWith("/help/helper")){
      setMode("home")}
    if (path.startsWith('/user/profile/') && !isNaN(Number(path.slice(14)))) {
      setMode('profile')
    }
  },[location]);

  return (
    <FooterWrap>      
      <Box onClick={()=>{navigate("/user/friend")}}>
        <FriendSVG 
          $color={mode === 'friend' ? '#fbc037' : undefined}
          width={30} height={30}></FriendSVG>
        <P $mode={mode === 'friend' ? '#fbc037' : props=>props.theme.colors.titleColor}>친구</P>
      </Box>
      <Box onClick={()=>{
        const role = localStorage.getItem("role");
        if(role === "admin"){
          navigate("/admin");
          return;
        }
        navigate(`/help/${role}`
      )}}>
      <HomeSVG 
        $color={mode === 'home' ? '#fbc037' : undefined}
        width={30} height={30}></HomeSVG>
        <P $mode={mode === 'home' ? '#fbc037' : props=>props.theme.colors.titleColor}>홈</P>
      </Box>
      <Box onClick={()=>{navigate(`/user/profile/${userId}`)}}>
      <ProfileSVG 
        $color={mode === 'profile' ? '#fbc037' : undefined}
        width={30} height={30}></ProfileSVG>
        <P $mode={mode === 'profile' ? '#fbc037' : props=>props.theme.colors.titleColor}>프로필</P>
      </Box>
    </FooterWrap> 
  )
}

const FooterWrap = styled.div`
    width: 100%; 
    height: 3.2rem;
    z-index: 4;
    background-color: ${props=>props.theme.colors.CommonBgColor};
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
  color: ${props => props.$mode};
`

const FriendSVG = styled(Frined)`
    fill: ${props => props.$color ? props.$color : props.theme.colors.titleColor};
`

const HomeSVG = styled(Home)`
    fill: ${props => props.$color ? props.$color : props.theme.colors.titleColor};
`

const ProfileSVG = styled(Profile)`
    fill: ${props => props.$color ? props.$color : props.theme.colors.titleColor};
`

export default Footer;