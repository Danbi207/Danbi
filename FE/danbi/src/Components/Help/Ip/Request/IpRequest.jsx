import React from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
import FaceType from './Components/FaceType/FaceType';
import TimeTpye from './Components/Timetype/TimeTpye';
import Tab from './Components/Tab/Tab';
import { useEffect } from 'react';

const IpRequest = () => {
  const location = useLocation();
  const helpPostId = location.state?.helpPostId;

  const ip = useSelector((state)=>state.ip)
  console.log(location)

  useEffect(()=>{
    
  },[helpPostId])

  return (
    <RequestWrap>
      <Header></Header>
      <Tab></Tab>
      <Wrap>
        { ip.tabmode === 'meet' ? <FaceType helpPostId={helpPostId}/> : <TimeTpye helpPostId={helpPostId}/>}        
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