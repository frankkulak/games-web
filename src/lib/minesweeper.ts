export interface MinesweeperCell {
  mine: boolean;
  dug: boolean;
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
          column: c,
          row: r
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

        const leftColumn = this.columns[c - 1];
        if (leftColumn?.[r - 1]?.mine) cell.closeMines++;
        if (leftColumn?.[r]?.mine) cell.closeMines++;
        if (leftColumn?.[r + 1]?.mine) cell.closeMines++;
        const thisColumn = this.columns[c];
        if (thisColumn?.[r - 1]?.mine) cell.closeMines++;
        if (thisColumn?.[r + 1]?.mine) cell.closeMines++;
        const rightColumn = this.columns[c + 1];
        if (rightColumn?.[r - 1]?.mine) cell.closeMines++;
        if (rightColumn?.[r]?.mine) cell.closeMines++;
        if (rightColumn?.[r + 1]?.mine) cell.closeMines++;
      }
    }
  }
}
