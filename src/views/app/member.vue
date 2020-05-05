<template>
  <div>
    <el-dialog title="成员" :visible.sync="visible" :close-on-click-modal="false" @close="onClose()">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="新增成员">
          <el-select
            v-model="addUsers"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="用户"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="members">
        <el-table-column property="username" label="账户" />
        <el-table-column property="email" label="email" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delBtnClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { getAppMembers, addAppMembers, deleteAppMembers } from '@/api/app'

export default {
  props: {
    isopen: Boolean,
    app: Object
  },
  data() {
    return {
      visible: false,
      members: [{
        username: '123123',
        email: 'dsad@qq.com'
      }, {
        username: '444',
        email: '2321@qq.com'
      }],
      loading: false,
      addUsers: '',
      userList: [

      ]
    }
  },
  watch: {
    isopen(val) {
      this.visible = val
    },
    app() {
      this.fetchMembers()
    }
  },
  methods: {
    onClose() {
      this.$emit('update:isopen', false)
    },
    delBtnClick(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAppMembers(this.app.id, row.user_id).then(response => {
          this.fetchMembers()
        }).catch(e => {

        })
      }).catch(() => {

      })
    },
    remoteMethod(val) {
      const params = {
        pageSize: 30,
        page: 1,
        username: val
      }
      getList(params).then(response => {
        this.userList = response.data.items
      }).catch(e => {})
    },
    onSubmit() {
      addAppMembers(this.app.id, this.addUsers).then(response => {
        this.fetchMembers()
      }).catch(e => {

      })
    },
    fetchMembers() {
      getAppMembers(this.app.id).then(response => {
        this.members = response.data
      }).catch(e => {

      })
    }
  }
}
</script>
