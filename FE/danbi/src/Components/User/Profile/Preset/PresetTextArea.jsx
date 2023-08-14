import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authPost } from '../../../../Util/apis/api';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../../store/Slice/ModalSlice';

const PresetTextArea = ({ setOpenTextArea, length, OpenTextArea, fetchData }) => {
  const [textArea, setTextArea] = useState('');

  const dispatch = useDispatch();
  const commandMode = useSelector((state) => state.modal.mode);

  const SavePreset = async () => {
    setOpenTextArea(!OpenTextArea);
    const textJson = {
      title: textArea,
      content: textArea,
      sequence: length + 1,
    };
    try {
      await authPost('/api/v1/preset/create', textJson);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const ClosePreset = () => {
    setOpenTextArea(false);
  };

  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  const commands = [
    {
      command: '단비',
      callback: () => {
        if (commandMode === null) {
          dispatch(setMode('stt'));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '취소',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          setOpenTextArea(false);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '저장',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          SavePreset();
        }
      },
    },
  ];

  const { browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      //STT가 지원하는 경우
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  }, [browserSupportsSpeechRecognition]);

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
