import React, { useState,useCallback,useEffect } from 'react'
import styled from 'styled-components';
import Header from "../../../Common/Header/Header.jsx"
import Footer from "../../../Common/Footer/Footer.jsx"
import HelpList from "./Components/HelpList/HelpList.jsx"
import HelpMap from "./Components/HelpMap/HelpMap.jsx"
import Tap from "./Components/Tap/Tap.jsx"
import {authGet, authPost} from "../../../../Util/apis/api.js"
import { useSelector } from 'react-redux';
const HelperHome = () => {
  const [mode,setMode] = useState("unntact");
  const [position,setPosition] = useState(null);
  const [helpList,setHelpList] = useState([]);
  const userInfo = useSelector(state=>state.user);
  const setUntact = useCallback(async () => {
    try{
      const {data} = await authPost("/api/v1/untact",{gender:userInfo.gender});
      if(data){
        setHelpList(data);
        setMode("untact");
      }
    }catch(err){
      console.log(err.response);
    }
  },[setHelpList,setMode]);
  const setCurPosition = useCallback(()=>{
    //DO : gps 현재 위치 얻기
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(e) {
        setPosition(e);
        return true;
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
    return false;
  },[setUntact]);

  const setContact = useCallback(async() => {
    if(setCurPosition()){
      try{
        const {data} = await authPost(`/api/v1/contact`,{
          longitude:position.coord.longitude+"",
          latitude:position.coords.latitude+"",
          gender:userInfo.gender
        });
        if(data){
          setHelpList(data);
          setMode("contact");
        }
      }catch(err){
        console.log(err.response);
      }
    }
  },[setHelpList,setMode]);


  const setMap = useCallback(async ()=>{
    if(setCurPosition()){
      try{
        const {data} = await authPost(`/api/v1/contact`,{
          longitude:position.coord.longitude+"",
          latitude:position.coords.latitude+"",
          gender:userInfo.gender
        });
        if(data){
          setHelpList(data);
          setMode("map");
        }
      }catch(err){
        console.log(err.response);
      }
    }
  },[setCurPosition,setMode]);

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