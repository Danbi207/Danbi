import React, { useState } from 'react';
import styled from 'styled-components';

const DummyData = [
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function splitIntoPairs(data) {
  const dividedData = [];

  for (let i = 0; i < data.length; i += 2) {
    const pair = data.slice(i, i + 2);
    dividedData.push(pair);
  }

  return dividedData;
}

const dividedData = splitIntoPairs(DummyData);
console.log(dividedData);

const GrassTile = ({ data }) => {
  const tileColor = data ? '#39D353' : (props) => props.theme.colors.jandibgColor;
  return <Tile color={tileColor}/>;
};

const GrassRow = ({ line }) => {
  return (
    <Row>
      {line.map((value, index) => (
        <GrassTile key={index} data={value} />
      ))}
    </Row>
  );
};

const Jandi = ({ setPickModalOpen, point }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          {dividedData.map((chart, index) => (
            <Chart key={index} isActive={currentIndex === index}>
              {chart.map((line, index) => (
                <GrassRow line={line} key={index} />
              ))}
            </Chart>
          ))}
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
  width: ${(props) => (props.isActive ? 'auto' : '0')};
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  transition: all 0.5s;
`;

const ChartHeader = styled.div`
  padding-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 3px;
`;

const getTileWidth = () => {
  const totalMargins = 16;
  const totalBorders = 0;
  const totalPadding = 32; 
  const availableWidth = window.innerWidth - totalMargins - totalBorders - totalPadding;
  return Math.floor(availableWidth / 8);
};

const Tile = styled.div`
  width: ${(props) => getTileWidth()}px;
  height: 41px;
  margin: 1px;
  background-color: ${(props) => props.color};
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
