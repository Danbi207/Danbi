import React from 'react'
import { useMemo } from 'react';
import styled from 'styled-components';
const Chat = () => {
  const myName = "김철수"
  const GetChatItems = useMemo(()=>{
    const chatList = [
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 퇴장하셨습니다."
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 퇴장하셨습니다."
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 퇴장하셨습니다."
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 퇴장하셨습니다."
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 퇴장하셨습니다."
      },
      {
        "sender" : "$server",
        "time" : "12:00",
        "content" : "신짱구 님이 입장하셨습니다"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "신짱구",
        "time" : "12:00",
        "content" : "안녕하세요"
      },
      {
        "sender" : "김철수",
        "time" : "12:01",
        "content" : "안녕하세요"
      },
      {
        "sender" : "$server",
        "time" : "12:10",
        "content" : "신짱구 님이 퇴장하셨습니다"
      },
    ];
    const res = [];
    for(let i = 0; i < chatList.length; i++){
      switch(chatList[i].sender){
        case "$server":
          res.push(<ServerChat key={i}>{chatList[i].content}</ServerChat>);
          break;
        case myName:
          res.push(
          <RightChatWrap key={i}>
            <span>{chatList[i].time}</span><span>{chatList[i].content}</span>
          </RightChatWrap>);
          break;
        default:
          res.push(
          <LeftChatWrap key={i}>
            <span>{chatList[i].content}</span><span>{chatList[i].time}</span>
          </LeftChatWrap>);
          break;
      }
    }
    return res;
  },[]);
  return (
    <Wrap>
      <VideoWrap>
        <VideoSubWrap>
          <VideoTitle>도와주는 사람</VideoTitle>
          <Video></Video>
          <ControlBtnWrap></ControlBtnWrap>
        </VideoSubWrap>
        <VideoSubWrap>
          <VideoTitle>나</VideoTitle>
          <Video></Video>
          <ControlBtnWrap>
            <ControlBtn><img src={`${process.env.PUBLIC_URL}/assets/videocam_FILL1_wght400_GRAD0_opsz48 1.svg`} />화면끄기</ControlBtn>
            <ControlBtn><img src={`${process.env.PUBLIC_URL}/assets/volume_up_FILL1_wght400_GRAD0_opsz48 1.svg`} />음소거</ControlBtn>
          </ControlBtnWrap>
        </VideoSubWrap>
      </VideoWrap>
      <ChatWrap>
        <ChatItems>
          {
            GetChatItems
          }
        </ChatItems>
        <div>
          <ChatInput></ChatInput>
          <ChatBtn></ChatBtn>
        </div>
      </ChatWrap>
    </Wrap>
  )
}
const ChatBtn = styled.button`
  background-image: url(${props=>props.theme.images.send});
  width: 1rem;
  height: 1rem;
`
const ChatInput = styled.input`
  width: calc(100% - 1.5rem);
  margin-right: 1rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props=>props.theme.colors.titleColor};
  color : ${props=>props.theme.colors.titleColor};
`

const ServerChat = styled.div`
  width: 80%;
  margin-left: 10%;
  border-radius: 1rem;
  text-align: center;
  padding: 0 1rem;
  background-color: #575757;
  color: #fff;
`
const LeftChatWrap = styled.div`
  display : flex;
  &>:first-child{
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: #FFEA7E;
    color: #000;
  }
`

const RightChatWrap = styled.div`
  display : flex;
  justify-content: flex-end;
  &>:last-child{
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: #D9D9D9;
    color: #000;
  }
`
const ControlBtn = styled.button`
  padding: 0 0.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: #FFEA7E;
  color: #000;
  &>img{
    vertical-align: middle;
  }
`
const ControlBtnWrap = styled.div`
  width: 100%;
  height: 1.5rem;
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`
const VideoTitle = styled.div`
  width: 100%;
  height: 1rem;
  text-align: center;
`
const Video = styled.video`
  width: 95%;
  height: 100%;
  @media screen and (max-width: 500px) {
    width: 160px;
    height: 160px;
  }
  background-color: #000;
`
const VideoSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 12rem;
  }
`
const VideoWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-column-gap:0.5rem;
  width: 100%;
  padding: 1rem;
`
const ChatItems = styled.div`
  height: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  gap: 0.5rem;
  &>div{
    flex: 0 0 auto;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
      display: none;
  }
`
const ChatWrap = styled.div`
  padding: 1rem;
  width: 25%;
  height: calc(100% - 3.5rem);
  @media screen and (max-width: 500px) {
    width: 100%;
    height: calc(100% - 16rem);
  }
  &>:last-child{
    margin-top: 1rem;
    width: 100%;
    height: 1rem;
    display: flex;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`
export default Chat