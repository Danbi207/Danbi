import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import {setMode} from "../../../../store/Slice/ModalSlice";
const Stt = () => {
  const mode = useSelector((state)=>state.modal.mode);
  const dispatch = useDispatch();
  const [time,setTime] = useState(5);
  useEffect(()=>{
    //DO : 명령어 입력을 15초동안 받음
    const countdown = setInterval(()=>{
      if(time > 0){
        setTime(time-1);
      }
      if(time === 0){
        clearInterval(countdown);
        dispatch(setMode(null));
      }
    },1000);
    return ()=>clearInterval(countdown);
  },[mode,time,dispatch]);
  useEffect(()=>{
    if(mode==="stt"){
      setTime(15);
    }
  },[mode]);
  return (
    <ModalWrap>
      <Wrap>
        <div onClick={()=>{dispatch(setMode(null))}}>X</div>
        <p>명령어를 말해주세요!</p>
        <div>
          <ImgWrap/>
          <DanbiImg src={`${process.env.PUBLIC_URL}/assets/DanbiImg.svg`} />
        </div>
        <p>{time}초후 입력모드가<br/>종료됩니다</p>
      </Wrap>
    </ModalWrap>
  )
}

const spin = keyframes`
  from {transform: rotate(0deg)};
  to {transform: rotate(360deg)}; 
`

const ImgWrap = styled.div`
  top: calc((100% - 14rem) / 2);
  left: calc((100% - 14rem) / 2);
  width: 14rem;
  height: 14rem;
  border-radius: 14rem;
  border: 0.5rem solid #d6edff;
  border-top: 0.5rem solid #00ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${spin} 0.5s linear infinite;
`

const DanbiImg = styled.img`
  width: 12rem;
  height: 12rem;
  top: calc((100% - 12rem) / 2);
  left: calc((100% - 12rem) / 2);
`

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  &>div:first-child{
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  &>p:nth-child(2){
    font-size: 1.5rem;
  }
  &>div:nth-child(3){
    position: relative;
    width: 100%;
    height: 100%;
    &>*{
      position: absolute;
    }
  }
  &>p:nth-child(4){
    text-align: center;
    font-size: 1.75rem;
  }
`

const ModalWrap = styled.div`
  position: absolute;
  z-index: 6;
  width: 80%;
  left: 10%;
  height: 70%;
  top: 25%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.bgColor};
  color:${props=>props.theme.colors.titleColor};
`;

export default Stt