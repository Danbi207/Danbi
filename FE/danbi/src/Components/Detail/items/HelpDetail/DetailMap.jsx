import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DetailMap = ({ position }) => {
  console.log(position);
  const { kakao } = window;
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // 카카오 맵 생성
  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(position.latitude, position.longitude),
      level: 5,
    };
    setMap(new kakao.maps.Map(mapRef.current, mapOption));
  }, [mapRef, kakao]);

  // 맵 위에 목적지 및 만나는 곳 마커 찍기
  useEffect(() => {
    const positions = [
      {
        latitude: position.dest_latitude,
        longitude: position.dest_longitude,
      },
      {
        latitude: position.meet_latitude,
        longitude: position.meet_longitude,
      },
    ];
    for (let i = 0; i < positions.length; i++) {
      const markerPosition = new kakao.maps.LatLng(
        positions[i].latitude,
        positions[i].longitude
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [map]);

  return (
    <>
      <MapWrap ref={mapRef}></MapWrap>;
    </>
  );
};

const MapWrap = styled.div`
  width: 100%;
  height: 8rem;
`;

export default DetailMap;
