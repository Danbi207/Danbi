import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setOpenIndex } from '../../../../../../store/Slice/ipSlice'

const Preset = () => {
  const dispatch = useDispatch();
  const openIndex = useSelector(state => state.ip.openIndex)

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

  useEffect(()=>console.log(openIndex),[openIndex]);

  const handlePresetSelect = (e) => {
    let idx = e.target.value; // select에서 value값은 string으로 저장된다.  
    dispatch(setOpenIndex(idx));
  };

  return (
    <>
      <PresetName>주의사항</PresetName>
      <Wrap>
        <PresetSelect onChange={handlePresetSelect}>
          <PresetOption value={0}>선택해주세요</PresetOption>
          {preset_list.map((item, idx) => (
            <PresetOption key={idx+1} value={(idx+1)}>
              {item.title}
            </PresetOption>
          ))}
        </PresetSelect>
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
  border: 1px solid black;
  /* background-color: #D9D9D9; */
`

const PresetOption = styled.option`

`





export default Preset;