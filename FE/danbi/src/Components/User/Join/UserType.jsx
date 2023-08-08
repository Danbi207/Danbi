import React, { useState }  from 'react'
import { useCallback } from 'react';
import styled from 'styled-components';
import { authPost, reissueAccessToken } from '../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';

const UserType = ({ usertype, setUserType}) => {
  const [explainmode, setExplainMode] = useState('');
  const [role, setRole] = useState(usertype)
  const navigate = useNavigate();

  const PutRole = useCallback(async () => {
    try {
      await authPost('/api/v1/member/role', {"role" : role});
      await reissueAccessToken();
      if (role === 'ROLE_HELPER'){
        localStorage.setItem('helper')
        navigate('/help/helper')
        return;
      }

      if (role === "ROLE_UNSUBMIT_IP"){
        localStorage.setItem('role', role);  
        setUserType(role)
        return;
      }
    } catch (error) {
        console.error("에러 발생:", error);
    }
  }, [role,setUserType,navigate]);
    
  return (
    <SelectWrap>
        <TypesSelect>
            <Question>서비스 유형을 선택하세요</Question>
            <Boxes>
              <SelectBTN $default='helper' $select={role} onClick={()=>{
                setRole('ROLE_HELPER'); setExplainMode('ROLE_HELPER');}}>
                <p>도움을</p><p>줄래요</p>
              </SelectBTN>
              { explainmode === 'ROLE_HELPER' ? <TextWrap>장애인분들에게 대면 / 비대면으로 도움을 제공해요</TextWrap> : null }
              <SelectBTN $default='ip' $select={role} onClick={()=>{
                setRole('ROLE_UNSUBMIT_IP'); setExplainMode('ROLE_UNSUBMIT_IP')}}>
                <p>도움을</p><p>받을래요</p>
              </SelectBTN>
              { explainmode === 'ROLE_UNSUBMIT_IP' ? <TextWrap>대면 / 비대면으로 이동과 기타 도움을 받아요</TextWrap> : null }
            </Boxes>
          <NextBTN onClick={()=>{PutRole()}}>다음</NextBTN>
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