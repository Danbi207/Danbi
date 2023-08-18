import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const HelpListItem = ({help}) => {
  const navigate = useNavigate();
  return (
    <HelpMapItemWrap>
      <RowWrap>
        <UserWrap>
          <div>
            <UserProfile src={help.profileUrl}></UserProfile>
            <UserTitle>
              <div onClick={()=>navigate(`/user/profile/${help.ipId}`)}>{help.name}</div>
              {
                help.accuseStack === 0 ? null:
                help.accuseStack <= 2 ? <img alt='' src={`${process.env.PUBLIC_URL}/assets/yellow-flag.svg`} /> :
                <img alt='' src={`${process.env.PUBLIC_URL}/assets/red-flag.svg`} />
              }
            </UserTitle>
          </div>
          <TimeWrap>
            날짜 : {help.startTime.split(" ")[0]}<br/>
            시간 : {help.startTime.split(" ")[1]}~{help.endTime.split(" ")[1]}<br/>
            {help.position ? `장소 : ${help.position.meetAddr}` : ""}
          </TimeWrap>
        </UserWrap>
      </RowWrap>
      <HelpContent>{help.content}</HelpContent>
      <DetailBtn onClick={()=>{navigate(`/help/helper/detail/${help.helpPostId}`)}}>상세보기</DetailBtn>
    </HelpMapItemWrap>
  )
}

const UserWrap=styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &>:first-child{
    height: 100%;
    display: flex;
  }
`
const UserProfile = styled.img`
  margin: auto 0;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
`
const UserTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 5rem;
  &>:first-child{
    font-size: 1.5rem;
    cursor: pointer;
  }
`
const TimeWrap = styled.div`
  padding: 0.5rem;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid ${props=>props.theme.colors.titleColor};
  overflow-y: hidden;
  white-space: pre-wrap;
  font-size: 0.8rem;
`


const DetailBtn = styled.button`
  background-color: #FFEA7E;
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
`
const HelpContent = styled.div`
  white-space: pre-wrap;
  width: 100%;
  height: 7rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;
  color: #000;
  border: 1px solid ${props=>props.theme.colors.titleColor};
`

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const HelpMapItemWrap = styled.div`
  width: 90%;
  height: 19rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 1rem;
  padding: 1rem;
`
export default HelpListItem