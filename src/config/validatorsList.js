/**
 * 校验规则列表配置
 * 用于 @mention 下拉菜单
 */

export const validatorsList = [
  // 基础校验
  {
    name: 'required',
    label: '必填',
    category: '基础校验',
    description: '必填项校验',
    usage: '!required',
  },
  {
    name: 'minLength',
    label: '最小长度',
    category: '基础校验',
    description: '最小长度校验',
    usage: '!minLength(3)',
  },
  {
    name: 'maxLength',
    label: '最大长度',
    category: '基础校验',
    description: '最大长度校验',
    usage: '!maxLength(32)',
  },
  {
    name: 'lengthRange',
    label: '长度范围',
    category: '基础校验',
    description: '长度范围校验',
    usage: '!lengthRange(3, 32)',
  },

  // 格式校验
  {
    name: 'phone',
    label: '手机号',
    category: '格式校验',
    description: '手机号格式校验',
    usage: '!phone',
  },
  {
    name: 'phoneOrTel',
    label: '电话号码',
    category: '格式校验',
    description: '固定电话或手机号',
    usage: '!phoneOrTel',
  },
  {
    name: 'email',
    label: '邮箱',
    category: '格式校验',
    description: '邮箱格式校验',
    usage: '!email',
  },
  {
    name: 'idCard',
    label: '身份证',
    category: '格式校验',
    description: '身份证号校验',
    usage: '!idCard',
  },
  {
    name: 'url',
    label: 'URL地址',
    category: '格式校验',
    description: 'URL格式校验',
    usage: '!url',
  },
  {
    name: 'password',
    label: '密码',
    category: '格式校验',
    description: '密码格式（8-16位，字母+数字）',
    usage: '!password',
  },
  {
    name: 'strongPassword',
    label: '强密码',
    category: '格式校验',
    description: '强密码（8-16位，字母+数字，不含空格）',
    usage: '!strongPassword',
  },
  {
    name: 'account',
    label: '账号',
    category: '格式校验',
    description: '账号格式（1-32位，不能纯数字）',
    usage: '!account',
  },

  // 数字校验
  {
    name: 'number',
    label: '纯数字',
    category: '数字校验',
    description: '纯数字校验',
    usage: '!number',
  },
  {
    name: 'decimal',
    label: '数字或小数',
    category: '数字校验',
    description: '数字或小数校验',
    usage: '!decimal',
  },
  {
    name: 'decimal2',
    label: '小数（2位）',
    category: '数字校验',
    description: '数字或小数（最多2位小数）',
    usage: '!decimal2',
  },
  {
    name: 'positiveInteger',
    label: '正整数',
    category: '数字校验',
    description: '正整数校验（大于0）',
    usage: '!positiveInteger',
  },

  // 特殊字符校验
  {
    name: 'noPercent',
    label: '不允许%',
    category: '特殊字符',
    description: '不允许%字符',
    usage: '!noPercent',
  },
  {
    name: 'noSpecialChar',
    label: '无特殊字符',
    category: '特殊字符',
    description: '不允许特殊字符',
    usage: '!noSpecialChar',
  },
  {
    name: 'limitedSpecialChar',
    label: '限制特殊字符',
    category: '特殊字符',
    description: '限制部分特殊字符',
    usage: '!limitedSpecialChar',
  },
  {
    name: 'noSpace',
    label: '不允许空格',
    category: '特殊字符',
    description: '不允许包含空格',
    usage: '!noSpace',
  },

  // 组合校验
  {
    name: 'commonText',
    label: '通用文本',
    category: '组合校验',
    description: '1-32字符，常用符号',
    usage: '!commonText',
  },
  {
    name: 'commonText16',
    label: '通用文本16',
    category: '组合校验',
    description: '1-16字符，常用符号',
    usage: '!commonText16',
  },
  {
    name: 'commonTextLong',
    label: '通用文本长',
    category: '组合校验',
    description: '1-128字符',
    usage: '!commonTextLong',
  },
  {
    name: 'remark',
    label: '备注',
    category: '组合校验',
    description: '1-500字符',
    usage: '!remark',
  },
  {
    name: 'textArea',
    label: '文本域',
    category: '组合校验',
    description: '1-5000字符，支持换行',
    usage: '!textArea',
  },
  {
    name: 'userName',
    label: '用户姓名',
    category: '组合校验',
    description: '1-32字符，首尾不能为空格',
    usage: '!userName',
  },
]

export default validatorsList

