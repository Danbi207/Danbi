import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled,{keyframes} from 'styled-components';
const HelpMapItemMobile = ({visible,setVisible,curHelp}) => {
  const navigate = useNavigate();

  return (
    <>
      {
        curHelp?
          <>
            <BackgroundWrap $visible={visible==="mobile"} onClick={()=>{setVisible("none")}}></BackgroundWrap>
            <HelpMapItemWrap $visible={visible==="mobile"} >
              <RowWrap>
                <UserWrap>
                  <div>
                    <UserProfile src={curHelp.profileUrl}></UserProfile>
                    <UserTitle>
                      <div onClick={()=>navigate(`/user/profile/${curHelp.ipId}`)}>{curHelp.name}</div>
                      {
                        curHelp.accuseStack === 0 ? null:
                        curHelp.accuseStack <= 2 ? <img alt='' src={`${process.env.PUBLIC_URL}/assets/yellow-flag.svg`} /> :
                        <img alt='' src={`${process.env.PUBLIC_URL}/assets/red-flag.svg`} />
                      }
                    </UserTitle>
                  </div>
                  <TimeWrap>
                    날짜 : {curHelp.startTime.split(" ")[0]}<br/>
                    시간 : {curHelp.startTime.split(" ")[1]}~{curHelp.endTime.split(" ")[1]}<br/>
                    장소 : {curHelp.position.meetAddr}
                  </TimeWrap>
                </UserWrap>
              </RowWrap>
              <HelpContent>{curHelp.content}</HelpContent>
              <DetailBtn onClick={()=>{navigate(`/help/helper/detail/${curHelp.helpPostId}`)}}>상세보기</DetailBtn>
            </HelpMapItemWrap>
          </>
          :null
      }
    </>
  )
}
const BackgroundWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgba(0,0,0,0.4);
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
`

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
  border: 1px solid #000;
  overflow-y: hidden;
  white-space: pre-wrap;
`


const DetailBtn = styled.button`
  background-color: #6938D3;
  width: 100%;
  height: 3rem;
  color: #fff;
  border-radius: 1rem;
  font-size: 1.5rem;
`
const HelpContent = styled.div`
  width: 100%;
  height: 7rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;
  border: 1px solid ${props=>props.theme.colors.titleColor};
  white-space: pre-wrap;
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
  z-index: 2;
  border-radius: 1rem 1rem 0 0 ;
  padding: 1rem;

  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  animation: ${props => props.$visible ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
`
export default HelpMapItemMobile