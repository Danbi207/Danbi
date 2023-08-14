import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getSpeech } from '../Utils/TTS';
import { authPost, authGet } from '../../../../Util/apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../../store/Slice/ModalSlice';
const PresetDetail = ({
  content,
  PresetId,
  showDetail,
  setEditActive,
  sequence,
  setPresetList,
}) => {
  const [Recording, setRecording] = useState(false);
  const [value, setValue] = useState(content);
  // 녹음 시작 (리셋하면서 시작)
  const StartRecord = () => {
    setRecording(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  // 녹음 종료
  const StopRecord = () => {
    setValue(transcript);
    setRecording(false);
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
      alert('수정되었습니다.');
      setEditActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBtn = () => {
    getSpeech(value);
  };
  const dispatch = useDispatch();
  const commandMode = useSelector((state) => state.modal.mode);
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
      command: '녹음',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          setRecording(true);
          SpeechRecognition.startListening();
          getSpeech('녹음시작');
          setTimeout(() => {
            setRecording(false);
            SpeechRecognition.stopListening();
            setValue(transcript);
            getSpeech('녹음완료');
          }, 10000);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '취소',
      callback: () => {
        if (commandMode === 'stt') {
          CloseDetail();
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '수정',
      callback: () => {
        if (commandMode === 'stt') {
          SaveDetail();
          dispatch(setMode(null));
          getSpeech('수정완료');
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '재생',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          getSpeech(value);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
  ];
  const {
    transcript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ commands });
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [browserSupportsSpeechRecognition]);

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
