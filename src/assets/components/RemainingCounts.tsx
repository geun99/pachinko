import React from "react";
import styled from "styled-components";

interface RemainingCountsProps {
  remainingCounts: { [key: string]: number };
}

const RemainingCounts: React.FC<RemainingCountsProps> = ({
  remainingCounts,
}) => {
  return (
    <CountsContainer>
      <h3>남은 개수</h3>
      <ul>
        {Object.entries(remainingCounts).map(([key, count]) => (
          <li key={key}>
            {key}: {count}
          </li>
        ))}
      </ul>
    </CountsContainer>
  );
};

const CountsContainer = styled.div`
  margin-left: 100px;
  margin-right: 30px;
  font-size: 30px;
  li {
    list-style: none;
  }
`;

export default RemainingCounts;
