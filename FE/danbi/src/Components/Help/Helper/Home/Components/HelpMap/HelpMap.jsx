import React, { useState,useCallback,useEffect, useRef } from 'react'
import styled  from 'styled-components';
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

  return (
    <HelpMapWrap>
      <Map
        center={{lat:position.coords.latitude,lng:position.coords.longitude}}
        style={{width:"100%",height:"100%"}}
        level={7}
      >
        <CustomOverlayMap position={{lat:position.coords.latitude,lng:position.coords.longitude}}>
          <CurMarker alt='' src={`${process.env.PUBLIC_URL}/curMarker.svg`}></CurMarker>
        </CustomOverlayMap>
        {
          helpList.map((help,idx)=>{
            if(help.emergencyFlag){
              return <CustomOverlayMap position={{lat:help.meetLatitude,lng:help.meetLongitude}}>
                <Marker alt='' $haste={true} src={`${process.env.PUBLIC_URL}/assets/haste.svg`} onClick={()=>showDetail(help,idx)} >
                  <HelpMapItemPC help={help} visible={visible} defaultIdx={idx} curIdx={curIdx} />
                  <div onClick={()=>setVisible("none")}>X</div>
                </Marker>;
              </CustomOverlayMap>
            }
        
            if(help.friendFlag){
              return <CustomOverlayMap position={{lat:help.meetLatitude,lng:help.meetLongitude}}>
                <Marker alt='' $haste={(new Date() >= new Date(help.startTime))} src={`${process.env.PUBLIC_URL}/assets/Marker_firends.svg`} onClick={()=>showDetail(help,idx)} >
                  <HelpMapItemPC help={help} visible={visible} defaultIdx={idx} curIdx={curIdx} />
                  <div onClick={()=>setVisible("none")}>X</div>
                </Marker>;
              </CustomOverlayMap>
            }
        
            return <CustomOverlayMap position={{lat:help.meetLatitude,lng:help.meetLongitude}}>
                <Marker alt='' $haste={(new Date() >= new Date(help.startTime))} src={`${process.env.PUBLIC_URL}/assets/Marker_firends.svg`} onClick={()=>showDetail(help,idx)} >
                  <HelpMapItemPC help={help} visible={visible} defaultIdx={idx} curIdx={curIdx} />
                  <div onClick={()=>setVisible("none")}>X</div>
                </Marker>;
              </CustomOverlayMap>
          })
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

const Marker = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: relative;
  animation: ${props=>props.$haste ? moveY : null} 0.3s linear 0s infinite alternate;

  &>:last-child{
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    cursor: pointer;
  }
`

export default HelpMap