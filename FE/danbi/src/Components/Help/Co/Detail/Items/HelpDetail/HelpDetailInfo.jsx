import React from 'react';
import styled from 'styled-components';
import DetailMap from './DetailMap.jsx';

const HelpDetailInfo = ({ data }) => {
  console.log(data);
  return (
    <DetailWrap>
      <BasicInfo>
        <BasicHeader>기본 정보</BasicHeader>
        <BasicBody>
          <FaceFlag>대면 : {data.faceflag ? '대면' : '비대면'}</FaceFlag>
          <DateTag>날짜 : {data.startTime}</DateTag>
          <TimeTag>시간 : {data.endTime}</TimeTag>
          <Destination>목적지 : {data.position.dest_addr}</Destination>
          <Meet>만나는 곳 : {data.position.meet_addr}</Meet>
        </BasicBody>
      </BasicInfo>
      <HelpInfo>
        <HelpHeader>상세 정보</HelpHeader>
        <HelpBody>{data.content}</HelpBody>
      </HelpInfo>
      <CautionInfo>
        <CautionHeader>주의 사항</CautionHeader>
        <CautionBody>{data.caution}</CautionBody>
      </CautionInfo>
      {
        data.faceFlag ?
        <MapInfo>
          <MapHeader>위치 정보</MapHeader>
          <DetailMap position={data.position} />
        </MapInfo>
        :null
      }
    </DetailWrap>
  );
};

const DetailWrap = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
  gap:0.5rem;
  padding: 0 1rem;
`;
const BasicInfo = styled.div`
`;
const BasicHeader = styled.div`
  margin: 0.5rem 0;
`;
const BasicBody = styled.div`
  border: 1px solid ${(props) => props.theme.colors.titleColor};
  border-radius: 10px;
  background-color: white;
  color: black;
  text-align: left;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;
const FaceFlag = styled.div``;
const DateTag = styled.div``;
const TimeTag = styled.div``;
const Destination = styled.div``;
const Meet = styled.div``;
const HelpInfo = styled.div`
`;
const HelpHeader = styled.div`
  margin-bottom: 0.5rem;
`;
const HelpBody = styled.div`
  border: 1px solid ${(props) => props.theme.colors.color};
  border-radius: 10px;
  background-color: white;
  color: black;
  min-height: 4rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;
const CautionInfo = styled.div`
`;
const CautionHeader = styled.div`
  margin: 0.5rem 0;
`;
const CautionBody = styled.div`
  border: 1px solid ${(props) => props.theme.colors.titleColor};
  border-radius: 10px;
  background-color: white;
  color: black;
  min-height: 4rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;

const MapInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  @media screen and (max-width: 768px) {
    height: 8rem;
  }
`;

const MapHeader = styled.span`
  margin: 0.5rem 0;
`;

export default HelpDetailInfo;
