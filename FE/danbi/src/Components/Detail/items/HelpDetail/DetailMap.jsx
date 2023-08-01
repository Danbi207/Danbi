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
        const position = [
            {
                dest_latitude: '111.3444',
                dest_longitude: '222.119485',
            },
            {
                meet_latitude: '333.3444',
                meet_longitude: '444.119485',
            }
        ];
    }, [])


    return(
        <DetailMapWrap>

        </DetailMapWrap>
    );
}

const DetailMapWrap = styled.div`
`

export default DetailMap;