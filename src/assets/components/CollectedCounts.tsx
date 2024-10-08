import React from "react";
import styled from "styled-components";

interface CollectedCountsProps {
  collectedCounts: { [key: string]: number };
}

const CollectedCounts: React.FC<CollectedCountsProps> = ({
  collectedCounts,
}) => {
  return (
    <CountsContainer>
      <h3>수집한 개수</h3>
      <ul>
        {Object.entries(collectedCounts).map(([key, count]) => (
          <li key={key}>
            {key}: {count}
          </li>
        ))}
      </ul>
    </CountsContainer>
  );
};

const CountsContainer = styled.div`
  margin-right: 100px;
  font-size: 30px;
  li {
    list-style: none;
  }
`;

export default CollectedCounts;
