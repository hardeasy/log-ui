<template>
  <div class="app-container">
    <el-row v-if="username === 'admin'">
      <el-button type="primary" @click="addBtnClick">新增</el-button>
    </el-row>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="code"
        label="编码"
        width="180"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="created_at"
        label="添加时间"
      />
      <el-table-column
        v-if="username === 'admin'"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editBtnClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="memberBtnClick(scope.row)">成员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑应用" :visible.sync="dialogTableVisible">
      <c-form :form-data="formData" :form-scene.sync="formScene" @submitSuccess="submitSuccessHandle" />
    </el-dialog>

    <c-member :app="selectedApp" :isopen.sync="memberIsOpen" />
  </div>
</template>

<script>
import { getAppList } from '@/api/app'
import commonForm from './form'
import Member from './member'

export default {

  components: {
    'c-form': commonForm,
    'c-member': Member
  },
  data() {
    return {
      dialogTableVisible: false,
      memberIsOpen: false,
      selectedApp: {},
      formData: {},
      formScene: 'add',
      listLoading: false,
      tableData: [
        { id: 1, code: 'dsdsa', name: 'oms' }
      ]
    }
  },
  computed: {
    username() {
      return this.$store.getters.name
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAppList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    addBtnClick() {
      this.formScene = 'add'
      this.formData = {}
      this.dialogTableVisible = true
    },
    editBtnClick(row) {
      this.formScene = 'edit'
      this.formData = { ...row }
      this.dialogTableVisible = true
    },
    submitSuccessHandle() {
      this.dialogTableVisible = false
      this.fetchData()
    },

    memberBtnClick(row) {
      this.memberIsOpen = true
      this.selectedApp = { ...row }
    }
  }
}
</script>
