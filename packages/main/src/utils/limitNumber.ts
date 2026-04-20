/* 限制v-model输入框的正数、小数
  params:{
    len: 几位小数
    maxLength: 输入框最大长度
  }
*/
export const limitInput = (value: string, row: any, name: string, len: number, maxLength = 100) => {
  value = value.replace(/^0+\d+?/g, '0');
  const str = (value && value.split('')) || [];
  const reg1 = /\d/;
  const reg2 = /\./;
  // 第一个字符不能为小数点
  if (str[0] === '.') {
    row[name] = '';
    return false;
  }
  let arr: string[] = [];
  // 过滤掉除数字和小数点外的字符
  arr = str.filter((e: string) => reg1.test(e) || reg2.test(e));
  // 匹配小数点后有几位小数
  const valJoin: string = arr.join('') || '';
  let reg: any;
  if (len == 0) {
    reg = new RegExp(/^\d*/g);
  } else {
    reg = new RegExp('^\\d*(\\.?\\d{0,' + len + '})', 'g');
  }
  const lastVal: any = valJoin.match(reg);
  row[name] = lastVal[0].slice(0, maxLength) || '';
};

export const limitInputPlusMinus = (
  value: string,
  row: any,
  name: string,
  len: number,
  maxLength = 100
) => {
  let minusFlag = '';
  if (value && value.slice(0, 1) === '-') {
    minusFlag = '-';
    value = value.slice(1);
  }
  const str = (value && value.split('')) || [];
  const reg1 = /\d/;
  const reg2 = /\./;
  // 第一个字符不能为小数点
  if (str[0] === '.') {
    row[name] = '';
    return false;
  }
  let arr: string[] = [];
  // 过滤掉除数字和小数点外的字符
  arr = str.filter((e: string) => reg1.test(e) || reg2.test(e));
  // 匹配小数点后有几位小数
  const valJoin: string = arr.join('') || '';
  let reg: any;
  if (len == 0) {
    reg = new RegExp(/^\d*/g);
  } else {
    reg = new RegExp('^\\d*(\\.?\\d{0,' + len + '})', 'g');
  }
  const lastVal: any = valJoin.match(reg);
  row[name] = minusFlag + lastVal[0].slice(0, maxLength) || '';
};

// 不能为负号
export const inputMinusBlur = (row: any, name: string) => {
  if (row[name] === '-') {
    row[name] = '';
    return false;
  }
};
// 不能为0
export const inputZeroBlur = (row: any, name: string) => {
  if (row[name] == 0) {
    row[name] = '';
    return false;
  }
};
