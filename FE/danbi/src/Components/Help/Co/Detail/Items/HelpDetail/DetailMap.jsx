import React, { useMemo } from 'react';
import { Map,CustomOverlayMap   } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const DetailMap = ({ position }) => {
  const markers = useMemo(()=>{
    const res = [];

    if(position.meetLatitude && position.meetLongitude!==""){
      res.push(
        <CustomOverlayMap key={1} position={{lat:position.meetLatitude,lng:position.meetLongitude}}>
          <div>목적지</div>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
        </CustomOverlayMap>
      );
    }


    if(position.destLatitude && position.destLatitude!==""){
      res.push(
        <CustomOverlayMap key={1} position={{lat:position.destLatitude,lng:position.destLongitude}}>
          <div>만나는 장소</div>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
        </CustomOverlayMap>
      );
    }
    

    return res;
  },[position])

  return (
    <Map 
      center={{lat:position.meetLatitude,lng:position.meetLongitude}}
      style={{width:"100%",height:"100%"}}
      level={7}
    >
      {
        markers
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
