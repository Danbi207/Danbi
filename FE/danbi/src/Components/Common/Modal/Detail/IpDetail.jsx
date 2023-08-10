import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import IpDetailItem from './IpDetailItem';
import { useDispatch } from 'react-redux';
import {setMode} from '../../../../store/Slice/ModalSlice'

const IpDetail = (props) => {
  const ipRequestList = useSelector((state)=>state.modal.ipRequestList)
  const [iplist, setIpList] = useState([]);
  const dispatch = useDispatch();

useEffect(() => {
    if (ipRequestList) {
      setIpList(ipRequestList.map((item, index) => <IpDetailItem key={index} data={item}/>));
      console.log(ipRequestList);
    }
    else {
      console.log('iprequest 없음')
    }
  }, [ipRequestList]);

  return (
    <ModalWrap>
      <DetailWrap>
        <CloseBtn onClick={()=>dispatch(setMode(""))}>X</CloseBtn>
        {iplist}
      </DetailWrap>
    </ModalWrap>
  )
}

const ModalWrap = styled.div`
  position: fixed;
  z-index: 6;
  left: 25%;
  width: 50%;
  height: 80%;
  top: 10%;
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;
    height: 75%;
    top: 12.5%;
  }
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
`

const DetailWrap = styled.div`
  position: relative;
  width : 100%;
  height : 100%;
  padding : 1rem 0;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`



export default IpDetail;