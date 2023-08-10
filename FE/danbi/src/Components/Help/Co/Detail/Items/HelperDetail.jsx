import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './HelpDetail/UserInfo.jsx';
import HelpDetailInfo from './HelpDetail/HelpDetailInfo.jsx';
import AcceptButton from './HelpDetail/AcceptButton.jsx';
import { authGet } from '../../../../../Util/apis/api.js';

const HelperDetail = ({ helpPostId }) => {
  const [data, setData] = useState({
    helpPostId: 1,
    ip: {
      ipId: 1,
      name: '',
      profileUrl: '',
      accumulateDewPoint: 0,
      accusePoint: 0,
    },
    position: {
      latitude: 37.566826,
      longitude: 126.9786567,
      addr: '',
      destLatitude: 37.566826,
      destLongitude: 126.9786567,
      destAddr: '',
      meetLatitude: 37.616826,
      meetLongitude: 126.9786567,
      meetAddr: '',
    },
    faceFlag: true,
    reservationFlag: true,
    content: '',
    startTime: '2023-01-01 12:00',
    endTime: '2023-01-01 13:00',
    friendFlag: true,
    caution: '',
    category: 'ETC',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authGet(`/api/v1/help/detail/${helpPostId}`);
        if (res) {
          setData(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [helpPostId]);

  return (
    <HelperDetailWrap>
      <UserInfo data={data} />
      <HR />
      <HelpDetailInfo data={data} />
      <ButtonWrap>
        <AcceptButton helpPostId={helpPostId} />
      </ButtonWrap>
    </HelperDetailWrap>
  );
};

const HelperDetailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const HR = styled.div`
  width: 40%;
  @media screen and (max-width: 500px) {
    width: 85%;
  }
  height: 1px;
  background-color: #d5cece;
`;

const ButtonWrap = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

export default HelperDetail;
