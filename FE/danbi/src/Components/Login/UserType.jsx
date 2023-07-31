import React  from 'react'
import styled from 'styled-components';

const UserType = (props) => {
  return (
    <SelectWrap>
        <TypesSelect>
            <Question>서비스 유형을 선택하세요</Question>
            <Boxes>
              <SelectBTN $default='helper' $select={props.usertype} onClick={()=>{props.setUserType('helper')}}>도움 주기</SelectBTN>
              <SelectBTN $default='ip' $select={props.usertype} onClick={()=>{props.setUserType('ip')}}>도움 받기</SelectBTN>
            </Boxes>
        </TypesSelect>
        <TypesSelect>
            <Question>성별을 선택하세요</Question>
            <Boxes>
                <SelectBTN $default='male' $select={props.sex} onClick={()=>{props.setSex('male')}}>남</SelectBTN>
                <SelectBTN $default='female' $select={props.sex} onClick={()=>{props.setSex('female')}}>여</SelectBTN>
            </Boxes>
        </TypesSelect>
        <NextBTN onClick={()=>{props.setMode(false);}}>다음</NextBTN>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
    width: 40%;
    height: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
  }
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

const SelectBTN = styled.button`
    width: 9.4rem;
    height: 9.4rem;
    border-radius: 0.75rem;
    font-size: 2.3rem;
    background-color: ${props=> props.$default === props.$select ? '#8383FF' : '#E3E3E3'};
    color : ${props=> props.$default === props.$select ? '#fff' : '#000'};
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

const NextBTN  = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 1rem;
  width: 30rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: #6161FF;
  color: #fff;
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 3rem;
    left : calc(( 100% - 20rem )/2);
  }
`

export default UserType;