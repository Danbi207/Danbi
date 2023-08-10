import React from 'react';
import styled from 'styled-components';
import AccuseButton from './Utils/AccuseButton.jsx';
import { authPost } from '../../../Util/apis/api.js';
import { useSelector } from 'react-redux';
const UserInfo = ({ url, name, targetId, friendFlag }) => {
  const handlePlus = async () => {
    const data = {
      targetId,
    };
    console.log(data);
    const res = await authPost('/api/v1/friends', data);
    console.log(res);
  };

  const cur_id = useSelector((state) => state.user.userId);
  return (
    <UserInfoWrap>
      <ProfileImage $profileUrl={url} alt="img" />
      <UserDetail>
        <UserName>{name}</UserName>
        {friendFlag ? <FriendBadge /> : null}
        {cur_id === Number(targetId) ? null : (
          <Btns>
            <PlusButton onClick={handlePlus}>친구추가</PlusButton>
            <AccuseButton targetId={targetId}/>
          </Btns>
        )}
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

const FriendBadge = styled.img.attrs((props) => ({
  src: props.theme.images.friendBadge,
}))``;

export default UserInfo;
