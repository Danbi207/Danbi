import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const HelpMapItemPC = ({help,visible,defaultIdx,curIdx,setCurIdx}) => {
  const navigate = useNavigate();
  return (
    <HelpMapItemWrap $visible={visible==="pc" && defaultIdx===curIdx}>
      <div onClick={()=>setCurIdx(-1)}>X</div>
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
            장소 : {help.position.meetAddr}
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
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
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
  top: 1rem;
  left: -15rem;
  position: absolute;
  width: 30rem;
  height: 19rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 1rem;
  padding: 1rem;
  &>*{
    white-space: nowrap;
  }
  visibility: ${props=>props.$visible ? "visible" : "hidden"};
  &>:first-child{
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    cursor: pointer;
  }
`
export default HelpMapItemPC;