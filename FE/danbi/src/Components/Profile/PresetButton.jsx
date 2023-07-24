import React from "react";
import styled from 'styled-components';

const PresetButton = () => {
    return (
        <PresetBtnWrap>
            <Btn>
                프리셋 설정
            </Btn>
        </PresetBtnWrap>
    )
}

const PresetBtnWrap = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`

const Btn = styled.button`
    margin: 0 1rem;
    border-radius: 5px;
    color: black;
    background-color: white;
    font-size: 17px;
`

export default PresetButton