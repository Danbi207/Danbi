import React from 'react';
import styled from 'styled-components';

const PickButton = () => {
    return(
        <PickWrap>
            <PickBtn>
                뽑기
            </PickBtn>
        </PickWrap>
    );
}

const PickWrap = styled.div`
`

const PickBtn = styled.button`
    background-color: #6161FF;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 10px;
`

export default PickButton