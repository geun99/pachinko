import React from "react";
import styled from "styled-components";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return <StyledButton onClick={onClick}>빙고판 초기화</StyledButton>;
};

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default ResetButton;
