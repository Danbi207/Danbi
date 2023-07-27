import React from 'react';
import styled from 'styled-components';

const PresetButton = ({ setModalOpen }) => {
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <PresetBtnWrap>
      <Btn onClick={showModal}>프리셋 설정</Btn>
    </PresetBtnWrap>
  );
};

const PresetBtnWrap = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Btn = styled.button`
  width: 100%;
  height: 2rem;
  margin: 0 1rem;
  border-radius: 5px;
  color: ${props =>  props.theme.colors.buttontextColor};
  background-color: ${props => props.theme.colors.buttonbgColor};
  font-size: 17px;
`;

export default PresetButton;
