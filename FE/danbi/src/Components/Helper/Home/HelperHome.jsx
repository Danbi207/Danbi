import React, { useState,useCallback,useEffect } from 'react'
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
  const setContact = useCallback(() => {
    axios({
      method:"get",
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>{
      setHelpList(data.data);
    }).catch((err)=>console.log(err));
    setMode("contact");
  },[setHelpList,setMode]);

  const setUntact = useCallback(() => {
    axios({
      method:"get",
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>{
      setHelpList(data.data);
    }).catch((err)=>console.log(err));
    setMode("untact");
  },[setHelpList,setMode]);

  const setMap = useCallback(()=>{
    //DO : gps 현재 위치 얻기
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(e) {
        setPosition(e);
        setMode("map");
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 허용하지 않아 도움목록을 조회할 수 없습니다. GPS를 허용해주세요!');
      setUntact();
    }
  },[setPosition,setMode,setUntact]);

  useEffect(()=>{setUntact();},[setUntact]);

  return (
    <HelperHomeWrap>
      <div>
        <Header></Header>
        <Tap setContact={setContact} setMap={setMap} setUntact={setUntact} mode={mode}></Tap>
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