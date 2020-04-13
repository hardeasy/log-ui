<template>
  <div class="app-container">
    <el-form rel="form" label-width="80px">
      <el-form-item label="ID">
        dsadsadsadsadsadsadas
      </el-form-item>
      <el-divider />
      <el-form-item label="时间">
        dsadasdas
      </el-form-item>
      <el-divider />
      <el-form-item label="级别">
        dsadas
      </el-form-item>
      <el-divider />
      <el-form-item label="内容">
        <code>2020-03-22 15:40:29 [49.104.23.78][-][-][error][yii\db\IntegrityException] PDOException: SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'session_id' cannot be null in /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/Command.php:994
          Stack trace:
          #0 /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/Command.php(994): PDOStatement->execute()
          #1 /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/Schema.php(412): yii\db\Command->execute()
          #2 /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/ActiveRecord.php(511): yii\db\Schema->insert('tbl_visitor', Array)
          #3 /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/ActiveRecord.php(477): yii\db\ActiveRecord->insertInternal(NULL)
          #4 /mnt/htdocs/fulllinker20/vendor/yiisoft/yii2/db/BaseActiveRecord.php(646): yii\db\ActiveRecord->insert(false, NULL)
          #5 /mnt/htdocs/fulllinker20/shop/service/VisitorService.php(190): yii\db\BaseActiveRecord->save(false)
          #6 /mnt/htdocs/fulllinker20/shop/controllers/VisitorController.php(182): app\service\VisitorService->addToCartEvent(913, NULL, '49.104.23.78')
          #</code>
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
      tableData: [
        { name: 'ID', value: 'dsadasdas' }
      ]
    }
  }
}
</script>
