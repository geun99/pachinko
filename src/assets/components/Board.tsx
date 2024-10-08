import React, { useState, useEffect } from "react";
import { createBoard } from "../util/createBoard";
import styled from "styled-components";
import RemainingCounts from "./RemainingCounts";
import CollectedCounts from "./CollectedCounts";
import ResetButton from "./ResetButton";

interface CellState {
  number: number;
  revealed: boolean;
  letter: string;
}

type BoardSize = 4 | 5 | 7;

const Board: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<BoardSize>(7);
  const [bingoBoards, setBingoBoards] = useState<{
    [key in BoardSize]: CellState[][];
  }>({
    7: [],
    5: [],
    4: [],
  });

  const [remainingCounts, setRemainingCounts] = useState<{
    [key in BoardSize]: { [key: string]: number };
  }>({
    7: { SSS: 1, SS: 2, S: 4, A: 6, B: 16, C: 20 },
    5: { SSS: 1, SS: 2, S: 4, A: 6, B: 12 },
    4: { SSS: 1, SS: 2, S: 4, A: 9 },
  });

  const [collectedCounts, setCollectedCounts] = useState<{
    [key: string]: number;
  }>({
    SSS: 0,
    SS: 0,
    S: 0,
    A: 0,
    B: 0,
    C: 0,
  });

  useEffect(() => {
    if (bingoBoards[selectedSize].length === 0) {
      const boardLetters = createBoard(selectedSize);
      const boardWithNumbers = boardLetters.map((row, rowIndex) =>
        row.map((letter, colIndex) => ({
          number: rowIndex * selectedSize + colIndex + 1,
          revealed: false,
          letter,
        }))
      );
      setBingoBoards((prevBoards) => ({
        ...prevBoards,
        [selectedSize]: boardWithNumbers,
      }));
    }
  }, [selectedSize]);

  const handleTabClick = (size: BoardSize) => {
    setSelectedSize(size);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const currentBoard = bingoBoards[selectedSize];

    if (currentBoard[rowIndex][colIndex].revealed) return; // 이미 클릭된 셀

    setBingoBoards((prevBoards) => ({
      ...prevBoards,
      [selectedSize]: currentBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex
            ? { ...cell, revealed: true }
            : cell
        )
      ),
    }));

    const letter = currentBoard[rowIndex][colIndex].letter;
    if (remainingCounts[selectedSize][letter] > 0) {
      setRemainingCounts((prevCounts) => ({
        ...prevCounts,
        [selectedSize]: {
          ...prevCounts[selectedSize],
          [letter]: prevCounts[selectedSize][letter] - 1,
        },
      }));
      setCollectedCounts((prevCounts) => ({
        ...prevCounts,
        [letter]: prevCounts[letter] + 1,
      }));
    }
  };

  const handleReset = () => {
    setRemainingCounts({
      7: { SSS: 1, SS: 2, S: 4, A: 6, B: 16, C: 20 },
      5: { SSS: 1, SS: 2, S: 4, A: 6, B: 12 },
      4: { SSS: 1, SS: 2, S: 4, A: 9 },
    });

    const boardLetters = createBoard(selectedSize);
    const boardWithNumbers = boardLetters.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        number: rowIndex * selectedSize + colIndex + 1,
        revealed: false,
        letter,
      }))
    );
    setBingoBoards((prevBoards) => ({
      ...prevBoards,
      [selectedSize]: boardWithNumbers,
    }));
  };

  const getCellColor = (size: number) => {
    switch (size) {
      case 7:
        return "#4A90E2";
      case 5:
        return "#E74C3C";
      case 4:
        return "#F1C40F";
      default:
        return "#ddd";
    }
  };

  return (
    <BoardContainer>
      <Tabs>
        <Tab isActive={selectedSize === 7} onClick={() => handleTabClick(7)}>
          7x7
        </Tab>
        <Tab isActive={selectedSize === 5} onClick={() => handleTabClick(5)}>
          5x5
        </Tab>
        <Tab isActive={selectedSize === 4} onClick={() => handleTabClick(4)}>
          4x4
        </Tab>
      </Tabs>

      <GridContainer>
        <RemainingCounts remainingCounts={remainingCounts[selectedSize]} />

        <BingoGrid size={selectedSize}>
          {bingoBoards[selectedSize].map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                revealed={cell.revealed}
                backgroundColor={getCellColor(selectedSize)}
              >
                {cell.revealed ? cell.letter : cell.number}
              </Cell>
            ))
          )}
        </BingoGrid>

        <CollectedCounts collectedCounts={collectedCounts} />
      </GridContainer>

      <ResetButton onClick={handleReset} />
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ isActive: boolean }>`
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

const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

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

export default Board;
