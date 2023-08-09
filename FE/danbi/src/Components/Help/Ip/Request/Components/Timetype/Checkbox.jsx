import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {setIsChecked} from '../../../../../../store/Slice/ipSlice';

const Checkbox = () => {
  const dispatch = useDispatch();
  const ischecked = useSelector(state => state.ip.ischecked);

  // useEffect(()=>{
  //   console.log(ischecked)
  // }, [ischecked])

  return (
    <>    
    <PresetName>선택사항</PresetName>
    <Wrap>
        <InputWrap>
            <Input type='checkbox' id='check' onChange={()=>{dispatch(setIsChecked(!ischecked))}}/>
            <Label htmlFor='check' onChange={()=>{dispatch(setIsChecked(!ischecked))}}>동성이였으면 좋겠어요</Label>
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
    padding: 2rem 0;
`

const InputWrap = styled.form`
    margin-left: 1rem;  
` 

const Input = styled.input`
  accent-color: ${props => props.theme.colors.buttonbgColor};
`
const Label = styled.label`
  padding-left: 1rem;
  /* display: inline-block; */
` 


export default Checkbox;