import React from 'react'
import styled from 'styled-components'
import Uploader from './Uploader';

const DocSubmit = () => {

  return (
      <>
        <SubmitWrap></SubmitWrap>
        <Uploader></Uploader>
        <NextButton>다음</NextButton>
      </>

  );
  
}

const SubmitWrap = styled.div`
    width: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
`

const NextButton  = styled.button`
    width: 20rem;
    height: 3.1rem;
    border-radius: 10px;
    background-color: #6161FF;
    color: #fff;
    font-size : 2rem;
    margin: 5rem auto 1rem auto ;
`

export default DocSubmit;