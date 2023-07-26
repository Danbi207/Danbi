import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Common/Header/Header.jsx';
import Footer from '../Common/Footer/Footer.jsx';
import UserInfo from './UserInfo.jsx';
import PresetButton from './PresetButton.jsx';
import Jandi from './Jandi.jsx';
import GuestBook from './GuestBook.jsx';
import PresetModal from './PresetModal.jsx';
import PickModal from './PickModal.jsx';

const point = 100;

const Profile = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [PickModalOpen, setPickModalOpen] = useState(false);
  return (
    <ProfileWrap>
      <Header />
      <Wrap>
        <UserInfo />
        <PresetButton setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
        <JandiWrap>
          <Jandi point={point} setPickModalOpen={setPickModalOpen} />
        </JandiWrap>
        {PickModalOpen && <PickModal setPickModalOpen={setPickModalOpen} />}
        <GuestBook />
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
`;

const Wrap = styled.div`
  // (Todo) 드래그 방지 풀어줘야함
  /* -webkit-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all; */
`;

const JandiWrap = styled.div``;

const PointWrap = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 1rem;
  margin-top: 0.25rem;
`;

export default Profile;
