import React from 'react'
import styled from 'styled-components';
const HelpListItem = (props) => {
  return (
    <HelpMapItemWrap detailMode={props.detailMode} >
      <RowWrap>
        <UserWrap>
          <UserProfile src={props.help.ip.profile_url}></UserProfile>
          <UserTitle>
            <UserName>{props.help.ip.name}</UserName>
            <UserPoint>{props.help.ip.accumulate_dew_point}Dew</UserPoint>
          </UserTitle>
          <TimeWrap>
            <div>{props.help.start_time.split(" ")[0]}</div>
            <div>{props.help.start_time.split(" ")[1]}~{props.help.end_time.split(" ")[1]}</div>
          </TimeWrap>
        </UserWrap>
      </RowWrap>
      <HelpContent>{props.help.content}</HelpContent>
      <DetailBtn>상세보기</DetailBtn>
    </HelpMapItemWrap>
  )
}

const UserWrap=styled.div`
  display: flex;
  gap: 1rem;
`
const UserProfile = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
`
const UserTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const UserName = styled.div`
  font-size: 1.5rem;
`
const UserPoint = styled.div``
const TimeWrap = styled.div`
  height: 5rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DetailBtn = styled.button`
  background-color: #6938D3;
  width: 100%;
  height: 3rem;
  color: #fff;
  border-radius: 1rem;
`
const HelpContent = styled.div`
  width: 100%;
  height: 7rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;
  border: 1px solid ${props=>props.theme.colors.titleColor};
`

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const HelpMapItemWrap = styled.div`
  width: 40%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
  height: 19rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 1rem;
  padding: 1rem;
`
export default HelpListItem