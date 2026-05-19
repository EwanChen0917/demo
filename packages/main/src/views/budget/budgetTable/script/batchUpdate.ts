import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import { BatchUpdateTypes, BudgetCode } from '@/views/budget/budgetTable/types/type';
import { isLocalhost } from '@/views/budget/budgetTable/script/variable';

export type RecordItem = [
  BatchUpdateTypes, // type
  number, // row
  string, // prop
  any // value
];

const dataWaitUpdate: Record<BudgetCode, RecordItem[]> = {};
const dataWaitUpdateCanEdit: Record<BudgetCode, RecordItem[]> = {};

let updateTimer = null;

export function addBatchRenderDataList(
  tableCode: BudgetCode,
  type: BatchUpdateTypes,
  list: RecordItem[]
) {
  if (type === BatchUpdateTypes.BATCH_UPDATE_CAN_EDIT) {
    if (!dataWaitUpdateCanEdit[tableCode]) {
      dataWaitUpdateCanEdit[tableCode] = [];
    }
    dataWaitUpdateCanEdit[tableCode].push(...list);
  } else if (type === BatchUpdateTypes.BATCH_UPDATE_VALUE) {
    if (!dataWaitUpdate[tableCode]) {
      dataWaitUpdate[tableCode] = [];
    }
    dataWaitUpdate[tableCode].push(...list);
  }
  if (!updateTimer) {
    // console.log( 'new timer')
    updateTimer = setInterval(() => {
      const budgetStore = useBudgetStore(tableCode);
      const instance = budgetStore.getHotInstance?.();
      if (!instance) {
        // console.log('no instance');
        return;
      }
      // console.log('update');
      clearInterval(updateTimer);
      updateData(false);
    }, 500);
  }
}

export function syncUpdateDataImmediate(isQuickly) {
  updateData(isQuickly);
}

function updateData(isQuickly) {
  // console.log('in update');
  updateTimer = null;

  Object.keys(dataWaitUpdate).forEach((tableCode) => {
    const cells = dataWaitUpdate[tableCode];
    if (!cells.length) {
      return;
    }
    dataWaitUpdate[tableCode] = [];

    const budgetStore = useBudgetStore(tableCode);
    const instance = budgetStore.getHotInstance?.();
    if (!instance || instance.isDestroyed) {
      return;
    }
    if (cells.length) {
      cells.forEach((x) => {
        x[0] = +x[0];
      });
      if (isQuickly) {
        instance.setSourceDataAtCellQuickly(cells, false);
      } else {
        // isLocalhost && console.log('needUpdateEditableCells=', cells);
        instance.setSourceDataAtCell(cells, 'edit');
      }
      budgetStore.debounceRender();
    }
  });

  Object.keys(dataWaitUpdateCanEdit).forEach((tableCode) => {
    const cells = dataWaitUpdateCanEdit[tableCode];
    if (!cells.length) {
      return;
    }
    dataWaitUpdateCanEdit[tableCode] = [];

    const budgetStore = useBudgetStore(tableCode);
    const instance = budgetStore.getHotInstance?.();

    if (!instance || instance.isDestroyed) {
      return;
    }

    // isLocalhost && console.log('needUpdateEditableCells=', cells);
    if (cells.length) {
      cells.forEach(([row, colName, value]) => {
        instance.setCellMeta(
          instance.toVisualRow(+row),
          instance.propToCol(colName),
          'readOnly',
          !+value
        );
      });
      budgetStore.debounceRender();
    }
  });
}
