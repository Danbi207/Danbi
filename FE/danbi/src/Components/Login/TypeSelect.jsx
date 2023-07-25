import React  from 'react'
import styled from 'styled-components';

const TypeSelect = () => {

  return (
    <SelectWrap>
        <TypesSelect>
            <Question>성별을 선택하세요</Question>
            <Boxes>
                <SelectButton>남</SelectButton>
                <SelectButton>여</SelectButton>
            </Boxes>
        </TypesSelect>
        <TypesSelect>
            <Question>서비스 유형을 선택하세요</Question>
            <Boxes>
                <SelectButton>도움 주기</SelectButton>
                <SelectButton>도움 받기</SelectButton>
            </Boxes>
        </TypesSelect>
        <NextButton>다음</NextButton>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
    width: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
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

const SelectButton = styled.button`
    width: 9.4rem;
    height: 9.4rem;
    border-radius: 20px;
    font-size: 2.3rem;
    background-color: ${props=>props.theme.colors.boxColor};
    color : black;
    display: flex;
    justify-content : center;
    align-items : center;
    transition: 0.5s;
    &:hover {
        background-color: #8383FF;
        color: white;
        transform: scale(1.1);
        transition: 0.5s;
    }
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

export default TypeSelect;