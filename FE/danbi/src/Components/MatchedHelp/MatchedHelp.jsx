import React from 'react'
import Header from "../Common/Header/Header.jsx"
import Footer from "../Common/Footer/Footer.jsx"
import Tap from "./Tap/Tap.jsx"

import styled from 'styled-components';
import { useState } from 'react';
import Infomation from './Main/Infomation/Infomation.jsx';
import Chat from './Main/Chat/Chat.jsx';
import RealtimeMap from './Main/RealtimeMap/RealtimeMap.jsx';
const MatchedHelp = () => {
  const [mode,setMode] = useState("Infomation");
  return (
    <MatchedHelpWrap>
      <Header></Header>
      <Tap mode={mode} setMode={setMode}></Tap>
      {
        mode === "Infomation" ? <Infomation/>:
        mode === "Chat" ? <Chat/> :
        mode === "RealtimeMap" ? <RealtimeMap/>
        : null
      }
      <Footer></Footer>
    </MatchedHelpWrap>
  )
}
const MatchedHelpWrap = styled.div`
  width: 100%;
  height: 100%;
`
export default MatchedHelp