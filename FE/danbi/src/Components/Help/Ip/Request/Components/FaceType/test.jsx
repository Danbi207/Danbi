import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { authGet } from '../../../../../../Util/apis/api';

// 달력 커스텀
const customStyles = {
  // container: (provided, state) => ({
  //   ...provided,
  //   display: 'inline-block',
  //   marginRight : '1rem',
  //   marginLeft : '1rem',
  // }),
    control : (provided) => ({
        ...provided,
        width : '15rem',
        height : '2rem',
    }),
    option : (provided, state) => ({
        ...provided,
        width : '15rem',
        height : '2rem',
    }),
    indicatorSeparator : (provided) => ({
      ...provided,
      // display : 'inline-block'
    })
}

const Preset = () => {
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
  }, []);

  // presetList가 존재하면 변환, 없으면 빈 배열을 반환
  const options = presetList.length ? presetList.map(item => ({
    value: item.content,
    label: item.content
  })) : [];

  return (
    <SelctWrap>
      <PresetName>시작 시간</PresetName>
      <Wrap>
        <StyledSelect
          onChange={(selectedOption) => setSelectedContent(selectedOption ? selectedOption.value : '')}
          placeholder="주의 사항 설정"
          options={options}
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
  justify-content: center;
`

const PresetName = styled.div`
  height: 3rem;
  padding: 2rem 0;
`

const StyledSelect = styled(Select)`
  width: 15rem;
  height: 2rem;
  border-radius: 1rem;
`

export default Preset;