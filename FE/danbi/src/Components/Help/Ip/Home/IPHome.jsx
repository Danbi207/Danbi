import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
import Calender from './Components/Calender';
import {
  setUserId,
  setProfileId,
  setName,
  setProfileUrl,
  setGender,
} from '../../../../store/Slice/userSlice';
import { setMode } from '../../../../store/Slice/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authGet, authPost } from '../../../../Util/apis/api';
import { getSpeech } from '../../../User/Profile/Utils/TTS';

const IPHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { kakao } = window;
  const geocoder = useRef(new kakao.maps.services.Geocoder());
  const commandMode = useSelector((state) => state.modal.mode);
  const [refresh, setRefresh] = useState(false);

  const getUserInfo = useCallback(async () => {
    try {
      const data = await authGet('/api/v1/member');
      if (data) {
        dispatch(setUserId(data.userId));
        dispatch(setProfileId(data.profileId));
        dispatch(setName(data.name));
        dispatch(setProfileUrl(data.profileUrl));
        dispatch(setGender(data.gender));
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [dispatch]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const emergencyReqeust = useCallback(
    async (po, ad) => {
      try {
        let curTime = new Date();
        let year = curTime.getFullYear();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();
        let hour = curTime.getHours();
        let minute = curTime.getMinutes();
        const start_time = `${year}-${month < 10 ? '0' + month : month}-${
          day < 10 ? '0' + day : day
        } ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;

        curTime.setMinutes(curTime.getMinutes() + 15);
        year = curTime.getFullYear();
        month = curTime.getMonth() + 1;
        day = curTime.getDate();
        hour = curTime.getHours();
        minute = curTime.getMinutes();
        const end_time = `${year}-${month < 10 ? '0' + month : month}-${
          day < 10 ? '0' + day : day
        } ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;

        const res = await authPost('/api/v1/help/create', {
          position: {
            latitude: po.coords.latitude,
            longitude: po.coords.longitude,
            addr: ad,
            destLatitude: po.coords.latitude,
            destLongitude: po.coords.longitude,
            destAddr: ad,
            meetLatitude: po.coords.latitude,
            meetLongitude: po.coords.longitude,
            meetAddr: ad,
          },
          category: 'ETC',
          caution: '긴급요청입니다!주의해주세요.',
          faceFlag: true,
          emergencyFlag: true,
          genderFlag: false,
          content: '긴급도움 요청입니다. 근처에 계신분들은 도와주세요!',
          start_time,
          end_time,
        });
        if (res) {
          setRefresh(!refresh); //달력데이터를 재렌더링
          alert('긴급요청을 했습니다!');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [refresh]
  );

  const coord2Address = useCallback(
    (po, mode) => {
      const coord = new kakao.maps.LatLng(po.coords.latitude, po.coords.longitude);
      geocoder.current.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          if (mode === 'emergency')
            emergencyReqeust(
              po,
              result[0].address.address_name
                ? result[0].address.address_name
                : result[0].road_address
            );
        }
      });
    },
    [geocoder, kakao, emergencyReqeust]
  );

  const setCurPosition = useCallback(
    (mode) => {
      //DO : gps 현재 위치 얻기
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition((e) => {
          if (mode === 'emergency') coord2Address(e, mode);
        });
      } else {
        alert('GPS를 차단하셨습니다. 허용해주세요!');
      }
    },
    [coord2Address]
  );

  const commands = [
    {
      command: '단비',
      callback: (command) => {
        if (commandMode === null) {
          dispatch(setMode('stt'));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '긴급',
      callback: (command) => {
        if (commandMode === 'stt') {
          setCurPosition('emergency');
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '긴급요청',
      callback: (command) => {
        if (commandMode === 'stt') {
          setCurPosition('emergency');
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '도와줘',
      callback: (command) => {
        if (commandMode === 'stt') {
          setCurPosition('emergency');
          dispatch(setMode(null));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
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
    <IpHomeWrap>
      <Header/>
      <Main>
        <Wrap>
          <Calender refresh={refresh} />
        </Wrap>
        <BtnWrap>
          <EmergencyBTN onClick={() => setCurPosition('emergency')}>
            긴급도움 요청하기
          </EmergencyBTN>
          <RequestBTN onClick={() => {navigate('/help/ip/request')}}>
            도움 요청하기
          </RequestBTN>
        </BtnWrap>
      </Main>
      <Footer/>
    </IpHomeWrap>
  );
};

const IpHomeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 6.2rem);
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bgColor};
`

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
`

const EmergencyBTN = styled.button`
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.redBtnColor};
  color: #fff;
  font-size: 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
  }
`

const RequestBTN = styled.button`
  width: 30rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.buttonbgColor};
  color: ${(props) => props.theme.colors.buttontextColor};
  font-size: 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 5rem;
  }
`;

export default IPHome;
