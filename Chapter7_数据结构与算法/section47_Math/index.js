/**
 * 巨大数字符串相加问题
 * a = '12345678'
 * b =   '456789'
 */
var addStrings = function (num1, num2) {
  let len = Math.max(num1.length, num2.length);
  function addPrefixZero(str, len) {
    if (len <= str.length) return str;
    let gap = len - str.length;
    str = "0".repeat(gap) + str;
    return str;
  }
  num1 = addPrefixZero(num1, len);
  num2 = addPrefixZero(num2, len);

  let addOne = 0;
  let resultStr = "";
  for (i = len - 1; i >= 0; i--) {
    let number1 = parseInt(num1[i]);
    let number2 = parseInt(num2[i]);
    let total = number1 + number2 + addOne;
    let gewei = total % 10;
    let shiwei = Math.floor(total / 10);
    addOne = shiwei;
    if (addOne == 1 && i == 0) {
      resultStr = `1${gewei}${resultStr}`;
    } else {
      resultStr = `${gewei}${resultStr}`;
    }
  }
  return resultStr;
};


console.log('addStrings ', largeNumAdd('12345678', '456789'));

/**
 * JavaScript 浮点数运算的精度问题
 * https://www.html.cn/archives/7340
 */

