import './App.css';
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router";
import {dark,light} from "./style/theme.js";
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { getCookie} from './cookie';
import {setTheme } from "./store/Slice/settingSlice.js";
import Footer from './Components/Common/Footer/Footer'; 
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
      <div className="App">
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
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
