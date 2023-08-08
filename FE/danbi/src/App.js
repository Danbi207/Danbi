import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router";
import {dark,light} from "./style/theme.js";
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { getCookie} from './Util/hooks/cookie';
import { setTheme } from "./store/Slice/settingSlice.js";
import styled from 'styled-components';
import Modal from "./Components/Common/Modal/Modal.jsx";
import JSconfetti from 'js-confetti';

// 뽑기 이벤트 Canvas 생성
export const Jsconfetti = new JSconfetti();

function App() {
  // confetti canvas 생성
  //FIXME : 자동로그인, accesstoken만료시 재발급
  const dispatch = useDispatch();
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
          <Routes>
            {routes.map((e) => {
              return (
                <Route
                  key={e.path}
                  path={e.path}
                  element={<e.Component />}
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
  /* color: ${props=>props.theme.colors.titleColor}; */
`
export default App;
