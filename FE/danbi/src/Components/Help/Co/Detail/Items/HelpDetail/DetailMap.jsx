import React, { useEffect, useMemo, useState } from 'react';
import { Map,CustomOverlayMap   } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const DetailMap = ({ position }) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  })
  const markers = ()=>{
    const res = [];
    let key = 0;
    if(position.meetLatitude && position.meetLongitude!==""){
      res.push(
        <CustomOverlayMap key={key++} position={{lat:position.meetLatitude,lng:position.meetLongitude}}>
          <div>만나는 장소</div>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
        </CustomOverlayMap>
      );
    }


    if(position.destLatitude && position.destLatitude!==""){
      res.push(
        <CustomOverlayMap key={key++} position={{lat:position.destLatitude,lng:position.destLongitude}}>
          <div>목적지</div>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
        </CustomOverlayMap>
      );
    }
    

    return res;
  }

  useEffect(()=>{
    if(position.meetLatitude){
      setState({
        center: { lat: position.meetLatitude, lng: position.meetLongitude },
        isPanto: true,
      });
    }
  },[position])

  return (
    <Map 
      center={state.center}
      isPanto={state.isPanto}
      style={{width:"100%",height:"100%"}}
      level={7}
    >
      {
        markers()
      }
    </Map>
  );
};
const Marker = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`

export default DetailMap;
