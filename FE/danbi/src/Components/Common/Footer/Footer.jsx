import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  let [FriendsFlag, setFriendsFlag] = useState(true);
  let [HomeFlag, setHomeFlag] = useState(true);
  let [ProfileFlag, setProfileFlag] = useState(false);

  useEffect(()=>{
    console.log(FriendsFlag);
  },[FriendsFlag])

  return (
    <FooterWrap>      
      <FriendsImg onClick={()=>{setFriendsFlag(true); setHomeFlag(false); setProfileFlag(false); navigate("/friends");}}></FriendsImg>
      <Homeimg onClick={()=>{setFriendsFlag(true); setHomeFlag(true); setProfileFlag(false); navigate("/") }}></Homeimg>
      <ProfileImg onClick={()=>{setFriendsFlag(true); setHomeFlag(false); setProfileFlag(true); navigate("/profile") }}></ProfileImg>
    </FooterWrap> 
  )
}
const FooterWrap = styled.div`
    width: 100%;
    height: 3.2rem;
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
const FriendsImg = styled(Img).attrs((props) => ({
  style: {
    backgroundImage: `url(${
      props.FriendsFlag
      ? props.theme.images.friendsFilled // 친구목록 페이지 이동시 이미지 URL
      : props.theme.images.friends // 그외의 친구목록 이미지 URL
    })`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '3rem',
  },
}))``;

const Homeimg = styled(Img).attrs()`
  background-image : url(${props=>props.theme.images.homeFilled});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5rem;
`
const ProfileImg = styled(Img).attrs()`
  background-image : url(${props=>props.theme.images.profile});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.2rem;
`









export default Footer