import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

/* Todo : 1. setting에서 해당하는 모드에 따라 white, black 이미지를 가져올 수 있게(theme.js 참고) 
          2. Flag를 통해 해당되는 페이지에 이동시 Filled 이미지가 나올 수 있게 */
  let [friendsFlag, setFriendsFlag] = useState(false);
  let [homeFlag, setHomeFlag] = useState(true);
  let [profileFlag, setProfileFlag] = useState(false);

  function FriendsClick(){
    setFriendsFlag(true); setHomeFlag(false); setProfileFlag(false);
  };
  function HomeClick(){
    setFriendsFlag(false); setHomeFlag(true); setProfileFlag(false);
  };
  function ProfileClick(){
    setFriendsFlag(false); setHomeFlag(false); setProfileFlag(true);
  };

  return (
    <FooterWrap>      
      <FriendsImg friendsFlag={friendsFlag} onClick={()=>{FriendsClick(); navigate("/friends")}}></FriendsImg>
      <Homeimg homeFlag={homeFlag} onClick={()=>{HomeClick(); navigate("/") }}></Homeimg>
      <ProfileImg profileFlag={profileFlag} onClick={()=>{ProfileClick(); navigate("/profile") }}></ProfileImg>
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
  background-image : url(${props=> props.friendsFlag ? props.theme.images.friendsFilled : props.theme.images.friends});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5rem;
`

const Homeimg = styled(Img)`
  background-image : url(${props=> props.homeFlag ? props.theme.images.homeFilled : props.theme.images.home});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.5rem;
`
const ProfileImg = styled(Img).attrs()`
  background-image : url(${props=> props.profileFlag ? props.theme.images.profileFiiled : props.theme.images.profile});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 2.2rem;
`

export default Footer;