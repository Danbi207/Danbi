import React from 'react'
import styled from 'styled-components';
import HelpListItem from "./HelpListItem";
const HelpList = (props) => {
  return (
    <HelpListWrap>
      <HelpTitle>친구 도움</HelpTitle>
      {props.helpList.filter(e=>e.friend_flag).map(e=><HelpListItem help={e} />)}
      <HR/>
      <HelpTitle>주변 도움</HelpTitle>
      {props.helpList.filter(e=>!e.friend_flag).map(e=><HelpListItem help={e} />)}
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
  margin-top: 3rem;
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