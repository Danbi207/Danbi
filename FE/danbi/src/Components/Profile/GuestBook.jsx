import React from 'react';
import styled from 'styled-components';
import example from './example-profile.jpg';
import send from './Send-black.svg';

const GuestBook = () => {
  return (
    <GuestBookWrap>
      <ChatWrap>
        <UserDetail>
          <ProfileImage src={example} alt="img" />
          <UserName>김민규</UserName>
        </UserDetail>
        <ChatSection>
          <ChatForm>
            <Chat />
            <SendBtn>
              <ChatImg src={send} />
            </SendBtn>
          </ChatForm>
        </ChatSection>
      </ChatWrap>
    </GuestBookWrap>
  );
};

const GuestBookWrap = styled.div`
  margin-top: 0.5rem;
  height: auto;
  overflow-y: hidden;
`;

const ChatWrap = styled.div`
  height: 2rem;
  display: flex;
`;

const UserDetail = styled.div`
  display: flex;
  margin-left: 1rem;
  width: 5rem;
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatSection = styled.div`
  width: 70%;
  display: flex;
  border-bottom: 2px solid white;
  align-items: center;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none;
  }
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
  margin: 0;
  border: 0;
  background-color: transparent;
  padding: 1rem;
  padding-right: 2.5rem;
  outline: none;
  resize: none;
  -ms-overflow-style: none;
  min-height: 24px;
  max-height: 200px;
  color: white;
`;

const SendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const ChatImg = styled.img`
  width: 20px;
  height: 20px;
`;

export default GuestBook;
