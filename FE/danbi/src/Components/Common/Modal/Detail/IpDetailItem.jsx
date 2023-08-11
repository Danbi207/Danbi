import React, { useCallback } from 'react'
import styled from 'styled-components';
import { authDelete } from '../../../../Util/apis/api';
import { useDispatch } from 'react-redux';
import { deleteIpRequest, setMode } from '../../../../store/Slice/ModalSlice';
import { useNavigate } from 'react-router-dom';



const IpDetailItem = ({data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const goToDetail = () => {
    dispatch(setMode(""))
    navigate('/help/ip/request', {state : { helpPostId : data.helpPostId }})
  }

  const stateMessages = (state) => {
    const message = {
      "ACTIVATE" : "매칭 전",
      "MATCHED" : "도움매칭 완료",
      "COMPLETED" : "도움 완료"
    };
    return message[state]
  } 

  const handleDelete =  useCallback(async ()=>{
    try{
      await authDelete(`/api/v1/help/${data.helpPostId}`, {});
      dispatch(deleteIpRequest(data.helpPostId));
    }
    catch(err) {
      console.log(err)
    }
  },[data, dispatch]) 

  return (
    <HelpItemWrap>
      <TitleWrap>도움 정보</TitleWrap>
      <ItemWrap>
        <Item>매칭 여부 : {stateMessages(data.state)}</Item>
        <Item>시작 시간 : {data.startTime}</Item>
        <Item>끝나는 시간 : {data.endTime}</Item>    
      </ItemWrap>
      <TitleWrap>상세 내용</TitleWrap>
      <DetailItemWrap>
        <Item>{data.content}</Item>
      </DetailItemWrap>
      <BTNWrap>
        <DetailBTN onClick={goToDetail}>상세보기</DetailBTN>
        <DeleteBTN onClick={handleDelete}>삭제</DeleteBTN>
      </BTNWrap>
    </HelpItemWrap>
  )
}

const HelpItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 0.5rem;
` 

const TitleWrap = styled.div`
  font-size : 1rem;
  margin : 0.5rem;
  align-self : flex-start;
` 

const ItemWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
`

const Item = styled.div`
  font-size: 0.8rem;
  margin-left: 1rem;
` 

const DetailItemWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
`

const BTNWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 0;
`

const DetailBTN = styled.button`
  width: 45%;
  height: 2rem;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  border-radius: 10px;
`

const DeleteBTN = styled.button`
  width: 45%;
  height: 2rem;
  background-color: #E85151;
  color: #fff;
  border-radius: 10px
`



export default IpDetailItem