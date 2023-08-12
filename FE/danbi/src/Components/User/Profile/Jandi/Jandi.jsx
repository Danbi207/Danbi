import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from './Buttons.jsx';
import {
  setCheckedRgb,
  setUnchedkedRgb,
  setTier,
  setName,
  setDewPoint,
} from '../../../../store/Slice/JandiSlice.js';

const Jandi = ({
  help_log,
  setPickModalOpen,
  item,
  userId,
  dewPoint,
  accumulatePoint,
}) => {
  console.log(help_log);
  const colCnt = 8;
  const rowCnt = 2;

  const nowScreenWidth = window.innerWidth;

  const overLay = {
    x: 0,
    y: 0,
    show: false,
    content: '',
    idx: -1,
  };

  const HelpOver = {
    x: 0,
    y: 0,
    show: false,
  };

  const [page, setPage] = useState(0); // 이전, 다음 버튼
  const [selectIdx, setSelectIdx] = useState(-1); // 잔디 선택
  const [ShowOverLay, setShowOverLay] = useState(overLay); // 잔디 날짜
  const [ShowHelp, setShowHelp] = useState(HelpOver); // ? 아이콘

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCheckedRgb(item.checkedRgb));
    dispatch(setUnchedkedRgb(item.uncheckedRgb));
    dispatch(setName(item.name));
    dispatch(setTier(item.ranking));
    dispatch(setDewPoint(dewPoint));
  }, [item]);

  const cur_UncheckedColor = useSelector((state) => state.Jandi.item.uncheckedRgb);
  const cur_CheckedColor = useSelector((state) => state.Jandi.item.checkedRgb);

  const onGross = (e, idx) => {
    if (selectIdx !== idx) {
      setSelectIdx(idx);
      console.log(typeof selectIdx);
    } else {
      setSelectIdx(-1);
    }
    setShowOverLay({
      x: e.clientX,
      y: e.clientY,
      show: idx !== ShowOverLay.idx,
      idx,
      content: help_log[idx].createdTime,
    });
  };
  const GrossItems = useMemo(() => {
    const res = [];
    for (let i = page * colCnt * rowCnt; i < (page + 1) * colCnt * rowCnt; i++) {
      if (i < help_log.length) {
        res.push(
          <GrossItem
            $defaultIdx={i}
            $selectIdx={selectIdx}
            $show={ShowOverLay}
            key={i}
            $checkColor={cur_CheckedColor}
            $uncheckColor={cur_UncheckedColor}
            onClick={(e) => onGross(e, i)}
          ></GrossItem>
        );
      } else {
        res.push(<EmptyItem key={i}></EmptyItem>);
      }
    }
    return res;
  }, [
    page,
    help_log,
    selectIdx,
    cur_CheckedColor,
    cur_UncheckedColor,
    ShowOverLay,
    onGross,
  ]);

  const prevGross = () => {
    if (page !== 0) setPage(page - 1);
    setSelectIdx(-1);
    setShowOverLay({
      idx: -1,
    });
  };

  const nextGross = () => {
    if (Math.floor(help_log.length / (colCnt * rowCnt)) !== page) {
      setPage(page + 1);
    }
    setSelectIdx(-1);
    setShowOverLay({
      idx: -1,
    });
  };

  const handleHelp = (e) => {
    setShowHelp({
      x: e.clientX,
      y: e.clientY,
      show: !ShowHelp.show,
    });
  };

  return (
    <ChartWrap>
      <ChartHeader>
        <ChartTitle>나의 도움을 기록해주세요</ChartTitle>
        <HelpIcon onClick={(e) => handleHelp(e)} />
      </ChartHeader>
      <GrossWrap $col={colCnt} $row={rowCnt}>
        {GrossItems}
      </GrossWrap>
      <Buttons
        prevGross={prevGross}
        nextGross={nextGross}
        setPickModalOpen={setPickModalOpen}
        targetId={userId}
        accumulatePoint={accumulatePoint}
      />
      {ShowOverLay.show && (
        <OverRayWrap $position={ShowOverLay} $nowScreenWidth={nowScreenWidth}>
          {ShowOverLay.content}
        </OverRayWrap>
      )}
      {ShowHelp.show && (
        <HelpOverLay $position={ShowHelp}>
          도움 포인트(DEW)를 <br />
          사용해서 그래프를 꾸며보세요.
        </HelpOverLay>
      )}
    </ChartWrap>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 1rem 1rem 0 1rem;
  position: relative;
`;

const ChartHeader = styled.div`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const GrossWrap = styled.div`
  display: grid;
  width: 100%;
  height: 5rem;
  grid-template-columns: repeat(${(props) => props.$col}, 1fr);
  grid-template-rows: repeat(${(props) => props.$row}, 1fr);
`;

const GrossItem = styled.div`
  background-color: ${(props) =>
    props.$selectIdx === props.$defaultIdx && props.$show.show
      ? props.$checkColor
      : props.$uncheckColor};
  border: 1px solid #000;
  border-radius: 8px;
  margin-right: 1px;
  margin-top: 1px;
`;

const EmptyItem = styled.div`
  background-color: ${(props) => props.theme.colors.titleColor};
  border: 1px solid #000;
  border-radius: 8px;
  margin-right: 1px;
  margin-top: 1px;
`;

const OverRayWrap = styled.div`
  background-color: rgba(128, 128, 128, 0.25);
  position: fixed;
  width: auto;
  height: auto;
  top: ${(props) => props.$position.y}px;
  left: ${(props) =>
    props.$position.x > props.$nowScreenWidth / 2
      ? `${props.$position.x - 100}px`
      : `${props.$position.x}px`};
`;

const ChartTitle = styled.span``;
const HelpIcon = styled.img.attrs((props) => ({
  src: props.theme.images.help,
}))``;
const HelpOverLay = styled.span`
  background-color: gray;
  position: fixed;
  top: ${(props) => props.$position.y}px;
  left: ${(props) => props.$position.x}px;
  white-space: pre;
`;

export default Jandi;
