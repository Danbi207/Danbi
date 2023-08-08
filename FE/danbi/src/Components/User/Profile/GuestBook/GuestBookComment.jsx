import React from 'react';
import styled from 'styled-components';
import ex from '../example-profile.jpg';

// userName이 redux의 name과 같으면 수정/삭제 버튼
const GuestBookComment = ({ comment, userName }) => {

  return (
    <CommentWrap>
      <GuestImg src={ex} alt="프로필 사진" />
      <ContentWrap>
        <ContentHeader>
          <GuestName>{comment.name}</GuestName>
          <CreatedTime>{comment.created_time}</CreatedTime>
        </ContentHeader>
        <Content>{comment.content}</Content>
      </ContentWrap>
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

const GuestImg = styled.img`
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

export default GuestBookComment;
