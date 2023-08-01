import React, {useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DetailMap = ({position}) => {
    const {kakao} = window;
    const mapRef = useRef();
    const [map,setMap] = useState(null);

    useEffect(()=>{
        const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        }
        setMap(new kakao.maps.Map(mapRef.current, mapOption));
        const positions = [
            {
                title: '목적지',
                latlng: new kakao.maps.LatLang(position.des)
            },
            {
                meet_latitude: '333.3444',
                meet_longitude: '444.119485',
            }
        ];
        for(let i = 0; i < positions.length; i++){
            var marker = new kakao.maps.Marker({
                map: map,
                position: positions
            })
        }
    }, []);

    return(
        <DetailMapWrap>

        </DetailMapWrap>
    );
}

const DetailMapWrap = styled.div`
`

export default DetailMap;