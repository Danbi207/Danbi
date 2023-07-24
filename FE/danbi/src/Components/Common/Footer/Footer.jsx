import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterWrap>
      {/* <Link to='/'><img src='assets/home-filled-black.svg' alt='기다'></img></Link>
      <Link to='/'><img src='assets/home-filled-black.svg' alt='기다'></img></Link>
      <Link to='/'><img src='assets/home-filled-black.svg' alt='기다'></img></Link> */}
      
      <img onClick={()=>{navigate("/") }} src="assets/Friends-black.svg" alt="안나옴" />
      <img onClick={()=>{navigate("/") }} src="assets/home-filled-black.svg" alt="안나옴" />
      <img onClick={()=>{navigate("/") }} src="assets/profile-black.svg" alt="안나옴" />
      

    </FooterWrap> 
  )
}
const FooterWrap = styled.div`
    width: 100%;
    height: 4rem;
    position: fixed;
    bottom: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`



export default Footer