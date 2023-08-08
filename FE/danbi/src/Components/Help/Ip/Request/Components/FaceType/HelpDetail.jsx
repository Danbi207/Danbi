import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import {setContent} from '../../../../../../store/Slice/ipSlice'


const HelpDetail = () => {
  const dispatch = useDispatch();
  const content = useSelector(state => state.ip.content)


  useEffect(() => 
    console.log(content),[content]);


  return (
    <>
        <PresetName>도움 상세 정보</PresetName>
        <Wrap>
            <PresetTextarea value={content} placeholder='이동 하는데 도움을 받고 싶어요!' 
              onChange={(e) => dispatch(setContent(e.target.value))} />
        </Wrap>
    </>
  )
}

const PresetName = styled.div `
    height: 3rem;
    padding: 1rem;
`

const Wrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    flex-direction: column;
`

const PresetTextarea = styled.textarea`
  width: 70%;
  height: 5rem;
  /* background-color: #D9D9D9; */
  border: 1px solid black;
  resize: none;
  overflow-y:scroll
`


export default HelpDetail;