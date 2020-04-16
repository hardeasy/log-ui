<template>
	<div class="app-container">
		<el-row>
			<el-button type="primary" @click="addBtnClick">新增</el-button>
		</el-row>
		<el-table
		v-loading="listLoading"
		element-loading-text="Loading"
		:data="tableData"
		style="width: 100%">
			<el-table-column
				prop="id"
				label="ID"
				width="180">
			</el-table-column>
			<el-table-column
				prop="code"
				label="编码"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="名称">
			</el-table-column>
			<el-table-column
				prop="created_at"
				label="添加时间">
			</el-table-column>
			<el-table-column
				prop="updated_at"
				label="更新时间">
			</el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
        <el-button @click="editBtnClick(scope.row)" type="text" size="small">编辑</el-button>
      </template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑应用" :visible.sync="dialogTableVisible">
			<c-form :formData="formData" :formScene.sync="formScene" @submitSuccess="submitSuccessHandle"></c-form>
		</el-dialog>
	</div>
</template>

<script>
import { getAppList } from '@/api/app'
import commonForm from './form';

export default {
	data() {
		return {
			dialogTableVisible: false,
			formData: {},
			formScene: "add",
			listLoading: false,
			tableData : [
				{id: 1, code: "dsdsa", name: "oms"}
			]
		}
	},
	
	components: {
		"c-form": commonForm,
	},

	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.listLoading = true;
			getAppList().then(response => {
				this.tableData = response.data
				this.listLoading = false;
			}).catch(e => {
				this.listLoading = false;
			})
		},
		addBtnClick() {
			this.formScene = "add"
			this.formData = {};
			this.dialogTableVisible = true;
		},
		editBtnClick(row) {
			this.formScene = "edit"
			this.formData = {...row};
			this.dialogTableVisible = true;
		},
		submitSuccessHandle() {
				this.dialogTableVisible = false;
				this.fetchData();
		}
	}
}
</script>
