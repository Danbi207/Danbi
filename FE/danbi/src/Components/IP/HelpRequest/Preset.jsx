import React, { useState } from 'react';
import styled from 'styled-components';

const Preset = () => {
  const [content, setContent] = useState('상세내용입니다.');
  const [openIndex, setOpenIndex] = useState(0);

  let preset_list = [
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
    },
    {
      preset_id: 3,
      title: '직접 입력',
      content: '데이터를 입력하세요',
      sequence: 2,
    }
  ];

  const handlePresetSelect = (idx) => {
    setOpenIndex(idx);
    setContent(preset_list[idx].content);
  };

  return (
    <>
      <PresetName>상세정보란</PresetName>
      <Wrap>
        <PresetSelect onChange={(e) => handlePresetSelect(e.target.value)} value={openIndex}>
          {preset_list.map((preset, idx) => (
            <PresetOption key={idx} value={idx}>
              {preset.title}
            </PresetOption>
          ))}
        </PresetSelect>
        <Spacer />
        <PresetTextarea value={content} onChange={(e) => setContent(e.target.value)} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div `
    /* display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem; */

    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex-direction: column;
`
const PresetName = styled.div `
    height: 1rem;
    font-size: 1rem;
    text-align: left;
    margin-left: 1rem;
    margin-top: 1rem;
`

const PresetSelect = styled.select`
  width: 50%;
`

const PresetOption = styled.option`

`

const PresetTextarea = styled.textarea`
  width: 50%;
`

const Spacer = styled.div`
   margin-bottom: 1rem;
`



export default Preset;