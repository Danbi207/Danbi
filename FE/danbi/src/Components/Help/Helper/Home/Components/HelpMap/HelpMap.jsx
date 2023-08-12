import React, { useState,useCallback} from 'react'
import styled, { keyframes }  from 'styled-components';
import HelpMapItemMobile from "./HelpMapItemMobile.jsx";
import {Map,CustomOverlayMap} from "react-kakao-maps-sdk";
import HelpMapItemPC from './HelpMapItemPC.jsx';

const HelpMap = ({position,helpList}) => {
  const [curHelp,setCurHelp] = useState(null);
  const [visible,setVisible] = useState("none");
  const [curIdx,setCurIdx] = useState(0);
  const showDetail = useCallback((help,idx)=>{
    setCurHelp(help);
    setCurIdx(idx);
    if(window.innerWidth < 768){
      setVisible("mobile");
    }else{
      setVisible("pc");
    }
  },[]);

  const getMakers = ()=>{
    const res = [];
    res.push(
    <CustomOverlayMap key={-1} position={{lat:position.coords.latitude,lng:position.coords.longitude}}>
      <CurMarker alt='' src={`${process.env.PUBLIC_URL}/assets/curMarker.svg`}></CurMarker>
    </CustomOverlayMap>);

    for(let i = 0; i < helpList.length; i++){
      if(helpList[i].emergencyFlag){
        res.push(<CustomOverlayMap key={helpList[i].helpPostId} position={{lat:helpList[i].position.meetLatitude,lng:helpList[i].position.meetLongitude}}>
          <Marker alt='' $haste={true} src={`${process.env.PUBLIC_URL}/assets/haste.svg`} onClick={()=>showDetail(helpList[i],i)} ></Marker>
          <MarkerWrap>
            <HelpMapItemPC help={helpList[i]} visible={visible} defaultIdx={i} curIdx={curIdx} setCurIdx={setCurIdx} ></HelpMapItemPC>
          </MarkerWrap>
        </CustomOverlayMap>);
        continue;
      }
  
      if(helpList[i].friendFlag){
        res.push(
        <CustomOverlayMap key={helpList[i].helpPostId} position={{lat:helpList[i].position.meetLatitude,lng:helpList[i].position.meetLongitude}}>
          <MarkerWrap>
            <Marker alt='' $haste={(new Date() >= new Date(helpList[i].startTime))} src={`${process.env.PUBLIC_URL}/assets/Marker_firends.svg`} onClick={()=>showDetail(helpList[i],i)} ></Marker>
            <HelpMapItemPC help={helpList[i]} visible={visible} defaultIdx={i} curIdx={curIdx} setCurIdx={setCurIdx}></HelpMapItemPC>
          </MarkerWrap>
        </CustomOverlayMap>);
        continue;
      }
  
      res.push(
      <CustomOverlayMap key={helpList[i].helpPostId} position={{lat:helpList[i].position.meetLatitude,lng:helpList[i].position.meetLongitude}}>
        <MarkerWrap>
          <Marker alt='' $haste={(new Date() >= new Date(helpList[i].startTime))} src={`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`} onClick={()=>showDetail(helpList[i],i)} ></Marker>
          <HelpMapItemPC help={helpList[i]} visible={visible} defaultIdx={i} curIdx={curIdx} setCurIdx={setCurIdx}></HelpMapItemPC>
        </MarkerWrap>
      </CustomOverlayMap>);
    };
    console.log(res);
    return res;
  }

  return (
    <HelpMapWrap>
      <Map
        center={{lat:position.coords.latitude,lng:position.coords.longitude}}
        style={{width:"100%",height:"100%"}}
        level={7}
      >
        {
          getMakers()
        }
      </Map>
      <HelpMapItemMobile setVisible={setVisible} visible={visible} curHelp={curHelp}></HelpMapItemMobile>
    </HelpMapWrap>
  )
}

const HelpMapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const moveY = keyframes`
  from{
    transform: translateY(0);
  }
  to{
    transform: translateY(10px);
  }
`

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
  animation: ${props=>props.$haste ? moveY : null} 0.3s linear 0s infinite alternate;
`

export default HelpMap