import React, { useEffect } from 'react'
import styled from 'styled-components';

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import FaceType from './HelpRequest/FaceType';
import TimeTpye from './HelpRequest/TimeTpye';
import Tab from './Tab/Tab';
import { useSelector } from 'react-redux';


const HelpRequest = () => {
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
  width: 100%;
  height: 100%;
`

const Wrap = styled.div`
`


 


export default HelpRequest;