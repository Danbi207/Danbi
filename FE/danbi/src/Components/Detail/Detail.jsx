import React from 'react'
import { useParams } from 'react-router-dom';
import Header from "../Common/Header/Header.jsx";
import Footer from "../Common/Footer/Footer.jsx";
import styled from 'styled-components';
const Detail = () => {
  const { helpPostId } = useParams();
  return (
    <DetailWrap>
      <Header></Header>
      <Footer></Footer>
    </DetailWrap>
  )
}

const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
`

export default Detail