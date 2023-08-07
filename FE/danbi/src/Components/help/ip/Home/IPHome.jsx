import React from "react";
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components'

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Calender from "../Calender/Calender";
import Calender3 from "./components/Calender3";

const IPHome = () => {
  const navigate = useNavigate();

  return (
    <IpHomeWrap>
      <Header/>
        <Wrap>
          <Calender/>
          {/* <Calender3></Calender3> */}
        </Wrap>
      <RequestBTN onClick={()=>{navigate('/iprequest')}}>도움 요청하기</RequestBTN>
      <Footer/>
    </IpHomeWrap>
  );
};

const IpHomeWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

const Wrap = styled.div `
  width: 100%;
  height: 50%;;
`

const RequestBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 5rem;
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: #6161FF;
  color: #fff;
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
    left : calc(( 100% - 20rem )/2);
    bottom: 7rem;
  }
`

export default IPHome;