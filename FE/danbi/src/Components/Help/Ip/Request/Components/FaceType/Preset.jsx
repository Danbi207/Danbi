import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { authGet } from '../../../../../../Util/apis/api';
import { useDispatch } from 'react-redux';
import { setCaution } from '../../../../../../store/Slice/ipSlice'
import { useSelector } from 'react-redux';

const Preset = () => {
  const dispatch = useDispatch();
  const [presetList, setPresetList] = useState([]);
  const caution = useSelector(state => state.ip.caution)

  const getPresetInfo = useCallback(async () => {
    try {
      const data = await authGet("/api/v1/preset");
      if (data){
        console.log(data);
        setPresetList(data.presetList); // data를 업데이트
      }
      else {
        console.log('안되는 중')
      }
    }
    catch(err) {
      console.log(err.error);
    }
  }, []);

  useEffect(() => {
    getPresetInfo();
  }, [getPresetInfo]);

  const handlePresetSelect = (e) => {
    let idx = parseInt(e.target.value); // 문자열을 숫자로 다시 포매팅
    if (idx !== 0) {
      dispatch(setCaution(presetList[idx-1].content));
      console.log(caution)
    } else {
      dispatch(setCaution(''));
    }
  };

  return (
    <>
      <PresetName>주의사항</PresetName>
      <Wrap>
        <PresetSelect onChange={handlePresetSelect}>
          <PresetOption value={0}>선택해주세요</PresetOption>
            {presetList && presetList.map((item, idx) => (
            <PresetOption key={idx + 1} value={idx + 1}>
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
`

const PresetOption = styled.option`

`

export default Preset;