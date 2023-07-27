import React, { useState } from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';

const preset_list = [
  {
    preset_id: 1,
    title: '1asdf',
    content: '123saf',
    sequence: 0,
  },
  {
    preset_id: 2,
    title: '김민규는 쓰레기입니다.',
    content: '끼잉 낑.',
    sequence: 1,
  }
];

const Preset = () => {
  const [OpenIndex, setOpenIndex] = useState(-1);
  const showDetail = (index) => {
    setOpenIndex(index);
  };
  return (
    <PresetWrap>
      {preset_list.map((value, index) => (
        <Wrap>
          <ElementBtn
            onClick={() => {
              showDetail(index);
            }}
            key={index}
          >
            <PreSetElement>
              {value.content ? value.content : `프리셋 ${index + 1}`}
            </PreSetElement>
          </ElementBtn>
          {OpenIndex === index && (
            <PresetDetail
              key={index}
              content={preset_list[index].content}
              showDetail={showDetail}
            />
          )}
        </Wrap>
      ))}
    </PresetWrap>
  );
};

const PresetWrap = styled.div`
  width: 19rem;
  height: 1.5rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 0.5rem;
`;

const ElementBtn = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 0.25rem;
`;

const PreSetElement = styled.div`
  width: 100%;
  height: 100%;
`;

export default Preset;
