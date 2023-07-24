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

`

export default HelperHome