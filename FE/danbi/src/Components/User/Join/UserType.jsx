import React, { useState, useCallback }  from 'react'
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
        localStorage.setItem('role', 'helper')
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
              <SelectBTN $default='ROLE_HELPER' $select={role} onClick={()=>{
                setRole('ROLE_HELPER'); setExplainMode('ROLE_HELPER');}}>
                <p>도움을</p><p>줄래요</p>
              </SelectBTN>
              { explainmode === 'ROLE_HELPER' ? <TextWrap>장애인분들에게 대면 / 비대면으로 <p>도움을 제공해요</p></TextWrap> : null }
              <SelectBTN $default='ROLE_UNSUBMIT_IP' $select={role} onClick={()=>{
                setRole('ROLE_UNSUBMIT_IP'); setExplainMode('ROLE_UNSUBMIT_IP')}}>
                <p>도움을</p><p>받을래요</p>
              </SelectBTN>
              { explainmode === 'ROLE_UNSUBMIT_IP' ? <TextWrap>대면 / 비대면으로 <p>이동과 기타 도움을 받아요</p></TextWrap> : null }
            </Boxes>
            <div>
              <NextBTN onClick={()=>{PutRole()}}>다음</NextBTN>
            </div>
        </TypesSelect>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar { 
    display: none;
	  }
`

const TypesSelect = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Question = styled.div`
  font-size: 1.8rem;
  text-align: center;
  color : ${props=>props.theme.colors.titleColor};
  margin-top: 3rem;
`

const Boxes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
  @media screen and (max-height : 680px) {
    margin-top: 2rem;
  }
`

const SelectBTN = styled.button`
  width: 16rem;
  height: 16rem;
  border-radius: 0.75rem;
  font-size: 2.3rem;
  background-color: ${props=> props.$default === props.$select 
    ? props.theme.colors.buttonbgColor
    : props.theme.colors.boxColor};
  transition: 0.5s;
  @media screen and (max-height : 680px) {
    width: 14rem;
    height: 14rem;
  }

  &:hover {
      background-color: ${props=>props.theme.colors.buttonbgColor};
      color: ${props=>props.theme.colors.buttontextColor};
      /* transform: scale(1.05);s */
      transition: 0.5s;
  }
  &>p {
    font-size: 2.3rem;
    padding-top: 0.5rem;
  }
` 

const TextWrap = styled.div`
  width: 100%;
  text-align : start;
  padding-left: 12%;
  font-size: 1.1rem;
  color : ${props=>props.theme.colors.titleColor};
  @media screen and (max-height : 680px) {
    margin-top: 2rem;
  }

  &>p{
    font-size: 1.1rem;
    text-align: end;
    padding-right: 12%;
    color : ${props=>props.theme.colors.titleColor};
  }
  @media screen and (max-height : 680px) {
    margin-bottom: 2rem;
  }

` 

const NextBTN  = styled.button`
  width: 20rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: ${props => props.theme.colors.buttonbgColor};
  color: ${props => props.theme.colors.buttontextColor};
  font-size : 2rem;
  margin-bottom: 2rem;
  @media screen and (max-height : 680px) {
    margin-top: 2rem;
  }
`

export default UserType;