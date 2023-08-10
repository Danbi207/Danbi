import React, { useState,useCallback,useEffect } from 'react'
import styled from 'styled-components';
import Header from "../../../Common/Header/Header.jsx"
import Footer from "../../../Common/Footer/Footer.jsx"
import HelpList from "./Components/HelpList/HelpList.jsx"
import HelpMap from "./Components/HelpMap/HelpMap.jsx"
import Tap from "./Components/Tap/Tap.jsx"
import { authGet, authPost} from "../../../../Util/apis/api.js"
import {setUserId,setProfileId,setName,setProfileUrl,setGender} from "../../../../store/Slice/userSlice.js"
import {useSelector, useDispatch } from "react-redux";

const HelperHome = () => {
  const [mode,setMode] = useState("untact");
  const [helpList,setHelpList] = useState([]);
  const [position,setPosition] = useState();
  const gender = useSelector(state=>state.user.gender);
  const dispatch = useDispatch();
  
  const getUserInfo = useCallback(async()=>{
    try{
      const data = await authGet("/api/v1/member");
      if(data){
        dispatch(setUserId(data.userId));
        dispatch(setProfileId(data.profileId));
        dispatch(setName(data.name));
        dispatch(setProfileUrl(data.profileUrl));
        dispatch(setGender(data.gender));
      }
    }catch(err){
      console.log(err.response);
    }
  },[dispatch]);

  const setUntact = useCallback(async () => {
    try{
      const data = await authPost("/api/v1/help/untact",{gender});
      if(data){
        setHelpList(data);
        setMode("untact");
      }
    }catch(err){
      console.log(err.response);
    }
  },[setHelpList,setMode,gender]);

  
  const setContact = useCallback(async(position) => {
    if(setCurPosition()){
      try{
        const data = await authPost(`/api/v1/help/contact`,{
          longitude:position.coords.longitude+"",
          latitude:position.coords.latitude+"",
          gender
        });
        if(data){
          setHelpList(data);
          setMode("contact");
        }
      }catch(err){
        console.log(err.response);
      }
    }
  },[setHelpList,setMode,gender,setCurPosition]);
  
  
  const setMap = useCallback(async (position)=>{
    if(setCurPosition()){
      try{
        const data = await authPost(`/api/v1/help/contact`,{
          longitude:position.coords.longitude+"",
          latitude:position.coords.latitude+"",
          gender
        });
        if(data){
          setHelpList(data);
          setMode("map");
        }
      }catch(err){
        console.log(err.response);
      }
    }
  },[setCurPosition,setMode,gender]);

  const setCurPosition = useCallback((mode)=>{
    //DO : gps 현재 위치 얻기
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((e)=>{
        setPosition(e);
        if(mode==="contact"){
          setContact(e);
        }

        if(mode === "map"){
          setMap(e);
        }
      });
    }else{
      alert("GPS를 차단하셨습니다. 허용해주세요!");
    }
  },[setContact,setMap]);

  useEffect(()=>{
    //로딩시 유저정보를 불러와 redux에 저장
    if(!gender || gender===""){
      getUserInfo();
    }
  },[getUserInfo,gender]);

  useEffect(()=>{
    //DO : 로딩시 비대면목록을 불러옴
    if(gender&&gender!=="")
      setUntact();
  },[gender,setUntact]);

  return (
    <HelperHomeWrap>
      <div>
        <Header></Header>
        <Tap setContact={()=>setCurPosition("contact")} setMap={()=>setCurPosition("map")} setUntact={setUntact} mode={mode}></Tap>
      </div>
      <MainWrap>
        {
          mode === "map" ? <HelpMap helpList={helpList} position={position} /> : <HelpList helpList={helpList}/>
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