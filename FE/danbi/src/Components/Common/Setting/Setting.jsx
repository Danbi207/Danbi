import React from 'react'
import styled from 'styled-components';
import { useDispatch} from "react-redux";
import {setTheme} from "../../../store/Slice/settingSlice.js";
import {setCookie} from "../../../cookie";

const Setting = () => {
const dispatch = useDispatch();
  const setMode = (isLight) => {
    //DO : theme을 쿠키,redux에 저장
    if(isLight){
      setCookie("theme","light",{
          path : "/",//쿠키를 접근할 수 있는 경로 지정
          secure : false,//HTTPS로만 접근 가능하게 할 것인지 지정
          maxAge : 60*60*24*365*100 //초*분*시간*일*년
      });
      dispatch(setTheme("light"));
    }else{
      setCookie("theme","dark",{
          path : "/",
          secure : false,
          maxAge : 60*60*24*365*100
      });
      dispatch(setTheme("dark"));
    }
  }
  return (
    <SettingWrap>
        <SettingBtn onClick={()=>setMode(true)}>Light Mode</SettingBtn>
        <SettingBtn onClick={()=>setMode(false)}>Dark Mode</SettingBtn>
    </SettingWrap>
  )
}

const SettingBtn = styled.button`
    background-color: aqua;
    width: 100%;
    height: 3rem;
`
const SettingWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
`
export default Setting