import React, { useState } from 'react'
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Footer = () => {
  const navigate = useNavigate();

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
      <FriendsImg $mode={mode} onClick={()=>{setMode("friends"); navigate("/friends")}}></FriendsImg>
      <Homeimg $mode={mode} onClick={()=>{setMode("home"); navigate("/helper") }}></Homeimg>
      <ProfileImg $mode={mode} onClick={()=>{setMode("profile"); navigate("/profile") }}></ProfileImg>
    </FooterWrap> 
  )
}
const FooterWrap = styled.div`
    width: 100%; 
    height: 3.2rem;
    z-index: 3;
    position: fixed;
    bottom: 0;
    background-color: ${props=>props.theme.colors.bgColor};
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Img = styled.div`
  width : 90%;
  height : 90%;
` 
const FriendsImg = styled(Img)`
  background-image : url(${props=> props.$mode === "friends"? props.theme.images.friendsFilled : props.theme.images.friends});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5rem;
`

const Homeimg = styled(Img)`
  background-image : url(${props=> props.$mode==="home" ? props.theme.images.homeFilled : props.theme.images.home});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5rem;
`
const ProfileImg = styled(Img).attrs()`
  background-image : url(${props=> props.$mode==="profile" ? props.theme.images.profileFiiled : props.theme.images.profile});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.2rem;
`

export default Footer;