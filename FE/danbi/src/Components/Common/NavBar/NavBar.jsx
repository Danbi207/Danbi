import React,{useState} from 'react'
import styled from 'styled-components';
import Setting from '../Setting/Setting';
const NavBar = (props) => {
  const [settingFlag,setSettingFlag] = useState(false);
  return (
    <>
      {
        settingFlag ? 
        <Setting setSettingFlag={setSettingFlag} ></Setting>:
        <NavBarWrap>
          <CloseBtn onClick={()=>props.setNavFlag(false)}>{"<"}닫기</CloseBtn>
          <NavBarItem><HomeImg/>홈</NavBarItem>
          <NavBarItem><ProfileImg/>프로필</NavBarItem>
          <NavBarItem onClick={()=>setSettingFlag(true)}><SettingImg/>세팅</NavBarItem>
          <NavBarItem><LogoutImg/>로그아웃</NavBarItem>
        </NavBarWrap>
      }
    </>
  )
}

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
  padding: 1rem;
  height: 100%;
`



export default NavBar