import React from 'react';
import styled from 'styled-components';
import UserInfo from './HelpDetail/UserInfo.jsx';
import HelpDetailInfo from './HelpDetail/HelpDetailInfo.jsx';
import AcceptButton from './HelpDetail/AcceptButton.jsx';

const data = {
  data: {
    helpPostId: 1,
    ip: {
      ipId: 1,
      name: '김민규',
      profileUrl: null,
      accumulateDewPoint: 100,
      accusePoint: 0,
    },
    position: {
      latitude: 37.566826,
      longitude: 126.9786567,
      addr: '태웅시',
      dest_latitude: 37.566826,
      dest_longitude: 126.9786567,
      dest_addr: '태웅동',
      meet_latitude: 37.616826,
      meet_longitude: 126.9786567,
      meet_addr: '태웅리',
    },
    faceFlag: true,
    reservationFlag: true,
    content: 'ㅁㄴㅇ',
    startTime: '2023-01-01 12:00',
    endTime: '2023-01-01 13:00',
    friendFlag: true,
    caution: 'qweqweqwe',
    category: 'ETC',
  },
  code: 200,
};

const HelperDetail = ({ helpPostId }) => {
  return (
    <HelperDetailWrap>
      <UserInfo data={data.data} />
      <HR />
      <HelpDetailInfo data={data.data} />
      <ButtonWrap>
        <AcceptButton />
      </ButtonWrap>
    </HelperDetailWrap>
  );
};

const HelperDetailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HR = styled.div`
  width: 40%;
  @media screen and (max-width: 500px) {
    width: 85%;
  }
  height: 1px;
  background-color: #d5cece;
  margin-top: 1rem;
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 3.2rem;
`;

export default HelperDetail;