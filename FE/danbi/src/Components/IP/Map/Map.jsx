import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const Map=()=>{
  const {kakao} = window;
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(()=>{
    const mapOption = { 
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    };
    setMap(new kakao.maps.Map(mapRef.current, mapOption));
  }, [kakao])

    return (
        <MapWrap  ref={mapRef}>
        </MapWrap>
    )
}

const MapWrap = styled.div`
  width: 300px;
  height: 300px;
`

export default Map;