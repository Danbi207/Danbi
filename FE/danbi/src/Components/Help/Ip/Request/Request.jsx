import React,{ useEffect, useState, useCallback } from 'react';
import { styled } from 'styled-components';
import Footer from "../../../Common/Footer/Footer";
import Header from "../../../Common/Header/Header";
import Time from './Components/Time/Time';
import Setting from "./Components/Setting/Setting";
import RequestMap from "./Components/RequestMap/RequestMap";
import { authGet } from '../../../../Util/apis/api';
const Request = () => {
  const [tap,setTap] = useState("time");
  const [year,setYear] = useState((new Date()).getFullYear()); // 연도 저장 2023
  const [month,setMonth] = useState((new Date()).getMonth()); // 달(현재-1) 저장 7
  const [day,setDay] = useState((new Date()).getDate());
  const [hour,setHour] = useState((new Date()).getHours());
  const [minute,setMinute] = useState((new Date()).getMinutes()-(new Date()).getMinutes()%5+5);
  const [useTime,setUseTime] = useState(15);
  const [genderOption,setGenderOption] = useState(false);
  const [faceType,setFaceType] = useState("none");
  const [helpType,setHelpType] = useState("none");
  const [meet,setMeet] = useState(null);
  const [dest,setDest] = useState(null);
  const [position,setPosition] = useState({coords:{latitude:36.1071233,longitude:128.216481}});//지도 Position
  const [content,setContent] = useState('');
  const [presets,setPresets] = useState([]);
  const [cautionTitle,setCautionTitle] = useState("직접입력");
  const [caution,setCaution] = useState('');
  
  const getPreset = useCallback(async()=>{
    try{
      const data = await authGet("/api/v1/preset");
      if(data){
        setPresets(data.presetList);
      }
    }catch(err){
      console.log(err);
    }
  },[setPresets]);

  useEffect(()=>{
    getPreset();
  },[getPreset]);

  return (
    <Wrap>
      <Header></Header>
      {
        tap==="dest" || tap === "meet" ? <MainWrap $full={true} ><RequestMap meet={meet} dest={dest} setDest={setDest} setMeet={setMeet} position={position} setTap={setTap} tap={tap}></RequestMap></MainWrap> : <>
        <Tap>
          <TapItem $on = {tap==="time"} onClick={()=>setTap("time")}>시간예약</TapItem>
          <TapItem $on = {tap==="setting"} onClick={()=>setTap("setting")}>상세설정</TapItem>
        </Tap>
        <MainWrap $full={false}>
          {
            tap==="time" ? <Time setGenderOption={setGenderOption} genderOption={genderOption} useTime={useTime} setUseTime={setUseTime} setMinute={setMinute} minute={minute} hour={hour} setHour={setHour} day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear}></Time>:null
          }
          {
            tap==="setting" ? <Setting presets={presets} setCautionTitle={setCautionTitle} cautionTitle={cautionTitle} caution={caution} setCaution={setCaution} setContent={setContent} setPosition={setPosition} setTap={setTap} dest={dest} meet={meet} setHelpType={setHelpType} helpType={helpType} setFaceType={setFaceType} faceType={faceType}></Setting>:null
          }
        </MainWrap>
      </>
      }
      <Footer></Footer>
    </Wrap>
  )
}
const MainWrap = styled.div`
  height: ${props=>props.$full ? "calc(100% - 6.2rem)" :"calc(100% - 9.2rem)"};
  padding: ${props=>props.$full ? null :"1rem 30%"};
  @media screen and (max-width: 728px) {
    padding: ${props=>props.$full ? null :"1rem"};
  }
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Tap = styled.div`
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: repeat(2,1fr);
`
const TapItem = styled.button`
  border-bottom: 3px solid ${props=>props.$on ? props.theme.colors.titleColor : "transparent"};
`

export default Request