import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Jandi from '../../../../../User/Profile/Jandi/Jandi';
import { authGet, authPost } from '../../../../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';
import AccuseButton from '../../../../../User/Profile/Utils/AccuseButton';
const Infomation = ({ help }) => {
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const accept = useCallback(async () => {
    try {
      const role = localStorage.getItem('role');
      const res = await authPost(`/api/v1/help/success/${role}/${help.helpId}`);
      if (res) {
        navigate(`/help/${role}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const getInfo = useCallback(async () => {
    if (!help) return;
    try {
      const role = localStorage.getItem('role');
      const data = await authGet(
        `/api/v1/profile/${role === 'ip' ? help.helper.helperId : help.ip.ipId}`
      );
      if (data) {
        setInfo(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [help]);
  useEffect(() => {
    getInfo();
  }, [getInfo]);
  return (
    <>
      {help ? (
        <InfomationWrap>
          <Title>도움요청 정보</Title>
          <Container>
            <SubTitle>날짜 및 장소</SubTitle>
            <HelpContent
              readOnly={true}
              value={`${help.faceFlag ? '대면\n' : '비대면\n'}날짜 : ${
                help.startTime.split(' ')[0]
              }\n시간 : ${help.startTime.split(' ')[1]}~${help.endTime.split(' ')[1]}`}
            ></HelpContent>
            <SubTitle>상세내용</SubTitle>
            <HelpContent readOnly={true} value={help.content}></HelpContent>
            <SubTitle>주의사항</SubTitle>
            <HelpContent readOnly={true} value={help.caution}></HelpContent>
          </Container>
          {info ? (
            <>
              <Title>상대방 정보</Title>
              <UserInfoWrap>
                <UserImg src={info.profileUrl}></UserImg>
                <div>
                  <UserTitle>
                    <div
                      onClick={() =>
                        navigate(
                          `/user/profile/${
                            localStorage.getItem('role') === 'ip'
                              ? help.helper.helperId
                              : help.ip.ipId
                          }`
                        )
                      }
                    >
                      {info.name}
                    </div>
                    {help.accusePoint === 0 ? null : help.accusePoint < 2 ? (
                      <img
                        alt=""
                        src={`${process.env.PUBLIC_URL}/assets/yellow-flag.svg`}
                      />
                    ) : (
                      <img alt="" src={`${process.env.PUBLIC_URL}/assets/red-flag.svg`} />
                    )}
                    <AccuseButton
                      targetId={
                        localStorage.getItem('role') === 'ip'
                          ? help.helper.helperId
                          : help.ip.ipId
                      }
                    ></AccuseButton>
                  </UserTitle>
                  <div>{info.accumulatePoint}Dew</div>
                </div>
              </UserInfoWrap>
              <Jandi
                help_log={info.helpLog}
                setPickModalOpen={() => {}}
                item={info.item}
                userId={
                  localStorage.getItem('role') === 'ip'
                    ? help.helper.helperId
                    : help.ip.ipId
                }
                dewPoint={info.dewPoint}
                accumulatePoint={info.accumulatePoint}
              ></Jandi>
              <AcceptBtn onClick={accept}>도움완료</AcceptBtn>
            </>
          ) : null}
        </InfomationWrap>
      ) : null}
    </>
  );
};
const SubTitle = styled.div`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const HelpContent = styled.textarea`
  width: 100%;
  height: 5.5rem;
  border: none;
  resize: none;
  background-color: #ffea7e;
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
`;
const UserInfoWrap = styled.div.attrs((props) => ({
  src: props.$url,
}))`
  width: 100%;
  display: flex;
  & > :last-child {
    display: flex;
    flex-direction: column;
  }
`;

const UserImg = styled.img`
  margin: auto 0;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
`;

const UserTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 7rem;
  & > :first-child {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;
const Container = styled.div`
  width: 100%;
  padding: 0;
`;
const InfomationWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  & div {
    white-space: nowrap;
  }

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  & > * {
    flex: 0 0 auto;
  }
`;

const AcceptBtn = styled.button`
  background-color: #ffea7e;
  margin-left: calc((100% - 20rem) / 2);
  width: 20rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  color: #000;
`;
export default Infomation;
