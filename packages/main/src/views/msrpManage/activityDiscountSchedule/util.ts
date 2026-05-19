import { dataApi } from '@/api';
import { integerRule, priceRule } from '@/utils/rulesRegExp';
import dayjs from 'dayjs';

//判断是否第一周，显示活动信息
export function getFirstWeek(weekActivityInfoList, info) {
  const weekData = weekActivityInfoList?.filter((res) => res?.planCode == info?.planCode);
  if (info && info?.planCode) {
    if (info?.week === weekData[0]?.week) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
//判断是第几天开始合并，
export function getStartDay(startDate) {
  const day = new Date(startDate).getDay();
  if (day === 0) {
    //周日
    return 7;
  } else {
    return day;
  }
}
//取单元格对应单元格活动信息
export function getWeekInfo(weekActivityInfoList, week, i) {
  let info = null;
  let arr = [];
  weekActivityInfoList.forEach((res) => {
    if (res.week == week) {
      arr.push(res);
    }
  });

  if (arr) {
    arr.forEach((item) => {
      if (item.startDate) {
        let num = getStartDay(item.startDate);
        if (num === i && item.activityDaysInWeek === 7) {
          info = item;
        } else if (
          num === 7 - item.activityDaysInWeek + i &&
          item.activityDaysInWeek < 7 &&
          item.week === 1
        ) {
          info = item;
        } else if (num === i && item.activityDaysInWeek < 7 && item.week !== 1) {
          info = item;
        }
      }
    });
  }
  return info;
}
export function setValue(value, row, type, skuSalePrice) {
  if (skuSalePrice === '' || skuSalePrice === undefined || skuSalePrice === null) {
    return '';
  }

  //   当填写 折扣率 时，如MSRP不为空，则自动计算 成交价  ；活动价 = MSRP*（1-折扣率）
  //   当填写 活动价 时，如MSRP不为空，则自动计算 折扣率  ；折扣率 =（MSRP-成交价）/MSRP
  // （MSRP为空，则不自动计算）
  // value:值, row：当前对象, type：当前字段名, skuSalePrice：sku的MSRP值
  let val = '';
  if (type === 'discountRate' && value) {
    // 填写折扣率
    // row.transactionPrice = row.skuSalePrice * (1 - row.discountRate);
    val = `${calculate(
      skuSalePrice,
      calculate(1, calculate(row.discountRate, 100, '/'), '-'),
      '*'
    )}`;
  }
  if (type === 'activityPrice' && value) {
    // 填写活动价
    val = `${calculate(
      calculate(calculate(skuSalePrice, value, '-'), skuSalePrice, '/'),
      100,
      '*'
    )}`;
  }
  if (val === '' || val === undefined || val === null) {
    return '';
  }
  return (+val)?.toFixed?.(2) || val;
}
// 处理数字精度：将小数转换为整数（解决 0.1 + 0.2 等精度问题）
function calculate(num1, num2, operator) {
  if (num1 == undefined || num2 == undefined) {
    return;
  }
  // 获取两个数的小数位数
  const len1 = num1.toString().split('.')[1]?.length || 0;
  const len2 = num2.toString().split('.')[1]?.length || 0;

  // 计算最大小数位数，确定放大倍数（避免精度丢失）
  const maxLen = Math.max(len1, len2);
  const multiple = 10 ** maxLen;

  // 将小数转为整数后运算
  const int1 = Math.round(num1 * multiple); // 四舍五入避免浮点数误差
  const int2 = Math.round(num2 * multiple);

  let result;
  switch (operator) {
    case '+':
      result = (int1 + int2) / multiple;
      break;
    case '-':
      result = (int1 - int2) / multiple;
      break;
    case '*':
      // 乘法需要额外处理放大倍数（避免整数溢出时可缩小倍数）
      result = (int1 * int2) / (multiple * multiple);
      break;
    case '/':
      // 除法需注意除数为0的情况
      if (int2 === 0) throw new Error('除数不能为0');
      result = int1 / int2;
      break;
    default:
      throw new Error('不支持的运算符');
  }

  // 处理结果可能的科学计数法（如 1e-7 转为 0.0000001）
  return Number(result.toFixed(maxLen + 2)) || 0;
}
// 获取币种options
export const currencyOptions = ref([]);
async function getCurrencyOptions() {
  const res = await dataApi.luteosDataQueryCurrencyList();
  currencyOptions.value = res.currencyList;
}
getCurrencyOptions();

// 处理折扣范围、成交价范围、毛利范围
export const valuesToRange = (weekSaleInfoList) => {
  return weekSaleInfoList.map((x) => {
    return {
      ...x,
      discountRate:
        x.discountRate === x.maxDiscountRate
          ? x.discountRate
          : [x.discountRate, x.maxDiscountRate]
              .filter((k) => k !== null && k !== undefined && k !== '')
              .join('-'),
      discountRateOrigin: x.discountRate,
      transactionPrice:
        x.transactionPrice === x.maxTransactionPrice
          ? x.transactionPrice
          : [x.transactionPrice, x.maxTransactionPrice]
              .filter((k) => k !== null && k !== undefined && k !== '')
              .join('-'),
      transactionPriceOrigin: x.transactionPrice,
      profitRate:
        x.profitRate === x.maxProfitRate
          ? x.profitRate
          : [x.profitRate, x.maxProfitRate]
              .filter((k) => k !== null && k !== undefined && k !== '')
              .join('-'),
      profitRateOrigin: x.profitRate,
    };
  });
};
// 处理折扣范围、成交价范围、毛利范围
export const rangeToValues = (weekSaleInfoList) => {
  return weekSaleInfoList.map((x) => {
    const obj = {
      ...x,
    };

    // discountRate
    if (typeof x.discountRate === 'string' && x.discountRate.includes('-')) {
      const [discountRate, maxDiscountRate] = x.discountRate.split('-');
      obj.discountRate = discountRate;
      obj.maxDiscountRate = maxDiscountRate;
    } else {
      obj.discountRate = x.discountRate;
      obj.maxDiscountRate = x.discountRate;
    }

    // transactionPrice
    if (typeof x.transactionPrice === 'string' && x.transactionPrice.includes('-')) {
      const [transactionPrice, maxTransactionPrice] = x.transactionPrice.split('-');
      obj.transactionPrice = transactionPrice;
      obj.maxTransactionPrice = maxTransactionPrice;
    } else {
      obj.transactionPrice = x.transactionPrice;
      obj.maxTransactionPrice = x.transactionPrice;
    }

    // profitRate
    if (typeof x.profitRate === 'string' && x.profitRate.includes('-')) {
      const [profitRate, maxProfitRate] = x.profitRate.split('-');
      obj.profitRate = profitRate;
      obj.maxProfitRate = maxProfitRate;
    } else {
      obj.profitRate = x.profitRate;
      obj.maxProfitRate = x.profitRate;
    }
    return obj;
  });
};
// 处理数值，如果传了 "" 就设置为 null
export const handleEmptyStringValue = (paramsList) => {
  paramsList.forEach((spuItem) => {
    const list = [...(spuItem.weekSaleInfoList || [])];
    const allSkuList = [
      ...(spuItem.activeDiscountSkuList || []),
      ...(spuItem.activeDiscountSkuBeanList || []),
    ];
    allSkuList.forEach((skuItem) => {
      list.push(...skuItem.weekSaleInfoList);
    });
    list.forEach((weekItem) => {
      if (!+weekItem.discountRate) {
        weekItem.discountRate = null;
        weekItem.maxDiscountRate = null;
      }
      if (!+weekItem.profitRate) {
        weekItem.profitRate = null;
        weekItem.maxProfitRate = null;
      }
      if (!+weekItem.transactionPrice) {
        weekItem.transactionPrice = null;
        weekItem.maxTransactionPrice = null;
      }
    });

    allSkuList.forEach((skuItem) => {
      skuItem.weekSaleInfoList.forEach((weekItem) => {
        weekItem.maxDiscountRate = null;
        weekItem.maxProfitRate = null;
        weekItem.maxTransactionPrice = null;
      });
    });
  });
};

export const buildWeekMonth = (weekItems) => {
  const today = dayjs().format('MM-DD');
  weekItems.forEach((weekItem) => {
    // Week3(01.13-01.19)
    const { weekTag } = weekItem;
    // 解析出  _weekNo months: [1, 1]
    const reg =
      /^Week(?<week>\d+)\((?<startMonth>\d+)\.(?<startDate>\d+)\-(?<endMonth>\d+)\.(?<endDate>\d+)\)$/;
    const match = weekTag.match(reg);
    if (match) {
      const start = +match.groups.startMonth;
      const end = +match.groups.endMonth;
      weekItem._startMonth = start;
      weekItem._endMonth = end;
      weekItem._weekNo = +match.groups.week;

      const startDateStr = `${match.groups.startMonth}-${match.groups.startDate}`;
      const endDateStr = `${match.groups.endMonth}-${match.groups.endDate}`;

      weekItem.isToday = startDateStr <= today && today <= endDateStr;
    }
  });
};
