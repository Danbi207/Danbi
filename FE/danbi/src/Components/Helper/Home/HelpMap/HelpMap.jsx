import React, { useState,useCallback,useEffect, useRef } from 'react'
import styled  from 'styled-components';
import "./HelpMap.css";
import HelpMapItem from "./HelpMapItem.jsx";
import { useNavigate } from 'react-router-dom';

const HelpMap = (props) => {
  const {kakao} = window;
  const mapRef = useRef();
  const [map,setMap] = useState(null);
  const [curHelp,setCurHelp] = useState(null);
  const [visible,setVisible] = useState(false);
  const navigate = useNavigate();
  const getOverlay = useCallback((help)=>{
    return `
      <div class="RowWrap">
        <div class="UserWrap">
          <div>
            <img class="UserProfile" src=${help.profileUrl}></img>
            <div class="UserTitle">
              <div>${help.name}</div>
              ${
                help.accuseStack === 0 ? "":
                help.accuseStack <= 2 ? "<img alt='' src='"+process.env.PUBLIC_URL+"/assets/yellow-flag.svg' />" :
                "<img alt='' src='"+process.env.PUBLIC_URL+"/assets/red-flag.svg' />"
              }
            </div>
          </div>
          <div class="TimeWrap">
            날짜 : ${help.startTime.split(" ")[0]}<br/>
            시간 : ${help.startTime.split(" ")[1]}~${help.endTime.split(" ")[1]}<br/>
            장소 : ${help.position.meetAddr}
          </div>
        </div>
      </div>
      <div class="HelpContent">${help.content}</div>
    `;
  },[]);

  useEffect(()=>{
    //DO : 카카오 맵 초기설정
    const curPosition = new kakao.maps.LatLng(props.position.coords.latitude,props.position.coords.longitude); // 지도의 중심좌표
    const mapOption = { 
      center: curPosition,
      level: 7 // 지도의 확대 레벨
    };
    const temp = new kakao.maps.Map(mapRef.current, mapOption);
    setMap(temp);
    const curMarker = new kakao.maps.CustomOverlay({
      position:curPosition,
      content:"<div class='curMarker'><div>현재위치</div><div></div></div>"
    });
    curMarker.setMap(temp);
  },[props.position,mapRef,kakao,setMap]);

  const setMarker = useCallback((help,idx)=>{
    const position  = new kakao.maps.LatLng(help.position.meetLatitude, help.position.meetLongitude); 
    const curTime = new Date();
    const helpTime = new Date(help.startTime);
    const marker = document.createElement("div");
    marker.className = "marker";

    const overlay = document.createElement("div");
    overlay.className="overlay";
    overlay.style.display = "none";
    overlay.innerHTML=getOverlay(help);
    const DetailBtn = document.createElement("button");
    DetailBtn.className="DetailBtn";
    DetailBtn.innerText="상세보기";
    DetailBtn.addEventListener("click",()=>{
      navigate(`/detail/${help.helpPostId}`);
    });
    overlay.append(DetailBtn);

    const closeBtn = document.createElement("button");
    closeBtn.className="CloseBtn";
    closeBtn.innerText="X";
    closeBtn.addEventListener("click",(e)=>{
      overlay.style.display = "none";
    });
    
    overlay.append(closeBtn);
    const  markerBtn = document.createElement("img");
    markerBtn.addEventListener("click",(e)=>{
      if(window.innerWidth <= 768){
        setVisible(true);
        setCurHelp(help);
        return;
      }
      overlay.style.display = 'block';
    });
    markerBtn.style.position="relative";
    if(curTime >= helpTime || (helpTime-curTime)/(60 * 60 * 1000) <= 1){//이미 도움이 시작되었지만 매칭이 안된 도움 or 1시간 이내의 도움
      if(help.friendFlag){//친구의 도움요청
        markerBtn.src=`${process.env.PUBLIC_URL}/assets/Marker_firends_haste.svg`;
        markerBtn.alt="";
        markerBtn.className="haste";
        marker.append(markerBtn);
      }else{//일반 도움요청
        markerBtn.src=`${process.env.PUBLIC_URL}/assets/Marker_Normal_haste.svg`;
        markerBtn.alt="";
        markerBtn.className="haste";
        marker.append(markerBtn);
      }
    }else{//긴급이 아닌 도움
      if(help.friendFlag){//친구의 도움요청
        markerBtn.src=`${process.env.PUBLIC_URL}/assets/Marker_firends.svg`;
        markerBtn.alt="";
        marker.append(markerBtn);
      }else{//일반 도움요청
        markerBtn.src=`${process.env.PUBLIC_URL}/assets/Marker_Normal.svg`;
        markerBtn.alt="";
        marker.append(markerBtn);
      }
    }
    marker.append(overlay);

    (new kakao.maps.CustomOverlay({
      position,
      content : marker
    })).setMap(map);
  },[kakao,map,getOverlay,navigate]);

  useEffect(()=>{
    //DO : 도움리스트를 조회하여 마커로 등록
    props.helpList.forEach((help,idx)=>{
      setMarker(help,idx);
    });
  },[setMarker,props.helpList]);

  return (
    <HelpMapWrap>
      <MapWrap ref={mapRef}></MapWrap>
      <HelpMapItem setVisible={setVisible} visible={visible} setCurHelp={setCurHelp} curHelp={curHelp}></HelpMapItem>
    </HelpMapWrap>
  )
}

const HelpMapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const MapWrap = styled.div`
  width: 100%;
  height: 100%;
`
export default HelpMap