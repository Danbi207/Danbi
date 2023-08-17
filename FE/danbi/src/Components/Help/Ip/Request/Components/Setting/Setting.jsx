import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getSpeech } from '../../../../../User/Profile/Utils/TTS';

const Setting = ({
  content,
  SendRequestEdit,
  helpPostId,
  SendRequest,
  presets,
  caution,
  setCaution,
  cautionTitle,
  setCautionTitle,
  setContent,
  setPosition,
  setTap,
  dest,
  meet,
  setHelpType,
  helpType,
  setFaceType,
  faceType,
}) => {
  const [cautionSelect, setCautionSelect] = useState(false);
  const [cautionWrite, setCautionWrite] = useState(true);
  const [cautionRecording, setCautionRecording] = useState(false);
  const [contentRecording, setContentRecording] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // 녹음 시작 (리셋하면서 시작)
  const StartRecord = (type) => {
    if (type === 'caution') {
      setCautionRecording(true);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else if (type === 'content') {
      setContentRecording(true);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // 녹음 종료
  const StopRecord = (type) => {
    if (type === 'caution') {
      setCaution(transcript);
      setCautionRecording(false);
      SpeechRecognition.stopListening();
    } else if (type === 'content') {
      setContent(transcript);
      setContentRecording(false);
      SpeechRecognition.stopListening();
    }
  };

  const handleBtn = (type) => {
    if (type === 'caution') {
      getSpeech(caution);
    } else if (type === 'content') {
      getSpeech(content);
    }
  };

  const setCurPosition = useCallback(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((e) => {
        console.log(e);
        setPosition(e);
      });
    } else {
      // FIXME : GPS 지원을 안하면 막히게
      setPosition({ coords: { latitude: 36.110336, longitude: 128.4162384 } });
    }
  }, [setPosition]);

  return (
    <Wrap>
      <Title>대면/비대면</Title>
      <div>
        <FaceTypeBtn $on={faceType === 'contact'} onClick={() => setFaceType('contact')}>
          대면
        </FaceTypeBtn>
        <FaceTypeBtn $on={faceType === 'untact'} onClick={() => setFaceType('untact')}>
          비대면
        </FaceTypeBtn>
      </div>
      {faceType === 'contact' ? (
        <>
          <Title>도움 유형</Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              height: '10rem',
              padding: '0.5rem 0',
            }}
          >
            <FaceTypeBtn
              $on={helpType === 'MOBILE'}
              onClick={() => setHelpType('MOBILE')}
            >
              이동
            </FaceTypeBtn>
            <FaceTypeBtn $on={helpType === 'ETC'} onClick={() => setHelpType('ETC')}>
              기타
            </FaceTypeBtn>
          </div>
        </>
      ) : null}
      {faceType === 'contact' ? (
        <>
          <Title>만나는 장소</Title>
          <Input
            onClick={() => {
              setCurPosition();
              setTap('meet');
            }}
          >
            {meet ? meet.meetAddr : '만나는 곳을 입력해 주세요'}
          </Input>
          {helpType === 'MOBILE' ? (
            <>
              <Title>목적지</Title>
              <Input
                onClick={() => {
                  setCurPosition();
                  setTap('dest');
                }}
              >
                {dest ? dest.destAddr : '목적지를 입력해 주세요'}
              </Input>
            </>
          ) : null}
        </>
      ) : null}
      <Title>도움 상세정보</Title>
      <ContentWrap>
        <Content
          value={contentRecording ? transcript : content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="다음과 같은 정보를 입력해주세요.
1. 어떤 도움이 필요한지 적어주세요!
2. 도움을 줄 사람에게 전하고 싶은 말을 적어주세요!"
        />
        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <Buttons>
            <RecordingBtns>
              <RecordBtn
                onClick={() =>
                  contentRecording ? StopRecord('content') : StartRecord('content')
                }
              >
                {contentRecording ? (
                  <RecordImg $state={'stop'} />
                ) : (
                  <RecordImg $state={'record'} />
                )}
              </RecordBtn>
              <TTSBtn onClick={() => handleBtn('content')}>
                <TTSImg />
              </TTSBtn>
            </RecordingBtns>
          </Buttons>
        ) : null}
      </ContentWrap>
      <Title>주의사항</Title>
      <Select>
        <div
          onClick={() => {
            setCautionSelect(!cautionSelect);
          }}
        >
          {cautionTitle}
          <SelectImg alt="" src={`${process.env.PUBLIC_URL}/assets/expend.svg`} />
        </div>
        <Options $open={cautionSelect}>
          <Option
            onClick={() => {
              setCaution('');
              setCautionWrite(true);
              setCautionTitle('직접입력');
              setCautionSelect(false);
            }}
          >
            직접 입력
          </Option>
          {presets.map((e, idx) => (
            <Option
              onClick={() => {
                setCaution(e.content);
                setCautionWrite(false);
                setCautionTitle(e.title);
                setCautionSelect(false);
              }}
              key={idx}
            >
              {e.title}
            </Option>
          ))}
        </Options>
      </Select>
      <ContentWrap>
        <Content
          placeholder="상대방이 도움을 줄 때 조심해야할 점을 적어주세요!"
          readOnly={!cautionWrite}
          value={cautionRecording ? transcript : caution}
          onChange={(e) => {
            setCaution(e.target.value);
          }}
        />
        {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
          <Buttons>
            <RecordingBtns>
              <RecordBtn
                onClick={() =>
                  cautionRecording ? StopRecord('caution') : StartRecord('caution')
                }
              >
                {cautionRecording ? (
                  <RecordImg $state={'stop'} />
                ) : (
                  <RecordImg $state={'record'} />
                )}
              </RecordBtn>
              <TTSBtn onClick={() => handleBtn('caution')}>
                <TTSImg />
              </TTSBtn>
            </RecordingBtns>
          </Buttons>
        ) : null}
      </ContentWrap>
      <RequestBtn
        onClick={() => {
          helpPostId ? SendRequestEdit() : SendRequest();
        }}
      >
        {helpPostId ? '도움 수정하기' : '도움 요청하기'}
      </RequestBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  & > * {
    flex: 0 0 auto;
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-evenly;
    height: 10rem;
    padding: 0.5rem 0;
  }
