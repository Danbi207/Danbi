import React from 'react';
import styled from 'styled-components';

const PresetDetail = ({content, showDetail}) => {
    const CloseDetail = () => {
        showDetail(-1)
    }
    const SaveDetail = () => {
        showDetail(-1);
        alert('저장되었습니다.')
    }
    return(
        <PresetDetailWrap>
            <DetailTextArea>
                {content}
            </DetailTextArea>
            <Btns>
                <CancleBtn onClick={CloseDetail}>
                    취소
                </CancleBtn>
                <SaveBtn onClick={SaveDetail}>
                    수정
                </SaveBtn>
            </Btns>
        </PresetDetailWrap>
        
    );
}

const PresetDetailWrap = styled.div`

`

const DetailTextArea = styled.textarea`
    height: 6rem;
    border: 1px solid white;
    border-radius: 5px;
    background-color: transparent;
    color: white;
    text-align: center;
    padding: 0.5rem 0;
    outline: none;
    resize: none;
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

export default PresetDetail