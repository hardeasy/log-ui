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
export default {
  data() {
    return {
      detail:{ id: '750deHEBHmxdQjgEgwVw', level:"error", time:"2020-14-06 14:06", content: 'dsadasdas' }
    }
  },
  created() {
    fetchData()
  },
  methods: {
    fetchData() {
      
    }
  }

}
</script>
