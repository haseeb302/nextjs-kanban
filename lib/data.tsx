import data from "../public/data";

export function getBoardNames() {
  return data.boards.map((board) => board.name);
}

export function getBoardColumns(selectedBoard: string) {
  const board = data.boards.find((board) => {
    const path = `${process.env.baseUrl}/${board.name}`;
    if (path === selectedBoard) {
      return board.columns;
    }
  });
  return board?.columns || [];
}

export function setBoardColumns(selectedBoard: string, columns: any) {
  const board = data.boards.find((board) => {
    const path = `${process.env.baseUrl}/${board.name}`;
    if (path === selectedBoard) {
      board.columns = columns;
    }
  });
  return board?.columns;
}

// export function getBoardTasks(selectedBoard: string) {
//   const board = data.boards.find((board) => {
//     const path = `${process.env.baseUrl}/${board.name}`;
//     if (path === selectedBoard) {
//       return board.columns;
//     }
//   });
//   return board?.columns || [];
// }
