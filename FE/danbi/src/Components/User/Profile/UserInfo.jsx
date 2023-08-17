import React from 'react';
import styled from 'styled-components';
import AccuseButton from './Utils/AccuseButton.jsx';
import { authPost, authGet } from '../../../Util/apis/api.js';
import { useSelector } from 'react-redux';
const UserInfo = ({
  url,
  name,
  targetId,
  friendFlag,
  accusePoint,
  requestedFriendFlag,
  requestFriendFlag,
}) => {

  const handlePlus = async () => {
    const data = {
      targetId,
    };
    await authPost('/api/v1/friends', data);
    await authGet(`/api/v1/profile/${targetId}`);
  };

  const cur_id = useSelector((state) => state.user.userId);
  return (
    <UserInfoWrap>
      <ProfileImage $profileUrl={url} alt="img" />
      <UserDetail>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.75rem' }}>
          <UserName>{name}</UserName>
          {friendFlag ? <FriendBadge /> : null}
          {accusePoint === 0 ? null : accusePoint === 1 ? (
            <AccuseBadge $state={'yellowcard'} />
          ) : (
            <AccuseBadge $state={'redcard'} />
          )}
        </div>
        {cur_id === Number(targetId) ? null : (
          <Btns>
            {friendFlag || requestedFriendFlag || requestFriendFlag ? null : (
              <PlusButton onClick={handlePlus}>친구추가</PlusButton>
            )}
            <AccuseButton targetId={targetId} />
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
  width: 6rem;
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
  margin-left: 0.25rem;
`;

const PlusButton = styled.button`
  background-color: #FFEA7E;
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

const AccuseBadge = styled.img.attrs((props) => ({
  src:
    props.$state === 'yellow'
      ? props.theme.images.yellowcard
      : props.theme.images.redcard,
}))``;

export default UserInfo;
