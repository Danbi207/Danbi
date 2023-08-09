import React from 'react';
import styled from 'styled-components';
import example from './example-profile.jpg';
import AccuseButton from './Utils/AccuseButton.jsx';
import { useSelector } from 'react-redux';

const UserInfo = ({url, name}) => {
  return (
    <UserInfoWrap>
      <ProfileImage $profileUrl={url} alt="img" />
      <UserDetail>
        <UserName>{name}</UserName>
        <Btns>
          <PlusButton>친구추가</PlusButton>
          <AccuseButton />
        </Btns>
      </UserDetail>
    </UserInfoWrap>
  );
};

const UserInfoWrap = styled.div`
  width: 100%;
  height: 6.25rem;
  display: flex;
  padding: 0 1rem 0 2.5rem;
`;

const ProfileImage = styled.img.attrs((props) => ({
  src: props.$profileUrl,
}))`
  height: 6rem;
  width: 7rem;
  border-radius: 50%;
`;

const UserDetail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 1rem;
`;

const UserName = styled.div`
  font-size: 17px;
  height: 1rem;
  text-align: start;
  margin-bottom: 0.75rem;
  margin-left: 0.25rem;
`;

const PlusButton = styled.button`
  background-color: #6161ff;
  color: white;
  border-radius: 10px;
  width: 8rem;
  height: 2rem;
  margin-right: 1rem;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: row;
`;

export default UserInfo;
