import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
const RealtimeMap = (props) => {
  const [map,setMap] = useState();
  const [curMarker,setCurMarker] = useState(null);
  const mapRef = useRef();
  const {kakao} = window;
 
  useEffect(()=>{
    if(props.curposition !== null){
      const curPosition = new kakao.maps.LatLng(props.curposition.coords.latitude,props.curposition.coords.longitude);
      // console.log(props.curposition.coords);
      const marker = new kakao.maps.Marker({
        position: curPosition
      });
      if(curMarker !== null){curMarker.setMap(null);}
      marker.setMap(map);
      setCurMarker(marker);
    }
  },[kakao,props.curposition,map]);

  useEffect(()=>{
    //DO : 카카오 맵 초기설정
    const meetPosition = new kakao.maps.LatLng(props.position.meetLatitude,props.position.meetLongitude);
    const mapOption = { 
      center: meetPosition, //만나는장소 위치
      level: 7 // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapRef.current, mapOption);
    setMap(map);
    
    const coordinates = [];
    //만나는 장소마커 생성
    const meetMarker = new kakao.maps.Marker({
      position: meetPosition
    });
    meetMarker.setMap(map);
    coordinates.push([props.position.meetLongitude,props.position.meetLatitude]);

    //목적지 장소마커 생성
    let destMarker = null;
    if(props.position.destLatitude){
      const destPosition = new kakao.maps.LatLng(props.position.destLatitude,props.position.destLongitude)
      destMarker = new kakao.maps.Marker({
        position: destPosition
      });
      destMarker.setMap(map);
      coordinates.push([props.position.destLongitude,props.position.destLatitude]);

      //DO : 경로찾기 및 지도에 표시
      axios({
        method:"post",
        url:"https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        headers:{
          "Authorization" : `${process.env.REACT_APP_OPENROUTESERVICE_KEY}`
        },
        data:{"coordinates":coordinates}
      }).then(({data})=>{
        // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
        const linePath = [];
        for(let i = 0; i < data.features[0].geometry.coordinates.length; i++){
          linePath.push(new kakao.maps.LatLng(data.features[0].geometry.coordinates[i][1],data.features[0].geometry.coordinates[i][0]));
        }
        // 지도에 표시할 선을 생성합니다
        const polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 10, // 선의 두께 입니다
          strokeColor: '#FFAE00', // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        });
  
        // 지도에 선을 표시합니다 
        polyline.setMap(map);  
      });
    }
  },[props.position,mapRef,kakao]);

  return (
    <RealtimeMapWrap ref={mapRef}>
    </RealtimeMapWrap>
  )
}
const RealtimeMapWrap = styled.div`
  width: 100%;
  height: 100%;
`
export default RealtimeMap