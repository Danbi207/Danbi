import React, { useEffect, useState } from 'react';
import { Map,CustomOverlayMap   } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const DetailMap = ({ position, emergencyFlag }) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  })
  const markers = ()=>{
    const res = [];
    let key = 0;
    if(position){
      res.push(
        <CustomOverlayMap key={key++} position={{lat:position.meetLatitude,lng:position.meetLongitude}}>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Meeting.svg`}></Marker>
        </CustomOverlayMap>);

        if(!emergencyFlag && position.destLatitude && position.destLongitude){
          res.push(
            <CustomOverlayMap key={key++} position={{lat:position.destLatitude,lng:position.destLongitude}}>
              <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Destination.svg`}></Marker>
            </CustomOverlayMap>);
        }
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
  width: 2.5rem;
  height: 2.5rem;
`


export default DetailMap;
