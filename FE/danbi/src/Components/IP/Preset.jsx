import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Preset = () => {
  const contentRef = useRef();
  const [content, setContent] = useState('');
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
  ];

    return (
      <>
      <PresetName>상세정보란</PresetName>
      <Wrap>
        
        <select>
            {preset_list.map((a, idx) => <option key={idx} value={idx}>{a.title}</option>)}
            <option >직접입력</option>

        </select>

      </Wrap>
      </>
  )
}

const Wrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
`
const PresetName = styled.div `
    height: 1rem;
    font-size: 1rem;
    text-align: left;
    margin-left: 1rem;
    margin-top: 1rem;
`

export default Preset;