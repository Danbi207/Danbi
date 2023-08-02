import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components';
import { setTier, setCheckedRgb, setUnchedkedRgb,setName, setDewPoint } from '../../store/Slice/JandiSlice';
import { useDispatch, useSelector } from 'react-redux';

const Jandi = ({help_log, setPickModalOpen, point}) => {  
  const colCnt = 8;
  const rowCnt = 2;
  
  const nowScreenWidth = window.innerWidth;

  const overLay = {
    x: 0,
    y: 0,
    show: false,
    content: "",
    idx: -1,
  };

  const [page,setPage]=useState(0);
  const [selectIdx,setSelectIdx] = useState(-1);
  const [ShowOverLay, setShowOverLay] = useState(overLay);
  
  const cur_dew = useSelector((state) => state.Jandi.dew_point);
  const cur_UncheckedColor = useSelector((state) => state.Jandi.item.uncheckedRgb);
  const cur_CheckedColor = useSelector((state) => state.Jandi.item.checkedRgb);
  const cur_Name = useSelector((state) => state.Jandi.item.name);
  const cur_Tier = useSelector((state) => state.Jandi.item.tier);

  const onGross = (e,idx)=>{
    if(selectIdx !== idx){
      setSelectIdx(idx);
      console.log(typeof selectIdx)
    } else {
      setSelectIdx(-1);
    }
    setShowOverLay({
      x: e.clientX,
      y: e.clientY,
      show: idx !== ShowOverLay.idx,
      idx,
      content: help_log[idx].created_time,
    })
    console.log(ShowOverLay.show);
  }
  const GrossItems = useMemo(()=>{
    const res = [];
    for(let i = page*colCnt*rowCnt; i < (page+1)*colCnt*rowCnt  && i < help_log.length; i++){
      res.push(
      <GrossItem $defaultIdx={i} $selectIdx={selectIdx} $show={ShowOverLay} key={i} $checkColor={cur_CheckedColor} $uncheckColor={cur_UncheckedColor} onClick={(e)=>onGross(e,i)}></GrossItem>);
    }

    for(let i = 0; i < (page+1)*colCnt*rowCnt-page*colCnt*rowCnt; i++){ 
      res.push(<EmptyItem key={(page+1)*colCnt*rowCnt+i+1}></EmptyItem>)
    }
    return res;
  },[page,help_log,selectIdx, cur_CheckedColor, cur_UncheckedColor]);

  const prevGross = ()=>{
    if(page!==0)setPage(page-1);
    setSelectIdx(-1);
    setShowOverLay({
      idx: -1,
    })
  }

  const nextGross = ()=>{
    if(Math.floor(help_log.length/(colCnt*rowCnt))!==page){setPage(page+1);}
    setSelectIdx(-1);
    setShowOverLay({
      idx: -1,
    })
  }

  const dispatch = useDispatch();

  const pickdata = {
    item : {
			name : "핑크소세지",
			uncheckedRgb : "#FFACAC",
			checkedRgb : "#FFEEBB",
			tier : "legandary"
		},
		dew_point : 123456,
  }

  const handlePickModal = (pickdata) => {
    setPickModalOpen(true);
    dispatch(setName(pickdata.item.name));
    dispatch(setTier(pickdata.item.tier));
    dispatch(setUnchedkedRgb(pickdata.item.uncheckedRgb));
    dispatch(setCheckedRgb(pickdata.item.checkedRgb));
    dispatch(setDewPoint(pickdata.dew_point));
  }

  return (
    <ChartWrap>
      <ChartHeader>나의 도움을 기록해주세요</ChartHeader>
      <GrossWrap $col = {colCnt} $row = {rowCnt}> 
        {
          GrossItems
        }
      </GrossWrap>
      <Btns>
        <DirectionBtns>
            <GrossBtn onClick={prevGross}>이전</GrossBtn>
            <GrossBtn onClick={nextGross}>다음</GrossBtn>
        </DirectionBtns>
        <Wrap>
            <Dew>{point}Dew</Dew>
            <PickBtn onClick={() => handlePickModal(pickdata)}>뽑기</PickBtn>
        </Wrap>
      </Btns>
      {ShowOverLay.show && 
        <OverRayWrap $position={ShowOverLay} $nowScreenWidth={nowScreenWidth}>
          {ShowOverLay.content}
        </OverRayWrap>
      }
    </ChartWrap>
  )
}

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
`;


const GrossBtn = styled.button`
  width: 2rem;
  height: 2rem;
`
const GrossWrap = styled.div`
  display: grid;
  width: 100%;
  height: 5rem;
  grid-template-columns: repeat(${props=>props.$col},1fr);
  grid-template-rows: repeat(${props=>props.$row},1fr);
`

const GrossItem = styled.div`
   background-color: ${props=> (props.$selectIdx===props.$defaultIdx && props.$show.show) ? props.$checkColor : props.$uncheckColor};
   border: 1px solid #000;
   border-radius: 8px;
   margin-right: 1px;
   margin-top: 1px;
`

const EmptyItem = styled.div`
   background-color: ${props => props.theme.colors.titleColor};
   border: 1px solid #000;
   border-radius: 8px;
   margin-right: 1px;
   margin-top: 1px;
`

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PickBtn = styled.button`
  background-color: #6161ff;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  font-size: 20px;
  text-align: center;
`;

const Dew = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const Wrap = styled.div`
    display: flex;
`
const DirectionBtns = styled.div`
    display: flex;
`

const OverRayWrap = styled.div`
  background-color: rgba(128, 128, 128, 0.5);
  position: fixed;
  width: auto;
  height: auto;
  top: ${props => props.$position.y}px;
  left: ${
    props =>
    props.$position.x > props.$nowScreenWidth / 2
      ? `${props.$position.x - 100}px`
      : `${props.$position.x}px`
  };
`
   
export default Jandi
