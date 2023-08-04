import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import FaceType from './HelpRequest/FaceType';
import TimeTpye from './HelpRequest/TimeTpye';
import Tab from './Tab/Tab';

const IpRequest = () => {
  const ip = useSelector((state)=>state.ip)

  useEffect(()=>{
    console.log(ip.reservetype);
  },[ip.reservetype])

  return (
    <RequestWrap>
      <Header></Header>
      <Wrap>
        <Tab></Tab>
        { ip.tabmode === 'meet' ? <FaceType /> : <TimeTpye />}        
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