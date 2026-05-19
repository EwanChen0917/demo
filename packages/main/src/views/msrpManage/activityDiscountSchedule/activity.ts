const statusMap = {
  waitSubmit: 0, // 待提交
  approving: 1, // 审批中
  approved: 2, // 审核通过
  approvalRejected: 3, // 审核拒绝
};
// 目标销量
export const getTargetSalesRule = (row) => {
  return [
    {
      required: row?.productType === 2,
      // rowName: row.skuCode,
      validator: (rule, value, callback) => {
        if (!value && row?.productType === 2) {
          callback({ message: '请输入' });
        }
        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value >= 900000) {
            return '必须小于900000';
          }
          if (value && value < 1) {
            return '不能小于1';
          }
          // 整数
          if (value.toString().includes('.')) {
            return '必须为整数';
          }
        };

        const result = check(+value);
        if (result) {
          return callback({ message: result });
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
// 原毛利率，活动毛利率，折扣率
export const getRateRule = (item, type) => {
  return [
    {
      required:
        item?.productType === 2 && type !== 'originalProfitRate' && type !== 'activityProfitRate',
      validator: (rule, value, callback) => {
        if (
          !value &&
          item?.productType === 2 &&
          type !== 'originalProfitRate' &&
          type !== 'activityProfitRate'
        ) {
          callback({ message: '请输入' });
        }
        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }
        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value > 100) {
            return '必须小于100';
          }
          if (value && value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
          // if (
          //   (type == 'originalProfitRate' || type == 'activityProfitRate') &&
          //   item.activityProfitRate &&
          //   item.originalProfitRate &&
          //   Number(item.originalProfitRate) < Number(item.activityProfitRate)
          // ) {
          //   return '活动毛利率不能大于原毛利率';
          // }
        };

        const result = check(+value);
        if (value && result) {
          return callback({ message: result });
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
// 活动价; MSRP*（1-折扣率%）=活动价 范围(1-MSRP价格)
export const getactivityPriceRule = (item) => {
  return [
    {
      required: item?.productType === 2,
      validator: (rule, value, callback) => {
        if (!value && item?.productType === 2) {
          callback({ message: '请输入' });
        }
        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }
        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value >= 900000) {
            return '必须小于900000';
          }
          if (value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
        };

        const result = check(+value);
        if (result) {
          return callback({ message: result });
        }
        if (item.msrp && value >= Number(item.msrp)) {
          return callback({ message: `活动价必须小于${item?.msrp}` });
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
export const getDiscountTypeRule = (weekItem, skuOrSpuItem) => {
  return [
    {
      required: true,
      rowName: skuOrSpuItem.code,

      validator: (rule, value, callback) => {
        if (
          !value?.length &&
          (+weekItem?.transactionPrice ||
            +weekItem?.profitRate ||
            +weekItem?.discountRate ||
            weekItem?.currencyPrice)
        ) {
          callback({ message: '请选择' });
        }
        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }
        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value >= 100) {
            return '不能大于100';
          }
          if (value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
        };

        const result = check(+value);
        if (result) {
          return callback({ message: result });
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
export const getDiscountRateRule = (weekItem, skuOrSpuItem) => {
  return [
    {
      required: true,
      rowName: skuOrSpuItem.code,

      validator: (rule, value, callback) => {
        if (
          !value &&
          (+weekItem?.transactionPrice ||
            +weekItem?.profitRate ||
            weekItem?.discountTypeList?.length ||
            weekItem?.currencyPrice)
        ) {
          callback({ message: '请输入' });
          return;
        }

        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }

        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value >= 100) {
            return '不能大于100';
          }
          if (value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
        };

        if (skuOrSpuItem.productType === 1) {
          if (value?.toString()?.includes('-')) {
            let [one, two] = String(value).split('-');
            one = one.trim();
            two = two.trim();
            if (one === '' || two === '') {
              return callback({ message: '错误的范围' });
            }
            const result1 = check(+one);
            const result2 = check(+two);
            if (result1 || result2) {
              return callback({ message: result1 || result2 });
            }
          } else {
            const result = check(+value);
            if (result) {
              return callback({ message: result });
            }
          }
        } else {
          const result = check(+value);
          if (result) {
            return callback({ message: result });
          }
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
export const gettransactionPriceRule = (weekItem, skuOrSpuItem) => {
  return [
    {
      required: true,
      rowName: skuOrSpuItem.code,

      validator: (rule, value, callback) => {
        if (
          !value &&
          (+weekItem?.discountRate ||
            +weekItem?.profitRate ||
            weekItem?.discountTypeList?.length ||
            weekItem?.currencyPrice)
        ) {
          callback({ message: '请输入' });
          return;
        }

        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }

        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value > 900000) {
            return '不能大于900000';
          }
          if (value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
        };

        if (skuOrSpuItem.productType === 1) {
          if (value?.toString()?.includes('-')) {
            let [one, two] = String(value).split('-');
            one = one.trim();
            two = two.trim();
            if (one === '' || two === '') {
              return callback({ message: '错误的范围' });
            }
            const result1 = check(+one);
            const result2 = check(+two);
            if (result1 || result2) {
              return callback({ message: result1 || result2 });
            }
          } else {
            const result = check(+value);
            if (result) {
              return callback({ message: result });
            }
          }
        } else {
          const result = check(+value);
          if (result) {
            return callback({ message: result });
          }
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};
export const getcurrencyPriceRule = (weekItem, skuOrSpuItem) => {
  return [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (
          !value &&
          (+weekItem?.transactionPrice ||
            +weekItem?.discountRate ||
            +weekItem?.profitRate ||
            weekItem?.discountTypeList?.length)
        ) {
          callback({ message: '请输入' });
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ];
};
export const getprofitRateRule = (weekItem, skuOrSpuItem) => {
  return [
    {
      required: true,
      rowName: skuOrSpuItem.code,

      validator: (rule, value, callback) => {
        if (
          !value &&
          (+weekItem?.transactionPrice ||
            +weekItem?.discountRate ||
            weekItem?.discountTypeList?.length ||
            weekItem?.currencyPrice)
        ) {
          callback({ message: '请输入' });
          return;
        }
        if (String(value).trim() === '0') {
          return callback({ message: '不能为0' });
        }
        const check = (value) => {
          if (isNaN(value)) {
            return '非数字';
          }
          if (value >= 100) {
            return '不能大于100';
          }
          if (value < 0) {
            return '不能小于0';
          }
          // 保留两位小数
          if (value.toString().includes('.')) {
            if (value.toString().split('.')[1].length > 2) {
              return '保留2位小数';
            }
          }
        };

        if (skuOrSpuItem.productType === 1) {
          if (isNaN(+value) && value?.toString()?.includes('-')) {
            let [one, two] = value?.toString().split('-');
            one = one.trim();
            two = two.trim();
            if (one === '' || two === '') {
              return callback({ message: '错误的范围' });
            }
            const result1 = check(+one);
            const result2 = check(+two);
            if (result1 || result2) {
              return callback({ message: result1 || result2 });
            }
          } else {
            const result = check(+value);
            if (result) {
              return callback({ message: result });
            }
          }
        } else {
          const result = check(+value);
          if (result) {
            return callback({ message: result });
          }
        }
        callback();
      },
      trigger: ['blur', 'change'],
    },
  ];
};

export const canEdit = (weekItem) => {
  return [statusMap.waitSubmit, statusMap.approvalRejected, null].includes(weekItem?.approveStatus);
};

export const tableScrollToWeek = (tableElement, columnIndex, fixedNum = 0) => {
  // 获取表格主体中的第一行数据行
  const tableRow = tableElement.bodyWrapper.querySelector('.el-table__body tbody .el-table__row');

  let scrollLeft = 0;

  // 遍历每一列，计算滚动距离
  for (let i = fixedNum; i < tableRow.children.length; i++) {
    if (i === columnIndex) {
      break; // 到达目标列则停止累加
    }
    scrollLeft += tableRow.children[i].offsetWidth; // 累加当前列宽度
  }

  // 设置横向滚动位置
  tableElement.bodyWrapper.scrollLeft = scrollLeft;
};

export const scrollMonthToView = (tableRef, month, elWidth) => {
  const tableElement = tableRef?.$el;
  const els = tableElement?.querySelectorAll?.(`[data-month]`);
  if (els) {
    const index = [...els].findIndex((x) => +x?.dataset?.month === month);
    if (index >= 0) {
      tableRef.setScrollLeft?.(index * elWidth);
    }
  }
};

export const scrollToToday = (tableRef, elWidth) => {
  const tableElement = tableRef?.$el;
  const els = tableElement?.querySelectorAll?.(`[data-today]`);
  if (els) {
    const index = [...els].findIndex((x) => +x?.dataset?.today === 1);
    if (index >= 0) {
      tableRef?.setScrollLeft?.(index * elWidth);
    }
  }
};

export const isWeekShow = (monthList, weekItem) => {
  const startMonth = +weekItem?._startMonth;
  const endMonth = +weekItem?._endMonth;
  // return monthList.some((x) => x === startMonth || x === endMonth); // 第一周包含12月
  return monthList.some((x) => x === endMonth); // 第一周算1月份
};
