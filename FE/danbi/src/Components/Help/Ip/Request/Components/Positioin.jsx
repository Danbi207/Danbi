import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { setCategory, setCurLatitude, setCurLongitude } from '../../../../../store/Slice/ipSlice'

const Positioin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector(state => state.ip.category);
  const position = useSelector(state => state.ip.position);
  const [geoPosition, setGeoPosition] = useState(null);

  const handleCategory = (e) => {
    console.log(e.target.value);
    dispatch(setCategory(e.target.value));
  };

  const mvIpMap = (mode) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(geoPosition) {
        setGeoPosition(geoPosition);
        dispatch(setCurLatitude(geoPosition.coords.latitude));
        dispatch(setCurLongitude(geoPosition.coords.longitude));
        console.log(geoPosition)
        console.log(geoPosition.coords.latitude)
        console.log(geoPosition.coords.longitude)
        
      }, function(err) {
        alert('위치 동의가 필요합니다.');
        console.log(err);
      }, {
        enableHighAccuracy : false,
        maximuAge : 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다.')
    };
    navigate(`/ipmap/${mode}` )
  }
  
  return (
    <Wrap>
      <CategorySelect value={category} onChange={handleCategory}>
        <CategoryOption value='NONE' disabled>카테고리를 선택하세요</CategoryOption>
        <CategoryOption value='MOBILE'>이동</CategoryOption>
        <CategoryOption value='ETC'>기타</CategoryOption>
      </CategorySelect>
      <Destination type='text' readOnly placeholder='만나는 곳을 입력하세요' 
        value={position.meet_addr} onClick={()=>{mvIpMap(0)}}/>
      {category === 'MOBILE' && (
        <Destination type='text' readOnly placeholder='목적지를 입력하세요' 
        value={position.dest_addr} onClick={()=>{mvIpMap(1)}}/>
      )}
    </Wrap>
  );
};

const Wrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex-direction: column;
`

const CategorySelect = styled.select`
  width: 70%;
  height: 2rem;
  border: 1px solid black;
  /* background-color: #D9D9D9; */
`

const CategoryOption = styled.option`
  width: 70%;
  height: 2rem;
`

const Destination = styled.input`
    width: 70%;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid black;
`

export default Positioin;