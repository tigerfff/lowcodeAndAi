/**
 * AI 推断服务单元测试
 */

import { describe, it, expect } from 'vitest'
import { localInference } from '../src/services/ai-inference.js'

describe('AI Inference - 本地推断', () => {
  it('应该正确推断标准列表页配置', () => {
    const parseResult = {
      dataPath: 'data.rows',
      totalPath: 'data.total',
      fields: [
        { key: 'userId', type: 'number', sample: 1 },
        { key: 'userName', type: 'string', sample: '张三' },
        { key: 'phone', type: 'string', sample: '13800138000' },
        { key: 'status', type: 'string', sample: 'active' },
        { key: 'createTime', type: 'string', sample: '2024-01-01 10:00:00' }
      ],
      dataSample: [
        {
          userId: 1,
          userName: '张三',
          phone: '13800138000',
          status: 'active',
          createTime: '2024-01-01 10:00:00'
        },
        {
          userId: 2,
          userName: '李四',
          phone: '13900139000',
          status: 'inactive',
          createTime: '2024-01-02 11:00:00'
        }
      ],
      pagination: {
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize'
      },
      searchFields: [
        { prop: 'userName', type: 'input', defaultValue: '' },
        { prop: 'status', type: 'select', defaultValue: '' }
      ]
    }

    const config = localInference(parseResult)

    // 验证基本结构
    expect(config).toHaveProperty('templateId', 'standard-list')
    expect(config).toHaveProperty('pageName', 'GeneratedPage')
    expect(config).toHaveProperty('columns')
    expect(config).toHaveProperty('searchFields')
    expect(config).toHaveProperty('dataMapping')

    // 验证 dataMapping
    expect(config.dataMapping.dataPath).toBe('data.rows')
    expect(config.dataMapping.totalPath).toBe('data.total')
    expect(config.dataMapping.pageNoField).toBe('pageNo')
    expect(config.dataMapping.pageSizeField).toBe('pageSize')

    // 验证列配置
    expect(config.columns).toHaveLength(5)

    const userIdCol = config.columns.find(col => col.prop === 'userId')
    expect(userIdCol).toBeDefined()
    expect(userIdCol.label).toContain('ID')
    expect(userIdCol.type).toBe('text')
    expect(userIdCol.width).toBe('80')

    const userNameCol = config.columns.find(col => col.prop === 'userName')
    expect(userNameCol).toBeDefined()
    expect(userNameCol.label).toContain('名称')
    expect(userNameCol.type).toBe('text')

    const statusCol = config.columns.find(col => col.prop === 'status')
    expect(statusCol).toBeDefined()
    expect(statusCol.type).toBe('tag')
    expect(statusCol.mapping).toBeDefined()
    expect(statusCol.mapping.active).toBeDefined()
    expect(statusCol.mapping.active.label).toBe('启用')

    const timeCol = config.columns.find(col => col.prop === 'createTime')
    expect(timeCol).toBeDefined()
    expect(timeCol.type).toBe('datetime')

    // 验证搜索字段
    expect(config.searchFields).toHaveLength(2)

    const nameSearch = config.searchFields.find(f => f.prop === 'userName')
    expect(nameSearch).toBeDefined()
    expect(nameSearch.type).toBe('input')

    const statusSearch = config.searchFields.find(f => f.prop === 'status')
    expect(statusSearch).toBeDefined()
    expect(statusSearch.type).toBe('select')
    expect(statusSearch.options).toBeDefined()
    expect(statusSearch.options.length).toBeGreaterThan(0)
  })

  it('应该正确推断列类型', () => {
    const parseResult = {
      dataPath: 'data.list',
      totalPath: 'data.total',
      fields: [
        { key: 'orderId', type: 'string', sample: 'O001' },
        { key: 'orderTime', type: 'string', sample: '2024-01-01 10:00:00' },
        { key: 'updatedAt', type: 'string', sample: '2024-01-02' },
        { key: 'orderType', type: 'string', sample: '1' },
        { key: 'isActive', type: 'boolean', sample: true }
      ],
      dataSample: [],
      pagination: {
        pageNoField: 'page',
        pageSizeField: 'size'
      },
      searchFields: []
    }

    const config = localInference(parseResult)

    const orderIdCol = config.columns.find(col => col.prop === 'orderId')
    expect(orderIdCol.type).toBe('text')
    expect(orderIdCol.width).toBe('80') // ID 类字段

    const timeCol = config.columns.find(col => col.prop === 'orderTime')
    expect(timeCol.type).toBe('datetime')

    const updatedCol = config.columns.find(col => col.prop === 'updatedAt')
    expect(updatedCol.type).toBe('datetime')

    const typeCol = config.columns.find(col => col.prop === 'orderType')
    expect(typeCol.type).toBe('tag') // type 结尾

    const isActiveCol = config.columns.find(col => col.prop === 'isActive')
    expect(isActiveCol.type).toBe('tag') // is 开头
  })

  it('应该正确推断状态映射', () => {
    const parseResult = {
      dataPath: 'data.items',
      totalPath: 'data.total',
      fields: [
        { key: 'status', type: 'string', sample: 'active' }
      ],
      dataSample: [
        { status: 'active' },
        { status: 'inactive' },
        { status: 'pending' }
      ],
      pagination: {
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize'
      },
      searchFields: []
    }

    const config = localInference(parseResult)

    const statusCol = config.columns.find(col => col.prop === 'status')
    expect(statusCol.mapping).toBeDefined()
    expect(statusCol.mapping.active).toEqual({
      label: '启用',
      type: 'success'
    })
    expect(statusCol.mapping.inactive).toEqual({
      label: '停用',
      type: 'info'
    })
    expect(statusCol.mapping.pending).toEqual({
      label: '待处理',
      type: 'warning'
    })
  })

  it('应该正确推断搜索字段选项', () => {
    const parseResult = {
      dataPath: 'data.list',
      totalPath: 'data.total',
      fields: [],
      dataSample: [
        { status: 'active' },
        { status: 'inactive' }
      ],
      pagination: {
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize'
      },
      searchFields: [
        { prop: 'status', type: 'select', defaultValue: '' }
      ]
    }

    const config = localInference(parseResult)

    const statusSearch = config.searchFields.find(f => f.prop === 'status')
    expect(statusSearch.options).toBeDefined()
    expect(statusSearch.options[0]).toEqual({ label: '全部', value: '' })
    expect(statusSearch.options.length).toBeGreaterThan(1)
  })

  it('应该为所有项添加置信度', () => {
    const parseResult = {
      dataPath: 'data.rows',
      totalPath: 'data.total',
      fields: [
        { key: 'id', type: 'number', sample: 1 },
        { key: 'name', type: 'string', sample: 'test' }
      ],
      dataSample: [],
      pagination: {
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize'
      },
      searchFields: []
    }

    const config = localInference(parseResult)

    config.columns.forEach(col => {
      expect(col).toHaveProperty('confidence')
      expect(col.confidence).toBeGreaterThan(0)
      expect(col.confidence).toBeLessThanOrEqual(1)
    })
  })
})

