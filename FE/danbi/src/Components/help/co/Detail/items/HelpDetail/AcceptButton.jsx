import React from 'react';
import styled from 'styled-components';

const AcceptButton = () => {
    return(
        <AcceptButtonWrap>
            수락하기
        </AcceptButtonWrap>
    );
}

const AcceptButtonWrap = styled.button`
    font-size: 24px;
    background-color: #FFEA7E;
    width: 15.5rem;
    height: 2rem;
    border-radius: 10px;
`

export default AcceptButton