import React,{ useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';


const test = () => {
  const [presetList, setPresetList] = useState([]);
  const [selectedContent, setSelectedContent] = useState('');

  const getPresetInfo = useCallback(async () => {
    try {
      const {data} = await authGet("/api/v1/preset");
      setPresetList(data); // data를 업데이트
    }
    catch(err) {
      console.log(err.error);
    }
  }, []);

  useEffect(() => {
    getPresetInfo();
  }, [getPresetInfo]);

  return (
    <SelctWrap>
    <PresetName>시작 시간</PresetName>
    <Wrap>
      <StyledSelect
        onChange={(selectedOption) => setHourValue(selectedOption ? selectedOption.value : '')}
        placeholder="시간"
        options={hours}
        styles={customStyles}
      />
      <StyledSelect
        onChange={(selectedOption) => setMinuteValue(selectedOption ? selectedOption.value : '')}
        placeholder="분"
        options={minutes}
        styles={customStyles}
      />
    </Wrap>
  </SelctWrap>
  )
}

const SelctWrap = styled.div`
  width: 100%;
  height: 30%;
  /* background-color: red; */
`
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
`

const PresetName = styled.div`
  height: 3rem;
  padding: 2rem 0;
`

const StyledSelect = styled(Select)`
  width: 8rem;
  height: 2rem;
  border-radius: 1rem;
`

export default test;