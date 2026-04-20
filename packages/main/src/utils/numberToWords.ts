function numberToWords(num: number): string {
  // 如果number是小数，先转换为整数
  if (num % 1 !== 0) {
    num = Math.floor(num);
  }
  if (num < 0) return `Negative ${numberToWords(-num)}`;
  if (num === 0) return 'Zero';

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    'Ten',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  function convertChunk(chunk) {
    let words = '';
    if (chunk >= 100) {
      words += `${units[Math.floor(chunk / 100)]} Hundred `;
      chunk %= 100;
      if (chunk) {
        words += 'and ';
      }
    }
    if (chunk >= 20) {
      words += `${tens[Math.floor(chunk / 10)]}`;
      chunk %= 10;
      if (chunk) {
        words += '-';
      }
    } else if (chunk >= 10) {
      words += `${teens[chunk - 10]} `;
      chunk = 0;
    }
    if (chunk > 0) {
      words += `${units[chunk]} `;
    }
    return words.trim();
  }

  let result = '';
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      result = `${convertChunk(chunk)} ${scales[scaleIndex]} ${result}`;
    }
    num = Math.floor(num / 1000);
    scaleIndex += 1;
  }

  return result.trim();
}
export default numberToWords;
