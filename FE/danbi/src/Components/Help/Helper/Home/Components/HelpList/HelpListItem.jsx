import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const HelpListItem = (props) => {
  const navigate = useNavigate();
  return (
    <HelpMapItemWrap detailMode={props.detailMode} >
      <RowWrap>
        <UserWrap>
          <div>
            <UserProfile src={props.help.profileUrl}></UserProfile>
            <UserTitle>
              <div>{props.help.name}</div>
              {
                props.help.accuseStack === 0 ? null:
                props.help.accuseStack <= 2 ? <img src={`${process.env.PUBLIC_URL}/assets/yellow-flag.svg`} /> :
                <img src={`${process.env.PUBLIC_URL}/assets/red-flag.svg`} />
              }
            </UserTitle>
          </div>
          <TimeWrap>
            날짜 : {props.help.startTime.split(" ")[0]}<br/>
            시간 : {props.help.startTime.split(" ")[1]}~{props.help.endTime.split(" ")[1]}<br/>
            {props.help.position ? `장소 : ${props.help.position.meetAddr}` : ""}
          </TimeWrap>
        </UserWrap>
      </RowWrap>
      <HelpContent>{props.help.content}</HelpContent>
      <DetailBtn onClick={()=>{navigate(`/help/helper/detail/${props.help.helpPostId}`)}}>상세보기</DetailBtn>
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
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  height: 19rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 1rem;
  padding: 1rem;
  &>*{
    white-space: nowrap;
  }
`
export default HelpListItem