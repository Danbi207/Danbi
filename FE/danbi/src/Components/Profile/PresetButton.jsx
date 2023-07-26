import React from 'react';
import styled from 'styled-components';

const PresetButton = ({ setModalOpen, ModalOpen }) => {
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
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Btn = styled.button`
  width: 100%;
  margin: 0 1rem;
  border-radius: 5px;
  color: black;
  background-color: white;
  font-size: 17px;
`;

export default PresetButton;
