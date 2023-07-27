import React, { useState } from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';
import $ from 'jquery';

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
  /* 드래그 앤 드랍 구현 파트 */
  /* 공통 전역 변수  */
  let dragId = ""
  let tagId = ""
  let beforeX;
  let beforeY;
  let afterX;
  let afterY;

  /* 브라우저 단 처리 */
  /* 드랍할 위치에 태그에 다른 이벤트 발생 방지 */
  function allowDrop(evt) {
    evt.preventDefault();
  };

  /* 드래그 시 이벤트 함수 */
  function drag(evt) {
    /* 선택한 div id값 확인 */
    dragId = evt.target.id;

    /* 선택된 div 투명도 조절 */
    document.getElementById(dragId).style.opacity = '0.5';
  };

  /* 드랍 완료 시 이벤트 함수 */
  function drop(evt) {
    evt.preventDefault();

    tagId = evt.target.id;

    select_change(dragId, tagId);
  };

  /* 모바일 단 처리 */
  /* 모바일은 상시 대기로 터치를 확인 */
  window.onload = function() {
    const container_1 = document.getElementById('0');
    const container_2 = document.getElementById('1');

    container_1.addEventListener("touchmove", handleMove, false);
    container_1.addEventListener("touchEnd", handleEnd, false);

    container_2.addEventListener("touchmove", handleMove, false);
    container_2.addEventListener("touchEnd", handleEnd, false);

    /* 터치 이동 이벤트 발생 */
    function handleMove(evt) {
      dragId = evt.targetTouches[0].target.id;

      document.getElementById(dragId).style.opacity = '0.5';

      beforeX = $(this).scrollLeft();
      beforeY = $(this).scrollTop();
    }

    function handleEnd(evt) {
      const divX = evt.changedTouches[0].clientX;
      const divY = evt.changedTouches[0].clientY;

      dropClick(divX, divY);
    }
  }
  function dropClick(x, y) {
    const evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0,0,0,0,0, false, false, false, 0, null);
    const cb = document.elementFromPoint(x, y);
    cb.dispatchEvent(evt);
  }
  $(document).ready(function() {
    $('body').click(function(e){
      tagId = e.target.getAttribute('id');

      if(dragId.length > 0 && tagId.length > 0) {
        select_change(dragId, tagId);
      } else {
        alert(tagId);
      }
    })
  })
  function select_change(drag, drop) {
    if(drag.length > 0 && drop.length > 0) {
      if(drag === 'content_container' || drop === 'content_container'){
        return;
      }
      document.getElementById(drag).style.opacity = '1';
    }
  }

  const [OpenIndex, setOpenIndex] = useState(-1);
  const showDetail = (index) => {
    setOpenIndex(index);
  };
  return (
    <PresetWrap>
      {preset_list.map((value, index) => (
        <Wrap>
          <ElementBtn
            onClick={() => {
              showDetail(index);
            }}
            key={index}
          >
            <PreSetElement>
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
