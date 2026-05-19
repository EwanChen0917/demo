import { doCopySelectArea, onPaste } from '@/views/budget/budgetTable/script/budgetTable';
import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import { isLocalhost } from '@/views/budget/budgetTable/script/variable';

export function useInputHelper(input) {
  this.onKeyDownBeforeOpen = () => {
    input.value = '';
  };

  input.addEventListener('beforeinput', (event) => {
    if (!this._opened) {
      input.value = '';
    }
  });

  input.addEventListener('input', () => {
    if (!this._opened) {
      this.open();
    }
  });

  input.addEventListener('keyup', (ev) => {
    const { row, col } = this.cellProperties;
    // console.log("on move", row,col, ev.key);
    // 方向键
    if (ev.key === 'ArrowUp') {
      this.close();
      if (row > 0) {
        this.hot.selectCell(row, col);
        ev.preventDefault();
        ev.stopPropagation();
      }
    } else if (ev.key === 'ArrowDown') {
      this.close();
      const { row, col } = this.cellProperties;
      if (row < this.hot.countRows() - 1) {
        this.hot.selectCell(row + 1, col);
        ev.preventDefault();
        ev.stopPropagation();
      }
    } else if (ev.key === 'ArrowLeft') {
      if (!this._opened) {
        this.cancelEditing();
        const { row, col } = this.cellProperties;
        if (col > 0) {
          this.hot.selectCell(row, col - 1);
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    } else if (ev.key === 'ArrowRight') {
      if (!this._opened) {
        this.cancelEditing();
        const { row, col } = this.cellProperties;
        if (col < this.hot.countCols() - 1) {
          this.hot.selectCell(row, col + 1);
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    } else if (ev.key === 'Delete') {
      if (!this._opened) {
        // 清空选中区域
        this.hot.emptySelectedCells();
      }
    }
  });

  input.addEventListener('paste', (event) => {
    // 获取粘贴的文本内容
    const pastedText = event.clipboardData?.getData('text/plain');
    // console.log('on cell paste');
    // 阻止默认粘贴行为（可选）
    if (!this._opened || pastedText.includes('\t') || pastedText.includes('\n')) {
      event.preventDefault();
      setTimeout(() => {
        const instance = this.hot;
        const { tableCode } = instance;
        const budgetStore = useBudgetStore(tableCode);
        const selected = budgetStore.getSelectedLast();
        if (selected) {
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          const cellValues = pastedText
            .split('\n')
            .map((row) => row.split('\t').map((x) => x.trim()));

          onPaste(
            tableCode,
            instance,
            budgetStore.config,
            cellValues,
            rowStart,
            colStart,
            rowEnd,
            colEnd
          );
        }
      }, 10);
    }
  });
  input.addEventListener('copy', (event) => {
    if (!this._opened) {
      // 如果编辑器还没处于编辑状态，但是已经获得光标，
      // 从交互来看，应该是复制单元格才对，因此应该触发表格的复制
      const instance = this.hot;
      const { tableCode } = instance;
      const budgetStore = useBudgetStore(tableCode);

      doCopySelectArea(instance, budgetStore, false);
    }
  });
}
