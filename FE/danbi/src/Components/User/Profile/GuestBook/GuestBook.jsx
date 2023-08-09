import React, { useState } from 'react';
import styled from 'styled-components';
import example from '../example-profile.jpg';
import GuestBookComment from './GuestBookComment';
import { authPost } from '../../../../Util/apis/api';
import { useSelector } from 'react-redux';

const GuestBook = ({ guestBookId, comments }) => {
  console.log(comments);
  const [textArea, setTextArea] = useState('');
  const profileUrl = useSelector((state) => state.user.profileUrl);
  const name = useSelector((state) => state.user.name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textJson = {
      content: textArea,
      guestBookId,
    };
    try {
      const data = authPost('/api/v1/guestbook', textJson);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GuestBookWrap>
      <ChatWrap>
        <UserDetail>
          <ProfileImage $profileUrl={profileUrl} alt="img" />
          <UserName>{name}</UserName>
        </UserDetail>
        <ChatSection>
          <ChatForm onSubmit={handleSubmit}>
            <Chat value={textArea} />
            <SendBtn>
              <ChatImg />
            </SendBtn>
          </ChatForm>
        </ChatSection>
      </ChatWrap>
      {comments.map((comment, index) => (
        <GuestBookComment key={index} comment={comment} writerName={comment.name} />
      ))}
    </GuestBookWrap>
  );
};

const GuestBookWrap = styled.div`
  margin-top: 0.5rem;
  height: calc(100% - 3.2rem);
`;

const ChatWrap = styled.div`
  height: 3rem;
  display: flex;
`;

const UserDetail = styled.div`
  display: flex;
  margin-left: 1rem;
  width: 6rem;
`;

const ProfileImage = styled.img.attrs((props) => ({
  src: props.$profileUrl,
}))`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const UserName = styled.div`
  width: auto;
  padding: 0 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatSection = styled.div`
  width: 14rem;
  display: flex;
  border-bottom: 2px solid ${(props) => props.theme.colors.titleColor};
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
`;
const ChatForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-left: 2px;
  margin-right: 2px;
  gap: 0.75rem;
  justify-content: center;
`;

const Chat = styled.textarea`
  width: 100%;
  font-size: 20px;
  height: 0.5rem;
  margin: 0;
  border: 0;
  background-color: transparent;
  outline: none;
  resize: none;
  -ms-overflow-style: none;
  min-height: 24px;
  max-height: 200px;
  color: white;
`;

const SendBtn = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
`;

const ChatImg = styled.img.attrs((props) => ({
  src: props.theme.images.send,
}))`
  width: 20px;
  height: 20px;
`;

export default GuestBook;
