import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Positioin = () => {
  const meetType = useSelector(state => state.ip.meetType);
  const category = useSelector(state => state.ip.category);

  return (
        <Wrap>
          {
            meetType === 'noface' ?
            <>
              <CategorySelect>
              <CategoryOption value="none">카테고리를 선택하세요</CategoryOption>
                {
                  category.map((item, idx) => (
                    <CategoryOption key={idx} value={item}>
                      {item}
                    </CategoryOption>
                  ))
                }
              </CategorySelect>
              <Destination type='text' readOnly placeholder='만나는 곳을 입력하세요'></Destination>
            </> :
            <>
              <CategorySelect>
                <CategoryOption value="none">카테고리를 선택하세요</CategoryOption>
                  {
                    category.map((item, idx) => (
                      <CategoryOption key={idx} value={item}>
                        {item}
                      </CategoryOption>
                    ))
                  }
                </CategorySelect>
              <Destination type='text' readOnly placeholder=' 만나는 곳을 입력하세요'></Destination>
              <Destination type='text' readOnly placeholder=' 목적지를 입력하세요'></Destination>
            </>
          }
        </Wrap>
  )
}

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