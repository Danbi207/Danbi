import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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

const Profile = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [PickModalOpen, setPickModalOpen] = useState(false);
  const [data, setData] = useState(null);
  // TODO : userId params 조회
  const { targetId } = useParams();
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(await authGet(`/api/v1/profile/${targetId}`));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });
  console.log(localStorage.getItem('role'));

  return (
    <ProfileWrap>
      <Header />
      <Wrap>
        <UserInfo url={data.profileUrl} />
        {localStorage.getItem('role') === 'ip' ? (
          <PresetButton setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
        ) : null}
        <JandiWrap>
          <Jandi
            point={data.dewPoint}
            help_log={data.help_log}
            setPickModalOpen={setPickModalOpen}
            item={data.item}
          />
        </JandiWrap>
        {PickModalOpen && <PickModal setPickModalOpen={setPickModalOpen} />}
        <GuestBook guestBookId={data.guestBookId} comments={data.comments} />
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
  // (Todo) 드래그 방지 풀어줘야함
  /* -webkit-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all; */
`;

const JandiWrap = styled.div``;

export default Profile;
