import styled from "styled-components";

interface CellProps {
  revealed: boolean;
  backgroundColor: string;
  onClick: () => void;
  content: string | number;
}

const Cell: React.FC<CellProps> = ({
  revealed,
  backgroundColor,
  onClick,
  content,
}) => {
  return (
    <StyledCell
      onClick={onClick}
      revealed={revealed}
      backgroundColor={backgroundColor}
    >
      {content}
    </StyledCell>
  );
};

const StyledCell = styled.div<{ revealed: boolean; backgroundColor: string }>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 2px solid #bbb;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ revealed }) => (revealed ? "#fff" : "#000")};

  &:hover {
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
`;

export default Cell;
