<template>
  <div class="app-container">
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="health"
        label="health"
        width="180"
      />
      <el-table-column
        prop="status"
        label="status"
        width="180"
      />
      <el-table-column
        prop="index"
        label="index"
      />
      <el-table-column
        prop="pri"
        label="pri"
      />
      <el-table-column
        prop="rep"
        label="rep"
      />
      <el-table-column
        prop="docs_count"
        label="docs_count"
      />
      <el-table-column
        prop="store_size"
        label="store_size"
      />
      <el-table-column
        prop="pri_store_size"
        label="pri_store_size"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteBtnClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { getIndices, deleteIndex } from '@/api/log'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      getIndices().then(response => {
        this.list = response.data
      }).catch(e => {

      })
    },
    deleteBtnClick(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIndex(row.index).then(response => {
          this.fetchList()
        }).catch(e => {

        })
      }).catch(() => {

      })
    }
  }
}
</script>
