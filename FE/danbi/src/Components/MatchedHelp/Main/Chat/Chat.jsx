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
            <span>{chatList[i].content}</span><span>{chatList[i].time}</span>
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
        <div>
          <VideoTitle>도와주는 사람</VideoTitle>
          <Video></Video>
        </div>
        <div>
          <VideoTitle>나</VideoTitle>
          <Video></Video>
          <ControlBtnWrap>
            <button>화면끄기</button>
            <button>음소거</button>
          </ControlBtnWrap>
        </div>
      </VideoWrap>
      <ChatWrap>
        {
          GetChatItems
        }
      </ChatWrap>
    </Wrap>
  )
}
const ServerChat = styled.div`
  width: 100%;
  padding: 0 1rem;
  background-color: rgba(0,0,0,0.4);
  color: #fff;
`
const LeftChatWrap = styled.div`
  display : flex;
`

const RightChatWrap = styled.div`
  display : flex;
  justify-content: flex-end;
`

const ControlBtnWrap = styled.div`
  height: 1rem;
  display: flex;
  gap: 1rem;
`
const VideoTitle = styled.div`
  width: 100%;
  height: 1rem;
  text-align: center;
`
const Video = styled.div`
  width: 15rem;
  height: 15rem;
  @media screen and (max-width: 500px) {
    width: 10rem;
    height: 10rem;
  }
  background-color: #000;
`

const VideoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  @media screen and (max-width: 500px) {
    height: 17rem;
  }
  padding: 1rem;
  &>div{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 1rem;
  }
`

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  @media screen and (max-width: 500px) {
    height: calc(100% - 17rem);
  }
  overflow-y: auto;
  flex-wrap: nowrap;
  &>div{
    flex: 0 0 auto;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`
export default Chat