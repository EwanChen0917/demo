import { cutTypes } from '@/views/finance/basic/preprocessingRule/enum';

export const getExecuteShowData = (item) => {
  const empty = Symbol('empty');
  switch (item?.type) {
    case 'REPLACE': {
      const arr = [
        item.replaceSearchContent,
        item.replaceContent || empty,
        { all: 'qwth', column: 'alth' }[item.replaceRange],
        (item.replaceRange === 'column' && item.replaceColumn) || '',
        (item.replaceRange === 'column' &&
          { 'overwrite-column': 'fgyl', 'new-column': 'xzl' }[item.storageMode]) ||
          '',
        (item.replaceRange === 'column' && item.storageMode === 'new-column' && item.newColumn) ||
          '',
      ];
      return `zfth(${arr
        .filter((x) => x)
        .map((x) => `"${x === empty ? '' : x}"`)
        .join(',')})`;
    }
    case 'CUT': {
      if (+item.cutType === cutTypes.位数截取) {
        const arr = [
          item.subColumn,
          item.subColumnStartIndex,
          item.subColumnEndIndex,
          { 'overwrite-column': 'fgyl', 'new-column': 'xzl' }[item.storageMode],
          (item.storageMode === 'new-column' && item.newColumn) || '',
        ];
        return `zfjq(${arr
          .filter((x) => x)
          .map((x) => `"${x}"`)
          .join(',')})`;
      }
      if (+item.cutType === cutTypes.字符截断) {
        const arr = [
          item.subColumn,
          item.cutChar,
          item.cutIndex,
          { 'overwrite-column': 'fgyl', 'new-column': 'xzl' }[item.storageMode],
          (item.storageMode === 'new-column' && item.newColumn) || '',
        ];
        return `zfjd(${arr
          .filter((x) => x)
          .map((x) => `"${x}"`)
          .join(',')})`;
      }
    }
    case 'ROW-SUM': {
      return `hhz("${item.rowSumGroupFields.join(',')}","${item.rowSumFields.join(',')}")`;
    }
    default:
      return '';
  }
};
