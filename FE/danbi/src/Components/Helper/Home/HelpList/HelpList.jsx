import React from 'react'
import styled from 'styled-components';
import HelpListItem from "./HelpListItem";
import { useEffect } from 'react';
import { useState } from 'react';
const HelpList = (props) => {
  const [friends,setFriends] = useState([]);
  const [helps,setHelps] = useState([]);

  useEffect(()=>{
    setFriends(props.helpList.filter(e=>e.friend_flag).map(e=><HelpListItem key={e.help_post_id} help={e} />));
    setHelps(props.helpList.filter(e=>!e.friend_flag).map(e=><HelpListItem key={e.help_post_id} help={e} />));
  },[props.helpList]);

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
  width: 40%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
  height: 1px;
  background-color: #D5CECE;
`
const HelpListWrap = styled.div`
  height: calc(100% - 3rem);
  margin-top : 3rem;
  margin-bottom : 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  overflow-y: auto;
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