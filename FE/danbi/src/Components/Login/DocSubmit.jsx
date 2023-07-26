import React from 'react'
import styled from 'styled-components'
import Uploader from './Uploader';

const DocSubmit = () => {
  return (
    <SubmitWrap>
      <Question>서류를 제출해주세요</Question>
      <Uploader></Uploader>
      <NextButton>다음</NextButton>
    </SubmitWrap>
  );
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
`
const Question = styled.div`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.5rem;
  text-align: center;
`

const NextButton  = styled.button`
  position: absolute;
  left: calc((100% - 20rem)/2);
  bottom: 1rem;
  width: 20rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: #6161FF;
  color: #fff;
  font-size : 2rem;
`

export default DocSubmit;