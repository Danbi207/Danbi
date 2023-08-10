import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Waitting from './Items/Waitting';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import MyFriend from './Items/MyFriend';
import { authGet } from '../../../Util/apis/api';

const Friend = () => {
  const [waittingFriends, setWaittingFriends] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const waittingResponse = await authGet('/api/v1/friends/responses');
        const myFriendResponse = await authGet('/api/v1/friends');
        setWaittingFriends(waittingResponse.result);
        setMyFriends(myFriendResponse.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [waittingResponse, myFriendResponse]);

  return (
    <Wrap>
      <Header />
      <FriendWrap>
        <WaitingWrap>
          <WaittingHeader>수락 대기 중</WaittingHeader>
          {waittingFriends.map((value, index) => (
            <Waitting
              value={value}
              key={index}
              setWaittingFriends={setWaittingFriends}
              setMyFriends={setMyFriends}
            />
          ))}
        </WaitingWrap>
        <ListWrap>
          <ListHeader>친구 목록</ListHeader>
          {myFriends.map((value, index) => (
            <MyFriend
              value={value}
              key={index}
              setMyFriends={setMyFriends}
              setWaittingFriends={setWaittingFriends}
            />
          ))}
        </ListWrap>
      </FriendWrap>
      <Footer />
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100%;
  width: 100%;
`;
const FriendWrap = styled.div`
  font-size: 16px;
  width: 100%;
  height: calc(100% - 6.2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  overflow-y: auto;
  & > * {
    flex: 0 0 auto;
  }
`;
const WaitingWrap = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
`;
const ListWrap = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
`;
const WaittingHeader = styled.span`
  margin-left: 1.5rem;
`;
const ListHeader = styled.span`
  margin-left: 1.5rem;
`;

export default Friend;
