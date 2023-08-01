import React, { useState } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getSpeech } from './utils/TTS';

const PresetDetail = ({ content, showDetail }) => {
  const [value, setValue] = useState(content);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [Recording, setRecording] = useState(false);

  // 녹음 시작 (리셋하면서 시작)
  const StartRecord = () => {
    setRecording(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };
  // 녹음 종료
  const StopRecord = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
    setValue(transcript);
  };

  const CloseDetail = () => {
    showDetail(-1);
  };

  const SaveDetail = () => {
    showDetail(-1);
    alert('저장되었습니다.');
  };

  const handleBtn = () => {
    getSpeech(value);
  };

  return (
    <PresetDetailWrap>
      <DetailTextArea
        value={Recording ? transcript : value}
        onChange={(e) => setRecording(e.target.value)}
      />
      <Btns>
        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <RecordBtn onClick={() => (Recording ? StopRecord() : StartRecord())}>
            {Recording ? '중지' : '녹음'}
          </RecordBtn>
        ) : null}
        <TTSBtn onClick={handleBtn}>재생</TTSBtn>
        <CancleBtn onClick={CloseDetail}>취소</CancleBtn>
        <SaveBtn onClick={SaveDetail}>수정</SaveBtn>
      </Btns>
    </PresetDetailWrap>
  );
};

const PresetDetailWrap = styled.div``;

const DetailTextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  border: 1px solid white;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 0.5rem 0;
  outline: none;
  resize: none;
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

const RecordBtn = styled.button`
  width: 3.5rem;
  height: 1rem;
  background-color: red;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
`;

const TTSBtn = styled.button`
  width: 3.5rem;
  height: 1rem;
  background-color: blue;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
`;

export default PresetDetail;
