/**
 * 工具函数列表配置
 * 用于 @mention 下拉菜单
 */

export const utilsList = [
  // 日期时间
  {
    name: 'formatDate',
    label: '格式化日期',
    category: '日期时间',
    description: '格式化日期为指定格式',
    usage: '$formatDate(date, "YYYY-MM-DD")',
    params: ['date', 'format'],
  },
  {
    name: 'formatTime',
    label: '格式化时间',
    category: '日期时间',
    description: '格式化时间',
    usage: '$formatTime(time)',
    params: ['time'],
  },
  {
    name: 'formatDateTime',
    label: '格式化日期时间',
    category: '日期时间',
    description: '格式化日期时间',
    usage: '$formatDateTime(datetime)',
    params: ['datetime'],
  },
  {
    name: 'parseDate',
    label: '解析日期',
    category: '日期时间',
    description: '解析日期字符串',
    usage: '$parseDate(dateStr)',
    params: ['dateStr'],
  },
  {
    name: 'getDateRange',
    label: '获取日期范围',
    category: '日期时间',
    description: '获取时间范围（今天、本周、本月等）',
    usage: '$getDateRange("today")',
    params: ['type'],
  },

  // 数字格式化
  {
    name: 'formatMoney',
    label: '格式化金额',
    category: '数字格式化',
    description: '格式化金额（千分位、保留小数）',
    usage: '$formatMoney(amount, 2)',
    params: ['amount', 'decimals'],
  },
  {
    name: 'formatNumber',
    label: '格式化数字',
    category: '数字格式化',
    description: '格式化数字（千分位）',
    usage: '$formatNumber(num)',
    params: ['num'],
  },
  {
    name: 'formatPercent',
    label: '格式化百分比',
    category: '数字格式化',
    description: '格式化为百分比',
    usage: '$formatPercent(value)',
    params: ['value'],
  },
  {
    name: 'toFixed',
    label: '保留小数',
    category: '数字格式化',
    description: '保留指定位数小数',
    usage: '$toFixed(num, 2)',
    params: ['num', 'decimals'],
  },

  // 字符串处理
  {
    name: 'trim',
    label: '去除空格',
    category: '字符串处理',
    description: '去除首尾空格',
    usage: '$trim(str)',
    params: ['str'],
  },
  {
    name: 'truncate',
    label: '截断文本',
    category: '字符串处理',
    description: '截断超长文本',
    usage: '$truncate(text, 20)',
    params: ['text', 'maxLength'],
  },
  {
    name: 'capitalize',
    label: '首字母大写',
    category: '字符串处理',
    description: '首字母大写',
    usage: '$capitalize(str)',
    params: ['str'],
  },
  {
    name: 'camelCase',
    label: '驼峰命名',
    category: '字符串处理',
    description: '转换为驼峰命名',
    usage: '$camelCase(str)',
    params: ['str'],
  },
  {
    name: 'kebabCase',
    label: '短横线命名',
    category: '字符串处理',
    description: '转换为短横线命名',
    usage: '$kebabCase(str)',
    params: ['str'],
  },

  // 数据处理
  {
    name: 'deepClone',
    label: '深拷贝',
    category: '数据处理',
    description: '深度克隆对象或数组',
    usage: '$deepClone(obj)',
    params: ['obj'],
  },
  {
    name: 'merge',
    label: '合并对象',
    category: '数据处理',
    description: '合并多个对象',
    usage: '$merge(obj1, obj2)',
    params: ['obj1', 'obj2'],
  },
  {
    name: 'pick',
    label: '提取属性',
    category: '数据处理',
    description: '从对象中提取指定属性',
    usage: '$pick(obj, ["id", "name"])',
    params: ['obj', 'keys'],
  },
  {
    name: 'omit',
    label: '排除属性',
    category: '数据处理',
    description: '排除对象的指定属性',
    usage: '$omit(obj, ["password"])',
    params: ['obj', 'keys'],
  },

  // 数组处理
  {
    name: 'unique',
    label: '数组去重',
    category: '数组处理',
    description: '数组去重',
    usage: '$unique(arr)',
    params: ['arr'],
  },
  {
    name: 'groupBy',
    label: '分组',
    category: '数组处理',
    description: '按属性分组',
    usage: '$groupBy(arr, "category")',
    params: ['arr', 'key'],
  },
  {
    name: 'sortBy',
    label: '排序',
    category: '数组处理',
    description: '按属性排序',
    usage: '$sortBy(arr, "createTime")',
    params: ['arr', 'key'],
  },
  {
    name: 'flatten',
    label: '数组扁平化',
    category: '数组处理',
    description: '多维数组扁平化',
    usage: '$flatten(arr)',
    params: ['arr'],
  },

  // 性能优化
  {
    name: 'debounce',
    label: '防抖',
    category: '性能优化',
    description: '函数防抖（延迟执行）',
    usage: '$debounce(fn, 300)',
    params: ['fn', 'delay'],
  },
  {
    name: 'throttle',
    label: '节流',
    category: '性能优化',
    description: '函数节流（限制频率）',
    usage: '$throttle(fn, 1000)',
    params: ['fn', 'interval'],
  },

  // 校验判断
  {
    name: 'isEmpty',
    label: '是否为空',
    category: '校验判断',
    description: '判断值是否为空',
    usage: '$isEmpty(value)',
    params: ['value'],
  },
  {
    name: 'isArray',
    label: '是否数组',
    category: '校验判断',
    description: '判断是否为数组',
    usage: '$isArray(value)',
    params: ['value'],
  },
  {
    name: 'isObject',
    label: '是否对象',
    category: '校验判断',
    description: '判断是否为对象',
    usage: '$isObject(value)',
    params: ['value'],
  },
  {
    name: 'isFunction',
    label: '是否函数',
    category: '校验判断',
    description: '判断是否为函数',
    usage: '$isFunction(value)',
    params: ['value'],
  },

  // URL 处理
  {
    name: 'getQueryParam',
    label: '获取URL参数',
    category: 'URL处理',
    description: '获取URL查询参数',
    usage: '$getQueryParam("id")',
    params: ['key'],
  },
  {
    name: 'buildQueryString',
    label: '构建查询字符串',
    category: 'URL处理',
    description: '对象转查询字符串',
    usage: '$buildQueryString(params)',
    params: ['params'],
  },

  // 文件处理
  {
    name: 'downloadFile',
    label: '下载文件',
    category: '文件处理',
    description: '下载文件',
    usage: '$downloadFile(url, filename)',
    params: ['url', 'filename'],
  },
  {
    name: 'exportExcel',
    label: '导出Excel',
    category: '文件处理',
    description: '导出数据为Excel',
    usage: '$exportExcel(data, filename)',
    params: ['data', 'filename'],
  },
  {
    name: 'getFileExt',
    label: '获取文件扩展名',
    category: '文件处理',
    description: '获取文件扩展名',
    usage: '$getFileExt(filename)',
    params: ['filename'],
  },
]

export default utilsList

