import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Footer from '../../Common/Footer/Footer';

const Map = () => {
  const { kakao } = window;
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    const mapOption = { 
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const createdMap = new kakao.maps.Map(mapRef.current, mapOption);
    

    kakao.maps.event.addListener(createdMap, 'click', function(mouseEvent) {
      var latlng = mouseEvent.latLng;
      var clickedMessage = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      clickedMessage += '경도는 ' + latlng.getLng() + ' 입니다';

      console.log(latlng.getLat())
      console.log(String(latlng.getLat()))
      console.log(latlng.getLng())
      setMessage(clickedMessage);
    });
    setMap(createdMap);

    
    }, [kakao]);

  return (
    <>
      <MapWrap ref={mapRef}></MapWrap>
      <ResultDiv>{message}</ResultDiv>
      <Footer></Footer>
      
    </>
  )
}

const MapWrap = styled.div`
  width: 100%;
  height: calc(100% - 6.4rem);
`

const ResultDiv = styled.div`
  width: 100%;
`

export default Map;
