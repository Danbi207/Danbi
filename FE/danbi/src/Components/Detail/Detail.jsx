import React from 'react'
import { useParams } from 'react-router-dom';
import Header from "../Common/Header/Header.jsx";
import Footer from "../Common/Footer/Footer.jsx";
import styled from 'styled-components';
import HelperDetail from './items/HelperDetail.jsx';
import IPDetail from './items/IPDetail.jsx';

const Detail = () => {
  const { helpPostId } = useParams();
  const { role } = useParams();
  if( role === 'helper'){
    return (
      <DetailWrap>
        <Header></Header>
        <HelperDetail helpPostId={helpPostId} />
        <Footer></Footer>
      </DetailWrap>
    )
  } else if(role === 'IP') {
    return (
      <DetailWrap>
        <Header></Header>
        <IPDetail helpPostId={helpPostId} />
        <Footer></Footer>
      </DetailWrap>
    )
  }
}

const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
`

export default Detail