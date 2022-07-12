export interface MinesweeperCell {
  mine: boolean;
  dug: boolean;
  flag: boolean;
  column: number;
  row: number;
  closeMines?: number;
}

export class MinesweeperModel {
  readonly columns: MinesweeperCell[][];
  readonly numMines: number;

  constructor(
    readonly numColumns: number,
    readonly numRows: number,
    readonly fillRate: number
  ) {
    this.columns = [];
    this.numMines = 0;

    // initialize cells
    for (let c = 0; c < numColumns; c++) {
      const column: MinesweeperCell[] = [];
      this.columns.push(column);
      for (let r = 0; r < numRows; r++) {
        const mine = Math.random() < fillRate;
        if (mine) this.numMines++;
        column.push({
          mine,
          dug: false,
          flag: false,
          column: c,
          row: r,
        });
      }
    }

    // find adjacent mines
    for (let c = 0; c < numColumns; c++) {
      for (let r = 0; r < numRows; r++) {
        const cell = this.columns[c][r];
        if (cell.mine) {
          continue;
        } else {
          cell.closeMines = 0;
        }

        cell.closeMines += this.getAdjacentCells(cell)
          .map(cell => cell.mine)
          .filter(v => v)
          .length;
      }
    }
  }

  getCell(column: number, row: number): MinesweeperCell {
    return this.columns[column]?.[row];
  }

  getAdjacentCells(cell: MinesweeperCell): MinesweeperCell[] {
    const c = cell.column;
    const r = cell.row;

    const adjacentCells: MinesweeperCell[] = [];
    let currentCell: MinesweeperCell;

    const leftColumn = this.columns[c - 1];
    if (currentCell = leftColumn?.[r - 1]) adjacentCells.push(currentCell);
    if (currentCell = leftColumn?.[r]) adjacentCells.push(currentCell);
    if (currentCell = leftColumn?.[r + 1]) adjacentCells.push(currentCell);

    const thisColumn = this.columns[c];
    if (currentCell = thisColumn?.[r - 1]) adjacentCells.push(currentCell);
    if (currentCell = thisColumn?.[r + 1]) adjacentCells.push(currentCell);

    const rightColumn = this.columns[c + 1];
    if (currentCell = rightColumn?.[r - 1]) adjacentCells.push(currentCell);
    if (currentCell = rightColumn?.[r]) adjacentCells.push(currentCell);
    if (currentCell = rightColumn?.[r + 1]) adjacentCells.push(currentCell);

    return adjacentCells;
  }

  dig(cell: MinesweeperCell) {
    cell.dug = true;
    if (!cell.mine && cell.closeMines === 0) {
      const adjacentCells = this.getAdjacentCells(cell);
      adjacentCells.forEach(otherCell => {
        if (!otherCell.dug) this.dig(otherCell);
      });
    }
  }
}
