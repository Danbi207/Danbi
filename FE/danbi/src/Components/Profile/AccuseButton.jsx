import React from 'react';
import styled from 'styled-components';
import accuseimg from './Accuse.svg';

const AccuseButton = () => {
    return(
      <AccuseWrap>
        <AccuseImg src={accuseimg} />
      </AccuseWrap>
    )
}

const AccuseWrap = styled.button`
    width: 2.4rem;
    height: 2rem;
    background-color: #E85151;
    border-radius: 10px;
`

const AccuseImg = styled.img`
    width: 90%;
    height: 90%;
`

export default AccuseButton