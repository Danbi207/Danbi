import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterWrap>
      <Link to=''><img src="assets/friend-black1" alt="" /></Link>
      <div>안녕</div>
    </FooterWrap> 
  )
}
const FooterWrap = styled.div`
    width: 100%;
    height: 4rem;
    position: fixed;
    bottom: 0;
    background-color: black;
`



export default Footer