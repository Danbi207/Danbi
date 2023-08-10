import React from 'react';
import styled from 'styled-components';
import ex from '../example-profile.jpg';
import { useSelector } from 'react-redux';
import { authDelete } from '../../../../Util/apis/api';

// userName이 redux의 name과 같으면 수정/삭제 버튼
const GuestBookComment = ({ comment, writerName }) => {
  const userName = useSelector((state) => state.user.name);
  const handleDelete = async () => {
    try {
      const data = authDelete(
        `/api/v1/profile/guestbook/${guestBookId}/${comment.commentId}`
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CommentWrap>
      <GuestImg $url={comment.profileUrl} alt="프로필 사진" />
      <ContentWrap>
        <ContentHeader>
          <GuestName>{comment.name}</GuestName>
          <CreatedTime>{comment.createdTime}</CreatedTime>
        </ContentHeader>
        <Content>{comment.content}</Content>
      </ContentWrap>
      {writerName === userName ? (
        <Buttons>
          <EditBtn>수정</EditBtn>
          <DeleteBtn>삭제</DeleteBtn>
        </Buttons>
      ) : null}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
  margin-top: 0.5rem;
`;

const GuestImg = styled.img.attrs((props) => ({
  src: props.$url,
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const ContentWrap = styled.div`
  padding: 0 1rem;
`;

const ContentHeader = styled.div``;

const GuestName = styled.span``;

const CreatedTime = styled.span`
  padding: 0 0 0 0.25rem;
  font-size: 10px;
  color: #d8d8d8;
`;

const Content = styled.span`
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const EditBtn = styled.button``;
const DeleteBtn = styled.button``;
export default GuestBookComment;
