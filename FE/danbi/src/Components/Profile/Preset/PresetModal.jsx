import React, { useState } from 'react';
import styled from 'styled-components';
import back from '../Back.svg';
import Save from '../Button.svg';
import PresetTextArea from './PresetTextArea';
import Preset from './Preset.jsx';

const PresetModal = ({ setModalOpen }) => {
  const closeBtn = () => {
    setModalOpen(false);
  };
  const [OpenTextArea, setOpenTextArea] = useState(false);
  const showTextArea = () => {
    setOpenTextArea(true);
  };


  const [presetList, setPresetList] = useState([
    {
      preset_id: 1,
      title: '1asdf',
      content: '123saf',
      sequence: 0,
    },
    {
      preset_id: 2,
      title: '김민규는 쓰레기입니다.',
      content: '끼잉 낑.',
      sequence: 1,
    }
  ])
  return (
    <PresetModalWrap>
      <Modal>
        <ModalHeader>
          <CloseModalBtn onClick={closeBtn}>
            <CloseImg src={back} />
          </CloseModalBtn>
          <ModalName>프리셋 설정</ModalName>
          <SaveBtn>
            <SaveImg src={Save} />
          </SaveBtn>
        </ModalHeader>
        <ModalBody>
          <PresetAddBtn onClick={showTextArea}>추가하기</PresetAddBtn>
          {OpenTextArea && <PresetTextArea setOpenTextArea={setOpenTextArea} />}
        </ModalBody>
        <ModalFooter>
          <Preset preset_list={presetList} setPresetList={setPresetList} />
        </ModalFooter>
      </Modal>
    </PresetModalWrap>
  );
};

const PresetModalWrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: block;
`;

const Modal = styled.div`
  width: 92%;
  height: 21rem;
  background-color: #19191b;
  position: absolute;
  top: 25%;
  margin: 0 4%;
  overflow-y: auto;
  border-radius: 15px;
`;

const ModalHeader = styled.div`
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;
const CloseModalBtn = styled.button`
  width: 40px;
  height: 40px;
`;

const CloseImg = styled.img``;

const ModalName = styled.div`
  text-align: center;
`;

const SaveBtn = styled.button`
  width: 48px;
  height: 40px;
`;
const SaveImg = styled.img``;

const ModalBody = styled.div`
  height: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const PresetAddBtn = styled.button`
  width: 19rem;
  height: 2rem;
  border-radius: 10px;
  background-color: #6161ff;
`;

const ModalFooter = styled.div`
  display: flex;
  margin-top: 2.5rem;
  justify-content: center;
  text-align: center;
`;

export default PresetModal;
