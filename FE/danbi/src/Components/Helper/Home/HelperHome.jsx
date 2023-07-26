import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import Header from "../../Common/Header/Header.jsx"
import Footer from "../../Common/Footer/Footer.jsx"
import HelpList from "./HelpList/HelpList.jsx"
import HelpMap from "./HelpMap/HelpMap.jsx"
import axios from 'axios';
const HelperHome = () => {
  const [mode,setMode] = useState(false);
  const [position,setPosition] = useState(null);
  const [helpList,setHelpList] = useState([]);
  useEffect(()=>{
    axios({
      method:"get",//backend와 연결시 post로 변경
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>setHelpList(data.help_list)).catch((err)=>console.log(err));
  },[]);

  return (
    <HelperHomeWrap>
      <div>
        <Header></Header>
        <ModeToggleWrap mode = {mode}>
        &nbsp;리스트&nbsp;
        <ModeSwitch>
          <input type="checkbox" onChange={()=>{
            if(!mode){
              //DO : gps 현재 위치 얻기
              if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function(position) {
                  setPosition(position);
                  setMode(!mode);
                }, function(error) {
                  alert(error.message);
                  console.error(error);
                }, {
                  enableHighAccuracy: false,
                  maximumAge: 0,
                  timeout: Infinity
                });
              } else {
                alert('GPS를 지원하지 않습니다');
              }
            }else{
              setMode(!mode);
            }
          }} />
          <ModeSlider></ModeSlider>
        </ModeSwitch>
        &nbsp;지도&nbsp;
        </ModeToggleWrap>
      </div>
      {
        mode ? <HelpMap helpList={helpList} mode={mode} setMode={setMode} position={position} /> : <HelpList helpList={helpList} mode={mode} setMode={setMode} />
      }
      <Footer></Footer>
    </HelperHomeWrap>
  )
}

const HelperHomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`
const ModeToggleWrap = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  color: ${props=>props.mode? "#fff": props.theme.colors.titleColor};
  background-color: ${props=>props.mode? "rgba(0,0,0,0.4)" : null};
  width: 12rem;
  height: 3rem;
  padding-top: 0.5rem;
  line-height: 2.5rem;
  justify-content: center;
  z-index: 2;
`
const ModeSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 2rem;
  &>input{
    opacity: 0;
    width: 0;
    height: 0;
  }
  &>input:checked+span:before{
    -webkit-transform: translateX(2.5rem);
    -ms-transform: translateX(2.5rem);
    transform: translateX(2.5rem);
  }
`
const ModeSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6938D3;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 1rem;
  &::before{
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1.5rem;
    left: 0.5rem;
    bottom: 0.25rem;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
`
export default HelperHome