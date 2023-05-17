// 手机号码
export const Tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

// 邮箱
export const Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// 身份证号
export const IdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 银行卡号
export const BankCard = /^([1-9]{1})(\d{14}|\d{18})$/;

// 汉字
export const Chinese = /^[u4e00-u9fa5]$/;

// 字母
export const Letter = /^[A-Za-z]*$/;

// url域名
export const Url = /^(https?:|mailto:|tel:)$/;

// 汉字数字字母(1~50)
export const ChineseCharacterAlphanumeric = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,50}$/;
// 分数正则
export const Score = /^([0-9]|10)$/;

export default {
  Tel,
  Email,
  IdCard,
  BankCard,
  Chinese,
  Letter,
  Url,
  ChineseCharacterAlphanumeric,
};
