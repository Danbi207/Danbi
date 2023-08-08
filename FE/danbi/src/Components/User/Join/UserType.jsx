import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserType = (props) => {
  const [usertype, setUserType] = useState('undifine');
  const [explainmode, setExplainMode] = useState('');
  const navigate = useNavigate();

  return (
    <SelectWrap>
        <TypesSelect>
            <Question>서비스 유형을 선택하세요</Question>
            <Boxes>
              <SelectBTN $default='helper' $select={usertype} onClick={()=>{
                setUserType('helper'); setExplainMode('helper');}}>
                <p>도움을</p><p>줄래요</p>
              </SelectBTN>
              { explainmode === 'helper' ? <TextWrap>장애인분들에게 대면 / 비대면으로 도움을 제공해요</TextWrap> : null }
              <SelectBTN $default='ip' $select={usertype} onClick={()=>{
                setUserType('ip'); setExplainMode('ip')}}>
                <p>도움을</p><p>받을래요</p>
              </SelectBTN>
              { explainmode === 'ip' ? <TextWrap>대면 / 비대면으로 이동과 기타 도움을 받아요</TextWrap> : null }
            </Boxes>
          <NextBTN onClick={()=>{navigate('/userfile')}}>다음</NextBTN>
        </TypesSelect>
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
    margin-top: 5rem;
    height: 15rem;
`

const Question = styled.div`
    font-size: 1.6rem;
    text-align: center;
`

const Boxes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SelectBTN = styled.button`
    width: 13rem;
    height: 13rem;
    border-radius: 0.75rem;
    font-size: 2.3rem;
    background-color: ${props=> props.$default === props.$select 
      ? props.theme.colors.buttonbgColor
      : props.theme.colors.boxColor};
    margin-top: 2rem;
    transition: 0.5s;
    &:hover {
        background-color: ${props=>props.theme.colors.buttonbgColor};
        color: ${props=>props.theme.colors.buttontextColor};
        transform: scale(1.1);
        transition: 0.5s;
    }
    &>p {
      font-size: 2.3rem;
      padding-top: 0.5rem;
    }
` 

const TextWrap = styled.div`
  height: 3rem;
  width: 100%;
  padding-top: 2rem;
  text-align : center;
` 

const NextBTN  = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 1rem;
  width: 30rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: ${props => props.theme.colors.buttonbgColor};
  color: ${props => props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 3rem;
    left : calc(( 100% - 20rem )/2);
  }
`

export default UserType;