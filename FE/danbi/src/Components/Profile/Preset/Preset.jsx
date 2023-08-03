import React, { useState } from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import PresetItem from './PresetItem.jsx';

const Preset = ({preset_list, setPresetList}) => {
  console.log(preset_list);
  const [OpenIndex, setOpenIndex] = useState(-1);
  const showDetail = (index) => {
    setOpenIndex(index);
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
                <Draggable draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <Wrap
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PresetItem value={value} index={index} OpenIndex={OpenIndex} showDetail={showDetail} />
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
`;

export default Preset;
