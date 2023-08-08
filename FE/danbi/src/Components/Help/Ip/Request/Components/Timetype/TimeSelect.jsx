import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { setCurrentTime } from '../../../../../../store/Slice/ipSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

let hours = [];
for (let i = 6; i < 24; i++){
    let op = {};
    op.value = (i)
    op.label = ('0' + i).slice(-2) + '시';
    hours.push(op);
}

let minutes = [];
for (let i = 0; i < 60; i =i+5){
  let op = {};
  op.value = (i)
  op.label = ('0' + i).slice(-2) + '분';
  minutes.push(op);
}

// 달력 커스텀
const customStyles = {
  container: (provided, state) => ({
    ...provided,
    display: 'inline-block',
    marginRight : '1rem',
    marginLeft : '1rem',
  }),
    control : (provided) => ({
        ...provided,
        width : '8rem',
        height : '2rem',
        borderRadius : '1rem'
    }),
    option : (provided, state) => ({
        ...provided,
        width : '8rem',
        height : '2rem',
    }),
    indicatorSeparator : (provided) => ({
      ...provided,
      display : 'inline-block'

    })
}

const TimeSelect = () => {
  const [hourvalue, setHourValue] = useState('');
  const [minutevalue, setMinuteValue] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCurrentTime([hourvalue, minutevalue]))
    console.log([hourvalue, minutevalue])
  },[hourvalue, minutevalue, dispatch])

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

export default TimeSelect;
