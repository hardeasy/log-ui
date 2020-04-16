<template>
	<div class="app-container">
		<el-form ref="form" :model="formData" :rules="rules" label-width="120px">
			<el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="应用的名称" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="formData.code" placeholder="应用的编码，全局唯一" />
      </el-form-item>
			<el-form-item label="accessToken">
        <el-input v-model="formData.access_token" placeholder="可不填写,后台自动生成" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" :loading="submitLoding">提交</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
import {addApp, editApp} from '@/api/app'

export default {
    data() {
			return {
				submitLoding: false,
				rules:{
					code: [
						{ required: true, message: '请输入编码', trigger: 'blur' },
					],
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					]
				}
			}
	},
	created() {
		//console.log(this.formData)
		console.log(this.formScene)
	},
	props: {
		formData: Object, //{code:'', name:'', access_token:''},
		formScene: String,
	},
	methods: {
    onSubmit(formName) {
			this.$refs[formName].validate((valid) => {
          if (valid) {
						this.submitLoding = true
						
						if (this.formScene == "add") {
							this.addApp()
						} else {
							this.editApp()
						}
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
		addApp() {
			addApp(this.formData).then(response => {
				this.submitLoding = false;
				this.$emit('submitSuccess');
			}).catch(e => {
				this.submitLoding = false;
			})
		},
		editApp() {
			editApp(this.formData).then(response => {
				this.submitLoding = false;
				this.$emit('submitSuccess');
			}).catch(e => {
				this.submitLoding = false;
			})
		}
  }
}
</script>