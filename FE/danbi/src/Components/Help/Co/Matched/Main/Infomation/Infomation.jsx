import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import Jandi from "../../../../../User/Profile/Jandi/Jandi";
import { authGet } from '../../../../../../Util/apis/api';
const Infomation = ({help}) => {
  const [info,setInfo] = useState();
  const getInfo = useCallback(async()=>{
    try{
      const data = await authGet(`/api/v1/profile/${localStorage.getItem("role")==="ip" ? help.helper.helperId : help.ip.ipId}`);
      if(data){
        setInfo(data);
      }
    }catch(err){
      console.log(err);
    }
  },[help]);
  useEffect(()=>{
    getInfo();
  },[getInfo]);
  return (
    <>
      {
        help?
        <InfomationWrap>
          <Title>도움요청 정보</Title>
            <Container>
              <SubTitle>날짜 및 장소</SubTitle>
              <HelpContent readOnly={true} value={`${help.faceFlag ? "대면\n" : "비대면\n"}날짜 : ${help.startTime.split(" ")[0]}\n시간 : ${help.startTime.split(" ")[1]}~${help.endTime.split(" ")[1]}`}></HelpContent>
              <SubTitle>상세내용</SubTitle>
              <HelpContent readOnly={true} value={help.content}></HelpContent>
              <SubTitle>주의사항</SubTitle>
              <HelpContent readOnly={true} value={help.caution}></HelpContent>
            </Container>
            {
              info?
              <>
                <Title>상대방 정보</Title>
                <Jandi
                  help_log={info.helPLog}
                  setPickModalOpen={()=>{}}
                  item={help.item}
                  userId={localStorage.getItem("role")==="ip" ? help.helper.helperId : help.ip.ipId}
                  dewPoint={info.dewPoint}
                  accumulatePoint={info.accumulatePoint}></Jandi>
              </>
              :null
            }
      </InfomationWrap>
      :null
      }
    </>
  )
}
const SubTitle = styled.div`
  font-size: 1rem;
  margin: 0.5rem 0;
`

const HelpContent = styled.textarea`
  width: 100%;
  height: 5rem;
  border: none;
  resize: none;
  background-color: #FFEA7E;
  border-radius: 1rem;
  padding: 1rem;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
      display: none;
  }
`

const ProfileName = styled.div`
  font-size: 1.5rem;
  
`
const ProfileImg = styled.img`
  margin-top: 0.5rem;
  height: 5rem;
  width: 5rem;
  border-radius: 5rem;
`

const FlexColCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FlexRowCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`
const FlexRow = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`

const Title = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`
const Container = styled.div`
  width: 100%;
  padding: 0 25%;

  @media screen and (max-width: 1080px) {
    padding: 0 15%;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`
const InfomationWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  & div{
    white-space: nowrap;
  }

  display: flex;
  flex-direction: column;
  overflow-y : auto;
  flex-wrap: nowrap;
  &>*{
    flex: 0 0 auto;
  }
`
export default Infomation