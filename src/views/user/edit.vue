<template>
  <el-dialog title="编辑用户" :visible.sync="visible" :close-on-click-modal="false" @close="onClose()">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="账户" prop="username">
        <template>
          {{ user.username }}
        </template>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="is_disable">
        <el-switch
          v-model="ruleForm.is_disable"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
import { editUser } from '@/api/user'
export default {
  props: {
    isopen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      visible: false,
      submitLoading: false,
      ruleForm: {
        id: 0,
        email: '',
        is_disable: false
      },
      rules: {
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
    },
    user(val) {
      this.ruleForm.id = val.id
      this.ruleForm.email = val.email
      this.ruleForm.is_disable = val.is_disable === 1
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
          const { id, password, email, is_disable } = this.ruleForm
          const data = {
            password,
            email,
            is_disable: is_disable ? 1 : 2
          }
          editUser(id, data).then(response => {
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
