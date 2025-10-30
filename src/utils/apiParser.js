/**
 * API 响应解析工具
 * 用于识别数据数组路径、总数路径、分页参数等
 */

/**
 * 递归查找所有可能的数组路径
 * @param {Object} obj - JSON 对象
 * @param {string} prefix - 当前路径前缀
 * @param {number} maxDepth - 最大递归深度
 * @returns {Array<{path: string, sample: Array, length: number}>}
 */
export function findArrayPaths(obj, prefix = 'data', maxDepth = 5) {
  const results = []
  
  function traverse(current, path, depth) {
    if (depth > maxDepth) return
    if (!current || typeof current !== 'object') return
    
    // 如果当前是数组且长度 > 0
    if (Array.isArray(current) && current.length > 0) {
      results.push({
        path: path,
        sample: current.slice(0, 3), // 取前3个作为样例
        length: current.length,
        depth: depth,
        firstItem: current[0]
      })
    }
    
    // 递归处理对象的每个属性
    if (!Array.isArray(current)) {
      for (const key in current) {
        if (current.hasOwnProperty(key)) {
          const newPath = path ? `${path}.${key}` : key
          traverse(current[key], newPath, depth + 1)
        }
      }
    }
  }
  
  traverse(obj, prefix, 0)
  return results
}

/**
 * 查找可能的总数字段
 * @param {Object} obj - JSON 对象
 * @param {string} dataPath - 数据数组路径
 * @returns {Array<{path: string, value: number}>}
 */
export function findTotalPaths(obj, dataPath = '') {
  const results = []
  const commonTotalKeys = ['total', 'totalcount', 'count', 'totalrecords', 'totalelements', 'totalsize']
  
  function traverse(current, path) {
    if (!current || typeof current !== 'object') return
    if (Array.isArray(current)) return // 跳过数组
    
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const value = current[key]
        const newPath = path ? `${path}.${key}` : key
        
        // 如果是数字类型且 key 符合总数命名规范
        if (typeof value === 'number' && commonTotalKeys.includes(key.toLowerCase())) {
          results.push({
            path: newPath,
            value: value,
            score: calculateTotalScore(key, newPath, dataPath)
          })
        }
        
        // 继续递归
        if (typeof value === 'object' && !Array.isArray(value)) {
          traverse(value, newPath)
        }
      }
    }
  }
  
  traverse(obj, '')
  
  // 按评分排序
  results.sort((a, b) => b.score - a.score)
  return results
}

/**
 * 计算总数字段的匹配评分
 * @param {string} key - 字段名
 * @param {string} path - 完整路径
 * @param {string} dataPath - 数据数组路径
 * @returns {number}
 */
function calculateTotalScore(key, path, dataPath) {
  let score = 0
  
  // 精确匹配 'total' 得最高分
  if (key.toLowerCase() === 'total') score += 10
  else if (key.toLowerCase() === 'totalcount') score += 8
  else if (key.toLowerCase().includes('total')) score += 5
  else if (key.toLowerCase() === 'count') score += 3
  
  // 如果与数据路径在同一层级，加分
  if (dataPath) {
    const dataPathParts = dataPath.split('.')
    const totalPathParts = path.split('.')
    
    // 去掉最后一个部分（数组字段名和总数字段名）
    const dataParent = dataPathParts.slice(0, -1).join('.')
    const totalParent = totalPathParts.slice(0, -1).join('.')
    
    if (dataParent === totalParent) {
      score += 15 // 同级字段加高分
    }
  }
  
  return score
}

/**
 * 识别分页参数
 * @param {Object} requestParams - 请求参数对象
 * @returns {Object} { pageNoField, pageSizeField, otherParams }
 */
export function identifyPaginationParams(requestParams) {
  if (!requestParams || typeof requestParams !== 'object') {
    return {
      pageNoField: 'pageNo',
      pageSizeField: 'pageSize',
      otherParams: []
    }
  }
  
  const pageNoVariants = ['page', 'pageno', 'pagenum', 'pagenumber', 'current', 'pageindex']
  const pageSizeVariants = ['pagesize', 'size', 'limit', 'perpage', 'pagecount']
  
  let pageNoField = null
  let pageSizeField = null
  const otherParams = []
  
  for (const key in requestParams) {
    if (requestParams.hasOwnProperty(key)) {
      const lowerKey = key.toLowerCase()
      
      if (pageNoVariants.includes(lowerKey)) {
        pageNoField = key
      } else if (pageSizeVariants.includes(lowerKey)) {
        pageSizeField = key
      } else {
        // 其他参数（可能是搜索条件）
        otherParams.push({
          key: key,
          value: requestParams[key],
          type: inferParamType(requestParams[key])
        })
      }
    }
  }
  
  // 使用默认值如果没有识别到
  return {
    pageNoField: pageNoField || 'pageNo',
    pageSizeField: pageSizeField || 'pageSize',
    otherParams: otherParams
  }
}

