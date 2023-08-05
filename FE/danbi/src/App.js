import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router";
import {dark,light} from "./style/theme.js";
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { getCookie} from './cookie';
import {setTheme } from "./store/Slice/settingSlice.js";
import styled from 'styled-components';
import Modal from "./Components/Common/Modal/Modal.jsx";
import { reissueAccessToken } from './Util/apis/api';
function App() {
  //FIXME : 자동로그인, accesstoken만료시 재발급
  const dispatch = useDispatch();
  useEffect(()=>{
    //DO : 쿠키에 저장된 theme을 불러와 redux에 저장
    const savedTheme = getCookie('theme');
    dispatch(setTheme(savedTheme));
  },[dispatch]);

  useEffect(()=>{
    console.log("AccessToken재발행");
    if(!reissueAccessToken()){
      console.log(localStorage.getItem("role"));
    }
  },[]);

  const themeMode = useSelector((state) => state.setting.theme);
  const theme = themeMode === 'light' ? light : dark;
  return (
    <ThemeProvider theme={theme}>
      <AppWrap className="App">
        <BrowserRouter>
          <Routes>
            {routes.map((e) => {
              return (
                <Route
                  key={e.path}
                  path={e.path}
                  element={<e.component />}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
        <Modal/>
      </AppWrap>
    </ThemeProvider>
  );
}

const AppWrap = styled.div`
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`
export default App;
