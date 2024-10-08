// util/createBoard.ts
export const createBoard = (size: number): string[][] => {
  const board: string[][] = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );

  if (size === 7) {
    // 7x7 보드에서 'C' 배치
    placeCIn7x7(board);
  } else {
    // 4x4 또는 5x5 보드에서 랜덤하게 글자 배치
    const lettersToPlace = getLettersToPlace(size);
    const remainingLetters = shuffleArray(lettersToPlace);

    let index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (index < remainingLetters.length) {
          board[i][j] = remainingLetters[index++];
        }
      }
    }
  }

  return board;
};
const placeCIn7x7 = (board: string[][]) => {
  const selectedRow = Math.floor(Math.random() * 7);

  const selectedIndices = selectNonAdjacentIndices(
    2,
    board[selectedRow].length
  );
  selectedIndices.forEach((index) => {
    board[selectedRow][index] = "C";
  });

  for (let row = 0; row < 7; row++) {
    if (row !== selectedRow) {
      const indices = selectNonAdjacentIndices(3, board[row].length);
      indices.forEach((index) => {
        board[row][index] = "C";
      });
    }
  }

  fillRemainingLetters(board);
};

// 남은 위치에 글자 배치하는 함수
const fillRemainingLetters = (board: string[][]) => {
  const lettersToPlace = getLettersToPlace(7); // 7x7 보드에 배치할 글자 가져오기
  const remainingLetters = shuffleArray(lettersToPlace);

  let index = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null && index < remainingLetters.length) {
        board[i][j] = remainingLetters[index++];
      }
    }
  }
};

// 주어진 개수만큼 비어있는 인덱스를 선택하는 함수
const selectNonAdjacentIndices = (count: number, size: number): number[] => {
  const indices: number[] = [];
  const availableIndices = Array.from({ length: size }, (_, i) => i);

  while (indices.length < count && availableIndices.length > 0) {
    const index = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[index];

    // 선택한 인덱스가 이전 또는 다음 인덱스와 인접해 있는지 확인
    if (
      !indices.includes(selectedIndex - 1) &&
      !indices.includes(selectedIndex + 1)
    ) {
      indices.push(selectedIndex);
      availableIndices.splice(index, 1); // 선택된 인덱스를 사용 가능 인덱스에서 제거
    }
  }

  return indices;
};

// 사이즈에 따라 배치할 글자 배열을 반환하는 함수
const getLettersToPlace = (size: number): string[] => {
  const letterCounts: Record<string, number> = {
    SSS: 1,
    SS: 2,
    S: size === 4 ? 4 : 4,
    A: size === 4 ? 9 : 6,
    B: size === 4 ? 0 : size === 5 ? 12 : 16,
    C: 0,
  };

  const lettersToPlace: string[] = [];
  for (const letter of Object.keys(letterCounts)) {
    for (let i = 0; i < letterCounts[letter]; i++) {
      lettersToPlace.push(letter);
    }
  }

  return lettersToPlace;
};
// 배열을 무작위로 섞는 함수
const shuffleArray = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
