export function buildExcelColumnHeaderNames(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(numToTag(i + 1));
  }
  return arr;
}

export function buildExcelColumnHeaderNameRange(startTag, endTag) {
  const start = tagToNum(startTag);
  const end = tagToNum(endTag);

  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(numToTag(i));
  }
  return arr;
}

export function numToTag(num) {
  let result = '';
  while (num > 0) {
    const remainder = (num - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result; // 65 是 'A' 的 ASCII 码
    num = Math.floor((num - 1) / 26);
  }
  return result;
}

export function tagToNum(tag) {
  let result = 0;
  for (let i = 0; i < tag.length; i++) {
    const charCode = tag.charCodeAt(i) - 65; // 65 是 'A' 的 ASCII 码
    result = result * 26 + charCode + 1;
  }
  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
