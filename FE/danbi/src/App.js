import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      }
    }catch(err){
      console.log(err);
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

  return (
    <>
    {
      document.body.offsetWidth >= 768?
      <PCWrap>
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
  background-color: ${props=>props.theme.colors.bgColor};
  /* color: ${props=>props.theme.colors.titleColor}; */
`

const PCWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: red;
`

const MobileWrap = styled.div`
  position: absolute;
  top : 5%;
  right: 5%;
  width: 400px;
  height: 90%;
`
export default App;
