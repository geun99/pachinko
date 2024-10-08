import React from "react";
import styled from "styled-components";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const Tab: React.FC<TabProps> = ({ isActive, onClick, label }) => {
  return (
    <StyledTab isActive={isActive} onClick={onClick}>
      {label}
    </StyledTab>
  );
};

const StyledTab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${({ isActive }) => (isActive ? "#4CAF50" : "#f1f1f1")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#45a049" : "#ddd")};
  }
`;

export default Tab;
