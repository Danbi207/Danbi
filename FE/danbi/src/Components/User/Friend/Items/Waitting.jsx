import React from 'react';
import styled from 'styled-components';
import { authPost, authDelete, authGet } from '../../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';

const Waitting = ({ value, setWaittingFriends, setMyFriends }) => {
  console.log(value);
  const handleAccept = async () => {
    const target_id = {
      targetId: value.targetId,
    };
    try {
      const res = await authPost('/api/v1/friends/permit', target_id);
      console.log(res);
      const waittingResponse = await authGet('/api/v1/friends/responses');
      const myFriendResponse = await authGet('/api/v1/friends');
      setWaittingFriends(waittingResponse.result);
      setMyFriends(myFriendResponse.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await authDelete(`/api/v1/friends/delete/${value.friendId}`, {});
      const waittingResponse = await authGet('/api/v1/friends/responses');
      const myFriendResponse = await authGet('/api/v1/friends');
      setWaittingFriends(waittingResponse.result);
      setMyFriends(myFriendResponse.result);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  return (
    <WaittingWrap>
      <InfoWrap>
        <ImgWrap $url={value.profileUrl} />
        <Name onClick={() => navigate(`/user/profile/${value.targetId}`)}>
          {value.name}
        </Name>
      </InfoWrap>
      <Btns>
        <AcceptBtn onClick={handleAccept}>수락</AcceptBtn>
        <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
      </Btns>
    </WaittingWrap>
  );
};

const WaittingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  margin: 1rem 0;
  width: 100%;
  height: auto;
`;
const ImgWrap = styled.img.attrs((props) => ({
  src: props.$url,
}))`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
const Name = styled.span`
  font-size: 32px;
  padding-left: 0.5rem;
`;
const InfoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btns = styled.div`
  font-size: 16px;
  width: 8.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AcceptBtn = styled.button`
  border-radius: 10px;
  background-color: #FFEA7E;
  color: #19191B;
  width: 4rem;
  height: 2rem;
`;
const DeleteBtn = styled.button`
  border-radius: 10px;
  background-color: #d9d9d9;
  color: #19191B;
  width: 4rem;
  height: 2rem;
`;

export default Waitting;
