import React from 'react';
import styled from 'styled-components';

const PresetTextArea = ({setOpenTextArea}) => {
    const SavePreset = () => {
        setOpenTextArea(false);
    }
    const ClosePreset = () => {
        setOpenTextArea(false);
    }

    return(
        <TextAreaWrap>
                <TextArea placeholder='저는 휠체어를 타고 있습니다.
조심해서 밀어주세요!' />
            <Btns>
                <CancleBtn onClick={ClosePreset}>
                    취소
                </CancleBtn>
                <SaveBtn onClick={SavePreset}>
                    저장
                </SaveBtn>
            </Btns>
        </TextAreaWrap>
    )
}

const TextAreaWrap = styled.div`
    width: 19rem;
    height: 6rem;
    margin-top: 1.5rem;
`

const TextArea = styled.textarea`
    border: 1px solid white;
    border-radius: 10px;
    resize: none;
    background-color: transparent;
    color: white;
    text-align: center;
    outline: none;
    word-break: break-word;
    padding: 0.5rem 0;
    width: 100%;
    &::placeholder{
        color: #8E8B8B;
    }
    ::-webkit-scrollbar{
        display: none;
    }
`

const Btns = styled.div`
    display: flex;
    justify-content: end;
`

const SaveBtn = styled.button`
    width: 3.5rem;
    height: 1rem;
    background-color: #6161FF;
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
`

const CancleBtn = styled.button`
   width: 3.5rem;
    height: 1rem;
    background-color: #DADADA;
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
    color: black;
`

export default PresetTextArea