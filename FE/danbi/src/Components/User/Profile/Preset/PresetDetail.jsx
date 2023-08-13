import React, { useState } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getSpeech } from '../Utils/TTS';
import { authPost, authGet } from '../../../../Util/apis/api';

const PresetDetail = ({
  content,
  PresetId,
  showDetail,
  setEditActive,
  sequence,
  setPresetList,
}) => {
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
    setEditActive(false);
  };

  const SaveDetail = async () => {
    try {
      const config = {
        title: value,
        content: value,
        sequence: sequence,
      };
      await authPost(`/api/v1/preset/update/${PresetId}`, config);
      const res = await authGet(`/api/v1/preset`);
      setPresetList(res.presetList);
      showDetail(-1);
      alert('저장되었습니다.');
      setEditActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBtn = () => {
    getSpeech(value);
  };

  const commands = [
    {
      command: '단비',
      callback: (command) => {},
    },
    {
      command: '녹음',
      callback: (command) => {
        StartRecord();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '종료',
      callback: (command) => {
        StopRecord();
      },
    },
    {
      command: '취소',
      callback: (command) => {
        CloseDetail();
      },
    },
    {
      command: '저장',
      callback: (command) => {
        SaveDetail();
      },
    },
  ];

  if (browserSupportsSpeechRecognition) {
  }

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
            <TTSBtn onClick={handleBtn}>
              <TTSImg />
            </TTSBtn>
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
  border: 1px solid ${(props) => props.theme.colors.titleColor};
  border-radius: 5px;
  background-color: transparent;
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

const RecordBtn = styled.button``;

const TTSBtn = styled.button``;

const RecordingBtns = styled.div``;

const ConfirmBtns = styled.div``;

const RecordImg = styled.img.attrs((props) => ({
  src: props.$state === 'stop' ? props.theme.images.stop : props.theme.images.record,
}))``;

const TTSImg = styled.img.attrs((props) => ({
  src: props.theme.images.play,
}))``;

export default PresetDetail;
