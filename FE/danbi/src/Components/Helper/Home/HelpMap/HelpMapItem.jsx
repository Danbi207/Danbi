import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled,{keyframes} from 'styled-components';
const HelpMapItem = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {
        props.help?
          <>
            <BackgroundWrap $detailmode={props.detailmode.toString()} onClick={()=>{props.setDetailMode(false)}}></BackgroundWrap>
            <HelpMapItemWrap $detailmode={props.detailmode.toString()} >
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
              <DetailBtn onClick={()=>{navigate(`/detail/${props.help.help_post_id}`)}}>상세보기</DetailBtn>
            </HelpMapItemWrap>
          </>
          :null
      }
    </>
  )
}
const BackgroundWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  display: ${props=>props.$detailmode==="true" ? "block" : "none"};
`

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
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  background-color: #6938D3;
  width: calc(100% - 2rem);
  height: 3rem;
  color: #fff;
  border-radius: 1rem;
`
const HelpContent = styled.div`
  width: 100%;
  height: 7rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;
  border: 1px solid #000;
`

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
`
const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }

  to {
    transform: translateY(100%);
    opacity: 1;
  }
`;

const HelpMapItemWrap = styled.div`
  width: 100%;
  height: 20rem;
  position: absolute;
  bottom: 0;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  z-index: 4;
  border: 1px solid #b1b1b1;
  border-radius: 1rem 1rem 0 0 ;
  padding: 1rem;

  visibility: ${props => props.$detailmode==="true" ? 'visible' : 'hidden'};
  animation: ${props => props.$detailmode==="true" ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
`
export default HelpMapItem