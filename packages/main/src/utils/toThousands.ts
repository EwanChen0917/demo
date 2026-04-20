export const toThousands = (str: any, len = 4) => {
  // 判断正负
  str = str - 0;
  let fu = false;
  if (str < 0) {
    str = 0 - str;
    fu = true;
  }
  //含小数每3位分隔
  let newStr = '';
  let count = 0;
  str = str + '';
  // 当数字是整数
  if (str.indexOf('.') == -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + ',' + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr;
    // str = newStr + ".0000"; //自动补小数点后四位
    if (fu) {
      str = '-' + str;
    }
    return str;
  } else {
    // 当数字带有小数
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + ',' + newStr;
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str =
      newStr + (str + '00').slice((str + '00').indexOf('.'), (str + '00').indexOf('.') + len + 1);
    if (fu) {
      str = '-' + str;
    }
    return str;
  }
};
