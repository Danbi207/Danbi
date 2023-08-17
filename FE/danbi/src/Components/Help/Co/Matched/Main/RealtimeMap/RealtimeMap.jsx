import React from "react"
import {Map,CustomOverlayMap} from "react-kakao-maps-sdk";

const RealtimeMap = ({position,curposition}) => {
  const getMakers = ()=>{
    const res = [];
    res.push(
    <CustomOverlayMap position={{lat:curposition.coords.latitude,lng:curposition.coords.longitude}}>
      <CurMarker alt='' src={`${process.env.PUBLIC_URL}/assets/curMarker.svg`}></CurMarker>
    </CustomOverlayMap>);
    
    res.push(
      <CustomOverlayMap position={{lat:position.meetLatitude,lng:position.meetLongitude}}>
        <MarkerWrap>
          <div>만나는 곳</div>
          <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
        </MarkerWrap>
      </CustomOverlayMap>);

    if((destLatitude in position) && position.destLatitude && (destLongitude in position) && position.destLongitude){
      res.push(
        <CustomOverlayMap position={{lat:position.destLatitude,lng:position.destLongitude}}>
          <MarkerWrap>
            <div>목적지</div>
            <Marker alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}></Marker>
          </MarkerWrap>
        </CustomOverlayMap>);
    }
    
    return res;
  }
  
  return (
    <Map
      center={{lat:position.meetLatitude,lng:position.meetLongitude}}
      style={{width:"100%",height:"100%"}}
      level={7}
    >
      {
        getMakers()
      }
    </Map>
  )
}

const rotateMarker = keyframes`
  from{
    transform: rotateY(0deg);
  }
  to{
    transform: rotateY(180deg);
  }
`

const CurMarker = styled.img`
  width: 1rem;
  height: 2rem;
  animation: ${rotateMarker} 1s linear infinite;
`

const MarkerWrap = styled.div`
  position: relative;
`

const Marker = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: relative;
`


export default RealtimeMap