import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // FCM 토큰 함수 호출
  const  requestFcmToken = useCallback(async ()=> {
    await requestPermission()
  },[])

  const autoLogin = useCallback(async()=>{
    try{
      const isLogin = await reissueAccessToken();
      
      if(isLogin){
        const role = localStorage.getItem("role");
        // 역할이 정해지지 않은 경우 or 서류 제출 안한 경우
        if(role==="ROLE_UNDEFINED" || role==="ROLE_UNSUBMIT_IP"){
          navigate("/user/join", { replace: true });
          return;
        }
  
        if(role === "admin"){//역할이 관리자인 경우
          localStorage.setItem("role","admin");
          navigate("/admin",{replace:true});
        }
  
        // FCM 토큰 함수 호출
        requestFcmToken()
  
        if(role === "ip"){//역할이 IP인 경우
          localStorage.setItem("role","ip");
          navigate("/help/ip", { replace: true });
        }
  
        if(role === "helper"){//역할이 Helper인경우
          localStorage.setItem("role","helper");
          navigate("/help/helper", { replace: true });
        }
      }
    }catch(err){
      console.log(err);
    }
  },[navigate,requestFcmToken]);

  useEffect(()=>{
    autoLogin();
  },[autoLogin]);

  useEffect(()=>{
    //axios 호출시 인터셉트
    axios.interceptors.request.use(function (config) {
      if(config.url.includes('detection')){
        setLoading(true);
      }
      return config
    }, function (error) {
      return Promise.reject(error);
    });

    //axios 호출 종료시 인터셉트
    axios.interceptors.response.use(function (response) {      
      setLoading(false);
      return response;
    }, function (error) {
      setLoading(false)
      return Promise.reject(error);
    });
  },[])

  useEffect(()=>{
    //DO : 쿠키에 저장된 theme을 불러와 redux에 저장
    const savedTheme = getCookie('theme');
    dispatch(setTheme(savedTheme));
  },[dispatch])
  const themeMode = useSelector((state) => state.setting.theme);
  const theme = themeMode === 'light' ? light : dark;

  return (
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
  );
}

const AppWrap = styled.div`
  background-color: ${props=>props.theme.colors.bgColor};
  /* color: ${props=>props.theme.colors.titleColor}; */
`
export default App;
