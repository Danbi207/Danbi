import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';

const preset_list = [
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
  },
];

const isTouchScreen = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const Preset = () => {
  const $ = (select) => document.querySelectorAll(select);
  const draggables = $('.draggable');
  const containers = $('.container');
  if(isTouchScreen) {
    draggables.forEach(el => {
      el.addEventListener('touchstart', () => {
        el.classList.add('touching');
      });
      el.addEventListener('touchend', () => {
        el.classList.remove('touching');
      })
    })
    containers.forEach(container => {
      container.addEventListener('touchmove', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.touching');

    // 아래와 같이 수정해야 원하는 동작이 이루어집니다.
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
      })
    })
    const getDragAfterElement = (container, y) => {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.touching)')]
  
      return draggableElements.reduce((closet, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closet.offset) {
          return {offset: offset, element: child}
        } else {
          return closet
        }
      }, {offset: Number.NEGATIVE_INFINITY}).element
    };
  } else {
    console.log(draggables);
    draggables.forEach(el => {
      el.addEventListener('dragstart', () => {
        el.classList.add('dragging');
      });                                                      
      el.addEventListener('dragend', () => {
        el.classList.remove('dragging')
      });
    })
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging')
  
        container.insertBefore(draggable, afterElement)
      });
    });
  
    const getDragAfterElement = (container, y) => {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
      return draggableElements.reduce((closet, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closet.offset) {
          return {offset: offset, element: child}
        } else {
          return closet
        }
      }, {offset: Number.NEGATIVE_INFINITY}).element
    };
  }

  const [OpenIndex, setOpenIndex] = useState(-1);
  const showDetail = (index) => {
    setOpenIndex(index);
  };
  return (
    <PresetWrap className='container'>
      {preset_list.map((value, index) => (
        <Wrap className='draggable' draggable='true'>
          <ElementBtn
            onClick={() => {
              showDetail(index);
            }}
            key={index}
          >
            <PreSetElement className='el'>
              {value.content ? value.content : `프리셋 ${index + 1}`}
            </PreSetElement>
          </ElementBtn>
          {OpenIndex === index && (
            <PresetDetail
              key={index}
              content={preset_list[index].content}
              showDetail={showDetail}
            />
          )}
        </Wrap>
      ))}
    </PresetWrap>
  );
};

const PresetWrap = styled.div`
  width: 19rem;
  height: 1.5rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 0.5rem;
`;

const ElementBtn = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 0.25rem;
`;

const PreSetElement = styled.div`
  width: 100%;
  height: 100%;
`;

export default Preset;
