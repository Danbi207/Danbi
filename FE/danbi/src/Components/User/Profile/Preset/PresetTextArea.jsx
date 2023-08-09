import React, { useState } from 'react';
import styled from 'styled-components';
import { authPost } from '../../../../Util/apis/api';

const PresetTextArea = ({ setOpenTextArea, length, OpenTextArea, fetchData }) => {
  const [textArea, setTextArea] = useState("");
  
  const SavePreset = async () => {
    setOpenTextArea(!OpenTextArea);
    const textJson = {
      "title": textArea,
      "content": textArea,
      "sequence": length + 1
    }
    try{
      const data = await authPost('/api/v1/preset/create', textJson);
      fetchData();
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  };

  const ClosePreset = () => {
    setOpenTextArea(false);
  };

  const handleChange = (e) => {
    setTextArea(e.target.value)
  };
  
  return (
    <TextAreaWrap>
      <TextArea
        placeholder="저는 휠체어를 타고 있습니다.
조심해서 밀어주세요!"
        value={textArea}
        onChange={handleChange}
      />
      <Btns>
        <CancleBtn onClick={ClosePreset}>취소</CancleBtn>
        <SaveBtn onClick={SavePreset}>저장</SaveBtn>
      </Btns>
    </TextAreaWrap>
  );
};

const TextAreaWrap = styled.div`
  width: 19rem;
  height: 6rem;
  margin-top: 1.5rem;
`;

const TextArea = styled.textarea`
  border: 1px solid ${props => props.theme.colors.titleColor};
  border-radius: 10px;
  resize: none;
  background-color: transparent;
  text-align: start;
  outline: none;
  word-break: break-word;
  padding: 0.5rem 0 0.5rem 5px;
  width: 100%;
  height: 6rem;
  color: ${props => props.theme.colors.titleColor};
  &::placeholder {
    color: #8e8b8b;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: end;
`;

const SaveBtn = styled.button`
  width: 3.5rem;
  height: 1rem;
  background-color: #6161ff;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
`;

const CancleBtn = styled.button`
  width: 3.5rem;
  height: 1rem;
  background-color: #dadada;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
`;

export default PresetTextArea;
