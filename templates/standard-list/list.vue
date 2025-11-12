<!-- 列表页Demo -->
<template>
    <h-page-container class="list">
      <!-- 面包屑 -->
      <h-page-header :breadcrumb="breadcrumb" />
      
      <h-page-content>
        <!-- 搜索条件 -->
        <h-page-search ref="filters" :model="filters">
          <h-page-search-item label="输入框">
            <el-input placeholder="请输入" v-model="filters.input"></el-input>
          </h-page-search-item>
          <h-page-search-item label="下拉框">
            <el-select v-model="filters.select" placeholder="请选择">
              <el-option
                v-for="item in selectOpt"
                :key="item.value" 
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </h-page-search-item>
          <h-page-search-item label="日期选择框">
            <el-date-picker
              v-model="filters.dataRange"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-date-picker>
          </h-page-search-item>
          
          <template slot="pageSearchAction">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </template>
        </h-page-search>
  
        <!-- 表格 -->
        <h-page-table>
          <el-table
            :data="list"
            show-overflow-title
            stripe
          >
            <el-table-column label="列1" prop="column1" />
            <el-table-column label="列2" prop="column2" />
            <el-table-column label="列3" prop="column3" />
            <el-table-column label="列4" prop="column4" />
            <el-table-column label="列5">
              <template v-slot="scope">
                {{'这是第5列:' + scope.row.column5}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <span class="opt_text">详情</span>
                <span class="opt_text">编辑</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-pagination
            slot="pagination"
            :current-page.sync="pagination.pageNo"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="onSizeChange"
            @current-change="onPageChange"
          />
        </h-page-table>
      </h-page-content>
    </h-page-container>
  </template>
  
  <script>
  // import api from '@/api/xxx'
  
  export default {
    name: 'List',
    data () {
      return {
        selectOpt: [{ value: '111', label: '选项1' }, { value: '222', label: '选项2' }],
        filters: {
          input: '',
          select: '',
          dataRange: [],
        },
        list: [],
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 20,
          pageSizes: [10, 20, 50, 100]
        }
      }
    },
    methods: {
      /**
       * 查询
       */
      async search () {
        const { pageNo, pageSize } = this.pagination
        
        let params = {
          // ...
          pageNo,
          pageSize
        }
        // const { data } = await api.getxxx(params)
        // this.list = data.rows || []
        // this.pagination.total = data.total
      },
  
      /**
       * 重置
       */
      reset () {
        this.filters.input = ''
        this.filters.select = ''
        this.filters.dataRange = []
        this.search()
      },
      onPageChange (page) {
        this.pagination.pageNo = page
        this.search()
      },
      onSizeChange (size) {
        this.pagination.pageSize = size
        this.search()
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>