/**
 * 推断参数类型
 * @param {*} value - 参数值
 * @returns {string} - 'string' | 'number' | 'boolean' | 'array' | 'object'
 */
function inferParamType(value) {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'string' // null 默认当字符串
  return typeof value
}

/**
 * 从数组第一项提取字段信息
 * @param {Array} array - 数据数组
 * @returns {Array<{key: string, type: string, sample: *}>}
 */
export function extractFieldsFromArray(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return []
  }
  
  const firstItem = array[0]
  if (typeof firstItem !== 'object' || firstItem === null) {
    return []
  }
  
  const fields = []
  for (const key in firstItem) {
    if (firstItem.hasOwnProperty(key)) {
      fields.push({
        key: key,
        type: inferParamType(firstItem[key]),
        sample: firstItem[key]
      })
    }
  }
  
  return fields
}

/**
 * 完整的 API 解析主函数
 * @param {Object} responseData - 响应 JSON
 * @param {Object} requestData - 请求参数 JSON（可选）
 * @returns {Object} 解析结果
 */
export function parseApiData(responseData, requestData = null) {
  // 1. 查找所有可能的数组路径
  const arrayPaths = findArrayPaths(responseData)
  
  if (arrayPaths.length === 0) {
    throw new Error('未在响应中找到数据数组，请检查 JSON 格式')
  }
  
  // 2. 选择最合适的数据路径（优先选择深度较浅、长度较大的）
  const primaryDataPath = arrayPaths.sort((a, b) => {
    // 优先深度浅的
    if (a.depth !== b.depth) return a.depth - b.depth
    // 其次长度大的
    return b.length - a.length
  })[0]
  
  // 3. 查找总数路径
  const totalPaths = findTotalPaths(responseData, primaryDataPath.path)
  const primaryTotalPath = totalPaths.length > 0 ? totalPaths[0] : null
  
  // 4. 提取字段信息
  const fields = extractFieldsFromArray(primaryDataPath.sample)
  
  // 5. 识别分页参数
  const paginationParams = identifyPaginationParams(requestData)
  
  // 6. 识别其他可能的搜索字段
  const searchFields = paginationParams.otherParams.map(param => ({
    prop: param.key,
    type: inferSearchFieldType(param.type, param.value),
    defaultValue: param.value
  }))
  
  return {
    // 数据路径信息
    dataPath: primaryDataPath.path,
    dataPathAlternatives: arrayPaths.slice(1, 3), // 备选路径
    
    // 总数路径信息
    totalPath: primaryTotalPath ? primaryTotalPath.path : null,
    totalPathAlternatives: totalPaths.slice(1, 3),
    
    // 字段信息
    fields: fields,
    
    // 分页参数
    pagination: {
      pageNoField: paginationParams.pageNoField,
      pageSizeField: paginationParams.pageSizeField
    },
    
    // 搜索字段推断
    searchFields: searchFields,
    
    // 原始数据样例
    dataSample: primaryDataPath.sample
  }
}

/**
 * 推断搜索字段的组件类型
 * @param {string} paramType - 参数类型
 * @param {*} value - 参数值
 * @returns {string} - 'input' | 'select' | 'date' | 'daterange'
 */
function inferSearchFieldType(paramType, value) {
  if (paramType === 'array') return 'select'
  if (paramType === 'boolean') return 'select'
  
  // 根据值的模式推断
  if (typeof value === 'string') {
    // 日期格式
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'date'
    // 时间戳
    if (/^\d{13}$/.test(value)) return 'date'
  }
  
  return 'input' // 默认输入框
}

/**
 * 生成路径表达式（用于代码生成）
 * @param {string} path - 点分隔路径 (e.g., "data.rows")
 * @returns {string} - 代码表达式 (e.g., "data.rows")
 */
export function generatePathExpression(path) {
  if (!path) return ''
  
  // 如果路径以 'data' 开头（表示从 response.data 开始）
  if (path.startsWith('data.')) {
    return path.substring(5) // 去掉 'data.' 前缀
  }
  
  return path
}

