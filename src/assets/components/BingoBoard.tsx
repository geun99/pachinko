import React from "react";
import styled from "styled-components";

interface CellState {
  number: number;
  revealed: boolean;
  letter: string;
}

interface BingoBoardProps {
  size: number;
  board: CellState[][];
  onCellClick: (rowIndex: number, colIndex: number) => void;
  getCellColor: (size: number) => string;
}

const BingoBoard: React.FC<BingoBoardProps> = ({
  size,
  board,
  onCellClick,
  getCellColor,
}) => {
  return (
    <BingoGrid size={size}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            revealed={cell.revealed}
            backgroundColor={getCellColor(size)}
          >
            {cell.revealed ? cell.letter : cell.number}
          </Cell>
        ))
      )}
    </BingoGrid>
  );
};

const BingoGrid = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

const Cell = styled.div<{ revealed: boolean; backgroundColor: string }>`
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

export default BingoBoard;
