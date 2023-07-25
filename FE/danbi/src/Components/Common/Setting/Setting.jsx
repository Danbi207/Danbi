import React from 'react'
import styled from 'styled-components';
import { useDispatch} from "react-redux";
import {setTheme} from "../../../store/Slice/settingSlice.js";
import {setCookie,getCookie} from "../../../cookie";

const Setting = (props) => {
const dispatch = useDispatch();
  const withdrawal = ()=>{
    //DO : 회원탈퇴
    //FIXME : axios 연결
  }

  const setMode = (e) => {
    //DO : theme을 쿠키,redux에 저장
    let mode = e.target.value;
    if(mode === "system"){
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if(isDarkMode)
        mode = "dark";
      else
        mode = "light";
    }
    setCookie("theme",mode,{
      path : "/",//쿠키를 접근할 수 있는 경로 지정
      secure : false,//HTTPS로만 접근 가능하게 할 것인지 지정
      maxAge : 60*60*24*365*100 //초*분*시간*일*년
    });
    dispatch(setTheme(mode));
  }
  return (
    <SettingWrap>
      <CloseBtn onClick={()=>props.setSettingFlag(false)}>{"<"}이전</CloseBtn>
      <Title>모드 설정</Title>
      <ModeLabel><input type='radio' defaultChecked={!getCookie("theme")||getCookie("theme")==="light"} name='mode' onChange={setMode} value="light"/>&nbsp;라이트 모드 <LightModeImg/></ModeLabel>
      <ModeLabel><input type='radio' defaultChecked={getCookie("theme")==="dark"} name='mode' onChange={setMode} value="dark"/>&nbsp;다크 모드 <DarkModeImg/></ModeLabel>
      <ModeLabel><input type='radio' name='mode' onChange={setMode} value="system"/>&nbsp;시스템 모드 <SystemModeImg/></ModeLabel>
      <Title>계정 설정</Title>
      <WithdrawalBtm onClick={withdrawal}>회원 탈퇴</WithdrawalBtm>
    </SettingWrap>
  )
}
const LightModeImg=styled.div`
  background-image: url(${props=>props.theme.images.sun});
  background-repeat: no-repeat;
  background-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 0.5rem;
`

const DarkModeImg=styled.div`
  background-image: url(${props=>props.theme.images.moon});
  background-repeat: no-repeat;
  background-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 0.5rem;
`

const SystemModeImg=styled.div`
  background-image: url(${props=>props.theme.images.system});
  background-repeat: no-repeat;
  background-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 0.5rem;
`

const ModeLabel = styled.label`
  font-size: 1.5rem;
  height: 1.5rem;
  width: 100%;
  margin: 0.25rem;
  white-space: nowrap;
  display: flex;
  cursor: pointer;
  &>input{
    width: 1rem;
    cursor: pointer;
  }
`

const WithdrawalBtm = styled.button`
  background-color: #E85151;
  color: #fff;
  cursor: pointer;
  height: 2rem;
  border-radius: 0.5rem;
`

const Title = styled.div`
  height: 2rem;
  text-align: left;
  font-size: 2rem;
  margin : 0.5rem 0;
`
const SettingBtn = styled.button`
  background-color: aqua;
  width: 100%;
  height: 3rem;
`

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  height: 1.5rem;
`

const SettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props=>props.theme.colors.titleColor};
  background-color: ${props=>props.theme.colors.bgColor};
  border-left: 1px solid ${props=>props.theme.colors.titleColor};
  padding: 1rem;
`

export default Setting