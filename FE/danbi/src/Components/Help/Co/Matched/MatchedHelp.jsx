import React,{ useState,useEffect,useCallback } from 'react'
import Header from "../../../Common/Header/Header.jsx"
import Footer from "../../../Common/Footer/Footer.jsx"
import Tap from "./Tap/Tap.jsx"
import styled from 'styled-components';
import Infomation from './Main/Infomation/Infomation.jsx';
import Chat from './Main/Chat/Chat.jsx';
import RealtimeMap from './Main/RealtimeMap/RealtimeMap.jsx';
import { useParams } from 'react-router-dom';
import {authGet} from "../../../../Util/apis/api.js";
import axios from 'axios';

const MatchedHelp = () => {
  const [mode,setMode] = useState("Infomation");
  const [help, setHelp] = useState();
  const { helpPostId } = useParams();
  const [curposition,setCurPosition] = useState(null);
  const [watchID,setWatchID] = useState(null);
  const [myProfile,setMyProfile] = useState(null);
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

  const getHelp = useCallback(async () => {
    try{
      const data = await authGet(`/api/v1/help/matched/${helpPostId}`);
      setHelp(data);
    }catch(err){
      console.log(err.response);
    }
  },[]);
  
  const getMyProfile = useCallback(async()=>{
    try{
      const data = await authGet("/api/v1/help/member");
      if(data){
        setMyProfile(data);
      }
    }catch(err){
      console.log(err.response);
    }
  },[]);

  useEffect(()=>{
    getMyProfile();
  },[]);
  
  useEffect(()=>{
    getHelp()
  },[getHelp]);

  const checkRoomId = useCallback(() => {
    axios({
      url: `/room/check/${helpPostId}`,
      method:"get"
    }).then(({data})=>{
      if(data === 2){
        alert("방이 꽉찼습니다");
        setMode("Infomation");
      }else{
        setMode("Chat");
      }
    });
  },[helpPostId]);

  return (
    <MatchedHelpWrap>
      <Header></Header>
      <Tap checkRoomId={checkRoomId} startCurPosition={startCurPosition} stopCurPosition={stopCurPosition} mode={mode} setMode={setMode}></Tap>
      <MainWrap>
        {
          mode === "Infomation" ? <Infomation help={help}/>:
          mode === "Chat" ? <Chat mode={mode} roomId={helpPostId} myProfile = {myProfile}/> :
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