import React from 'react'
import styled from 'styled-components';
import {Map,CustomOverlayMap} from "react-kakao-maps-sdk";
import { useState } from 'react';
const RequestMap = ({meet,dest,setDest,setMeet,setTap,tap,position}) => {
  const [markerPosition,setMarkerPosition]=useState(
    tap==="meet"?
      meet ? {lat:meet.meetLatitude,lng:meet.meetLongitude}:null
    :tap==="dest"?
      dest ? {lat:dest.destLatitude,lng:dest.destLongitude}:null
    :null
  );
  const [addr,setAddr] = useState(
    tap==="meet"?
      meet ? meet.meetAddr:null
    :tap==="dest"?
      dest ? dest.destAddr:null
    :null
  );
  const {kakao} = window;
  return (
    <Wrap>
      <Map
        center={{lat:position.coords.latitude,lng:position.coords.longitude}}
        style={{width:"100%",height:"100%"}}
        level={7}
        onClick={(_t,e)=>{
          const geocoder = new kakao.maps.services.Geocoder();
          const callback = (result,status) =>{
            if (status === window.kakao.maps.services.Status.OK) {
              setAddr(result[0].address.address_name ? result[0].address.address_name:result[0].road_address);
              if(tap === "meet"){
                setMeet({meetAddr:result[0].address.address_name ? result[0].address.address_name:result[0].road_address,meetLatitude:e.latLng.getLat(),meetLongitude:e.latLng.getLng()});
                setMarkerPosition({lat:e.latLng.getLat(),lng:e.latLng.getLng()});
              }
    
              if(tap === "dest"){
                setDest({destAddr:result[0].address.address_name ? result[0].address.address_name:result[0].road_address,destLatitude:e.latLng.getLat(),destLongitude:e.latLng.getLng()});
                setMarkerPosition({lat:e.latLng.getLat(),lng:e.latLng.getLng()});
              }
            }
          };
          geocoder.coord2Address(e.latLng.getLng(), e.latLng.getLat(), callback);
        }}
      >
        {markerPosition&&<CustomOverlayMap position={markerPosition} >
          <Marker>
            <div>{addr}</div>
            <img alt='' src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`}/>
          </Marker>
        </CustomOverlayMap>}
      </Map>
      <Btn onClick={()=>setTap("setting")}>완료</Btn>
    </Wrap>
  )
}
const Marker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  &>:first-child{
    position: absolute;
    height: 2rem;
    line-height: 2rem;
    bottom: 1.5rem;
    width: 16rem;
    left: -8rem;
    text-align: center;
    border: 1px solid #000;
    border-radius: 0.5rem;
    background-color: #fff;
    overflow: hidden;
  }
  &>:last-child{
    width: 1rem;
    height: 1rem;
  }
`

const Btn = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 1rem;
  border: 1px solid #000;
  border-radius: 1rem;
  width: 15rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  left: calc((100% - 15rem)/2);
  background-color: #FFEA7E;
  font-size: 1.5rem;
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
export default RequestMap