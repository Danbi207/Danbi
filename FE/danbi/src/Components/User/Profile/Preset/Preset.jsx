import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PresetItem from './PresetItem.jsx';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../../store/Slice/ModalSlice.js';

const Preset = ({ preset_list, setPresetList }) => {
  console.log(preset_list);
  const [OpenTitle, setOpenTitle] = useState(-1);
  const [OpenDetail, setOpenDetail] = useState(-1);
  const showDetail = (title) => {
    setOpenTitle(title);
  };

  const showDetailWithIndex = (index) => {
    setOpenDetail(index);
  };

  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...preset_list];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPresetList(items);
  };


  const dispatch = useDispatch();
  const commandMode = useSelector((state) => state.modal.mode);

  const commands = [
    {
      command: '단비',
      callback: () => {
        if (commandMode === null) {
          dispatch(setMode('stt'));
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '1번',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          showDetailWithIndex(0);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '2번',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          showDetailWithIndex(0);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: '3번',
      callback: () => {
        if (commandMode === 'stt') {
          dispatch(setMode(null));
          showDetailWithIndex(0);
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
  ];
  const { browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      //STT가 지원하는 경우
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  }, [browserSupportsSpeechRecognition]);

  return (
    <DragDropContext onDragEnd={handleChange}>
      <PresetWrap className="container">
        <Droppable droppableId="box">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {preset_list.map((value, index) => (
                <Draggable draggableId={index.toString()} index={index} key={index}>
                  {(provided, snapshot) => (
                    <Wrap
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={index}
                      $isDragging={snapshot.isDragging}
                    >
                      <PresetItem
                        value={value}
                        index={index}
                        OpenTitle={OpenTitle}
                        key={value.title}
                        showDetail={showDetail}
                        setPresetList={setPresetList}
                        OpenDetail={OpenDetail}
                      />
                    </Wrap>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </PresetWrap>
    </DragDropContext>
  );
};

const PresetWrap = styled.div`
  width: 19rem;
  height: 1.5rem;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: auto;
  margin-bottom: 0.5rem;
  transform: ${(props) => (props.$isDragging ? 'scale(1.1)' : 'scale(1)')};
`;

export default Preset;
