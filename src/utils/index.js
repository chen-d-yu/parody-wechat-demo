import dayjs from 'dayjs';

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match
      .replace(/height="[^"]+"/gi, '')
      .replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
    match = match
      .replace(/width:[^;]+;/gi, 'max-width:100%;')
      .replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(
    /\<img/gi,
    '<img style="width:100%;max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
  );
  return newContent;
}

function transPrice(val) {
  if (!val) {
    return {};
  }
  const price = Number(val ?? '');
  const [yuan, hair] = price.toString().split('.');
  return {
    yuan: `${yuan}${hair ? '.' : ''}`,
    hair,
  };
}

const verifyPhone = (phoneNumber) => {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    phoneNumber
  );
};

const verifyId = (id) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    id
  );
};

/**
 * 匹配手机号的4-7的数字位置变成*
 * @example 13800138000 -> 138****8000
 * @param {string} phone
 * @returns
 */
export const encryptPhone = (phone) =>
  phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

/**
 * 切割传入的数字，返回一个数组
 * 传入一个数字，判断数字是否含有小数
 * 如果有小数，返回切割后的[整数, ., 小数]，如果没有小数，返回[整数, undefined, undefined]
 * @param {number|string} decimal - 需要切割的数字
 * @returns {Array<any>}
 */
const cutDecimal = (decimal) => {
  const decimalStr = `${Number(decimal)}`;
  const index = decimalStr.indexOf('.');
  return index === -1
    ? [decimalStr, undefined, undefined]
    : [decimalStr.slice(0, index), '.', decimalStr.slice(index + 1)];
};

/**
 * Formats a currency amount into a string representation with a minimum of two fraction digits.
 * @example 1000.02 => 1,000.02
 * @param {number} amount - The amount to be formatted.
 * @return {string} The formatted currency amount.
 */
export const formatCurrency = (amount) => {
  if (!amount) {
    return amount;
  }
  if (typeof amount !== 'number') {
    amount = Number(amount);
  }
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
};

/*
 * 传入开始时间、结束时间，返回他们之间的时间差，单位默认为毫秒
 * @param {*} endTime
 * @param {*} startTime - 开始时间，如果不传，默认为当前时间
 * @param {*} unit - 返回的时间差的单位，默认为秒
 */
const getDiffTime = (endTime = dayjs(), startTime = dayjs()) => {
  const endTimeMs = dayjs(endTime).valueOf();
  const newMs = dayjs(startTime).valueOf();
  const diffMs = endTimeMs - newMs;

  if (diffMs <= 0) {
    return 0;
  }

  return diffMs;
};

/**
 * 复制文本到剪切板
 * @param {*} text
 */
const copyToClipboard = (text) => {
  uni.setClipboardData({
    data: text,
  });
};

const getElementBoundingRect = (selector, app) => {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(app)
      .select(selector)
      .boundingClientRect((data) => {
        data && resolve(data);
      })
      .exec();
  });
};

const httpUrlToHttps = (url) => {
  // 正则检查url是否以http开头，有就转为https，无就返回原样
  let reg = /^(http)(?!s)/;
  return reg.test(url) ? url.replace(reg, 'https') : url;
};

function extractMonthDayHourMinuteSecond(dateTimeString) {
  // 假设dateTimeString的格式是 "YYYY-MM-DD HH:mm:ss"
  // 使用正则表达式来匹配并捕获月、日、时、分、秒部分
  let match = dateTimeString.match(/(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);

  if (match) {
    // 匹配成功，match[1]是月，match[2]是日，match[3]是时，match[4]是分，match[5]是秒
    return `${match[1]}-${match[2]} ${match[3]}:${match[4]}:${match[5]}`;
  } else {
    // 匹配失败，可能是日期时间字符串格式不正确
    return null; // 或者抛出一个错误
  }
}

function getRecentMonthDateRange() {
  // 获取当前日期和时间
  let now = new Date();

  // 创建一个表示一个月前的时间的对象
  // 注意：这里简单使用Date的setDate方法减去30天，不考虑月份天数差异
  let oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  // 格式化日期时间
  function formatDateTime(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // 格式化开始和结束时间
  let startDate = formatDateTime(oneMonthAgo);
  let endDate = formatDateTime(now);

  // 返回区间
  return {
    startDate: startDate,
    endDate: endDate,
  };
}

// 防抖
const debounce = (fn, delay = 500) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export {
  extractMonthDayHourMinuteSecond,
  formatRichText,
  transPrice,
  verifyPhone,
  verifyId,
  cutDecimal,
  getDiffTime,
  copyToClipboard,
  getElementBoundingRect,
  httpUrlToHttps,
  getRecentMonthDateRange,
  debounce,
};
