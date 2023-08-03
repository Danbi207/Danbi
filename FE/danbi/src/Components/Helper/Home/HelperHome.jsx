import React, { useState } from 'react'
import styled from 'styled-components';
import Header from "../../Common/Header/Header.jsx"
import Footer from "../../Common/Footer/Footer.jsx"
import HelpList from "./HelpList/HelpList.jsx"
import HelpMap from "./HelpMap/HelpMap.jsx"
import Tap from "./Tap/Tap.jsx"
import axios from 'axios';
const HelperHome = () => {
  const [mode,setMode] = useState("contact");
  const [position,setPosition] = useState(null);
  const [helpList,setHelpList] = useState([]);

  return (
    <HelperHomeWrap>
      <div>
        <Header></Header>
        <Tap setHelpList={setHelpList} setPosition={setPosition} mode={mode} setMode={setMode}></Tap>
      </div>
      <MainWrap>
        {
          mode === "map" && position ? <HelpMap helpList={helpList} mode={mode} setMode={setMode} position={position} /> : <HelpList helpList={helpList} mode={mode} setMode={setMode} />
        }
      </MainWrap>
      <Footer></Footer>
    </HelperHomeWrap>
  )
}

const MainWrap = styled.div`
  margin-top:3px;
  width: 100%;
  height: calc(100% - 9.2rem);
`

const HelperHomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`
export default HelperHome