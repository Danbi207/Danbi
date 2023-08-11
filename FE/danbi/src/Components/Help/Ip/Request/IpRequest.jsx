import React, { useState } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
import FaceType from './Components/FaceType/FaceType';
import TimeTpye from './Components/Timetype/TimeTpye';
import Tab from './Components/Tab/Tab';
import { useEffect } from 'react';
import { authGet } from '../../../../Util/apis/api';

const IpRequest = () => {
  const location = useLocation();
  const helpPostId = location.state?.helpPostId;
  const [helpDetailData, setHelpDetailData] = useState(null);

  const ip = useSelector((state)=>state.ip)

  useEffect(()=>{
    if (helpPostId) {
      const fetchHelpDetail = async () => {
          try {
            const response = await authGet(`/api/v1/help/detail/${helpPostId}`);
              setHelpDetailData(response.data);
          } catch (error) {
            console.error("helpDetail 데이터 못 가져옴", error);
          }};
          fetchHelpDetail();
          console.log(helpDetailData)
      }
    }, [helpPostId, helpDetailData]);

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