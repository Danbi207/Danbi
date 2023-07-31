import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Checkbox = () => {
  const [checkList] = useState(['동성이였으면 좋겠어요']);
  const [ischecked, setIschecked] = useState(false);

  useEffect(()=>{
    console.log(ischecked)
  }, [ischecked])

  return (
    <>    
    <PresetName>선택사항</PresetName>
    <Wrap>
        <InputWrap>
            {checkList.map((item, idx) => (
              <div key={idx}>
                <Input type='checkbox' id={item} onChange={()=>{setIschecked(!ischecked)}}/>
                <Label htmlFor={item} onChange={()=>{setIschecked(!ischecked)}}>{checkList[idx]}</Label>
              </div>
              )) 
            }
        </InputWrap>
    </Wrap>
    </>
  )
}

const Wrap = styled.div `
    line-height: 2rem;
`
const PresetName = styled.div `
    height: 3rem;
    padding: 1rem;
`

const InputWrap = styled.form`
    margin-left: 1rem;  
` 

const Input = styled.input`
  accent-color: #6161FF;
`

const Label = styled.label`
  padding-left: 1rem;
  display: inline-block;
` 


export default Checkbox;