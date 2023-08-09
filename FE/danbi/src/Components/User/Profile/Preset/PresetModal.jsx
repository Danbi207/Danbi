import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PresetTextArea from './PresetTextArea';
import Preset from './Preset.jsx';
import { authGet, authPost } from '../../../../Util/apis/api';

const PresetModal = ({ setModalOpen }) => {
  const closeBtn = () => {
    setModalOpen(false);
  };
  const [OpenTextArea, setOpenTextArea] = useState(false);
  const showTextArea = () => {
    setOpenTextArea(!OpenTextArea);
  };
  
  // TODO : presetList 조회
  const [presetList, setPresetList] = useState([]);
  
  const fetchData = useCallback(async () => {
    try{
    const data = await authGet('/api/v1/preset');
    setPresetList(data.presetList);
    } catch(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    console.log(presetList);
  }, [fetchData]);

  const handleSave = async () => {
    const config = {"presets" : [...presetList.map((e, idx) => {return {"id": e.id, "sequence": idx}})]};
    await authPost(`/api/v1/preset/sequence`, config);
  }

  return (
    <PresetModalWrap>
      <Modal>
        <ModalHeader>
          <CloseModalBtn onClick={closeBtn}>
            <CloseImg />
          </CloseModalBtn>
          <ModalName>프리셋 설정</ModalName>
          <SaveBtn onClick={handleSave}>
            <SaveImg />
          </SaveBtn>
        </ModalHeader>
        <ModalBody>
          <PresetAddBtn onClick={showTextArea}>추가하기</PresetAddBtn>
          {(OpenTextArea && presetList.length < 3) && <PresetTextArea setOpenTextArea={setOpenTextArea} OpenTextArea={OpenTextArea} fetchData={fetchData} length={presetList.length} />}
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
  background-color: ${props => props.theme.colors.bgColor};
  position: absolute;
  top: 25%;
  margin: 0 4%;
  overflow-y: auto;
  border-radius: 15px;
  border: 0.5px solid black;
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

const CloseImg = styled.img.attrs(props => ({
  src: props.theme.images.close
}))``;

const ModalName = styled.div`
  text-align: center;
`;

const SaveBtn = styled.button`
  width: 48px;
  height: 40px;
`;
const SaveImg = styled.img.attrs(props => ({
  src: props.theme.images.save
}))``;

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
