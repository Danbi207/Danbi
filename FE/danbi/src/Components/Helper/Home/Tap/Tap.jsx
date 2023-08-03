import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
const Tap = (props) => {
  useEffect(()=>{setContact();},[]);
  const setContact = () => {
    axios({
      method:"get",
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>{
      props.setHelpList(data.data.help_list.filter(e=>e.face_flag));
    }).catch((err)=>console.log(err));
    props.setMode("contact");
  }

  const setUntact = () => {
    axios({
      method:"get",
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>{
      props.setHelpList(data.data.help_list.filter(e=>!e.face_flag));
    }).catch((err)=>console.log(err));
    props.setMode("untact");
  }
  const setMap = ()=>{
    if(props.mode !== "map"){
      //DO : gps 현재 위치 얻기
      if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function(position) {
          props.setPosition(position);
          props.setMode("map");
        }, function(error) {
          console.error(error);
        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        });
      } else {
        alert('GPS를 지원하지 않습니다');
        props.setMode("contact");
      }
    }
  }

  return (
    <TapWrap>
      <TapBtn $mode={"contact"===props.mode} onClick={setContact}>대면 도움</TapBtn>
      <TapBtn $mode={"untact"===props.mode} onClick={setUntact}>비대면 도움</TapBtn>
      <TapBtn $mode={"map"===props.mode} onClick={setMap}>지도</TapBtn>
    </TapWrap>
  )
}
const TapBtn = styled.button`
  height: 100%;
  line-height: 3rem;
  border-bottom: ${props=>props.$mode ? `3px solid ${props.theme.colors.titleColor}` : null };
`
const TapWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  height: 3rem;
`

export default Tap