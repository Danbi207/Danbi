import React, { useCallback, useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Header from "../../../Common/Header/Header";
import Footer from "../../../Common/Footer/Footer";
import Calender from "./Components/Calender";
import {setUserId,setProfileId,setName,setProfileUrl,setGender}  from "../../../../store/Slice/userSlice";
import {setMode} from "../../../../store/Slice/ModalSlice"
import { useDispatch,useSelector } from "react-redux";
import {authGet, authPost} from "../../../../Util/apis/api";

const IPHome = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {kakao} = window;
  const geocoder = useRef(new kakao.maps.services.Geocoder());
  const commandMode = useSelector(state=>state.modal.mode);
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

  useEffect(()=>{getUserInfo()},[getUserInfo]);

  const emergencyReqeust = useCallback(async(position,address)=>{
    try{
      let curTime = new Date();
        let year = curTime.getFullYear();
        let month = curTime.getMonth()+1;
        let day = curTime.getDate();
        let hour = curTime.getHours();
        let minute = curTime.getMinutes();
        const start_time  = `${year}-${month < 10 ? "0"+month : month}-${day < 10 ? "0"+day : day} ${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}`;

        curTime.setMinutes(curTime.getMinutes()+15);
        year = curTime.getFullYear();
        month = curTime.getMonth()+1;
        day = curTime.getDate();
        hour = curTime.getHours();
        minute = curTime.getMinutes();
        const end_time = `${year}-${month < 10 ? "0"+month : month}-${day < 10 ? "0"+day : day} ${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}`;

        const res = await authPost("/api/v1/help/create",{
          "position" : {
              "latitude" : position.coords.latitude,
              "longitude" : position.coords.longitude,
              "addr" : address,
              "destLatitude" : position.coords.latitude,
              "destLongitude" : position.coords.longitude,
              "destAddr" : address,
              "meetLatitude" : position.coords.latitude,
              "meetLongitude" : position.coords.longitude,
              "meetAddr" : address
          },
          "category" : "ETC",
          "caution" : "긴급요청입니다!주의해주세요.",
          "faceFlag": true,
          "emergencyFlag": true, 
          "genderFlag" : false,
          "content": "긴급도움 요청입니다. 근처에 계신분들은 도와주세요!",
          start_time,
          end_time
        });
        if(res){
          alert("긴급요청을 했습니다!");
        }
    }catch(err){
      console.log(err);
    }
  },[]);

  const coord2Address = useCallback((position,mode)=>{
    const coord = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.current.coord2Address(coord.getLng(), coord.getLat(), (result,status)=>{
      if (status === kakao.maps.services.Status.OK) {
        if(mode === "emergency")emergencyReqeust(position,result[0].address.address_name ? result[0].address.address_name : result[0].road_address);
      }
    });
  },[geocoder,kakao,emergencyReqeust])
  

  const setCurPosition = useCallback((mode)=>{
    //DO : gps 현재 위치 얻기
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((e)=>{
        if(mode==="emergency") coord2Address(e,mode)
      });
    } else {
      alert("GPS를 차단하셨습니다. 허용해주세요!");
    }
  },[coord2Address]);

  // 화면 재랜더링을 위해
  useEffect(()=>{ 
    emergencyReqeust();
  },[emergencyReqeust])

  const commands = [
    {
      command: "단비",
      callback: (command) => {
        if(commandMode===null){
          dispatch(setMode("stt"));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["긴급","도와줘","긴급요청"],
      callback: (command) => {
        if(commandMode==="stt"){
          emergencyReqeust();
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
  ] 

  const {browserSupportsSpeechRecognition} = useSpeechRecognition({commands});
  useEffect(()=>{
    if (browserSupportsSpeechRecognition) {//STT가 지원하는 경우
      SpeechRecognition.startListening({continuous: true, language: 'ko'})
    }
  },[browserSupportsSpeechRecognition]);
  return (
    <IpHomeWrap>
      <Header/>
        <Wrap>
          <Calender/>
          <EmergencyBTN onClick={()=>setCurPosition("emergency")}>긴급도움 요청하기</EmergencyBTN>
          <RequestBTN onClick={()=>{navigate('/help/ip/request')}}>도움 요청하기</RequestBTN>
        </Wrap>
      <Footer/>
    </IpHomeWrap>
  );
};
const EmergencyBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 10rem;
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${props=>props.theme.colors.redBtnColor};
  color: #fff;
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
    bottom: 14rem;
  }
`
const IpHomeWrap = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Wrap = styled.div `
  width: 100%;
  height: 100%;;
  background-color: ${props=>props.theme.colors.bgColor};

`

const RequestBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 5rem;
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  color: ${props=>props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
    bottom: 7rem;
  }
`

export default IPHome;