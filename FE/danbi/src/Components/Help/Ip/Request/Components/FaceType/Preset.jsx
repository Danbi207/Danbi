import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setOpenIndex } from '../../../../../../store/Slice/ipSlice';
import { authGet } from '../../../../../../Util/apis/api';

const Preset = () => {
  const dispatch = useDispatch();
  const [presetList, setPresetList] = useState([]);
  const [selectedContent, setSelectedContent] = useState('');

  const getPresetInfo = useCallback(async () => {
    try {
      const { data } = await authGet("/api/v1/preset");
      setPresetList(data); 
    }
    catch(err) {
      console.log(err.error);
    }
  }, []);

  useEffect(() => {
    getPresetInfo();
  }, [getPresetInfo]);

  const handlePresetSelect = (e) => {
    let idx = parseInt(e.target.value); // convert the string value back to an integer
    if (idx !== 0) {
      setSelectedContent(presetList[idx - 1].content);
    } else {
      setSelectedContent('');
    }
    dispatch(setOpenIndex(idx));
  };

  return (
    <>
      <PresetName>주의사항</PresetName>
      <Wrap>
        <PresetSelect onChange={handlePresetSelect}>
          <PresetOption value={0}>선택해주세요</PresetOption>
          {presetList.map((item, idx) => (
            <PresetOption key={idx + 1} value={idx + 1}>
              {item.title}
            </PresetOption>
          ))}
        </PresetSelect>
        {/* Optionally display the selected content for debugging or other purposes */}
        {/* <div>{selectedContent}</div> */}
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