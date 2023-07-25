import React,{useState} from 'react'
import styled, { keyframes } from 'styled-components';
import Setting from '../Setting/Setting';
const NavBar = (props) => {
  const [settingFlag,setSettingFlag] = useState(false);
  const user =  {
    "profile_id" : 1,
    "name" : "김민규",
    "profile_url" : "https://i.namu.wiki/i/N94T4asE48XKf-FdLoOMec_uc4NbJWMF6ivJw0LDCO00ttNOd1bR0d043NsFEUH1faK_4P5ggxkT4JGkZneOEw.webp",
    "dew_point" : 123,
  }
  return (
    <>
      {
        settingFlag ? 
        <Setting setSettingFlag={setSettingFlag} ></Setting>:
        <NavBarWrap>
          <CloseBtn onClick={()=>props.setNavFlag(false)}>{"<"}닫기</CloseBtn>
          <UserWrap>
            <UserProfileImg src={user.profile_url}></UserProfileImg>
            <UserTitleWrap>
              <UserTitle>{user.name}</UserTitle>
              <UserPoint><DewImg src='/assets/Dew.svg' />&nbsp;{user.dew_point}&nbsp;Dew</UserPoint>
            </UserTitleWrap>
          </UserWrap>
          <NavBarItem><HomeImg/>홈</NavBarItem>
          <NavBarItem><ProfileImg/>프로필</NavBarItem>
          <NavBarItem onClick={()=>setSettingFlag(true)}><SettingImg/>세팅</NavBarItem>
          <NavBarItem><LogoutImg/>로그아웃</NavBarItem>
        </NavBarWrap>
      }
    </>
  )
}
const DewImg = styled.img`
  height: 1.5rem;
  vertical-align: middle;
`
const UserWrap = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 5rem;
  margin: 1rem 0;
`
const UserTitle=styled.div`
  line-height: 3rem;
  font-size: 1.5rem;
`
const UserPoint=styled.div`
  line-height: 2rem;
  display: flex;
`
const UserTitleWrap = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
`

const UserProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
`

const NavBarItem = styled.div`
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
`
const HomeImg = styled.div`
  background-image: url(${props=>props.theme.images.home});
  background-repeat: no-repeat;
  width: 3rem;
`
const ProfileImg = styled.div`
  background-image: url(${props=>props.theme.images.profile});
  background-repeat: no-repeat;
  width: 3rem;
`
const SettingImg = styled.div`
  background-image: url(${props=>props.theme.images.setting});
  background-repeat: no-repeat;
  width: 3rem;
`
const LogoutImg = styled.div`
  background-image: url(${props=>props.theme.images.logout});
  background-repeat: no-repeat;
  width: 3rem;
`

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  height: 1.5rem;
`

const NavBarWrap = styled.div`
  color: ${props=>props.theme.colors.titleColor};
  background-color: ${props=>props.theme.colors.bgColor};
  border-left: 1px solid ${props=>props.theme.colors.titleColor};
  padding: 1rem;
`



export default NavBar