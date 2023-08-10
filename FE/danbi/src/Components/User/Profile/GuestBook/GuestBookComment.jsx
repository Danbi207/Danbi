import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { authDelete, authGet, authPost } from '../../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';

// userName이 redux의 name과 같으면 수정/삭제 버튼
const GuestBookComment = ({
  comment,
  writerName,
  userId,
  setComment,
  guestBookId,
  memberId,
}) => {
  const userName = useSelector((state) => state.user.name);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleDelete = async (comment) => {
    try {
      const data = await authDelete(
        `/api/v1/profile/guestbook/${guestBookId}/${comment.commentId}`
      );
      console.log(data);
      const res = await authGet(`/api/v1/profile/guestbook/${userId}`);
      setComment(res.guestBookDto.commentDtos);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async () => {
    try {
      const data = await authPost(
        `/api/v1/profile/guestbook/${guestBookId}/${comment.commentId}`,
        { content: editedContent }
      );
      console.log(data);
      const res = await authGet(`/api/v1/profile/guestbook/${userId}`);
      setComment(res.guestBookDto.commentDtos);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const cur_id = useSelector((state) => state.user.userId);
  return (
    <CommentWrap>
      <GuestImg $url={comment.profileUrl} alt="프로필 사진" />
      <ContentWrap>
        <ContentHeader>
          <GuestName onClick={() => navigate(`/user/profile/${memberId}`)}>
            {comment.name}
          </GuestName>
          <CreatedTime>{comment.createdTime}</CreatedTime>
        </ContentHeader>
        {editMode ? (
          <EditSection>
            <EditTextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <SaveBtn onClick={handleEdit}>저장</SaveBtn>
          </EditSection>
        ) : (
          <Content>{comment.content}</Content>
        )}
      </ContentWrap>
      {writerName === userName && !editMode && (
        <Buttons>
          <EditBtn onClick={() => setEditMode(true)}>수정</EditBtn>
          <DeleteBtn onClick={() => handleDelete(comment)}>삭제</DeleteBtn>
        </Buttons>
      )}

      {writerName !== userName && Number(userId) === cur_id && (
        <Buttons>
          <DeleteBtn onClick={() => handleDelete(comment)}>삭제</DeleteBtn>
        </Buttons>
      )}
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  width: 100%;
  height: auto;
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

const EditSection = styled.div``;
const EditTextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.titleColor};
  border-radius: 10px;
  resize: none;
  background-color: transparent;
  text-align: start;
  outline: none;
  word-break: break-word;
  padding: 0.5rem 0 0.5rem 5px;
  width: 100%;
  height: 6rem;
  color: ${(props) => props.theme.colors.titleColor};
`;
const SaveBtn = styled.button``;

export default GuestBookComment;
