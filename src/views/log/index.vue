<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-select v-model="s_appcode" placeholder="请选择应用">
        <el-option
          v-for="item in appList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-form-item label="级别">
        <el-input v-model="s_level" placeholder="级别" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="s_content" placeholder="内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="120">
        <router-link slot-scope="scope" :to="{name:'detail', params:{'id':scope.row.id,'appcode':scope.row.appcode}}" target="_blank">
          {{ scope.row.id }}
        </router-link>
      </el-table-column>
      <el-table-column align="center" label="时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="级别" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/log'
import { getAppList } from '@/api/app'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      s_appcode: '',
      appList: [
        // {label: "海鸥派OMS2", value:"hop-oms"},
        // {label: "海鸥派TMS2", value:"hop-tms"}
      ],
      list: null,
      listLoading: true,
      page: 1,
      total: 0,
      pageSize: 12,
      s_level: '',
      s_content: ''
    }
  },
  created() {
    this.fetchData()
    this.fetchAppList()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = {}
      params.page = this.page
      params.pageSize = this.pageSize
      params.content = this.s_content
      params.appcode = this.s_appcode
      params.level = this.s_level
      getList(params).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      }).catch(e => {
        this.listLoading = false
      })
    },

    fetchAppList() {
      const params = {}
      getAppList(params).then(response => {
        const data = response.data
        this.appList = data.map(item => {
          return { 'label': item.name, 'value': item.code }
        })
      }).catch(e => {

      })
    },

    pageChange(nowPage) {
      this.page = nowPage
      this.fetchData()
    },

    onSubmit() {
      this.fetchData()
    }
  }
}
</script>
