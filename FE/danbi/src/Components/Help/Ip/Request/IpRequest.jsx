import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
import FaceType from './Components/FaceType';
import TimeTpye from './Components/TimeTpye';
import Tab from './Components/Tab/Tab';

const IpRequest = () => {
  const ip = useSelector((state)=>state.ip)
  const location = useLocation();
  console.log(location)

  useEffect(()=>{
    console.log(ip.reservetype);
  },[ip.reservetype])

  return (
    <RequestWrap>
      <Header></Header>
      <Tab></Tab>
      <Wrap>
        { ip.tabmode === 'meet' ? <FaceType /> : <TimeTpye location={location} />}        
      </Wrap> 
      <Footer></Footer>
    </RequestWrap>
  )
}  

const RequestWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`

export default IpRequest;