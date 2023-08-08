import React, {useState} from 'react';
import styled from 'styled-components';
import example from '../example-profile.jpg';
import GuestBookComment from './GuestBookComment';
import { authPost } from '../../../../Util/apis/api';

const Comments = [
  {
    name: '김민규',
    profile_url: './example-profile.jpg',
    content: '저는 쓸개입니다.',
    created_time: '2023-07-26',
    updated_time: '2023-07-26',
  },
  {
    name: '윤태웅',
    profile_url: './example-profile.jpg',
    content: '역시 김민규 좀 그렇네요...',
    created_time: '2023-07-25',
    updated_time: '2023-07-25',
  },
  {
    name: '김민규',
    profile_url: './example-profile.jpg',
    content: '저는 쓸개입니다.',
    created_time: '2023-07-26',
    updated_time: '2023-07-26',
  },
];

const GuestBook = ({guestBookData}) => {
  const [textArea, setTextArea] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const textJson = {
      "content": textArea,
      "guestBookId": guestBookData.guest_book_id,
    };
    authPost('/api/v1/guestbook', textJson);
  }

  return (
    <GuestBookWrap>
      <ChatWrap>
        <UserDetail>
          <ProfileImage src={example} alt="img" />
          <UserName>김민규</UserName>
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
      {Comments.map((comment, index) => (
        <GuestBookComment key={index} comment={comment} />
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

const ProfileImage = styled.img`
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

const ChatImg = styled.img.attrs(
props => ({
  src: props.theme.images.send
})
)`
  width: 20px;
  height: 20px;
`;

export default GuestBook;
