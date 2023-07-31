import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';


// import StartTime from './Calender/StartTime';
import FaceType from './FaceType';
import TimeTpye from './TimeTpye';
import Tab from './Tab/Tab';


const HelpRequest = () => {
  let [tabmode, setTabMode] = useState('meet');

  let [reservetype, setReserve] = useState('');
  let [meetType, setMeetType] = useState('');

  useEffect(()=>{
    console.log(reservetype);
  },[reservetype])

  return (
    <RequestWrap>
      <Header></Header>
      <Wrap>
        <Tab tabmode={tabmode} setTabMode={setTabMode}></Tab>
        { tabmode === 'meet' ? 
          <FaceType meetType={meetType} setMeetType={setMeetType} setTabMode={setTabMode}/> :
          <TimeTpye reservetype={reservetype} setReserve={setReserve}/>}        
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