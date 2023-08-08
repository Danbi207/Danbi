import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Footer from '../../../Common/Footer/Footer';
import Header from '../../../Common/Header/Header';

import "./IpMap.css";
import { useDispatch, useSelector } from 'react-redux';

import {setMeetLongitude, setMeetLatitude, setMeetAddr, setDestLongitude, setDestLatitude, setDestAddr, } from '../../../../store/Slice/ipSlice'; 
import { useNavigate, useParams } from 'react-router-dom';

const IpMap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {mapid} = useParams();

  const { kakao } = window;
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const cur_longitude = useSelector(state => state.ip.position.cur_longitude)
  const cur_latitude = useSelector(state => state.ip.position.cur_latitude)

  useEffect(() => {
    console.log(cur_latitude, cur_longitude)
    const mapOption = { 
      // center: new kakao.maps.LatLng(37.566826, 126.9786567),
      center: new kakao.maps.LatLng(cur_latitude, cur_longitude), 
      level: 3 // 지도의 확대 레벨
    };

    // 지도 생성
    const createdMap = new kakao.maps.Map(mapRef.current, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(createdMap, 'click', function(mouseEvent) {
      // 위도 클릭 한 위치의 위도와 경도를 가져옵니다
      var latlng = mouseEvent.latLng;
      
      // eslint-disable-next-line no-unused-expressions
      mapid === '0'
      ? (dispatch(setMeetLongitude(latlng.getLat())),
        dispatch(setMeetLatitude(latlng.getLng())))
      : (dispatch(setDestLongitude(latlng.getLat())),
        dispatch(setDestLatitude(latlng.getLng())));
      console.log(latlng.getLat())
      console.log(latlng.getLng())

      // 클릭 위치 기반으로 도로면 주소 or 지번 주소를 가져옵니다
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
          var content = !!result[0].road_address ? '<div class="Wrap"><p>도로명주소 :' + detailAddr + '</p></div>' : 
          '<div class="Wrap"> <p>지번주소 :' + detailAddr + '</p></div>';
          mapid === '0'
          ? dispatch(setMeetAddr(detailAddr))
          : dispatch(setDestAddr(detailAddr));
          console.log(detailAddr);

          // 마커를 클릭한 위치에 표시합니다 
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(createdMap);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(createdMap, marker);
        }   
      });
    });

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    setMap(createdMap);
  }, [kakao, cur_longitude, cur_latitude]);

  return (
    <Wrap>
      <Header></Header>
      <MapWrap id="map" ref={mapRef}></MapWrap>
      <CompleteBTN onClick={()=>{navigate('/iprequest')}}>완료</CompleteBTN>
      <Footer></Footer>
    </Wrap>
  )
}

const CompleteBTN = styled.button`
  position: absolute;
  bottom: 5rem;
  z-index: 3;
  background-color: #ffea7e;
  width: 50%;
  left: 25%;
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;;
  }
  height: 3rem;
  border: 1px solid #000;
  border-radius: 1rem;
  font-size: 1.5rem;
` 

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
` 

const MapWrap = styled.div`
  width: 100%;
  height: calc(100% - 6.2rem);
`

export default IpMap;
