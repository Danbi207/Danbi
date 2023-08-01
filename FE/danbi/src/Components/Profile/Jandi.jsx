import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {splitIntoPairs} from './utils/Dividing.js';
import JandiOverLay from './JandiOverLay.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatedTime, setShowOverLay } from '../../store/Slice/JandiSlice.js';

// 잔디 한 칸
const GrassTile = ({ data }) => {
  const tilecolor = (typeof data === 'object') ? '#39D353' : props => props.theme.colors.jandibgColor
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const showOverLay = useSelector(state => state.showOverLay);

  const handleClick = () => {
    dispatch(setCreatedTime(data.created_time));
    dispatch(setShowOverLay(!showOverLay));
    setShow(!show);
  }

  return <Tile $data={data} $tilecolor={tilecolor} $show={show} onClick={handleClick} />
};

// 잔디 한 줄
const GrassRow = ({ line }) => {
  console.log(line);
  return (
    <Row>
      {line.map((value, index) => (
        <GrassTile key={index} data={value} />
      ))}
    </Row>
  );
};

// 전체 잔디
const Jandi = ({ setPickModalOpen, point, help_log }) => {
  const dividedData = splitIntoPairs(help_log);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = useSelector(state => state.Jandi.created_time);
  const position = useSelector(state => state.Jandi.position);
  const showOverLay = useSelector(state => state.Jandi.showOverLay);


  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < dividedData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  const PickShowModal = () => {
    setPickModalOpen(true);
  };

  return (
    <ChartWrap>
      <ChartHeader>나의 도움을 기록해주세요</ChartHeader>
      <Carousel>
        <SliderWrapper>
            <Chart>
              {dividedData.map((line, index) => (
                <GrassRow line={line} key={index} />
              ))}
            </Chart>
        </SliderWrapper>
      </Carousel>
      <Btns>
        <ArrowButtons>
          <ArrowButton onClick={handlePrevClick}>Prev</ArrowButton>
          <ArrowButton onClick={handleNextClick}>Next</ArrowButton>
        </ArrowButtons>
        <Wrap>
          <Dew>{point}Dew</Dew>
          <PickBtn onClick={PickShowModal}>뽑기</PickBtn>
        </Wrap>
      </Btns>
      {showOverLay && <JandiOverLay data={data} />}
    </ChartWrap>
  );
};

export default Jandi;

const ChartWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 1rem 1rem 0 1rem;
`;

const Carousel = styled.div`
  display: flex;
`;

const SliderWrapper = styled.div`
  display: flex;
`;

const Chart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
   /* Chart 보이기/숨기기 */
  /* width: ${(props) => (props.$isActive ? 'auto' : '0')};
  opacity: ${(props) => (props.$isActive ? '1' : '0')};
  transition: all 0.5s; */
`;

const ChartHeader = styled.div`
  padding-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 3px;
  width: 100%;
`;

const getTileWidth = () => {
  const totalMargins = 16;
  const totalBorders = 0;
  const totalPadding = 32; 
  const availableWidth = window.innerWidth - totalMargins - totalBorders - totalPadding;
  console.log(Math.floor(availableWidth / 8));
  return Math.floor(availableWidth / 8);
};

const Tile = styled.div`
  width: ${() => getTileWidth()}px;
  height: 41px;
  margin: 1px;
  background-color: ${(props) => (props.$show && typeof props.$data === 'object') ? '#00550e' : props.$tilecolor};
  border-radius: 3px;
`;

const ArrowButton = styled.button`
  font-size: 24px;
  background: transparent;
  border: none;
  padding-right: 10px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
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

const ArrowButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
`;
