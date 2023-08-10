import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setMode, setTargetMemberId } from '../../../../../../store/Slice/ModalSlice.js';
import { useDispatch } from 'react-redux';
const UserInfo = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <UserInfoWrap>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <BackImg />
      </BackButton>
      <Wrap>
        <ProfileImg src={data.ip.profile_url} />
        <Body>
          <BottomWrap>
            <Name>{data.ip.name}</Name>
            <BadgeWrap>
              {data.friendFlag ? <FriendBadge /> : null}
              {data.ip.accuse_point < 0 ? null : data.ip.accuse_point > 1 ? (
                <AccuseBadge $state={'yellowcard'} />
              ) : (
                <AccuseBadge $state={'redcard'} />
              )}
            </BadgeWrap>
          </BottomWrap>
          <DewPoint>{data.ip.accumulateDewPoint}Dew</DewPoint>
        </Body>
        <More onClick={() => setIsOpen(!isOpen)}>
          <MoreImg />
          {isOpen && (
            <DropDownMenu
              onClick={() => {
                dispatch(setTargetMemberId(data.ip.ipId));
                dispatch(setMode('accuse'));
              }}
            >
              신고
            </DropDownMenu>
          )}
        </More>
      </Wrap>
    </UserInfoWrap>
  );
};

const UserInfoWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
`;

const BackButton = styled.button`
  display: block;
`;

const BackImg = styled.img.attrs((props) => ({
  src: props.theme.images.back,
}))``;

const ProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-left: 1.5rem;
`;
const Name = styled.span`
  font-size: 32px;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DewPoint = styled.div`
  font-size: 20px;
  color: white;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: center;
`;
const BadgeWrap = styled.div`
  margin-left: 0.25rem;
`;

const FriendBadge = styled.img.attrs((props) => ({
  src: props.theme.images.friendBadge,
}))`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

const AccuseBadge = styled.img.attrs((props) => ({
  src:
    props.$state === 'yellow'
      ? props.theme.images.yellowcard
      : props.theme.images.redcard,
}))`
  width: 1rem;
  height: 1rem;
`;

const More = styled.button`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-left: auto;
  margin-right: 2rem;
`;

const MoreImg = styled.img.attrs((props) => ({
  src: props.theme.images.more,
}))`
  width: 4px;
  height: 1rem;
`;

const DropDownMenu = styled.option`
  width: 60%;
  height: auto;
`;

export default UserInfo;
