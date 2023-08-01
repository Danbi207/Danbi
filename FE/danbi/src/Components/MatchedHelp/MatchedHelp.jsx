import React from 'react'
import Header from "../Common/Header/Header.jsx"
import Footer from "../Common/Footer/Footer.jsx"
import Tap from "./Tap/Tap.jsx"

import styled from 'styled-components';
import { useState } from 'react';
import Infomation from './Main/Infomation/Infomation.jsx';
import Chat from './Main/Chat/Chat.jsx';
import RealtimeMap from './Main/RealtimeMap/RealtimeMap.jsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const MatchedHelp = () => {
  const [mode,setMode] = useState("Infomation");
  const [help, setHelp] = useState();
  const { helpPostId } = useParams();
  const [curposition,setCurPosition] = useState(null);
  const [watchID,setWatchID] = useState(null);
  const stopCurPosition = ()=>{
    if(watchID !== null){
      navigator.geolocation.clearWatch(watchID);
      setWatchID(null);
    }
  };
  const startCurPosition = ()=>{
    if(navigator.geolocation){
      // timeout at 15000 milliseconds (15 seconds)
      const options = {timeout:15000};
      const geoLoc = navigator.geolocation;
      setWatchID(geoLoc.watchPosition((position)=>setCurPosition(position),(err)=>console.log(err), options));
   } else {
    setCurPosition(null);
   }
  };
  useEffect(()=>{
    axios({
      method:"get",
      url : `${process.env.PUBLIC_URL}/json/MatchedHelp.json`
    }).then(({data})=>{
      setHelp(data.data);
    }).catch(err=>console.log(err));
  },[]);
  return (
    <MatchedHelpWrap>
      <Header></Header>
      <Tap startCurPosition={startCurPosition} stopCurPosition={stopCurPosition} mode={mode} setMode={setMode}></Tap>
      <MainWrap>
        {
          mode === "Infomation" ? <Infomation help={help}/>:
          mode === "Chat" ? <Chat/> :
          mode === "RealtimeMap" ? <RealtimeMap position={help.position}  curposition = {curposition}/>
          : null
        }
      </MainWrap>
      <Footer></Footer>
    </MatchedHelpWrap>
  )
}
const MainWrap = styled.div`
  width: 100%;
  height: calc(100% - 6rem);
`

const MatchedHelpWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export default MatchedHelp