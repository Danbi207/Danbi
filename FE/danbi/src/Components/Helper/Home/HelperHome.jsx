import React, { useState } from 'react'
import styled from 'styled-components';
import Header from "../../Common/Header/Header.jsx"
import Footer from "../../Common/Footer/Footer.jsx"
import HelpList from "./HelpList/HelpList.jsx"
import HelpMap from "./HelpMap/HelpMap.jsx"
const HelperHome = () => {
  const [mode,setMode] = useState(true);
  return (
    <HelperHomeWrap>
      <Header></Header>
      <ModeToggleWrap>
        &nbsp;지도&nbsp;
        <ModeSwitch>
          <input type="checkbox" onChange={()=>setMode(!mode)} />
          <ModeSlider></ModeSlider>
        </ModeSwitch>
        &nbsp;리스트&nbsp;
      </ModeToggleWrap>
      {
        mode ? <HelpMap mode={mode} setMode={setMode} /> : <HelpList mode={mode} setMode={setMode} />
      }
      <Footer></Footer>
    </HelperHomeWrap>
  )
}

const HelperHomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`
const ModeToggleWrap = styled.div`
  display: flex;
  position: absolute;
  top: 2.8rem;
  right: 0;
  color: #fff;
  background-color: rgba(0,0,0,0.4);
  width: 12rem;
  height: 3rem;
  padding-top: 0.5rem;
  line-height: 2.5rem;
  justify-content: center;
  z-index: 2;
`
const ModeSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 2rem;
  &>input{
    opacity: 0;
    width: 0;
    height: 0;
  }
  &>input:checked+span:before{
    -webkit-transform: translateX(2.5rem);
    -ms-transform: translateX(2.5rem);
    transform: translateX(2.5rem);
  }
`
const ModeSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6938D3;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 1rem;
  &::before{
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1.5rem;
    left: 0.5rem;
    bottom: 0.25rem;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
`
export default HelperHome