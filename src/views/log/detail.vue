<template>
  <div class="app-container">
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
        <code>{{ detail.content }}</code>
      </el-form-item>
    </el-form>

  </div>
</template>

<style>
.el-divider--horizontal{margin: 8px 0px;}
.el-form-item{margin-bottom: 0px;}
</style>
<script>
import { getDetail } from '@/api/log'

export default {
  data() {
    return {
      detail: { id: '', level: '', time: '', content: '' }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {}
      params.id = this.$route.params.id
      params.appcode = this.$route.params.appcode
      getDetail(params).then(response => {
        this.detail = response.data
      }).catch(e => {

      })
    }
  }

}
</script>
