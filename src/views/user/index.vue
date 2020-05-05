<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="账户">
        <el-input v-model="username" placeholder="账户" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="email" placeholder="Email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="onAdd()"> 新增 </el-button>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="username"
        label="账户"
        width="180"
      />
      <el-table-column
        prop="email"
        label="Email"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
      />

      <el-table-column label="是否禁用">
        <template slot-scope="scope">
          {{ scope.row.is_disable | isDisable }}
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-link @click="onEditUser(scope.row)">编辑</el-link>
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

    <add-user-form :isopen.sync="addUserVisibe" @onSuccess="onSuccess" />
    <edit-user-form :user="editUser" :isopen.sync="editUserVisibe" @onSuccess="onSuccess" />
  </div>
</template>

<script>
import { getList } from '@/api/user'
import AddUserForm from './add'
import EditUserForm from './edit'
export default {
  filters: {
    isDisable(val) {
      return val === 1 ? '是' : '否'
    }
  },
  components: {
    AddUserForm,
    EditUserForm
  },
  data() {
    return {
      username: '',
      email: '',
      pageSize: 12,
      page: 1,
      list: [
        { id: 2, username: 'name1', email: 'dsada@qq.com' },
        { id: 3, username: 'name1', email: 'dsada@qq.com' }
      ],
      total: 0,
      addUserVisibe: false,
      editUserVisibe: false,
      editUser: {}
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    onSubmit() {
      this.fetchList()
    },
    addItem() {
      this.list.push({
        name: ''
      })
    },
    fetchList() {
      const { page, pageSize, username, email } = this
      const params = {
        pageSize,
        page,
        username,
        email
      }
      getList(params).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      }).finally(e => {

      })
    },
    pageChange(val) {
      this.page = val
    },
    onAdd() {
      this.addUserVisibe = true
    },
    onEditUser(row) {
      this.editUser = { ...row }
      this.editUserVisibe = true
    },
    onSuccess() {
      this.fetchList()
    }
  }
}
</script>
