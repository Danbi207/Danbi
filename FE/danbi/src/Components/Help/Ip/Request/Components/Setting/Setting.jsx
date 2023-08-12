import React from 'react'
import { useCallback } from 'react';
import styled from 'styled-components';
const Setting = ({setContent,setPosition,setTap,dest,meet,setHelpType,helpType,setFaceType,faceType}) => {
  const setCurPosition = useCallback(()=>{
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((e)=>{
        setPosition(e);
      });
    }else{
      setPosition({coords:{latitude:36.1071233,longitude:128.216481}})
    }
  },[setPosition]);
  return (
    <Wrap>
      <Title>대면/비대면</Title>
      <div>
        <FaceTypeBtn $on={faceType==="contact"} onClick={()=>setFaceType("contact")}>대면</FaceTypeBtn>
        <FaceTypeBtn $on={faceType==="untact"} onClick={()=>setFaceType("untact")}>비대면</FaceTypeBtn>
      </div>
      <Title>도움 유형</Title>
      <div>
        <FaceTypeBtn $on={helpType==="move"} onClick={()=>setHelpType("move")}>이동</FaceTypeBtn>
        <FaceTypeBtn $on={helpType==="ETC"} onClick={()=>setHelpType("ETC")}>기타</FaceTypeBtn>
      </div>
      <Title>만나는 장소</Title>
      <Input onClick={()=>{setCurPosition();setTap("meet");}}>{meet?meet.meetAddress:"만나는 곳을 입력해 주세요"}</Input>
      {
        helpType === "move" ? <><Title>목적지</Title>
        <Input onClick={()=>{setCurPosition();setTap("dest");}}>{dest?dest.destAddress:"목적지를 입력해 주세요"}</Input></> : null
      }
      <Title>도움 상세정보</Title>
      <Content onChange={e=>setContent(e.target.value)} placeholder='다음과 같은 정보를 입력해 주세요.
1. 어떤 도움이 필요한지 적어주세요!
2. 도움을 줄 사람에게 전하고 싶은 말을 적어주세요!'/>
      <Title>주의사항</Title>
    </Wrap>
  )
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
  &>*{
    flex: 0 0 auto;
  }
  &>:nth-child(2){
    display: flex;
    justify-content: space-evenly;
    height: 10rem;
    padding: 0.5rem 0;
  }
  &>:nth-child(4){
    display: flex;
    justify-content: space-evenly;
    height: 10rem;
    padding: 0.5rem 0;
  }
`
const Content = styled.textarea`
  border-radius: 0.5rem;
  border: 1px solid #E3E3E3;
  padding: 1rem;
  resize: none;
  font-size: 10px;
  width: 100%;
  height: 5rem;
  margin: 0.5rem 0;
`
const Input = styled.div`
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: #FFF;
  color:#000;
  border: 1px solid #E3E3E3;
  text-align: center;
  cursor: pointer;
`

const FaceTypeBtn = styled.div`
  border-radius: 0.5rem;
  font-size: 2rem;
  width: 8rem;
  height: 8rem;
  text-align: center;
  line-height: 8rem;
  background-color: ${props=>props.$on ? props.theme.colors.buttonbgColor:"#E3E3E3"};
  transform: ${props=>props.$on ? "scale(1.1)" : "scale(1)"};
  transition: 0.5s;
  &:hover{
    background-color: ${props=>props.theme.colors.buttonbgColor};
    color: ${props=> props.theme.colors.buttontextColor};
    transform: scale(1.1);
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  & > *{
    flex: 0 0 auto;
  }
`

export default Setting