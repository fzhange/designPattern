// ~  质数（素数） 判断
function isPrime(inputNumber) {
  // 1既不是质数也不是合数
  if (inputNumber == 1) return false;
  for (let i = 2; i * i <= inputNumber; i++) {
    if (inputNumber % i === 0) return false;
  }
  return true;
}
console.log('judgeNumber("123"): ', isPrime(500));

// ~ 二数相加
function add(num1, num2) {
  let [, num1_decimal] = `${num1}`.split(".")
  let [, num2_decimal] = `${num2}`.split(".")
  len = Math.max(num1_decimal, num2_decimal)
  num1 = num1 * Math.pow(10, len)
  num2 = num2 * Math.pow(10, len)
  return (num1 + num2) / Math.pow(10, len)
}
console.log('add(0.1,0.2): ', add(0.1, 0.2));




