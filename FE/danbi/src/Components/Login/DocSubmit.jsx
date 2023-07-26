import React from 'react'
import styled from 'styled-components'
import Uploader from './Uploader';

const DocSubmit = () => {
  

  return (
      <>
        <SubmitWrap>
          <Question>서류를 제출해주세요</Question>
          <Uploader></Uploader>
          <NextButton>다음</NextButton>
        </SubmitWrap>
      </>
  );
}

const SubmitWrap = styled.div`
    width: 100%;
    height: 1;
    background-color: ${props=>props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
`
const Question = styled.div`
    font-size: 1.6rem;
    height: 1rem;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 3.5rem;
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