import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { setCategory } from '../../../store/Slice/ipSlice'

const Positioin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector(state => state.ip.category);
  const position = useSelector(state => state.ip.position);

  const handleCategory = (e) => {
    console.log(e.target.value);
    dispatch(setCategory(e.target.value));
  };
  
  return (
    <Wrap>
      <CategorySelect defaultValue='NONE' onChange={handleCategory}>
        <CategoryOption value='NONE' disabled>카테고리를 선택하세요</CategoryOption>
          <CategoryOption value='MOBILE'>이동</CategoryOption>
          <CategoryOption value='ETC'>기타</CategoryOption>
      </CategorySelect>
      <Destination type='text' readOnly placeholder='만나는 곳을 입력하세요' 
        value={position.meet_addr} onClick={()=>{navigate('/ipmap/0')}}/>
      {category === 'MOBILE' && (
        <Destination type='text' readOnly placeholder='목적지를 입력하세요' 
        value={position.dest_addr} onClick={()=>{navigate('/ipmap/1')}}/>
      )}
    </Wrap>
  );
};

const Wrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex-direction: column;
`

const CategorySelect = styled.select`
  width: 60%;
  height: 2rem;
  border: 1px solid black;
  /* background-color: #D9D9D9; */
`

const CategoryOption = styled.option`
  width: 60%;
  height: 2rem;
`

const Destination = styled.input`
    width: 60%;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid black;
`

export default Positioin;