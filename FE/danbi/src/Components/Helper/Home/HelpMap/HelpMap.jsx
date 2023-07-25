import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
const HelpMap = () => {
  const {kakao} = window;
  const mapRef = useRef();
  useEffect(()=>{
    const mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapRef.current, mapOption); 
  },[mapRef,kakao])
  return (
    <MapWrap id='map' ref={mapRef}>HelpMap</MapWrap>
  )
}
const MapWrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`
export default HelpMap