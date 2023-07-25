import React, { useCallback,useEffect, useRef } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
const HelpMap = () => {
  const {kakao} = window;
  const mapRef = useRef();
  const [helpList,setHelpList] = useState([]);
  const [map,setMap] = useState(null);
  const initkakao = useCallback((position)=>{
    //DO : 카카오 맵 초기설정
    const mapOption = { 
      center: new kakao.maps.LatLng(position.coords.latitude,position.coords.longitude), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    };
    setMap(new kakao.maps.Map(mapRef.current, mapOption));
  },[kakao,mapRef]);

  useEffect(() => {
    //DO : gps 현재 위치 얻기
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        initkakao(position);
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }, [initkakao]);

  useEffect(()=>{
    axios({
      method:"get",//backend와 연결시 post로 변경
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>setHelpList(data.help_list)).catch((err)=>console.log(err));
  },[]);

  useEffect(()=>{
    //DO : 도움리스트를 조회하여 마커로 등록
    helpList.forEach(help=>{
      const markerPosition  = new kakao.maps.LatLng(help.position.latitude, help.position.longitude); 

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title:help.content
      });
      marker.setMap(map);
    });
  },[helpList,kakao,map]);

  return (
    <HelpMapWrap>
      <MapWrap ref={mapRef}></MapWrap>
    </HelpMapWrap>
  )
}

const HelpMapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const MapWrap = styled.div`
  width: 100%;
  height: 100%;
`
export default HelpMap