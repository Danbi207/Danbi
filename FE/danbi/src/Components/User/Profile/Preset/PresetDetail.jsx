import React, { useState } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getSpeech } from '../Utils/TTS';


const PresetDetail = ({ content, showDetail, setDeleteActive, setEditActive }) => {
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
    setDeleteActive(false);
    setEditActive(false);
  };

  const SaveDetail = () => {
    showDetail(-1);
    alert('저장되었습니다.');
    setDeleteActive(false);
    setEditActive(false);
  };

  const handleBtn = () => {
    getSpeech(value);
  };

  return (
    <PresetDetailWrap>
      <DetailTextArea
        value={Recording ? transcript : value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Btns>
        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
        <RecordingBtns>
            <RecordBtn onClick={() => (Recording ? StopRecord() : StartRecord())}>
              {Recording ? <RecordImg $state={'stop'} /> : <RecordImg state={'record'} />}
            </RecordBtn>
            <TTSBtn onClick={handleBtn}><TTSImg /></TTSBtn>
        </RecordingBtns>
          ) : null}
        <ConfirmBtns>
          <CancleBtn onClick={CloseDetail}>취소</CancleBtn>
          <SaveBtn onClick={SaveDetail}>수정</SaveBtn>
        </ConfirmBtns>
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
  text-align: start;
  padding: 0.5rem 0 0.5rem 5px;
  outline: none;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveBtn = styled.button`
  width: 3rem;
  height: 1rem;
  background-color: #6161ff;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  margin-left: 2.5px;
`;

const CancleBtn = styled.button`
  width: 3rem;
  height: 1rem;
  background-color: #dadada;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
  margin-right: 2.5px;
`;

const RecordBtn = styled.button`
`;

const TTSBtn = styled.button`
`;

const RecordingBtns = styled.div`
`

const ConfirmBtns = styled.div` 
`

const RecordImg = styled.img.attrs(props => ({
  src: props.$state === 'stop' ? props.theme.images.stop : props.theme.images.record
}))`
`

const TTSImg = styled.img.attrs(props => ({
  src: props.theme.images.play
}))`
`

export default PresetDetail;
