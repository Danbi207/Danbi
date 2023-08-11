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
import { useSelector } from 'react-redux';

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
  });

  // TODO : userId params 조회
  const { userId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await authGet(`/api/v1/profile/${userId}`);
      setData(res);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const cur_id = useSelector((state) => state.user.userId);

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
  height: auto;
`;

const Wrap = styled.div`
  margin-top: 1rem;
`;

const JandiWrap = styled.div``;

export default Profile;
