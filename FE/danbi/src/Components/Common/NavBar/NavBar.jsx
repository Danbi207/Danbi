import React,{useCallback, useState} from 'react'
import styled from 'styled-components';
import Setting from '../Setting/Setting';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authPost } from '../../../Util/apis/api';

import { ReactComponent as Home } from '../../../static/Home-white.svg'
import { ReactComponent as Profile } from '../../../static/Profile-white.svg'
import { ReactComponent as Logout } from '../../../static/Logout-white.svg'
import { ReactComponent as setting } from '../../../static/Setting-white.svg'

const NavBar = (props) => {
  const [settingFlag,setSettingFlag] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = useSelector((state) => state.user.userId);

  const handleLogout = useCallback( async () => {
    try{
      await authPost('/api/v1/member/logout');
      localStorage.removeItem("role");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenExpireTime");
      window.location.reload();
    }catch(err){
      console.log(err);
    }
    navigate('/');
  }, [navigate]);

  return (
    <>
      {
        settingFlag ? 
        <Setting setSettingFlag={setSettingFlag} ></Setting>:
        <NavBarWrap>
          <CloseBtn onClick={()=>props.setNavFlag(false)}>{"<"}닫기</CloseBtn>
        
            <NavBarItem onClick={() => navigate(`/help/${role}`)}>
              <Box>
                <HomeImg/>홈
              </Box>
            </NavBarItem>
            <NavBarItem onClick={() => navigate(`/user/profile/${userId}`)}>
              <Box>
                <ProfileImg/>프로필
              </Box>
            </NavBarItem>
            <NavBarItem onClick={()=>setSettingFlag(true)}>
              <Box>
              <SettingImg/>세팅
              </Box>
            </NavBarItem>
            <NavBarItem onClick={handleLogout}>
              <Box>
                <LogoutImg/>로그아웃
              </Box>
            </NavBarItem>
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

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size : 1.5rem;
`


const HomeImg = styled(Home)`
  fill: ${props =>props.theme.colors.titleColor};
  width: 3rem;
  margin-right: 1rem;
`
const ProfileImg = styled(Profile)`
  fill: ${props =>props.theme.colors.titleColor};
  width: 3rem;
  margin-right: 1rem;
`
const SettingImg = styled(setting)`
  fill: ${props =>props.theme.colors.titleColor};
  width: 3rem;
  margin-right: 1rem;
`
const LogoutImg = styled(Logout)`
  fill: ${props =>props.theme.colors.titleColor};
  width: 3rem;
  margin-right: 1rem;
`

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  height: 2rem;
`

const NavBarWrap = styled.div`
  color: ${props=>props.theme.colors.titleColor};
  background-color: ${props=>props.theme.colors.bgColor};
  padding: 1rem;
  height: 100%;
`



export default NavBar