import React, { useEffect } from 'react'
import styled from 'styled-components';

const IpDetailItem = ({data}) => {

  useEffect(()=>{
    console.log(data)
  },[data])


  return (
    <HelpItemWrap>
      <TitleWrap>도움 정보</TitleWrap>
      <ItemWrap>
        <Item>매칭 여부: {data.state}</Item>
        <Item>시작 시간: {data.startTime}</Item>
        <Item>끝나는 시간: {data.endTime}</Item>    
      </ItemWrap>
      <TitleWrap>상세 내용</TitleWrap>
      <DetailItemWrap>
        <Item>{data.content}</Item>
      </DetailItemWrap>
      <DetailBTN onClick={()=>{navigator('/help/ip/request')}}>상세보기</DetailBTN>
      <DeleteBTN onClick={()=>{}}>삭제</DeleteBTN>
    </HelpItemWrap>
    
  )
}

const HelpItemWrap = styled.div`
  position: relative;
  border: 1px solid #000;
  border-radius: 10px;
` 

const TitleWrap = styled.div`
  font-size : 1rem;
  margin : 0.5rem
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

const DetailBTN = styled.button`
  width: 40%;
  height: 2rem;
  background-color: ${props=>props.theme.colors.buttonbgColor};
  border-radius: 10px;
`

const DeleteBTN = styled.button`
  width: 40%;
  height: 2rem;
  background-color: #E85151;
  color: #fff;
  border-radius: 10px
`

export default IpDetailItem