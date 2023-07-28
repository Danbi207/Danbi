import React, { useState } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const PresetDetail = ({ content, showDetail }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } =
    useSpeechRecognition();
  const [Recording, setRecording] = useState(false);

  // 브라우저STT 확인용
  if (!browserSupportsSpeechRecognition) {
    alert('브라우저가 STT를 지원하지 않음');
  }

  if (!isMicrophoneAvailable){
    alert('마이크 권한이 없습니다.')
  }

  // 녹음 시작 (리셋하면서 시작)
  const StartRecord = () => {
    setRecording(true);
    resetTranscript();
    SpeechRecognition.startListening();
  };
  // 녹음 종료
  const StopRecord = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
  };

  const CloseDetail = () => {
    showDetail(-1);
  };

  const SaveDetail = () => {
    showDetail(-1);
    alert('저장되었습니다.');
  };

  // 계속 녹음 중이라면 중지안하고 계속 녹음
  if (listening) {
    SpeechRecognition.startListening({ continuous: true });
  }

  return (
    <PresetDetailWrap>
      <DetailTextArea
        value={Recording ? transcript : content}
        onChange={(e) => setRecording(e.target.value)}
      />
      <Btns>
        {browserSupportsSpeechRecognition ? (
          <RecordBtn onClick={() => (Recording ? StopRecord() : StartRecord())}>
            {Recording ? '중지' : '녹음'}
          </RecordBtn>
        ) : null}
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

export default PresetDetail;
