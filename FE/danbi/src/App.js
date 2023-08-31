import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import routes from "./router";
import {dark,light} from "./style/theme.js";
import { ThemeProvider } from 'styled-components';
import { useEffect,useState } from 'react';
import { getCookie} from './Util/hooks/cookie';
import { setTheme } from "./store/Slice/settingSlice.js";
import styled from 'styled-components';
import Modal from "./Components/Common/Modal/Modal.jsx";
import JSconfetti from 'js-confetti';
import Loading from "./Components/Common/Loading/Loading.jsx";
import axios from 'axios';
import { requestPermission } from './Util/hooks/requestPermission';
import { reissueAccessToken } from './Util/apis/api';
import { useCallback } from 'react';
// 뽑기 이벤트 Canvas 생성
// confetti canvas 생성
export const Jsconfetti = new JSconfetti();
function App() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  // FCM 토큰 함수 호출
  const  requestFcmToken = useCallback(async ()=> {
    await requestPermission()
  },[])

  const autoLogin = useCallback(async()=>{
    try{
      const isLogin = await reissueAccessToken();
      
      if(isLogin){
        requestFcmToken()
      }else{
        let path = document.location.href.replaceAll(`${process.env.REACT_APP_SERVER}`,"");
        path = path.split("?")[0];
        if(path === "/" || path === "/user/login/oauth"||path ==="/user/join"){
          return;
        }
        alert("로그인 중이 아닙니다!");
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpireTime');
        localStorage.removeItem('role');
        document.location.href=`${process.env.REACT_APP_SERVER}/`;
      }
    }catch(err){
      const path = document.location.href.replaceAll(`${process.env.REACT_APP_SERVER}`,"");
      if(path !== "/" || path !== "/user/login/oauth"||path!=="/user/join"){
        alert("로그인 중이 아닙니다!");
        document.location.href=`${process.env.REACT_APP_SERVER}/`;
      }
    }
  },[requestFcmToken]);

  useEffect(()=>{
    autoLogin();
  },[autoLogin]);

  useEffect(()=>{
    //axios 호출시 인터셉트
    axios.interceptors.request.use(function (req) {
      setLoading(true);
      return req
    }, function (error) {
      return Promise.reject(error);
    });

    //axios 호출 종료시 인터셉트
    axios.interceptors.response.use(function (res) {      
      setLoading(false);
      return res;
    }, function (error) {
      setLoading(false)
      return Promise.reject(error);
    });
  },[])

  useEffect(()=>{
    //DO : 쿠키에 저장된 theme을 불러와 redux에 저장
    const savedTheme = getCookie('theme');
    if(savedTheme){
      dispatch(setTheme(savedTheme));
    }
  },[dispatch])
  const themeMode = useSelector((state) => state.setting.theme);
  const theme = themeMode === 'light' ? light : dark;
  const isMobile = useCallback(()=>{
    //DO : PC인지 모바일인지 검사
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },[navigator.userAgent]);

  return (
    <>
    {
      !isMobile()?
      <PCWrap $url = {`${process.env.PUBLIC_URL}/wheelchair.jpg`}>
        <MobileWrap>
          <ThemeProvider theme={theme}>
          <AppWrap className="App">
            <BrowserRouter>
              <Modal/>
              <Routes>
                {routes.map((e) => {
                  return (
                    <Route
                      key={e.path}
                      path={e.path}
                      element={<e.Component></e.Component>}
                    />  
                  );
                })}
              </Routes>
            </BrowserRouter>
          </AppWrap>
          <Loading loading={loading}/>
        </ThemeProvider>
        </MobileWrap>
      </PCWrap>
      :
      <ThemeProvider theme={theme}>
      <AppWrap className="App">
        <BrowserRouter>
          <Modal/>
          <Routes>
            {routes.map((e) => {
              return (
                <Route
                  key={e.path}
                  path={e.path}
                  element={<e.Component></e.Component>}
                />  
              );
            })}
          </Routes>
        </BrowserRouter>
      </AppWrap>
      <Loading loading={loading}/>
    </ThemeProvider>
    }
    </>
  );
}

const AppWrap = styled.div`
  position: relative;
  background-color: ${props=>props.theme.colors.bgColor};
  /* color: ${props=>props.theme.colors.titleColor}; */
`

const PCWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${props=>props.$url});
  background-size: cover;
  background-repeat: no-repeat;
`

const MobileWrap = styled.div`
  position: absolute;
  top : 5%;
  right: 5%;
  width: 400px;
  height: 90%;
  border-radius: 1rem;
  border-color: #000;
  border-style: solid;
  border-width: 1.2rem 0.8rem;
`
export default App;
