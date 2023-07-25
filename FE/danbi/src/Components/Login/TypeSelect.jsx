import React from 'react'
import styled from 'styled-components';

const TypeSelect = () => {
  return (
    <SelectWrap>
        <TypesSelect>
            <Question>성별을 선택하세요</Question>
            <Boxes>
                <SelectBox>남</SelectBox>
                <SelectBox>여</SelectBox>
            </Boxes>
        </TypesSelect>
        <TypesSelect>
            <Question>서비스 유형을 선택하세요</Question>
            <Boxes>
                <SelectBox>도움 주기</SelectBox>
                <SelectBox>도움 받기</SelectBox>
            </Boxes>
        </TypesSelect>
        <NextButton>다음</NextButton>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
    width: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
    color: ${props=>props.theme.colors.titleColor};
    display: flex;
    flex-direction: column;
`

const TypesSelect = styled.div`
    margin-top: 3rem;
    height: 15rem;
`

const Question = styled.div`
    font-size: 1.6rem;
    height: 1rem;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
`

const Boxes = styled.div`
    height : 12rem;
    display: flex;
    justify-content: space-around;
`

const SelectBox = styled.div`
    width: 9.4rem;
    height: 9.4rem;
    border-radius: 20px;
    font-size: 2.3rem;
    background-color: ${props=>props.theme.colors.boxColor};
    color : ${props=>props.theme.colors.titleColor};
    display: flex;
    justify-content : center;
    align-items : center;
` 

const NextButton  = styled.button`
    width: 20rem;
    height: 3.1rem;
    border-radius: 10px;
    background-color: #6161FF;
    color: ${props=>props.theme.colors.bgColor};
    font-size : 2rem;
    margin: auto auto 3rem auto ;
`

export default TypeSelect;