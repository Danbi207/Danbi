import React from 'react';
import styled from 'styled-components';
import accuseimg from './MdReport.svg';

const AccuseButton = () => {
  return (
    <AccuseWrap>
      <AccuseImg src={accuseimg} />
    </AccuseWrap>
  );
};

const AccuseWrap = styled.button`
  width: 2.4rem;
  height: 2rem;
  background-color: #FF0000;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccuseImg = styled.img`
  width: 90%;
  height: 90%;
`;

export default AccuseButton;
