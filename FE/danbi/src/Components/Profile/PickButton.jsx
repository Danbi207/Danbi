import React from 'react';
import styled from 'styled-components';

const PickButton = ({setPickModalOpen}) => {
    const PickShowModal = () => {
        setPickModalOpen(true);
    }
    return(
        <PickWrap>
            <PickBtn onClick={PickShowModal}>
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
    width:3rem;
    height: 3rem;
    font-size: 20px;
    text-align: center;

`

export default PickButton