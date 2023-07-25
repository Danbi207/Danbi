import React, { useState } from 'react';
import styled from 'styled-components';

const DummyCommitData = [
  { date: '2023-07-01', count: 40 },
  { date: '2023-07-02', count: 1 },
  // 이런식으로 데이터를 구성합니다.
];

const GrassTile = ({ count }) => {
  const tileColor =
    count === 0 ? '#ebedf0' : count <= 3 ? '#9be9a8' : count <= 6 ? '#40c463' : '#30a14e';

  return <Tile color={tileColor} />;
};

const GrassRow = ({ dates, commitData }) => {
  return (
    <Row>
      {dates.map((date) => {
        const data = commitData.find((item) => item.date === date);
        const count = data ? data.count : 0;
        return <GrassTile key={date} count={count} />;
      })}
    </Row>
  );
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const Jandi = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const startDate = new Date(year, month, 1);
  const dates = [...Array(daysInMonth)].map((_, index) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + index);
    return newDate.toISOString().slice(0, 10);
  });

  const [commitData, setCommitData] = useState(DummyCommitData);

  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <Chart>
      <ChartHeader>나의 도움을 기록해주세요</ChartHeader>
      {weeks.map((week, index) => (
        <GrassRow key={index} dates={week} commitData={commitData} />
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
  margin-bottom: 5px;
`;

const Tile = styled.div`
  width: 20px;
  height: 20px;
  margin: 1px;
  background-color: ${(props) => props.color};
  border-radius: 3px;
`;
