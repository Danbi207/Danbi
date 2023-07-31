import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';

const Preset = () => {
  const [content, setContent] = useState('');
  const [openIndex, setOpenIndex] = useState("0");

  let preset_list = [
    {
      preset_id: 1,
      title: '1asdf',
      content: '123saf',
      sequence: 1,
    },
    {
      preset_id: 2,
      title: '김민규는 쓰레기입니다.',
      content: '끼잉 낑.',
      sequence: 2,
    },
    
  ];

  useEffect(()=>console.log(content),[content]);

  const handlePresetSelect = (e) => {
    let idx = e.target.value; // select에서 value값은 string으로 저장된다.  
    setOpenIndex(idx);
    if (idx === "0"){setContent("")}
    else {setContent(preset_list[idx-1].content);} //preset idx는 1부터 시작 -> idx--해야함
  };

  return (
    <>
      <PresetName>주의사항</PresetName>
      <Wrap>
        <PresetSelect onChange={handlePresetSelect}>
          <PresetOption value={"0"}>선택해주세요</PresetOption>
          {preset_list.map((preset, idx) => (
            <PresetOption key={idx+1} value={(idx+1)+""}>
              {preset.title}
            </PresetOption>
          ))}
        </PresetSelect>
        {/* <Spacer />
        <PresetTextarea readOnly={openIndex!=="0"} value={content} placeholder='저는 휠체어를 타고 있어요 저는 ~~~~' onChange={(e) => setContent(e.target.value)} /> */}
      </Wrap>
    </>
  );
};

const Wrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex-direction: column;
`
const PresetName = styled.div `
    height: 3rem;
    padding: 1rem;
`

const PresetSelect = styled.select`
  width: 70%;
  height: 3rem;
  /* border: 3px solid black;s */
  /* background-color: #D9D9D9; */
`

const PresetOption = styled.option`

`

const PresetTextarea = styled.textarea`
  width: 70%;
  height: 5rem;
  resize: none;
`

const Spacer = styled.div`
   margin-bottom: 1rem;
`



export default Preset;