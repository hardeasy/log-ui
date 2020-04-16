<template>
  <div class="app-container" id="log-detail-page">
    <el-form rel="form" label-width="80px">
      <el-form-item label="ID">
        {{ detail.id }}
      </el-form-item>
      <el-divider />
      <el-form-item label="时间">
        {{ detail.time }}
      </el-form-item>
      <el-divider />
      <el-form-item label="级别">
        {{ detail.level }}
      </el-form-item>
      <el-divider />
      <el-form-item label="内容">
        <code v-html="detail.content"></code>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetail } from '@/api/log'

export default {
  data() {
    return {
      detail: { id: '', level: '', time: '', content: '' }
    }
  },

  props: {
    id: String,
    appcode: String
  },

  created() {
    console.log(this.id, this.appcode)
    this.fetchData()
  },

  watch: {
    id() {
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      const params = {}
      params.id = this.id
      params.appcode = this.appcode
      getDetail(params).then(response => {
        response.data.content = response.data.content.replace(/\n/g,"<br/>");
        this.detail = response.data
      }).catch(e => {

      })
    }
  }
}
</script>


<style>
#log-detail-page .el-form .el-form-item{margin-bottom:0px;}
#log-detail-page .el-form .el-divider{ margin:5px 0;}
#log-detail-page .el-form .el-form-item .el-form-item__content{line-height:23px}
</style>