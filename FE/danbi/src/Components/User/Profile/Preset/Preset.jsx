import React, { useState } from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import PresetItem from './PresetItem.jsx';

const Preset = ({preset_list, setPresetList}) => {
  console.log(preset_list);
  const [OpenTitle, setOpenTitle] = useState(-1);
  const showDetail = (title) => {
    setOpenTitle(title);
  };
  
  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...preset_list];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPresetList(items);
  };

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
                      <PresetItem setPresetList={setPresetList} value={value} index={index} OpenTitle={OpenTitle} key={value.title} showDetail={showDetail} />
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
}

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
  transform: ${props => props.$isDragging ? 'scale(1.1)' : 'scale(1)'};
`;

export default Preset;
