<template>
  <el-dialog title="新增用户" :visible.sync="visible" :close-on-click-modal="false" @close="onClose()">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
import { addUser } from '@/api/user'
export default {
  props: {
    isopen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      submitLoading: false,
      ruleForm: {

      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    isopen(val) {
      this.visible = val
    }
  },
  methods: {
    onClose() {
      this.$emit('update:isopen', false)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addUser(this.ruleForm).then(response => {
            this.submitLoading = false
            this.visible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$emit('onSuccess')
          }).finally(e => {
            this.submitLoading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
