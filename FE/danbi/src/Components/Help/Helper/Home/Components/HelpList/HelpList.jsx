import React from 'react'
import styled from 'styled-components';
import HelpListItem from "./HelpListItem";
import { useEffect } from 'react';
import { useState } from 'react';
const HelpList = ({helpList}) => {
  const [friends,setFriends] = useState([]);
  const [helps,setHelps] = useState([]);

  useEffect(()=>{
    let keyIdx = 0;
    setFriends(helpList.filter(e=>e.friendFlag).map(e=><HelpListItem key={keyIdx++} help={e} />));
    setHelps(helpList.filter(e=>!e.friendFlag).map(e=><HelpListItem key={keyIdx++} help={e} />));
  },[helpList]);

  return (
    <HelpListWrap>
      <HelpTitle>친구 도움</HelpTitle>
      {friends}
      <HR/>
      <HelpTitle>주변 도움</HelpTitle>
      {helps}
    </HelpListWrap>
  )
}
const HR = styled.div`
  width: 90%;
  height: 1px;
  background-color: #D5CECE;
`
const HelpListWrap = styled.div`
  height: 100%;
  margin-bottom : 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  overflow-y: auto;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  }

  & > *{
    flex : 0 0 auto;
    margin: 0.5rem 0;
  }
`

const HelpTitle = styled.div`
  height: 1.5rem;
  font-size: 1.5rem;
`
export default HelpList