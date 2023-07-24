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
function App() {
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
                  element={<e.component />}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </AppWrap>
    </ThemeProvider>
  );
}

const AppWrap = styled.div`
  background-color: ${props=>props.theme.colors.bgColor};
`
export default App;
