<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="级别">
        <el-input v-model="s_level" placeholder="级别" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="s_context" placeholder="内容" />
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
        <router-link slot-scope="scope" to="/log/detail" target="_blank">
          {{ scope.$index }} {{ scope.row.id }}
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
      list: null,
      listLoading: true,
      page: 1,
      total: 0,
      pageSize: 12,
      s_level: '',
      s_context: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = {}
      params.page = this.page
      params.url = this.s_url
      params.category = this.s_category
      params.context = this.s_context
      getList(params).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      }).catch(e => {
        this.listLoading = false
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
