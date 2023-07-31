import React, { useEffect, useState } from 'react'
import styled from 'styled-components'



const HelpDetail = () => {
  const [content, setContent] = useState(''); 

  useEffect(()=>console.log(content),[content]);


  return (
    <>
        <PresetName>도움 상세 정보</PresetName>
        <Wrap>
            <PresetTextarea value={content} placeholder='이동 하는데 도움을 받고 싶어요!' onChange={(e) => setContent(e.target.value)} />
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
  resize: none;
`


export default HelpDetail;