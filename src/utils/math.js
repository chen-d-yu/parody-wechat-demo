const add = (arg1, arg2) => {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const c = Math.abs(r1 - r2);
  const m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
const subtract = (arg1, arg2) => {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
const multiply = (arg1, arg2) => {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};
/**
 * 获取小数点位置
 * @param number
 * @returns {number}
 */
const getDecimalPointPosition = (number) => {
  try {
    number = number.toString();
    return number.split(".")[1].length;
  } catch (e) {
    return 0;
  }
};

/**
 *
 * 截取 指定小数点位数的数据,不对数据进行任何转换
 * 如：传入 12.126 digits为2时，返回12.12
 * 传如 12.2 返回值 依然是12.2
 * @param {number |string} number 数字
 * @param {number} digits 保留小数点位数，如果小数点位置不大于要保留的位数则不作处理
 * @param  {boolean} toFixed 为true 使用 toFixed 处理,否则只截取长度不作任何转换
 * @param {boolean} ignoreDecimalsWithZero 忽略掉小数值为0的值如，最后值为123.000，此参数为true时，返回值为123
 * @returns {string | number}
 */
const getDecimalPointWithDigits = (
  number,
  digits = 2,
  toFixed = false,
  ignoreDecimalsWithZero = false
) => {
  number = number.toString();
  const currentDigits = getDecimalPointPosition(number);
  const exceedNum = currentDigits > digits;
  if (exceedNum) {
    if (toFixed) {
      number = (number * 1).toFixed(digits);
    } else {
      number = number.substring(0, number.length - exceedNum);
    }
  }
  if (ignoreDecimalsWithZero) {
    // Number('123')     // 123
    // Number('12.3')    // 12.3
    // Number('12.00')   // 12
    // Number('123e-1')  // 12.3
    // Number('')        // 0
    // Number(null)      // 0
    // Number('0x11')    // 17
    // Number('0b11')    // 3
    // Number('0o11')    // 9
    // Number('foo')     // NaN
    // Number('100a')    // NaN
    // Number('-Infinity') //-Infinity
    number = Number(number);
  }
  return number;
};

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
const divide = (arg1, arg2) => {
  let t1 = 0;
  let t2 = 0;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  const r1 = Number(arg1.toString().replace(".", ""));
  const r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
/**
 * 将0.xxx 转换为百分比
 * @param {float} num 浮点数
 */
const translatePercentage = (num) => {
  return (num * 100).toFixed(2) + "%";
};

export {
  add,
  subtract,
  multiply,
  divide,
  getDecimalPointWithDigits,
  translatePercentage,
};
