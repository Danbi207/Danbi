import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Header from '../../Common/Header/Header.jsx';
import Footer from '../../Common/Footer/Footer.jsx';
import UserInfo from './UserInfo.jsx';
import PresetButton from './Preset/PresetButton.jsx';
import Jandi from './Jandi/Jandi.jsx';
import GuestBook from './GuestBook/GuestBook.jsx';
import PresetModal from './Preset/PresetModal.jsx';
import PickModal from './Utils/PickModal.jsx';
import { authGet } from '../../../Util/apis/api.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../store/Slice/ModalSlice.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Profile = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [PickModalOpen, setPickModalOpen] = useState(false);
  const [data, setData] = useState({
    dewPoint: 0,
    profileUrl: '',
    helpLog: [],
    item: {},
    guestBookId: 0,
    comments: [],
    accusePoint: 0,
    profileId: 0,
    name: '',
    accumulatePoint: 0,
    friendFlag: false,
    requestFriendFlag: false,
    requestedFriendFlag: false,
  });

  const dispatch = useDispatch();
  const commandMode = useSelector((state) => state.modal.mode);
  // TODO : userId params 조회
  const { userId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await authGet(`/api/v1/profile/${userId}`);
      console.log(res);
      setData(res);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const cur_id = useSelector((state) => state.user.userId);

  const commands = [
    {
      command: '단비',
      callback: () => {
        if (commandMode === null) {
          dispatch(setMode('stt'));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '프리셋',
      callback: () => {
        if (commandMode === 'stt') {
          setModalOpen(true);
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '프리셋 설정',
      callback: () => {
        if (commandMode === 'stt') {
          setModalOpen(true);
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '설정',
      callback: () => {
        if (commandMode === 'stt') {
          setModalOpen(true);
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
  ];

  const { browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      //STT가 지원하는 경우
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  }, [browserSupportsSpeechRecognition]);
  return (
    <ProfileWrap>
      <Header />
      <Wrap>
        <UserInfo
          url={data.profileUrl}
          name={data.name}
          targetId={userId}
          friendFlag={data.friendFlag}
          accusePoint={data.accusePoint}
          requestFriendFlag={data.requestFriendFlag}
          requestedFriendFlag={data.requestedFriendFlag}
        />
        {localStorage.getItem('role') === 'ip' && Number(userId) === cur_id ? (
          <PresetButton setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
        ) : null}
        <JandiWrap>
          <Jandi
            point={data.dewPoint}
            help_log={data.helpLog}
            setPickModalOpen={setPickModalOpen}
            item={data.item}
            userId={userId}
            dewPoint={data.dewPoint}
            accumulatePoint={data.accumulatePoint}
          />
        </JandiWrap>
        {PickModalOpen && <PickModal setPickModalOpen={setPickModalOpen} />}
        <GuestBook guestBookId={data.guestBookId} userId={userId} />
        {ModalOpen && <PresetModal setModalOpen={setModalOpen} />}
      </Wrap>
      <Footer />
    </ProfileWrap>
  );
};
const ProfileWrap = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.titleColor};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Wrap = styled.div`
  height: calc(100% - 6.2rem);
  width: 100%;
  padding-top: 1rem;
`;

const JandiWrap = styled.div``;

export default Profile;
