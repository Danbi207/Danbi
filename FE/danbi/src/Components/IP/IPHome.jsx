import React, { useState } from "react";
import styled from 'styled-components'

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; //



// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const IPHome = () => {

  return (
    
    <IpHomeWrap>
      <Header/>
      <Calendar></Calendar>
      <RequestBTN>도움 요청하기</RequestBTN>
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

const RequestBTN = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 10rem;
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
  }
`

export default IPHome;