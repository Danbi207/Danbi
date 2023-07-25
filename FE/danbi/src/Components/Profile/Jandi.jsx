import React from 'react';
import styled from 'styled-components';

const DummyData = [[1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

const GrassTile = ({data}) => {
  const tileColor = data ? '#39D353' : 'white';
  return <Tile color={tileColor} />;
};

const GrassRow = ({line}) => {
  return (
    <Row>
      {line.map((value, index) => (
        <GrassTile key={index} data={value} />
      ))}
    </Row>
  );
};

const Jandi = () => {
  return (
    <Chart>
      <ChartHeader>나의 도움을 기록해주세요</ChartHeader>
      {DummyData.map((line, index) => (
        <GrassRow key={index} line={line} />
      ))}
    </Chart>
  );
};

export default Jandi;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 1rem 1rem;
`;

const ChartHeader = styled.div`
  padding-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 3px;
`;

const Tile = styled.div`
  width: 41px;
  height: 41px;
  margin: 1px;
  background-color: ${(props) => props.color};
  border-radius: 3px;
`;
