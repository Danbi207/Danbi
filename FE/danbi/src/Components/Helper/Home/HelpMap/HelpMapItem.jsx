import React from 'react'
import styled,{keyframes} from 'styled-components';
const HelpMapItem = (props) => {
  return (
    <>
      {
        props.help?
          <HelpMapItemWrap detailMode={props.detailMode} >
            <RowWrap>
              <UserWrap>
                <UserProfile src={props.help.ip.profile_url}></UserProfile>
                <UserTitle>
                  <UserName>{props.help.ip.name}</UserName>
                  <UserPoint>{props.help.ip.accumulate_dew_point}Dew</UserPoint>
                </UserTitle>
              </UserWrap>
              <TimeWrap>
                <div>{props.help.start_time.split(" ")[0]}</div>
                <div>{props.help.start_time.split(" ")[1]}~{props.help.end_time.split(" ")[1]}</div>
              </TimeWrap>
            </RowWrap>
            <HelpContent readonly value={props.help.content}></HelpContent>
            <DetailBtn>상세보기</DetailBtn>
          </HelpMapItemWrap>
          :null
      }
    </>
  )
}
const UserWrap=styled.div`
  display: flex;
`
const UserProfile = styled.img``
const UserTitle = styled.div`
  display: flex;
  flex-direction: column;
`
const UserName = styled.div``
const UserPoint = styled.div``
const TimeWrap = styled.div``
const DetailBtn = styled.button``
const HelpContent = styled.textarea``

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
    transform: scaleY(1);
    opacity: 0;
  }

  to {
    transform: scaleY(0);
    opacity: 1;
  }
`;

const HelpMapItemWrap = styled.div`
  width: 100%;
  height: 25rem;
  position: absolute;
  bottom: 0;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  z-index: 2;
  border: 1px solid #b1b1b1;
  border-radius: 1rem 1rem 0 0 ;
  padding: 1rem;

  visibility: ${props => props.detailMode ? 'visible' : 'hidden'};
  animation: ${props => props.detailMode ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
`
export default HelpMapItem