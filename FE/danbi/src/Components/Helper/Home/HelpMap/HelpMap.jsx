import React, { useCallback,useEffect, useRef } from 'react'
import styled  from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import "./HelpMap.css";
import HelpMapItem from "./HelpMapItem.jsx";
const HelpMap = (props) => {
  const {kakao} = window;
  const mapRef = useRef();
  const [helpList,setHelpList] = useState([]);
  const [map,setMap] = useState(null);
  const [markerList,setMarkerList] = useState([]);
  const [overlayList,setOverlayList] = useState([]);
  const [curHelpIdx,setCurHelpIdx] = useState(0);
  const [detailMode, setDetailMode] = useState(false);
  const getOverlay = useCallback((help)=>{
    return `
    <div class='UserWrap'>
      <div class='UserWrap'>
        <div class='UserProfile'></div>
        <div class='UserinfoWrap'>
          <div class='UserName'>김철수</div>
          <div class='UserPoint'>100 Dew</div>
        </div>
      </div>
      <div class='HelpTimeWrap'>
        <div>${help.start_time.split(" ")[0]}</div>
        <div>${help.start_time.split(" ")[1]}~${help.end_time.split(" ")[1]}</div>
      </div>
    </div>
    <div class='HelpContentWrap'>${help.content}</div>`;
  },[]);

  useEffect(()=>{
    //DO : 카카오 맵 초기설정
    const mapOption = { 
      center: new kakao.maps.LatLng(props.position.coords.latitude,props.position.coords.longitude), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    };
    setMap(new kakao.maps.Map(mapRef.current, mapOption));
  },[props.position,mapRef,kakao]);

  useEffect(()=>{
    axios({
      method:"get",//backend와 연결시 post로 변경
      url:`${process.env.PUBLIC_URL}/json/helpList.json`
    }).then(({data})=>setHelpList(data.help_list)).catch((err)=>console.log(err));
  },[]);

  useEffect(()=>{
    //DO : 도움리스트를 조회하여 마커로 등록
    helpList.forEach((help,idx)=>{
      const markerPosition  = new kakao.maps.LatLng(help.position.latitude, help.position.longitude); 

      //DO : 마커를 생성
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable:true
      });
      markerList.push(marker);
      kakao.maps.event.addListener(marker, 'click', ()=>{console.log(help)});
      marker.setMap(map);
      
      //DO : overlay생성
      var content = document.createElement("div");
      content.className="OverlayWrap";

      var closeBtn = document.createElement("button");
      closeBtn.className="CloseBtn";
      closeBtn.innerHTML='X';
      closeBtn.onclick = function() { //overlay 닫기
        overlay.setMap(null);
      };
      content.appendChild(closeBtn);
      content.insertAdjacentHTML("afterbegin",getOverlay(help));

      const helpDetailBtn = document.createElement("button");
      helpDetailBtn.className="HelpDetailBtn";
      helpDetailBtn.innerText="상세보기";
      helpDetailBtn.onclick = function(){//상세보기 함수
        console.log(help.help_post_id);
      }
      content.insertAdjacentElement("beforeend",helpDetailBtn);

      var overlay = new kakao.maps.CustomOverlay({//오버레이 생성
        position : marker.getPosition(), 
        content : content,
        clickable:true,
      });

      kakao.maps.event.addListener(marker, 'click', function() {//마커 클릭이벤트
        if(window.innerWidth <= 500){//모바일 버전은 다르게 표시
          setCurHelpIdx(idx);
          setDetailMode(true);
        }else{
          overlay.setMap(map);//클릭시 오버레이 맵에 표시
        }
      });

      overlayList.push(overlay);
    });
  },[helpList,kakao,map,markerList,overlayList,getOverlay]);

  return (
    <HelpMapWrap>
      <MapWrap ref={mapRef}></MapWrap>
      <HelpMapItem detailMode={detailMode} help={helpList[curHelpIdx]}></HelpMapItem>
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