import React, { useState, useEffect } from 'react';
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

const Preset = () => {
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const onMouseDown = (e) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientY < mouseDownClientY) {
        console.log('dragging');
      } else if (mouseUpClientY > mouseDownClientY) {
        console.log('dragging');
      }
    }
  }, [mouseUpClientX, mouseDownClientY, mouseUpClientX, mouseUpClientY]);

  const [touchedX, setTouchedX] = useState(0);
  const [touchedY, setTouchedY] = useState(0);

  const onTouchStart = (e) => {
    setTouchedX(e.changedTouches[0].pageX);
    setTouchedY(e.changedTouches[0].pageY);
  };

  const onTouchEnd = (e) => {
    const distanceX = touchedX - e.changedTouches[0].pageX;
    const distanceY = touchedY - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    if (distanceY > 30 && vector > 2) {
      console.log('touching');
    } else if (distanceY < -30 && vector > 2) {
      console.log('touching');
    }
  };

  const [OpenIndex, setOpenIndex] = useState(-1);
  const showDetail = (index) => {
    setOpenIndex(index);
  };
  return (
    <PresetWrap className="container">
      {preset_list.map((value, index) => (
        <Wrap
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          <ElementBtn
            onClick={() => {
              showDetail(index);
            }}
            key={index}
          >
            <PreSetElement className="el">
              {value.content ? value.content : `프리셋 ${index + 1}`}
            </PreSetElement>
          </ElementBtn>
          {OpenIndex === index && (
            <PresetDetail content={preset_list[index].content} showDetail={showDetail} />
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
