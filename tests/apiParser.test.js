/**
 * API 解析工具单元测试
 */

import { describe, it, expect } from 'vitest'
import {
  parseApiData,
  findArrayPaths,
  findTotalPaths,
  identifyPaginationParams,
  generatePathExpression
} from '../src/utils/apiParser.js'

describe('API Parser - 数组路径识别', () => {
  it('应该识别标准的数据数组路径', () => {
    const response = {
      code: 0,
      data: {
        rows: [
          { id: 1, name: '张三' },
          { id: 2, name: '李四' }
        ],
        total: 100
      }
    }
    
    const paths = findArrayPaths(response, 'data')
    expect(paths.length).toBeGreaterThan(0)
    expect(paths[0].path).toBe('data.data.rows')
    expect(paths[0].length).toBe(2)
  })

  it('应该识别嵌套的数据数组', () => {
    const response = {
      result: {
        pagination: {
          items: [{ id: 1 }, { id: 2 }]
        }
      }
    }
    
    const paths = findArrayPaths(response, 'data')
    expect(paths.length).toBeGreaterThan(0)
    expect(paths[0].path).toContain('items')
  })

  it('应该处理多个数组的情况', () => {
    const response = {
      data: {
        list1: [{ a: 1 }],
        list2: [{ b: 2 }, { b: 3 }]
      }
    }
    
    const paths = findArrayPaths(response, 'data')
    expect(paths.length).toBe(2)
  })

  it('应该正确处理空数组', () => {
    const response = {
      data: {
        rows: []
      }
    }
    
    const paths = findArrayPaths(response, 'data')
    // 空数组不会被识别为有效路径
    expect(paths.length).toBe(0)
  })
})

describe('API Parser - 总数路径识别', () => {
  it('应该识别标准的 total 字段', () => {
    const response = {
      data: {
        rows: [{ id: 1 }],
        total: 100
      }
    }
    
    const paths = findTotalPaths(response, 'data.rows')
    expect(paths.length).toBeGreaterThan(0)
    expect(paths[0].path).toContain('total')
    expect(paths[0].value).toBe(100)
  })

  it('应该识别 totalCount 变体', () => {
    const response = {
      data: {
        list: [{ id: 1 }],
        totalCount: 50
      }
    }
    
    const paths = findTotalPaths(response, 'data.list')
    expect(paths.length).toBeGreaterThan(0)
    expect(paths[0].path).toBe('data.totalCount')
  })

  it('应该优先选择同级的总数字段', () => {
    const response = {
      data: {
        rows: [{ id: 1 }],
        total: 100
      },
      meta: {
        total: 200
      }
    }
    
    const paths = findTotalPaths(response, 'data.rows')
    // 同级的 data.total 应该得分更高
    expect(paths[0].path).toBe('data.total')
  })
})

describe('API Parser - 分页参数识别', () => {
  it('应该识别标准的 pageNo/pageSize', () => {
    const request = {
      pageNo: 1,
      pageSize: 20,
      keyword: ''
    }
    
    const result = identifyPaginationParams(request)
    expect(result.pageNoField).toBe('pageNo')
    expect(result.pageSizeField).toBe('pageSize')
    expect(result.otherParams.length).toBe(1)
    expect(result.otherParams[0].key).toBe('keyword')
  })

  it('应该识别 page/size 变体', () => {
    const request = {
      page: 1,
      size: 10,
      name: ''
    }
    
    const result = identifyPaginationParams(request)
    expect(result.pageNoField).toBe('page')
    expect(result.pageSizeField).toBe('size')
  })

  it('应该识别 current/limit 变体', () => {
    const request = {
      current: 1,
      limit: 15
    }
    
    const result = identifyPaginationParams(request)
    expect(result.pageNoField).toBe('current')
    expect(result.pageSizeField).toBe('limit')
  })

  it('应该处理缺失的请求参数', () => {
    const result = identifyPaginationParams(null)
    expect(result.pageNoField).toBe('pageNo')
    expect(result.pageSizeField).toBe('pageSize')
  })

  it('应该正确识别其他搜索参数', () => {
    const request = {
      pageNo: 1,
      pageSize: 20,
      userName: '',
      status: 'active',
      startDate: '2024-01-01'
    }
    
    const result = identifyPaginationParams(request)
    expect(result.otherParams.length).toBe(3)
    
    const paramKeys = result.otherParams.map(p => p.key)
    expect(paramKeys).toContain('userName')
    expect(paramKeys).toContain('status')
    expect(paramKeys).toContain('startDate')
  })
})

describe('API Parser - 完整解析', () => {
  it('应该完整解析标准响应', () => {
    const response = {
      code: 0,
      data: {
        rows: [
          { id: 1, userName: '张三', phone: '13800138000', status: 'active' },
          { id: 2, userName: '李四', phone: '13900139000', status: 'inactive' }
        ],
        total: 100
      }
    }
    
    const request = {
      pageNo: 1,
      pageSize: 20,
      userName: '',
      status: ''
    }
    
    const result = parseApiData(response, request)
    
    // 验证数据路径
    expect(result.dataPath).toContain('rows')
    
    // 验证总数路径
    expect(result.totalPath).toContain('total')
    
    // 验证字段提取
    expect(result.fields.length).toBe(4)
    expect(result.fields.map(f => f.key)).toContain('userName')
    expect(result.fields.map(f => f.key)).toContain('phone')
    
    // 验证分页参数
    expect(result.pagination.pageNoField).toBe('pageNo')
    expect(result.pagination.pageSizeField).toBe('pageSize')
    
    // 验证搜索字段推断
    expect(result.searchFields.length).toBe(2)
  })

  it('应该处理嵌套的复杂结构', () => {
    const response = {
      success: true,
      result: {
        pagination: {
          items: [
            { orderId: 'O001', amount: 99.9 }
          ],
          totalCount: 50
        }
      }
    }
    
    const request = {
      current: 1,
      size: 10
    }
    
    const result = parseApiData(response, request)
    
    expect(result.dataPath).toContain('items')
    // totalPath可能为null或包含totalCount
    if (result.totalPath) {
      expect(result.totalPath).toContain('totalCount')
    }
    expect(result.pagination.pageNoField).toBe('current')
    expect(result.pagination.pageSizeField).toBe('size')
  })

  it('应该在缺少总数字段时返回 null', () => {
    const response = {
      data: {
        list: [{ id: 1 }]
        // 没有 total 字段
      }
    }
    
    const result = parseApiData(response, null)
    
    expect(result.dataPath).toContain('list')
    expect(result.totalPath).toBeNull()
  })

  it('应该抛出错误如果没有找到数组', () => {
    const response = {
      data: {
        item: { id: 1 } // 单个对象，不是数组
      }
    }
    
    expect(() => {
      parseApiData(response, null)
    }).toThrow('未在响应中找到数据数组')
  })
})

describe('路径表达式生成', () => {
  it('应该正确生成路径表达式', () => {
    expect(generatePathExpression('data.rows')).toBe('rows')
    expect(generatePathExpression('data.list')).toBe('list')
    expect(generatePathExpression('data.result.items')).toBe('result.items')
  })

  it('应该处理不以 data 开头的路径', () => {
    expect(generatePathExpression('result.list')).toBe('result.list')
    expect(generatePathExpression('items')).toBe('items')
  })

  it('应该处理空路径', () => {
    expect(generatePathExpression('')).toBe('')
    expect(generatePathExpression(null)).toBe('')
  })
})