`;

const RequestBtn = styled.button`
  margin-left: calc((100% - 20rem) / 2);
  border-radius: 1rem;
  font-size: 1.5rem;
  width: 20rem;
  height: 3rem;
  background-color: #ffea7e;
  margin-top: 1rem;
`;

const Select = styled.ul`
  margin-top: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #b0b0b0;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  & > :first-child {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 2rem;
  }
`;
const Option = styled.li`
  flex: 0 0 auto;
  border-bottom: 1px solid #b0b0b0;
  z-index: 1;
`;
const Options = styled.div`
  width: 100%;
  position: relative;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 10rem;
  overflow: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;
  background-color: #fff;
  border: 1px solid #b0b0b0;
  visibility: ${(props) => (props.$open ? 'visible' : 'hidden')};
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SelectImg = styled.img`
  position: absolute;
  right: 0;
  width: 2rem;
  height: 2rem;
`;

const Content = styled.textarea`
  border-radius: 0.5rem;
  border: 1px solid #e3e3e3;
  padding: 1rem;
  resize: none;
  font-size: 12px;
  width: 100%;
  height: 5rem;
`;

const Input = styled.div`
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #000;
  border: 1px solid #e3e3e3;
  text-align: center;
  cursor: pointer;
`;

const FaceTypeBtn = styled.div`
  border-radius: 0.5rem;
  font-size: 2rem;
  width: 8rem;
  height: 8rem;
  text-align: center;
  line-height: 8rem;
  background-color: ${(props) =>
    props.$on ? props.theme.colors.buttonbgColor : '#E3E3E3'};
  transform: ${(props) => (props.$on ? 'scale(1.1)' : 'scale(1)')};
  transition: 0.5s;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonbgColor};
    color: ${(props) => props.theme.colors.buttontextColor};
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  color: ${(props) => props.theme.colors.titleColor};
  & > * {
    flex: 0 0 auto;
  }
`;

const RecordBtn = styled.button``;

const TTSBtn = styled.button``;

const RecordingBtns = styled.div``;

const RecordImg = styled.img.attrs((props) => ({
  src: props.$state === 'stop' ? props.theme.images.stop : props.theme.images.record,
}))``;

const TTSImg = styled.img.attrs((props) => ({
  src: props.theme.images.play,
}))``;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentWrap = styled.div`
  margin: 0.5rem 0;
`;

export default Setting;
